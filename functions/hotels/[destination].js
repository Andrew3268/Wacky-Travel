import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd, buildItemListJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, safeJsonArray } from "../../lib/travel/travel-utils.js";

export async function onRequestGet({ params, env, request }) {
  const destinationSlug = decodeURIComponent(String(params.destination || ""));
  if (!destinationSlug) return okHtml("Not Found", { status: 404 });

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const destination = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, country, city, title, summary, meta_description, cover_image, updated_at
    FROM destinations
    WHERE slug = ? AND status = 'published'
  `).bind(destinationSlug).first();

  if (!destination) return okHtml(renderNotFound(destinationSlug), { status: 404, headers: { "cache-control": "no-store" } });

  const cacheKeyUrl = `${origin}/hotels/${encodeURIComponent(destinationSlug)}?v=${encodeURIComponent(String(destination.updated_at || ""))}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 600,
    buildResponse: async () => {
      const rows = await env.TRAVEL_DB.prepare(`
        SELECT slug, destination_slug, name, name_en, area, star_rating, price_level, summary, cover_image,
               cover_image_alt, pros_json, cons_json, suitable_for_json, updated_at
        FROM hotels
        WHERE destination_slug = ? AND status = 'published'
        ORDER BY updated_at DESC, name ASC
        LIMIT 60
      `).bind(destinationSlug).all();
      const hotels = rows.results || [];
      const canonical = `${origin}/hotels/${encodeURIComponent(destinationSlug)}`;
      const title = `${destination.name} 호텔 추천 | Wacky Travel`;
      const description = `${destination.name} 여행 전 비교하기 좋은 호텔의 위치, 가격대, 추천 대상을 정리합니다.`;
      const breadcrumbItems = [
        { name: "홈", url: `${origin}/`, href: "/" },
        { name: "여행지", url: `${origin}/destinations/`, href: "/destinations/" },
        { name: destination.name, url: `${origin}/destinations/${encodeURIComponent(destinationSlug)}`, href: `/destinations/${encodeURIComponent(destinationSlug)}` },
        { name: "호텔", url: canonical, href: canonical }
      ];

      const jsonLdItems = [
        buildBreadcrumbJsonLd(breadcrumbItems),
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
  ${renderTravelHead({ title, description, canonical, image: destination.cover_image })}
  ${renderJsonLdScripts(jsonLdItems)}
</head>
<body>
  ${renderSiteHeader({ active: "hotels" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page">
    <section class="travel-hero travel-hero--compact container">
      <div class="travel-hero__body">
        <p class="eyebrow">Hotel List</p>
        <h1>${escapeHtml(destination.name)} 호텔 추천</h1>
        <p class="travel-hero__summary">위치, 가격대, 여행 유형을 기준으로 ${escapeHtml(destination.name)} 숙소를 빠르게 비교하세요.</p>
      </div>
    </section>

    <section class="container travel-section">
      <div class="hotel-filter-note">
        <strong>예약 전 체크:</strong> 같은 호텔이라도 날짜, 조식 포함, 취소 가능 여부에 따라 최종 금액이 달라질 수 있습니다.
      </div>
      <div class="travel-card-grid travel-card-grid--hotels">
        ${hotels.length ? hotels.map(renderHotelCard).join("") : `<div class="empty-card">등록된 호텔이 없습니다.</div>`}
      </div>
    </section>
  </main>
  ${renderFooter()}
</body>
</html>`;
      return okHtml(html, { headers: { "cache-control": "public, max-age=600" } });
    }
  });
}

function renderHotelCard(hotel) {
  const suitableFor = safeJsonArray(hotel.suitable_for_json).slice(0, 4);
  const pros = safeJsonArray(hotel.pros_json).slice(0, 2);
  return `<article class="travel-card hotel-card hotel-card--list">
    ${hotel.cover_image ? `<a class="travel-card__media" href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}"><img src="${escapeHtml(hotel.cover_image)}" alt="${escapeHtml(hotel.cover_image_alt || `${hotel.name} 대표 이미지`)}" loading="lazy" decoding="async" /></a>` : ""}
    <div class="travel-card__body">
      <div class="travel-card__meta">${escapeHtml([hotel.area, hotel.star_rating, hotel.price_level].filter(Boolean).join(" · "))}</div>
      <h2><a href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}">${escapeHtml(hotel.name)}</a></h2>
      <p>${escapeHtml(hotel.summary || "호텔 위치와 예약 전 확인 포인트를 정리했습니다.")}</p>
      ${pros.length ? `<ul class="mini-list">${pros.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}
      ${suitableFor.length ? `<div class="tag-row">${suitableFor.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <a class="btn btn--brand" href="/hotels/${encodeURIComponent(hotel.destination_slug)}/${encodeURIComponent(hotel.slug)}">상세 정보 보기</a>
    </div>
  </article>`;
}

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>호텔 목록을 찾을 수 없습니다</title></head><body><h1>호텔 목록을 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
