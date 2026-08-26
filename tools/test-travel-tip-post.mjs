import assert from "node:assert/strict";
import fs from "node:fs";
import { renderMarkdown, renderTocHtml } from "../lib/posts/renderer.js";
import { normalizeContentType, normalizeContentTypeDefinitions } from "../lib/travel/travel-settings.js";

const read = (file) => fs.readFileSync(file, "utf8");
const postRenderer = read("functions/post/[slug].js");
const appCss = read("public/assets/css/app.css");
const adminCss = read("public/assets/css/admin.css");
const addJs = read("public/assets/js/add.js");
const editJs = read("public/assets/js/edit.js");
const schema = read("db/schema.sql");
const migration = read("db/migrations/020_rename_travel_tip_content_type.sql");

const types = normalizeContentTypeDefinitions([
  { slug: "travel_tip", label: "여행이 쉬워지는 작은 팁", description: "old" }
]);
assert.equal(types[0]?.label, "여행 꿀팁");
assert.equal(normalizeContentType("여행이 쉬워지는 작은 팁"), "travel_tip");
assert.equal(normalizeContentType("여행 꿀팁"), "travel_tip");
assert.match(schema, /\('travel_tip', '여행 꿀팁'/);
assert.match(migration, /SET label = '여행 꿀팁'/);

const plainToc = renderTocHtml([
  { id: "first", text: "첫 번째 소제목", level: 2 },
  { id: "detail", text: "세부 소제목", level: 3 }
], "h2,h3", { numbered: false });
assert.match(plainToc, /<ul class="post-toc__list post-toc__list--with-h3 post-toc__list--plain">/);
assert.doesNotMatch(plainToc, /post-toc__index/);
assert.doesNotMatch(plainToc, />1\.<|>1\.1</);
assert.match(plainToc, /첫 번째 소제목/);

const numberedToc = renderTocHtml([{ id: "first", text: "첫 번째", level: 2 }], "h2");
assert.match(numberedToc, /post-toc__index/);
assert.match(numberedToc, />1\.<\/span>/);

assert.match(postRenderer, /const isTravelTipPost = contentType === "travel_tip";/);
assert.match(postRenderer, /tocNumbered: !isTravelTipPost/);
assert.match(postRenderer, /isTravelTipPost \? "post-page-body--travel-tip" : ""/);
assert.match(postRenderer, /const shouldEnableFloatingToc = isTop5SeriesPost \|\| isTravelTipPost;/);
assert.match(postRenderer, /shouldEnableFloatingToc \? `<script defer src="\/assets\/js\/guide-toc-floating\.js\?v=20260815-post-toc-v7"><\/script>` : ""/);
assert.match(postRenderer, /\(isRecommendedHotelReviewPost \|\| isTravelTipPost\)[\s\S]*?\? \(row\.summary \|\| ""\)[\s\S]*?: \(row\.summary \|\| descriptionText \|\| ""\)/);
assert.match(postRenderer, /const faqSectionHtml = renderFaqSection\(faqItems, origin\);/);
assert.match(postRenderer, /\$\{faqSectionHtml\}/);
assert.match(postRenderer, /travel_tip: "여행 꿀팁"/);

assert.match(appCss, /body\.post-page-body--travel-tip \.post-shell\.post-shell--guide-style\{\s*padding-top: 40px;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-toc\{[\s\S]*?border-top: 1px solid #111;[\s\S]*?border-radius: 0;[\s\S]*?background: #fff;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-toc__index\{\s*display: none !important;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-toc__summary\{[\s\S]*?padding: 17px 10px;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-toc__body\{[\s\S]*?padding: 5px 10px 10px;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-toc__item a\{[\s\S]*?margin: 0;[\s\S]*?padding: 7px 0;[\s\S]*?background: transparent;/);
assert.match(appCss, /body\.post-page-body \.post-shell--guide-style \.post-body \.post-content a\.post-content-link--affiliate,[\s\S]*?margin-bottom: 2em;[\s\S]*?background: #000;/);
assert.match(appCss, /a\.post-content-link--normal,[\s\S]*?border-bottom: 1px dotted currentColor;[\s\S]*?background: transparent;/);
assert.match(appCss, /a\.post-content-link--normal::after,[\s\S]*?content: "↗";/);
assert.doesNotMatch(appCss, /body\.post-page-body \.post-shell--guide-style \.post-body \.post-content a,\s*body\.post-page-body \.post-body \.post-content a\{[\s\S]*?background: #000;/);
assert.doesNotMatch(appCss, /body\.post-page-body--travel-tip \.post-toc__item a:hover\{[^}]*background\s*:/);
assert.match(appCss, /@media \(max-width: 767px\) \{[\s\S]*?a\.post-content-link--affiliate[\s\S]*?width: 100%;[\s\S]*?box-sizing: border-box;[\s\S]*?text-align: center;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.post-shell--guide-style \.post-body table,[\s\S]*?preview-body--travel-tip table\{\s*table-layout: auto;/);
assert.match(appCss, /body\.post-page-body:not\(\.post-page-body--hotel-review-magazine\) \.post-shell--guide-style \.post-body \.post-content h3::before\{[^}]*height: 1px;/);
assert.match(appCss, /@media \(min-width: 768px\)\{[\s\S]*?body\.post-page-body--travel-tip \.post-shell--guide-style \.post-body \.post-content h2\{\s*font-size: 30px;/);
assert.match(appCss, /body\.post-page-body--travel-tip \.wt-toc-floating-button\{[\s\S]*?color: #111;/);

for (const editor of [addJs, editJs]) {
  assert.match(editor, /slug: "travel_tip", label: "여행 꿀팁"/);
  assert.match(editor, /numbered: \(\$\("content_type"\)\?\.value \|\| ""\) !== "travel_tip"/);
  assert.match(editor, /preview-body--travel-tip/);
  assert.match(editor, /preview-faq/);
}
assert.match(adminCss, /preview-body--travel-tip \.post-toc--plain/);

console.log("Travel tip post check passed: renamed type, numberless monochrome TOC, floating TOC, FAQ, 40px spacing, and no meta-description fallback in visible hero summary.");


const rendererSource = read("lib/posts/renderer.js");
const softBreakHtml = renderMarkdown(`📌 핵심 선택 기준\n\n후쿠오카 시내 이동 → 시티 패스\n버스 중심 규슈 여행 → 산큐패스\nJR 중심 장거리 이동 → JR 큐슈 레일패스\n관광지 입장·체험 → 규슈 펀패스`);
assert.match(softBreakHtml, /<p>📌 핵심 선택 기준<\/p>/);
assert.match(softBreakHtml, /후쿠오카 시내 이동 → 시티 패스<br \/>버스 중심 규슈 여행 → 산큐패스<br \/>JR 중심 장거리 이동 → JR 큐슈 레일패스<br \/>관광지 입장·체험 → 규슈 펀패스/);
assert.doesNotMatch(softBreakHtml, /post-markdown-callout|post-markdown-checklines/);
assert.doesNotMatch(rendererSource, /MARKDOWN_CALLOUT_TITLE_RE|MARKDOWN_CHECK_LINE_RE|renderMarkdownCallout|renderMarkdownCheckLines/);

const checkHtml = renderMarkdown(`✅ 시세 범위를 알고 가기\n✅ 제품 상태와 중량을 직접 확인하기\n✅ 여러 개를 살 때는 총액으로 흥정하기`);
assert.match(checkHtml, /✅ 시세 범위를 알고 가기<br \/>✅ 제품 상태와 중량을 직접 확인하기<br \/>✅ 여러 개를 살 때는 총액으로 흥정하기/);
assert.doesNotMatch(checkHtml, /post-markdown-checklines/);

const componentsCss = read("public/assets/css/components.css");
for (const source of [addJs, editJs]) {
  assert.match(source, /function setupEditorActionDock\(\)/);
  assert.match(source, /sidebar\.prepend\(actions\)/);
  assert.match(source, /editor-page-actions--sidebar/);
  assert.match(source, /function isMarkdownBlockStartAt\(index\)/);
  assert.match(source, /paragraphLines\.join\("\\n"\)/);
  assert.doesNotMatch(source, /MARKDOWN_CALLOUT_TITLE_RE|MARKDOWN_CHECK_LINE_RE|renderPreviewMarkdownCallout|renderPreviewMarkdownCheckLines/);
}
assert.match(componentsCss, /\.editor-sidebar \.editor-page-actions--sidebar\{[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
assert.match(componentsCss, /editor-page-actions--sidebar \.btn\{[\s\S]*font-size:12\.5px/);
assert.doesNotMatch(appCss, /post-markdown-callout|post-markdown-checklines/);

