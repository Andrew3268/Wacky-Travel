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
const renderer = read("lib/posts/hotel-review-json.js");
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
assert.match(editorJs, /locationSummary/);
assert.match(editorJs, /airportJourney/);
assert.match(read("public/add.html"), /hotel-review-json-editor\.js\?v=20260927-airport-journey-v22/);
assert.match(read("public/edit.html"), /hotel-review-json-editor\.js\?v=20260927-airport-journey-v22/);
assert.match(editorJs, /validateForSave/);
assert.match(editorJs, /readFile/);
assert.match(editorJs, /contentMarkdownSection/);
assert.match(editorJs, /hotelReviewPickLabel/);
assert.doesNotMatch(editorJs, /fetch\([^)]*content_json/i);

assert.match(css, /\.hotel-review-json-page/);
assert.match(css, /\.hrj-shell/);
assert.match(css, /\.hrj-review-analysis__grid/);
assert.match(css, /\.hrj-basic-info__cta/);
assert.match(css, /hrj-quick-grid\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /hrj-quick-item__top/);
assert.match(css, /hrj-quick-item__hint/);
assert.match(renderer, /QUICK_OVERVIEW_ORDER/);
assert.match(renderer, /맛집 접근성/);
assert.match(css, /\.hrj-booking-overview\{[^}]*grid-template-columns:minmax\(0,40%\) minmax\(0,60%\)/);
assert.doesNotMatch(css, /\.hrj-mobile-decision/);
assert.doesNotMatch(css, /\.hrj-mobile-toc/);
assert.match(post, /hotel-review-json\.css\?v=20261001-quick-overview-v26/);
assert.match(post, /hotel-review-map\.js\?v=20260929-attractions-airport-v27/);
assert.match(css, /@media\(max-width:720px\)|@media \(max-width:720px\)/);

// Desktop hotel-review typography must not fall below 15px.
function stripMediaBlocks(source) {
  let out = "";
  let cursor = 0;
  while (cursor < source.length) {
    const mediaIndex = source.indexOf("@media", cursor);
    if (mediaIndex === -1) { out += source.slice(cursor); break; }
    out += source.slice(cursor, mediaIndex);
    const open = source.indexOf("{", mediaIndex);
    if (open === -1) break;
    let depth = 1;
    let i = open + 1;
    while (i < source.length && depth > 0) {
      if (source[i] === "{") depth += 1;
      else if (source[i] === "}") depth -= 1;
      i += 1;
    }
    cursor = i;
  }
  return out;
}
const desktopCss = stripMediaBlocks(css);
const desktopFontSizes = [
  ...desktopCss.matchAll(/font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)px/g),
  ...desktopCss.matchAll(/font\s*:[^;{}]*?\b([0-9]+(?:\.[0-9]+)?)px(?=\/|\s)/g)
].map((match) => Number(match[1]));
assert.ok(desktopFontSizes.length > 0);
assert.ok(desktopFontSizes.every((size) => size >= 15), `Desktop hotel-review font-size below 15px: ${desktopFontSizes.filter((size) => size < 15).join(", ")}`);

// !important is reserved for late-loaded Leaflet CSS or Leaflet marker stacking only.
const importantLines = css.split("\n").filter((line) => line.includes("!important"));
for (const line of importantLines) {
  assert.match(line, /leaflet-|hrj-map-pin-wrap|hrj-map-marker--poi\.is-selected/);
}

assert.match(css, /\.hrj-location-map/);
assert.match(css, /\.hrj-location-summary/);
assert.match(css, /\.hrj-location-summary__row/);
assert.match(css, /\.hrj-location-fit/);
assert.match(css, /\.hrj-airport-journey/);
assert.match(css, /\.hrj-chapter--attractions-transport/);
assert.match(css, /\.hrj-attractions-transport-summary/);
assert.doesNotMatch(css, /\.hrj-chapter--attractions-transport \.hrj-insight/);
assert.match(css, /hrj-map-panels\{[^}]*position:absolute[^}]*bottom:0/);
assert.match(css, /hrj-map-panel\{[^}]*display:flex[^}]*flex-wrap:nowrap[^}]*overflow-x:auto/);
assert.doesNotMatch(css, /hrj-map-overlay/);
assert.doesNotMatch(mapJs, /data-hrj-map-overlay/);
assert.doesNotMatch(css, /hrj-map-panel\{[^}]*display:grid/);
assert.match(css, /hrj-map-panel\{[^}]*display:flex[^}]*overflow-x:auto/);
assert.match(css, /hrj-map-place\{[^}]*flex:0 0 230px/);
assert.match(css, /@media\(max-width:720px\)\{[\s\S]*?hrj-map-place\{[^}]*flex-basis:205px/);
assert.match(css, /hrj-map-place__body strong\{[^}]*text-overflow:ellipsis/);
assert.match(css, /hrj-map-place__travel/);
assert.match(renderer, /data-hrj-airport-method-toggle/);
assert.match(renderer, /역에서 호텔까지/);
assert.match(css, /hrj-access-summary__list\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(css, /hrj-access-summary__desc\{display:block/);
assert.match(css, /hrj-airport-journey__head\{[^}]*display:flex[^}]*justify-content:space-between/);
assert.match(css, /hrj-airport-method\{[^}]*grid-template-columns:minmax\(0,1fr\) auto/);
assert.match(mapJs, /function initAirportJourneyMethods\(\)/);
assert.match(renderer, /도보 약/);
assert.match(renderer, /차량 약/);
assert.match(css, /hrj-map-canvas-wrap\{[^}]*height:clamp\(430px,48vw,500px\)/);
assert.match(mapJs, /distanceM <= 250/);
assert.match(mapJs, /distanceM < 3000/);
assert.match(mapJs, /map\.fitBounds\(farBounds/);
assert.match(mapJs, /paddingBottomRight/);
assert.match(mapJs, /const color = "#64748B"/);
assert.match(mapJs, /querySelector\("\.hrj-map-pin"\)/);
assert.match(mapJs, /pin\?\.classList\.toggle\("is-selected", selected\)/);
assert.match(mapJs, /pin\?\.classList\.toggle\("is-dimmed", !selected\)/);
assert.match(css, /hrj-map-pin\.is-selected/);
assert.match(css, /hrj-map-pin\.is-dimmed/);
assert.doesNotMatch(css, /hrj-map-marker--poi,[\s\S]*opacity:1!important/);
assert.match(mapJs, /opacity: 0\.46/);
assert.match(mapJs, /maxZoom = 18/);
assert.match(mapJs, /map\.createPane\("hrjRoutePane"\)/);
assert.doesNotMatch(mapJs, /L\.circleMarker\(target/);
assert.match(css, /hrj-map-pin::after/);
assert.match(css, /\.hrj-map-pin/);
assert.match(css, /\.hrj-map-label--hotel|\.hrj-map-label/);
assert.match(mapJs, /IntersectionObserver/);
assert.match(mapJs, /data-hrj-location-summary-copy/);
assert.match(mapJs, /initLocationSummaryCopy/);
assert.match(mapJs, /setPrefix\(false\)/);
assert.match(mapJs, /OpenStreetMap contributors/);
assert.match(mapJs, /L\.polyline|polyline\(/);
assert.match(mapJs, /data-hrj-map-tab/);
assert.match(mapJs, /centerSelectedPlace/);
assert.match(mapJs, /panel\.scrollTo\(\{ left: Math\.max\(0, left\), behavior \}\)/);
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
assert.doesNotMatch(mapJs, /marker\.setOpacity\(/);
assert.doesNotMatch(mapJs, /hotelMarker\.setOpacity\(/);
assert.doesNotMatch(mapJs, /item\.nameLocal|item\.nameEn|distanceLabel/);
assert.doesNotMatch(css, /hrj-map-marker--poi:not\(\.is-focused-poi\)/);
assert.match(css, /hrj-map-pin\.is-selected/);
assert.match(css, /hrj-map-marker--poi\.is-selected\{z-index:1000!important\}/);
assert.match(css, /scale\(1\.22\)/);
assert.match(css, /0 0 0 3px #fff,0 0 0 8px/);
assert.match(mapJs, /function hotelIcon\(\)/);
assert.doesNotMatch(mapJs, /hrj-map-label__text|>호텔<\/span>/);
assert.match(mapJs, /interactive: true/);
assert.match(mapJs, /hotelMarker\.on\("click"/);
assert.doesNotMatch(mapJs, /showHotelOverlay|renderOverlay|scheduleOverlayPosition|overlayClose/);
assert.match(mapJs, /connectToItem\(item\)/);
assert.match(mapJs, /function poiIcon\(/);
assert.doesNotMatch(mapJs, /function markerIcon\(/);
assert.doesNotMatch(mapJs, /\.bindPopup\(/);
assert.match(mapJs, /map\.on\("click"/);
assert.match(mapJs, /map\.getBoundsZoom\(/);
assert.match(mapJs, /map\.setView\(hotelLatLng/);
assert.match(mapJs, /animate: false/);
assert.match(post, /POST_RENDER_VERSION = "20260928-post-layout-v70"/);
assert.match(post, /max-age=0, s-maxage=600, must-revalidate/);

console.log("Hotel review JSON SSR integration check passed: v1.1 map data, lazy Leaflet runtime, attribution, admin validation, renderer branch, scoped CSS, and v1.0 fallback wiring are present.");
