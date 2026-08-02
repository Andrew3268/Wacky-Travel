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
  },
  "questions": [
    {"title":"이번 다낭 여행은 몇 번째인가요?","help":"처음이면 이동이 단순한 위치가 편하고, 재방문이면 휴식형 구역도 좋습니다.","options":[
      {"title":"첫 여행","scores":{"myKhe":5,"hanRiverEast":4,"cityCenter":2}},
      {"title":"재방문","scores":{"nonNuoc":4,"myKhe":2,"hanRiverEast":2}},
      {"title":"익숙한 여행","scores":{"nonNuoc":3,"cityCenter":2}}
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
      {"title":"매우 중요","scores":{"cityCenter":6,"hanRiverEast":3,"myKhe":2}},
      {"title":"보통","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}},
      {"title":"크게 중요하지 않음","scores":{"nonNuoc":4,"myKhe":2}}
    ]},
    {"title":"근교 일정은 어느 정도인가요?","help":"호이안, 바나힐, 후에 일정 비중을 생각해보세요.","options":[
      {"title":"호이안 중심","scores":{"nonNuoc":6,"myKhe":2}},
      {"title":"바나힐 하루","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}},
      {"title":"후에까지 예정","scores":{"hanRiverEast":4,"cityCenter":3}},
      {"title":"근교 거의 없음","scores":{"myKhe":3,"hanRiverEast":3,"cityCenter":2}}
    ]},
    {"title":"숙소 주변 분위기는 어떤 쪽이 좋나요?","help":"저녁에 숙소 주변에서 어떻게 시간을 보낼지 떠올려보세요.","options":[
      {"title":"활기 있는 해변","scores":{"myKhe":6}},
      {"title":"차분한 리조트","scores":{"nonNuoc":6}},
      {"title":"야경 있는 도심","scores":{"hanRiverEast":5,"cityCenter":3}},
      {"title":"시장·로컬 분위기","scores":{"cityCenter":5,"hanRiverEast":2}}
    ]},
    {"title":"숙소 예산은 어떤 편인가요?","help":"해변 바로 앞과 리조트형 숙소는 가격이 올라갈 수 있습니다.","options":[
      {"title":"예산 절약","scores":{"cityCenter":6,"myKhe":2,"hanRiverEast":1}},
      {"title":"가격·위치 균형","scores":{"myKhe":4,"hanRiverEast":4,"cityCenter":3}},
      {"title":"휴식 우선","scores":{"nonNuoc":5,"myKhe":2}}
    ]},
    {"title":"호텔에서 보내는 시간은 어느 정도인가요?","help":"숙소 안 시간이 길수록 리조트 시설과 조용함이 중요합니다.","options":[
      {"title":"잠만 자는 편","scores":{"cityCenter":5,"hanRiverEast":3,"myKhe":1}},
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
