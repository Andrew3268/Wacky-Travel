import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const html = fs.readFileSync(path.join(root, 'public/index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'public/assets/css/travel-home.css'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const sectionMatch = html.match(/<section class="container travel-section travel-section--destination-hub"[\s\S]*?<\/section>/);
assert(sectionMatch, 'Home destination hub section is missing.');
const section = sectionMatch[0];

assert(section.includes('id="destinationHubTitle"'), 'Destination hub heading id is missing.');
assert(section.includes('>인기 여행지</h2>'), 'Renewed destination hub heading is missing.');
assert(section.includes('>전체보기</a>'), 'Destination hub all-destinations link is missing.');
assert((section.match(/class="destination-hub-card"/g) || []).length === 5, 'Destination hub must contain 5 destination cards.');
assert(!section.includes('home-mood-card'), 'Legacy home mood card markup remains in destination hub.');
assert(!section.includes('Popular Destinations'), 'Legacy eyebrow remains in destination hub.');
assert(html.includes('travel-home.css?v=20260901-h1-v1'), 'Destination hub stylesheet cache version was not updated.');


const expectedDestinationImages = {
  fukuoka: 'https://pub-9f3e642a431d47f7a45cc1c9dc62db2a.r2.dev/Fukuoka.webp',
  taipei: 'https://pub-9f3e642a431d47f7a45cc1c9dc62db2a.r2.dev/Taipei.webp',
  osaka: 'https://pub-9f3e642a431d47f7a45cc1c9dc62db2a.r2.dev/Osaka.webp',
  'nha-trang': 'https://pub-9f3e642a431d47f7a45cc1c9dc62db2a.r2.dev/Nha%20Trang.webp',
  'da-nang': 'https://pub-9f3e642a431d47f7a45cc1c9dc62db2a.r2.dev/Da%20Nang.webp',
};

for (const [slug, imageUrl] of Object.entries(expectedDestinationImages)) {
  assert(section.includes(`href="/destinations/${slug}/"`), `Destination link missing: ${slug}`);
  assert(section.includes(`data-original-src="${imageUrl}"`), `Destination image source missing: ${slug}`);
}

for (const legacyImage of ['fukuoka_index.webp', 'taipei_index.webp', 'osaka_index.webp', 'nhatrang_index.webp', 'danang_index.webp']) {
  assert(!section.includes(legacyImage), `Legacy destination image remains: ${legacyImage}`);
}

for (const token of [
  '.destination-hub__rail',
  '.destination-hub-card__media',
  'grid-template-columns: repeat(5, minmax(0, 1fr))',
  'grid-template-columns: repeat(4, minmax(0, 1fr))',
  'scroll-snap-type: x proximity',
  'flex: 0 0 88px',
]) {
  assert(css.includes(token), `Destination hub CSS token missing: ${token}`);
}

console.log('Home destination hub renewal: OK');
