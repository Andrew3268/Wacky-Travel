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
  "button.setAttribute('aria-label'",
  'previousButton.hidden = !hasOverflow || atStart',
  'nextButton.hidden = !hasOverflow || atEnd'
]) {
  if (!script.includes(required)) errors.push(`Missing snapshot control script marker: ${required}`);
}

for (const required of [
  '@media (min-width: 1024px)',
  '.wt-city-snapshot__scroll-button::before',
  '.wt-city-snapshot__scroll-button[hidden]',
  '.wt-city-snapshot__scroll-button--previous',
  '.wt-city-snapshot__scroll-button--next'
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
  if (!html.includes('/assets/js/area-tabs-scroll.js?v=20260805CitySnapshotControlsV1')) {
    errors.push(`City snapshot page is missing the current control script version: ${entry.name}`);
  }
}

if (pageCount === 0) errors.push('No city snapshot pages were found.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`City snapshot controls check passed (${pageCount} city pages).`);
