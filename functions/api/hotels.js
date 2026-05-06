import { okJson, requireAdmin } from "../_utils.js";

function safeJson(value) {
  if (Array.isArray(value)) return JSON.stringify(value);
  const text = String(value || "[]");
  try { JSON.parse(text); return text; } catch { return "[]"; }
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const destination = String(url.searchParams.get("destination") || "").trim();
  const status = String(url.searchParams.get("status") || "published").trim();
  const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "50", 10)));
  const where = [];
  const binds = [];
  if (status !== "all") { where.push("h.status = ?"); binds.push(status); }
  if (destination) { where.push("h.destination_slug = ?"); binds.push(destination); }
  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const rows = await env.TRAVEL_DB.prepare(`
    SELECT h.*, d.name AS destination_name, d.country AS destination_country
    FROM hotels h
    LEFT JOIN destinations d ON d.slug = h.destination_slug
    ${whereSql}
    ORDER BY h.updated_at DESC, h.name ASC
    LIMIT ?
  `).bind(...binds, limit).all();
  return okJson({ items: rows.results || [] }, { headers: { "cache-control": "public, max-age=60, s-maxage=300" } });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  const now = new Date().toISOString();
  const slug = String(body.slug || "").trim();
  const destinationSlug = String(body.destination_slug || "").trim();
  const name = String(body.name || "").trim();
  if (!slug || !destinationSlug || !name) return okJson({ message: "slug, destination_slug, name은 필수입니다." }, { status: 400 });

  await env.TRAVEL_DB.prepare(`
    INSERT INTO hotels (
      slug, destination_slug, name, name_en, area, address, star_rating, price_level, summary, meta_description,
      cover_image, cover_image_alt, gallery_json, pros_json, cons_json, suitable_for_json,
      checkin_time, checkout_time, distance_summary, nearby_spots_json, review_summary,
      status, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      destination_slug = excluded.destination_slug,
      name = excluded.name,
      name_en = excluded.name_en,
      area = excluded.area,
      address = excluded.address,
      star_rating = excluded.star_rating,
      price_level = excluded.price_level,
      summary = excluded.summary,
      meta_description = excluded.meta_description,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      gallery_json = excluded.gallery_json,
      pros_json = excluded.pros_json,
      cons_json = excluded.cons_json,
      suitable_for_json = excluded.suitable_for_json,
      checkin_time = excluded.checkin_time,
      checkout_time = excluded.checkout_time,
      distance_summary = excluded.distance_summary,
      nearby_spots_json = excluded.nearby_spots_json,
      review_summary = excluded.review_summary,
      status = excluded.status,
      updated_at = excluded.updated_at
  `).bind(
    slug, destinationSlug, name,
    String(body.name_en || "").trim(),
    String(body.area || "").trim(),
    String(body.address || "").trim(),
    String(body.star_rating || "").trim(),
    String(body.price_level || "").trim(),
    String(body.summary || "").trim(),
    String(body.meta_description || "").trim(),
    String(body.cover_image || "").trim(),
    String(body.cover_image_alt || "").trim(),
    safeJson(body.gallery_json || body.gallery),
    safeJson(body.pros_json || body.pros),
    safeJson(body.cons_json || body.cons),
    safeJson(body.suitable_for_json || body.suitable_for),
    String(body.checkin_time || "").trim(),
    String(body.checkout_time || "").trim(),
    String(body.distance_summary || "").trim(),
    safeJson(body.nearby_spots_json || body.nearby_spots),
    String(body.review_summary || "").trim(),
    String(body.status || "published").trim(),
    String(body.published_at || now),
    now
  ).run();

  return okJson({ ok: true, slug });
}
