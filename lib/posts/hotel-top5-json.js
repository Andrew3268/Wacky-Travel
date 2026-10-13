// Be Stayable TOP 5 JSON (hotel-top5-v1.0). Server-side defensive validation.
const asText = (value) => String(value ?? '').trim();
const isObj = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const list = (value) => Array.isArray(value) ? value : [];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const isHotelTop5Format = (type, format) => type === 'top5_series' && format === 'json';
export function parseHotelTop5Json(input) {
  if (isObj(input)) return input;
  if (typeof input !== 'string' || input.length > 600000) return null;
  try { return JSON.parse(input); } catch { return null; }
}
export function validateHotelTop5Json(input) {
  const data = parseHotelTop5Json(input);
  const errors = [];
  const requiredText = (obj, prop, where) => {
    if (!asText(obj?.[prop])) errors.push(`${where}.${prop} 항목이 필요합니다.`);
  };
  if (!isObj(data)) return { ok:false, data:null, errors:['TOP 5 JSON은 올바른 객체여야 합니다.'] };
  if (data.schemaVersion !== 'hotel-top5-v1.0' || data.contentType !== 'top5_series') errors.push('schemaVersion/contentType은 hotel-top5-v1.0 / top5_series여야 합니다.');
  if (!slugPattern.test(asText(data.slug))) errors.push('slug는 영문 소문자·숫자·하이픈만 가능합니다.');
  for (const [p,keys] of [['destination',['slug','nameKo']],['recommendationCategory',['slug']],['seo',['title','description']],['article',['title']],['research',['lastCheckedAt','method']]]) {
    if (!isObj(data[p])) errors.push(`${p} 객체가 필요합니다.`);
    else keys.forEach(k=>requiredText(data[p],k,p));
  }
  if (!slugPattern.test(asText(data.destination?.slug)) || !slugPattern.test(asText(data.recommendationCategory?.slug))) errors.push('도시 및 추천 카테고리 slug 형식이 잘못되었습니다.');
  if (data.article?.orderMeaning !== 'curated') errors.push('article.orderMeaning은 curated여야 합니다.');
  if (!list(data.article?.intro).length) errors.push('article.intro 본문이 필요합니다.');
  if (!isObj(data.selectionCriteria) || !list(data.selectionCriteria.items).length) errors.push('호텔 선정 기준이 필요합니다.');
  if (!isObj(data.comparison) || !Array.isArray(data.comparison.columns)) errors.push('comparison 설정이 필요합니다.');
  if (!isObj(data.finalVerdict) || !list(data.finalVerdict.paragraphs).length) errors.push('finalVerdict가 필요합니다.');
  if (!isObj(data.research) || !Array.isArray(data.research.sources)) errors.push('research.sources 배열이 필요합니다.');
  if (!Array.isArray(data.hotels) || data.hotels.length !== 5) errors.push('호텔은 정확히 5개여야 합니다.');
  const ids = new Set();
  const names = new Set();
  list(data.hotels).forEach((h,i) => {
    const where = `hotels[${i}]`;
    if (!isObj(h)) { errors.push(`${where} 객체가 필요합니다.`); return; }
    if (!slugPattern.test(asText(h.id)) || ids.has(h.id)) errors.push(`${where}.id 형식 또는 중복을 확인해 주세요.`);
    ids.add(h.id);
    requiredText(h.hotel,'nameKo',where+'.hotel');
    if (names.has(asText(h.hotel?.nameKo))) errors.push('호텔명이 중복되어 있습니다.');
    names.add(asText(h.hotel?.nameKo));
    requiredText(h.quickPick,'label',where+'.quickPick');
    requiredText(h.quickPick,'summary',where+'.quickPick');
    if (!isObj(h.editorial) || list(h.editorial.paragraphs).length < 3 || list(h.editorial.paragraphs).length > 4 || !asText(h.editorial.headline)) errors.push(`${where}.editorial 제목과 문단이 필요합니다.`);
    if (list(h.editorial?.keywords).length !== 3 || new Set(list(h.editorial?.keywords)).size !== 3) errors.push(`${where}.editorial 키워드는 서로 다른 3개여야 합니다.`);
    if (!asText(h.editorial?.whyRecommend) || !asText(h.editorial?.checkBeforeBooking)) errors.push(`${where}.editorial 추천 이유와 체크할 점이 필요합니다.`);
    if (list(h.editorial?.paragraphs).some(x => !asText(x))) errors.push(`${where}.editorial 문단이 비었습니다.`);
    if (!isObj(h.analysis) || !asText(h.analysis.summary) || !list(h.analysis.pros).length || !list(h.analysis.cons).length) errors.push(`${where}.analysis 요약·장단점이 필요합니다.`);
    if (!isObj(h.recommendation) || !list(h.recommendation.bestFor).length) errors.push(`${where}.recommendation.bestFor가 필요합니다.`);
    if (h.hotel?.guestRating && (!h.hotel?.ratingSource || !isSafeHttpUrl(h.hotel.ratingSource.sourceUrl))) errors.push(`${where}.hotel 평점의 출처가 필요합니다.`);
    if (h.hotel?.grade && !/^[1-5]성급$/.test(h.hotel.grade)) errors.push(`${where}.hotel 성급 형식이 잘못되었습니다.`);
    for (const url of [h.booking?.url,h.image?.src,h.hotel?.ratingSource?.sourceUrl]) {
      if (url !== undefined && !isSafeHttpUrl(url)) errors.push(`${where}의 외부 URL이 잘못되었습니다.`);
    }
    if (h.hotel?.coordinates && (!Number.isFinite(h.hotel.coordinates.lat) || !Number.isFinite(h.hotel.coordinates.lng) || Math.abs(h.hotel.coordinates.lat)>90 || Math.abs(h.hotel.coordinates.lng)>180)) errors.push(`${where} 지도 좌표를 확인하세요.`);
  });
  for (const [i,r] of list(data.recommendationsByStyle).entries()) {
    if (!list(r.hotelIds).length || list(r.hotelIds).some(id=>!ids.has(id))) errors.push(`recommendationsByStyle[${i}].hotelIds가 잘못되었습니다.`);
  }
  for (const [i,src] of list(data.research?.sources).entries()) {
    if (!isSafeHttpUrl(src?.url)) errors.push(`research.sources[${i}].url이 잘못되었습니다.`);
  }
  if (!list(data.recommendationsByStyle).length) errors.push('여행 스타일별 추천 데이터가 필요합니다.');
  if (!list(data.bookingTips).length) errors.push('예약 전 확인사항이 필요합니다.');
  if (data.locationComparison?.enabled && list(data.hotels).some(h=>!h.hotel?.coordinates)) errors.push('지도 사용에는 호텔 5개의 정확한 좌표가 필요합니다.');
  return { ok:errors.length===0, errors, data:errors.length===0?data:null };
}
export function isSafeHttpUrl(value) {
  try { const u = new URL(String(value||'')); return (u.protocol==='https:' || u.protocol==='http:') && !!u.hostname && !u.username && !u.password; }
  catch { return false; }
}
export function deriveHotelTop5PostFields(data) {
  return {
    slug: data.slug,
    title: asText(data.article?.title),
    category: '여행 스타일별 호텔 추천',
    meta_description: asText(data.seo?.description),
    summary: asText(data.article?.subtitle || data.article?.intro?.[0]),
    focus_keyword: asText(data.seo?.focusKeyword),
    longtail_keywords: list(data.seo?.longtailKeywords),
    destination_slug: data.destination.slug,
    recommendation_category_slug: data.recommendationCategory.slug,
    content_type: 'top5_series',content_format:'json',content_md:'',faq_md:'',
    content_json:JSON.stringify(data)
  };
}
export function getHotelTop5PlainText(data) {
  return [data.article?.title,...list(data.article?.intro),...list(data.hotels).flatMap(h=>[h.hotel?.nameKo,h.quickPick?.summary,...list(h.editorial?.paragraphs),h.editorial?.whyRecommend,h.editorial?.checkBeforeBooking,h.analysis?.summary,...list(h.analysis?.pros).map(x=>x.text),...list(h.analysis?.cons).map(x=>x.text)]),...list(data.finalVerdict?.paragraphs)].filter(Boolean).join(' ');
}
