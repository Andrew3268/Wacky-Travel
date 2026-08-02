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
  assert.match(html, /style-hotel-editor\.js\?v=20260802-style-hotel-editor-v2/);
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

const editJs = read("public/assets/js/edit.js");
const settingsLoadIndex = editJs.indexOf("await loadTravelSettings(loadedDestinationSlug");
const editorRestoreIndex = editJs.indexOf("StyleHotelEditor?.loadFromContent(loadedEditorContentMd", settingsLoadIndex);
assert.ok(settingsLoadIndex >= 0 && editorRestoreIndex > settingsLoadIndex, "edit restore must run after travel settings are loaded");
assert.match(read("public/edit.html"), /edit\.js\?v=20260802-style-hotel-edit-v2/);

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
    markdown: "## 호텔 A\n\n호텔 A 본문입니다.",
    buttonText: "호텔 A 객실 확인",
    buttonLink: "https://www.agoda.com/a"
  },
  {
    source: "agoda",
    image: "https://pix8.agoda.net/hotelImages/b.jpg",
    srcset: "https://pix8.agoda.net/hotelImages/b.jpg 1x",
    imageLink: "https://www.agoda.com/partners/partnersearch.aspx?hid=2",
    alt: "호텔 B 외관",
    markdown: "## 호텔 B\n\n호텔 B 본문입니다.",
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
assert.equal(parsed.ending, ending);

const html = renderMarkdown(md, { origin: "https://bestayable.com" });
const order = [
  html.indexOf("post-style-hotel-image"),
  html.indexOf("호텔 A"),
  html.indexOf("post-style-hotel-button"),
  html.lastIndexOf("어떤 호텔을 고를까")
];
assert.ok(order.every((value) => value >= 0), `missing rendered block: ${order.join(",")}`);
assert.ok(order[0] < order[1] && order[1] < order[2] && order[2] < order[3], `wrong output order: ${order.join(",")}`);
assert.doesNotMatch(stripStyleHotelTokens(md), /STYLE_HOTEL_/);

for (const file of ["public/assets/js/add.js", "public/assets/js/edit.js"]) {
  const js = read(file);
  assert.match(js, /StyleHotelEditor\.validateAndSync/);
  assert.match(js, /parseStyleHotelImageToken/);
  assert.match(js, /parseStyleHotelButtonToken/);
}
assert.match(read("public/assets/js/edit.js"), /StyleHotelEditor\?\.loadFromContent/);
assert.match(read("functions/post/[slug].js"), /stripStyleHotelTokens/);

console.log("Style hotel editor check passed: 1-7 sets, edit restore, image → markdown → button → ending order.");
