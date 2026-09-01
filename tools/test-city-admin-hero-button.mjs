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
  const travelSection = html.match(/<section[^>]*id="travel-contents"[^>]*>/)?.[0] || '';
  if (!travelSection || !travelSection.includes('data-city-public-content="travel"')) {
    throw new Error(`Travel Contents 공개 조건 마커가 없습니다: ${path.relative(root, file)}`);
  }
  if (travelSection.includes('data-admin-city-content="section"')) {
    throw new Error(`Travel Contents에 관리자 전용 마커가 남아 있습니다: ${path.relative(root, file)}`);
  }
  const travelTitle = html.match(/<h2[^>]*TravelContentsTitle[^>]*>([^<]+)<\/h2>/)?.[1] || '';
  if (!/여행을 더 쉽게 만드는 꿀팁$/.test(travelTitle)) {
    throw new Error(`Travel Contents 제목이 꿀팁 문구로 통일되지 않았습니다: ${path.relative(root, file)} -> ${travelTitle}`);
  }
  if (!html.includes('/assets/js/posts.js?v=20260821ArchiveIndexThresholdV3')) {
    throw new Error(`도시 콘텐츠 런타임 캐시 버전이 갱신되지 않았습니다: ${path.relative(root, file)}`);
  }
  if (!html.includes('/assets/css/travel-core.css?v=20260901-h2-v2') || !html.includes('/assets/css/travel-city.css?v=20260901-destination-heading-v1')) {
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
  "type: 'travel_content',",
  'includeDrafts: false',
  "type: 'all',",
  'includeDrafts: true',
  'const [publicContentData, adminData] = await Promise.all',
  'const ARCHIVE_MIN_PUBLISHED_POSTS = 5;',
  'const renderPublicArchiveLinks = (destination, groups = {}) =>',
  'renderPublicArchiveLinks(destination, publicGroups);',
  "root.dataset.includeDrafts = '0';",
  "root.dataset.includeDrafts = '1';",
  "section.hidden = !hasHtml;",
  "section.setAttribute('aria-hidden', hasHtml ? 'false' : 'true');",
  "window.addEventListener('pageshow', (event) =>",
  'if (!event.persisted) return;',
  'void loadCityContent();'
]) {
  if (!postsJs.includes(required)) {
    throw new Error(`관리자 인증 후 통합 콘텐츠 로딩 코드가 누락되었습니다: ${required}`);
  }
}

const cityRuntimeStart = postsJs.indexOf('/* CITY_CONTENT_RUNTIME_V7_PUBLIC_TRAVEL_ADMIN_HOTELS */');
const cityRuntimeEnd = postsJs.indexOf('\n(function () {', cityRuntimeStart);
const cityRuntime = postsJs.slice(cityRuntimeStart, cityRuntimeEnd > cityRuntimeStart ? cityRuntimeEnd : undefined);
if (cityRuntime.includes('/api/admin/session')) {
  throw new Error('도시 콘텐츠가 별도 관리자 세션 API를 먼저 호출하고 있습니다.');
}
if ((cityRuntime.match(/type: 'all'/g) || []).length !== 2) {
  throw new Error('공개 콘텐츠 통합 요청과 관리자 Hotel Picks 통합 요청이 각각 한 번씩 정의되어야 합니다.');
}
if (!cityRuntime.includes("const adminOnlySections = Array.from(document.querySelectorAll('#hotel-posts'));")) {
  throw new Error('Travel Contents가 관리자 전용 섹션 목록에서 제거되지 않았습니다.');
}
if (!cityRuntime.includes("publicContentPromise") || !cityRuntime.includes("includeDrafts: false")) {
  throw new Error('일반 사용자용 공개 콘텐츠 통합 요청이 없습니다.');
}
if (!cityRuntime.includes('Number(groups?.top5_series?.total || 0) >= ARCHIVE_MIN_PUBLISHED_POSTS')
  || !cityRuntime.includes('Number(groups?.hotel_intro?.total || 0) >= ARCHIVE_MIN_PUBLISHED_POSTS')) {
  throw new Error('5개 이상일 때만 archive 링크를 노출하는 기준이 누락되었습니다.');
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

console.log(`도시 메인 Travel Contents 공개/Hotel Picks 관리자 전용 검사 통과: ${cityPages.length}개`);
