import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STATIC_ROUTES } from "../lib/seo/static-routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const errors = [];
const warnings = [];
const SITE_ORIGIN = "https://bestayable.com";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function routeFor(file) {
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2].trim() : "";
}

function tags(html, selector) {
  if (selector === "meta") return html.match(/<meta\b[^>]*>/gi) || [];
  if (selector === "link") return html.match(/<link\b[^>]*>/gi) || [];
  return [];
}

function meta(html, key, value) {
  const tag = tags(html, "meta").find((item) => attr(item, key).toLowerCase() === value.toLowerCase());
  return tag ? attr(tag, "content") : "";
}

function linksByRel(html, rel) {
  return tags(html, "link").filter((item) => attr(item, "rel").split(/\s+/).some((part) => part.toLowerCase() === rel));
}

function normalizePagePath(value) {
  const parsed = new URL(value, "https://audit.invalid");
  let pathname = parsed.pathname.replace(/\/{2,}/g, "/");
  if (pathname !== "/" && !/\.[a-z0-9]{1,12}$/i.test(pathname.split("/").pop() || "") && !pathname.endsWith("/")) pathname += "/";
  return pathname;
}

function isNoindex(html) {
  return /noindex/i.test(meta(html, "name", "robots"));
}

function localFileFor(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (clean === "/") return path.join(publicDir, "index.html");
  const direct = path.join(publicDir, clean.replace(/^\//, ""));
  if (/\.[a-z0-9]{1,12}$/i.test(clean.split("/").pop() || "")) return direct;
  return path.join(direct, "index.html");
}

const htmlFiles = (await walk(publicDir)).filter((file) => file.endsWith(".html"));
const staticIndexable = [];
const titleMap = new Map();
const descriptionMap = new Map();

for (const file of htmlFiles) {
  const html = await fs.readFile(file, "utf8");
  const route = routeFor(file);
  const noindex = isNoindex(html)
    || route.startsWith("/admin/")
    || ["/404.html", "/add.html", "/edit.html"].includes(route)
    || /^\/naver[a-z0-9]+\.html$/i.test(route);
  if (!noindex) staticIndexable.push(route);

  const jsonScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemas = [];
  for (const match of jsonScripts) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (Array.isArray(parsed)) schemas.push(...parsed.filter((item) => item && typeof item === "object"));
      else if (parsed && typeof parsed === "object") schemas.push(parsed);
      const stack = [parsed];
      while (stack.length) {
        const current = stack.pop();
        if (Array.isArray(current)) { stack.push(...current); continue; }
        if (current && typeof current === "object") { stack.push(...Object.values(current)); continue; }
        if (typeof current === "string" && current.startsWith("/")) {
          errors.push(`${route}: JSON-LD 상대 URL 발견 (${current})`);
        }
      }
    } catch (error) { errors.push(`${route}: JSON-LD 문법 오류 (${error.message})`); }
  }

  const schemaByType = (type) => schemas.find((schema) => schema?.["@type"] === type) || null;
  const requireSchema = (type, message = type) => {
    const schema = schemaByType(type);
    if (!schema) errors.push(`${route}: ${message} 구조화 데이터 누락`);
    return schema;
  };

  if (route === "/") {
    const website = requireSchema("WebSite");
    const organization = requireSchema("Organization");
    if (website?.["@id"] !== `${SITE_ORIGIN}/#website`) errors.push(`${route}: WebSite @id 불일치`);
    if (organization?.["@id"] !== `${SITE_ORIGIN}/#organization`) errors.push(`${route}: Organization @id 불일치`);
  }

  if (route === "/destinations/") {
    requireSchema("CollectionPage");
    requireSchema("BreadcrumbList");
    const itemList = requireSchema("ItemList");
    if (!Array.isArray(itemList?.itemListElement) || itemList.itemListElement.length < 1) errors.push(`${route}: 여행지 ItemList가 비어 있음`);
  }

  const cityRootMatch = route.match(/^\/destinations\/([^/]+)\/$/);
  if (cityRootMatch) {
    requireSchema("WebPage");
    requireSchema("BreadcrumbList");
    requireSchema("ItemList");
    const destination = requireSchema("TouristDestination");
    if (destination && Object.prototype.hasOwnProperty.call(destination, "inLanguage")) errors.push(`${route}: TouristDestination에 허용되지 않는 inLanguage 사용`);
    if (destination?.["@id"] !== `${SITE_ORIGIN}${route}#destination`) errors.push(`${route}: TouristDestination @id 불일치`);
  }

  const purposeMatch = route.match(/^\/destinations\/[^/]+\/(first-trip|value-hotel|near-trip|family-trip|quiet-stay)\/$/);
  if (purposeMatch) {
    const webPage = requireSchema("WebPage");
    requireSchema("BreadcrumbList");
    const itemList = requireSchema("ItemList");
    const faqPage = requireSchema("FAQPage");
    if (!Array.isArray(itemList?.itemListElement) || itemList.itemListElement.length < 1) errors.push(`${route}: 목적 페이지 ItemList가 비어 있음`);
    if (!Array.isArray(faqPage?.mainEntity) || faqPage.mainEntity.length < 1) errors.push(`${route}: 목적 페이지 FAQPage가 비어 있음`);
    if (webPage?.["@id"] !== `${SITE_ORIGIN}${route}#webpage`) errors.push(`${route}: 목적 페이지 WebPage @id 불일치`);
  }

  const guideMatch = route.match(/^\/destinations\/[^/]+\/(hotel-guide|travel-guide)\/$/);
  if (guideMatch) {
    const article = requireSchema("Article");
    const webPage = requireSchema("WebPage");
    requireSchema("BreadcrumbList");
    if (!/^\d{4}-\d{2}-\d{2}/.test(String(article?.datePublished || ""))) errors.push(`${route}: Article datePublished 누락/형식 오류`);
    if (!/^\d{4}-\d{2}-\d{2}/.test(String(article?.dateModified || ""))) errors.push(`${route}: Article dateModified 누락/형식 오류`);
    if (article?.publisher?.["@id"] !== `${SITE_ORIGIN}/#organization`) errors.push(`${route}: Article publisher @id 불일치`);
    if (Number(article?.publisher?.logo?.width) !== 520 || Number(article?.publisher?.logo?.height) !== 520) errors.push(`${route}: Article publisher 로고 크기 불일치`);
    if (article?.mainEntityOfPage?.["@id"] !== `${SITE_ORIGIN}${route}#webpage`) errors.push(`${route}: Article → WebPage 연결 불일치`);
    if (webPage?.mainEntity?.["@id"] !== `${SITE_ORIGIN}${route}#article`) errors.push(`${route}: WebPage → Article 연결 불일치`);
  }

  const archiveMatch = route.match(/^\/destinations\/[^/]+\/(hotels|hotel-recommendations)\/$/);
  if (archiveMatch) {
    requireSchema("CollectionPage");
    requireSchema("BreadcrumbList");
  }

  if (!noindex) {
    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || "";
    const charsetTag = tags(html, "meta").find((item) => attr(item, "charset"));
    if (!/\blang=["']ko(?:-KR)?["']/i.test(htmlTag)) errors.push(`${route}: html lang=ko 누락`);
    if (!charsetTag || attr(charsetTag, "charset").toLowerCase() !== "utf-8") errors.push(`${route}: UTF-8 charset 누락`);

    const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const title = titleMatches[0]?.[1]?.replace(/<[^>]+>/g, "").trim() || "";
    const description = meta(html, "name", "description");
    const canonicalTags = linksByRel(html, "canonical");
    const h1Count = (html.match(/<h1\b/gi) || []).length;

    if (titleMatches.length !== 1 || !title) errors.push(`${route}: 유효한 title이 정확히 1개가 아님`);
    if (!description) errors.push(`${route}: meta description 누락`);
    if (canonicalTags.length !== 1) errors.push(`${route}: canonical이 정확히 1개가 아님`);
    else {
      const href = attr(canonicalTags[0], "href");
      if (!href) errors.push(`${route}: canonical href 누락`);
      else {
        let parsedCanonical = null;
        try { parsedCanonical = new URL(href); } catch {}
        if (!parsedCanonical || parsedCanonical.origin !== SITE_ORIGIN) errors.push(`${route}: canonical은 공식 도메인의 절대 URL이어야 함 (${href})`);
        else if (normalizePagePath(parsedCanonical.pathname) !== normalizePagePath(route)) errors.push(`${route}: canonical 경로 불일치 (${href})`);
      }
      if (/[?#]/.test(href)) errors.push(`${route}: canonical에 쿼리 또는 해시 포함 (${href})`);
    }
    if (!meta(html, "name", "viewport")) errors.push(`${route}: viewport 누락`);
    if (h1Count !== 1) errors.push(`${route}: H1 개수 ${h1Count}개`);

    const requiredMeta = [
      ["property", "og:title"], ["property", "og:description"], ["property", "og:url"], ["property", "og:image"],
      ["name", "twitter:card"], ["name", "twitter:title"], ["name", "twitter:description"], ["name", "twitter:image"]
    ];
    for (const [key, value] of requiredMeta) if (!meta(html, key, value)) errors.push(`${route}: ${value} 누락`);

    const ogUrl = meta(html, "property", "og:url");
    try {
      const parsed = new URL(ogUrl);
      if (parsed.origin !== SITE_ORIGIN || normalizePagePath(parsed.pathname) !== normalizePagePath(route)) {
        errors.push(`${route}: og:url 공식 절대주소 불일치 (${ogUrl})`);
      }
    } catch { errors.push(`${route}: og:url이 절대 URL이 아님 (${ogUrl})`); }

    for (const [key, value] of [["property", "og:image"], ["name", "twitter:image"]]) {
      const image = meta(html, key, value);
      try { new URL(image); }
      catch { errors.push(`${route}: ${value}가 절대 URL이 아님 (${image})`); }
    }

    if (title) {
      const list = titleMap.get(title) || []; list.push(route); titleMap.set(title, list);
    }
    if (description) {
      const list = descriptionMap.get(description) || []; list.push(route); descriptionMap.set(description, list);
    }
  }

  for (const imageTag of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\balt\s*=/.test(imageTag)) errors.push(`${route}: img alt 속성 누락`);
    if (!/\bwidth\s*=/.test(imageTag) || !/\bheight\s*=/.test(imageTag)) errors.push(`${route}: img width/height 속성 누락`);
  }

  for (const match of html.matchAll(/<(?:a|link)\b[^>]*\bhref=(["'])(.*?)\1/gi)) {
    const href = match[2].trim();
    if (!href || href.includes("${") || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(href) || /^https?:\/\//i.test(href)) continue;
    const resolved = new URL(href, `https://audit.invalid${route}`);
    const pathname = resolved.pathname;
    if (pathname.startsWith("/post/") || pathname.startsWith("/api/")) continue;
    try { await fs.access(localFileFor(pathname)); }
    catch { errors.push(`${route}: 존재하지 않는 내부 링크 ${href}`); }
  }

  for (const match of html.matchAll(/<(?:script|img|source|link)\b[^>]*\b(?:src|href)=(["'])(.*?)\1/gi)) {
    const value = match[2].trim();
    if (!/^\/(?:assets|img)\//.test(value) && !value.startsWith("/favicon.ico")) continue;
    const pathname = new URL(value, "https://audit.invalid").pathname;
    try { await fs.access(localFileFor(pathname)); }
    catch { errors.push(`${route}: 존재하지 않는 로컬 자산 ${value}`); }
  }
}

for (const [title, routes] of titleMap) if (routes.length > 1) errors.push(`중복 title: ${title} -> ${routes.join(", ")}`);
for (const [description, routes] of descriptionMap) if (routes.length > 1) warnings.push(`중복 description: ${routes.join(", ")}`);

const generated = [...STATIC_ROUTES].sort();
const discovered = [...new Set(staticIndexable)].sort();
for (const route of discovered) if (!generated.includes(route)) errors.push(`사이트맵 매니페스트 누락: ${route}`);
for (const route of generated) if (!discovered.includes(route)) errors.push(`사이트맵 매니페스트에 noindex/없는 경로 포함: ${route}`);

const sourceFiles = (await walk(root)).filter((file) => /\.(?:js|mjs|html|toml|txt)$/i.test(file) && !file.includes(`${path.sep}__MACOSX${path.sep}`));
for (const file of sourceFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const text = await fs.readFile(file, "utf8");
  if (/https:\/\/[a-z0-9.-]+\.pages\.dev/i.test(text) && rel !== "tools/setup-pages-dev-bulk-redirect.mjs") {
    errors.push(`${rel}: Cloudflare Pages 임시 도메인 하드코딩 발견`);
  }
  for (const match of text.matchAll(/["'](\/post\/[a-z0-9][a-z0-9-]*)(["'])/gi)) {
    const candidate = match[1];
    if (!candidate.endsWith("/")) errors.push(`${rel}: 후행 슬래시 없는 게시물 URL ${candidate}`);
  }
}


const robotsSource = await fs.readFile(path.join(root, "functions", "robots.txt.js"), "utf8");
if (!robotsSource.includes("Disallow: /api/")) errors.push("functions/robots.txt.js: /api/ Disallow 누락");
if (/Disallow:\s*\/hotel-promotions\//.test(robotsSource)) errors.push("functions/robots.txt.js: hotel-promotions는 noindex로 제어해야 하며 robots.txt에서 차단하면 안 됨");

const routesConfig = JSON.parse(await fs.readFile(path.join(publicDir, "_routes.json"), "utf8"));
if (!routesConfig.include?.includes("/")) errors.push("public/_routes.json: 홈 query noindex 적용을 위한 / Functions route 누락");
if (!routesConfig.include?.includes("/destinations/")) errors.push("public/_routes.json: /destinations/?survey=1 noindex 적용을 위한 route 누락");

const packageJson = JSON.parse(await fs.readFile(path.join(root, "package.json"), "utf8"));
if (!String(packageJson.scripts?.build || "").includes("npm run seo:normalize")) errors.push("package.json: build 파이프라인에 seo:normalize 누락");
if (!packageJson.scripts?.["cloudflare:pages-dev-redirect"]) errors.push("package.json: pages.dev Bulk Redirect 설정 스크립트 누락");

for (const name of ["first-trip", "near-trip", "family-trip", "quiet-stay"]) {
  const sourcePath = path.join(root, "src", "purpose-pages", "data", "ho-chi-minh-city", `${name}.json`);
  const data = JSON.parse(await fs.readFile(sourcePath, "utf8"));
  const serialized = JSON.stringify(data);
  if (serialized.includes('"href":"/destinations/ho-chi-minh-city"')) errors.push(`${path.relative(root, sourcePath)}: 도시 breadcrumb 후행 슬래시 누락`);
}

const redirectCsv = await fs.readFile(path.join(root, "cloudflare", "pages-dev-to-custom-domain.csv"), "utf8");
if (!redirectCsv.includes("wacky-travel.pages.dev,https://bestayable.com,301,TRUE,TRUE,TRUE,TRUE")) {
  errors.push("cloudflare/pages-dev-to-custom-domain.csv: pages.dev -> bestayable.com 301 Bulk Redirect 설정 불일치");
}
const redirectSetupSource = await fs.readFile(path.join(root, "tools", "setup-pages-dev-bulk-redirect.mjs"), "utf8");
for (const required of ["status_code: 301", "include_subdomains: true", "subpath_matching: true", "preserve_query_string: true", "preserve_path_suffix: true"]) {
  if (!redirectSetupSource.includes(required)) errors.push(`tools/setup-pages-dev-bulk-redirect.mjs: Bulk Redirect 옵션 누락 (${required})`);
}

const middlewareSource = await fs.readFile(path.join(root, "functions", "_middleware.js"), "utf8");
const utilsSource = await fs.readFile(path.join(root, "functions", "_utils.js"), "utf8");
const postSource = await fs.readFile(path.join(root, "functions", "post", "[slug].js"), "utf8");
if (!middlewareSource.includes("JsonLdHandler")) errors.push("functions/_middleware.js: JSON-LD 절대 URL 변환 처리 누락");
if (!middlewareSource.includes("ArchiveStructuredDataHandler")) errors.push("functions/_middleware.js: 동적 호텔 목록 ItemList 구조화 데이터 처리 누락");
if (!/JSON\.stringify\(obj\)\.replace\(\/<\/g, ["']\\\\u003c["']\)/.test(utilsSource)) errors.push("functions/_utils.js: JSON-LD < 이스케이프 처리 누락");
if (!postSource.includes('const articleId = `${canonical.toString()}#article`;')) errors.push("functions/post/[slug].js: BlogPosting @id 연결 누락");
if (!postSource.includes('const webPageId = `${canonical.toString()}#webpage`;')) errors.push("functions/post/[slug].js: WebPage @id 연결 누락");
if (!postSource.includes('"@id": organizationId')) errors.push("functions/post/[slug].js: publisher Organization @id 연결 누락");
if (!/width:\s*520,[\s\S]*?height:\s*520/.test(postSource)) errors.push("functions/post/[slug].js: publisher 로고 실제 크기 520x520 미반영");
if (!postSource.includes("buildHotelAboutJsonLd")) errors.push("functions/post/[slug].js: 호텔 리뷰 BlogPosting.about Hotel 연결 누락");
if (/itemscope itemtype="https:\/\/schema\.org\/BlogPosting"/.test(postSource)) errors.push("functions/post/[slug].js: BlogPosting microdata 중복 사용");

console.log(`SEO audit: HTML ${htmlFiles.length}개, 색인 가능 정적 경로 ${discovered.length}개, 오류 ${errors.length}개, 경고 ${warnings.length}개`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exit(1);
