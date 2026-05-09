export const DEFAULT_CONTENT_TYPES = [
  { slug: "top5_series", label: "TOP5 시리즈", description: "목적별·조건별 추천 리스트 콘텐츠", sort_order: 1 },
  { slug: "hotel_intro", label: "개별 호텔 소개", description: "특정 호텔의 장점과 확인 포인트 콘텐츠", sort_order: 2 },
  { slug: "travel_tip", label: "여행 tip", description: "예약 전후로 확인하면 좋은 여행 정보", sort_order: 3 }
];

export const CONTENT_TYPE_ALIASES = {
  guide: "travel_tip",
  checklist: "travel_tip",
  hotel_roundup: "top5_series",
  hotel_review: "hotel_intro"
};

export const DEFAULT_COUNTRIES = [
  { slug: "vietnam", name: "베트남", sort_order: 1 },
  { slug: "japan", name: "일본", sort_order: 2 },
  { slug: "thailand", name: "태국", sort_order: 3 }
];

export function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

export function slugifySetting(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function countryToSlug(value) {
  const raw = normalizeText(value);
  if (!raw) return "";
  const alias = { 베트남: "vietnam", 일본: "japan", 태국: "thailand", 한국: "korea", 대한민국: "korea" }[raw];
  if (alias) return alias;
  return slugifySetting(raw);
}

export function normalizeContentType(value) {
  const raw = String(value || "").trim();
  return CONTENT_TYPE_ALIASES[raw] || raw || "travel_tip";
}

export function labelContentType(value, contentTypes = DEFAULT_CONTENT_TYPES) {
  const slug = normalizeContentType(value);
  const found = contentTypes.find((item) => String(item.slug || "") === slug);
  return found?.label || DEFAULT_CONTENT_TYPES.find((item) => item.slug === slug)?.label || slug;
}

async function safeRun(db, sql, binds = []) {
  try {
    const statement = db.prepare(sql);
    return binds.length ? await statement.bind(...binds).run() : await statement.run();
  } catch (error) {
    if (!String(error?.message || "").toLowerCase().includes("duplicate column")) throw error;
    return null;
  }
}

export async function ensureTravelSettingsTables(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS content_types (
      slug TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      description TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_content_types_sort_order ON content_types(sort_order ASC, label ASC)`).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS countries (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();

  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_countries_sort_order ON countries(sort_order ASC, name ASC)`).run();

  await safeRun(db, `ALTER TABLE destinations ADD COLUMN is_active INTEGER DEFAULT 1`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN sort_order INTEGER DEFAULT 0`);
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country, status, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_sort_order ON destinations(sort_order ASC, name ASC)`).run();

  const now = new Date().toISOString();
  const contentTypeCount = await db.prepare(`SELECT COUNT(*) AS count FROM content_types`).first();
  if (Number(contentTypeCount?.count || 0) === 0) {
    for (const item of DEFAULT_CONTENT_TYPES) {
      await db.prepare(`
        INSERT OR IGNORE INTO content_types (slug, label, description, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, 1, ?, ?)
      `).bind(item.slug, item.label, item.description, item.sort_order, now, now).run();
    }
  }

  const countryCount = await db.prepare(`SELECT COUNT(*) AS count FROM countries`).first();
  if (Number(countryCount?.count || 0) === 0) {
    const destinationCountries = await db.prepare(`
      SELECT DISTINCT TRIM(COALESCE(country, '')) AS name
      FROM destinations
      WHERE TRIM(COALESCE(country, '')) <> ''
      ORDER BY name COLLATE NOCASE ASC
      LIMIT 100
    `).all();
    const fromDestinations = (destinationCountries.results || []).map((row, index) => ({ slug: countryToSlug(row.name), name: row.name, sort_order: index + 1 }));
    const seedCountries = fromDestinations.length ? fromDestinations : DEFAULT_COUNTRIES;
    for (const item of seedCountries) {
      if (!item.slug || !item.name) continue;
      await db.prepare(`
        INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, 1, ?, ?)
      `).bind(item.slug, item.name, item.sort_order || 0, now, now).run();
    }
  }
}

export async function getTravelSettings(db, { includeInactive = true } = {}) {
  await ensureTravelSettingsTables(db);
  const activeWhere = includeInactive ? "" : "WHERE is_active = 1";

  const [contentTypeRows, countryRows, destinationRows] = await Promise.all([
    db.prepare(`
      SELECT slug, label, description, sort_order, is_active, updated_at
      FROM content_types
      ${activeWhere}
      ORDER BY sort_order ASC, label COLLATE NOCASE ASC
    `).all(),
    db.prepare(`
      SELECT slug, name, sort_order, is_active, updated_at
      FROM countries
      ${activeWhere}
      ORDER BY sort_order ASC, name COLLATE NOCASE ASC
    `).all(),
    db.prepare(`
      SELECT slug, name, country, city, title, summary, cover_image, cover_image_alt, status,
             COALESCE(is_active, CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS is_active,
             COALESCE(sort_order, 0) AS sort_order,
             updated_at
      FROM destinations
      ${includeInactive ? "" : "WHERE COALESCE(is_active, CASE WHEN status = 'published' THEN 1 ELSE 0 END) = 1 AND status = 'published'"}
      ORDER BY country COLLATE NOCASE ASC, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 500
    `).all()
  ]);

  const countries = countryRows.results || [];
  const countryByName = new Map(countries.map((country) => [normalizeText(country.name), country]));
  const countryBySlug = new Map(countries.map((country) => [String(country.slug || ""), country]));

  const destinations = (destinationRows.results || []).map((destination) => {
    const name = normalizeText(destination.country);
    const slug = countryByName.get(name)?.slug || countryToSlug(name);
    return {
      ...destination,
      country_slug: slug,
      country_name: countryBySlug.get(slug)?.name || name
    };
  });

  return {
    content_types: contentTypeRows.results || [],
    countries,
    destinations
  };
}

export async function getActiveContentTypes(db) {
  const settings = await getTravelSettings(db, { includeInactive: false });
  return settings.content_types.length ? settings.content_types : DEFAULT_CONTENT_TYPES;
}
