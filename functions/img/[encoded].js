const ONE_YEAR = 60 * 60 * 24 * 365;
const CACHE_CONTROL = `public, max-age=${ONE_YEAR}, immutable`;
const ALLOWED_WIDTHS = [180, 240, 320, 480, 640, 720, 768, 900, 960, 1200, 1600];
const ALLOWED_QUALITIES = [75, 80, 82, 85, 90];
const ALLOWED_FITS = new Set(["scale-down", "contain", "cover", "crop", "pad"]);
const ALLOWED_FORMATS = new Set(["auto", "avif", "webp", "jpeg"]);

function decodeBase64Url(value = "") {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isAllowedImageSource(url) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return parsed.protocol === "https:" && (
      host === "images.unsplash.com" ||
      host.endsWith(".r2.dev") ||
      host === "r2.dev"
    );
  } catch {
    return false;
  }
}

function nearestAllowedNumber(rawValue, allowedValues) {
  const parsed = Number.parseInt(String(rawValue || ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return allowedValues.reduce((best, value) => (
    Math.abs(value - parsed) < Math.abs(best - parsed) ? value : best
  ), allowedValues[0]);
}

function resolveOutputFormat(requestedFormat, acceptHeader = "") {
  const normalized = String(requestedFormat || "auto").trim().toLowerCase();
  const format = ALLOWED_FORMATS.has(normalized) ? normalized : "auto";
  if (format !== "auto") return format;

  const accept = String(acceptHeader || "").toLowerCase();
  if (accept.includes("image/avif")) return "avif";
  if (accept.includes("image/webp")) return "webp";
  return null;
}

function getTransformConfig(request) {
  const url = new URL(request.url);
  const hasTransformParams = ["w", "width", "q", "quality", "fit", "format"].some((key) => url.searchParams.has(key));
  if (!hasTransformParams) return null;

  const width = nearestAllowedNumber(url.searchParams.get("w") || url.searchParams.get("width"), ALLOWED_WIDTHS);
  const quality = nearestAllowedNumber(url.searchParams.get("q") || url.searchParams.get("quality") || 82, ALLOWED_QUALITIES) || 82;
  const requestedFit = String(url.searchParams.get("fit") || "scale-down").trim().toLowerCase();
  const fit = ALLOWED_FITS.has(requestedFit) ? requestedFit : "scale-down";
  const requestedFormat = String(url.searchParams.get("format") || "auto").trim().toLowerCase();
  const format = resolveOutputFormat(requestedFormat, request.headers.get("accept") || "");

  const image = { quality, fit };
  if (width) image.width = width;
  if (format) image.format = format;

  return {
    image,
    width,
    quality,
    fit,
    requestedFormat: ALLOWED_FORMATS.has(requestedFormat) ? requestedFormat : "auto",
    resolvedFormat: format || "original",
  };
}

function buildCacheKey(request, transform) {
  const url = new URL(request.url);
  url.search = "";
  if (transform) {
    if (transform.width) url.searchParams.set("w", String(transform.width));
    url.searchParams.set("q", String(transform.quality));
    url.searchParams.set("fit", transform.fit);
    url.searchParams.set("format", transform.resolvedFormat);
  }
  return new Request(url.toString(), { method: "GET" });
}

function buildCachedImageResponse(upstreamResponse, transform = null, transformStatus = "ORIGINAL") {
  const headers = new Headers();
  const contentType = upstreamResponse.headers.get("content-type") || "application/octet-stream";
  headers.set("content-type", contentType);
  headers.set("cache-control", CACHE_CONTROL);
  headers.set("x-content-type-options", "nosniff");
  headers.set("access-control-allow-origin", "*");
  headers.set("x-image-transform", transformStatus);

  if (transform) {
    headers.set("vary", "Accept");
    if (transform.width) headers.set("x-image-width", String(transform.width));
    headers.set("x-image-quality", String(transform.quality));
    headers.set("x-image-format", transform.resolvedFormat);
  }

  const etag = upstreamResponse.headers.get("etag");
  const lastModified = upstreamResponse.headers.get("last-modified");
  if (etag) headers.set("etag", etag);
  if (lastModified) headers.set("last-modified", lastModified);

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers,
  });
}

async function fetchOriginal(sourceUrl, request) {
  return fetch(sourceUrl, {
    headers: {
      accept: request.headers.get("accept") || "image/avif,image/webp,image/*,*/*;q=0.8",
      "user-agent": "Mozilla/5.0 (compatible; BeStayableImageProxy/2.0)",
    },
    cf: {
      cacheEverything: true,
      cacheTtl: ONE_YEAR,
    },
  });
}

async function fetchTransformed(sourceUrl, request, transform) {
  return fetch(sourceUrl, {
    headers: {
      accept: request.headers.get("accept") || "image/avif,image/webp,image/*,*/*;q=0.8",
      "user-agent": "Mozilla/5.0 (compatible; BeStayableImageProxy/2.0)",
    },
    cf: {
      image: transform.image,
      cacheEverything: true,
      cacheTtl: ONE_YEAR,
    },
  });
}

export async function onRequestGet(context) {
  const { params, request } = context;
  const encoded = String(params.encoded || "").trim();
  if (!encoded) return new Response("Missing image", { status: 400 });

  let sourceUrl = "";
  try {
    sourceUrl = decodeBase64Url(encoded);
  } catch {
    return new Response("Invalid image", { status: 400 });
  }

  if (!isAllowedImageSource(sourceUrl)) {
    return new Response("Image source not allowed", { status: 403 });
  }

  const transform = getTransformConfig(request);
  const cache = caches.default;
  const cacheKey = buildCacheKey(request, transform);
  const cached = await cache.match(cacheKey);
  if (cached) {
    const hit = new Response(cached.body, cached);
    hit.headers.set("x-image-proxy-cache", "HIT");
    return hit;
  }

  let upstream = transform
    ? await fetchTransformed(sourceUrl, request, transform)
    : await fetchOriginal(sourceUrl, request);
  let transformStatus = transform ? "RESIZED" : "ORIGINAL";

  // Image Resizing이 계정/환경에서 일시적으로 실패해도 이미지는 깨뜨리지 않습니다.
  if (!upstream.ok && transform) {
    upstream = await fetchOriginal(sourceUrl, request);
    transformStatus = "FALLBACK";
  }

  if (!upstream.ok) {
    return new Response("Image fetch failed", {
      status: upstream.status,
      headers: {
        "cache-control": "public, max-age=60",
      },
    });
  }

  const response = buildCachedImageResponse(upstream, transform, transformStatus);
  response.headers.set("x-image-proxy-cache", "MISS");
  const cacheWrite = cache.put(cacheKey, response.clone()).catch(() => undefined);
  if (typeof context.waitUntil === "function") {
    context.waitUntil(cacheWrite);
  } else {
    await cacheWrite;
  }
  return response;
}
