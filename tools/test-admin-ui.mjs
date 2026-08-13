import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const adminPages = [
  'public/admin/index.html',
  'public/admin/dashboard.html',
  'public/admin/items.html',
  'public/admin/post-list.html',
  'public/admin/items-posts.html',
  'public/add.html',
  'public/edit.html'
];

for (const file of adminPages) {
  const html = read(file);
  assert(/<body[^>]*class="[^"]*\badmin-page\b/.test(html), `admin-page body class missing: ${file}`);
  assert(html.includes('/assets/css/admin.css?v='), `admin.css missing: ${file}`);
}

const dashboardHtml = read('public/admin/dashboard.html');
assert(dashboardHtml.includes('data-dashboard-content-tab="latest"'), '최근 작성글 탭이 없습니다.');
assert(dashboardHtml.includes('data-dashboard-content-tab="popular"'), '인기글 탭이 없습니다.');
assert(dashboardHtml.includes('id="dashboardLatestList"'), '최근 작성글 목록이 없습니다.');
assert(dashboardHtml.includes('id="dashboardPopularList"'), '인기글 목록이 없습니다.');
assert(!dashboardHtml.includes('인덱스 사이드바 광고'), '대시보드에 인덱스 사이드바 광고 UI가 남아 있습니다.');
assert(!dashboardHtml.includes('<h2 class="h2">여행 노출 설정</h2>'), '대시보드 사이드에 중복 여행 노출 설정이 남아 있습니다.');

const dashboardApi = read('functions/api/admin/dashboard.js');
assert(dashboardApi.includes('latestRows'), '대시보드 API 최근 작성글 조회가 없습니다.');
assert(!dashboardApi.includes('index_sidebar_ad_enabled'), '대시보드 API에 인덱스 광고 설정이 남아 있습니다.');

const postsApi = read('functions/api/posts.js');
const postsJs = read('public/assets/js/posts.js');
assert(!postsApi.includes('index_sidebar_ad_enabled'), '글 목록 API에 인덱스 광고 설정이 남아 있습니다.');
assert(!postsJs.includes('indexSidebarAd'), '글 목록 클라이언트에 인덱스 광고 코드가 남아 있습니다.');
assert(!fs.existsSync(path.join(root, 'functions/api/site-settings.js')), '인덱스 광고 전용 site-settings API가 남아 있습니다.');

const schema = read('db/schema.sql');
assert(!schema.includes("VALUES ('index_sidebar_ad_enabled'"), '신규 DB 스키마에 인덱스 광고 기본값이 남아 있습니다.');

const adminCss = read('public/assets/css/admin.css');
for (const selector of ['body.admin-page', '.dashboard-content-tabs', 'body.admin-editor-page', 'body.admin-items-page']) {
  assert(adminCss.includes(selector), `관리자 공통 스타일 누락: ${selector}`);
}

console.log('Admin UI check passed: monochrome admin surfaces, dashboard tabs, duplicate controls removed, index sidebar ad retired.');
