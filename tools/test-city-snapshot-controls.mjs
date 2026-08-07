import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationsRoot = path.join(root, 'public', 'destinations');
const scriptPath = path.join(root, 'public', 'assets', 'js', 'area-tabs-scroll.js');
const cssPath = path.join(root, 'public', 'assets', 'css', 'travel-city.css');
const errors = [];

const script = fs.readFileSync(scriptPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

for (const required of [
  "wt-city-snapshot__scroll-button--${isPrevious ? 'previous' : 'next'}",
  "grid.scrollBy({ left: -getSnapshotScrollStep(grid), behavior: 'smooth' })",
  "grid.scrollBy({ left: getSnapshotScrollStep(grid), behavior: 'smooth' })",
  "controls.className = 'wt-city-snapshot__scroll-controls'",
  "viewport.insertAdjacentElement('afterend', controls)",
  "controls.append(previousButton, nextButton)",
  "controls.hidden = !hasOverflow",
  "button.setAttribute('aria-label'",
  "document.createElementNS('http://www.w3.org/2000/svg', 'svg')",
  "icon.setAttribute('class', 'wt-city-snapshot__scroll-icon')",
  'previousButton.hidden = !hasOverflow || atStart',
  'nextButton.hidden = !hasOverflow || atEnd'
]) {
  if (!script.includes(required)) errors.push(`Missing snapshot control script marker: ${required}`);
}


const baseButtonRule = css.match(/body\.travel-city-body \.wt-city-snapshot__scroll-button \{([\s\S]*?)\n  \}/)?.[1] || '';
const hoverButtonRule = css.match(/body\.travel-city-body \.wt-city-snapshot__scroll-button:hover \{([\s\S]*?)\n  \}/)?.[1] || '';
if (!baseButtonRule) errors.push('Snapshot scroll button base rule missing.');
if (/border-radius\s*:/.test(baseButtonRule)) errors.push('Snapshot scroll button still has border-radius.');
if (/box-shadow\s*:/.test(baseButtonRule)) errors.push('Snapshot scroll button still has box-shadow.');
if (/box-shadow\s*:/.test(hoverButtonRule)) errors.push('Snapshot scroll button hover still has box-shadow.');
if (/box-shadow/.test(baseButtonRule.match(/transition\s*:[^;]+;/)?.[0] || '')) {
  errors.push('Snapshot scroll button transition still references box-shadow.');
}

for (const required of [
  '@media (min-width: 900px)',
  '.wt-city-snapshot__scroll-controls',
  'justify-content: flex-end',
  'margin-top: 14px',
  '.wt-city-snapshot__scroll-icon',
  '.wt-city-snapshot__scroll-button[hidden]',
  '.wt-city-snapshot__scroll-button--previous',
  '.wt-city-snapshot__scroll-button--next',
  'position: static'
]) {
  if (!css.includes(required)) errors.push(`Missing snapshot control CSS marker: ${required}`);
}

let pageCount = 0;
for (const entry of fs.readdirSync(destinationsRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const indexPath = path.join(destinationsRoot, entry.name, 'index.html');
  if (!fs.existsSync(indexPath)) continue;
  const html = fs.readFileSync(indexPath, 'utf8');
  if (!html.includes('wt-city-snapshot__grid')) continue;
  pageCount += 1;
  if (!html.includes('/assets/js/area-tabs-scroll.js?v=20260805CitySnapshotControlsV3')) {
    errors.push(`City snapshot page is missing the current control script version: ${entry.name}`);
  }
  if (!html.includes('/assets/css/travel-city.css?v=20260807-frontend-v20')) {
    errors.push(`City snapshot page is missing the cache-busted city stylesheet: ${entry.name}`);
  }
  if (html.includes('/assets/css/travel-city.css?v=20260805-frontend-v16') ||
      html.includes('/assets/css/travel-city.css?v=20260805-frontend-v17')) {
    errors.push(`City snapshot page still references a stale immutable city stylesheet: ${entry.name}`);
  }
}

const headers = fs.readFileSync(path.join(root, 'public', '_headers'), 'utf8');
if (!headers.includes('/assets/*') || !headers.includes('max-age=31536000, immutable')) {
  errors.push('Asset immutable cache policy changed; review snapshot cache-busting assumptions.');
}

if (pageCount === 0) errors.push('No city snapshot pages were found.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`City snapshot controls check passed (${pageCount} city pages).`);
