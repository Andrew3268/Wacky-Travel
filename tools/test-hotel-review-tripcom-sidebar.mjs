import fs from 'node:fs';
import assert from 'node:assert/strict';
import { normalizeTripcomSidebarAd, renderTripcomSidebarIframe } from '../lib/posts/tripcom-sidebar-ad.js';
import { renderHotelReviewLayout } from '../lib/posts/hotel-review-json.js';

const iframe = '<iframe border="0" src="https://kr.trip.com/partners/ad/S19906483?Allianceid=10327591&SID=329704257&trip_sub1=" style="width:320px;height:320px" frameborder="0" scrolling="no"></iframe>';
const valid = normalizeTripcomSidebarAd(iframe);
assert.equal(valid.ok, true);
assert.equal(valid.url, 'https://kr.trip.com/partners/ad/S19906483?Allianceid=10327591&SID=329704257&trip_sub1=');
assert.equal(normalizeTripcomSidebarAd('<iframe src="https://evil.example/ad"></iframe>').ok, false);
assert.match(renderTripcomSidebarIframe(valid.url), /hrj-tripcom-widget__iframe/);

const sample = {
  schemaVersion: 'hotel-review-v1.0',
  slug: 'sample-hotel',
  hotel: { nameKo: '샘플 호텔', nameEn: 'Sample Hotel', country: '베트남', city: '다낭', area: '한강', grade: '5성급', type: '도심형', airport: '공항 약 5km' },
  seo: { title: '샘플 호텔 리뷰', description: '샘플 설명' },
  article: { title: '샘플 호텔 리뷰', intro: ['소개'], basicInfo: [{ label:'호텔 유형', value:'도심형' }], quickPoints: [{ label:'위치', value:'한강' }] },
  sections: [{ number:'01', id:'location', label:'숙박 위치', heading:'위치', blocks:[{ type:'paragraph', text:'본문' }] }]
};
const html = renderHotelReviewLayout(sample, { tripcomSidebarAdUrl: valid.url });
assert.match(html, /hrj-sidecard--tripcom/);
assert.match(html, /kr\.trip\.com\/partners\/ad\/S19906483/);
const firstSidebar = html.split('<aside class="hrj-sidebar"')[1].split('이 글의 목차')[0];
assert.doesNotMatch(firstSidebar, /hrj-hotel-mini__name/);

const fallback = renderHotelReviewLayout(sample, { tripcomSidebarAdUrl: '' });
assert.match(fallback, /hrj-hotel-mini__name/);
assert.doesNotMatch(fallback, /hrj-sidecard--tripcom/);

const addHtml = fs.readFileSync(new URL('../public/add.html', import.meta.url), 'utf8');
const editHtml = fs.readFileSync(new URL('../public/edit.html', import.meta.url), 'utf8');
for (const content of [addHtml, editHtml]) {
  assert.match(content, /id="hotelReviewTripcomCode"/);
  assert.match(content, /id="hotelReviewTripcomStatus"/);
  assert.match(content, /hotel-review-json-editor\.js\?v=20260921-tripcom-v2/);
}
assert.match(addHtml, /add\.js\?v=20260921-tripcom-v2/);
assert.match(editHtml, /edit\.js\?v=20260921-tripcom-v2/);

const postApi = fs.readFileSync(new URL('../functions/api/posts.js', import.meta.url), 'utf8');
const editApi = fs.readFileSync(new URL('../functions/api/posts/[slug].js', import.meta.url), 'utf8');
const publicPost = fs.readFileSync(new URL('../functions/post/[slug].js', import.meta.url), 'utf8');
for (const content of [postApi, editApi, publicPost]) assert.match(content, /tripcom_sidebar_ad_url/);
assert.match(editApi, /hasTripcomSidebarAdInput/);
assert.match(editApi, /current\.tripcom_sidebar_ad_url/);

const headers = fs.readFileSync(new URL('../public/_headers', import.meta.url), 'utf8');
assert.match(headers, /\/assets\/\*[\s\S]*max-age=31536000, immutable/);

console.log('Hotel review Trip.com sidebar check passed: admin input, immutable-cache busting, URL-only normalization, persistence, SSR replacement, and fallback are wired.');
