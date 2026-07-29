import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const functionsDestinationDir = path.join(root, "functions", "destinations");
const publicDestinationDir = path.join(root, "public", "destinations");
const routesFile = path.join(root, "public", "_routes.json");
const middlewareFile = path.join(root, "functions", "_middleware.js");

const citySlugs = [
  "fukuoka",
  "osaka",
  "tokyo",
  "sapporo",
  "okinawa",
  "da-nang",
  "nha-trang",
  "ho-chi-minh-city",
  "hanoi",
  "phu-quoc",
  "taipei",
  "taichung",
  "tainan",
  "kaohsiung",
  "hualien"
];

async function exists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

const errors = [];

if (await exists(functionsDestinationDir)) {
  const entries = await fs.readdir(functionsDestinationDir, { recursive: true });
  const functionFiles = entries.filter((entry) => /\.(?:js|mjs|ts)$/i.test(String(entry)));
  if (functionFiles.length) {
    errors.push(`동적 도시 Functions가 남아 있습니다: ${functionFiles.join(", ")}`);
  }
}

for (const slug of citySlugs) {
  const indexFile = path.join(publicDestinationDir, slug, "index.html");
  if (!(await exists(indexFile))) {
    errors.push(`정적 도시 메인 페이지가 없습니다: public/destinations/${slug}/index.html`);
    continue;
  }

  const html = await fs.readFile(indexFile, "utf8");
  if (!/<main\b[^>]*\bwt-city-page\b/i.test(html)) {
    errors.push(`정적 도시 페이지 식별 마크업이 없습니다: ${slug}`);
  }
}

const routes = JSON.parse(await fs.readFile(routesFile, "utf8"));
if (!Array.isArray(routes.include) || !routes.include.includes("/*")) {
  errors.push("public/_routes.json은 모든 HTML에 미들웨어를 적용하도록 include에 /*를 포함해야 합니다.");
}
if (Array.isArray(routes.exclude) && routes.exclude.some((route) => String(route).startsWith("/destinations"))) {
  errors.push("도시 정적 페이지가 미들웨어에서 제외되어 있습니다.");
}

const middleware = await fs.readFile(middlewareFile, "utf8");
if (!middleware.includes("loadStaticDestinationIndex(context, requestUrl, method)")) {
  errors.push("전역 미들웨어에 정적 도시 index 강제 로딩이 없습니다.");
}
if (!middleware.includes("context.env.ASSETS.fetch")) {
  errors.push("정적 도시 페이지를 ASSETS 바인딩에서 직접 가져오지 않습니다.");
}

if (errors.length) {
  console.error("Static destination routing check failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Static destination routing check passed: ${citySlugs.length} city index pages, no dynamic destination Functions.`);
