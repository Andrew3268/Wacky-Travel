import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isPageLikePath } from "../lib/seo/site-url.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const bad = [];
for (const file of (await walk(publicDir)).filter((item) => item.endsWith(".html"))) {
  const html = await fs.readFile(file, "utf8");
  for (const match of html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1/gi)) {
    const href = String(match[2] || "").trim();
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const url = new URL(href, "https://bestayable.com");
    if (!isPageLikePath(url.pathname) || url.pathname === "/" || url.pathname.endsWith("/")) continue;
    bad.push(`${path.relative(publicDir, file)} -> ${href}`);
  }
}

assert.equal(bad.length, 0, `Found internal page links without trailing slash:\n${bad.join("\n")}`);
console.log("Static internal trailing-slash links: OK");
