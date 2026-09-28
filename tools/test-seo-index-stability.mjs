import fs from "node:fs";

const middleware = fs.readFileSync("functions/_middleware.js", "utf8");
const sitemap = fs.readFileSync("functions/sitemap.xml.js", "utf8");
const headers = fs.readFileSync("public/_headers", "utf8");
const migration = fs.readFileSync("db/migrations/025_seo_archive_index_state.sql", "utf8");

const failures = [];
if (!middleware.includes("if (!archiveResult.ok)")) failures.push("archive DB failure guard missing");
if (!middleware.includes("indexable: null")) failures.push("archive failure does not preserve index directive");
if (!middleware.includes("previouslyQualified === true")) failures.push("stable archive index state not used");
if (!middleware.includes("rememberArchiveIndexState")) failures.push("archive qualification persistence missing");
if (!sitemap.includes('status: 503')) failures.push("sitemap does not fail with 503 on D1 query error");
if (!sitemap.includes("stableArchiveRoutes.has")) failures.push("sitemap does not preserve previously qualified archives");
if (sitemap.includes('"x-robots-tag": "noindex"')) failures.push("sitemap still emits X-Robots-Tag noindex");
const robotsBlock = headers.match(/\/robots\.txt[\s\S]*?(?=\n\S|$)/)?.[0] || "";
const sitemapBlock = headers.match(/\/sitemap\.xml[\s\S]*?(?=\n\S|$)/)?.[0] || "";
if (/X-Robots-Tag:\s*noindex/i.test(robotsBlock)) failures.push("_headers robots.txt still has noindex");
if (/X-Robots-Tag:\s*noindex/i.test(sitemapBlock)) failures.push("_headers sitemap.xml still has noindex");
if (!migration.includes("seo_archive_index_state")) failures.push("migration 025 missing state table");

if (failures.length) {
  console.error("SEO index stability check failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("SEO index stability check passed");
