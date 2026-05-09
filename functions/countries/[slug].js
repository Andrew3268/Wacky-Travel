import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, formatDate } from "../../lib/travel/travel-utils.js";

const COUNTRY_SLUG_ALIASES = {
  "베트남": "vietnam",
  "일본": "japan",
  "태국": "thailand",
  "대한민국": "korea",
  "한국": "korea",
  "대만": "taiwan",
  "싱가포르": "singapore",
  "말레이시아": "malaysia",
  "인도네시아": "indonesia",
  "필리핀": "philippines",
  "홍콩": "hong-kong",
  "마카오": "macau",
  "중국": "china",
  "미국": "usa",
  "프랑스": "france",
  "이탈리아": "italy",
  "스페인": "spain"
};

export async function onRequestGet({ params, env, request }) {
  const countrySlug = decodeURIComponent(String(params.slug || "")).trim();
  if (!countrySlug) return okHtml("Not Found", { status: 404 });

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cacheKeyUrl = `${origin}/countries/${encodeURIComponent(countrySlug)}?v=country-hub-v1`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      const destinationRows = await env.TRAVEL_DB.prepare(`
        SELECT slug, name, country, city, title, summary, cover_image, cover_image_alt, updated_at
        FROM destinations
        WHERE status = 'published'
        ORDER BY country COLLATE NOCASE ASC, name COLLATE NOCASE ASC
        LIMIT 500
      `).all();

      const allDestinations = destinationRows.results || [];
      const destinations = allDestinations.filter((destination) => countryToSlug(destination.country) === countryToSlug(countrySlug));
      if (!destinations.length) return okHtml(renderNotFound(countrySlug), { status: 404, headers: { "cache-control": "no-store" } });

      const countryName = destinations[0].country || countrySlug;
      const destinationSlugs = destinations.map((destination) => String(destination.slug || "")).filter(Boolean);
      const placeholders = destinationSlugs.map(() => "?").join(", ");
      const postRows = placeholders
        ? await env.TRAVEL_DB.prepare(`
            SELECT p.slug, p.title, p.category, p.summary, p.content_type, p.destination_slug, p.updated_at,
                   d.name AS destination_name, d.city AS destination_city, d.country AS destination_country
            FROM posts p
            JOIN destinations d ON d.slug = p.destination_slug
            WHERE p.status = 'published' AND p.destination_slug IN (${placeholders})
            ORDER BY
              d.name COLLATE NOCASE ASC,
              CASE COALESCE(p.content_type, '')
                WHEN 'top5_series' THEN 1
                WHEN 'hotel_roundup' THEN 1
                WHEN 'hotel_intro' THEN 2
                WHEN 'hotel_review' THEN 2
                WHEN 'travel_tip' THEN 3
                WHEN 'guide' THEN 3
                WHEN 'checklist' THEN 3
                ELSE 4
              END,
              p.updated_at DESC
            LIMIT 300
          `).bind(...destinationSlugs).all()
        : { results: [] };

      const posts = postRows.results || [];
      const postsByDestination = groupPostsByDestination(posts);
      const latestUpdatedAt = [...destinations.map((item) => item.updated_at), ...posts.map((item) => item.updated_at)].filter(Boolean).sort().pop() || "";
      const canonical = `${origin}/countries/${encodeURIComponent(countryToSlug(countryName))}`;
      const title = `${countryName} 여행 허브 | Wacky Travel`;
      const description = `${countryName} 주요 도시별 TOP5 시리즈, 개별 호텔 소개, 여행 tip을 한 페이지에서 확인하세요.`;
      const breadcrumbItems = [
        { name: "홈", url: `${origin}/`, href: "/" },
        { name: "여행지", url: `${origin}/destinations/`, href: "/destinations/" },
        { name: countryName, url: canonical, href: canonical }
      ];
      const jsonLdItems = [buildBreadcrumbJsonLd(breadcrumbItems)];

      const html = `<!doctype html>
<html lang="ko">
<head>
  ${renderTravelHead({ title, description, canonical, image: destinations[0].cover_image })}
  ${renderJsonLdScripts(jsonLdItems)}
</head>
<body>
  ${renderSiteHeader({ active: "destinations" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page">
    <section class="travel-hero travel-hero--compact travel-hero--soft container">
      <div class="travel-hero__body">
        <p class="eyebrow">Country Hub</p>
        <h1>${escapeHtml(countryName)} 여행 허브</h1>
        <p class="travel-hero__summary">도시별 호텔 추천, 개별 호텔 소개, 여행 준비 팁을 글 종류별로 나누어 확인할 수 있습니다.</p>
        <div class="travel-hero__chips">
          <span>도시 ${destinations.length}개</span>
          <span>콘텐츠 ${posts.length}개</span>
          ${latestUpdatedAt ? `<span>최근 업데이트: ${escapeHtml(formatDate(latestUpdatedAt))}</span>` : ""}
        </div>
      </div>
    </section>

    <section class="container travel-section">
      <div class="section-heading">
        <p class="eyebrow">Cities</p>
        <h2>${escapeHtml(countryName)} 도시별 바로가기</h2>
        <p>도시 상세 페이지에서는 호텔 목록과 관련 글을 더 좁은 기준으로 확인할 수 있습니다.</p>
      </div>
      <div class="travel-card-grid">
        ${destinations.map(renderDestinationCard).join("")}
      </div>
    </section>

    ${destinations.map((destination) => renderDestinationContentSection(destination, postsByDestination[destination.slug] || [])).join("")}
  </main>
  ${renderFooter()}
</body>
</html>`;
      return okHtml(html, { headers: { "cache-control": "public, max-age=900" } });
    }
  });
}

function countryToSlug(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const alias = COUNTRY_SLUG_ALIASES[raw];
  if (alias) return alias;
  return raw
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function renderDestinationCard(destination) {
  return `<article class="travel-card">
    ${destination.cover_image ? `<a class="travel-card__media" href="/destinations/${encodeURIComponent(destination.slug)}"><img src="${escapeHtml(destination.cover_image)}" alt="${escapeHtml(destination.cover_image_alt || `${destination.name} 대표 이미지`)}" loading="lazy" decoding="async" /></a>` : ""}
    <div class="travel-card__body">
      <div class="travel-card__meta">${escapeHtml([destination.country, destination.city].filter(Boolean).join(" · "))}</div>
      <h3><a href="/destinations/${encodeURIComponent(destination.slug)}">${escapeHtml(destination.title || destination.name)}</a></h3>
      <p>${escapeHtml(destination.summary || "도시별 호텔과 여행 정보를 확인하세요.")}</p>
      <a class="text-link" href="/destinations/${encodeURIComponent(destination.slug)}">도시 페이지 보기</a>
    </div>
  </article>`;
}

function groupPostsByDestination(posts = []) {
  return posts.reduce((acc, post) => {
    const destinationSlug = String(post.destination_slug || "").trim();
    if (!destinationSlug) return acc;
    if (!acc[destinationSlug]) acc[destinationSlug] = [];
    acc[destinationSlug].push(post);
    return acc;
  }, {});
}

function groupPostsByContentType(posts = []) {
  const groups = { top5_series: [], hotel_intro: [], travel_tip: [] };
  posts.forEach((post) => {
    const type = normalizeContentType(post.content_type);
    if (!groups[type]) groups[type] = [];
    groups[type].push(post);
  });
  return groups;
}

function renderDestinationContentSection(destination, posts) {
  const groups = groupPostsByContentType(posts);
  return `<section class="container travel-section">
    <div class="section-heading section-heading--split">
      <div>
        <p class="eyebrow">${escapeHtml(destination.country || "Destination")}</p>
        <h2>${escapeHtml(destination.name)} 섹션</h2>
        <p>${escapeHtml(destination.summary || `${destination.name} 관련 글을 종류별로 정리했습니다.`)}</p>
      </div>
      <a class="btn btn--brand" href="/destinations/${encodeURIComponent(destination.slug)}">${escapeHtml(destination.name)} 상세 보기</a>
    </div>
    <div class="travel-content-sections">
      ${renderPostSections(destination, groups)}
    </div>
  </section>`;
}

function renderPostSections(destination, groups) {
  const sections = [
    {
      key: "top5_series",
      eyebrow: "TOP5 Series",
      title: `${destination.name} TOP5 시리즈`,
      description: "여행 목적별로 빠르게 비교할 수 있는 추천형 글입니다.",
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
    return `<section class="travel-content-section" aria-labelledby="country-${destination.slug}-${section.key}-heading">
      <div class="travel-content-section__head">
        <div>
          <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
          <h3 id="country-${destination.slug}-${section.key}-heading">${escapeHtml(section.title)}</h3>
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
      <h4><a href="/post/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h4>
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
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>나라 페이지를 찾을 수 없습니다</title></head><body><h1>나라 페이지를 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
