import assert from "node:assert/strict";
import fs from "node:fs";
import zlib from "node:zlib";

const renderer = fs.readFileSync("functions/post/[slug].js", "utf8");
const cssPath = "public/assets/css/post-public.css";
assert.ok(fs.existsSync(cssPath), "공개 post 전용 CSS 번들이 없습니다.");

const css = fs.readFileSync(cssPath, "utf8");
const gzipBytes = zlib.gzipSync(Buffer.from(css), { level: 9 }).byteLength;

assert.match(
  renderer,
  /isTravelTipPost\s*\? `<link rel="stylesheet" href="\/assets\/css\/post-public\.css\?v=20260910-post-cover-auto-v1" \/>`/,
  "여행 꿀팁 post가 전용 CSS 번들을 사용해야 합니다."
);
assert.ok(gzipBytes < 32 * 1024, `post-public.css gzip 크기가 너무 큽니다: ${gzipBytes} bytes`);

for (const token of [
  "body.post-page-body--travel-tip .post-shell.post-shell--guide-style{",
  "body.post-page-body .post-shell--guide-style .post-hero--product .post-cover-wrap,body.post-page-body .post-cover-wrap{height:auto;min-height:0;aspect-ratio:auto;}body.post-page-body .post-cover-link{height:auto;}body.post-page-body .post-shell--guide-style .post-hero--product .post-cover,body.post-page-body .post-cover-wrap img{display:block;width:100%;height:auto;max-height:none;aspect-ratio:auto;object-fit:contain;}",
  "body.post-page-body--travel-tip .post-toc{",
  "body.post-page-body--travel-tip .wt-toc-floating-button{",
  "body.post-page-body .post-author-profile{",
  "body.post-page-body .breadcrumbs.container.breadcrumbs--post-page{",
  ".home-search-overlay[data-site-search-overlay=\"main\"]{",
  ".wtpromo-footer{"
]) {
  assert.ok(css.includes(token), `전용 CSS 핵심 규칙 누락: ${token}`);
}

console.log(`Post render performance check passed: travel-tip uses 1 render-blocking CSS bundle (${(gzipBytes / 1024).toFixed(1)} KiB gzip).`);
