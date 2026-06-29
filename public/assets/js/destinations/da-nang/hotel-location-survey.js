/* 다낭 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "다낭",
  "destinationSlug": "da-nang",
  "postContentType": "top5_series",
  "areas": {
    "myKhe": {
      "name": "미케비치·푸억미",
      "summary": "아침에는 해변을 걷고 저녁에는 맛집과 마사지 골목을 가볍게 오가는 흐름 속에서, 다낭의 바다와 도심 편의를 모두 놓치고 싶지 않은 당신에게 잘 맞는 대표 해변 지역입니다.",
      "leadTitle": "첫 다낭 여행과 커플·친구 여행에 균형이 좋은 위치입니다.",
      "leadText": "바다 분위기를 느끼면서도 호텔 주변에서 식사와 저녁 산책을 해결하기 쉽습니다. 다낭이 처음이라면 가장 먼저 비교해볼 만합니다.",
      "hotels": [
        {"name":"Sala Danang Beach Hotel","kr":"살라 다낭 비치 호텔","area":"미케비치·푸억미","tag":"해변 접근 균형형","text":"미케비치·푸억미 도보권에서 해변 산책과 주변 식당 접근성을 함께 보기 좋은 호텔입니다."},
        {"name":"TMS Hotel Da Nang Beach","kr":"TMS 호텔 다낭 비치","area":"미케비치·푸억미","tag":"해변 전망형","text":"바다 전망과 해변 접근을 우선하는 여행자에게 비교 가치가 높은 숙소입니다."},
        {"name":"Mandila Beach Hotel Danang","kr":"만딜라 비치 호텔 다낭","area":"미케비치·푸억미","tag":"실속 해변형","text":"해변 가까운 위치와 가격 균형을 함께 보고 싶은 일정에 어울립니다."},
        {"name":"Brilliant Hotel Danang","kr":"브릴리언트 호텔 다낭","area":"한강 동쪽·용다리","tag":"강변 야경형","text":"용다리와 한강 야경, 시내 식사 동선을 함께 잡기 좋은 도심형 호텔입니다."},
        {"name":"Vanda Hotel","kr":"반다 호텔","area":"한강 동쪽·용다리","tag":"용다리 접근형","text":"다낭 도심과 용다리 접근성을 우선하는 짧은 일정에 비교하기 좋습니다."}
      ]
    },
    "nonNuoc": {
      "name": "논느억·오행산 리조트권",
      "summary": "넓은 리조트와 조용한 남쪽 해변, 오행산과 호이안 방향 동선까지 여유롭게 품은 공간에서 해변 리조트의 휴식을 가장 중요하게 보는 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "가족 여행과 리조트 휴식 중심 일정에 좋습니다.",
      "leadText": "시내 접근성보다 수영장, 객실 크기, 해변 휴식을 중요하게 본다면 논느억·오행산 리조트권이 만족스럽습니다.",
      "hotels": [
        {"name":"Hyatt Regency Danang Resort and Spa","kr":"하얏트 리젠시 다낭 리조트 앤 스파","area":"논느억·오행산","tag":"가족 리조트형","text":"넓은 리조트 시설과 해변 휴식을 원하는 가족 여행에서 비교 가치가 높습니다."},
        {"name":"Pullman Danang Beach Resort","kr":"풀만 다낭 비치 리조트","area":"논느억·오행산","tag":"휴양 균형형","text":"도심 접근성과 리조트 휴식을 어느 정도 함께 보고 싶은 일정에 어울립니다."},
        {"name":"Naman Retreat","kr":"나만 리트리트","area":"논느억·오행산","tag":"남쪽 리조트형","text":"다낭 남쪽 해변과 호이안 동선을 함께 고려하는 리조트 여행에 비교해볼 만합니다."},
        {"name":"TMS Hotel Da Nang Beach","kr":"TMS 호텔 다낭 비치","area":"미케비치·푸억미","tag":"해변 전망형","text":"바다 전망과 해변 접근을 우선하는 여행자에게 비교 가치가 높은 숙소입니다."},
        {"name":"Sala Danang Beach Hotel","kr":"살라 다낭 비치 호텔","area":"미케비치·푸억미","tag":"해변 접근 균형형","text":"미케비치·푸억미 도보권에서 해변 산책과 주변 식당 접근성을 함께 보기 좋은 호텔입니다."}
      ]
    },
    "cityCenter": {
      "name": "다낭 시내·한시장",
      "summary": "시장의 활기와 로컬 식당, 공항 접근성이 가까이 모여 있는 시내에서 다낭 사람들의 일상적인 리듬을 느끼며 실속 있게 머물고 싶은 당신에게 잘 맞는 도심 지역입니다.",
      "leadTitle": "가성비와 짧은 이동을 중시하는 여행자에게 편합니다.",
      "leadText": "바다 휴양 느낌은 약하지만 공항, 한시장, 카페, 로컬 식당 접근성이 좋아 비용을 줄이기 좋습니다.",
      "hotels": [
        {"name":"Wink Hotel Danang Centre","kr":"윙크 호텔 다낭 센터","area":"다낭 시내·한시장","tag":"도심 실속형","text":"시내 접근성과 합리적인 숙박비를 함께 보는 여행자에게 어울립니다."},
        {"name":"Brilliant Hotel Danang","kr":"브릴리언트 호텔 다낭","area":"한강 동쪽·용다리","tag":"강변 야경형","text":"용다리와 한강 야경, 시내 식사 동선을 함께 잡기 좋은 도심형 호텔입니다."},
        {"name":"Vanda Hotel","kr":"반다 호텔","area":"한강 동쪽·용다리","tag":"용다리 접근형","text":"다낭 도심과 용다리 접근성을 우선하는 짧은 일정에 비교하기 좋습니다."},
        {"name":"Mandila Beach Hotel Danang","kr":"만딜라 비치 호텔 다낭","area":"미케비치·푸억미","tag":"실속 해변형","text":"해변 가까운 위치와 가격 균형을 함께 보고 싶은 일정에 어울립니다."},
        {"name":"Sala Danang Beach Hotel","kr":"살라 다낭 비치 호텔","area":"미케비치·푸억미","tag":"해변 접근 균형형","text":"미케비치·푸억미 도보권에서 해변 산책과 주변 식당 접근성을 함께 보기 좋은 호텔입니다."}
      ]
    },
    "hanRiverEast": {
      "name": "한강 동쪽·용다리",
      "summary": "용다리의 불빛과 강변 야경, 해변과 시내를 오가는 동선이 자연스럽게 이어지는 위치에서 다낭의 저녁 분위기를 편하게 즐기고 싶은 당신에게 잘 어울리는 강변 지역입니다.",
      "leadTitle": "야경과 이동 편의성을 함께 원하는 여행자에게 좋습니다.",
      "leadText": "해변과 시내 사이에서 균형을 잡고 싶다면 한강 동쪽·용다리가 편합니다. 부모님 동반이나 짧은 일정에도 무난합니다.",
      "hotels": [
        {"name":"Brilliant Hotel Danang","kr":"브릴리언트 호텔 다낭","area":"한강 동쪽·용다리","tag":"강변 야경형","text":"용다리와 한강 야경, 시내 식사 동선을 함께 잡기 좋은 도심형 호텔입니다."},
        {"name":"Vanda Hotel","kr":"반다 호텔","area":"한강 동쪽·용다리","tag":"용다리 접근형","text":"다낭 도심과 용다리 접근성을 우선하는 짧은 일정에 비교하기 좋습니다."},
        {"name":"Wink Hotel Danang Centre","kr":"윙크 호텔 다낭 센터","area":"다낭 시내·한시장","tag":"도심 실속형","text":"시내 접근성과 합리적인 숙박비를 함께 보는 여행자에게 어울립니다."},
        {"name":"Sala Danang Beach Hotel","kr":"살라 다낭 비치 호텔","area":"미케비치·푸억미","tag":"해변 접근 균형형","text":"미케비치·푸억미 도보권에서 해변 산책과 주변 식당 접근성을 함께 보기 좋은 호텔입니다."},
        {"name":"TMS Hotel Da Nang Beach","kr":"TMS 호텔 다낭 비치","area":"미케비치·푸억미","tag":"해변 전망형","text":"바다 전망과 해변 접근을 우선하는 여행자에게 비교 가치가 높은 숙소입니다."}
      ]
    },
    "northTransit": {
      "name": "다낭 북부·공항·기차역 주변",
      "summary": "공항과 기차역, 북부 이동 동선을 가볍게 정리하면서 숙박비 부담까지 줄이고 싶은 당신에게 잘 맞는 실속형 위치입니다.",
      "leadTitle": "공항·기차역 이동이나 장기 숙박이 목적일 때 보는 보조 권역입니다.",
      "leadText": "일반적인 첫 다낭 여행의 대표 숙박지는 아니지만, 늦은 도착이나 이른 출국, 기차역 이동이 중요하다면 현실적인 선택지가 될 수 있습니다.",
      "hotels": [
        {"name":"Wink Hotel Danang Centre","kr":"윙크 호텔 다낭 센터","area":"시내·공항 접근","tag":"공항 접근형","text":"공항과 시내 접근성을 함께 보는 짧은 일정에 비교하기 좋습니다."},
        {"name":"Vanda Hotel","kr":"반다 호텔","area":"도심 접근","tag":"이동 균형형","text":"공항·시내·강변 이동을 단순하게 가져가고 싶은 일정에 어울립니다."},
        {"name":"Brilliant Hotel Danang","kr":"브릴리언트 호텔 다낭","area":"한강 동쪽·용다리","tag":"강변 야경형","text":"용다리와 한강 야경, 시내 식사 동선을 함께 잡기 좋은 도심형 호텔입니다."},
        {"name":"Mandila Beach Hotel Danang","kr":"만딜라 비치 호텔 다낭","area":"미케비치·푸억미","tag":"실속 해변형","text":"공항 이동 후 해변 생활권에 머물고 싶은 일정에 비교할 수 있습니다."},
        {"name":"Sala Danang Beach Hotel","kr":"살라 다낭 비치 호텔","area":"미케비치·푸억미","tag":"해변 접근 균형형","text":"미케비치·푸억미 도보권에서 해변 산책과 주변 식당 접근성을 함께 보기 좋은 호텔입니다."}
      ]
    }
  },
  "questions": [
    {"title":"이번 다낭 여행은 몇 번째인가요?","help":"처음이면 이동이 단순한 위치가 편하고, 재방문이면 휴식형 구역도 좋습니다.","options":[
      {"title":"첫 여행","scores":{"myKhe":5,"hanRiverEast":4,"cityCenter":2}},
      {"title":"재방문","scores":{"nonNuoc":4,"myKhe":2,"hanRiverEast":2}},
      {"title":"익숙한 여행","scores":{"nonNuoc":3,"cityCenter":2,"northTransit":2}}
    ]},
    {"title":"누구와 함께 가나요?","help":"동행자에 따라 식사, 이동, 객실 크기의 중요도가 달라집니다.","options":[
      {"title":"혼자 또는 친구","scores":{"myKhe":4,"cityCenter":3,"hanRiverEast":3}},
      {"title":"커플 여행","scores":{"myKhe":4,"hanRiverEast":3,"nonNuoc":2}},
      {"title":"가족·아이","scores":{"nonNuoc":5,"myKhe":3,"hanRiverEast":2}},
      {"title":"부모님 동반","scores":{"hanRiverEast":5,"myKhe":3,"cityCenter":2}}
    ]},
    {"title":"가장 기대하는 일정은 무엇인가요?","help":"다낭에서 가장 많이 쓸 시간을 기준으로 골라보세요.","options":[
      {"title":"해변 산책","scores":{"myKhe":6,"nonNuoc":3}},
      {"title":"야경·맛집","scores":{"hanRiverEast":5,"cityCenter":3,"myKhe":2}},
      {"title":"리조트 휴식","scores":{"nonNuoc":6,"myKhe":2}},
      {"title":"쇼핑·카페","scores":{"cityCenter":5,"hanRiverEast":3}}
    ]},
    {"title":"공항 이동은 얼마나 중요하나요?","help":"늦은 도착이나 이른 출국이면 공항 접근성이 중요합니다.","options":[
      {"title":"매우 중요","scores":{"cityCenter":5,"hanRiverEast":4,"northTransit":4}},
      {"title":"보통","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}},
      {"title":"크게 중요하지 않음","scores":{"nonNuoc":4,"myKhe":2}}
    ]},
    {"title":"근교 일정은 어느 정도인가요?","help":"호이안, 바나힐, 후에 일정 비중을 생각해보세요.","options":[
      {"title":"호이안 중심","scores":{"nonNuoc":6,"myKhe":2}},
      {"title":"바나힐 하루","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}},
      {"title":"후에까지 예정","scores":{"hanRiverEast":4,"cityCenter":3,"northTransit":2}},
      {"title":"근교 거의 없음","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}}
    ]},
    {"title":"숙소 주변 분위기는 어떤 쪽이 좋나요?","help":"저녁에 숙소 주변에서 어떻게 시간을 보낼지 떠올려보세요.","options":[
      {"title":"활기 있는 해변","scores":{"myKhe":6}},
      {"title":"차분한 리조트","scores":{"nonNuoc":6}},
      {"title":"야경 있는 도심","scores":{"hanRiverEast":5,"cityCenter":3}},
      {"title":"시장·로컬 분위기","scores":{"cityCenter":5,"hanRiverEast":2}}
    ]},
    {"title":"숙소 예산은 어떤 편인가요?","help":"해변 바로 앞과 리조트형 숙소는 가격이 올라갈 수 있습니다.","options":[
      {"title":"예산 절약","scores":{"cityCenter":6,"northTransit":3,"myKhe":2}},
      {"title":"가격·위치 균형","scores":{"myKhe":4,"hanRiverEast":4,"cityCenter":3}},
      {"title":"휴식 우선","scores":{"nonNuoc":5,"myKhe":2}}
    ]},
    {"title":"호텔에서 보내는 시간은 어느 정도인가요?","help":"숙소 안 시간이 길수록 리조트 시설과 조용함이 중요합니다.","options":[
      {"title":"잠만 자는 편","scores":{"cityCenter":4,"hanRiverEast":3,"northTransit":2}},
      {"title":"절반 정도 쉼","scores":{"myKhe":3,"hanRiverEast":3,"nonNuoc":2}},
      {"title":"호텔에서 오래 쉼","scores":{"nonNuoc":6,"myKhe":2}}
    ]}
  ]
};

const areaResultBadges = {
  "myKhe": "해변 산책과 맛집 동선이 모두 편한 곳",
  "nonNuoc": "리조트 휴식에 집중하기 좋은 남쪽 해변",
  "cityCenter": "시장과 로컬 식당이 편한 도심",
  "hanRiverEast": "용다리 야경과 해변을 잇는 강변",
  "northTransit": "이동 부담과 숙박비를 함께 줄이기 좋은 곳"
};

const hotelAccessPresets = {
  "myKhe": {
    "station": "미케비치 도보권",
    "airport": "다낭공항 차량 약 15~20분"
  },
  "nonNuoc": {
    "station": "논느억 해변·오행산 접근",
    "airport": "공항 차량 약 25~35분"
  },
  "cityCenter": {
    "station": "한시장·시내 도보권",
    "airport": "공항 차량 약 10~15분"
  },
  "hanRiverEast": {
    "station": "용다리·한강 도보권",
    "airport": "공항 차량 약 15분"
  },
  "northTransit": {
    "station": "공항·기차역 이동 편한 위치",
    "airport": "공항 차량 약 5~15분"
  }
};

function normalizeAreaToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s·ㆍ・&-]+/g, "");
}

function getAreaKey(area) {
  if (!area) return "";
  if (area.key && Object.prototype.hasOwnProperty.call(cityConfig.areas, area.key)) return area.key;

  return Object.keys(cityConfig.areas).find((key) => {
    const candidate = cityConfig.areas[key];
    return candidate === area || candidate.name === area.name || candidate.regionSlug === area.regionSlug;
  }) || "";
}

function getAreaDisplayName(area) {
  const displayName = String(area?.displayName || area?.name || "")
    .replace(/\s*&\s*/g, "·")
    .replace(/\s*-\s*/g, "·")
    .trim();
  return displayName || "추천 지역";
}

function uniqueItems(items) {
  return [...new Set((items || []).map((item) => String(item || "").trim()).filter(Boolean))];
}

Object.entries(cityConfig.areas || {}).forEach(([key, area]) => {
  area.key = area.key || key;
  area.displayName = getAreaDisplayName(area);
  area.resultBadge = area.resultBadge || areaResultBadges[key] || "이번 여행에 어울리는 숙소 위치";
  area.destinationLabel = area.destinationLabel || `${area.resultBadge}, ${area.displayName}`;
  area.bestFor = uniqueItems(area.bestFor || area.chips || ["일정이 짧은 여행", "위치 중심 숙소"]);
  area.notFor = uniqueItems(area.notFor || ["숙소에서만 오래 쉬는 일정", "이동보다 리조트 시설이 더 중요한 여행"]);
  area.bookingTips = uniqueItems(area.bookingTips || [
    "예약 전 최근 후기에서 소음, 청결, 주변 공사 언급을 확인하세요.",
    "공항·투어 픽업이 중요하면 호텔명보다 실제 픽업 가능 지역을 확인하세요.",
    "택시나 그랩 이동이 많은 도시라면 예상 이동비도 함께 계산하세요."
  ]);
  area.stayRange = uniqueItems(area.stayRange || [
    `${area.displayName} 안에서도 매일 갈 장소와 가장 가까운 위치`,
    "식사·편의점·마사지 등 저녁 이후 편의시설이 가까운 큰길 주변",
    "공항 이동이나 투어 픽업이 필요한 날의 동선이 단순한 숙소"
  ]);
  area.avoidRange = uniqueItems(area.avoidRange || [
    "지도상 가까워 보여도 실제 도보 길이 불편한 안쪽 골목",
    "저녁 이후 소음 후기가 반복되는 저층 객실",
    "매일 이동할 목적지와 반대 방향으로 떨어진 숙소"
  ]);
});

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
const resultCloseBtn = document.getElementById("resultCloseBtn");
const resultReadyBtn = document.getElementById("resultReadyBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const detailBtn = document.getElementById("detailBtn");
const hotelTabBtn = document.getElementById("hotelTabBtn");

const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (ch) => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));

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
  navigateTo("completionPage");
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

function getSelectedOption(questionIndex) {
  const answerIndex = answers[questionIndex];
  if (answerIndex === null || answerIndex === undefined) return null;
  return cityConfig.questions[questionIndex]?.options?.[answerIndex] || null;
}

function calculateScores() {
  const scores = {};
  Object.keys(cityConfig.areas).forEach((areaKey) => { scores[areaKey] = 0; });

  answers.forEach((answerIndex, questionIndex) => {
    if (answerIndex === null) return;
    const selectedOption = cityConfig.questions[questionIndex].options[answerIndex];
    Object.entries(selectedOption.scores || {}).forEach(([areaKey, score]) => {
      if (Object.prototype.hasOwnProperty.call(scores, areaKey)) scores[areaKey] += score;
    });
  });

  return Object.entries(scores)
    .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
    .sort((a, b) => b.score - a.score);
}

function getJosa(word, pair) {
  const [has, none] = pair.split("/");
  const last = String(word || "").trim().charCodeAt(String(word || "").trim().length - 1);
  if (!last || last < 0xac00 || last > 0xd7a3) return none || has;
  return ((last - 0xac00) % 28) ? has : none;
}

function withJosa(word, pair) {
  return `${word}${getJosa(word, pair)}`;
}

function getScoreFitSentence(rankedAreas) {
  if (!rankedAreas || rankedAreas.length < 2) return "";
  const top = rankedAreas[0];
  const second = rankedAreas[1];
  const gap = top.score - second.score;
  if (gap <= 1) return `${withJosa(second.name, "도/도")} 함께 볼 만하지만, 선택한 조건을 종합하면 ${withJosa(top.name, "이/가")} 조금 더 자연스럽습니다.`;
  if (gap <= 4) return `${second.name}도 가까운 선택지지만, 이번 답변에서는 ${withJosa(top.name, "이/가")} 더 안정적으로 맞습니다.`;
  return `이번 답변에서는 ${withJosa(top.name, "이/가")} 가장 또렷하게 맞는 흐름으로 정리됐습니다.`;
}

function getAlternativeSentence(area, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!area || !second) return "";
  return `${withJosa(area.name, "이/가")} 마음에 든다면, ${second.compareGood || second.summary || `${second.name}만의 다른 분위기`} ${second.name}도 함께 비교해볼 만합니다.`;
}

function getPersuasiveContent(area, rankedAreas) {
  const reasons = [
    { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary || "이번 여행 조건과 잘 맞는 위치입니다." },
    { title: "이동 기준이 단순해집니다", text: area.leadText || "매일 움직일 동선을 기준으로 숙소를 비교하기 쉽습니다." },
    { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 주변 분위기, 최근 후기를 훨씬 빠르게 비교할 수 있습니다." }
  ];
  if (area.compareCaution || area.mismatchNote) {
    reasons.push({ title: "예약 전 확인할 점도 있습니다", text: area.compareCaution || area.mismatchNote });
  }

  return {
    intro: [area.summary, getScoreFitSentence(rankedAreas)].filter(Boolean).join(" "),
    reasons,
    conclusionTitle: `${area.name}부터 호텔을 비교해보세요`,
    conclusionText: [
      area.leadTitle || "이번 일정에서 먼저 볼 만한 숙소 위치입니다.",
      getAlternativeSentence(area, rankedAreas)
    ].filter(Boolean).join(" ")
  };
}

function renderPersuasiveResult(topArea, rankedAreas) {
  const content = getPersuasiveContent(topArea, rankedAreas);
  const reasonCardList = document.getElementById("reasonCardList");

  setText("resultWhyText", content.intro);
  setText("decisionConclusionTitle", content.conclusionTitle);
  setText("decisionConclusionText", content.conclusionText);

  if (!reasonCardList) return;
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

function getPracticalGuideDesc(area) {
  if (!area) return "";
  return `${withJosa(area.name, "을/를")} 고를 때는 지역명보다 실제 도보 시간, 저녁 이후 이동, 공항·투어 동선, 객실 크기를 함께 확인하는 것이 좋습니다.`;
}

function renderPracticalGuide(area) {
  setText("practicalGuideDesc", getPracticalGuideDesc(area));
  renderSimpleList("stayRangeList", area.stayRange);
  renderSimpleList("avoidRangeList", area.avoidRange);
  renderSimpleList("bookingTipList", area.bookingTips);
  renderChipList("bestForList", area.bestFor);
  renderChipList("notForList", area.notFor);
}

function getAreaShortAppeal(area) {
  if (!area) return "다른 분위기를 느낄 수 있는";
  if (area.compareGood) return area.compareGood.replace(/[.。]\s*$/, "");
  if (area.summary) return area.summary.replace(/[.。]\s*$/, "");
  return `${getAreaDisplayName(area)}만의 다른 매력이 있는`;
}

function getAlternativeDetail(topArea, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!topArea || !second) return null;
  const title = "이런 지역도 함께 볼 만해요";
  const text = `${withJosa(getAreaDisplayName(topArea), "이/가")} 마음에 든다면, ${getAreaShortAppeal(second)} ${getAreaDisplayName(second)}도 함께 비교해볼 만합니다. 호텔 가격과 실제 이동 시간이 잘 맞으면 충분히 좋은 선택이 될 수 있습니다.`;
  return { title, text };
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

function getHotelAccessInfo(hotel, area) {
  const key = getAreaKey(area);
  const fallback = hotelAccessPresets[key] || {
    station: `${getAreaDisplayName(area)} 주요 동선 확인`,
    airport: "공항 접근성 확인"
  };
  return {
    station: hotel.stationAccess || fallback.station,
    airport: hotel.airportAccess || fallback.airport
  };
}

function getHotelDisplayTags(hotel) {
  const directTags = [hotel.starRating, hotel.guestRating, hotel.freeCancel].filter(Boolean);
  if (directTags.length) return directTags.slice(0, 3);
  const metaTags = Array.isArray(hotel.meta) ? hotel.meta : [];
  return uniqueItems([hotel.tag, hotel.location, ...metaTags]).slice(0, 3);
}

function renderHotelCards(area) {
  const hotelCardList = document.getElementById("hotelCardList");
  const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];
  if (!hotelCardList) return;

  setText("hotelSectionTitle", `${area.name}에서 먼저 비교해볼 호텔 5곳`);
  setText("hotelSectionDesc", "접근성과 실제 이동 시간을 기준으로 빠르게 비교해보세요.");
  hotelCardList.innerHTML = "";

  if (!hotels.length) {
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
    const hotelName = hotel.kr || hotel.name || "호텔 후보";

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

    name.textContent = hotelName;
    link.href = hotel.url || `/destinations/${cityConfig.destinationSlug}/hotel-recommendations/`;
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotelName} 잔여 객실 확인`);
    station.textContent = access.station;
    separator.textContent = "|";
    airport.textContent = access.airport;

    headerLeft.appendChild(name);
    header.appendChild(headerLeft);
    header.appendChild(link);
    locationMain.appendChild(station);
    locationMain.appendChild(separator);
    locationMain.appendChild(airport);

    tags.forEach((item) => {
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

function getRelatedPostRegionSlugs(area) {
  return uniqueItems([
    area?.regionSlug,
    ...(Array.isArray(area?.regionSlugAliases) ? area.regionSlugAliases : []),
    area?.name,
    area?.displayName,
    area?.key
  ]);
}

async function fetchRelatedPostsByRegion(area) {
  const regionSlugs = getRelatedPostRegionSlugs(area);
  for (const regionSlug of regionSlugs) {
    const params = new URLSearchParams({
      destination: cityConfig.destinationSlug,
      type: cityConfig.postContentType || "top5_series",
      region: regionSlug,
      limit: "5"
    });
    try {
      const response = await fetch(`/api/destination-posts?${params.toString()}`, {
        headers: { accept: "application/json" },
        cache: "no-store"
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

async function renderRelatedPosts(area) {
  const list = document.getElementById("relatedPostList");
  const empty = document.getElementById("relatedPostEmpty");
  if (!list) return;
  list.innerHTML = "";
  if (empty) empty.style.display = "none";
  setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);

  const posts = await fetchRelatedPostsByRegion(area);
  if (!posts.length) {
    if (empty) empty.style.display = "block";
    return;
  }

  posts.forEach((post) => {
    const title = String(post.title || "여행 스타일별 호텔 추천 글").trim();
    const slug = String(post.slug || "").trim();
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = slug ? `/post/${encodeURIComponent(slug)}` : "#";
    link.textContent = title;
    link.setAttribute("aria-label", `${title} 보기`);
    item.appendChild(link);
    list.appendChild(item);
  });
}

function getEmotionalSummary(area) {
  if (!area) return "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
  return area.emotionalSummary || area.summary || area.leadText || "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
}

function getResultBadgeText(area) {
  const areaKey = getAreaKey(area);
  if (areaKey && areaResultBadges[areaKey]) return areaResultBadges[areaKey];
  const label = area?.destinationLabel || "";
  if (label.includes(",")) return label.split(",")[0].trim();
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
  setText("resultLeadTitle", topArea.leadTitle || `${displayName}이 이번 일정에 잘 맞습니다.`);
  setText("resultLeadText", topArea.leadText || topArea.summary || "선택한 답변을 기준으로 이동과 숙소 분위기를 함께 비교했습니다.");

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

function resetSurvey() {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  resetTabs(0);
  navigateTo("introPage");
}

startSurveyBtn?.addEventListener("click", startSurvey);
backBtn?.addEventListener("click", goBack);
resultCloseBtn?.addEventListener("click", resetSurvey);
resultReadyBtn?.addEventListener("click", processAnalysis);
nextBtn?.addEventListener("click", goNext);
prevBtn?.addEventListener("click", goPrev);
resetBtn?.addEventListener("click", resetSurvey);
detailBtn?.addEventListener("click", () => showDetailedView(0));
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
