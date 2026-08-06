import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPurposePage } from '../src/purpose-pages/render-purpose-page.mjs';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');
const dataRoot = path.join(root, 'src', 'purpose-pages', 'data');
const pageTypes = ['first-trip', 'value-hotel', 'near-trip', 'family-trip', 'quiet-stay'];

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

const entries = await fs.readdir(dataRoot, { withFileTypes: true });
const citySlugs = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

if (!citySlugs.length) {
  throw new Error('No purpose-page city data found.');
}

let generated = 0;

for (const citySlug of citySlugs) {
  const cityDataRoot = path.join(dataRoot, citySlug);
  const city = await readJson(path.join(cityDataRoot, 'city.json'));

  for (const pageType of pageTypes) {
    const pageFile = path.join(cityDataRoot, `${pageType}.json`);
    const page = await readJson(pageFile);

    if (page.purpose !== pageType) {
      throw new Error(`${pageFile}: purpose must be ${pageType}, received ${page.purpose}`);
    }

    const html = renderPurposePage({ city, page });
    const outputDir = path.join(root, 'public', 'destinations', citySlug, pageType);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
    generated += 1;
    console.log(`Generated: /destinations/${citySlug}/${pageType}/`);
  }
}

console.log(`Purpose page build complete: ${generated} static pages across ${citySlugs.length} cities.`);
