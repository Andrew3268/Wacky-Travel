-- Region management for city hotel filters
ALTER TABLE posts ADD COLUMN region_slug TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN region_name TEXT DEFAULT '';
ALTER TABLE hotels ADD COLUMN region_slug TEXT DEFAULT '';
ALTER TABLE hotels ADD COLUMN region_name TEXT DEFAULT '';

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
);

CREATE INDEX IF NOT EXISTS idx_regions_destination_sort ON regions(destination_slug, is_active, sort_order ASC, name ASC);
CREATE INDEX IF NOT EXISTS idx_regions_country_destination ON regions(country_slug, destination_slug, sort_order ASC, name ASC);
CREATE INDEX IF NOT EXISTS idx_posts_region_slug ON posts(region_slug);
CREATE INDEX IF NOT EXISTS idx_posts_destination_region ON posts(destination_slug, region_slug);
CREATE INDEX IF NOT EXISTS idx_hotels_destination_region ON hotels(destination_slug, region_slug);
