import { okJson, requireAdmin } from "../../_utils.js";

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
  const hotelSlug = String(body.hotel_slug || "").trim();
  const affiliateEnabled = body.affiliate_enabled === true || body.affiliate_enabled === 1 || body.affiliate_enabled === "1" ? 1 : 0;
  const searchIntent = String(body.search_intent || "").trim();

  if (!title || !contentMd) {
    return okJson(
      { message: "title, content_md는 필수입니다." },
      { status: 400 }
    );
  }

  const current = await env.TRAVEL_DB
    .prepare(`SELECT published_at FROM posts WHERE slug = ?`)
    .bind(slug)
    .first();

  if (!current) {
    return okJson({ message: "not_found" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const publishedAt = String(current.published_at || now);

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
