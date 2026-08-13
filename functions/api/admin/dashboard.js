import { okJson, requireAdmin } from "../../_utils.js";


export async function onRequestGet({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) {
    return okJson({ message: "관리자 로그인이 필요합니다." }, {
      status: 401,
      headers: { "cache-control": "private, no-store" }
    });
  }

  const [countsRow, statusRows, popularRows, latestRows, recentRows] = await Promise.all([
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
      ORDER BY published_at DESC, updated_at DESC
      LIMIT 10
    `).all(),
    env.TRAVEL_DB.prepare(`
      SELECT slug, title, status, updated_at, published_at
      FROM posts
      ORDER BY updated_at DESC, published_at DESC
      LIMIT 5
    `).all()
  ]);

  const statusMap = new Map((statusRows?.results || []).map((row) => [
    String(row.status_key || "published").trim().toLowerCase(),
    Number(row.count || 0)
  ]));

  return okJson({
    ok: true,
    generated_at: new Date().toISOString(),
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
    latest: (latestRows.results || []).map((row) => ({
      slug: row.slug,
      title: row.title,
      status: String(row.status || "published").trim().toLowerCase(),
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
