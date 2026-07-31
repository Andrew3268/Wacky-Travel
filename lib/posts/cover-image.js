const AGODA_LINK_HOSTS = new Set(["agoda.com", "www.agoda.com"]);

function normalizeHttpsUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const normalized = raw.startsWith("//") ? `https:${raw}` : raw;
  try {
    const url = new URL(normalized);
    if (!/^https?:$/.test(url.protocol)) return "";
    url.protocol = "https:";
    return url.toString();
  } catch {
    return "";
  }
}

function isAgodaLinkUrl(value = "") {
  const normalized = normalizeHttpsUrl(value);
  if (!normalized) return false;
  try {
    const url = new URL(normalized);
    return AGODA_LINK_HOSTS.has(url.hostname.toLowerCase()) && url.pathname.toLowerCase().includes("/partners/partnersearch.aspx");
  } catch {
    return false;
  }
}

function isAgodaImageUrl(value = "") {
  const normalized = normalizeHttpsUrl(value);
  if (!normalized) return false;
  try {
    const url = new URL(normalized);
    const host = url.hostname.toLowerCase();
    return host === "agoda.net" || host.endsWith(".agoda.net");
  } catch {
    return false;
  }
}

export function normalizeCoverImageSource(value = "") {
  return String(value || "").trim().toLowerCase() === "agoda" ? "agoda" : "r2";
}

function normalizeR2ImageUrl(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return normalizeHttpsUrl(raw);
}

export function normalizeCoverImageSrcset(value = "") {
  const entries = String(value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const parts = entry.split(/\s+/).filter(Boolean);
      const url = normalizeHttpsUrl(parts.shift() || "");
      const descriptor = String(parts.shift() || "").trim();
      if (!isAgodaImageUrl(url)) return "";
      if (descriptor && !/^(?:\d+(?:\.\d+)?x|\d+w)$/i.test(descriptor)) return "";
      return descriptor ? `${url} ${descriptor}` : url;
    })
    .filter(Boolean);
  return [...new Set(entries)].join(", ");
}

export function normalizeCoverImagePayload(body = {}) {
  const source = normalizeCoverImageSource(body.cover_image_source);
  const image = source === "agoda" ? normalizeHttpsUrl(body.cover_image) : normalizeR2ImageUrl(body.cover_image);
  const alt = String(body.cover_image_alt || "").replace(/\s+/g, " ").trim().slice(0, 240);

  if (source !== "agoda") {
    return {
      ok: true,
      source: "r2",
      image,
      alt,
      link: "",
      srcset: ""
    };
  }

  const link = normalizeHttpsUrl(body.cover_image_link_url);
  const srcset = normalizeCoverImageSrcset(body.cover_image_srcset);
  if (!isAgodaImageUrl(image)) {
    return { ok: false, message: "아고다 대표 이미지 주소를 확인해 주세요." };
  }
  if (!isAgodaLinkUrl(link)) {
    return { ok: false, message: "아고다 파트너스 이동 링크를 확인해 주세요." };
  }

  return {
    ok: true,
    source: "agoda",
    image,
    alt,
    link,
    srcset
  };
}

export function getLargestSrcsetUrl(srcset = "", fallback = "") {
  const candidates = String(srcset || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const parts = entry.split(/\s+/).filter(Boolean);
      const url = normalizeHttpsUrl(parts.shift() || "");
      const descriptor = String(parts.shift() || "").trim();
      let score = 0;
      if (/x$/i.test(descriptor)) score = (Number.parseFloat(descriptor) || 0) * 10000;
      else if (/w$/i.test(descriptor)) score = Number.parseInt(descriptor, 10) || 0;
      return { url, score };
    })
    .filter((item) => item.url)
    .sort((a, b) => b.score - a.score);
  return candidates[0]?.url || normalizeHttpsUrl(fallback) || String(fallback || "").trim();
}

export function isMissingCoverImageColumnError(error) {
  return /no such column:\s*(?:posts\.)?(?:cover_image_source|cover_image_link_url|cover_image_srcset)/i.test(String(error?.message || error || ""));
}

let coverImageColumnsPromise = null;

export async function ensureCoverImageColumns(db) {
  if (coverImageColumnsPromise) return coverImageColumnsPromise;
  coverImageColumnsPromise = (async () => {
    const info = await db.prepare(`PRAGMA table_info(posts)`).all();
    const existing = new Set((info?.results || []).map((row) => String(row.name || "").trim()).filter(Boolean));
    const columns = [
      ["cover_image_source", `ALTER TABLE posts ADD COLUMN cover_image_source TEXT DEFAULT 'r2'`],
      ["cover_image_link_url", `ALTER TABLE posts ADD COLUMN cover_image_link_url TEXT DEFAULT ''`],
      ["cover_image_srcset", `ALTER TABLE posts ADD COLUMN cover_image_srcset TEXT DEFAULT ''`]
    ];
    for (const [name, sql] of columns) {
      if (existing.has(name)) continue;
      try {
        await db.prepare(sql).run();
      } catch (error) {
        if (!/duplicate column name/i.test(String(error?.message || error || ""))) throw error;
      }
    }
  })().catch((error) => {
    coverImageColumnsPromise = null;
    throw error;
  });
  return coverImageColumnsPromise;
}
