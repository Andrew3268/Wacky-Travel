import assert from "node:assert/strict";
import fs from "node:fs";
import { parseInlineImages, renderMarkdown, stripInlineImageTokens } from "../lib/posts/renderer.js";

const image = "https://pix8.agoda.net/hotelImages/4947690/-1/f5dd1db7b2125faf6a1210227979f529.jpg?ce=0&s=480x360";
const image2x = image.replace("480x360", "960x720");
const srcset = `${image} 1x, ${image2x} 2x`;
const link = "https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1970112&hl=ko-kr&hid=4947690";
const token = `[[POST_AGODA_IMAGE_1 image="${encodeURIComponent(image)}" srcset="${encodeURIComponent(srcset)}" link="${encodeURIComponent(link)}" alt="${encodeURIComponent("호텔 수영장")}" caption="${encodeURIComponent("수영장 전경")}" position="1" placement="before"]]`;
const markdown = `${token}\n\n## 첫 번째 H2\n\n본문`;
const parsed = parseInlineImages(markdown);
const active = parsed.items.filter((item) => item.enabled);
assert.equal(active.length, 1);
assert.equal(active[0].source, "agoda");
assert.equal(active[0].placement, "before");
assert.match(active[0].srcset, /960x720 2x/);

const html = renderMarkdown(markdown, { inlineImages: parsed, origin: "https://bestayable.com" });
assert.match(html, /post-inline-image--agoda/);
assert.match(html, /class="post-inline-image__link"/);
assert.match(html, /rel="sponsored noopener noreferrer"/);
assert.match(html, /loading="lazy"/);
assert.match(html, /srcset=/);
assert.doesNotMatch(stripInlineImageTokens(markdown), /POST_AGODA_IMAGE/);

for (const file of ["public/add.html", "public/edit.html"]) {
  const source = fs.readFileSync(file, "utf8");
  assert.equal((source.match(/id="enableAgodaInlineImage\d+"/g) || []).length, 6);
  assert.match(source, /R2 본문 이미지 추가/);
  assert.match(source, /아고다 본문 이미지 추가/);
  assert.match(source, /id="agodaInlineImage6Html"/);
  assert.match(source, /id="agodaInlineImage1Placement">\s*<option value="before" selected>위<\/option>/s);
}

const addJs = fs.readFileSync("public/assets/js/add.js", "utf8");
const editJs = fs.readFileSync("public/assets/js/edit.js", "utf8");
for (const source of [addJs, editJs]) {
  assert.match(source, /AGODA_INLINE_IMAGE_LIMIT = 6/);
  assert.match(source, /POST_AGODA_IMAGE_/);
  assert.match(source, /collectAgodaInlineImageFormData/);
}

const postRenderer = fs.readFileSync("functions/post/[slug].js", "utf8");
assert.match(postRenderer, /hasAgodaInlineImages/);
assert.match(postRenderer, /POST_AGODA_IMAGE_\[1-6\]/);

console.log("Inline Agoda image check passed");
