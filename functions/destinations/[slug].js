import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd, buildDestinationJsonLd, buildItemListJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, formatDate } from "../../lib/travel/travel-utils.js";
import { getActiveContentTypes, normalizeContentType, labelContentType } from "../../lib/travel/travel-settings.js";

const DESTINATION_RENDER_VERSION = "destination-detail-v7-travel-tip-fallback";
const HOTEL_CONTENT_TYPES = ["top5_series", "hotel_intro", "hotel_roundup", "hotel_review"];

export async function onRequestGet({ params, env, request }) {
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) return okHtml("Not Found", { status: 404 });

  const meta = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, city, updated_at
    FROM destinations
    WHERE slug = ? AND status = 'published'
  `).bind(slug).first();
  if (!meta) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

  const postStampQuery = buildDestinationPostQuery(meta, { selectSql: "MAX(updated_at) AS posts_updated_at", orderSql: "" });
  const postStamp = await env.TRAVEL_DB.prepare(postStampQuery.sql).bind(...postStampQuery.binds).first();

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const destinationVersion = [meta.updated_at, postStamp?.posts_updated_at, DESTINATION_RENDER_VERSION].filter(Boolean).join("|");
  const cacheKeyUrl = `${origin}/destinations/${encodeURIComponent(slug)}?v=${encodeURIComponent(destinationVersion)}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      const destination = await env.TRAVEL_DB.prepare(`
        SELECT * FROM destinations WHERE slug = ? AND status = 'published'
      `).bind(slug).first();
      if (!destination) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

      const [postRows, contentTypes] = await Promise.all([
        (() => {
          const postQuery = buildDestinationPostQuery(destination, {
            selectSql: "slug, title, category, summary, cover_image, cover_image_alt, tags_json, content_type, destination_slug, updated_at, published_at",
            orderSql: `
              ORDER BY
                CASE WHEN TRIM(COALESCE(destination_slug, '')) = ? THEN 0 ELSE 1 END,
                updated_at DESC,
                published_at DESC
              LIMIT 80
            `,
            orderBinds: [slug]
          });
          return env.TRAVEL_DB.prepare(postQuery.sql).bind(...postQuery.binds).all();
        })(),
        getActiveContentTypes(env.TRAVEL_DB)
      ]);

      const posts = postRows.results || [];
      const hotelPosts = posts.filter(isHotelPost).slice(0, 8);
      const nonHotelPosts = posts.filter((post) => !isHotelPost(post));
      const travelContentTypes = contentTypes.filter((type) => !isHotelContentType(type.slug));
      const postGroups = groupPostsByContentType(nonHotelPosts, travelContentTypes);
      const canonical = `${origin}/destinations/${encodeURIComponent(slug)}`;
      const heroTitle = getDestinationHeroTitle(destination);
      const heroSummary = getDestinationHeroSummary(destination);
      const heroImage = getDestinationHeroImage(destination);
      const heroImageAlt = getDestinationHeroImageAlt(destination);
      const title = `${heroTitle} | Wacky Travel`;
      const description = destination.meta_description || heroSummary || `${destination.name} 여행지 정보와 호텔 선택 기준을 정리합니다.`;
      const breadcrumbItems = [
        { name: "홈", url: `${origin}/`, href: "/" },
        { name: "여행지", url: `${origin}/destinations/`, href: "/destinations/" },
        { name: destination.name, url: canonical, href: canonical }
      ];

      const jsonLdItems = [
        buildBreadcrumbJsonLd(breadcrumbItems),
        buildDestinationJsonLd({ destination, url: canonical, siteName: "Wacky Travel" }),
        buildItemListJsonLd({
          url: canonical,
          items: hotelPosts.map((post) => ({
            name: post.title,
            url: `${origin}/post/${encodeURIComponent(post.slug)}`
          }))
        })
      ];

      const html = `<!doctype html>
<html lang="ko">
<head>
  ${renderTravelHead({ title, description, canonical, image: heroImage })}
  ${renderJsonLdScripts(jsonLdItems)}
</head>
<body>
  ${renderSiteHeader({ active: "destinations" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page">
    <section class="destination-detail-hero container">
      ${heroImage ? `<figure class="destination-detail-hero__media"><img src="${escapeHtml(heroImage)}" alt="${escapeHtml(heroImageAlt)}" loading="eager" decoding="async" fetchpriority="high" /></figure>` : ""}
      <div class="destination-detail-hero__content">
        <p class="eyebrow">${escapeHtml(destination.hero_eyebrow || destination.country || "여행지")}</p>
        <h1>${escapeHtml(heroTitle)}</h1>
        <p class="destination-detail-hero__summary">${escapeHtml(heroSummary || "여행 일정과 숙소 선택 기준을 한 번에 정리합니다.")}</p>
        <div class="destination-detail-hero__chips">
          ${destination.best_season ? `<span>추천 시기: ${escapeHtml(destination.best_season)}</span>` : ""}
          ${destination.airport_info ? `<span>공항: ${escapeHtml(destination.airport_info)}</span>` : ""}
          ${destination.transport_summary ? `<span>동선: ${escapeHtml(destination.transport_summary)}</span>` : ""}
        </div>
      </div>
    </section>

    <section class="container travel-section">
      <div class="section-heading">
        <p class="eyebrow">Hotel Picks</p>
        <h2>${escapeHtml(destination.name)} 호텔 추천</h2>
        <p>여행 목적과 위치를 기준으로 비교하기 좋은 호텔을 모았습니다.</p>
      </div>
      <div class="travel-card-grid travel-card-grid--hotels">
        ${hotelPosts.length ? hotelPosts.map((post) => renderHotelPostCard(post, contentTypes)).join("") : `<div class="empty-card">아직 등록된 호텔 추천 글이 없습니다.</div>`}
      </div>
    </section>

    <section class="container travel-section">
      <div class="section-heading">
        <p class="eyebrow">Travel Contents</p>
        <h2>${escapeHtml(destination.name)} 여행 콘텐츠</h2>
        <p>관리자가 설정한 글 종류에 따라 여행 콘텐츠를 나누어 확인할 수 있습니다.</p>
      </div>
      <div class="travel-content-sections">
        ${renderPostSections(destination, postGroups, travelContentTypes)}
      </div>
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
      return okHtml(html, { headers: { "cache-control": "public, max-age=900" } });
    }
  });
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

function appendImageVersion(src = "", version = "") {
  const value = String(src || "").trim();
  const stamp = String(version || "").trim();
  if (!value || !stamp || /^(data|blob):/i.test(value)) return value;
  const separator = value.includes("?") ? "&" : "?";
  return `${value}${separator}v=${encodeURIComponent(stamp)}`;
}

function getDestinationHeroTitle(destination) {
  return destination.hero_title || destination.title || `${destination.name} 여행 가이드`;
}

function getDestinationHeroSummary(destination) {
  return destination.hero_summary || destination.summary || "";
}

function getDestinationHeroImage(destination) {
  return destination.hero_image || destination.cover_image || "";
}

function getDestinationHeroImageAlt(destination) {
  return destination.hero_image_alt || destination.cover_image_alt || `${destination.name} 여행 대표 이미지`;
}

function isHotelContentType(value = "") {
  const type = normalizeContentType(value);
  return type === "top5_series" || type === "hotel_intro";
}

function isHotelPost(post = {}) {
  return isHotelContentType(post.content_type);
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
      <h3><a href="${href}">${escapeHtml(post.title || "호텔 추천 글")}</a></h3>
      <p>${escapeHtml(post.summary || "호텔 위치와 예약 전 체크포인트를 정리했습니다.")}</p>
      ${tags.length ? `<div class="tag-row">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <a class="text-link" href="${href}">글 보기</a>
    </div>
  </article>`;
}

function safeTags(value = "") {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(String(value || "[]"));
    if (Array.isArray(parsed)) return parsed.map((item) => String(item || "").trim()).filter(Boolean);
  } catch (_) {}
  return String(value || "").split(/[,.，、|]/).map((item) => item.trim()).filter(Boolean);
}

function groupPostsByContentType(posts = [], contentTypes = []) {
  const groups = {};
  contentTypes.forEach((type) => {
    groups[type.slug] = [];
  });

  posts.forEach((post) => {
    const type = normalizeContentType(post.content_type);
    if (!groups[type]) groups[type] = [];
    groups[type].push(post);
  });

  return groups;
}

function renderPostSections(destination, groups, contentTypes = []) {
  const knownKeys = new Set(contentTypes.map((type) => type.slug));
  const sections = contentTypes.map((type) => ({
    key: type.slug,
    eyebrow: type.label,
    title: `${destination.name} ${type.label}`,
    description: type.description || `${destination.name} 관련 ${type.label} 콘텐츠입니다.`,
    empty: `아직 등록된 ${type.label} 글이 없습니다.`
  }));

  const extraKeys = Object.keys(groups).filter((key) => !knownKeys.has(key));
  extraKeys.forEach((key) => {
    if (!groups[key]?.length) return;
    sections.push({
      key,
      eyebrow: "기타",
      title: `${destination.name} 기타 여행 콘텐츠`,
      description: "현재 설정 목록에는 없지만 기존 글에 연결된 콘텐츠입니다.",
      empty: "등록된 글이 없습니다."
    });
  });

  return sections.map((section) => {
    const items = groups[section.key] || [];
    return `<section class="travel-content-section" aria-labelledby="${section.key}-heading">
      <div class="travel-content-section__head">
        <div>
          <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
          <h3 id="${section.key}-heading">${escapeHtml(section.title)}</h3>
          <p>${escapeHtml(section.description)}</p>
        </div>
        <span class="travel-content-section__count">${items.length}개</span>
      </div>
      <div class="travel-list">
        ${items.length ? items.map((post) => renderPostItem(post, contentTypes)).join("") : `<div class="empty-card">${escapeHtml(section.empty)}</div>`}
      </div>
    </section>`;
  }).join("");
}

function renderPostItem(post, contentTypes = []) {
  const slug = String(post.slug || "");
  return `<article class="travel-list__item">
    <div>
      <div class="travel-card__meta">${escapeHtml([labelContentType(post.content_type, contentTypes), formatDate(post.updated_at)].filter(Boolean).join(" · "))}</div>
      <h3><a href="/post/${encodeURIComponent(slug)}">${escapeHtml(post.title)}</a></h3>
      <p>${escapeHtml(post.summary || "여행 전 확인하면 좋은 정보를 정리했습니다.")}</p>
    </div>
    <div class="travel-list__actions">
      <a class="text-link" href="/post/${encodeURIComponent(slug)}">읽기</a>
      ${renderPostAdminActions(post)}
    </div>
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

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>여행지를 찾을 수 없습니다</title></head><body><h1>여행지를 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
