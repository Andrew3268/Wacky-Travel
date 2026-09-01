import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationsRoot = path.join(root, 'public', 'destinations');
const cityCssPath = path.join(root, 'public', 'assets', 'css', 'travel-city.css');
const coreCssPath = path.join(root, 'public', 'assets', 'css', 'travel-core.css');
const VERSION = '20260901-travel-contents-v1';
const errors = [];

const cityPages = fs.readdirSync(destinationsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({ city: entry.name, file: path.join(destinationsRoot, entry.name, 'index.html') }))
  .filter(({ file }) => fs.existsSync(file))
  .filter(({ file }) => fs.readFileSync(file, 'utf8').includes('travel-content-section travel-content-section--plain'));

if (cityPages.length !== 15) {
  errors.push(`Travel Contents 섹션이 있는 도시 메인 페이지가 15개가 아닙니다: ${cityPages.length}`);
}

for (const { city, file } of cityPages) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('id="travel-contents"')) errors.push(`${city}: #travel-contents 섹션이 없습니다.`);
  if (!html.includes('class="travel-content-section travel-content-section--plain"')) errors.push(`${city}: plain Travel Contents 구조가 없습니다.`);
  if (!html.includes('class="travel-list travel-list--destination"')) errors.push(`${city}: destination travel list가 없습니다.`);
  if (!html.includes(`/assets/css/travel-core.css?v=${VERSION}`)) errors.push(`${city}: travel-core CSS 캐시 버전이 최신이 아닙니다.`);
  if (!html.includes(`/assets/css/travel-city.css?v=${VERSION}`)) errors.push(`${city}: travel-city CSS 캐시 버전이 최신이 아닙니다.`);
}

const cityCss = fs.readFileSync(cityCssPath, 'utf8');
const coreCss = fs.readFileSync(coreCssPath, 'utf8');
const marker = '/* 2026-09-01: premium minimal Travel Contents */';
const sectionCss = cityCss.slice(cityCss.indexOf(marker));

for (const required of [
  'counter-reset: travel-content-item;',
  'counter-increment: travel-content-item;',
  'content: counter(travel-content-item, decimal-leading-zero);',
  'grid-template-columns: 56px minmax(0, 1fr) 42px;',
  'border-top: 1px solid #e9eaec;',
  'border-bottom: 1px solid #e9eaec;',
  'font-size: 45px;',
  'font-size: 19px;',
  'transition: none;'
]) {
  if (!sectionCss.includes(required)) errors.push(`Travel Contents 디자인 규칙이 없습니다: ${required}`);
}

if (sectionCss.includes(':hover')) {
  errors.push('Travel Contents 전용 CSS에 hover 효과가 남아 있습니다.');
}
if (/travel-list--destination\s+\.travel-list__item:hover/.test(coreCss)) {
  errors.push('공통 CSS에 destination Travel Contents hover 효과가 남아 있습니다.');
}
if (/(^|\n)\.travel-list__item:hover\s*\{/.test(coreCss)) {
  errors.push('공통 travel-list hover가 destination list까지 직접 적용될 수 있습니다.');
}
if (/\.travel-content-section--plain\s*\{[^}]*!important/s.test(coreCss)) {
  errors.push('travel-content-section--plain에 불필요한 !important가 남아 있습니다.');
}
if (/!important/.test(sectionCss)) {
  errors.push('새 Travel Contents 디자인 블록에 !important를 사용했습니다.');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Travel Contents design check passed (${cityPages.length} city pages, hover effects removed).`);
