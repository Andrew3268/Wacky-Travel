import { okJson, requireAdmin } from "../../_utils.js";

export async function onRequestGet({ params, env }) {
  const slug = decodeURIComponent(String(params.slug || ""));
  const item = await env.TRAVEL_DB.prepare(`
    SELECT h.*, d.name AS destination_name, d.country AS destination_country, d.city AS destination_city
    FROM hotels h
    LEFT JOIN destinations d ON d.slug = h.destination_slug
    WHERE h.slug = ?
  `).bind(slug).first();
  if (!item) return okJson({ message: "호텔을 찾을 수 없습니다." }, { status: 404 });

  const links = await env.TRAVEL_DB.prepare(`
    SELECT id, provider, label, affiliate_url, button_text, sort_order
    FROM hotel_affiliate_links
    WHERE hotel_slug = ? AND is_active = 1
    ORDER BY sort_order ASC, id ASC
  `).bind(slug).all();

  const posts = await env.TRAVEL_DB.prepare(`
    SELECT p.slug, p.title, p.summary, p.cover_image, p.cover_image_alt, r.relation_type, r.sort_order
    FROM post_hotel_relations r
    JOIN posts p ON p.slug = r.post_slug
    WHERE r.hotel_slug = ? AND p.status = 'published'
    ORDER BY r.sort_order ASC, p.updated_at DESC
    LIMIT 8
  `).bind(slug).all();

  return okJson({ item, links: links.results || [], posts: posts.results || [] });
}

export async function onRequestDelete({ params, env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const slug = decodeURIComponent(String(params.slug || ""));
  await env.TRAVEL_DB.prepare(`UPDATE hotels SET status = 'draft', updated_at = ? WHERE slug = ?`).bind(new Date().toISOString(), slug).run();
  return okJson({ ok: true, slug });
}
