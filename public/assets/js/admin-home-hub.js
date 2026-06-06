const $ = (id) => document.getElementById(id);

const HUB_DESTINATION_LIMIT = 5;

const state = {
  countries: [],
  destinations: [],
  editingSlug: ''
};

function escapeHtml(value = '') {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeText(value = '') {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function slugify(value = '') {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9가-힣_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function countryToSlug(value = '') {
  const raw = normalizeText(value);
  const aliases = {
    베트남: 'vietnam', 일본: 'japan', 태국: 'thailand', 대한민국: 'korea', 한국: 'korea',
    대만: 'taiwan', 싱가포르: 'singapore', 말레이시아: 'malaysia', 인도네시아: 'indonesia',
    필리핀: 'philippines', 홍콩: 'hong-kong', 마카오: 'macau', 중국: 'china', 미국: 'usa',
    프랑스: 'france', 이탈리아: 'italy', 스페인: 'spain'
  };
  return aliases[raw] || slugify(raw);
}

function getCountryNameBySlug(slug = '') {
  const found = state.countries.find((country) => String(country.slug || '') === String(slug || ''));
  return found?.name || '';
}

function getCountrySlugFromDestination(item = {}) {
  return String(item.country_slug || '').trim() || countryToSlug(item.country || '');
}

function getDestinationLabel(item = {}) {
  const city = normalizeText(item.city);
  const name = normalizeText(item.name);
  return city && name && city !== name ? `${name} (${city})` : (name || city || item.slug || '도시');
}

function isActiveCountry(country = {}) {
  return Number(country.is_active ?? 1) !== 0;
}

function isActiveDestination(item = {}) {
  return Number(item.is_active ?? 1) !== 0 && String(item.status || 'published') !== 'draft';
}

function compareByOrderThenName(a = {}, b = {}) {
  const ao = Number(a.sort_order || 0) || 999;
  const bo = Number(b.sort_order || 0) || 999;
  if (ao !== bo) return ao - bo;
  return getDestinationLabel(a).localeCompare(getDestinationLabel(b), 'ko');
}

function compareFeaturedThenName(a = {}, b = {}) {
  const af = Number(a.home_featured || 0) === 1 ? 0 : 1;
  const bf = Number(b.home_featured || 0) === 1 ? 0 : 1;
  if (af !== bf) return af - bf;
  if (af === 0) {
    const ao = Number(a.home_featured_order || 0) || 999;
    const bo = Number(b.home_featured_order || 0) || 999;
    if (ao !== bo) return ao - bo;
  }
  return compareByOrderThenName(a, b);
}

function getDestinationsByCountry(countrySlug = '', { includeInactive = true } = {}) {
  const slug = String(countrySlug || '').trim();
  return state.destinations
    .filter((item) => {
      if (!includeInactive && !isActiveDestination(item)) return false;
      if (!slug) return true;
      return getCountrySlugFromDestination(item) === slug;
    })
    .sort(compareFeaturedThenName);
}

let hubStatusTimer = null;

function setStatus(message = '', type = 'info') {
  const el = $('hubManagerStatus');
  if (!el) return;
  const isError = type === 'error' || type === true;
  const isSuccess = type === 'success';
  window.clearTimeout(hubStatusTimer);
  el.textContent = message;
  el.classList.remove('is-success', 'is-error', 'is-info');
  if (isSuccess) el.classList.add('is-success');
  else if (isError) el.classList.add('is-error');
  else if (message) el.classList.add('is-info');
  el.classList.toggle('is-visible', Boolean(message));
  if (message) {
    const delay = isError ? 5200 : 3200;
    hubStatusTimer = window.setTimeout(() => {
      el.classList.remove('is-visible');
    }, delay);
  }
}

function focusField(id = '') {
  const el = $(id);
  if (!el) return;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function requireHubField(id = '', message = '') {
  const el = $(id);
  if (!el) return true;
  const value = normalizeText(el.value || '');
  if (value) return true;
  setStatus(message, 'error');
  focusField(id);
  return false;
}

async function requestTravelSettings(method = 'GET', payload = null) {
  const options = {
    method,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: { Accept: 'application/json' }
  };
  if (payload && method !== 'GET') {
    options.headers['content-type'] = 'application/json';
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(`/api/travel-settings?ts=${Date.now()}`, options);
  const json = await res.json().catch(() => ({}));
  if (res.status === 401) {
    location.href = '/admin/';
    return null;
  }
  if (!res.ok) throw new Error(json?.message || `요청에 실패했습니다. (${res.status})`);
  return json;
}

async function loadHubSettings(message = '') {
  try {
    const json = await requestTravelSettings('GET');
    if (!json) return;
    state.countries = Array.isArray(json.countries) ? json.countries : [];
    state.destinations = Array.isArray(json.destinations) ? json.destinations : [];
    renderAll();
    setStatus(message || '여행자 허브 정보를 불러왔습니다.', message ? 'success' : 'info');
  } catch (error) {
    console.error(error);
    setStatus(error.message || '여행자 허브 정보를 불러오지 못했습니다.', 'error');
  }
}

function renderOverview() {
  const activeCountries = state.countries.filter(isActiveCountry);
  const activeDestinations = state.destinations.filter(isActiveDestination);
  const featuredDestinations = activeDestinations.filter((item) => Number(item.home_featured || 0) === 1);
  if ($('hubCountryCount')) $('hubCountryCount').textContent = String(activeCountries.length);
  if ($('hubDestinationCount')) $('hubDestinationCount').textContent = String(activeDestinations.length);
  if ($('hubFeaturedCount')) $('hubFeaturedCount').textContent = String(featuredDestinations.length);
}

function renderCountryOptions() {
  const countries = state.countries.filter(isActiveCountry).sort((a, b) => {
    const ao = Number(a.sort_order || 0) || 999;
    const bo = Number(b.sort_order || 0) || 999;
    if (ao !== bo) return ao - bo;
    return String(a.name || '').localeCompare(String(b.name || ''), 'ko');
  });

  const optionHtml = countries.map((country) => `<option value="${escapeHtml(country.slug || '')}">${escapeHtml(country.name || country.slug || '')}</option>`).join('');

  const addCountry = $('hubAddCountry');
  if (addCountry) addCountry.innerHTML = `<option value="">나라 선택</option>${optionHtml}`;

  const featuredCountry = $('hubFeaturedCountry');
  if (featuredCountry) {
    const current = featuredCountry.value;
    featuredCountry.innerHTML = `<option value="">나라 선택</option>${optionHtml}`;
    featuredCountry.value = current && countries.some((country) => country.slug === current) ? current : (countries[0]?.slug || '');
  }

  const editCountry = $('hubEditCountry');
  if (editCountry) {
    const current = editCountry.value || 'all';
    editCountry.innerHTML = `<option value="all">전체 나라</option>${optionHtml}`;
    editCountry.value = current === 'all' || countries.some((country) => country.slug === current) ? current : 'all';
  }

  const editCountryField = $('hubEditCountryField');
  if (editCountryField) {
    const current = editCountryField.value;
    editCountryField.innerHTML = `<option value="">나라 선택</option>${optionHtml}`;
    editCountryField.value = current;
  }
}

function getSelectedFeaturedSlugs() {
  return Array.from(document.querySelectorAll('[data-hub-featured-row]'))
    .filter((row) => row.querySelector('[data-hub-featured-checkbox]')?.checked)
    .map((row) => row.dataset.hubFeaturedRow || '')
    .filter(Boolean);
}

function updateFeaturedBadges() {
  const rows = Array.from(document.querySelectorAll('[data-hub-featured-row]'));
  const selectedRows = rows.filter((row) => row.querySelector('[data-hub-featured-checkbox]')?.checked);
  rows.forEach((row) => {
    const checked = Boolean(row.querySelector('[data-hub-featured-checkbox]')?.checked);
    const controls = row.querySelector('[data-hub-featured-controls]');
    const badge = row.querySelector('[data-hub-featured-badge]');
    row.classList.toggle('is-selected', checked);
    if (controls) controls.hidden = !checked;
    if (badge && !checked) badge.textContent = '미노출';
  });
  selectedRows.forEach((row, index) => {
    const badge = row.querySelector('[data-hub-featured-badge]');
    const upBtn = row.querySelector('[data-hub-featured-move="up"]');
    const downBtn = row.querySelector('[data-hub-featured-move="down"]');
    if (badge) badge.textContent = `노출 ${index + 1}`;
    if (upBtn) upBtn.disabled = index === 0;
    if (downBtn) downBtn.disabled = index === selectedRows.length - 1;
  });
  const countLabel = $('hubFeaturedCountLabel');
  if (countLabel) countLabel.textContent = `${selectedRows.length}/${HUB_DESTINATION_LIMIT} 선택`;
}

function renderFeaturedManager() {
  const list = $('hubFeaturedList');
  if (!list) return;
  const countrySlug = $('hubFeaturedCountry')?.value || '';
  const countryName = getCountryNameBySlug(countrySlug);
  const items = getDestinationsByCountry(countrySlug, { includeInactive: false });

  if (!countrySlug) {
    list.innerHTML = '<div class="home-destination-empty small">인기 도시를 관리할 나라를 선택해 주세요.</div>';
    updateFeaturedBadges();
    return;
  }

  if (!items.length) {
    list.innerHTML = `<div class="home-destination-empty small">${escapeHtml(countryName || '선택한 나라')}에 등록된 공개 도시가 없습니다. 먼저 나라별 도시 추가에서 도시를 추가해 주세요.</div>`;
    updateFeaturedBadges();
    return;
  }

  list.innerHTML = items.map((item) => {
    const slug = String(item.slug || '');
    const label = getDestinationLabel(item);
    const checked = Number(item.home_featured || 0) === 1;
    return `<div class="home-destination-option ${checked ? 'is-selected' : ''}" data-hub-featured-row="${escapeHtml(slug)}">
      <label class="home-destination-option__main">
        <input type="checkbox" data-hub-featured-checkbox value="${escapeHtml(slug)}" ${checked ? 'checked' : ''} />
        <span class="home-destination-option__body">
          <strong>${escapeHtml(label)}</strong>
          <em>${escapeHtml(item.card_title || item.hero_title || item.title || item.slug || '')}</em>
        </span>
      </label>
      <div class="home-destination-option__controls" data-hub-featured-controls ${checked ? '' : 'hidden'}>
        <span class="home-destination-option__badge" data-hub-featured-badge>${checked ? '노출 중' : '미노출'}</span>
        <button class="home-destination-option__move" type="button" data-hub-featured-move="up" data-slug="${escapeHtml(slug)}" aria-label="${escapeHtml(label)} 순서 올리기">↑</button>
        <button class="home-destination-option__move" type="button" data-hub-featured-move="down" data-slug="${escapeHtml(slug)}" aria-label="${escapeHtml(label)} 순서 내리기">↓</button>
      </div>
    </div>`;
  }).join('');
  updateFeaturedBadges();
}

function enforceFeaturedLimit(changedInput = null) {
  const selected = getSelectedFeaturedSlugs();
  if (selected.length <= HUB_DESTINATION_LIMIT) {
    updateFeaturedBadges();
    return true;
  }
  if (changedInput) changedInput.checked = false;
  updateFeaturedBadges();
  setStatus(`나라별 여행자 허브 노출 도시는 최대 ${HUB_DESTINATION_LIMIT}개까지 선택할 수 있습니다.`, 'error');
  return false;
}

function moveFeaturedRow(slug = '', direction = 'up') {
  const list = $('hubFeaturedList');
  if (!list) return;
  const selectedRows = Array.from(list.querySelectorAll('[data-hub-featured-row]'))
    .filter((row) => row.querySelector('[data-hub-featured-checkbox]')?.checked);
  const currentIndex = selectedRows.findIndex((row) => String(row.dataset.hubFeaturedRow || '') === String(slug || ''));
  if (currentIndex < 0) return;
  const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= selectedRows.length) return;
  const currentRow = selectedRows[currentIndex];
  const targetRow = selectedRows[targetIndex];
  if (direction === 'up') list.insertBefore(currentRow, targetRow);
  else list.insertBefore(targetRow, currentRow);
  updateFeaturedBadges();
}

async function saveFeaturedCities() {
  const countrySlug = $('hubFeaturedCountry')?.value || '';
  const countryName = getCountryNameBySlug(countrySlug);
  const slugs = getSelectedFeaturedSlugs();
  if (!countrySlug || !countryName) {
    setStatus('인기 도시를 저장할 나라를 선택해 주세요.', 'error');
    focusField('hubFeaturedCountry');
    return;
  }
  if (!slugs.length) {
    setStatus('인기 도시로 저장할 도시를 1개 이상 선택해 주세요.', 'error');
    return;
  }
  if (slugs.length > HUB_DESTINATION_LIMIT) return setStatus(`최대 ${HUB_DESTINATION_LIMIT}개까지 선택할 수 있습니다.`, 'error');
  try {
    await requestTravelSettings('PUT', {
      entity: 'home_destinations',
      current_slug: countrySlug,
      country_slug: countrySlug,
      country: countryName,
      slugs
    });
    await loadHubSettings(`${countryName} 인기 도시 ${slugs.length}개가 저장되었습니다.`);
  } catch (error) {
    setStatus(error.message || '인기 도시 저장에 실패했습니다.', 'error');
  }
}

function getAddPayload() {
  const countrySlug = $('hubAddCountry')?.value || '';
  const country = getCountryNameBySlug(countrySlug);
  const name = normalizeText($('hubAddName')?.value || '');
  const city = normalizeText($('hubAddCityName')?.value || name);
  const slug = slugify($('hubAddSlug')?.value || name);
  const summary = normalizeText($('hubAddSummary')?.value || '');
  const cardTitle = normalizeText($('hubAddCardTitle')?.value || '');
  const cardDescription = normalizeText($('hubAddCardDescription')?.value || '');
  const heroImage = normalizeText($('hubAddHeroImage')?.value || '');
  const sortOrder = Number($('hubAddSortOrder')?.value || 0) || 0;
  return {
    entity: 'destination',
    country_slug: countrySlug,
    country,
    name,
    city,
    slug,
    title: `${name} 여행 가이드`,
    hero_title: `${name} 여행 가이드`,
    hero_eyebrow: country,
    hero_summary: summary,
    summary,
    cover_image: heroImage,
    hero_image: heroImage,
    card_image: heroImage,
    card_title: cardTitle,
    card_description: cardDescription,
    meta_description: summary,
    status: 'published',
    is_active: 1,
    sort_order: sortOrder
  };
}

function clearAddForm() {
  ['hubAddName', 'hubAddCityName', 'hubAddSlug', 'hubAddSortOrder', 'hubAddSummary', 'hubAddCardTitle', 'hubAddCardDescription', 'hubAddHeroImage'].forEach((id) => {
    if ($(id)) $(id).value = '';
  });
}

function validateAddDestination() {
  if (!requireHubField('hubAddCountry', '도시를 추가할 나라를 선택해 주세요.')) return false;
  if (!requireHubField('hubAddName', '도시 표시 이름을 입력해 주세요.')) return false;
  if (!requireHubField('hubAddSlug', '도시 slug를 입력해 주세요.')) return false;
  return true;
}

async function addDestination() {
  if (!validateAddDestination()) return;
  const payload = getAddPayload();
  try {
    await requestTravelSettings('POST', payload);
    clearAddForm();
    await loadHubSettings(`${payload.name} 도시가 추가되었습니다. 인기 도시에 노출하려면 인기 도시 관리에서 선택해 주세요.`);
  } catch (error) {
    setStatus(error.message || '도시 추가에 실패했습니다.', 'error');
  }
}

function renderCityList() {
  const list = $('hubCityList');
  if (!list) return;
  const countryFilter = $('hubEditCountry')?.value || 'all';
  const keyword = normalizeText($('hubEditSearch')?.value || '').toLowerCase();
  let items = [...state.destinations].sort((a, b) => {
    const countryCompare = String(a.country || '').localeCompare(String(b.country || ''), 'ko');
    if (countryCompare) return countryCompare;
    return compareByOrderThenName(a, b);
  });
  if (countryFilter !== 'all') items = items.filter((item) => getCountrySlugFromDestination(item) === countryFilter);
  if (keyword) {
    items = items.filter((item) => [item.name, item.city, item.slug, item.country, item.card_title, item.hero_title]
      .some((value) => normalizeText(value).toLowerCase().includes(keyword)));
  }

  list.innerHTML = items.length ? items.map((item) => {
    const active = isActiveDestination(item);
    const featured = Number(item.home_featured || 0) === 1;
    const selected = String(item.slug || '') === String(state.editingSlug || '');
    return `<button class="admin-hub-city-card ${selected ? 'is-selected' : ''} ${active ? '' : 'is-inactive'}" type="button" data-hub-edit-city="${escapeHtml(item.slug || '')}">
      <span class="admin-hub-city-card__main">
        <strong>${escapeHtml(getDestinationLabel(item))}</strong>
        <em>${escapeHtml(item.country || getCountryNameBySlug(getCountrySlugFromDestination(item)) || '나라 미지정')} · slug: ${escapeHtml(item.slug || '')}</em>
      </span>
      <span class="admin-hub-city-card__badges">
        ${featured ? '<i>허브 노출</i>' : ''}
        <i>${active ? '공개' : '비공개'}</i>
      </span>
    </button>`;
  }).join('') : '<div class="category-manager__empty small">조건에 맞는 도시가 없습니다.</div>';
}

function showEditForm(show = true) {
  const form = $('hubEditForm');
  if (!form) return;
  form.hidden = !show;
}

function fillEditForm(slug = '') {
  const item = state.destinations.find((entry) => String(entry.slug || '') === String(slug || ''));
  if (!item) return;
  state.editingSlug = item.slug || '';
  showEditForm(true);
  if ($('hubEditTitle')) $('hubEditTitle').textContent = `${getDestinationLabel(item)} 수정`;
  if ($('hubEditCurrentSlug')) $('hubEditCurrentSlug').value = item.slug || '';
  if ($('hubEditCountryField')) $('hubEditCountryField').value = getCountrySlugFromDestination(item);
  if ($('hubEditName')) $('hubEditName').value = item.name || '';
  if ($('hubEditSlug')) $('hubEditSlug').value = item.slug || '';
  if ($('hubEditCityName')) $('hubEditCityName').value = item.city || item.name || '';
  if ($('hubEditStatus')) $('hubEditStatus').value = item.status || (Number(item.is_active ?? 1) ? 'published' : 'draft');
  if ($('hubEditSortOrder')) $('hubEditSortOrder').value = Number(item.sort_order || 0) || '';
  if ($('hubEditCardTitle')) $('hubEditCardTitle').value = item.card_title || '';
  if ($('hubEditCardDescription')) $('hubEditCardDescription').value = item.card_description || '';
  if ($('hubEditHeroEyebrow')) $('hubEditHeroEyebrow').value = item.hero_eyebrow || item.country || '';
  if ($('hubEditHeroTitle')) $('hubEditHeroTitle').value = item.hero_title || item.title || (item.name ? `${item.name} 여행 가이드` : '');
  if ($('hubEditHeroSummary')) $('hubEditHeroSummary').value = item.hero_summary || item.summary || '';
  if ($('hubEditHeroImage')) $('hubEditHeroImage').value = item.hero_image || item.cover_image || '';
  if ($('hubEditHeroImageAlt')) $('hubEditHeroImageAlt').value = item.hero_image_alt || item.cover_image_alt || '';
  if ($('hubEditBestSeason')) $('hubEditBestSeason').value = item.best_season || '';
  if ($('hubEditAirportInfo')) $('hubEditAirportInfo').value = item.airport_info || '';
  if ($('hubEditTransportSummary')) $('hubEditTransportSummary').value = item.transport_summary || '';
  if ($('hubEditMetaDescription')) $('hubEditMetaDescription').value = item.meta_description || '';
  renderCityList();
}

function clearEditForm() {
  state.editingSlug = '';
  showEditForm(false);
  if ($('hubEditForm')) $('hubEditForm').reset();
  renderCityList();
}

function getCurrentEditingItem() {
  const currentSlug = $('hubEditCurrentSlug')?.value || state.editingSlug || '';
  return state.destinations.find((entry) => String(entry.slug || '') === String(currentSlug || '')) || null;
}

function getEditPayload() {
  const current = getCurrentEditingItem();
  const countrySlug = $('hubEditCountryField')?.value || '';
  const country = getCountryNameBySlug(countrySlug);
  const name = normalizeText($('hubEditName')?.value || '');
  const city = normalizeText($('hubEditCityName')?.value || name);
  const slug = slugify($('hubEditSlug')?.value || name);
  const heroTitle = normalizeText($('hubEditHeroTitle')?.value || '') || `${name} 여행 가이드`;
  const heroSummary = normalizeText($('hubEditHeroSummary')?.value || '');
  const heroImage = normalizeText($('hubEditHeroImage')?.value || '');
  const heroImageAlt = normalizeText($('hubEditHeroImageAlt')?.value || '');
  const status = $('hubEditStatus')?.value || 'published';
  return {
    entity: 'destination',
    current_slug: current?.slug || state.editingSlug,
    country_slug: countrySlug,
    country,
    name,
    city,
    slug,
    title: heroTitle,
    hero_eyebrow: normalizeText($('hubEditHeroEyebrow')?.value || '') || country,
    hero_title: heroTitle,
    hero_summary: heroSummary,
    summary: heroSummary,
    cover_image: heroImage,
    cover_image_alt: heroImageAlt,
    hero_image: heroImage,
    hero_image_alt: heroImageAlt,
    card_image: heroImage,
    card_image_alt: heroImageAlt,
    card_title: normalizeText($('hubEditCardTitle')?.value || ''),
    card_description: normalizeText($('hubEditCardDescription')?.value || ''),
    meta_description: normalizeText($('hubEditMetaDescription')?.value || '') || heroSummary,
    best_season: normalizeText($('hubEditBestSeason')?.value || ''),
    airport_info: normalizeText($('hubEditAirportInfo')?.value || ''),
    transport_summary: normalizeText($('hubEditTransportSummary')?.value || ''),
    status,
    is_active: status === 'published' ? 1 : 0,
    sort_order: Number($('hubEditSortOrder')?.value || 0) || 0,
    home_featured: Number(current?.home_featured || 0) || 0,
    home_featured_order: Number(current?.home_featured_order || 0) || 0
  };
}

function validateDestinationEdit() {
  if (!getCurrentEditingItem()) {
    setStatus('수정할 도시를 먼저 선택해 주세요.', 'error');
    return false;
  }
  if (!requireHubField('hubEditCountryField', '도시가 속한 나라를 선택해 주세요.')) return false;
  if (!requireHubField('hubEditName', '도시 표시 이름을 입력해 주세요.')) return false;
  if (!requireHubField('hubEditSlug', '도시 slug를 입력해 주세요.')) return false;
  return true;
}

async function saveDestinationEdit(event) {
  event?.preventDefault();
  if (!validateDestinationEdit()) return;
  const payload = getEditPayload();
  try {
    await requestTravelSettings('PUT', payload);
    const nextSlug = payload.slug;
    await loadHubSettings(`${payload.name} 도시 정보가 수정되었습니다.`);
    fillEditForm(nextSlug);
  } catch (error) {
    setStatus(error.message || '도시 수정에 실패했습니다.', 'error');
  }
}

async function deactivateCurrentDestination() {
  const current = getCurrentEditingItem();
  if (!current) return;
  const ok = window.confirm(`'${getDestinationLabel(current)}' 도시를 비활성화할까요?\n글 연결값은 유지되지만 인덱스와 선택 목록에서는 제외됩니다.`);
  if (!ok) return;
  try {
    await requestTravelSettings('DELETE', { entity: 'destination', slug: current.slug });
    clearEditForm();
    await loadHubSettings('도시가 비활성화되었습니다.');
  } catch (error) {
    setStatus(error.message || '도시 비활성화에 실패했습니다.', 'error');
  }
}

function renderAll() {
  renderOverview();
  renderCountryOptions();
  renderFeaturedManager();
  renderCityList();
}

function bindEvents() {
  $('hubAddDestinationBtn')?.addEventListener('click', addDestination);
  $('hubSaveFeaturedBtn')?.addEventListener('click', saveFeaturedCities);
  $('hubFeaturedCountry')?.addEventListener('change', () => {
    renderFeaturedManager();
    setStatus('관리할 나라가 변경되었습니다.');
  });
  $('hubFeaturedList')?.addEventListener('change', (event) => {
    const input = event.target.closest('[data-hub-featured-checkbox]');
    if (input) enforceFeaturedLimit(input);
  });
  $('hubFeaturedList')?.addEventListener('click', (event) => {
    const moveBtn = event.target.closest('[data-hub-featured-move]');
    if (!moveBtn) return;
    moveFeaturedRow(moveBtn.dataset.slug || '', moveBtn.dataset.hubFeaturedMove || 'up');
  });
  $('hubEditCountry')?.addEventListener('change', renderCityList);
  $('hubEditSearch')?.addEventListener('input', renderCityList);
  $('hubCityList')?.addEventListener('click', (event) => {
    const card = event.target.closest('[data-hub-edit-city]');
    if (!card) return;
    fillEditForm(card.dataset.hubEditCity || '');
  });
  $('hubEditForm')?.addEventListener('submit', saveDestinationEdit);
  $('hubClearEditBtn')?.addEventListener('click', clearEditForm);
  $('hubDeactivateDestinationBtn')?.addEventListener('click', deactivateCurrentDestination);

  $('hubAddName')?.addEventListener('input', () => {
    if (!$('hubAddSlug')?.value.trim()) $('hubAddSlug').value = slugify($('hubAddName').value);
    if (!$('hubAddCityName')?.value.trim()) $('hubAddCityName').value = $('hubAddName').value;
  });
  $('hubEditName')?.addEventListener('input', () => {
    if (!$('hubEditCityName')?.value.trim()) $('hubEditCityName').value = $('hubEditName').value;
    if (!$('hubEditHeroTitle')?.value.trim()) $('hubEditHeroTitle').value = `${$('hubEditName').value} 여행 가이드`;
  });
}

bindEvents();
loadHubSettings();
