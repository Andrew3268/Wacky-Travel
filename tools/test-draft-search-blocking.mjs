import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { onRequestGet as getRobots } from "../functions/robots.txt.js";
import { onRequestGet as getSitemap } from "../functions/sitemap.xml.js";
import { STATIC_ROUTES } from "../lib/seo/static-routes.js";

const blockedRoutes = [
  "/hotel-promotions/",
  "/travel-by-mood/ocean-rest/"
];

for (const route of blockedRoutes) {
  assert(!STATIC_ROUTES.includes(route), `${route} must not be in STATIC_ROUTES`);
}

const [hotelHtml, oceanHtml, headersText] = await Promise.all([
  readFile(new URL("../public/hotel-promotions/index.html", import.meta.url), "utf8"),
  readFile(new URL("../public/travel-by-mood/ocean-rest/index.html", import.meta.url), "utf8"),
  readFile(new URL("../public/_headers", import.meta.url), "utf8")
]);

for (const [route, html] of [
  [blockedRoutes[0], hotelHtml],
  [blockedRoutes[1], oceanHtml]
]) {
  assert(/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
    || /<meta\b[^>]*content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(html), `${route} missing noindex meta`);
  assert(/nofollow/i.test(html), `${route} missing nofollow meta`);
}

assert(headersText.includes("/hotel-promotions/*"), "hotel-promotions X-Robots-Tag rule missing");
assert(headersText.includes("/travel-by-mood/ocean-rest/*"), "ocean-rest X-Robots-Tag rule missing");

const request = new Request("https://bestayable.com/robots.txt");
const robotsResponse = await getRobots({ env: {}, request });
const robots = await robotsResponse.text();
assert(robots.includes("Disallow: /api/"), "/api/ must remain blocked in robots.txt");
for (const route of blockedRoutes) {
  assert(!robots.includes(`Disallow: ${route}`), `${route} must remain crawlable so noindex/index directives can be observed`);
}

const sitemapResponse = await getSitemap({ env: {}, request: new Request("https://bestayable.com/sitemap.xml") });
const sitemap = await sitemapResponse.text();
assert(!sitemap.includes("bestayable-sitemap-version:"), "sitemap XML must not expose deployment version comment");
assert.equal(sitemapResponse.headers.get("x-bestayable-sitemap-version"), "2026-08-21-index-quality-v6", "sitemap version response header missing");
for (const route of blockedRoutes) {
  assert(!sitemap.includes(`https://bestayable.com${route}`), `${route} unexpectedly present in sitemap`);
}

console.log("Draft search blocking: OK");
