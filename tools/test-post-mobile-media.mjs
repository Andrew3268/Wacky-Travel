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
  /html body:not\(\.travel-home-body\):not\(\.wt-mobile-heading-noop-a\):not\(\.wt-mobile-heading-noop-b\):not\(\.wt-mobile-heading-noop-c\):not\(\.wt-mobile-heading-noop-d\) h1 \{[^}]*font-size: 45px;[^}]*line-height: 1\.4;/
);
assert.match(
  fs.readFileSync("public/assets/css/travel-home.css", "utf8"),
  /@media \(max-width: 767px\) \{[\s\S]*?body\.travel-home-body main\.travel-page\.travel-home > \.wthome-hero #wthomeHeroTitle \{[^}]*font-size: 40px;/
);
assert.match(
  travelCoreCss,
  /@media \(max-width:720px\)\{[\s\S]*?post-style-hotel-image-badge\{[^}]*top:50px;[^}]*left:15px;[^}]*max-width:calc\(100% - 30px\);/
);
assert.match(
  css,
  /body\.post-page-body--hotel-review-magazine \.post-body \.post-content h3\{[^}]*color:\s*#333;[^}]*font-size:\s*17px;/
);
assert.match(
  css,
  /body\.post-page-body--hotel-review-magazine \.post-body \.post-content h3 \.post-style-hotel-h3-line\{[^}]*width:\s*34px;[^}]*height:\s*1px;[^}]*background:\s*#666;/
);
assert.match(
  css,
  /body\.post-page-body--hotel-review-magazine \.post-body \.post-content h3::before,[\s\S]*?h3::after\{[^}]*content:\s*none;[^}]*display:\s*none;/
);
assert.doesNotMatch(
  css,
  /\.preview-body h3,\s*\.post-body \.post-content h3,\s*\.post-body \.post-content a,\s*\.preview-body a\{[^}]*color:\s*#2563EB\s*!important;/
);
assert.match(
  css,
  /\.post-body \.post-content a,\s*\.preview-body a\{[^}]*color:\s*#2563EB\s*!important;/
);

assert.match(
  css,
  /@media \(max-width: 767px\) \{[\s\S]*?--post-page-gutter: 16px;/
);
assert.match(
  travelCoreCss,
  /@media \(max-width:767px\)\{[\s\S]*?post-magazine-hero\{[^}]*overflow:visible;[\s\S]*?post-magazine-hero > \.post-cover-wrap,[\s\S]*?figure\.post-inline-image\{[^}]*box-sizing:border-box;[^}]*width:calc\(100% \+ \(var\(--post-page-gutter\) \* 2\)\);[^}]*margin-left:calc\(var\(--post-page-gutter\) \* -1\);[^}]*margin-right:calc\(var\(--post-page-gutter\) \* -1\);/
);
assert.match(
  travelCoreCss,
  /figure\.post-inline-image \.post-inline-image__caption\{[^}]*padding-left:var\(--post-page-gutter\);[^}]*padding-right:var\(--post-page-gutter\);/
);
assert.match(
  travelCoreCss,
  /body\.post-page-body \.post-cover,[\s\S]*?body\.post-page-body \.post-body \.post-content img\{[^}]*border-radius:0;/
);

assert.match(
  css,
  /@media \(max-width: 1024px\) \{[\s\S]*?body\.post-page-body \.post-shell--guide-style \.post-hero--product \.post-cover-wrap,[\s\S]*?body\.post-page-body \.post-cover-wrap\{[^}]*height: auto;[^}]*min-height: 0;[^}]*aspect-ratio: auto;[\s\S]*?body\.post-page-body \.post-cover,[\s\S]*?body\.post-page-body \.post-cover-wrap img\{[^}]*height: auto;[^}]*max-height: none;[^}]*object-fit: contain;/
);
const tabletCoverMedia = css.match(
  /\/\* 태블릿·모바일 Post 대표 이미지:[\s\S]*?@media \(max-width: 1024px\) \{[\s\S]*?object-fit: contain;[\s\S]*?\n\}/
)?.[0] || "";
assert.ok(tabletCoverMedia, "tablet/mobile post cover media rule must exist");
assert.equal(
  tabletCoverMedia.includes("!important"),
  false,
  "tablet/mobile post cover sizing should not require !important"
);

assert.match(
  travelCoreCss,
  /@media \(max-width:767px\)\{[\s\S]*?body\.post-page-body--recommended-hotel-review \.post-hotel-key-points__grid\{[^}]*grid-template-columns:minmax\(0,1fr\);/
);

console.log("Post mobile image/table/full-bleed/radius/badge/H1 check passed");
