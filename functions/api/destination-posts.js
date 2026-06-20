import { escapeHtml, okJson } from "../_utils.js";
import { formatDate } from "../../lib/travel/travel-utils.js";
import { ensureTravelSettingsTables, getActiveContentTypes, normalizeContentType, labelContentType } from "../../lib/travel/travel-settings.js";

const HOTEL_CONTENT_TYPES = ["top5_series", "hotel_intro"];
const DEFAULT_LIMIT = 6;
const MAX_LIMIT = 60;
const TRAVEL_CONTENT_TYPE = "travel_content";
const TRAVEL_CONTENT_DEFAULT_LIMIT = 5;
const TRAVEL_CONTENT_MAX_LIMIT = 5;
const MAX_SOURCE_ROWS = 240;

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const destinationSlug = decodeURIComponent(String(url.searchParams.get("destination") || "")).trim();
  const rawType = String(url.searchParams.get("type") || "").trim();
  const requestedType = rawType === TRAVEL_CONTENT_TYPE ? TRAVEL_CONTENT_TYPE : normalizeContentType(rawType);
  const regionSlug = String(url.searchParams.get("region") || url.searchParams.get("region_slug") || "").trim();
  const recommendationCategorySlug = String(url.searchParams.get("category") || url.searchParams.get("recommendation_category") || url.searchParams.get("recommendation_category_slug") || "").trim();
  const offset = Math.max(0, Number.parseInt(url.searchParams.get("offset") || "0", 10) || 0);
  const defaultLimit = requestedType === TRAVEL_CONTENT_TYPE ? TRAVEL_CONTENT_DEFAULT_LIMIT : DEFAULT_LIMIT;
  const maxLimit = requestedType === TRAVEL_CONTENT_TYPE ? TRAVEL_CONTENT_MAX_LIMIT : MAX_LIMIT;
  const limit = Math.min(maxLimit, Math.max(1, Number.parseInt(url.searchParams.get("limit") || String(defaultLimit), 10) || defaultLimit));

  if (!destinationSlug || !(HOTEL_CONTENT_TYPES.includes(requestedType) || requestedType === TRAVEL_CONTENT_TYPE)) {
    return okJson({ ok: false, error: "invalid_request", html: "", items: [], hasMore: false, nextOffset: offset }, { status: 400, headers: noStoreHeaders() });
  }

  await ensureTravelSettingsTables(env.TRAVEL_DB);

  const destinationRow = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, city
    FROM destinations
    WHERE slug = ? AND status = 'published'
  `).bind(destinationSlug).first();

  const destination = destinationRow || getFallbackDestination(destinationSlug);
  if (!destination) {
    return okJson({ ok: false, error: "destination_not_found", html: "", items: [], hasMore: false, nextOffset: offset }, { status: 404, headers: noStoreHeaders() });
  }

  const postQuery = buildDestinationPostQuery(destination, {
    regionSlug,
    recommendationCategorySlug,
    selectSql: "slug, title, category, summary, cover_image, cover_image_alt, tags_json, content_type, destination_slug, region_slug, region_name, recommendation_category_slug, recommendation_category_name, recommendation_category_description, hotel_slug, (SELECT h.name FROM hotels h WHERE h.slug = posts.hotel_slug LIMIT 1) AS hotel_name, updated_at, published_at",
    orderSql: `
      ORDER BY
        CASE WHEN TRIM(COALESCE(destination_slug, '')) = ? THEN 0 ELSE 1 END,
        updated_at DESC,
        published_at DESC
      LIMIT ${MAX_SOURCE_ROWS}
    `,
    orderBinds: [destinationSlug]
  });

  const [postRows, contentTypes] = await Promise.all([
    env.TRAVEL_DB.prepare(postQuery.sql).bind(...postQuery.binds).all(),
    getActiveContentTypes(env.TRAVEL_DB)
  ]);

  const allPosts = (postRows.results || []).filter((post) => {
    const hotelGroup = getHotelPostGroup(post, requestedType);
    return requestedType === TRAVEL_CONTENT_TYPE ? !hotelGroup : hotelGroup === requestedType;
  });
  const items = allPosts.slice(offset, offset + limit);
  const nextOffset = offset + items.length;
  const hasMore = nextOffset < allPosts.length;
  const html = requestedType === TRAVEL_CONTENT_TYPE
    ? items.map((post) => renderTravelPostItem(post)).join("")
    : items.map((post) => renderHotelPostCard(post, contentTypes)).join("");

  return okJson({
    ok: true,
    type: requestedType,
    region: regionSlug,
    recommendation_category: recommendationCategorySlug,
    total: allPosts.length,
    offset,
    nextOffset,
    hasMore,
    html,
    items: items.map((post) => ({ slug: post.slug, title: post.title, region_slug: post.region_slug || "", region_name: post.region_name || "", recommendation_category_slug: post.recommendation_category_slug || "", recommendation_category_name: post.recommendation_category_name || "", recommendation_category_description: post.recommendation_category_description || "" }))
  }, { headers: noStoreHeaders() });
}

function noStoreHeaders() {
  return { "cache-control": "no-store" };
}

function buildDestinationPostQuery(destination = {}, { regionSlug = "", recommendationCategorySlug = "", selectSql = "*", orderSql = "", orderBinds = [] } = {}) {
  const destinationSlug = String(destination.slug || "").trim();
  const slugAliases = getDestinationSlugAliases(destinationSlug);
  const terms = getDestinationSearchTerms(destination);
  const fallbackBinds = [];
  const fallbackConditions = [];

  terms.forEach((term) => {
    const normalizedTerm = term.toLowerCase();
    const like = `%${normalizedTerm}%`;
    fallbackConditions.push("LOWER(COALESCE(title, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(COALESCE(summary, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(COALESCE(tags_json, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(COALESCE(category, '')) LIKE ?");
    fallbackBinds.push(like);
  });

  const slugMatchSql = slugAliases.length
    ? `LOWER(TRIM(COALESCE(destination_slug, ''))) IN (${slugAliases.map(() => "?").join(", ")})`
    : "LOWER(TRIM(COALESCE(destination_slug, ''))) = ?";
  const fallbackSql = fallbackConditions.length
    ? `OR (${fallbackConditions.join(" OR ")})`
    : "";

  return {
    sql: `
      SELECT ${selectSql}
      FROM posts
      WHERE ${normalizedStatusSql()} = 'published'
        ${regionSlug ? "AND TRIM(COALESCE(region_slug, '')) = ?" : ""}
        ${recommendationCategorySlug ? "AND TRIM(COALESCE(recommendation_category_slug, '')) = ?" : ""}
        AND (
          ${slugMatchSql}
          ${fallbackSql}
        )
      ${orderSql || ""}
    `,
    binds: [
      ...(regionSlug ? [regionSlug] : []),
      ...(recommendationCategorySlug ? [recommendationCategorySlug] : []),
      ...(slugAliases.length ? slugAliases : [destinationSlug.toLowerCase()]),
      ...fallbackBinds,
      ...(Array.isArray(orderBinds) ? orderBinds : [])
    ]
  };
}

const DESTINATION_SEARCH_ALIASES = Object.freeze({
  "ho-chi-minh-city": [
    "호치민",
    "호치민시",
    "호찌민",
    "호찌민시",
    "사이공",
    "ho chi minh",
    "ho chi minh city",
    "hochiminh",
    "saigon",
    "sai gon",
    "hcmc"
  ]
});

const DESTINATION_SLUG_ALIASES = Object.freeze({
  "ho-chi-minh-city": [
    "ho-chi-minh-city",
    "ho-chi-minh",
    "hochiminh",
    "hochiminh-city",
    "hcmc",
    "saigon",
    "sai-gon",
    "호치민",
    "호찌민",
    "호치민시",
    "호찌민시"
  ],
  "da-nang": ["da-nang", "danang", "다낭"],
  "nha-trang": ["nha-trang", "nhatrang", "나트랑"]
});

const FALLBACK_DESTINATIONS = Object.freeze({
  "ho-chi-minh-city": { slug: "ho-chi-minh-city", name: "호치민", city: "호치민" },
  "ho-chi-minh": { slug: "ho-chi-minh-city", name: "호치민", city: "호치민" },
  "saigon": { slug: "ho-chi-minh-city", name: "호치민", city: "호치민" },
  "hcmc": { slug: "ho-chi-minh-city", name: "호치민", city: "호치민" },
  "da-nang": { slug: "da-nang", name: "다낭", city: "다낭" },
  "danang": { slug: "da-nang", name: "다낭", city: "다낭" },
  "nha-trang": { slug: "nha-trang", name: "나트랑", city: "나트랑" }
});

function normalizedStatusSql() {
  return "LOWER(TRIM(COALESCE(status, 'published')))";
}

function getFallbackDestination(slug = "") {
  const key = String(slug || "").trim().toLowerCase();
  return FALLBACK_DESTINATIONS[key] || null;
}

function getDestinationSlugAliases(slug = "") {
  const key = String(slug || "").trim().toLowerCase();
  return [...new Set([key, ...(DESTINATION_SLUG_ALIASES[key] || [])]
    .map((value) => String(value || "").trim().toLowerCase())
    .filter(Boolean))];
}

function getDestinationSearchTerms(destination = {}) {
  const slug = String(destination.slug || "").trim();
  return [...new Set([
    destination.name,
    destination.city,
    slug,
    ...(DESTINATION_SEARCH_ALIASES[slug] || [])
  ].map((value) => String(value || "").replace(/\s+/g, " ").trim()).filter((value) => value.length >= 2))];
}

function getHotelPostGroup(post = {}, requestedType = "") {
  const type = normalizeContentType(post.content_type);
  if (type === "top5_series") return "top5_series";
  if (type === "hotel_intro") return "hotel_intro";

  const normalizedRequestedType = normalizeContentType(requestedType);
  const text = normalizeComparableText([
    post.content_type,
    post.title,
    post.category,
    post.summary,
    post.tags_json,
    post.hotel_slug,
    post.hotel_name,
    post.recommendation_category_slug,
    post.recommendation_category_name
  ].join(" "));

  if (!looksLikeHotelPost(text, post)) return "";

  const top5Signals = [
    "top5",
    "top 5",
    "호텔추천",
    "추천호텔",
    "숙소추천",
    "여행스타일별호텔추천",
    "가성비호텔",
    "가족여행호텔",
    "첫여행호텔",
    "위치좋은호텔",
    "호텔베스트",
    "best hotel",
    "hotel pick",
    "hotel picks",
    "hotel recommendation"
  ];
  const introSignals = [
    "호텔리뷰",
    "호텔후기",
    "추천호텔리뷰",
    "개별호텔",
    "hotelreview",
    "hotel review"
  ];

  const hasTop5Signal = hasComparableSignal(text, top5Signals);
  const hasIntroSignal = hasComparableSignal(text, introSignals);

  if (normalizedRequestedType === "top5_series" && (hasTop5Signal || post.recommendation_category_slug || post.recommendation_category_name)) return "top5_series";
  if (normalizedRequestedType === "hotel_intro" && (hasIntroSignal || post.hotel_slug || post.hotel_name)) return "hotel_intro";

  if (hasTop5Signal) return "top5_series";
  if (hasIntroSignal || post.hotel_slug || post.hotel_name) return "hotel_intro";

  return "";
}

function normalizeComparableText(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[\s_ ]+/g, "")
    .replace(/[-–—|｜·.,，、:：/\\()\[\]{}]+/g, "")
    .trim();
}


function hasComparableSignal(text = "", signals = []) {
  return signals.some((signal) => {
    const normalizedSignal = normalizeComparableText(signal);
    return Boolean(normalizedSignal && text.includes(normalizedSignal));
  });
}

function looksLikeHotelPost(text = "", post = {}) {
  if (post.hotel_slug || post.hotel_name) return true;
  if (!text) return false;
  return ["호텔", "숙소", "hotel", "stay"].some((signal) => text.includes(signal));
}

function extractHotelNameFromTitle(title = "") {
  const clean = String(title || "").replace(/^#+\s*/, "").trim();
  if (!clean) return "";
  const firstClause = clean.split(/[,.，、|｜?？!！]/)[0].trim();
  return firstClause
    .replace(/\s*(추천|후기|리뷰|가격|위치|예약|조식|가성비|숙소|호텔 선택|체크포인트).*$/i, "")
    .trim() || firstClause;
}

function getHotelCardTitle(post = {}) {
  const type = normalizeContentType(post.content_type);
  if (type === "hotel_intro") {
    return String(post.hotel_name || "").trim() || extractHotelNameFromTitle(post.title) || post.title || "추천 호텔 리뷰";
  }
  return post.title || "호텔 추천 글";
}

function appendImageVersion(src = "", version = "") {
  const value = String(src || "").trim();
  const stamp = String(version || "").trim();
  if (!value || !stamp || /^(data|blob):/i.test(value)) return value;
  const separator = value.includes("?") ? "&" : "?";
  return `${value}${separator}v=${encodeURIComponent(stamp)}`;
}

function safeTags(value = "") {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(String(value || "[]"));
    if (Array.isArray(parsed)) return parsed.map((item) => String(item || "").trim()).filter(Boolean);
  } catch (_) {}
  return String(value || "").split(/[,.，、|]/).map((item) => item.trim()).filter(Boolean);
}


function renderTravelPostItem(post = {}) {
  const slug = String(post.slug || "");
  const href = `/post/${encodeURIComponent(slug)}`;
  const meta = formatDate(post.updated_at);
  return `<article class="travel-list__item">
    <a class="travel-list__link" href="${href}" aria-label="${escapeHtml(`${post.title || "여행 글"} 읽기`)}">
      <div class="travel-list__content">
        <h4>${escapeHtml(post.title || "여행 콘텐츠")}</h4>
        <div class="travel-card__meta">${escapeHtml(meta)}</div>
      </div>
      <div class="travel-list__actions" aria-hidden="true">
        <span class="travel-list__arrow">→</span>
      </div>
    </a>
    ${renderPostAdminActions(post)}
  </article>`;
}

function renderPostAdminActions(post, { hidden = true } = {}) {
  const slug = String(post.slug || "");
  if (!slug) return "";
  const hiddenAttrs = hidden ? " data-admin-only hidden" : "";
  return `<div class="post-admin-mini-actions" aria-label="글 관리"${hiddenAttrs}>
    <a class="post-admin-mini-btn" href="/edit.html?slug=${encodeURIComponent(slug)}">수정</a>
    <button class="post-admin-mini-btn post-admin-mini-btn--danger js-delete-post" type="button" data-slug="${escapeHtml(slug)}" data-title="${escapeHtml(post.title || slug)}">삭제</button>
  </div>`;
}

function renderHotelPostCard(post, contentTypes = []) {
  const slug = String(post.slug || "");
  const href = `/post/${encodeURIComponent(slug)}`;
  const tags = safeTags(post.tags_json).slice(0, 3);
  const coverImage = appendImageVersion(post.cover_image, post.updated_at);
  const title = getHotelCardTitle(post);
  const region = String(post.region_name || post.region_slug || "").trim();
  const recommendationCategory = String(post.recommendation_category_name || post.recommendation_category_slug || "").trim();
  return `<article class="travel-card hotel-card travel-card--clickable" data-region="${escapeHtml(post.region_slug || "")}" data-recommendation-category="${escapeHtml(post.recommendation_category_slug || "")}">
    <a class="travel-card__full-link" href="${href}" aria-label="${escapeHtml(`${title} 보기`)}">
      ${coverImage ? `<figure class="travel-card__media"><img src="${escapeHtml(coverImage)}" alt="${escapeHtml(post.cover_image_alt || `${post.title} 대표 이미지`)}" loading="lazy" decoding="async" /></figure>` : ""}
      <div class="travel-card__body">
        <div class="travel-card__meta">${escapeHtml([labelContentType(post.content_type, contentTypes), recommendationCategory, region, post.category].filter(Boolean).join(" · "))}</div>
        <h3 class="travel-card__title">${escapeHtml(title)}</h3>
        <p class="travel-card__description">${escapeHtml(post.summary || "호텔 위치와 예약 전 체크포인트를 정리했습니다.")}</p>
        ${tags.length ? `<div class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
        <span class="text-link">글 보기</span>
      </div>
    </a>
  </article>`;
}
