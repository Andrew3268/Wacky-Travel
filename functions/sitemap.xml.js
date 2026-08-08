import { STATIC_ROUTES } from "../lib/seo/static-routes.js";
import { getSiteOrigin, normalizePagePath } from "../lib/seo/site-url.js";
import {
  getHotelPostGroup,
  postBelongsToDestination
} from "./api/destination-posts.js";
import { isMissingPublicModifiedColumnError } from "../lib/posts/public-modified-date.js";

const OCEAN_REST_ROUTE = "/travel-by-mood/ocean-rest/";
const OCEAN_REST_MIN_PUBLISHED_POSTS = 5;
const ARCHIVE_ROUTE_PATTERN = /^\/destinations\/([^/]+)\/(hotels|hotel-recommendations)\/$/;

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

async function safeAll(db, sql) {
  try {
    if (!db) return [];
    const rows = await db.prepare(sql).all();
    return rows.results || [];
  } catch {
    return [];
  }
}

async function safeAllWithPublicModifiedFallback(db, sql) {
  try {
    if (!db) return [];
    const rows = await db.prepare(sql).all();
    return rows.results || [];
  } catch (error) {
    if (!isMissingPublicModifiedColumnError(error)) return [];
    const fallbackSql = sql.replace(
      "COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at",
      "published_at AS content_modified_at"
    );
    try {
      const rows = await db.prepare(fallbackSql).all();
      return rows.results || [];
    } catch {
      return [];
    }
  }
}

function parseJsonArray(value = "") {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed.map((item) => String(item || "").trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function isOceanRestPost(post = {}) {
  return String(post.content_type || "").trim() === "hotel_intro"
    && parseJsonArray(post.mood_tags_json).includes("ocean-rest");
}

function collectArchiveDestinations(destinations = []) {
  const map = new Map();

  destinations.forEach((destination) => {
    const slug = String(destination.slug || "").trim();
    if (slug) map.set(slug, destination);
  });

  STATIC_ROUTES.forEach((route) => {
    const match = route.match(ARCHIVE_ROUTE_PATTERN);
    if (!match || map.has(match[1])) return;
    map.set(match[1], { slug: match[1], name: match[1], city: match[1] });
  });

  return Array.from(map.values());
}

function collectConditionalRouteAvailability(posts = [], destinations = []) {
  const availableArchiveRoutes = new Set();
  const archiveDestinations = collectArchiveDestinations(destinations);

  archiveDestinations.forEach((destination) => {
    let hasHotelReviews = false;
    let hasHotelRecommendations = false;

    for (const post of posts) {
      if (!postBelongsToDestination(post, destination)) continue;
      const group = getHotelPostGroup(post);
      if (group === "hotel_intro") hasHotelReviews = true;
      if (group === "top5_series") hasHotelRecommendations = true;
      if (hasHotelReviews && hasHotelRecommendations) break;
    }

    const slug = String(destination.slug || "").trim();
    if (hasHotelReviews) availableArchiveRoutes.add(`/destinations/${slug}/hotels/`);
    if (hasHotelRecommendations) availableArchiveRoutes.add(`/destinations/${slug}/hotel-recommendations/`);
  });

  return {
    availableArchiveRoutes,
    oceanRestAvailable: posts.filter(isOceanRestPost).length >= OCEAN_REST_MIN_PUBLISHED_POSTS
  };
}

function shouldIncludeStaticRoute(route, availability) {
  if (route === OCEAN_REST_ROUTE) return availability.oceanRestAvailable;
  if (ARCHIVE_ROUTE_PATTERN.test(route)) return availability.availableArchiveRoutes.has(route);
  return true;
}

export async function onRequestGet({ env, request }) {
  const origin = getSiteOrigin(env, request);

  const [posts, destinations] = await Promise.all([
    safeAllWithPublicModifiedFallback(env.TRAVEL_DB, `
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
        mood_tags_json,
        updated_at,
        published_at,
        COALESCE(NULLIF(content_modified_at, ''), published_at) AS content_modified_at
      FROM posts
      WHERE status = 'published'
      ORDER BY COALESCE(updated_at, published_at) DESC
      LIMIT 20000
    `),
    safeAll(env.TRAVEL_DB, `
      SELECT slug, name, city, updated_at
      FROM destinations
      WHERE status = 'published'
      ORDER BY updated_at DESC
      LIMIT 5000
    `)
  ]);

  const conditionalAvailability = collectConditionalRouteAvailability(posts, destinations);
  const urlMap = new Map();

  STATIC_ROUTES.forEach((route) => {
    if (!shouldIncludeStaticRoute(route, conditionalAvailability)) return;
    addUrl(urlMap, { loc: `${origin}${normalizePagePath(route)}` });
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

  const urls = Array.from(urlMap.values()).sort((a, b) => a.loc.localeCompare(b.loc, "en"));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${xmlEscape(item.loc)}</loc>${item.lastmod ? `<lastmod>${xmlEscape(item.lastmod)}</lastmod>` : ""}</url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // Keep sitemap responses fresh after deployments. This avoids browsers/CDNs
      // continuing to show removed URLs from an older sitemap response.
      "cache-control": "no-store, max-age=0",
      "cdn-cache-control": "no-store",
      "cloudflare-cdn-cache-control": "no-store",
      "x-robots-tag": "noindex"
    }
  });
}
