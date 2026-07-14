const cards = [
  {
    name: "토스페이",
    cid: "1917334",
    badge: "기본 11%",
    desc: "전용 페이지 결제 시 자동 적용 · 최대 $100 할인 · 투숙 8/31까지"
  },
  {
    name: "카카오페이",
    cid: "1845109",
    badge: "기본 7% ~ 10%",
    desc: "기간별 전용 쿠폰 등록 또는 결제 수단 선택 시 즉시 할인"
  },
  {
    name: "현대카드",
    cid: "1641446",
    badge: "기본 7% ~ 10%",
    desc: "국내/외 전 지역 상시 7% · 특정 시즌 및 국가 프로모션 시 10%"
  },
  {
    name: "신한카드",
    cid: "1949723",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 분기별 특정 프로모션 시 최대 10%"
  },
  {
    name: "KB국민카드",
    cid: "1563295",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 국카몰 및 전용 이벤트 페이지 경유 시 10%"
  },
  {
    name: "하나카드",
    cid: "1960466",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 하나머니 또는 트래블로그 연계 프로모션 시 우대"
  },
  {
    name: "우리카드",
    cid: "1654104",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 우리원뱅크 이벤트 연계 시 최대 10%"
  },
  {
    name: "NH농협카드",
    cid: "1827579",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 채움 브랜드 프로모션 시 10% 적용"
  },
  {
    name: "삼성카드",
    cid: "1801736",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · LINK 혜택 및 전용 페이지 할인"
  },
  {
    name: "마스터카드",
    cid: "1889572",
    badge: "기본 8% ~ 16%",
    desc: "등급별 차등 · 일반 8%(최대 $25) · 월드/플래티늄 12%(최대 $45) · 월드엘리트 16%(최대 $60)"
  },
  {
    name: "비자카드",
    cid: "1889319",
    badge: "기본 7% ~ 33%",
    desc: "상시 7% 즉시 할인 · USD 결제 권장 · 인피니트 등급은 참여 호텔 3박 시 1박 무료 혜택 가능"
  },
  {
    name: "유니온페이",
    cid: "1937708",
    badge: "기본 7% ~ 10%",
    desc: "전 세계 호텔 상시 7% · 카드 번호 앞자리 인증 시 적용"
  }
];

const state = {
  baseUrl: null,
  selected: new Set(),
  page: "url"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const pages = {
  url: $("#stepUrl"),
  loading: $("#stepLoading"),
  cards: $("#stepCards"),
  results: $("#stepResults")
};

const progressFill = $("#progressFill");
const stepLabel = $("#stepLabel");
const globalBackBtn = $("#globalBackBtn");
const urlInput = $("#urlInput");
const urlError = $("#urlError");
const cardsArea = $("#cardsArea");
const selectedCount = $("#selectedCount");
const goResultsBtn = $("#goResultsBtn");
const resultList = $("#resultList");
const shell = $(".wt-agoda-shell");
const loadingMessage = $("#loadingMessage");
const loadingError = $("#loadingError");
const loadingErrorText = $("#loadingErrorText");
const loadingDots = $("#loadingDots");
const loadingBackBtn = $("#loadingBackBtn");

function cleanExtractedUrl(value){
  return String(value || "")
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[),.;!?]+$/g, "");
}

function extractAgodaUrl(value){
  const text = String(value || "").replace(/&amp;/gi, "&");
  const match = text.match(/https?:\/\/(?:[^\s<>"']*\.)?agoda\.com\/[^\s<>"']*/i);
  return match ? cleanExtractedUrl(match[0]) : "";
}

function extractAgodaUrlFromClipboard(clipboardData){
  if(!clipboardData) return "";

  const candidates = [];
  const uriList = clipboardData.getData("text/uri-list");
  const plainText = clipboardData.getData("text/plain");
  const htmlText = clipboardData.getData("text/html");

  if(uriList) candidates.push(uriList);
  if(plainText) candidates.push(plainText);
  if(htmlText){
    candidates.push(htmlText);
    try{
      const doc = new DOMParser().parseFromString(htmlText, "text/html");
      doc.querySelectorAll("a[href]").forEach((anchor) => candidates.push(anchor.href));
    }catch(_){
      // HTML 클립보드 파싱에 실패해도 일반 텍스트 후보를 계속 확인합니다.
    }
  }

  return candidates.map(extractAgodaUrl).find(Boolean) || "";
}

urlInput.addEventListener("paste", (event) => {
  const extractedUrl = extractAgodaUrlFromClipboard(event.clipboardData || window.clipboardData);
  if(!extractedUrl) return;

  event.preventDefault();
  urlInput.value = extractedUrl;
  urlError.textContent = "";
  urlInput.dispatchEvent(new Event("input", { bubbles: true }));
});

function showPage(name){
  state.page = name;
  shell.classList.toggle("wt-agoda-is-intro", name === "url");
  shell.classList.toggle("wt-agoda-is-loading", name === "loading");
  shell.classList.toggle("wt-agoda-is-results", name === "results");
  Object.values(pages).forEach((page) => page.classList.remove("wt-agoda-is-active"));
  pages[name].classList.add("wt-agoda-is-active");

  const meta = {
    url: { width: "0%", label: "", canGoBack: false },
    loading: { width: "0%", label: "", canGoBack: false },
    cards: { width: "50%", label: "1 / 2", canGoBack: true },
    results: { width: "100%", label: "2 / 2", canGoBack: true }
  }[name];

  progressFill.style.width = meta.width;
  stepLabel.textContent = meta.label;
  globalBackBtn.classList.toggle("wt-agoda-is-hidden", !meta.canGoBack);

  const activeScroll = pages[name].querySelector(".wt-agoda-main--scroll");
  if(activeScroll) activeScroll.scrollTop = 0;
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function validateAgodaUrl(value){
  const trimmed = value.trim();
  if(!trimmed){
    throw new Error("아고다 호텔 링크를 입력해주세요.");
  }

  let url;
  try{
    url = new URL(trimmed);
  }catch(error){
    throw new Error("올바른 URL 형식이 아닙니다.");
  }

  const host = url.hostname.toLowerCase();
  const isAgoda = host === "agoda.com" || host.endsWith(".agoda.com");
  if(!isAgoda){
    throw new Error("agoda.com 주소만 사용할 수 있습니다.");
  }

  if(url.protocol !== "https:" && url.protocol !== "http:"){
    throw new Error("웹 주소 형식의 아고다 링크를 입력해주세요.");
  }

  url.protocol = "https:";
  return url;
}

function isAgodaShareLink(url){
  return /^\/sp\/[^/]+/i.test(url.pathname);
}

const AGODA_TRACKING_PARAMS = new Set([
  "cid",
  "site_id",
  "siteid",
  "af_siteid",
  "af_sub1",
  "af_sub2",
  "af_sub3",
  "af_sub4",
  "af_sub5",
  "af_dp",
  "af_web_dp",
  "af_ios_url",
  "af_android_url",
  "af_force_deeplink",
  "deep_link_value",
  "pid",
  "c",
  "tag",
  "searchrequestid",
  "flightsearchcriteria",
  "gclid",
  "fbclid",
  "msclkid"
]);

function normalizeHotelPageUrl(value){
  const url = validateAgodaUrl(value instanceof URL ? value.toString() : value);

  if(isAgodaShareLink(url)){
    throw new Error("앱 공유 링크가 호텔 홈페이지 주소로 변환되지 않았습니다.");
  }

  for(const key of Array.from(url.searchParams.keys())){
    const normalizedKey = key.toLowerCase();
    if(
      AGODA_TRACKING_PARAMS.has(normalizedKey) ||
      normalizedKey.startsWith("utm_") ||
      normalizedKey.startsWith("af_")
    ){
      url.searchParams.delete(key);
    }
  }

  url.hash = "";
  return url;
}

async function resolveAgodaShareLink(url){
  const response = await fetch("/api/resolve-agoda-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: url.toString() })
  });

  let data = {};
  try{
    data = await response.json();
  }catch(_){
    data = {};
  }

  if(!response.ok || !data.resolvedUrl){
    throw new Error(data.error || "앱 공유 링크를 호텔 페이지 주소로 변환하지 못했습니다.");
  }

  return normalizeHotelPageUrl(data.resolvedUrl);
}

function setUrlSubmitLoading(isLoading){
  const button = $("#goCardsBtn");
  button.disabled = isLoading;
}

function resetLoadingScreen(){
  loadingError.classList.remove("wt-agoda-is-visible");
  loadingErrorText.textContent = "";
  loadingDots.hidden = false;
  loadingMessage.classList.remove("wt-agoda-is-changing");
  loadingMessage.textContent = "입력한 주소를 안전하게 확인하는 중입니다.";
}

async function updateLoadingMessage(message){
  loadingMessage.classList.add("wt-agoda-is-changing");
  await wait(140);
  loadingMessage.textContent = message;
  loadingMessage.classList.remove("wt-agoda-is-changing");
}

function showLoadingError(message){
  loadingDots.hidden = true;
  loadingMessage.textContent = "링크를 확인하지 못했어요.";
  loadingErrorText.textContent = message;
  loadingError.classList.add("wt-agoda-is-visible");
}

function wait(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeRequestId(){
  if(window.crypto && crypto.randomUUID){
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildLink(card){
  const url = normalizeHotelPageUrl(state.baseUrl);
  url.searchParams.set("cid", card.cid);
  url.searchParams.set("searchrequestid", makeRequestId());
  return url.toString();
}

function renderCards(){
  cardsArea.innerHTML = cards.map((card, index) => `
    <button class="wt-agoda-option" type="button" data-index="${index}" aria-pressed="false">
      <span class="wt-agoda-check" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>
      </span>
      <span class="wt-agoda-card-text">
        <span class="wt-agoda-card-name">${card.name}</span>
        <span class="wt-agoda-card-desc">${card.badge}</span>
      </span>
    </button>
  `).join("");
}

function syncSelectionUI(){
  $$(".wt-agoda-option").forEach((option) => {
    const index = Number(option.dataset.index);
    const isSelected = state.selected.has(index);
    option.classList.toggle("wt-agoda-is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
  const count = state.selected.size;
  selectedCount.textContent = `${count}개 선택`;
  goResultsBtn.disabled = count === 0;
}

function selectAll(){
  state.selected = new Set(cards.map((_, index) => index));
  syncSelectionUI();
}

function clearAll(){
  state.selected.clear();
  syncSelectionUI();
}

function getSelectedCards(){
  return Array.from(state.selected)
    .sort((a,b) => a-b)
    .map((index) => cards[index]);
}

function renderResults(selectedCards){
  resultList.innerHTML = selectedCards.map((card) => {
    const discountLink = buildLink(card);
    return `
      <article class="wt-agoda-result-card">
        <div class="wt-agoda-result-info">
          <div class="wt-agoda-result-title-row">
            <div class="wt-agoda-result-name">${card.name}</div>
            <span class="wt-agoda-mini-badge">${card.badge}</span>
          </div>
          <div class="wt-agoda-result-sub">${card.desc}</div>
        </div>
        <a class="wt-agoda-open" href="${discountLink}" target="_blank" rel="noopener" aria-label="${card.name} 할인된 가격 확인">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7"/>
            <path d="M9 7h8v8"/>
          </svg>
        </a>
      </article>
    `;
  }).join("");
}

$("#urlForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  urlError.textContent = "";
  setUrlSubmitLoading(true);
  resetLoadingScreen();

  try{
    const extractedInput = extractAgodaUrl(urlInput.value) || urlInput.value.trim();
    urlInput.value = extractedInput;
    const inputUrl = validateAgodaUrl(extractedInput);

    showPage("loading");
    const startedAt = Date.now();

    if(isAgodaShareLink(inputUrl)){
      await updateLoadingMessage("앱 공유 링크를 호텔 페이지 주소로 바꾸고 있어요.");
      const resolvedUrl = await resolveAgodaShareLink(inputUrl);
      if(isAgodaShareLink(resolvedUrl)){
        throw new Error("앱 공유 링크가 호텔 페이지 주소로 변환되지 않았습니다.");
      }
      state.baseUrl = resolvedUrl;
      await updateLoadingMessage("카드 할인 혜택을 준비하고 있어요.");
    }else{
      state.baseUrl = normalizeHotelPageUrl(inputUrl);
      await updateLoadingMessage("카드 할인 혜택을 준비하고 있어요.");
    }

    const elapsed = Date.now() - startedAt;
    if(elapsed < 1800) await wait(1800 - elapsed);
    await updateLoadingMessage("준비가 완료됐어요. 결제수단을 선택해주세요.");
    await wait(1100);
    showPage("cards");
  }catch(error){
    if(state.page === "loading"){
      showLoadingError(error.message);
    }else{
      urlError.textContent = error.message;
      urlInput.focus();
    }
  }finally{
    setUrlSubmitLoading(false);
  }
});

cardsArea.addEventListener("click", (event) => {
  const option = event.target.closest(".wt-agoda-option");
  if(!option) return;
  const index = Number(option.dataset.index);
  if(state.selected.has(index)){
    state.selected.delete(index);
  }else{
    state.selected.add(index);
  }
  syncSelectionUI();
});

$("#selectAllBtn").addEventListener("click", selectAll);
$("#clearAllBtn").addEventListener("click", clearAll);

$("#goResultsBtn").addEventListener("click", () => {
  renderResults(getSelectedCards());
  showPage("results");
});

globalBackBtn.addEventListener("click", () => {
  if(state.page === "loading"){
    showPage("url");
    return;
  }
  if(state.page === "results"){
    showPage("cards");
    return;
  }
  if(state.page === "cards"){
    showPage("url");
  }
});

$("#restartBtn").addEventListener("click", () => {
  state.baseUrl = null;
  state.selected.clear();
  urlInput.value = "";
  urlError.textContent = "";
  syncSelectionUI();
  resultList.innerHTML = "";
  resetLoadingScreen();
  showPage("url");
  setTimeout(() => urlInput.focus(), 50);
});

loadingBackBtn.addEventListener("click", () => {
  resetLoadingScreen();
  showPage("url");
  setTimeout(() => urlInput.focus(), 80);
});

renderCards();
syncSelectionUI();

const guideModal = $("#guideModal");
const openGuideBtn = $("#openGuideBtn");
const closeGuideBtn = $("#closeGuideBtn");
const confirmGuideBtn = $("#confirmGuideBtn");
let guideLastFocused = null;

function openGuideModal(){
  guideLastFocused = document.activeElement;
  guideModal.classList.add("wt-agoda-is-open");
  guideModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("wt-agoda-is-modal-open");
  closeGuideBtn.focus();
}

function closeGuideModal(){
  guideModal.classList.remove("wt-agoda-is-open");
  guideModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("wt-agoda-is-modal-open");
  if(guideLastFocused) guideLastFocused.focus();
}

openGuideBtn.addEventListener("click", openGuideModal);
closeGuideBtn.addEventListener("click", closeGuideModal);
confirmGuideBtn.addEventListener("click", closeGuideModal);
guideModal.addEventListener("click", (event) => {
  if(event.target === guideModal) closeGuideModal();
});
document.addEventListener("keydown", (event) => {
  if(event.key === "Escape" && guideModal.classList.contains("wt-agoda-is-open")){
    closeGuideModal();
  }
});
