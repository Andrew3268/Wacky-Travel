
const areaResultBadges = {
  hakata: "공항과 근교 이동이 쉬운 시작점",
  tenjin: "쇼핑과 맛집 동선이 편한 중심지",
  nakasuKawabata: "강변 야경과 미식 동선이 가까운 곳",
  gion: "하카타와 나카스 사이의 차분한 균형",
  yakuinWatanabedori: "텐진 접근성과 로컬 감성이 만나는 동네",
  ohoriMomochi: "공원과 바다를 여유롭게 즐기기 좋은 곳"
};

const areaDestinationLabels = {
  hakata: `${areaResultBadges.hakata}, 하카타`,
  tenjin: `${areaResultBadges.tenjin}, 텐진`,
  nakasuKawabata: `${areaResultBadges.nakasuKawabata}, 나카스·카와바타`,
  gion: `${areaResultBadges.gion}, 기온`,
  yakuinWatanabedori: `${areaResultBadges.yakuinWatanabedori}, 야쿠인·와타나베도리`,
  ohoriMomochi: `${areaResultBadges.ohoriMomochi}, 오호리·모모치`
};

const areaDestinationLabelAliases = {
  hakata: areaDestinationLabels.hakata,
  "하카타": areaDestinationLabels.hakata,
  tenjin: areaDestinationLabels.tenjin,
  "텐진": areaDestinationLabels.tenjin,
  nakasuKawabata: areaDestinationLabels.nakasuKawabata,
  "nakasu-kawabata": areaDestinationLabels.nakasuKawabata,
  "나카스카와바타": areaDestinationLabels.nakasuKawabata,
  "나카스 & 카와바타": areaDestinationLabels.nakasuKawabata,
  "나카스·카와바타": areaDestinationLabels.nakasuKawabata,
  "나카스-카와바타": areaDestinationLabels.nakasuKawabata,
  gion: areaDestinationLabels.gion,
  "기온": areaDestinationLabels.gion,
  yakuinWatanabedori: areaDestinationLabels.yakuinWatanabedori,
  "yakuin-watanabedori": areaDestinationLabels.yakuinWatanabedori,
  "야쿠인와타나베도리": areaDestinationLabels.yakuinWatanabedori,
  "야쿠인 & 와타나베도리": areaDestinationLabels.yakuinWatanabedori,
  "야쿠인·와타나베도리": areaDestinationLabels.yakuinWatanabedori,
  "야쿠인-와타나베도리": areaDestinationLabels.yakuinWatanabedori,
  ohoriMomochi: areaDestinationLabels.ohoriMomochi,
  "ohori-momochi": areaDestinationLabels.ohoriMomochi,
  "오호리모모치": areaDestinationLabels.ohoriMomochi,
  "오호리 & 모모치": areaDestinationLabels.ohoriMomochi,
  "오호리·모모치": areaDestinationLabels.ohoriMomochi,
  "오호리-모모치": areaDestinationLabels.ohoriMomochi
};

function normalizeAreaToken(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s·ㆍ・&-]+/g, "");
}

const normalizedAreaDestinationLabels = Object.entries(areaDestinationLabelAliases).reduce((acc, [alias, label]) => {
  acc[normalizeAreaToken(alias)] = label;
  return acc;
}, {});

const hotelAccessPresets = {
  hakata: {
    station: "하카타역 도보권",
    airport: "공항역 지하철 약 5분"
  },
  tenjin: {
    station: "텐진역 도보권",
    airport: "공항역 지하철 약 11분"
  },
  nakasuKawabata: {
    station: "나카스카와바타역 도보권",
    airport: "공항역 지하철 약 9분"
  },
  gion: {
    station: "기온역 도보권",
    airport: "공항역 지하철 약 7분"
  },
  yakuinWatanabedori: {
    station: "야쿠인·와타나베도리역 도보권",
    airport: "공항역 환승 약 15분"
  },
  ohoriMomochi: {
    station: "오호리공원·니시진역 도보권",
    airport: "공항역 지하철 약 15분"
  }
};

function getAreaKey(area) {
  if (!area) return "";
  if (area.key && Object.prototype.hasOwnProperty.call(cityConfig.areas, area.key)) {
    return area.key;
  }

  return Object.keys(cityConfig.areas).find((key) => {
    const candidate = cityConfig.areas[key];
    return candidate === area || candidate.name === area.name || candidate.regionSlug === area.regionSlug;
  }) || "";
}

function getAreaDestinationLabel(area) {
  const areaKey = getAreaKey(area);
  if (areaKey && areaDestinationLabels[areaKey]) return areaDestinationLabels[areaKey];
  if (area?.destinationLabel) return area.destinationLabel;

  const aliasCandidates = [
    area?.name,
    area?.regionSlug,
    ...(Array.isArray(area?.regionSlugAliases) ? area.regionSlugAliases : [])
  ];

  for (const candidate of aliasCandidates) {
    const label = normalizedAreaDestinationLabels[normalizeAreaToken(candidate)];
    if (label) return label;
  }

  const displayName = String(area?.name || "").replace(/\s*&\s*/g, "·").trim();
  return displayName ? `여행 리듬이 편안해지는, ${displayName}` : "이번 여행에 어울리는 숙소 위치";
}

function getAreaDisplayName(area) {
  const areaKey = getAreaKey(area);
  const displayNames = {
    hakata: "하카타",
    tenjin: "텐진",
    nakasuKawabata: "나카스·카와바타",
    gion: "기온",
    yakuinWatanabedori: "야쿠인·와타나베도리",
    ohoriMomochi: "오호리·모모치"
  };

  if (areaKey && displayNames[areaKey]) return displayNames[areaKey];

  const displayName = String(area?.name || "")
    .replace(/\s*&\s*/g, "·")
    .replace(/\s*-\s*/g, "·")
    .trim();

  return displayName || "추천 지역";
}

function getHotelAccessInfo(hotel, area) {
  const key = getAreaKey(area);
  const fallback = hotelAccessPresets[key] || {
    station: `${area.name} 주요역 도보권`,
    airport: "공항 접근성 확인"
  };

  return {
    station: hotel.stationAccess || fallback.station,
    airport: hotel.airportAccess || fallback.airport
  };
}

function getHotelDisplayTags(hotel) {
  const star = hotel.starRating || "성급 확인";
  const rating = hotel.guestRating || "평점 확인";
  const cancel = hotel.freeCancel || "무료 취소 확인";
  return [star, rating, cancel].filter(Boolean);
}

/*
 * Fukuoka hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  cityName: "후쿠오카",
  destinationSlug: "fukuoka",
  postContentType: "top5_series",
  areas: {
    hakata: {
      name: "하카타",
      destinationLabel: areaDestinationLabels.hakata,
      regionSlug: "하카타",
      regionSlugAliases: ["hakata"],
      label: "공항 이동과 근교 이동까지 가장 단순하게 잡기 좋은 중심 위치",
      summary: "공항에서 도심까지 빠르게 이어지는 단순한 동선 속에서, 짧은 일정 안에 근교 이동과 후쿠오카 도심 여행을 단정하게 묶고 싶은 당신에게 가장 안정적인 시작점입니다.",
      leadTitle: "첫 여행자와 짧은 일정 여행자에게 실패 확률이 낮은 위치입니다.",
      leadText: "하카타역을 중심으로 공항, 텐진, 기온, 나카스까지 연결하기 쉽습니다. 2박 3일처럼 시간이 짧거나 부모님과 함께 움직이는 일정이라면 이동 피로를 줄이기 좋습니다.",
      stayRange: [
        "JR 하카타역 또는 지하철 하카타역 도보 10분 이내",
        "공항 이동을 중시한다면 하카타역 동쪽·서쪽 출구 접근성 확인",
        "근교 당일치기가 있다면 JR·버스터미널 이동이 쉬운 위치"
      ],
      avoidRange: [
        "나카스 야경과 저녁 식사가 핵심이라면 하카타역 안쪽 숙소만 고집하지 않는 편이 좋습니다.",
        "역과 가까워도 캐리어를 끌고 가기 불편한 골목 안쪽 숙소",
        "객실 크기가 중요하다면 초소형 비즈니스 호텔 위주로만 보지 않는 편이 좋습니다."
      ],
      bestFor: ["첫 후쿠오카 여행", "짧은 2박 3일", "공항 이동", "근교 당일치기", "부모님 동반"],
      notFor: ["저녁마다 나카스 중심으로 오래 머무는 여행", "텐진 쇼핑에 집중된 일정", "해변·공원 중심의 느린 여행"],
      bookingTips: [
        "하카타역 도보 시간만 보지 말고 실제 이용할 출구와의 거리를 확인하세요.",
        "아침 비행기나 늦은 도착이면 공항선 이동이 단순한 호텔을 우선 비교하세요.",
        "근교 이동이 많다면 조식 시간보다 역 접근성과 캐리어 보관 후기를 먼저 보세요."
      ],
      chips: ["첫 여행", "공항 이동", "JR", "근교 이동", "부모님 동반"],
      compareGood: "공항과 JR, 버스 이동을 한 번에 잡기 좋아 일정이 바뀌어도 대응하기 쉽습니다.",
      compareCaution: "숙소 주변의 여행 분위기는 나카스나 텐진보다 덜 화려하게 느껴질 수 있습니다.",
      mismatchNote: "야경·맛집, 쇼핑, 해변 산책이 더 중요하다면 하카타는 이동을 안정적으로 받쳐주는 선택에 가깝습니다.",
      hotels: [
        { name: "미야코 호텔 하카타", tag: "하카타역 최단 동선", location: "하카타 권역", reason: "하카타역 접근성과 객실 여유를 함께 보고 싶은 여행자에게 비교 가치가 높은 숙소입니다.", meta: ["하카타역", "공항 이동", "부모님 동반"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "5성급", guestRating: "★ 4.7", freeCancel: "무료 취소 확인", url: "/post/miyako-hotel-hakata/" },
        { name: "오리엔탈 호텔 후쿠오카 하카타 스테이션", tag: "역세권 안정형", location: "하카타역 주변", reason: "공항선과 JR 이동을 단순하게 만들고 싶은 첫 여행자에게 보기 좋은 후보입니다.", meta: ["역세권", "첫 여행", "짧은 일정"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/oriental-hotel-fukuoka-hakata-station/" },
        { name: "호텔 닛코 후쿠오카", tag: "클래식 도심형", location: "하카타 중심", reason: "하카타역 생활권에서 안정적인 서비스와 이동 편의성을 함께 기대할 수 있습니다.", meta: ["하카타", "교통", "안정형"], stationAccess: "하카타역 도보 약 3분", airportAccess: "공항역 지하철 약 5분", starRating: "5성급", guestRating: "★ 4.6", freeCancel: "무료 취소 확인", url: "/post/hotel-nikko-fukuoka/" },
        { name: "JR 큐슈 호텔 블라섬 하카타 센트럴", tag: "실속 역세권", location: "하카타역 도보권", reason: "하카타역 주변에서 위치와 가격 균형을 함께 보고 싶은 여행자에게 적합합니다.", meta: ["가성비", "역세권", "교통"], stationAccess: "하카타역 도보 약 2분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/jr-kyushu-hotel-blossom-hakata-central/" },
        { name: "호텔 포르자 하카타에키 치쿠시구치", tag: "짧은 일정 후보", location: "하카타역 치쿠시구치", reason: "공항 이동과 하카타역 출발 일정을 단순하게 만들고 싶은 경우 비교하기 좋습니다.", meta: ["공항선", "짧은 일정", "실속"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-forza-hakataeki-chikushi-guchi/" }
      ]
    },
    tenjin: {
      name: "텐진",
      destinationLabel: areaDestinationLabels.tenjin,
      regionSlug: "텐진",
      regionSlugAliases: ["tenjin"],
      label: "쇼핑과 식사, 도심 분위기를 가장 쉽게 즐기기 좋은 위치",
      summary: "쇼핑 거리와 감각적인 카페, 저녁 맛집이 자연스럽게 모이는 도심 속에서 후쿠오카의 일상적인 활기와 편리함을 함께 누리고 싶은 당신에게 잘 맞는 중심 지역입니다.",
      leadTitle: "쇼핑과 맛집, 커플·친구 여행의 균형이 좋습니다.",
      leadText: "텐진은 후쿠오카의 대표 번화가라 낮에는 쇼핑, 저녁에는 식사 동선을 짧게 만들기 좋습니다. 하카타보다 여행 분위기가 또렷하고, 나카스보다 숙박 선택지가 넓습니다.",
      stayRange: [
        "텐진역, 니시테츠후쿠오카역, 아카사카역 도보 10분 이내",
        "쇼핑 중심이면 텐진 지하상가와 백화점 접근성 확인",
        "나카스까지 걸을 계획이라면 텐진 남쪽·하루요시 방향도 비교"
      ],
      avoidRange: [
        "공항 이동과 JR 근교 이동이 핵심이라면 하카타와 함께 비교하세요.",
        "조용한 휴식이 중요하다면 번화가 한복판 저층 객실은 신중하게 보세요.",
        "캐리어가 많다면 지하상가와 호텔까지의 실제 이동 경로를 확인하세요."
      ],
      bestFor: ["쇼핑 여행", "커플 여행", "친구 여행", "카페·맛집", "도심 선호"],
      notFor: ["JR 근교 이동이 많은 일정", "해변·공원 중심 가족 여행", "숙소 주변 조용함이 최우선인 여행"],
      bookingTips: [
        "텐진역과 니시테츠후쿠오카역은 동선이 다르므로 자주 탈 노선을 먼저 정하세요.",
        "나카스까지 걸을 계획이라면 저녁 귀갓길과 다리 이동 시간을 함께 확인하세요.",
        "쇼핑 일정이 많다면 호텔 주변 코인락커보다 체크인 전 짐 보관 가능 여부를 확인하세요."
      ],
      chips: ["쇼핑", "맛집", "커플", "친구 여행", "도심"],
      compareGood: "쇼핑과 식사 선택지가 많아 숙소 주변에서 여행 시간을 충분히 쓰기 좋습니다.",
      compareCaution: "하카타역 기반 근교 이동이나 이른 공항 이동은 하카타보다 한 번 더 계산해야 합니다.",
      mismatchNote: "이번 답변에서 공항 이동, 근교 여행, 부모님 동반을 더 많이 골랐다면 텐진보다 하카타가 더 편할 수 있습니다.",
      hotels: [
        { name: "솔라리아 니시테츠 호텔 후쿠오카", tag: "텐진 중심", location: "텐진 권역", reason: "쇼핑과 식사, 니시테츠 이동을 한 번에 잡고 싶은 여행자에게 잘 맞는 후보입니다.", meta: ["쇼핑", "텐진역", "커플"], stationAccess: "텐진역 도보 약 3분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.6", freeCancel: "무료 취소 확인", url: "/post/solaria-nishitetsu-hotel-fukuoka/" },
        { name: "리치몬드 호텔 텐진 니시도리", tag: "쇼핑 도보권", location: "텐진 니시도리", reason: "텐진 쇼핑 거리와 카페 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["니시도리", "쇼핑", "도보 동선"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/richmond-hotel-tenjin-nishidori/" },
        { name: "호텔 몬토레 라 수르 후쿠오카", tag: "깔끔한 도심형", location: "텐진·아카사카 사이", reason: "텐진 접근성과 비교적 정돈된 숙박 분위기를 함께 보고 싶은 경우 좋습니다.", meta: ["텐진", "깔끔함", "커플"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-monterey-la-soeur-fukuoka/" },
        { name: "니시테츠 그랜드 호텔", tag: "클래식 텐진", location: "텐진 중심", reason: "텐진 생활권을 중심으로 안정적인 숙박을 원하는 여행자에게 비교 후보가 됩니다.", meta: ["텐진", "안정형", "쇼핑"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/nishitetsu-grand-hotel/" },
        { name: "램프 라이트 북스 호텔 후쿠오카", tag: "감성형 후보", location: "텐진·아카사카 권역", reason: "쇼핑·카페, 가벼운 도심 산책을 함께 즐기고 싶은 여행자에게 어울립니다.", meta: ["감성 숙소", "카페", "도심"], stationAccess: "텐진역 도보 약 8분", airportAccess: "공항역 지하철 약 11분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/lamplight-books-hotel-fukuoka/" }
      ]
    },
    nakasuKawabata: {
      name: "나카스 & 카와바타",
      destinationLabel: areaDestinationLabels.nakasuKawabata,
      regionSlug: "나카스카와바타",
      regionSlugAliases: ["nakasu-kawabata", "나카스-카와바타", "나카스 & 카와바타"],
      label: "야경과 맛집을 도보로 즐기기 좋은 위치",
      summary: "강변의 불빛과 포장마차의 온기, 늦은 저녁까지 이어지는 미식 동선을 숙소 가까이 두고 후쿠오카의 밤 분위기를 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
      leadTitle: "저녁에도 숙소로 돌아오는 길이 짧은 위치입니다.",
      leadText: "나카스 강변, 카와바타 상점가, 캐널시티, 텐진 남쪽까지 걸어서 연결하기 좋습니다. 친구 여행이나 맛집 중심 일정에서 체감 만족도가 높습니다.",
      stayRange: [
        "나카스카와바타역 도보 10분 이내",
        "나카스 야경을 원한다면 강변 접근성 확인",
        "소음이 걱정된다면 번화가 바로 앞보다 한 블록 떨어진 위치"
      ],
      avoidRange: [
        "소음에 예민하다면 나카스 중심 저층 객실은 신중하게 보세요.",
        "아이 동반 가족여행이라면 저녁 이후 주변 분위기를 먼저 확인하세요.",
        "근교 이동이 많다면 하카타역까지의 실제 이동 시간을 함께 보세요."
      ],
      bestFor: ["맛집 여행", "저녁 산책", "친구 여행", "커플 여행", "캐널시티 접근"],
      notFor: ["조용한 숙소가 최우선인 여행", "부모님 동반의 편안한 일정", "근교 이동이 많은 여행"],
      bookingTips: [
        "나카스 접근성과 소음은 함께 확인해야 합니다. 최근 후기에서 저녁 이후 소음 언급을 꼭 보세요.",
        "카와바타 쪽은 나카스와 가깝지만 체감 분위기가 조금 더 차분할 수 있습니다.",
        "늦은 저녁 식사와 귀가가 많다면 호텔 입구 주변 분위기와 편의점 접근성도 확인하세요."
      ],
      chips: ["맛집", "야경", "포장마차", "캐널시티", "친구 여행"],
      compareGood: "저녁 식사와 야경을 즐긴 뒤 숙소로 돌아오기 편합니다.",
      compareCaution: "번화가에 가까울수록 소음과 주변 분위기 호불호가 생길 수 있습니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 여유, 공항 이동을 더 중요하게 골랐다면 나카스 & 카와바타는 주의해서 비교해야 합니다.",
      hotels: [
        { name: "더 라이블리 후쿠오카 하카타", tag: "나카스 감성형", location: "나카스 & 카와바타 권역", reason: "나카스와 카와바타를 중심으로 도보 여행을 즐기고 싶은 여행자에게 어울립니다.", meta: ["나카스", "감성", "도보 동선"], stationAccess: "나카스카와바타역 도보 약 1분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/the-lively-fukuoka-hakata/" },
        { name: "미쓰이 가든 호텔 후쿠오카 나카스", tag: "나카스 중심", location: "나카스 권역", reason: "맛집과 야경 동선을 짧게 잡고 싶은 커플·친구 여행에 비교하기 좋습니다.", meta: ["나카스", "맛집", "커플"], stationAccess: "나카스카와바타역 도보 약 2분", airportAccess: "공항역 지하철 약 9분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/mitsui-garden-hotel-fukuoka-nakasu/" },
        { name: "호텔 리솔 트리니티 하카타", tag: "번화가 접근", location: "나카스카와바타 주변", reason: "나카스 접근성과 대중교통 동선을 함께 보고 싶은 경우 후보로 넣기 좋습니다.", meta: ["역세권", "저녁 산책", "실속"], stationAccess: "나카스카와바타역 도보 약 1분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-resol-trinity-hakata/" },
        { name: "호텔 비스타 후쿠오카 나카스카와바타", tag: "카와바타 도보권", location: "카와바타 상점가 주변", reason: "나카스와 카와바타 상점가를 함께 이용하고 싶은 여행자에게 잘 맞습니다.", meta: ["카와바타", "상점가", "도보"], stationAccess: "나카스카와바타역 도보 약 3분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/hotel-vista-fukuoka-nakasu-kawabata/" },
        { name: "후쿠오카 플로럴 인 니시나카스", tag: "니시나카스 실속형", location: "나카스·텐진 사이", reason: "나카스와 텐진 남쪽을 함께 걸어 다니고 싶은 일정에서 비교할 만합니다.", meta: ["니시나카스", "가성비", "저녁 산책"], stationAccess: "나카스카와바타역 도보 약 6분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/fukuoka-floral-inn-nishinakasu/" }
      ]
    },
    gion: {
      name: "기온",
      destinationLabel: areaDestinationLabels.gion,
      regionSlug: "기온",
      regionSlugAliases: ["gion"],
      label: "하카타와 나카스 사이에서 균형을 잡기 좋은 차분한 위치",
      summary: "하카타의 편리함과 나카스의 분위기 사이에서 너무 번잡하지 않게 머물며, 오래된 골목과 도심 산책을 천천히 이어가고 싶은 당신에게 잘 맞는 차분한 위치입니다.",
      leadTitle: "첫 여행과 재방문 모두에 무난한 균형형 위치입니다.",
      leadText: "기온은 하카타역과 나카스 사이에 있어 어느 한쪽으로 치우치지 않습니다. 숙소 주변은 비교적 차분하면서도 주요 동선으로 이동하기 쉬워 실속형 선택지로 좋습니다.",
      stayRange: [
        "기온역 또는 구시다신사마에역 도보 10분 이내",
        "하카타역과 나카스를 모두 오갈 계획이면 기온역 주변",
        "캐널시티 접근성을 원한다면 구시다신사·기온 남쪽 동선 확인"
      ],
      avoidRange: [
        "하카타역만 계속 이용한다면 기온 안쪽 저가 숙소는 동선을 다시 확인하세요.",
        "나카스 야경과 저녁 식사가 핵심이라면 실제 도보 시간을 먼저 확인하세요.",
        "역 출구와 호텔 사이 길 찾기 정보를 미리 확인하세요."
      ],
      bestFor: ["균형형 위치", "첫 여행", "캐널시티", "가성비", "차분한 도심"],
      notFor: ["쇼핑을 텐진에만 집중하는 일정", "해변·공원 중심 여행", "숙소 주변 번화함이 중요한 여행"],
      bookingTips: [
        "하카타역, 기온역, 구시다신사마에역 중 실제로 어떤 역을 쓸지 먼저 정하세요.",
        "기온은 조용함과 접근성의 균형이 장점이라 가격만 보고 너무 안쪽을 고르지 않는 편이 좋습니다.",
        "캐널시티와 나카스까지 걸을 계획이면 저녁 귀갓길도 함께 확인하세요."
      ],
      chips: ["균형형", "기온역", "캐널시티", "가성비", "차분함"],
      compareGood: "하카타와 나카스 사이에서 이동 균형을 잡기 좋아 호텔 선택 실패 확률을 낮추기 좋습니다.",
      compareCaution: "텐진 쇼핑이나 오호리·모모치 일정이 중심이면 매번 이동이 필요할 수 있습니다.",
      mismatchNote: "텐진 쇼핑이나 오호리·모모치 휴식이 더 중요하다면 기온은 중간 지점으로 보는 편이 좋습니다.",
      hotels: [
        { name: "다이와 로이넷 호텔 하카타 기온", tag: "기온역 중심", location: "기온 권역", reason: "하카타와 나카스 사이에서 실속 있는 역세권 숙소를 찾을 때 비교하기 좋습니다.", meta: ["기온역", "균형형", "가성비"], stationAccess: "기온역 도보 약 1분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/daiwa-roynet-hotel-hakata-gion/" },
        { name: "도미 인 하카타 기온", tag: "휴식형 실속", location: "기온 권역", reason: "도심 접근성과 숙소 내 휴식 요소를 함께 보고 싶은 여행자에게 어울립니다.", meta: ["기온", "대욕장", "실속"], stationAccess: "기온역 도보 약 2분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/dormy-inn-hakata-gion/" },
        { name: "호텔 토리피토 하카타 기온", tag: "깔끔한 도심형", location: "기온·구시다신사 주변", reason: "기온에서 깔끔한 객실과 주요 명소 접근성을 함께 보고 싶을 때 후보가 됩니다.", meta: ["기온", "깔끔함", "도보"], stationAccess: "기온역 도보 약 5분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/hotel-torifito-hakata-gion/" },
        { name: "더 로열 파크 호텔 후쿠오카", tag: "하카타·기온 사이", location: "하카타·기온 권역", reason: "하카타역과 기온 생활권을 함께 활용하고 싶은 일정에 비교할 만합니다.", meta: ["하카타", "기온", "안정형"], stationAccess: "하카타역 도보 약 5분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/the-royal-park-hotel-fukuoka/" },
        { name: "9호텔 하카타", tag: "감성 실속형", location: "기온·구시다신사 주변", reason: "카와바타와 기온 사이의 차분한 도보 동선을 원하는 여행자에게 어울립니다.", meta: ["기온", "감성", "실속"], stationAccess: "구시다신사마에역 도보 약 3분", airportAccess: "공항역 지하철 약 8분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/9-hotel-hakata/" }
      ]
    },
    yakuinWatanabedori: {
      name: "야쿠인 & 와타나베도리",
      destinationLabel: areaDestinationLabels.yakuinWatanabedori,
      regionSlug: "야쿠인-와타나베도리",
      regionSlugAliases: ["yakuin-watanabedori", "yakuin-watanabe-dori", "야쿠인와타나베도리", "야쿠인-와타나베-도리"],
      label: "조용한 도심 분위기와 가격 균형을 잡기 좋은 위치",
      summary: "텐진의 접근성은 유지하되 조금 더 조용한 카페 거리와 로컬한 분위기 속에서 후쿠오카를 느긋하게 즐기고 싶은 당신에게 잘 어울리는 동네입니다.",
      leadTitle: "번화가 바로 앞보다 한 박자 여유로운 도심 숙소를 찾기 좋습니다.",
      leadText: "야쿠인과 와타나베도리 주변은 텐진·나카스 접근성이 있으면서도 숙박 분위기가 비교적 차분합니다. 재방문 여행자나 숙소비와 분위기를 함께 보는 여행자에게 잘 맞습니다.",
      stayRange: [
        "야쿠인역, 와타나베도리역, 텐진미나미역 도보 10분 이내",
        "텐진 쇼핑까지 걸을 계획이면 와타나베도리 북쪽 동선 확인",
        "조용한 숙박을 원하면 큰 도로 바로 앞보다 한 블록 안쪽"
      ],
      avoidRange: [
        "첫 여행에서 하카타역·나카스만 주로 다닌다면 가격만 보고 고르지 않는 편이 좋습니다.",
        "아이 동반이라면 역과 호텔 사이 보행 동선을 먼저 확인하세요.",
        "저녁 이후 이동이 많다면 텐진·나카스까지의 실제 도보 시간을 확인하세요."
      ],
      bestFor: ["가성비", "차분한 도심", "재방문", "커플 여행", "텐진 접근"],
      notFor: ["하카타역 중심 근교 이동", "나카스 야경·맛집 중심 여행", "오호리·모모치 중심 가족 여행"],
      bookingTips: [
        "야쿠인과 와타나베도리는 텐진과 가깝지만 역 동선이 다르므로 자주 이동할 방향을 먼저 정하세요.",
        "가격이 저렴해 보여도 지하철역까지의 실제 도보 시간을 꼭 확인하세요.",
        "조용함을 원한다면 대로변 소음과 객실 방음 후기를 함께 보세요."
      ],
      chips: ["가성비", "차분함", "텐진 접근", "재방문", "커플"],
      compareGood: "중심가 접근성을 유지하면서 숙소비와 분위기의 균형을 잡기 좋습니다.",
      compareCaution: "하카타역과 나카스만 계속 오가는 첫 여행이면 이동이 애매하게 느껴질 수 있습니다.",
      mismatchNote: "공항 이동, 근교 이동, 야경·맛집 접근성이 더 중요하다면 야쿠인 & 와타나베도리는 실제 이동 시간을 한 번 더 확인하는 편이 좋습니다.",
      hotels: [
        { name: "호텔 몬토레 후쿠오카", tag: "와타나베도리 중심", location: "와타나베도리 권역", reason: "텐진 접근성과 차분한 도심 숙박을 함께 보고 싶은 여행자에게 잘 맞습니다.", meta: ["와타나베도리", "도심", "커플"], stationAccess: "와타나베도리역 도보 약 2분", airportAccess: "공항역 환승 약 15분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/hotel-monterey-fukuoka/" },
        { name: "호텔 몬테 에르마나 후쿠오카", tag: "실속 도심형", location: "와타나베도리 주변", reason: "숙소비와 위치 균형을 함께 보고 싶은 여행자에게 비교하기 좋은 후보입니다.", meta: ["가성비", "와타나베도리", "차분함"], stationAccess: "와타나베도리역 도보 약 2분", airportAccess: "공항역 환승 약 15분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/hotel-monte-hermana-fukuoka/" },
        { name: "퀸테사 호텔 후쿠오카 텐진 미나미", tag: "야쿠인 접근", location: "야쿠인·텐진미나미 권역", reason: "야쿠인 생활권과 텐진 남쪽 동선을 함께 활용하기 좋습니다.", meta: ["야쿠인", "실속", "도보"], stationAccess: "야쿠인역 도보 약 3분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/quintessa-hotel-fukuoka-tenjin-minami/" },
        { name: "크로스 라이프 하카타 텐진", tag: "도심 감성형", location: "하루요시·와타나베도리 주변", reason: "텐진과 나카스 사이에서 감성적인 도심 숙박을 원하는 경우 비교할 만합니다.", meta: ["감성", "텐진 접근", "커플"], stationAccess: "와타나베도리역 도보 약 4분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/cross-life-hakata-tenjin/" },
        { name: "라이프 텐진 후쿠오카", tag: "재방문 감성형", location: "텐진·야쿠인 사이", reason: "혼자 또는 커플 여행에서 가볍고 트렌디한 숙박 분위기를 원할 때 어울립니다.", meta: ["감성 숙소", "재방문", "도심"], stationAccess: "텐진미나미역 도보 약 5분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/lyf-tenjin-fukuoka/" }
      ]
    },
    ohoriMomochi: {
      name: "오호리 & 모모치",
      destinationLabel: areaDestinationLabels.ohoriMomochi,
      regionSlug: "오호리모모치",
      regionSlugAliases: ["ohori-momochi", "오호리-모모치", "오호리 & 모모치"],
      label: "공원과 해변, 가족 여행의 여유를 만들기 좋은 위치",
      summary: "도심의 빠른 흐름에서 잠시 벗어나 공원 산책과 바다 풍경을 일정 안에 담고, 후쿠오카를 조금 더 느리게 즐기고 싶은 당신에게 잘 맞는 곳입니다.",
      leadTitle: "도심 번화가보다 느린 일정과 휴식감이 강한 위치입니다.",
      leadText: "오호리공원 산책, 모모치 해변, 후쿠오카타워, 돔 주변 일정이 핵심이라면 도심을 매번 오가는 피로를 줄일 수 있습니다. 아이 동반 가족이나 여유로운 여행자에게 특히 좋습니다.",
      stayRange: [
        "오호리공원역, 도진마치역, 니시진역 도보권",
        "모모치 해변과 후쿠오카타워 중심이면 시사이드모모치 접근성 확인",
        "가족 여행이면 호텔 주변 식당·편의점·세탁 시설 확인"
      ],
      avoidRange: [
        "첫 후쿠오카 여행에서 하카타·텐진·나카스를 촘촘히 볼 계획",
        "저녁 이후 나카스와 텐진에 오래 머무는 일정",
        "근교 이동이 많다면 하카타역까지의 접근 시간을 먼저 계산하세요."
      ],
      bestFor: ["가족여행", "아이 동반", "오호리공원", "모모치 해변", "여유로운 일정"],
      notFor: ["대표 명소를 짧게 많이 보는 첫 여행", "맛집·쇼핑 중심 여행", "공항·근교 중심 일정"],
      bookingTips: [
        "오호리와 모모치는 같은 서쪽 권역이어도 체감 동선이 다르므로 방문지를 먼저 정하세요.",
        "시내 관광일이 많다면 하카타·텐진까지의 왕복 시간을 일정표에 넣어보세요.",
        "아이와 함께라면 객실 크기, 조식, 편의점 접근성을 함께 비교하세요."
      ],
      chips: ["가족여행", "오호리공원", "모모치", "해변", "여유"],
      compareGood: "도심보다 여유롭고 공원·해변 중심의 하루 흐름을 만들기 좋습니다.",
      compareCaution: "하카타·텐진·나카스 중심 일정이 많다면 이동 시간이 길어질 수 있습니다.",
      mismatchNote: "맛집, 쇼핑, 공항 이동이 더 중요하다면 오호리 & 모모치는 일정의 중심에서 조금 멀게 느껴질 수 있습니다.",
      hotels: [
        { name: "힐튼 후쿠오카 씨호크", tag: "모모치 대표형", location: "모모치·페이페이돔 주변", reason: "모모치 해변과 돔 주변 일정, 가족 여행을 함께 고려할 때 대표 후보가 됩니다.", meta: ["모모치", "가족", "전망"], stationAccess: "도진마치역 도보 약 19분", airportAccess: "공항역 지하철 약 18분", starRating: "5성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hilton-fukuoka-sea-hawk/" },
        { name: "더 레지덴셜 스위트 후쿠오카", tag: "가족형 객실", location: "모모치·니시진 권역", reason: "객실 여유와 가족형 숙박을 우선하는 경우 비교하기 좋습니다.", meta: ["가족", "객실 여유", "모모치"], stationAccess: "니시진역 도보 약 10분", airportAccess: "공항역 지하철 약 15분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/the-residential-suites-fukuoka/" },
        { name: "시사이드 호텔 트윈스 모모치", tag: "모모치 실속형", location: "시사이드모모치 주변", reason: "모모치 해변과 후쿠오카타워 접근성을 우선 보고 싶은 여행자에게 어울립니다.", meta: ["모모치", "해변", "실속"], url: "/post/seaside-hotel-twins-momochi/" },
        { name: "원스 호텔 후쿠오카", tag: "오호리 접근", location: "오호리공원·도진마치 주변", reason: "오호리공원 산책과 도심 접근의 균형을 함께 보고 싶을 때 후보가 됩니다.", meta: ["오호리", "산책", "차분함"], stationAccess: "오호리공원역 도보 약 6분", airportAccess: "공항역 지하철 약 15분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/ones-hotel-fukuoka/" },
        { name: "호텔 뉴 가이아 돔마에", tag: "돔 주변 실속형", location: "도진마치·페이페이돔 주변", reason: "돔 일정이나 모모치 서쪽 권역을 중심으로 움직이는 여행자에게 비교할 만합니다.", meta: ["돔", "모모치", "실속"], url: "/post/hotel-new-gaea-domemae/" }
      ]
    }
  },
  questions: [
    {
          title: "이번 후쿠오카 여행은 몇 번째인가요?",
          help: "첫 여행일수록 이동이 단순하고 대표 동선 접근성이 좋은 위치가 유리합니다.",
          options: [
            { title: "첫 여행", desc: "대표 명소와 맛집 동선을 쉽게 잡고 싶어요.", scores: { hakata: 4, nakasuKawabata: 4, tenjin: 2, gion: 3 } },
            { title: "재방문", desc: "너무 뻔한 중심지만 고집하지 않아도 괜찮아요.", scores: { tenjin: 4, yakuinWatanabedori: 4, gion: 2, hakata: 1 } },
            { title: "후쿠오카가 익숙해요", desc: "중심가만 고집하지 않고 조용한 지역도 괜찮아요.", scores: { yakuinWatanabedori: 5, ohoriMomochi: 3, tenjin: 2, gion: 1 } }
          ]
        },
    {
          title: "이번 여행 동행자는 누구인가요?",
          help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
          options: [
            { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { hakata: 4, tenjin: 2, gion: 3 } },
            { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 보고 싶어요.", scores: { tenjin: 4, nakasuKawabata: 3, yakuinWatanabedori: 3, gion: 1 } },
            { title: "친구 여행", desc: "저녁에도 활기 있고 먹거리가 가까운 곳이 좋아요.", scores: { nakasuKawabata: 5, tenjin: 3, hakata: 1 } },
            { title: "가족·아이", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { ohoriMomochi: 6, hakata: 2, gion: 1 } },
            { title: "부모님 동반", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { hakata: 4, gion: 4, ohoriMomochi: 2 } }
          ]
        },
    {
          title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
          help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
          options: [
            { title: "맛집·야경", desc: "저녁에도 걸어서 다니기 좋은 곳이 좋아요.", scores: { nakasuKawabata: 7, tenjin: 2, hakata: 1 } },
            { title: "쇼핑", desc: "쇼핑몰, 상점가, 백화점 접근성이 중요해요.", scores: { tenjin: 6, hakata: 1, nakasuKawabata: 1, yakuinWatanabedori: 2 } },
            { title: "교통 편의", desc: "공항 이동과 근교 이동을 편하게 하고 싶어요.", scores: { hakata: 5, gion: 4, tenjin: 1 } },
            { title: "공원·여유", desc: "공원 산책이나 여유로운 일정을 넣고 싶어요.", scores: { ohoriMomochi: 6, hakata: 2, yakuinWatanabedori: 1, gion: 1 } }
          ]
        },
    {
          title: "공항 이동은 얼마나 중요한가요?",
          help: "후쿠오카공항 이동을 중요하게 보면 하카타 쪽이 가장 편하게 느껴질 수 있습니다.",
          options: [
            { title: "매우 중요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { hakata: 5, gion: 3, tenjin: 1 } },
            { title: "보통", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { hakata: 3, gion: 3, tenjin: 2 } },
            { title: "크게 중요하지 않음", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { tenjin: 2, nakasuKawabata: 2, ohoriMomochi: 2, yakuinWatanabedori: 1 } }
          ]
        },
    {
          title: "오호리공원·모모치 해변 일정이 있나요?",
          help: "오호리공원, 모모치 해변, 후쿠오카타워가 핵심이면 숙소 위치 선택이 달라집니다.",
          options: [
            { title: "오호리·모모치 핵심", desc: "공원·해변 이동과 휴식 시간을 여유롭게 잡고 싶어요.", scores: { ohoriMomochi: 8 } },
            { title: "하루 방문", desc: "오호리·모모치도 가지만 시내 관광도 중요해요.", scores: { ohoriMomochi: 3, tenjin: 2, hakata: 2 } },
            { title: "방문 없음", desc: "시내 관광, 맛집, 쇼핑 중심으로 움직일 예정이에요.", scores: { hakata: 2, tenjin: 3, nakasuKawabata: 2, gion: 1 } }
          ]
        },
    {
          title: "후쿠오카 근교 여행 계획이 있나요?",
          help: "다자이후, 이토시마, 기타큐슈처럼 다른 지역을 함께 다녀올 예정이라면 숙소 위치 기준이 달라집니다.",
          options: [
            { title: "근교 2일 이상", desc: "후쿠오카 시내와 근교를 함께 다녀오고 싶어요.", scores: { hakata: 6, gion: 3, tenjin: 1 } },
            { title: "근교 하루", desc: "시내 관광도 중요하지만 하루쯤은 다른 지역도 보고 싶어요.", scores: { hakata: 3, tenjin: 2, gion: 3 } },
            { title: "시내 중심", desc: "나카스, 하카타, 텐진처럼 시내 동선을 더 중요하게 봐요.", scores: { nakasuKawabata: 5, tenjin: 3, hakata: 1, gion: 2 } },
            { title: "미정", desc: "일정이 바뀔 수 있어서 이동 선택지가 많은 곳이면 좋아요.", scores: { hakata: 3, tenjin: 2, gion: 3 } }
          ]
        },
    {
          title: "숙소 주변 분위기는 어떤 쪽이 좋나요?",
          help: "같은 후쿠오카여도 지역마다 저녁 이후 분위기와 체감 소음이 다릅니다.",
          options: [
            { title: "번화가", desc: "저녁에도 볼거리와 먹거리가 가까웠으면 해요.", scores: { nakasuKawabata: 7, tenjin: 3 } },
            { title: "깔끔한 도심", desc: "백화점, 쇼핑몰, 역세권 분위기를 선호해요.", scores: { tenjin: 5, hakata: 2, gion: 2, yakuinWatanabedori: 1 } },
            { title: "차분한 숙소", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { yakuinWatanabedori: 6, gion: 3, ohoriMomochi: 2 } },
            { title: "가족형 분위기", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { ohoriMomochi: 5, hakata: 2, gion: 1 } }
          ]
        },
    {
          title: "숙소 예산은 어떤 편인가요?",
          help: "위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
          options: [
            { title: "예산 절약", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { yakuinWatanabedori: 6, gion: 3, ohoriMomochi: 2 } },
            { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { gion: 5, yakuinWatanabedori: 4, tenjin: 3, hakata: 1 } },
            { title: "위치 우선", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { hakata: 4, nakasuKawabata: 4, tenjin: 3 } }
          ]
        }
  ]
};
