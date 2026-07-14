const MAX_REDIRECTS = 8;
const MAX_URL_LENGTH = 4096;
const FETCH_TIMEOUT_MS = 8000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function isAgodaHost(hostname = "") {
  const host = String(hostname).toLowerCase();
  return host === "agoda.com" || host.endsWith(".agoda.com");
}

function isRedirectHostAllowed(hostname = "") {
  const host = String(hostname).toLowerCase();
  return isAgodaHost(host) || host === "onelink.me" || host.endsWith(".onelink.me");
}

const TRACKING_PARAMS = new Set([
  "cid", "site_id", "siteid", "af_siteid", "af_sub1", "af_sub2", "af_sub3",
  "af_sub4", "af_sub5", "af_dp", "af_web_dp", "af_ios_url", "af_android_url",
  "af_force_deeplink", "deep_link_value", "pid", "c", "tag", "searchrequestid",
  "flightsearchcriteria", "gclid", "fbclid", "msclkid"
]);

function cleanHotelUrl(value) {
  const url = value instanceof URL ? new URL(value.toString()) : new URL(value);
  for (const key of Array.from(url.searchParams.keys())) {
    const normalizedKey = key.toLowerCase();
    if (
      TRACKING_PARAMS.has(normalizedKey) ||
      normalizedKey.startsWith("utm_") ||
      normalizedKey.startsWith("af_")
    ) {
      url.searchParams.delete(key);
    }
  }
  url.hash = "";
  return url;
}

function normalizeAgodaUrl(value) {
  if (typeof value !== "string" || !value.trim() || value.length > MAX_URL_LENGTH) {
    throw new Error("올바른 아고다 링크를 입력해주세요.");
  }

  const url = new URL(value.trim());
  if (!isAgodaHost(url.hostname)) {
    throw new Error("agoda.com 링크만 사용할 수 있습니다.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("지원하지 않는 URL 형식입니다.");
  }
  url.protocol = "https:";
  url.username = "";
  url.password = "";
  return url;
}

function extractWebDestination(url) {
  const candidates = ["af_web_dp", "af_ios_url", "af_android_url", "deep_link_value"];
  for (const key of candidates) {
    const value = url.searchParams.get(key);
    if (!value) continue;
    try {
      let decoded = value;
      for (let i = 0; i < 2; i += 1) {
        const next = decodeURIComponent(decoded);
        if (next === decoded) break;
        decoded = next;
      }
      const target = new URL(decoded);
      if (isAgodaHost(target.hostname) && !target.pathname.startsWith("/sp/")) {
        target.protocol = "https:";
        return target;
      }
    } catch (_) {}
  }
  return null;
}

function extractFromHtml(html = "") {
  const decoded = html
    .replace(/&amp;/g, "&")
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/");

  const patterns = [
    /[?&]af_web_dp=([^"'<>\\s]+)/i,
    /"af_web_dp"\s*:\s*"([^"]+)"/i,
    /https:\/\/[^"'<>\\s]*agoda\.com\/[^"'<>\\s]*/i
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);
    if (!match) continue;
    const raw = match[1] || match[0];
    try {
      const value = pattern.source.includes("af_web_dp")
        ? decodeURIComponent(raw)
        : raw;
      const target = new URL(value);
      if (isAgodaHost(target.hostname) && !target.pathname.startsWith("/sp/")) {
        target.protocol = "https:";
        return target;
      }
    } catch (_) {}
  }
  return null;
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WackyTravel/1.0; +https://wackytravel.com)",
        "Accept": "text/html,application/xhtml+xml"
      }
    });
  } finally {
    clearTimeout(timer);
  }
}

async function resolveShareLink(startUrl) {
  let current = startUrl;

  for (let step = 0; step < MAX_REDIRECTS; step += 1) {
    const embedded = extractWebDestination(current);
    if (embedded) return embedded;

    if (!isRedirectHostAllowed(current.hostname)) {
      throw new Error("허용되지 않은 경유 주소입니다.");
    }

    const response = await fetchWithTimeout(current.toString());
    const location = response.headers.get("Location");

    if (location && response.status >= 300 && response.status < 400) {
      current = new URL(location, current);
      if (isAgodaHost(current.hostname) && !current.pathname.startsWith("/sp/")) {
        return current;
      }
      continue;
    }

    if (isAgodaHost(response.url ? new URL(response.url).hostname : "")) {
      const finalUrl = new URL(response.url);
      if (!finalUrl.pathname.startsWith("/sp/")) return finalUrl;
    }

    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("text/html")) {
      const html = (await response.text()).slice(0, 500000);
      const fromHtml = extractFromHtml(html);
      if (fromHtml) return fromHtml;
    }
    break;
  }

  throw new Error("호텔 페이지 주소를 확인하지 못했습니다.");
}

export async function onRequestPost({ request }) {
  try {
    const body = await request.json();
    const inputUrl = normalizeAgodaUrl(body?.url);

    if (!inputUrl.pathname.startsWith("/sp/")) {
      return json({ resolvedUrl: inputUrl.toString(), converted: false });
    }

    const resolved = await resolveShareLink(inputUrl);
    if (!isAgodaHost(resolved.hostname) || resolved.pathname.startsWith("/sp/")) {
      throw new Error("호텔 페이지 주소로 변환하지 못했습니다.");
    }

    const cleaned = cleanHotelUrl(resolved);
    return json({ resolvedUrl: cleaned.toString(), converted: true });
  } catch (error) {
    const message = error?.name === "AbortError"
      ? "링크 확인 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
      : (error?.message || "링크를 변환하지 못했습니다.");
    return json({ error: message }, 422);
  }
}

export function onRequestGet() {
  return json({ error: "POST 요청만 지원합니다." }, 405);
}
