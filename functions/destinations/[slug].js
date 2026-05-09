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
          ORDER BY
            CASE COALESCE(content_type, '')
              WHEN 'top5_series' THEN 1
              WHEN 'hotel_roundup' THEN 1
              WHEN 'hotel_intro' THEN 2
              WHEN 'hotel_review' THEN 2
              WHEN 'travel_tip' THEN 3
              WHEN 'guide' THEN 3
              WHEN 'checklist' THEN 3
              ELSE 4
            END,
            updated_at DESC,
            published_at DESC
          LIMIT 30
        `).bind(slug).all()
      ]);

      const hotels = hotelRows.results || [];
      const posts = postRows.results || [];
      const postGroups = groupPostsByContentType(posts);
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
        <p class="eyebrow">Travel Contents</p>
        <h2>${escapeHtml(destination.name)} 여행 콘텐츠</h2>
        <p>글 종류에 따라 TOP5, 개별 호텔 소개, 여행 tip을 나누어 확인할 수 있습니다.</p>
      </div>
      <div class="travel-content-sections">
        ${renderPostSections(destination, postGroups)}
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

function groupPostsByContentType(posts = []) {
  const groups = {
    top5_series: [],
    hotel_intro: [],
    travel_tip: []
  };

  posts.forEach((post) => {
    const type = normalizeContentType(post.content_type);
    if (!groups[type]) groups[type] = [];
    groups[type].push(post);
  });

  return groups;
}

function renderPostSections(destination, groups) {
  const sections = [
    {
      key: "top5_series",
      eyebrow: "TOP5 Series",
      title: `${destination.name} TOP5 시리즈`,
      description: "숙소, 동선, 여행 목적별로 빠르게 비교할 수 있는 추천형 글입니다.",
      empty: "아직 등록된 TOP5 시리즈 글이 없습니다."
    },
    {
      key: "hotel_intro",
      eyebrow: "Hotel Intro",
      title: `${destination.name} 개별 호텔 소개`,
      description: "특정 호텔의 위치, 장점, 확인 포인트를 정리한 글입니다.",
      empty: "아직 등록된 개별 호텔 소개 글이 없습니다."
    },
    {
      key: "travel_tip",
      eyebrow: "Travel Tip",
      title: `${destination.name} 여행 tip`,
      description: "예약 전후로 확인하면 좋은 준비 정보와 현지 이동 팁입니다.",
      empty: "아직 등록된 여행 tip 글이 없습니다."
    }
  ];

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
        ${items.length ? items.map(renderPostItem).join("") : `<div class="empty-card">${escapeHtml(section.empty)}</div>`}
      </div>
    </section>`;
  }).join("");
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

function normalizeContentType(value) {
  const map = {
    top5_series: "top5_series",
    hotel_roundup: "top5_series",
    hotel_intro: "hotel_intro",
    hotel_review: "hotel_intro",
    travel_tip: "travel_tip",
    guide: "travel_tip",
    checklist: "travel_tip"
  };
  return map[String(value || "travel_tip").trim()] || "travel_tip";
}

function labelContentType(value) {
  const map = {
    top5_series: "TOP5 시리즈",
    hotel_intro: "개별 호텔 소개",
    travel_tip: "여행 tip"
  };
  return map[normalizeContentType(value)] || "여행 tip";
}

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>여행지를 찾을 수 없습니다</title></head><body><h1>여행지를 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
