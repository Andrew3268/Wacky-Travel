import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isPageLikePath, normalizePagePath } from "../lib/seo/site-url.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const SITE_ORIGIN = "https://bestayable.com";
const GUIDE_ROUTE_RE = /^\/destinations\/[^/]+\/(?:hotel-guide|travel-guide)\/$/;
const SURVEY_ROUTE_RE = /^\/destinations\/[^/]+\/hotel-location-survey\/$/;
const NOINDEX_FOLLOW = "noindex,follow,noarchive";
const AUTHOR_NAME = "Be Stayable Editor";
const AUTHOR_ID = `${SITE_ORIGIN}/about/#author`;
const AUTHOR_URL = `${SITE_ORIGIN}/about/`;

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

function absoluteUrl(value, fallbackPath = "/") {
  const raw = String(value || "").trim();
  if (!raw) return `${SITE_ORIGIN}${fallbackPath}`;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `${SITE_ORIGIN}${raw}`;
  return raw;
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2] : "";
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`(\\b${name}\\s*=\\s*)(["'])(.*?)\\2`, "i");
  if (pattern.test(tag)) return tag.replace(pattern, `$1"${value}"`);
  return tag.replace(/\s*\/>$|>$/, (ending) => ` ${name}="${value}"${ending}`);
}

function isConditionalDiscoveryPath(value = "") {
  try {
    const pathname = normalizePagePath(new URL(value, SITE_ORIGIN).pathname);
    return /^\/destinations\/[^/]+\/(?:hotels|hotel-recommendations|hotel-location-survey)\/$/.test(pathname);
  } catch {
    return false;
  }
}

function normalizeJsonLd(value, route) {
  if (Array.isArray(value)) return value.map((item) => normalizeJsonLd(item, route));
  if (value && typeof value === "object") {
    const normalized = Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeJsonLd(item, route)])
    );

    if (normalized["@type"] === "ItemList" && Array.isArray(normalized.itemListElement)) {
      normalized.itemListElement = normalized.itemListElement.filter((item) => {
        const target = item && typeof item === "object" ? (item.url || item.item || "") : "";
        return !isConditionalDiscoveryPath(target);
      });
      normalized.itemListElement = normalized.itemListElement.map((item, index) => ({
        ...item,
        position: index + 1
      }));
    }

    if (GUIDE_ROUTE_RE.test(route) && normalized["@type"] === "Article") {
      normalized.author = {
        "@type": "Person",
        "@id": AUTHOR_ID,
        name: AUTHOR_NAME,
        url: AUTHOR_URL
      };
    }

    return normalized;
  }
  if (typeof value === "string" && value.startsWith("/")) return `${SITE_ORIGIN}${value}`;
  return value;
}

function normalizeInternalHref(rawHref = "") {
  const raw = String(rawHref || "").trim();
  if (!raw || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(raw) || raw.startsWith("//")) return raw;
  try {
    const url = new URL(raw, SITE_ORIGIN);
    if (url.origin !== SITE_ORIGIN || !isPageLikePath(url.pathname)) return raw;
    url.pathname = normalizePagePath(url.pathname);
    if (/^https?:\/\//i.test(raw)) return url.toString();
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return raw;
  }
}

function extractGuideModifiedDate(html = "") {
  const matches = [...html.matchAll(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})/gi)];
  return matches.at(-1)?.[1] || "";
}

function formatKoreanDate(isoDate = "") {
  const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  return `${Number(match[1])}년 ${Number(match[2])}월 ${Number(match[3])}일`;
}

function renderGuideAuthorProfile(modifiedDate = "") {
  const dateText = formatKoreanDate(modifiedDate);
  const metaHtml = dateText
    ? `<time datetime="${modifiedDate}">최종 수정 ${dateText}</time>`
    : `<span>호텔·여행 콘텐츠 에디터</span>`;
  return `<div class="container wt-guide-author-profile-wrap"><div class="post-author-profile" itemprop="author" itemscope itemtype="https://schema.org/Person" itemid="${AUTHOR_ID}" aria-label="작성자 및 가이드 수정 정보"><img class="post-author-profile__avatar" src="/assets/images/profile.png" alt="" width="42" height="42" loading="lazy" decoding="async"/><div class="post-author-profile__body"><a class="post-author-profile__name" itemprop="url" href="/about/" rel="author"><span itemprop="name">${AUTHOR_NAME}</span></a><div class="post-author-profile__meta" aria-label="가이드 수정 정보">${metaHtml}</div></div></div></div>`;
}

function injectGuideAuthorProfile(html, route) {
  if (!GUIDE_ROUTE_RE.test(route) || html.includes('class="post-author-profile"')) return html;
  const profile = renderGuideAuthorProfile(extractGuideModifiedDate(html));
  const mainIndex = html.search(/<main\b/i);
  if (mainIndex < 0) return html;

  const heroOpen = html.slice(mainIndex).search(/<section\b[^>]*class=["'][^"']*(?:wt-city-guide-hero|wt-page-hero)[^"']*["'][^>]*>/i);
  if (heroOpen >= 0) {
    const absoluteHeroOpen = mainIndex + heroOpen;
    const heroClose = html.indexOf("</section>", absoluteHeroOpen);
    if (heroClose >= 0) {
      const insertAt = heroClose + "</section>".length;
      return `${html.slice(0, insertAt)}${profile}${html.slice(insertAt)}`;
    }
  }

  const mainOpenEnd = html.indexOf(">", mainIndex);
  if (mainOpenEnd < 0) return html;
  return `${html.slice(0, mainOpenEnd + 1)}${profile}${html.slice(mainOpenEnd + 1)}`;
}

function ensureGuideAuthorMeta(html, route) {
  if (!GUIDE_ROUTE_RE.test(route) || /<meta\b[^>]*name=["']author["']/i.test(html)) return html;
  return html.replace(/<\/head>/i, `<meta name="author" content="${AUTHOR_NAME}"/></head>`);
}

function normalizeHtml(html, route) {
  const canonical = `${SITE_ORIGIN}${route}`;

  let output = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const rel = getAttribute(tag, "rel").toLowerCase().split(/\s+/);
    if (!rel.includes("canonical")) return tag;
    return setAttribute(tag, "href", canonical);
  });

  output = output.replace(/<meta\b[^>]*>/gi, (tag) => {
    const property = getAttribute(tag, "property").toLowerCase();
    const name = getAttribute(tag, "name").toLowerCase();
    const content = getAttribute(tag, "content");

    if (property === "og:url") return setAttribute(tag, "content", canonical);
    if (name === "robots" && SURVEY_ROUTE_RE.test(route)) return setAttribute(tag, "content", NOINDEX_FOLLOW);
    if (property === "og:image" || name === "twitter:image") {
      return setAttribute(tag, "content", absoluteUrl(content));
    }
    return tag;
  });

  output = output.replace(/<a\b[^>]*>/gi, (tag) => {
    const href = getAttribute(tag, "href");
    if (!href) return tag;
    const normalizedHref = normalizeInternalHref(href);
    return normalizedHref === href ? tag : setAttribute(tag, "href", normalizedHref);
  });

  output = output.replace(
    /(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (full, open, body, close) => {
      try {
        const parsed = JSON.parse(body.trim());
        return `${open}${JSON.stringify(normalizeJsonLd(parsed, route))}${close}`;
      } catch {
        return full;
      }
    }
  );

  output = ensureGuideAuthorMeta(output, route);
  output = injectGuideAuthorProfile(output, route);
  return output;
}

const htmlFiles = (await walk(publicDir)).filter((file) => file.endsWith(".html"));
let changed = 0;
for (const file of htmlFiles) {
  const before = await fs.readFile(file, "utf8");
  const after = normalizeHtml(before, routeFor(file));
  if (after === before) continue;
  await fs.writeFile(file, after, "utf8");
  changed += 1;
}

console.log(`Normalized static SEO URLs: ${changed}/${htmlFiles.length} HTML files changed.`);
