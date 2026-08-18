import fs from 'node:fs';
import path from 'node:path';
import { purposePageConfig } from '../src/purpose-pages/config.mjs';

const root = process.cwd();
const destinationsRoot = path.join(root, 'public', 'destinations');
const dataRoot = path.join(root, 'src', 'purpose-pages', 'data');
const pageTypes = ['first-trip', 'value-hotel', 'near-trip', 'family-trip', 'quiet-stay'];
const errors = [];

const cities = fs.readdirSync(dataRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (cities.length !== 15) {
  errors.push(`Expected 15 purpose-page city data directories, found ${cities.length}`);
}

const commonSequence = {
  'first-trip': [
    'wt-page-hero',
    'wt-section wt-purpose-area-choice wt-area-choice--unified',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-section--soft wt-section--survey-cta',
    'wt-section wt-section--soft wt-purpose-before-booking',
    'wt-section wt-purpose-hotels',
    'wt-section wt-purpose-other-choices',
    'wt-section wt-section--compact wt-purpose-faq',
  ],
  'value-hotel': [
    'wt-page-hero',
    'wt-section wt-purpose-area-choice wt-area-choice--unified',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-section--soft wt-section--survey-cta',
    'wt-section wt-section--soft wt-purpose-before-booking',
    'wt-section wt-purpose-hotels',
    'wt-section wt-purpose-other-choices',
    'wt-section wt-section--compact wt-purpose-faq',
  ],
  'near-trip': [
    'wt-page-hero',
    'wt-section wt-purpose-area-choice wt-area-choice--unified',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-section--soft wt-section--survey-cta',
    'wt-section wt-section--soft wt-purpose-before-booking',
    'wt-section wt-purpose-hotels',
    'wt-section wt-purpose-other-choices',
    'wt-section wt-section--compact wt-purpose-faq',
  ],
  'family-trip': [
    'wt-page-hero',
    'wt-section wt-purpose-area-choice wt-area-choice--unified',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-purpose-reason-section',
    'wt-section wt-section--soft wt-section--survey-cta',
    'wt-section wt-section--soft wt-purpose-before-booking',
    'wt-section wt-purpose-hotels',
    'wt-section wt-purpose-other-choices',
    'wt-section wt-section--compact wt-purpose-faq',
  ],
  'quiet-stay': [
    'wt-page-hero',
    'wt-section wt-purpose-area-choice wt-area-choice--unified',
    'wt-section wt-purpose-reason-section wt-section--soft',
    'wt-section wt-purpose-reason-section',
    'wt-section wt-section--soft wt-section--survey-cta',
    'wt-section wt-section--soft wt-purpose-before-booking',
    'wt-section wt-purpose-hotels',
    'wt-section wt-purpose-other-choices',
    'wt-section wt-section--compact wt-purpose-faq',
  ],
};

const forbiddenMarkers = [
  'wt-purpose-page--fukuoka-unified',
  'wt-purpose-page--fukuoka-first-trip',
  'wt-fukuoka-area-choice-editorial',
  'wt-fukuoka-before-booking-editorial',
  'wt-first-area-choice',
  'wt-value-area-choice',
  'wt-near-area-choice',
  'wt-family-area-choice',
  'wt-quiet-area-choice',
  'wt-firsttrip-before-booking',
  'wt-firsttrip-other-choices',
];

let pageCount = 0;

for (const city of cities) {
  const cityDataFile = path.join(dataRoot, city, 'city.json');
  if (!fs.existsSync(cityDataFile)) {
    errors.push(`Missing city data: ${path.relative(root, cityDataFile)}`);
    continue;
  }

  for (const pageType of pageTypes) {
    const dataFile = path.join(dataRoot, city, `${pageType}.json`);
    const pageFile = path.join(destinationsRoot, city, pageType, 'index.html');
    const relative = path.relative(root, pageFile);

    if (!fs.existsSync(dataFile)) {
      errors.push(`Missing page data: ${path.relative(root, dataFile)}`);
      continue;
    }
    if (!fs.existsSync(pageFile)) {
      errors.push(`Missing generated page: ${relative}`);
      continue;
    }

    pageCount += 1;
    const cityData = JSON.parse(fs.readFileSync(cityDataFile, 'utf8'));
    const pageData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const html = fs.readFileSync(pageFile, 'utf8');

    if ('assetsVersion' in cityData || 'stylesheetPaths' in cityData) {
      errors.push(`${path.relative(root, cityDataFile)}: shared asset config must live in src/purpose-pages/config.mjs`);
    }

    if (pageData.purpose !== pageType) {
      errors.push(`${path.relative(root, dataFile)}: purpose mismatch (${pageData.purpose})`);
    }

    const expectedMain = `class="travel-page wt-purpose-page wt-purpose-page--${pageType} wt-purpose-page--unified" data-city="${city}" data-purpose="${pageType}" data-purpose-template="unified-v2"`;
    if (!html.includes(expectedMain)) {
      errors.push(`${relative}: unified main attributes mismatch`);
    }

    const mainBody = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
    const sectionClasses = [...mainBody.matchAll(/<section\b([^>]*)>/gi)].map((match) => {
      const classValue = match[1].match(/\bclass="([^"]*)"/i)?.[1] || '';
      return classValue.trim();
    });

    const expectedSequence = commonSequence[pageType];
    if (JSON.stringify(sectionClasses) !== JSON.stringify(expectedSequence)) {
      errors.push(`${relative}: common section structure mismatch\n  expected: ${expectedSequence.join(' | ')}\n  actual:   ${sectionClasses.join(' | ')}`);
    }

    for (const marker of [
      'class="wt-choice-main wt-choice-main--unified"',
      'class="wt-check-grid wt-check-grid--rich wt-check-grid--readable"',
      'class="wt-hotel-grid wt-purpose-hotel-card-grid"',
      'class="wt-firsttrip-choice-list"',
      'class="wt-city-faq__accordion"',
    ]) {
      if (!html.includes(marker)) errors.push(`${relative}: missing ${marker}`);
    }

    for (const marker of forbiddenMarkers) {
      if (html.includes(marker)) errors.push(`${relative}: obsolete class remains (${marker})`);
    }

    if (/<style\b[^>]*>/i.test(html)) errors.push(`${relative}: inline style tag remains`);
    if ((html.match(/<main\b/gi) || []).length !== 1) errors.push(`${relative}: main count must be 1`);
    if ((html.match(/<section\b[^>]*id="area-compare"/gi) || []).length !== 1) errors.push(`${relative}: area-compare count must be 1`);
    const choiceCards = [...html.matchAll(/<article\b[^>]*class="wt-choice-card"[^>]*>([\s\S]*?)<\/article>/gi)];
    if (choiceCards.length !== 2) {
      errors.push(`${relative}: choice card count must be 2`);
    } else {
      for (const [index, match] of choiceCards.entries()) {
        const card = match[1];
        const markers = [
          'wt-choice-card__label',
          '<h3',
          'wt-choice-card__lead',
          'wt-choice-card__chips',
          'wt-choice-card__line',
        ];
        const positions = markers.map((marker) => card.indexOf(marker));
        if (positions.some((position) => position < 0) || positions.some((position, markerIndex) => markerIndex > 0 && position <= positions[markerIndex - 1])) {
          errors.push(`${relative}: choice card structure/order mismatch (card ${index + 1})`);
        }
      }
    }

    const purposeStylesheetVersion = purposePageConfig.stylesheetVersions?.['/assets/css/travel-purpose.css'] || purposePageConfig.assetsVersion;
    const purposeStylesheet = `/assets/css/travel-purpose.css?v=${purposeStylesheetVersion}`;
    if (!html.includes(purposeStylesheet)) {
      errors.push(`${relative}: current purpose stylesheet version missing (${purposeStylesheet})`);
    }
  }
}

if (pageCount !== 75) {
  errors.push(`Expected 75 generated purpose pages, found ${pageCount}`);
}

const cssPath = path.join(root, 'public', 'assets', 'css', 'travel-purpose.css');
const css = fs.readFileSync(cssPath, 'utf8');
const cssBytes = Buffer.byteLength(css);
const purposeHeadingRule = css.match(/body\.travel-purpose-body \.wt-section-title,\s*body\.travel-purpose-body \.wt-purpose-page \.wt-section-title,\s*body\.travel-purpose-body \.wt-cta-band h2\s*\{([\s\S]*?)\}/)?.[1] || '';
if (!purposeHeadingRule) {
  errors.push('Purpose section-title/CTA H2 rule missing');
} else {
  if (/font-weight\s*:/.test(purposeHeadingRule)) errors.push('Purpose section-title/CTA H2 rule must not declare font-weight');
  if (!/font-size\s*:\s*30px/.test(purposeHeadingRule)) errors.push('Purpose section-title/CTA H2 desktop size must be 30px');
}

if (!/@media \(min-width: 768px\)\s*\{[\s\S]*?body\.travel-purpose-body h2\s*\{[\s\S]*?font-size\s*:\s*30px !important;[\s\S]*?\}[\s\S]*?\}/.test(css)) {
  errors.push('Purpose desktop H2 30px unification rule missing');
}


for (const marker of [
  'Unified destination purpose choice layout — Fukuoka first-trip reference',
  '.wt-area-choice--unified .wt-choice-main--unified',
  'grid-template-columns: repeat(2, minmax(0, 1fr)) !important;',
  'border-top: 1px solid #111 !important;',
  'border-bottom: 1px solid #d7d7d2 !important;',
  'grid-template-areas:',
  'font-size: 30px !important;',
  '@media (max-width: 760px)',
  '.wt-purpose-before-booking .wt-check-grid',
  '.wt-purpose-other-choices',
]) {
  if (!css.includes(marker)) errors.push(`Common purpose CSS marker missing: ${marker}`);
}

for (const marker of forbiddenMarkers.slice(0, 9)) {
  if (css.includes(marker)) errors.push(`Obsolete purpose CSS selector remains: ${marker}`);
}

const obsoletePurposeCssClasses = ["wt-area-card", "wt-area-card--decision", "wt-area-card__label", "wt-area-card__lead", "wt-area-card__note", "wt-area-card__note--caution", "wt-area-grid", "wt-area-tab-button", "wt-area-tab-input", "wt-area-tab-list", "wt-area-tab-panel", "wt-area-tab-panel__details", "wt-area-tab-panels", "wt-badge", "wt-badge--rating", "wt-badge--star", "wt-badge-list", "wt-btn", "wt-btn--ghost", "wt-btn--primary", "wt-eyebrow", "wt-firsttrip-guide", "wt-firsttrip-guide-list", "wt-firsttrip-guide__arrow", "wt-firsttrip-guide__content", "wt-firsttrip-related-guides", "wt-hero-actions", "wt-hotel-actions", "wt-hotel-card", "wt-hotel-card__body", "wt-hotel-card__fit", "wt-hotel-card__image", "wt-hotel-card__label", "wt-hotel-card__meta-list", "wt-hotel-card__point", "wt-hotel-card__score-list", "wt-hotel-card__stars", "wt-hotel-card__subname", "wt-hotel-card__topline", "wt-hotel-more-banner", "wt-hotel-price", "wt-link-card", "wt-link-grid", "wt-link-grid--purpose", "wt-mobile-heading-noop-a", "wt-mobile-heading-noop-b", "wt-mobile-heading-noop-c", "wt-mobile-heading-noop-d", "wt-purpose-quick-card", "wt-purpose-quick-grid", "wt-purpose-quick-grid--compact", "wt-section--faq", "wt-section--first-answer", "wt-section--practical", "wt-tag", "wtsr-page"];
for (const className of obsoletePurposeCssClasses) {
  const classPattern = new RegExp(`\\.${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`);
  if (classPattern.test(css)) errors.push(`Unused legacy purpose CSS class remains: ${className}`);
}

if (cssBytes > 70000) {
  errors.push(`travel-purpose.css grew beyond the cleaned unified limit: ${cssBytes} bytes`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Unified purpose page template check passed (${pageCount} pages, ${cities.length} cities, CSS ${cssBytes} bytes).`);
