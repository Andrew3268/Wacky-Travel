(() => {
  const MOOD_SLUG = 'ocean-rest';
  const grid = document.getElementById('oceanHotelGrid');
  const editorsGrid = document.getElementById('oceanEditorsGrid');
  const tabsRoot = document.getElementById('oceanCityTabs');
  const resultText = document.getElementById('oceanResultText');

  if (!grid || !editorsGrid || !tabsRoot || !resultText) return;

  const destinationNames = {
    'da-nang': '다낭',
    'nha-trang': '나트랑',
    'phu-quoc': '푸꾸옥',
    'okinawa': '오키나와',
    'fukuoka': '후쿠오카',
    'osaka': '오사카',
    'tokyo': '도쿄',
    'sapporo': '삿포로',
    'taipei': '타이베이',
    'taichung': '타이중',
    'tainan': '타이난',
    'kaohsiung': '가오슝',
    'hualien': '화렌',
    'hanoi': '하노이',
    'ho-chi-minh-city': '호치민'
  };

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const parseArray = (value) => {
    if (Array.isArray(value)) return value;
    try {
      const parsed = JSON.parse(String(value || '[]'));
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  };

  const cityName = (slug = '') => destinationNames[slug] || String(slug || '').replaceAll('-', ' ');
  const postUrl = (slug = '') => `/post/${encodeURIComponent(slug)}`;

  function normalizePost(item) {
    const moodTags = parseArray(item.mood_tags || item.mood_tags_json);
    const tags = parseArray(item.tags_json).slice(0, 3);
    return {
      ...item,
      moodTags,
      tags,
      destination_slug: String(item.destination_slug || '').trim(),
      title: String(item.title || item.hotel_name || '추천 호텔 리뷰').trim(),
      summary: String(item.summary || item.meta_description || '바다를 가까이 두고 머물기 좋은 호텔입니다.').trim(),
      cover_image: String(item.cover_image || '').trim(),
      region_name: String(item.region_name || '').trim()
    };
  }

  function featureMarkup(item, index) {
    const isSmall = index > 0;
    const image = item.cover_image
      ? `<img class="wtm-feature__image" src="${escapeHtml(item.cover_image)}" alt="${escapeHtml(item.cover_image_alt || item.title)}" loading="${index === 0 ? 'eager' : 'lazy'}" />`
      : '';
    const tags = [cityName(item.destination_slug), ...item.tags].filter(Boolean).slice(0, 3);
    return `<a class="wtm-feature${isSmall ? ' wtm-feature--small' : ''}" href="${postUrl(item.slug)}">
      ${image}
      <div class="wtm-feature__body">
        <span class="wtm-feature__number">${String(index + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <div class="wtm-meta">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      </div>
    </a>`;
  }

  function cardMarkup(item) {
    const location = [cityName(item.destination_slug), item.region_name].filter(Boolean).join(' · ');
    const image = item.cover_image
      ? `<img class="wtm-hotel-card__image" src="${escapeHtml(item.cover_image)}" alt="${escapeHtml(item.cover_image_alt || item.title)}" loading="lazy" />`
      : '';
    const tags = item.tags.length ? item.tags : ['바다 휴식', '호텔 큐레이션'];
    return `<article class="wtm-hotel-card" data-city="${escapeHtml(item.destination_slug || 'other')}">
      <a class="wtm-hotel-card__visual" href="${postUrl(item.slug)}" aria-label="${escapeHtml(item.title)} 리뷰 보기">${image}</a>
      <p class="wtm-hotel-card__location">${escapeHtml(location || 'Travel by Mood')}</p>
      <h3><a href="${postUrl(item.slug)}">${escapeHtml(item.title)}</a></h3>
      <p class="wtm-hotel-card__reason">${escapeHtml(item.summary)}</p>
      <div class="wtm-hotel-card__tags">${tags.slice(0, 3).map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
      <p class="wtm-hotel-card__check"><strong>에디터 노트</strong> 객실 전망과 실제 해변 동선은 객실 유형과 호텔 위치에 따라 달라질 수 있습니다.</p>
      <a class="wtm-hotel-card__link" href="${postUrl(item.slug)}">호텔 리뷰 보기</a>
    </article>`;
  }

  function buildTabs(items) {
    const counts = items.reduce((map, item) => {
      const slug = item.destination_slug || 'other';
      map.set(slug, (map.get(slug) || 0) + 1);
      return map;
    }, new Map());

    const tabs = [
      `<button class="wtm-tab is-active" type="button" data-city="all" role="tab" aria-selected="true">전체 <small>${items.length}</small></button>`,
      ...[...counts.entries()].map(([slug, count]) => `<button class="wtm-tab" type="button" data-city="${escapeHtml(slug)}" role="tab" aria-selected="false">${escapeHtml(cityName(slug))} <small>${count}</small></button>`)
    ];
    tabsRoot.innerHTML = tabs.join('');

    tabsRoot.querySelectorAll('.wtm-tab').forEach(button => {
      button.addEventListener('click', () => {
        const selected = button.dataset.city;
        tabsRoot.querySelectorAll('.wtm-tab').forEach(tab => {
          const active = tab === button;
          tab.classList.toggle('is-active', active);
          tab.setAttribute('aria-selected', String(active));
        });
        let visible = 0;
        grid.querySelectorAll('.wtm-hotel-card').forEach(card => {
          const show = selected === 'all' || card.dataset.city === selected;
          card.hidden = !show;
          if (show) visible += 1;
        });
        resultText.textContent = `${selected === 'all' ? '전체 도시' : cityName(selected)}의 호텔 리뷰 ${visible}개를 보고 있습니다.`;
      });
    });
  }

  async function loadPosts() {
    try {
      const params = new URLSearchParams({
        status: 'published',
        content_type: 'hotel_intro',
        mood_tag: MOOD_SLUG,
        per_page: '24',
        sort: 'published'
      });
      const response = await fetch(`/api/posts?${params.toString()}`, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error('호텔 리뷰를 불러오지 못했습니다.');
      const payload = await response.json();
      const items = (Array.isArray(payload.items) ? payload.items : [])
        .map(normalizePost)
        .filter(item => item.moodTags.includes(MOOD_SLUG));

      if (!items.length) {
        editorsGrid.innerHTML = `<article class="wtm-feature"><div class="wtm-feature__body"><span class="wtm-feature__number">01</span><h3>아직 연결된 호텔 리뷰가 없습니다</h3><p>추천 호텔 리뷰 add/edit에서 ‘바다를 보며 쉬는 여행’을 선택하면 자동으로 표시됩니다.</p></div></article>`;
        grid.innerHTML = `<div class="wtm-empty"><strong>준비 중인 호텔 컬렉션입니다</strong><p>관리자에서 Ocean Rest 항목을 연결한 추천 호텔 리뷰가 이곳에 자동으로 표시됩니다.</p></div>`;
        resultText.textContent = '현재 연결된 추천 호텔 리뷰가 없습니다.';
        buildTabs([]);
        return;
      }

      editorsGrid.innerHTML = items.slice(0, 3).map(featureMarkup).join('');
      grid.innerHTML = items.map(cardMarkup).join('');
      buildTabs(items);
      resultText.textContent = `전체 도시의 호텔 리뷰 ${items.length}개를 보고 있습니다.`;
    } catch (error) {
      console.error(error);
      grid.innerHTML = `<div class="wtm-empty"><strong>호텔 컬렉션을 불러오지 못했습니다</strong><p>잠시 후 다시 시도해 주세요.</p></div>`;
      resultText.textContent = '호텔 리뷰를 불러오지 못했습니다.';
    }
  }

  loadPosts();
})();
