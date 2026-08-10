import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { onRequestGet } from "../functions/api/posts/[slug].js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const sqls = [];
class MockStatement {
  constructor(sql) {
    this.sql = String(sql || "");
    sqls.push(this.sql.replace(/\s+/g, " ").trim());
  }
  bind() { return this; }
  async first() {
    if (this.sql.includes("FROM admin_sessions")) {
      return { token_hash: "x", expires_at: "2099-01-01T00:00:00.000Z", id: 1, email: "admin@example.com" };
    }
    if (this.sql.includes("FROM posts")) {
      return {
        slug: "sample-post", title: "샘플", category: "", meta_description: "", summary: "",
        cover_image: "", cover_image_alt: "", cover_image_source: "r2", cover_image_link_url: "", cover_image_srcset: "",
        focus_keyword: "", longtail_keywords_json: "[]", enable_sidebar_ad: 1, enable_inarticle_ads: 1,
        tags_json: "[]", content_md: "# 본문", faq_md: "", content_type: "hotel_intro", destination_slug: "danang",
        region_slug: "", region_name: "", recommendation_category_slug: "", recommendation_category_name: "",
        recommendation_category_description: "", hotel_pick_label: "", mood_tags_json: "[]", situation_tags_json: "[]",
        hotel_slug: "sample-hotel", affiliate_enabled: 0, search_intent: "", status: "published",
        published_at: "2026-08-01T00:00:00.000Z", content_modified_at: "2026-08-01T00:00:00.000Z", updated_at: "2026-08-01T00:00:00.000Z"
      };
    }
    if (this.sql.includes("FROM hotels")) {
      return {
        slug: "sample-hotel", name: "샘플 호텔", name_en: "Sample Hotel", area: "시내 중심",
        star_rating: "5", guest_rating: "9+", badges_json: "[]", key_points_json: "[]", price_level: ""
      };
    }
    return null;
  }
  async all() { return { results: [] }; }
  async run() { return { success: true, meta: {} }; }
}

const db = { prepare(sql) { return new MockStatement(sql); } };
const request = new Request("https://example.com/api/posts/sample-post", {
  headers: { cookie: "admin_session=test-token" }
});
const response = await onRequestGet({ env: { TRAVEL_DB: db }, params: { slug: "sample-post" }, request });
assert.equal(response.status, 200);

const schemaChanging = sqls.filter((sql) => /\b(?:ALTER TABLE|CREATE INDEX|PRAGMA)\b/i.test(sql));
assert.deepEqual(schemaChanging, [], "normal edit GET must not run schema migration/check queries");
assert.ok(sqls.length <= 4, `hotel edit GET should stay within 4 D1 reads, got ${sqls.length}`);

const editJs = read("public/assets/js/edit.js");
assert.match(editJs, /const travelSettingsPrefetch = fetchTravelSettingsData\(\);/);
assert.match(editJs, /const hotelCurationPrefetch = fetchHotelCurationItemsData\(\);/);
assert.match(editJs, /await Promise\.all\(\[/, "travel settings and curation must join in parallel");
assert.doesNotMatch(
  editJs.match(/function initHotelCurationEditor\(\)[\s\S]*?\n\}/)?.[0] || "",
  /loadHotelCurationItems\(/,
  "curation must not be fetched once more during DOMContentLoaded init"
);

const loadTravelBlock = editJs.match(/async function loadTravelSettings\([\s\S]*?\n\}/)?.[0] || "";
assert.doesNotMatch(loadTravelBlock, /renderPreview\(/, "travel settings load must not trigger duplicate full preview rendering");
assert.doesNotMatch(loadTravelBlock, /renderTravelSettingsManager\(\);/, "hidden settings manager must not render during normal initial load");

console.log(`Edit load performance check passed: ${sqls.length} D1 reads, 0 schema-changing queries, parallel auxiliary loading.`);
