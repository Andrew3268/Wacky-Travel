import { okJson, requireAdmin } from "../../_utils.js";
import { normalizeContentType } from "../../../lib/travel/travel-settings.js";
import { normalizeCoverImagePayload, ensureCoverImageColumns } from "../../../lib/posts/cover-image.js";
import { ensurePublicModifiedDateColumn } from "../../../lib/posts/public-modified-date.js";
import { normalizeAffiliateDisclosure, ensureAffiliateDisclosureColumn } from "../../../lib/posts/affiliate-disclosure.js";
import { normalizeContentLinkSettings, ensureContentLinkSettingsColumn, isMissingContentLinkSettingsColumnError } from "../../../lib/posts/content-link-settings.js";


function normalizeStatusValue(value = "published") {
  const raw = String(value || "published").trim().toLowerCase();
  if (["draft", "초안", "임시저장", "임시 저장"].includes(raw)) return "draft";
  return "published";
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

const HOTEL_HERO_BADGE_OPTIONS = Object.freeze([
  "훌륭한 위치",
  "뚜벅이 최적",
  "깔끔한 위생",
  "친절한 서비스",
  "쇼핑·맛집 중심",
  "높은 만족도",
  "공항 이동 편리",
  "전망 좋은 뷰",
  "넓고 쾌적한 객실",
  "조식 맛집",
  "아이동반 최적",
  "커플 여행 최적",
  "호캉스 최적",
]);


const HOTEL_KEY_POINT_OPTIONS = Object.freeze([
  ["attractions", "명소 접근성"],
  ["transport", "대중교통"],
  ["airport", "공항 접근성"],
  ["dining_shopping", "맛집 및 쇼핑"],
  ["signature", "호텔 시그니처"]
]);

function normalizeHotelKeyPoints(value = []) {
  let source = value;
  if (!Array.isArray(source)) {
    try { source = JSON.parse(String(source || "[]")); } catch (_) { source = []; }
  }
  const input = new Map((Array.isArray(source) ? source : []).map((item) => [String(item?.key || "").trim(), String(item?.text || "").replace(/\s+/g, " ").trim().slice(0, 240)]));
  return HOTEL_KEY_POINT_OPTIONS.map(([key, label]) => ({ key, label, text: input.get(key) || "" })).filter((item) => item.text);
}

function normalizeBadgeArray(value) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(/[,.，、|]/);
  const selected = new Set(source.map((item) => String(item || "").trim()).filter(Boolean));
  return HOTEL_HERO_BADGE_OPTIONS.filter((item) => selected.has(item));
}

function normalizeHotelPickLabel(value = "") {
  const label = String(value || "").replace(/\s+/g, " ").trim().slice(0, 30);
  if (!label) return "";
  return label === "가성비" ? "가성비픽" : label;
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

function normalizeKeywordArray(value) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(/[,.，、|]/);
  return [...new Set(source.map((item) => String(item || "").trim()).filter(Boolean))];
}

function normalizeKeywordCompare(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9가-힣ぁ-んァ-ン一-龥]/gi, "");
}

function keywordListFromPipe(value = "") {
  return normalizeKeywordArray(String(value || "").split("||"));
}

function decodeKeywordTokenValue(value = "") {
  return String(value || "").replace(/&quot;/g, '"').trim();
}

function encodeKeywordTokenValue(value = "") {
  return String(value || "").replace(/"/g, "&quot;").trim();
}

function parseSeoKeywordsTokenLine(line = "") {
  const raw = String(line || "").trim();
  const seoMatch = raw.match(/^\[\[POST_SEO\s+(.+)\]\]$/);
  if (seoMatch) {
    const attrs = {};
    String(seoMatch[1] || "").replace(/(focus|longtail|lsi)="([^"]*)"/g, (_, key, value) => {
      attrs[key] = decodeKeywordTokenValue(value);
      return "";
    });
    return {
      focus: attrs.focus || "",
      longtail: keywordListFromPipe(attrs.longtail || ""),
      lsi: keywordListFromPipe(attrs.lsi || "")
    };
  }

  const lsiMatch = raw.match(/^\[\[POST_LSI\s+keywords="([^"]*)"\]\]$/);
  if (lsiMatch) {
    return { focus: "", longtail: [], lsi: keywordListFromPipe(decodeKeywordTokenValue(lsiMatch[1] || "")) };
  }
  return null;
}

function pickMarkdownSeoLineValue(line = "", labels = []) {
  const normalized = String(line || "")
    .replace(/^\s*[-*+]\s*/, "")
    .replace(/^\s{0,3}#{1,6}\s*/, "")
    .trim();
  for (const label of labels) {
    const re = new RegExp(`^${label}\\s*[:：]\\s*(.+)$`, "i");
    const match = normalized.match(re);
    if (match) return String(match[1] || "").trim();
  }
  return "";
}

function extractSeoKeywordsFromMarkdown(md = "") {
  const result = { focus: "", longtail: [], lsi: [] };
  const lines = String(md || "").replace(/\r\n/g, "\n").split("\n").slice(0, 120);
  for (const line of lines) {
    const token = parseSeoKeywordsTokenLine(line);
    if (token) {
      if (!result.focus && token.focus) result.focus = token.focus;
      if (!result.longtail.length && token.longtail?.length) result.longtail = token.longtail;
      if (!result.lsi.length && token.lsi?.length) result.lsi = token.lsi;
    }
    const focusValue = pickMarkdownSeoLineValue(line, ["메인\\s*키워드", "대표\\s*키워드", "focus\\s*keyword", "main\\s*keyword"]);
    if (!result.focus && focusValue) result.focus = focusValue;
    const longtailValue = pickMarkdownSeoLineValue(line, ["롱테일\\s*키워드", "long\\s*tail\\s*keywords?", "longtail\\s*keywords?"]);
    if (!result.longtail.length && longtailValue) result.longtail = normalizeKeywordArray(longtailValue);
    const lsiValue = pickMarkdownSeoLineValue(line, ["LSI\\s*키워드", "연관\\s*키워드", "lsi\\s*keywords?"]);
    if (!result.lsi.length && lsiValue) result.lsi = normalizeKeywordArray(lsiValue);
  }
  return result;
}

function isLikelyHotelNameOnly(keyword = "", hotelNames = []) {
  const value = String(keyword || "").trim();
  const normalized = normalizeKeywordCompare(value);
  if (!normalized) return false;
  const matched = (Array.isArray(hotelNames) ? hotelNames : [])
    .map((name) => String(name || "").trim())
    .filter(Boolean)
    .some((name) => {
      const hotel = normalizeKeywordCompare(name);
      return hotel && (normalized === hotel || normalized.includes(hotel) || hotel.includes(normalized));
    });
  return matched && !/(추천|후기|가격|위치|예약|조식|숙소|호텔|리뷰|비교|가성비|여행)/.test(value);
}

function deriveFocusKeywordFromTitle(title = "", hotelNames = []) {
  const cleanTitle = String(title || "").replace(/^#+\s*/, "").trim();
  if (!cleanTitle) return "";
  const recommendMatch = cleanTitle.match(/^(.{2,80}?추천)(?:[,.，、|｜?？!！\s]|$)/);
  if (recommendMatch?.[1]) return recommendMatch[1].trim();
  const firstClause = cleanTitle.split(/[,.，、|｜?？!！]/)[0].trim();
  if (firstClause && !isLikelyHotelNameOnly(firstClause, hotelNames)) return firstClause;
  const primaryHotelName = (hotelNames || []).find(Boolean) || firstClause;
  return primaryHotelName || firstClause;
}

function buildSeoKeywordsToken({ focus = "", longtail = [], lsi = [] } = {}) {
  const safeFocus = encodeKeywordTokenValue(focus);
  const safeLongtail = normalizeKeywordArray(longtail).map(encodeKeywordTokenValue).join("||");
  const safeLsi = normalizeKeywordArray(lsi).map(encodeKeywordTokenValue).join("||");
  if (!safeFocus && !safeLongtail && !safeLsi) return "";
  return `[[POST_SEO focus="${safeFocus}" longtail="${safeLongtail}" lsi="${safeLsi}"]]`;
}

function buildLsiKeywordsToken(keywords = []) {
  const safe = normalizeKeywordArray(keywords).map(encodeKeywordTokenValue).join("||");
  return safe ? `[[POST_LSI keywords="${safe}"]]` : "";
}

function stripSeoKeywordTokenLines(md = "") {
  return String(md || "")
    .split("\n")
    .filter((line) => !parseSeoKeywordsTokenLine(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function ensureSeoKeywordTokens(md = "", keywords = {}) {
  const clean = stripSeoKeywordTokenLines(md);
  const seoToken = buildSeoKeywordsToken(keywords);
  const lsiToken = buildLsiKeywordsToken(keywords.lsi || []);
  return [seoToken, lsiToken, clean].filter(Boolean).join("\n\n").trim();
}

async function ensureHotelColumns(db) {
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN badges_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN name_en TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN area TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN star_rating TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN guest_rating TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN price_level TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN region_slug TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN region_name TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE hotels ADD COLUMN key_points_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
}

async function ensurePostRegionColumns(db) {
  await ensureCoverImageColumns(db);
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN region_slug TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN region_name TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN recommendation_category_slug TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN recommendation_category_name TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN recommendation_category_description TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN hotel_pick_label TEXT DEFAULT ''`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN mood_tags_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
  try { await db.prepare(`ALTER TABLE posts ADD COLUMN situation_tags_json TEXT DEFAULT '[]'`).run(); } catch (_) {}
  await ensurePublicModifiedDateColumn(db);
  await ensureAffiliateDisclosureColumn(db);
  await ensureContentLinkSettingsColumn(db);
  try { await db.prepare(`CREATE INDEX IF NOT EXISTS idx_posts_region_slug ON posts(region_slug)`).run(); } catch (_) {}
  try { await db.prepare(`CREATE INDEX IF NOT EXISTS idx_posts_destination_region ON posts(destination_slug, region_slug)`).run(); } catch (_) {}
  try { await db.prepare(`CREATE INDEX IF NOT EXISTS idx_posts_recommendation_category ON posts(recommendation_category_slug)`).run(); } catch (_) {}
  try { await db.prepare(`CREATE INDEX IF NOT EXISTS idx_posts_destination_recommendation_category ON posts(destination_slug, recommendation_category_slug)`).run(); } catch (_) {}
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

function normalizeHeroGuestRating(value = "") {
  const raw = String(value || "").trim().replace(/^평점\s*/i, "");
  const normalized = raw.match(/^(6(?:\.5)?|7(?:\.5)?|8(?:\.5)?|9(?:\.5)?)\+?$/)?.[1];
  return normalized ? `${normalized}+` : "";
}

function hasHotelHeroInput(hero = {}) {
  const badges = Array.isArray(hero.badges) ? hero.badges : String(hero.badges || hero.badges_json || "").trim();
  return Boolean(
    String(hero.name || hero.name_ko || "").trim() ||
    String(hero.name_en || "").trim() ||
    normalizeHeroLocationType(hero.area || hero.location_type || "") ||
    String(hero.star_rating || "").trim() ||
    normalizeHeroGuestRating(hero.guest_rating || hero.guest_score || hero.review_rating || "") ||
    isHeroValueBadgeEnabled(hero.price_level || hero.value_badge || "") ||
    badges ||
    normalizeHotelKeyPoints(hero.key_points || hero.key_points_json || []).length ||
    String(hero.price_url || hero.primary_url || "").trim()
  );
}

async function syncHotelHeroData(db, body = {}, { destinationSlug = "", regionSlug = "", regionName = "", fallbackSlug = "", title = "", now = "" } = {}) {
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
  const guestRating = normalizeHeroGuestRating(hero.guest_rating || hero.guest_score || hero.review_rating || "");
  const badges = normalizeBadgeArray(hero.badges || hero.badges_json || "");
  const keyPoints = normalizeHotelKeyPoints(hero.key_points || hero.key_points_json || []);
  const summary = String(hero.summary || body.summary || "").trim();
  const coverImage = String(body.cover_image || "").trim();
  const coverImageAlt = String(body.cover_image_alt || name || title || "").trim();
  const publishedAt = String(body.published_at || now);

  await ensureHotelColumns(db);

  await db.prepare(`
    INSERT INTO hotels (
      slug, destination_slug, region_slug, region_name, name, name_en, area, star_rating, guest_rating, badges_json, key_points_json, price_level, summary,
      cover_image, cover_image_alt, status, published_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      destination_slug = excluded.destination_slug,
      region_slug = excluded.region_slug,
      region_name = excluded.region_name,
      name = excluded.name,
      name_en = excluded.name_en,
      area = excluded.area,
      star_rating = excluded.star_rating,
      guest_rating = excluded.guest_rating,
      badges_json = excluded.badges_json,
      key_points_json = excluded.key_points_json,
      price_level = excluded.price_level,
      summary = excluded.summary,
      cover_image = excluded.cover_image,
      cover_image_alt = excluded.cover_image_alt,
      status = 'published',
      updated_at = excluded.updated_at
  `).bind(
    hotelSlug,
    destinationSlug,
    regionSlug,
    regionName,
    name,
    nameEn,
    area,
    starRating,
    guestRating,
    JSON.stringify(badges),
    JSON.stringify(keyPoints),
    priceLevel,
    summary,
    coverImage,
    coverImageAlt,
    publishedAt,
    now
  ).run();

  const primaryUrl = String(hero.price_url || hero.primary_url || "").trim();
  const links = [
    primaryUrl ? { provider: "hero_price", label: "객실 가격 확인하기", affiliate_url: primaryUrl, button_text: "객실 가격 확인하기", sort_order: 1 } : null
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

function isMissingHotelHeroColumnError(error) {
  return /no such column:\s*(?:hotels\.)?(?:name_en|area|star_rating|guest_rating|badges_json|key_points_json|price_level|region_slug|region_name)/i.test(String(error?.message || error || ""));
}

async function getHotelHeroData(db, hotelSlug = "") {
  const slug = String(hotelSlug || "").trim();
  if (!slug) return null;

  const selectHotel = () => db.prepare(`SELECT slug, name, name_en, area, star_rating, guest_rating, badges_json, key_points_json, price_level FROM hotels WHERE slug = ?`).bind(slug).first();
  let hotel;
  try {
    hotel = await selectHotel();
  } catch (error) {
    // 정상 운영 DB의 읽기 경로에서는 스키마 변경을 수행하지 않는다.
    // 구버전 DB에서 실제로 컬럼 누락이 확인될 때만 1회 보정 후 재조회한다.
    if (!isMissingHotelHeroColumnError(error)) throw error;
    await ensureHotelColumns(db);
    hotel = await selectHotel();
  }
  if (!hotel) return null;
  const links = await db.prepare(`
    SELECT provider, affiliate_url
    FROM hotel_affiliate_links
    WHERE hotel_slug = ? AND provider = 'hero_price' AND COALESCE(is_active, 1) = 1
    ORDER BY sort_order ASC
  `).bind(slug).all();
  const rows = links.results || [];
  const price = rows.find((row) => row.provider === 'hero_price');
  return {
    slug,
    name: hotel.name || "",
    name_en: hotel.name_en || "",
    area: hotel.area || "",
    star_rating: hotel.star_rating || "",
    guest_rating: hotel.guest_rating || "",
    price_level: hotel.price_level || "",
    badges: parseJsonArray(hotel.badges_json),
    key_points: normalizeHotelKeyPoints(hotel.key_points_json),
    price_url: price?.affiliate_url || ""
  };
}

function isMissingPostEditColumnError(error) {
  return /no such column:\s*(?:posts\.)?(?:cover_image_source|cover_image_link_url|cover_image_srcset|content_modified_at|region_slug|region_name|recommendation_category_slug|recommendation_category_name|recommendation_category_description|hotel_pick_label|mood_tags_json|situation_tags_json|affiliate_disclosure)/i.test(String(error?.message || error || ""))
    || isMissingContentLinkSettingsColumnError(error);
}

async function selectPostForEdit(db, slug) {
  const selectRow = () => db.prepare(`
    SELECT
      slug,
      title,
      category,
      meta_description,
      summary,
      cover_image,
      cover_image_alt,
      cover_image_source,
      cover_image_link_url,
      cover_image_srcset,
      focus_keyword,
      longtail_keywords_json,
      enable_sidebar_ad,
      enable_inarticle_ads,
      tags_json,
      content_md,
      faq_md,
      content_type,
      destination_slug,
      region_slug,
      region_name,
      recommendation_category_slug,
      recommendation_category_name,
      recommendation_category_description,
      hotel_pick_label,
      mood_tags_json,
      situation_tags_json,
      hotel_slug,
      affiliate_enabled,
      affiliate_disclosure,
      content_link_settings_json,
      search_intent,
      status,
      published_at,
      COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at,
      updated_at
    FROM posts
    WHERE slug = ?
  `).bind(slug).first();

  try {
    return await selectRow();
  } catch (error) {
    // GET fast path: 정상 스키마에서는 PRAGMA / ALTER / CREATE INDEX를 전혀 실행하지 않는다.
    // 실제 구버전 DB 컬럼 누락 오류일 때만 기존 보정 로직을 실행하고 한 번 재시도한다.
    if (!isMissingPostEditColumnError(error)) throw error;
    await ensurePostRegionColumns(db);
    return await selectRow();
  }
}

export async function onRequestGet({ env, params, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) {
    return okJson({ message: "slug가 필요합니다." }, { status: 400 });
  }

  const row = await selectPostForEdit(env.TRAVEL_DB, slug);

  if (!row) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  row.hotel_hero = await getHotelHeroData(env.TRAVEL_DB, row.hotel_slug);
  row.mood_tags = parseJsonArray(row.mood_tags_json);
  row.situation_tags = parseJsonArray(row.situation_tags_json);
  const markdownKeywords = extractSeoKeywordsFromMarkdown(row.content_md || "");
  const hotelNames = [row.hotel_hero?.name, row.hotel_hero?.name_en].filter(Boolean);
  const dbLongtail = normalizeKeywordArray(parseJsonArray(row.longtail_keywords_json));

  if (!row.focus_keyword && markdownKeywords.focus) {
    row.focus_keyword = markdownKeywords.focus;
  }
  if (!row.focus_keyword) {
    row.focus_keyword = deriveFocusKeywordFromTitle(row.title || "", hotelNames) || row.focus_keyword || "";
  }
  if (!dbLongtail.length && markdownKeywords.longtail.length) {
    row.longtail_keywords_json = JSON.stringify(markdownKeywords.longtail);
  }
  row.lsi_keywords_json = JSON.stringify(markdownKeywords.lsi || []);
  row.seo_keywords = {
    focus: row.focus_keyword || markdownKeywords.focus || "",
    longtail: normalizeKeywordArray(parseJsonArray(row.longtail_keywords_json)).length
      ? normalizeKeywordArray(parseJsonArray(row.longtail_keywords_json))
      : markdownKeywords.longtail,
    lsi: markdownKeywords.lsi
  };
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
  const coverData = normalizeCoverImagePayload(body);
  if (!coverData.ok) return okJson({ message: coverData.message }, { status: 400 });
  const coverImage = coverData.image;
  const coverImageAlt = coverData.alt;
  const coverImageSource = coverData.source;
  const coverImageLinkUrl = coverData.link;
  const coverImageSrcset = coverData.srcset;
  const focusKeyword = String(body.focus_keyword || "").trim();
  const longtailKeywords = Array.isArray(body.longtail_keywords) ? body.longtail_keywords : [];
  const contentMd = String(body.content_md || "").trim();
  const faqMd = String(body.faq_md || "").trim();
  const enableSidebarAd = body.enable_sidebar_ad === true ? 1 : 0;
  const enableInarticleAds = body.enable_inarticle_ads === true ? 1 : 0;
  const status = normalizeStatusValue(body.status || "published");
  const tags = Array.isArray(body.tags) ? body.tags : [];
  const contentType = normalizeContentType(body.content_type || "travel_tip");
  const destinationSlug = String(body.destination_slug || "").trim();
  const regionSlug = String(body.region_slug || "").trim();
  const regionName = String(body.region_name || "").trim();
  const recommendationCategorySlug = String(body.recommendation_category_slug || "").trim();
  const recommendationCategoryName = String(body.recommendation_category_name || "").trim();
  const recommendationCategoryDescription = String(body.recommendation_category_description || "").trim();
  const hotelPickLabel = contentType === "hotel_intro" ? normalizeHotelPickLabel(body.hotel_pick_label || "") : "";
  const moodTags = Array.isArray(body.mood_tags) ? [...new Set(body.mood_tags.map(slugifyValue).filter(Boolean))] : [];
  const situationTags = Array.isArray(body.situation_tags) ? [...new Set(body.situation_tags.map(slugifyValue).filter(Boolean))] : [];
  let hotelSlug = body.hotel_slug === undefined ? null : String(body.hotel_slug || "").trim();
  const affiliateEnabled = body.affiliate_enabled === true || body.affiliate_enabled === 1 || body.affiliate_enabled === "1" ? 1 : 0;
  const affiliateDisclosure = normalizeAffiliateDisclosure(body.affiliate_disclosure);
  const contentLinkSettings = normalizeContentLinkSettings(body.content_link_settings || body.content_link_settings_json || []);
  const searchIntent = String(body.search_intent || "").trim();

  if (!title || !contentMd) {
    return okJson(
      { message: "title, content_md는 필수입니다." },
      { status: 400 }
    );
  }

  await ensurePostRegionColumns(env.TRAVEL_DB);

  const current = await env.TRAVEL_DB
.prepare(`SELECT published_at, COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at, hotel_slug, focus_keyword, longtail_keywords_json, content_md FROM posts WHERE slug = ?`)
    .bind(slug)
    .first();

  if (!current) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const publishedAt = String(current.published_at || now);
  const refreshPublicModifiedDate = body.refresh_public_modified_date === true || body.refresh_public_modified_date === 1 || body.refresh_public_modified_date === "1";
  const contentModifiedAt = refreshPublicModifiedDate
    ? now
    : String(current.content_modified_at || current.published_at || publishedAt);
  const heroName = String(body.hotel_hero?.name || body.hotel_hero?.name_ko || "").trim();
  const heroNameEn = String(body.hotel_hero?.name_en || "").trim();
  const hotelNames = [heroName, heroNameEn].filter(Boolean);
  const currentFocusKeyword = String(current.focus_keyword || "").trim();
  const currentLongtailKeywords = normalizeKeywordArray(parseJsonArray(current.longtail_keywords_json));
  const currentMarkdownKeywords = extractSeoKeywordsFromMarkdown(current.content_md || "");
  const incomingMarkdownKeywords = extractSeoKeywordsFromMarkdown(contentMd || "");

  const normalizeIncomingFocus = (value = "") => String(value || "").trim();

  const finalFocusKeyword = (() => {
    const candidates = [
      normalizeIncomingFocus(focusKeyword),
      normalizeIncomingFocus(currentFocusKeyword),
      normalizeIncomingFocus(incomingMarkdownKeywords.focus),
      normalizeIncomingFocus(currentMarkdownKeywords.focus)
    ];
    for (const candidate of candidates) {
      if (candidate) return candidate;
    }
    return deriveFocusKeywordFromTitle(title, hotelNames) || focusKeyword || currentFocusKeyword;
  })();

  const finalLongtailKeywords = longtailKeywords.length
    ? normalizeKeywordArray(longtailKeywords)
    : (currentLongtailKeywords.length
      ? currentLongtailKeywords
      : (incomingMarkdownKeywords.longtail.length ? incomingMarkdownKeywords.longtail : currentMarkdownKeywords.longtail));

  const finalLsiKeywords = incomingMarkdownKeywords.lsi.length
    ? incomingMarkdownKeywords.lsi
    : currentMarkdownKeywords.lsi;

  const finalContentMd = ensureSeoKeywordTokens(contentMd, {
    focus: finalFocusKeyword,
    longtail: finalLongtailKeywords,
    lsi: finalLsiKeywords
  });

  if (hotelSlug === null) hotelSlug = String(current.hotel_slug || "").trim();
  hotelSlug = await syncHotelHeroData(env.TRAVEL_DB, body, {
    destinationSlug,
    regionSlug,
    regionName,
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
      cover_image_source = ?,
      cover_image_link_url = ?,
      cover_image_srcset = ?,
      focus_keyword = ?,
      longtail_keywords_json = ?,
      tags_json = ?,
      content_md = ?,
      faq_md = ?,
      enable_sidebar_ad = ?,
      enable_inarticle_ads = ?,
      content_type = ?,
      destination_slug = ?,
      region_slug = ?,
      region_name = ?,
      recommendation_category_slug = ?,
      recommendation_category_name = ?,
      recommendation_category_description = ?,
      hotel_pick_label = ?,
      mood_tags_json = ?,
      situation_tags_json = ?,
      hotel_slug = ?,
      affiliate_enabled = ?,
      affiliate_disclosure = ?,
      content_link_settings_json = ?,
      search_intent = ?,
      status = ?,
      published_at = ?,
      content_modified_at = ?,
      updated_at = ?
    WHERE slug = ?
  `).bind(
    title,
    category,
    metaDescription,
    summary,
    coverImage,
    coverImageAlt,
    coverImageSource,
    coverImageLinkUrl,
    coverImageSrcset,
    finalFocusKeyword,
    JSON.stringify(finalLongtailKeywords),
    JSON.stringify(tags),
    finalContentMd,
    faqMd,
    enableSidebarAd,
    enableInarticleAds,
    contentType,
    destinationSlug,
    regionSlug,
    regionName,
    recommendationCategorySlug,
    recommendationCategoryName,
    recommendationCategoryDescription,
    hotelPickLabel,
    JSON.stringify(moodTags),
    JSON.stringify(situationTags),
    hotelSlug,
    affiliateEnabled,
    affiliateDisclosure,
    JSON.stringify(contentLinkSettings),
    searchIntent,
    status,
    publishedAt,
    contentModifiedAt,
    now,
    slug
  ).run();

  return okJson({ ok: true, slug, published_at: publishedAt, content_modified_at: contentModifiedAt, updated_at: now });
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
