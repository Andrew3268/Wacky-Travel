-- 여행 제휴/애드센스 블로그 확장 마이그레이션
-- Wacky Travel 전용 여행 제휴/애드센스 확장 스키마입니다.

ALTER TABLE posts ADD COLUMN content_type TEXT DEFAULT 'guide';
ALTER TABLE posts ADD COLUMN destination_slug TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN hotel_slug TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN affiliate_enabled INTEGER DEFAULT 0;
ALTER TABLE posts ADD COLUMN search_intent TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_posts_destination_slug ON posts(destination_slug);
CREATE INDEX IF NOT EXISTS idx_posts_hotel_slug ON posts(hotel_slug);
CREATE INDEX IF NOT EXISTS idx_posts_content_type ON posts(content_type);
CREATE INDEX IF NOT EXISTS idx_posts_affiliate_enabled ON posts(affiliate_enabled);

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
  best_season TEXT DEFAULT '',
  airport_info TEXT DEFAULT '',
  transport_summary TEXT DEFAULT '',
  status TEXT DEFAULT 'published',
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_destinations_status_updated ON destinations(status, updated_at DESC);

CREATE TABLE IF NOT EXISTS hotels (
  slug TEXT PRIMARY KEY,
  destination_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT DEFAULT '',
  area TEXT DEFAULT '',
  address TEXT DEFAULT '',
  star_rating TEXT DEFAULT '',
  price_level TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  cover_image_alt TEXT DEFAULT '',
  gallery_json TEXT DEFAULT '[]',
  pros_json TEXT DEFAULT '[]',
  cons_json TEXT DEFAULT '[]',
  suitable_for_json TEXT DEFAULT '[]',
  checkin_time TEXT DEFAULT '',
  checkout_time TEXT DEFAULT '',
  distance_summary TEXT DEFAULT '',
  nearby_spots_json TEXT DEFAULT '[]',
  review_summary TEXT DEFAULT '',
  status TEXT DEFAULT 'published',
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hotels_destination_slug ON hotels(destination_slug);
CREATE INDEX IF NOT EXISTS idx_hotels_status_updated ON hotels(status, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_hotels_area ON hotels(area);
CREATE INDEX IF NOT EXISTS idx_hotels_price_level ON hotels(price_level);

CREATE TABLE IF NOT EXISTS hotel_affiliate_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  hotel_slug TEXT NOT NULL,
  provider TEXT NOT NULL,
  label TEXT DEFAULT '',
  affiliate_url TEXT NOT NULL,
  button_text TEXT DEFAULT '예약 가능 여부 확인하기',
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hotel_affiliate_links_hotel_slug ON hotel_affiliate_links(hotel_slug, is_active, sort_order);

CREATE TABLE IF NOT EXISTS post_hotel_relations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_slug TEXT NOT NULL,
  hotel_slug TEXT NOT NULL,
  relation_type TEXT DEFAULT 'mentioned',
  sort_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_post_hotel_relations_post_slug ON post_hotel_relations(post_slug, sort_order);
CREATE INDEX IF NOT EXISTS idx_post_hotel_relations_hotel_slug ON post_hotel_relations(hotel_slug, sort_order);
