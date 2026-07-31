import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("public/assets/css/app.css", "utf8");

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

console.log("Post mobile image/table check passed");
