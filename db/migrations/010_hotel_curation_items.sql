CREATE TABLE IF NOT EXISTS curation_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, slug TEXT NOT NULL, name TEXT NOT NULL, sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at TEXT DEFAULT '', updated_at TEXT DEFAULT '', UNIQUE(type, slug));
CREATE INDEX IF NOT EXISTS idx_curation_items_type_order ON curation_items(type,is_active,sort_order);
ALTER TABLE posts ADD COLUMN mood_tags_json TEXT DEFAULT '[]';
ALTER TABLE posts ADD COLUMN situation_tags_json TEXT DEFAULT '[]';
