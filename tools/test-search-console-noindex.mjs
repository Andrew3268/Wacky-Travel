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

assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/"), 200, null),
  INDEX,
  "Canonical homepage must remain indexable"
);
assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/?category=hotel"), 200, null),
  NOINDEX,
  "Homepage category query variants must be noindex"
);
assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/destinations/"), 200, null),
  INDEX,
  "Canonical destinations directory must remain indexable"
);
assert.equal(
  resolveRobotsDirective(new URL("https://bestayable.com/destinations/?survey=1"), 200, null),
  NOINDEX,
  "Destinations survey query mode must be noindex"
);

const routesConfig = JSON.parse(await readFile(new URL("../public/_routes.json", import.meta.url), "utf8"));
assert(routesConfig.include.includes("/"), "Homepage must invoke Pages Functions so query noindex is applied");
assert(routesConfig.include.includes("/destinations/"), "Destinations root must invoke Pages Functions so survey noindex is applied");


for (const route of affectedArchiveRoutes) {
  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}`), 200, false),
    NOINDEX,
    `${route} must stay noindex while fewer than 5 matching posts are published`
  );

  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}`), 200, true),
    INDEX,
    `${route} must become indexable after reaching 5 matching published posts`
  );

  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}?filter=test`), 200, true),
    NOINDEX,
    `${route} query/filter variants must remain noindex duplicates`
  );
}

for (const route of [
  "/destinations/osaka/hotel-location-survey/",
  "/destinations/tokyo/hotel-location-survey/"
]) {
  assert.equal(
    resolveRobotsDirective(new URL(`https://bestayable.com${route}`), 200, null),
    NOINDEX,
    `${route} is a utility page and must remain noindex`
  );
  const html = await readFile(new URL(`../public${route}index.html`, import.meta.url), "utf8");
  assert(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html), `${route} static HTML must contain noindex because survey routes bypass Pages Functions`);
}

function createDb(posts = []) {
  return {
    prepare(sql) {
      return {
        async all() {
          if (/FROM\s+posts/i.test(sql)) return { results: posts };
          if (/FROM\s+destinations/i.test(sql)) return { results: [] };
          return { results: [] };
        }
      };
    }
  };
}

const emptySitemapResponse = await getSitemap({
  env: { TRAVEL_DB: createDb([]), SITE_ORIGIN: "https://bestayable.com" },
  request: new Request("https://bestayable.com/sitemap.xml")
});
const emptySitemap = await emptySitemapResponse.text();

for (const route of affectedArchiveRoutes) {
  assert(!emptySitemap.includes(`https://bestayable.com${route}`), `${route} must stay out of sitemap below the 5-post threshold`);
}
assert(!emptySitemap.includes("/hotel-location-survey/"), "Hotel location survey pages must stay out of sitemap");
assert(!emptySitemap.includes("https://bestayable.com/search/"), "Internal search must not be submitted in sitemap");

const thresholdPosts = [
  ...Array.from({ length: 5 }, (_, index) => ({
    slug: `hanoi-hotel-${index + 1}`,
    destination_slug: "hanoi",
    content_type: "hotel_intro",
    published_at: `2026-08-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
    updated_at: `2026-08-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
    content_modified_at: `2026-08-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`
  })),
  ...Array.from({ length: 4 }, (_, index) => ({
    slug: `hanoi-top5-${index + 1}`,
    destination_slug: "hanoi",
    content_type: "top5_series",
    published_at: `2026-08-${String(index + 10).padStart(2, "0")}T00:00:00.000Z`,
    updated_at: `2026-08-${String(index + 10).padStart(2, "0")}T00:00:00.000Z`,
    content_modified_at: `2026-08-${String(index + 10).padStart(2, "0")}T00:00:00.000Z`
  })),
  ...Array.from({ length: 5 }, (_, index) => ({
    slug: `osaka-top5-${index + 1}`,
    destination_slug: "osaka",
    content_type: "top5_series",
    published_at: `2026-08-${String(index + 15).padStart(2, "0")}T00:00:00.000Z`,
    updated_at: `2026-08-${String(index + 15).padStart(2, "0")}T00:00:00.000Z`,
    content_modified_at: `2026-08-${String(index + 15).padStart(2, "0")}T00:00:00.000Z`
  }))
];

const thresholdResponse = await getSitemap({
  env: { TRAVEL_DB: createDb(thresholdPosts), SITE_ORIGIN: "https://bestayable.com" },
  request: new Request("https://bestayable.com/sitemap.xml")
});
const thresholdSitemap = await thresholdResponse.text();
assert(thresholdSitemap.includes("https://bestayable.com/destinations/hanoi/hotels/"), "5 hotel reviews must admit Hanoi /hotels/ to sitemap");
assert(!thresholdSitemap.includes("https://bestayable.com/destinations/hanoi/hotel-recommendations/"), "4 recommendation posts must not admit Hanoi /hotel-recommendations/");
assert(thresholdSitemap.includes("https://bestayable.com/destinations/osaka/hotel-recommendations/"), "5 recommendation posts must admit Osaka /hotel-recommendations/ to sitemap");


console.log("Search Console noindex/index threshold policy: OK");
