import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const searchApi = read('functions/api/search.js');
const searchClient = read('public/assets/js/search-results.js');
const postRoute = read('functions/post/[slug].js');
const utils = read('functions/_utils.js');
const imageProxy = read('functions/img/[encoded].js');
const statusFiles = [
  'functions/post/[slug].js',
  'functions/sitemap.xml.js',
  'functions/_middleware.js',
  'functions/api/posts.js',
  'functions/api/search.js',
  'functions/api/admin/dashboard.js',
  'functions/api/admin/post-list.js',
  'functions/api/destination-posts.js'
].map((file) => [file, read(file)]);

assert(!/PRAGMA\s+table_info/i.test(searchApi), '검색 API에 PRAGMA table_info가 남아 있습니다.');
assert(!/content_md/i.test(searchApi), '검색 API가 게시글 본문 content_md를 조회합니다.');
assert(!/maxRows\s*=\s*500|LIMIT\s+500/i.test(searchApi), '검색 API에 500건 선조회 로직이 남아 있습니다.');
assert(/LIMIT \? OFFSET \?/.test(searchApi), '검색 API가 DB 페이지네이션을 사용하지 않습니다.');
assert(!/loadFallbackSearch|page\s*<=\s*30|\/api\/posts/.test(searchClient), '검색 화면에 30페이지 예비 검색이 남아 있습니다.');
assert(!/cache:\s*['"]no-store['"]|searchParams\.set\(['"]ts['"]/.test(searchClient), '검색 화면이 캐시를 강제로 무효화합니다.');
assert(/AbortController/.test(searchClient), '검색 화면에 이전 요청 취소 처리가 없습니다.');

assert(/context\.waitUntil\(viewCountWrite\)/.test(postRoute), '포스트 조회수 쓰기가 waitUntil로 분리되지 않았습니다.');
assert(!/await\s+env\.TRAVEL_DB\.prepare\(`\s*UPDATE posts[\s\S]*?view_count/i.test(postRoute), '포스트 조회수 UPDATE를 응답 전에 기다립니다.');
assert(/waitUntil\(cacheWrite\)/.test(utils), 'HTML Edge Cache 저장이 waitUntil을 사용하지 않습니다.');
assert(/context\.waitUntil\(cacheWrite\)/.test(imageProxy), '이미지 Edge Cache 저장이 waitUntil을 사용하지 않습니다.');

for (const [file, source] of statusFiles) {
  assert(!/normalizedStatusSql|normalizeStatusSql/.test(source), `${file}에 status 정규화 SQL 함수가 남아 있습니다.`);
  assert(!/LOWER\(TRIM\(COALESCE\((?:[a-z]+\.)?status|REPLACE\(REPLACE\(REPLACE\(REPLACE\(COALESCE\((?:[a-z]+\.)?status/i.test(source), `${file}에서 status 컬럼을 SQL 함수로 가공합니다.`);
}

const migration = read('db/migrations/016_status_normalization.sql');
assert(/UPDATE posts[\s\S]*THEN 'draft'[\s\S]*ELSE 'published'/i.test(migration), 'posts 상태 정규화 마이그레이션이 없습니다.');
assert(/UPDATE destinations/i.test(migration) && /UPDATE hotels/i.test(migration), '목적지/호텔 상태 정규화가 누락됐습니다.');

// Search API should issue only count + paginated items queries for a public request.
const { onRequestGet: searchHandler } = await import(pathToFileURL(path.join(root, 'functions/api/search.js')).href + `?phase2=${Date.now()}`);
const searchQueries = [];
const searchDb = {
  prepare(sql) {
    searchQueries.push(sql);
    return {
      bind(...binds) {
        return {
          first: async () => ({ total: 2, binds }),
          all: async () => ({
            results: [
              { slug: 'a', title: '다낭 미케비치 호텔', category: '추천 호텔', summary: '요약', meta_description: '', tags_json: '[]', longtail_keywords_json: '[]', content_type: 'hotel_intro', status: 'published', published_at: '2026-08-01', updated_at: '2026-08-01', search_score: 300 }
            ],
            binds
          })
        };
      }
    };
  }
};
const searchResponse = await searchHandler({
  env: { TRAVEL_DB: searchDb },
  request: new Request('https://bestayable.com/api/search?q=%EB%8B%A4%EB%82%AD+%ED%98%B8%ED%85%94&page=1&per_page=12')
});
const searchPayload = await searchResponse.json();
assert(searchQueries.length === 2, `검색 API DB 쿼리가 ${searchQueries.length}회 실행됐습니다. 예상: 2회.`);
assert(searchQueries.every((sql) => !/PRAGMA|content_md|LIMIT\s+500/i.test(sql)), '검색 실행 SQL에 제거 대상 작업이 포함됐습니다.');
assert(searchPayload.pagination.total === 2 && searchPayload.items.length === 1, '검색 API 페이지네이션 응답이 올바르지 않습니다.');
assert(/public/.test(searchResponse.headers.get('cache-control') || ''), '공개 검색 응답에 Edge 캐시 정책이 없습니다.');

// edgeCache must return without waiting for a pending cache.put promise.
const originalCaches = globalThis.caches;
let releaseCacheWrite;
const pendingCacheWrite = new Promise((resolve) => { releaseCacheWrite = resolve; });
let scheduledCachePromise = null;
globalThis.caches = {
  default: {
    match: async () => null,
    put: () => pendingCacheWrite
  }
};
const { edgeCache } = await import(pathToFileURL(path.join(root, 'functions/_utils.js')).href + `?phase2=${Date.now()}`);
const cacheResponse = await Promise.race([
  edgeCache({
    request: new Request('https://bestayable.com/post/test/'),
    cacheKeyUrl: 'https://bestayable.com/post/test/?v=1',
    buildResponse: async () => new Response('ok'),
    waitUntil: (promise) => { scheduledCachePromise = promise; }
  }),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Edge Cache 저장을 응답 전에 기다렸습니다.')), 100))
]);
assert(await cacheResponse.text() === 'ok', 'Edge Cache 응답 본문이 올바르지 않습니다.');
assert(scheduledCachePromise, 'Edge Cache 저장 Promise가 waitUntil에 전달되지 않았습니다.');
releaseCacheWrite();
await scheduledCachePromise;
globalThis.caches = originalCaches;

// Post view count write must not block a cache HIT response.
let releaseViewWrite;
const pendingViewWrite = new Promise((resolve) => { releaseViewWrite = resolve; });
const scheduled = [];
const postDb = {
  prepare(sql) {
    return {
      bind() {
        if (/SELECT updated_at, status/i.test(sql)) {
          return { first: async () => ({ updated_at: '2026-08-02T00:00:00.000Z', status: 'published' }) };
        }
        if (/UPDATE posts[\s\S]*view_count/i.test(sql)) {
          return { run: () => pendingViewWrite };
        }
        throw new Error(`Unexpected post SQL: ${sql}`);
      }
    };
  }
};
const oldCaches = globalThis.caches;
globalThis.caches = {
  default: {
    match: async () => new Response('cached post', { headers: { 'cache-control': 'public, max-age=600' } }),
    put: async () => undefined
  }
};
const { onRequestGet: postHandler } = await import(pathToFileURL(path.join(root, 'functions/post/[slug].js')).href + `?phase2=${Date.now()}`);
const postResponse = await Promise.race([
  postHandler({
    params: { slug: 'test-post' },
    env: { TRAVEL_DB: postDb, SITE_ORIGIN: 'https://bestayable.com' },
    request: new Request('https://bestayable.com/post/test-post/'),
    waitUntil: (promise) => scheduled.push(promise)
  }),
  new Promise((_, reject) => setTimeout(() => reject(new Error('조회수 UPDATE가 포스트 응답을 막았습니다.')), 100))
]);
assert(await postResponse.text() === 'cached post', '포스트 캐시 HIT 응답이 올바르지 않습니다.');
assert(scheduled.length === 1, `조회수 쓰기 Promise가 waitUntil에 ${scheduled.length}회 등록됐습니다.`);
releaseViewWrite();
await Promise.all(scheduled);
globalThis.caches = oldCaches;

console.log('Phase 2 performance check passed: search DB queries 2, fallback scans 0, status SQL functions 0, view/cache writes non-blocking.');
