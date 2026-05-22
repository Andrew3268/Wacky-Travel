import { okJson, requireAdmin } from "../../_utils.js";
import { ensureTravelSettingsTables } from "../../../lib/travel/travel-settings.js";

export async function onRequestGet({ params, env }) {
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const slug = decodeURIComponent(String(params.slug || ""));
  const item = await env.TRAVEL_DB.prepare(`
    SELECT * FROM destinations WHERE slug = ?
  `).bind(slug).first();
  if (!item) return okJson({ message: "여행지를 찾을 수 없습니다." }, { status: 404 });

  const posts = await env.TRAVEL_DB.prepare(`
    SELECT slug, title, category, summary, cover_image, cover_image_alt, tags_json, content_type, updated_at
    FROM posts
    WHERE destination_slug = ? AND status = 'published'
    ORDER BY updated_at DESC
    LIMIT 24
  `).bind(slug).all();

  const items = posts.results || [];
  const hotelPosts = items.filter((post) => {
    const type = String(post.content_type || '').trim();
    return ['top5_series', 'hotel_intro', 'hotel_roundup', 'hotel_review'].includes(type);
  });

  return okJson({ item, hotel_posts: hotelPosts, posts: items });
}

export async function onRequestDelete({ params, env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const slug = decodeURIComponent(String(params.slug || ""));
  await env.TRAVEL_DB.prepare(`UPDATE destinations SET status = 'draft', is_active = 0, updated_at = ? WHERE slug = ?`).bind(new Date().toISOString(), slug).run();
  return okJson({ ok: true, slug });
}
