import assert from "node:assert/strict";
import fs from "node:fs";
import { normalizeCoverImagePayload, getLargestSrcsetUrl } from "../lib/posts/cover-image.js";

const sample = normalizeCoverImagePayload({
  cover_image_source: "agoda",
  cover_image: "//pix8.agoda.net/hotelImages/4947690/-1/f5dd1db7b2125faf6a1210227979f529.jpg?ce=0&s=480x360",
  cover_image_link_url: "https://www.agoda.com/partners/partnersearch.aspx?pcs=10&cid=1970112&hl=ko-kr&hid=4947690",
  cover_image_srcset: "//pix8.agoda.net/hotelImages/4947690/-1/f5dd1db7b2125faf6a1210227979f529.jpg?ce=0&s=480x360 1x, //pix8.agoda.net/hotelImages/4947690/-1/f5dd1db7b2125faf6a1210227979f529.jpg?ce=0&s=960x720 2x",
  cover_image_alt: "호텔 수영장 대표 이미지"
});
assert.equal(sample.ok, true);
assert.equal(sample.source, "agoda");
assert.match(sample.image, /^https:\/\/pix8\.agoda\.net\//);
assert.match(sample.link, /^https:\/\/www\.agoda\.com\/partners\/partnersearch\.aspx/);
assert.match(sample.srcset, /960x720 2x/);
assert.match(getLargestSrcsetUrl(sample.srcset, sample.image), /960x720/);

const unsafe = normalizeCoverImagePayload({
  cover_image_source: "agoda",
  cover_image: "https://example.com/image.jpg",
  cover_image_link_url: "https://example.com/"
});
assert.equal(unsafe.ok, false);

const ratingValues = ["6+", "6.5+", "7+", "7.5+", "8+", "8.5+", "9+", "9.5+"];
for (const file of ["public/add.html", "public/edit.html"]) {
  const html = fs.readFileSync(file, "utf8");
  for (const value of ratingValues) assert.match(html, new RegExp(`value="${value.replace("+", "\\+")}"`));
  assert.match(html, /name="coverImageSource" value="r2"/);
  assert.match(html, /name="coverImageSource" value="agoda"/);
  assert.match(html, /id="agoda_image_html"/);
}

const schema = fs.readFileSync("db/schema.sql", "utf8");
for (const column of ["cover_image_source", "cover_image_link_url", "cover_image_srcset"]) assert.match(schema, new RegExp(column));

const postRenderer = fs.readFileSync("functions/post/[slug].js", "utf8");
assert.match(postRenderer, /rel="sponsored noopener noreferrer"/);
assert.match(postRenderer, /getLargestSrcsetUrl/);
assert.match(postRenderer, /20260803-style-hotel-h3-nowrap-v10/);

const appCss = fs.readFileSync("public/assets/css/app.css", "utf8");
assert.match(
  appCss,
  /body\.post-page-body \.post-cover-link\{[^}]*display:block;[^}]*width:100%;[^}]*height:100%;[^}]*line-height:0;/s
);

console.log("Cover image source check passed");
