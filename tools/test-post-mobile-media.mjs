import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("public/assets/css/app.css", "utf8");
const travelCoreCss = fs.readFileSync("public/assets/css/travel-core.css", "utf8");

assert.match(
  css,
  /@media \(max-width: 767px\)[\s\S]*?body\.post-page-body \.post-inline-image__img\{[^}]*height: auto;[^}]*max-height: none;[^}]*object-fit: contain;[^}]*\}/
);

const mobileImageRule = css.match(/@media \(max-width: 767px\)[\s\S]*?body\.post-page-body \.post-inline-image__img\{([^}]*)\}/)?.[1] || "";
assert.doesNotMatch(mobileImageRule, /aspect-ratio\s*:/);

assert.match(
  css,
  /body\.post-page-body \.post-shell--guide-style \.post-body \.table-wrap,[\s\S]*?overflow-x: hidden;[\s\S]*?body\.post-page-body \.post-shell--guide-style \.post-body table,[\s\S]*?min-width: 0;[\s\S]*?table-layout: fixed;/
);

assert.match(
  css,
  /body\.post-page-body \.post-shell--guide-style \.post-body table th,[\s\S]*?white-space: normal;[\s\S]*?overflow-wrap: anywhere;/
);



assert.match(
  travelCoreCss,
  /html body:not\(\.wt-mobile-heading-noop-a\):not\(\.wt-mobile-heading-noop-b\):not\(\.wt-mobile-heading-noop-c\):not\(\.wt-mobile-heading-noop-d\) h1 \{[^}]*line-height: 1\.4;/
);
assert.match(
  travelCoreCss,
  /@media \(max-width:720px\)\{[\s\S]*?post-style-hotel-image-badge\{[^}]*top:50px;[^}]*left:15px;[^}]*max-width:calc\(100% - 30px\);/
);
assert.match(
  css,
  /@media \(max-width: 767px\) \{[\s\S]*?--post-page-gutter: 16px;/
);
assert.match(
  travelCoreCss,
  /@media \(max-width:767px\)\{[\s\S]*?post-magazine-hero\{[^}]*overflow:visible;[\s\S]*?post-magazine-hero > \.post-cover-wrap,[\s\S]*?figure\.post-inline-image\{[^}]*box-sizing:border-box;[^}]*width:calc\(100% \+ \(var\(--post-page-gutter\) \* 2\)\);[^}]*margin-left:calc\(var\(--post-page-gutter\) \* -1\);[^}]*margin-right:calc\(var\(--post-page-gutter\) \* -1\);[^}]*border-radius:0;/
);
assert.match(
  travelCoreCss,
  /figure\.post-inline-image \.post-inline-image__caption\{[^}]*padding-left:var\(--post-page-gutter\);[^}]*padding-right:var\(--post-page-gutter\);/
);
assert.match(
  travelCoreCss,
  /body\.post-page-body \.post-cover,[\s\S]*?body\.post-page-body \.post-body \.post-content img\{[^}]*border-radius:0;/
);

console.log("Post mobile image/table/full-bleed/radius/badge/H1 check passed");
