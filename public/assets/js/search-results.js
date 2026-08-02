const $ = (id) => document.getElementById(id);
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
    const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();
    const escapeRegExp = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const state = { query: '', page: 1, totalPages: 1, isLoading: false, controller: null };
    const broadSearchKeywords = new Set(['호텔', '숙소', '여행', '추천']);

    const landing = $('wtsrLanding');
    const resultsView = $('main');

    function setView(hasQuery) {
      if (landing) landing.hidden = hasQuery;
      if (resultsView) resultsView.hidden = !hasQuery;
      document.body.classList.toggle('wtsr-page--results', hasQuery);
    }

    function goBack() {
      if (window.history.length > 1) window.history.back();
      else window.location.href = '/';
    }

    function syncClearButton() {
      const clearButton = $('wtsrClearBtn');
      if (!clearButton) return;
      clearButton.hidden = !normalizeText($('wtsrInput').value);
    }

    function focusSearchInput() {
      window.requestAnimationFrame(() => {
        const input = $('wtsrInput');
        if (!input) return;
        input.focus({ preventScroll: true });
        const end = input.value.length;
        input.setSelectionRange(end, end);
      });
    }

    function getMeaningfulSearchTerms(value = '') {
      return normalizeText(value)
        .toLowerCase()
        .split(/[\s,，、|/·・]+/)
        .map(normalizeText)
        .filter((term) => term.length >= 2 && !broadSearchKeywords.has(term));
    }

    function isTooBroadQuery(value = '') {
      return getMeaningfulSearchTerms(value).length === 0;
    }

    function labelPostType(value) {
      const type = String(value || '').trim();
      if (type === 'top5_series') return '여행 스타일별 호텔 추천';
      if (type === 'hotel_intro') return '추천 호텔 리뷰';
      if (type === 'travel_tip') return '여행 준비 팁';
      return type || '여행 글';
    }

    function getHighlightTerms(query = '') {
      const full = normalizeText(query);
      const compact = full.replace(/[\s\-_/·・.,，、|()（）\[\]{}<>]+/g, '');
      const parts = full.split(/[\s,，、|/·・]+/).map(normalizeText).filter((term) => term.length >= 2);
      return [...new Set([full, compact, ...parts].filter(Boolean))].sort((a, b) => b.length - a.length).slice(0, 10);
    }

    function highlightText(value = '', query = '') {
      const text = normalizeText(value);
      if (!text) return '';
      const terms = getHighlightTerms(query);
      if (!terms.length) return escapeHtml(text);
      const pattern = terms.map(escapeRegExp).filter(Boolean).join('|');
      if (!pattern) return escapeHtml(text);
      const regex = new RegExp(pattern, 'gi');
      let result = '';
      let lastIndex = 0;
      for (const match of text.matchAll(regex)) {
        const index = match.index ?? 0;
        const matched = match[0] || '';
        result += escapeHtml(text.slice(lastIndex, index));
        result += `<mark>${escapeHtml(matched)}</mark>`;
        lastIndex = index + matched.length;
      }
      result += escapeHtml(text.slice(lastIndex));
      return result;
    }

    function getExcerpt(item = {}) {
      const raw = normalizeText(item.summary) || normalizeText(item.meta_description) || '검색어와 관련된 여행 콘텐츠입니다.';
      return raw.length > 150 ? `${raw.slice(0, 150).trim()}…` : raw;
    }

    function renderCard(item = {}, index = 0) {
      const slug = String(item.slug || '').trim();
      const href = `/post/${encodeURIComponent(slug)}/`;
      const title = item.title || '여행 글';
      const type = labelPostType(item.content_type);
      const category = normalizeText(item.category);
      const excerpt = getExcerpt(item);
      return `<article class="wtsr-card">
        <a class="wtsr-card__link" href="${href}" aria-label="${escapeHtml(title)} 읽기">
          <div class="wtsr-card__body">
            <div class="wtsr-card__meta"><span>${escapeHtml(type)}</span>${category ? `<span>${escapeHtml(category)}</span>` : ''}</div>
            <h3>${highlightText(title, state.query)}</h3>
            <p>${escapeHtml(excerpt)}</p>
          </div>
          <span class="wtsr-card__arrow" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M4 10h11"></path><path d="m11 6 4 4-4 4"></path></svg></span>
        </a>
      </article>`;
    }

    function setEmpty(messageTitle, messageText = '', exampleText = '') {
      $('wtsrResults').innerHTML = `<div class="wtsr-empty"><strong>${escapeHtml(messageTitle)}</strong>${messageText ? `<span class="wtsr-empty__message">${escapeHtml(messageText)}</span>` : ''}${exampleText ? `<span class="wtsr-empty__example">${escapeHtml(exampleText)}</span>` : ''}</div>`;
      $('wtsrMoreBtn').hidden = true;
    }

    function setLoading(append = false) {
      if (append) {
        $('wtsrMoreBtn').textContent = '불러오는 중...';
        $('wtsrMoreBtn').disabled = true;
        return;
      }
      $('wtsrResults').innerHTML = '<div class="wtsr-loading">검색 결과를 불러오는 중입니다.</div>';
      $('wtsrMoreBtn').hidden = true;
    }

    async function loadSearch({ page = 1, append = false } = {}) {
      const query = state.query;
      if (!query) {
        setEmpty('검색어를 입력해 주세요', '예: 오사카 난바 호텔, 후쿠오카 하카타 숙소, 다낭 미케비치 호텔');
        return;
      }
      if (isTooBroadQuery(query)) {
        setEmpty('조금 더 구체적으로 검색해 주세요', '도시, 지역 또는 여행 조건을 함께 입력해 주세요.', '예: 다낭 호텔, 하카타역 숙소, 공항 근처 호텔');
        return;
      }

      if (state.controller) state.controller.abort();
      const controller = new AbortController();
      state.controller = controller;
      state.isLoading = true;
      setLoading(append);

      try {
        const url = new URL('/api/search', window.location.origin);
        url.searchParams.set('q', query);
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', '12');
        const res = await fetch(url.toString(), {
          headers: { Accept: 'application/json' },
          signal: controller.signal
        });
        if (!res.ok) throw new Error('search_failed');
        const data = await res.json().catch(() => ({}));
        if (data.blocked) {
          setEmpty('조금 더 구체적으로 검색해 주세요', data.message || '도시, 지역 또는 여행 조건을 함께 입력해 주세요.', '예: 다낭 호텔, 하카타역 숙소, 공항 근처 호텔');
          return;
        }

        const items = Array.isArray(data.items) ? data.items : [];
        const pagination = data.pagination || {};
        state.page = Number(pagination.page || page) || page;
        state.totalPages = Number(pagination.total_pages || 1) || 1;

        if (!items.length && !append) {
          setEmpty('검색 결과가 없습니다', '제목에 들어갈 만한 도시명이나 호텔명으로 다시 검색해 보세요.');
        } else {
          const html = items.map(renderCard).join('');
          $('wtsrResults').innerHTML = append ? $('wtsrResults').innerHTML + html : html;
        }

        const hasMore = Boolean(pagination.has_more) && state.page < state.totalPages;
        $('wtsrMoreBtn').hidden = !hasMore;
        $('wtsrMoreBtn').textContent = '더 보기';
        $('wtsrMoreBtn').disabled = false;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        $('wtsrResults').innerHTML = '<div class="wtsr-error"><strong>검색 결과를 불러오지 못했습니다</strong>잠시 후 같은 검색어로 다시 시도해 주세요.</div>';
        $('wtsrMoreBtn').hidden = true;
      } finally {
        if (state.controller === controller) {
          state.controller = null;
          state.isLoading = false;
        }
      }
    }

    function startSearch(query, { replaceUrl = false } = {}) {
      state.query = normalizeText(query);
      state.page = 1;
      state.totalPages = 1;
      const hasQuery = Boolean(state.query);
      if (!hasQuery && state.controller) {
        state.controller.abort();
        state.controller = null;
        state.isLoading = false;
      }
      setView(hasQuery);
      $('wtsrInput').value = state.query;
      syncClearButton();
      document.title = hasQuery ? `${state.query} 검색 결과 | Be Stayable` : '검색 | Be Stayable';
      if (replaceUrl) {
        const nextUrl = hasQuery ? `/search/?q=${encodeURIComponent(state.query)}` : '/search/';
        window.history.replaceState({}, '', nextUrl);
      }
      if (hasQuery) loadSearch({ page: 1, append: false });
      else focusSearchInput();
    }

    const backButton = $('wtsrBackBtn');
    if (backButton) {
      backButton.addEventListener('click', goBack);
    }

    document.querySelectorAll('[data-wtsr-query]').forEach((button) => {
      button.addEventListener('click', () => startSearch(button.dataset.wtsrQuery || '', { replaceUrl: true }));
    });

    const searchInput = $('wtsrInput');
    const clearButton = $('wtsrClearBtn');

    searchInput.addEventListener('input', syncClearButton);

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        syncClearButton();
        startSearch('', { replaceUrl: true });
        focusSearchInput();
      });
    }

    $('wtsrForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const query = normalizeText($('wtsrInput').value);
      if (!query) {
        $('wtsrInput').focus();
        startSearch('', { replaceUrl: true });
        return;
      }
      startSearch(query, { replaceUrl: true });
    });

    $('wtsrMoreBtn').addEventListener('click', () => {
      if (state.page >= state.totalPages) return;
      loadSearch({ page: state.page + 1, append: true });
    });

    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      startSearch(params.get('q') || '', { replaceUrl: false });
    });

    const initialParams = new URLSearchParams(window.location.search);
    startSearch(initialParams.get('q') || '', { replaceUrl: false });
