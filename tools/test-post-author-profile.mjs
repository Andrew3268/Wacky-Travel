import assert from "node:assert/strict";
import fs from "node:fs";

const renderer = fs.readFileSync("functions/post/[slug].js", "utf8");
const css = fs.readFileSync("public/assets/css/travel-core.css", "utf8");

assert.match(renderer, /POST_RENDER_VERSION = "20260804-post-author-profile-v12"/);
assert.match(renderer, /class="post-magazine-head post-magazine-head--title"/);
assert.match(renderer, /<h1 class="h1 post-title post-magazine-title"[^>]*>[\s\S]*?<\/h1>\s*\$\{magazineAuthorProfileHtml\}\s*<\/div>\s*\$\{coverImageHtml\}/);
assert.match(renderer, /class="post-author-profile"[^>]*itemprop="author"/);
assert.match(renderer, /class="post-author-profile__avatar"[^>]*>프로필<\/span>/);
assert.match(renderer, /class="post-author-profile__name"[^>]*>Editor<\/span>/);

const h1Index = renderer.indexOf('<h1 class="h1 post-title post-magazine-title"');
const profileIndex = renderer.indexOf('${magazineAuthorProfileHtml}', h1Index);
const coverIndex = renderer.indexOf('${coverImageHtml}', profileIndex);
assert.ok(h1Index >= 0 && profileIndex > h1Index && coverIndex > profileIndex, "H1 → author profile → cover order must be preserved");

assert.match(css, /body\.post-page-body \.post-author-profile\{[\s\S]*?display:flex;[\s\S]*?align-items:center;/);
assert.match(css, /body\.post-page-body \.post-author-profile__avatar\{[\s\S]*?width:42px;[\s\S]*?height:42px;[\s\S]*?border-radius:50%;/);
assert.match(css, /body\.post-page-body \.post-author-profile__name\{[\s\S]*?font-size:14px;[\s\S]*?font-weight:600;/);
assert.match(css, /body\.post-page-body \.post-magazine-head--title \+ \.post-cover-wrap\{[\s\S]*?margin-top:0;[\s\S]*?margin-bottom:30px;/);

console.log("Post author profile check passed: H1 → text avatar and Editor → cover image.");
