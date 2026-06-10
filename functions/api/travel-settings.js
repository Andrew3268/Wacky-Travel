import { okJson, requireAdmin } from "../_utils.js";
import { ensureTravelSettingsTables, getTravelSettings, normalizeText, slugifySetting, countryToSlug } from "../../lib/travel/travel-settings.js";

function readEntity(body) {
  return String(body?.entity || body?.type || "").trim();
}

async function getNextSortOrder(db, tableName) {
  const row = await db.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM ${tableName}`).first();
  return Number(row?.max_sort || 0) + 1;
}

async function getNextRegionSortOrder(db, destinationSlug = "") {
  const row = await db.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_sort FROM regions WHERE destination_slug = ?`).bind(destinationSlug).first();
  return Number(row?.max_sort || 0) + 1;
}

function requireSlug(value, fallback = "") {
  const slug = slugifySetting(value || fallback);
  if (!slug) throw new Error("slug_required");
  return slug;
}

function hasBodyField(body, key) {
  return Object.prototype.hasOwnProperty.call(body || {}, key);
}

function readBodyField(body, key, fallback = "") {
  return normalizeText(hasBodyField(body, key) ? body[key] : fallback);
}


function readHomeDestinationSlugs(body) {
  const raw = Array.isArray(body?.slugs) ? body.slugs : [];
  const seen = new Set();
  const slugs = [];
  for (const value of raw) {
    const slug = slugifySetting(value);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    slugs.push(slug);
  }
  return slugs;
}

async function resolveHomeDestinationCountry(db, body, slugs = []) {
  const directCountry = normalizeText(body?.country || body?.country_name);
  if (directCountry) return directCountry;

  const countrySlug = slugifySetting(body?.country_slug);
  if (countrySlug) {
    const row = await db.prepare(`SELECT name FROM countries WHERE slug = ?`).bind(countrySlug).first();
    if (row?.name) return normalizeText(row.name);
  }

  if (slugs.length) {
    const row = await db.prepare(`SELECT country FROM destinations WHERE slug = ?`).bind(slugs[0]).first();
    if (row?.country) return normalizeText(row.country);
  }

  return "";
}

async function updateHomeDestinations(db, body) {
  const slugs = readHomeDestinationSlugs(body);
  if (slugs.length > 5) return okJson({ message: "나라별 여행지 허브 노출 도시는 최대 5개까지 선택할 수 있습니다." }, { status: 400 });

  const countryName = await resolveHomeDestinationCountry(db, body, slugs);
  if (!countryName) return okJson({ message: "노출 도시를 저장할 나라 정보가 필요합니다." }, { status: 400 });

  const now = new Date().toISOString();
  await db.prepare(`
    UPDATE destinations
    SET home_featured = 0, home_featured_order = 0, updated_at = ?
    WHERE TRIM(COALESCE(country, '')) = ?
  `).bind(now, countryName).run();

  for (let index = 0; index < slugs.length; index += 1) {
    await db.prepare(`
      UPDATE destinations
      SET home_featured = 1, home_featured_order = ?,
          status = CASE WHEN status = 'draft' THEN 'published' ELSE status END,
          is_active = 1, updated_at = ?
      WHERE slug = ? AND TRIM(COALESCE(country, '')) = ?
    `).bind(index + 1, now, slugs[index], countryName).run();
  }

  return okJson({ ok: true, ...(await getTravelSettings(db, { includeInactive: true })) });
}

function readDestinationPayload(body, { current = null } = {}) {
  const name = readBodyField(body, "name", current?.name);
  const countryName = readBodyField(body, "country", current?.country) || readBodyField(body, "country_name", current?.country);
  const city = readBodyField(body, "city", current?.city) || name;
  const summary = readBodyField(body, "summary", current?.summary);
  const coverImage = readBodyField(body, "cover_image", current?.cover_image);
  const coverImageAlt = readBodyField(body, "cover_image_alt", current?.cover_image_alt);
  const cardTitle = readBodyField(body, "card_title", current?.card_title);
  const cardDescription = readBodyField(body, "card_description", current?.card_description);
  const cardImage = readBodyField(body, "card_image", current?.card_image) || coverImage;
  const cardImageAlt = readBodyField(body, "card_image_alt", current?.card_image_alt) || coverImageAlt;
  const heroEyebrow = readBodyField(body, "hero_eyebrow", current?.hero_eyebrow) || countryName;
  const heroTitle = readBodyField(body, "hero_title", current?.hero_title) || readBodyField(body, "title", current?.title) || `${name} 여행 가이드`;
  const heroSummary = readBodyField(body, "hero_summary", current?.hero_summary) || summary;
  const heroImage = readBodyField(body, "hero_image", current?.hero_image) || coverImage;
  const heroImageAlt = readBodyField(body, "hero_image_alt", current?.hero_image_alt) || coverImageAlt;

  return {
    name,
    countryName,
    city,
    title: heroTitle || readBodyField(body, "title", current?.title) || name,
    metaDescription: readBodyField(body, "meta_description", current?.meta_description),
    summary,
    coverImage,
    coverImageAlt,
    cardTitle,
    cardDescription,
    cardImage,
    cardImageAlt,
    heroEyebrow,
    heroTitle,
    heroSummary,
    heroImage,
    heroImageAlt,
    bestSeason: readBodyField(body, "best_season", current?.best_season),
    airportInfo: readBodyField(body, "airport_info", current?.airport_info),
    transportSummary: readBodyField(body, "transport_summary", current?.transport_summary),
    status: readBodyField(body, "status", current?.status) || "published",
    isActive: Number(body.is_active ?? current?.is_active ?? 1) ? 1 : 0,
    sortOrder: Number(body.sort_order ?? current?.sort_order ?? 0) || 0,
    homeFeatured: Number(body.home_featured ?? current?.home_featured ?? 0) ? 1 : 0,
    homeFeaturedOrder: Number(body.home_featured_order ?? current?.home_featured_order ?? 0) || 0
  };
}


async function readRegionPayload(db, body, { current = null } = {}) {
  const name = readBodyField(body, "name", current?.name);
  const destinationSlug = slugifySetting(body.destination_slug || current?.destination_slug);
  if (!destinationSlug) return { name, destinationSlug: "", countrySlug: slugifySetting(body.country_slug || current?.country_slug), sortOrder: 0, isActive: 1 };

  const destination = await db.prepare(`SELECT slug, country FROM destinations WHERE slug = ?`).bind(destinationSlug).first();
  const countrySlug = slugifySetting(body.country_slug || current?.country_slug || countryToSlug(destination?.country || ""));
  return {
    name,
    destinationSlug,
    countrySlug,
    sortOrder: Number(body.sort_order ?? current?.sort_order ?? 0) || 0,
    isActive: Number(body.is_active ?? current?.is_active ?? 1) ? 1 : 0
  };
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

    if (entity === "region") {
      const payload = await readRegionPayload(env.TRAVEL_DB, body);
      const slug = requireSlug(body.slug, payload.name);
      if (!payload.destinationSlug) return okJson({ message: "지역을 연결할 도시를 선택해 주세요." }, { status: 400 });
      if (!payload.name) return okJson({ message: "지역 이름을 입력해 주세요." }, { status: 400 });
      const destination = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(payload.destinationSlug).first();
      if (!destination) return okJson({ message: "지역을 연결할 도시를 찾지 못했습니다." }, { status: 404 });
      const exists = await env.TRAVEL_DB.prepare(`SELECT id FROM regions WHERE destination_slug = ? AND slug = ?`).bind(payload.destinationSlug, slug).first();
      if (exists) return okJson({ message: "같은 도시 안에 같은 slug의 지역이 이미 있습니다." }, { status: 409 });
      const sortOrder = payload.sortOrder || await getNextRegionSortOrder(env.TRAVEL_DB, payload.destinationSlug);
      await env.TRAVEL_DB.prepare(`
        INSERT INTO regions (slug, name, country_slug, destination_slug, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(slug, payload.name, payload.countrySlug, payload.destinationSlug, sortOrder, payload.isActive, now, now).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }

    if (entity === "home_destinations") {
      return updateHomeDestinations(env.TRAVEL_DB, body);
    }

    if (entity === "destination") {
      const payload = readDestinationPayload(body);
      const slug = requireSlug(body.slug, payload.name);
      if (!payload.name || !payload.countryName) return okJson({ message: "도시 이름과 나라를 입력해 주세요." }, { status: 400 });
      const exists = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(slug).first();
      if (exists) return okJson({ message: "같은 slug의 도시가 이미 있습니다." }, { status: 409 });
      const sortOrder = payload.sortOrder || await getNextSortOrder(env.TRAVEL_DB, "destinations");
      await env.TRAVEL_DB.prepare(`
        INSERT INTO destinations (
          slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
          card_title, card_description, card_image, card_image_alt,
          hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
          best_season, airport_info, transport_summary, status, is_active, sort_order, home_featured, home_featured_order, published_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        slug,
        payload.name,
        payload.countryName,
        payload.city,
        payload.title,
        payload.metaDescription,
        payload.summary,
        payload.coverImage,
        payload.coverImageAlt,
        payload.cardTitle,
        payload.cardDescription,
        payload.cardImage,
        payload.cardImageAlt,
        payload.heroEyebrow,
        payload.heroTitle,
        payload.heroSummary,
        payload.heroImage,
        payload.heroImageAlt,
        payload.bestSeason,
        payload.airportInfo,
        payload.transportSummary,
        payload.status,
        payload.isActive,
        sortOrder,
        payload.homeFeatured,
        payload.homeFeaturedOrder,
        now,
        now
      ).run();
      const countrySlug = slugifySetting(body.country_slug || countryToSlug(payload.countryName));
      const countryExists = await env.TRAVEL_DB.prepare(`SELECT slug FROM countries WHERE slug = ?`).bind(countrySlug).first();
      if (countrySlug && !countryExists) {
        await env.TRAVEL_DB.prepare(`
          INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
          VALUES (?, ?, ?, 1, ?, ?)
        `).bind(countrySlug, payload.countryName, await getNextSortOrder(env.TRAVEL_DB, "countries"), now, now).run();
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

  if (entity === "region") {
    const currentDestinationSlug = slugifySetting(body.current_destination_slug || body.destination_slug);
    if (!currentDestinationSlug) return okJson({ message: "수정할 지역의 도시가 필요합니다." }, { status: 400 });
    const current = await env.TRAVEL_DB.prepare(`SELECT * FROM regions WHERE destination_slug = ? AND slug = ?`).bind(currentDestinationSlug, currentSlug).first();
    if (!current) return okJson({ message: "수정할 지역을 찾지 못했습니다." }, { status: 404 });
    const nextSlug = requireSlug(body.slug, currentSlug);
    const payload = await readRegionPayload(env.TRAVEL_DB, body, { current });
    if (!payload.destinationSlug) return okJson({ message: "지역을 연결할 도시를 선택해 주세요." }, { status: 400 });
    if (!payload.name) return okJson({ message: "지역 이름을 입력해 주세요." }, { status: 400 });
    const destination = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(payload.destinationSlug).first();
    if (!destination) return okJson({ message: "지역을 연결할 도시를 찾지 못했습니다." }, { status: 404 });
    if (nextSlug !== currentSlug || payload.destinationSlug !== currentDestinationSlug) {
      const duplicate = await env.TRAVEL_DB.prepare(`SELECT id FROM regions WHERE destination_slug = ? AND slug = ?`).bind(payload.destinationSlug, nextSlug).first();
      if (duplicate) return okJson({ message: "같은 도시 안에 같은 slug의 지역이 이미 있습니다." }, { status: 409 });
    }
    await env.TRAVEL_DB.prepare(`
      UPDATE regions
      SET slug = ?, name = ?, country_slug = ?, destination_slug = ?, sort_order = ?, is_active = ?, updated_at = ?
      WHERE destination_slug = ? AND slug = ?
    `).bind(nextSlug, payload.name, payload.countrySlug, payload.destinationSlug, payload.sortOrder, payload.isActive, now, currentDestinationSlug, currentSlug).run();
    if (nextSlug !== currentSlug || payload.destinationSlug !== currentDestinationSlug || payload.name !== current.name) {
      await env.TRAVEL_DB.prepare(`
        UPDATE posts
        SET region_slug = ?, region_name = ?, destination_slug = CASE WHEN destination_slug = ? THEN ? ELSE destination_slug END, updated_at = ?
        WHERE destination_slug = ? AND region_slug = ?
      `).bind(nextSlug, payload.name, currentDestinationSlug, payload.destinationSlug, now, currentDestinationSlug, currentSlug).run();
      await env.TRAVEL_DB.prepare(`
        UPDATE hotels
        SET region_slug = ?, region_name = ?, destination_slug = CASE WHEN destination_slug = ? THEN ? ELSE destination_slug END, updated_at = ?
        WHERE destination_slug = ? AND region_slug = ?
      `).bind(nextSlug, payload.name, currentDestinationSlug, payload.destinationSlug, now, currentDestinationSlug, currentSlug).run();
    }
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "home_destinations") {
    return updateHomeDestinations(env.TRAVEL_DB, body);
  }

  if (entity === "destination") {
    const current = await env.TRAVEL_DB.prepare(`SELECT * FROM destinations WHERE slug = ?`).bind(currentSlug).first();
    if (!current) return okJson({ message: "수정할 도시를 찾지 못했습니다." }, { status: 404 });
    const nextSlug = requireSlug(body.slug, currentSlug);
    const payload = readDestinationPayload(body, { current });
    if (!payload.name || !payload.countryName) return okJson({ message: "도시 이름과 나라를 입력해 주세요." }, { status: 400 });
    if (nextSlug !== currentSlug) {
      const duplicate = await env.TRAVEL_DB.prepare(`SELECT slug FROM destinations WHERE slug = ?`).bind(nextSlug).first();
      if (duplicate) return okJson({ message: "같은 slug의 도시가 이미 있습니다." }, { status: 409 });
    }
    await env.TRAVEL_DB.prepare(`
      UPDATE destinations
      SET slug = ?, name = ?, country = ?, city = ?, title = ?, meta_description = ?, summary = ?, cover_image = ?, cover_image_alt = ?,
          card_title = ?, card_description = ?, card_image = ?, card_image_alt = ?,
          hero_eyebrow = ?, hero_title = ?, hero_summary = ?, hero_image = ?, hero_image_alt = ?,
          best_season = ?, airport_info = ?, transport_summary = ?, status = ?, is_active = ?, sort_order = ?, home_featured = ?, home_featured_order = ?, updated_at = ?
      WHERE slug = ?
    `).bind(
      nextSlug,
      payload.name,
      payload.countryName,
      payload.city,
      payload.title,
      payload.metaDescription,
      payload.summary,
      payload.coverImage,
      payload.coverImageAlt,
      payload.cardTitle,
      payload.cardDescription,
      payload.cardImage,
      payload.cardImageAlt,
      payload.heroEyebrow,
      payload.heroTitle,
      payload.heroSummary,
      payload.heroImage,
      payload.heroImageAlt,
      payload.bestSeason,
      payload.airportInfo,
      payload.transportSummary,
      payload.status,
      payload.isActive,
      payload.sortOrder,
      payload.homeFeatured,
      payload.homeFeaturedOrder,
      now,
      currentSlug
    ).run();
    if (nextSlug !== currentSlug) {
      await env.TRAVEL_DB.prepare(`UPDATE posts SET destination_slug = ?, updated_at = ? WHERE destination_slug = ?`).bind(nextSlug, now, currentSlug).run();
      await env.TRAVEL_DB.prepare(`UPDATE hotels SET destination_slug = ?, updated_at = ? WHERE destination_slug = ?`).bind(nextSlug, now, currentSlug).run();
      await env.TRAVEL_DB.prepare(`UPDATE regions SET destination_slug = ?, updated_at = ? WHERE destination_slug = ?`).bind(nextSlug, now, currentSlug).run();
    }
    const countrySlug = slugifySetting(body.country_slug || countryToSlug(payload.countryName));
    const countryExists = await env.TRAVEL_DB.prepare(`SELECT slug FROM countries WHERE slug = ?`).bind(countrySlug).first();
    if (countrySlug && !countryExists) {
      await env.TRAVEL_DB.prepare(`
        INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, 1, ?, ?)
      `).bind(countrySlug, payload.countryName, await getNextSortOrder(env.TRAVEL_DB, "countries"), now, now).run();
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

  if (entity === "region") {
    const destinationSlug = slugifySetting(body.destination_slug || body.current_destination_slug);
    if (!destinationSlug) return okJson({ message: "삭제할 지역의 도시가 필요합니다." }, { status: 400 });
    const hardDelete = Number(body.hard_delete ?? 0) === 1 || String(body.action || body.mode || "").trim() === "delete";
    if (hardDelete) {
      await env.TRAVEL_DB.prepare(`UPDATE posts SET region_slug = '', region_name = '', updated_at = ? WHERE destination_slug = ? AND region_slug = ?`).bind(now, destinationSlug, slug).run();
      await env.TRAVEL_DB.prepare(`UPDATE hotels SET region_slug = '', region_name = '', updated_at = ? WHERE destination_slug = ? AND region_slug = ?`).bind(now, destinationSlug, slug).run();
      await env.TRAVEL_DB.prepare(`DELETE FROM regions WHERE destination_slug = ? AND slug = ?`).bind(destinationSlug, slug).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }
    await env.TRAVEL_DB.prepare(`UPDATE regions SET is_active = 0, updated_at = ? WHERE destination_slug = ? AND slug = ?`).bind(now, destinationSlug, slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "country") {
    const hardDelete = Number(body.hard_delete ?? 0) === 1 || String(body.action || body.mode || "").trim() === "delete";
    if (hardDelete) {
      await env.TRAVEL_DB.prepare(`DELETE FROM countries WHERE slug = ?`).bind(slug).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }
    await env.TRAVEL_DB.prepare(`UPDATE countries SET is_active = 0, updated_at = ? WHERE slug = ?`).bind(now, slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  if (entity === "destination") {
    const hardDelete = Number(body.hard_delete ?? 0) === 1 || String(body.action || body.mode || "").trim() === "delete";
    if (hardDelete) {
      await env.TRAVEL_DB.prepare(`UPDATE posts SET destination_slug = '', region_slug = '', region_name = '', updated_at = ? WHERE destination_slug = ?`).bind(now, slug).run();
      await env.TRAVEL_DB.prepare(`UPDATE hotels SET destination_slug = '', region_slug = '', region_name = '', updated_at = ? WHERE destination_slug = ?`).bind(now, slug).run();
      await env.TRAVEL_DB.prepare(`DELETE FROM regions WHERE destination_slug = ?`).bind(slug).run();
      await env.TRAVEL_DB.prepare(`DELETE FROM destinations WHERE slug = ?`).bind(slug).run();
      return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
    }
    await env.TRAVEL_DB.prepare(`UPDATE destinations SET status = 'draft', is_active = 0, home_featured = 0, home_featured_order = 0, updated_at = ? WHERE slug = ?`).bind(now, slug).run();
    return okJson({ ok: true, ...(await getTravelSettings(env.TRAVEL_DB, { includeInactive: true })) });
  }

  return okJson({ message: "지원하지 않는 설정 종류입니다." }, { status: 400 });
}
