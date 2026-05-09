import { okJson, requireAdmin } from "../_utils.js";
import { ensureTravelSettingsTables, normalizeText } from "../../lib/travel/travel-settings.js";

function pickDestinationBody(body = {}) {
  const name = normalizeText(body.name);
  const country = normalizeText(body.country);
  const city = normalizeText(body.city) || name;
  const summary = normalizeText(body.summary);
  const coverImage = normalizeText(body.cover_image);
  const coverImageAlt = normalizeText(body.cover_image_alt);
  return {
    slug: normalizeText(body.slug),
    name,
    country,
    city,
    title: normalizeText(body.title) || normalizeText(body.hero_title) || name,
    meta_description: normalizeText(body.meta_description),
    summary,
    cover_image: coverImage,
    cover_image_alt: coverImageAlt,
    card_title: normalizeText(body.card_title) || name,
    card_description: normalizeText(body.card_description) || summary,
    card_image: normalizeText(body.card_image) || coverImage,
    card_image_alt: normalizeText(body.card_image_alt) || coverImageAlt,
    hero_eyebrow: normalizeText(body.hero_eyebrow) || country,
    hero_title: normalizeText(body.hero_title) || normalizeText(body.title) || `${name} 여행 가이드`,
    hero_summary: normalizeText(body.hero_summary) || summary,
    hero_image: normalizeText(body.hero_image) || coverImage,
    hero_image_alt: normalizeText(body.hero_image_alt) || coverImageAlt,
    best_season: normalizeText(body.best_season),
    airport_info: normalizeText(body.airport_info),
    transport_summary: normalizeText(body.transport_summary),
    status: normalizeText(body.status) || "published",
    is_active: Number(body.is_active ?? 1) ? 1 : 0,
    sort_order: Number(body.sort_order || 0) || 0
  };
}

export async function onRequestGet({ env, request }) {
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const url = new URL(request.url);
  const status = String(url.searchParams.get("status") || "published").trim();
  const limit = Math.min(100, Math.max(1, Number.parseInt(url.searchParams.get("limit") || "50", 10)));
  const rows = await env.TRAVEL_DB.prepare(`
    SELECT slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
           card_title, card_description, card_image, card_image_alt,
           hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
           best_season, airport_info, transport_summary, status,
           COALESCE(is_active, CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS is_active,
           COALESCE(sort_order, 0) AS sort_order,
           published_at, updated_at
    FROM destinations
    WHERE (? = 'all' OR status = ?) AND (? = 'all' OR COALESCE(is_active, 1) = 1)
    ORDER BY country COLLATE NOCASE ASC, sort_order ASC, updated_at DESC, name ASC
    LIMIT ?
  `).bind(status, status, status, limit).all();
  return okJson({ items: rows.results || [] }, { headers: { "cache-control": "public, max-age=60, s-maxage=300" } });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);
  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });

  const now = new Date().toISOString();
  const item = pickDestinationBody(body);
  if (!item.slug || !item.name) return okJson({ message: "slug, name은 필수입니다." }, { status: 400 });

  await env.TRAVEL_DB.prepare(`
    INSERT INTO destinations (
      slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
      card_title, card_description, card_image, card_image_alt,
      hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
      best_season, airport_info, transport_summary, status, is_active, sort_order, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name,
      country = excluded.country,
      city = excluded.city,
      title = excluded.title,
      meta_description = excluded.meta_description,
      summary = excluded.summary,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      card_title = excluded.card_title,
      card_description = excluded.card_description,
      card_image = excluded.card_image,
      card_image_alt = excluded.card_image_alt,
      hero_eyebrow = excluded.hero_eyebrow,
      hero_title = excluded.hero_title,
      hero_summary = excluded.hero_summary,
      hero_image = excluded.hero_image,
      hero_image_alt = excluded.hero_image_alt,
      best_season = excluded.best_season,
      airport_info = excluded.airport_info,
      transport_summary = excluded.transport_summary,
      status = excluded.status,
      is_active = excluded.is_active,
      sort_order = excluded.sort_order,
      updated_at = excluded.updated_at
  `).bind(
    item.slug,
    item.name,
    item.country,
    item.city,
    item.title,
    item.meta_description,
    item.summary,
    item.cover_image,
    item.cover_image_alt,
    item.card_title,
    item.card_description,
    item.card_image,
    item.card_image_alt,
    item.hero_eyebrow,
    item.hero_title,
    item.hero_summary,
    item.hero_image,
    item.hero_image_alt,
    item.best_season,
    item.airport_info,
    item.transport_summary,
    item.status,
    item.is_active,
    item.sort_order,
    String(body.published_at || now),
    now
  ).run();

  return okJson({ ok: true, slug: item.slug });
}
