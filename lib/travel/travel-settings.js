export const DEFAULT_CONTENT_TYPES = [
  { slug: "top5_series", label: "여행 스타일별 호텔 추천", description: "여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠", sort_order: 1 },
  { slug: "hotel_intro", label: "호텔 하나씩 살펴보기", description: "호텔 하나를 차분히 살펴보는 소개 콘텐츠", sort_order: 2 },
  { slug: "travel_tip", label: "여행이 쉬워지는 작은 팁", description: "여행 준비와 이동에 도움이 되는 작은 팁", sort_order: 3 }
];

export const CONTENT_TYPE_DISPLAY_LABELS = Object.freeze({
  top5_series: "여행 스타일별 호텔 추천",
  hotel_intro: "호텔 하나씩 살펴보기",
  travel_tip: "여행이 쉬워지는 작은 팁"
});

export const CONTENT_TYPE_DISPLAY_DESCRIPTIONS = Object.freeze({
  top5_series: "여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠",
  hotel_intro: "호텔 하나를 차분히 살펴보는 소개 콘텐츠",
  travel_tip: "여행 준비와 이동에 도움이 되는 작은 팁"
});

export const CONTENT_TYPE_ALIASES = {
  guide: "travel_tip",
  checklist: "travel_tip",
  tip: "travel_tip",
  tips: "travel_tip",
  traveltip: "travel_tip",
  traveltips: "travel_tip",
  "travel-tip": "travel_tip",
  "travel tips": "travel_tip",
  "여행팁": "travel_tip",
  "여행 팁": "travel_tip",
  "여행 꿀팁": "travel_tip",
  "여행-tip": "travel_tip",
  "여행 tip": "travel_tip",
  "여행 tips": "travel_tip",
  "여행준비": "travel_tip",
  "여행 준비": "travel_tip",
  "여행이 쉬워지는 작은 팁": "travel_tip",
  hotel_roundup: "top5_series",
  hotel_review: "hotel_intro",
  "hotel-roundup": "top5_series",
  "hotel review": "hotel_intro",
  "top5": "top5_series",
  "top5-series": "top5_series",
  "top5 시리즈": "top5_series",
  "TOP5 시리즈": "top5_series",
  "TOP 5": "top5_series",
  "여행 스타일별 호텔 추천": "top5_series",
  "개별호텔소개": "hotel_intro",
  "개별 호텔 소개": "hotel_intro",
  "개별 호텔": "hotel_intro",
  "호텔 하나씩 살펴보기": "hotel_intro"
};

export const DEFAULT_COUNTRIES = [
  { slug: "vietnam", name: "베트남", sort_order: 1 },
  { slug: "japan", name: "일본", sort_order: 2 },
  { slug: "thailand", name: "태국", sort_order: 3 }
];

export const DEFAULT_RECOMMENDATION_CATEGORIES = [
  { slug: "with-who", name: "누구와 함께", description: "여행을 같이 가는 사람의 특성에 맞춰 완벽한 하루를 보낼 수 있는 숙소 추천", sort_order: 1 },
  { slug: "location", name: "어디에 위치", description: "동선 낭비 없이 여행 목적지나 주요 관광지와 접근성이 좋은 위치별 숙소 추천", sort_order: 2 },
  { slug: "value", name: "얼마나 가성비", description: "지출 대비 만족도를 극대화하는 알뜰 숙소부터 특별한 날을 위한 럭셔리 숙소 추천", sort_order: 3 },
  { slug: "staycation", name: "즐길거리 호텔", description: "호텔 밖으로 나가지 않아도 안에서 수영, 스파, 미식 등 모든 것을 해결하는 호캉스 숙소 추천", sort_order: 4 },
  { slug: "theme", name: "특별한 테마", description: "뻔한 인테리어를 벗어나 이국적인 무드나 트렌디한 감성을 느낄 수 있는 이색 숙소 추천", sort_order: 5 },
  { slug: "must-check", name: "필수 체크", description: "대가족, 취사, 반려동물 동반 등 특별한 조건과 제약 사항을 만족시키는 맞춤 숙소 추천", sort_order: 6 },
  { slug: "season-holiday", name: "시즌과 연휴", description: "날씨, 계절 변화, 명절 연휴 등 특정 시기에 방문했을 때 만족도가 극대화되는 숙소 추천", sort_order: 7 }
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
  const raw = normalizeText(value);
  if (!raw) return "travel_tip";
  const lower = raw.toLowerCase();
  const compact = lower.replace(/[\s_-]+/g, "");
  return CONTENT_TYPE_ALIASES[raw]
    || CONTENT_TYPE_ALIASES[lower]
    || CONTENT_TYPE_ALIASES[compact]
    || raw;
}

export function normalizeContentTypeDefinitions(items = DEFAULT_CONTENT_TYPES) {
  const seen = new Map();

  for (const item of items || []) {
    const slug = normalizeContentType(item?.slug || item?.value || item?.label);
    if (!slug) continue;

    const fallback = DEFAULT_CONTENT_TYPES.find((entry) => entry.slug === slug);
    const normalized = {
      ...item,
      slug,
      label: CONTENT_TYPE_DISPLAY_LABELS[slug] || normalizeText(item?.label || item?.name || fallback?.label || slug),
      description: CONTENT_TYPE_DISPLAY_DESCRIPTIONS[slug] || normalizeText(item?.description || fallback?.description || "")
    };

    if (!seen.has(slug)) {
      seen.set(slug, normalized);
      continue;
    }

    const current = seen.get(slug);
    seen.set(slug, {
      ...current,
      label: normalized.label || current.label,
      description: normalized.description || current.description,
      sort_order: Math.min(Number(current.sort_order ?? 9999), Number(normalized.sort_order ?? 9999)),
      is_active: Number(current.is_active ?? 1) || Number(normalized.is_active ?? 1) ? 1 : 0
    });
  }

  return [...seen.values()].sort((a, b) => {
    const orderA = Number(a.sort_order ?? 9999);
    const orderB = Number(b.sort_order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(a.label || a.slug).localeCompare(String(b.label || b.slug), "ko");
  });
}

export function labelContentType(value, contentTypes = DEFAULT_CONTENT_TYPES) {
  const slug = normalizeContentType(value);
  const normalizedTypes = normalizeContentTypeDefinitions(contentTypes);
  const found = normalizedTypes.find((item) => item.slug === slug);
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

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS regions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      country_slug TEXT DEFAULT '',
      destination_slug TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(destination_slug, slug)
    )
  `).run();

  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_regions_destination_sort ON regions(destination_slug, is_active, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_regions_country_destination ON regions(country_slug, destination_slug, sort_order ASC, name ASC)`).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS recommendation_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT DEFAULT '',
      country_slug TEXT DEFAULT '',
      destination_slug TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      UNIQUE(destination_slug, slug)
    )
  `).run();

  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_recommendation_categories_sort_order ON recommendation_categories(is_active, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_recommendation_categories_destination_sort ON recommendation_categories(destination_slug, is_active, sort_order ASC, name ASC)`).run();

  await safeRun(db, `ALTER TABLE posts ADD COLUMN region_slug TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE posts ADD COLUMN region_name TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_slug TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_name TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_description TEXT DEFAULT ''`);
  await safeRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_region_slug ON posts(region_slug)`);
  await safeRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_destination_region ON posts(destination_slug, region_slug)`);
  await safeRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_recommendation_category ON posts(recommendation_category_slug)`);
  await safeRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_destination_recommendation_category ON posts(destination_slug, recommendation_category_slug)`);
  await safeRun(db, `ALTER TABLE hotels ADD COLUMN region_slug TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE hotels ADD COLUMN region_name TEXT DEFAULT ''`);
  await safeRun(db, `CREATE INDEX IF NOT EXISTS idx_hotels_destination_region ON hotels(destination_slug, region_slug)`);

  await safeRun(db, `ALTER TABLE destinations ADD COLUMN is_active INTEGER DEFAULT 1`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN sort_order INTEGER DEFAULT 0`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN home_featured INTEGER DEFAULT 0`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN home_featured_order INTEGER DEFAULT 0`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN card_title TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN card_description TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN card_image TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN card_image_alt TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN hero_eyebrow TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN hero_title TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN hero_summary TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN hero_image TEXT DEFAULT ''`);
  await safeRun(db, `ALTER TABLE destinations ADD COLUMN hero_image_alt TEXT DEFAULT ''`);
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_country ON destinations(country, status, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_sort_order ON destinations(sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_country_sort ON destinations(country, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_home_featured ON destinations(home_featured, status, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_destinations_home_featured_country_order ON destinations(country, home_featured, home_featured_order ASC, sort_order ASC, name ASC)`).run();

  const now = new Date().toISOString();
  for (const item of DEFAULT_CONTENT_TYPES) {
    await db.prepare(`
      INSERT OR IGNORE INTO content_types (slug, label, description, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?)
    `).bind(item.slug, item.label, item.description, item.sort_order, now, now).run();
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

  await safeRun(db, `
    INSERT OR IGNORE INTO recommendation_categories (slug, name, description, country_slug, destination_slug, sort_order, is_active, created_at, updated_at)
    SELECT slug, name, description, '', '', MIN(COALESCE(sort_order, 0)), MAX(COALESCE(is_active, 1)), MIN(COALESCE(created_at, ?)), MAX(COALESCE(updated_at, ?))
    FROM recommendation_categories
    WHERE TRIM(COALESCE(destination_slug, '')) <> ''
    GROUP BY slug
  `, [now, now]);

  const recommendationCount = await db.prepare(`SELECT COUNT(*) AS count FROM recommendation_categories WHERE TRIM(COALESCE(destination_slug, '')) = ''`).first();
  if (Number(recommendationCount?.count || 0) === 0) {
    for (const item of DEFAULT_RECOMMENDATION_CATEGORIES) {
      await db.prepare(`
        INSERT OR IGNORE INTO recommendation_categories (slug, name, description, country_slug, destination_slug, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, '', '', ?, 1, ?, ?)
      `).bind(item.slug, item.name, item.description, item.sort_order || 0, now, now).run();
    }
  }
}

export async function getTravelSettings(db, { includeInactive = true } = {}) {
  await ensureTravelSettingsTables(db);
  const activeWhere = includeInactive ? "" : "WHERE is_active = 1";

  const [contentTypeRows, countryRows, destinationRows, regionRows, recommendationCategoryRows] = await Promise.all([
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
      SELECT slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
             card_title, card_description, card_image, card_image_alt,
             hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
             best_season, airport_info, transport_summary, status,
             COALESCE(is_active, CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS is_active,
             COALESCE(sort_order, 0) AS sort_order,
             COALESCE(home_featured, 0) AS home_featured,
             COALESCE(home_featured_order, 0) AS home_featured_order,
             updated_at
      FROM destinations
      ${includeInactive ? "" : "WHERE COALESCE(is_active, CASE WHEN status = 'published' THEN 1 ELSE 0 END) = 1 AND status = 'published'"}
      ORDER BY country COLLATE NOCASE ASC, home_featured_order ASC, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 500
    `).all(),
    db.prepare(`
      SELECT id, slug, name, country_slug, destination_slug, sort_order, is_active, updated_at
      FROM regions
      ${includeInactive ? "" : "WHERE is_active = 1"}
      ORDER BY destination_slug COLLATE NOCASE ASC, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 1000
    `).all(),
    db.prepare(`
      SELECT id, slug, name, description, country_slug, destination_slug, sort_order, is_active, updated_at
      FROM recommendation_categories
      ${includeInactive ? "" : "WHERE is_active = 1"}
      ORDER BY CASE WHEN TRIM(COALESCE(destination_slug, '')) = '' THEN 0 ELSE 1 END, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 1000
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

  const destinationBySlug = new Map(destinations.map((destination) => [String(destination.slug || ""), destination]));
  const regions = (regionRows.results || []).map((region) => {
    const destination = destinationBySlug.get(String(region.destination_slug || ""));
    return {
      ...region,
      country_slug: region.country_slug || destination?.country_slug || "",
      country_name: countryBySlug.get(region.country_slug || destination?.country_slug || "")?.name || destination?.country_name || "",
      destination_name: destination?.name || destination?.city || region.destination_slug || ""
    };
  });

  const recommendationCategoryMap = new Map();
  for (const category of (recommendationCategoryRows.results || [])) {
    const slug = String(category.slug || "").trim();
    if (!slug) continue;
    const normalized = {
      ...category,
      country_slug: "",
      country_name: "",
      destination_slug: "",
      destination_name: ""
    };
    const current = recommendationCategoryMap.get(slug);
    if (!current || !String(category.destination_slug || "").trim()) {
      recommendationCategoryMap.set(slug, normalized);
    }
  }
  const recommendationCategories = [...recommendationCategoryMap.values()].sort((a, b) => {
    const orderA = Number(a.sort_order ?? 9999);
    const orderB = Number(b.sort_order ?? 9999);
    if (orderA !== orderB) return orderA - orderB;
    return String(a.name || a.slug || "").localeCompare(String(b.name || b.slug || ""), "ko");
  });

  return {
    content_types: normalizeContentTypeDefinitions(contentTypeRows.results?.length ? contentTypeRows.results : DEFAULT_CONTENT_TYPES),
    countries,
    destinations,
    regions,
    recommendation_categories: recommendationCategories
  };
}

export async function getActiveContentTypes(db) {
  const settings = await getTravelSettings(db, { includeInactive: false });
  return normalizeContentTypeDefinitions(settings.content_types.length ? settings.content_types : DEFAULT_CONTENT_TYPES);
}
