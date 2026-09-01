import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GOOGLE_TAG_ID, isGoogleAnalyticsEligiblePath } from '../lib/analytics/google-tag.js';

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

let checked = 0;
for (const file of walk(publicDir).filter((item) => item.endsWith('.html'))) {
  const route = routeFor(file);
  const html = fs.readFileSync(file, 'utf8');
  const hasHead = /<head[\s>]/i.test(html) && /<\/head>/i.test(html);
  const externalNeedle = `googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`;
  const configNeedle = `gtag('config', '${GOOGLE_TAG_ID}')`;
  const eligible = hasHead && isGoogleAnalyticsEligiblePath(route);

  if (eligible) {
    checked += 1;
    if (count(html, externalNeedle) !== 1) errors.push(`${route}: Google tag loader must appear exactly once.`);
    if (count(html, configNeedle) !== 1) errors.push(`${route}: Google tag config must appear exactly once.`);
  } else if (!isGoogleAnalyticsEligiblePath(route)) {
    if (html.includes(externalNeedle) || html.includes(configNeedle)) {
      errors.push(`${route}: private/verification page must not include Google Analytics.`);
    }
  }
}

const purposeRenderer = fs.readFileSync(path.join(root, 'src/purpose-pages/render-purpose-page.mjs'), 'utf8');
if (!purposeRenderer.includes('GOOGLE_TAG_HTML')) errors.push('Purpose page renderer does not include the shared Google tag.');

const postRenderer = fs.readFileSync(path.join(root, 'functions/post/[slug].js'), 'utf8');
if (!postRenderer.includes('isDraftPreview ? "" : GOOGLE_TAG_HTML')) errors.push('Public post renderer Google tag/draft-preview guard is missing.');
if (!postRenderer.includes('${GOOGLE_TAG_HTML}')) errors.push('Dynamic post not-found page Google tag is missing.');

if (errors.length) {
  console.error('Google Analytics check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Google Analytics check passed: ${checked} public static HTML pages use ${GOOGLE_TAG_ID} exactly once.`);
