const ALLOWED_LINK_TYPES = new Set(["normal", "affiliate"]);

export function normalizeContentLinkText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 500);
}

export function normalizeContentLinkUrl(value = "") {
  return String(value || "").trim().slice(0, 4000);
}

export function buildContentLinkKey(text = "", url = "") {
  return `${normalizeContentLinkUrl(url)}\n${normalizeContentLinkText(text)}`;
}

export function normalizeContentLinkSettings(value = []) {
  let source = value;
  if (typeof source === "string") {
    try { source = JSON.parse(source || "[]"); } catch (_) { source = []; }
  }
  if (!Array.isArray(source)) return [];

  const seen = new Set();
  const result = [];
  for (const item of source) {
    if (!item || typeof item !== "object") continue;
    const text = normalizeContentLinkText(item.text || item.label || "");
    const url = normalizeContentLinkUrl(item.url || item.href || "");
    const type = ALLOWED_LINK_TYPES.has(String(item.type || "").trim().toLowerCase())
      ? String(item.type).trim().toLowerCase()
      : "normal";
    if (!url || (!/^https?:\/\//i.test(url) && !url.startsWith("/"))) continue;
    const key = buildContentLinkKey(text, url);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ text, url, type });
    if (result.length >= 300) break;
  }
  return result;
}

export function getContentLinkType(settings = [], text = "", url = "") {
  const normalized = normalizeContentLinkSettings(settings);
  const key = buildContentLinkKey(text, url);
  const exact = normalized.find((item) => buildContentLinkKey(item.text, item.url) === key);
  if (exact) return exact.type;

  // 링크 텍스트만 수정된 기존 글도 URL 기준으로 설정을 최대한 유지한다.
  const normalizedUrl = normalizeContentLinkUrl(url);
  const byUrl = normalized.find((item) => item.url === normalizedUrl);
  return byUrl?.type || "normal";
}

export async function ensureContentLinkSettingsColumn(db) {
  try {
    await db.prepare(`ALTER TABLE posts ADD COLUMN content_link_settings_json TEXT DEFAULT '[]'`).run();
  } catch (error) {
    if (!/duplicate column name/i.test(String(error?.message || error || ""))) throw error;
  }
}

export function isMissingContentLinkSettingsColumnError(error) {
  return /no such column:\s*(?:posts\.)?content_link_settings_json/i.test(String(error?.message || error || ""));
}
