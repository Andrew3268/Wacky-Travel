(function () {
  const STATUS_META = {
    published: {
      label: '발행 글',
      title: '발행 글 전체 목록',
      desc: '현재 공개 상태로 발행된 글을 최신 수정일 기준으로 확인합니다.',
      panelTitle: '발행 글 전체',
      empty: '표시할 발행 글이 없습니다.',
      viewLabel: '글 보기'
    },
    draft: {
      label: '초안 글',
      title: '초안 글 리스트',
      desc: '아직 발행하지 않은 초안 글을 최신 수정일 기준으로 확인합니다.',
      panelTitle: '초안 글 리스트',
      empty: '표시할 초안 글이 없습니다.',
      viewLabel: '초안 열기'
    }
  };

  function escapeHtml(value) {
    return String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatNumber(value) {
    return new Intl.NumberFormat('ko-KR').format(Number(value || 0));
  }

  function formatDate(value) {
    return value ? String(value).slice(0, 10) : '-';
  }

  function getRequestedStatus() {
    const params = new URLSearchParams(window.location.search);
    const raw = String(params.get('status') || 'published').trim().toLowerCase();
    return raw === 'draft' ? 'draft' : 'published';
  }

  function getContentTypeLabel(value) {
    const raw = String(value || '').trim();
    const map = {
      travel_tip: '여행 팁',
      hotel_review: '호텔 리뷰',
      hotel_recommendation: '호텔 추천',
      destination_guide: '여행 가이드',
      area_guide: '지역 가이드'
    };
    return map[raw] || raw || '-';
  }

  function getConnectionLabel(item) {
    const parts = [
      item.destination_slug ? String(item.destination_slug) : '',
      item.region_name || item.region_slug ? String(item.region_name || item.region_slug) : '',
      item.recommendation_category_name || item.recommendation_category_slug ? String(item.recommendation_category_name || item.recommendation_category_slug) : ''
    ].filter(Boolean);
    return parts.length ? parts.join(' · ') : '미지정';
  }

  function getSearchText(item) {
    return [
      item.title,
      item.category,
      item.summary,
      item.meta_description,
      item.content_type,
      item.destination_slug,
      item.region_name,
      item.region_slug,
      item.recommendation_category_name,
      item.recommendation_category_slug
    ].map((value) => String(value || '').toLowerCase()).join(' ');
  }

  async function fetchJson(url) {
    const res = await fetch(url, {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const json = await res.json().catch(() => ({}));
    if (res.status === 401) {
      window.location.href = '/admin/';
      return null;
    }
    if (!res.ok) throw new Error(json?.message || `글 목록 조회 실패 (${res.status})`);
    return json;
  }

  async function fetchAllPosts(status) {
    const perPage = 24;
    const firstUrl = new URL('/api/posts', window.location.origin);
    firstUrl.searchParams.set('status', status);
    firstUrl.searchParams.set('page', '1');
    firstUrl.searchParams.set('per_page', String(perPage));
    firstUrl.searchParams.set('ts', String(Date.now()));

    const firstJson = await fetchJson(firstUrl);
    if (!firstJson) return { items: [], sidebar: {} };

    const items = Array.isArray(firstJson.items) ? [...firstJson.items] : [];
    const totalPages = Math.min(Number(firstJson.pagination?.total_pages || 1), 200);

    for (let page = 2; page <= totalPages; page += 1) {
      const url = new URL('/api/posts', window.location.origin);
      url.searchParams.set('status', status);
      url.searchParams.set('page', String(page));
      url.searchParams.set('per_page', String(perPage));
      url.searchParams.set('ts', String(Date.now()));
      const json = await fetchJson(url);
      if (!json) break;
      items.push(...(Array.isArray(json.items) ? json.items : []));
    }

    return { items, sidebar: firstJson.sidebar || {}, pagination: firstJson.pagination || {} };
  }

  function renderRows(items, status, query) {
    const bodyEl = document.getElementById('adminPostListBody');
    if (!bodyEl) return;
    const meta = STATUS_META[status] || STATUS_META.published;
    const normalizedQuery = String(query || '').trim().toLowerCase();
    const visibleItems = normalizedQuery
      ? items.filter((item) => getSearchText(item).includes(normalizedQuery))
      : items;

    if (!visibleItems.length) {
      bodyEl.innerHTML = `<tr><td colspan="5" class="admin-post-list-empty">${escapeHtml(normalizedQuery ? '검색 결과가 없습니다.' : meta.empty)}</td></tr>`;
      return;
    }

    bodyEl.innerHTML = visibleItems.map((item) => {
      const title = item.title || item.slug || '제목 없음';
      const slug = String(item.slug || '').trim();
      const postUrl = slug ? `/post/${encodeURIComponent(slug)}` : '#';
      const editUrl = slug ? `/edit.html?slug=${encodeURIComponent(slug)}` : '#';
      return `
        <tr>
          <td class="admin-post-list-title-cell">
            <a class="admin-post-list-title" href="${editUrl}">${escapeHtml(title)}</a>
            <div class="admin-post-list-sub">${escapeHtml(item.category || '미분류')} · 조회수 ${formatNumber(item.view_count || 0)}</div>
          </td>
          <td>${escapeHtml(getContentTypeLabel(item.content_type))}</td>
          <td>${escapeHtml(getConnectionLabel(item))}</td>
          <td>
            <div class="admin-post-list-date">작성 ${escapeHtml(formatDate(item.published_at))}</div>
            <div class="admin-post-list-date">수정 ${escapeHtml(formatDate(item.updated_at))}</div>
          </td>
          <td>
            <div class="post-admin-mini-actions admin-post-list-actions" aria-label="글 관리">
              <a class="post-admin-mini-btn" href="${editUrl}">수정</a>
              <a class="post-admin-mini-btn" href="${postUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(meta.viewLabel)}</a>
              <button class="post-admin-mini-btn post-admin-mini-btn--danger js-delete-post" type="button" data-slug="${escapeHtml(slug)}" data-title="${escapeHtml(title)}" data-delete-redirect="reload">삭제</button>
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  function setActiveStatus(status) {
    document.querySelectorAll('[data-status-tab]').forEach((tab) => {
      const isActive = tab.dataset.statusTab === status;
      tab.classList.toggle('is-active', isActive);
      if (isActive) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
  }

  function renderHeader(status, total) {
    const meta = STATUS_META[status] || STATUS_META.published;
    const titleEl = document.getElementById('adminPostListTitle');
    const descEl = document.getElementById('adminPostListDesc');
    const badgeEl = document.getElementById('adminPostListStatusBadge');
    const panelTitleEl = document.getElementById('adminPostListPanelTitle');
    const listMetaEl = document.getElementById('adminPostListMeta');

    document.title = `${meta.title} | Wacky Travel`;
    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.desc;
    if (badgeEl) badgeEl.textContent = meta.label;
    if (panelTitleEl) panelTitleEl.textContent = meta.panelTitle;
    if (listMetaEl) listMetaEl.textContent = `${meta.label} ${formatNumber(total)}개`;
  }

  async function init() {
    const status = getRequestedStatus();
    const searchEl = document.getElementById('adminPostListSearch');
    const publishedCountEl = document.getElementById('adminPostPublishedCount');
    const draftCountEl = document.getElementById('adminPostDraftCount');
    const bodyEl = document.getElementById('adminPostListBody');

    setActiveStatus(status);

    try {
      const { items, sidebar } = await fetchAllPosts(status);
      const counts = sidebar?.counts || {};
      if (publishedCountEl) publishedCountEl.textContent = formatNumber(counts.published || (status === 'published' ? items.length : 0));
      if (draftCountEl) draftCountEl.textContent = formatNumber(counts.draft || (status === 'draft' ? items.length : 0));
      renderHeader(status, items.length);
      renderRows(items, status, searchEl?.value || '');

      searchEl?.addEventListener('input', () => {
        renderRows(items, status, searchEl.value || '');
        const meta = STATUS_META[status] || STATUS_META.published;
        const listMetaEl = document.getElementById('adminPostListMeta');
        const query = String(searchEl.value || '').trim();
        if (listMetaEl) {
          const count = query ? items.filter((item) => getSearchText(item).includes(query.toLowerCase())).length : items.length;
          listMetaEl.textContent = query
            ? `${meta.label} ${formatNumber(items.length)}개 중 검색 결과 ${formatNumber(count)}개`
            : `${meta.label} ${formatNumber(items.length)}개`;
        }
      });
    } catch (err) {
      console.error(err);
      if (bodyEl) {
        bodyEl.innerHTML = `<tr><td colspan="5" class="admin-post-list-empty">${escapeHtml(err?.message || '글 목록을 불러오지 못했습니다.')}</td></tr>`;
      }
      renderHeader(status, 0);
      if (publishedCountEl) publishedCountEl.textContent = '-';
      if (draftCountEl) draftCountEl.textContent = '-';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
