import assert from "node:assert/strict";
import fs from "node:fs";

const renderer = fs.readFileSync("functions/post/[slug].js", "utf8");
const css = fs.readFileSync("public/assets/css/travel-core.css", "utf8");
const componentsCss = fs.readFileSync("public/assets/css/components.css", "utf8");

assert.match(renderer, /POST_RENDER_VERSION = "20260807-post-review-v21"/);
assert.match(renderer, /class="post-magazine-head post-magazine-head--title"/);
assert.match(renderer, /<h1 class="h1 post-title post-magazine-title"[^>]*>[\s\S]*?<\/h1>\s*\$\{isRecommendedHotelReviewPost \? hotelFeatureBadgesHtml : ""\}\s*\$\{magazineAuthorProfileHtml\}\s*<\/div>\s*\$\{coverImageHtml\}/);
assert.match(renderer, /class="post-author-profile"[^>]*itemprop="author"/);
assert.match(renderer, /class="post-author-profile__avatar"[^>]*>프로필<\/span>/);
assert.match(renderer, /class="post-author-profile__body"/);
assert.match(renderer, /class="post-author-profile__name"[^>]*href="\/about\/"[^>]*rel="author"[^>]*><span itemprop="name">\$\{escapeHtml\(authorName\)\}<\/span><\/a>/);
assert.match(renderer, /class="post-author-profile__meta"[^>]*>[\s\S]*?<time datetime="\$\{escapeHtml\(publishedIso \|\| ""\)\}">발행 \$\{escapeHtml\(publishedDate\)\}<\/time>[\s\S]*?post-author-profile__separator[\s\S]*?<time datetime="\$\{escapeHtml\(updatedIso \|\| ""\)\}">수정 \$\{escapeHtml\(updatedDate\)\}<\/time>/);

const h1Index = renderer.indexOf('<h1 class="h1 post-title post-magazine-title"');
const badgeIndex = renderer.indexOf('${isRecommendedHotelReviewPost ? hotelFeatureBadgesHtml : ""}', h1Index);
const profileIndex = renderer.indexOf('${magazineAuthorProfileHtml}', badgeIndex);
const coverIndex = renderer.indexOf('${coverImageHtml}', profileIndex);
assert.ok(
  h1Index >= 0 && badgeIndex > h1Index && profileIndex > badgeIndex && coverIndex > profileIndex,
  "H1 → hotel feature badges → author profile → cover order must be preserved"
);


assert.match(renderer, /isRecommendedHotelReviewPost \? \(row\.summary \|\| ""\) : \(row\.summary \|\| descriptionText \|\| ""\)/);
assert.match(renderer, /class="wt-toc-floating-button" data-toc-floating/);
assert.match(renderer, /guide-toc-floating\.js\?v=20260807-post-review-toc-v4/);

const appCss = fs.readFileSync("public/assets/css/app.css", "utf8");
const floatingTocJs = fs.readFileSync("public/assets/js/guide-toc-floating.js", "utf8");
assert.match(appCss, /body\.post-page-body--hotel-review-magazine:not\(\.post-page-body--top5-series\) \.post-body \.post-content h3\{[\s\S]*?font-size: 17px !important;[\s\S]*?border-top: 1px solid #ddd !important;[\s\S]*?border-bottom: 1px solid #ddd !important;/);
assert.match(floatingTocJs, /body\.post-page-body--recommended-hotel-review \.post-toc/);
assert.match(floatingTocJs, /postContent\.querySelectorAll\('h2\[id\], h3\[id\]'\)/);
assert.match(css, /body\.post-page-body \.post-author-profile\{[\s\S]*?display:flex;[\s\S]*?align-items:center;[\s\S]*?width:100%;[\s\S]*?margin:20px 0;[\s\S]*?padding:10px;[\s\S]*?border-top:1px solid #ccc;[\s\S]*?border-bottom:1px solid #ccc;/);
assert.match(css, /body\.post-page-body \.post-author-profile__avatar\{[\s\S]*?width:42px;[\s\S]*?height:42px;[\s\S]*?border-radius:50%;/);
assert.match(css, /body\.post-page-body \.post-author-profile__body\{[\s\S]*?flex-direction:column;[\s\S]*?gap:3px;/);
assert.match(css, /body\.post-page-body \.post-author-profile__name\{[\s\S]*?font-size:14px;[\s\S]*?font-weight:600;/);
assert.match(css, /body\.post-page-body \.post-author-profile__meta\{[\s\S]*?color:#666;[\s\S]*?font-size:12px;/);
assert.match(css, /body\.post-page-body \.post-magazine-head--title \+ \.post-cover-wrap\{[\s\S]*?margin-top:0;[\s\S]*?margin-bottom:30px;/);

assert.match(componentsCss, /body\.post-page-body \.breadcrumbs\.container\.breadcrumbs--post-page \{[\s\S]*?width: min\(100%, var\(--container\)\);/);
assert.doesNotMatch(componentsCss, /breadcrumbs--post-page[\s\S]{0,240}calc\(100% - 32px\)/);
assert.match(css, /p\.post-style-hotel-badges\{[\s\S]*?padding:10px 0;[\s\S]*?border-top:1px solid #ccc;[\s\S]*?border-bottom:1px solid #ccc;/);

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
