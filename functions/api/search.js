import { okJson, getAdminSession } from "../_utils.js";

function clampInt(value, fallback, min, max) {
  const num = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function normalizeText(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function compactText(value = "") {
  return normalizeText(value).replace(/[\s\-_/·・.,，、|()（）\[\]{}<>]+/g, "");
}

const BROAD_SEARCH_KEYWORDS = new Set(["호텔", "숙소", "여행", "추천"]);

function getSearchTerms(value = "") {
  return [...new Set(
    normalizeText(value)
      .split(/[\s,，、|/·・]+/)
      .map((term) => normalizeText(term))
      .filter((term) => term.length >= 2 && !BROAD_SEARCH_KEYWORDS.has(term))
  )].slice(0, 12);
}

function isTooBroadSearchQuery(value = "") {
  return getSearchTerms(value).length === 0;
}

function titleTextSql() {
  return `LOWER(COALESCE(p.title, ''))`;
}

function compactTitleSql() {
  return `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(COALESCE(p.title, '')), ' ', ''), '-', ''), '_', ''), '/', ''), '·', ''), '・', ''), '.', '')`;
}

function buildSearchWhere(query, safeStatus) {
  const terms = getSearchTerms(query);
  const where = [];
  const binds = [];

  if (safeStatus !== "all") {
    where.push("p.status = ?");
    binds.push(safeStatus);
  }

  for (const term of terms) {
    const parts = [`${titleTextSql()} LIKE ?`];
    binds.push(`%${term}%`);
    const compactTerm = compactText(term);
    if (compactTerm.length >= 2) {
      parts.push(`${compactTitleSql()} LIKE ?`);
      binds.push(`%${compactTerm}%`);
    }
    where.push(`(${parts.join(" OR ")})`);
  }

  return {
    sql: where.length ? `WHERE ${where.join(" AND ")}` : "",
    binds,
    terms
  };
}

function buildSearchScore(query, terms) {
  const meaningfulFull = terms.join(" ");
  const compactFull = compactText(meaningfulFull);
  const parts = [];
  const binds = [];

  if (meaningfulFull) {
    parts.push(`CASE WHEN TRIM(${titleTextSql()}) = ? THEN 300 ELSE 0 END`);
    binds.push(meaningfulFull);
    parts.push(`CASE WHEN TRIM(${titleTextSql()}) LIKE ? THEN 220 ELSE 0 END`);
    binds.push(`${meaningfulFull}%`);
    parts.push(`CASE WHEN ${titleTextSql()} LIKE ? THEN 180 ELSE 0 END`);
    binds.push(`%${meaningfulFull}%`);
  }
  if (compactFull) {
    parts.push(`CASE WHEN ${compactTitleSql()} LIKE ? THEN 150 ELSE 0 END`);
    binds.push(`%${compactFull}%`);
  }

  for (const term of terms) {
    parts.push(`CASE WHEN ${titleTextSql()} LIKE ? THEN 24 ELSE 0 END`);
    binds.push(`%${term}%`);
    const compactTerm = compactText(term);
    if (compactTerm) {
      parts.push(`CASE WHEN ${compactTitleSql()} LIKE ? THEN 12 ELSE 0 END`);
      binds.push(`%${compactTerm}%`);
    }
  }

  return {
    sql: parts.length ? parts.join(" + ") : "0",
    binds
  };
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const query = String(url.searchParams.get("q") || "").trim();
  const page = clampInt(url.searchParams.get("page"), 1, 1, 9999);
  const perPage = clampInt(url.searchParams.get("per_page"), 12, 1, 24);
  const requestedStatus = String(url.searchParams.get("status") || "published").trim().toLowerCase();
  const offset = (page - 1) * perPage;

  if (!query) {
    return okJson({
      items: [],
      filters: { q: "", status: "published" },
      pagination: { page, per_page: perPage, total: 0, total_pages: 1, has_more: false, next_page: null }
    }, { headers: { "cache-control": "no-store" } });
  }

  if (isTooBroadSearchQuery(query)) {
    return okJson({
      items: [],
      blocked: true,
      blocked_reason: "broad_single_keyword",
      message: "도시, 지역 또는 여행 조건을 함께 입력해 주세요.",
      examples: ["다낭 호텔", "하카타역 숙소", "공항 근처 호텔"],
      filters: { q: query, status: "published" },
      pagination: { page, per_page: perPage, total: 0, total_pages: 1, has_more: false, next_page: null }
    }, { headers: { "cache-control": "no-store" } });
  }

  const allowedStatuses = new Set(["published", "draft", "all"]);
  const normalizedRequestedStatus = allowedStatuses.has(requestedStatus) ? requestedStatus : "published";
  const needsAdmin = normalizedRequestedStatus !== "published";
  const admin = needsAdmin ? await getAdminSession(env, request).catch(() => null) : null;
  const safeStatus = admin ? normalizedRequestedStatus : "published";

  const searchWhere = buildSearchWhere(query, safeStatus);
  const score = buildSearchScore(query, searchWhere.terms);
  const countSql = `SELECT COUNT(*) AS total FROM posts p ${searchWhere.sql}`;
  const itemsSql = `
    SELECT
      p.slug,
      p.title,
      p.category,
      p.meta_description,
      p.summary,
      p.tags_json,
      p.longtail_keywords_json,
      p.content_type,
      p.status,
      p.published_at,
      p.updated_at,
      (${score.sql}) AS search_score
    FROM posts p
    ${searchWhere.sql}
    ORDER BY search_score DESC, p.published_at DESC, p.updated_at DESC
    LIMIT ? OFFSET ?
  `;

  try {
    const [countRow, rows] = await Promise.all([
      env.TRAVEL_DB.prepare(countSql).bind(...searchWhere.binds).first(),
      env.TRAVEL_DB.prepare(itemsSql).bind(...score.binds, ...searchWhere.binds, perPage, offset).all()
    ]);

    const total = Number(countRow?.total || 0);
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const items = (rows.results || []).map(({ search_score, ...item }) => item);
    const headers = safeStatus === "published"
      ? { "cache-control": "public, max-age=30, s-maxage=120, stale-while-revalidate=300" }
      : { "cache-control": "private, no-store", "vary": "Cookie" };

    return okJson({
      items,
      filters: { q: query, status: safeStatus },
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: totalPages,
        has_more: page < totalPages,
        next_page: page < totalPages ? page + 1 : null
      }
    }, { headers });
  } catch (error) {
    return okJson({
      items: [],
      error: "search_query_failed",
      message: error?.message || "검색 쿼리 실행에 실패했습니다.",
      filters: { q: query, status: safeStatus },
      pagination: { page, per_page: perPage, total: 0, total_pages: 1, has_more: false, next_page: null }
    }, { status: 200, headers: { "cache-control": "no-store" } });
  }
}
