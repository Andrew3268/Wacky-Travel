import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPurposePage } from '../src/purpose-pages/render-purpose-page.mjs';

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), '..');
const citySlug = 'fukuoka';
const pageTypes = ['first-trip', 'value-hotel', 'near-trip', 'family-trip', 'quiet-stay'];
const dataRoot = path.join(root, 'src', 'purpose-pages', 'data', citySlug);

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

const city = await readJson(path.join(dataRoot, 'city.json'));

for (const pageType of pageTypes) {
  const page = await readJson(path.join(dataRoot, `${pageType}.json`));
  const html = renderPurposePage({ city, page });
  const outputDir = path.join(root, 'public', 'destinations', citySlug, pageType);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(path.join(outputDir, 'index.html'), html, 'utf8');
  console.log(`Generated: /destinations/${citySlug}/${pageType}/`);
}
