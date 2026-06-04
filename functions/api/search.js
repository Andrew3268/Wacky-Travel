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

function getSearchTerms(value = "") {
  const full = normalizeText(value);
  const compactFull = compactText(full);
  const parts = full
    .split(/[\s,，、|/·・]+/)
    .map((term) => normalizeText(term))
    .filter((term) => term.length >= 2);

  return [...new Set([full, compactFull, ...parts].filter(Boolean))].slice(0, 12);
}

function likeValue(value = "") {
  return `%${normalizeText(value)}%`;
}

function compactLikeValue(value = "") {
  return `%${compactText(value)}%`;
}

function escapeIdentifier(value = "") {
  return String(value || "").replace(/[^a-zA-Z0-9_]/g, "");
}

async function getTableColumns(db, tableName) {
  const safeTable = escapeIdentifier(tableName);
  if (!safeTable) return new Set();
  try {
    const rows = await db.prepare(`PRAGMA table_info(${safeTable})`).all();
    return new Set((rows.results || []).map((row) => String(row.name || "").trim()).filter(Boolean));
  } catch (_) {
    return new Set();
  }
}

function hasColumn(columns, name) {
  return columns instanceof Set && columns.has(name);
}

function selectColumn(columns, name, alias = "p", asName = name, fallback = "''") {
  return hasColumn(columns, name) ? `${alias}.${name} AS ${asName}` : `${fallback} AS ${asName}`;
}

function textSql(alias, column) {
  return `LOWER(COALESCE(${alias}.${column}, ''))`;
}

function compactSql(alias, column) {
  return `REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(COALESCE(${alias}.${column}, '')), ' ', ''), '-', ''), '_', ''), '/', ''), '·', ''), '・', ''), '.', '')`;
}

function normalizedStatusSql(alias = "p") {
  return `CASE
    WHEN TRIM(COALESCE(${alias}.status, '')) = '' THEN 'published'
    WHEN LOWER(TRIM(COALESCE(${alias}.status, ''))) IN ('published', 'publish', 'public', '공개', '발행') THEN 'published'
    WHEN LOWER(TRIM(COALESCE(${alias}.status, ''))) IN ('draft', 'private', '비공개', '초안', '임시저장', '임시 저장') THEN 'draft'
    ELSE LOWER(TRIM(COALESCE(${alias}.status, 'published')))
  END`;
}

function pushSearchConditions({ parts, binds, term, postColumns, hotelColumns, canJoinHotels }) {
  const postSearchColumns = [
    "slug",
    "title",
    "summary",
    "meta_description",
    "category",
    "content_md",
    "focus_keyword",
    "search_intent",
    "destination_slug",
    "hotel_slug",
    "longtail_keywords_json",
    "tags_json"
  ].filter((column) => hasColumn(postColumns, column));

  for (const column of postSearchColumns) {
    parts.push(`${textSql("p", column)} LIKE ?`);
    binds.push(likeValue(term));
  }

  const compactTerm = compactText(term);
  if (compactTerm.length >= 2) {
    for (const column of ["slug", "title", "summary", "meta_description", "content_md", "focus_keyword", "hotel_slug"].filter((column) => hasColumn(postColumns, column))) {
      parts.push(`${compactSql("p", column)} LIKE ?`);
      binds.push(compactLikeValue(term));
    }
  }

  if (canJoinHotels) {
    const hotelSearchColumns = ["slug", "name", "name_en", "area", "address", "summary", "meta_description", "badges_json"].filter((column) => hasColumn(hotelColumns, column));
    for (const column of hotelSearchColumns) {
      parts.push(`${textSql("h", column)} LIKE ?`);
      binds.push(likeValue(term));
    }

    if (compactTerm.length >= 2) {
      for (const column of ["slug", "name", "name_en", "area", "address"].filter((column) => hasColumn(hotelColumns, column))) {
        parts.push(`${compactSql("h", column)} LIKE ?`);
        binds.push(compactLikeValue(term));
      }
    }
  }
}

function buildSearchWhere(query, options) {
  const terms = getSearchTerms(query);
  if (!terms.length) return { sql: "", binds: [] };

  const binds = [];
  const groups = terms.map((term) => {
    const parts = [];
    pushSearchConditions({ ...options, parts, binds, term });
    return parts.length ? `(${parts.join(" OR ")})` : "";
  }).filter(Boolean);

  return {
    sql: groups.length ? `(${groups.join(" OR ")})` : "",
    binds
  };
}

function safeArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return String(value || "")
      .split(/[,.，、|]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}

function buildSearchBlob(row = {}) {
  return [
    row.slug,
    row.title,
    row.summary,
    row.meta_description,
    row.category,
    row.focus_keyword,
    row.search_intent,
    row.destination_slug,
    row.hotel_slug,
    row.hotel_name,
    row.hotel_name_en,
    row.hotel_area,
    row._search_content,
    ...safeArray(row.tags_json),
    ...safeArray(row.longtail_keywords_json)
  ].map((item) => String(item || "").trim()).filter(Boolean).join(" ");
}

function getSearchScore(row = {}, query = "") {
  const full = normalizeText(query);
  const compactFull = compactText(query);
  const title = normalizeText(row.title);
  const hotelName = normalizeText(row.hotel_name);
  const focusKeyword = normalizeText(row.focus_keyword);
  const summary = normalizeText(row.summary || row.meta_description);
  const slug = normalizeText(row.slug);
  const source = normalizeText(buildSearchBlob(row));
  const compactSource = compactText(source);
  const terms = getSearchTerms(query);

  let score = 0;
  if (full && title.includes(full)) score += 140;
  if (full && hotelName.includes(full)) score += 135;
  if (compactFull && compactText(title).includes(compactFull)) score += 130;
  if (compactFull && compactText(hotelName).includes(compactFull)) score += 125;
  if (full && focusKeyword.includes(full)) score += 105;
  if (full && slug.includes(full)) score += 95;
  if (full && summary.includes(full)) score += 75;

  for (const term of terms) {
    const compactTerm = compactText(term);
    if (!term) continue;
    if (title.includes(term)) score += 24;
    if (hotelName.includes(term)) score += 22;
    if (focusKeyword.includes(term)) score += 16;
    if (summary.includes(term)) score += 10;
    if (source.includes(term)) score += 4;
    if (compactTerm && compactSource.includes(compactTerm)) score += 3;
  }

  return score;
}

function sortBySearchScore(a, b, query) {
  const scoreDiff = getSearchScore(b, query) - getSearchScore(a, query);
  if (scoreDiff) return scoreDiff;
  const bDate = new Date(b.published_at || b.updated_at || 0).getTime() || 0;
  const aDate = new Date(a.published_at || a.updated_at || 0).getTime() || 0;
  return bDate - aDate;
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const query = String(url.searchParams.get("q") || "").trim();
  const page = clampInt(url.searchParams.get("page"), 1, 1, 9999);
  const perPage = clampInt(url.searchParams.get("per_page"), 12, 1, 24);
  const status = String(url.searchParams.get("status") || "published").trim().toLowerCase();
  const offset = (page - 1) * perPage;

  if (!query) {
    return okJson({
      items: [],
      filters: { q: "", status: "published" },
      pagination: { page, per_page: perPage, total: 0, total_pages: 1, has_more: false, next_page: null }
    }, { headers: { "cache-control": "no-store" } });
  }

  const db = env.TRAVEL_DB;
  const postColumns = await getTableColumns(db, "posts");
  if (!postColumns.size || !hasColumn(postColumns, "slug")) {
    return okJson({
      items: [],
      filters: { q: query, status: "published" },
      pagination: { page, per_page: perPage, total: 0, total_pages: 1, has_more: false, next_page: null }
    }, { headers: { "cache-control": "no-store" } });
  }

  const hotelColumns = await getTableColumns(db, "hotels");
  const relationColumns = await getTableColumns(db, "post_hotel_relations");
  const admin = await getAdminSession(env, request).catch(() => null);
  const requestedStatus = new Set(["published", "draft", "all"]).has(status) ? status : "published";
  const safeStatus = admin ? requestedStatus : "published";

  const canJoinRelations = hasColumn(relationColumns, "id") && hasColumn(relationColumns, "post_slug") && hasColumn(relationColumns, "hotel_slug") && hasColumn(postColumns, "slug");
  const canJoinHotels = hotelColumns.size && hasColumn(hotelColumns, "slug") && (hasColumn(postColumns, "hotel_slug") || canJoinRelations);

  const relationJoin = canJoinRelations
    ? `LEFT JOIN post_hotel_relations phr ON phr.post_slug = p.slug AND phr.id = (
        SELECT phr2.id
        FROM post_hotel_relations phr2
        WHERE phr2.post_slug = p.slug
        ORDER BY COALESCE(phr2.sort_order, 0) ASC, phr2.id ASC
        LIMIT 1
      )`
    : "";

  const hotelKey = hasColumn(postColumns, "hotel_slug") && canJoinRelations
    ? "COALESCE(NULLIF(p.hotel_slug, ''), phr.hotel_slug)"
    : hasColumn(postColumns, "hotel_slug")
      ? "p.hotel_slug"
      : canJoinRelations
        ? "phr.hotel_slug"
        : "''";

  const hotelJoin = canJoinHotels ? `LEFT JOIN hotels h ON h.slug = ${hotelKey}` : "";

  const where = [];
  const binds = [];

  if (safeStatus !== "all" && hasColumn(postColumns, "status")) {
    where.push(`${normalizedStatusSql("p")} = ?`);
    binds.push(safeStatus);
  }

  const searchWhere = buildSearchWhere(query, { postColumns, hotelColumns, canJoinHotels });
  if (searchWhere.sql) {
    where.push(searchWhere.sql);
    binds.push(...searchWhere.binds);
  }

  const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const maxRows = 500;

  const selectParts = [
    selectColumn(postColumns, "slug", "p"),
    selectColumn(postColumns, "title", "p"),
    selectColumn(postColumns, "category", "p"),
    selectColumn(postColumns, "meta_description", "p"),
    selectColumn(postColumns, "summary", "p"),
    selectColumn(postColumns, "cover_image", "p"),
    selectColumn(postColumns, "cover_image_alt", "p"),
    selectColumn(postColumns, "focus_keyword", "p"),
    selectColumn(postColumns, "longtail_keywords_json", "p"),
    selectColumn(postColumns, "enable_sidebar_ad", "p", "enable_sidebar_ad", "0"),
    selectColumn(postColumns, "enable_inarticle_ads", "p", "enable_inarticle_ads", "1"),
    selectColumn(postColumns, "tags_json", "p"),
    selectColumn(postColumns, "content_type", "p"),
    selectColumn(postColumns, "destination_slug", "p"),
    selectColumn(postColumns, "hotel_slug", "p"),
    canJoinHotels && hasColumn(hotelColumns, "name") ? "h.name AS hotel_name" : "'' AS hotel_name",
    canJoinHotels && hasColumn(hotelColumns, "name_en") ? "h.name_en AS hotel_name_en" : "'' AS hotel_name_en",
    canJoinHotels && hasColumn(hotelColumns, "area") ? "h.area AS hotel_area" : "'' AS hotel_area",
    selectColumn(postColumns, "affiliate_enabled", "p", "affiliate_enabled", "0"),
    selectColumn(postColumns, "search_intent", "p"),
    selectColumn(postColumns, "status", "p", "status", "'published'"),
    selectColumn(postColumns, "view_count", "p", "view_count", "0"),
    selectColumn(postColumns, "published_at", "p"),
    selectColumn(postColumns, "updated_at", "p"),
    selectColumn(postColumns, "content_md", "p", "_search_content")
  ];

  const sql = `
    SELECT ${selectParts.join(",\n      ")}
    FROM posts p
    ${relationJoin}
    ${hotelJoin}
    ${whereSql}
    ORDER BY ${hasColumn(postColumns, "published_at") ? "p.published_at" : "p.slug"} DESC
    LIMIT ?
  `;

  try {
    const rows = await db.prepare(sql).bind(...binds, maxRows).all();
    const sorted = (rows.results || [])
      .map((row) => ({ ...row, search_score: getSearchScore(row, query) }))
      .filter((row) => row.search_score > 0)
      .sort((a, b) => sortBySearchScore(a, b, query));

    const total = sorted.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const items = sorted.slice(offset, offset + perPage).map((row) => {
      const { _search_content, hotel_name_en, hotel_area, ...item } = row;
      return item;
    });

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
    }, { headers: { "cache-control": "no-store" } });
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
