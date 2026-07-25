export const DEFAULT_SITE_ORIGIN = "https://wacky-travel.pages.dev";

export function normalizeSiteOrigin(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return DEFAULT_SITE_ORIGIN;
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return DEFAULT_SITE_ORIGIN;
    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function getSiteOrigin(env = {}, request = null) {
  try {
    const requestUrl = new URL(request?.url || DEFAULT_SITE_ORIGIN);
    if (["localhost", "127.0.0.1", "::1"].includes(requestUrl.hostname)) return requestUrl.origin;
  } catch {}
  const configured = String(env?.SITE_ORIGIN || "").trim();
  if (configured) return normalizeSiteOrigin(configured);
  try {
    return new URL(request?.url || DEFAULT_SITE_ORIGIN).origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function normalizePagePath(pathname = "/") {
  let path = String(pathname || "/").trim() || "/";
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path === "/") return "/";
  if (hasFileExtension(path)) return path;
  return path.endsWith("/") ? path : `${path}/`;
}

export function hasFileExtension(pathname = "") {
  const lastSegment = String(pathname || "").split("/").pop() || "";
  return /\.[a-z0-9]{1,12}$/i.test(lastSegment);
}

export function isPageLikePath(pathname = "") {
  const path = String(pathname || "/");
  if (path.startsWith("/api/") || path.startsWith("/img/")) return false;
  if (["/robots.txt", "/sitemap.xml", "/favicon.ico"].includes(path)) return false;
  return !hasFileExtension(path);
}

export function absoluteSiteUrl(value = "/", origin = DEFAULT_SITE_ORIGIN) {
  const siteOrigin = normalizeSiteOrigin(origin);
  const raw = String(value || "/").trim() || "/";
  try {
    const url = new URL(raw, `${siteOrigin}/`);
    if (url.origin !== siteOrigin) return url.toString();
    url.pathname = normalizeAssetOrPagePath(url.pathname);
    return url.toString();
  } catch {
    return `${siteOrigin}/`;
  }
}

export function normalizeAssetOrPagePath(pathname = "/") {
  const path = String(pathname || "/") || "/";
  if (hasFileExtension(path) || path.startsWith("/api/") || path.startsWith("/img/")) return path;
  return normalizePagePath(path);
}

export function canonicalUrlForRequest(request, env = {}) {
  const requestUrl = new URL(request.url);
  const origin = getSiteOrigin(env, request);
  return `${origin}${normalizePagePath(requestUrl.pathname)}`;
}
