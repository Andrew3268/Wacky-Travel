import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  GOOGLE_TAG_DELAY_MAX_MS,
  GOOGLE_TAG_DELAY_MIN_MS,
  GOOGLE_TAG_ID,
  isGoogleAnalyticsEligiblePath
} from '../lib/analytics/google-tag.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const errors = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFor(file) {
  const rel = path.relative(publicDir, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

const delayedMarker = 'data-google-analytics-loader="delayed"';
const dynamicLoaderNeedle = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
const eagerLoaderNeedle = `<script async src="${dynamicLoaderNeedle}"></script>`;
const configNeedle = `window.gtag('config', '${GOOGLE_TAG_ID}')`;
const minDelayNeedle = `window.setTimeout(afterMinimumDelay, ${GOOGLE_TAG_DELAY_MIN_MS})`;
const maxDelayNeedle = `window.setTimeout(loadGoogleAnalytics, ${GOOGLE_TAG_DELAY_MAX_MS})`;

let checked = 0;
for (const file of walk(publicDir).filter((item) => item.endsWith('.html'))) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, 'utf8');
  const hasHead = /<head[\s>]/i.test(html) && /<\/head>/i.test(html);
  const eligible = hasHead && isGoogleAnalyticsEligiblePath(route);

  if (eligible) {
    checked += 1;
    if (count(html, delayedMarker) !== 1) errors.push(`${route}: delayed Google tag marker must appear exactly once.`);
    if (count(html, dynamicLoaderNeedle) !== 1) errors.push(`${route}: dynamic gtag.js URL must appear exactly once.`);
    if (html.includes(eagerLoaderNeedle)) errors.push(`${route}: eager external gtag.js loader must not remain.`);
    if (count(html, configNeedle) !== 1) errors.push(`${route}: queued Google tag config must appear exactly once.`);
    if (!html.includes('window.dataLayer = window.dataLayer || []')) errors.push(`${route}: dataLayer must be prepared immediately.`);
    if (!html.includes(minDelayNeedle)) errors.push(`${route}: ${GOOGLE_TAG_DELAY_MIN_MS}ms minimum GA delay is missing.`);
    if (!html.includes(maxDelayNeedle)) errors.push(`${route}: ${GOOGLE_TAG_DELAY_MAX_MS}ms GA failsafe is missing.`);
    if (!html.includes('requestIdleCallback')) errors.push(`${route}: idle loading path is missing.`);
    if (!html.includes("['pointerdown', 'touchstart', 'keydown']")) errors.push(`${route}: early interaction safety trigger is missing.`);
    if (!html.includes("document.visibilityState === 'hidden'")) errors.push(`${route}: quick-exit visibility safety trigger is missing.`);
  } else if (!isGoogleAnalyticsEligiblePath(route)) {
    if (html.includes(dynamicLoaderNeedle) || html.includes('gtag(\'config\'') || html.includes('window.gtag(\'config\'')) {
      errors.push(`${route}: private/verification page must not include Google Analytics.`);
    }
  }
}

const purposeRenderer = fs.readFileSync(path.join(root, 'src/purpose-pages/render-purpose-page.mjs'), 'utf8');
if (!purposeRenderer.includes('GOOGLE_TAG_HTML')) errors.push('Purpose page renderer does not include the shared Google tag.');

const postRenderer = fs.readFileSync(path.join(root, 'functions/post/[slug].js'), 'utf8');
if (!postRenderer.includes('isDraftPreview ? "" : GOOGLE_TAG_HTML')) errors.push('Public post renderer Google tag/draft-preview guard is missing.');
if (!postRenderer.includes('${GOOGLE_TAG_HTML}')) errors.push('Dynamic post not-found page Google tag is missing.');

const analyticsModule = fs.readFileSync(path.join(root, 'lib/analytics/google-tag.js'), 'utf8');
if (!analyticsModule.includes('removeLegacyGoogleTag')) errors.push('Shared Google tag module does not normalize legacy eager snippets.');
if (!analyticsModule.includes(`GOOGLE_TAG_DELAY_MIN_MS = ${GOOGLE_TAG_DELAY_MIN_MS}`)) errors.push('Shared Google tag minimum delay constant changed unexpectedly.');
if (!analyticsModule.includes(`GOOGLE_TAG_DELAY_MAX_MS = ${GOOGLE_TAG_DELAY_MAX_MS}`)) errors.push('Shared Google tag maximum delay constant changed unexpectedly.');

if (errors.length) {
  console.error('Google Analytics check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Google Analytics check passed: ${checked} public static HTML pages queue ${GOOGLE_TAG_ID} immediately and delay external gtag.js to ${GOOGLE_TAG_DELAY_MIN_MS}-${GOOGLE_TAG_DELAY_MAX_MS}ms.`);
