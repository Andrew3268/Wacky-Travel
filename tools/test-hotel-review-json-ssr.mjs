import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const post = read("functions/post/[slug].js");
const postsApi = read("functions/api/posts.js");
const postEditApi = read("functions/api/posts/[slug].js");
const addHtml = read("public/add.html");
const editHtml = read("public/edit.html");
const addJs = read("public/assets/js/add.js");
const editJs = read("public/assets/js/edit.js");
const editorJs = read("public/assets/js/hotel-review-json-editor.js");
const css = read("public/assets/css/hotel-review-json.css");
const mapJs = read("public/assets/js/hotel-review-map.js");
const schema = read("db/schema.sql");
const migration = read("db/migrations/023_hotel_review_json_content.sql");

for (const source of [schema, migration]) {
  assert.match(source, /content_format\s+TEXT\s+DEFAULT\s+'markdown'/i);
  assert.match(source, /content_json\s+TEXT\s+DEFAULT\s+''/i);
}

assert.match(post, /isJsonHotelReviewPost/);
assert.match(post, /renderHotelReviewLayout\(/);
assert.match(post, /parseHotelReviewJson\(/);
assert.match(post, /validateHotelReviewData\(/);
assert.match(post, /hotel-review-json\.css/);
assert.match(post, /post-page-body--hotel-review-json/);
assert.match(post, /x-post-style-bundle[\s\S]*hotel-review-json/);

for (const api of [postsApi, postEditApi]) {
  assert.match(api, /content_format/);
  assert.match(api, /content_json/);
  assert.match(api, /validateHotelReviewJson\(/);
  assert.match(api, /deriveHotelReviewPostFields\(/);
}
assert.match(postsApi, /LOWER\(COALESCE\(content_json, ''\)\) LIKE \?/);

for (const html of [addHtml, editHtml]) {
  assert.match(html, /id="hotelReviewJsonEditor"/);
  assert.match(html, /id="hotelReviewJsonFile"/);
  assert.match(html, /id="hotelReviewJsonValue"/);
  assert.match(html, /id="content_format"/);
  assert.match(html, /id="hotelReviewPickLabel"/);
  assert.match(html, /id="hotelReviewPriceUrl"/);
  assert.match(html, /hotel-review-json-editor\.js/);
}

for (const editor of [addJs, editJs]) {
  assert.match(editor, /HotelReviewJsonEditor/);
  assert.match(editor, /isHotelReviewJson/);
  assert.match(editor, /content_json/);
  assert.match(editor, /content_format/);
  assert.match(editor, /hotelReviewPickLabel/);
}

assert.match(editorJs, /hotel-review-v1\.1/);
assert.match(editorJs, /hotel-review-v1\.0/);
assert.match(editorJs, /locationMap/);
assert.match(editorJs, /BLOCK_TYPES/);
assert.match(editorJs, /validateForSave/);
assert.match(editorJs, /readFile/);
assert.match(editorJs, /contentMarkdownSection/);
assert.match(editorJs, /hotelReviewPickLabel/);
assert.doesNotMatch(editorJs, /fetch\([^)]*content_json/i);

assert.match(css, /\.hotel-review-json-page/);
assert.match(css, /\.hrj-shell/);
assert.match(css, /\.hrj-review-analysis__grid/);
assert.match(css, /\.hrj-basic-info__cta/);
assert.match(css, /\.hrj-booking-overview\{[^}]*grid-template-columns:minmax\(0,40%\) minmax\(0,60%\)/);
assert.doesNotMatch(css, /\.hrj-mobile-decision/);
assert.doesNotMatch(css, /\.hrj-mobile-toc/);
assert.match(post, /hotel-review-json\.css\?v=20260924-map-panel-icons-v12/);
assert.match(post, /hotel-review-map\.js\?v=20260924-map-panel-icons-v12/);
assert.match(css, /@media\(max-width:720px\)|@media \(max-width:720px\)/);

assert.match(css, /\.hrj-location-map/);
assert.match(css, /hrj-map-panel\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(css, /@media\(max-width:720px\)\{[\s\S]*?hrj-map-panel\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /hrj-map-place__body strong\{[^}]*text-overflow:ellipsis/);
assert.match(css, /hrj-map-overlay__pill/);
assert.match(css, /hrj-map-overlay__close/);
assert.match(css, /hrj-map-pin::after/);
assert.match(css, /\.hrj-map-pin/);
assert.match(css, /\.hrj-map-label--hotel|\.hrj-map-label/);
assert.match(mapJs, /IntersectionObserver/);
assert.match(mapJs, /setPrefix\(false\)/);
assert.match(mapJs, /OpenStreetMap contributors/);
assert.match(mapJs, /L\.polyline|polyline\(/);
assert.match(mapJs, /data-hrj-map-tab/);
assert.doesNotMatch(mapJs, /navigator\.geolocation|map\.locate\(/);

assert.match(css, /\.hrj-map-controls/);
assert.match(css, /\.hrj-map-control/);
assert.match(mapJs, /data-hrj-map-center/);
assert.match(mapJs, /data-hrj-map-all/);
assert.match(mapJs, /map\.setView\(hotelLatLng/);
assert.match(mapJs, /13\.5/);
assert.match(mapJs, /map\.fitBounds\(activeBounds/);
assert.match(mapJs, /is-poi-focused/);
assert.match(mapJs, /is-focused-poi/);
assert.match(mapJs, /marker\.setOpacity\(1\)/);
assert.match(mapJs, /hotelMarker\.setOpacity\(1\)/);
assert.doesNotMatch(mapJs, /item\.nameLocal|item\.nameEn|distanceLabel/);
assert.doesNotMatch(css, /hrj-map-marker--poi:not\(\.is-focused-poi\)/);
assert.match(css, /hrj-map-marker--poi\.is-selected \.hrj-map-pin/);
assert.match(mapJs, /function poiIcon\(/);
assert.doesNotMatch(mapJs, /function markerIcon\(/);
assert.doesNotMatch(mapJs, /\.bindPopup\(/);
assert.match(mapJs, /data-hrj-map-overlay-close/);
assert.match(mapJs, /overlayClose\.addEventListener\("click"/);
assert.match(mapJs, /map\.on\("click"/);
assert.match(mapJs, /setTimeout\(\(\) => \{/);
assert.match(mapJs, /animate: false/);
assert.match(post, /POST_RENDER_VERSION = "20260924-post-layout-v60"/);
assert.match(post, /max-age=0, s-maxage=600, must-revalidate/);

console.log("Hotel review JSON SSR integration check passed: v1.1 map data, lazy Leaflet runtime, attribution, admin validation, renderer branch, scoped CSS, and v1.0 fallback wiring are present.");
