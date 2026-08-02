/* Fukuoka survey engine with city-specific scoring adjustments. */
let currentQuestionIndex = 0;
let answers = new Array(cityConfig.questions.length).fill(null);
let lastRankedAreas = [];
let lastTopArea = null;

const pageIds = ["introPage", "questionPage", "completionPage", "loadingPage", "resultPage"];
const locationPage = document.getElementById("locationPage");
const questionCount = document.getElementById("questionCount");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const questionTitle = document.getElementById("questionTitle");
const questionHelp = document.getElementById("questionHelp");
const optionsArea = document.getElementById("optionsArea");
const startSurveyBtn = document.getElementById("startSurveyBtn");
const backBtn = document.getElementById("backBtn");
const questionCloseBtn = document.getElementById("questionCloseBtn");
const completionCloseBtn = document.getElementById("completionCloseBtn");
const resultCloseBtn = document.getElementById("resultCloseBtn");
const resultReadyBtn = document.getElementById("resultReadyBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const detailBtn = document.getElementById("detailBtn");
const detailBackBtn = document.getElementById("detailBackBtn");
const hotelTabBtn = document.getElementById("hotelTabBtn");

function setText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text || "";
}

function navigateTo(pageId) {
  pageIds.forEach((id) => {
    const page = document.getElementById(id);
    if (!page) return;
    page.classList.toggle("active", id === pageId);
  });

  locationPage?.classList.toggle("is-survey-started", pageId !== "introPage");
  locationPage?.classList.toggle("is-result-mode", pageId === "resultPage");
}

function getAnsweredPercent() {
  const answeredCount = answers.filter((answer) => answer !== null).length;
  return Math.round((answeredCount / cityConfig.questions.length) * 100);
}

function getProgressMessage() {
  const total = cityConfig.questions.length;
  const step = currentQuestionIndex + 1;

  if (step === 1) return "가볍게 시작해볼까요?";
  if (step === total) return "마지막 질문이에요";
  if (step >= total - 1) return "거의 다 왔어요";
  if (step >= Math.ceil(total * 0.65)) return "조금만 더 가면 추천 완료";
  if (step >= Math.ceil(total * 0.4)) return "좋아요, 취향이 보이기 시작해요";
  return "동선을 하나씩 맞춰보는 중이에요";
}

function startSurvey() {
  navigateTo("questionPage");
  renderQuestion();
}

function goBack() {
  window.history.back();
}

function renderQuestion() {
  const question = cityConfig.questions[currentQuestionIndex];
  const selectedIndex = answers[currentQuestionIndex];
  const percent = getAnsweredPercent();

  questionCount.textContent = `${currentQuestionIndex + 1} / ${cityConfig.questions.length}`;
  progressText.textContent = getProgressMessage();
  progressFill.style.width = `${percent}%`;
  progressBar.setAttribute("aria-valuenow", String(percent));

  questionTitle.textContent = question.title;
  questionHelp.textContent = question.help;
  optionsArea.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    const title = document.createElement("span");
    const desc = document.createElement("span");

    button.type = "button";
    button.className = "wt-option";
    button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");

    if (selectedIndex === optionIndex) button.classList.add("is-selected");

    title.className = "wt-option-title";
    title.textContent = option.title;
    desc.className = "wt-option-desc";
    desc.textContent = option.desc || "";

    button.appendChild(title);
    if (option.desc) button.appendChild(desc);
    button.addEventListener("click", () => {
      answers[currentQuestionIndex] = optionIndex;
      renderQuestion();
    });

    optionsArea.appendChild(button);
  });

  prevBtn.textContent = currentQuestionIndex === 0 ? "처음" : "이전";
  nextBtn.disabled = selectedIndex === null;
  nextBtn.textContent = "다음";
}

function goNext() {
  if (answers[currentQuestionIndex] === null) return;

  if (currentQuestionIndex < cityConfig.questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    questionTitle.focus?.();
    return;
  }

  showCompletionPage();
}

function goPrev() {
  if (currentQuestionIndex === 0) {
    resetSurvey(false);
    return;
  }

  currentQuestionIndex -= 1;
  renderQuestion();
  questionTitle.focus?.();
}

function showCompletionPage() {
  navigateTo("completionPage");
}

function getSelectedOption(questionIndex) {
  const answerIndex = answers[questionIndex];
  if (answerIndex === null || answerIndex === undefined) return null;
  return cityConfig.questions[questionIndex]?.options?.[answerIndex] || null;
}

function getSelectedOptionTitle(questionIndex) {
  return getSelectedOption(questionIndex)?.title || "";
}

function answerIs(questionIndex, title) {
  return getSelectedOptionTitle(questionIndex) === title;
}

function answerIn(questionIndex, titles) {
  return titles.includes(getSelectedOptionTitle(questionIndex));
}

function addAreaScore(scores, areaKey, amount) {
  if (Object.prototype.hasOwnProperty.call(scores, areaKey)) {
    scores[areaKey] += amount;
  }
}

function applyFukuokaAccuracyAdjustments(scores) {
  const firstTrip = answerIs(0, "첫 여행");
  const repeatTrip = answerIn(0, ["재방문", "후쿠오카가 익숙해요"]);
  const airportImportant = answerIs(3, "매우 중요");
  const airportNormal = answerIs(3, "보통");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·야경") || answerIs(6, "번화가");
  const shopping = answerIs(2, "쇼핑") || answerIs(6, "깔끔한 도심");
  const family = answerIn(1, ["가족·아이", "부모님 동반"]);
  const ohoriCore = answerIs(4, "오호리·모모치 핵심");
  const quietStay = answerIs(6, "차분한 숙소");
  const budgetSave = answerIs(7, "예산 절약");
  const balanceBudget = answerIs(7, "가격·위치 균형");
  const locationFirst = answerIs(7, "위치 우선");

  // 하카타는 공항·근교가 뚜렷할 때만 추가 보정합니다.
  // 이전처럼 무난한 답변까지 모두 하카타로 몰리지 않도록 기본 보너스를 낮췄습니다.
  if (firstTrip && (airportImportant || nearTripHeavy || nearTripOneDay)) {
    addAreaScore(scores, "hakata", 2);
  }
  if (airportImportant && nearTripHeavy) {
    addAreaScore(scores, "hakata", 2);
    addAreaScore(scores, "gion", 1);
  }
  if (locationFirst && airportImportant && nearTripHeavy) {
    addAreaScore(scores, "hakata", 2);
  }

  // 나카스 & 카와바타는 저녁 일정·맛집·친구 여행일 때 텐진과 확실히 갈라지도록 보정합니다.
  if (nightFood && cityOnly) {
    addAreaScore(scores, "nakasuKawabata", 4);
  }
  if (nightFood && answerIs(1, "친구 여행")) {
    addAreaScore(scores, "nakasuKawabata", 4);
  }

  // 텐진은 쇼핑·깔끔한 도심·커플/친구 여행 중심일 때 우선합니다.
  if (shopping && !nearTripHeavy) {
    addAreaScore(scores, "tenjin", 2);
  }
  if (shopping && answerIn(1, ["커플 여행", "친구 여행"])) {
    addAreaScore(scores, "tenjin", 2);
  }

  // 오호리 & 모모치는 가족 여행과 서쪽 권역 일정이 함께 있을 때 강하게 반응합니다.
  if (family && ohoriCore) {
    addAreaScore(scores, "ohoriMomochi", 5);
  }
  if (family && answerIs(2, "공원·여유")) {
    addAreaScore(scores, "ohoriMomochi", 3);
    addAreaScore(scores, "hakata", 1);
  }

  // 야쿠인 & 와타나베도리는 재방문·차분함·예산 절약뿐 아니라 텐진 접근형 도심 여행까지 반영합니다.
  if (quietStay && budgetSave) {
    addAreaScore(scores, "yakuinWatanabedori", 4);
    addAreaScore(scores, "gion", 1);
  }
  if (repeatTrip && quietStay) {
    addAreaScore(scores, "yakuinWatanabedori", 3);
  }
  if (repeatTrip && shopping && !nearTripHeavy) {
    addAreaScore(scores, "yakuinWatanabedori", 2);
  }

  // 기온은 가격·위치 균형, 보통 수준의 공항 이동, 하카타·나카스 중간 동선에서만 1위 후보가 되도록 보정합니다.
  if (balanceBudget && !airportImportant && !ohoriCore) {
    addAreaScore(scores, "gion", 2);
  }
  if (firstTrip && balanceBudget && cityOnly) {
    addAreaScore(scores, "gion", 1);
  }
  if (airportNormal && balanceBudget && !ohoriCore) {
    addAreaScore(scores, "gion", 1);
  }
}

function getFukuokaTieBreakScores() {
  const tieBreakScores = {};
  Object.keys(cityConfig.areas).forEach((areaKey) => {
    tieBreakScores[areaKey] = 0;
  });

  const firstTrip = answerIs(0, "첫 여행");
  const repeatTrip = answerIn(0, ["재방문", "후쿠오카가 익숙해요"]);
  const airportImportant = answerIs(3, "매우 중요");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·야경") || answerIs(6, "번화가");
  const shopping = answerIs(2, "쇼핑") || answerIs(6, "깔끔한 도심");
  const family = answerIn(1, ["가족·아이", "부모님 동반"]);
  const ohoriCore = answerIs(4, "오호리·모모치 핵심");
  const quietStay = answerIs(6, "차분한 숙소");
  const budgetSave = answerIs(7, "예산 절약");
  const balanceBudget = answerIs(7, "가격·위치 균형");

  if (firstTrip && (airportImportant || nearTripHeavy)) tieBreakScores.hakata += 3;
  if (nearTripOneDay && airportImportant) tieBreakScores.hakata += 2;
  if (shopping) tieBreakScores.tenjin += 3;
  if (shopping && answerIn(1, ["커플 여행", "친구 여행"])) tieBreakScores.tenjin += 1;
  if (nightFood) tieBreakScores.nakasuKawabata += 3;
  if (nightFood && cityOnly) tieBreakScores.nakasuKawabata += 2;
  if (balanceBudget) tieBreakScores.gion += 3;
  if (cityOnly && !nightFood && !shopping) tieBreakScores.gion += 1;
  if (repeatTrip && (quietStay || budgetSave)) tieBreakScores.yakuinWatanabedori += 3;
  if (quietStay && budgetSave) tieBreakScores.yakuinWatanabedori += 2;
  if (family && ohoriCore) tieBreakScores.ohoriMomochi += 3;
  if (ohoriCore) tieBreakScores.ohoriMomochi += 2;

  return tieBreakScores;
}

function calculateScores() {
  const scores = {};
  Object.keys(cityConfig.areas).forEach((areaKey) => {
    scores[areaKey] = 0;
  });

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null) return;
    const selectedOption = cityConfig.questions[questionIndex].options[answerIndex];
    Object.entries(selectedOption.scores).forEach(([areaKey, score]) => {
      if (Object.prototype.hasOwnProperty.call(scores, areaKey)) {
        scores[areaKey] += score;
      }
    });
  });

  applyFukuokaAccuracyAdjustments(scores);

  const tieBreakScores = getFukuokaTieBreakScores();

  return Object.entries(scores)
    .map(([key, score]) => ({
      key,
      score,
      tieBreakScore: tieBreakScores[key] || 0,
      ...cityConfig.areas[key]
    }))
    .sort((a, b) => (b.score - a.score) || (b.tieBreakScore - a.tieBreakScore));
}

function renderHotelCardsLegacy(area) {
  const section = document.getElementById("hotelRecommendSection");
  const hotelCardList = document.getElementById("hotelCardList");
  const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];

  if (!section || !hotelCardList) return;

  if (hotels.length === 0) {
    section.style.display = "none";
    hotelCardList.innerHTML = "";
    return;
  }

  section.style.display = "block";
  setText("hotelSectionTitle", `${area.name}에서 먼저 비교해볼 호텔 5곳`);
  setText("hotelSectionDesc", "이 지역을 기준으로 먼저 비교해볼 만한 후보입니다. 예약 전에는 객실 크기, 취소 조건, 최근 후기를 함께 확인하세요.");
  hotelCardList.innerHTML = "";

  hotels.forEach((hotel, index) => {
    const article = document.createElement("article");
    const top = document.createElement("div");
    const rank = document.createElement("span");
    const tag = document.createElement("span");
    const name = document.createElement("h4");
    const location = document.createElement("p");
    const reason = document.createElement("p");
    const meta = document.createElement("div");
    const footer = document.createElement("div");
    const linkWrap = document.createElement("div");
    const link = document.createElement("a");

    article.className = "wt-hotel-card";
    top.className = "wt-hotel-card-top";
    rank.className = "wt-hotel-rank";
    tag.className = "wt-hotel-tag";
    name.className = "wt-hotel-name";
    location.className = "wt-hotel-location";
    reason.className = "wt-hotel-reason";
    meta.className = "wt-hotel-meta";
    footer.className = "wt-hotel-card-footer";
    linkWrap.className = "wt-hotel-link-wrap";
    link.className = "wt-hotel-link";

    rank.textContent = `${index + 1}`;
    tag.textContent = hotel.tag || "추천 후보";
    name.textContent = hotel.name;
    location.textContent = hotel.location;
    reason.textContent = hotel.reason;
    link.href = hotel.url || "#";
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotel.name} 잔여 객실 확인`);

    (hotel.meta || []).forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      meta.appendChild(chip);
    });

    top.appendChild(rank);
    top.appendChild(tag);
    linkWrap.appendChild(link);
    footer.appendChild(meta);
    footer.appendChild(linkWrap);
    article.appendChild(top);
    article.appendChild(name);
    article.appendChild(location);
    article.appendChild(reason);
    article.appendChild(footer);
    hotelCardList.appendChild(article);
  });
}

function getRelatedPostRegionSlugs(area) {
  return [...new Set([
    area.regionSlug,
    ...(Array.isArray(area.regionSlugAliases) ? area.regionSlugAliases : [])
  ].map((item) => String(item || "").trim()).filter(Boolean))];
}

async function fetchRelatedPostsByRegion(area) {
  const regionSlugs = getRelatedPostRegionSlugs(area);

  for (const regionSlug of regionSlugs) {
    const params = new URLSearchParams({
      destination: cityConfig.destinationSlug,
      type: cityConfig.postContentType,
      region: regionSlug,
      limit: "5"
    });

    try {
      const response = await fetch(`/api/destination-posts?${params.toString()}`, {
        headers: { accept: "application/json" }
      });
      if (!response.ok) continue;
      const data = await response.json();
      const items = Array.isArray(data.items) ? data.items : [];
      if (items.length) return items.slice(0, 5);
    } catch (_) {
      return [];
    }
  }

  return [];
}

async function renderRelatedPostsLegacy(area) {
  const section = document.getElementById("relatedPostSection");
  const list = document.getElementById("relatedPostList");

  if (!section || !list) return;

  section.style.display = "none";
  list.innerHTML = "";
  setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);

  const posts = await fetchRelatedPostsByRegion(area);
  const relatedTabButton = document.querySelector('.tab-btn[data-tab="3"]');
  const hasRelatedPosts = posts.length > 0;

  if (relatedTabButton) {
    relatedTabButton.hidden = !hasRelatedPosts;
    relatedTabButton.setAttribute("aria-hidden", String(!hasRelatedPosts));
  }

  section.hidden = !hasRelatedPosts;
  section.style.display = hasRelatedPosts ? "" : "none";

  if (!hasRelatedPosts) {
    section.style.display = "none";
    list.innerHTML = "";
    return;
  }

  section.style.display = "block";
  list.innerHTML = "";

  posts.forEach((post) => {
    const title = String(post.title || "여행 스타일별 호텔 추천 글").trim();
    const slug = String(post.slug || "").trim();
    const item = document.createElement("li");
    const link = document.createElement("a");

    link.href = slug ? `/post/${encodeURIComponent(slug)}/` : "#";
    link.textContent = title;
    link.setAttribute("aria-label", `${title} 보기`);

    item.appendChild(link);
    list.appendChild(item);
  });
}


function getLastHangulChar(text) {
  const chars = Array.from(String(text || "")).reverse();
  return chars.find((char) => /[가-힣]/.test(char)) || "";
}

function hasKoreanBatchim(text) {
  const char = getLastHangulChar(text);
  if (!char) return false;
  const code = char.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function withJosa(text, pair) {
  const [withBatchim, withoutBatchim] = String(pair).split("/");
  return `${text}${hasKoreanBatchim(text) ? withBatchim : withoutBatchim}`;
}

function getResultFocusSentence(area) {
  if (!area) return "";
  const chips = Array.isArray(area.chips) ? area.chips.slice(0, 3) : [];
  if (!chips.length) return "";
  return `${withJosa(area.name, "은/는")} ${chips.join(" · ")} 흐름을 우선하는 여행자에게 잘 맞습니다.`;
}

function getSelectedAnswerSignals() {
  return answers
    .map((_, questionIndex) => getSelectedOptionTitle(questionIndex))
    .filter(Boolean)
    .filter((item, index, arr) => arr.indexOf(item) === index)
    .slice(0, 5);
}

function getSignalSentence() {
  return "";
}

function getScoreFitSentence(rankedAreas) {
  const top = rankedAreas?.[0];
  const second = rankedAreas?.[1];
  if (!top || !second) return "";

  const gap = top.score - second.score;
  if (gap <= 2) {
    return `${withJosa(top.name, "이/가")} 이번 일정에 먼저 어울립니다. 다만 ${second.name}도 분위기가 크게 벗어나지 않으니 호텔 가격, 객실 크기, 실제 이동 시간을 함께 보면 선택이 쉬워집니다.`;
  }
  if (gap <= 5) {
    return `${withJosa(top.name, "이/가")} 이번 일정의 흐름과 조금 더 자연스럽게 맞습니다. 일정의 중심이 ${second.name} 쪽에 가까워진다면 그 지역도 함께 살펴볼 만합니다.`;
  }
  return `${top.name} 중심으로 먼저 호텔을 추려보세요. 가격, 객실 크기, 최근 후기를 함께 보면 선택이 더 선명해집니다.`;
}

function getAlternativeSentence(area, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!second) return "";

  const gap = rankedAreas[0].score - second.score;
  if (gap <= 2) {
    return `${second.name}도 함께 볼 만합니다. ${second.compareGood || second.summary}`;
  }
  return `${second.name}도 일정에 따라 잘 맞을 수 있습니다. ${second.compareGood || second.summary}`;
}

function getPersuasiveContent(area, rankedAreas) {
  const contents = {
    hakata: {
      intro: "공항 이동, 하카타역, 근교 당일치기까지 한 번에 잡아야 하는 일정에는 하카타가 가장 단순합니다. 도착일과 출국일의 이동 피로를 줄이고, 일정이 바뀌어도 대응하기 쉽습니다.",
      reasons: [
        { title: "공항 이동이 가장 단순합니다", text: "후쿠오카공항에서 하카타까지 이동 동선이 짧아 늦은 도착이나 이른 출국 일정에서 부담이 적습니다." },
        { title: "근교 일정에 강합니다", text: "JR 하카타역과 버스터미널을 활용하기 쉬워 다자이후, 유후인, 기타큐슈 같은 당일치기 계획을 세우기 좋습니다." },
        { title: "첫 여행 기준점으로 좋습니다", text: "하카타를 기준으로 잡으면 텐진, 나카스, 기온까지의 이동 방향이 명확해져 동선 실수가 줄어듭니다." },
        { title: "주의할 점도 분명합니다", text: "쇼핑과 저녁 분위기만 보면 텐진·나카스보다 덜 화려합니다. 숙소 주변 분위기보다 이동 효율을 우선할 때 가장 만족도가 높습니다." }
      ],
      conclusionTitle: "하카타를 1순위로 두면 좋은 여행",
      conclusionText: "2박 3일, 첫 방문, 공항 이동, 근교 이동이 겹친다면 하카타가 가장 안전합니다. 나카스 야경이나 텐진 쇼핑이 일정의 핵심이라면 그쪽을 대안으로 함께 비교하세요."
    },
    tenjin: {
      intro: "쇼핑, 카페, 식사, 도심 분위기를 숙소 주변에서 해결하고 싶다면 텐진이 가장 자연스럽습니다. 하카타보다 여행지 체감이 강하고, 나카스보다 숙소 선택 폭이 넓습니다.",
      reasons: [
        { title: "쇼핑 동선이 가장 좋습니다", text: "백화점, 지하상가, 상점가, 카페를 한 권역 안에서 묶기 쉬워 낮 일정의 이동 낭비가 적습니다." },
        { title: "커플·친구 여행에 맞습니다", text: "식사 후 산책, 카페, 쇼핑을 이어가기 좋아 숙소 주변에서 보내는 시간이 자연스럽게 늘어납니다." },
        { title: "나카스까지 확장하기 쉽습니다", text: "텐진 남쪽이나 하루요시 방향 숙소를 고르면 나카스 야경과 저녁 식사 동선까지 함께 잡을 수 있습니다." },
        { title: "주의할 점도 있습니다", text: "공항선과 JR 근교 이동은 하카타보다 한 번 더 계산해야 합니다. 근교 일정이 많다면 하카타와 비교가 필요합니다." }
      ],
      conclusionTitle: "텐진을 1순위로 두면 좋은 여행",
      conclusionText: "쇼핑, 맛집, 카페, 도심 분위기가 핵심이라면 텐진이 좋습니다. 공항 이동이나 유후인·다자이후 같은 근교 일정이 많다면 하카타도 함께 보세요."
    },
    nakasuKawabata: {
      intro: "저녁 식사, 포장마차, 강변 야경을 늦게까지 즐기고 싶다면 나카스 & 카와바타가 강합니다. 숙소로 돌아오는 길이 짧아 저녁 시간을 더 편하게 쓸 수 있습니다.",
      reasons: [
        { title: "저녁 이후 이동이 편합니다", text: "나카스 강변, 포장마차, 식당가를 이용한 뒤 택시나 긴 도보 없이 숙소로 돌아가기 쉽습니다." },
        { title: "캐널시티와 상점가를 묶기 좋습니다", text: "캐널시티, 카와바타 상점가, 나카스 야경을 한 흐름으로 연결하기 좋아 짧은 여행에서도 체류감이 큽니다." },
        { title: "친구 여행 만족도가 높습니다", text: "늦은 시간까지 식사와 산책을 넣기 좋아 일정을 빽빽하게 쓰는 여행자에게 잘 맞습니다." },
        { title: "소음 확인은 필수입니다", text: "나카스 중심 저층 객실은 저녁 이후 소음 호불호가 생길 수 있습니다. 조용함이 중요하면 카와바타 쪽이나 한 블록 떨어진 위치가 낫습니다." }
      ],
      conclusionTitle: "나카스 & 카와바타를 1순위로 두면 좋은 여행",
      conclusionText: "맛집과 저녁 이후 이동이 핵심이면 만족도가 높습니다. 부모님 동반, 아이 동반, 조용한 휴식이 우선이면 하카타·기온·오호리 & 모모치 쪽도 같이 비교하세요."
    },
    gion: {
      intro: "하카타와 나카스 사이에서 균형을 잡고 싶다면 기온이 좋습니다. 너무 번잡하지 않으면서 하카타역, 캐널시티, 나카스 접근성을 모두 가져갈 수 있습니다.",
      reasons: [
        { title: "위치 균형이 좋습니다", text: "하카타역과 나카스 사이에 있어 공항·역 이동과 저녁 도보 동선을 모두 무난하게 가져갈 수 있습니다." },
        { title: "첫 여행에도 부담이 적습니다", text: "하카타만큼 단순하고 나카스만큼 번화하지는 않지만, 주요 권역을 고르게 보기에는 안정적입니다." },
        { title: "가격과 위치를 함께 맞추기 좋습니다", text: "핵심 지역 바로 앞보다 부담을 낮추면서도 시내 중심 동선을 크게 포기하지 않는 선택이 가능합니다." },
        { title: "목적이 뚜렷하면 비교가 필요합니다", text: "쇼핑만 보면 텐진, 근교 이동만 보면 하카타, 야경·맛집만 보면 나카스가 더 명확할 수 있습니다." }
      ],
      conclusionTitle: "기온을 1순위로 두면 좋은 여행",
      conclusionText: "하카타와 나카스 사이의 균형, 가성비, 차분한 도심 접근성을 함께 원할 때 좋습니다. 특정 목적이 강한 일정이라면 해당 목적에 더 가까운 지역도 함께 보세요."
    },
    yakuinWatanabedori: {
      intro: "번화가 바로 앞은 부담스럽지만 텐진 접근성은 포기하고 싶지 않다면 야쿠인 & 와타나베도리가 좋습니다. 숙소비와 분위기의 균형을 잡기 쉬운 도심형 대안입니다.",
      reasons: [
        { title: "차분한 도심 분위기입니다", text: "텐진과 가깝지만 숙소 주변 분위기는 조금 더 여유로워 번잡함을 줄이고 싶은 여행자에게 맞습니다." },
        { title: "실속형 호텔을 찾기 좋습니다", text: "하카타·텐진 핵심부보다 가격 부담을 낮추면서도 주요 도심 동선을 크게 잃지 않습니다." },
        { title: "재방문 여행에 잘 맞습니다", text: "대표 중심지를 이미 경험했다면 야쿠인과 와타나베도리의 생활권 분위기가 더 만족스럽게 느껴질 수 있습니다." },
        { title: "첫 여행자는 동선을 확인해야 합니다", text: "하카타역, 나카스, 공항을 자주 오가면 이동이 애매할 수 있으니 실제 지하철역과 도보 시간을 확인해야 합니다." }
      ],
      conclusionTitle: "야쿠인 & 와타나베도리를 1순위로 두면 좋은 여행",
      conclusionText: "가성비, 조용한 도심, 커플 여행, 재방문 여행이라면 좋은 선택입니다. 첫 방문에서 대표 동선을 빠르게 훑는 일정이면 하카타나 기온도 함께 비교하세요."
    },
    ohoriMomochi: {
      intro: "공원, 해변, 후쿠오카타워, 가족 여행의 여유가 중요하다면 오호리 & 모모치가 잘 맞습니다. 도심 번화가보다 쉬는 시간을 분명하게 만들 수 있습니다.",
      reasons: [
        { title: "가족과 걷기 좋은 흐름입니다", text: "오호리공원과 모모치 해변 주변은 번화가보다 여유가 있어 아이 동반 일정에서 체감 피로가 낮습니다." },
        { title: "서쪽 권역 일정이 편해집니다", text: "후쿠오카타워, 페이페이돔, 모모치 해변, 오호리공원을 중심으로 움직이면 도심 왕복 시간을 줄일 수 있습니다." },
        { title: "숙박 분위기가 차분합니다", text: "하카타·텐진·나카스보다 저녁 이후 분위기가 덜 복잡해 쉬는 시간을 확보하기 좋습니다." },
        { title: "첫 여행 전체 동선은 길어질 수 있습니다", text: "하카타, 텐진, 나카스를 매일 오가야 한다면 이동 시간이 늘어납니다. 대표 명소를 짧게 많이 보는 일정에는 불리할 수 있습니다." }
      ],
      conclusionTitle: "오호리 & 모모치를 1순위로 두면 좋은 여행",
      conclusionText: "가족 여행, 공원 산책, 해변 일정, 여유로운 숙박이 핵심이라면 좋습니다. 쇼핑·맛집·공항 이동이 더 중요하다면 텐진이나 하카타가 더 효율적입니다."
    }
  };

  const content = contents[area.key] || {
    intro: area.summary,
    reasons: [
      { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary },
      { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "이번 여행 조건과 잘 맞는 이동 흐름을 만들기 좋습니다." },
      { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 후기 비교가 훨씬 쉬워집니다." }
    ],
    conclusionTitle: `${area.name}을 중심으로 호텔을 비교해보세요.`,
    conclusionText: "추천 지역 안에서 역 접근성, 주변 분위기, 최근 후기를 함께 확인하면 실패 확률을 줄일 수 있습니다."
  };

  const fitText = getScoreFitSentence(rankedAreas);
  const alternativeText = getAlternativeSentence(area, rankedAreas);

  return {
    ...content,
    intro: [content.intro, fitText].filter(Boolean).join(" "),
    conclusionText: [content.conclusionText, alternativeText].filter(Boolean).join(" ")
  };
}


function renderSimpleList(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = "";

  (Array.isArray(items) ? items : []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderChipList(listId, items) {
  const list = document.getElementById(listId);
  if (!list) return;
  list.innerHTML = "";

  (Array.isArray(items) ? items : []).forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    list.appendChild(chip);
  });
}

function getQuestionSignalLabel(questionIndex, questionTitle = "") {
  const labels = [
    "여행 경험",
    "동행",
    "핵심 목적",
    "공항 이동",
    "오호리·모모치",
    "근교 일정",
    "숙소 분위기",
    "예산 기준"
  ];

  if (labels[questionIndex]) return labels[questionIndex];

  return questionTitle
    .replace(/^이번 후쿠오카 여행은 /, "")
    .replace(/^이번 여행에서 /, "")
    .replace(/[?？]$/g, "")
    .trim() || "선택 조건";
}

function getAnswerSignalSummary() {
  const selected = answers
    .map((_, questionIndex) => {
      const question = cityConfig.questions[questionIndex];
      const option = getSelectedOption(questionIndex);
      if (!question || !option) return null;
      return {
        label: getQuestionSignalLabel(questionIndex, question.title),
        question: question.title,
        answer: option.title
      };
    })
    .filter(Boolean);

  const chips = selected.map((item) => `${item.label}: ${item.answer}`);
  const mainSignals = chips.slice(0, 4);
  const sentence = mainSignals.length
    ? `${mainSignals.join(" · ")} 같은 주요 조건을 기준으로 이동 편의, 숙소 주변 분위기, 예산 균형을 함께 계산했습니다.`
    : "선택한 답변을 기준으로 이동 편의, 숙소 주변 분위기, 예산 균형을 함께 계산했습니다.";

  return { selected, chips, sentence };
}

function renderAnswerSummary(area) {
  const box = document.getElementById("resultAnswerSummary");
  const chips = document.getElementById("selectedAnswerList");
  const signal = getAnswerSignalSummary();

  if (!box || !chips) return;

  chips.innerHTML = "";
  signal.chips.forEach((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    chips.appendChild(chip);
  });

  setText("selectedAnswerText", `${signal.sentence} 그래서 ${withJosa(area.name, "이/가")} 이번 일정에서 가장 먼저 볼 지역으로 정리됐습니다.`);
}

function getPracticalGuideDesc(area) {
  if (!area) return "";
  return `${withJosa(area.name, "을/를")} 고를 때는 지역명보다 실제 역 출구, 도보 시간, 저녁 이후 이동, 객실 크기를 함께 확인하는 것이 좋습니다.`;
}

function renderPracticalGuide(area) {
  setText("practicalGuideDesc", getPracticalGuideDesc(area));
  renderSimpleList("stayRangeList", area.stayRange);
  renderSimpleList("avoidRangeList", area.avoidRange);
  renderSimpleList("bookingTipList", area.bookingTips);
  renderChipList("bestForList", area.bestFor);
  renderChipList("notForList", area.notFor);
}

const alternativeAreaAppeals = {
  hakata: "공항과 근교 이동을 편하게 잡을 수 있는",
  tenjin: "쇼핑과 미식 동선을 더 가까이 누릴 수 있는",
  nakasuKawabata: "강변 야경과 저녁 산책이 자연스러운",
  gion: "하카타와 나카스 사이에서 차분하게 머물 수 있는",
  yakuinWatanabedori: "카페 골목과 조용한 도심 분위기가 있는",
  ohoriMomochi: "공원 산책과 바다 여유를 더할 수 있는"
};

const topAreaMoodLeads = {
  hakata: "하카타의 편한 이동 흐름이 마음에 든다면",
  tenjin: "텐진의 활기 있는 도심 분위기가 끌린다면",
  nakasuKawabata: "나카스·카와바타의 저녁 산책 감성이 좋다면",
  gion: "기온의 차분한 위치감이 마음에 든다면",
  yakuinWatanabedori: "야쿠인·와타나베도리의 느긋한 골목 분위기가 좋다면",
  ohoriMomochi: "오호리·모모치의 여유로운 흐름이 끌린다면"
};

function getAlternativeDetail(topArea, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!topArea || !second) return null;

  const topKey = getAreaKey(topArea);
  const secondKey = getAreaKey(second);
  const topLead = topAreaMoodLeads[topKey] || `${withJosa(topArea.name, "이/가")} 마음에 든다면`;
  const secondAppeal = alternativeAreaAppeals[secondKey] || second.summary || "다른 분위기를 느낄 수 있는";
  const title = "이런 지역도 함께 볼 만해요";
  const text = `${topLead}, ${secondAppeal} ${second.name}도 자연스럽게 이어서 볼 만합니다. 호텔 가격과 실제 이동 시간이 잘 맞으면 충분히 좋은 선택이 될 수 있습니다.`;

  return { title, text };
}

function renderAlternativeAreaLegacy(topArea, rankedAreas) {
  renderAlternativeArea(topArea, rankedAreas);
}

function renderPersuasiveResult(topArea, rankedAreas) {
  const content = getPersuasiveContent(topArea, rankedAreas);
  const reasonCardList = document.getElementById("reasonCardList");

  setText("resultWhyText", content.intro);
  setText("decisionConclusionTitle", content.conclusionTitle);
  setText("decisionConclusionText", content.conclusionText);

  if (reasonCardList) {
    reasonCardList.innerHTML = "";
    content.reasons.forEach((reason, index) => {
      const article = document.createElement("article");
      const number = document.createElement("span");
      const title = document.createElement("h4");
      const text = document.createElement("p");

      article.className = "wt-reason-card";
      number.className = "wt-reason-number";
      number.textContent = `${index + 1}`;
      title.textContent = reason.title;
      text.textContent = reason.text;

      article.appendChild(number);
      article.appendChild(title);
      article.appendChild(text);
      reasonCardList.appendChild(article);
    });
  }
}



function renderHotelCards(area) {
  const hotelCardList = document.getElementById("hotelCardList");
  const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];

  if (!hotelCardList) return;

  setText("hotelSectionTitle", `${area.name}에서 먼저 비교해볼 호텔 5곳`);
  setText("hotelSectionDesc", "역 접근성과 공항 이동 시간을 기준으로 빠르게 비교해보세요.");
  hotelCardList.innerHTML = "";

  if (hotels.length === 0) {
    const empty = document.createElement("p");
    empty.className = "wt-post-empty";
    empty.style.display = "block";
    empty.textContent = "아직 연결된 호텔 후보가 없습니다.";
    hotelCardList.appendChild(empty);
    return;
  }

  hotels.forEach((hotel) => {
    const article = document.createElement("article");
    const header = document.createElement("div");
    const headerLeft = document.createElement("div");
    const name = document.createElement("h4");
    const link = document.createElement("a");
    const locationMain = document.createElement("div");
    const station = document.createElement("span");
    const separator = document.createElement("span");
    const airport = document.createElement("span");
    const tagList = document.createElement("div");
    const access = getHotelAccessInfo(hotel, area);
    const tags = getHotelDisplayTags(hotel);

    article.className = "wt-hotel-card wt-hotel-card--compact";
    header.className = "wt-hotel-card-header";
    headerLeft.className = "wt-hotel-header-left";
    name.className = "wt-hotel-name";
    link.className = "wt-hotel-link";
    locationMain.className = "wt-hotel-location-main";
    station.className = "wt-hotel-station";
    separator.className = "wt-hotel-separator";
    airport.className = "wt-hotel-airport";
    tagList.className = "wt-hotel-tag-list";

    name.textContent = hotel.name || "호텔 후보";
    link.href = hotel.url || "#";
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotel.name || "호텔 후보"} 잔여 객실 확인`);
    station.textContent = access.station;
    separator.textContent = "|";
    airport.textContent = access.airport;

    headerLeft.appendChild(name);
    header.appendChild(headerLeft);
    header.appendChild(link);

    locationMain.appendChild(station);
    locationMain.appendChild(separator);
    locationMain.appendChild(airport);

    tags.forEach((item, tagIndex) => {
      const tag = document.createElement("span");
      tag.className = "wt-hotel-tag wt-hotel-tag--base";
      tag.textContent = item;
      tagList.appendChild(tag);
    });

    article.appendChild(header);
    article.appendChild(locationMain);
    article.appendChild(tagList);
    hotelCardList.appendChild(article);
  });
}

function renderAlternativeArea(topArea, rankedAreas) {
  const box = document.getElementById("reasonAlternativeBox");
  const detail = getAlternativeDetail(topArea, rankedAreas);

  if (!box) return;

  if (!detail) {
    box.style.display = "none";
    setText("reasonAlternativeTitle", "");
    setText("reasonAlternativeText", "");
    return;
  }

  box.style.display = "";
  setText("reasonAlternativeTitle", detail.title);
  setText("reasonAlternativeText", detail.text);
}

const emotionalSummaryByArea = {
  hakata: "공항에서 도심까지 빠르게 이어지는 단순한 동선 속에서, 짧은 일정 안에 근교 이동과 후쿠오카 도심 여행을 단정하게 묶고 싶은 당신에게 가장 안정적인 시작점입니다.",
  tenjin: "쇼핑 거리와 감각적인 카페, 저녁 맛집이 자연스럽게 모이는 도심 속에서 후쿠오카의 일상적인 활기와 편리함을 함께 누리고 싶은 당신에게 잘 맞는 중심 지역입니다.",
  nakasuKawabata: "강변의 불빛과 포장마차의 온기, 늦은 저녁까지 이어지는 미식 동선을 숙소 가까이 두고 후쿠오카의 밤 분위기를 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
  gion: "하카타의 편리함과 나카스의 분위기 사이에서 너무 번잡하지 않게 머물며, 오래된 골목과 도심 산책을 천천히 이어가고 싶은 당신에게 잘 맞는 차분한 위치입니다.",
  yakuinWatanabedori: "텐진의 접근성은 유지하되 조금 더 조용한 카페 거리와 로컬한 분위기 속에서 후쿠오카를 느긋하게 즐기고 싶은 당신에게 잘 어울리는 동네입니다.",
  ohoriMomochi: "도심의 빠른 흐름에서 잠시 벗어나 공원 산책과 바다 풍경을 일정 안에 담고, 후쿠오카를 조금 더 느리게 즐기고 싶은 당신에게 잘 맞는 곳입니다.",
};

function getEmotionalSummary(area) {
  if (!area || !area.key) return area?.summary || "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
  return emotionalSummaryByArea[area.key] || area.summary;
}

const resultBadgeByArea = areaResultBadges;

function getResultBadgeText(area) {
  const areaKey = getAreaKey(area);
  if (areaKey && resultBadgeByArea[areaKey]) return resultBadgeByArea[areaKey];

  const destinationLabel = getAreaDestinationLabel(area);
  if (destinationLabel.includes(",")) {
    return destinationLabel.split(",")[0].trim();
  }

  return "이번 여행에 어울리는 숙소 위치";
}

function prepareResultContent() {
  const rankedAreas = calculateScores();
  const topArea = rankedAreas[0];
  lastRankedAreas = rankedAreas;
  lastTopArea = topArea;

  const displayName = getAreaDisplayName(topArea);
  const resultBadgeText = getResultBadgeText(topArea);
  setText("resultBadge", resultBadgeText);
  setText("resultTitle", displayName);
  setText("detailResultBadge", resultBadgeText);
  setText("detailResultTitle", displayName);
  setText("resultSummary", getEmotionalSummary(topArea));
  setText("resultLeadTitle", topArea.leadTitle);
  setText("resultLeadText", topArea.leadText);

  renderPersuasiveResult(topArea, rankedAreas);
  renderPracticalGuide(topArea);
  renderHotelCards(topArea);
  renderAlternativeArea(topArea, rankedAreas);
  renderRelatedPosts(topArea);

  return { rankedAreas, topArea };
}

const loadingIcons = {
  step1: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none"><rect x="14" y="10" width="36" height="44" rx="6" fill="#F5F5F7" stroke="#1D1D1F" stroke-width="2.5"/><line x1="22" y1="22" x2="42" y2="22" stroke="#1D1D1F" stroke-width="3" stroke-linecap="round"/><line x1="22" y1="32" x2="36" y2="32" stroke="#1D1D1F" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="38" r="7" fill="#2563EB" opacity="0.2"/><circle cx="40" cy="38" r="5" stroke="#2563EB" stroke-width="2.5"/><line x1="44" y1="42" x2="49" y2="47" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  step2: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 64 64" fill="none"><path d="M14 18 L26 12 L38 18 L50 12 L50 46 L38 52 L26 46 L14 52 Z" fill="#EFF6FF" stroke="#1D1D1F" stroke-width="2" stroke-linejoin="round"/><path d="M26 12 L26 46" stroke="#BDC3C7" stroke-width="1.5" stroke-dasharray="2 2"/><path d="M38 18 L38 52" stroke="#BDC3C7" stroke-width="1.5" stroke-dasharray="2 2"/><g transform="translate(26, 18)"><path d="M6 0 C2.6 0 0 2.6 0 6 C0 10.5 6 16 6 16 C6 16 12 10.5 12 6 C12 2.6 9.4 0 6 0 Z" fill="#2563EB"/><circle cx="6" cy="6" r="2" fill="#FFFFFF"/></g></svg>`,
  step3: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" fill="#EFF6FF"/><circle cx="32" cy="32" r="20" fill="#2563EB" opacity="0.2"/><path d="M20 32 L28 40 L44 22" stroke="#2563EB" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

function getLoadingTips(area) {
  const name = area?.name || "추천 지역";
  return {
    step1: { main: "당신의 여행 성향 분석 중...", sub: "선택한 답변에서 이동 기준과 숙소 분위기를 정리하고 있어요." },
    step2: { main: `${name} 적합도 확인 중...`, sub: "공항 이동, 주요 동선, 주변 분위기, 예산 균형을 함께 비교합니다." },
    step3: { main: "맞춤 숙소 위치를 찾았어요! ✨", sub: "결과 화면으로 이동합니다." }
  };
}

function processAnalysis() {
  const { topArea } = prepareResultContent();
  const circle = document.getElementById("loaderCircle");
  const barWrap = document.getElementById("loadingProgressWrap");
  const txtMain = document.getElementById("loadingText");
  const txtSub = document.getElementById("loadingSubText");
  const iconContainer = document.getElementById("loaderIcon");
  const progress = document.getElementById("loadingProgressBar");
  const tips = getLoadingTips(topArea);

  circle.classList.remove("complete");
  barWrap.classList.remove("hide");
  progress.style.transition = "none";
  progress.style.width = "0%";
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
  resetTabs(0);
  navigateTo("loadingPage");

  requestAnimationFrame(() => {
    progress.style.transition = "width 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    progress.style.width = "35%";
    txtMain.innerText = tips.step1.main;
    txtSub.innerText = tips.step1.sub;
    iconContainer.innerHTML = loadingIcons.step1;
  });

  setTimeout(() => {
    txtMain.style.opacity = 0;
    txtSub.style.opacity = 0;
    setTimeout(() => {
      progress.style.transition = "width 1.1s cubic-bezier(0.16, 1, 0.3, 1)";
      progress.style.width = "85%";
      txtMain.innerText = tips.step2.main;
      txtSub.innerText = tips.step2.sub;
      iconContainer.innerHTML = loadingIcons.step2;
      txtMain.style.opacity = 1;
      txtSub.style.opacity = 1;
    }, 150);
  }, 800);

  setTimeout(() => {
    txtMain.style.opacity = 0;
    txtSub.style.opacity = 0;
    setTimeout(() => {
      progress.style.transition = "width 0.3s ease-in";
      progress.style.width = "100%";
      txtMain.innerText = tips.step3.main;
      txtSub.innerText = tips.step3.sub;
      iconContainer.innerHTML = loadingIcons.step3;
      circle.classList.add("complete");
      barWrap.classList.add("hide");
      txtMain.style.opacity = 1;
      txtSub.style.opacity = 1;
    }, 150);
  }, 1950);

  setTimeout(() => {
    navigateTo("resultPage");
    document.getElementById("mainScrollBody").scrollTop = 0;
  }, 2550);
}

function showDetailedView(tabIndex = 0) {
  document.getElementById("simpleSummaryCard").style.display = "none";
  document.getElementById("detailedInfoSection").style.display = "block";
  document.getElementById("resultPage")?.classList.add("is-detail-open");
  resetTabs(tabIndex);
  document.getElementById("mainScrollBody").scrollTo({ top: 0, behavior: "smooth" });
}

function resetTabs(index = 0) {
  const buttons = Array.from(document.querySelectorAll(".tab-btn"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  buttons.forEach((btn, btnIndex) => btn.classList.toggle("active", btnIndex === index));
  panels.forEach((panel, panelIndex) => panel.classList.toggle("active", panelIndex === index));
}

function switchTab(index, clickedBtn) {
  resetTabs(index);
  const container = document.getElementById("tabContainer");
  if (!container || !clickedBtn) return;

  const btnLeft = clickedBtn.offsetLeft;
  const btnWidth = clickedBtn.offsetWidth;
  const containerWidth = container.offsetWidth;
  const targetScrollLeft = btnLeft - (containerWidth / 2) + (btnWidth / 2);

  container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
}

function goToHotelTab() {
  showDetailedView(2);
}

async function renderRelatedPosts(area) {
  const section = document.getElementById("relatedPostSection");
  const list = document.getElementById("relatedPostList");
  const empty = document.getElementById("relatedPostEmpty");

  if (!section || !list) return;

  section.style.display = "";
  list.innerHTML = "";
  if (empty) empty.style.display = "none";
  setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);

  const posts = await fetchRelatedPostsByRegion(area);
  const relatedTabButton = document.querySelector('.tab-btn[data-tab="3"]');
  const hasRelatedPosts = posts.length > 0;

  if (relatedTabButton) {
    relatedTabButton.hidden = !hasRelatedPosts;
    relatedTabButton.setAttribute("aria-hidden", String(!hasRelatedPosts));
  }

  section.hidden = !hasRelatedPosts;
  section.style.display = hasRelatedPosts ? "" : "none";

  if (!hasRelatedPosts) {
    if (empty) empty.style.display = "block";
    return;
  }

  posts.forEach((post) => {
    const title = String(post.title || "여행 스타일별 호텔 추천 글").trim();
    const slug = String(post.slug || "").trim();
    const item = document.createElement("li");
    const link = document.createElement("a");

    link.href = slug ? `/post/${encodeURIComponent(slug)}/` : "#";
    link.textContent = title;
    link.setAttribute("aria-label", `${title} 보기`);

    item.appendChild(link);
    list.appendChild(item);
  });
}


function getSurveyExitUrl() {
  const destinationSlug = cityConfig.destinationSlug || "";
  return destinationSlug ? `/destinations/${destinationSlug}/` : "/destinations/";
}

function exitSurveyPage() {
  const fallbackUrl = getSurveyExitUrl();

  try {
    const currentPath = window.location.pathname.replace(/\/+$/, "");
    const referrerUrl = document.referrer ? new URL(document.referrer) : null;
    const referrerPath = referrerUrl ? referrerUrl.pathname.replace(/\/+$/, "") : "";

    if (referrerPath && referrerPath !== currentPath && window.history.length > 1) {
      window.history.back();
      return;
    }
  } catch (error) {
    // referrer parsing can fail for unusual schemes. Use the city page fallback below.
  }

  window.location.href = fallbackUrl;
}

function closeDetailedView() {
  const detailSection = document.getElementById("detailedInfoSection");
  const summaryCard = document.getElementById("simpleSummaryCard");

  if (summaryCard) summaryCard.style.display = "flex";
  if (detailSection) detailSection.style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
  resetTabs(0);
  document.getElementById("mainScrollBody")?.scrollTo({ top: 0, behavior: "smooth" });
}

function closeResultView() {
  exitSurveyPage();
}

function resetSurvey(toIntro = true) {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
  resetTabs(0);
  navigateTo(toIntro ? "introPage" : "introPage");
}

startSurveyBtn?.addEventListener("click", startSurvey);
backBtn?.addEventListener("click", goBack);
questionCloseBtn?.addEventListener("click", () => resetSurvey(true));
completionCloseBtn?.addEventListener("click", () => resetSurvey(true));
resultCloseBtn?.addEventListener("click", closeResultView);
resultReadyBtn?.addEventListener("click", processAnalysis);
nextBtn?.addEventListener("click", goNext);
prevBtn?.addEventListener("click", goPrev);
resetBtn?.addEventListener("click", () => resetSurvey(true));
detailBtn?.addEventListener("click", () => showDetailedView(0));
detailBackBtn?.addEventListener("click", closeDetailedView);
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
