export const DEFAULT_CONTENT_TYPES = [
  { slug: "top5_series", label: "여행 스타일별 호텔 추천", description: "여행 스타일에 맞춰 호텔을 비교해볼 수 있는 추천 콘텐츠", sort_order: 1 },
  { slug: "hotel_intro", label: "추천 호텔 리뷰", description: "호텔 하나를 차분히 살펴보는 소개 콘텐츠", sort_order: 2 },
  { slug: "travel_tip", label: "여행 꿀팁", description: "여행 준비와 이동에 도움이 되는 작은 팁", sort_order: 3 }
];

export const CONTENT_TYPE_DISPLAY_LABELS = Object.freeze({
  top5_series: "여행 스타일별 호텔 추천",
  hotel_intro: "추천 호텔 리뷰",
  travel_tip: "여행 꿀팁"
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
  hotel_recommendation: "top5_series",
  hotelrecommendation: "top5_series",
  hotel_pick: "top5_series",
  hotel_picks: "top5_series",
  hotel_review: "hotel_intro",
  hotel_reviews: "hotel_intro",
  hotelintro: "hotel_intro",
  "hotel-roundup": "top5_series",
  "hotel-recommendation": "top5_series",
  "hotel recommendations": "top5_series",
  "hotel picks": "top5_series",
  "hotel-picks": "top5_series",
  "hotel review": "hotel_intro",
  "hotel reviews": "hotel_intro",
  "hotel-review": "hotel_intro",
  "top5": "top5_series",
  "top5-series": "top5_series",
  "top5 시리즈": "top5_series",
  "TOP5 시리즈": "top5_series",
  "TOP 5": "top5_series",
  "여행 스타일별 호텔 추천": "top5_series",
  "호텔 추천": "top5_series",
  "호텔추천": "top5_series",
  "추천 호텔": "top5_series",
  "추천호텔": "top5_series",
  "숙소 추천": "top5_series",
  "숙소추천": "top5_series",
  "TOP5 호텔 추천": "top5_series",
  "TOP 5 호텔 추천": "top5_series",
  "개별호텔소개": "hotel_intro",
  "개별 호텔 소개": "hotel_intro",
  "개별 호텔": "hotel_intro",
  "추천 호텔 리뷰": "hotel_intro",
  "호텔 리뷰": "hotel_intro",
  "호텔리뷰": "hotel_intro",
  "호텔 후기": "hotel_intro",
  "호텔후기": "hotel_intro"
};

export const DEFAULT_COUNTRIES = [
  { slug: "japan", name: "일본", sort_order: 1 },
  { slug: "vietnam", name: "베트남", sort_order: 2 },
  { slug: "thailand", name: "태국", sort_order: 3 },
  { slug: "philippines", name: "필리핀", sort_order: 4 },
  { slug: "taiwan", name: "대만", sort_order: 5 }
];

export const DEFAULT_DESTINATIONS = [
  { slug: "osaka", name: "오사카", city: "오사카", country_slug: "japan", sort_order: 1 },
  { slug: "tokyo", name: "도쿄", city: "도쿄", country_slug: "japan", sort_order: 2 },
  { slug: "fukuoka", name: "후쿠오카", city: "후쿠오카", country_slug: "japan", sort_order: 3 },
  { slug: "sapporo", name: "삿포로", city: "삿포로", country_slug: "japan", sort_order: 4 },
  { slug: "okinawa", name: "오키나와", city: "오키나와", country_slug: "japan", sort_order: 5 },

  { slug: "da-nang", name: "다낭", city: "다낭", country_slug: "vietnam", sort_order: 1 },
  { slug: "nha-trang", name: "나트랑", city: "나트랑", country_slug: "vietnam", sort_order: 2 },
  { slug: "ho-chi-minh-city", name: "호치민", city: "호치민", country_slug: "vietnam", sort_order: 3 },
  { slug: "hanoi", name: "하노이", city: "하노이", country_slug: "vietnam", sort_order: 4 },
  { slug: "phu-quoc", name: "푸꾸옥", city: "푸꾸옥", country_slug: "vietnam", sort_order: 5 },



  { slug: "taipei", name: "타이베이", city: "타이베이", country_slug: "taiwan", sort_order: 1 },
  { slug: "taichung", name: "타이중", city: "타이중", country_slug: "taiwan", sort_order: 2 },
  { slug: "tainan", name: "타이난", city: "타이난", country_slug: "taiwan", sort_order: 3 },
  { slug: "kaohsiung", name: "가오슝", city: "가오슝", country_slug: "taiwan", sort_order: 4 },
  { slug: "hualien", name: "화렌", city: "화렌", country_slug: "taiwan", sort_order: 5 }
];

export const DEFAULT_RECOMMENDATION_CATEGORIES = [
  { slug: "with-who", name: "함께 가기 좋은 호텔", description: "가족, 커플, 친구 등 함께 떠나는 사람에 맞춰 고르기 좋은 호텔 추천", sort_order: 1 },
  { slug: "location", name: "위치 좋은 호텔", description: "역, 관광지, 쇼핑 지역 등 여행 동선을 편하게 만드는 위치 좋은 호텔 추천", sort_order: 2 },
  { slug: "value", name: "가성비 호텔", description: "가격 부담은 줄이고 숙박 만족도는 챙길 수 있는 가성비 호텔 추천", sort_order: 3 },
  { slug: "staycation", name: "호캉스하기 좋은 호텔", description: "수영장, 스파, 다이닝 등 호텔 안에서 충분히 즐길 수 있는 호캉스 추천", sort_order: 4 },
  { slug: "theme", name: "특별한 테마가 있는 호텔", description: "오션뷰, 독특한 디자인, 이색적인 분위기처럼 분명한 테마가 있는 호텔 추천", sort_order: 5 },
  { slug: "season-holiday", name: "지금 가기 좋은 호텔", description: "계절, 날씨, 축제와 연휴 일정에 맞춰 지금 방문하기 좋은 호텔 추천", sort_order: 6 }
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
  const alias = { 베트남: "vietnam", 일본: "japan", 태국: "thailand", 필리핀: "philippines", 대만: "taiwan", 한국: "korea", 대한민국: "korea" }[raw];
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

async function tableExists(db, tableName) {
  const row = await db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table' AND name = ?
    LIMIT 1
  `).bind(tableName).first();
  return Boolean(row?.name);
}

async function getTableColumns(db, tableName) {
  if (!(await tableExists(db, tableName))) return new Set();
  const rows = await db.prepare(`PRAGMA table_info(${tableName})`).all();
  return new Set((rows.results || []).map((row) => String(row.name || "")));
}

async function ensureTableColumns(db, tableName, definitions = {}) {
  const columns = await getTableColumns(db, tableName);
  if (!columns.size) return;
  for (const [columnName, definition] of Object.entries(definitions)) {
    if (columns.has(columnName)) continue;
    await db.prepare(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`).run();
    columns.add(columnName);
  }
}

async function safeOptionalRun(db, sql, binds = []) {
  try {
    const statement = db.prepare(sql);
    return binds.length ? await statement.bind(...binds).run() : await statement.run();
  } catch (error) {
    const message = String(error?.message || "").toLowerCase();
    if (
      message.includes("duplicate column")
      || message.includes("already exists")
      || message.includes("no such table")
      || message.includes("no such column")
    ) return null;
    throw error;
  }
}

async function hasSeedRun(db, seedKey) {
  const row = await db.prepare(`SELECT seed_key FROM travel_seed_runs WHERE seed_key = ?`).bind(seedKey).first();
  return Boolean(row?.seed_key);
}

async function markSeedRun(db, seedKey, appliedAt) {
  await db.prepare(`
    INSERT OR IGNORE INTO travel_seed_runs (seed_key, applied_at)
    VALUES (?, ?)
  `).bind(seedKey, appliedAt).run();
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

  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_content_types_sort_order ON content_types(sort_order ASC, label ASC)`);

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

  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_countries_sort_order ON countries(sort_order ASC, name ASC)`);

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS destinations (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT DEFAULT '',
      city TEXT DEFAULT '',
      title TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      summary TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      cover_image_alt TEXT DEFAULT '',
      card_title TEXT DEFAULT '',
      card_description TEXT DEFAULT '',
      card_image TEXT DEFAULT '',
      card_image_alt TEXT DEFAULT '',
      hero_eyebrow TEXT DEFAULT '',
      hero_title TEXT DEFAULT '',
      hero_summary TEXT DEFAULT '',
      hero_image TEXT DEFAULT '',
      hero_image_alt TEXT DEFAULT '',
      best_season TEXT DEFAULT '',
      airport_info TEXT DEFAULT '',
      transport_summary TEXT DEFAULT '',
      status TEXT DEFAULT 'published',
      is_active INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      home_featured INTEGER DEFAULT 0,
      home_featured_order INTEGER DEFAULT 0,
      published_at TEXT DEFAULT '',
      updated_at TEXT DEFAULT ''
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS travel_seed_runs (
      seed_key TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    )
  `).run();

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

  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_regions_destination_sort ON regions(destination_slug, is_active, sort_order ASC, name ASC)`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_regions_country_destination ON regions(country_slug, destination_slug, sort_order ASC, name ASC)`);

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

  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_recommendation_categories_sort_order ON recommendation_categories(is_active, sort_order ASC, name ASC)`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_recommendation_categories_destination_sort ON recommendation_categories(destination_slug, is_active, sort_order ASC, name ASC)`);

  // Existing D1 tables are not changed by CREATE TABLE IF NOT EXISTS. Add any
  // columns introduced by later deployments before the read query runs.
  await ensureTableColumns(db, "content_types", {
    description: "TEXT DEFAULT ''",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "INTEGER DEFAULT 1",
    created_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  });
  await ensureTableColumns(db, "countries", {
    sort_order: "INTEGER DEFAULT 0",
    is_active: "INTEGER DEFAULT 1",
    created_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  });
  await ensureTableColumns(db, "destinations", {
    country: "TEXT DEFAULT ''",
    city: "TEXT DEFAULT ''",
    title: "TEXT DEFAULT ''",
    meta_description: "TEXT DEFAULT ''",
    summary: "TEXT DEFAULT ''",
    cover_image: "TEXT DEFAULT ''",
    cover_image_alt: "TEXT DEFAULT ''",
    card_title: "TEXT DEFAULT ''",
    card_description: "TEXT DEFAULT ''",
    card_image: "TEXT DEFAULT ''",
    card_image_alt: "TEXT DEFAULT ''",
    hero_eyebrow: "TEXT DEFAULT ''",
    hero_title: "TEXT DEFAULT ''",
    hero_summary: "TEXT DEFAULT ''",
    hero_image: "TEXT DEFAULT ''",
    hero_image_alt: "TEXT DEFAULT ''",
    best_season: "TEXT DEFAULT ''",
    airport_info: "TEXT DEFAULT ''",
    transport_summary: "TEXT DEFAULT ''",
    status: "TEXT DEFAULT 'published'",
    is_active: "INTEGER DEFAULT 1",
    sort_order: "INTEGER DEFAULT 0",
    home_featured: "INTEGER DEFAULT 0",
    home_featured_order: "INTEGER DEFAULT 0",
    published_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  });
  await ensureTableColumns(db, "regions", {
    country_slug: "TEXT DEFAULT ''",
    destination_slug: "TEXT DEFAULT ''",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "INTEGER DEFAULT 1",
    created_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  });
  await ensureTableColumns(db, "recommendation_categories", {
    description: "TEXT DEFAULT ''",
    country_slug: "TEXT DEFAULT ''",
    destination_slug: "TEXT DEFAULT ''",
    sort_order: "INTEGER DEFAULT 0",
    is_active: "INTEGER DEFAULT 1",
    created_at: "TEXT DEFAULT ''",
    updated_at: "TEXT DEFAULT ''"
  });

  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_content_types_sort_order ON content_types(sort_order ASC, label ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_countries_sort_order ON countries(sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_regions_destination_sort ON regions(destination_slug, is_active, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_regions_country_destination ON regions(country_slug, destination_slug, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_recommendation_categories_sort_order ON recommendation_categories(is_active, sort_order ASC, name ASC)`).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS idx_recommendation_categories_destination_sort ON recommendation_categories(destination_slug, is_active, sort_order ASC, name ASC)`).run();

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

  const countryCitySeedKey = "countries-cities-20260613-v1";
  const shouldRunCountryCitySeed = !(await hasSeedRun(db, countryCitySeedKey));
  const countryCount = await db.prepare(`SELECT COUNT(*) AS count FROM countries`).first();
  if (Number(countryCount?.count || 0) === 0 && shouldRunCountryCitySeed) {
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

  if (shouldRunCountryCitySeed) {
    const countryNameBySlug = new Map(DEFAULT_COUNTRIES.map((country) => [country.slug, country.name]));

    for (const item of DEFAULT_COUNTRIES) {
      if (!item.slug || !item.name) continue;
      await db.prepare(`
        INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
        VALUES (?, ?, ?, 1, ?, ?)
      `).bind(item.slug, item.name, item.sort_order || 0, now, now).run();
    }

    for (const item of DEFAULT_DESTINATIONS) {
      const countryName = countryNameBySlug.get(item.country_slug) || item.country_slug || "";
      if (!item.slug || !item.name || !countryName) continue;
      const title = `${item.name} 여행 가이드`;
      const summary = `${item.name} 여행을 준비할 때 필요한 숙소 위치, 이동 동선, 추천 호텔 콘텐츠를 연결하기 위한 기본 도시입니다.`;
      const metaDescription = `${countryName} ${item.name} 여행과 숙소 정보를 한눈에 정리한 비스테이어블 기본 도시 항목입니다.`;
      const cardDescription = `${countryName} ${item.name} 여행 콘텐츠를 모아볼 수 있는 도시 항목입니다.`;

      await db.prepare(`
        INSERT OR IGNORE INTO destinations (
          slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
          card_title, card_description, card_image, card_image_alt,
          hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
          best_season, airport_info, transport_summary, status, is_active, sort_order, home_featured, home_featured_order, published_at, updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, '', '', ?, ?, '', '', ?, ?, ?, '', '', '', '', '', 'published', 1, ?, 0, 0, ?, ?)
      `).bind(
        item.slug,
        item.name,
        countryName,
        item.city || item.name,
        title,
        metaDescription,
        summary,
        item.name,
        cardDescription,
        countryName,
        title,
        summary,
        item.sort_order || 0,
        now,
        now
      ).run();
    }

    await markSeedRun(db, countryCitySeedKey, now);
  }

  const defaultCountryNameBySlug = new Map(DEFAULT_COUNTRIES.map((country) => [country.slug, country.name]));

  for (const item of DEFAULT_COUNTRIES) {
    if (!item.slug || !item.name) continue;
    await db.prepare(`
      INSERT OR IGNORE INTO countries (slug, name, sort_order, is_active, created_at, updated_at)
      VALUES (?, ?, ?, 1, ?, ?)
    `).bind(item.slug, item.name, item.sort_order || 0, now, now).run();
  }

  for (const item of DEFAULT_DESTINATIONS) {
    const countryName = defaultCountryNameBySlug.get(item.country_slug) || item.country_slug || "";
    if (!item.slug || !item.name || !countryName) continue;
    const title = `${item.name} 여행 가이드`;
    const summary = `${item.name} 여행을 준비할 때 필요한 숙소 위치, 이동 동선, 추천 호텔 콘텐츠를 연결하기 위한 기본 도시입니다.`;
    const metaDescription = `${countryName} ${item.name} 여행과 숙소 정보를 한눈에 정리한 비스테이어블 기본 도시 항목입니다.`;
    const cardDescription = `${countryName} ${item.name} 여행 콘텐츠를 모아볼 수 있는 도시 항목입니다.`;

    await db.prepare(`
      INSERT OR IGNORE INTO destinations (
        slug, name, country, city, title, meta_description, summary, cover_image, cover_image_alt,
        card_title, card_description, card_image, card_image_alt,
        hero_eyebrow, hero_title, hero_summary, hero_image, hero_image_alt,
        best_season, airport_info, transport_summary, status, is_active, sort_order, home_featured, home_featured_order, published_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, '', '', ?, ?, '', '', ?, ?, ?, '', '', '', '', '', 'published', 1, ?, 0, 0, ?, ?)
    `).bind(
      item.slug,
      item.name,
      countryName,
      item.city || item.name,
      title,
      metaDescription,
      summary,
      item.name,
      cardDescription,
      countryName,
      title,
      summary,
      item.sort_order || 0,
      now,
      now
    ).run();
  }

  await safeRun(db, `
    UPDATE destinations
    SET name = '호치민',
        city = '호치민',
        status = 'published',
        is_active = 1,
        updated_at = ?
    WHERE slug = 'ho-chi-minh-city'
      AND (
        TRIM(COALESCE(name, '')) IN ('호찌민', '호찌민시')
        OR TRIM(COALESCE(city, '')) IN ('호찌민', '호찌민시')
        OR TRIM(COALESCE(status, '')) <> 'published'
        OR COALESCE(is_active, 1) <> 1
      )
  `, [now]);

  await safeRun(db, `
    INSERT OR IGNORE INTO recommendation_categories (slug, name, description, country_slug, destination_slug, sort_order, is_active, created_at, updated_at)
    SELECT slug, name, description, '', '', MIN(COALESCE(sort_order, 0)), MAX(COALESCE(is_active, 1)), MIN(COALESCE(created_at, ?)), MAX(COALESCE(updated_at, ?))
    FROM recommendation_categories
    WHERE TRIM(COALESCE(destination_slug, '')) <> ''
    GROUP BY slug
  `, [now, now]);

  const categoryUpdates = [
    ["with-who", "함께 가기 좋은 호텔", "가족, 커플, 친구 등 함께 떠나는 사람에 맞춰 고르기 좋은 호텔 추천", 1],
    ["location", "위치 좋은 호텔", "역, 관광지, 쇼핑 지역 등 여행 동선을 편하게 만드는 위치 좋은 호텔 추천", 2],
    ["value", "가성비 호텔", "가격 부담은 줄이고 숙박 만족도는 챙길 수 있는 가성비 호텔 추천", 3],
    ["staycation", "호캉스하기 좋은 호텔", "수영장, 스파, 다이닝 등 호텔 안에서 충분히 즐길 수 있는 호캉스 추천", 4],
    ["theme", "특별한 테마가 있는 호텔", "오션뷰, 독특한 디자인, 이색적인 분위기처럼 분명한 테마가 있는 호텔 추천", 5],
    ["season-holiday", "지금 가기 좋은 호텔", "계절, 날씨, 축제와 연휴 일정에 맞춰 지금 방문하기 좋은 호텔 추천", 6],
  ];
  for (const [slug, name, description, sortOrder] of categoryUpdates) {
    await safeRun(db, `
      UPDATE recommendation_categories
      SET name = ?, description = ?, sort_order = ?, is_active = 1, updated_at = ?
      WHERE TRIM(COALESCE(destination_slug, '')) = '' AND slug = ?
    `, [name, description, sortOrder, now, slug]);
  }
  await safeRun(db, `DELETE FROM recommendation_categories WHERE slug = 'must-check'`);

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

export async function ensureTravelContentRelationColumns(db) {
  // These tables are not required to display admin settings. Keep their
  // migrations separate so a missing/older content table cannot blank the
  // /admin/items and post authoring screens.
  await safeOptionalRun(db, `ALTER TABLE posts ADD COLUMN region_slug TEXT DEFAULT ''`);
  await safeOptionalRun(db, `ALTER TABLE posts ADD COLUMN region_name TEXT DEFAULT ''`);
  await safeOptionalRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_slug TEXT DEFAULT ''`);
  await safeOptionalRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_name TEXT DEFAULT ''`);
  await safeOptionalRun(db, `ALTER TABLE posts ADD COLUMN recommendation_category_description TEXT DEFAULT ''`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_region_slug ON posts(region_slug)`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_destination_region ON posts(destination_slug, region_slug)`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_recommendation_category ON posts(recommendation_category_slug)`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_posts_destination_recommendation_category ON posts(destination_slug, recommendation_category_slug)`);
  await safeOptionalRun(db, `ALTER TABLE hotels ADD COLUMN region_slug TEXT DEFAULT ''`);
  await safeOptionalRun(db, `ALTER TABLE hotels ADD COLUMN region_name TEXT DEFAULT ''`);
  await safeOptionalRun(db, `CREATE INDEX IF NOT EXISTS idx_hotels_destination_region ON hotels(destination_slug, region_slug)`);
}

export async function getTravelSettings(db, { includeInactive = true } = {}) {
  const activeWhere = includeInactive ? "" : "WHERE is_active = 1";

  // Read-only fast path: schema creation, column checks and default seeding are
  // intentionally excluded from normal page loads. D1 batch sends all five
  // selects in one database request instead of waiting for five round trips.
  const statements = [
    db.prepare(`
      SELECT slug, label, description, sort_order, is_active, updated_at
      FROM content_types
      ${activeWhere}
      ORDER BY sort_order ASC, label COLLATE NOCASE ASC
    `),
    db.prepare(`
      SELECT slug, name, sort_order, is_active, updated_at
      FROM countries
      ${activeWhere}
      ORDER BY sort_order ASC, name COLLATE NOCASE ASC
    `),
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
    `),
    db.prepare(`
      SELECT id, slug, name, country_slug, destination_slug, sort_order, is_active, updated_at
      FROM regions
      ${includeInactive ? "" : "WHERE is_active = 1"}
      ORDER BY destination_slug COLLATE NOCASE ASC, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 1000
    `),
    db.prepare(`
      SELECT id, slug, name, description, country_slug, destination_slug, sort_order, is_active, updated_at
      FROM recommendation_categories
      ${includeInactive ? "" : "WHERE is_active = 1"}
      ORDER BY CASE WHEN TRIM(COALESCE(destination_slug, '')) = '' THEN 0 ELSE 1 END, sort_order ASC, name COLLATE NOCASE ASC
      LIMIT 1000
    `)
  ];

  const [contentTypeRows, countryRows, destinationRows, regionRows, recommendationCategoryRows] =
    typeof db.batch === "function"
      ? await db.batch(statements)
      : await Promise.all(statements.map((statement) => statement.all()));

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
