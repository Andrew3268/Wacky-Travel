import fs from "node:fs";
import assert from "node:assert/strict";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const addHtml = read("public/add.html");
const editHtml = read("public/edit.html");
const addJs = read("public/assets/js/add.js");
const editJs = read("public/assets/js/edit.js");
const postsApi = read("functions/api/posts.js");
const postApi = read("functions/api/posts/[slug].js");
const postPage = read("functions/post/[slug].js");
const schema = read("db/schema.sql");
const appCss = read("public/assets/css/app.css");
const adminCss = read("public/assets/css/admin.css");

for (const html of [addHtml, editHtml]) {
  assert.match(html, /id="affiliate_disclosure"/);
  assert.match(html, /제휴마케팅 문구/);
  assert.match(html, /대표 이미지 바로 아래/);
}

assert.match(addJs, /affiliate_disclosure:\s*\$\("affiliate_disclosure"\)/);
assert.match(editJs, /affiliate_disclosure:\s*\$\("affiliate_disclosure"\)/);
assert.match(editJs, /item\.affiliate_disclosure/);
assert.match(addJs, /preview-affiliate-disclosure/);
assert.match(editJs, /preview-affiliate-disclosure/);

assert.match(schema, /affiliate_disclosure TEXT DEFAULT ''/);
assert.match(postsApi, /affiliate_disclosure/);
assert.match(postApi, /affiliate_disclosure/);
assert.match(postPage, /affiliate_disclosure/);
assert.match(postPage, /\$\{coverImageHtml\}\s*\$\{affiliateDisclosureHtml\}/);
assert.match(postPage, /class="post-affiliate-disclosure"/);
assert.match(appCss, /body\.post-page-body \.post-affiliate-disclosure/);
assert.match(adminCss, /\.preview-affiliate-disclosure/);

console.log("post affiliate disclosure checks passed");
