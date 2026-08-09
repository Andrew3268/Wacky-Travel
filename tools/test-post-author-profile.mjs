import assert from "node:assert/strict";
import fs from "node:fs";

const renderer = fs.readFileSync("functions/post/[slug].js", "utf8");
const css = fs.readFileSync("public/assets/css/travel-core.css", "utf8");
const componentsCss = fs.readFileSync("public/assets/css/components.css", "utf8");

assert.match(renderer, /POST_RENDER_VERSION = "20260809-post-layout-v28"/);
assert.match(renderer, /import \{ normalizeContentType \} from "\.\.\/\.\.\/lib\/travel\/travel-settings\.js";/);
assert.match(renderer, /const contentType = normalizeContentType\(row\.content_type \|\| ""\);/);
assert.match(renderer, /class="post-magazine-head post-magazine-head--title"/);
assert.match(renderer, /<h1 class="h1 post-title post-magazine-title"[^>]*>[\s\S]*?<\/h1>\s*\$\{isRecommendedHotelReviewPost \? `<div class="post-hotel-feature-row">\$\{hotelFeatureBadgesHtml\}\$\{magazineAdminActionsHtml\}<\/div>` : ""\}\s*\$\{magazineAuthorProfileHtml\}\s*<\/div>\s*\$\{coverImageHtml\}/);
assert.match(renderer, /class="post-author-profile"[^>]*itemprop="author"/);
assert.match(renderer, /class="post-author-profile__avatar"[^>]*>프로필<\/span>/);
assert.match(renderer, /class="post-author-profile__body"/);
assert.match(renderer, /class="post-author-profile__name"[^>]*href="\/about\/"[^>]*rel="author"[^>]*><span itemprop="name">\$\{escapeHtml\(authorName\)\}<\/span><\/a>/);
assert.match(renderer, /class="post-author-profile__meta"[^>]*>[\s\S]*?<time datetime="\$\{escapeHtml\(publishedIso \|\| ""\)\}">발행 \$\{escapeHtml\(publishedDate\)\}<\/time>[\s\S]*?post-author-profile__separator[\s\S]*?<time datetime="\$\{escapeHtml\(updatedIso \|\| ""\)\}">수정 \$\{escapeHtml\(updatedDate\)\}<\/time>/);

const h1Index = renderer.indexOf('<h1 class="h1 post-title post-magazine-title"');
const badgeIndex = renderer.indexOf('${isRecommendedHotelReviewPost ? `<div class="post-hotel-feature-row">${hotelFeatureBadgesHtml}${magazineAdminActionsHtml}</div>` : ""}', h1Index);
const profileIndex = renderer.indexOf('${magazineAuthorProfileHtml}', badgeIndex);
const coverIndex = renderer.indexOf('${coverImageHtml}', profileIndex);
assert.ok(
  h1Index >= 0 && badgeIndex > h1Index && profileIndex > badgeIndex && coverIndex > profileIndex,
  "H1 → hotel feature badges → author profile → cover order must be preserved"
);


assert.match(renderer, /isRecommendedHotelReviewPost \? \(row\.summary \|\| ""\) : \(row\.summary \|\| descriptionText \|\| ""\)/);
assert.match(renderer, /class="wt-toc-floating-button" data-toc-floating/);
assert.match(renderer, /isTop5SeriesPost \? `<script defer src="\/assets\/js\/guide-toc-floating\.js\?v=20260807-top5-toc-v6"><\/script>` : ""/);

const appCss = fs.readFileSync("public/assets/css/app.css", "utf8");
const floatingTocJs = fs.readFileSync("public/assets/js/guide-toc-floating.js", "utf8");
const recommendedH3Rule = appCss.match(/body\.post-page-body--hotel-review-magazine:not\(\.post-page-body--top5-series\) \.post-body \.post-content h3\{([\s\S]*?)\}/)?.[1] || "";
assert.match(recommendedH3Rule, /font-size: 17px;/);
assert.match(recommendedH3Rule, /color: #333;/);
assert.match(recommendedH3Rule, /border-top: 1px solid #ddd;/);
assert.match(recommendedH3Rule, /border-bottom: 1px solid #ddd;/);
assert.match(floatingTocJs, /document\.body\.classList\.contains\('post-page-body--top5-series'\)/);
assert.match(floatingTocJs, /postContent\.querySelectorAll\('h2\[id\]'\)/);
assert.doesNotMatch(floatingTocJs, /h2\[id\], h3\[id\]/);
assert.match(floatingTocJs, /figure\.post-style-hotel-image/);
assert.match(floatingTocJs, /heading\.querySelector\('\.post-h2-text'\)/);
assert.match(floatingTocJs, /sectionImage\.id = sectionId/);
assert.match(floatingTocJs, /target\.scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\)/);
assert.match(css, /html body:not\(\.post-page-body\):not\(\.wt-mobile-heading-noop-a\)[^\{]*h3:not\(\.travel-card__title\) \{[\s\S]*?font-size: 20px !important;/);
assert.match(css, /body\.post-page-body \.post-author-profile\{[\s\S]*?display:flex;[\s\S]*?align-items:center;[\s\S]*?width:100%;[\s\S]*?margin:20px 0;[\s\S]*?padding:10px;[\s\S]*?border-top:1px solid #ccc;[\s\S]*?border-bottom:1px solid #ccc;/);
assert.match(css, /body\.post-page-body \.post-author-profile__avatar\{[\s\S]*?width:42px;[\s\S]*?height:42px;[\s\S]*?border-radius:50%;/);
assert.match(css, /body\.post-page-body \.post-author-profile__body\{[\s\S]*?flex-direction:column;[\s\S]*?gap:3px;/);
assert.match(css, /body\.post-page-body \.post-author-profile__name\{[\s\S]*?font-size:14px;[\s\S]*?font-weight:600;/);
assert.match(css, /body\.post-page-body \.post-author-profile__meta\{[\s\S]*?color:#666;[\s\S]*?font-size:12px;/);
assert.match(css, /body\.post-page-body \.post-magazine-head--title \+ \.post-cover-wrap\{[\s\S]*?margin-top:0;[\s\S]*?margin-bottom:30px;/);

assert.match(componentsCss, /body\.post-page-body \.breadcrumbs\.container\.breadcrumbs--post-page \{[\s\S]*?width: min\(100%, var\(--container\)\);/);
assert.doesNotMatch(componentsCss, /breadcrumbs--post-page[\s\S]{0,240}calc\(100% - 32px\)/);
assert.match(css, /p\.post-style-hotel-badges\{[\s\S]*?padding:10px 0;[\s\S]*?border-top:1px solid #ccc;[\s\S]*?border-bottom:1px solid #ccc;/);

assert.match(renderer, /const floatingTocButtonHtml = isTop5SeriesPost/);
assert.doesNotMatch(renderer, /const floatingTocButtonHtml = isRecommendedHotelReviewPost/);
assert.match(renderer, /\$\{!isRecommendedHotelReviewPost \? magazineAdminActionsHtml : ""\}/);
assert.match(appCss, /post-hotel-feature-row\{[\s\S]*?justify-content: space-between;[\s\S]*?width: 100%;/);
assert.match(appCss, /body\.post-page-body--hotel-intro \.post-hotel-title-meta,[\s\S]*?color: #666;/);
assert.doesNotMatch(appCss, /post-hotel-title-meta[\s\S]{0,500}color: #666 !important;/);

console.log("Post author profile check passed: H1 → hotel badges → author strip → cover, full-width breadcrumbs, 10px feature-badge padding.");

assert.match(renderer, /const authorName = "Be Stayable Editor";/);
assert.match(renderer, /const authorUrl = `\$\{origin\}\/about\/`;/);
assert.match(renderer, /"@id": authorId,[\s\S]*?name: authorName,[\s\S]*?url: authorUrl/);

const about = fs.readFileSync("public/about/index.html", "utf8");
assert.match(about, /"@type"\s*:\s*"AboutPage"/);
assert.match(about, /"@id"\s*:\s*"https:\/\/bestayable\.com\/about\/#author"/);
assert.match(about, /"name"\s*:\s*"Be Stayable Editor"/);
assert.match(about, /id="editorial-policy"/);
assert.match(about, />콘텐츠 작성 기준</);
assert.ok(about.includes('href="/about/#editorial-policy">편집 원칙</a>'));
assert.ok(renderer.includes('href="/about/#editorial-policy">편집 원칙</a>'));
assert.match(about, /Be Stayable Editor는 호텔의 위치, 객실, 시설, 실제 이용후기를 바탕으로 여행 목적에 맞는 숙소를 분석하고 추천합니다\./);
assert.doesNotMatch(about, /한 명의 운영자가 콘텐츠를 직접 기획하고 작성하며 검수하는/);
assert.match(about, /<section class="about-section" id="author"/);

assert.match(about, /여행지를 선택하고 나에게 맞는 호텔을 찾아보세요\./);
assert.doesNotMatch(about, /여행지별 호텔 추천과 숙소 선택 기준을 살펴보세요\./);
