import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequestGet as getSitemap } from "../functions/sitemap.xml.js";
import { resolveRobotsDirective } from "../functions/_middleware.js";
import { STATIC_ROUTES, STATIC_ROUTE_LASTMOD } from "../lib/seo/static-routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const origin = "https://bestayable.com";

const affectedRoutes = [
  "/destinations/da-nang/hotel-guide/",
  "/destinations/da-nang/travel-guide/",
  "/destinations/fukuoka/hotel-guide/",
  "/destinations/fukuoka/travel-guide/",
  "/destinations/ho-chi-minh-city/hotel-guide/",
  "/destinations/ho-chi-minh-city/travel-guide/",
  "/destinations/hualien/hotel-guide/",
  "/destinations/hualien/travel-guide/",
  "/destinations/kaohsiung/travel-guide/",
  "/destinations/nha-trang/hotel-guide/",
  "/destinations/nha-trang/travel-guide/",
  "/destinations/okinawa/hotel-guide/",
  "/destinations/okinawa/travel-guide/",
  "/destinations/osaka/hotel-guide/",
  "/destinations/phu-quoc/hotel-guide/",
  "/destinations/phu-quoc/travel-guide/",
  "/destinations/sapporo/hotel-guide/",
  "/destinations/sapporo/travel-guide/",
  "/destinations/taichung/hotel-guide/",
  "/destinations/tainan/travel-guide/",
  "/destinations/taipei/hotel-guide/",
  "/destinations/taipei/travel-guide/",
  "/destinations/taipei/value-hotel/",
  "/destinations/tokyo/quiet-stay/"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function routeFile(route) {
  return path.join(publicDir, route.replace(/^\//, ""), "index.html");
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp(`\\bname=["']${name}["']`, "i").test(item));
  return tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1] || "";
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /\brel=["'][^"']*canonical[^"']*["']/i.test(item));
  return tag?.match(/\bhref=["']([^"']*)["']/i)?.[1] || "";
}

function dateModified(html) {
  const values = [...html.matchAll(/"dateModified"\s*:\s*"([^"]+)"/gi)]
    .map((match) => match[1].match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "")
    .filter(Boolean)
    .sort();
  return values.at(-1) || "";
}

for (const route of affectedRoutes) {
  const html = await fs.readFile(routeFile(route), "utf8");
  const robots = metaContent(html, "robots").toLowerCase();
  const canonical = canonicalHref(html);

  assert(robots.includes("index") && !robots.includes("noindex"), `${route}: 정적 robots가 index가 아닙니다.`);
  assert(canonical === `${origin}${route}`, `${route}: canonical 불일치 (${canonical})`);
  assert(STATIC_ROUTES.includes(route), `${route}: STATIC_ROUTES/사이트맵 대상에서 누락되었습니다.`);

  const runtimeRobots = resolveRobotsDirective(new URL(`${origin}${route}`), 200, null).toLowerCase();
  assert(runtimeRobots.startsWith("index"), `${route}: middleware가 index 응답을 보장하지 않습니다. (${runtimeRobots})`);

  const match = route.match(/^\/destinations\/([^/]+)\/(.+)\/$/);
  assert(match, `${route}: 예상하지 못한 destination route 형식입니다.`);
  const [, citySlug] = match;
  const cityHtml = await fs.readFile(path.join(publicDir, "destinations", citySlug, "index.html"), "utf8");
  assert(cityHtml.includes(`href="${route}"`), `${route}: 도시 허브에서 crawlable <a> 링크가 없습니다.`);


  const modified = dateModified(html);
  if (modified) {
    assert(STATIC_ROUTE_LASTMOD[route] === modified, `${route}: 정적 lastmod 매니페스트가 HTML dateModified와 다릅니다.`);
  }
}

const emptyDb = {
  prepare() {
    return {
      async all() { return { results: [] }; }
    };
  }
};

const sitemapResponse = await getSitemap({
  env: { TRAVEL_DB: emptyDb, SITE_ORIGIN: origin },
  request: new Request(`${origin}/sitemap.xml`)
});
const sitemapXml = await sitemapResponse.text();

for (const route of affectedRoutes) {
  const loc = `${origin}${route}`;
  assert(sitemapXml.includes(`<loc>${loc}</loc>`), `${route}: sitemap.xml에서 누락되었습니다.`);
  const modified = STATIC_ROUTE_LASTMOD[route] || "";
  if (modified) {
    const entry = `<loc>${loc}</loc><lastmod>${modified}</lastmod>`;
    assert(sitemapXml.includes(entry), `${route}: sitemap.xml의 lastmod가 누락되거나 부정확합니다.`);
  }
}

assert(!STATIC_ROUTES.some((route) => /^\/naver[a-z0-9]+\.html$/i.test(route)), "네이버 소유확인 파일이 사이트맵 매니페스트에 포함되어 있습니다.");
assert(resolveRobotsDirective(new URL(`${origin}/naverb605bc5dcef125158051eb5ac0d186f5.html`), 200, null).startsWith("noindex"), "네이버 소유확인 파일이 index 응답을 반환합니다.");

console.log(`Search Console discovered crawl guard: OK (${affectedRoutes.length} URLs)`);
