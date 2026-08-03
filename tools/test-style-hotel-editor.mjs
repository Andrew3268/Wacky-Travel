import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { renderMarkdown, stripStyleHotelTokens } from "../lib/posts/renderer.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

for (const file of ["public/add.html", "public/edit.html"]) {
  const html = read(file);
  assert.match(html, /id="standardContentMarkdownEditor"/);
  assert.match(html, /id="styleHotelMarkdownEditor"/);
  assert.match(html, /id="styleHotelSetList"/);
  assert.match(html, /id="styleHotelEndingMarkdown"/);
  assert.match(html, /style-hotel-editor\.js\?v=20260803-style-hotel-editor-v6/);
  assert.equal((html.match(/id="content_md"/g) || []).length, 1, `${file}: content_md must remain a single backing field`);
  assert.match(html, /id="inlineImageEditorCard"[^>]*class="card editor-option-card inline-image-box"|class="card editor-option-card inline-image-box"[^>]*id="inlineImageEditorCard"/, `${file}: inline-image card must remain addressable`);
  assert.match(html, /본문 이미지 추가/, `${file}: existing inline-image section must remain for other content types`);
}

const editorCode = read("public/assets/js/style-hotel-editor.js");
const sandbox = {
  window: {},
  document: { addEventListener() {}, getElementById() { return null; } },
  URL,
  encodeURIComponent,
  decodeURIComponent,
  Event: class {},
  console
};
vm.createContext(sandbox);
vm.runInContext(editorCode, sandbox);

assert.match(editorCode, /function syncInlineImageBoxVisibility\(hidden\)/);
assert.match(editorCode, /syncInlineImageBoxVisibility\(nextActive\)/);
assert.match(editorCode, /data-alt-field/);
assert.match(editorCode, /const hideAlt = source === "agoda"/);
assert.match(editorCode, /item\.source !== "agoda" && !item\.alt/);
assert.match(editorCode, /buttonText: "잔여 객실 확인"/);
assert.match(editorCode, /data-field="starRating"/);
assert.match(editorCode, /data-field="guestRating"/);
assert.match(editorCode, /data-field="badge"/);
assert.match(editorCode, /data-field="imageBadge"/);
assert.match(editorCode, /style-hotel-badge-fields/);
assert.match(editorCode, /특징 뱃지/);
assert.match(editorCode, /이미지 뱃지/);
assert.match(editorCode, /"6\.5\+", "7\.0\+"/);
assert.match(editorCode, /위치 최고, 조식 맛집, 쾌적한 객실/);
assert.match(editorCode, /maxlength="120"/);

const editJs = read("public/assets/js/edit.js");
const settingsLoadIndex = editJs.indexOf("await loadTravelSettings(loadedDestinationSlug");
const editorRestoreIndex = editJs.indexOf("StyleHotelEditor?.loadFromContent(loadedEditorContentMd", settingsLoadIndex);
assert.ok(settingsLoadIndex >= 0 && editorRestoreIndex > settingsLoadIndex, "edit restore must run after travel settings are loaded");
assert.match(read("public/add.html"), /add\.js\?v=20260803-style-hotel-add-v6/);
assert.match(read("public/edit.html"), /edit\.js\?v=20260803-style-hotel-edit-v7/);

const api = sandbox.window.StyleHotelEditor;
assert.ok(api, "StyleHotelEditor API missing");
assert.equal(api.MAX_SETS, 7);

const sets = [
  {
    source: "r2",
    image: "https://cdn.example.com/a.webp",
    srcset: "",
    imageLink: "",
    alt: "호텔 A 객실",
    starRating: "5",
    guestRating: "9.0+",
    badge: "위치 최고, 조식 맛집, 쾌적한 객실",
    imageBadge: "에디터 픽",
    markdown: "**1. HOTEL A**\n\n## 호텔 A\n\n- 기존 호텔 특징 목록\n- 제거 대상 목록\n\n호텔 A 본문입니다.\n\n### 추천 객실 타입",
    buttonText: "호텔 A 객실 확인",
    buttonLink: "https://www.agoda.com/a"
  },
  {
    source: "agoda",
    image: "https://pix8.agoda.net/hotelImages/b.jpg",
    srcset: "https://pix8.agoda.net/hotelImages/b.jpg 1x",
    imageLink: "https://www.agoda.com/partners/partnersearch.aspx?hid=2",
    alt: "",
    starRating: "4",
    guestRating: "8.5+",
    badge: "가성비 추천",
    imageBadge: "가성비 픽",
    markdown: "**2. HOTEL B**\n\n## 호텔 B\n\n호텔 B 본문입니다.",
    buttonText: "호텔 B 예약 확인",
    buttonLink: "https://www.agoda.com/b"
  }
];
const ending = "## 어떤 호텔을 고를까\n\n여행 동선에 맞춰 선택하세요.";
const md = api.buildContent(sets, ending);
const parsed = api.parseContent(md);
assert.equal(parsed.structured, true);
assert.equal(parsed.sets.length, 2);
assert.equal(parsed.sets[0].markdown, sets[0].markdown);
assert.equal(parsed.sets[1].source, "agoda");
assert.equal(parsed.sets[0].starRating, "5");
assert.equal(parsed.sets[0].guestRating, "9.0+");
assert.equal(parsed.sets[0].badge, "위치 최고, 조식 맛집, 쾌적한 객실");
assert.equal(parsed.sets[0].imageBadge, "에디터 픽");
assert.equal(parsed.ending, ending);

const html = renderMarkdown(md, {
  origin: "https://bestayable.com",
  hotelSectionHeadingClasses: true,
  hotelReviewSectionImageAnchor: true,
  styleHotelSeries: true
});
const order = [
  html.indexOf("post-style-hotel-image"),
  html.indexOf("호텔 A"),
  html.indexOf("post-style-hotel-button"),
  html.lastIndexOf("어떤 호텔을 고를까")
];
assert.ok(order.every((value) => value >= 0), `missing rendered block: ${order.join(",")}`);
assert.ok(order[0] < order[1] && order[1] < order[2] && order[2] < order[3], `wrong output order: ${order.join(",")}`);
assert.match(html, /post-style-hotel-image post-inline-image--before-section-label|post-inline-image--before-section-label post-style-hotel-image/);
assert.match(html, /post-hotel-section-label post-section-label--after-image|post-section-label--after-image post-hotel-section-label/);
assert.match(html, /post-style-hotel-image-badge[^>]*>에디터 픽<\/span>/);
assert.match(html, /<section class="post-style-hotel-ending">[\s\S]*어떤 호텔을 고를까[\s\S]*<\/section>/);
assert.match(html, /post-style-hotel-meta/);
assert.match(html, /<h3[^>]*>추천 객실 타입<span class="post-style-hotel-h3-line" aria-hidden="true"><\/span><\/h3>/);
assert.match(html, />5성급</);
assert.match(html, /post-style-hotel-meta__separator[^>]*>\|<\/span>/);
assert.match(html, />★<\/span>9\.0\+</);
assert.match(html, /post-h2-text">호텔 A<\/span><\/h2>\s*<p class="post-style-hotel-badges"[^>]*>위치 최고<span class="post-style-hotel-badges__separator"[^>]*>\|<\/span>조식 맛집<span class="post-style-hotel-badges__separator"[^>]*>\|<\/span>쾌적한 객실<\/p>/);
assert.doesNotMatch(html, /기존 호텔 특징 목록|제거 대상 목록/);
assert.doesNotMatch(stripStyleHotelTokens(md), /STYLE_HOTEL_/);
const defaultButtonMd = api.buildContent([{ ...sets[0], buttonText: "" }], "");
const defaultButtonHtml = renderMarkdown(defaultButtonMd, { origin: "https://bestayable.com" });
assert.match(defaultButtonHtml, />잔여 객실 확인<\/a>/);

for (const file of ["public/assets/js/add.js", "public/assets/js/edit.js"]) {
  const js = read(file);
  assert.match(js, /StyleHotelEditor\.validateAndSync/);
  assert.match(js, /parseStyleHotelImageToken/);
  assert.match(js, /parseStyleHotelButtonToken/);
}
assert.match(read("public/assets/js/edit.js"), /StyleHotelEditor\?\.loadFromContent/);
assert.match(read("functions/post/[slug].js"), /stripStyleHotelTokens/);
assert.match(read("functions/post/[slug].js"), /POST_RENDER_VERSION = "20260803-style-hotel-h3-nowrap-v10"/);
assert.match(read("lib/posts/renderer.js"), /data\.buttonText \|\| "잔여 객실 확인"/);

const appCss = read("public/assets/css/app.css");
const travelCoreCss = read("public/assets/css/travel-core.css");
const editorCss = read("public/assets/css/style-hotel-editor.css");
assert.doesNotMatch(appCss, /여행 스타일별 호텔 추천: 호텔별 성급·평점·뱃지/);
assert.match(appCss, /p:not\(\.post-style-hotel-badges\)/);
assert.match(appCss, /p:has\(> strong:first-child:last-child\):has\(\+ h2\) \+ h2\{[\s\S]*?margin: 0 0 10px !important;/);
assert.match(travelCoreCss, /post-style-hotel-meta__item--rating\{[\s\S]*?gap:1px;/);
assert.doesNotMatch(travelCoreCss, /post-style-hotel-meta > \.post-style-hotel-meta__item\{[^}]*border/);
assert.doesNotMatch(travelCoreCss, /post-style-hotel-meta__item--rating\{[^}]*border/);
assert.match(travelCoreCss, /post-style-hotel-meta__item--rating > span\{[\s\S]*?color:inherit;/);
assert.match(travelCoreCss, /post-style-hotel-meta\{[\s\S]*?margin:12px 0 5px;[\s\S]*?color:#000;[\s\S]*?font-weight:600;/);
assert.match(travelCoreCss, /p\.post-style-hotel-badges\{[\s\S]*?margin:0 0 25px;[\s\S]*?font-size:16px;[\s\S]*?font-weight:400;/);
assert.match(travelCoreCss, /post-style-hotel-badges__separator\{[\s\S]*?margin:0 9px;/);
assert.doesNotMatch(editorCss, /preview-style-hotel-meta > \.preview-style-hotel-meta__item\{[^}]*border/);
assert.match(editorCss, /preview-style-hotel-badges__separator\{[\s\S]*?margin:0 9px;/);
assert.match(appCss, /post-page-body--top5-series \.post-body \.post-content h3\{[\s\S]*?flex-wrap: nowrap;[\s\S]*?border: 0;[\s\S]*?font-size: 17px;[\s\S]*?white-space: nowrap;/);
assert.match(appCss, /post-style-hotel-ending\{[\s\S]*?border-top: 1px solid/);
assert.match(editorCss, /preview-body--top5-series h3\{[\s\S]*?flex-wrap:nowrap;[\s\S]*?border:0;[\s\S]*?font-size:17px;[\s\S]*?white-space:nowrap;/);
assert.match(editorCss, /preview-style-hotel-ending\{[\s\S]*?border-top:1px solid/);
assert.match(editorCss, /style-hotel-badge-fields\{[\s\S]*?grid-template-columns:minmax\(0,7fr\) minmax\(0,3fr\)/);
assert.doesNotMatch(editorCss, /preview-style-hotel-meta__item--rating\{[^}]*border/);
assert.match(editorCss, /preview-style-hotel-image-badge\{[\s\S]*?background:#000;[\s\S]*?color:#fff;/);
assert.match(travelCoreCss, /post-style-hotel-image-badge\{[\s\S]*?background:#000;[\s\S]*?color:#fff;/);
assert.match(travelCoreCss, /post-style-hotel-image-badge\{[\s\S]*?top:19px;[\s\S]*?padding:8px 30px;/);
assert.match(travelCoreCss, /@media \(max-width:720px\)\{[\s\S]*?post-style-hotel-image-badge\{[\s\S]*?top:20px;[\s\S]*?padding:7px 30px;/);
assert.doesNotMatch(travelCoreCss, /post-style-hotel-meta__item\{[^}]*padding:/);
assert.doesNotMatch(appCss, /body\.post-page-body \.post-inline-image__img\{[^}]*border:/);
assert.doesNotMatch(travelCoreCss, /post-style-hotel-meta__item--badge/);

console.log("Style hotel editor check passed: 1-7 sets, star/rating separator, badges below H2, legacy lead list removal, and image → metadata → markdown → button → bordered ending order, plus top5 H3 title line.");
