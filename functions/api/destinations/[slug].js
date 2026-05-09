import { okJson, requireAdmin } from "../../_utils.js";
import { ensureTravelSettingsTables } from "../../../lib/travel/travel-settings.js";

export async function onRequestGet({ params, env }) {
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const slug = decodeURIComponent(String(params.slug || ""));
  const item = await env.TRAVEL_DB.prepare(`
    SELECT * FROM destinations WHERE slug = ?
  `).bind(slug).first();
  if (!item) return okJson({ message: "여행지를 찾을 수 없습니다." }, { status: 404 });

  const hotels = await env.TRAVEL_DB.prepare(`
    SELECT slug, destination_slug, name, area, price_level, summary, cover_image, cover_image_alt, updated_at
    FROM hotels
    WHERE destination_slug = ? AND status = 'published'
    ORDER BY updated_at DESC
    LIMIT 12
  `).bind(slug).all();

  const posts = await env.TRAVEL_DB.prepare(`
    SELECT slug, title, category, summary, cover_image, cover_image_alt, content_type, updated_at
    FROM posts
    WHERE destination_slug = ? AND status = 'published'
    ORDER BY updated_at DESC
    LIMIT 12
  `).bind(slug).all();

  return okJson({ item, hotels: hotels.results || [], posts: posts.results || [] });
}

export async function onRequestDelete({ params, env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const slug = decodeURIComponent(String(params.slug || ""));
  await env.TRAVEL_DB.prepare(`UPDATE destinations SET status = 'draft', is_active = 0, updated_at = ? WHERE slug = ?`).bind(new Date().toISOString(), slug).run();
  return okJson({ ok: true, slug });
}
