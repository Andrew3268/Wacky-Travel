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
    <header class="topbar topbar--editorial topbar--travel">
      <div class="topbar__inner container">
        <a class="brand" href="/" aria-label="Wacky Travel 홈">
          <span class="brand__mark">WT</span>
          <span class="brand__text">Wacky Travel</span>
        </a>
        <div class="topbar__actions topbar__actions--travel">
          <a class="btn btn--ghost topbar__admin" href="/admin/">관리</a>
          <a class="btn btn--ghost topbar__dashboard" href="/admin/dashboard.html" data-admin-link hidden>대시보드</a>
          <button class="topbar__logout" type="button" data-admin-logout hidden>로그아웃</button>
        </div>
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
    <link rel="stylesheet" href="/assets/css/travel.css?v=20260720BreadcrumbResponsiveV1" />
    <script src="/assets/js/admin-ui.js?v=20260516logout1" defer></script>
    <script src="/assets/js/nav.js?v=20260509travel4" defer></script>
    <script src="/assets/js/site-search.js?v=20260509travel4" defer></script>
    <script src="/assets/js/post-admin-actions.js?v=20260516admin1" defer></script>
  `;
}

export function renderJsonLdScripts(items = []) {
  return items.filter(Boolean).map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n");
}
