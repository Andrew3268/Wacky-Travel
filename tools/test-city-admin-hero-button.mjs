import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationsDir = path.join(root, 'public', 'destinations');
const cityPages = fs.readdirSync(destinationsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(destinationsDir, entry.name, 'index.html'))
  .filter((file) => fs.existsSync(file))
  .filter((file) => fs.readFileSync(file, 'utf8').includes('data-admin-city-content="hotel-button"'));

if (cityPages.length !== 15) {
  throw new Error(`관리자 전용 추천 호텔 버튼이 있는 도시 메인 페이지가 15개가 아닙니다: ${cityPages.length}`);
}

for (const file of cityPages) {
  const html = fs.readFileSync(file, 'utf8');
  const buttonPattern = /<a\b(?=[^>]*data-admin-city-content="hotel-button")(?=[^>]*href="#hotel-posts")(?=[^>]*\shidden(?:="")?)(?=[^>]*aria-hidden="true")[^>]*>추천 호텔<\/a>/;
  if (!buttonPattern.test(html)) {
    throw new Error(`초기 비노출 속성이 누락된 도시 버튼: ${path.relative(root, file)}`);
  }
  if (!html.includes('/assets/css/travel.css?v=20260731-admin-hero-mobile-v1')) {
    throw new Error(`도시 CSS 캐시 버전이 갱신되지 않았습니다: ${path.relative(root, file)}`);
  }
}

const css = fs.readFileSync(path.join(root, 'public', 'assets', 'css', 'travel.css'), 'utf8');
const safeMobileRule = /@media\s*\(max-width:\s*767px\)[\s\S]*?body\.travel-city-body \.wt-city-hero__actions \.wt-city-button:not\(\[hidden\]\)\s*\{[\s\S]*?display:\s*inline-flex\s*!important;/;
if (!safeMobileRule.test(css)) {
  throw new Error('모바일 버튼 표시 규칙이 :not([hidden]) 상태로 제한되지 않았습니다.');
}

const unsafeRule = /body\.travel-city-body \.wt-city-hero__actions \.wt-city-button\s*\{\s*display:\s*inline-flex\s*!important;/;
if (unsafeRule.test(css)) {
  throw new Error('hidden 속성을 덮어쓰는 기존 모바일 display 규칙이 남아 있습니다.');
}

const postsJs = fs.readFileSync(path.join(root, 'public', 'assets', 'js', 'posts.js'), 'utf8');
for (const required of [
  'setHotelHeroButtonsVisible(false);',
  'const isCityAdmin = Boolean(adminState && adminState.authenticated);',
  'if (!isCityAdmin) return;',
  'setHotelHeroButtonsVisible(true);'
]) {
  if (!postsJs.includes(required)) {
    throw new Error(`관리자 인증 기반 버튼 처리 코드가 누락되었습니다: ${required}`);
  }
}

console.log(`도시 메인 관리자 전용 추천 호텔 버튼 검사 통과: ${cityPages.length}개`);
