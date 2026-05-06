import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd, buildDestinationJsonLd, buildItemListJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, safeJsonArray, formatDate } from "../../lib/travel/travel-utils.js";

export async function onRequestGet({ params, env, request }) {
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) return okHtml("Not Found", { status: 404 });

  const meta = await env.TRAVEL_DB.prepare(`SELECT updated_at FROM destinations WHERE slug = ? AND status = 'published'`).bind(slug).first();
  if (!meta) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cacheKeyUrl = `${origin}/destinations/${encodeURIComponent(slug)}?v=${encodeURIComponent(String(meta.updated_at || ""))}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      const destination = await env.TRAVEL_DB.prepare(`
        SELECT * FROM destinations WHERE slug = ? AND status = 'published'
      `).bind(slug).first();
      if (!destination) return okHtml(renderNotFound(slug), { status: 404, headers: { "cache-control": "no-store" } });

      const [hotelRows, postRows] = await Promise.all([
        env.TRAVEL_DB.prepare(`
          SELECT slug, destination_slug, name, area, price_level, summary, cover_image, cover_image_alt,
                 suitable_for_json, updated_at
          FROM hotels
          WHERE destination_slug = ? AND status = 'published'
          ORDER BY updated_at DESC, name ASC
          LIMIT 8
        `).bind(slug).all(),
        env.TRAVEL_DB.prepare(`
          SELECT slug, title, category, summary, cover_image, cover_image_alt, content_type, updated_at
          FROM posts
          WHERE destination_slug = ? AND status = 'published'
          ORDER BY updated_at DESC, published_at DESC
          LIMIT 10
        `).bind(slug).all()
      ]);

      const hotels = hotelRows.results || [];
      const posts = postRows.results || [];
      const canonical = `${origin}/destinations/${encodeURIComponent(slug)}`;
      const title = `${destination.title || `${destination.name} 여행 가이드`} | Wacky Travel`;
      const description = destination.meta_description || destination.summary || `${destination.name} 여행지 정보와 호텔 선택 기준을 정리합니다.`;
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
  ${renderTravelHead({ title, description, canonical, image: destination.cover_image })}
  ${renderJsonLdScripts(jsonLdItems)}
</head>
<body>
  ${renderSiteHeader({ active: "destinations" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page">
    <section class="travel-hero container">
      <div class="travel-hero__body">
        <p class="eyebrow">${escapeHtml(destination.country || "여행지")}</p>
        <h1>${escapeHtml(destination.title || `${destination.name} 여행 가이드`)}</h1>
        <p class="travel-hero__summary">${escapeHtml(destination.summary || "여행 일정과 숙소 선택 기준을 한 번에 정리합니다.")}</p>
        <div class="travel-hero__chips">
          ${destination.best_season ? `<span>추천 시기: ${escapeHtml(destination.best_season)}</span>` : ""}
          ${destination.airport_info ? `<span>공항: ${escapeHtml(destination.airport_info)}</span>` : ""}
          ${destination.transport_summary ? `<span>동선: ${escapeHtml(destination.transport_summary)}</span>` : ""}
        </div>
      </div>
      ${destination.cover_image ? `<figure class="travel-hero__image"><img src="${escapeHtml(destination.cover_image)}" alt="${escapeHtml(destination.cover_image_alt || `${destination.name} 여행 대표 이미지`)}" loading="eager" decoding="async" fetchpriority="high" /></figure>` : ""}
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
        <p class="eyebrow">Travel Guides</p>
        <h2>${escapeHtml(destination.name)} 여행 정보글</h2>
        <p>예약 전 고민을 줄이는 실용형 글을 함께 확인하세요.</p>
      </div>
      <div class="travel-list">
        ${posts.length ? posts.map(renderPostItem).join("") : `<div class="empty-card">아직 등록된 여행 정보글이 없습니다.</div>`}
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

function renderPostItem(post) {
  return `<article class="travel-list__item">
    <div>
      <div class="travel-card__meta">${escapeHtml([post.category, labelContentType(post.content_type), formatDate(post.updated_at)].filter(Boolean).join(" · "))}</div>
      <h3><a href="/post/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h3>
      <p>${escapeHtml(post.summary || "여행 전 확인하면 좋은 정보를 정리했습니다.")}</p>
    </div>
    <a class="text-link" href="/post/${encodeURIComponent(post.slug)}">읽기</a>
  </article>`;
}

function labelContentType(value) {
  const map = { guide: "가이드", hotel_roundup: "호텔 추천", hotel_review: "호텔 분석", checklist: "체크리스트" };
  return map[String(value || "guide")] || "가이드";
}

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>여행지를 찾을 수 없습니다</title></head><body><h1>여행지를 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
