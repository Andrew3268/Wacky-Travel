import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const VERSION = '20260901-h2-v2';
const CORE_VERSION = '20260903-h1-scope-v3';
const HOME_VERSION = '20260901-h1-v1';
const CITY_VERSION = '20260901-h1-cascade-v2';
const PURPOSE_VERSION = '20260901-h1-cascade-v2';
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

    const isCityMainHero = /body\.travel-city-body(?:--[\w-]+)? \.wt-city-hero h1/i.test(selector);
    const isPurposeHero = /body\.travel-purpose-body[^,{}]*\.wt-page-hero h1/i.test(selector);
    const isResponsiveDestinationHero = /(?:wt-city-hero|wt-page-hero)[^,{}]*h1/i.test(selector);
    const allowed = selector.includes('#wthomeHeroTitle')
      ? ['55px', '40px']
      : (isCityMainHero || isPurposeHero)
        ? ['40px', '30px']
        : isResponsiveDestinationHero
          ? ['45px', '30px']
          : ['45px'];
    const declarations = [...body.matchAll(/font-size\s*:\s*([^;}]*)/gi)].map((item) => item[1].trim());
    normalizedRuleCount += declarations.length;
    for (const declaration of declarations) {
      if (!allowed.includes(declaration)) {
        errors.push(`${relative}: ${selector} font-size must be ${allowed.join(' or ')}, received ${declaration}`);
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
const homeHeroSizes = homeHeroRules.flatMap(([, body]) => [...body.matchAll(/font-size\s*:\s*([^;}]*)/gi)].map((match) => match[1].trim()));
if (homeHeroSizes.filter((size) => size === '55px').length < 2 || homeHeroSizes.filter((size) => size === '40px').length !== 1) {
  errors.push(`Home hero H1 must be 55px on desktop/tablet and 40px on mobile: ${homeHeroSizes.join(', ')}`);
}
for (const [, body] of homeHeroRules) {
  if (/font-size\s*:[^;]*!important/i.test(body)) errors.push('Home hero H1 font-size must not use !important.');
}

const appCssForPostH1 = read('public/assets/css/app.css');
const postH1Marker = appCssForPostH1.indexOf('/* 2026-09-03: post H1 responsive typography */');
if (postH1Marker < 0) {
  errors.push('Post H1 responsive typography marker is missing.');
} else {
  const postH1Css = appCssForPostH1.slice(postH1Marker);
  if (!/@media\s*\(max-width:\s*1023px\)[\s\S]*?body\.post-page-body \.post-title\s*\{[^{}]*font-size\s*:\s*30px\s*;/s.test(postH1Css)) {
    errors.push('Post H1 tablet size must be 30px at <=1023px.');
  }
  if (!/@media\s*\(max-width:\s*767px\)[\s\S]*?body\.post-page-body \.post-title\s*\{[^{}]*font-size\s*:\s*27px\s*;/s.test(postH1Css)) {
    errors.push('Post H1 mobile size must be 27px at <=767px.');
  }
  for (const match of postH1Css.matchAll(/body\.post-page-body \.post-title\s*\{([^{}]*)\}/g)) {
    if (/font-size\s*:[^;}]*!important/i.test(match[1])) errors.push('Post H1 responsive font-size must not use !important.');
  }
}

const coreCss = read('public/assets/css/travel-core.css');
const fallbackMobileH1Rule = /body:where\(:not\(\.travel-home-body\):not\(\.travel-city-body\):not\(\.travel-purpose-body\):not\(\.post-page-body\)\) h1\s*\{([^{}]*)\}/s;
const fallbackMobileH1Match = coreCss.match(fallbackMobileH1Rule);
if (!fallbackMobileH1Match) {
  errors.push('Low-specificity fallback mobile H1 rule is missing or does not exclude post-page-body.');
} else {
  if (!/font-size\s*:\s*45px\s*;/i.test(fallbackMobileH1Match[1])) errors.push('Fallback mobile H1 must remain 45px for non-special pages.');
  if (/!important/i.test(fallbackMobileH1Match[1])) errors.push('Fallback mobile H1 must not use !important.');
}
if (/html\s+body[^{}]*wt-mobile-heading-noop-[a-d][^{}]*h1\s*\{/i.test(coreCss)) {
  errors.push('High-specificity noop-based global H1 selector must not remain.');
}
if (/wt-city-kicker::before/i.test(coreCss)) {
  errors.push('wt-city-kicker::before decoration still exists in travel-core.css.');
}

const cityCss = read('public/assets/css/travel-city.css');
const purposeCss = read('public/assets/css/travel-purpose.css');

const cityDesktopH1Rules = [...cityCss.matchAll(/body\.travel-city-body(?:--fukuoka)? \.wt-city-hero h1\s*\{([^{}]*)\}/g)];
if (!cityDesktopH1Rules.some(([, body]) => /font-size\s*:\s*40px\s*;/i.test(body))) {
  errors.push('City main H1 desktop size must be 40px.');
}
for (const [, body] of cityDesktopH1Rules) {
  if (/!important/i.test(body)) errors.push('City main hero H1 rule must not use !important.');
}

const purposeHeroRules = [...purposeCss.matchAll(/body\.travel-purpose-body \.wt-page-hero h1,\s*body\.travel-purpose-body \.wt-purpose-page \.wt-page-hero h1\s*\{([^{}]*)\}/g)];
if (!purposeHeroRules.some(([, body]) => /font-size\s*:\s*40px\s*;/i.test(body))) {
  errors.push('Purpose page H1 desktop size must be 40px.');
}
for (const [, body] of purposeHeroRules) {
  if (/!important/i.test(body)) errors.push('Purpose hero H1 rule must not use !important.');
}
if (!/\.wt-city-hero__content\s*>\s*\.wt-city-kicker\s*\{[^{}]*font-size\s*:\s*20px\s*;/s.test(cityCss)) {
  errors.push('City hero kicker 20px rule is missing.');
}
if (!/\.wt-page-hero__content\s*>\s*\.wt-city-kicker\s*\{[^{}]*font-size\s*:\s*20px\s*;/s.test(purposeCss)) {
  errors.push('Purpose hero kicker 20px rule is missing.');
}

const cityResponsiveMarker = cityCss.indexOf('/* 2026-09-01: destination hero tablet/mobile typography */');
const cityResponsiveCss = cityResponsiveMarker >= 0 ? cityCss.slice(cityResponsiveMarker) : '';
if (!/@media\s*\(max-width:\s*1024px\)/.test(cityResponsiveCss) || !/body\.travel-city-body \.wt-city-hero h1\s*\{[^{}]*font-size\s*:\s*30px\s*;/s.test(cityResponsiveCss)) {
  errors.push('City main H1 must be 30px at tablet/mobile widths.');
}
if (!/body\.travel-city-body \.wt-city-hero__content > \.wt-city-kicker\s*\{[^{}]*font-size\s*:\s*16px\s*;/s.test(cityResponsiveCss)) {
  errors.push('City hero kicker must be 16px at tablet/mobile widths.');
}

const purposeResponsiveMarker = purposeCss.indexOf('/* 2026-09-01: destination purpose hero tablet/mobile typography */');
const purposeResponsiveCss = purposeResponsiveMarker >= 0 ? purposeCss.slice(purposeResponsiveMarker) : '';
if (!/@media\s*\(max-width:\s*1024px\)/.test(purposeResponsiveCss) || !/body\.travel-purpose-body \.wt-purpose-page \.wt-page-hero h1\s*\{[^{}]*font-size\s*:\s*30px\s*;/s.test(purposeResponsiveCss)) {
  errors.push('Purpose page H1 must be 30px at tablet/mobile widths.');
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
    const expectedVersion = match[1] === 'travel-core'
      ? CORE_VERSION
      : match[1] === 'travel-city'
        ? CITY_VERSION
        : match[1] === 'travel-purpose'
          ? PURPOSE_VERSION
          : match[1] === 'travel-home'
            ? HOME_VERSION
            : VERSION;
    if (match[2] !== expectedVersion) errors.push(`${relative}: stale changed CSS version ${match[0]}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Heading typography check passed (${normalizedRuleCount} normalized font-size declarations).`);
