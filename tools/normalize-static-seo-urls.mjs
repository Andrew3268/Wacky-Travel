import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isPageLikePath, normalizePagePath } from "../lib/seo/site-url.js";
import { STATIC_ROUTE_LASTMOD } from "../lib/seo/static-routes.js";
import { injectGoogleTagIntoHead, isGoogleAnalyticsEligiblePath } from "../lib/analytics/google-tag.js";

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
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
const LOGO_URL = `${SITE_ORIGIN}/assets/images/logo.png`;
const CITY_INFO = Object.freeze({
  "osaka": { name: "오사카", alternateName: "Osaka", country: "일본" },
  "tokyo": { name: "도쿄", alternateName: "Tokyo", country: "일본" },
  "fukuoka": { name: "후쿠오카", alternateName: "Fukuoka", country: "일본" },
  "sapporo": { name: "삿포로", alternateName: "Sapporo", country: "일본" },
  "okinawa": { name: "오키나와", alternateName: "Okinawa", country: "일본" },
  "hanoi": { name: "하노이", alternateName: "Hanoi", country: "베트남" },
  "ho-chi-minh-city": { name: "호치민", alternateName: "Ho Chi Minh City", country: "베트남" },
  "da-nang": { name: "다낭", alternateName: "Da Nang", country: "베트남" },
  "nha-trang": { name: "나트랑", alternateName: "Nha Trang", country: "베트남" },
  "phu-quoc": { name: "푸꾸옥", alternateName: "Phu Quoc", country: "베트남" },
  "taipei": { name: "타이베이", alternateName: "Taipei", country: "대만" },
  "taichung": { name: "타이중", alternateName: "Taichung", country: "대만" },
  "tainan": { name: "타이난", alternateName: "Tainan", country: "대만" },
  "kaohsiung": { name: "가오슝", alternateName: "Kaohsiung", country: "대만" },
  "hualien": { name: "화롄", alternateName: "Hualien", country: "대만" }
});

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
    const canonical = `${SITE_ORIGIN}${route}`;
    const type = normalized["@type"];

    if (type === "BreadcrumbList") {
      normalized["@id"] = normalized["@id"] || `${canonical}#breadcrumb`;
    }

    if (type === "ItemList" && Array.isArray(normalized.itemListElement)) {
      normalized.itemListElement = normalized.itemListElement.filter((item) => {
        const target = item && typeof item === "object" ? (item.url || item.item || "") : "";
        return !isConditionalDiscoveryPath(target);
      });
      normalized.itemListElement = normalized.itemListElement.map((item, index) => ({
        ...item,
        position: index + 1
      }));
      normalized["@id"] = normalized["@id"] || `${canonical}#itemlist`;
      normalized.url = normalized.url || canonical;
    }

    if (type === "FAQPage") {
      normalized["@id"] = normalized["@id"] || `${canonical}#faq`;
    }

    if (type === "TouristDestination") {
      delete normalized.inLanguage;
      normalized["@id"] = normalized["@id"] || `${canonical}#destination`;
      normalized.url = canonical;
      normalized.isPartOf = { "@id": WEBSITE_ID };
    }

    if (GUIDE_ROUTE_RE.test(route) && type === "Article") {
      const knownDate = String(STATIC_ROUTE_LASTMOD[route] || normalized.dateModified || normalized.datePublished || "").slice(0, 10);
      normalized["@id"] = `${canonical}#article`;
      normalized.author = {
        "@type": "Person",
        "@id": AUTHOR_ID,
        name: AUTHOR_NAME,
        url: AUTHOR_URL
      };
      normalized.publisher = {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Be Stayable",
        url: `${SITE_ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
          width: 520,
          height: 520
        }
      };
      normalized.mainEntityOfPage = { "@id": `${canonical}#webpage` };
      if (!normalized.datePublished && knownDate) normalized.datePublished = knownDate;
      if (!normalized.dateModified && knownDate) normalized.dateModified = knownDate;
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

function stripTags(value = "") {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:39|039);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetaContent(html = "", key = "name", value = "") {
  const tag = (html.match(/<meta\b[^>]*>/gi) || []).find((item) => getAttribute(item, key).toLowerCase() === value.toLowerCase());
  return tag ? getAttribute(tag, "content") : "";
}

function extractPageTitle(html = "") {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return stripTags(match?.[1] || "");
}

function parseJsonLdScripts(html = "") {
  const values = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (Array.isArray(parsed)) values.push(...parsed.filter((item) => item && typeof item === "object"));
      else if (parsed && typeof parsed === "object") values.push(parsed);
    } catch {}
  }
  return values;
}

function findSchemaByType(html = "", type = "") {
  return parseJsonLdScripts(html).find((schema) => schema?.["@type"] === type) || null;
}

function appendJsonLd(html, schema) {
  const safe = JSON.stringify(schema).replaceAll("<", "\\u003c");
  return html.replace(/<\/head>/i, `<script type="application/ld+json">${safe}</script></head>`);
}

function buildBreadcrumbSchema(route, city = null, currentName = "") {
  const canonical = `${SITE_ORIGIN}${route}`;
  const items = [
    { "@type": "ListItem", position: 1, name: "홈", item: `${SITE_ORIGIN}/` },
    { "@type": "ListItem", position: 2, name: "여행지", item: `${SITE_ORIGIN}/destinations/` }
  ];
  if (city) {
    items.push({ "@type": "ListItem", position: 3, name: city.name, item: `${SITE_ORIGIN}/destinations/${city.slug}/` });
  }
  if (currentName) {
    items.push({ "@type": "ListItem", position: items.length + 1, name: currentName, item: canonical });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items
  };
}

function buildCityItemList(city, route) {
  const canonical = `${SITE_ORIGIN}${route}`;
  const pages = [
    ["first-trip", `처음 가는 ${city.name} 숙소 추천`],
    ["value-hotel", `${city.name} 가성비 숙소 추천`],
    ["near-trip", `${city.name} 일정·근교 이동 숙소 추천`],
    ["family-trip", `${city.name} 가족 여행 숙소 추천`],
    ["quiet-stay", `${city.name} 조용한 숙소 추천`],
    ["hotel-guide", `${city.name} 호텔 위치 가이드`],
    ["travel-guide", `${city.name} 여행 가이드`]
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical}#itemlist`,
    url: canonical,
    name: `${city.name} 숙소·여행 가이드`,
    itemListElement: pages.map(([slug, name], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      url: `${canonical}${slug}/`
    }))
  };
}

function extractDestinationIndexItems(html = "") {
  const seen = new Set();
  const items = [];
  for (const match of html.matchAll(/<a\b[^>]*class=["'][^"']*destination-city-card[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = normalizePagePath(new URL(match[1], SITE_ORIGIN).pathname);
    if (!/^\/destinations\/[^/]+\/$/.test(href) || seen.has(href)) continue;
    const strong = match[2].match(/<strong\b[^>]*>([\s\S]*?)<\/strong>/i);
    const name = stripTags(strong?.[1] || match[2]);
    if (!name) continue;
    seen.add(href);
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name,
      url: `${SITE_ORIGIN}${href}`
    });
  }
  return items;
}

function ensureStaticStructuredData(html, route) {
  const canonical = `${SITE_ORIGIN}${route}`;
  const description = extractMetaContent(html, "name", "description");
  const pageTitle = extractPageTitle(html);
  let output = html;

  if (route === "/destinations/") {
    let breadcrumb = findSchemaByType(output, "BreadcrumbList");
    if (!breadcrumb) {
      breadcrumb = buildBreadcrumbSchema(route, null, "여행지");
      output = appendJsonLd(output, breadcrumb);
    }
    let itemList = findSchemaByType(output, "ItemList");
    if (!itemList) {
      itemList = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${canonical}#itemlist`,
        url: canonical,
        name: "Be Stayable 여행지 목록",
        itemListElement: extractDestinationIndexItems(output)
      };
      output = appendJsonLd(output, itemList);
    }
    if (!findSchemaByType(output, "CollectionPage")) {
      output = appendJsonLd(output, {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#itemlist` }
      });
    }
    return output;
  }

  const cityMatch = route.match(/^\/destinations\/([^/]+)\/$/);
  if (cityMatch) {
    const slug = cityMatch[1];
    const info = CITY_INFO[slug];
    if (!info) return output;
    const city = { ...info, slug };
    if (!findSchemaByType(output, "BreadcrumbList")) {
      output = appendJsonLd(output, buildBreadcrumbSchema(route, null, city.name));
    }
    if (!findSchemaByType(output, "TouristDestination")) {
      output = appendJsonLd(output, {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "@id": `${canonical}#destination`,
        name: city.name,
        alternateName: city.alternateName,
        description,
        url: canonical,
        containedInPlace: { "@type": "Country", name: city.country },
        isPartOf: { "@id": WEBSITE_ID }
      });
    }
    if (!findSchemaByType(output, "ItemList")) {
      output = appendJsonLd(output, buildCityItemList(city, route));
    }
    if (!findSchemaByType(output, "WebPage")) {
      output = appendJsonLd(output, {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        about: { "@id": `${canonical}#destination` },
        mainEntity: { "@id": `${canonical}#itemlist` }
      });
    }
    return output;
  }

  if (GUIDE_ROUTE_RE.test(route)) {
    const match = route.match(/^\/destinations\/([^/]+)\/(hotel-guide|travel-guide)\/$/);
    const info = match ? CITY_INFO[match[1]] : null;
    if (info && !findSchemaByType(output, "BreadcrumbList")) {
      const currentName = match[2] === "hotel-guide" ? `${info.name} 호텔 위치 가이드` : `${info.name} 여행 가이드`;
      output = appendJsonLd(output, buildBreadcrumbSchema(route, { ...info, slug: match[1] }, currentName));
    }
    if (!findSchemaByType(output, "WebPage")) {
      output = appendJsonLd(output, {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#article` }
      });
    }
    return output;
  }

  const archiveMatch = route.match(/^\/destinations\/([^/]+)\/(hotels|hotel-recommendations)\/$/);
  if (archiveMatch) {
    const info = CITY_INFO[archiveMatch[1]];
    if (!info) return output;
    const currentName = archiveMatch[2] === "hotels" ? `${info.name} 추천 호텔 리뷰` : `${info.name} 호텔 추천`;
    if (!findSchemaByType(output, "BreadcrumbList")) {
      output = appendJsonLd(output, buildBreadcrumbSchema(route, { ...info, slug: archiveMatch[1] }, currentName));
    }
    if (!findSchemaByType(output, "CollectionPage")) {
      output = appendJsonLd(output, {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: pageTitle,
        description,
        inLanguage: "ko-KR",
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        mainEntity: { "@id": `${canonical}#itemlist` }
      });
    }
    return output;
  }

  return output;
}

function extractGuideDate(html = "", property = "dateModified") {
  const pattern = new RegExp(`"${property}"\\s*:\\s*"(\\d{4}-\\d{2}-\\d{2})`, "gi");
  const matches = [...html.matchAll(pattern)];
  return matches.at(-1)?.[1] || "";
}

function formatKoreanDate(isoDate = "") {
  const match = String(isoDate || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return "";
  return `${Number(match[1])}년 ${Number(match[2])}월 ${Number(match[3])}일`;
}

function renderGuideAuthorProfile(publishedDate = "", modifiedDate = "") {
  const publishedText = formatKoreanDate(publishedDate);
  const modifiedText = formatKoreanDate(modifiedDate);
  const metaParts = [];
  if (publishedText) metaParts.push(`<time datetime="${publishedDate}">발행 ${publishedText}</time>`);
  if (modifiedText) metaParts.push(`<time datetime="${modifiedDate}">수정 ${modifiedText}</time>`);
  const metaHtml = metaParts.length
    ? metaParts.join('<span aria-hidden="true"> · </span>')
    : `<span>호텔·여행 콘텐츠 에디터</span>`;
  return `<div class="container wt-guide-author-profile-wrap"><div class="post-author-profile" itemscope itemtype="https://schema.org/Person" itemid="${AUTHOR_ID}" aria-label="작성자 및 가이드 발행·수정 정보"><img class="post-author-profile__avatar" src="/assets/images/profile.png" alt="" width="42" height="42" loading="lazy" decoding="async"/><div class="post-author-profile__body"><a class="post-author-profile__name" itemprop="url" href="/about/" rel="author"><span itemprop="name">${AUTHOR_NAME}</span></a><div class="post-author-profile__meta" aria-label="가이드 발행 및 수정 정보">${metaHtml}</div></div></div></div>`;
}

function injectGuideAuthorProfile(html, route) {
  if (!GUIDE_ROUTE_RE.test(route)) return html;
  const profile = renderGuideAuthorProfile(
    extractGuideDate(html, "datePublished"),
    extractGuideDate(html, "dateModified")
  );
  const existingProfile = /<div class="container wt-guide-author-profile-wrap">[\s\S]*?<\/div><\/div><\/div><\/div>/i;
  if (existingProfile.test(html)) return html.replace(existingProfile, profile);
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

  output = ensureStaticStructuredData(output, route);
  output = ensureGuideAuthorMeta(output, route);
  output = injectGuideAuthorProfile(output, route);
  if (isGoogleAnalyticsEligiblePath(route)) {
    output = injectGoogleTagIntoHead(output);
  }
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
