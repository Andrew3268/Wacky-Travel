import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const destinationsDir = path.join(root, 'public', 'destinations');
const citySlugs = [
  'osaka', 'fukuoka', 'tokyo', 'sapporo', 'okinawa',
  'da-nang', 'nha-trang', 'ho-chi-minh-city', 'hanoi', 'phu-quoc',
  'taipei', 'taichung', 'tainan', 'kaohsiung', 'hualien'
];

const failures = [];

for (const slug of citySlugs) {
  const file = path.join(destinationsDir, slug, 'index.html');
  if (!fs.existsSync(file)) {
    failures.push(`${slug}: index.html 누락`);
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');
  const checks = [
    [/<section\b[^>]*id="hotel-posts"[^>]*data-admin-preview-section[^>]*hidden/i.test(html), 'Hotel Picks 관리자 기본 숨김 누락'],
    [/<section\b[^>]*id="travel-contents"[^>]*data-admin-preview-section[^>]*hidden/i.test(html), 'Travel Contents 관리자 기본 숨김 누락'],
    [/<a\b[^>]*href="#hotel-posts"[^>]*data-admin-hotel-anchor[^>]*hidden/i.test(html), '추천 호텔 히어로 버튼 기본 숨김 누락'],
    [/<section\b[^>]*class="[^"]*wt-city-start-guides[^"]*"[^>]*>[\s\S]*?<p class="wt-city-kicker">CITY GUIDE<\/p>/i.test(html), 'CITY GUIDE 구조 회귀'],
    [/\/assets\/js\/city-admin-sections\.js\?v=20260726CityAdminGateV2/.test(html), '관리자 게이트 스크립트 누락'],
    [!/\/assets\/js\/posts\.js\?v=/.test(html), 'posts.js가 일반 사용자 페이지에서 직접 실행됨'],
    [/\/assets\/css\/travel\.css\?v=20260726CityStaticRestoreV2/.test(html), '최신 도시 CSS 캐시 키 누락']
  ];

  for (const [passed, message] of checks) {
    if (!passed) failures.push(`${slug}: ${message}`);
  }
}

const destinationHandler = fs.readFileSync(path.join(root, 'functions', 'destinations', '[slug].js'), 'utf8');
for (const slug of citySlugs) {
  if (!destinationHandler.includes(`"${slug}"`)) {
    failures.push(`functions/destinations/[slug].js: 정적 도시 목록에 ${slug} 누락`);
  }
}
if (!destinationHandler.includes('renderStaticCityHub')) {
  failures.push('functions/destinations/[slug].js: 최신 정적 도시 허브 복원 경로 누락');
}

if (failures.length) {
  console.error('City hub audit failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`City hub audit passed: ${citySlugs.length}개 도시 메인 페이지`);
