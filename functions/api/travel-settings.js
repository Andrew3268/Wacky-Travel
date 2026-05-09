import { okJson, requireAdmin } from "../_utils.js";
import { ensureTravelSettingsTables, getTravelSettings, normalizeText, slugifySetting, countryToSlug } from "../../lib/travel/travel-settings.js";

function readEntity(body) {
  return String(body?.entity || body?.type || "").trim();
}

async function getNextSortOrder(db, tableName) {
  const row = await db.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM ${tableName}`).first();
  return Number(row?.max_sort || 0) + 1;
}

function requireSlug(value, fallback = "") {
  const slug = slugifySetting(value || fallback);
  if (!slug) throw new Error("slug_required");
  return slug;
}

export async function onRequestGet({ env }) {
  const settings = await getTravelSettings(env.TRAVEL_DB, { includeInactive: true });
  return okJson(settings, { headers: { "cache-control": "private, no-store" } });
}

export async function onRequestPost({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);

  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  const entity = readEntity(body);
  const now = new Date().toISOString();

  try {
    if (entity === "content_type") {
      const label = normalizeText(body.label || body.name);
      const slug = requireSlug(body.slug, label);
      if (!label) return okJson({ message: "글 종류 이름을 입력해 주세요." }, { status: 400 });
      const exists = await env.TRAVEL_DB.prepare(`SELECT slug FROM content_types WHERE slug = ?`).bind(slug).first();
      if (exists) return okJson({ message: "같은 slug의 글 종류가 이미 있습니다." }, { status: 409 });
      const sortOrder = Number(body.sort_order || 0) || await getNextSortOrder(env.TRAVEL_DB, "content_types");
      await env.TRAVEL_DB.prepare(`
        INSERT INTO content_types (slug, label, description, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(slug, label, normalizeText(body.description), sortOrder, Number(body.is_active ?? 1) ? 1 : 0, now, now).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }

    if (entity === "country") {
      const name = normalizeText(body.name);
      const slug = requireSlug(body.slug, name);
      if (!name) return okJson({ message: "나라 이름을 입력해 주세요." }, { status: 400 });
      const exists = await env.TRAVEL_DB.prepare(`SELECT slug FROM countries WHERE slug = ?`).bind(slug).first();
      if (exists) return okJson({ message: "같은 slug의 나라가 이미 있습니다." }, { status: 409 });
      const sortOrder = Number(body.sort_order || 0) || await getNextSortOrder(env.TRAVEL_DB, "countries");
      await env.TRAVEL_DB.prepare(`
        INSERT INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(slug, name, sortOrder, Number(body.is_active ?? 1) ? 1 : 0, now, now).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }

    if (entity === "destination") {
      const name = normalizeText(body.name);
      const slug = requireSlug(body.slug, name);
      const countryName = normalizeText(body.country) || normalizeText(body.country_name);
      if (!name || !countryName) return okJson({ message: "도시 이름과 나라를 입력해 주세요." }, { status: 400 });
      const exists = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(slug).first();
      if (exists) return okJson({ message: "같은 slug의 도시가 이미 있습니다." }, { status: 409 });
      const sortOrder = Number(body.sort_order || 0) || await getNextSortOrder(env.TRAVEL_DB, "destinations");
      await env.TRAVEL_DB.prepare(`
        INSERT INTO destinations (
          slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
          best_season, airport_info, transport_summary, status, is_active, sort_order, published_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        slug,
        name,
        countryName,
        normalizeText(body.city) || name,
        normalizeText(body.title) || name,
        normalizeText(body.meta_description),
        normalizeText(body.summary),
        normalizeText(body.cover_image),
        normalizeText(body.cover_image_alt),
        normalizeText(body.best_season),
        normalizeText(body.airport_info),
        normalizeText(body.transport_summary),
        normalizeText(body.status) || "published",
        Number(body.is_active ?? 1) ? 1 : 0,
        sortOrder,
        now,
        now
      ).run();
      const countrySlug = slugifySetting(body.country_slug || countryToSlug(countryName));
      const countryExists = await env.TRAVEL_DB.prepare(`SELECT slug FROM countries WHERE slug = ?`).bind(countrySlug).first();
      if (countrySlug && !countryExists) {
        await env.TRAVEL_DB.prepare(`
          INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
          VALUES (?, ?, ?, 1, ?, ?)
        `).bind(countrySlug, countryName, await getNextSortOrder(env.TRAVEL_DB, "countries"), now, now).run();
      }
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }
  } catch (error) {
    if (error.message === "slug_required") return okJson({ message: "slug를 입력해 주세요." }, { status: 400 });
    throw error;
  }

  return okJson({ message: "지원하지 않는 설정 종류입니다." }, { status: 400 });
}

export async function onRequestPut({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);

  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  const entity = readEntity(body);
  const currentSlug = slugifySetting(body.current_slug || body.slug);
  if (!currentSlug) return okJson({ message: "수정할 slug가 필요합니다." }, { status: 400 });
  const now = new Date().toISOString();

  if (entity === "content_type") {
    const nextSlug = requireSlug(body.slug, currentSlug);
    const label = normalizeText(body.label || body.name);
    if (!label) return okJson({ message: "글 종류 이름을 입력해 주세요." }, { status: 400 });
    const current = await env.TRAVEL_DB.prepare(`SELECT slug FROM content_types WHERE slug = ?`).bind(currentSlug).first();
    if (!current) return okJson({ message: "수정할 글 종류를 찾지 못했습니다." }, { status: 404 });
    if (nextSlug !== currentSlug) {
      const duplicate = await env.TRAVEL_DB.prepare(`SELECT slug FROM content_types WHERE slug = ?`).bind(nextSlug).first();
      if (duplicate) return okJson({ message: "같은 slug의 글 종류가 이미 있습니다." }, { status: 409 });
    }
    await env.TRAVEL_DB.prepare(`
      UPDATE content_types
      SET slug = ?, label = ?, description = ?, is_active = ?, updated_at = ?
      WHERE slug = ?
    `).bind(nextSlug, label, normalizeText(body.description), Number(body.is_active ?? 1) ? 1 : 0, now, currentSlug).run();
    if (nextSlug !== currentSlug) {
      await env.TRAVEL_DB.prepare(`UPDATE posts SET content_type = ?, updated_at = ? WHERE content_type = ?`).bind(nextSlug, now, currentSlug).run();
    }
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "country") {
    const nextSlug = requireSlug(body.slug, currentSlug);
    const name = normalizeText(body.name);
    if (!name) return okJson({ message: "나라 이름을 입력해 주세요." }, { status: 400 });
    const current = await env.TRAVEL_DB.prepare(`SELECT slug, name FROM countries WHERE slug = ?`).bind(currentSlug).first();
    if (!current) return okJson({ message: "수정할 나라를 찾지 못했습니다." }, { status: 404 });
    if (nextSlug !== currentSlug) {
      const duplicate = await env.TRAVEL_DB.prepare(`SELECT slug FROM countries WHERE slug = ?`).bind(nextSlug).first();
      if (duplicate) return okJson({ message: "같은 slug의 나라가 이미 있습니다." }, { status: 409 });
    }
    await env.TRAVEL_DB.prepare(`
      UPDATE countries
      SET slug = ?, name = ?, is_active = ?, updated_at = ?
      WHERE slug = ?
    `).bind(nextSlug, name, Number(body.is_active ?? 1) ? 1 : 0, now, currentSlug).run();
    if (normalizeText(current.name) !== name) {
      await env.TRAVEL_DB.prepare(`UPDATE destinations SET country = ?, updated_at = ? WHERE TRIM(COALESCE(country, '')) = ?`).bind(name, now, normalizeText(current.name)).run();
    }
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "destination") {
    const nextSlug = requireSlug(body.slug, currentSlug);
    const name = normalizeText(body.name);
    const countryName = normalizeText(body.country) || normalizeText(body.country_name);
    if (!name || !countryName) return okJson({ message: "도시 이름과 나라를 입력해 주세요." }, { status: 400 });
    const current = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(currentSlug).first();
    if (!current) return okJson({ message: "수정할 도시를 찾지 못했습니다." }, { status: 404 });
    if (nextSlug !== currentSlug) {
      const duplicate = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(nextSlug).first();
      if (duplicate) return okJson({ message: "같은 slug의 도시가 이미 있습니다." }, { status: 409 });
    }
    await env.TRAVEL_DB.prepare(`
      UPDATE destinations
      SET slug = ?, name = ?, country = ?, city = ?, title = ?, status = ?, is_active = ?, updated_at = ?
      WHERE slug = ?
    `).bind(nextSlug, name, countryName, normalizeText(body.city) || name, normalizeText(body.title) || name, normalizeText(body.status) || "published", Number(body.is_active ?? 1) ? 1 : 0, now, currentSlug).run();
    if (nextSlug !== currentSlug) {
      await env.TRAVEL_DB.prepare(`UPDATE posts SET destination_slug = ?, updated_at = ? WHERE destination_slug = ?`).bind(nextSlug, now, currentSlug).run();
      await env.TRAVEL_DB.prepare(`UPDATE hotels SET destination_slug = ?, updated_at = ? WHERE destination_slug = ?`).bind(nextSlug, now, currentSlug).run();
    }
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  return okJson({ message: "지원하지 않는 설정 종류입니다." }, { status: 400 });
}

export async function onRequestDelete({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensureTravelSettingsTables(env.TRAVEL_DB);

  const body = await request.json().catch(() => null);
  if (!body) return okJson({ message: "JSON이 필요합니다." }, { status: 400 });
  const entity = readEntity(body);
  const slug = slugifySetting(body.slug || body.current_slug);
  if (!slug) return okJson({ message: "삭제할 slug가 필요합니다." }, { status: 400 });
  const now = new Date().toISOString();

  if (entity === "content_type") {
    await env.TRAVEL_DB.prepare(`DELETE FROM content_types WHERE slug = ?`).bind(slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "country") {
    await env.TRAVEL_DB.prepare(`DELETE FROM countries WHERE slug = ?`).bind(slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "destination") {
    await env.TRAVEL_DB.prepare(`DELETE FROM destinations WHERE slug = ?`).bind(slug).run();
    await env.TRAVEL_DB.prepare(`UPDATE posts SET destination_slug = '', updated_at = ? WHERE destination_slug = ?`).bind(now, slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  return okJson({ message: "지원하지 않는 설정 종류입니다." }, { status: 400 });
}
