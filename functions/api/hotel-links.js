import { okJson, requireAdmin } from "../_utils.js";

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const hotelSlug = String(url.searchParams.get("hotel_slug") || "").trim();
  if (!hotelSlug) return okJson({ message: "hotel_slug가 필요합니다." }, { status: 400 });
  const rows = await env.TRAVEL_DB.prepare(`
    SELECT id, hotel_slug, provider, label, affiliate_url, button_text, sort_order, is_active, created_at, updated_at
    FROM hotel_affiliate_links
    WHERE hotel_slug = ?
    ORDER BY sort_order ASC, id ASC
  `).bind(hotelSlug).all();
  return okJson({ items: rows.results || [] });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  const now = new Date().toISOString();
  const hotelSlug = String(body.hotel_slug || "").trim();
  const provider = String(body.provider || "").trim();
  const affiliateUrl = String(body.affiliate_url || "").trim();
  if (!hotelSlug || !provider || !affiliateUrl) {
    return okJson({ message: "hotel_slug, provider, affiliate_url은 필수입니다." }, { status: 400 });
  }
  await env.TRAVEL_DB.prepare(`
    INSERT INTO hotel_affiliate_links (hotel_slug, provider, label, affiliate_url, button_text, sort_order, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    hotelSlug,
    provider,
    String(body.label || provider).trim(),
    affiliateUrl,
    String(body.button_text || "예약 가능 여부 확인하기").trim(),
    Number.parseInt(String(body.sort_order || "0"), 10) || 0,
    body.is_active === false ? 0 : 1,
    now,
    now
  ).run();
  return okJson({ ok: true });
}
