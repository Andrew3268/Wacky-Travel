-- Recommendation category management for hotel recommendation archives
ALTER TABLE posts ADD COLUMN recommendation_category_slug TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN recommendation_category_name TEXT DEFAULT '';
ALTER TABLE posts ADD COLUMN recommendation_category_description TEXT DEFAULT '';

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
);

CREATE INDEX IF NOT EXISTS idx_recommendation_categories_sort_order ON recommendation_categories(is_active, sort_order ASC, name ASC);
CREATE INDEX IF NOT EXISTS idx_recommendation_categories_destination_sort ON recommendation_categories(destination_slug, is_active, sort_order ASC, name ASC);
CREATE INDEX IF NOT EXISTS idx_posts_recommendation_category ON posts(recommendation_category_slug);
CREATE INDEX IF NOT EXISTS idx_posts_destination_recommendation_category ON posts(destination_slug, recommendation_category_slug);
