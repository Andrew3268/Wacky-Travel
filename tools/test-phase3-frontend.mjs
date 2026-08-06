import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const VERSION = '20260806-frontend-v19';
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const cssFiles = ['core', 'home', 'city', 'purpose', 'archive', 'survey']
  .map((name) => `public/assets/css/travel-${name}.css`);
for (const file of cssFiles) {
  assert(fs.existsSync(path.join(root, file)), `분리 CSS가 없습니다: ${file}`);
  assert(fs.statSync(path.join(root, file)).size > 100, `분리 CSS가 비어 있습니다: ${file}`);
}
assert(fs.statSync(path.join(root, 'public/assets/css/travel.css')).size < 1024, '기존 travel.css가 대형 번들로 남아 있습니다.');

const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(full);
  }
}
walk(path.join(root, 'public'));
assert(htmlFiles.length === 181, `HTML 파일 수가 예상과 다릅니다: ${htmlFiles.length}`);

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  assert(!html.includes('/assets/css/travel.css'), `기존 travel.css 링크가 남아 있습니다: ${path.relative(root, file)}`);
  const cssLinks = [...html.matchAll(/href="(\/assets\/css\/[^\"]+\.css(?:\?v=[^\"]+)?)"/g)].map((match) => match[1]);
  for (const href of cssLinks) {
    assert(href.endsWith(`?v=${VERSION}`), `CSS 버전이 통일되지 않았습니다: ${path.relative(root, file)} -> ${href}`);
  }
  const bodyClass = html.match(/<body[^>]*class="([^"]*)"/i)?.[1] || '';
  const has = (name) => html.includes(`/assets/css/travel-${name}.css?v=${VERSION}`);
  if (/\btravel-home-body\b/.test(bodyClass)) assert(has('home'), `홈 CSS 누락: ${path.relative(root, file)}`);
  if (/\btravel-city-body\b|\bwt-guide-body\b|\btravel-purpose-body\b/.test(bodyClass)) assert(has('city'), `도시 CSS 누락: ${path.relative(root, file)}`);
  if (/\btravel-purpose-body\b/.test(bodyClass)) assert(has('purpose'), `목적별 CSS 누락: ${path.relative(root, file)}`);
  if (/\btravel-archive-body\b|\btravel-destinations-body\b/.test(bodyClass)) assert(has('archive'), `아카이브 CSS 누락: ${path.relative(root, file)}`);
  if (/\bwt-location-survey-page\b/.test(bodyClass)) assert(has('survey'), `서베이 CSS 누락: ${path.relative(root, file)}`);
}

for (const sourceFile of ['functions/post/[slug].js', 'lib/travel/travel-utils.js']) {
  const source = read(sourceFile);
  assert(!source.includes('/assets/css/travel.css'), `동적 템플릿에 기존 travel.css가 남아 있습니다: ${sourceFile}`);
  for (const match of source.matchAll(/\/assets\/css\/[^"']+\.css\?v=([^"']+)/g)) {
    assert(match[1] === VERSION, `동적 템플릿 CSS 버전이 다릅니다: ${sourceFile}`);
  }
}

const cssReport = JSON.parse(read('tools/travel-css-build-report.json'));
assert(cssReport.duplicateRulesRemoved >= 70, `CSS 완전 중복 규칙 제거 수가 예상보다 적습니다: ${cssReport.duplicateRulesRemoved}`);
assert(cssReport.originalBytes > cssReport.splitBytes, 'CSS 중복 정리 후 전체 크기가 줄지 않았습니다.');

const surveyPages = fs.readdirSync(path.join(root, 'public/destinations'), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({ city: entry.name, file: path.join(root, 'public/destinations', entry.name, 'hotel-location-survey/index.html') }))
  .filter(({ file }) => fs.existsSync(file));
assert(surveyPages.length === 15, `서베이 페이지 수가 예상과 다릅니다: ${surveyPages.length}`);

const engineUsage = new Map();
for (const { city, file } of surveyPages) {
  const html = fs.readFileSync(file, 'utf8');
  const cityScript = `/assets/js/destinations/${city}/hotel-location-survey.js?v=${VERSION}`;
  assert((html.match(new RegExp(cityScript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length === 1, `도시 서베이 데이터 스크립트가 정확히 1개가 아닙니다: ${city}`);
  const engines = [...html.matchAll(/\/assets\/js\/(hotel-location-survey-engine[^?"']*\.js)\?v=([^"']+)/g)];
  assert(engines.length === 1, `공통 서베이 엔진이 정확히 1개가 아닙니다: ${city}`);
  assert(engines[0][2] === VERSION, `서베이 엔진 버전이 다릅니다: ${city}`);
  engineUsage.set(engines[0][1], (engineUsage.get(engines[0][1]) || 0) + 1);
  const cityData = read(`public/assets/js/destinations/${city}/hotel-location-survey.js`);
  assert(!cityData.includes('let currentQuestionIndex = 0'), `도시 데이터 파일에 실행 엔진이 남아 있습니다: ${city}`);
  assert(!cityData.includes('function renderQuestion()'), `도시 데이터 파일에 공통 렌더링 함수가 남아 있습니다: ${city}`);
}
assert(engineUsage.get('hotel-location-survey-engine.js') === 10, `일반 공통 엔진 사용 도시 수가 다릅니다: ${engineUsage.get('hotel-location-survey-engine.js') || 0}`);
assert(engineUsage.get('hotel-location-survey-engine-advanced.js') === 4, `고급 공통 엔진 사용 도시 수가 다릅니다: ${engineUsage.get('hotel-location-survey-engine-advanced.js') || 0}`);
assert(engineUsage.get('hotel-location-survey-engine-fukuoka.js') === 1, `후쿠오카 특화 엔진 사용 수가 다릅니다: ${engineUsage.get('hotel-location-survey-engine-fukuoka.js') || 0}`);

function makeElement() {
  return {
    classList: { add() {}, remove() {}, toggle() {} },
    style: {},
    dataset: {},
    textContent: '',
    innerText: '',
    innerHTML: '',
    disabled: false,
    hidden: false,
    value: '',
    offsetLeft: 0,
    offsetWidth: 0,
    offsetHeight: 0,
    scrollTop: 0,
    setAttribute() {},
    removeAttribute() {},
    addEventListener() {},
    appendChild() {},
    replaceChildren() {},
    scrollTo() {},
    focus() {},
    querySelector() { return makeElement(); },
    querySelectorAll() { return []; }
  };
}

for (const { city, file } of surveyPages) {
  const html = fs.readFileSync(file, 'utf8');
  const engineName = html.match(/\/assets\/js\/(hotel-location-survey-engine[^?"']*\.js)\?v=/)?.[1];
  const elements = new Map();
  const document = {
    referrer: '',
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement());
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    querySelector() { return makeElement(); },
    createElement() { return makeElement(); }
  };
  const context = vm.createContext({
    console,
    document,
    window: { location: { pathname: `/destinations/${city}/hotel-location-survey/`, href: '' }, history: { length: 1, back() {} } },
    location: { href: '' },
    URL,
    Request,
    Response,
    fetch: async () => new Response(JSON.stringify({ ok: true, items: [] }), { headers: { 'content-type': 'application/json' } }),
    setTimeout: () => 0,
    clearTimeout() {},
    encodeURIComponent,
    decodeURIComponent,
    Object,
    Array,
    String,
    Number,
    Math,
    JSON,
    Date,
    RegExp,
    Promise,
    Set,
    Map
  });
  vm.runInContext(read(`public/assets/js/destinations/${city}/hotel-location-survey.js`), context, { filename: `${city}-data.js` });
  vm.runInContext(read(`public/assets/js/${engineName}`), context, { filename: engineName });
}

const sizes = Object.fromEntries(cssFiles.map((file) => [path.basename(file), fs.statSync(path.join(root, file)).size]));
assert(sizes['travel-core.css'] < 250_000, '공통 CSS가 여전히 지나치게 큽니다.');
assert(Math.max(...Object.values(sizes)) < 230_000, '기능별 CSS 중 230KB를 넘는 파일이 있습니다.');

console.log(`Phase 3 frontend check passed: ${htmlFiles.length} HTML, ${surveyPages.length} surveys, CSS version ${VERSION}, shared engines ${JSON.stringify(Object.fromEntries(engineUsage))}.`);
