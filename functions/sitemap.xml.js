const DEFAULT_SITE_ORIGIN = "https://wacky-travel.pages.dev";
const STATIC_PAGE_LASTMOD = "2026-06-14";

const STATIC_ROUTES = [
  "/",
  "/about/",
  "/destinations/",
  "/search/",
  "/destinations/taipei/",
  "/destinations/taipei/hotel-recommendations/",
  "/destinations/taipei/hotels/",
  "/destinations/taipei/travel-guide/",
  "/destinations/taipei/hotel-guide/",
  "/destinations/taipei/hotel-location-survey/",
  "/destinations/taipei/first-trip/",
  "/destinations/taipei/value-hotel/",
  "/destinations/taipei/near-trip/",
  "/destinations/taipei/family-trip/",
  "/destinations/taipei/quiet-stay/",
  "/destinations/osaka/",
  "/destinations/osaka/hotel-recommendations/",
  "/destinations/osaka/hotels/",
  "/destinations/osaka/travel-guide/",
  "/destinations/osaka/hotel-guide/",
  "/destinations/osaka/hotel-location-survey/",
  "/destinations/osaka/first-trip/",
  "/destinations/osaka/value-hotel/",
  "/destinations/osaka/near-trip/",
  "/destinations/osaka/family-trip/",
  "/destinations/osaka/quiet-stay/",
  "/destinations/tokyo/",
  "/destinations/tokyo/hotel-recommendations/",
  "/destinations/tokyo/hotels/",
  "/destinations/tokyo/travel-guide/",
  "/destinations/tokyo/hotel-guide/",
  "/destinations/tokyo/hotel-location-survey/",
  "/destinations/tokyo/first-trip/",
  "/destinations/tokyo/value-hotel/",
  "/destinations/tokyo/near-trip/",
  "/destinations/tokyo/family-trip/",
  "/destinations/tokyo/quiet-stay/",
  "/destinations/fukuoka/",
  "/destinations/fukuoka/hotel-recommendations/",
  "/destinations/fukuoka/hotels/",
  "/destinations/fukuoka/travel-guide/",
  "/destinations/fukuoka/hotel-guide/",
  "/destinations/fukuoka/hotel-location-survey/",
  "/destinations/fukuoka/first-trip/",
  "/destinations/fukuoka/value-hotel/",
  "/destinations/fukuoka/near-trip/",
  "/destinations/fukuoka/family-trip/",
  "/destinations/fukuoka/quiet-stay/",
  "/destinations/sapporo/",
  "/destinations/sapporo/hotel-recommendations/",
  "/destinations/sapporo/hotels/",
  "/destinations/sapporo/travel-guide/",
  "/destinations/sapporo/hotel-guide/",
  "/destinations/sapporo/hotel-location-survey/",
  "/destinations/sapporo/first-trip/",
  "/destinations/sapporo/value-hotel/",
  "/destinations/sapporo/near-trip/",
  "/destinations/sapporo/family-trip/",
  "/destinations/sapporo/quiet-stay/",
  "/destinations/okinawa/",
  "/destinations/okinawa/hotel-recommendations/",
  "/destinations/okinawa/hotels/",
  "/destinations/okinawa/travel-guide/",
  "/destinations/okinawa/hotel-guide/",
  "/destinations/okinawa/hotel-location-survey/",
  "/destinations/okinawa/first-trip/",
  "/destinations/okinawa/value-hotel/",
  "/destinations/okinawa/near-trip/",
  "/destinations/okinawa/family-trip/",
  "/destinations/okinawa/quiet-stay/",
  "/destinations/da-nang/",
  "/destinations/da-nang/hotel-recommendations/",
  "/destinations/da-nang/hotels/",
  "/destinations/da-nang/travel-guide/",
  "/destinations/da-nang/hotel-guide/",
  "/destinations/da-nang/hotel-location-survey/",
  "/destinations/da-nang/first-trip/",
  "/destinations/da-nang/value-hotel/",
  "/destinations/da-nang/near-trip/",
  "/destinations/da-nang/family-trip/",
  "/destinations/da-nang/quiet-stay/",
  "/destinations/nha-trang/",
  "/destinations/nha-trang/hotel-recommendations/",
  "/destinations/nha-trang/hotels/",
  "/destinations/nha-trang/travel-guide/",
  "/destinations/nha-trang/hotel-guide/",
  "/destinations/nha-trang/hotel-location-survey/",
  "/destinations/nha-trang/first-trip/",
  "/destinations/nha-trang/value-hotel/",
  "/destinations/nha-trang/near-trip/",
  "/destinations/nha-trang/family-trip/",
  "/destinations/nha-trang/quiet-stay/",
  "/destinations/ho-chi-minh-city/",
  "/destinations/ho-chi-minh-city/hotel-recommendations/",
  "/destinations/ho-chi-minh-city/hotels/",
  "/destinations/ho-chi-minh-city/travel-guide/",
  "/destinations/ho-chi-minh-city/hotel-guide/",
  "/destinations/ho-chi-minh-city/hotel-location-survey/",
  "/destinations/ho-chi-minh-city/first-trip/",
  "/destinations/ho-chi-minh-city/value-hotel/",
  "/destinations/ho-chi-minh-city/near-trip/",
  "/destinations/ho-chi-minh-city/family-trip/",
  "/destinations/ho-chi-minh-city/quiet-stay/",
  "/destinations/phu-quoc/",
  "/destinations/phu-quoc/hotel-recommendations/",
  "/destinations/phu-quoc/hotels/",
  "/destinations/phu-quoc/travel-guide/",
  "/destinations/phu-quoc/hotel-guide/",
  "/destinations/phu-quoc/hotel-location-survey/",
  "/destinations/phu-quoc/first-trip/",
  "/destinations/phu-quoc/value-hotel/",
  "/destinations/phu-quoc/near-trip/",
  "/destinations/phu-quoc/family-trip/",
  "/destinations/phu-quoc/quiet-stay/",
];

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

function normalizePath(path) {
  const raw = String(path || "/").trim();
  if (!raw || raw === "/") return "/";
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

function normalizeLoc(loc) {
  const raw = String(loc || "").trim();
  if (!raw) return "";
  if (raw.endsWith("/")) return raw;
  return `${raw}/`;
}

function addUrl(urlMap, item) {
  const loc = normalizeLoc(item.loc);
  if (!loc) return;
  const previous = urlMap.get(loc);
  const lastmod = item.lastmod ? String(item.lastmod).slice(0, 10) : "";
  if (!previous || (lastmod && lastmod > String(previous.lastmod || ""))) {
    urlMap.set(loc, { loc, lastmod });
  }
}

async function safeAll(db, sql) {
  try {
    const rows = await db.prepare(sql).all();
    return rows.results || [];
  } catch {
    return [];
  }
}

export async function onRequestGet({ env, request }) {
  const requestOrigin = new URL(request.url).origin;
  const origin = requestOrigin || DEFAULT_SITE_ORIGIN;

  const [posts, destinations] = await Promise.all([
    safeAll(env.TRAVEL_DB, `
      SELECT slug, updated_at
      FROM posts
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT 2000
    `),
    safeAll(env.TRAVEL_DB, `
      SELECT slug, country, updated_at
      FROM destinations
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT 500
    `)
  ]);

  const countryMap = new Map();
  destinations.forEach((item) => {
    const slug = countryToSlug(item.country);
    if (!slug) return;
    const previous = countryMap.get(slug);
    if (!previous || String(item.updated_at || "") > String(previous.lastmod || "")) {
      countryMap.set(slug, { slug, lastmod: item.updated_at });
    }
  });

  const urlMap = new Map();

  STATIC_ROUTES.forEach((route) => {
    addUrl(urlMap, {
      loc: `${origin}${normalizePath(route)}`,
      lastmod: STATIC_PAGE_LASTMOD
    });
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
      lastmod: item.updated_at
    });
  });

  const urls = Array.from(urlMap.values());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc>${item.lastmod ? `<lastmod>${xmlEscape(item.lastmod)}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
