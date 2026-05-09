const DEFAULT_SITE_ORIGIN = "https://wacky-travel.pages.dev";

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

  const [posts, destinations, hotels] = await Promise.all([
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
    `),
    safeAll(env.TRAVEL_DB, `
      SELECT slug, destination_slug, updated_at
      FROM hotels
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT 2000
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

  const urls = [
    { loc: `${origin}/` },
    { loc: `${origin}/about/` },
    { loc: `${origin}/destinations/` },
    { loc: `${origin}/hotels/` },
    ...Array.from(countryMap.values()).map((item) => ({ loc: `${origin}/countries/${encodeURIComponent(item.slug)}`, lastmod: item.lastmod })),
    ...destinations.map((item) => ({ loc: `${origin}/destinations/${encodeURIComponent(item.slug)}`, lastmod: item.updated_at })),
    ...destinations.map((item) => ({ loc: `${origin}/hotels/${encodeURIComponent(item.slug)}`, lastmod: item.updated_at })),
    ...hotels.map((item) => ({ loc: `${origin}/hotels/${encodeURIComponent(item.destination_slug)}/${encodeURIComponent(item.slug)}`, lastmod: item.updated_at })),
    ...posts.map((item) => ({ loc: `${origin}/post/${encodeURIComponent(item.slug)}`, lastmod: item.updated_at }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc>${item.lastmod ? `<lastmod>${xmlEscape(String(item.lastmod).slice(0, 10))}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
