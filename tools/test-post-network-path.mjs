import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync('functions/post/[slug].js', 'utf8');

assert.match(source, /POST_RENDER_VERSION = "20260909-post-layout-v56"/);
assert.match(source, /const relatedRowsPromise =/);
assert.match(source, /const popularRowsPromise =/);
assert.match(source, /const destinationDataPromise =/);
assert.match(source, /await Promise\.all\(\[/);
assert.match(source, /x-blog-render-version/);
assert.match(source, /x-post-style-bundle/);
assert.match(
  source,
  /\$\{isDraftPreview \? `<script src="\/assets\/js\/admin-ui\.js\?v=20260721NoHeaderLogoutV2" defer><\/script>` : ""\}/,
  'admin-ui.js는 공개 post가 아니라 초안 미리보기에서만 로드되어야 합니다.'
);

const travelCssBranch = source.match(/\$\{isTravelTipPost\s*\? `([^`]+)`\s*:\s*`([\s\S]*?)`\}/);
assert.ok(travelCssBranch, 'travel-tip CSS 분기 확인 실패');
assert.match(travelCssBranch[1], /post-public\.css/);
assert.doesNotMatch(travelCssBranch[1], /app\.css|components\.css|travel-core\.css|site-header\.css/);

console.log('post network path check: OK');
