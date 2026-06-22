/*
 * Taichung hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  "cityName": "타이중",
  "destinationSlug": "taichung",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이중역·중구",
      "regionSlug": "taichung-station",
      "regionSlugAliases": [
        "taichung-station",
        "central-district",
        "old-town",
        "miyahara",
        "타이중역",
        "중구",
        "미야하라"
      ],
      "label": "구시가지와 교통을 한 번에 잡는 첫 여행 기본 위치",
      "summary": "미야하라, 제2시장, 구 타이중역, 류촨 수변 산책까지 도보 동선으로 묶기 쉬운 중심 권역입니다.",
      "leadTitle": "짧은 일정과 첫 타이중 여행이라면 가장 실용적인 출발점입니다.",
      "leadText": "기차역 주변 구시가지, 로컬 맛집, 오래된 건축물을 한 번에 둘러보기 좋고, 고미습지·무지개마을 같은 외곽 투어 출발 전후 동선도 비교적 단순합니다.",
      "stayRange": [
        "타이중역, 미야하라, 제2시장 이동이 쉬운 위치",
        "구시가지 산책과 로컬 맛집을 함께 보기 좋은 중구 생활권",
        "외곽 투어 픽업이나 기차 이동을 확인하기 쉬운 숙소"
      ],
      "avoidRange": [
        "밤 늦게 펑지아 야시장을 매일 갈 계획인데 역 주변에만 고정하는 선택",
        "신축 호텔 분위기를 최우선으로 보는데 오래된 상권 안쪽 저가 숙소만 보는 선택",
        "고속철도역 이용이 핵심인데 타이중역과 HSR 타이중역을 혼동하는 선택"
      ],
      "bestFor": [
        "첫 타이중 여행",
        "짧은 2박 3일",
        "구시가지 산책",
        "로컬 맛집"
      ],
      "notFor": [
        "매일 펑지아 야시장 중심 일정",
        "넓은 신도심 호텔을 원하는 여행",
        "고속철도 출발이 매우 이른 일정"
      ],
      "bookingTips": [
        "타이중역과 HSR 타이중역은 다른 역이므로 예약 전 반드시 구분하세요.",
        "구시가지 숙소는 객실 컨디션 편차가 있어 최근 사진과 후기를 확인하세요.",
        "저녁 동선이 펑지아라면 택시 이동 시간과 비용을 함께 고려하세요."
      ],
      "chips": [
        "첫 여행",
        "구시가지",
        "미야하라",
        "시장 맛집",
        "기차역"
      ],
      "compareGood": "타이중을 처음 방문하는 여행자가 대표 동선을 빠르게 익히기 좋습니다.",
      "compareCaution": "신도심 쇼핑몰과 펑지아 야시장 중심 일정이면 매번 이동이 생길 수 있습니다.",
      "mismatchNote": "이번 답변에서 야시장, 신도심 호텔, 고속철도 접근을 더 강하게 골랐다면 다른 지역이 더 맞을 수 있습니다.",
      "links": [
        {
          "title": "타이중 타이중역 호텔 추천 TOP5",
          "url": "/post/taichung-taichung-station-hotels"
        },
        {
          "title": "타이중 타이중역 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-taichung-station-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "르 메르디앙 타이중",
          "tag": "위치형 후보",
          "location": "타이중역·중구",
          "reason": "타이중역·중구 생활권에서 첫 여행와 구시가지 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "첫 여행",
            "구시가지",
            "미야하라"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "홀리데이 인 익스프레스 타이중 파크",
          "tag": "실속형 후보",
          "location": "타이중역·중구",
          "reason": "타이중역·중구 생활권에서 첫 여행와 구시가지 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "첫 여행",
            "구시가지",
            "미야하라"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "시티인 호텔 플러스 타이중 스테이션 브랜치",
          "tag": "가족형 후보",
          "location": "타이중역·중구",
          "reason": "타이중역·중구 생활권에서 첫 여행와 구시가지 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "첫 여행",
            "구시가지",
            "미야하라"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "53 호텔",
          "tag": "감성형 후보",
          "location": "타이중역·중구",
          "reason": "타이중역·중구 생활권에서 첫 여행와 구시가지 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "첫 여행",
            "구시가지",
            "미야하라"
          ],
          "url": "/post/53"
        },
        {
          "name": "인하우스 호텔 그랜드",
          "tag": "이동형 후보",
          "location": "타이중역·중구",
          "reason": "타이중역·중구 생활권에서 첫 여행와 구시가지 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "첫 여행",
            "구시가지",
            "미야하라"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    },
    "xitun": {
      "name": "시툰·펑지아",
      "regionSlug": "xitun-fengjia",
      "regionSlugAliases": [
        "xitun",
        "fengjia",
        "feng-chia",
        "fengjia-night-market",
        "시툰",
        "펑지아",
        "펑지아야시장"
      ],
      "label": "야시장과 신도심 분위기를 함께 즐기기 좋은 위치",
      "summary": "펑지아 야시장, 쇼핑, 저녁 먹거리, 비교적 활기 있는 숙박 분위기를 원하는 여행자에게 잘 맞습니다.",
      "leadTitle": "밤 동선이 중요한 타이중 여행이라면 만족도가 높은 후보입니다.",
      "leadText": "펑지아 야시장 주변은 먹거리와 쇼핑이 늦게까지 이어져 저녁 시간을 숙소 주변에서 보내기 좋습니다. 단, 조용한 숙박을 원한다면 야시장 바로 앞보다는 한 블록 떨어진 위치를 봐야 합니다.",
      "stayRange": [
        "펑지아 야시장 도보권이지만 큰길 접근이 좋은 위치",
        "시툰 신도심과 쇼핑몰 이동을 함께 보기 좋은 숙소",
        "택시 호출과 버스 이동이 쉬운 대로변 주변"
      ],
      "avoidRange": [
        "소음에 민감한데 야시장 입구 바로 앞 저층 객실",
        "아침마다 타이중역이나 고속철도역으로 이동해야 하는 일정",
        "조용한 동네 산책을 기대하면서 펑지아 중심부를 고르는 선택"
      ],
      "bestFor": [
        "친구 여행",
        "야시장 중심",
        "쇼핑",
        "활기 있는 저녁"
      ],
      "notFor": [
        "부모님과 조용한 휴식",
        "이른 아침 고속철도 이동",
        "구시가지 도보 여행"
      ],
      "bookingTips": [
        "야시장 도보권과 소음은 함께 확인해야 합니다.",
        "객실 크기와 방음 후기를 먼저 확인하세요.",
        "택시 이동이 잦다면 큰길 접근성이 좋은 호텔이 편합니다."
      ],
      "chips": [
        "펑지아",
        "야시장",
        "쇼핑",
        "친구 여행",
        "저녁 동선"
      ],
      "compareGood": "숙소 주변에서 저녁 식사와 산책을 해결하기 쉬워 여행 체감이 활기 있습니다.",
      "compareCaution": "관광지 도보권보다는 저녁 상권 중심이라 낮 일정은 차량 이동이 필요할 수 있습니다.",
      "mismatchNote": "이번 답변에서 조용함, 가족형 여유, 고속철도 이동을 더 중요하게 골랐다면 시툰은 1순위가 아닐 수 있습니다.",
      "links": [
        {
          "title": "타이중 시툰 호텔 추천 TOP5",
          "url": "/post/taichung-xitun-fengjia-hotels"
        },
        {
          "title": "타이중 시툰 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-xitun-fengjia-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "더 린 호텔 타이중",
          "tag": "위치형 후보",
          "location": "시툰·펑지아",
          "reason": "시툰·펑지아 생활권에서 펑지아와 야시장 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "펑지아",
            "야시장",
            "쇼핑"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "밀레니엄 호텔 타이중",
          "tag": "실속형 후보",
          "location": "시툰·펑지아",
          "reason": "시툰·펑지아 생활권에서 펑지아와 야시장 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "펑지아",
            "야시장",
            "쇼핑"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "호텔 7 타이중",
          "tag": "가족형 후보",
          "location": "시툰·펑지아",
          "reason": "시툰·펑지아 생활권에서 펑지아와 야시장 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "펑지아",
            "야시장",
            "쇼핑"
          ],
          "url": "/post/7"
        },
        {
          "name": "인 스카이 호텔",
          "tag": "감성형 후보",
          "location": "시툰·펑지아",
          "reason": "시툰·펑지아 생활권에서 펑지아와 야시장 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "펑지아",
            "야시장",
            "쇼핑"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "쿤 호텔",
          "tag": "이동형 후보",
          "location": "시툰·펑지아",
          "reason": "시툰·펑지아 생활권에서 펑지아와 야시장 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "펑지아",
            "야시장",
            "쇼핑"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    },
    "west": {
      "name": "서구·차오우다오",
      "regionSlug": "west-calligraphy-greenway",
      "regionSlugAliases": [
        "west-district",
        "calligraphy-greenway",
        "shenji-new-village",
        "cmp",
        "서구",
        "차오우다오",
        "심계신촌"
      ],
      "label": "카페·공원·감성 산책을 잡기 좋은 균형형 위치",
      "summary": "국립자연과학박물관, 차오우다오, 심계신촌, 감성 카페 동선을 자연스럽게 묶기 좋은 지역입니다.",
      "leadTitle": "타이중을 조금 여유 있게 즐기고 싶은 여행자에게 잘 맞습니다.",
      "leadText": "번화한 야시장보다 카페, 편집숍, 공원, 미술관 분위기를 선호한다면 서구가 편합니다. 중심부 이동도 크게 어렵지 않아 커플·혼자 여행자에게 안정적인 선택지입니다.",
      "stayRange": [
        "차오우다오, CMP, 심계신촌 접근성이 좋은 위치",
        "카페와 산책로를 도보로 연결하기 쉬운 숙소",
        "택시 이동이 쉬운 큰길과 조용한 골목의 균형이 좋은 위치"
      ],
      "avoidRange": [
        "매일 펑지아 야시장 중심인데 서구에만 숙소를 고정하는 선택",
        "고속철도역 접근을 최우선으로 보는데 도심 산책권만 보는 선택",
        "아이와 함께 대형 쇼핑몰·넓은 객실을 최우선으로 보는 일정"
      ],
      "bestFor": [
        "커플 여행",
        "카페 투어",
        "동네 산책",
        "감성 숙소"
      ],
      "notFor": [
        "야시장만 보는 일정",
        "이른 고속철도 이동",
        "대형 쇼핑몰 중심 가족 여행"
      ],
      "bookingTips": [
        "차오우다오와 심계신촌 사이 실제 도보 거리를 확인하세요.",
        "감성 숙소는 엘리베이터·방음·객실 크기를 따로 확인하는 편이 좋습니다.",
        "택시 이동이 잦다면 큰길 접근성과 편의점 위치도 함께 보세요."
      ],
      "chips": [
        "카페",
        "산책",
        "차오우다오",
        "커플",
        "감성"
      ],
      "compareGood": "타이중의 느긋한 분위기와 도심 접근성을 함께 잡기 좋습니다.",
      "compareCaution": "밤 늦게까지 북적이는 상권을 기대하면 시툰보다 조용하게 느껴질 수 있습니다.",
      "mismatchNote": "이번 답변에서 야시장과 고속철도 접근을 많이 골랐다면 서구는 보조 후보에 가깝습니다.",
      "links": [
        {
          "title": "타이중 서구 호텔 추천 TOP5",
          "url": "/post/taichung-west-calligraphy-greenway-hotels"
        },
        {
          "title": "타이중 서구 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-west-calligraphy-greenway-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "더 플레이스 타이중",
          "tag": "위치형 후보",
          "location": "서구·차오우다오",
          "reason": "서구·차오우다오 생활권에서 카페와 산책 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "카페",
            "산책",
            "차오우다오"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "호텔 내셔널 타이중",
          "tag": "실속형 후보",
          "location": "서구·차오우다오",
          "reason": "서구·차오우다오 생활권에서 카페와 산책 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "카페",
            "산책",
            "차오우다오"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "에어라인 인 그린 파크 웨이",
          "tag": "가족형 후보",
          "location": "서구·차오우다오",
          "reason": "서구·차오우다오 생활권에서 카페와 산책 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "카페",
            "산책",
            "차오우다오"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "에어리스 인터내셔널 호텔",
          "tag": "감성형 후보",
          "location": "서구·차오우다오",
          "reason": "서구·차오우다오 생활권에서 카페와 산책 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "카페",
            "산책",
            "차오우다오"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "칼리그래피 그린웨이 호텔",
          "tag": "이동형 후보",
          "location": "서구·차오우다오",
          "reason": "서구·차오우다오 생활권에서 카페와 산책 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "카페",
            "산책",
            "차오우다오"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    },
    "nantun": {
      "name": "난툰·국립가극원",
      "regionSlug": "nantun-theater",
      "regionSlugAliases": [
        "nantun",
        "national-taichung-theater",
        "taichung-city-hall",
        "7th-redevelopment",
        "난툰",
        "국립가극원",
        "타이중시청"
      ],
      "label": "신도심 호텔과 가족형 일정을 잡기 좋은 위치",
      "summary": "국립타이중가극원, 백화점, 신도심 식당가, 넓은 도로망을 함께 보는 여행자에게 어울립니다.",
      "leadTitle": "숙소 컨디션과 신도심 편의성을 중시할 때 안정적인 후보입니다.",
      "leadText": "타이중의 현대적인 분위기와 대형 쇼핑몰, 가족 식사 동선을 중요하게 본다면 난툰·시청 생활권이 편합니다. 택시 이동을 전제로 하면 구시가지와 펑지아도 무리 없이 연결됩니다.",
      "stayRange": [
        "국립타이중가극원, 백화점, 시청 생활권 접근이 쉬운 위치",
        "가족 식사와 쇼핑몰 동선을 함께 잡기 좋은 숙소",
        "대형 호텔과 주차·택시 접근성이 좋은 대로변 주변"
      ],
      "avoidRange": [
        "구시가지 도보 여행이 핵심인데 신도심에만 숙소를 잡는 선택",
        "야시장 바로 앞 분위기를 기대하는 경우",
        "예산 절약이 최우선인데 신도심 상급 호텔만 보는 선택"
      ],
      "bestFor": [
        "가족 여행",
        "쇼핑몰",
        "국립가극원",
        "깔끔한 호텔"
      ],
      "notFor": [
        "로컬 시장 도보 여행",
        "초저예산 여행",
        "밤새 야시장 중심 일정"
      ],
      "bookingTips": [
        "국립가극원과 백화점 동선을 함께 볼지, 펑지아 접근을 함께 볼지 먼저 정하세요.",
        "가족 여행은 객실 크기와 조식 후기를 우선 확인하세요.",
        "택시 이동을 전제로 하면 위치 만족도가 높아지는 지역입니다."
      ],
      "chips": [
        "신도심",
        "가족",
        "쇼핑몰",
        "국립가극원",
        "호텔 컨디션"
      ],
      "compareGood": "숙소 컨디션과 식사·쇼핑 편의성을 안정적으로 잡기 좋습니다.",
      "compareCaution": "타이중역 주변의 구시가지 감성과는 분위기가 다릅니다.",
      "mismatchNote": "이번 답변에서 로컬 시장, 초저예산, 구시가지 산책을 더 중요하게 골랐다면 난툰은 2순위일 수 있습니다.",
      "links": [
        {
          "title": "타이중 난툰 호텔 추천 TOP5",
          "url": "/post/taichung-nantun-theater-hotels"
        },
        {
          "title": "타이중 난툰 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-nantun-theater-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "목시 타이중",
          "tag": "위치형 후보",
          "location": "난툰·국립가극원",
          "reason": "난툰·국립가극원 생활권에서 신도심와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "신도심",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "프레시필즈 호텔",
          "tag": "실속형 후보",
          "location": "난툰·국립가극원",
          "reason": "난툰·국립가극원 생활권에서 신도심와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "신도심",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "선하오 호텔 타이중",
          "tag": "가족형 후보",
          "location": "난툰·국립가극원",
          "reason": "난툰·국립가극원 생활권에서 신도심와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "신도심",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "아이클라우드 럭셔리 리조트 호텔",
          "tag": "감성형 후보",
          "location": "난툰·국립가극원",
          "reason": "난툰·국립가극원 생활권에서 신도심와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "신도심",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "올-어 부티크 모텔 타이중 브랜치",
          "tag": "이동형 후보",
          "location": "난툰·국립가극원",
          "reason": "난툰·국립가극원 생활권에서 신도심와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "신도심",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    },
    "beitun": {
      "name": "베이툰",
      "regionSlug": "beitun",
      "regionSlugAliases": [
        "beitun",
        "dak坑",
        "dak坑-scenic-area",
        "taichung-park",
        "베이툰",
        "다컹"
      ],
      "label": "조용한 숙박과 여유 있는 동선을 원하는 여행자용 위치",
      "summary": "도심 중심부보다 차분한 분위기와 비교적 여유 있는 숙박을 원할 때 고려하기 좋은 북동쪽 권역입니다.",
      "leadTitle": "타이중을 번잡하지 않게 보내고 싶다면 좋은 대안입니다.",
      "leadText": "베이툰은 펑지아나 타이중역처럼 대표 관광지 도보권은 아니지만, 조용한 숙박과 가족형 여유를 우선하는 여행자에게 맞습니다. 택시 이동을 전제로 하면 도심 관광도 충분히 연결됩니다.",
      "stayRange": [
        "큰길 접근성과 택시 호출이 쉬운 위치",
        "다컹 방향 휴식 일정과 도심 이동을 함께 고려한 숙소",
        "가족형 객실이나 조용한 객실 후기가 좋은 호텔"
      ],
      "avoidRange": [
        "처음 타이중에서 모든 것을 도보로 해결하려는 일정",
        "매일 펑지아 야시장과 구시가지를 오가는 짧은 여행",
        "대중교통만으로 촘촘하게 움직여야 하는 일정"
      ],
      "bestFor": [
        "조용한 숙박",
        "가족 여행",
        "여유 일정",
        "택시 이동"
      ],
      "notFor": [
        "첫 여행 초단기 일정",
        "야시장 중심 여행",
        "도보 관광 위주"
      ],
      "bookingTips": [
        "택시 이동 시간을 기준으로 펑지아·타이중역 접근을 비교하세요.",
        "주변 식당과 편의점 접근성을 꼭 확인하세요.",
        "조용한 만큼 밤 동선은 미리 계획해두는 것이 좋습니다."
      ],
      "chips": [
        "조용함",
        "가족",
        "여유",
        "다컹",
        "휴식"
      ],
      "compareGood": "번잡한 상권을 피하면서 비교적 여유 있는 숙박을 만들기 좋습니다.",
      "compareCaution": "대표 관광지를 도보로 연결하기에는 중심성이 약합니다.",
      "mismatchNote": "이번 답변에서 첫 여행, 야시장, 고속철도 접근을 많이 골랐다면 베이툰은 보조 후보입니다.",
      "links": [
        {
          "title": "타이중 베이툰 호텔 추천 TOP5",
          "url": "/post/taichung-beitun-hotels"
        },
        {
          "title": "타이중 베이툰 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-beitun-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "중커 호텔",
          "tag": "위치형 후보",
          "location": "베이툰",
          "reason": "베이툰 생활권에서 조용함와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "조용함",
            "가족",
            "여유"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "허캉 호텔",
          "tag": "실속형 후보",
          "location": "베이툰",
          "reason": "베이툰 생활권에서 조용함와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "조용함",
            "가족",
            "여유"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "더 선 핫 스프링 리조트",
          "tag": "가족형 후보",
          "location": "베이툰",
          "reason": "베이툰 생활권에서 조용함와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "조용함",
            "가족",
            "여유"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "램블 호텔",
          "tag": "감성형 후보",
          "location": "베이툰",
          "reason": "베이툰 생활권에서 조용함와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "조용함",
            "가족",
            "여유"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "타이중 차밍 시티 호텔",
          "tag": "이동형 후보",
          "location": "베이툰",
          "reason": "베이툰 생활권에서 조용함와 가족 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "조용함",
            "가족",
            "여유"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    },
    "wuri": {
      "name": "우르·고속철도역",
      "regionSlug": "wuri-hsr",
      "regionSlugAliases": [
        "wuri",
        "hsr-taichung",
        "taichung-hsr",
        "high-speed-rail",
        "우르",
        "고속철도역",
        "HSR타이중"
      ],
      "label": "고속철도와 외곽 이동을 우선할 때 실용적인 위치",
      "summary": "HSR 타이중역, 무지개마을, 고미습지, 르웨탄·칭징 이동을 고려하는 일정에서 후보가 됩니다.",
      "leadTitle": "도착·출발 동선과 외곽 이동이 중요한 여행자에게 맞습니다.",
      "leadText": "우르는 시내 관광 중심지와는 떨어져 있지만 고속철도 이용, 외곽 투어, 렌터카·택시 이동이 중요한 일정에서는 이동 스트레스를 줄일 수 있습니다.",
      "stayRange": [
        "HSR 타이중역 접근성이 좋은 위치",
        "무지개마을·고미습지·남투 방향 이동을 함께 고려한 숙소",
        "도착일이나 출국 전날처럼 이동이 중요한 날의 1박 후보"
      ],
      "avoidRange": [
        "타이중 시내 첫 여행 전 일정을 우르에만 고정하는 선택",
        "밤마다 야시장과 카페 거리를 즐기려는 일정",
        "도보 관광과 대중교통만으로 움직이려는 여행"
      ],
      "bestFor": [
        "고속철도 이동",
        "외곽 투어",
        "남투 이동",
        "렌터카·택시 일정"
      ],
      "notFor": [
        "첫 여행 전 일정 숙박",
        "야시장 중심 여행",
        "도보 관광 위주"
      ],
      "bookingTips": [
        "HSR 타이중역과 타이중역을 혼동하지 마세요.",
        "시내 관광이 많다면 전 일정 숙박보다 1박 분리도 좋습니다.",
        "외곽 투어 출발지와 픽업 가능 여부를 먼저 확인하세요."
      ],
      "chips": [
        "HSR",
        "외곽 이동",
        "고미습지",
        "무지개마을",
        "1박 분리"
      ],
      "compareGood": "도착·출발과 외곽 이동이 많은 일정에서 이동 변수를 줄일 수 있습니다.",
      "compareCaution": "시내 감성과 야시장 접근성은 중심 지역보다 약합니다.",
      "mismatchNote": "이번 답변에서 구시가지 산책과 야시장 중심을 골랐다면 우르는 전 일정 숙박보다는 보조 숙박에 가깝습니다.",
      "links": [
        {
          "title": "타이중 우르 호텔 추천 TOP5",
          "url": "/post/taichung-wuri-hsr-hotels"
        },
        {
          "title": "타이중 우르 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-wuri-hsr-value-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        },
        {
          "title": "타이중 근교 여행 호텔 추천 TOP5",
          "url": "/post/taichung-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "호텔 헤스퍼 HSR 타이중",
          "tag": "위치형 후보",
          "location": "우르·고속철도역",
          "reason": "우르·고속철도역 생활권에서 HSR와 외곽 이동 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "HSR",
            "외곽 이동",
            "고미습지"
          ],
          "url": "/post/hsr"
        },
        {
          "name": "커밍 플레이스",
          "tag": "실속형 후보",
          "location": "우르·고속철도역",
          "reason": "우르·고속철도역 생활권에서 HSR와 외곽 이동 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "HSR",
            "외곽 이동",
            "고미습지"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "프레시필즈 호텔",
          "tag": "가족형 후보",
          "location": "우르·고속철도역",
          "reason": "우르·고속철도역 생활권에서 HSR와 외곽 이동 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "HSR",
            "외곽 이동",
            "고미습지"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "목시 타이중",
          "tag": "감성형 후보",
          "location": "우르·고속철도역",
          "reason": "우르·고속철도역 생활권에서 HSR와 외곽 이동 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "HSR",
            "외곽 이동",
            "고미습지"
          ],
          "url": "/post/taichung-hotel"
        },
        {
          "name": "올-어 부티크 모텔 타이중 브랜치",
          "tag": "이동형 후보",
          "location": "우르·고속철도역",
          "reason": "우르·고속철도역 생활권에서 HSR와 외곽 이동 동선을 함께 비교할 때 보기 좋은 후보입니다.",
          "meta": [
            "HSR",
            "외곽 이동",
            "고미습지"
          ],
          "url": "/post/taichung-hotel"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 타이중 여행은 어떤 성격인가요?",
      "help": "처음 떠올린 여행 상황을 골라주세요.",
      "options": [
        {
          "title": "처음이에요",
          "desc": "",
          "scores": {
            "station": 6,
            "xitun": 4,
            "west": 2
          }
        },
        {
          "title": "두 번째 이상",
          "desc": "",
          "scores": {
            "west": 5,
            "nantun": 4,
            "beitun": 3
          }
        },
        {
          "title": "가족과 함께",
          "desc": "",
          "scores": {
            "nantun": 6,
            "beitun": 5,
            "station": 3
          }
        },
        {
          "title": "커플·친구 여행",
          "desc": "",
          "scores": {
            "xitun": 6,
            "west": 5,
            "nantun": 3
          }
        }
      ]
    },
    {
      "title": "가장 기대하는 타이중 일정은 무엇인가요?",
      "help": "숙소 주변에서 가장 자주 움직일 동선을 기준으로 골라주세요.",
      "options": [
        {
          "title": "타이중역·구시가지",
          "desc": "",
          "scores": {
            "station": 8,
            "west": 3
          }
        },
        {
          "title": "펑지아 야시장",
          "desc": "",
          "scores": {
            "xitun": 8,
            "nantun": 3
          }
        },
        {
          "title": "카페·공원 산책",
          "desc": "",
          "scores": {
            "west": 8,
            "beitun": 3
          }
        },
        {
          "title": "국립가극원·쇼핑몰",
          "desc": "",
          "scores": {
            "nantun": 8,
            "xitun": 4
          }
        }
      ]
    },
    {
      "title": "외곽 일정이 있나요?",
      "help": "고미습지, 무지개마을, 르웨탄처럼 도심 밖으로 나가는 계획을 확인합니다.",
      "options": [
        {
          "title": "고미습지·무지개마을",
          "desc": "",
          "scores": {
            "wuri": 7,
            "station": 4,
            "nantun": 3
          }
        },
        {
          "title": "르웨탄·칭징 이동",
          "desc": "",
          "scores": {
            "wuri": 8,
            "station": 3
          }
        },
        {
          "title": "시내 중심",
          "desc": "",
          "scores": {
            "station": 5,
            "xitun": 4,
            "west": 4
          }
        },
        {
          "title": "아직 미정",
          "desc": "",
          "scores": {
            "station": 5,
            "nantun": 3,
            "west": 3
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "밤에 돌아왔을 때 편하게 느낄 분위기를 골라주세요.",
      "options": [
        {
          "title": "활기 있는 번화가",
          "desc": "",
          "scores": {
            "xitun": 8,
            "station": 3
          }
        },
        {
          "title": "차분한 도심",
          "desc": "",
          "scores": {
            "west": 6,
            "nantun": 5,
            "station": 3
          }
        },
        {
          "title": "조용한 동네",
          "desc": "",
          "scores": {
            "beitun": 7,
            "west": 5,
            "nantun": 3
          }
        },
        {
          "title": "교통 우선형",
          "desc": "",
          "scores": {
            "station": 6,
            "wuri": 6,
            "nantun": 3
          }
        }
      ]
    },
    {
      "title": "누구와 함께 가나요?",
      "help": "동반자에 따라 소음, 객실 크기, 식사 동선의 우선순위가 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구",
          "desc": "",
          "scores": {
            "xitun": 6,
            "station": 4,
            "west": 3
          }
        },
        {
          "title": "커플",
          "desc": "",
          "scores": {
            "west": 6,
            "nantun": 4,
            "xitun": 3
          }
        },
        {
          "title": "부모님 동반",
          "desc": "",
          "scores": {
            "nantun": 6,
            "beitun": 5,
            "station": 4
          }
        },
        {
          "title": "아이와 함께",
          "desc": "",
          "scores": {
            "nantun": 7,
            "beitun": 5,
            "west": 3
          }
        }
      ]
    },
    {
      "title": "호텔 예산에서 가장 중요한 기준은 무엇인가요?",
      "help": "숙박비만이 아니라 이동비와 시간까지 함께 생각해보세요.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "",
          "scores": {
            "station": 5,
            "beitun": 4,
            "xitun": 3
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "",
          "scores": {
            "west": 5,
            "station": 5,
            "xitun": 4
          }
        },
        {
          "title": "위치 우선",
          "desc": "",
          "scores": {
            "station": 6,
            "xitun": 5,
            "nantun": 4
          }
        },
        {
          "title": "호텔 분위기 우선",
          "desc": "",
          "scores": {
            "nantun": 6,
            "west": 5,
            "beitun": 3
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "마지막으로 후회하기 쉬운 요소를 골라주세요.",
      "options": [
        {
          "title": "공항·고속철도 이동 스트레스",
          "desc": "",
          "scores": {
            "wuri": 7,
            "station": 5
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "desc": "",
          "scores": {
            "west": 6,
            "beitun": 6,
            "nantun": 4
          }
        },
        {
          "title": "숙소 주변 할 것 없음",
          "desc": "",
          "scores": {
            "xitun": 6,
            "station": 5,
            "west": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "desc": "",
          "scores": {
            "station": 5,
            "nantun": 5,
            "wuri": 4
          }
        }
      ]
    }
  ]
};

    let currentQuestionIndex = 0;
    let answers = new Array(cityConfig.questions.length).fill(null);

    const locationPage = document.getElementById("locationPage");
    const surveyWrap = document.querySelector(".wt-survey-wrap");
    const surveyView = document.getElementById("surveyView");
    const resultView = document.getElementById("resultView");
    const startSurveyBtn = document.getElementById("startSurveyBtn");
    const backBtn = document.getElementById("backBtn");
    const questionCount = document.getElementById("questionCount");
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");
    const progressFill = document.getElementById("progressFill");
    const questionTitle = document.getElementById("questionTitle");
    const questionHelp = document.getElementById("questionHelp");
    const optionsArea = document.getElementById("optionsArea");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resetBtn = document.getElementById("resetBtn");

    function setText(id, text) {
      const element = document.getElementById(id);
      if (element) element.textContent = text;
    }

    function fillList(id, items) {
      const target = document.getElementById(id);
      target.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        target.appendChild(li);
      });
    }

    function getAnsweredPercent() {
      const answeredCount = answers.filter((answer) => answer !== null).length;
      return Math.round((answeredCount / cityConfig.questions.length) * 100);
    }

    function getProgressMessage() {
      const total = cityConfig.questions.length;
      const step = currentQuestionIndex + 1;

      if (step === 1) return "가볍게 시작해볼까요?";
      if (step === total) return "마지막 질문이에요!";
      if (step >= total - 1) return "거의 다 왔어요";
      if (step >= Math.ceil(total * 0.65)) return "조금만 더 가면 추천 완료!";
      if (step >= Math.ceil(total * 0.4)) return "좋아요, 취향이 보이기 시작해요";
      return "동선을 하나씩 맞춰보는 중이에요";
    }

    function startSurvey() {
      locationPage?.classList.add("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      surveyWrap?.classList.add("is-survey-started");
      surveyWrap?.classList.remove("is-result-mode");
      resultView?.classList.remove("is-active");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function goBack() {
      window.history.back();
    }

    function closeSurveyToStart() {
      currentQuestionIndex = 0;
      answers = new Array(cityConfig.questions.length).fill(null);
      resultView?.classList.remove("is-active");
      surveyWrap?.classList.remove("is-result-mode");
      surveyWrap?.classList.remove("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      locationPage?.classList.remove("is-survey-started");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
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

        button.type = "button";
        button.className = "wt-option";
        button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");

        if (selectedIndex === optionIndex) {
          button.classList.add("is-selected");
        }

        title.className = "wt-option-title";
        title.textContent = option.title;

        button.appendChild(title);
        button.addEventListener("click", () => {
          answers[currentQuestionIndex] = optionIndex;
          renderQuestion();
        });

        optionsArea.appendChild(button);
      });

      prevBtn.disabled = false;
      prevBtn.textContent = currentQuestionIndex === 0 ? "닫기" : "이전";
      nextBtn.disabled = selectedIndex === null;
      nextBtn.textContent = currentQuestionIndex === cityConfig.questions.length - 1 ? "결과 보기" : "다음";
    }

    function goNext() {
      if (answers[currentQuestionIndex] === null) return;

      if (currentQuestionIndex < cityConfig.questions.length - 1) {
        currentQuestionIndex += 1;
        renderQuestion();
        questionTitle.focus?.();
      } else {
        showResult();
      }
    }

    function goPrev() {
      if (currentQuestionIndex === 0) {
        closeSurveyToStart();
        return;
      }
      currentQuestionIndex -= 1;
      renderQuestion();
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

function applyAccuracyAdjustments(scores) {
  const firstTrip = answerIs(0, "처음이에요");
  const repeatTrip = answerIs(0, "두 번째 이상");
  const familyTrip = answerIs(0, "가족과 함께");
  const coupleFriendsTrip = answerIs(0, "커플·친구 여행");

  const oldTown = answerIs(1, "타이중역·구시가지");
  const fengjiaNight = answerIs(1, "펑지아 야시장");
  const cafeWalk = answerIs(1, "카페·공원 산책");
  const theaterShopping = answerIs(1, "국립가극원·쇼핑몰");

  const coastVillage = answerIs(2, "고미습지·무지개마을");
  const nantouMove = answerIs(2, "르웨탄·칭징 이동");
  const cityCenterOnly = answerIs(2, "시내 중심");
  const undecidedItinerary = answerIs(2, "아직 미정");

  const livelyArea = answerIs(3, "활기 있는 번화가");
  const calmCity = answerIs(3, "차분한 도심");
  const quietNeighborhood = answerIs(3, "조용한 동네");
  const transportFirst = answerIs(3, "교통 우선형");

  const soloOrFriends = answerIs(4, "혼자 또는 친구");
  const couple = answerIs(4, "커플");
  const parents = answerIs(4, "부모님 동반");
  const kids = answerIs(4, "아이와 함께");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelMoodFirst = answerIs(5, "호텔 분위기 우선");

  const avoidHsrStress = answerIs(6, "공항·고속철도 이동 스트레스");
  const avoidNoiseCrowd = answerIs(6, "밤 소음과 혼잡");
  const avoidNothingNearby = answerIs(6, "숙소 주변 할 것 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  if (firstTrip && (oldTown || transportFirst || undecidedItinerary || locationFirst)) addAreaScore(scores, "station", 5);
  if ((parents || kids || familyTrip) && (oldTown || undecidedItinerary || avoidLongMove)) addAreaScore(scores, "station", 2);
  if (coastVillage && (transportFirst || locationFirst)) addAreaScore(scores, "station", 2);

  if ((fengjiaNight || livelyArea || avoidNothingNearby) && (soloOrFriends || coupleFriendsTrip || firstTrip)) addAreaScore(scores, "xitun", 6);
  if (livelyArea && !avoidNoiseCrowd) addAreaScore(scores, "xitun", 3);
  if (avoidNoiseCrowd || quietNeighborhood) addAreaScore(scores, "xitun", -3);

  if ((cafeWalk || calmCity || quietNeighborhood || balanceBudget) && !fengjiaNight) addAreaScore(scores, "west", 5);
  if (couple && (cafeWalk || hotelMoodFirst || calmCity)) addAreaScore(scores, "west", 3);
  if (repeatTrip && (cafeWalk || calmCity)) addAreaScore(scores, "west", 2);

  if ((theaterShopping || hotelMoodFirst) && (parents || kids || familyTrip || couple)) addAreaScore(scores, "nantun", 7);
  if (theaterShopping && locationFirst) addAreaScore(scores, "nantun", 4);
  if (budgetSave && !theaterShopping) addAreaScore(scores, "nantun", -1);

  if ((quietNeighborhood || avoidNoiseCrowd) && (parents || kids || familyTrip || balanceBudget)) addAreaScore(scores, "beitun", 5);
  if (budgetSave && quietNeighborhood) addAreaScore(scores, "beitun", 2);
  if (firstTrip && !quietNeighborhood && !familyTrip) addAreaScore(scores, "beitun", -2);

  if (nantouMove || avoidHsrStress || transportFirst) addAreaScore(scores, "wuri", 6);
  if (coastVillage && (avoidLongMove || locationFirst)) addAreaScore(scores, "wuri", 4);
  if ((cityCenterOnly || fengjiaNight || cafeWalk) && !nantouMove && !avoidHsrStress) addAreaScore(scores, "wuri", -3);
}

    
function getTieBreakPriority(areaKey) {
  const order = Object.keys(cityConfig.areas);
  const reverseIndex = order.length - order.indexOf(areaKey);
  return reverseIndex;
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
          scores[areaKey] += score;
        });
      });

      applyAccuracyAdjustments(scores);

      return Object.entries(scores)
        .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
        .sort((a, b) => (b.score - a.score) || (getTieBreakPriority(b.key) - getTieBreakPriority(a.key)));
    }



    function renderHotelCards(area) {
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
      setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔 후보입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 확인하세요.");
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

    async function renderRelatedPosts(area) {
      const section = document.getElementById("relatedPostSection");
      const list = document.getElementById("relatedPostList");

      if (!section || !list) return;

      section.style.display = "none";
      list.innerHTML = "";
      setText("relatedPostTitle", `${area.name} 여행 스타일별 호텔 추천 글`);
      setText("relatedPostDesc", "현재 추천된 지역에 연결된 여행 스타일별 호텔 추천 글만 보여줍니다.");

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

    function normalizeResultReasons(area, reasons) {
      const next = Array.isArray(reasons) ? [...reasons] : [];
      if (next.length < 4) {
        const cautionText = [area.compareCaution, area.mismatchNote]
          .filter(Boolean)
          .join(" ") || "추천 지역도 일정 성격에 따라 장단점이 달라집니다. 호텔 예약 전 이동 시간, 주변 분위기, 최근 후기를 함께 확인하세요.";
        next.push({ title: "주의할 점도 함께 보세요", text: cautionText });
      }
      return next.slice(0, 4);
    }

    function getPersuasiveContent(area, rankedAreas) {
      const contents = {};

      const content = contents[area.key] || {
        intro: area.summary,
        reasons: [
          { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary },
          { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "숙소 위치를 먼저 정하면 하루 동선이 훨씬 단순해집니다." },
          { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 후기 비교가 훨씬 쉬워집니다." }
        ],
        conclusionTitle: `${area.name}을 중심으로 호텔을 비교해보세요.`,
        conclusionText: "추천 지역 안에서 역 접근성, 주변 분위기, 최근 후기를 같이 확인하면 실패 확률을 줄일 수 있습니다."
      };

          const fitText = getScoreFitSentence(rankedAreas);
      const alternativeText = getAlternativeSentence(area, rankedAreas);

      return {
        ...content,
        reasons: normalizeResultReasons(area, content.reasons),
        intro: [content.intro, fitText].filter(Boolean).join(" "),
        conclusionText: [content.conclusionText, alternativeText].filter(Boolean).join(" ")
      };
    }

    function getMatchedAnswers(areaKey) {
      return answers
        .map((answerIndex, questionIndex) => {
          if (answerIndex === null) return null;
          const question = cityConfig.questions[questionIndex];
          const option = question.options[answerIndex];
          const score = option.scores?.[areaKey] || 0;
          if (score <= 0) return null;
          return { title: option.title, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
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

    function showResult() {
      const rankedAreas = calculateScores();
      const topArea = rankedAreas[0];

      locationPage?.classList.add("is-survey-started");
      locationPage?.classList.add("is-result-mode");
      surveyView.style.display = "none";
      resultView.classList.add("is-active");
      surveyWrap.classList.add("is-survey-started");
      surveyWrap.classList.add("is-result-mode");

      setText("resultTitle", topArea.name);
      setText("resultSummary", topArea.summary);
      setText("resultLeadTitle", topArea.leadTitle);
      setText("resultLeadText", topArea.leadText);

      renderPersuasiveResult(topArea, rankedAreas);
      renderHotelCards(topArea);
      renderRelatedPosts(topArea);


      progressText.textContent = "추천 결과가 나왔어요!";
      progressFill.style.width = "100%";
      progressBar.setAttribute("aria-valuenow", "100");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function resetSurvey() {
      currentQuestionIndex = 0;
      answers = new Array(cityConfig.questions.length).fill(null);
      resultView.classList.remove("is-active");
      surveyWrap.classList.remove("is-result-mode");
      surveyWrap.classList.remove("is-survey-started");
      locationPage?.classList.remove("is-result-mode");
      locationPage?.classList.remove("is-survey-started");
      surveyView.style.display = "block";
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    startSurveyBtn?.addEventListener("click", startSurvey);
    backBtn?.addEventListener("click", goBack);
    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);
    resetBtn.addEventListener("click", resetSurvey);

    renderQuestion();
  