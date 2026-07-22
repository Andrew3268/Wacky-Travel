import { escapeHtml, jsonld, okHtml, edgeCache } from "../_utils.js";
import { renderMarkdown, renderMarkdownBlocks, buildTocItemsFromBlocks, renderTocHtml, parseInlineImages, stripInlineImageTokens, stripSeoMetaTokenLines } from "../../lib/posts/renderer.js";
import { buildImageAttrs } from "../../lib/image-utils.js";

const SITE_ORIGIN = "https://wacky-travel.pages.dev";
const POST_RENDER_VERSION = "20260722-top5-hero-breadcrumb-v3";


export async function onRequestGet({ params, env, request }) {
  const slug = decodeURIComponent(String(params.slug || ""));
  if (!slug) return okHtml("Not Found", { status: 404 });

  const meta = await env.TRAVEL_DB.prepare(`
    SELECT updated_at
    FROM posts
    WHERE slug = ? AND status = 'published'
  `).bind(slug).first();

  if (!meta) {
    return okHtml(renderNotFound(slug), {
      status: 404,
      headers: { "cache-control": "no-store" }
    });
  }

  await env.TRAVEL_DB.prepare(`
    UPDATE posts
    SET view_count = COALESCE(view_count, 0) + 1
    WHERE slug = ? AND status = 'published'
  `).bind(slug).run();

  const updatedAt = String(meta.updated_at || "");
  const cacheKeyUrl = `${SITE_ORIGIN}/post/${encodeURIComponent(slug)}?v=${encodeURIComponent(updatedAt)}&r=${POST_RENDER_VERSION}`;

  return edgeCache({
    request,
    cacheKeyUrl,
    ttlSeconds: 600,
    buildResponse: async () => {
      const row = await env.TRAVEL_DB.prepare(`
        SELECT
          slug,
          title,
          category,
          meta_description,
          summary,
          cover_image,
          cover_image_alt,
          tags_json,
          content_md,
          faq_md,
          view_count,
          enable_sidebar_ad,
          enable_inarticle_ads,
          status,
          content_type,
          destination_slug,
          hotel_slug,
          affiliate_enabled,
          search_intent,
          published_at,
          updated_at
        FROM posts
        WHERE slug = ? AND status = 'published'
      `).bind(slug).first();

      if (!row) {
        return okHtml(renderNotFound(slug), {
          status: 404,
          headers: { "cache-control": "no-store" }
        });
      }


      const origin = SITE_ORIGIN;
      const canonical = new URL(`/post/${encodeURIComponent(slug)}`, SITE_ORIGIN);

      const siteName = "Wacky Travel";
      const siteDescription = "여행지 정보, 호텔 선택 기준, 예약 전 체크포인트를 정리하는 여행 블로그";
      const authorName = "Travel Editor";
      const faqItems = parseFaqMarkdown(row.faq_md || "");
      const relatedRows = row.category
        ? (await env.TRAVEL_DB.prepare(`
            SELECT slug, title
            FROM posts
            WHERE status = 'published'
              AND TRIM(COALESCE(category, '')) = ?
              AND slug != ?
            ORDER BY published_at DESC, updated_at DESC
            LIMIT 5
          `).bind(String(row.category).trim(), slug).all()).results || []
        : [];
      const popularRows = (await env.TRAVEL_DB.prepare(`
        SELECT slug, title, view_count
        FROM posts
        WHERE status = 'published'
          AND slug != ?
        ORDER BY COALESCE(view_count, 0) DESC, published_at DESC, updated_at DESC
        LIMIT 5
      `).bind(slug).all()).results || [];

      const contentType = String(row.content_type || "").trim();
      const categoryName = String(row.category || "").trim();
      const isHotelIntroPost = contentType === "hotel_intro";
      const isRecommendedHotelReviewPost = isHotelIntroPost || categoryName === "추천 호텔 리뷰";
      const isTop5SeriesPost = contentType === "top5_series";
      const hotelHeroData = isHotelIntroPost ? await getHotelHeroData(env.TRAVEL_DB, row, slug) : null;
      const destinationData = row.destination_slug
        ? await env.TRAVEL_DB.prepare(`
            SELECT slug, name, city
            FROM destinations
            WHERE slug = ?
            LIMIT 1
          `).bind(String(row.destination_slug).trim()).first()
        : null;

      const adConfig = buildAdsenseConfig(env);
      const cleanContentMd = stripSeoMetaTokenLines(row.content_md || "");
      const contentTextLength = stripMarkdown(stripInlineImageTokens(cleanContentMd)).replace(/\s+/g, "").length;
      const shouldShowSidebarAd = toBool(row.enable_sidebar_ad, true);
      const shouldShowInarticleAds = toBool(row.enable_inarticle_ads, true);
      const inArticleAds = shouldShowInarticleAds ? buildInArticleAds(adConfig, 2) : [];
      const bodyHtml = buildArticleBodyHtml(cleanContentMd, inArticleAds, contentTextLength, env, {
        isRecommendedHotelReviewPost,
        useUnifiedHotelSectionHeading: isRecommendedHotelReviewPost || isTop5SeriesPost
      });
      const faqSectionHtml = renderFaqSection(faqItems);
      const relatedPostsHtml = renderRelatedPostsSection(relatedRows, row.category);
      const popularPostsHtml = renderPopularPosts(popularRows);
      const sidebarAdHtml = shouldShowSidebarAd ? renderSidebarAd(adConfig) : "";
      const adsenseHeadScript = renderAdsenseHeadScript(adConfig, shouldShowSidebarAd || shouldShowInarticleAds);
      const adsenseRuntimeScript = renderAdsenseRuntimeScript(adConfig, shouldShowSidebarAd || shouldShowInarticleAds);

      const titleText = String(row.title || "").trim();
      const descriptionText = buildDescription(
        row.meta_description,
        row.summary,
        cleanContentMd,
        titleText
      );
      const pageTitle = `${titleText} | ${siteName}`;
      const versionedCoverImage = appendImageVersion(row.cover_image, row.updated_at);
      const ogImage = versionedCoverImage || `${origin}/assets/images/logo.png`;
      const coverImageAltText = String(row.cover_image_alt || `${titleText} 대표 이미지`).trim();

      const publishedDate = formatDate(row.published_at);
      const updatedDate = formatDate(row.updated_at);
      const publishedIso = toIso(row.published_at);
      const updatedIso = toIso(row.updated_at);
      const authorCardHtml = `
        <div class="post-author-card" aria-label="작성자 정보">
          <img class="post-author-card__avatar" src="/assets/images/favicon-32x32.png" alt="" width="40" height="40" loading="lazy" decoding="async" />
          <div class="post-author-card__body">
            <div class="post-author-card__name">${escapeHtml(authorName)}</div>
            <div class="post-author-card__meta">
              <time datetime="${escapeHtml(publishedIso || "")}">발행 ${escapeHtml(publishedDate)}</time>
              <span aria-hidden="true"> · </span>
              <time datetime="${escapeHtml(updatedIso || "")}">수정 ${escapeHtml(updatedDate)}</time>
            </div>
          </div>
          <div class="post-author-card__actions post-admin-mini-actions" aria-label="글 관리" data-admin-only hidden>
            <a class="post-admin-mini-btn" href="/edit.html?slug=${encodeURIComponent(slug)}">수정</a>
            <button id="deletePostBtn" class="post-admin-mini-btn post-admin-mini-btn--danger" type="button" data-slug="${escapeHtml(slug)}" data-title="${escapeHtml(titleText)}">삭제</button>
          </div>
        </div>
      `;

      const breadcrumbItems = buildPostBreadcrumbItems({
        origin,
        canonical,
        row,
        titleText,
        hotelHeroData,
        destinationData
      });

      const breadcrumbHtml = renderBreadcrumbs(breadcrumbItems);
      const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

      const blogPostingJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical.toString()
        },
        headline: titleText,
        description: descriptionText,
        image: [ogImage],
        author: {
          "@type": "Person",
          name: authorName
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: `${origin}/assets/images/logo.png`,
            width: 512,
            height: 512
          }
        },
        datePublished: publishedIso || row.published_at || "",
        dateModified: updatedIso || row.updated_at || "",
        url: canonical.toString(),
        inLanguage: "ko-KR",
        articleSection: row.category || "블로그",
        wordCount: stripMarkdown(cleanContentMd).split(/\s+/).filter(Boolean).length
      };

      const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: pageTitle,
        url: canonical.toString(),
        description: descriptionText,
        inLanguage: "ko-KR",
        isPartOf: {
          "@type": "WebSite",
          name: siteName,
          url: `${origin}/`
        }
      };

      const faqJsonLd = faqItems.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "ko-KR",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: stripMarkdown(item.answerMd || "")
              }
            }))
          }
        : null;

      const coverImage = versionedCoverImage
        ? buildImageAttrs(versionedCoverImage, {
            widths: [480, 768, 960, 1200],
            sizes: "(max-width: 900px) 100vw, 900px",
            fallbackWidth: 960,
            fit: "cover",
            quality: 82
          }, SITE_ORIGIN)
        : null;
      const coverImagePreload = coverImage
        ? `<link rel="preload" as="image" href="${escapeHtml(coverImage.src)}"${coverImage.srcset ? ` imagesrcset="${escapeHtml(coverImage.srcset)}"` : ""}${coverImage.sizes ? ` imagesizes="${escapeHtml(coverImage.sizes)}"` : ""} fetchpriority="high" />`
        : "";
      const categoryLink = row.category
        ? `/?category=${encodeURIComponent(String(row.category))}`
        : "/";
      const coverImageHtml = coverImage
        ? `
        <figure class="post-cover-wrap">
          <img
            class="post-cover"
            ${coverImage.attrs}
            alt="${escapeHtml(coverImageAltText)}"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            width="1200"
            height="630"
          />
        </figure>
        `
        : "";
      const heroInfoHtml = isHotelIntroPost && !isRecommendedHotelReviewPost ? renderProductStyleHeroInfo({
          row,
          slug,
          titleText,
          categoryLink,
          summaryText: row.summary || descriptionText,
          hotelHeroData,
          publishedIso,
          updatedIso,
          updatedDateText: formatKoreanDate(row.updated_at) || updatedDate,
          showKicker: true
        }) : "";
      const magazineAdminActionsHtml = renderPostAdminActions(slug, titleText);
      const heroSummaryText = String(row.summary || descriptionText || "").trim();
      const heroSummaryHtml = heroSummaryText ? renderMarkdown(heroSummaryText, { origin: SITE_ORIGIN }) : "";
      const hotelPriceLink = isRecommendedHotelReviewPost
        ? String(hotelHeroData?.links?.find((item) => String(item?.provider || "") === "hero_price")?.affiliate_url || "").trim()
        : "";
      const safeHotelPriceLink = /^https?:\/\//i.test(hotelPriceLink) ? hotelPriceLink : "";
      const hotelAvailabilityCtaHtml = safeHotelPriceLink
        ? `<div class="post-hotel-availability-cta post-hotel-availability-cta--inline"><a class="post-hotel-availability-btn" href="${escapeHtml(safeHotelPriceLink)}" target="_blank" rel="sponsored noopener noreferrer">잔여 객실 확인</a></div>`
        : "";
      const mobileHotelAvailabilityCtaHtml = safeHotelPriceLink
        ? `<div class="post-hotel-availability-cta post-hotel-availability-cta--mobile" data-mobile-hotel-cta aria-hidden="true"><a class="post-hotel-availability-btn" href="${escapeHtml(safeHotelPriceLink)}" target="_blank" rel="sponsored noopener noreferrer">잔여 객실 확인</a></div>`
        : "";
      const bodyClassName = [
        "post-page-body",
        isTop5SeriesPost ? "post-page-body--top5-series" : "",
        isHotelIntroPost ? "post-page-body--hotel-intro" : "",
        isRecommendedHotelReviewPost ? "post-page-body--recommended-hotel-review" : "",
        (isRecommendedHotelReviewPost || isTop5SeriesPost) ? "post-page-body--hotel-review-magazine" : ""
      ].filter(Boolean).join(" ");

      const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(descriptionText)}" />
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
  <meta name="theme-color" content="#ffffff" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicon-192x192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
  <meta name="author" content="${escapeHtml(authorName)}" />
  <link rel="canonical" href="${escapeHtml(canonical.toString())}" />
  ${coverImagePreload}
  ${adsenseHeadScript}

  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${escapeHtml(siteName)}" />
  <meta property="og:locale" content="ko_KR" />
  <meta property="og:url" content="${escapeHtml(canonical.toString())}" />
  <meta property="og:title" content="${escapeHtml(pageTitle)}" />
  <meta property="og:description" content="${escapeHtml(descriptionText)}" />
  <meta property="og:image" content="${escapeHtml(ogImage)}" />
  <meta property="og:image:alt" content="${escapeHtml(coverImageAltText)}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(descriptionText)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImage)}" />

  <link rel="stylesheet" href="/assets/css/app.css?v=20260722-hotel-shared-mobile-style-v4" />
  <link rel="stylesheet" href="/assets/css/components.css?v=20260716PostHeaderUnifiedV2" />
  <link rel="stylesheet" href="/assets/css/travel.css?v=20260722-mobile-h1-25-v3" />
  <link rel="stylesheet" href="/assets/css/site-header.css?v=20260721-main-header-clean-v2" />
  <style>
    .post-body,
    .post-body .post-content { counter-reset: none !important; }
    .post-body h2,
    .post-body .post-content h2,
    .post-body h3,
    .post-body .post-content h3 { counter-increment: none !important; list-style: none !important; }
    .post-body h2::before,
    .post-body .post-content h2::before,
    .post-body h2::after,
    .post-body .post-content h2::after,
    .post-body h3::after,
    .post-body .post-content h3::after { content: "" !important; display: none !important; }
    .post-body h2::marker,
    .post-body .post-content h2::marker,
    .post-body h3::marker,
    .post-body .post-content h3::marker { content: "" !important; }
  </style>

  ${jsonld(blogPostingJsonLd)}
  ${jsonld(breadcrumbJsonLd)}
  ${jsonld(webPageJsonLd)}
  ${faqJsonLd ? jsonld(faqJsonLd) : ""}
</head>
<body class="${escapeHtml(bodyClassName)}">

  ${topbar()}
  ${homeSearchOverlay()}

  <main id="main-content" class="container post-guide-page">
    ${breadcrumbHtml}

    <article class="post-shell post-shell--guide-style" itemscope itemtype="https://schema.org/BlogPosting">
      <div class="post-grid">
        <div class="post-main">
          <header class="card post-hero post-hero--product post-magazine-hero">
            ${coverImageHtml}
            <div class="post-magazine-head">
              <h1 class="h1 post-title post-magazine-title" itemprop="headline">${escapeHtml(titleText)}</h1>
              ${magazineAdminActionsHtml}
              ${heroSummaryHtml ? `<div class="post-magazine-desc">${heroSummaryHtml}</div>` : ""}
              ${heroInfoHtml ? `<div class="post-magazine-hotel-panel">${heroInfoHtml}</div>` : ""}
            </div>

            <meta itemprop="headline" content="${escapeHtml(titleText)}" />
            <meta itemprop="description" content="${escapeHtml(descriptionText)}" />
            <meta itemprop="author" content="${escapeHtml(authorName)}" />
            <meta itemprop="datePublished" content="${escapeHtml(publishedIso || "")}" />
            <meta itemprop="dateModified" content="${escapeHtml(updatedIso || "")}" />
            <meta itemprop="mainEntityOfPage" content="${escapeHtml(canonical.toString())}" />
            <meta itemprop="image" content="${escapeHtml(ogImage)}" />
          </header>

          <section class="card post-body" aria-label="본문">
            <div class="post-content" itemprop="articleBody">
              ${bodyHtml}
            </div>
            ${faqSectionHtml}
            ${relatedPostsHtml}
          </section>
          ${hotelAvailabilityCtaHtml}
        </div>

        <aside class="card post-side" aria-label="추가 콘텐츠">
          ${sidebarAdHtml}
          ${popularPostsHtml}
        </aside>
      </div>
    </article>

  </main>

  ${footer(siteName)}
  ${mobileHotelAvailabilityCtaHtml}

  <script>
  document.addEventListener('DOMContentLoaded', () => {
    const mobileHotelCta = document.querySelector('[data-mobile-hotel-cta]');
    if (mobileHotelCta) {
      const mobileQuery = window.matchMedia('(max-width: 767px)');
      const syncMobileHotelCta = () => {
        const shouldShow = mobileQuery.matches && window.scrollY >= Math.max(320, window.innerHeight * 0.45);
        mobileHotelCta.classList.toggle('is-visible', shouldShow);
        mobileHotelCta.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
      };
      syncMobileHotelCta();
      window.addEventListener('scroll', syncMobileHotelCta, { passive: true });
      window.addEventListener('resize', syncMobileHotelCta);
    }
    const postSide = document.querySelector('.post-shell--guide-style .post-side');
    const topbar = document.querySelector('.topbar');
    let sidebarTicking = false;

    const syncPostSidebarTop = () => {
      sidebarTicking = false;
      if (!postSide || window.matchMedia('(max-width: 900px)').matches) return;
      const topbarBottom = topbar ? topbar.getBoundingClientRect().bottom : 0;
      const nextTop = Math.max(24, Math.round(topbarBottom + 24));
      postSide.style.setProperty('--site-sidebar-dynamic-top', nextTop + 'px');
    };

    const requestSidebarSync = () => {
      if (sidebarTicking) return;
      sidebarTicking = true;
      window.requestAnimationFrame(syncPostSidebarTop);
    };

    syncPostSidebarTop();
    window.addEventListener('scroll', requestSidebarSync, { passive: true });
    window.addEventListener('resize', requestSidebarSync);

    const deleteBtn = document.getElementById('deletePostBtn');
    if (!deleteBtn) return;
    deleteBtn.addEventListener('click', async () => {
      const slug = decodeURIComponent(String(deleteBtn.dataset.slug || ''));
      const title = String(deleteBtn.dataset.title || slug || '이 글');
      const confirmed = window.confirm("'" + title + "' 글을 삭제할까요? 삭제 후 되돌릴 수 없습니다.");
      if (!confirmed) return;
      deleteBtn.disabled = true;
      deleteBtn.textContent = '삭제 중…';
      try {
        const res = await fetch('/api/posts/' + encodeURIComponent(slug), { method: 'DELETE' });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((json && json.message) || ('삭제 실패 (' + res.status + ')'));
        window.location.href = '/';
      } catch (err) {
        alert(err?.message || '삭제 중 오류가 발생했습니다.');
        deleteBtn.disabled = false;
        deleteBtn.textContent = '삭제';
      }
    });
  });
</script>
  ${adsenseRuntimeScript}
  <script defer src="/assets/js/site-header.js?v=20260722-site-search-complete-v3"></script>
  <script src="/assets/js/admin-ui.js?v=20260721NoHeaderLogoutV2" defer></script>
</body>
</html>`;

      const res = okHtml(html, {
        headers: {
          "cache-control": "public, max-age=600"
        }
      });

      res.headers.set("x-blog-cache-version", updatedAt);
      return res;
    }
  });
}


function appendImageVersion(src = "", version = "") {
  const value = String(src || "").trim();
  const stamp = String(version || "").trim();
  if (!value || !stamp || /^(data|blob):/i.test(value)) return value;
  const separator = value.includes("?") ? "&" : "?";
  return `${value}${separator}v=${encodeURIComponent(stamp)}`;
}

async function getHotelHeroData(db, row = {}, postSlug = "") {
  const directHotelSlug = String(row.hotel_slug || "").trim();
  let hotelSlug = directHotelSlug;

  try {
    if (!hotelSlug) {
      const relation = await db.prepare(`
        SELECT hotel_slug
        FROM post_hotel_relations
        WHERE post_slug = ?
        ORDER BY sort_order ASC, id ASC
        LIMIT 1
      `).bind(postSlug).first();
      hotelSlug = String(relation?.hotel_slug || "").trim();
    }

    const candidateSlugs = [hotelSlug, postSlug].map((value) => String(value || "").trim()).filter(Boolean);
    let hotel = null;
    for (const candidateSlug of [...new Set(candidateSlugs)]) {
      hotelSlug = candidateSlug;
      hotel = await getHotelHeroRow(db, hotelSlug);
      if (hotel) break;
    }

    if (!hotel) return null;

    const linkRows = await db.prepare(`
      SELECT provider, label, affiliate_url, button_text, sort_order
      FROM hotel_affiliate_links
      WHERE hotel_slug = ?
        AND is_active = 1
      ORDER BY sort_order ASC, id ASC
      LIMIT 2
    `).bind(hotelSlug).all();

    return {
      hotel,
      links: linkRows.results || []
    };
  } catch (err) {
    return null;
  }
}

async function getHotelHeroRow(db, hotelSlug) {
  const baseSelect = `
      SELECT
        h.slug,
        h.destination_slug,
        h.name,
        h.name_en,
        h.area,
        h.address,
        h.star_rating,
        __GUEST_RATING_COLUMN__
        __BADGES_COLUMN__
        h.price_level,
        h.summary,
        h.checkin_time,
        h.checkout_time,
        h.distance_summary,
        h.review_summary,
        h.updated_at,
        d.name AS destination_name,
        d.country AS destination_country,
        d.city AS destination_city
      FROM hotels h
      LEFT JOIN destinations d ON d.slug = h.destination_slug
      WHERE h.slug = ?
        AND h.status = 'published'
      LIMIT 1
    `;

  try {
    return await db.prepare(baseSelect
      .replace('__GUEST_RATING_COLUMN__', 'h.guest_rating,')
      .replace('__BADGES_COLUMN__', 'h.badges_json,'))
      .bind(hotelSlug)
      .first();
  } catch (_) {
    try {
      return await db.prepare(baseSelect
        .replace('__GUEST_RATING_COLUMN__', "'' AS guest_rating,")
        .replace('__BADGES_COLUMN__', 'h.badges_json,'))
        .bind(hotelSlug)
        .first();
    } catch (_) {
      const row = await db.prepare(baseSelect
        .replace('__GUEST_RATING_COLUMN__', "'' AS guest_rating,")
        .replace('__BADGES_COLUMN__', "'' AS badges_json,"))
        .bind(hotelSlug)
        .first();
      return row;
    }
  }
}

function renderProductStyleHeroKicker({ row = {}, hotel = null } = {}) {
  const eyebrowItems = buildHeroEyebrowItems(row, hotel);
  if (!eyebrowItems.length) return "";

  return `
        <nav class="post-hero-kicker" aria-label="호텔 위치 정보">
          ${eyebrowItems.map((item, index) => {
            const label = escapeHtml(item.label);
            const body = item.href ? `<a href="${escapeHtml(item.href)}">${label}</a>` : `<span>${label}</span>`;
            return `${index > 0 ? '<span aria-hidden="true">·</span>' : ''}${body}`;
          }).join("")}
        </nav>
  `;
}

function renderProductStyleHeroInfo({ row = {}, slug = "", titleText = "", categoryLink = "/", summaryText = "", hotelHeroData = null, publishedIso = "", updatedIso = "", updatedDateText = "", showKicker = true }) {
  const hotel = hotelHeroData?.hotel || null;
  if (!hotel) return "";

  const links = Array.isArray(hotelHeroData?.links) ? hotelHeroData.links : [];
  const displayTitle = String(hotel.name || "").trim();
  const subtitle = String(hotel.name_en || "").trim();
  const heroKickerHtml = showKicker ? renderProductStyleHeroKicker({ row, hotel }) : "";
  const badges = buildHeroBadges(row, hotel, updatedDateText);
  const ctaHtml = renderHeroCtas(links);
  const productSummary = String(summaryText || hotel.summary || "").trim();

  return `
    <div class="post-hero-product-panel">
      ${heroKickerHtml}

      ${displayTitle ? `<div class="post-hero-product-title" aria-label="호텔명">${escapeHtml(displayTitle)}</div>` : ""}
      ${subtitle ? `<p class="post-hero-subtitle">${escapeHtml(subtitle)}</p>` : ""}
      ${productSummary ? `<p class="post-hero-product-summary">${escapeHtml(productSummary)}</p>` : ""}

      ${badges.length ? `
        <div class="post-hero-info-pills" aria-label="호텔 뱃지 정보">
          ${badges.map((badge) => `<span class="post-hero-info-pill">${escapeHtml(badge)}</span>`).join("")}
        </div>
      ` : ""}

      ${ctaHtml}

      <meta itemprop="datePublished" content="${escapeHtml(publishedIso || "")}" />
      <meta itemprop="dateModified" content="${escapeHtml(updatedIso || "")}" />
    </div>
  `;
}

function renderPostAdminActions(slug = "", titleText = "") {
  return `
      <div class="post-hero-admin-actions post-admin-mini-actions" aria-label="글 관리" data-admin-only hidden>
        <a class="post-admin-mini-btn" href="/edit.html?slug=${encodeURIComponent(slug)}">수정</a>
        <button id="deletePostBtn" class="post-admin-mini-btn post-admin-mini-btn--danger" type="button" data-slug="${escapeHtml(slug)}" data-title="${escapeHtml(titleText)}">삭제</button>
      </div>
  `;
}

function buildHeroEyebrowItems(row = {}, hotel = null) {
  if (hotel) {
    const destination = String(hotel.destination_city || hotel.destination_name || row.destination_name || row.destination_slug || "").trim();
    const destinationSlug = String(hotel.destination_slug || row.destination_slug || "").trim();
    const area = String(hotel.area || "").trim();
    const star = formatStarRating(hotel.star_rating);
    const guestRating = formatGuestRating(hotel.guest_rating);
    const priceLevel = String(hotel.price_level || "").trim();
    return [
      destination ? { label: destination, href: destinationSlug ? `/destinations/${encodeURIComponent(destinationSlug)}` : "" } : null,
      area ? { label: area } : null,
      star ? { label: star } : null,
      guestRating ? { label: guestRating } : null,
      priceLevel ? { label: priceLevel } : null
    ].filter(Boolean);
  }

  const category = String(row.category || "").trim();
  const contentType = formatContentTypeLabel(row.content_type || "");
  return [
    category ? { label: category, href: `/?category=${encodeURIComponent(category)}` } : null,
    contentType ? { label: contentType } : null
  ].filter(Boolean);
}

function formatGuestRating(value = "") {
  const raw = String(value || "").trim().replace(/^평점\s*/i, "");
  const normalized = raw.match(/^([6-9])\+?$/)?.[1];
  return normalized ? `투숙객 평점 ${normalized}+` : "";
}

function buildHeroBadges(row = {}, hotel = null, updatedDateText = "") {
  if (!hotel) return [];
  const badges = [];
  parseBadgeList(hotel.badges_json).forEach((badge) => {
    if (!badges.includes(badge)) badges.push(badge);
  });
  return badges.slice(0, 6);
}

function parseBadgeList(value = "") {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  const raw = String(value || "").trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map((item) => String(item || "").trim()).filter(Boolean);
  } catch (_) {}
  return raw.split(/[,.，、|]/).map((item) => item.trim()).filter(Boolean);
}

function renderHeroCtas(links = []) {
  const activeLinks = (Array.isArray(links) ? links : [])
    .map((item) => ({
      url: String(item?.affiliate_url || "").trim(),
      label: String(item?.button_text || item?.label || "").trim()
    }))
    .filter((item) => item.url)
    .slice(0, 2);

  if (!activeLinks.length) return "";
  if (activeLinks.length === 1) activeLinks.push({ ...activeLinks[0] });

  const buttonTexts = ["객실 가격 확인하기", "예약 가능 여부 보기"];
  const buttons = activeLinks.map((item, index) => `
    <a class="post-hero-cta" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer nofollow sponsored">
      <span>${escapeHtml(buttonTexts[index] || item.label || "자세히 보기")}</span>
      <span class="post-hero-cta__icon" aria-hidden="true">↗</span>
    </a>
  `).join("");

  return `<div class="post-hero-cta-row">${buttons}</div>`;
}

function formatStarRating(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/성급$/.test(raw)) return raw;
  if (/^[0-9]+(?:\.[0-9]+)?$/.test(raw)) return `${raw}성급`;
  return raw;
}

function formatContentTypeLabel(value = "") {
  const raw = String(value || "").trim();
  const labels = {
    top5_series: "여행 스타일별 호텔 추천",
    hotel_intro: "호텔 소개",
    travel_tip: "여행이 쉬워지는 작은 팁",
    guide: "가이드"
  };
  return labels[raw] || raw;
}

function formatKoreanDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function toBool(value, defaultValue = true) {
  if (value === null || value === undefined || value === "") return defaultValue;
  if (typeof value === "number") return value !== 0;
  const normalized = String(value).trim().toLowerCase();
  return !(normalized === "0" || normalized === "false" || normalized === "off" || normalized === "no");
}

function buildAdsenseConfig(env) {
  return {
    client: String(env.ADSENSE_CLIENT || "").trim(),
    sidebarSlot: String(env.ADSENSE_SLOT_SIDEBAR || "").trim(),
    inArticleSlot1: String(env.ADSENSE_SLOT_INARTICLE_1 || "").trim(),
    inArticleSlot2: String(env.ADSENSE_SLOT_INARTICLE_2 || "").trim()
  };
}

function renderAdsenseHeadScript(config, shouldLoad) {
  if (!shouldLoad || !config.client) return "";
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeHtml(config.client)}" crossorigin="anonymous"></script>`;
}

function renderAdsenseRuntimeScript(config, shouldLoad) {
  if (!shouldLoad || !config.client) return "";
  return `<script>
  document.addEventListener('DOMContentLoaded', () => {
    const adSlots = Array.from(document.querySelectorAll('.js-lazy-ad[data-ad-loaded="false"]'));
    if (!adSlots.length) return;

    const loadAd = (slot) => {
      if (!slot || slot.dataset.adLoaded === 'true') return;
      const client = String(slot.dataset.adClient || '').trim();
      const adSlot = String(slot.dataset.adSlot || '').trim();
      if (!client || !adSlot) return;

      slot.dataset.adLoaded = 'true';
      slot.innerHTML = '<ins class="adsbygoogle adsbygoogle--block" data-ad-client="' + client + '" data-ad-slot="' + adSlot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        slot.dataset.adLoaded = 'error';
        slot.innerHTML = '';
      }
    };

    if (!('IntersectionObserver' in window)) {
      adSlots.forEach(loadAd);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadAd(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: '800px 0px 800px 0px',
      threshold: 0.01
    });

    adSlots.forEach((slot) => observer.observe(slot));
  });
  </script>`;
}

function renderAdUnit({ config, slot, label, kind }) {
  const safeLabel = escapeHtml(label);
  if (config.client && slot) {
    return `
      <section class="post-ad post-ad--${escapeHtml(kind)}" aria-label="${safeLabel}">
        <div
          class="post-ad__slot js-lazy-ad"
          data-ad-client="${escapeHtml(config.client)}"
          data-ad-slot="${escapeHtml(slot)}"
          data-ad-kind="${escapeHtml(kind)}"
          data-ad-loaded="false"
        >
          <div class="post-ad__skeleton" aria-hidden="true">
            <span class="post-ad__skeleton-label">${safeLabel}</span>
          </div>
        </div>
      </section>
    `;
  }

  return `
    <section class="post-ad post-ad--placeholder post-ad--${escapeHtml(kind)}" aria-label="${safeLabel}">
      <div class="post-ad__placeholder-title">${safeLabel}</div>
      <div class="small">광고 코드는 전역 설정에서 한 번만 관리합니다.</div>
    </section>
  `;
}

function renderSidebarAd(config) {
  return `
    <section class="post-side__section post-side__ad" aria-label="사이드바 광고">
      ${renderAdUnit({ config, slot: config.sidebarSlot, label: "사이드바 광고", kind: "sidebar" })}
    </section>
  `;
}

function buildInArticleAds(config, count) {
  const ads = [];
  if (count >= 1) ads.push(renderAdUnit({ config, slot: config.inArticleSlot1, label: "본문 광고 1", kind: "inline" }));
  if (count >= 2) ads.push(renderAdUnit({ config, slot: config.inArticleSlot2 || config.inArticleSlot1, label: "본문 광고 2", kind: "inline" }));
  return ads;
}

function buildArticleBodyHtml(contentMd, adHtmlList = [], contentTextLength = 0, env = {}, options = {}) {
  const visibleContentMd = stripSeoMetaTokenLines(contentMd || "");
  const inlineImages = parseInlineImages(visibleContentMd || "");
  const blocks = renderMarkdownBlocks(visibleContentMd || "", {
    inlineImages,
    origin: SITE_ORIGIN,
    hotelReviewSectionImageAnchor: options.useUnifiedHotelSectionHeading === true,
    hotelSectionHeadingClasses: options.useUnifiedHotelSectionHeading === true
  });
  if (!blocks.length) return "";

  const tocBlock = blocks.find((block) => block.type === "toc");
  const tocItems = tocBlock ? buildTocItemsFromBlocks(blocks, tocBlock.mode || "h2") : [];
  const renderedBlocks = blocks.map((block) => {
    if (block.type !== "toc") return block;
    return {
      ...block,
      html: tocItems.length ? renderTocHtml(tocItems, block.mode || "h2") : ""
    };
  });

  const insertPositions = getAdInsertPositions(renderedBlocks, contentTextLength, adHtmlList.length);
  if (!insertPositions.length) {
    return renderedBlocks.map((block) => block.html).join("\n");
  }

  const adsByPosition = new Map();
  insertPositions.forEach((position, index) => {
    const adHtml = adHtmlList[index];
    if (!adHtml) return;
    const safePosition = Math.max(0, Math.min(position, renderedBlocks.length));
    if (!adsByPosition.has(safePosition)) adsByPosition.set(safePosition, []);
    adsByPosition.get(safePosition).push(adHtml);
  });

  const html = [];
  for (let i = 0; i <= renderedBlocks.length; i += 1) {
    const queuedAds = adsByPosition.get(i) || [];
    queuedAds.forEach((ad) => html.push(ad));
    if (i < renderedBlocks.length) html.push(renderedBlocks[i].html);
  }
  return html.join("\n");
}

function getAdInsertPositions(blocks, contentTextLength, maxAds) {
  if (!maxAds) return [];
  const h2Positions = blocks
    .map((block, index) => ({ block, index }))
    .filter((entry) => entry.block.type === "heading" && entry.block.level === 2)
    .map((entry) => entry.index);

  const positions = [];
  const firstPosition = getSectionEndPosition(blocks, h2Positions, 0) ?? getFallbackPosition(blocks, 0.42);
  positions.push(firstPosition);

  const shouldAddSecond = contentTextLength >= 2000 && h2Positions.length >= 3 && maxAds >= 2;
  if (shouldAddSecond) {
    positions.push(getSectionEndPosition(blocks, h2Positions, 2) ?? getFallbackPosition(blocks, 0.74));
  }

  return dedupePositions(positions, blocks.length);
}

function getSectionEndPosition(blocks, h2Positions, sectionIndex) {
  if (!h2Positions.length) return null;
  const safeSectionIndex = Math.min(sectionIndex, h2Positions.length - 1);
  const nextH2Index = h2Positions[safeSectionIndex + 1];
  if (typeof nextH2Index === "number") return nextH2Index;
  return blocks.length;
}

function getFallbackPosition(blocks, ratio) {
  if (!blocks.length) return 0;
  const contentBlockIndexes = blocks
    .map((block, index) => ({ block, index }))
    .filter((entry) => entry.block.type !== "heading")
    .map((entry) => entry.index);
  if (!contentBlockIndexes.length) return blocks.length;
  const target = Math.max(0, Math.min(contentBlockIndexes.length - 1, Math.floor(contentBlockIndexes.length * ratio)));
  return contentBlockIndexes[target] + 1;
}

function dedupePositions(positions, blockLength) {
  const result = [];
  for (const position of positions) {
    let safePosition = Math.max(0, Math.min(position, blockLength));
    while (result.includes(safePosition) && safePosition < blockLength) {
      safePosition += 1;
    }
    result.push(safePosition);
  }
  return result;
}

function renderPopularPosts(items) {
  if (!Array.isArray(items) || !items.length) return "";
  return `
    <section class="post-side__section post-side__popular" aria-labelledby="post-popular-title">
      <div class="row post-section-header post-section-header--compact">
        <p id="post-popular-title" class="post-side__title">인기글</p>
        
      </div>
      <ul class="post-side__popular-list">
        ${items.map((item, index) => `
          <li>
            <a class="post-side__popular-link" href="/post/${encodeURIComponent(String(item.slug || ""))}">
              <span class="post-side__popular-rank">${index + 1}</span>
              <span class="post-side__popular-text">${escapeHtml(String(item.title || "제목 없음"))}</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

function parseFaqMarkdown(raw) {
  const lines = String(raw || "").replace(/\r/g, "").split("\n");
  const items = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();
    const questionMatch = trimmed.match(/^(?:#{1,6}\s*)?(?:Q|질문)\s*[.:：]?\s*(.+)$/i);

    if (questionMatch) {
      if (current && current.question && current.answerLines.some((entry) => entry.trim())) {
        items.push({
          question: current.question.trim(),
          answerMd: current.answerLines.join("\n").trim()
        });
      }
      current = { question: questionMatch[1].trim(), answerLines: [] };
      continue;
    }

    if (!current) continue;
    current.answerLines.push(line);
  }

  if (current && current.question && current.answerLines.some((entry) => entry.trim())) {
    items.push({
      question: current.question.trim(),
      answerMd: current.answerLines.join("\n").trim()
    });
  }

  return items.slice(0, 8);
}

function renderFaqSection(items) {
  if (!items.length) return "";
  return `
    <section class="post-faq post-section-divider post-section-divider--faq" aria-labelledby="post-faq-title">
      <h2 id="post-faq-title" class="h2">자주 묻는 질문</h2>
      <div class="post-faq__list">
        ${items.map((item) => `
          <article class="card">
            <h3 class="h3 post-faq__question">Q. ${escapeHtml(item.question)}</h3>
            <div class="post-faq__answer">${renderMarkdown(item.answerMd || "", { origin: SITE_ORIGIN })}</div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderRelatedPostsSection(items, category) {
  if (!Array.isArray(items) || !items.length) return "";
  const categoryText = String(category || "").trim();
  const headingText = categoryText ? `${categoryText} 관련글 더보기` : "관련글 더보기";
  const categoryActionHtml = categoryText
    ? `<div class="post-related__action"><a class="btn post-related__more-btn" href="/?category=${encodeURIComponent(categoryText)}">카테고리 전체 보기</a></div>`
    : "";
  return `
    <section class="post-related post-section-divider post-section-divider--related" aria-labelledby="post-related-title">
      <div class="post-related__layout">
        <div class="row post-section-header post-section-header--related">
          <div>
            <h2 id="post-related-title" class="h2 post-section-title">${escapeHtml(headingText)}</h2>
          </div>
        </div>
        ${categoryActionHtml}
        <ul class="list-reset post-related__list">
          ${items.map((item, index) => `
            <li>
              <a href="/post/${encodeURIComponent(String(item.slug || ""))}" class="post-related-link">
                <span>${escapeHtml(String(item.title || "(제목 없음)"))}</span>
              </a>
            </li>
          `).join("")}
        </ul>
      </div>
    </section>
  `;
}

function buildDescription(metaDescription, summary, markdown, title) {
  const cleanMetaDescription = String(metaDescription || "").trim();
  if (cleanMetaDescription) return truncateText(cleanMetaDescription, 155);

  const cleanSummary = stripMarkdown(summary || "");
  if (cleanSummary) return truncateText(cleanSummary, 155);

  const plain = stripMarkdown(markdown || "");
  if (plain) return truncateText(plain, 155);

  return truncateText(`${title}에 대한 글입니다.`, 155);
}

function stripMarkdown(md) {
  return stripSeoMetaTokenLines(String(md || ""))
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateText(text, maxLength = 155) {
  const value = String(text || "").trim();
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength - 1).trim() + "…";
}

function toIso(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString();
}

function formatDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toISOString().slice(0, 10);
}

function buildPostBreadcrumbItems({ origin = SITE_ORIGIN, canonical = null, row = {}, titleText = "", hotelHeroData = null, destinationData = null } = {}) {
  const homeUrl = `${origin}/`;
  const postUrl = canonical ? canonical.toString() : homeUrl;
  const hotel = hotelHeroData?.hotel || null;

  if (hotel) {
    const cityName = String(hotel.destination_city || hotel.destination_name || row.destination_slug || "").trim();
    const destinationSlug = String(hotel.destination_slug || row.destination_slug || "").trim();
    const hotelName = String(hotel.name || titleText || "").trim();

    const items = [{ name: "홈", url: homeUrl, href: "/" }];

    if (cityName) {
      const destinationHref = destinationSlug ? `/destinations/${encodeURIComponent(destinationSlug)}/` : "/";
      items.push({
        name: cityName,
        url: destinationSlug ? `${origin}/destinations/${encodeURIComponent(destinationSlug)}/` : homeUrl,
        href: destinationHref
      });
    }

    items.push({
      name: hotelName || titleText || "호텔",
      url: postUrl
    });

    return items;
  }

  const fallbackItems = [{ name: "홈", url: homeUrl, href: "/" }];
  const destinationSlug = String(destinationData?.slug || row.destination_slug || "").trim();
  const destinationName = String(destinationData?.city || destinationData?.name || "").trim();
  const category = String(row.category || "").trim();

  if (destinationSlug && destinationName) {
    const destinationHref = `/destinations/${encodeURIComponent(destinationSlug)}/`;
    fallbackItems.push({
      name: destinationName,
      url: `${origin}${destinationHref}`,
      href: destinationHref
    });
  } else if (category) {
    fallbackItems.push({
      name: category,
      url: `${origin}/?category=${encodeURIComponent(category)}`,
      href: `/?category=${encodeURIComponent(category)}`
    });
  }

  fallbackItems.push({
    name: titleText || "글",
    url: postUrl
  });

  return fallbackItems;
}

function renderBreadcrumbs(items) {
  const list = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      const content = isLast
        ? `<span aria-current="page">${escapeHtml(item.name)}</span>`
        : `<a href="${escapeHtml(item.href || item.url || "#")}">${escapeHtml(item.name)}</a>`;
      const separator = isLast ? "" : `<span class="breadcrumbs__separator" aria-hidden="true">›</span>`;
      return `<li>${content}${separator}</li>`;
    })
    .join("");

  return `
  <nav class="breadcrumbs container breadcrumbs--post" aria-label="현재 위치">
    <ol>
      ${list}
    </ol>
  </nav>`;
}

function renderNotFound(slug) {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>글을 찾을 수 없습니다</title>
  <meta name="robots" content="noindex,nofollow" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/favicon-192x192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
  <meta name="theme-color" content="#2563EB" />
  <link rel="stylesheet" href="/assets/css/app.css?v=20260722-hotel-shared-mobile-style-v4" />
  <link rel="stylesheet" href="/assets/css/components.css?v=20260716PostLayoutUnifiedV1" />
  <link rel="stylesheet" href="/assets/css/site-header.css?v=20260721-main-header-clean-v2" />
</head>
<body>
  ${topbar()}
  ${homeSearchOverlay()}
  <main class="container">
    <section class="card">
      <h1 class="h1">글을 찾을 수 없습니다</h1>
      <p class="p">요청한 slug: ${escapeHtml(slug)}</p>
      <div class="row row--top-gap-lg">
        <a class="btn btn--brand" href="/">블로그 홈</a>
        <a class="btn" href="/">홈</a>
      </div>
    </section>
  </main>
  <script defer src="/assets/js/site-header.js?v=20260722-site-search-complete-v3"></script>
</body>
</html>`;
}

function topbar() {
  return `<header class="topbar topbar--editorial topbar--travel" data-site-header="main">
    <div class="topbar__inner container">
      <a class="brand" href="/" aria-label="Wacky Travel 홈">
        <span class="brand__mark">WT</span>
        <span class="brand__text">Wacky Travel</span>
      </a>
      <button class="topbar-search-button" id="homeSearchOpenBtn" type="button" aria-label="검색 열기" aria-controls="homeSearchOverlay" aria-expanded="false">
        <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
          <circle cx="11" cy="11" r="6.4"></circle>
          <path d="m16 16 4.5 4.5"></path>
        </svg>
      </button>
    </div>
  </header>`;
}

function homeSearchOverlay() {
  return `
  <section class="home-search-overlay" id="homeSearchOverlay" data-site-search-overlay="main" hidden aria-hidden="true">
    <div class="home-search-overlay__backdrop" data-home-search-close></div>
    <div class="home-search-overlay__panel" role="dialog" aria-modal="true" aria-labelledby="homeSearchOverlayTitle">
      <div class="home-search-overlay__bar">
        <button class="home-search-overlay__close" type="button" data-home-search-close aria-label="검색 닫기">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
            <path d="M6 6l12 12"></path>
            <path d="M18 6L6 18"></path>
          </svg>
        </button>
        <form class="home-search-overlay__form" id="homeFullscreenSearchForm" action="/search/" method="get" role="search" autocomplete="off">
          <span class="home-search-overlay__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="11" cy="11" r="6.4"></circle>
              <path d="m16 16 4.5 4.5"></path>
            </svg>
          </span>
          <input id="homeFullscreenSearchInput" type="search" name="q" placeholder="도시, 호텔명, 숙소 위치를 검색해보세요" aria-label="여행지 또는 호텔 검색어 입력" />
          <button class="home-search-overlay__submit" type="submit">검색</button>
        </form>
      </div>

      <div class="home-search-overlay__content">
        <p class="home-search-overlay__eyebrow">Search</p>
        <h2 id="homeSearchOverlayTitle">어디로 떠나시나요?</h2>
        <p class="home-search-overlay__desc">도시명, 호텔명, 숙소 위치 키워드를 입력하면 관련 가이드를 바로 찾을 수 있습니다.</p>
        <div class="home-search-overlay__quick" aria-label="추천 검색어">
          <button type="button" data-home-search-query="오사카 난바 호텔">오사카 난바 호텔</button>
          <button type="button" data-home-search-query="후쿠오카 하카타 숙소">후쿠오카 하카타 숙소</button>
          <button type="button" data-home-search-query="다낭 미케비치 호텔">다낭 미케비치 호텔</button>
          <button type="button" data-home-search-query="타이베이 시먼딩 숙소">타이베이 시먼딩 숙소</button>
        </div>
      </div>
    </div>
  </section>`;
}

function footer(siteName) {
  return `<footer class="wtpromo-footer">
    <div class="wtpromo-footer__inner wtpromo-container">
      <div>
        <div class="wtpromo-footer-brand">${escapeHtml(siteName)}</div>
        <p class="wtpromo-footer-copy">© 2026 ${escapeHtml(siteName)}<br />예약 전 가격, 취소 조건, 세금 포함 여부를 다시 확인하세요.</p>
      </div>
      <nav class="wtpromo-footer-links" aria-label="하단 메뉴">
        <a href="/about/">소개</a>
<a href="/privacy-policy/">개인정보 처리방침</a>
        <a href="/destinations/">여행지</a>
        <a href="/hotel-promotions/">호텔 프로모션</a>
        <a href="/search/">검색</a>
      </nav>
    </div>
  </footer>`;
}
