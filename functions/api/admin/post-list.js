import { okJson, requireAdmin } from "../../_utils.js";

function clampInt(value, fallback, min, max) {
  const num = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function normalizedStatusSql() {
  const cleaned = `LOWER(TRIM(REPLACE(REPLACE(REPLACE(REPLACE(COALESCE(status, ''), CHAR(9), ''), CHAR(10), ''), CHAR(13), ''), '　', '')))`;
  return `CASE
    WHEN ${cleaned} IN ('draft', '초안', '임시저장', '임시 저장') THEN 'draft'
    ELSE 'published'
  END`;
}

function isMissingColumnError(error) {
  return /no such column/i.test(String(error?.message || error || ""));
}

async function loadItems(db, { status, limit, offset }) {
  const statusExpr = normalizedStatusSql();
  const binds = [status, limit, offset];
  const fullSql = `
    SELECT
      slug,
      title,
      category,
      summary,
      meta_description,
      content_type,
      destination_slug,
      region_slug,
      region_name,
      recommendation_category_slug,
      recommendation_category_name,
      ${statusExpr} AS status,
      COALESCE(view_count, 0) AS view_count,
      published_at,
      updated_at
    FROM posts
    WHERE ${statusExpr} = ?
    ORDER BY updated_at DESC, published_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    return await db.prepare(fullSql).bind(...binds).all();
  } catch (error) {
    if (!isMissingColumnError(error)) throw error;

    const fallbackSql = `
      SELECT
        slug,
        title,
        category,
        summary,
        meta_description,
        content_type,
        destination_slug,
        '' AS region_slug,
        '' AS region_name,
        '' AS recommendation_category_slug,
        '' AS recommendation_category_name,
        ${statusExpr} AS status,
        COALESCE(view_count, 0) AS view_count,
        published_at,
        updated_at
      FROM posts
      WHERE ${statusExpr} = ?
      ORDER BY updated_at DESC, published_at DESC
      LIMIT ? OFFSET ?
    `;
    return db.prepare(fallbackSql).bind(...binds).all();
  }
}

async function loadMinimalItems(db, { status, limit, offset }) {
  const statusExpr = normalizedStatusSql();
  return db.prepare(`
    SELECT
      slug,
      title,
      category,
      summary,
      meta_description,
      content_type,
      destination_slug,
      '' AS region_slug,
      '' AS region_name,
      '' AS recommendation_category_slug,
      '' AS recommendation_category_name,
      ${statusExpr} AS status,
      COALESCE(view_count, 0) AS view_count,
      published_at,
      updated_at
    FROM posts
    WHERE ${statusExpr} = ?
    ORDER BY updated_at DESC, published_at DESC
    LIMIT ? OFFSET ?
  `).bind(status, limit, offset).all();
}

export async function onRequestGet({ env, request }) {
  const admin = await requireAdmin(env, request);
  if (!admin) {
    return okJson({ message: "관리자 로그인이 필요합니다." }, {
      status: 401,
      headers: { "cache-control": "private, no-store" }
    });
  }

  const url = new URL(request.url);
  const requestedStatus = String(url.searchParams.get("status") || "published").trim().toLowerCase();
  const status = requestedStatus === "draft" ? "draft" : "published";
  const page = clampInt(url.searchParams.get("page"), 1, 1, 9999);
  const perPage = clampInt(url.searchParams.get("per_page"), 50, 1, 100);
  const offset = (page - 1) * perPage;
  const statusExpr = normalizedStatusSql();

  const [selectedCountRow, statusRows] = await Promise.all([
    env.TRAVEL_DB.prepare(`
      SELECT COUNT(*) AS total
      FROM posts
      WHERE ${statusExpr} = ?
    `).bind(status).first(),
    env.TRAVEL_DB.prepare(`
      SELECT ${statusExpr} AS status_key, COUNT(*) AS count
      FROM posts
      GROUP BY ${statusExpr}
    `).all()
  ]);

  const total = Number(selectedCountRow?.total || 0);
  let itemsRows = await loadItems(env.TRAVEL_DB, { status, limit: perPage, offset });

  // 카운트는 존재하지만 복합 SELECT 결과가 비어 있는 경우에도
  // 관리자 목록에서 초안을 잃어버리지 않도록 최소 컬럼 조회로 한 번 더 확인합니다.
  if (page === 1 && total > 0 && !(itemsRows?.results || []).length) {
    itemsRows = await loadMinimalItems(env.TRAVEL_DB, { status, limit: perPage, offset });
  }
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const statusMap = new Map((statusRows?.results || []).map((row) => [
    String(row.status_key || "published"),
    Number(row.count || 0)
  ]));

  return okJson({
    ok: true,
    status,
    items: itemsRows?.results || [],
    counts: {
      published: statusMap.get("published") || 0,
      draft: statusMap.get("draft") || 0
    },
    pagination: {
      page,
      per_page: perPage,
      total,
      total_pages: totalPages,
      has_more: page < totalPages,
      next_page: page < totalPages ? page + 1 : null
    }
  }, {
    headers: {
      "cache-control": "private, no-store, no-cache, must-revalidate",
      "pragma": "no-cache",
      "expires": "0"
    }
  });
}
