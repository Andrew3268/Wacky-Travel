const DEFAULT_SITE_ORIGIN = "https://wacky-travel.pages.dev";

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
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
      SELECT slug, updated_at
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

  const urls = [
    { loc: `${origin}/` },
    { loc: `${origin}/about/` },
    { loc: `${origin}/destinations/` },
    { loc: `${origin}/hotels/` },
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
