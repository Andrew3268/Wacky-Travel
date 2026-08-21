import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const destinationsDir = path.join(publicDir, "destinations");

const destinationNames = await fs.readdir(destinationsDir, { withFileTypes: true });
const guideFiles = [];
for (const entry of destinationNames) {
  if (!entry.isDirectory()) continue;
  for (const guideType of ["hotel-guide", "travel-guide"]) {
    const file = path.join(destinationsDir, entry.name, guideType, "index.html");
    try {
      await fs.access(file);
      guideFiles.push(file);
    } catch {}
  }
}

assert.equal(guideFiles.length, 30, `Expected 30 static guide pages, found ${guideFiles.length}`);

for (const file of guideFiles) {
  const html = await fs.readFile(file, "utf8");
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  assert.match(html, /class="post-author-profile"[^>]*itemprop="author"/, `${rel}: author profile missing`);
  assert.match(html, /class="post-author-profile__avatar"[^>]*src="\/assets\/images\/profile\.png"/, `${rel}: profile image missing`);
  assert.match(html, /class="post-author-profile__name"[^>]*href="\/about\/"[^>]*rel="author"/, `${rel}: author link missing`);
  assert.match(html, /<meta\b[^>]*name="author"[^>]*content="Be Stayable Editor"/, `${rel}: meta author missing`);

  const articleScripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => {
      try { return JSON.parse(match[1]); } catch { return null; }
    })
    .filter((item) => item && item["@type"] === "Article");
  assert(articleScripts.length >= 1, `${rel}: Article JSON-LD missing`);
  for (const article of articleScripts) {
    assert.equal(article.author?.["@type"], "Person", `${rel}: Article author must be Person`);
    assert.equal(article.author?.["@id"], "https://bestayable.com/about/#author", `${rel}: Article author @id mismatch`);
    assert.equal(article.author?.name, "Be Stayable Editor", `${rel}: Article author name mismatch`);
    assert.equal(article.author?.url, "https://bestayable.com/about/", `${rel}: Article author URL mismatch`);
  }
}

const css = await fs.readFile(path.join(publicDir, "assets", "css", "travel-core.css"), "utf8");
assert.match(css, /body\.wt-guide-body \.post-author-profile\{[\s\S]*?display:flex;[\s\S]*?border-top:1px solid #ccc;[\s\S]*?border-bottom:1px solid #ccc;/);
assert.match(css, /body\.wt-guide-body \.post-author-profile__avatar\{[\s\S]*?border-radius:50%;/);

console.log(`Guide author profile: OK (${guideFiles.length} pages)`);
