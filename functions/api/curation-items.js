import { okJson, requireAdmin } from "../_utils.js";

const DEFAULTS = {
  mood: [
    ["ocean-rest", "바다를 보며 쉬는 여행"],
    ["hotel-stay", "숙소에서 보내는 하루"],
    ["food-trip", "먹으러 떠나는 여행"],
    ["walking-city", "걷기 좋은 도시 여행"],
    ["digital-nomad", "디지털 노마드의 하루"],
    ["hot-spring-spa", "온천과 스파로 푸는 피로"],
    ["family-memories", "아이와 함께 만드는 추억"],
    ["pet-friendly", "반려동물과 함께하는 여행"],
    ["romantic-date", "단둘이 떠나는 로맨틱 데이트"],
    ["budget-trip", "가성비 높은 알뜰 여행"]
  ]
};

const clean = (value) => String(value || "").replace(/\s+/g, " ").trim();
const slugify = (value) => clean(value)
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9가-힣_-]+/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

async function getColumns(db) {
  const rows = await db.prepare("PRAGMA table_info(curation_items)").all();
  return new Set((rows.results || []).map((row) => String(row.name || "")));
}

async function ensureColumns(db) {
  const columns = await getColumns(db);
  const definitions = {
    type: "TEXT DEFAULT 'mood'",
    slug: "TEXT DEFAULT ''",
    name: "TEXT DEFAULT ''",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "INTEGER DEFAULT 1",
    created_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  };
  for (const [name, definition] of Object.entries(definitions)) {
    if (columns.has(name)) continue;
    await db.prepare(`ALTER TABLE curation_items ADD COLUMN ${name} ${definition}`).run();
  }
}

async function upsertDefault(db, { slug, name, sortOrder, now }) {
  const existing = await db.prepare(`
    SELECT id
    FROM curation_items
    WHERE type = 'mood' AND slug = ?
    ORDER BY id ASC
    LIMIT 1
  `).bind(slug).first();

  if (existing?.id) {
    await db.prepare(`
      UPDATE curation_items
      SET name = ?, sort_order = ?, is_active = 1, updated_at = ?
      WHERE id = ?
    `).bind(name, sortOrder, now, Number(existing.id)).run();
    return;
  }

  await db.prepare(`
    INSERT INTO curation_items (type, slug, name, sort_order, is_active, created_at, updated_at)
    VALUES ('mood', ?, ?, ?, 1, ?, ?)
  `).bind(slug, name, sortOrder, now, now).run();
}

async function ensure(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS curation_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT '',
      updated_at TEXT DEFAULT '',
      UNIQUE(type, slug)
    )
  `).run();
  await ensureColumns(db);
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_curation_items_type_order ON curation_items(type, is_active, sort_order)`).run();

  const now = new Date().toISOString();
  const moodSlugs = DEFAULTS.mood.map(([slug]) => slug);

  await db.prepare(`UPDATE curation_items SET is_active = 0, updated_at = ? WHERE type = 'situation'`).bind(now).run();
  if (moodSlugs.length) {
    const placeholders = moodSlugs.map(() => "?").join(",");
    await db.prepare(`
      UPDATE curation_items
      SET is_active = 0, updated_at = ?
      WHERE type = 'mood' AND slug NOT IN (${placeholders})
    `).bind(now, ...moodSlugs).run();
  }

  for (let index = 0; index < DEFAULTS.mood.length; index += 1) {
    const [slug, name] = DEFAULTS.mood[index];
    await upsertDefault(db, { slug, name, sortOrder: index + 1, now });
  }
}

async function list(db) {
  const rows = await db.prepare(`
    SELECT id, type, slug, name, sort_order, is_active
    FROM curation_items
    WHERE type = 'mood'
    ORDER BY sort_order ASC, name COLLATE NOCASE ASC
  `).all();
  return rows.results || [];
}

function isSchemaError(error) {
  const message = String(error?.message || error || "").toLowerCase();
  return message.includes("no such table") || message.includes("no such column");
}

export async function onRequestGet({ env, request }) {
  if (!await requireAdmin(env, request)) {
    return okJson({ message: "관리자 로그인이 필요합니다." }, {
      status: 401,
      headers: { "cache-control": "private, no-store" }
    });
  }

  try {
    return okJson({ items: await list(env.TRAVEL_DB) }, { headers: { "cache-control": "private, no-store" } });
  } catch (error) {
    if (isSchemaError(error)) {
      try {
        await ensure(env.TRAVEL_DB);
        return okJson({ items: await list(env.TRAVEL_DB) }, { headers: { "cache-control": "private, no-store" } });
      } catch (repairError) {
        error = repairError;
      }
    }

    console.error("curation_items_load_failed", error);
    return okJson({
      message: "큐레이션 항목을 불러오지 못했습니다.",
      code: "curation_items_load_failed",
      detail: String(error?.message || error || "unknown_error")
    }, { status: 500, headers: { "cache-control": "private, no-store" } });
  }
}

export async function onRequestPost({ env, request }) {
  if (!await requireAdmin(env, request)) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensure(env.TRAVEL_DB);
  const body = await request.json().catch(() => null);
  const type = clean(body?.type);
  const name = clean(body?.name);
  const slug = slugify(body?.slug || name);
  if (type !== "mood" || !name || !slug) return okJson({ message: "종류, 이름, slug를 확인해 주세요." }, { status: 400 });

  const duplicate = await env.TRAVEL_DB.prepare(`SELECT id FROM curation_items WHERE type = ? AND slug = ? LIMIT 1`).bind(type, slug).first();
  if (duplicate) return okJson({ message: "같은 slug의 항목이 이미 있습니다." }, { status: 409 });

  const now = new Date().toISOString();
  const max = await env.TRAVEL_DB.prepare(`SELECT COALESCE(MAX(sort_order), 0) AS max_order FROM curation_items WHERE type = ?`).bind(type).first();
  await env.TRAVEL_DB.prepare(`
    INSERT INTO curation_items (type, slug, name, sort_order, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, 1, ?, ?)
  `).bind(type, slug, name, Number(max?.max_order || 0) + 1, now, now).run();
  return okJson({ ok: true, items: await list(env.TRAVEL_DB) });
}

export async function onRequestPut({ env, request }) {
  if (!await requireAdmin(env, request)) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensure(env.TRAVEL_DB);
  const body = await request.json().catch(() => null);
  const id = Number(body?.id || 0);
  const name = clean(body?.name);
  const slug = slugify(body?.slug);
  if (!id || !name || !slug) return okJson({ message: "수정할 항목 정보를 확인해 주세요." }, { status: 400 });

  const duplicate = await env.TRAVEL_DB.prepare(`
    SELECT id FROM curation_items
    WHERE type = 'mood' AND slug = ? AND id <> ?
    LIMIT 1
  `).bind(slug, id).first();
  if (duplicate) return okJson({ message: "같은 slug의 항목이 이미 있습니다." }, { status: 409 });

  await env.TRAVEL_DB.prepare(`
    UPDATE curation_items
    SET name = ?, slug = ?, sort_order = ?, is_active = ?, updated_at = ?
    WHERE id = ?
  `).bind(name, slug, Number(body.sort_order || 0), Number(body.is_active ?? 1) ? 1 : 0, new Date().toISOString(), id).run();
  return okJson({ ok: true, items: await list(env.TRAVEL_DB) });
}

export async function onRequestDelete({ env, request }) {
  if (!await requireAdmin(env, request)) return okJson({ message: "관리자 로그인이 필요합니다." }, { status: 401 });
  await ensure(env.TRAVEL_DB);
  const body = await request.json().catch(() => null);
  const id = Number(body?.id || 0);
  if (!id) return okJson({ message: "삭제할 항목이 필요합니다." }, { status: 400 });
  await env.TRAVEL_DB.prepare(`DELETE FROM curation_items WHERE id = ?`).bind(id).run();
  return okJson({ ok: true, items: await list(env.TRAVEL_DB) });
}
