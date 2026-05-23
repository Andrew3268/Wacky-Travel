import { okJson, getAdminSession, requireAdmin } from "../_utils.js";
import { normalizeContentType } from "../../lib/travel/travel-settings.js";

function clampInt(value, fallback, min, max) {
  const num = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function slugifyValue(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-가-힣]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^-|-$/g, "");
}


function normalizeStatusValue(value = "published") {
  const raw = String(value || "published").trim().toLowerCase();
  if (["draft", "초안", "임시저장", "임시 저장"].includes(raw)) return "draft";
  return "published";
}

function normalizedStatusSql() {
  return "LOWER(TRIM(COALESCE(status, 'published')))";
}

function normalizeBadgeArray(value) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(/[,.，、|]/);
  return [...new Set(source.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, 12);
}

async function ensureHotelColumns(db) {
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN badges_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN name_en TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN area TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN star_rating TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN price_level TEXT DEFAULT ''`).run(); } catch (_) {}
}

function isHeroValueBadgeEnabled(value = "") {
  const raw = String(value ?? "").trim().toLowerCase();
  return value === true || raw === "1" || raw === "true" || raw === "yes" || raw.includes("가성비");
}

function normalizeHeroLocationType(value = "") {
  const raw = String(value || "").replace(/\s+/g, " ").trim();
  const aliases = {
    "시내중심": "시내 중심",
    "도심": "시내 중심",
    "도심권": "시내 중심",
    "중심부": "시내 중심",
    "중심가": "중심가 인근",
    "관광지근처": "관광지 인근",
    "관광지 주변": "관광지 인근",
    "해변근처": "해변 근처",
    "비치 근처": "해변 근처",
    "공항근처": "공항 근처",
    "역 근처": "역세권",
    "역 주변": "역세권",
    "외각": "외곽"
  };
  return aliases[raw] || raw;
}

function hasHotelHeroInput(hero = {}) {
  const badges = Array.isArray(hero.badges) ? hero.badges : String(hero.badges || hero.badges_json || "").trim();
  return Boolean(
    String(hero.name || hero.name_ko || "").trim() ||
    String(hero.name_en || "").trim() ||
    normalizeHeroLocationType(hero.area || hero.location_type || "") ||
    String(hero.star_rating || "").trim() ||
    isHeroValueBadgeEnabled(hero.price_level || hero.value_badge || "") ||
    badges ||
    String(hero.price_url || hero.primary_url || "").trim() ||
    String(hero.availability_url || hero.secondary_url || "").trim()
  );
}

async function syncHotelHeroData(db, body = {}, { destinationSlug = "", fallbackSlug = "", title = "", now = "" } = {}) {
  const hero = body.hotel_hero && typeof body.hotel_hero === "object" ? body.hotel_hero : {};
  const nameInput = String(hero.name || hero.name_ko || "").trim();
  const nameEn = String(hero.name_en || "").trim();
  const area = normalizeHeroLocationType(hero.area || hero.location_type || "");
  const priceLevel = isHeroValueBadgeEnabled(hero.price_level || hero.value_badge || "") ? "가성비" : "";
  const hasHeroInput = hasHotelHeroInput(hero);
  const name = nameInput || (hasHeroInput ? String(title || "").trim() : "");
  const explicitHotelSlug = String(body.hotel_slug || hero.slug || fallbackSlug || "").trim();
  const hotelSlug = explicitHotelSlug || (name ? slugifyValue(nameEn || name) : "");

  if (!hasHeroInput || !hotelSlug || !name || !destinationSlug) return hotelSlug;

  const starRating = String(hero.star_rating || "").trim();
  const badges = normalizeBadgeArray(hero.badges || hero.badges_json || "");
  const summary = String(hero.summary || body.summary || "").trim();
  const coverImage = String(body.cover_image || "").trim();
  const coverImageAlt = String(body.cover_image_alt || name || title || "").trim();
  const publishedAt = String(body.published_at || now);

  await ensureHotelColumns(db);

  await db.prepare(`
    INSERT INTO hotels (
      slug, destination_slug, name, name_en, area, star_rating, badges_json, price_level, summary,
      cover_image, cover_image_alt, status, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      destination_slug = excluded.destination_slug,
      name = excluded.name,
      name_en = excluded.name_en,
      area = excluded.area,
      star_rating = excluded.star_rating,
      badges_json = excluded.badges_json,
      price_level = excluded.price_level,
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
    area,
    starRating,
    JSON.stringify(badges),
    priceLevel,
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

  if (links.length) {
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
  }

  return hotelSlug;
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const status = String(url.searchParams.get("status") || "published").trim().toLowerCase();
  const category = String(url.searchParams.get("category") || "").trim();
  const tag = String(url.searchParams.get("tag") || "").trim();
  const contentTypeParam = String(url.searchParams.get("content_type") || url.searchParams.get("content_types") || "").trim();
  const contentTypes = [...new Set(contentTypeParam.split(/[,.，、|]/).map((item) => normalizeContentType(item)).filter(Boolean))].slice(0, 10);
  const query = String(url.searchParams.get("q") || "").trim().toLowerCase();
  const searchTitle = String(url.searchParams.get("search_title") || "1").trim() !== "0";
  const searchContent = String(url.searchParams.get("search_content") || "0").trim() === "1";
  const sort = String(url.searchParams.get("sort") || url.searchParams.get("order") || "").trim().toLowerCase();
  const page = clampInt(url.searchParams.get("page"), 1, 1, 9999);
  const perPage = clampInt(url.searchParams.get("per_page"), 8, 1, 24);
  const offset = (page - 1) * perPage;

  const admin = await getAdminSession(env, request);
  const allowedStatuses = new Set(["published", "draft", "all"]);
  const requestedStatus = allowedStatuses.has(status) ? status : "published";
  const safeStatus = admin ? requestedStatus : "published";

  const where = [];
  const binds = [];

  if (safeStatus !== "all") {
    where.push(`${normalizedStatusSql()} = ?`);
    binds.push(safeStatus);
  }

  if (category) {
    where.push("TRIM(COALESCE(category, '')) = ?");
    binds.push(category);
  }

  if (tag) {
    where.push("EXISTS (SELECT 1 FROM json_each(COALESCE(tags_json, '[]')) WHERE TRIM(json_each.value) = ?)");
    binds.push(tag);
  }

  if (contentTypes.length) {
    where.push(`TRIM(COALESCE(content_type, '')) IN (${contentTypes.map(() => "?").join(", ")})`);
    binds.push(...contentTypes);
  }

  if (query) {
    const qLike = `%${query}%`;
    const queryParts = [];

    if (searchTitle) {
      queryParts.push(`LOWER(COALESCE(title, '')) LIKE ?`);
      binds.push(qLike);
    }

    if (searchContent) {
      queryParts.push(`LOWER(COALESCE(summary, '')) LIKE ?`);
      queryParts.push(`LOWER(COALESCE(meta_description, '')) LIKE ?`);
      queryParts.push(`LOWER(COALESCE(category, '')) LIKE ?`);
      queryParts.push(`LOWER(COALESCE(content_md, '')) LIKE ?`);
      queryParts.push(`EXISTS (
        SELECT 1
        FROM json_each(COALESCE(tags_json, '[]'))
        WHERE LOWER(TRIM(json_each.value)) LIKE ?
      )`);
      binds.push(qLike, qLike, qLike, qLike, qLike);
    }

    if (!queryParts.length) {
      queryParts.push(`LOWER(COALESCE(title, '')) LIKE ?`);
      binds.push(qLike);
    }

    where.push(`(${queryParts.join(" OR ")})`);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const orderSql = sort === "published" || sort === "published_at"
    ? "ORDER BY published_at DESC, updated_at DESC"
    : "ORDER BY updated_at DESC, published_at DESC";

  const itemsSql = `
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
      content_type,
      destination_slug,
      hotel_slug,
      affiliate_enabled,
      search_intent,
      status,
      view_count,
      published_at,
      updated_at
    FROM posts
    ${whereSql}
    ${orderSql}
    LIMIT ? OFFSET ?
  `;

  const countSql = `SELECT COUNT(*) AS total FROM posts ${whereSql}`;

  const baseBind = [...binds];
  await env.TRAVEL_DB.prepare(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  await env.TRAVEL_DB.prepare(`
    INSERT OR IGNORE INTO site_settings (key, value, updated_at)
    VALUES ('index_sidebar_ad_enabled', '0', ?)
  `).bind(new Date().toISOString()).run();

  const [itemsRows, countRow, categoryRows, popularRows, statusRows, settingsRows] = await Promise.all([
    env.TRAVEL_DB.prepare(itemsSql).bind(...baseBind, perPage, offset).all(),
    env.TRAVEL_DB.prepare(countSql).bind(...binds).first(),
    env.TRAVEL_DB.prepare(`
      SELECT TRIM(COALESCE(category, '')) AS category_name, COUNT(*) AS count
      FROM posts
      ${whereSql}
      GROUP BY TRIM(COALESCE(category, ''))
      ORDER BY count DESC, category_name COLLATE NOCASE ASC
      LIMIT 20
    `).bind(...binds).all(),
    env.TRAVEL_DB.prepare(`
      SELECT slug, title, view_count, updated_at, published_at
      FROM posts
      ${whereSql}
      ORDER BY view_count DESC, updated_at DESC, published_at DESC
      LIMIT 10
    `).bind(...binds).all(),
    env.TRAVEL_DB.prepare(`
      SELECT ${normalizedStatusSql()} AS status, COUNT(*) AS count
      FROM posts
      ${whereSql}
      GROUP BY ${normalizedStatusSql()}
    `).bind(...binds).all(),
    env.TRAVEL_DB.prepare(`SELECT key, value FROM site_settings WHERE key = 'index_sidebar_ad_enabled'`).all()
  ]);

  const total = Number(countRow?.total || 0);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const statusMap = new Map((statusRows?.results || []).map((row) => [String(row.status || "published").trim().toLowerCase(), Number(row.count || 0)]));
  const publicCacheHeaders = !admin && safeStatus === "published"
    ? { "cache-control": "public, max-age=30, s-maxage=60" }
    : { "cache-control": "private, no-store" };

  return okJson({
    items: itemsRows.results || [],
    filters: {
      status: safeStatus,
      category,
      tag,
      content_type: contentTypes.join(","),
      q: query
    },
    pagination: {
      page,
      per_page: perPage,
      total,
      total_pages: totalPages,
      has_more: page < totalPages,
      next_page: page < totalPages ? page + 1 : null
    },
    sidebar: {
      settings: {
        index_sidebar_ad_enabled: (settingsRows.results || []).some((row) => row.key === "index_sidebar_ad_enabled" && String(row.value) === "1")
      },
      counts: {
        total,
        published: statusMap.get("published") || 0,
        draft: statusMap.get("draft") || 0
      },
      categories: (categoryRows.results || []).map((row) => ({
        name: String(row.category_name || "").trim() || "미분류",
        count: Number(row.count || 0)
      })),
      popular: (popularRows.results || []).map((row) => ({
        slug: row.slug,
        title: row.title,
        view_count: Number(row.view_count || 0),
        updated_at: row.updated_at,
        published_at: row.published_at
      }))
    }
  }, { headers: publicCacheHeaders });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body) {
    return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  }

  const slug = String(body.slug || "").trim();
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
  const status = normalizeStatusValue(body.status || "published");
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const contentType = normalizeContentType(body.content_type || "travel_tip");
  const destinationSlug = String(body.destination_slug || "").trim();
  let hotelSlug = String(body.hotel_slug || "").trim();
  const affiliateEnabled = body.affiliate_enabled === true || body.affiliate_enabled === 1 || body.affiliate_enabled === "1" ? 1 : 0;
  const searchIntent = String(body.search_intent || "").trim();

  if (!slug || !title || !contentMd) {
    return okJson(
      { message: "slug, title, content_md는 필수입니다." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  hotelSlug = await syncHotelHeroData(env.TRAVEL_DB, body, { destinationSlug, fallbackSlug: slug, title, now });

  await env.TRAVEL_DB.prepare(`
    INSERT INTO posts (
      slug,
      title,
      category,
      meta_description,
      summary,
      cover_image,
      cover_image_alt,
      focus_keyword,
      longtail_keywords_json,
      tags_json,
      content_md,
      faq_md,
      enable_sidebar_ad,
      enable_inarticle_ads,
      content_type,
      destination_slug,
      hotel_slug,
      affiliate_enabled,
      search_intent,
      status,
      published_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      category = excluded.category,
      meta_description = excluded.meta_description,
      summary = excluded.summary,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      focus_keyword = excluded.focus_keyword,
      longtail_keywords_json = excluded.longtail_keywords_json,
      tags_json = excluded.tags_json,
      content_md = excluded.content_md,
      faq_md = excluded.faq_md,
      enable_sidebar_ad = excluded.enable_sidebar_ad,
      enable_inarticle_ads = excluded.enable_inarticle_ads,
      content_type = excluded.content_type,
      destination_slug = excluded.destination_slug,
      hotel_slug = excluded.hotel_slug,
      affiliate_enabled = excluded.affiliate_enabled,
      search_intent = excluded.search_intent,
      status = excluded.status,
      published_at = excluded.published_at,
      updated_at = excluded.updated_at
  `).bind(
    slug,
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
    now,
    now
  ).run();

  return okJson({ ok: true, slug });
}
