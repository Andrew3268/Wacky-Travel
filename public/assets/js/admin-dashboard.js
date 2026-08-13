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
  return value ? String(value).slice(0, 10).replaceAll('-', '.') : '-';
}

function getStatusLabel(status) {
  return String(status || '').toLowerCase() === 'draft' ? '초안' : '발행';
}

async function initDashboard() {
  const emailEl = document.getElementById('adminDashboardEmail');
  const totalEl = document.getElementById('dashboardTotalCount');
  const publishedEl = document.getElementById('dashboardPublishedCount');
  const draftEl = document.getElementById('dashboardDraftCount');
  const latestListEl = document.getElementById('dashboardLatestList');
  const popularListEl = document.getElementById('dashboardPopularList');
  const recentListEl = document.getElementById('dashboardRecentList');
  const tabButtons = Array.from(document.querySelectorAll('[data-dashboard-content-tab]'));
  const tabPanels = Array.from(document.querySelectorAll('[data-dashboard-content-panel]'));

  if (!totalEl || !publishedEl || !draftEl || !latestListEl || !popularListEl || !recentListEl) {
    console.error('대시보드 필수 요소를 찾을 수 없습니다.');
    return;
  }

  function activateTab(tabKey) {
    const safeKey = tabKey === 'popular' ? 'popular' : 'latest';
    tabButtons.forEach((button) => {
      const active = button.dataset.dashboardContentTab === safeKey;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      button.tabIndex = active ? 0 : -1;
    });
    tabPanels.forEach((panel) => {
      panel.hidden = panel.dataset.dashboardContentPanel !== safeKey;
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button.dataset.dashboardContentTab));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + offset + tabButtons.length) % tabButtons.length;
      tabButtons[nextIndex]?.focus();
      activateTab(tabButtons[nextIndex]?.dataset.dashboardContentTab);
    });
  });

  function postActions(item) {
    return `
      <div class="post-admin-mini-actions dashboard-post-actions" aria-label="글 관리">
        <a class="post-admin-mini-btn" href="/edit.html?slug=${encodeURIComponent(item.slug)}">수정</a>
        <button class="post-admin-mini-btn post-admin-mini-btn--danger js-delete-post" type="button" data-slug="${escapeHtml(item.slug)}" data-title="${escapeHtml(item.title)}" data-delete-redirect="reload">삭제</button>
      </div>`;
  }

  function renderLatestList(items) {
    latestListEl.innerHTML = items.length
      ? items.map((item) => `
          <li class="dashboard-post-list__item">
            <div class="dashboard-post-list__main">
              <div class="dashboard-post-list__title-row">
                <a href="/post/${encodeURIComponent(item.slug)}/" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>
                <span class="dashboard-status-label${item.status === 'draft' ? ' is-draft' : ''}">${getStatusLabel(item.status)}</span>
              </div>
              <div class="dashboard-post-list__meta">작성 ${escapeHtml(formatDate(item.published_at))} · 최근 수정 ${escapeHtml(formatDate(item.updated_at))}</div>
              ${postActions(item)}
            </div>
          </li>`).join('')
      : '<li class="dashboard-post-list__empty small">최근 작성된 글이 없습니다.</li>';
  }

  function renderPopularList(popular) {
    popularListEl.innerHTML = popular.length
      ? popular.map((item, index) => `
          <li class="dashboard-post-list__item dashboard-popular__item">
            <span class="dashboard-popular__rank" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
            <div class="dashboard-post-list__main dashboard-popular__main">
              <a href="/post/${encodeURIComponent(item.slug)}/" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>
              <div class="dashboard-post-list__meta dashboard-popular__meta">작성 ${escapeHtml(formatDate(item.published_at))} · 최근 수정 ${escapeHtml(formatDate(item.updated_at))}</div>
              ${postActions(item)}
            </div>
            <span class="dashboard-popular__views">${formatNumber(item.view_count)}회</span>
          </li>`).join('')
      : '<li class="dashboard-post-list__empty small">표시할 인기글이 없습니다.</li>';
  }

  function renderRecentList(items) {
    recentListEl.innerHTML = items.length
      ? items.map((item) => `
          <li class="dashboard-recent__item">
            <div class="dashboard-recent__main">
              <a href="/edit.html?slug=${encodeURIComponent(item.slug)}">${escapeHtml(item.title)}</a>
              <span class="dashboard-recent__date">${escapeHtml(formatDate(item.updated_at))}</span>
            </div>
            <span class="dashboard-status-label${item.status === 'draft' ? ' is-draft' : ''}">${getStatusLabel(item.status)}</span>
          </li>`).join('')
      : '<li class="small">최근 수정 글이 없습니다.</li>';
  }

  async function fetchDashboardData() {
    const res = await fetch('/api/admin/dashboard?ts=' + Date.now(), {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    const json = await res.json().catch(() => ({}));
    if (res.status === 401) {
      location.href = '/admin/';
      return null;
    }
    if (!res.ok) throw new Error(json?.message || `대시보드 조회 실패 (${res.status})`);
    return json;
  }

  async function refreshDashboard() {
    try {
      const data = await fetchDashboardData();
      if (!data) return;

      const counts = data.counts || {};
      totalEl.textContent = formatNumber(counts.total || 0);
      publishedEl.textContent = formatNumber(counts.published || 0);
      draftEl.textContent = formatNumber(counts.draft || 0);
      renderLatestList(Array.isArray(data.latest) ? data.latest : []);
      renderPopularList(Array.isArray(data.popular) ? data.popular : []);
      renderRecentList(Array.isArray(data.recent) ? data.recent : []);
    } catch (err) {
      console.error(err);
      totalEl.textContent = '-';
      publishedEl.textContent = '-';
      draftEl.textContent = '-';
      latestListEl.innerHTML = '<li class="dashboard-post-list__empty small">최근 작성글을 불러오지 못했습니다.</li>';
      popularListEl.innerHTML = '<li class="dashboard-post-list__empty small">인기글을 불러오지 못했습니다.</li>';
      recentListEl.innerHTML = '<li class="small">최근 수정 글을 불러오지 못했습니다.</li>';
    }
  }

  const sessionRes = await fetch('/api/admin/session?ts=' + Date.now(), { credentials: 'same-origin', cache: 'no-store' });
  const sessionJson = await sessionRes.json().catch(() => ({}));
  if (!sessionJson.authenticated) {
    location.href = '/admin/';
    return;
  }

  if (emailEl) emailEl.textContent = sessionJson.admin?.email || '관리자';

  const logoutButtons = Array.from(document.querySelectorAll('.js-dashboard-logout'));
  logoutButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      logoutButtons.forEach((item) => {
        item.disabled = true;
        item.setAttribute('aria-busy', 'true');
      });

      try {
        const res = await fetch('/api/admin/logout', {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error(`로그아웃 실패 (${res.status})`);
        location.replace('/admin/');
      } catch (err) {
        console.error(err);
        logoutButtons.forEach((item) => {
          item.disabled = false;
          item.removeAttribute('aria-busy');
        });
        alert(err?.message || '로그아웃 중 오류가 발생했습니다.');
      }
    });
  });

  activateTab('latest');
  await refreshDashboard();

  window.addEventListener('pageshow', refreshDashboard);
  window.addEventListener('focus', refreshDashboard);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshDashboard();
  });
}

initDashboard();
