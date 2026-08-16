import { purposePageConfig } from './config.mjs';

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const escapeJsonForHtml = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

function attrs(values = {}) {
  return Object.entries(values)
    .filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false)
    .map(([key, value]) => value === true ? key : `${key}="${escapeHtml(value)}"`)
    .join(' ');
}

function renderHead(city, page) {
  const { head } = page;
  const styles = purposePageConfig.stylesheetPaths
    .map((href) => `<link href="${escapeHtml(href)}?v=${escapeHtml(purposePageConfig.assetsVersion)}" rel="stylesheet"/>`)
    .join('\n');
  const schemas = head.structuredData
    .map((schema) => `<script type="application/ld+json">${escapeJsonForHtml(schema)}</script>`)
    .join('\n');

  return `<head>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta charset="utf-8"/>
<title>${escapeHtml(head.title)}</title>
<link href="/favicon.ico?v=20260817-brand-v1" rel="icon" sizes="any"/>
${styles}
${schemas}
<meta content="${escapeHtml(head.description)}" name="description"/>
<meta content="${escapeHtml(head.robots)}" name="robots"/>
<meta content="${escapeHtml(head.themeColor)}" name="theme-color"/>
<link href="${escapeHtml(head.canonical)}" rel="canonical"/>
<meta content="${escapeHtml(head.og.type)}" property="og:type"/>
<meta content="${escapeHtml(head.og.siteName)}" property="og:site_name"/>
<meta content="${escapeHtml(head.og.title)}" property="og:title"/>
<meta content="${escapeHtml(head.og.description)}" property="og:description"/>
<meta content="${escapeHtml(head.og.url)}" property="og:url"/>
<meta content="${escapeHtml(head.og.image)}" property="og:image"/>
<meta content="${escapeHtml(head.og.imageWidth)}" property="og:image:width"/>
<meta content="${escapeHtml(head.og.imageHeight)}" property="og:image:height"/>
<meta content="${escapeHtml(head.og.imageAlt)}" property="og:image:alt"/>
<meta content="${escapeHtml(head.og.locale)}" property="og:locale"/>
<meta content="${escapeHtml(head.twitter.card)}" name="twitter:card"/>
<meta content="${escapeHtml(head.twitter.title)}" name="twitter:title"/>
<meta content="${escapeHtml(head.twitter.description)}" name="twitter:description"/>
<meta content="${escapeHtml(head.twitter.image)}" name="twitter:image"/>
<meta content="${escapeHtml(head.twitter.imageAlt)}" name="twitter:image:alt"/>
<link href="//pix8.agoda.net" rel="dns-prefetch"/>
<link crossorigin="anonymous" href="https://pix8.agoda.net" rel="preconnect"/>
</head>`;
}

function renderSiteHeader() {
  return `<header class="topbar topbar--editorial topbar--travel" data-site-header="main">
  <div class="topbar__inner container">
    <a aria-label="Be Stayable 홈" class="brand" href="/"><span class="brand__mark">BS</span><span class="brand__text">Be Stayable</span></a>
    <button aria-controls="homeSearchOverlay" aria-expanded="false" aria-label="검색 열기" class="topbar-search-button" id="homeSearchOpenBtn" type="button">
      <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="6.4"></circle>
        <path d="m16 16 4.5 4.5"></path>
      </svg>
    </button>
  </div>
</header>
<section aria-hidden="true" class="home-search-overlay" data-site-search-overlay="main" hidden id="homeSearchOverlay">
  <div class="home-search-overlay__backdrop" data-home-search-close></div>
  <div aria-labelledby="homeSearchOverlayTitle" aria-modal="true" class="home-search-overlay__panel" role="dialog">
    <div class="home-search-overlay__bar">
      <button aria-label="검색 닫기" class="home-search-overlay__close" data-home-search-close type="button">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
          <path d="M6 6l12 12"></path>
          <path d="M18 6L6 18"></path>
        </svg>
      </button>
      <form action="/search/" autocomplete="off" class="home-search-overlay__form" id="homeFullscreenSearchForm" method="get" role="search">
        <span aria-hidden="true" class="home-search-overlay__icon">
          <svg focusable="false" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.4"></circle>
            <path d="m16 16 4.5 4.5"></path>
          </svg>
        </span>
        <input aria-label="여행지 또는 호텔 검색어 입력" id="homeFullscreenSearchInput" name="q" placeholder="도시, 호텔명, 숙소 위치를 검색해보세요" type="search" />
        <button class="home-search-overlay__submit" type="submit">검색</button>
      </form>
    </div>
    <div class="home-search-overlay__content">
      <p class="home-search-overlay__eyebrow">Search</p>
      <h2 id="homeSearchOverlayTitle">어디로 떠나시나요?</h2>
      <p class="home-search-overlay__desc">도시명, 호텔명, 숙소 위치 키워드를 입력하면 관련 가이드를 바로 찾을 수 있습니다.</p>
      <div aria-label="추천 검색어" class="home-search-overlay__quick">
        <button data-home-search-query="오사카 난바 호텔" type="button">오사카 난바 호텔</button>
        <button data-home-search-query="후쿠오카 하카타 숙소" type="button">후쿠오카 하카타 숙소</button>
        <button data-home-search-query="다낭 미케비치 호텔" type="button">다낭 미케비치 호텔</button>
        <button data-home-search-query="타이베이 시먼딩 숙소" type="button">타이베이 시먼딩 숙소</button>
      </div>
    </div>
  </div>
</section>`;
}

function renderBreadcrumbs(items) {
  return `<nav aria-label="현재 위치" class="breadcrumbs container">
<ol>
${items.map((item) => {
    if (item.current) return `<li><span aria-current="page">${escapeHtml(item.label)}</span></li>`;
    return `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a><span aria-hidden="true" class="breadcrumbs__separator">›</span></li>`;
  }).join('\n')}
</ol>
</nav>`;
}

function renderHero(hero) {
  return `<section class="wt-page-hero">
<div class="container">
<div class="wt-page-hero__content">
<p class="wt-city-kicker">${escapeHtml(hero.kicker)}</p>
<h1>${escapeHtml(hero.title)}</h1>
<p>${escapeHtml(hero.description)}</p>
</div>
</div>
</section>`;
}

function renderSectionHead(head) {
  return `<div class="wt-section-head">
<div class="wt-section-kicker">${escapeHtml(head.kicker)}</div>
<h2 class="wt-section-title"${head.titleId ? ` id="${escapeHtml(head.titleId)}"` : ''}>${escapeHtml(head.title)}</h2>
${head.description ? `<p class="wt-section-desc">${escapeHtml(head.description)}</p>` : ''}
</div>`;
}

function renderAreaChoice(area) {
  const cards = area.choices.map((choice, index) => `<article class="wt-choice-card" data-choice-index="${index + 1}">
<span class="wt-choice-card__label">${escapeHtml(choice.label)}</span>
<h3>${escapeHtml(choice.title)}</h3>
<p class="wt-choice-card__lead">${escapeHtml(choice.lead)}</p>
<div aria-label="${escapeHtml(choice.chipsAriaLabel)}" class="wt-choice-card__chips">${choice.chips.map((chip) => `<span>${escapeHtml(chip)}</span>`).join('')}</div>
<p class="wt-choice-card__line">${escapeHtml(choice.line)}</p>
</article>`).join('\n');

  return `<section aria-labelledby="${escapeHtml(area.ariaLabelledby)}" class="wt-section wt-purpose-area-choice wt-area-choice--unified" id="area-compare">
<div class="container">
${renderSectionHead(area.head)}
<div aria-label="${escapeHtml(area.ariaLabel)}" class="wt-area-choice-simple">
<div class="wt-choice-main wt-choice-main--unified">
${cards}
</div>
${area.support ? `<p class="wt-choice-support"><strong>${escapeHtml(area.support.title)}</strong>${area.support.description ? ` ${escapeHtml(area.support.description)}` : ''}</p>` : ''}
</div>
</div>
</section>`;
}

function renderReasonSection(section, index, purpose) {
  const cards = section.cards.map((card) => `<article class="wt-reason-card"><span>${escapeHtml(card.number)}</span><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.description)}</p></article>`).join('\n');
  const secondSectionIsSoft = ['first-trip', 'value-hotel', 'near-trip'].includes(purpose);
  const isSoft = index === 0 || secondSectionIsSoft;
  return `<section aria-labelledby="${escapeHtml(section.ariaLabelledby)}" class="wt-section wt-purpose-reason-section${isSoft ? ' wt-section--soft' : ''}" data-reason-index="${index + 1}">
<div class="container">
${renderSectionHead(section.head)}
<div class="wt-reason-grid">
${cards}
</div>
</div>
</section>`;
}

function renderSurvey(survey) {
  return `<section class="wt-section wt-section--soft wt-section--survey-cta">
<div class="container">
<div class="wt-cta-band">
<div>
<p class="wt-city-kicker">${escapeHtml(survey.kicker)}</p>
<h2>${escapeHtml(survey.title)}</h2>
<p>${escapeHtml(survey.description)}</p>
</div>
<a class="wt-city-button wt-city-button--primary" href="${escapeHtml(survey.href)}">${escapeHtml(survey.button)}</a>
</div>
</div>
</section>`;
}

function renderBookingChecks(booking) {
  const items = booking.items.map((item) => `<div class="wt-check-item"><strong>${escapeHtml(item.title)}</strong><span class="wt-check-item__lead">${escapeHtml(item.description)}</span></div>`).join('\n');
  return `<section aria-labelledby="${escapeHtml(booking.ariaLabelledby)}" class="wt-section wt-section--soft wt-purpose-before-booking">
<div class="container">
${renderSectionHead(booking.head)}
<div class="wt-check-grid wt-check-grid--rich wt-check-grid--readable">
${items}
</div>
</div>
</section>`;
}

const starIcon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>`;
const arrowIcon = `<svg aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
const chevronIcon = `<svg aria-hidden="true" class="wt-hotel-more-banner__icon" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 4.5L13 10L7.5 15.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path></svg>`;

function renderHotelCard(card) {
  const imageAttrs = attrs({
    alt: card.image.alt,
    decoding: card.image.decoding,
    fetchpriority: card.image.fetchpriority,
    height: card.image.height,
    loading: card.image.loading,
    src: card.image.src,
    srcset: card.image.srcset,
    width: card.image.width,
  });
  const chips = card.chips.map((chip, index) => `${index ? '<span aria-hidden="true" class="wt-purpose-hotel-card__divider"></span>' : ''}<span class="wt-purpose-hotel-card__chip">${escapeHtml(chip)}</span>`).join('');
  const cardAttrs = attrs({
    'aria-describedby': card.ariaDescribedby,
    class: 'wt-purpose-hotel-card',
    href: card.href,
    rel: card.rel,
    target: card.target,
  });
  const summary = card.summary?.text ? `<p class="wt-sr-only" id="${escapeHtml(card.summary.id)}">${escapeHtml(card.summary.text)}</p>` : '';
  const scoreIcon = card.scoreHasIcon ? starIcon : '';

  return `<a ${cardAttrs}>
<div class="wt-purpose-hotel-card__media">
<img ${imageAttrs}/>
<span class="wt-purpose-hotel-card__badge">${escapeHtml(card.badge)}</span>
</div>
<div class="wt-purpose-hotel-card__content">
<div class="wt-purpose-hotel-card__category-wrap"><span aria-hidden="true" class="wt-purpose-hotel-card__category-line"></span><span class="wt-purpose-hotel-card__category">${escapeHtml(card.nameEn)}</span></div>
<h3 class="wt-purpose-hotel-card__title">${escapeHtml(card.nameKo)}</h3>
<div aria-label="${escapeHtml(card.chipsAriaLabel)}" class="wt-purpose-hotel-card__specs">${chips}</div>
${summary}
</div>
<div class="wt-purpose-hotel-card__footer">
<div class="wt-purpose-hotel-card__rating"><span class="wt-purpose-hotel-card__star-grade">${escapeHtml(card.grade)}</span><span aria-hidden="true" class="wt-purpose-hotel-card__rating-divider">|</span><span class="wt-purpose-hotel-card__score">${scoreIcon}<span>${escapeHtml(card.score)}</span></span></div>
<span class="wt-purpose-hotel-card__cta"><span>${escapeHtml(card.cta)}</span>${arrowIcon}</span>
</div>
</a>`;
}

function renderHotels(hotels) {
  const sectionAttrs = attrs({
    'aria-hidden': hotels.ariaHidden,
    'aria-labelledby': hotels.ariaLabelledby,
    class: 'wt-section wt-purpose-hotels',
    'data-admin-only': hotels.adminOnly,
    hidden: hotels.hidden,
    id: 'hotels',
  });

  return `<section ${sectionAttrs}>
<div class="container">
<div class="wt-hotel-section-head-row">
${renderSectionHead(hotels.head)}
<a class="wt-hotel-more-banner__button" href="${escapeHtml(hotels.more.href)}" rel="${escapeHtml(hotels.more.rel)}">${escapeHtml(hotels.more.text)}${chevronIcon}</a>
</div>
<div class="wt-hotel-grid wt-purpose-hotel-card-grid">
${hotels.cards.map(renderHotelCard).join('\n')}
</div>
</div>
</section>`;
}

function renderOtherChoices(other) {
  const links = other.items.map((item) => `<a class="wt-firsttrip-choice" href="${escapeHtml(item.href)}"><span aria-hidden="true" class="wt-firsttrip-choice__number">${escapeHtml(item.number)}</span><span class="wt-firsttrip-choice__content"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.description)}</span></span><span aria-hidden="true" class="wt-firsttrip-choice__arrow">→</span></a>`).join('\n');

  return `<section aria-labelledby="${escapeHtml(other.ariaLabelledby)}" class="wt-section wt-purpose-other-choices">
<div class="container">
${renderSectionHead(other.head)}
<nav aria-label="${escapeHtml(other.ariaLabel)}" class="wt-firsttrip-choice-list">
${links}
</nav>
</div>
</section>`;
}

function renderFaq(faq) {
  const items = faq.items.map((item) => `<details class="wt-city-faq__item"${item.open ? ' open' : ''}><summary>${escapeHtml(item.question)}<span aria-hidden="true" class="wt-purpose-faq-icon"></span></summary><p>${escapeHtml(item.answer)}</p></details>`).join('\n');

  return `<section aria-labelledby="${escapeHtml(faq.ariaLabelledby)}" class="wt-section wt-section--compact wt-purpose-faq">
<div class="container">
${renderSectionHead(faq.head)}
<div class="wt-city-faq__accordion">
${items}
</div>
</div>
</section>`;
}

function renderFooter() {
  return `<footer class="wtpromo-footer">
<div class="wtpromo-footer__inner wtpromo-container">
<div>
<div class="wtpromo-footer-brand">Be Stayable</div>
<p class="wtpromo-footer-copy">© 2026 Be Stayable. All rights reserved.</p>
</div>
<nav aria-label="하단 메뉴" class="wtpromo-footer-links">
<a href="/about/">소개</a>
<a href="/privacy-policy/">개인정보 처리방침</a>
<a href="/destinations/">여행지</a>
<a href="/search/">검색</a>
</nav>
</div>
</footer>`;
}

function renderBodyScripts(page) {
  const extras = (page.extraScripts || [])
    .map((script) => `<script${script.defer ? ' defer' : ''} src="${escapeHtml(script.src)}"></script>`)
    .join('\n');
  return `${extras ? `${extras}\n` : ''}<script src="/assets/js/admin-ui.js"></script>
<script defer src="/assets/js/site-header.js?v=${escapeHtml(purposePageConfig.siteHeaderScriptVersion)}"></script>`;
}

export function renderPurposePage({ city, page }) {
  return `<!DOCTYPE html>
<html lang="ko">
${renderHead(city, page)}
<body class="travel-purpose-body">
${renderSiteHeader()}
${renderBreadcrumbs(page.breadcrumbs)}
<main class="travel-page wt-purpose-page wt-purpose-page--${escapeHtml(page.purpose)} wt-purpose-page--unified" data-city="${escapeHtml(city.slug)}" data-purpose="${escapeHtml(page.purpose)}" data-purpose-template="unified-v2">
${renderHero(page.hero)}
${renderAreaChoice(page.areaChoice)}
${page.reasons.map((section, index) => renderReasonSection(section, index, page.purpose)).join('\n')}
${renderSurvey(page.survey)}
${renderBookingChecks(page.bookingChecks)}
${renderHotels(page.hotels)}
${renderOtherChoices(page.otherChoices)}
${renderFaq(page.faq)}
</main>
${renderFooter()}
${renderBodyScripts(page)}
</body>
</html>
`;
}
