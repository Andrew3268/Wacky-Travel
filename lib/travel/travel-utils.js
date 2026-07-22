import { escapeHtml } from "../../functions/_utils.js";

export function safeJsonArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export function renderSiteHeader() {
  return `
    <header class="topbar topbar--editorial topbar--travel" data-site-header="main">
      <div class="topbar__inner container">
        <a class="brand" href="/" aria-label="Wacky Travel 홈">
          <span class="brand__mark">WT</span>
          <span class="brand__text">Wacky Travel</span>
        </a>
        <button class="topbar-search-button" id="homeSearchOpenBtn" type="button" aria-label="검색 열기" aria-controls="homeSearchOverlay" aria-expanded="false">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.4"></circle><path d="m16 16 4.5 4.5"></path></svg>
        </button>
      </div>
    </header>
    <section class="home-search-overlay" id="homeSearchOverlay" data-site-search-overlay="main" hidden aria-hidden="true">
      <div class="home-search-overlay__backdrop" data-home-search-close></div>
      <div class="home-search-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="homeSearchOverlayTitle">
        <div class="home-search-overlay__bar">
          <button class="home-search-overlay__close" type="button" aria-label="검색 닫기" data-home-search-close>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24"><path d="M6 6l12 12"></path><path d="M18 6L6 18"></path></svg>
          </button>
          <form class="home-search-overlay__form" id="homeFullscreenSearchForm" action="/search/" method="get" role="search" autocomplete="off">
            <span class="home-search-overlay__icon" aria-hidden="true"><svg focusable="false" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.4"></circle><path d="m16 16 4.5 4.5"></path></svg></span>
            <input id="homeFullscreenSearchInput" name="q" type="search" aria-label="여행지 또는 호텔 검색어 입력" placeholder="도시, 호텔명, 숙소 위치를 검색해보세요" />
            <button class="home-search-overlay__submit" type="submit">검색</button>
          </form>
        </div>
        <div class="home-search-overlay__content">
          <p class="home-search-overlay__eyebrow">Search</p>
          <h2 id="homeSearchOverlayTitle">어디로 떠나시나요?</h2>
          <p class="home-search-overlay__desc">도시명, 호텔명, 숙소 위치 키워드를 입력하면 관련 가이드를 바로 찾을 수 있습니다.</p>
          <div class="home-search-overlay__quick" aria-label="추천 검색어">
            <button type="button" data-home-search-query="오사카 난바 호텔">오사카 난바 호텔</button>
            <button type="button" data-home-search-query="후쿠오카 하카타 숙소">후쿠오카 하카타 숙소</button>
            <button type="button" data-home-search-query="다낭 미케비치 호텔">다낭 미케비치 호텔</button>
            <button type="button" data-home-search-query="타이베이 시먼딩 숙소">타이베이 시먼딩 숙소</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer container">
      <div class="footer__inner">
        <div>© 2026 Wacky Travel</div>
        <div class="footer__note">예약 전 가격, 취소 조건, 세금 포함 여부를 다시 확인하세요.</div>
      </div>
    </footer>
  `;
}

export function renderBreadcrumbs(items = []) {
  return `<nav class="breadcrumbs container" aria-label="현재 위치"><ol>${items.map((item, index) => {
    const isLast = index === items.length - 1;
    const label = isLast ? `<span aria-current="page">${escapeHtml(item.name)}</span>` : `<a href="${escapeHtml(item.href || item.url || "#")}">${escapeHtml(item.name)}</a>`;
    const separator = isLast ? "" : `<span class="breadcrumbs__separator" aria-hidden="true">›</span>`;
    return `<li>${label}${separator}</li>`;
  }).join("")}</ol></nav>`;
}

export function renderTravelHead({ title, description, canonical, image }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description || "여행지 정보와 호텔 선택 기준을 빠르게 정리합니다.");
  const safeCanonical = escapeHtml(canonical);
  const safeImage = escapeHtml(image || "/assets/images/logo.png");
  return `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${safeCanonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Wacky Travel" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:url" content="${safeCanonical}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:locale" content="ko_KR" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="stylesheet" href="/assets/css/app.css?v=20260606v18" />
    <link rel="stylesheet" href="/assets/css/components.css?v=20260606v18" />
    <link rel="stylesheet" href="/assets/css/travel.css?v=20260721HeaderCleanupV2" />
    <link rel="stylesheet" href="/assets/css/site-header.css?v=20260721-main-header-clean-v2" />
    <script src="/assets/js/admin-ui.js?v=20260721NoHeaderLogoutV2" defer></script>
    <script src="/assets/js/nav.js?v=20260509travel4" defer></script>
    <script src="/assets/js/site-search.js?v=20260509travel4" defer></script>
    <script src="/assets/js/post-admin-actions.js?v=20260516admin1" defer></script>
    <script src="/assets/js/site-header.js?v=20260721-main-header-clean-v2" defer></script>
  `;
}

export function renderJsonLdScripts(items = []) {
  return items.filter(Boolean).map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n");
}
