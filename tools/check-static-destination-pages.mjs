import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const functionsDestinationDir = path.join(root, "functions", "destinations");
const publicDestinationDir = path.join(root, "public", "destinations");
const routesFile = path.join(root, "public", "_routes.json");
const middlewareFile = path.join(root, "functions", "_middleware.js");
const SITE_ORIGIN = "https://bestayable.com";

const citySlugs = [
  "fukuoka", "osaka", "tokyo", "sapporo", "okinawa",
  "da-nang", "nha-trang", "ho-chi-minh-city", "hanoi", "phu-quoc",
  "taipei", "taichung", "tainan", "kaohsiung", "hualien"
];

async function exists(target) {
  try { await fs.access(target); return true; }
  catch { return false; }
}

function canonicalHref(html) {
  const tag = html.match(/<link\b(?=[^>]*\brel=["'][^"']*canonical[^"']*["'])[^>]*>/i)?.[0] || "";
  return tag.match(/\bhref\s*=\s*(["'])(.*?)\1/i)?.[2] || "";
}

const errors = [];

if (await exists(functionsDestinationDir)) {
  const entries = await fs.readdir(functionsDestinationDir, { recursive: true });
  const functionFiles = entries.filter((entry) => /\.(?:js|mjs|ts)$/i.test(String(entry)));
  if (functionFiles.length) errors.push(`동적 도시 메인 Functions가 남아 있습니다: ${functionFiles.join(", ")}`);
}

for (const slug of citySlugs) {
  const indexFile = path.join(publicDestinationDir, slug, "index.html");
  if (!(await exists(indexFile))) {
    errors.push(`정적 도시 메인 페이지가 없습니다: public/destinations/${slug}/index.html`);
    continue;
  }

  const html = await fs.readFile(indexFile, "utf8");
  if (!/<main\b[^>]*\bwt-city-page\b/i.test(html)) errors.push(`정적 도시 페이지 식별 마크업이 없습니다: ${slug}`);

  const expectedCanonical = `${SITE_ORIGIN}/destinations/${slug}/`;
  if (canonicalHref(html) !== expectedCanonical) {
    errors.push(`도시 canonical 절대주소 불일치: ${slug} (${canonicalHref(html) || "없음"})`);
  }
}

const routes = JSON.parse(await fs.readFile(routesFile, "utf8"));
if (!Array.isArray(routes.include) || routes.include.length === 0) errors.push("public/_routes.json include 규칙이 없습니다.");
if (routes.include?.includes("/*")) errors.push("모든 정적 페이지를 Functions로 보내는 /* 규칙이 남아 있습니다.");
if ((routes.include?.length || 0) + (routes.exclude?.length || 0) > 100) errors.push("_routes.json의 100개 규칙 제한을 초과했습니다.");

for (const slug of citySlugs) {
  const cityMain = `/destinations/${slug}/`;
  if (routes.include?.some((rule) => rule === cityMain || rule === `/destinations/${slug}/*` || rule === "/destinations/*")) {
    errors.push(`정적 도시 메인 페이지가 Functions 호출 범위에 포함됩니다: ${slug}`);
  }
  for (const archive of ["hotels", "hotel-recommendations"]) {
    const required = `/destinations/${slug}/${archive}/*`;
    if (!routes.include?.includes(required)) errors.push(`조건부 색인 목록 경로가 Functions 범위에서 누락됨: ${required}`);
  }
}

for (const required of ["/api/*", "/post/*", "/countries/*", "/img/*", "/robots.txt", "/sitemap.xml", "/travel-by-mood/ocean-rest/*"]) {
  if (!routes.include?.includes(required)) errors.push(`필수 동적 경로 누락: ${required}`);
}

const middleware = await fs.readFile(middlewareFile, "utf8");
if (/loadStaticDestinationIndex|STATIC_DESTINATION_SLUGS|env\.ASSETS\.fetch/.test(middleware)) {
  errors.push("전역 미들웨어에 정적 도시 ASSETS.fetch 우회 로직이 남아 있습니다.");
}
if (!middleware.includes("const upstream = await context.next();")) {
  errors.push("미들웨어가 context.next()로 정상 후속 라우팅하지 않습니다.");
}

if (errors.length) {
  console.error("Static destination routing check failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Static destination routing check passed: ${citySlugs.length} city pages bypass Functions; only dynamic archives use Functions.`);
