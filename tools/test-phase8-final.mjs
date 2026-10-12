import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");
const map = await read("public/assets/js/hotel-review-map.js");
const nav = await read("public/assets/js/hotel-review-navigation.js");
const renderer = await read("lib/posts/hotel-review-json.js");
const post = await read("functions/post/[slug].js");
const pkg = JSON.parse(await read("package.json"));
assert.match(map, /assets\/vendor\/leaflet\/leaflet\.css/);
assert.match(map, /assets\/vendor\/leaflet\/leaflet\.js/);
assert.doesNotMatch(map, /unpkg\.com\/leaflet/);
assert.match(renderer, /role="dialog" aria-modal="true"/);
assert.match(renderer, /aria-label="브레드크럼"/);
assert.match(renderer, /aria-current="page"/);
assert.ok(nav.includes('event.key !== "Tab"'));
assert.match(nav, /document\.body\.style\.overflow = "hidden"/);
assert.match(post, /POST_RENDER_VERSION = "20261010-post-layout-v85"/);
assert.equal(pkg.dependencies?.leaflet, "1.9.4");
assert.ok(pkg.scripts?.["prepare:vendor"]);

for (const vendorPath of [
  "public/assets/vendor/leaflet/leaflet.js",
  "public/assets/vendor/leaflet/leaflet.css"
]) {
  const info = await stat(new URL(`../${vendorPath}`, import.meta.url));
  assert.ok(info.isFile() && info.size > 0, `${vendorPath} must exist in Git source`);
}
assert.equal(pkg.scripts?.postinstall, "npm run prepare:vendor");
console.log("[phase8] final integration assertions passed");
