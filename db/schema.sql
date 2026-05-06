-- Wacky Travel SSR Schema
-- Cloudflare D1 / SQLite

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  cover_image TEXT DEFAULT '',
  cover_image_alt TEXT DEFAULT '',
  focus_keyword TEXT DEFAULT '',
  longtail_keywords_json TEXT DEFAULT '[]',
  template_name TEXT DEFAULT 'basic',
  tags_json TEXT DEFAULT '[]',
  content_md TEXT DEFAULT '',
  faq_md TEXT DEFAULT '',
  view_count INTEGER DEFAULT 0,
  enable_sidebar_ad INTEGER DEFAULT 0,
  enable_inarticle_ads INTEGER DEFAULT 1,
  status TEXT DEFAULT 'published',
  content_type TEXT DEFAULT 'guide',
  destination_slug TEXT DEFAULT '',
  hotel_slug TEXT DEFAULT '',
  affiliate_enabled INTEGER DEFAULT 0,
  search_intent TEXT DEFAULT '',
  published_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_updated_at ON posts(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_status_updated ON posts(status, updated_at DESC, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status_category_published ON posts(status, category, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status_view_count ON posts(status, view_count DESC, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_destination_slug ON posts(destination_slug);
CREATE INDEX IF NOT EXISTS idx_posts_hotel_slug ON posts(hotel_slug);
CREATE INDEX IF NOT EXISTS idx_posts_content_type ON posts(content_type);
CREATE INDEX IF NOT EXISTS idx_posts_affiliate_enabled ON posts(affiliate_enabled);

CREATE TABLE IF NOT EXISTS categories (
  name TEXT PRIMARY KEY,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order ASC, name ASC);

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

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id, expires_at DESC);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

INSERT OR IGNORE INTO site_settings (key, value, updated_at)
VALUES ('index_sidebar_ad_enabled', '0', datetime('now'));

INSERT OR IGNORE INTO site_settings (key, value, updated_at)
VALUES ('site_name', 'Wacky Travel', datetime('now'));

INSERT OR IGNORE INTO site_settings (key, value, updated_at)
VALUES ('site_description', '여행지 정보, 호텔 선택 기준, 예약 전 체크포인트를 빠르게 정리하는 여행 블로그', datetime('now'));
