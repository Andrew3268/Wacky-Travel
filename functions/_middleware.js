import {
  absoluteSiteUrl,
  getSiteOrigin,
  isPageLikePath,
  normalizePagePath,
  normalizeSiteOrigin
} from "../lib/seo/site-url.js";
import {
  buildDestinationPostQuery,
  getHotelPostGroup,
  renderHotelPostCard
} from "./api/destination-posts.js";
import { DEFAULT_CONTENT_TYPES } from "../lib/travel/travel-settings.js";

const INDEX_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX_FOLLOW = "noindex, follow, noarchive";
const NOINDEX_PRIVATE = "noindex, nofollow, noarchive, nosnippet";

export async function onRequest(context) {
  const { request, env } = context;
  const requestUrl = new URL(request.url);
  const method = String(request.method || "GET").toUpperCase();
  const siteOrigin = getSiteOrigin(env, request);

  const originRedirect = buildOriginRedirect(requestUrl, env, siteOrigin, method);
  if (originRedirect) return originRedirect;

  const knownPageFallbackRedirect = buildKnownDestinationPageFallbackRedirect(requestUrl, requestUrl.origin, method);
  if (knownPageFallbackRedirect) return knownPageFallbackRedirect;

  const slashRedirect = buildTrailingSlashRedirect(requestUrl, requestUrl.origin, method);
  if (slashRedirect) return slashRedirect;

  const archiveDataPromise = loadArchiveData(env, requestUrl.pathname);
  const upstream = await context.next();
  const headers = new Headers(upstream.headers);
  applySecurityHeaders(headers, requestUrl);

  const contentType = headers.get("content-type") || "";
  const isHtml = /text\/html|application\/xhtml\+xml/i.test(contentType);
  const isApi = requestUrl.pathname.startsWith("/api/");

  if (isApi) {
    headers.set("x-robots-tag", NOINDEX_PRIVATE);
    headers.set("cache-control", headers.get("cache-control") || "no-store");
    return cloneResponse(upstream, headers);
  }

  if (!isHtml) return cloneResponse(upstream, headers);

  const canonical = `${siteOrigin}${normalizePagePath(requestUrl.pathname)}`;
  const robots = resolveRobotsDirective(requestUrl, upstream.status);
  headers.set("x-robots-tag", robots);
  headers.set("content-language", "ko-KR");

  if (upstream.status < 400 && isPageLikePath(requestUrl.pathname)) {
    headers.set("link", `<${canonical}>; rel="canonical"`);
  }

  if (robots.startsWith("noindex") || isPrivatePath(requestUrl.pathname)) {
    headers.set("cache-control", "no-store");
  } else if (!headers.has("cache-control")) {
    headers.set("cache-control", "public, max-age=0, must-revalidate");
  }

  const archiveData = await archiveDataPromise;
  const rewriter = new HTMLRewriter()
    .on('link[rel="canonical"]', new FixedAttributeHandler("href", canonical))
    .on('meta[property="og:url"]', new FixedAttributeHandler("content", canonical))
    .on('meta[property="og:image"]', new AbsoluteAttributeHandler("content", siteOrigin))
    .on('meta[name="twitter:image"]', new AbsoluteAttributeHandler("content", siteOrigin))
    .on('meta[name="robots"]', new FixedAttributeHandler("content", robots))
    .on('script[type="application/ld+json"]', new JsonLdHandler(siteOrigin));

  if (archiveData) {
    rewriter
      .on("[data-archive-grid]", new ArchiveGridHandler(archiveData))
      .on("[data-archive-count]", new ArchiveCountHandler(archiveData))
      .on(".wt-city-archive-summary", new ArchiveSummaryHandler(archiveData));
  }

  return rewriter.transform(new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers
  }));
}

function buildOriginRedirect(url, env, siteOrigin, method) {
  if (!(method === "GET" || method === "HEAD")) return null;
  const configured = String(env?.SITE_ORIGIN || "").trim();
  const enforce = String(env?.ENFORCE_SITE_ORIGIN || "").trim().toLowerCase() === "true";
  if (!configured || !enforce) return null;
  if (["localhost", "127.0.0.1", "::1"].includes(url.hostname)) return null;
  const preferred = normalizeSiteOrigin(configured);
  if (url.origin === preferred) return null;
  return Response.redirect(`${preferred}${url.pathname}${url.search}`, 308);
}

function buildKnownDestinationPageFallbackRedirect(url, siteOrigin, method) {
  if (!(method === "GET" || method === "HEAD")) return null;
  const match = url.pathname.match(/^\/destinations\/([^/]+)\/(first-trip|value-hotel|near-trip|family-trip|quiet-stay|hotel-guide|travel-guide|hotels|hotel-recommendations)\/(?:.+)$/);
  if (!match) return null;
  const target = `${siteOrigin}/destinations/${match[1]}/${match[2]}/${url.search}`;
  return Response.redirect(target, 308);
}

function buildTrailingSlashRedirect(url, siteOrigin, method) {
  if (!(method === "GET" || method === "HEAD")) return null;
  if (!isPageLikePath(url.pathname)) return null;
  if (url.pathname === "/" || url.pathname.endsWith("/")) return null;
  const target = `${siteOrigin}${normalizePagePath(url.pathname)}${url.search}`;
  return Response.redirect(target, 308);
}

function resolveRobotsDirective(url, status) {
  const path = url.pathname;
  if (status >= 400) return NOINDEX_PRIVATE;
  if (isPrivatePath(path)) return NOINDEX_PRIVATE;
  if (path === "/search/" || path === "/search") return NOINDEX_FOLLOW;

  const duplicateParams = (
    (path === "/" && ["category", "tag", "status", "page"].some((key) => url.searchParams.has(key)))
    || (/^\/destinations\/[^/]+\/(hotels|hotel-recommendations)\/?$/.test(path) && url.searchParams.size > 0)
    || (/^\/destinations\/?$/.test(path) && url.searchParams.has("survey"))
  );
  return duplicateParams ? NOINDEX_FOLLOW : INDEX_ROBOTS;
}

function isPrivatePath(pathname = "") {
  const path = String(pathname || "");
  return path.startsWith("/admin/")
    || path === "/admin"
    || path === "/add.html"
    || path === "/edit.html";
}

function applySecurityHeaders(headers, requestUrl) {
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "SAMEORIGIN");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "accelerometer=(), autoplay=(), camera=(), geolocation=(), gyroscope=(), microphone=(), payment=(), usb=()");
  headers.set("cross-origin-opener-policy", "same-origin-allow-popups");
  headers.set("x-permitted-cross-domain-policies", "none");
  headers.set("x-download-options", "noopen");
  headers.set("x-dns-prefetch-control", "on");
  headers.set("content-security-policy", [
    "default-src 'self' https:",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self' https:",
    "script-src 'self' 'unsafe-inline' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-src 'self' https:",
    "media-src 'self' https:",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests"
  ].join("; "));
  if (requestUrl.protocol === "https:") {
    headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  }
}

function cloneResponse(response, headers) {
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

async function loadArchiveData(env, pathname) {
  const match = String(pathname || "").match(/^\/destinations\/([^/]+)\/(hotels|hotel-recommendations)\/?$/);
  if (!match || !env?.TRAVEL_DB) return null;

  const destinationSlug = decodeURIComponent(match[1]);
  const requestedType = match[2] === "hotels" ? "hotel_intro" : "top5_series";

  try {
    const destination = await env.TRAVEL_DB.prepare(`
      SELECT slug, name, city
      FROM destinations
      WHERE slug = ? AND LOWER(TRIM(COALESCE(status, 'published'))) = 'published'
      LIMIT 1
    `).bind(destinationSlug).first() || { slug: destinationSlug, name: destinationSlug, city: destinationSlug };

    const postQuery = buildDestinationPostQuery(destination, {
      selectSql: "slug, title, category, summary, cover_image, cover_image_alt, tags_json, content_type, destination_slug, region_slug, region_name, recommendation_category_slug, recommendation_category_name, recommendation_category_description, hotel_slug, (SELECT h.name FROM hotels h WHERE h.slug = posts.hotel_slug LIMIT 1) AS hotel_name, updated_at, published_at",
      orderSql: `
        ORDER BY
          CASE WHEN TRIM(COALESCE(destination_slug, '')) = ? THEN 0 ELSE 1 END,
          updated_at DESC,
          published_at DESC
        LIMIT 240
      `,
      orderBinds: [destinationSlug]
    });

    const rows = await env.TRAVEL_DB.prepare(postQuery.sql).bind(...postQuery.binds).all();
    const items = (rows.results || [])
      .filter((post) => getHotelPostGroup(post) === requestedType)
      .slice(0, 60);

    return {
      type: requestedType,
      destinationName: String(destination.name || destination.city || destinationSlug),
      total: items.length,
      html: items.map((post) => renderHotelPostCard(post, DEFAULT_CONTENT_TYPES)).join("")
    };
  } catch {
    return null;
  }
}

class FixedAttributeHandler {
  constructor(attribute, value) {
    this.attribute = attribute;
    this.value = value;
  }
  element(element) {
    element.setAttribute(this.attribute, this.value);
  }
}

class AbsoluteAttributeHandler {
  constructor(attribute, origin) {
    this.attribute = attribute;
    this.origin = origin;
  }
  element(element) {
    const value = element.getAttribute(this.attribute);
    if (!value) return;
    element.setAttribute(this.attribute, absoluteSiteUrl(value, this.origin));
  }
}

class JsonLdHandler {
  constructor(origin) {
    this.origin = origin;
    this.buffer = "";
  }
  text(textChunk) {
    this.buffer += textChunk.text;
    if (!textChunk.lastInTextNode) {
      textChunk.remove();
      return;
    }
    try {
      const parsed = JSON.parse(this.buffer);
      textChunk.replace(JSON.stringify(absolutizeJsonLd(parsed, this.origin)));
    } catch {
      textChunk.replace(this.buffer);
    } finally {
      this.buffer = "";
    }
  }
}

function absolutizeJsonLd(value, origin) {
  if (Array.isArray(value)) return value.map((item) => absolutizeJsonLd(item, origin));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, absolutizeJsonLd(item, origin)]));
  }
  if (typeof value === "string" && value.startsWith("/")) {
    return absoluteSiteUrl(value, origin);
  }
  return value;
}

class ArchiveGridHandler {
  constructor(data) { this.data = data; }
  element(element) {
    const emptyText = this.data.type === "hotel_intro"
      ? `아직 등록된 ${this.data.destinationName} 추천 호텔 리뷰가 없습니다.`
      : `아직 등록된 ${this.data.destinationName} 호텔 추천 글이 없습니다.`;
    const content = this.data.html || `<div class="empty-card" data-filter-empty>${escapeHtml(emptyText)}</div>`;
    element.setInnerContent(content, { html: true });
    element.setAttribute("aria-busy", "false");
    element.setAttribute("data-ssr-ready", "true");
  }
}

class ArchiveCountHandler {
  constructor(data) { this.data = data; }
  element(element) {
    const label = this.data.type === "hotel_intro" ? "추천 호텔 리뷰" : "호텔 추천 글";
    element.setInnerContent(`${escapeHtml(this.data.destinationName)} ${label} ${this.data.total}개를 모아봤어요.`);
  }
}

class ArchiveSummaryHandler {
  constructor(data) { this.data = data; }
  element(element) {
    element.removeAttribute("hidden");
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
