import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationsDir = path.join(root, 'public', 'destinations');
const cityPages = fs.readdirSync(destinationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(destinationsDir, entry.name, 'index.html'))
  .filter((file) => fs.existsSync(file))
  .filter((file) => {
    const html = fs.readFileSync(file, 'utf8');
    return html.includes('class="travel-city-body') && html.includes('data-city-post-root');
  });

if (cityPages.length !== 15) {
  throw new Error(`도시 메인 페이지가 15개가 아닙니다: ${cityPages.length}`);
}

for (const file of cityPages) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="wt-city-hero__actions"')) {
    throw new Error(`도시 히어로 액션 영역이 없습니다: ${path.relative(root, file)}`);
  }
  if (/data-admin-city-content="hotel-button"|href="#hotel-posts"[^>]*>추천 호텔</.test(html)) {
    throw new Error(`비로그인 정적 HTML에 추천 호텔 버튼이 남아 있습니다: ${path.relative(root, file)}`);
  }
  if (!html.includes('/assets/js/posts.js?v=20260802CityContentUnifiedV1')) {
    throw new Error(`관리자 버튼 런타임 캐시 버전이 갱신되지 않았습니다: ${path.relative(root, file)}`);
  }
  if (!html.includes('/assets/css/travel-core.css?v=20260807-frontend-v23') || !html.includes('/assets/css/travel-city.css?v=20260807-frontend-v23')) {
    throw new Error(`도시 CSS 분리 파일 또는 통합 캐시 버전이 누락되었습니다: ${path.relative(root, file)}`);
  }
}

const css = fs.readFileSync(path.join(root, 'public', 'assets', 'css', 'travel-city.css'), 'utf8');
for (const required of [
  'body.travel-city-body .wt-city-hero__actions [data-admin-city-content="hotel-button"][hidden]',
  'body.travel-city-body .wt-city-hero__actions a[href="#hotel-posts"][hidden]',
  'display: none !important;'
]) {
  if (!css.includes(required)) {
    throw new Error(`관리자 버튼 방어 CSS가 누락되었습니다: ${required}`);
  }
}

const postsJs = fs.readFileSync(path.join(root, 'public', 'assets', 'js', 'posts.js'), 'utf8');
for (const required of [
  'const removeHotelHeroButtons = () =>',
  'const ensureHotelHeroButtons = () =>',
  "button.dataset.adminCityContent = 'hotel-button';",
  "button.textContent = '추천 호텔';",
  'const loadCityContent = async () =>',
  "type: 'all',",
  'includeDrafts: true',
  'if (!data?.ok || !data?.authenticated)',
  "window.addEventListener('pageshow', (event) =>",
  'if (!event.persisted) return;',
  'void loadCityContent();'
]) {
  if (!postsJs.includes(required)) {
    throw new Error(`관리자 인증 후 통합 콘텐츠 로딩 코드가 누락되었습니다: ${required}`);
  }
}

const cityRuntimeStart = postsJs.indexOf('/* CITY_HOTEL_PICKS_RUNTIME_V6_UNIFIED_REQUEST */');
const cityRuntimeEnd = postsJs.indexOf('\n(function () {', cityRuntimeStart);
const cityRuntime = postsJs.slice(cityRuntimeStart, cityRuntimeEnd > cityRuntimeStart ? cityRuntimeEnd : undefined);
if (cityRuntime.includes('/api/admin/session')) {
  throw new Error('도시 콘텐츠가 별도 관리자 세션 API를 먼저 호출하고 있습니다.');
}
if ((cityRuntime.match(/type: 'all'/g) || []).length !== 1) {
  throw new Error('도시 초기 콘텐츠 통합 요청이 정확히 한 번 정의되어야 합니다.');
}

const sessionApi = fs.readFileSync(path.join(root, 'functions', 'api', 'admin', 'session.js'), 'utf8');
for (const required of [
  '"cache-control": "private, no-store, max-age=0"',
  '"pragma": "no-cache"',
  '"vary": "Cookie"'
]) {
  if (!sessionApi.includes(required)) {
    throw new Error(`관리자 세션 API 캐시 차단 헤더가 누락되었습니다: ${required}`);
  }
}

console.log(`도시 메인 관리자 전용 추천 호텔 버튼 fail-closed 검사 통과: ${cityPages.length}개`);
