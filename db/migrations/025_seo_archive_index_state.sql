-- Persist archive index eligibility once an archive has met the 5-published-post threshold.
-- This prevents temporary edits/drafts from flipping an already-qualified page to noindex.
CREATE TABLE IF NOT EXISTS seo_archive_index_state (
  route TEXT PRIMARY KEY,
  qualified INTEGER NOT NULL DEFAULT 0 CHECK (qualified IN (0, 1)),
  qualified_at TEXT,
  last_seen_count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_seo_archive_index_state_qualified
  ON seo_archive_index_state (qualified);
