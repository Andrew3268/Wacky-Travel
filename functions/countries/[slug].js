import { escapeHtml, okHtml, edgeCache } from "../_utils.js";
import { buildBreadcrumbJsonLd } from "../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, formatDate } from "../../lib/travel/travel-utils.js";
import { ensureTravelSettingsTables, getActiveContentTypes, normalizeContentType, labelContentType, normalizeText } from "../../lib/travel/travel-settings.js";

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

  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const [destinationVersionRow, postVersionRow] = await Promise.all([
    env.TRAVEL_DB.prepare(`SELECT COALESCE(MAX(updated_at), '') AS version FROM destinations`).first(),
    env.TRAVEL_DB.prepare(`SELECT COALESCE(MAX(updated_at), '') AS version FROM posts`).first()
  ]);
  const cacheVersion = encodeURIComponent([destinationVersionRow?.version, postVersionRow?.version].filter(Boolean).join("|") || "initial");
  const cacheKeyUrl = `${origin}/countries/${encodeURIComponent(countrySlug)}?v=country-hub-v9-topbar-cleanup-v15-${cacheVersion}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      await ensureTravelSettingsTables(env.TRAVEL_DB);
      const [destinationRows, contentTypes] = await Promise.all([
        env.TRAVEL_DB.prepare(`
          SELECT slug, name, country, city, title, summary, cover_image, cover_image_alt,
                 card_title, card_description, card_image, card_image_alt, updated_at
          FROM destinations
          WHERE status = 'published' AND COALESCE(is_active, 1) = 1
          ORDER BY country COLLATE NOCASE ASC, COALESCE(sort_order, 0) ASC, name COLLATE NOCASE ASC
          LIMIT 500
        `).all(),
        getActiveContentTypes(env.TRAVEL_DB)
      ]);

      const allDestinations = destinationRows.results || [];
      const destinations = allDestinations.filter((destination) => countryToSlug(destination.country) === countryToSlug(countrySlug));
      if (!destinations.length) return okHtml(renderNotFound(countrySlug), { status: 404, headers: { "cache-control": "no-store" } });

      const countryName = destinations[0].country || countrySlug;
      const destinationSlugs = destinations.map((destination) => String(destination.slug || "")).filter(Boolean);
      const placeholders = destinationSlugs.map(() => "?").join(", ");
      const postRows = placeholders
        ? await env.TRAVEL_DB.prepare(`
            SELECT p.slug, p.title, p.category, p.summary, p.content_type, p.destination_slug, p.hotel_slug, p.updated_at,
                   d.name AS destination_name, d.city AS destination_city, d.country AS destination_country,
                   h.name AS hotel_name
            FROM posts p
            JOIN destinations d ON d.slug = p.destination_slug
            LEFT JOIN hotels h ON h.slug = p.hotel_slug
            WHERE p.status = 'published' AND p.destination_slug IN (${placeholders})
            ORDER BY p.updated_at DESC, p.published_at DESC
            LIMIT 300
          `).bind(...destinationSlugs).all()
        : { results: [] };

      const posts = postRows.results || [];
      const latestUpdatedAt = [...destinations.map((item) => item.updated_at), ...posts.map((item) => item.updated_at)].filter(Boolean).sort().pop() || "";
      const canonical = `${origin}/countries/${encodeURIComponent(countryToSlug(countryName))}`;
      const title = `${countryName} 여행 허브 | Wacky Travel`;
      const description = `${countryName} 주요 도시별 여행 콘텐츠를 글 종류별로 한 페이지에서 확인하세요.`;
      const breadcrumbItems = [
        { name: "홈", url: `${origin}/`, href: "/" },
        { name: "여행지", url: `${origin}/destinations/`, href: "/destinations/" },
        { name: countryName, url: canonical, href: canonical }
      ];
      const jsonLdItems = [buildBreadcrumbJsonLd(breadcrumbItems)];
      const countryContentHubHtml = renderCountryContentHub(countryName, posts, contentTypes);

      const html = `<!doctype html>
<html lang="ko">
<head>
  ${renderTravelHead({ title, description, canonical, image: destinations[0].cover_image })}
  ${renderJsonLdScripts(jsonLdItems)}
  <noscript><style>.travel-page--country-hub.is-loading .country-page-content{display:block!important}.travel-page--country-hub.is-loading .country-page-skeleton{display:none!important}</style></noscript>
</head>
<body>
  ${renderSiteHeader({ active: "destinations" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page travel-page--country-hub is-loading" data-country-hub-page>
    <section class="container travel-section travel-section--country-cities">
      <div class="section-heading">
        <p class="eyebrow">Cities</p>
        <h1>${escapeHtml(countryName)}에서 어디로 떠나시나요?</h1>
        <p>도시마다 다른 분위기와 여행 동선을 살펴보며, 마음이 가는 여행지의 호텔 추천 글과 준비 팁을 천천히 확인해보세요.</p>
      </div>
      ${renderCountryCitySkeleton(destinations.length)}
      <div class="country-page-content country-page-content--cities" aria-live="polite" aria-busy="true">
        <div class="travel-card-grid">
          ${destinations.map(renderDestinationCard).join("")}
        </div>
      </div>
    </section>

    ${countryContentHubHtml ? `${renderCountryPostSkeleton()}<div class="country-page-content country-page-content--posts">${countryContentHubHtml}</div>` : ""}
  </main>
  ${renderCountryLoadingScript()}
  ${renderFooter()}
</body>
</html>`;
      return okHtml(html, { headers: { "cache-control": "public, max-age=0, s-maxage=900" } });
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
  const href = `/destinations/${encodeURIComponent(destination.slug)}`;
  const image = getDestinationCardImage(destination);
  return `<article class="travel-card travel-card--clickable">
    <a class="travel-card__full-link" href="${href}" aria-label="${escapeHtml(`${getDestinationCardTitle(destination)} 도시 페이지 보기`)}">
      ${image ? `<span class="travel-card__media"><img src="${escapeHtml(image)}" alt="${escapeHtml(getDestinationCardImageAlt(destination))}" loading="lazy" decoding="async" /></span>` : ""}
      <span class="travel-card__body">
        <span class="travel-card__meta">${escapeHtml([destination.country, destination.city].filter(Boolean).join(" · "))}</span>
        <span class="travel-card__title">${escapeHtml(getDestinationCardTitle(destination))}</span>
        <span class="travel-card__description">${escapeHtml(getDestinationCardDescription(destination))}</span>
        <span class="text-link">도시 페이지 보기</span>
      </span>
    </a>
  </article>`;
}

function renderCountryCitySkeleton(count = 3) {
  const skeletonCount = Math.min(6, Math.max(3, Number(count || 0)));
  const card = () => `<article class="country-page-skeleton-card country-page-skeleton-card--city">
    <span class="country-page-skeleton__media"></span>
    <span class="country-page-skeleton__body">
      <span class="country-page-skeleton__line country-page-skeleton__line--meta"></span>
      <span class="country-page-skeleton__line country-page-skeleton__line--title"></span>
      <span class="country-page-skeleton__line country-page-skeleton__line--text"></span>
      <span class="country-page-skeleton__line country-page-skeleton__line--text short"></span>
      <span class="country-page-skeleton__button"></span>
    </span>
  </article>`;

  return `<div class="country-page-skeleton country-page-skeleton--cities" aria-hidden="true">${Array.from({ length: skeletonCount }, card).join("")}</div>`;
}

function renderCountryPostSkeleton() {
  const section = () => `<section class="country-page-skeleton-post-section">
    <span class="country-page-skeleton__line country-page-skeleton__line--meta"></span>
    <span class="country-page-skeleton__line country-page-skeleton__line--heading"></span>
    <span class="country-page-skeleton__line country-page-skeleton__line--text"></span>
    <div class="country-page-skeleton-post-list">
      <span class="country-page-skeleton-post-row"></span>
      <span class="country-page-skeleton-post-row"></span>
      <span class="country-page-skeleton-post-row"></span>
    </div>
  </section>`;

  return `<div class="container travel-section country-page-skeleton country-page-skeleton--posts" aria-hidden="true">
    <div class="country-page-skeleton-heading">
      <span class="country-page-skeleton__line country-page-skeleton__line--meta"></span>
      <span class="country-page-skeleton__line country-page-skeleton__line--hero-title"></span>
      <span class="country-page-skeleton__line country-page-skeleton__line--text"></span>
    </div>
    <div class="country-page-skeleton-post-grid">
      ${Array.from({ length: 3 }, section).join("")}
    </div>
  </div>`;
}

function renderCountryLoadingScript() {
  return `<script>(function(){var page=document.querySelector('[data-country-hub-page]');if(!page)return;var done=false;function finish(){if(done)return;done=true;page.classList.remove('is-loading');var contents=page.querySelectorAll('.country-page-content[aria-busy]');contents.forEach(function(el){el.setAttribute('aria-busy','false');});}if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){requestAnimationFrame(function(){requestAnimationFrame(finish);});},{once:true});}else{requestAnimationFrame(function(){requestAnimationFrame(finish);});}setTimeout(finish,900);})();</script>`;
}

function getDestinationCardTitle(destination) {
  return normalizeText(destination.card_title) || normalizeText(destination.city) || normalizeText(destination.name) || normalizeText(destination.title) || "여행지";
}

function getDestinationCardDescription(destination) {
  return normalizeText(destination.card_description) || normalizeText(destination.summary) || "도시별 호텔과 여행 정보를 확인하세요.";
}

function getDestinationCardImage(destination) {
  return normalizeText(destination.card_image) || normalizeText(destination.cover_image) || "";
}

function getDestinationCardImageAlt(destination) {
  return normalizeText(destination.card_image_alt) || normalizeText(destination.cover_image_alt) || `${getDestinationCardTitle(destination)} 대표 이미지`;
}

function renderCountryContentHub(countryName, posts = [], contentTypes = []) {
  const groups = groupCountryPostsByContentSection(posts);
  const sections = [
    {
      key: "top5_series",
      eyebrow: "여행 스타일별 호텔 추천",
      title: "여행 스타일별 호텔 추천",
      description: `${countryName}에서 먼저 살펴보기 좋은 추천 리스트와 비교형 콘텐츠를 모았습니다.`,
      limit: 5
    },
    {
      key: "hotel_intro",
      eyebrow: "Hotels",
      title: "추천 호텔 리뷰",
      description: "호텔 위치, 객실 분위기, 숙소 선택 포인트를 자세히 정리한 글입니다.",
      limit: 5
    },
    {
      key: "travel_tip",
      eyebrow: "Travel Tips",
      title: "여행이 쉬워지는 작은 팁",
      description: "일정, 교통, 준비물처럼 여행 전에 함께 확인하면 좋은 정보를 모았습니다.",
      limit: 5
    }
  ];

  const visibleSections = sections
    .map((section) => ({ ...section, items: groups[section.key] || [] }))
    .filter((section) => section.items.length > 0);

  if (!visibleSections.length) return "";

  return `<section class="container travel-section travel-section--country-posts">
    <div class="section-heading">
      <p class="eyebrow">Latest Posts</p>
      <h2>최근 업데이트된 ${escapeHtml(countryName)} 여행 관련 글</h2>
      <p>호텔을 고르기 전 확인하면 좋은 숙소 추천 글부터, 여행이 쉬워지는 작은 팁까지 ${escapeHtml(countryName)} 여행 준비에 도움이 되는 글을 모았습니다.</p>
    </div>
    <div class="travel-content-sections travel-content-sections--country">
      ${visibleSections.map((section) => renderCountryPostSection(countryName, section, section.items, contentTypes)).join("")}
    </div>
  </section>`;
}

function groupCountryPostsByContentSection(posts = []) {
  const groups = {
    top5_series: [],
    hotel_intro: [],
    travel_tip: []
  };

  posts.forEach((post) => {
    const key = inferCountryPostSectionKey(post);
    groups[key].push(post);
  });

  return groups;
}

function inferCountryPostSectionKey(post) {
  const rawType = normalizeText(post.content_type).toLowerCase();
  const type = normalizeContentType(post.content_type);
  const text = [post.title, post.category, post.summary, post.hotel_name, post.destination_name, post.destination_city]
    .map((value) => normalizeText(value).toLowerCase())
    .filter(Boolean)
    .join(" ");

  if (type === "top5_series" || /top\s*5|top5|top\s*\d+|베스트\s*\d+|추천\s*\d+|순위|랭킹/.test(rawType) || /top\s*5|top5|top\s*\d+|베스트\s*\d+|추천\s*\d+|순위|랭킹/.test(text)) {
    return "top5_series";
  }

  if (type === "hotel_intro" || normalizeText(post.hotel_slug) || /호텔|숙소|리조트|료칸|스테이|hotel|resort|ryokan/.test(rawType) || /호텔|숙소|리조트|료칸|스테이|hotel|resort|ryokan/.test(text)) {
    return "hotel_intro";
  }

  return "travel_tip";
}

function renderCountryPostSection(countryName, section, items = [], contentTypes = []) {
  const visibleItems = items.slice(0, section.limit || 5);
  if (!visibleItems.length) return "";

  return `<section class="travel-content-section" aria-labelledby="country-${section.key}-heading">
    <div class="travel-content-section__head">
      <div>
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h3 id="country-${section.key}-heading">${escapeHtml(section.title)}</h3>
        <p>${escapeHtml(section.description)}</p>
      </div>
    </div>
    <div class="travel-list">
      ${visibleItems.map((post) => renderPostItem(post, contentTypes)).join("")}
    </div>
  </section>`;
}

function renderPostItem(post) {
  const slug = String(post.slug || "");
  const href = `/post/${encodeURIComponent(slug)}`;
  const meta = [post.destination_city || post.destination_name, formatDate(post.updated_at)].filter(Boolean).join(" · ");
  return `<article class="travel-list__item">
    <a class="travel-list__link" href="${href}" aria-label="${escapeHtml(`${post.title || "여행 글"} 읽기`)}">
      <div class="travel-list__content">
        <h4>${escapeHtml(post.title)}</h4>
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

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>나라 페이지를 찾을 수 없습니다</title></head><body><h1>나라 페이지를 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
