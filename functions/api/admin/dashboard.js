import { okJson, requireAdmin } from "../../_utils.js";


async function ensureSiteSettings(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  await db.prepare(`
    INSERT OR IGNORE INTO site_settings (key, value, updated_at)
    VALUES ('index_sidebar_ad_enabled', '0', ?)
  `).bind(new Date().toISOString()).run();
}

export async function onRequestGet({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) {
    return okJson({ message: "관리자 로그인이 필요합니다." }, {
      status: 401,
      headers: { "cache-control": "private, no-store" }
    });
  }

  await ensureSiteSettings(env.TRAVEL_DB);
  const [countsRow, statusRows, popularRows, recentRows, settingsRows] = await Promise.all([
    env.TRAVEL_DB.prepare(`
      SELECT COUNT(*) AS total
      FROM posts
    `).first(),
    env.TRAVEL_DB.prepare(`
      SELECT status AS status_key, COUNT(*) AS count
      FROM posts
      GROUP BY status
    `).all(),
    env.TRAVEL_DB.prepare(`
      SELECT slug, title, COALESCE(view_count, 0) AS view_count, updated_at, published_at
      FROM posts
      WHERE status = 'published'
      ORDER BY COALESCE(view_count, 0) DESC, updated_at DESC, published_at DESC
      LIMIT 10
    `).all(),
    env.TRAVEL_DB.prepare(`
      SELECT slug, title, status, updated_at, published_at
      FROM posts
      ORDER BY updated_at DESC, published_at DESC
      LIMIT 5
    `).all(),
    env.TRAVEL_DB.prepare(`SELECT key, value FROM site_settings WHERE key = 'index_sidebar_ad_enabled'`).all()
  ]);

  const statusMap = new Map((statusRows?.results || []).map((row) => [
    String(row.status_key || "published").trim().toLowerCase(),
    Number(row.count || 0)
  ]));

  return okJson({
    ok: true,
    generated_at: new Date().toISOString(),
    settings: {
      index_sidebar_ad_enabled: (settingsRows.results || []).some((row) => row.key === "index_sidebar_ad_enabled" && String(row.value) === "1")
    },
    counts: {
      total: Number(countsRow?.total || 0),
      published: statusMap.get("published") || 0,
      draft: statusMap.get("draft") || 0
    },
    popular: (popularRows.results || []).map((row) => ({
      slug: row.slug,
      title: row.title,
      view_count: Number(row.view_count || 0),
      updated_at: row.updated_at,
      published_at: row.published_at
    })),
    recent: (recentRows.results || []).map((row) => ({
      slug: row.slug,
      title: row.title,
      status: String(row.status || "published").trim().toLowerCase(),
      updated_at: row.updated_at,
      published_at: row.published_at
    }))
  }, {
    headers: {
      "cache-control": "private, no-store, no-cache, must-revalidate",
      "pragma": "no-cache",
      "expires": "0"
    }
  });
}
