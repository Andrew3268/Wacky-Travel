import { escapeHtml } from '../../functions/_utils.js';
import { isSafeHttpUrl } from './hotel-top5-json.js';
const esc = (v) => escapeHtml(String(v ?? ''));
const arr = (v) => Array.isArray(v) ? v : [];
const safeLocal = (v) => /^\/(?!\/)[a-z0-9/_-]+\/?$/.test(String(v||'')) ? String(v) : '';
const p = (items, cls='')=>arr(items).filter(Boolean).map(v=>`<p${cls?` class="${cls}"`:''}>${esc(v)}</p>`).join('');
const ext = (u)=>isSafeHttpUrl(u) ? esc(u) : '';
const listItems = (items)=> arr(items).map(x=>`<li>${esc(x)}</li>`).join('');
const hotelAnchor=(h)=>`hotel-top5-${esc(h.id)}`;
const hName=(h)=>esc(h.hotel?.nameKo);
const bestFor=(h)=> arr(h.recommendation?.bestFor)[0]||'';
const insight=(h,key)=> key==='strength' ? arr(h.analysis?.pros)[0]?.title||h.quickPick?.label||'' : arr(h.analysis?.cons)[0]?.title||'';
function imageTag(img, alt, priority=false) {
  if (!ext(img?.src)) return '';
  return `<img src="${ext(img.src)}" alt="${esc(img.alt||alt)}" loading="${priority?'eager':'lazy'}" decoding="async"${priority?' fetchpriority="high"':''} />`;
}
function renderQuickPick(h,i) {
 return `<a class="bt5-quick" href="#${hotelAnchor(h)}">
   <div class="bt5-quick__media">${imageTag(h.image,h.hotel?.nameKo) || `<span aria-hidden="true">${String(i+1).padStart(2,'0')}</span>`}</div>
   <div class="bt5-quick__body"><span class="bt5-mini">PICK ${String(i+1).padStart(2,'0')} · ${esc(h.quickPick?.label)}</span><h3>${hName(h)}</h3><p>${esc(h.quickPick?.summary)}</p><span class="bt5-quick__more">호텔 분석 보기 →</span></div>
 </a>`;
}
function renderHotel(h,i,validHotelReviews){
 const pros=arr(h.analysis?.pros), cons=arr(h.analysis?.cons), booking=ext(h.booking?.url);
 const reviewSlug=safeLocal('/post/'+String(h.hotelReviewSlug||'')+'/');
 const showReview=reviewSlug && validHotelReviews.has(h.hotelReviewSlug);
 const location= h.location?.nearestTransport;
 return `<section class="bt5-hotel" id="${hotelAnchor(h)}" aria-labelledby="bt5-name-${i}">
  <div class="bt5-hotel__intro${ext(h.image?.src)?' bt5-hotel__intro--with-image':''}">
   <div class="bt5-hotel__intro-copy">
    <header class="bt5-hotel__head"><div class="bt5-overline">${String(i+1).padStart(2,'0')}. ${esc(h.hotel?.nameEn||'HOTEL SELECTION')}</div><h2 id="bt5-name-${i}">${hName(h)}</h2><div class="bt5-keywords">${arr(h.editorial?.keywords).map(k=>`<span>${esc(k)}</span>`).join('<i aria-hidden="true">|</i>')}</div></header>
    <div class="bt5-hotel__meta"><span>${esc(h.hotel?.area||'')}</span>${location?.name?`<span>${esc(location.name)}${Number.isFinite(location.travel?.walkMinutes)?` · 도보 ${location.travel.walkMinutes}분${location.travel.sourceType==='estimated'?' (추정)':''}`:''}</span>`:''}</div>
   </div>
   ${ext(h.image?.src)?`<figure class="bt5-hotel__photo">${imageTag(h.image,h.hotel?.nameKo)}${h.image?.caption?`<figcaption>${esc(h.image.caption)}</figcaption>`:''}</figure>`:''}
  </div>
  <div class="bt5-editorial" aria-label="호텔 에디토리얼"><h3>${esc(h.editorial?.headline)}</h3>${p(h.editorial?.paragraphs)}
   ${h.editorial?.whyRecommend?`<div class="bt5-editorial__point"><strong>추천하는 이유</strong><p>${esc(h.editorial.whyRecommend)}</p></div>`:''}
   ${h.editorial?.checkBeforeBooking?`<div class="bt5-editorial__point"><strong>체크할 점</strong><p>${esc(h.editorial.checkBeforeBooking)}</p></div>`:''}
  </div>
  <div class="bt5-analysis"><div class="bt5-overline">ANALYSIS</div><h3>호텔 핵심 분석</h3><p>${esc(h.analysis?.summary)}</p><div class="bt5-analysis__grid"><div class="bt5-panel"><strong>좋은 점</strong>${pros.map(x=>`<div><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join('')}</div><div class="bt5-panel"><strong>고려할 점</strong>${cons.map(x=>`<div><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join('')}</div></div></div>
  <div class="bt5-recommendation"><h3>이런 여행자에게 추천해요</h3><ul>${listItems(h.recommendation?.bestFor)}</ul>${arr(h.recommendation?.notIdealFor).length?`<p class="bt5-muted">예약 전 고려할 조건: ${esc(h.recommendation.notIdealFor.join(' · '))}</p>`:''}</div>
  <div class="bt5-actions">${booking?`<a class="bt5-button" href="${booking}" rel="sponsored noopener noreferrer" target="_blank">객실·예약 조건 확인하기 ↗</a>`:''}${showReview?`<a class="bt5-button bt5-button--outline" href="${reviewSlug}">${hName(h)} 상세 리뷰 보기 →</a>`:''}${h.booking?.tip?`<p class="bt5-muted">${esc(h.booking.tip)}</p>`:''}</div>
 </section>`;
}
const columnNames={hotel:'호텔',area:'지역',transport:'주요 교통',grade:'성급',rating:'평점',bestFor:'추천 대상',strength:'핵심 장점',consideration:'고려사항'};
function tableValue(h,key){
 if(key==='hotel') return h.hotel?.nameKo||'';
 if(key==='area') return h.hotel?.area||'';
 if(key==='transport') return h.location?.transportSummary || h.location?.nearestTransport?.name||'';
 if(key==='grade') return h.hotel?.grade||'';
 if(key==='rating') return h.hotel?.guestRating ?? '';
 if(key==='bestFor') return bestFor(h);
 if(key==='strength'||key==='consideration') return insight(h,key);
 return '';
}
function comparison(data){
 if(!data.comparison?.enabled) return '';
 const cols=arr(data.comparison.columns).filter(k=>columnNames[k]);
 return `<section class="bt5-section" id="bt5-comparison"><h2>호텔 5곳 종합 비교</h2><div class="bt5-table-wrap" tabindex="0" aria-label="호텔 비교표 좌우 스크롤"><table><thead><tr>${cols.map(k=>`<th scope="col">${columnNames[k]}</th>`).join('')}</tr></thead><tbody>${arr(data.hotels).map(h=>`<tr>${cols.map(k=>`<td>${esc(tableValue(h,k))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;
}
function map(data){
 if (!data.locationComparison?.enabled || !arr(data.hotels).every(h=>h.hotel?.coordinates)) return '';
 const points=data.hotels.map(h=>({ name:h.hotel.nameKo, lat:h.hotel.coordinates.lat, lng:h.hotel.coordinates.lng }));
 return `<section class="bt5-section" id="bt5-map"><h2>추천 호텔 위치 비교</h2><p>${esc(data.locationComparison.intro||'')}</p><div id="bt5-map-canvas" class="bt5-map-canvas" data-points="${esc(JSON.stringify(points))}" aria-label="호텔 위치 지도"></div></section>`;
}
export function buildTop5ItemList(data, canonical, publishedReviews=new Set()) {
 return { '@context':'https://schema.org','@type':'ItemList','@id':`${canonical}#hotel-list`,name:data.article.title,numberOfItems:5,
 itemListElement:data.hotels.map((h,i)=>({ '@type':'ListItem',position:i+1,name:h.hotel.nameKo,url:publishedReviews.has(h.hotelReviewSlug)?`${canonical.split('/post/')[0]}/post/${h.hotelReviewSlug}/`:`${canonical}#hotel-top5-${h.id}` }))};
}
export function renderHotelTop5Layout(data,{origin='',canonical='',publishedReviews=new Set(),relatedLinks=[],draftPreviewBannerHtml='',affiliateDisclosureHtml=''}={}) {
 const hotelIds=new Map(data.hotels.map(h=>[h.id,h]));
 const hasBooking=data.hotels.some(h=>ext(h.booking?.url));
 const disclosure=hasBooking? (affiliateDisclosureHtml || '<p class="bt5-affiliate">이 페이지의 예약 링크 중 일부는 제휴 링크이며, 예약 시 사이트에 수수료가 지급될 수 있습니다.</p>') : '';
 return `<main class="bt5-wrap" id="main-content">${draftPreviewBannerHtml}<nav class="bt5-breadcrumb" aria-label="현재 위치"><a href="/">홈</a><span aria-hidden="true">›</span><span>${esc(data.article.title)}</span></nav>
 <article class="bt5-article"><header class="bt5-hero"><p class="bt5-overline">BE STAYABLE · HOTEL EDITORIAL</p><h1>${esc(data.article.title)}</h1>${data.article.subtitle?`<p class="bt5-hero__subtitle">${esc(data.article.subtitle)}</p>`:''}${imageTag(data.article.featuredImage,data.article.title,true)}${p(data.article.intro)}${disclosure}</header>
 <section class="bt5-section" id="bt5-quick"><div class="bt5-overline">THE SHORTLIST</div><h2>추천 호텔 TOP 5 한눈에 보기</h2><p class="bt5-muted">이 목록은 공식적인 호텔 순위가 아니라 여행 조건에 따라 선택한 추천 후보입니다.</p><div class="bt5-quick-grid">${data.hotels.map(renderQuickPick).join('')}</div></section>
 <section class="bt5-section" id="bt5-method"><h2>이 5곳을 선정한 기준</h2><p>${esc(data.selectionCriteria.intro)}</p><div class="bt5-criteria">${arr(data.selectionCriteria.items).map(x=>`<div><b>${esc(x.title)}</b><p>${esc(x.detail)}</p></div>`).join('')}</div></section>
 ${map(data)}
 <nav class="bt5-toc" aria-label="호텔별 목차"><strong>호텔별 자세히 보기</strong>${data.hotels.map((h,i)=>`<a href="#${hotelAnchor(h)}">${i+1}. ${hName(h)}</a>`).join('')}</nav>
 <div class="bt5-hotel-list">${data.hotels.map((h,i)=>renderHotel(h,i,publishedReviews)).join('')}</div>
 ${comparison(data)}
 <section class="bt5-section" id="bt5-style"><h2>여행 스타일별 최종 추천</h2><div class="bt5-styles">${arr(data.recommendationsByStyle).map(r=>`<div class="bt5-style"><h3>${esc(r.label)}</h3><p class="bt5-style__names">${arr(r.hotelIds).map(id=>hotelIds.get(id)?.hotel?.nameKo).filter(Boolean).map(esc).join(' · ')}</p><p>${esc(r.reason)}</p></div>`).join('')}</div></section>
 <section class="bt5-section" id="bt5-booking"><h2>예약 전 확인사항</h2>${arr(data.bookingTips).map(t=>`<div class="bt5-tip"><strong>${esc(t.title)}</strong><p>${esc(t.detail)}</p></div>`).join('')}</section>
 <section class="bt5-section" id="bt5-conclusion"><h2>${esc(data.finalVerdict.title||'어떤 호텔을 선택할까요?')}</h2>${p(data.finalVerdict.paragraphs)}</section>
 ${arr(data.faq).length?`<section class="bt5-section" id="bt5-faq"><h2>자주 묻는 질문</h2>${data.faq.map(x=>`<details class="bt5-faq"><summary>${esc(x.question)}</summary><p>${esc(x.answer)}</p></details>`).join('')}</section>`:''}
 ${relatedLinks.length?`<section class="bt5-section"><h2>관련 호텔 리뷰와 숙소 가이드</h2><ul class="bt5-related">${relatedLinks.map(x=>`<li><a href="${esc(x.path)}">${esc(x.title)} →</a></li>`).join('')}</ul></section>`:''}
 <footer class="bt5-sources"><h2>조사 기준 및 출처</h2><p>${esc(data.research.method)}</p><p>최종 확인: ${esc(data.research.lastCheckedAt)}</p><ul>${arr(data.research.sources).map(x=>`<li>${ext(x.url)?`<a href="${ext(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.name)}</a>`:esc(x.name)}</li>`).join('')}</ul></footer>
 </article><button class="bt5-mobile-toc" type="button" aria-expanded="false" aria-controls="bt5-mobile-nav">호텔 목록</button><nav class="bt5-mobile-nav" id="bt5-mobile-nav" hidden aria-label="모바일 호텔 목록">${data.hotels.map((h,i)=>`<a href="#${hotelAnchor(h)}">${i+1}. ${hName(h)}</a>`).join('')}</nav></main>`;
}
