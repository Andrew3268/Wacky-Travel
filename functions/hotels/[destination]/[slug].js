import { escapeHtml, okHtml, edgeCache } from "../../_utils.js";
import { buildBreadcrumbJsonLd, buildHotelJsonLd } from "../../../lib/travel/seo-jsonld.js";
import { renderSiteHeader, renderFooter, renderBreadcrumbs, renderTravelHead, renderJsonLdScripts, safeJsonArray, formatDate } from "../../../lib/travel/travel-utils.js";

export async function onRequestGet({ params, env, request }) {
  const destinationSlug = decodeURIComponent(String(params.destination || ""));
  const hotelSlug = decodeURIComponent(String(params.slug || ""));
  if (!destinationSlug || !hotelSlug) return okHtml("Not Found", { status: 404 });

  const meta = await env.TRAVEL_DB.prepare(`
    SELECT updated_at FROM hotels WHERE destination_slug = ? AND slug = ? AND status = 'published'
  `).bind(destinationSlug, hotelSlug).first();
  if (!meta) return okHtml(renderNotFound(hotelSlug), { status: 404, headers: { "cache-control": "no-store" } });

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const cacheKeyUrl = `${origin}/hotels/${encodeURIComponent(destinationSlug)}/${encodeURIComponent(hotelSlug)}?v=${encodeURIComponent(String(meta.updated_at || ""))}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 900,
    buildResponse: async () => {
      const hotel = await env.TRAVEL_DB.prepare(`
        SELECT h.*, d.name AS destination_name, d.country AS destination_country, d.city AS destination_city,
               d.slug AS destination_slug_actual
        FROM hotels h
        JOIN destinations d ON d.slug = h.destination_slug
        WHERE h.destination_slug = ? AND h.slug = ? AND h.status = 'published'
      `).bind(destinationSlug, hotelSlug).first();
      if (!hotel) return okHtml(renderNotFound(hotelSlug), { status: 404, headers: { "cache-control": "no-store" } });

      const [linkRows, relatedPostRows] = await Promise.all([
        env.TRAVEL_DB.prepare(`
          SELECT id, provider, label, affiliate_url, button_text, sort_order
          FROM hotel_affiliate_links
          WHERE hotel_slug = ? AND is_active = 1
          ORDER BY sort_order ASC, id ASC
        `).bind(hotelSlug).all(),
        env.TRAVEL_DB.prepare(`
          SELECT p.slug, p.title, p.summary, p.category, p.updated_at, r.relation_type
          FROM post_hotel_relations r
          JOIN posts p ON p.slug = r.post_slug
          WHERE r.hotel_slug = ? AND p.status = 'published'
          ORDER BY r.sort_order ASC, p.updated_at DESC
          LIMIT 8
        `).bind(hotelSlug).all()
      ]);

      const links = linkRows.results || [];
      const relatedPosts = relatedPostRows.results || [];
      const canonical = `${origin}/hotels/${encodeURIComponent(destinationSlug)}/${encodeURIComponent(hotelSlug)}`;
      const title = `${hotel.name} 위치·장점·예약 전 체크포인트 | Wacky Travel`;
      const description = hotel.meta_description || hotel.summary || `${hotel.name}의 위치, 장점, 아쉬운 점과 예약 전 체크포인트를 정리합니다.`;
      const destination = { name: hotel.destination_name, country: hotel.destination_country, city: hotel.destination_city };
      const breadcrumbItems = [
        { name: "홈", url: `${origin}/`, href: "/" },
        { name: hotel.destination_name, url: `${origin}/destinations/${encodeURIComponent(destinationSlug)}`, href: `/destinations/${encodeURIComponent(destinationSlug)}` },
        { name: `${hotel.destination_name} 호텔`, url: `${origin}/hotels/${encodeURIComponent(destinationSlug)}`, href: `/hotels/${encodeURIComponent(destinationSlug)}` },
        { name: hotel.name, url: canonical, href: canonical }
      ];
      const jsonLdItems = [
        buildBreadcrumbJsonLd(breadcrumbItems),
        buildHotelJsonLd({ hotel, destination, url: canonical })
      ];

      const html = `<!doctype html>
<html lang="ko">
<head>
  ${renderTravelHead({ title, description, canonical, image: hotel.cover_image })}
  ${renderJsonLdScripts(jsonLdItems)}
</head>
<body>
  ${renderSiteHeader({ active: "hotels" })}
  ${renderBreadcrumbs(breadcrumbItems)}
  <main class="travel-page hotel-detail-page">
    <article class="container hotel-detail">
      <header class="hotel-detail__hero">
        <div class="hotel-detail__hero-body">
          <p class="eyebrow">${escapeHtml([hotel.destination_name, hotel.area, hotel.price_level].filter(Boolean).join(" · "))}</p>
          <h1>${escapeHtml(hotel.name)}</h1>
          ${hotel.name_en ? `<p class="hotel-detail__en">${escapeHtml(hotel.name_en)}</p>` : ""}
          <p class="hotel-detail__summary">${escapeHtml(hotel.summary || "호텔 위치와 예약 전 확인 포인트를 정리했습니다.")}</p>
          <div class="hotel-detail__facts">
            ${hotel.star_rating ? `<span>${escapeHtml(hotel.star_rating)}</span>` : ""}
            ${hotel.checkin_time ? `<span>체크인 ${escapeHtml(hotel.checkin_time)}</span>` : ""}
            ${hotel.checkout_time ? `<span>체크아웃 ${escapeHtml(hotel.checkout_time)}</span>` : ""}
            ${hotel.updated_at ? `<span>수정 ${escapeHtml(formatDate(hotel.updated_at))}</span>` : ""}
          </div>
          ${renderAffiliateButtons(links)}
        </div>
        ${hotel.cover_image ? `<figure class="hotel-detail__image"><img src="${escapeHtml(hotel.cover_image)}" alt="${escapeHtml(hotel.cover_image_alt || `${hotel.name} 대표 이미지`)}" loading="eager" decoding="async" fetchpriority="high" /></figure>` : ""}
      </header>

      <section class="hotel-detail__grid">
        <div class="hotel-detail__main">
          ${renderSection("이 호텔이 잘 맞는 여행자", safeJsonArray(hotel.suitable_for_json), "tag")}
          ${renderSection("장점", safeJsonArray(hotel.pros_json), "check")}
          ${renderSection("아쉬운 점", safeJsonArray(hotel.cons_json), "warn")}
          ${hotel.distance_summary ? `<section class="content-card"><h2>위치와 이동 동선</h2><p>${escapeHtml(hotel.distance_summary)}</p>${renderNearby(hotel.nearby_spots_json)}</section>` : ""}
          ${hotel.review_summary ? `<section class="content-card"><h2>실제 리뷰에서 자주 보이는 흐름</h2><p>${escapeHtml(hotel.review_summary)}</p></section>` : ""}
          <section class="content-card content-card--notice">
            <h2>예약 전 확인할 점</h2>
            <ul>
              <li>최종 결제 금액에 세금과 수수료가 포함되는지 확인하세요.</li>
              <li>무료 취소 가능 날짜와 환불 조건을 확인하세요.</li>
              <li>조식 포함 여부와 객실 타입을 한 번 더 비교하세요.</li>
              <li>제휴 링크는 예약 사이트로 이동하는 링크이며, 가격은 접속 시점에 따라 달라질 수 있습니다.</li>
            </ul>
            ${renderAffiliateButtons(links, "hotel-detail__cta-bottom")}
          </section>
          ${renderRelatedPosts(relatedPosts)}
        </div>
        <aside class="hotel-detail__side">
          <div class="side-card">
            <h2>빠른 요약</h2>
            <dl>
              ${hotel.area ? `<div><dt>지역</dt><dd>${escapeHtml(hotel.area)}</dd></div>` : ""}
              ${hotel.price_level ? `<div><dt>가격대</dt><dd>${escapeHtml(hotel.price_level)}</dd></div>` : ""}
              ${hotel.address ? `<div><dt>주소</dt><dd>${escapeHtml(hotel.address)}</dd></div>` : ""}
            </dl>
          </div>
          <div class="side-card side-card--sticky">
            <h2>객실 확인</h2>
            <p>날짜별 가격과 취소 조건을 비교하세요.</p>
            ${renderAffiliateButtons(links, "hotel-detail__cta-side")}
          </div>
        </aside>
      </section>
    </article>
  </main>
  ${renderFooter()}
</body>
</html>`;
      return okHtml(html, { headers: { "cache-control": "public, max-age=900" } });
    }
  });
}

function renderAffiliateButtons(links, className = "hotel-detail__cta") {
  if (!links.length) return `<div class="${className}"><span class="affiliate-empty">등록된 예약 링크가 없습니다.</span></div>`;
  return `<div class="${className}">${links.map((link) => `
    <a class="btn btn--brand affiliate-btn" href="${escapeHtml(link.affiliate_url)}" target="_blank" rel="nofollow sponsored noopener noreferrer">
      ${escapeHtml(link.button_text || `${link.label || link.provider}에서 확인하기`)}
    </a>`).join("")}</div>`;
}

function renderSection(title, items, variant = "check") {
  if (!items.length) return "";
  if (variant === "tag") {
    return `<section class="content-card"><h2>${escapeHtml(title)}</h2><div class="tag-row tag-row--large">${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div></section>`;
  }
  return `<section class="content-card"><h2>${escapeHtml(title)}</h2><ul class="icon-list icon-list--${variant}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`;
}

function renderNearby(value) {
  const spots = safeJsonArray(value);
  if (!spots.length) return "";
  return `<div class="nearby-grid">${spots.map((spot) => `<div><strong>${escapeHtml(spot.name || "주변 지점")}</strong><span>${escapeHtml(spot.distance || "거리 정보 확인 필요")}</span></div>`).join("")}</div>`;
}

function renderRelatedPosts(posts) {
  if (!posts.length) return "";
  return `<section class="content-card"><h2>이 호텔이 함께 언급된 글</h2><div class="travel-list travel-list--compact">${posts.map((post) => {
    const slug = String(post.slug || "");
    return `<article class="travel-list__item"><div><div class="travel-card__meta">${escapeHtml([post.category, formatDate(post.updated_at)].filter(Boolean).join(" · "))}</div><h3><a href="/post/${encodeURIComponent(slug)}">${escapeHtml(post.title)}</a></h3><p>${escapeHtml(post.summary || "관련 여행 글입니다.")}</p></div><div class="travel-list__actions"><a class="text-link" href="/post/${encodeURIComponent(slug)}">읽기</a>${renderPostAdminActions(post)}</div></article>`;
  }).join("")}</div></section>`;
}

function renderPostAdminActions(post, { hidden = true } = {}) {
  const slug = String(post.slug || "");
  if (!slug) return "";
  const hiddenAttrs = hidden ? " data-admin-only hidden" : "";
  return `<div class="post-admin-mini-actions" aria-label="글 관리"${hiddenAttrs}>
    <a class="post-admin-mini-btn" href="/edit.html?slug=${encodeURIComponent(slug)}">수정</a>
    <button class="post-admin-mini-btn post-admin-mini-btn--danger js-delete-post" type="button" data-slug="${escapeHtml(slug)}" data-title="${escapeHtml(post.title || slug)}">삭제</button>
  </div>`;
}

function renderNotFound(slug) {
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>호텔을 찾을 수 없습니다</title></head><body><h1>호텔을 찾을 수 없습니다</h1><p>${escapeHtml(slug)}</p></body></html>`;
}
