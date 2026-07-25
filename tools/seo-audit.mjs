import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STATIC_ROUTES } from "../lib/seo/static-routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const errors = [];
const warnings = [];

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
  const noindex = isNoindex(html) || route.startsWith("/admin/") || ["/404.html", "/add.html", "/edit.html"].includes(route);
  if (!noindex) staticIndexable.push(route);

  const jsonScripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const match of jsonScripts) {
    try { JSON.parse(match[1].trim()); }
    catch (error) { errors.push(`${route}: JSON-LD 문법 오류 (${error.message})`); }
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
      else if (normalizePagePath(href) !== normalizePagePath(route)) errors.push(`${route}: canonical 경로 불일치 (${href})`);
      if (/[?#]/.test(href)) errors.push(`${route}: canonical에 쿼리 또는 해시 포함 (${href})`);
    }
    if (!meta(html, "name", "viewport")) errors.push(`${route}: viewport 누락`);
    if (h1Count !== 1) errors.push(`${route}: H1 개수 ${h1Count}개`);

    const requiredMeta = [
      ["property", "og:title"], ["property", "og:description"], ["property", "og:url"], ["property", "og:image"],
      ["name", "twitter:card"], ["name", "twitter:title"], ["name", "twitter:description"], ["name", "twitter:image"]
    ];
    for (const [key, value] of requiredMeta) if (!meta(html, key, value)) errors.push(`${route}: ${value} 누락`);

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
    if (pathname.startsWith("/post/") || pathname.startsWith("/countries/") || pathname.startsWith("/api/")) continue;
    try { await fs.access(localFileFor(pathname)); }
    catch { errors.push(`${route}: 존재하지 않는 내부 링크 ${href}`); }
  }

  for (const match of html.matchAll(/<(?:script|img|source|link)\b[^>]*\b(?:src|href)=(["'])(.*?)\1/gi)) {
    const value = match[2].trim();
    if (!/^\/(?:assets|img)\//.test(value) && value !== "/favicon.ico") continue;
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
  if (text.includes("https://wacky-travel.pages.dev") && !["lib/seo/site-url.js", "wrangler.toml", "tools/seo-audit.mjs"].includes(rel)) {
    errors.push(`${rel}: 운영 도메인 하드코딩 발견`);
  }
  for (const match of text.matchAll(/["'](\/post\/[a-z0-9][a-z0-9-]*)(["'])/gi)) {
    const candidate = match[1];
    if (!candidate.endsWith("/")) errors.push(`${rel}: 후행 슬래시 없는 게시물 URL ${candidate}`);
  }
}

if (!(await fs.readFile(path.join(root, "functions", "_middleware.js"), "utf8")).includes("JsonLdHandler")) {
  errors.push("functions/_middleware.js: JSON-LD 절대 URL 변환 처리 누락");
}

console.log(`SEO audit: HTML ${htmlFiles.length}개, 색인 가능 정적 경로 ${discovered.length}개, 오류 ${errors.length}개, 경고 ${warnings.length}개`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exit(1);
