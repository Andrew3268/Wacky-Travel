import { okJson, requireAdmin } from "../../_utils.js";

function slugifyValue(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-가-힣]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeBadgeArray(value) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(/[,.，、|]/);
  return [...new Set(source.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, 12);
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
}

async function ensureHotelColumns(db) {
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN badges_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN name_en TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN star_rating TEXT DEFAULT ''`).run(); } catch (_) {}
}

async function syncHotelHeroData(db, body = {}, { destinationSlug = "", fallbackSlug = "", title = "", now = "" } = {}) {
  const hero = body.hotel_hero && typeof body.hotel_hero === "object" ? body.hotel_hero : {};
  const name = String(hero.name || hero.name_ko || "").trim();
  const nameEn = String(hero.name_en || "").trim();
  const explicitHotelSlug = String(body.hotel_slug || hero.slug || fallbackSlug || "").trim();
  const hotelSlug = explicitHotelSlug || (name ? slugifyValue(nameEn || name) : "");

  if (!hotelSlug || !name || !destinationSlug) return hotelSlug;

  const starRating = String(hero.star_rating || "").trim();
  const badges = normalizeBadgeArray(hero.badges || hero.badges_json || "");
  const summary = String(hero.summary || body.summary || "").trim();
  const coverImage = String(body.cover_image || "").trim();
  const coverImageAlt = String(body.cover_image_alt || name || title || "").trim();
  const publishedAt = String(body.published_at || now);

  await ensureHotelColumns(db);

  await db.prepare(`
    INSERT INTO hotels (
      slug, destination_slug, name, name_en, star_rating, badges_json, summary,
      cover_image, cover_image_alt, status, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      destination_slug = excluded.destination_slug,
      name = excluded.name,
      name_en = excluded.name_en,
      star_rating = excluded.star_rating,
      badges_json = excluded.badges_json,
      summary = excluded.summary,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      status = 'published',
      updated_at = excluded.updated_at
  `).bind(
    hotelSlug,
    destinationSlug,
    name,
    nameEn,
    starRating,
    JSON.stringify(badges),
    summary,
    coverImage,
    coverImageAlt,
    publishedAt,
    now
  ).run();

  const primaryUrl = String(hero.price_url || hero.primary_url || "").trim();
  const secondaryUrl = String(hero.availability_url || hero.secondary_url || "").trim();
  const links = [
    primaryUrl ? { provider: "hero_price", label: "객실 가격 확인하기", affiliate_url: primaryUrl, button_text: "객실 가격 확인하기", sort_order: 1 } : null,
    secondaryUrl ? { provider: "hero_availability", label: "예약 가능 여부 보기", affiliate_url: secondaryUrl, button_text: "예약 가능 여부 보기", sort_order: 2 } : null
  ].filter(Boolean);

  await db.prepare(`DELETE FROM hotel_affiliate_links WHERE hotel_slug = ? AND provider IN ('hero_price', 'hero_availability')`).bind(hotelSlug).run();
  for (const link of links) {
    await db.prepare(`
      INSERT INTO hotel_affiliate_links (hotel_slug, provider, label, affiliate_url, button_text, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    `).bind(
      hotelSlug,
      link.provider,
      link.label,
      link.affiliate_url,
      link.button_text,
      link.sort_order,
      now,
      now
    ).run();
  }

  return hotelSlug;
}

async function getHotelHeroData(db, hotelSlug = "") {
  const slug = String(hotelSlug || "").trim();
  if (!slug) return null;
  await ensureHotelColumns(db);
  const hotel = await db.prepare(`SELECT slug, name, name_en, star_rating, badges_json FROM hotels WHERE slug = ?`).bind(slug).first();
  if (!hotel) return null;
  const links = await db.prepare(`
    SELECT provider, affiliate_url
    FROM hotel_affiliate_links
    WHERE hotel_slug = ? AND provider IN ('hero_price', 'hero_availability') AND COALESCE(is_active, 1) = 1
    ORDER BY sort_order ASC
  `).bind(slug).all();
  const rows = links.results || [];
  const price = rows.find((row) => row.provider === 'hero_price');
  const availability = rows.find((row) => row.provider === 'hero_availability');
  return {
    slug,
    name: hotel.name || "",
    name_en: hotel.name_en || "",
    star_rating: hotel.star_rating || "",
    badges: parseJsonArray(hotel.badges_json),
    price_url: price?.affiliate_url || "",
    availability_url: availability?.affiliate_url || ""
  };
}

export async function onRequestGet({ env, params, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) {
    return okJson({ message: "slug가 필요합니다." }, { status: 400 });
  }

  const row = await env.TRAVEL_DB.prepare(`
    SELECT
      slug,
      title,
      category,
      meta_description,
      summary,
      cover_image,
      cover_image_alt,
      focus_keyword,
      longtail_keywords_json,
      enable_sidebar_ad,
      enable_inarticle_ads,
      tags_json,
      content_md,
      faq_md,
      content_type,
      destination_slug,
      hotel_slug,
      affiliate_enabled,
      search_intent,
      status,
      published_at,
      updated_at
    FROM posts
    WHERE slug = ?
  `).bind(slug).first();

  if (!row) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  row.hotel_hero = await getHotelHeroData(env.TRAVEL_DB, row.hotel_slug);
  return okJson({ item: row });
}

export async function onRequestPut({ env, params, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) {
    return okJson({ message: "slug가 필요합니다." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  }

  const title = String(body.title || "").trim();
  const category = String(body.category || "").trim();
  const metaDescription = String(body.meta_description || "").trim();
  const summary = String(body.summary || "").trim();
  const coverImage = String(body.cover_image || "").trim();
  const coverImageAlt = String(body.cover_image_alt || "").trim();
  const focusKeyword = String(body.focus_keyword || "").trim();
  const longtailKeywords = Array.isArray(body.longtail_keywords) ? body.longtail_keywords : [];
  const contentMd = String(body.content_md || "").trim();
  const faqMd = String(body.faq_md || "").trim();
  const enableSidebarAd = body.enable_sidebar_ad === false ? 0 : 1;
  const enableInarticleAds = body.enable_inarticle_ads === false ? 0 : 1;
  const status = String(body.status || "published").trim() || "published";
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const contentType = String(body.content_type || "guide").trim() || "guide";
  const destinationSlug = String(body.destination_slug || "").trim();
  let hotelSlug = body.hotel_slug === undefined ? null : String(body.hotel_slug || "").trim();
  const affiliateEnabled = body.affiliate_enabled === true || body.affiliate_enabled === 1 || body.affiliate_enabled === "1" ? 1 : 0;
  const searchIntent = String(body.search_intent || "").trim();

  if (!title || !contentMd) {
    return okJson(
      { message: "title, content_md는 필수입니다." },
      { status: 400 }
    );
  }

  const current = await env.TRAVEL_DB
    .prepare(`SELECT published_at, hotel_slug FROM posts WHERE slug = ?`)
    .bind(slug)
    .first();

  if (!current) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const publishedAt = String(current.published_at || now);
  if (hotelSlug === null) hotelSlug = String(current.hotel_slug || "").trim();
  hotelSlug = await syncHotelHeroData(env.TRAVEL_DB, body, {
    destinationSlug,
    fallbackSlug: hotelSlug,
    title,
    now
  });

  await env.TRAVEL_DB.prepare(`
    UPDATE posts
    SET
      title = ?,
      category = ?,
      meta_description = ?,
      summary = ?,
      cover_image = ?,
      cover_image_alt = ?,
      focus_keyword = ?,
      longtail_keywords_json = ?,
      tags_json = ?,
      content_md = ?,
      faq_md = ?,
      enable_sidebar_ad = ?,
      enable_inarticle_ads = ?,
      content_type = ?,
      destination_slug = ?,
      hotel_slug = ?,
      affiliate_enabled = ?,
      search_intent = ?,
      status = ?,
      published_at = ?,
      updated_at = ?
    WHERE slug = ?
  `).bind(
    title,
    category,
    metaDescription,
    summary,
    coverImage,
    coverImageAlt,
    focusKeyword,
    JSON.stringify(longtailKeywords),
    JSON.stringify(tags),
    contentMd,
    faqMd,
    enableSidebarAd,
    enableInarticleAds,
    contentType,
    destinationSlug,
    hotelSlug,
    affiliateEnabled,
    searchIntent,
    status,
    publishedAt,
    now,
    slug
  ).run();

  return okJson({ ok: true, slug });
}

export async function onRequestDelete({ env, params, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) {
    return okJson({ message: "slug가 필요합니다." }, { status: 400 });
  }

  const existing = await env.TRAVEL_DB.prepare(`SELECT slug FROM posts WHERE slug = ?`).bind(slug).first();
  if (!existing) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  await env.TRAVEL_DB.prepare(`DELETE FROM posts WHERE slug = ?`).bind(slug).run();
  return okJson({ ok: true, slug });
}
