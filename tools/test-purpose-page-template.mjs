import fs from 'node:fs';
import path from 'node:path';

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
    const pageData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const html = fs.readFileSync(pageFile, 'utf8');

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
    if ((html.match(/<article\b[^>]*class="wt-choice-card"/gi) || []).length !== 2) errors.push(`${relative}: choice card count must be 2`);
  }
}

if (pageCount !== 75) {
  errors.push(`Expected 75 generated purpose pages, found ${pageCount}`);
}

const cssPath = path.join(root, 'public', 'assets', 'css', 'travel-purpose.css');
const css = fs.readFileSync(cssPath, 'utf8');
const cssBytes = Buffer.byteLength(css);

for (const marker of [
  '.wt-area-choice--unified .wt-choice-main--unified',
  '.wt-purpose-before-booking .wt-check-grid',
  '.wt-purpose-other-choices',
]) {
  if (!css.includes(marker)) errors.push(`Common purpose CSS marker missing: ${marker}`);
}

for (const marker of forbiddenMarkers.slice(0, 9)) {
  if (css.includes(marker)) errors.push(`Obsolete purpose CSS selector remains: ${marker}`);
}

if (cssBytes > 150000) {
  errors.push(`travel-purpose.css grew beyond the unified limit: ${cssBytes} bytes`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Unified purpose page template check passed (${pageCount} pages, ${cities.length} cities, CSS ${cssBytes} bytes).`);
