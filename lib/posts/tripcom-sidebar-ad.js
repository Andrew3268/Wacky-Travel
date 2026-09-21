function text(value = "") {
  return String(value ?? "").trim();
}

function decodeHtmlAttribute(value = "") {
  return String(value || "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

export function extractTripcomSidebarAdUrl(value = "") {
  const raw = text(value);
  if (!raw) return "";
  const iframeSrc = raw.match(/<iframe\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1/i)?.[2];
  return decodeHtmlAttribute(iframeSrc || raw).trim();
}

export function normalizeTripcomSidebarAd(value = "") {
  const candidate = extractTripcomSidebarAdUrl(value);
  if (!candidate) return { ok: true, url: "", error: "" };

  let parsed;
  try {
    parsed = new URL(candidate);
  } catch (_) {
    return { ok: false, url: "", error: "트립닷컴 iframe 코드 또는 올바른 제휴 URL을 입력해 주세요." };
  }

  const protocol = String(parsed.protocol || "").toLowerCase();
  const hostname = String(parsed.hostname || "").toLowerCase();
  if (protocol !== "https:" || hostname !== "kr.trip.com" || !parsed.pathname.startsWith("/partners/ad/")) {
    return { ok: false, url: "", error: "kr.trip.com/partners/ad/ 형식의 트립닷컴 제휴 iframe만 사용할 수 있습니다." };
  }
  if (parsed.username || parsed.password) {
    return { ok: false, url: "", error: "사용자 정보가 포함된 URL은 사용할 수 없습니다." };
  }

  parsed.hash = "";
  return { ok: true, url: parsed.toString(), error: "" };
}

export function renderTripcomSidebarIframe(value = "") {
  const normalized = normalizeTripcomSidebarAd(value);
  if (!normalized.ok || !normalized.url) return "";
  const safeUrl = normalized.url
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<div class="hrj-tripcom-widget"><iframe class="hrj-tripcom-widget__iframe" border="0" src="${safeUrl}" width="320" height="320" frameborder="0" scrolling="no" loading="lazy" title="트립닷컴 호텔 예약 제휴 위젯"></iframe></div>`;
}
