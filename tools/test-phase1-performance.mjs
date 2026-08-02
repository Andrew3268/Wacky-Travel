import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

async function read(relative) {
  return fs.readFile(path.join(root, relative), "utf8");
}

const postsSource = await read("functions/api/posts.js");
const getStart = postsSource.indexOf("export async function onRequestGet");
const postStart = postsSource.indexOf("export async function onRequestPost");
const getSource = postsSource.slice(getStart, postStart);
assert(getStart >= 0 && postStart > getStart, "/api/posts GET 구간을 찾지 못했습니다.");
for (const forbidden of ["ensurePostRegionColumns", "CREATE TABLE", "ALTER TABLE", "PRAGMA table_info", "INSERT OR IGNORE"]) {
  assert(!getSource.includes(forbidden), `/api/posts GET에 런타임 스키마 작업이 남아 있습니다: ${forbidden}`);
}

const postsModule = await import(pathToFileURL(path.join(root, "functions/api/posts.js")).href + `?v=${Date.now()}`);
const dbCalls = [];
const db = {
  prepare(sql) {
    dbCalls.push(String(sql));
    return {
      bind() { return this; },
      async all() { return { results: [] }; },
      async first() { return { total: 0 }; },
      async run() { return { success: true, meta: {} }; }
    };
  }
};
const postsResponse = await postsModule.onRequestGet({
  env: { TRAVEL_DB: db },
  request: new Request("https://bestayable.com/api/posts?status=published&per_page=8")
});
assert(postsResponse.ok, "/api/posts 공개 조회 모의 실행이 실패했습니다.");
assert(dbCalls.length > 0, "/api/posts 모의 실행에서 SELECT 조회가 발생하지 않았습니다.");
assert(dbCalls.every((sql) => /^\s*SELECT\b/i.test(sql)), "/api/posts 공개 조회에서 SELECT 외 DB 문장이 실행되었습니다.");

const sessionSource = await read("functions/api/admin/session.js");
assert(!sessionSource.includes("getAdminCount"), "/api/admin/session이 관리자 수를 조회합니다.");
assert(!sessionSource.includes("ensureAdminTables"), "/api/admin/session이 관리자 테이블을 생성합니다.");
const setupStatusSource = await read("functions/api/admin/setup-status.js");
assert(setupStatusSource.includes("getAdminCount"), "관리자 최초 설정 확인 전용 API가 없습니다.");
const adminLoginSource = await read("public/assets/js/admin-login.js");
assert(adminLoginSource.includes("/api/admin/setup-status"), "관리자 로그인 페이지가 전용 설정 상태 API를 사용하지 않습니다.");

const sessionModule = await import(pathToFileURL(path.join(root, "functions/api/admin/session.js")).href + `?v=${Date.now()}`);
let anonymousDbAccess = 0;
const anonymousResponse = await sessionModule.onRequestGet({
  env: {
    TRAVEL_DB: {
      prepare() {
        anonymousDbAccess += 1;
        throw new Error("anonymous session must not access D1");
      }
    }
  },
  request: new Request("https://bestayable.com/api/admin/session")
});
const anonymousJson = await anonymousResponse.json();
assert(anonymousResponse.ok && anonymousJson.authenticated === false, "비로그인 세션 응답이 올바르지 않습니다.");
assert(anonymousDbAccess === 0, "비로그인 공개 세션 확인이 D1을 조회합니다.");

const destinationRoot = path.join(root, "public", "destinations");
const destinationEntries = await fs.readdir(destinationRoot, { withFileTypes: true });
const archiveFiles = [];
for (const entry of destinationEntries) {
  if (!entry.isDirectory()) continue;
  for (const archive of ["hotels", "hotel-recommendations"]) {
    const file = path.join(destinationRoot, entry.name, archive, "index.html");
    try {
      await fs.access(file);
      archiveFiles.push(file);
    } catch {}
  }
}
assert(archiveFiles.length === 30, `호텔 아카이브 페이지 수가 예상과 다릅니다: ${archiveFiles.length}`);
for (const file of archiveFiles) {
  const html = await fs.readFile(file, "utf8");
  const ssrIndex = html.indexOf("if (hasServerRenderedArchive)");
  const returnIndex = html.indexOf("return;", ssrIndex);
  const settingsIndex = html.indexOf("await fetchSettings()", ssrIndex);
  const postsFetchIndex = html.indexOf("fetch('/api/destination-posts?");
  assert(ssrIndex >= 0, `${path.relative(root, file)}: SSR 중복 조회 차단 분기가 없습니다.`);
  assert(returnIndex > ssrIndex && settingsIndex > returnIndex, `${path.relative(root, file)}: SSR 성공 후 설정 API를 건너뛰지 않습니다.`);
  assert(postsFetchIndex >= 0, `${path.relative(root, file)}: SSR 실패 대비 게시글 fallback이 없습니다.`);
  assert(!html.includes("/api/travel-settings?ts="), `${path.relative(root, file)}: 설정 API 캐시 무효화 파라미터가 남아 있습니다.`);
}

const middlewareSource = await read("functions/_middleware.js");
assert(middlewareSource.includes("LEFT JOIN hotels h ON h.slug = p.hotel_slug"), "호텔 아카이브 SSR이 호텔 정보를 LEFT JOIN으로 조회하지 않습니다.");
for (const forbidden of ["ALTER TABLE posts", "ensureCoverImageColumns", "PRAGMA table_info(posts)"]) {
  assert(!middlewareSource.includes(forbidden), `공개 호텔 아카이브 읽기 경로에 런타임 마이그레이션이 남아 있습니다: ${forbidden}`);
}

const countryFunction = path.join(root, "functions", "countries", "[slug].js");
try {
  await fs.access(countryFunction);
  errors.push("운영 중단한 국가 페이지 함수가 남아 있습니다.");
} catch {}
const routes = JSON.parse(await read("public/_routes.json"));
assert(!routes.include.some((route) => route.includes("/countries")), "_routes.json에 국가 페이지 Functions 경로가 남아 있습니다.");
const sitemapSource = await read("functions/sitemap.xml.js");
assert(!sitemapSource.includes("/countries/"), "사이트맵에 국가 페이지 URL 생성 코드가 남아 있습니다.");
assert(!sitemapSource.includes("countryToSlug"), "사이트맵에 국가 페이지 슬러그 함수가 남아 있습니다.");
const routeGenerator = await read("tools/generate-function-routes.mjs");
assert(!routeGenerator.includes('"/countries/*"'), "Functions 경로 생성기에 국가 페이지가 남아 있습니다.");
const travelCss = await read("public/assets/css/travel.css");
for (const marker of ["travel-page--country-hub", "country-page-skeleton", "travel-content-sections--country", "BESTAYABLE_COUNTRY_PAGE_SKELETON_V1"]) {
  assert(!travelCss.includes(marker), `국가 페이지 전용 CSS가 남아 있습니다: ${marker}`);
}

if (errors.length) {
  console.error("Phase 1 performance check failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Phase 1 performance check passed: ${archiveFiles.length} archive pages, ${dbCalls.length} read-only /api/posts queries, anonymous session D1 calls ${anonymousDbAccess}.`);
