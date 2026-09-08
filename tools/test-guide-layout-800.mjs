import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const css = fs.readFileSync(path.join(root, 'public/assets/css/travel-city.css'), 'utf8');
const marker = '/* 2026-09-08: guide container width + responsive alignment normalization */';
const start = css.indexOf(marker);
const errors = [];

if (start < 0) {
  errors.push('Guide normalization marker is missing.');
} else {
  const block = css.slice(start);
  for (const required of [
    'body.wt-guide-body .breadcrumbs.container',
    'width: 100%;',
    'padding-left: 16px;',
    'padding-right: 16px;',
    'max-width: 800px;',
    'body.wt-guide-body .wt-city-guide-hero.container',
    '@media (max-width: 1180px)',
    'font-size: 27px;'
  ]) {
    if (!block.includes(required)) errors.push(`Missing guide layout rule: ${required}`);
  }
  if (/!important/.test(block)) {
    errors.push('The new guide normalization block must not use !important.');
  }
}

const guideFiles = [];
const destinationsRoot = path.join(root, 'public', 'destinations');
for (const city of fs.readdirSync(destinationsRoot, { withFileTypes: true })) {
  if (!city.isDirectory()) continue;
  for (const guideName of ['hotel-guide', 'travel-guide']) {
    const file = path.join(destinationsRoot, city.name, guideName, 'index.html');
    if (fs.existsSync(file)) guideFiles.push(file);
  }
}

if (guideFiles.length !== 30) {
  errors.push(`Expected 30 guide pages, found ${guideFiles.length}.`);
}

for (const file of guideFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="breadcrumbs container"')) {
    errors.push(`${path.relative(root, file)}: breadcrumbs container missing.`);
  }
  if (!html.includes('/assets/css/travel-city.css?v=20260908-travel-list-gap1-v3')) {
    errors.push(`${path.relative(root, file)}: guide CSS cache version is stale.`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Guide layout 800 check passed (${guideFiles.length} guide pages).`);
