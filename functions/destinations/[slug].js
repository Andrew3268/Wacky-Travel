import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd, buildDestinationJsonLd, buildItemListJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, safeJsonArray, formatDate } from "../../lib/travel/travel-utils.js";
import { getActiveContentTypes, normalizeContentType, labelContentType } from "../../lib/travel/travel-settings.js";

export async function onRequestGet({ params, env, request }) {
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) return okHtml("Not Found", { status: 404 });

  const meta = await env.TRAVEL_DB.prepare(`SELECT updated_at FROM destinations WHERE slug = ? AND status = 'published'`).bind(slug).first();
  if (!meta) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cacheKeyUrl = `${origin}/destinations/${encodeURIComponent(slug)}?v=${encodeURIComponent(String(meta.updated_at || ""))}&layout=destination-detail-v5`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      const destination = await env.TRAVEL_DB.prepare(`
        SELECT * FROM destinations WHERE slug = ? AND status = 'published'
      `).bind(slug).first();
      if (!destination) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

      const [hotelRows, postRows, contentTypes] = await Promise.all([
        env.TRAVEL_DB.prepare(`
          SELECT slug, destination_slug, name, area, price_level, summary, cover_image, cover_image_alt,
                 suitable_for_json, updated_at
          FROM hotels
          WHERE destination_slug = ? AND status = 'published'
          ORDER BY updated_at DESC, name ASC
          LIMIT 8
        `).bind(slug).all(),
        env.TRAVEL_DB.prepare(`
          SELECT slug, title, summary, cover_image, cover_image_alt, content_type, updated_at
          FROM posts
          WHERE destination_slug = ? AND status = 'published'
          ORDER BY updated_at DESC, published_at DESC
          LIMIT 60
        `).bind(slug).all(),
        getActiveContentTypes(env.TRAVEL_DB)
      ]);

      const hotels = hotelRows.results || [];
      const posts = postRows.results || [];
      const postGroups = groupPostsByContentType(posts, contentTypes);
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
          items: hotels.map((hotel) => ({
            name: hotel.name,
            url: `${origin}/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}`
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
        ${hotels.length ? hotels.map(renderHotelCard).join("") : `<div class="empty-card">아직 등록된 호텔이 없습니다.</div>`}
      </div>
      <div class="section-action"><a class="btn btn--brand" href="/hotels/${encodeURIComponent(slug)}">${escapeHtml(destination.name)} 호텔 더보기</a></div>
    </section>

    <section class="container travel-section">
      <div class="section-heading">
        <p class="eyebrow">Travel Contents</p>
        <h2>${escapeHtml(destination.name)} 여행 콘텐츠</h2>
        <p>관리자가 설정한 글 종류에 따라 여행 콘텐츠를 나누어 확인할 수 있습니다.</p>
      </div>
      <div class="travel-content-sections">
        ${renderPostSections(destination, postGroups, contentTypes)}
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

function renderHotelCard(hotel) {
  const suitableFor = safeJsonArray(hotel.suitable_for_json).slice(0, 3);
  return `<article class="travel-card hotel-card">
    ${hotel.cover_image ? `<a class="travel-card__media" href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}"><img src="${escapeHtml(hotel.cover_image)}" alt="${escapeHtml(hotel.cover_image_alt || `${hotel.name} 대표 이미지`)}" loading="lazy" decoding="async" /></a>` : ""}
    <div class="travel-card__body">
      <div class="travel-card__meta">${escapeHtml([hotel.area, hotel.price_level].filter(Boolean).join(" · "))}</div>
      <h3><a href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}">${escapeHtml(hotel.name)}</a></h3>
      <p>${escapeHtml(hotel.summary || "예약 전 위치와 장단점을 비교해보세요.")}</p>
      ${suitableFor.length ? `<div class="tag-row">${suitableFor.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <a class="text-link" href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}">자세히 보기</a>
    </div>
  </article>`;
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
