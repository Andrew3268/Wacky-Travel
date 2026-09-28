import { STATIC_ROUTES, STATIC_ROUTE_LASTMOD } from "../lib/seo/static-routes.js";
import { getSiteOrigin, normalizePagePath } from "../lib/seo/site-url.js";
import { isMissingPublicModifiedColumnError } from "../lib/posts/public-modified-date.js";
import { getHotelPostGroup } from "./api/destination-posts.js";

const ARCHIVE_MIN_PUBLISHED_POSTS = 5;
const SITEMAP_VERSION = "2026-09-28-seo-stability-v7";
const ARCHIVE_INDEX_STATE_TABLE = "seo_archive_index_state";

// Pages still being prepared. Keep them out of search discovery until they are ready.
const SEARCH_BLOCKED_ROUTES = new Set([
  "/hotel-promotions/"
]);

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function addUrl(urlMap, { loc, lastmod = "" }) {
  const normalizedLoc = String(loc || "").trim();
  if (!normalizedLoc) return;
  const normalizedLastmod = normalizeLastmod(lastmod);
  const previous = urlMap.get(normalizedLoc);
  if (!previous || (normalizedLastmod && normalizedLastmod > previous.lastmod)) {
    urlMap.set(normalizedLoc, { loc: normalizedLoc, lastmod: normalizedLastmod });
  }
}

function normalizeLastmod(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : "";
  return date.toISOString().slice(0, 10);
}

async function queryAll(db, sql) {
  if (!db) throw new Error("TRAVEL_DB binding is unavailable");
  const rows = await db.prepare(sql).all();
  return rows.results || [];
}

async function queryAllWithPublicModifiedFallback(db, sql) {
  if (!db) throw new Error("TRAVEL_DB binding is unavailable");
  try {
    const rows = await db.prepare(sql).all();
    return rows.results || [];
  } catch (error) {
    if (!isMissingPublicModifiedColumnError(error)) throw error;
    const fallbackSql = sql.replace(
      "COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at",
      "published_at AS content_modified_at"
    );
    const rows = await db.prepare(fallbackSql).all();
    return rows.results || [];
  }
}

async function readStableArchiveRoutes(db) {
  if (!db) throw new Error("TRAVEL_DB binding is unavailable");
  try {
    const rows = await db.prepare(`
      SELECT route
      FROM ${ARCHIVE_INDEX_STATE_TABLE}
      WHERE qualified = 1
    `).all();
    return new Set((rows.results || []).map((row) => normalizePagePath(row.route)).filter(Boolean));
  } catch (error) {
    // Migration 025 is backwards-compatible: the sitemap can still be generated
    // with the live >=5 rule until the state table is installed.
    console.warn("[seo] stable archive state unavailable for sitemap", error);
    return new Set();
  }
}

async function rememberQualifiedArchiveRoutes(db, availability) {
  if (!db) return;
  const qualified = Array.from(availability.archiveStats.entries())
    .filter(([, stats]) => Number(stats?.count || 0) >= ARCHIVE_MIN_PUBLISHED_POSTS);
  if (!qualified.length) return;
  try {
    await Promise.all(qualified.map(([route, stats]) => db.prepare(`
      INSERT INTO ${ARCHIVE_INDEX_STATE_TABLE} (route, qualified, qualified_at, last_seen_count, updated_at)
      VALUES (?, 1, datetime('now'), ?, datetime('now'))
      ON CONFLICT(route) DO UPDATE SET
        qualified = 1,
        qualified_at = COALESCE(${ARCHIVE_INDEX_STATE_TABLE}.qualified_at, excluded.qualified_at),
        last_seen_count = excluded.last_seen_count,
        updated_at = excluded.updated_at
    `).bind(normalizePagePath(route), Number(stats?.count || 0)).run()));
  } catch (error) {
    console.warn("[seo] stable archive state write skipped for sitemap", error);
  }
}

function isSearchBlockedRoute(route = "") {
  const path = normalizePagePath(route);
  return SEARCH_BLOCKED_ROUTES.has(path)
    || /^\/destinations\/[^/]+\/hotel-location-survey\/$/.test(path);
}

function archiveRouteForPost(post = {}) {
  const destinationSlug = String(post.destination_slug || "").trim().toLowerCase();
  const group = getHotelPostGroup(post);
  if (!destinationSlug || !["hotel_intro", "top5_series"].includes(group)) return "";
  const segment = group === "hotel_intro" ? "hotels" : "hotel-recommendations";
  return `/destinations/${destinationSlug}/${segment}/`;
}

function collectConditionalRouteAvailability(posts = []) {
  const archiveStats = new Map();
  for (const post of posts) {
    const route = archiveRouteForPost(post);
    if (!route) continue;
    const previous = archiveStats.get(route) || { count: 0, lastmod: "" };
    const candidateLastmod = normalizeLastmod(post.content_modified_at || post.updated_at || post.published_at);
    archiveStats.set(route, {
      count: previous.count + 1,
      lastmod: candidateLastmod > previous.lastmod ? candidateLastmod : previous.lastmod
    });
  }
  return { archiveStats };
}

function shouldIncludeStaticRoute(route, availability, stableArchiveRoutes = new Set()) {
  if (isSearchBlockedRoute(route)) return false;
  if (/^\/destinations\/[^/]+\/(hotels|hotel-recommendations)\/$/.test(route)) {
    return Number(availability.archiveStats.get(route)?.count || 0) >= ARCHIVE_MIN_PUBLISHED_POSTS
      || stableArchiveRoutes.has(normalizePagePath(route));
  }
  return true;
}

export async function onRequestGet({ env, request }) {
  const origin = getSiteOrigin(env, request);

  let posts;
  let destinations;
  try {
    [posts, destinations] = await Promise.all([
      queryAllWithPublicModifiedFallback(env.TRAVEL_DB, `
      SELECT
        slug,
        title,
        category,
        summary,
        tags_json,
        content_type,
        destination_slug,
        recommendation_category_slug,
        recommendation_category_name,
        recommendation_category_description,
        hotel_slug,
        updated_at,
        published_at,
        COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at
      FROM posts
      WHERE status = 'published'
      ORDER BY COALESCE(updated_at, published_at) DESC
      LIMIT 20000
    `),
    queryAll(env.TRAVEL_DB, `
      SELECT slug, name, city, updated_at
      FROM destinations
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT 5000
    `)
    ]);
  } catch (error) {
    console.error("[seo] sitemap generation aborted because D1 query failed", error);
    return new Response("Temporary sitemap generation error", {
      status: 503,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store, no-cache, max-age=0, must-revalidate",
        "retry-after": "300",
        "x-bestayable-sitemap-version": SITEMAP_VERSION
      }
    });
  }

  const conditionalAvailability = collectConditionalRouteAvailability(posts);
  await rememberQualifiedArchiveRoutes(env.TRAVEL_DB, conditionalAvailability);
  const stableArchiveRoutes = await readStableArchiveRoutes(env.TRAVEL_DB);
  const urlMap = new Map();

  STATIC_ROUTES.forEach((route) => {
    if (!shouldIncludeStaticRoute(route, conditionalAvailability, stableArchiveRoutes)) return;
    addUrl(urlMap, {
      loc: `${origin}${normalizePagePath(route)}`,
      lastmod: conditionalAvailability.archiveStats.get(route)?.lastmod || STATIC_ROUTE_LASTMOD[route] || ""
    });
  });



  // Destination root URLs are sourced only from STATIC_ROUTES.
  // D1 may contain published destination records whose static page does not exist;
  // those records must never create a new sitemap URL. D1 is used only to attach
  // lastmod to a destination URL that has already been admitted by STATIC_ROUTES.
  destinations.forEach((item) => {
    const slug = String(item.slug || "").trim();
    if (!slug) return;
    const loc = `${origin}/destinations/${encodeURIComponent(slug)}/`;
    if (!urlMap.has(loc)) return;
    addUrl(urlMap, { loc, lastmod: item.updated_at });
  });

  posts.forEach((item) => {
    const slug = String(item.slug || "").trim();
    if (!slug) return;
    addUrl(urlMap, {
      loc: `${origin}/post/${encodeURIComponent(slug)}/`,
      lastmod: item.content_modified_at || item.published_at
    });
  });

  // Final denylist guard. Even if a future source accidentally adds a blocked URL
  // to urlMap, it is removed again immediately before XML serialization.
  const urls = Array.from(urlMap.values())
    .filter((item) => {
      try {
        const pathname = normalizePagePath(new URL(item.loc).pathname);
        return !isSearchBlockedRoute(pathname);
      } catch {
        return false;
      }
    })
    .sort((a, b) => a.loc.localeCompare(b.loc, "en"));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc>${item.lastmod ? `<lastmod>${xmlEscape(item.lastmod)}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // Keep sitemap responses fresh after deployments. This avoids browsers/CDNs
      // continuing to show removed URLs from an older sitemap response.
      "cache-control": "no-store, no-cache, max-age=0, must-revalidate",
      "cdn-cache-control": "no-store",
      "cloudflare-cdn-cache-control": "no-store",
      "x-bestayable-sitemap-version": SITEMAP_VERSION
    }
  });
}
