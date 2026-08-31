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
assert(html.includes('travel-home.css?v=20260831-destination-hub-v1'), 'Destination hub stylesheet cache version was not updated.');

for (const slug of ['fukuoka', 'taipei', 'osaka', 'nha-trang', 'da-nang']) {
  assert(section.includes(`/destinations/${slug}/`), `Destination link missing: ${slug}`);
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
