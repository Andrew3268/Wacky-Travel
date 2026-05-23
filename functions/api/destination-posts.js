import { escapeHtml, okJson } from "../_utils.js";
import { getActiveContentTypes, normalizeContentType, labelContentType } from "../../lib/travel/travel-settings.js";

const HOTEL_CONTENT_TYPES = ["top5_series", "hotel_intro"];
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 3;
const MAX_SOURCE_ROWS = 240;

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const destinationSlug = decodeURIComponent(String(url.searchParams.get("destination") || "")).trim();
  const requestedType = normalizeContentType(url.searchParams.get("type") || "");
  const offset = Math.max(0, Number.parseInt(url.searchParams.get("offset") || "0", 10) || 0);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number.parseInt(url.searchParams.get("limit") || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT));

  if (!destinationSlug || !HOTEL_CONTENT_TYPES.includes(requestedType)) {
    return okJson({ ok: false, error: "invalid_request", html: "", items: [], hasMore: false, nextOffset: offset }, { status: 400, headers: noStoreHeaders() });
  }

  const destination = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, city
    FROM destinations
    WHERE slug = ? AND status = 'published'
  `).bind(destinationSlug).first();

  if (!destination) {
    return okJson({ ok: false, error: "destination_not_found", html: "", items: [], hasMore: false, nextOffset: offset }, { status: 404, headers: noStoreHeaders() });
  }

  const postQuery = buildDestinationPostQuery(destination, {
    selectSql: "slug, title, category, summary, cover_image, cover_image_alt, tags_json, content_type, destination_slug, hotel_slug, (SELECT h.name FROM hotels h WHERE h.slug = posts.hotel_slug LIMIT 1) AS hotel_name, updated_at, published_at",
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

  const allPosts = (postRows.results || []).filter((post) => getHotelPostGroup(post) === requestedType);
  const items = allPosts.slice(offset, offset + limit);
  const nextOffset = offset + items.length;
  const hasMore = nextOffset < allPosts.length;

  return okJson({
    ok: true,
    type: requestedType,
    total: allPosts.length,
    offset,
    nextOffset,
    hasMore,
    html: items.map((post) => renderHotelPostCard(post, contentTypes)).join(""),
    items: items.map((post) => ({ slug: post.slug, title: post.title }))
  }, { headers: noStoreHeaders() });
}

function noStoreHeaders() {
  return { "cache-control": "no-store" };
}

function buildDestinationPostQuery(destination = {}, { selectSql = "*", orderSql = "", orderBinds = [] } = {}) {
  const destinationSlug = String(destination.slug || "").trim();
  const terms = getDestinationSearchTerms(destination);
  const fallbackBinds = [];
  const fallbackConditions = [];

  terms.forEach((term) => {
    const like = `%${term.toLowerCase()}%`;
    fallbackConditions.push("LOWER(COALESCE(title, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(COALESCE(summary, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(COALESCE(tags_json, '')) LIKE ?");
    fallbackBinds.push(like);
    fallbackConditions.push("LOWER(TRIM(COALESCE(category, ''))) = ?");
    fallbackBinds.push(term.toLowerCase());
  });

  const fallbackSql = fallbackConditions.length
    ? `OR (${fallbackConditions.join(" OR ")})`
    : "";

  return {
    sql: `
      SELECT ${selectSql}
      FROM posts
      WHERE status = 'published'
        AND (
          TRIM(COALESCE(destination_slug, '')) = ?
          ${fallbackSql}
        )
      ${orderSql || ""}
    `,
    binds: [
      destinationSlug,
      ...fallbackBinds,
      ...(Array.isArray(orderBinds) ? orderBinds : [])
    ]
  };
}

function getDestinationSearchTerms(destination = {}) {
  return [...new Set([
    destination.name,
    destination.city,
    destination.slug
  ].map((value) => String(value || "").replace(/\s+/g, " ").trim()).filter((value) => value.length >= 2))];
}

function getHotelPostGroup(post = {}) {
  const type = normalizeContentType(post.content_type);
  if (type === "top5_series") return "top5_series";
  if (type === "hotel_intro") return "hotel_intro";
  return "";
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
    return String(post.hotel_name || "").trim() || extractHotelNameFromTitle(post.title) || post.title || "개별 호텔 소개";
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

function renderHotelPostCard(post, contentTypes = []) {
  const slug = String(post.slug || "");
  const href = `/post/${encodeURIComponent(slug)}`;
  const tags = safeTags(post.tags_json).slice(0, 3);
  const coverImage = appendImageVersion(post.cover_image, post.updated_at);
  return `<article class="travel-card hotel-card">
    ${coverImage ? `<a class="travel-card__media" href="${href}"><img src="${escapeHtml(coverImage)}" alt="${escapeHtml(post.cover_image_alt || `${post.title} 대표 이미지`)}" loading="lazy" decoding="async" /></a>` : ""}
    <div class="travel-card__body">
      <div class="travel-card__meta">${escapeHtml([labelContentType(post.content_type, contentTypes), post.category].filter(Boolean).join(" · "))}</div>
      <h3><a href="${href}">${escapeHtml(getHotelCardTitle(post))}</a></h3>
      <p>${escapeHtml(post.summary || "호텔 위치와 예약 전 체크포인트를 정리했습니다.")}</p>
      ${tags.length ? `<div class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <a class="text-link" href="${href}">글 보기</a>
    </div>
  </article>`;
}
