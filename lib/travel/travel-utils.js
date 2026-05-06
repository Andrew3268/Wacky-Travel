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

export function renderSiteHeader({ active = "" } = {}) {
  const nav = [
    ["/", "홈", "home"],
    ["/destinations/", "여행지", "destinations"],
    ["/hotels/", "호텔", "hotels"],
    ["/?category=여행%20준비", "여행 준비", "prepare"]
  ];
  return `
    <header class="topbar topbar--editorial topbar--travel">
      <div class="topbar__inner container">
        <a class="brand" href="/" aria-label="Wacky Travel 홈">
          <span class="brand__mark">WT</span>
          <span class="brand__text">Wacky Travel</span>
        </a>
        <nav class="topbar__nav" aria-label="주요 메뉴">
          ${nav.map(([href, label, key]) => `<a class="topbar__link ${active === key ? "is-active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}
        </nav>
        <button class="site-search-toggle" type="button" data-site-search-open aria-label="검색 열기">검색</button>
      </div>
    </header>
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
    return `<li>${isLast ? `<span>${escapeHtml(item.name)}</span>` : `<a href="${escapeHtml(item.href || item.url || "#")}">${escapeHtml(item.name)}</a>`}</li>`;
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
    <link rel="stylesheet" href="/assets/css/app.css?v=20260506travel2" />
    <link rel="stylesheet" href="/assets/css/components.css?v=20260506travel2" />
    <link rel="stylesheet" href="/assets/css/travel.css?v=20260506travel2" />
    <script src="/assets/js/admin-ui.js" defer></script>
    <script src="/assets/js/nav.js?v=20260506travel2" defer></script>
    <script src="/assets/js/site-search.js?v=20260506travel2" defer></script>
  `;
}

export function renderJsonLdScripts(items = []) {
  return items.filter(Boolean).map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n");
}
