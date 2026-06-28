
const areaResultBadges = {
  hakata: "공항과 근교 길이 편안해지는",
  tenjin: "쇼핑과 맛집 사이를 가볍게 걷는",
  nakasuKawabata: "강변 야경과 맛집이 가까운",
  gion: "하카타와 나카스를 차분히 잇는",
  yakuinWatanabedori: "카페 골목의 여유가 머무는",
  ohoriMomochi: "공원 산책과 바다 쉼이 가까운"
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
      summary: "공항 이동, 하카타역, 근교 당일치기를 함께 고려하면 하카타가 가장 안정적입니다.",
      leadTitle: "첫 여행자와 짧은 일정 여행자에게 실패 확률이 낮은 위치입니다.",
      leadText: "하카타역을 중심으로 공항, 텐진, 기온, 나카스까지 연결하기 쉽습니다. 2박 3일처럼 시간이 짧거나 부모님과 함께 움직이는 일정이라면 이동 피로를 줄이기 좋습니다.",
      stayRange: [
        "JR 하카타역 또는 지하철 하카타역 도보 10분 이내",
        "공항 이동을 중시한다면 하카타역 동쪽·서쪽 출구 접근성 확인",
        "근교 당일치기가 있다면 JR·버스터미널 이동이 쉬운 위치"
      ],
      avoidRange: [
        "나카스 밤거리만 핵심인데 하카타역 뒤쪽에만 고정하는 선택",
        "역과 가깝지만 캐리어 이동 동선이 복잡한 골목 안쪽 숙소",
        "객실 크기를 중요하게 보는데 초소형 비즈니스 호텔만 보는 선택"
      ],
      bestFor: ["첫 후쿠오카 여행", "짧은 2박 3일", "공항 이동", "근교 당일치기", "부모님 동반"],
      notFor: ["밤마다 나카스 중심으로 오래 머무는 여행", "쇼핑만 텐진에 집중된 일정", "해변·공원 중심의 느린 여행"],
      bookingTips: [
        "하카타역 도보 시간만 보지 말고 실제 이용할 출구와의 거리를 확인하세요.",
        "아침 비행기나 늦은 도착이면 공항선 이동이 단순한 호텔을 우선 비교하세요.",
        "근교 이동이 많다면 조식 시간보다 역 접근성과 캐리어 보관 후기를 먼저 보세요."
      ],
      chips: ["첫 여행", "공항 이동", "JR", "근교 이동", "부모님 동반"],
      compareGood: "공항과 JR, 버스 이동을 한 번에 잡기 좋아 일정이 바뀌어도 대응하기 쉽습니다.",
      compareCaution: "숙소 주변의 여행 분위기는 나카스나 텐진보다 덜 화려하게 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 밤거리, 쇼핑, 해변 산책을 더 중요하게 골랐다면 하카타는 1순위보다 안정적인 대안에 가깝습니다.",
      hotels: [
        { name: "미야코 호텔 하카타", tag: "하카타역 최단 동선", location: "하카타 권역", reason: "하카타역 접근성과 객실 여유를 함께 보고 싶은 여행자에게 비교 가치가 높은 숙소입니다.", meta: ["하카타역", "공항 이동", "부모님 동반"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "5성급", guestRating: "★ 4.7", freeCancel: "무료 취소 확인", url: "/post/miyako-hotel-hakata" },
        { name: "오리엔탈 호텔 후쿠오카 하카타 스테이션", tag: "역세권 안정형", location: "하카타역 주변", reason: "공항선과 JR 이동을 단순하게 만들고 싶은 첫 여행자에게 보기 좋은 후보입니다.", meta: ["역세권", "첫 여행", "짧은 일정"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/oriental-hotel-fukuoka-hakata-station" },
        { name: "호텔 닛코 후쿠오카", tag: "클래식 도심형", location: "하카타 중심", reason: "하카타역 생활권에서 안정적인 서비스와 이동 편의성을 함께 기대할 수 있습니다.", meta: ["하카타", "교통", "안정형"], stationAccess: "하카타역 도보 약 3분", airportAccess: "공항역 지하철 약 5분", starRating: "5성급", guestRating: "★ 4.6", freeCancel: "무료 취소 확인", url: "/post/hotel-nikko-fukuoka" },
        { name: "JR 큐슈 호텔 블라섬 하카타 센트럴", tag: "실속 역세권", location: "하카타역 도보권", reason: "하카타역 주변에서 위치와 가격 균형을 함께 보고 싶은 여행자에게 적합합니다.", meta: ["가성비", "역세권", "교통"], stationAccess: "하카타역 도보 약 2분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/jr-kyushu-hotel-blossom-hakata-central" },
        { name: "호텔 포르자 하카타에키 치쿠시구치", tag: "짧은 일정 후보", location: "하카타역 치쿠시구치", reason: "공항 이동과 하카타역 출발 일정을 단순하게 만들고 싶은 경우 비교하기 좋습니다.", meta: ["공항선", "짧은 일정", "실속"], stationAccess: "하카타역 도보 약 1분", airportAccess: "공항역 지하철 약 5분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-forza-hakataeki-chikushi-guchi" }
      ]
    },
    tenjin: {
      name: "텐진",
      destinationLabel: areaDestinationLabels.tenjin,
      regionSlug: "텐진",
      regionSlugAliases: ["tenjin"],
      label: "쇼핑과 식사, 도심 분위기를 가장 쉽게 즐기기 좋은 위치",
      summary: "쇼핑, 카페, 식사 동선을 숙소 주변에서 해결하고 싶다면 텐진이 가장 자연스럽습니다.",
      leadTitle: "쇼핑과 맛집, 커플·친구 여행의 균형이 좋습니다.",
      leadText: "텐진은 후쿠오카의 대표 번화가라 낮에는 쇼핑, 저녁에는 식사 동선을 짧게 만들기 좋습니다. 하카타보다 여행 분위기가 또렷하고, 나카스보다 숙박 선택지가 넓습니다.",
      stayRange: [
        "텐진역, 니시테츠후쿠오카역, 아카사카역 도보 10분 이내",
        "쇼핑 중심이면 텐진 지하상가와 백화점 접근성 확인",
        "나카스까지 걸을 계획이라면 텐진 남쪽·하루요시 방향도 비교"
      ],
      avoidRange: [
        "공항 이동과 JR 근교 이동이 핵심인데 텐진에만 고정하는 선택",
        "조용한 휴식을 원하면서 번화가 한복판 저층 객실을 고르는 선택",
        "캐리어가 많은데 지하상가 이동이 복잡한 위치"
      ],
      bestFor: ["쇼핑 여행", "커플 여행", "친구 여행", "카페·맛집", "도심 선호"],
      notFor: ["JR 근교 이동이 많은 일정", "해변·공원 중심 가족 여행", "숙소 주변 조용함이 최우선인 여행"],
      bookingTips: [
        "텐진역과 니시테츠후쿠오카역은 동선이 다르므로 자주 탈 노선을 먼저 정하세요.",
        "나카스까지 걸을 계획이라면 밤길과 다리 이동 시간을 함께 확인하세요.",
        "쇼핑 일정이 많다면 호텔 주변 코인락커보다 체크인 전 짐 보관 가능 여부를 확인하세요."
      ],
      chips: ["쇼핑", "맛집", "커플", "친구 여행", "도심"],
      compareGood: "쇼핑과 식사 선택지가 많아 숙소 주변에서 여행 시간을 충분히 쓰기 좋습니다.",
      compareCaution: "하카타역 기반 근교 이동이나 이른 공항 이동은 하카타보다 한 번 더 계산해야 합니다.",
      mismatchNote: "이번 답변에서 공항 이동, 근교 여행, 부모님 동반을 더 많이 골랐다면 텐진보다 하카타가 더 편할 수 있습니다.",
      hotels: [
        { name: "솔라리아 니시테츠 호텔 후쿠오카", tag: "텐진 중심", location: "텐진 권역", reason: "쇼핑과 식사, 니시테츠 이동을 한 번에 잡고 싶은 여행자에게 잘 맞는 후보입니다.", meta: ["쇼핑", "텐진역", "커플"], stationAccess: "텐진역 도보 약 3분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.6", freeCancel: "무료 취소 확인", url: "/post/solaria-nishitetsu-hotel-fukuoka" },
        { name: "리치몬드 호텔 텐진 니시도리", tag: "쇼핑 도보권", location: "텐진 니시도리", reason: "텐진 쇼핑 거리와 카페 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["니시도리", "쇼핑", "도보 동선"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/richmond-hotel-tenjin-nishidori" },
        { name: "호텔 몬토레 라 수르 후쿠오카", tag: "깔끔한 도심형", location: "텐진·아카사카 사이", reason: "텐진 접근성과 비교적 정돈된 숙박 분위기를 함께 보고 싶은 경우 좋습니다.", meta: ["텐진", "깔끔함", "커플"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-monterey-la-soeur-fukuoka" },
        { name: "니시테츠 그랜드 호텔", tag: "클래식 텐진", location: "텐진 중심", reason: "텐진 생활권을 중심으로 안정적인 숙박을 원하는 여행자에게 비교 후보가 됩니다.", meta: ["텐진", "안정형", "쇼핑"], stationAccess: "텐진역 도보 약 5분", airportAccess: "공항역 지하철 약 11분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/nishitetsu-grand-hotel" },
        { name: "램프 라이트 북스 호텔 후쿠오카", tag: "감성형 후보", location: "텐진·아카사카 권역", reason: "쇼핑·카페, 가벼운 도심 산책을 함께 즐기고 싶은 여행자에게 어울립니다.", meta: ["감성 숙소", "카페", "도심"], stationAccess: "텐진역 도보 약 8분", airportAccess: "공항역 지하철 약 11분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/lamplight-books-hotel-fukuoka" }
      ]
    },
    nakasuKawabata: {
      name: "나카스 & 카와바타",
      destinationLabel: areaDestinationLabels.nakasuKawabata,
      regionSlug: "나카스카와바타",
      regionSlugAliases: ["nakasu-kawabata", "나카스-카와바타", "나카스 & 카와바타"],
      label: "야경과 맛집, 도보 중심 밤 동선에 강한 위치",
      summary: "저녁 식사, 포장마차, 강변 야경, 캐널시티 동선이 중요하다면 나카스 & 카와바타가 잘 맞습니다.",
      leadTitle: "밤에도 숙소로 돌아오는 길이 짧은 위치입니다.",
      leadText: "나카스 강변, 카와바타 상점가, 캐널시티, 텐진 남쪽까지 걸어서 연결하기 좋습니다. 친구 여행이나 맛집 중심 일정에서 체감 만족도가 높습니다.",
      stayRange: [
        "나카스카와바타역 도보 10분 이내",
        "나카스 야경을 원한다면 강변 접근성 확인",
        "소음이 걱정된다면 번화가 바로 앞보다 한 블록 떨어진 위치"
      ],
      avoidRange: [
        "밤 소음에 예민한데 나카스 중심 저층 객실을 고르는 선택",
        "아이 동반 가족여행인데 주변 밤 분위기를 확인하지 않는 선택",
        "근교 이동이 많은데 나카스 도보권만 보고 고르는 선택"
      ],
      bestFor: ["맛집 여행", "밤 동선", "친구 여행", "커플 여행", "캐널시티 접근"],
      notFor: ["조용한 숙소가 최우선인 여행", "부모님 동반의 편안한 일정", "근교 이동이 많은 여행"],
      bookingTips: [
        "나카스 접근성과 소음은 함께 확인해야 합니다. 최근 후기에서 밤 소음 언급을 꼭 보세요.",
        "카와바타 쪽은 나카스와 가깝지만 체감 분위기가 조금 더 차분할 수 있습니다.",
        "야식과 늦은 귀가가 많다면 호텔 입구 주변 분위기와 편의점 접근성도 확인하세요."
      ],
      chips: ["맛집", "야경", "포장마차", "캐널시티", "친구 여행"],
      compareGood: "저녁 이후 동선이 짧아 식사와 야경을 즐긴 뒤 숙소로 돌아오기 편합니다.",
      compareCaution: "번화가에 가까울수록 소음과 주변 분위기 호불호가 생길 수 있습니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 여유, 공항 이동을 더 중요하게 골랐다면 나카스 & 카와바타는 주의해서 비교해야 합니다.",
      hotels: [
        { name: "더 라이블리 후쿠오카 하카타", tag: "나카스 감성형", location: "나카스 & 카와바타 권역", reason: "나카스와 카와바타를 중심으로 도보 여행을 즐기고 싶은 여행자에게 어울립니다.", meta: ["나카스", "감성", "도보 동선"], stationAccess: "나카스카와바타역 도보 약 1분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/the-lively-fukuoka-hakata" },
        { name: "미쓰이 가든 호텔 후쿠오카 나카스", tag: "나카스 중심", location: "나카스 권역", reason: "맛집과 야경 동선을 짧게 잡고 싶은 커플·친구 여행에 비교하기 좋습니다.", meta: ["나카스", "맛집", "커플"], stationAccess: "나카스카와바타역 도보 약 2분", airportAccess: "공항역 지하철 약 9분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/mitsui-garden-hotel-fukuoka-nakasu" },
        { name: "호텔 리솔 트리니티 하카타", tag: "번화가 접근", location: "나카스카와바타 주변", reason: "나카스 접근성과 대중교통 동선을 함께 보고 싶은 경우 후보로 넣기 좋습니다.", meta: ["역세권", "밤 동선", "실속"], stationAccess: "나카스카와바타역 도보 약 1분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hotel-resol-trinity-hakata" },
        { name: "호텔 비스타 후쿠오카 나카스카와바타", tag: "카와바타 도보권", location: "카와바타 상점가 주변", reason: "나카스와 카와바타 상점가를 함께 이용하고 싶은 여행자에게 잘 맞습니다.", meta: ["카와바타", "상점가", "도보"], stationAccess: "나카스카와바타역 도보 약 3분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/hotel-vista-fukuoka-nakasu-kawabata" },
        { name: "후쿠오카 플로럴 인 니시나카스", tag: "니시나카스 실속형", location: "나카스·텐진 사이", reason: "나카스와 텐진 남쪽을 함께 걸어 다니고 싶은 일정에서 비교할 만합니다.", meta: ["니시나카스", "가성비", "밤 동선"], stationAccess: "나카스카와바타역 도보 약 6분", airportAccess: "공항역 지하철 약 9분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/fukuoka-floral-inn-nishinakasu" }
      ]
    },
    gion: {
      name: "기온",
      destinationLabel: areaDestinationLabels.gion,
      regionSlug: "기온",
      regionSlugAliases: ["gion"],
      label: "하카타와 나카스 사이에서 균형을 잡기 좋은 차분한 위치",
      summary: "하카타와 나카스 사이에서 이동 균형을 잡고 싶다면 기온이 좋은 중간 지점입니다.",
      leadTitle: "첫 여행과 재방문 모두에 무난한 균형형 위치입니다.",
      leadText: "기온은 하카타역과 나카스 사이에 있어 어느 한쪽으로 치우치지 않습니다. 숙소 주변은 비교적 차분하면서도 주요 동선으로 이동하기 쉬워 실속형 선택지로 좋습니다.",
      stayRange: [
        "기온역 또는 구시다신사마에역 도보 10분 이내",
        "하카타역과 나카스를 모두 오갈 계획이면 기온역 주변",
        "캐널시티 접근성을 원한다면 구시다신사·기온 남쪽 동선 확인"
      ],
      avoidRange: [
        "하카타역만 계속 이용하는데 기온 안쪽 저가 숙소만 보는 선택",
        "나카스 밤 동선이 핵심인데 실제 도보 시간을 확인하지 않는 선택",
        "역 출구와 호텔 사이 길 찾기 정보를 확인하지 않는 선택"
      ],
      bestFor: ["균형형 위치", "첫 여행", "캐널시티", "가성비", "차분한 도심"],
      notFor: ["쇼핑을 텐진에만 집중하는 일정", "해변·공원 중심 여행", "숙소 주변 번화함이 중요한 여행"],
      bookingTips: [
        "하카타역, 기온역, 구시다신사마에역 중 실제로 어떤 역을 쓸지 먼저 정하세요.",
        "기온은 조용함과 접근성의 균형이 장점이라 가격만 보고 너무 안쪽을 고르지 않는 편이 좋습니다.",
        "캐널시티와 나카스까지 걸을 계획이면 밤길 동선도 함께 확인하세요."
      ],
      chips: ["균형형", "기온역", "캐널시티", "가성비", "차분함"],
      compareGood: "하카타와 나카스 사이에서 이동 균형을 잡기 좋아 호텔 선택 실패 확률을 낮추기 좋습니다.",
      compareCaution: "텐진 쇼핑이나 오호리·모모치 일정이 중심이면 매번 이동이 필요할 수 있습니다.",
      mismatchNote: "이번 답변에서 텐진 쇼핑이나 오호리·모모치 휴식을 강하게 골랐다면 기온은 중간 대안으로 보는 편이 좋습니다.",
      hotels: [
        { name: "다이와 로이넷 호텔 하카타 기온", tag: "기온역 중심", location: "기온 권역", reason: "하카타와 나카스 사이에서 실속 있는 역세권 숙소를 찾을 때 비교하기 좋습니다.", meta: ["기온역", "균형형", "가성비"], stationAccess: "기온역 도보 약 1분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/daiwa-roynet-hotel-hakata-gion" },
        { name: "도미 인 하카타 기온", tag: "휴식형 실속", location: "기온 권역", reason: "도심 접근성과 숙소 내 휴식 요소를 함께 보고 싶은 여행자에게 어울립니다.", meta: ["기온", "대욕장", "실속"], stationAccess: "기온역 도보 약 2분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/dormy-inn-hakata-gion" },
        { name: "호텔 토리피토 하카타 기온", tag: "깔끔한 도심형", location: "기온·구시다신사 주변", reason: "기온에서 깔끔한 객실과 주요 명소 접근성을 함께 보고 싶을 때 후보가 됩니다.", meta: ["기온", "깔끔함", "도보"], stationAccess: "기온역 도보 약 5분", airportAccess: "공항역 지하철 약 7분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/hotel-torifito-hakata-gion" },
        { name: "더 로열 파크 호텔 후쿠오카", tag: "하카타·기온 사이", location: "하카타·기온 권역", reason: "하카타역과 기온 생활권을 함께 활용하고 싶은 일정에 비교할 만합니다.", meta: ["하카타", "기온", "안정형"], stationAccess: "하카타역 도보 약 5분", airportAccess: "공항역 지하철 약 5분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/the-royal-park-hotel-fukuoka" },
        { name: "9호텔 하카타", tag: "감성 실속형", location: "기온·구시다신사 주변", reason: "카와바타와 기온 사이의 차분한 도보 동선을 원하는 여행자에게 어울립니다.", meta: ["기온", "감성", "실속"], stationAccess: "구시다신사마에역 도보 약 3분", airportAccess: "공항역 지하철 약 8분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/9-hotel-hakata" }
      ]
    },
    yakuinWatanabedori: {
      name: "야쿠인 & 와타나베도리",
      destinationLabel: areaDestinationLabels.yakuinWatanabedori,
      regionSlug: "야쿠인-와타나베도리",
      regionSlugAliases: ["yakuin-watanabedori", "yakuin-watanabe-dori", "야쿠인와타나베도리", "야쿠인-와타나베-도리"],
      label: "조용한 도심 분위기와 가격 균형을 잡기 좋은 위치",
      summary: "텐진 접근성은 유지하면서 차분한 숙박 분위기와 실속을 원한다면 야쿠인 & 와타나베도리가 잘 맞습니다.",
      leadTitle: "번화가 바로 앞보다 한 박자 여유로운 도심 숙소를 찾기 좋습니다.",
      leadText: "야쿠인과 와타나베도리 주변은 텐진·나카스 접근성이 있으면서도 숙박 분위기가 비교적 차분합니다. 재방문 여행자나 숙소비와 분위기를 함께 보는 여행자에게 잘 맞습니다.",
      stayRange: [
        "야쿠인역, 와타나베도리역, 텐진미나미역 도보 10분 이내",
        "텐진 쇼핑까지 걸을 계획이면 와타나베도리 북쪽 동선 확인",
        "조용한 숙박을 원하면 큰 도로 바로 앞보다 한 블록 안쪽"
      ],
      avoidRange: [
        "첫 여행에서 하카타역·나카스만 주로 다니는데 가격만 보고 고르는 선택",
        "아이 동반인데 역과 호텔 사이 보행 동선을 확인하지 않는 선택",
        "늦은 밤 귀가가 많은데 텐진·나카스와의 실제 거리를 보지 않는 선택"
      ],
      bestFor: ["가성비", "차분한 도심", "재방문", "커플 여행", "텐진 접근"],
      notFor: ["하카타역 중심 근교 이동", "나카스 밤거리 중심 여행", "오호리·모모치 중심 가족 여행"],
      bookingTips: [
        "야쿠인과 와타나베도리는 텐진과 가깝지만 역 동선이 다르므로 자주 이동할 방향을 먼저 정하세요.",
        "가격이 저렴해 보여도 지하철역까지의 실제 도보 시간을 꼭 확인하세요.",
        "조용함을 원한다면 대로변 소음과 객실 방음 후기를 함께 보세요."
      ],
      chips: ["가성비", "차분함", "텐진 접근", "재방문", "커플"],
      compareGood: "중심가 접근성을 유지하면서 숙소비와 분위기의 균형을 잡기 좋습니다.",
      compareCaution: "하카타역과 나카스만 계속 오가는 첫 여행이면 이동이 애매하게 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 공항 이동, 근교 이동, 밤거리 최단 동선을 많이 골랐다면 야쿠인 & 와타나베도리는 2순위 후보입니다.",
      hotels: [
        { name: "호텔 몬토레 후쿠오카", tag: "와타나베도리 중심", location: "와타나베도리 권역", reason: "텐진 접근성과 차분한 도심 숙박을 함께 보고 싶은 여행자에게 잘 맞습니다.", meta: ["와타나베도리", "도심", "커플"], stationAccess: "와타나베도리역 도보 약 2분", airportAccess: "공항역 환승 약 15분", starRating: "4성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/hotel-monterey-fukuoka" },
        { name: "호텔 몬테 에르마나 후쿠오카", tag: "실속 도심형", location: "와타나베도리 주변", reason: "숙소비와 위치 균형을 함께 보고 싶은 여행자에게 비교하기 좋은 후보입니다.", meta: ["가성비", "와타나베도리", "차분함"], stationAccess: "와타나베도리역 도보 약 2분", airportAccess: "공항역 환승 약 15분", starRating: "4성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/hotel-monte-hermana-fukuoka" },
        { name: "퀸테사 호텔 후쿠오카 텐진 미나미", tag: "야쿠인 접근", location: "야쿠인·텐진미나미 권역", reason: "야쿠인 생활권과 텐진 남쪽 동선을 함께 활용하기 좋습니다.", meta: ["야쿠인", "실속", "도보"], stationAccess: "야쿠인역 도보 약 3분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/quintessa-hotel-fukuoka-tenjin-minami" },
        { name: "크로스 라이프 하카타 텐진", tag: "도심 감성형", location: "하루요시·와타나베도리 주변", reason: "텐진과 나카스 사이에서 감성적인 도심 숙박을 원하는 경우 비교할 만합니다.", meta: ["감성", "텐진 접근", "커플"], stationAccess: "와타나베도리역 도보 약 4분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.5", freeCancel: "무료 취소 확인", url: "/post/cross-life-hakata-tenjin" },
        { name: "라이프 텐진 후쿠오카", tag: "재방문 감성형", location: "텐진·야쿠인 사이", reason: "혼자 또는 커플 여행에서 가볍고 트렌디한 숙박 분위기를 원할 때 어울립니다.", meta: ["감성 숙소", "재방문", "도심"], stationAccess: "텐진미나미역 도보 약 5분", airportAccess: "공항역 환승 약 15분", starRating: "3성급", guestRating: "★ 4.4", freeCancel: "무료 취소 확인", url: "/post/lyf-tenjin-fukuoka" }
      ]
    },
    ohoriMomochi: {
      name: "오호리 & 모모치",
      destinationLabel: areaDestinationLabels.ohoriMomochi,
      regionSlug: "오호리모모치",
      regionSlugAliases: ["ohori-momochi", "오호리-모모치", "오호리 & 모모치"],
      label: "공원과 해변, 가족 여행의 여유를 만들기 좋은 위치",
      summary: "오호리공원, 모모치 해변, 후쿠오카타워를 여유롭게 넣는 일정이라면 오호리 & 모모치가 잘 맞습니다.",
      leadTitle: "도심 번화가보다 느린 일정과 휴식감이 강한 위치입니다.",
      leadText: "오호리공원 산책, 모모치 해변, 후쿠오카타워, 돔 주변 일정이 핵심이라면 도심을 매번 오가는 피로를 줄일 수 있습니다. 아이 동반 가족이나 여유로운 여행자에게 특히 좋습니다.",
      stayRange: [
        "오호리공원역, 도진마치역, 니시진역 도보권",
        "모모치 해변과 후쿠오카타워 중심이면 시사이드모모치 접근성 확인",
        "가족 여행이면 호텔 주변 식당·편의점·세탁 시설 확인"
      ],
      avoidRange: [
        "첫 후쿠오카 여행에서 하카타·텐진·나카스를 촘촘히 볼 계획",
        "밤 늦게 나카스와 텐진에서 오래 머무는 일정",
        "근교 이동이 많은데 하카타역 접근 시간을 계산하지 않는 선택"
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
      mismatchNote: "이번 답변에서 맛집, 쇼핑, 공항 이동을 강하게 골랐다면 오호리 & 모모치는 특수 목적형 후보에 가깝습니다.",
      hotels: [
        { name: "힐튼 후쿠오카 씨호크", tag: "모모치 대표형", location: "모모치·페이페이돔 주변", reason: "모모치 해변과 돔 주변 일정, 가족 여행을 함께 고려할 때 대표 후보가 됩니다.", meta: ["모모치", "가족", "전망"], stationAccess: "도진마치역 도보 약 19분", airportAccess: "공항역 지하철 약 18분", starRating: "5성급", guestRating: "★ 4.3", freeCancel: "무료 취소 확인", url: "/post/hilton-fukuoka-sea-hawk" },
        { name: "더 레지덴셜 스위트 후쿠오카", tag: "가족형 객실", location: "모모치·니시진 권역", reason: "객실 여유와 가족형 숙박을 우선하는 경우 비교하기 좋습니다.", meta: ["가족", "객실 여유", "모모치"], stationAccess: "니시진역 도보 약 10분", airportAccess: "공항역 지하철 약 15분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/the-residential-suites-fukuoka" },
        { name: "시사이드 호텔 트윈스 모모치", tag: "모모치 실속형", location: "시사이드모모치 주변", reason: "모모치 해변과 후쿠오카타워 접근성을 우선 보고 싶은 여행자에게 어울립니다.", meta: ["모모치", "해변", "실속"], url: "/post/seaside-hotel-twins-momochi" },
        { name: "원스 호텔 후쿠오카", tag: "오호리 접근", location: "오호리공원·도진마치 주변", reason: "오호리공원 산책과 도심 접근의 균형을 함께 보고 싶을 때 후보가 됩니다.", meta: ["오호리", "산책", "차분함"], stationAccess: "오호리공원역 도보 약 6분", airportAccess: "공항역 지하철 약 15분", starRating: "3성급", guestRating: "★ 4.2", freeCancel: "무료 취소 확인", url: "/post/ones-hotel-fukuoka" },
        { name: "호텔 뉴 가이아 돔마에", tag: "돔 주변 실속형", location: "도진마치·페이페이돔 주변", reason: "돔 일정이나 모모치 서쪽 권역을 중심으로 움직이는 여행자에게 비교할 만합니다.", meta: ["돔", "모모치", "실속"], url: "/post/hotel-new-gaea-domemae" }
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
            { title: "익숙한 여행", desc: "조금 더 실속 있거나 여유로운 지역도 좋아요.", scores: { yakuinWatanabedori: 5, ohoriMomochi: 3, tenjin: 2, gion: 1 } }
          ]
        },
    {
          title: "이번 여행 동행자는 누구인가요?",
          help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
          options: [
            { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { hakata: 4, tenjin: 2, gion: 3 } },
            { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 보고 싶어요.", scores: { tenjin: 4, nakasuKawabata: 3, yakuinWatanabedori: 3, gion: 1 } },
            { title: "친구 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { nakasuKawabata: 5, tenjin: 3, hakata: 1 } },
            { title: "가족·아이", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { ohoriMomochi: 6, hakata: 2, gion: 1 } },
            { title: "부모님 동반", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { hakata: 4, gion: 4, ohoriMomochi: 2 } }
          ]
        },
    {
          title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
          help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
          options: [
            { title: "맛집·밤거리", desc: "저녁에도 걸어서 다닐 수 있는 곳이 좋아요.", scores: { nakasuKawabata: 7, tenjin: 2, hakata: 1 } },
            { title: "쇼핑", desc: "쇼핑몰, 상점가, 백화점 접근성이 중요해요.", scores: { tenjin: 6, hakata: 1, nakasuKawabata: 1, yakuinWatanabedori: 2 } },
            { title: "교통 편의", desc: "공항 이동과 근교 이동을 편하게 하고 싶어요.", scores: { hakata: 5, gion: 4, tenjin: 1 } },
            { title: "아이 동반", desc: "이동 피로가 적고 동선이 단순했으면 좋겠어요.", scores: { ohoriMomochi: 6, hakata: 2, yakuinWatanabedori: 1, gion: 1 } }
          ]
        },
    {
          title: "공항 이동은 얼마나 중요한가요?",
          help: "후쿠오카공항 이동을 중요하게 보면 하카타 쪽이 강한 후보가 됩니다.",
          options: [
            { title: "매우 중요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { hakata: 5, gion: 3, tenjin: 1 } },
            { title: "보통", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { hakata: 3, gion: 3, tenjin: 2 } },
            { title: "중요 낮음", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { tenjin: 2, nakasuKawabata: 2, ohoriMomochi: 2, yakuinWatanabedori: 1 } }
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
          help: "같은 후쿠오카여도 지역마다 밤 분위기와 체감 소음이 다릅니다.",
          options: [
            { title: "번화가", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { nakasuKawabata: 7, tenjin: 3 } },
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
  const repeatTrip = answerIn(0, ["재방문", "익숙한 여행"]);
  const airportImportant = answerIs(3, "매우 중요");
  const airportNormal = answerIs(3, "보통");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·밤거리") || answerIs(6, "번화가");
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

  // 나카스 & 카와바타는 밤 일정·맛집·친구 여행일 때 텐진과 확실히 갈라지도록 보정합니다.
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
  if (family && answerIs(2, "아이 동반")) {
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
  const repeatTrip = answerIn(0, ["재방문", "익숙한 여행"]);
  const airportImportant = answerIs(3, "매우 중요");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·밤거리") || answerIs(6, "번화가");
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

  if (!posts.length) {
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

    link.href = slug ? `/post/${encodeURIComponent(slug)}` : "#";
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
    return `${withJosa(top.name, "은/는")} 가장 잘 맞는 후보지만 ${second.name}도 거의 비슷합니다. 두 지역의 호텔 가격, 객실 크기, 실제 이동 시간을 같이 비교하면 선택이 더 쉬워집니다.`;
  }
  if (gap <= 5) {
    return `${withJosa(top.name, "이/가")} 조금 더 유리합니다. 다만 일정의 중심이 ${second.name} 쪽에 더 가깝다면 ${second.name}도 충분히 좋은 대안입니다.`;
  }
  return `${withJosa(top.name, "은/는")} 이번 일정에서 우선순위가 분명한 지역입니다. 먼저 이 권역 안에서 호텔을 추린 뒤 가격, 객실 크기, 최근 후기를 비교해보세요.`;
}

function getAlternativeSentence(area, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!second) return "";

  const gap = rankedAreas[0].score - second.score;
  if (gap <= 2) {
    return `${second.name}도 거의 같은 후보입니다. ${second.compareGood || second.summary}`;
  }
  return `대안으로는 ${withJosa(second.name, "이/가")} 있습니다. ${second.compareGood || second.summary}`;
}

function getPersuasiveContent(area, rankedAreas) {
  const contents = {
    hakata: {
      intro: "공항 이동, 하카타역, 근교 당일치기까지 한 번에 잡아야 하는 일정에는 하카타가 가장 단순합니다. 도착일과 출국일의 이동 피로를 줄이고, 일정이 바뀌어도 대응하기 쉽습니다.",
      reasons: [
        { title: "공항 이동이 가장 단순합니다", text: "후쿠오카공항에서 하카타까지 이동 동선이 짧아 늦은 도착이나 이른 출국 일정에서 부담이 적습니다." },
        { title: "근교 일정에 강합니다", text: "JR 하카타역과 버스터미널을 활용하기 쉬워 다자이후, 유후인, 기타큐슈 같은 당일치기 계획을 세우기 좋습니다." },
        { title: "첫 여행 기준점으로 좋습니다", text: "하카타를 기준으로 잡으면 텐진, 나카스, 기온까지의 이동 방향이 명확해져 동선 실수가 줄어듭니다." },
        { title: "주의할 점도 분명합니다", text: "쇼핑과 밤 분위기만 보면 텐진·나카스보다 덜 화려합니다. 숙소 주변 분위기보다 이동 효율을 우선할 때 가장 만족도가 높습니다." }
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
      intro: "저녁 식사, 포장마차, 강변 야경, 늦은 귀가가 중요하면 나카스 & 카와바타가 강합니다. 숙소로 돌아오는 길이 짧아 밤 시간을 더 편하게 쓸 수 있습니다.",
      reasons: [
        { title: "저녁 이후 동선이 짧습니다", text: "나카스 강변, 포장마차, 식당가를 이용한 뒤 택시나 긴 도보 없이 숙소로 돌아가기 쉽습니다." },
        { title: "캐널시티와 상점가를 묶기 좋습니다", text: "캐널시티, 카와바타 상점가, 나카스 야경을 한 흐름으로 연결하기 좋아 짧은 여행에서도 체류감이 큽니다." },
        { title: "친구 여행 만족도가 높습니다", text: "늦은 시간까지 식사와 산책을 넣기 좋아 일정을 빽빽하게 쓰는 여행자에게 잘 맞습니다." },
        { title: "소음 확인은 필수입니다", text: "나카스 중심 저층 객실은 밤 소음 호불호가 생길 수 있습니다. 조용함이 중요하면 카와바타 쪽이나 한 블록 떨어진 위치가 낫습니다." }
      ],
      conclusionTitle: "나카스 & 카와바타를 1순위로 두면 좋은 여행",
      conclusionText: "맛집과 밤 동선이 핵심이면 만족도가 높습니다. 부모님 동반, 아이 동반, 조용한 휴식이 우선이면 하카타·기온·오호리 & 모모치 쪽도 같이 비교하세요."
    },
    gion: {
      intro: "하카타와 나카스 사이에서 균형을 잡고 싶다면 기온이 좋습니다. 너무 번잡하지 않으면서 하카타역, 캐널시티, 나카스 접근성을 모두 가져갈 수 있습니다.",
      reasons: [
        { title: "위치 균형이 좋습니다", text: "하카타역과 나카스 사이에 있어 공항·역 이동과 저녁 도보 동선을 모두 무난하게 가져갈 수 있습니다." },
        { title: "첫 여행에도 부담이 적습니다", text: "하카타만큼 단순하고 나카스만큼 번화하지는 않지만, 주요 권역을 고르게 보기에는 안정적입니다." },
        { title: "가격과 위치를 함께 맞추기 좋습니다", text: "핵심 지역 바로 앞보다 부담을 낮추면서도 시내 중심 동선을 크게 포기하지 않는 선택이 가능합니다." },
        { title: "목적이 뚜렷하면 비교가 필요합니다", text: "쇼핑만 보면 텐진, 근교 이동만 보면 하카타, 밤거리만 보면 나카스가 더 명확할 수 있습니다." }
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
        { title: "숙박 분위기가 차분합니다", text: "하카타·텐진·나카스보다 밤 분위기가 덜 복잡해 쉬는 시간을 확보하기 좋습니다." },
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

  setText("selectedAnswerText", `${signal.sentence} 그래서 ${withJosa(area.name, "이/가")} 이번 일정의 1순위 후보로 나왔습니다.`);
}

function getPracticalGuideDesc(area) {
  if (!area) return "";
  return `${withJosa(area.name, "을/를")} 고를 때는 지역명보다 실제 역 출구, 도보 시간, 밤 동선, 객실 크기를 함께 확인하는 것이 좋습니다.`;
}

function renderPracticalGuide(area) {
  setText("practicalGuideDesc", getPracticalGuideDesc(area));
  renderSimpleList("stayRangeList", area.stayRange);
  renderSimpleList("avoidRangeList", area.avoidRange);
  renderSimpleList("bookingTipList", area.bookingTips);
  renderChipList("bestForList", area.bestFor);
  renderChipList("notForList", area.notFor);
}

function getAlternativeDetail(topArea, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!topArea || !second) return null;

  const gap = topArea.score - second.score;
  const title = gap <= 2
    ? `${second.name}도 거의 같은 후보입니다`
    : `${second.name}도 함께 비교해보세요`;

  const text = gap <= 2
    ? `${withJosa(topArea.name, "이/가")} 가장 잘 맞지만 점수 차이가 크지 않습니다. ${second.compareGood || second.summary} 호텔 가격이나 객실 크기 차이가 크다면 ${second.name}도 충분히 선택할 만합니다.`
    : `${topArea.name} 조건이 더 강하게 나왔지만, 일정 일부가 ${second.name} 쪽에 가까우면 대안이 될 수 있습니다. ${second.compareGood || second.summary}`;

  return { title, text };
}

function renderAlternativeAreaLegacy(topArea, rankedAreas) {
  const box = document.getElementById("alternativeAreaBox");
  if (!box) return;

  const detail = getAlternativeDetail(topArea, rankedAreas);
  if (!detail) {
    box.style.display = "none";
    return;
  }

  box.style.display = "block";
  setText("alternativeAreaTitle", detail.title);
  setText("alternativeAreaText", detail.text);
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

  hotels.forEach((hotel, index) => {
    const article = document.createElement("article");
    const header = document.createElement("div");
    const headerLeft = document.createElement("div");
    const rank = document.createElement("span");
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
    rank.className = "wt-hotel-rank";
    name.className = "wt-hotel-name";
    link.className = "wt-hotel-link";
    locationMain.className = "wt-hotel-location-main";
    station.className = "wt-hotel-station";
    separator.className = "wt-hotel-separator";
    airport.className = "wt-hotel-airport";
    tagList.className = "wt-hotel-tag-list";

    rank.textContent = `${index + 1}`;
    name.textContent = hotel.name || "호텔 후보";
    link.href = hotel.url || "#";
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotel.name || "호텔 후보"} 잔여 객실 확인`);
    station.textContent = access.station;
    separator.textContent = "|";
    airport.textContent = access.airport;

    headerLeft.appendChild(rank);
    headerLeft.appendChild(name);
    header.appendChild(headerLeft);
    header.appendChild(link);

    locationMain.appendChild(station);
    locationMain.appendChild(separator);
    locationMain.appendChild(airport);

    tags.forEach((item, tagIndex) => {
      const tag = document.createElement("span");
      tag.className = tagIndex === 2
        ? "wt-hotel-tag wt-hotel-tag--highlight"
        : "wt-hotel-tag wt-hotel-tag--base";
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
  const detail = getAlternativeDetail(topArea, rankedAreas);
  if (!detail) {
    setText("alternativeAreaTitle", "함께 비교할 지역이 없습니다");
    setText("alternativeAreaText", "이번 답변에서는 추천 지역의 적합도가 가장 높게 나왔습니다.");
    return;
  }

  setText("alternativeAreaTitle", detail.title);
  setText("alternativeAreaText", detail.text);
}

const emotionalSummaryByArea = {
  hakata: "공항과 하카타역을 복잡하게 헤매지 않고, 짧은 후쿠오카 일정 안에서 근교 이동과 도심 동선을 단정하게 묶고 싶은 당신에게 가장 편안하게 맞아떨어지는 안정적인 시작점입니다.",
  tenjin: "낮에는 쇼핑 거리와 감각적인 카페를 가볍게 오가고, 저녁에는 맛집과 도심 분위기를 숙소 가까이에서 즐기고 싶은 당신에게 자연스럽게 어울리는 활기 있는 중심지입니다.",
  nakasuKawabata: "강변 야경과 포장마차의 온기, 늦은 저녁까지 이어지는 후쿠오카의 맛집 동선을 숙소 가까이에서 누리고 싶은 당신에게 잘 맞는 생동감 있는 머무름의 자리입니다.",
  gion: "하카타의 편리함과 나카스의 분위기 사이에서 너무 번잡하지 않게 머물고, 캐널시티와 구시다신사 주변을 천천히 걸어보고 싶은 당신에게 차분하게 맞는 균형형 위치입니다.",
  yakuinWatanabedori: "텐진의 도심 접근성은 놓치지 않으면서도 번화가 한복판의 소란은 살짝 비켜가고 싶은 당신에게, 조용한 카페 거리와 실속 있는 숙박 감각이 함께 맞물리는 위치입니다.",
  ohoriMomochi: "도심의 빠른 흐름에서 잠시 벗어나 오호리공원의 산책길과 모모치 해변의 여유를 일정 안에 담고 싶은 당신에게, 후쿠오카를 조금 더 느리게 즐기게 해주는 편안한 쉼의 위치입니다."
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

function resetSurvey(toIntro = true) {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  resetTabs(0);
  navigateTo(toIntro ? "introPage" : "introPage");
}

startSurveyBtn?.addEventListener("click", startSurvey);
backBtn?.addEventListener("click", goBack);
questionCloseBtn?.addEventListener("click", () => resetSurvey(true));
completionCloseBtn?.addEventListener("click", () => resetSurvey(true));
resultCloseBtn?.addEventListener("click", () => resetSurvey(true));
resultReadyBtn?.addEventListener("click", processAnalysis);
nextBtn?.addEventListener("click", goNext);
prevBtn?.addEventListener("click", goPrev);
resetBtn?.addEventListener("click", () => resetSurvey(true));
detailBtn?.addEventListener("click", () => showDetailedView(0));
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
