
    const $ = (id) => document.getElementById(id);
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
    const normalizeText = (value) => String(value || '').replace(/\s+/g, ' ').trim();
    const escapeRegExp = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const state = { query: '', page: 1, totalPages: 1, isLoading: false };

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
      if (type === 'hotel_intro') return '호텔 하나씩 살펴보기';
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

    function buildClientSearchText(item = {}) {
      const tags = [...safeArray(item.tags_json), ...safeArray(item.longtail_keywords_json)].join(' ');
      return [
        item.slug,
        item.title,
        item.summary,
        item.meta_description,
        item.category,
        item.focus_keyword,
        item.search_intent,
        item.destination_slug,
        item.hotel_slug,
        item.hotel_name,
        item.hotel_name_en,
        item.hotel_area,
        item.content_type,
        tags
      ].map(normalizeText).filter(Boolean).join(' ');
    }

    function itemMatchesQuery(item = {}, query = '') {
      const source = normalizeSearchBlob(buildClientSearchText(item));
      const compactSource = compactSearchBlob(source);
      const terms = getHighlightTerms(query).map((term) => normalizeSearchBlob(term)).filter(Boolean);
      if (!terms.length) return false;
      return terms.some((term) => source.includes(term) || compactSource.includes(compactSearchBlob(term)));
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

    function renderCard(item = {}) {
      const slug = String(item.slug || '').trim();
      const href = `/post/${encodeURIComponent(slug)}`;
      const title = item.title || '여행 글';
      const metaItems = [labelPostType(item.content_type), item.category, item.hotel_name].map(normalizeText).filter(Boolean).slice(0, 3);
      const tags = getTags(item);
      const cover = normalizeText(item.cover_image);
      const alt = normalizeText(item.cover_image_alt) || title;
      return `<article class="wtsr-card">
        <a class="wtsr-card__media" href="${href}" aria-label="${escapeHtml(title)} 읽기">
          ${cover ? `<img src="${escapeHtml(cover)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async" />` : '<div class="wtsr-card__placeholder" aria-hidden="true">🏨</div>'}
        </a>
        <div class="wtsr-card__body">
          ${metaItems.length ? `<div class="wtsr-card__meta">${metaItems.map((meta) => `<span>${highlightText(meta, state.query)}</span>`).join('')}</div>` : ''}
          <h3><a href="${href}">${highlightText(title, state.query)}</a></h3>
          <p>${highlightText(getExcerpt(item), state.query)}</p>
          ${tags.length ? `<div class="wtsr-card__tags">${tags.map((tag) => `<span>${highlightText(tag, state.query)}</span>`).join('')}</div>` : ''}
        </div>
      </article>`;
    }

    function setEmpty(messageTitle, messageText = '') {
      $('wtsrResults').innerHTML = `<div class="wtsr-empty"><strong>${escapeHtml(messageTitle)}</strong>${escapeHtml(messageText)}</div>`;
      $('wtsrMoreBtn').hidden = true;
    }

    function setSummary(total = 0) {
      const query = state.query;
      $('wtsrTitleKeyword').innerHTML = highlightText(query || '검색어', query);
      $('wtsrSummaryTitle').innerHTML = query ? `“${highlightText(query, query)}” 관련 콘텐츠` : '검색어를 입력해 주세요';
      $('wtsrSummaryText').textContent = query
        ? '제목, 요약, 카테고리, 태그, 본문 내용에서 검색어와 관련된 콘텐츠를 찾습니다.'
        : '홈 화면이나 이 페이지 검색창에서 원하는 도시, 호텔명, 여행지를 입력하면 관련 콘텐츠를 보여드립니다.';
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
          setEmpty('검색 결과가 없습니다', '검색어를 조금 짧게 입력하거나 도시명, 호텔명 중심으로 다시 검색해 보세요.');
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
          $('wtsrResults').innerHTML = '<div class="wtsr-error"><strong>검색 결과를 불러오지 못했습니다</strong>검색어를 조금 짧게 입력하거나 도시명, 호텔명 중심으로 다시 검색해 보세요.</div>';
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
      if (replaceUrl) {
        const nextUrl = state.query ? `/search/?q=${encodeURIComponent(state.query)}` : '/search/';
        window.history.pushState({}, '', nextUrl);
      }
      loadSearch({ page: 1, append: false });
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
  