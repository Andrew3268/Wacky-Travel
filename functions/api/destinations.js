import { okJson, requireAdmin } from "../_utils.js";

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const status = String(url.searchParams.get("status") || "published").trim();
  const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "50", 10)));
  const rows = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
           best_season, airport_info, transport_summary, status, published_at, updated_at
    FROM destinations
    WHERE (? = 'all' OR status = ?)
    ORDER BY updated_at DESC, name ASC
    LIMIT ?
  `).bind(status, status, limit).all();
  return okJson({ items: rows.results || [] }, { headers: { "cache-control": "public, max-age=60, s-maxage=300" } });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });

  const now = new Date().toISOString();
  const slug = String(body.slug || "").trim();
  const name = String(body.name || "").trim();
  if (!slug || !name) return okJson({ message: "slug, name은 필수입니다." }, { status: 400 });

  await env.TRAVEL_DB.prepare(`
    INSERT INTO destinations (
      slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
      best_season, airport_info, transport_summary, status, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      country = excluded.country,
      city = excluded.city,
      title = excluded.title,
      meta_description = excluded.meta_description,
      summary = excluded.summary,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      best_season = excluded.best_season,
      airport_info = excluded.airport_info,
      transport_summary = excluded.transport_summary,
      status = excluded.status,
      updated_at = excluded.updated_at
  `).bind(
    slug,
    name,
    String(body.country || "").trim(),
    String(body.city || "").trim(),
    String(body.title || name).trim(),
    String(body.meta_description || "").trim(),
    String(body.summary || "").trim(),
    String(body.cover_image || "").trim(),
    String(body.cover_image_alt || "").trim(),
    String(body.best_season || "").trim(),
    String(body.airport_info || "").trim(),
    String(body.transport_summary || "").trim(),
    String(body.status || "published").trim(),
    String(body.published_at || now),
    now
  ).run();

  return okJson({ ok: true, slug });
}
