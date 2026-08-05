let publicModifiedColumnPromise = null;

export function isMissingPublicModifiedColumnError(error) {
  return /no such column:\s*(?:posts\.)?content_modified_at/i.test(String(error?.message || error || ""));
}

export async function ensurePublicModifiedDateColumn(db) {
  if (publicModifiedColumnPromise) return publicModifiedColumnPromise;

  publicModifiedColumnPromise = (async () => {
    const info = await db.prepare(`PRAGMA table_info(posts)`).all();
    const existing = new Set((info?.results || []).map((row) => String(row.name || "").trim()).filter(Boolean));
    if (existing.has("content_modified_at")) return;

    try {
      await db.prepare(`ALTER TABLE posts ADD COLUMN content_modified_at TEXT DEFAULT ''`).run();
    } catch (error) {
      if (!/duplicate column name/i.test(String(error?.message || error || ""))) throw error;
    }
  })().catch((error) => {
    publicModifiedColumnPromise = null;
    throw error;
  });

  return publicModifiedColumnPromise;
}

export function getPublicModifiedAt(row = {}) {
  return String(row.content_modified_at || row.published_at || "").trim();
}
