import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolveRobotsDirective } from "../functions/_middleware.js";
import { onRequestGet as getSitemap } from "../functions/sitemap.xml.js";

const INDEX = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const NOINDEX = "noindex, follow, noarchive";

const affectedArchiveRoutes = [
  "/destinations/hanoi/hotel-recommendations/",
  "/destinations/taichung/hotel-recommendations/",
  "/destinations/taipei/hotels/",
  "/destinations/taichung/hotels/",
  "/destinations/fukuoka/hotel-recommendations/",
  "/destinations/hanoi/hotels/",
  "/destinations/tainan/hotel-recommendations/",
  "/destinations/taipei/hotel-recommendations/",
  "/destinations/osaka/hotel-recommendations/"
];

assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/search/"), 200, null),
  NOINDEX,
  "Internal search must remain noindex"
);

for (const route of affectedArchiveRoutes) {
  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}`), 200, false),
    INDEX,
    `${route} must stay indexable even when the current archive has zero posts`
  );

  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}?filter=test`), 200, false),
    NOINDEX,
    `${route} query/filter variants must remain noindex duplicates`
  );

  const file = new URL(`../public${route}index.html`, import.meta.url);
  const html = await readFile(file, "utf8");
  assert(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*index[^"']*["']/i.test(html)
    || /<meta\b[^>]*content=["'][^"']*index[^"']*["'][^>]*name=["']robots["']/i.test(html), `${route} static HTML must contain index robots meta`);
  assert(!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html), `${route} static HTML unexpectedly contains noindex`);
}

const emptyDb = {
  prepare(sql) {
    return {
      async all() {
        if (/FROM\s+posts/i.test(sql)) return { results: [] };
        if (/FROM\s+destinations/i.test(sql)) return { results: [] };
        return { results: [] };
      }
    };
  }
};

const sitemapResponse = await getSitemap({
  env: { TRAVEL_DB: emptyDb, SITE_ORIGIN: "https://bestayable.com" },
  request: new Request("https://bestayable.com/sitemap.xml")
});
const sitemap = await sitemapResponse.text();

for (const route of affectedArchiveRoutes) {
  assert(sitemap.includes(`https://bestayable.com${route}`), `${route} must remain in sitemap even with zero current posts`);
}
assert(!sitemap.includes("https://bestayable.com/search/"), "Internal search must not be submitted in sitemap");

assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/travel-by-mood/ocean-rest/"), 200, false),
  NOINDEX,
  "Draft/conditional ocean-rest page must retain its intentional noindex behavior"
);

console.log("Search Console noindex policy: OK");
