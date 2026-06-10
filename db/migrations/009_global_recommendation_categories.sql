-- Convert recommendation categories from city-scoped records to global records
-- Existing city-scoped rows are copied once to destination_slug='' and then removed.
INSERT OR IGNORE INTO recommendation_categories (
  slug, name, description, country_slug, destination_slug, sort_order, is_active, created_at, updated_at
)
SELECT
  slug,
  name,
  description,
  '',
  '',
  MIN(COALESCE(sort_order, 0)),
  MAX(COALESCE(is_active, 1)),
  MIN(COALESCE(created_at, datetime('now'))),
  MAX(COALESCE(updated_at, datetime('now')))
FROM recommendation_categories
GROUP BY slug;

DELETE FROM recommendation_categories
WHERE TRIM(COALESCE(destination_slug, '')) <> '';

CREATE INDEX IF NOT EXISTS idx_recommendation_categories_sort_order ON recommendation_categories(is_active, sort_order ASC, name ASC);
CREATE INDEX IF NOT EXISTS idx_recommendation_categories_destination_sort ON recommendation_categories(destination_slug, is_active, sort_order ASC, name ASC);
