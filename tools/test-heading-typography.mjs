import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const VERSION = '20260901-h2-v2';
const TRAVEL_CONTENTS_VERSION = '20260901-h2-v2';
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const errors = [];

const cssFiles = [
  'public/assets/css/app.css',
  'public/assets/css/travel-core.css',
  'public/assets/css/travel-city.css',
  'public/assets/css/travel-purpose.css',
  'public/assets/css/travel-home.css',
  'public/assets/css/hotel-promotions.css',
  'public/assets/css/travel-survey.css',
  'public/assets/css/admin.css',
];

const headingClassSelectors = ['.hero-title', '.preview-title', '.main-title'];
let normalizedRuleCount = 0;

for (const relative of cssFiles) {
  const css = read(relative);
  const rulePattern = /([^{}]+)\{([^{}]*)\}/gs;
  for (const match of css.matchAll(rulePattern)) {
    const selector = match[1].replace(/\s+/g, ' ').trim();
    const body = match[2];
    const isHeadingRule = /h1/i.test(selector) || headingClassSelectors.some((token) => selector.includes(token) && !/\bh2\b/i.test(selector));
    if (!isHeadingRule || !/font-size\s*:/i.test(body)) continue;

    const expected = selector.includes('#wthomeHeroTitle') ? '55px' : '45px';
    const declarations = [...body.matchAll(/font-size\s*:\s*([^;}]*)/gi)].map((item) => item[1].trim());
    normalizedRuleCount += declarations.length;
    for (const declaration of declarations) {
      if (declaration !== expected) {
        errors.push(`${relative}: ${selector} font-size must be ${expected}, received ${declaration}`);
      }
      if (/!important/i.test(declaration)) {
        errors.push(`${relative}: ${selector} font-size must not use !important`);
      }
    }
  }
}

if (normalizedRuleCount < 45) {
  errors.push(`Too few normalized H1 rules were checked: ${normalizedRuleCount}`);
}

const homeCss = read('public/assets/css/travel-home.css');
const homeHeroRules = [...homeCss.matchAll(/body\.travel-home-body[^{}]*#wthomeHeroTitle\s*\{([^{}]*)\}/g)];
if (homeHeroRules.length < 3) {
  errors.push(`Home hero title rule count is unexpectedly low: ${homeHeroRules.length}`);
}
for (const [, body] of homeHeroRules) {
  if (!/font-size\s*:\s*55px\s*;/i.test(body)) errors.push('Home hero H1 must be 55px in every breakpoint.');
  if (/font-size\s*:[^;]*!important/i.test(body)) errors.push('Home hero H1 font-size must not use !important.');
}

const coreCss = read('public/assets/css/travel-core.css');
if (/wt-city-kicker::before/i.test(coreCss)) {
  errors.push('wt-city-kicker::before decoration still exists in travel-core.css.');
}

const cityCss = read('public/assets/css/travel-city.css');
const purposeCss = read('public/assets/css/travel-purpose.css');
if (!/\.wt-city-hero__content\s*>\s*\.wt-city-kicker\s*\{[^{}]*font-size\s*:\s*20px\s*;/s.test(cityCss)) {
  errors.push('City hero kicker 20px rule is missing.');
}
if (!/\.wt-page-hero__content\s*>\s*\.wt-city-kicker\s*\{[^{}]*font-size\s*:\s*20px\s*;/s.test(purposeCss)) {
  errors.push('Purpose hero kicker 20px rule is missing.');
}


const mobileH2Checks = [
  ['public/assets/css/app.css', '/* 2026-09-01: mobile H2 normalization */'],
  ['public/assets/css/travel-core.css', '/* 2026-09-01: global travel mobile H2 normalization */'],
  ['public/assets/css/travel-city.css', '/* 2026-09-01: city and guide mobile H2 normalization */'],
  ['public/assets/css/travel-purpose.css', '/* 2026-09-01: purpose mobile H2 normalization */'],
  ['public/assets/css/travel-home.css', '/* 2026-09-01: home mobile H2 normalization */'],
  ['public/assets/css/hotel-promotions.css', '/* 2026-09-01: promotions mobile H2 normalization */'],
  ['public/assets/css/travel-survey.css', '/* 2026-09-01: survey mobile H2 normalization */'],
  ['public/assets/css/site-header.css', '/* 2026-09-01: search overlay mobile H2 normalization */'],
];

for (const [relative, marker] of mobileH2Checks) {
  const css = read(relative);
  const markerIndex = css.indexOf(marker);
  if (markerIndex < 0) {
    errors.push(`${relative}: mobile H2 normalization marker missing.`);
    continue;
  }
  const normalized = css.slice(markerIndex);
  if (!/@media\s*\(max-width:\s*767px\)/i.test(normalized) || !/font-size\s*:\s*25px\s*;/i.test(normalized)) {
    errors.push(`${relative}: mobile H2 must normalize to 25px.`);
  }
}

const selectorTargetsH2 = (selector = '') => selector
  .split(',')
  .some((part) => /(?:^|[>+~\s])h2(?:[#.][\w-]+|\[[^\]]+\]|:[\w-]+(?:\([^)]*\))?)*\s*$/i.test(part.trim()));

for (const relative of mobileH2Checks.map(([file]) => file)) {
  const css = read(relative);
  for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/gs)) {
    const selector = match[1].replace(/\s+/g, ' ').trim();
    if (!selectorTargetsH2(selector)) continue;
    if (/font-size\s*:[^;}]*!important/i.test(match[2])) {
      errors.push(`${relative}: H2 font-size still uses !important -> ${selector}`);
    }
  }
}

if (!/body\.travel-city-body #travel-contents \.section-heading h2\s*\{[^{}]*font-size\s*:\s*30px\s*;/s.test(cityCss)) {
  errors.push('Travel Contents section title must be 30px on desktop.');
}
if (!/body\.travel-city-body #travel-contents \.section-heading h2[\s\S]*?font-size\s*:\s*25px\s*;/s.test(cityCss.slice(cityCss.indexOf('/* 2026-09-01: city and guide mobile H2 normalization */')))) {
  errors.push('Travel Contents section title must be 25px on mobile.');
}

for (const [relative, marker] of [
  ['public/about/index.html', '/* 2026-09-01: About mobile H2 normalization */'],
  ['public/privacy-policy/index.html', '/* 2026-09-01: Privacy mobile H2 normalization */'],
  ['public/agoda-card-discount/index.html', '/* 2026-09-01: Agoda mobile H2 normalization */'],
]) {
  const html = read(relative);
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0 || !/font-size\s*:\s*25px\s*;/i.test(html.slice(markerIndex))) {
    errors.push(`${relative}: inline mobile H2 25px override missing.`);
  }
}

for (const [relative, selector] of [
  ['public/about/index.html', '.about-title'],
  ['public/privacy-policy/index.html', '.privacy-title'],
  ['public/404.html', '.error-title'],
]) {
  const html = read(relative);
  const rules = [...html.matchAll(new RegExp(`${selector.replace('.', '\\.') }\\s*\\{([^{}]*)\\}`, 'g'))];
  if (!rules.length) errors.push(`${relative}: ${selector} rule missing.`);
  for (const [, body] of rules) {
    if (!/font-size\s*:\s*45px\s*;/i.test(body)) errors.push(`${relative}: ${selector} must be 45px.`);
  }
}

const agodaHtml = read('public/agoda-card-discount/index.html');
const agodaBaseRules = [...agodaHtml.matchAll(/(^|[}\s])\.wt-agoda-title\s*\{([^{}]*)\}/gm)];
if (!agodaBaseRules.length) errors.push('Agoda H1 base title rule missing.');
for (const match of agodaBaseRules) {
  if (!/font-size\s*:\s*45px\s*;/i.test(match[2])) errors.push('Agoda H1 base title must be 45px.');
}

const versionedFiles = [
  'public/index.html',
  'public/destinations/osaka/index.html',
  'public/destinations/osaka/first-trip/index.html',
  'public/destinations/osaka/hotel-location-survey/index.html',
];
for (const relative of versionedFiles) {
  const html = read(relative);
  for (const match of html.matchAll(/\/assets\/css\/(app|travel-core|travel-city|travel-home|travel-purpose|travel-survey)\.css\?v=([^"']+)/g)) {
    const expectedVersion = ['travel-core', 'travel-city'].includes(match[1]) ? TRAVEL_CONTENTS_VERSION : VERSION;
    if (match[2] !== expectedVersion) errors.push(`${relative}: stale changed CSS version ${match[0]}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Heading typography check passed (${normalizedRuleCount} normalized font-size declarations).`);
