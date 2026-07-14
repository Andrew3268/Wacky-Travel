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
    cid: "1729471",
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
    cid: "1937712",
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

function showPage(name){
  state.page = name;
  shell.classList.toggle("wt-agoda-is-intro", name === "url");
  shell.classList.toggle("wt-agoda-is-results", name === "results");
  Object.values(pages).forEach((page) => page.classList.remove("wt-agoda-is-active"));
  pages[name].classList.add("wt-agoda-is-active");

  const meta = {
    url: { width: "0%", label: "", canGoBack: false },
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

  return validateAgodaUrl(data.resolvedUrl);
}

function setUrlSubmitLoading(isLoading){
  const button = $("#goCardsBtn");
  button.disabled = isLoading;
  button.textContent = isLoading ? "호텔 링크 확인 중..." : "할인 혜택 찾기";
}

function makeRequestId(){
  if(window.crypto && crypto.randomUUID){
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildLink(card){
  const url = new URL(state.baseUrl.toString());
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

  try{
    const inputUrl = validateAgodaUrl(urlInput.value);
    state.baseUrl = isAgodaShareLink(inputUrl)
      ? await resolveAgodaShareLink(inputUrl)
      : inputUrl;
    showPage("cards");
  }catch(error){
    urlError.textContent = error.message;
    urlInput.focus();
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
  showPage("url");
  setTimeout(() => urlInput.focus(), 50);
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
