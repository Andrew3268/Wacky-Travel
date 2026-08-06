import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationsRoot = path.join(root, 'public', 'destinations');
const pageTypes = ['first-trip', 'value-hotel', 'near-trip', 'family-trip', 'quiet-stay'];
const errors = [];
let pageCount = 0;

const cityDirectories = fs.readdirSync(destinationsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const city of cityDirectories) {
  for (const pageType of pageTypes) {
    const file = path.join(destinationsRoot, city, pageType, 'index.html');
    if (!fs.existsSync(file)) continue;
    pageCount += 1;

    const html = fs.readFileSync(file, 'utf8');
    const section = html.match(/<section\b[^>]*\bid="area-compare"[^>]*>[\s\S]*?<\/section>/i)?.[0] || '';
    const relative = path.relative(root, file);

    if (!section) {
      errors.push(`Area choice section missing: ${relative}`);
      continue;
    }
    if (!/class="[^"]*\bwt-area-choice--unified\b[^"]*"/i.test(section)) {
      errors.push(`Unified section class missing: ${relative}`);
    }
    if (!/class="[^"]*\bwt-choice-main\b[^"]*\bwt-choice-main--unified\b[^"]*"/i.test(section)) {
      errors.push(`Unified wt-choice-main class missing: ${relative}`);
    }
    if (/<style\b[^>]*>[\s\S]*?wt-choice-(?:main|card)[\s\S]*?<\/style>/i.test(section)) {
      errors.push(`Legacy inline choice CSS remains: ${relative}`);
    }

    const choiceMain = section.match(/<div\b[^>]*class="[^"]*\bwt-choice-main\b[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/i)?.[0] || '';
    const cards = [...choiceMain.matchAll(/<article\b[^>]*class="[^"]*\bwt-choice-card\b[^"]*"[^>]*>([\s\S]*?)<\/article>/gi)];
    if (cards.length !== 2) {
      errors.push(`Choice card count must be 2: ${relative} (${cards.length})`);
      continue;
    }

    for (const [index, match] of cards.entries()) {
      const card = match[1];
      const markers = [
        'wt-choice-card__label',
        '<h3',
        'wt-choice-card__lead',
        'wt-choice-card__chips',
        'wt-choice-card__line'
      ];
      const positions = markers.map((marker) => card.indexOf(marker));
      if (positions.some((position) => position < 0) || positions.some((position, markerIndex) => markerIndex > 0 && position <= positions[markerIndex - 1])) {
        errors.push(`Choice card structure/order mismatch: ${relative} card ${index + 1}`);
      }
    }

    if (!html.includes('/assets/css/travel-purpose.css?v=20260806-frontend-v19')) {
      errors.push(`Current purpose stylesheet version missing: ${relative}`);
    }
  }
}

if (pageCount !== 75) {
  errors.push(`Expected 75 purpose pages, found ${pageCount}`);
}

const cssPath = path.join(root, 'public', 'assets', 'css', 'travel-purpose.css');
const css = fs.readFileSync(cssPath, 'utf8');
for (const required of [
  'Unified destination purpose choice layout — Fukuoka first-trip reference',
  '.wt-area-choice--unified .wt-choice-main--unified',
  'grid-template-columns: repeat(2, minmax(0, 1fr)) !important;',
  'border-top: 1px solid #111 !important;',
  'border-bottom: 1px solid #d7d7d2 !important;',
  'grid-template-areas:',
  'font-size: 30px !important;',
  '@media (max-width: 760px)'
]) {
  if (!css.includes(required)) errors.push(`Unified choice CSS marker missing: ${required}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Purpose choice unification check passed (${pageCount} pages).`);
