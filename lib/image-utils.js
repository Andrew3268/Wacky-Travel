export function unwrapCfImageUrl(src = "") {
  const value = String(src || "").trim();
  if (!value || !value.includes("/cdn-cgi/image/")) return value;

  const marker = "/cdn-cgi/image/";
  const markerIndex = value.indexOf(marker);
  if (markerIndex < 0) return value;

  const afterMarker = value.slice(markerIndex + marker.length);
  const optionEnd = afterMarker.indexOf("/");
  if (optionEnd < 0) return value;

  const embedded = afterMarker.slice(optionEnd + 1);
  if (!embedded) return value;
  return embedded;
}

export function absolutizeImageUrl(src = "", origin = "") {
  const unwrapped = unwrapCfImageUrl(src);
  const value = String(unwrapped || "").trim();
  if (!value) return "";
  if (/^(data|blob):/i.test(value)) return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (!origin) return value;
  try {
    return new URL(value, origin).toString();
  } catch {
    return value;
  }
}

function getHostname(url = "") {
  try { return new URL(url).hostname.toLowerCase(); } catch { return ""; }
}

function getBaseDomain(hostname = "") {
  const parts = String(hostname || "").toLowerCase().split(".").filter(Boolean);
  if (parts.length <= 2) return parts.join(".");
  return parts.slice(-2).join(".");
}

function isLocalOrigin(origin = "") {
  const host = getHostname(origin);
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".localhost");
}


function isImageProxyUrl(url = "", origin = "") {
  const value = String(url || "").trim();
  if (!value) return false;
  try {
    const parsed = new URL(value, origin || undefined);
    return parsed.pathname.startsWith("/img/");
  } catch {
    return value.startsWith("/img/") || value.includes("/img/");
  }
}

function isR2DevUrl(url = "") {
  const raw = String(url || "").toLowerCase();
  const normalized = unwrapCfImageUrl(raw).toLowerCase();
  const host = getHostname(normalized);
  return raw.includes(".r2.dev") || normalized.includes(".r2.dev") || host.endsWith(".r2.dev") || host === "r2.dev";
}

function encodeBase64Url(value = "") {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function buildImageProxyUrl(src = "", origin = "") {
  const absolute = absolutizeImageUrl(src, origin);
  if (!absolute || /^(data|blob):/i.test(absolute)) return absolute;
  if (!isR2DevUrl(absolute)) return absolute;

  const encoded = encodeBase64Url(absolute);
  const path = `/img/${encoded}`;
  if (!origin) return path;
  try {
    return new URL(path, origin).toString();
  } catch {
    return path;
  }
}

function canUseCloudflareImageTransform(absolute = "", origin = "") {
  const normalized = unwrapCfImageUrl(absolute);

  // /img/*는 Pages Function 프록시 내부에서 직접 Image Resizing을 수행합니다.
  // /cdn-cgi/image/.../https://도메인/img/... 형태로 다시 감싸면 404가 발생할 수 있으므로
  // URL 인터페이스 변환은 우회하고 /img 프록시의 w/q 파라미터를 사용합니다.
  if (isImageProxyUrl(normalized, origin)) return false;

  const srcHost = getHostname(normalized);
  const originHost = getHostname(origin);
  if (!srcHost || !originHost) return false;
  if (isLocalOrigin(origin)) return false;

  if (srcHost === originHost) return true;
  return getBaseDomain(srcHost) === getBaseDomain(originHost);
}

function buildImageProxyTransformUrl(deliveryUrl = "", options = {}, origin = "") {
  if (!isImageProxyUrl(deliveryUrl, origin)) return deliveryUrl;
  const base = origin || "https://bestayable.invalid";
  try {
    const url = new URL(deliveryUrl, base);
    const config = { format: "auto", quality: 82, ...options };
    const width = Number.parseInt(config.width, 10);
    const quality = Number.parseInt(config.quality, 10);
    if (Number.isFinite(width) && width > 0) url.searchParams.set("w", String(width));
    if (Number.isFinite(quality) && quality > 0) url.searchParams.set("q", String(quality));
    if (config.fit) url.searchParams.set("fit", String(config.fit));
    if (config.format) url.searchParams.set("format", String(config.format));
    return origin ? url.toString() : `${url.pathname}${url.search}`;
  } catch {
    return deliveryUrl;
  }
}

export function buildCfImageUrl(src = "", options = {}, origin = "") {
  const raw = String(src || "").trim();
  const absolute = absolutizeImageUrl(raw, origin);
  if (!absolute) return "";
  if (/^(data|blob):/i.test(absolute)) return absolute;

  const deliveryUrl = buildImageProxyUrl(absolute, origin);
  if (!deliveryUrl) return "";
  const config = { format: "auto", quality: 82, ...options };

  // R2 이미지는 /img 프록시 자체에서 Cloudflare Image Resizing을 수행합니다.
  // /cdn-cgi/image/.../https://도메인/img/... 중첩 URL을 만들지 않아 기존 404 문제도 피합니다.
  if (isImageProxyUrl(deliveryUrl, origin)) {
    return buildImageProxyTransformUrl(deliveryUrl, config, origin);
  }
  if (!canUseCloudflareImageTransform(deliveryUrl, origin)) return deliveryUrl;

  const params = [];
  Object.entries(config).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    params.push(`${key}=${value}`);
  });
  return `/cdn-cgi/image/${params.join(",")}/${deliveryUrl}`;
}

export function buildResponsiveImageSet(src = "", config = {}, origin = "") {
  const widths = Array.isArray(config.widths) && config.widths.length ? config.widths : [320, 640, 960, 1200];
  const sizes = String(config.sizes || "100vw");
  const baseOptions = {
    fit: config.fit || "scale-down",
    format: config.format || "auto",
    quality: config.quality || 82,
  };

  const absolute = absolutizeImageUrl(src, origin);
  const deliveryUrl = buildImageProxyUrl(absolute, origin);
  const normalized = [...new Set(widths.map((value) => Math.max(1, parseInt(value, 10) || 0)).filter(Boolean))].sort((a, b) => a - b);
  const transformed = isImageProxyUrl(deliveryUrl, origin) || canUseCloudflareImageTransform(deliveryUrl, origin);
  const srcset = transformed
    ? normalized.map((width) => `${buildCfImageUrl(src, { ...baseOptions, width }, origin)} ${width}w`).join(", ")
    : "";

  const fallbackWidth = config.fallbackWidth || normalized[Math.min(1, normalized.length - 1)] || 640;
  const srcUrl = buildCfImageUrl(src, { ...baseOptions, width: fallbackWidth }, origin);
  return {
    src: srcUrl,
    srcset,
    sizes,
    original: deliveryUrl || absolute,
    directOriginal: absolute,
  };
}

export function buildImageAttrs(src = "", config = {}, origin = "") {
  const image = buildResponsiveImageSet(src, config, origin);
  const fallbackSrc = image.original || absolutizeImageUrl(src, origin);
  const directFallbackSrc = image.directOriginal && image.directOriginal !== fallbackSrc ? image.directOriginal : "";
  const attrs = [
    `src="${escapeAttr(image.src)}"`,
    image.srcset ? `srcset="${escapeAttr(image.srcset)}"` : "",
    image.sizes ? `sizes="${escapeAttr(image.sizes)}"` : "",
    fallbackSrc ? `data-original-src="${escapeAttr(fallbackSrc)}"` : "",
    directFallbackSrc ? `data-direct-src="${escapeAttr(directFallbackSrc)}"` : "",
    fallbackSrc ? `onerror="this.onerror=null;this.removeAttribute('srcset');this.src=this.dataset.originalSrc || this.dataset.directSrc;"` : "",
  ].filter(Boolean).join(" ");
  return { ...image, attrs };
}

function escapeAttr(value = "") {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
