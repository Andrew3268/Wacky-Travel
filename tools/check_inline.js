
    (() => {
      const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[ch]));
      const root = document.querySelector('[data-city-post-root]');
      const travelRoot = document.querySelector('[data-city-travel-root]');
      const destination = root?.dataset.destinationSlug || document.body?.dataset.destinationSlug || 'osaka';
      const hotelPageSize = Math.max(1, Number(root?.dataset.pageSize || 6) || 6);
      const hotelArchiveLinks = {
        top5_series: '/destinations/osaka/hotel-recommendations/',
        hotel_intro: '/destinations/osaka/hotels/'
      };
      const hotelArchiveLabels = {
        top5_series: '여행 스타일별 호텔 추천 더 보기 →',
        hotel_intro: '추천 호텔 리뷰 더 보기 →'
      };

      const fetchJson = async (url, fallback) => {
        try {
          const response = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-store' });
          if (!response.ok) return fallback;
          return await response.json();
        } catch (_) {
          return fallback;
        }
      };

      const paramsFor = ({ type, offset = 0, limit = hotelPageSize }) => {
        const params = new URLSearchParams({ destination, type, offset: String(offset), limit: String(limit) });
        return '/api/destination-posts?' + params.toString();
      };

      const setActiveTab = (type) => {
        if (!root) return;
        root.querySelectorAll('[data-city-post-tab]').forEach((button) => {
          const active = button.getAttribute('data-city-post-tab') === type;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        root.querySelectorAll('[data-city-post-panel]').forEach((panel) => {
          const active = panel.getAttribute('data-city-post-panel') === type;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });
      };

      const renderMoreButton = ({ type, offset, hasMore, target = 'hotel' }) => {
        if (target === 'hotel') {
          const href = hotelArchiveLinks[type] || '/destinations/osaka/hotels/';
          const label = hotelArchiveLabels[type] || '오사카 호텔 글 더 보기 →';
          return `<a class="hotel-load-more" href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
        }
        if (!hasMore) return '';
        return `<button class="hotel-load-more" type="button" data-city-travel-more="${escapeHtml(type)}" data-offset="${Number(offset || 0)}">더보기</button>`;
      };

      const loadHotelGroup = async (type) => {
        const grid = root?.querySelector(`[data-city-post-grid="${type}"]`);
        const footer = root?.querySelector(`[data-city-post-footer="${type}"]`);
        if (!grid || !footer) return;
        const data = await fetchJson(paramsFor({ type, offset: 0, limit: hotelPageSize }), { ok: false, html: '', hasMore: false, nextOffset: 0, total: 0 });
        if (!data.ok || !data.html) {
          grid.innerHTML = `<div class="empty-card">현재 준비 중인 글입니다. 곧 더 다양한 오사카 호텔 추천을 확인하실 수 있습니다.</div>`;
          footer.innerHTML = renderMoreButton({ type });
          footer.hidden = false;
          return;
        }
        grid.innerHTML = data.html;
        footer.innerHTML = renderMoreButton({ type, offset: data.nextOffset, hasMore: data.hasMore });
        footer.hidden = false;
      };

      const loadTravelPosts = async () => {
        const list = travelRoot?.querySelector('[data-city-travel-list]');
        const footer = travelRoot?.querySelector('[data-city-travel-footer]');
        const section = travelRoot?.closest('.wt-city-dynamic-section');
        if (!list || !footer) return;
        const data = await fetchJson(paramsFor({ type: 'travel_content', offset: 0, limit: 5 }), { ok: false, html: '', hasMore: false, nextOffset: 0 });
        if (data.ok && data.html) {
          list.innerHTML = data.html;
          footer.innerHTML = renderMoreButton({ type: 'travel_content', offset: data.nextOffset, hasMore: data.hasMore, target: 'travel' });
          footer.hidden = !data.hasMore;
          if (section) section.hidden = false;
          return;
        }
        if (section) section.hidden = true;
      };

      root?.addEventListener('click', async (event) => {
        const tabButton = event.target.closest('[data-city-post-tab]');
        if (tabButton) {
          setActiveTab(tabButton.getAttribute('data-city-post-tab'));
          return;
        }
      });

      travelRoot?.addEventListener('click', async (event) => {
        const moreButton = event.target.closest('[data-city-travel-more]');
        if (!moreButton || moreButton.dataset.loading === '1') return;
        const list = travelRoot.querySelector('[data-city-travel-list]');
        const footer = travelRoot.querySelector('[data-city-travel-footer]');
        const offset = Number(moreButton.dataset.offset || 0);
        if (!list || !footer) return;
        moreButton.dataset.loading = '1';
        moreButton.textContent = '불러오는 중...';
        const data = await fetchJson(paramsFor({ type: 'travel_content', offset, limit: 5 }), { ok: false, html: '', hasMore: false, nextOffset: offset });
        if (data.ok && data.html) list.insertAdjacentHTML('beforeend', data.html);
        footer.innerHTML = renderMoreButton({ type: 'travel_content', offset: data.nextOffset || offset + 5, hasMore: Boolean(data.hasMore), target: 'travel' });
        footer.hidden = !data.hasMore;
      });

      loadHotelGroup('top5_series');
      loadHotelGroup('hotel_intro');
      loadTravelPosts();
    })();
  