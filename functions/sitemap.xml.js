import { STATIC_ROUTES } from "../lib/seo/static-routes.js";
import { getSiteOrigin, normalizePagePath } from "../lib/seo/site-url.js";

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function countryToSlug(value) {
  const aliases = {
    "베트남": "vietnam",
    "일본": "japan",
    "태국": "thailand",
    "대한민국": "korea",
    "한국": "korea",
    "대만": "taiwan",
    "싱가포르": "singapore",
    "말레이시아": "malaysia",
    "인도네시아": "indonesia",
    "필리핀": "philippines",
    "홍콩": "hong-kong",
    "마카오": "macau",
    "중국": "china",
    "미국": "usa",
    "프랑스": "france",
    "이탈리아": "italy",
    "스페인": "spain"
  };
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (aliases[raw]) return aliases[raw];
  return raw.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9가-힣]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function addUrl(urlMap, { loc, lastmod = "" }) {
  const normalizedLoc = String(loc || "").trim();
  if (!normalizedLoc) return;
  const normalizedLastmod = normalizeLastmod(lastmod);
  const previous = urlMap.get(normalizedLoc);
  if (!previous || (normalizedLastmod && normalizedLastmod > previous.lastmod)) {
    urlMap.set(normalizedLoc, { loc: normalizedLoc, lastmod: normalizedLastmod });
  }
}

function normalizeLastmod(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : "";
  return date.toISOString().slice(0, 10);
}

async function safeAll(db, sql) {
  try {
    if (!db) return [];
    const rows = await db.prepare(sql).all();
    return rows.results || [];
  } catch {
    return [];
  }
}

export async function onRequestGet({ env, request }) {
  const origin = getSiteOrigin(env, request);

  const [posts, destinations] = await Promise.all([
    safeAll(env.TRAVEL_DB, `
      SELECT slug, updated_at, published_at
      FROM posts
      WHERE LOWER(TRIM(COALESCE(status, 'published'))) = 'published'
      ORDER BY COALESCE(updated_at, published_at) DESC
      LIMIT 20000
    `),
    safeAll(env.TRAVEL_DB, `
      SELECT slug, country, updated_at
      FROM destinations
      WHERE LOWER(TRIM(COALESCE(status, 'published'))) = 'published'
      ORDER BY updated_at DESC
      LIMIT 5000
    `)
  ]);

  const urlMap = new Map();

  // Static routes are generated from actual indexable HTML files at build time.
  STATIC_ROUTES.forEach((route) => {
    addUrl(urlMap, { loc: `${origin}${normalizePagePath(route)}` });
  });

  const countryMap = new Map();
  destinations.forEach((item) => {
    const slug = countryToSlug(item.country);
    if (!slug) return;
    const previous = countryMap.get(slug);
    if (!previous || String(item.updated_at || "") > String(previous.lastmod || "")) {
      countryMap.set(slug, { slug, lastmod: item.updated_at });
    }
  });

  Array.from(countryMap.values()).forEach((item) => {
    addUrl(urlMap, {
      loc: `${origin}/countries/${encodeURIComponent(item.slug)}/`,
      lastmod: item.lastmod
    });
  });

  destinations.forEach((item) => {
    const slug = String(item.slug || "").trim();
    if (!slug) return;
    addUrl(urlMap, {
      loc: `${origin}/destinations/${encodeURIComponent(slug)}/`,
      lastmod: item.updated_at
    });
  });

  posts.forEach((item) => {
    const slug = String(item.slug || "").trim();
    if (!slug) return;
    addUrl(urlMap, {
      loc: `${origin}/post/${encodeURIComponent(slug)}/`,
      lastmod: item.updated_at || item.published_at
    });
  });

  const urls = Array.from(urlMap.values()).sort((a, b) => a.loc.localeCompare(b.loc, "en"));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc>${item.lastmod ? `<lastmod>${xmlEscape(item.lastmod)}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=900, s-maxage=900",
      "x-robots-tag": "noindex"
    }
  });
}
