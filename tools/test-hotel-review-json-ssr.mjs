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
const editorJs = read("public/assets/js/hotel-review-json-editor-v38.js");
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
  assert.match(html, /hotel-review-json-editor-v38\.js/);
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
assert.match(read("public/add.html"), /hotel-review-json-editor-v38\.js\?v=20261006-airport-journey-no-methods-v38/);
assert.match(read("public/edit.html"), /hotel-review-json-editor-v38\.js\?v=20261006-airport-journey-no-methods-v38/);
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
assert.doesNotMatch(css, /hrj-quick-item__hint/);
assert.match(css, /hrj-quick-card\{[^}]*border:0;[^}]*background:#fff/);
assert.match(css, /hrj-quick-grid\{[^}]*gap:0;[^}]*background:#fff/);
assert.match(css, /hrj-quick-item:nth-child\(even\)\{[^}]*border-left:1px solid #ece9e3/);
assert.match(renderer, /<span class="hrj-quick-item__value">/);
assert.match(renderer, /item\?\.desc/);
assert.match(renderer, /text\(options\.guestRating\) \|\| text\(hotel\.guestRating\)/);
assert.match(renderer, /return `\$\{shown\}\+`/);
assert.match(post, /parsedHotelReviewData\?\.hotel\?\.guestRating/);
assert.doesNotMatch(renderer, /hrj-quick-item__hint/);
assert.match(renderer, /QUICK_OVERVIEW_ORDER/);
assert.match(renderer, /맛집 접근성/);
assert.match(css, /\.hrj-booking-overview\{[^}]*grid-template-columns:minmax\(0,3fr\) minmax\(0,7fr\)[^}]*gap:58px/);
assert.match(css, /hrj-basic-info__meta/);
assert.match(css, /hrj-basic-info__facts/);
assert.match(css, /hrj-basic-info__facts-grid\{[^}]*display:grid[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(css, /hrj-basic-info__meta\{[^}]*margin-top:12px/);
assert.match(css, /hrj-basic-info__fact--wide::before\{[^}]*linear-gradient\(to right[^}]*calc\(50% - 17px\)[^}]*transparent[^}]*calc\(50% \+ 17px\)/);
assert.match(css, /hrj-basic-info__fact\{[^}]*grid-template-columns:128px minmax\(0,1fr\)[^}]*min-height:54px/);
assert.match(css, /hrj-basic-info__fact--wide\{[^}]*grid-column:1\/-1/);
assert.match(css, /hrj-basic-info__fact-label\{[^}]*font-size:15px/);
assert.match(css, /hrj-basic-info__fact-value\{[^}]*font-size:15px/);
assert.doesNotMatch(css, /hrj-basic-info__fact-value--accent/);
assert.doesNotMatch(css, /hrj-basic-info__feature-icon/);
assert.doesNotMatch(css, /\.hrj-mobile-decision/);
assert.doesNotMatch(css, /\.hrj-mobile-toc/);
assert.match(post, /hotel-review-json\.css\?v=20261008-map-panels-bottom0-attribution-v52/);
assert.match(css, /hrj-basic-info__title\{[^}]*font-size:25px/);
assert.doesNotMatch(css, /hrj-basic-info__title\{[^}]*word-break:/);
assert.match(css, /hrj-basic-info__value\{[^}]*font-size:15px/);
assert.match(css, /\.hotel-review-json-page \.hrj-chapter \.hrj-feature-item__title\{[^}]*margin:0/);
assert.match(css, /@media\(max-width:820px\)\{[\s\S]*?hrj-basic-info__title\{[^}]*font-size:25px/);
assert.match(css, /@media\(max-width:460px\)\{[\s\S]*?hrj-basic-info__title\{[^}]*font-size:25px/);
assert.match(css, /@media\(max-width:820px\)\{[\s\S]*?hrj-basic-info__facts-grid\{[^}]*grid-template-columns:1fr/);
assert.match(css, /@media\(max-width:460px\)\{[\s\S]*?hrj-basic-info__fact\{[^}]*grid-template-columns:112px minmax\(0,1fr\)[^}]*min-height:50px/);
assert.match(css, /hrj-quick-card\{[^}]*margin:48px 0 0[^}]*border-top:1px solid #e8e4dc[^}]*border-radius:0/);
assert.match(renderer, /renderFitSectionBlocks/);
assert.match(renderer, /잘 맞는 여행 스타일/);
assert.match(renderer, /잘 맞지 않는 여행 스타일/);
assert.match(css, /hrj-chapter--fit \.hrj-fit-editorial\{[^}]*margin-top:38px/);
assert.match(css, /hrj-section-subheading::before\{[^}]*width:6px[^}]*height:26px[^}]*border-radius:999px[^}]*background:#5865d8/);
assert.match(css, /hrj-fit-editorial__title\.hrj-section-subheading::before\{[^}]*width:7px[^}]*height:30px/);
assert.match(css, /hrj-feature-item__title\.hrj-section-subheading::before\{[^}]*width:5px[^}]*height:24px/);
assert.match(css, /hrj-location-fit__head \.hrj-section-subheading::before\{[^}]*width:5px[^}]*height:22px/);
assert.doesNotMatch(css, /hrj-location-fit__icon/);
assert.match(css, /hrj-fit-criterion\{[^}]*border-top:1px solid var\(--hrj-line\)/);
assert.match(css, /@media\(max-width:460px\)\{[\s\S]*?hrj-basic-info__fact-value\{[^}]*font-size:14px/);
assert.match(post, /hotel-review-map\.js\?v=20261008-map-panels-bottom0-attribution-v52/);
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
const desktopTypographyCss = desktopCss.replace(/\.hotel-review-json-page \.leaflet-control-attribution\{[^}]*\}/g, "");
const desktopFontSizes = [
  ...desktopTypographyCss.matchAll(/font-size\s*:\s*([0-9]+(?:\.[0-9]+)?)px/g),
  ...desktopTypographyCss.matchAll(/font\s*:[^;{}]*?\b([0-9]+(?:\.[0-9]+)?)px(?=\/|\s)/g)
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
assert.match(css, /\.hrj-chapter--shopping-food/);
assert.doesNotMatch(css, /\.hrj-lifestyle-summary/);
assert.match(css, /\.hrj-feature-list/);
assert.doesNotMatch(renderer, /hrj-lifestyle-summary/);
assert.match(renderer, /title: "외식 생활권"/);
assert.match(renderer, /title: "쇼핑 동선"/);
assert.match(renderer, /title: "숙소 복귀"/);
assert.match(renderer, /renderShoppingFoodBlocks/);
assert.match(renderer, /renderHotelFeaturesBlocks/);
assert.match(renderer, /isShoppingFood/);
assert.match(renderer, /isHotelFeatures/);
assert.doesNotMatch(renderer, /methods는 1~3개여야 합니다/);
assert.doesNotMatch(editorJs, /airportJourney\.methods는 1~3개여야 합니다/);
assert.match(css, /\.hrj-location-fit/);
assert.match(css, /\.hrj-airport-journey/);
assert.match(css, /\.hrj-chapter--attractions-transport/);
assert.match(css, /\.hrj-attractions-transport-summary/);
assert.doesNotMatch(css, /\.hrj-chapter--attractions-transport \.hrj-insight/);
assert.match(css, /hrj-map-panels\{[^}]*position:absolute[^}]*bottom:0/);
assert.match(css, /leaflet-control-attribution\{[^}]*font-size:8px!important[^}]*background:transparent!important[^}]*padding:0 14px!important/);
assert.doesNotMatch(css, /hrj-map-canvas-wrap \.leaflet-bottom\.leaflet-right\{[^}]*bottom:/);
assert.doesNotMatch(css, /--hrj-map-panel-inset/);
assert.doesNotMatch(mapJs, /syncMapControlClearance/);
assert.match(css, /@media\(max-width:720px\)\{[\s\S]*?hrj-map-panels\{[^}]*bottom:0/);
assert.match(css, /hrj-map-panel\{[^}]*display:flex[^}]*flex-wrap:nowrap[^}]*overflow-x:auto/);
assert.doesNotMatch(css, /hrj-map-overlay/);
assert.doesNotMatch(mapJs, /data-hrj-map-overlay/);
assert.doesNotMatch(css, /hrj-map-panel\{[^}]*display:grid/);
assert.match(css, /hrj-map-panel\{[^}]*display:flex[^}]*overflow-x:auto/);
assert.match(css, /hrj-map-place\{[^}]*flex:0 0 230px/);
assert.match(css, /@media\(max-width:720px\)\{[\s\S]*?hrj-map-place\{[^}]*flex-basis:205px/);
assert.match(css, /hrj-map-place__body strong\{[^}]*text-overflow:ellipsis/);
assert.match(css, /hrj-map-place__travel/);
assert.doesNotMatch(renderer, /hrj-airport-journey__methods|data-hrj-airport-method-toggle|data-hrj-airport-method-more|hrj-airport-method/);
assert.doesNotMatch(renderer, /hrj-airport-journey__methods-head|공항에서 호텔까지 가는 방법/);
assert.doesNotMatch(css, /hrj-airport-journey__methods-head/);
assert.match(renderer, /역에서 호텔까지/);
assert.match(css, /hrj-access-summary__list\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
assert.match(css, /hrj-access-summary__desc\{display:block/);
assert.match(css, /hrj-airport-journey__head\{[^}]*display:flex[^}]*justify-content:space-between/);
assert.doesNotMatch(css, /hrj-airport-journey__methods|hrj-airport-journey__toggle|hrj-airport-journey__more|hrj-airport-method/);
assert.doesNotMatch(mapJs, /initAirportJourneyMethods|data-hrj-airport-method-toggle|data-hrj-airport-method-more/);
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
assert.doesNotMatch(mapJs, /data-hrj-location-summary-copy/);
assert.doesNotMatch(mapJs, /initLocationSummaryCopy/);
assert.doesNotMatch(mapJs, /navigator\.clipboard|execCommand\(["\']copy["\']\)/);
assert.doesNotMatch(css, /hrj-location-summary__copy/);
assert.match(mapJs, /setPrefix\(false\)/);
assert.match(mapJs, /OpenStreetMap contributors/);
assert.match(mapJs, /L\.polyline|polyline\(/);
assert.match(mapJs, /data-hrj-map-tab/);
assert.match(mapJs, /centerSelectedPlace/);
assert.match(mapJs, /panel\.scrollTo\(\{ left: Math\.max\(0, left\), behavior \}\)/);
assert.match(mapJs, /getActivePanelBottomInset/);
assert.match(mapJs, /ensureSelectedMarkerVisible/);
assert.match(mapJs, /safeMarkerBottom = panelTop - 18/);
assert.match(mapJs, /map\.panBy\(\[0, Math\.ceil\(overlap\)\]/);
assert.match(mapJs, /panelInset \+ \(mobile \? 28 : 34\)/);
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
