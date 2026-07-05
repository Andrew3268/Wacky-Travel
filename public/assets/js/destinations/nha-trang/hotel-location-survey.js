/* 나트랑 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "나트랑",
  "destinationSlug": "nha-trang",
  "postContentType": "top5_series",
  "areas": {
    "cityBeach": {
      "name": "나트랑 시내·나트랑 비치",
      "summary": "해변 산책과 야시장, 식당과 마사지가 짧은 동선 안에 모이는 중심에서 바다와 도시의 활기를 모두 누리고 싶은 당신에게 잘 맞는 나트랑 대표 지역입니다.",
      "leadTitle": "나트랑이 처음이라면 처음 나트랑을 간다면 가장 무난하게 고르기 좋은 숙박지입니다.",
      "leadText": "첫 여행, 자유여행, 친구·커플 여행, 짧은 일정, 저녁 산책과 식사 동선이 중요한 일정",
      "hotels": [
        {
          "name": "InterContinental Nha Trang",
          "kr": "인터컨티넨탈 나트랑",
          "area": "나트랑 시내·나트랑 비치",
          "tag": "중심 해변형",
          "text": "쩐푸 비치 중심에서 해변 산책과 시내 식사 동선을 함께 잡기 좋은 고급 호텔입니다."
        },
        {
          "name": "Sheraton Nha Trang Hotel & Spa",
          "kr": "쉐라톤 나트랑 호텔 앤 스파",
          "area": "나트랑 시내·나트랑 비치",
          "tag": "가족·커플 균형형",
          "text": "나트랑 비치와 시내 접근을 모두 고려하는 가족·커플 여행자가 비교하기 좋은 호텔입니다."
        },
        {
          "name": "Novotel Nha Trang",
          "kr": "노보텔 나트랑",
          "area": "나트랑 시내·나트랑 비치",
          "tag": "비치 도보형",
          "text": "해변 바로 앞 동선과 합리적인 위치 균형을 함께 보고 싶은 일정에 어울립니다."
        },
        {
          "name": "Liberty Central Nha Trang Hotel",
          "kr": "리버티 센트럴 나트랑 호텔",
          "area": "나트랑 시내·나트랑 비치",
          "tag": "시내 실속형",
          "text": "시내 식당, 마사지, 해변 접근을 한 번에 잡고 싶은 자유여행에 비교할 만합니다."
        },
        {
          "name": "Citadines Bayfront Nha Trang",
          "kr": "시타딘 베이프런트 나트랑",
          "area": "나트랑 시내·나트랑 비치",
          "tag": "장기 숙박형",
          "text": "객실 편의성과 해변 접근을 함께 보는 가족·장기 일정 후보로 좋습니다."
        }
      ]
    },
    "honChong": {
      "name": "혼총·팜반동",
      "summary": "시내 중심의 분주함에서 조금 벗어나 현지 분위기의 바다와 북쪽 해변의 차분함을 가까이 두고 쉬고 싶은 당신에게 잘 어울리는 조용한 해변 지역입니다.",
      "leadTitle": "시내의 편의성은 어느 정도 유지하면서 조금 더 차분한 해변 분위기를 원할 때 좋습니다.",
      "leadText": "조용한 해변 산책, 부모님 동반, 장기 숙박, 시내 중심의 번잡함을 피하고 싶은 일정",
      "hotels": [
        {
          "name": "Amiana Resort Nha Trang",
          "kr": "아미아나 리조트 나트랑",
          "area": "혼총·팜반동",
          "tag": "북부 리조트형",
          "text": "시내에서 벗어나 조용한 해변과 리조트 분위기를 누리고 싶을 때 어울립니다."
        },
        {
          "name": "Muong Thanh Luxury Vien Trieu Hotel",
          "kr": "므엉 탄 럭셔리 비엔 트리우 호텔",
          "area": "혼총·팜반동",
          "tag": "북쪽 해변형",
          "text": "혼총 비치와 팜반동 주변 동선을 중심으로 비교하기 좋은 대형 호텔입니다."
        },
        {
          "name": "Boton Blue Hotel & Spa",
          "kr": "보톤 블루 호텔 앤 스파",
          "area": "혼총·팜반동",
          "tag": "전망 중심형",
          "text": "북쪽 해변 전망과 조용한 숙소 분위기를 함께 원하는 여행자에게 어울립니다."
        },
        {
          "name": "Navada Beach Hotel",
          "kr": "나바다 비치 호텔",
          "area": "혼총·팜반동",
          "tag": "실속 해변형",
          "text": "팜반동 주변에서 해변 접근성과 가격 균형을 함께 보기 좋은 후보입니다."
        },
        {
          "name": "DQua Hotel",
          "kr": "디쿠아 호텔",
          "area": "혼총·팜반동",
          "tag": "시내 북부 균형형",
          "text": "북쪽 해변과 시내 접근을 모두 고려하는 일정에 비교할 수 있습니다."
        }
      ]
    },
    "vinpearlHonTam": {
      "name": "빈펄·혼땀",
      "summary": "배를 타고 들어가는 섬 리조트의 분리된 시간 속에서 가족형 시설과 휴양 분위기에 집중하고 싶은 당신에게 잘 맞는 섬 안의 리조트 지역입니다.",
      "leadTitle": "일반 시내 호텔처럼 고르는 곳은 아니고, 빈펄이나 혼땀에서 머무는 일정이 분명할 때 보는 지역입니다.",
      "leadText": "빈원더스 일정, 아이 동반 가족 여행, 리조트 안에서 쉬는 시간, 섬 휴양을 중심으로 둔 일정",
      "hotels": [
        {
          "name": "Vinpearl Resort Nha Trang",
          "kr": "빈펄 리조트 나트랑",
          "area": "빈펄·혼땀",
          "tag": "가족 리조트형",
          "text": "혼트레 섬에서 수영장과 해변, 빈원더스 동선을 함께 보는 가족 여행 후보입니다."
        },
        {
          "name": "Vinpearl Luxury Nha Trang",
          "kr": "빈펄 럭셔리 나트랑",
          "area": "빈펄·혼땀",
          "tag": "고급 휴양형",
          "text": "조용한 섬 휴식과 프라이빗한 분위기를 중요하게 보는 여행자에게 어울립니다."
        },
        {
          "name": "Vinpearl Resort & Spa Nha Trang Bay",
          "kr": "빈펄 리조트 앤 스파 나트랑 베이",
          "area": "빈펄·혼땀",
          "tag": "리조트 휴식형",
          "text": "섬 안에서 쉬는 시간을 길게 잡는 가족·커플 여행에 비교할 만합니다."
        },
        {
          "name": "Hon Tam Resort",
          "kr": "혼땀 리조트",
          "area": "빈펄·혼땀",
          "tag": "섬 휴양형",
          "text": "혼땀 섬의 조용한 해변과 리조트 체류를 중심으로 잡고 싶은 일정에 맞습니다."
        },
        {
          "name": "Nha Trang Marriott Resort & Spa, Hon Tre Island",
          "kr": "나트랑 메리어트 리조트 앤 스파 혼트레 아일랜드",
          "area": "빈펄·혼땀",
          "tag": "섬 리조트형",
          "text": "혼트레 섬에서 객실 컨디션과 리조트 시설을 함께 보고 싶을 때 비교할 만합니다."
        }
      ]
    },
    "camRanh": {
      "name": "깜란·바이다이",
      "summary": "넓은 해변과 프라이빗한 리조트, 조용한 수영장과 객실에서 보내는 시간이 여행의 중심이 되길 바라는 당신에게 잘 어울리는 휴양 지역입니다.",
      "leadTitle": "관광보다 리조트 휴식이 우선이라면 나트랑에서 가장 먼저 비교할 지역입니다.",
      "leadText": "리조트 휴양, 아이 동반 가족 여행, 늦은 도착·이른 출국, 조용한 해변, 대형 리조트 중심 일정",
      "hotels": [
        {
          "name": "Mia Resort Nha Trang",
          "kr": "미아 리조트 나트랑",
          "area": "깜란·바이다이",
          "tag": "프라이빗 휴양형",
          "text": "조용한 해변과 감성적인 리조트 분위기를 원하는 커플·가족 여행에 잘 맞습니다."
        },
        {
          "name": "The Anam Cam Ranh",
          "kr": "더 아남 깜란",
          "area": "깜란·바이다이",
          "tag": "고급 리조트형",
          "text": "바이다이 해변의 차분한 분위기와 고급 리조트 체류를 함께 기대할 수 있습니다."
        },
        {
          "name": "Alma Resort Cam Ranh",
          "kr": "알마 리조트 깜란",
          "area": "깜란·바이다이",
          "tag": "가족형 리조트",
          "text": "아이 동반 가족 여행에서 객실 크기와 리조트 시설을 중요하게 볼 때 비교하기 좋습니다."
        },
        {
          "name": "Movenpick Resort Cam Ranh",
          "kr": "뫼벤픽 리조트 깜란",
          "area": "깜란·바이다이",
          "tag": "가족 휴양형",
          "text": "수영장과 부대시설을 활용하는 가족 휴양 일정에 어울립니다."
        },
        {
          "name": "Radisson Blu Resort Cam Ranh",
          "kr": "래디슨 블루 리조트 깜란",
          "area": "깜란·바이다이",
          "tag": "공항 접근형",
          "text": "공항 접근성과 바이다이 해변 휴식을 함께 챙기기 좋습니다."
        }
      ]
    },
    "ninhHoa": {
      "name": "닌호아·족렛",
      "summary": "나트랑 중심에서 멀어진 만큼 더 한적한 바다와 조용한 리조트 체류를 원하고, 익숙한 관광지보다 여유로운 휴식을 선택하고 싶은 당신에게 잘 맞는 외곽 휴양지입니다.",
      "leadTitle": "나트랑을 관광 도시보다 조용한 휴양지로 쓰고 싶을 때 선택하는 지역입니다.",
      "leadText": "조용한 휴양, 커플 여행, 고급 리조트 체류, 재방문 여행, 시내보다 자연과 한적함을 우선하는 일정",
      "hotels": [
        {
          "name": "Six Senses Ninh Van Bay",
          "kr": "식스센스 닌반베이",
          "area": "닌호아·족렛",
          "tag": "럭셔리 은둔형",
          "text": "한적한 고급 휴양과 프라이빗한 리조트 경험을 원하는 여행자에게 맞습니다."
        },
        {
          "name": "L’Alya Ninh Van Bay",
          "kr": "라알리아 닌반베이",
          "area": "닌호아·족렛",
          "tag": "고급 풀빌라형",
          "text": "조용한 풀빌라 체류와 자연 속 휴식을 우선하는 커플 여행에 어울립니다."
        },
        {
          "name": "TTC Resort Doc Let",
          "kr": "TTC 리조트 족렛",
          "area": "닌호아·족렛",
          "tag": "족렛 해변형",
          "text": "족렛 비치 주변에서 조용한 해변 숙박을 비교할 때 볼 만한 후보입니다."
        },
        {
          "name": "Paradise Resort Doc Let",
          "kr": "파라다이스 리조트 족렛",
          "area": "닌호아·족렛",
          "tag": "한적한 휴양형",
          "text": "붐비는 시내보다 조용한 해변 분위기를 원하는 일정에 맞습니다."
        },
        {
          "name": "Whale Island Resort",
          "kr": "웨일 아일랜드 리조트",
          "area": "닌호아·족렛",
          "tag": "자연 휴식형",
          "text": "나트랑 외곽 섬·해변 휴양을 중심으로 보는 여행자에게 어울립니다."
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 나트랑 여행은 몇 번째인가요?",
      "help": "처음이면 시내 중심이 편하고, 재방문이면 리조트형 지역도 좋습니다.",
      "options": [
        {
          "title": "첫 여행",
          "scores": {
            "cityBeach": 6,
            "honChong": 2,
            "camRanh": 2
          }
        },
        {
          "title": "재방문",
          "scores": {
            "camRanh": 3,
            "ninhHoa": 3,
            "vinpearlHonTam": 2
          }
        },
        {
          "title": "리조트 휴양이 목적",
          "scores": {
            "camRanh": 6,
            "vinpearlHonTam": 4,
            "ninhHoa": 3
          }
        }
      ]
    },
    {
      "title": "누구와 함께 가나요?",
      "help": "동행자에 따라 식사, 이동, 객실 크기, 수영장의 중요도가 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구",
          "scores": {
            "cityBeach": 5,
            "honChong": 3
          }
        },
        {
          "title": "커플 여행",
          "scores": {
            "cityBeach": 3,
            "camRanh": 4,
            "ninhHoa": 3
          }
        },
        {
          "title": "가족·아이",
          "scores": {
            "camRanh": 5,
            "vinpearlHonTam": 5,
            "cityBeach": 2
          }
        },
        {
          "title": "부모님 동반",
          "scores": {
            "cityBeach": 4,
            "honChong": 4,
            "camRanh": 2
          }
        }
      ]
    },
    {
      "title": "가장 기대하는 일정은 무엇인가요?",
      "help": "나트랑에서 가장 많이 쓸 시간을 기준으로 골라보세요.",
      "options": [
        {
          "title": "해변 산책·야시장",
          "scores": {
            "cityBeach": 6,
            "honChong": 2
          }
        },
        {
          "title": "섬투어·빈원더스",
          "scores": {
            "vinpearlHonTam": 6,
            "cityBeach": 3
          }
        },
        {
          "title": "리조트 수영장 휴식",
          "scores": {
            "camRanh": 6,
            "vinpearlHonTam": 3,
            "ninhHoa": 2
          }
        },
        {
          "title": "조용한 외곽 휴양",
          "scores": {
            "ninhHoa": 6,
            "camRanh": 3
          }
        }
      ]
    },
    {
      "title": "공항 이동은 얼마나 중요하나요?",
      "help": "늦은 도착이나 이른 출국이면 깜란 쪽이 편할 수 있습니다.",
      "options": [
        {
          "title": "매우 중요",
          "scores": {
            "camRanh": 6,
            "cityBeach": 2
          }
        },
        {
          "title": "보통",
          "scores": {
            "cityBeach": 3,
            "honChong": 2,
            "camRanh": 2
          }
        },
        {
          "title": "크게 중요하지 않음",
          "scores": {
            "ninhHoa": 3,
            "vinpearlHonTam": 2,
            "honChong": 2
          }
        }
      ]
    },
    {
      "title": "섬 일정은 어느 정도인가요?",
      "help": "혼땀, 혼문, 빈원더스 일정이 많을수록 이동 방식이 중요합니다.",
      "options": [
        {
          "title": "빈원더스가 핵심",
          "scores": {
            "vinpearlHonTam": 7
          }
        },
        {
          "title": "섬투어 하루 정도",
          "scores": {
            "cityBeach": 4,
            "vinpearlHonTam": 3
          }
        },
        {
          "title": "섬 일정 거의 없음",
          "scores": {
            "cityBeach": 3,
            "honChong": 3,
            "camRanh": 3
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "저녁에 숙소 주변에서 어떻게 시간을 보낼지 떠올려보세요.",
      "options": [
        {
          "title": "활기 있는 시내 해변",
          "scores": {
            "cityBeach": 6
          }
        },
        {
          "title": "조금 차분한 북쪽 해변",
          "scores": {
            "honChong": 6
          }
        },
        {
          "title": "대형 리조트 분위기",
          "scores": {
            "camRanh": 6,
            "vinpearlHonTam": 3
          }
        },
        {
          "title": "한적한 고급 휴양",
          "scores": {
            "ninhHoa": 6
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 편인가요?",
      "help": "해변 바로 앞과 리조트형 숙소는 가격이 올라갈 수 있습니다.",
      "options": [
        {
          "title": "예산 절약",
          "scores": {
            "cityBeach": 4,
            "honChong": 4
          }
        },
        {
          "title": "가격·위치 균형",
          "scores": {
            "cityBeach": 5,
            "honChong": 3,
            "camRanh": 2
          }
        },
        {
          "title": "휴식 우선",
          "scores": {
            "camRanh": 5,
            "vinpearlHonTam": 4,
            "ninhHoa": 3
          }
        }
      ]
    },
    {
      "title": "호텔에서 보내는 시간은 어느 정도인가요?",
      "help": "숙소 안 시간이 길수록 리조트 시설과 조용함이 중요합니다.",
      "options": [
        {
          "title": "잠만 자는 편",
          "scores": {
            "cityBeach": 5,
            "honChong": 3
          }
        },
        {
          "title": "절반 정도 쉼",
          "scores": {
            "cityBeach": 3,
            "camRanh": 3,
            "honChong": 2
          }
        },
        {
          "title": "호텔에서 오래 쉼",
          "scores": {
            "camRanh": 6,
            "vinpearlHonTam": 5,
            "ninhHoa": 4
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "cityBeach": "해변 산책과 시내 미식이 가까운 중심",
  "honChong": "현지 분위기의 바다 앞에서 조용히 쉬기 좋은 곳",
  "vinpearlHonTam": "섬 리조트에서 깊어지는 휴식",
  "camRanh": "넓은 해변과 리조트 시간이 흐르는 곳",
  "ninhHoa": "한적한 바다와 긴 휴식이 있는 곳"
};

const hotelAccessPresets = {
  "cityBeach": {
    "station": "나트랑 비치·시내 도보권",
    "airport": "깜란공항 차량 약 40~50분"
  },
  "honChong": {
    "station": "혼총·팜반동 해변 접근",
    "airport": "깜란공항 차량 약 50~60분"
  },
  "vinpearlHonTam": {
    "station": "선착장·섬 리조트 이동",
    "airport": "깜란공항 차량+보트 확인"
  },
  "camRanh": {
    "station": "깜란·바이다이 리조트권",
    "airport": "깜란공항 차량 약 10~25분"
  },
  "ninhHoa": {
    "station": "닌호아·족렛 해변권",
    "airport": "깜란공항 차량 약 70~90분"
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
const detailBackBtn = document.getElementById("detailBackBtn");
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

function resetSurvey() {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
  resetTabs(0);
  navigateTo("introPage");
}

startSurveyBtn?.addEventListener("click", startSurvey);
backBtn?.addEventListener("click", goBack);
resultCloseBtn?.addEventListener("click", closeResultView);
resultReadyBtn?.addEventListener("click", processAnalysis);
nextBtn?.addEventListener("click", goNext);
prevBtn?.addEventListener("click", goPrev);
resetBtn?.addEventListener("click", resetSurvey);
detailBtn?.addEventListener("click", () => showDetailedView(0));
detailBackBtn?.addEventListener("click", closeDetailedView);
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
