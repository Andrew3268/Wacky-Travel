const MAX_AFFILIATE_DISCLOSURE_LENGTH = 1000;
let affiliateDisclosureColumnPromise = null;

export function normalizeAffiliateDisclosure(value = "") {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, MAX_AFFILIATE_DISCLOSURE_LENGTH);
}

export function isMissingAffiliateDisclosureColumnError(error) {
  return /no such column:\s*(?:posts\.)?affiliate_disclosure/i.test(String(error?.message || error || ""));
}

export async function ensureAffiliateDisclosureColumn(db) {
  if (affiliateDisclosureColumnPromise) return affiliateDisclosureColumnPromise;

  affiliateDisclosureColumnPromise = (async () => {
    const info = await db.prepare(`PRAGMA table_info(posts)`).all();
    const existing = new Set((info?.results || []).map((row) => String(row.name || "").trim()).filter(Boolean));
    if (existing.has("affiliate_disclosure")) return;

    try {
      await db.prepare(`ALTER TABLE posts ADD COLUMN affiliate_disclosure TEXT DEFAULT ''`).run();
    } catch (error) {
      if (!/duplicate column name/i.test(String(error?.message || error || ""))) throw error;
    }
  })().catch((error) => {
    affiliateDisclosureColumnPromise = null;
    throw error;
  });

  return affiliateDisclosureColumnPromise;
}
