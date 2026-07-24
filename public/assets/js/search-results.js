const $ = (id) => document.getElementById(id);
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
    const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();
    const escapeRegExp = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const state = { query: '', page: 1, totalPages: 1, isLoading: false };
    const blockedSingleKeywords = new Set(['호텔', '숙소', '여행', '추천']);

    function isBlockedSingleKeyword(value = '') {
      return blockedSingleKeywords.has(normalizeText(value).toLowerCase());
    }

    function safeArray(value) {
      if (Array.isArray(value)) return value;
      try {
        const parsed = JSON.parse(value || '[]');
        return Array.isArray(parsed) ? parsed : [];
      } catch (_) {
        return [];
      }
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

    function normalizeSearchBlob(value = '') {
      return normalizeText(value).toLowerCase();
    }

    function compactSearchBlob(value = '') {
      return normalizeSearchBlob(value).replace(/[\s\-_/·・.,，、|()（）\[\]{}<>]+/g, '');
    }

    function itemMatchesQuery(item = {}, query = '') {
      const title = normalizeSearchBlob(item.title);
      const compactTitle = compactSearchBlob(item.title);
      const terms = getHighlightTerms(query).map((term) => normalizeSearchBlob(term)).filter(Boolean);
      if (!terms.length) return false;
      return terms.some((term) => title.includes(term) || compactTitle.includes(compactSearchBlob(term)));
    }

    async function loadFallbackSearch(query = '') {
      const collected = [];
      const seen = new Set();
      let page = 1;
      let hasMore = true;

      while (hasMore && page <= 30) {
        const url = new URL('/api/posts', window.location.origin);
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', '24');
        url.searchParams.set('sort', 'published');
        url.searchParams.set('ts', String(Date.now()));
        const res = await fetch(url.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' });
        if (!res.ok) break;
        const data = await res.json().catch(() => ({}));
        const items = Array.isArray(data.items) ? data.items : [];
        for (const item of items) {
          const slug = String(item.slug || '');
          if (!slug || seen.has(slug)) continue;
          if (!itemMatchesQuery(item, query)) continue;
          seen.add(slug);
          collected.push(item);
        }
        hasMore = Boolean(data.pagination && data.pagination.has_more);
        page += 1;
      }

      return collected.slice(0, 24);
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

    function getTags(item = {}) {
      return [...safeArray(item.tags_json), ...safeArray(item.longtail_keywords_json)]
        .map(normalizeText)
        .filter(Boolean)
        .slice(0, 5);
    }

    function renderCard(item = {}, index = 0) {
      const slug = String(item.slug || '').trim();
      const href = `/post/${encodeURIComponent(slug)}`;
      const title = item.title || '여행 글';
      const type = labelPostType(item.content_type);
      const category = normalizeText(item.category);
      const excerpt = getExcerpt(item);
      const number = String(index + 1).padStart(2, '0');
      return `<article class="wtsr-card">
        <a class="wtsr-card__link" href="${href}" aria-label="${escapeHtml(title)} 읽기">
          <span class="wtsr-card__index">${number}</span>
          <div class="wtsr-card__body">
            <div class="wtsr-card__meta"><span>${escapeHtml(type)}</span>${category ? `<span>${escapeHtml(category)}</span>` : ''}</div>
            <h3>${highlightText(title, state.query)}</h3>
            <p>${escapeHtml(excerpt)}</p>
          </div>
          <span class="wtsr-card__arrow" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M4 10h11"></path><path d="m11 6 4 4-4 4"></path></svg></span>
        </a>
      </article>`;
    }

    function setEmpty(messageTitle, messageText = '') {
      $('wtsrResults').innerHTML = `<div class="wtsr-empty"><strong>${escapeHtml(messageTitle)}</strong>${escapeHtml(messageText)}</div>`;
      $('wtsrMoreBtn').hidden = true;
    }

    function setSummary(total = 0) {
      const query = state.query;
      $('wtsrSummaryTitle').innerHTML = query ? `“${highlightText(query, query)}” 관련 콘텐츠` : '검색어를 입력해 주세요';
      $('wtsrSummaryText').textContent = query
        ? '글 제목에 검색어가 포함된 콘텐츠만 보여드립니다.'
        : '원하는 도시명이나 호텔명을 검색해 보세요.';
      $('wtsrCount').hidden = !query;
      $('wtsrCount').textContent = `${Number(total || 0).toLocaleString('ko-KR')}개 결과`;
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
      setSummary(0);
      if (!query) {
        setEmpty('검색어를 입력해 주세요', '예: 오사카 난바 호텔, 후쿠오카 하카타 숙소, 다낭 미케비치 호텔');
        return;
      }
      if (isBlockedSingleKeyword(query)) {
        setSummary(0);
        setEmpty('검색어가 너무 넓습니다', '도시, 지역 또는 여행 조건을 함께 입력해 주세요. 예: 다낭 호텔, 하카타역 숙소, 공항 근처 호텔');
        return;
      }
      if (state.isLoading) return;
      state.isLoading = true;
      setLoading(append);

      try {
        const url = new URL('/api/search', window.location.origin);
        url.searchParams.set('q', query);
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', '12');
                url.searchParams.set('ts', String(Date.now()));
        const res = await fetch(url.toString(), { headers: { Accept: 'application/json' }, cache: 'no-store' });
        if (!res.ok) throw new Error('search_failed');
        const data = await res.json().catch(() => ({}));
        if (data.blocked) {
          setSummary(0);
          setEmpty('검색어가 너무 넓습니다', data.message || '도시, 지역 또는 여행 조건을 함께 입력해 주세요.');
          return;
        }
        const items = Array.isArray(data.items) ? data.items : [];
        const pagination = data.pagination || {};
        const total = Number(pagination.total || items.length || 0);
        state.page = Number(pagination.page || page) || page;
        state.totalPages = Number(pagination.total_pages || 1) || 1;
        setSummary(total);

        if (!items.length && !append) {
          const fallbackItems = await loadFallbackSearch(query).catch(() => []);
          if (fallbackItems.length) {
            setSummary(fallbackItems.length);
            $('wtsrResults').innerHTML = fallbackItems.map(renderCard).join('');
            $('wtsrMoreBtn').hidden = true;
            return;
          }
          setEmpty('검색 결과가 없습니다', '제목에 들어갈 만한 도시명이나 호텔명으로 다시 검색해 보세요.');
        } else {
          const html = items.map(renderCard).join('');
          $('wtsrResults').innerHTML = append ? $('wtsrResults').innerHTML + html : html;
        }

        const hasMore = Boolean(pagination.has_more) && state.page < state.totalPages;
        $('wtsrMoreBtn').hidden = !hasMore;
        $('wtsrMoreBtn').textContent = '더 보기';
        $('wtsrMoreBtn').disabled = false;
      } catch (_) {
        const fallbackItems = !append ? await loadFallbackSearch(query).catch(() => []) : [];
        if (fallbackItems.length) {
          setSummary(fallbackItems.length);
          $('wtsrResults').innerHTML = fallbackItems.map(renderCard).join('');
        } else {
          $('wtsrResults').innerHTML = '<div class="wtsr-error"><strong>검색 결과를 불러오지 못했습니다</strong>제목에 들어갈 만한 도시명이나 호텔명으로 다시 검색해 보세요.</div>';
        }
        $('wtsrMoreBtn').hidden = true;
      } finally {
        state.isLoading = false;
      }
    }

    function startSearch(query, { replaceUrl = false } = {}) {
      state.query = normalizeText(query);
      state.page = 1;
      state.totalPages = 1;
      $('wtsrInput').value = state.query;
      document.title = state.query ? `${state.query} 검색 결과 | Wacky Travel` : '검색 결과 | Wacky Travel';
      if (replaceUrl) {
        const nextUrl = state.query ? `/search/?q=${encodeURIComponent(state.query)}` : '/search/';
        window.history.pushState({}, '', nextUrl);
      }
      loadSearch({ page: 1, append: false });
    }

    const backButton = $('wtsrBackBtn');
    if (backButton) {
      backButton.addEventListener('click', () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '/';
        }
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
