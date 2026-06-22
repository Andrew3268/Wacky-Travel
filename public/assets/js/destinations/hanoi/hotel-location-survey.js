/* Hanoi hotel location survey logic. */
const cityConfig = {
  "cityName": "하노이",
  "destinationSlug": "hanoi",
  "areas": {
    "oldquarter": {
      "name": "호안끼엠·올드쿼터",
      "regionSlug": "old-quarter",
      "regionSlugAliases": [
        "호안끼엠·올드쿼터",
        "호안끼엠"
      ],
      "label": "첫 여행 · 맛집 · 도보 이동",
      "summary": "처음 가는 하노이라면 호안끼엠 호수와 올드쿼터를 기준으로 잡는 편이 가장 쉽습니다.",
      "leadTitle": "처음 가는 여행자가 가장 먼저 기준으로 잡기 좋은 위치입니다.",
      "leadText": "하노이는 골목 동선이 촘촘해도 대표 여행지는 호안끼엠과 올드쿼터를 기준으로 잡으면 훨씬 단순해집니다. 짧은 일정, 길거리 음식, 카페, 야간 산책, 닌빈·하롱베이 투어 픽업까지 한 번에 묶기 좋습니다.",
      "stayRange": [
        "맥주거리와 야시장 바로 앞 저층 객실은 밤 소음 후기를 확인하세요.",
        "호안끼엠 호수 북쪽·동쪽·서쪽은 실제 분위기가 달라 실제 지도 위치를 확인하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "골목이 좁고 밤에는 소음이 있을 수 있어 객실 방음과 엘리베이터 여부를 확인해야 합니다.",
        "조용한 숙면, 리조트형 휴식, 넓은 객실을 우선한다면 올드쿼터보다 프렌치쿼터나 서호가 더 나을 수 있습니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "첫 하노이 여행",
        "2박 3일 짧은 일정",
        "맛집·카페 중심",
        "하롱베이·닌빈 투어 픽업"
      ],
      "notFor": [
        "조용한 휴식 최우선",
        "넓은 객실 우선",
        "밤 소음에 민감한 가족 여행"
      ],
      "bookingTips": [
        "맥주거리와 야시장 바로 앞 저층 객실은 밤 소음 후기를 확인하세요.",
        "호안끼엠 호수 북쪽·동쪽·서쪽은 실제 분위기가 달라 실제 지도 위치를 확인하세요.",
        "투어 픽업을 이용한다면 호텔 주소가 픽업 가능 구역인지 먼저 확인하세요."
      ],
      "chips": [
        "첫 여행",
        "맛집",
        "카페",
        "도보",
        "투어 픽업"
      ],
      "compareGood": "대표 명소, 길거리 음식, 카페, 투어 픽업 경로를 가장 쉽게 묶을 수 있습니다.",
      "compareCaution": "골목이 좁고 밤에는 소음이 있을 수 있어 객실 방음과 엘리베이터 여부를 확인해야 합니다.",
      "mismatchNote": "조용한 숙면, 리조트형 휴식, 넓은 객실을 우선한다면 올드쿼터보다 프렌치쿼터나 서호가 더 나을 수 있습니다.",
      "links": [
        {
          "title": "하노이 호안끼엠 호텔 추천 TOP5",
          "url": "/post/hanoi-old-quarter-hotels"
        },
        {
          "title": "하노이 호안끼엠 숙소 위치 가이드",
          "url": "/post/hanoi-old-quarter-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "La Siesta Premium Hang Be",
          "tag": "올드쿼터 중심",
          "location": "호안끼엠·올드쿼터",
          "reason": "호안끼엠 호수와 올드쿼터 식당 동선을 짧게 묶기 좋은 부티크형 선택지입니다.",
          "meta": [
            "첫 여행",
            "도보 이동",
            "부티크"
          ],
          "url": "/post/la-siesta-premium-hang-be"
        },
        {
          "name": "The Oriental Jade Hotel",
          "tag": "호수 접근",
          "location": "호안끼엠 호수 주변",
          "reason": "호수 산책과 올드쿼터 접근성을 함께 보고 싶은 여행자에게 어울립니다.",
          "meta": [
            "호안끼엠",
            "커플",
            "중심"
          ],
          "url": "/post/the-oriental-jade-hotel"
        },
        {
          "name": "Hanoi Tirant Hotel",
          "tag": "실속 중심",
          "location": "올드쿼터",
          "reason": "짧은 일정에서 위치와 가격 균형을 함께 볼 때 비교하기 좋습니다.",
          "meta": [
            "실속",
            "첫 여행",
            "야시장"
          ],
          "url": "/post/hanoi-tirant-hotel"
        },
        {
          "name": "JM Marvel Hotel & Spa",
          "tag": "스파·중심",
          "location": "올드쿼터 서쪽",
          "reason": "마사지와 카페, 대표 관광 동선을 함께 챙기기 좋은 선택지입니다.",
          "meta": [
            "스파",
            "맛집",
            "커플"
          ],
          "url": "/post/jm-marvel-hotel-spa"
        },
        {
          "name": "Peridot Grand Luxury Boutique Hotel",
          "tag": "상급 부티크",
          "location": "올드쿼터 인근",
          "reason": "중심 접근성과 숙소 만족도를 함께 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "부티크",
            "컨디션",
            "중심"
          ],
          "url": "/post/peridot-grand-luxury-boutique-hotel"
        }
      ]
    },
    "french": {
      "name": "프렌치쿼터·오페라하우스",
      "regionSlug": "french-quarter",
      "regionSlugAliases": [
        "프렌치쿼터·오페라하우스",
        "프렌치쿼터"
      ],
      "label": "깔끔한 중심 · 부모님 · 고급 호텔",
      "summary": "올드쿼터 접근성은 유지하면서 더 정돈된 거리, 고급 호텔, 호안끼엠 남쪽 산책 동선을 기대하기 좋은 구역입니다.",
      "leadTitle": "중심 접근성과 숙소 만족도의 균형이 좋습니다.",
      "leadText": "오페라하우스, 호안끼엠 남쪽, 짱띠엔 플라자, 박물관 동선과 잘 맞습니다. 첫 여행이어도 번잡한 골목보다 깔끔한 도심 분위기를 선호한다면 올드쿼터와 함께 비교하세요.",
      "stayRange": [
        "오페라하우스·호안끼엠 남쪽·짱띠엔 쪽 중 실제 위치를 구분하세요.",
        "고급 호텔은 객실 전망과 조식 포함 여부를 함께 확인하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "올드쿼터 한복판보다 가격대가 높고 밤거리 선택지는 상대적으로 적습니다.",
        "맥주거리와 야시장 중심의 활기찬 밤 일정을 원한다면 올드쿼터가 더 편합니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "커플 여행",
        "부모님 동반",
        "기념일 여행",
        "호텔 컨디션을 중요하게 보는 여행"
      ],
      "notFor": [
        "예산 최우선",
        "맥주거리 중심 밤 일정",
        "로컬 골목 분위기 선호"
      ],
      "bookingTips": [
        "오페라하우스·호안끼엠 남쪽·짱띠엔 쪽 중 실제 위치를 구분하세요.",
        "고급 호텔은 객실 전망과 조식 포함 여부를 함께 확인하세요.",
        "올드쿼터를 자주 갈 계획이면 도보 10~15분 이내인지 보세요."
      ],
      "chips": [
        "부모님",
        "커플",
        "고급 호텔",
        "산책",
        "호수"
      ],
      "compareGood": "정돈된 도심 분위기와 중심 접근성을 함께 챙길 수 있습니다.",
      "compareCaution": "올드쿼터 한복판보다 가격대가 높고 밤거리 선택지는 상대적으로 적습니다.",
      "mismatchNote": "맥주거리와 야시장 중심의 활기찬 밤 일정을 원한다면 올드쿼터가 더 편합니다.",
      "links": [
        {
          "title": "하노이 프렌치쿼터 호텔 추천 TOP5",
          "url": "/post/hanoi-french-quarter-hotels"
        },
        {
          "title": "하노이 프렌치쿼터 숙소 위치 가이드",
          "url": "/post/hanoi-french-quarter-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Sofitel Legend Metropole Hanoi",
          "tag": "클래식 럭셔리",
          "location": "오페라하우스 주변",
          "reason": "하노이의 역사적인 호텔 분위기와 중심 접근성을 함께 보는 대표 선택지입니다.",
          "meta": [
            "럭셔리",
            "기념일",
            "부모님"
          ],
          "url": "/post/sofitel-legend-metropole-hanoi"
        },
        {
          "name": "Capella Hanoi",
          "tag": "감성 럭셔리",
          "location": "오페라하우스 인근",
          "reason": "특별한 일정에서 디자인 호텔 경험을 원할 때 비교하기 좋습니다.",
          "meta": [
            "럭셔리",
            "커플",
            "오페라하우스"
          ],
          "url": "/post/capella-hanoi"
        },
        {
          "name": "Hotel de l'Opera Hanoi - MGallery",
          "tag": "오페라하우스 동선",
          "location": "프렌치쿼터",
          "reason": "프렌치쿼터 산책과 중심 관광을 안정적으로 묶기 좋습니다.",
          "meta": [
            "중심",
            "컨디션",
            "산책"
          ],
          "url": "/post/hotel-de-lopera-hanoi-mgallery"
        },
        {
          "name": "Apricot Hotel",
          "tag": "호안끼엠 전망",
          "location": "호안끼엠 남쪽",
          "reason": "호수 산책과 아트 감성 호텔 분위기를 함께 원하는 여행자에게 맞습니다.",
          "meta": [
            "호수",
            "커플",
            "전망"
          ],
          "url": "/post/apricot-hotel-hanoi"
        },
        {
          "name": "Meliá Hanoi",
          "tag": "도심 대형 호텔",
          "location": "호안끼엠 남서쪽",
          "reason": "대형 호텔 안정감과 프렌치쿼터 접근성을 함께 볼 수 있습니다.",
          "meta": [
            "대형 호텔",
            "부모님",
            "비즈니스"
          ],
          "url": "/post/melia-hanoi"
        }
      ]
    },
    "westlake": {
      "name": "서호·타이호",
      "regionSlug": "west-lake",
      "regionSlugAliases": [
        "서호·타이호",
        "서호"
      ],
      "label": "조용한 휴식 · 호수 전망 · 장기 일정",
      "summary": "호수 산책, 카페, 레스토랑, 숙소에서 쉬는 시간을 중요하게 보는 재방문·장기 일정에 잘 맞습니다.",
      "leadTitle": "하노이를 천천히 머물고 싶은 여행자에게 좋습니다.",
      "leadText": "서호 주변은 올드쿼터보다 여유롭고 호텔 객실과 부대시설 선택지가 넓은 편입니다. 중심 관광을 매일 빠르게 훑기보다 호수 산책, 카페, 숙소 휴식이 중요한 일정에 어울립니다.",
      "stayRange": [
        "서호는 넓기 때문에 타이호·쑤언지에우·쩐부 방향을 구분하세요.",
        "올드쿼터 이동은 택시·그랩 기준으로 계산하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "대표 관광지를 매일 다니면 이동 시간이 누적될 수 있습니다.",
        "2박 3일 첫 여행이라면 서호 전체 숙박보다 첫날·마지막날 일부 일정에 넣는 편이 더 효율적일 수 있습니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "조용한 휴식",
        "장기 일정",
        "가족 여행",
        "호수 전망·카페 여행"
      ],
      "notFor": [
        "대표 관광만 빠르게 둘러보기",
        "도보 중심 여행",
        "예산 최우선"
      ],
      "bookingTips": [
        "서호는 넓기 때문에 타이호·쑤언지에우·쩐부 방향을 구분하세요.",
        "올드쿼터 이동은 택시·그랩 기준으로 계산하세요.",
        "호수 전망 객실은 전망 보장 여부를 확인하세요."
      ],
      "chips": [
        "조용함",
        "호수",
        "장기",
        "가족",
        "카페"
      ],
      "compareGood": "번잡함을 줄이고 숙소 체류 만족도와 여유로운 동네 분위기를 기대하기 좋습니다.",
      "compareCaution": "대표 관광지를 매일 다니면 이동 시간이 누적될 수 있습니다.",
      "mismatchNote": "2박 3일 첫 여행이라면 서호 전체 숙박보다 첫날·마지막날 일부 일정에 넣는 편이 더 효율적일 수 있습니다.",
      "links": [
        {
          "title": "하노이 서호 호텔 추천 TOP5",
          "url": "/post/hanoi-west-lake-hotels"
        },
        {
          "title": "하노이 서호 숙소 위치 가이드",
          "url": "/post/hanoi-west-lake-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "InterContinental Hanoi Westlake",
          "tag": "호수 위 숙소",
          "location": "서호",
          "reason": "호수 전망과 리조트형 분위기를 원할 때 먼저 비교해볼 만합니다.",
          "meta": [
            "호수",
            "휴식",
            "커플"
          ],
          "url": "/post/intercontinental-hanoi-westlake"
        },
        {
          "name": "Pan Pacific Hanoi",
          "tag": "서호·쭉박 균형",
          "location": "서호 남쪽",
          "reason": "서호와 구시가지 사이의 접근성을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "전망",
            "도심 접근",
            "부모님"
          ],
          "url": "/post/pan-pacific-hanoi"
        },
        {
          "name": "Sheraton Hanoi Hotel",
          "tag": "안정형 대형 호텔",
          "location": "서호",
          "reason": "부대시설과 조용한 숙박을 함께 원하는 가족 여행에 맞습니다.",
          "meta": [
            "가족",
            "대형 호텔",
            "휴식"
          ],
          "url": "/post/sheraton-hanoi-hotel"
        },
        {
          "name": "Elegant Suites Westlake",
          "tag": "레지던스형",
          "location": "타이호",
          "reason": "넓은 객실과 장기 숙박 편의성을 볼 때 비교해볼 만합니다.",
          "meta": [
            "레지던스",
            "장기",
            "가족"
          ],
          "url": "/post/elegant-suites-westlake"
        },
        {
          "name": "The Hanoi Club Hotel & Residences",
          "tag": "실속 레지던스",
          "location": "서호 남쪽",
          "reason": "서호 분위기와 객실 여유를 실속 있게 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "실속",
            "레지던스",
            "호수"
          ],
          "url": "/post/the-hanoi-club-hotel-residences"
        }
      ]
    },
    "badinh": {
      "name": "바딘·롯데센터",
      "regionSlug": "ba-dinh",
      "regionSlugAliases": [
        "바딘·롯데센터",
        "바딘"
      ],
      "label": "가족 · 대형 호텔 · 박물관 동선",
      "summary": "호찌민 묘소, 문묘, 박물관, 롯데센터 주변을 묶기 좋고 대형 호텔과 안정적인 숙박 후보가 많은 구역입니다.",
      "leadTitle": "가족·부모님 동반에서 안정감 있게 비교하기 좋습니다.",
      "leadText": "바딘은 올드쿼터의 골목 분위기와는 다르게 도로 폭이 넓고 대형 호텔, 레지던스, 박물관 동선이 어울립니다. 아이 또는 부모님과 함께라면 객실 컨디션과 차량 이동 편의성 면에서 비교해볼 만합니다.",
      "stayRange": [
        "롯데센터 주변과 호찌민 묘소 주변은 분위기가 다르므로 위치를 나눠 보세요.",
        "주요 관광지까지는 그랩 이동을 전제로 계산하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "올드쿼터처럼 걸어서 밤 일정을 이어가기에는 불편할 수 있습니다.",
        "첫 여행에서 길거리 음식과 밤 산책이 중심이면 호안끼엠이 더 편합니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "가족 여행",
        "부모님 동반",
        "대형 호텔 선호",
        "박물관·문묘 일정"
      ],
      "notFor": [
        "올드쿼터 도보 중심",
        "밤거리 중심",
        "예산 최우선 배낭 여행"
      ],
      "bookingTips": [
        "롯데센터 주변과 호찌민 묘소 주변은 분위기가 다르므로 위치를 나눠 보세요.",
        "주요 관광지까지는 그랩 이동을 전제로 계산하세요.",
        "가족 여행은 커넥팅룸·조식·수영장 조건을 함께 확인하세요."
      ],
      "chips": [
        "가족",
        "대형 호텔",
        "부모님",
        "박물관",
        "안정감"
      ],
      "compareGood": "대형 호텔 안정감과 박물관·문묘·롯데센터 동선을 함께 기대할 수 있습니다.",
      "compareCaution": "올드쿼터처럼 걸어서 밤 일정을 이어가기에는 불편할 수 있습니다.",
      "mismatchNote": "첫 여행에서 길거리 음식과 밤 산책이 중심이면 호안끼엠이 더 편합니다.",
      "links": [
        {
          "title": "하노이 바딘 호텔 추천 TOP5",
          "url": "/post/hanoi-ba-dinh-hotels"
        },
        {
          "title": "하노이 바딘 숙소 위치 가이드",
          "url": "/post/hanoi-ba-dinh-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Lotte Hotel Hanoi",
          "tag": "전망·대형 호텔",
          "location": "롯데센터",
          "reason": "객실 컨디션과 전망, 쇼핑몰 접근성을 함께 보는 가족 여행에 좋습니다.",
          "meta": [
            "전망",
            "가족",
            "쇼핑몰"
          ],
          "url": "/post/lotte-hotel-hanoi"
        },
        {
          "name": "Hanoi Daewoo Hotel",
          "tag": "전통 대형 호텔",
          "location": "바딘·김마",
          "reason": "대형 호텔 안정감과 바딘권 이동을 함께 기대할 수 있습니다.",
          "meta": [
            "대형 호텔",
            "부모님",
            "수영장"
          ],
          "url": "/post/hanoi-daewoo-hotel"
        },
        {
          "name": "Grand Vista Hanoi",
          "tag": "컨디션 균형",
          "location": "바딘",
          "reason": "도심 이동과 객실 컨디션을 함께 보고 싶을 때 비교해볼 만합니다.",
          "meta": [
            "도심",
            "컨디션",
            "가족"
          ],
          "url": "/post/grand-vista-hanoi"
        },
        {
          "name": "Dolce by Wyndham Hanoi Golden Lake",
          "tag": "개성형 고급 호텔",
          "location": "바딘",
          "reason": "특색 있는 숙소 경험과 대형 호텔 분위기를 함께 고려할 때 비교할 수 있습니다.",
          "meta": [
            "개성",
            "고급",
            "가족"
          ],
          "url": "/post/dolce-by-wyndham-hanoi-golden-lake"
        },
        {
          "name": "Super Hotel Candle",
          "tag": "레지던스형 실속",
          "location": "바딘",
          "reason": "장기 일정이나 가족형 객실을 실속 있게 볼 때 어울립니다.",
          "meta": [
            "레지던스",
            "실속",
            "장기"
          ],
          "url": "/post/super-hotel-candle-hanoi"
        }
      ]
    },
    "dongda": {
      "name": "동다·문묘·기차거리",
      "regionSlug": "dong-da",
      "regionSlugAliases": [
        "동다·문묘·기차거리",
        "동다"
      ],
      "label": "가성비 · 로컬 동선 · 기차역",
      "summary": "올드쿼터 접근성은 유지하면서 숙박비와 차분한 로컬 분위기의 균형을 잡기 좋은 현실적인 선택지입니다.",
      "leadTitle": "가격과 중심 접근성의 균형을 보고 싶을 때 좋습니다.",
      "leadText": "동다와 하노이역 주변은 문묘, 기차거리, 로컬 식당, 서쪽 도심 이동을 함께 고려하기 좋습니다. 올드쿼터 한복판보다 차분하게 머물고 싶지만 너무 멀어지고 싶지 않은 일정에 맞습니다.",
      "stayRange": [
        "하노이역 주변은 골목·도로 환경이 달라 실제 도보 이동을 보세요.",
        "기차거리 방문은 운영·통제 상황이 바뀔 수 있어 현지 안내를 확인하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "대표 명소를 모두 걸어서 해결하기에는 올드쿼터보다 실제 접근성이 낮습니다.",
        "처음 방문이고 일정이 짧다면 동다를 1순위보다 2순위 대안으로 두는 편이 안전합니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "가성비",
        "재방문",
        "기차역 이용",
        "문묘·기차거리 일정"
      ],
      "notFor": [
        "완전 도보 중심 첫 여행",
        "럭셔리 호텔만 비교",
        "호수 전망 휴식"
      ],
      "bookingTips": [
        "하노이역 주변은 골목·도로 환경이 달라 실제 도보 이동을 보세요.",
        "기차거리 방문은 운영·통제 상황이 바뀔 수 있어 현지 안내를 확인하세요.",
        "밤 일정이 많다면 올드쿼터까지의 택시 동선을 계산하세요."
      ],
      "chips": [
        "가성비",
        "기차역",
        "문묘",
        "로컬",
        "재방문"
      ],
      "compareGood": "숙박비 부담을 낮추면서 중심 접근성을 크게 잃지 않을 수 있습니다.",
      "compareCaution": "대표 명소를 모두 걸어서 해결하기에는 올드쿼터보다 실제 접근성이 낮습니다.",
      "mismatchNote": "처음 방문이고 일정이 짧다면 동다를 1순위보다 2순위 대안으로 두는 편이 안전합니다.",
      "links": [
        {
          "title": "하노이 동다 호텔 추천 TOP5",
          "url": "/post/hanoi-dong-da-hotels"
        },
        {
          "title": "하노이 동다 숙소 위치 가이드",
          "url": "/post/hanoi-dong-da-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Grand Mercure Hanoi",
          "tag": "문묘 인근",
          "location": "동다",
          "reason": "문묘와 바딘, 호안끼엠 접근성을 함께 보는 상급 선택지입니다.",
          "meta": [
            "문묘",
            "컨디션",
            "도심"
          ],
          "url": "/post/grand-mercure-hanoi"
        },
        {
          "name": "Pullman Hanoi",
          "tag": "대형 호텔",
          "location": "동다·깟린",
          "reason": "대형 호텔 안정감과 서쪽 도심 이동을 함께 고려할 수 있습니다.",
          "meta": [
            "대형 호텔",
            "비즈니스",
            "가족"
          ],
          "url": "/post/pullman-hanoi"
        },
        {
          "name": "Mövenpick Hotel Hanoi Centre",
          "tag": "하노이역 접근",
          "location": "호안끼엠 서쪽",
          "reason": "기차역, 문묘, 호안끼엠 접근성을 균형 있게 보고 싶을 때 좋습니다.",
          "meta": [
            "기차역",
            "중심",
            "컨디션"
          ],
          "url": "/post/movenpick-hotel-hanoi-centre"
        },
        {
          "name": "SOJO Hotel Ga Hanoi",
          "tag": "기차역 실속",
          "location": "하노이역 주변",
          "reason": "기차 이동과 실속형 숙박을 함께 보는 일정에 어울립니다.",
          "meta": [
            "기차역",
            "실속",
            "짧은 일정"
          ],
          "url": "/post/sojo-hotel-ga-hanoi"
        },
        {
          "name": "Nesta Hotel Hanoi",
          "tag": "도심 실속",
          "location": "하노이역 인근",
          "reason": "가격과 도심 접근성의 균형을 볼 때 비교할 만합니다.",
          "meta": [
            "실속",
            "도심",
            "재방문"
          ],
          "url": "/post/nesta-hotel-hanoi"
        }
      ]
    },
    "mydinh": {
      "name": "미딩·꺼우저이",
      "regionSlug": "my-dinh-cau-giay",
      "regionSlugAliases": [
        "미딩·꺼우저이",
        "미딩"
      ],
      "label": "출장 · 한인타운 · 서쪽 일정",
      "summary": "한인 식당, 비즈니스 일정, 컨벤션·서쪽 도심 이동이 중심인 여행자에게 실용적인 숙박권역입니다.",
      "leadTitle": "관광보다 목적지가 서쪽에 있을 때 강점이 있습니다.",
      "leadText": "미딩과 꺼우저이는 하노이 대표 관광지와는 거리가 있지만 한인 식당, 업무 일정, 서쪽 쇼핑몰, 대형 호텔 선택지가 많습니다. 관광형 첫 여행보다는 출장·장기 체류·가족 방문 일정에 더 잘 맞습니다.",
      "stayRange": [
        "호안끼엠까지 이동 시간을 매일 계산하세요.",
        "목적지가 미딩·남뜨리엠·꺼우저이 중 어디인지 정확히 확인하세요.",
        "매일 이동할 목적지와의 실제 이동 시간을 확인하세요."
      ],
      "avoidRange": [
        "하노이 관광 중심 여행에서는 매번 시내 이동이 부담될 수 있습니다.",
        "관광 일정이 대부분 호안끼엠·올드쿼터라면 미딩은 숙박 1순위가 아닙니다.",
        "최근 후기에서 소음·청결·엘리베이터 언급을 확인하세요."
      ],
      "bestFor": [
        "출장",
        "장기 체류",
        "한인타운 이동",
        "서쪽 업무·쇼핑 일정"
      ],
      "notFor": [
        "첫 여행 대표 관광",
        "올드쿼터 밤거리",
        "도보 중심 여행"
      ],
      "bookingTips": [
        "호안끼엠까지 이동 시간을 매일 계산하세요.",
        "목적지가 미딩·남뜨리엠·꺼우저이 중 어디인지 정확히 확인하세요.",
        "출장 일정이면 교통 체증 시간대를 피해서 동선을 잡으세요."
      ],
      "chips": [
        "출장",
        "한인타운",
        "장기",
        "비즈니스",
        "서쪽"
      ],
      "compareGood": "서쪽 일정과 한인타운 생활 편의성이 중요할 때 이동 피로를 줄일 수 있습니다.",
      "compareCaution": "하노이 관광 중심 여행에서는 매번 시내 이동이 부담될 수 있습니다.",
      "mismatchNote": "관광 일정이 대부분 호안끼엠·올드쿼터라면 미딩은 숙박 1순위가 아닙니다.",
      "links": [
        {
          "title": "하노이 미딩 호텔 추천 TOP5",
          "url": "/post/hanoi-my-dinh-cau-giay-hotels"
        },
        {
          "title": "하노이 미딩 숙소 위치 가이드",
          "url": "/post/hanoi-my-dinh-cau-giay-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "InterContinental Hanoi Landmark72",
          "tag": "랜드마크72",
          "location": "남뜨리엠",
          "reason": "서쪽 도심 전망과 대형 호텔 컨디션을 중요하게 볼 때 대표 선택지입니다.",
          "meta": [
            "출장",
            "전망",
            "대형 호텔"
          ],
          "url": "/post/intercontinental-hanoi-landmark72"
        },
        {
          "name": "JW Marriott Hotel Hanoi",
          "tag": "컨벤션·럭셔리",
          "location": "남뜨리엠",
          "reason": "출장, 컨벤션, 고급 숙소 경험을 함께 보는 일정에 맞습니다.",
          "meta": [
            "럭셔리",
            "출장",
            "컨벤션"
          ],
          "url": "/post/jw-marriott-hotel-hanoi"
        },
        {
          "name": "Hyatt Regency West Hanoi",
          "tag": "서쪽 안정형",
          "location": "미딩",
          "reason": "미딩·서쪽 업무 일정과 호텔 안정감을 함께 볼 수 있습니다.",
          "meta": [
            "미딩",
            "출장",
            "가족"
          ],
          "url": "/post/hyatt-regency-west-hanoi"
        },
        {
          "name": "Novotel Suites Hanoi",
          "tag": "장기 체류",
          "location": "꺼우저이",
          "reason": "레지던스형 편의와 서쪽 도심 접근성을 함께 원하는 분께 어울립니다.",
          "meta": [
            "레지던스",
            "장기",
            "출장"
          ],
          "url": "/post/novotel-suites-hanoi"
        },
        {
          "name": "Grand Plaza Hanoi Hotel",
          "tag": "대형 실속",
          "location": "꺼우저이",
          "reason": "서쪽 쇼핑·업무 이동과 대형 호텔을 실속 있게 비교할 때 비교해볼 만합니다.",
          "meta": [
            "대형 호텔",
            "실속",
            "서쪽"
          ],
          "url": "/post/grand-plaza-hanoi-hotel"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "하노이 여행은 몇 번째인가요?",
      "help": "처음이라면 대표 동선을 쉽게 묶는 위치가 중요합니다.",
      "options": [
        {
          "title": "첫 여행",
          "desc": "대표 명소와 식사 동선을 쉽게 잡고 싶어요.",
          "scores": {
            "oldquarter": 5,
            "french": 3,
            "badinh": 1
          }
        },
        {
          "title": "재방문",
          "desc": "중심만 고집하지 않아도 괜찮아요.",
          "scores": {
            "westlake": 4,
            "dongda": 3,
            "french": 2
          }
        },
        {
          "title": "출장·방문 목적",
          "desc": "관광보다 목적지 접근성이 중요해요.",
          "scores": {
            "mydinh": 6,
            "badinh": 3,
            "westlake": 1
          }
        }
      ]
    },
    {
      "title": "누구와 함께 가나요?",
      "help": "동행자에 따라 소음, 객실 크기, 이동 방식의 우선순위가 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구",
          "desc": "맛집, 카페, 밤 일정이 중요해요.",
          "scores": {
            "oldquarter": 5,
            "dongda": 2,
            "french": 1
          }
        },
        {
          "title": "커플",
          "desc": "분위기와 숙소 컨디션도 중요해요.",
          "scores": {
            "french": 4,
            "westlake": 3,
            "oldquarter": 2
          }
        },
        {
          "title": "부모님·가족",
          "desc": "차량 접근과 조용한 숙소가 중요해요.",
          "scores": {
            "badinh": 5,
            "french": 4,
            "westlake": 3
          }
        },
        {
          "title": "출장 동행",
          "desc": "업무지와 한인타운 접근성이 필요해요.",
          "scores": {
            "mydinh": 6,
            "badinh": 2
          }
        }
      ]
    },
    {
      "title": "이번 여행의 핵심 일정은 무엇인가요?",
      "help": "일정 중심에 따라 숙소 위치가 달라져야 합니다.",
      "options": [
        {
          "title": "올드쿼터·호안끼엠 산책",
          "desc": "대표 명소와 먹거리를 짧게 묶고 싶어요.",
          "scores": {
            "oldquarter": 6,
            "french": 2
          }
        },
        {
          "title": "고급 호텔·정돈된 중심가",
          "desc": "깔끔한 도심과 호텔 만족도가 중요해요.",
          "scores": {
            "french": 5,
            "badinh": 2
          }
        },
        {
          "title": "호수·카페·휴식",
          "desc": "숙소 주변에서 천천히 쉬고 싶어요.",
          "scores": {
            "westlake": 6,
            "french": 1
          }
        },
        {
          "title": "업무·한인타운·서쪽 일정",
          "desc": "미딩이나 꺼우저이 이동이 많아요.",
          "scores": {
            "mydinh": 6,
            "badinh": 2
          }
        }
      ]
    },
    {
      "title": "근교 투어가 포함되어 있나요?",
      "help": "닌빈·하롱베이·사파 일정은 픽업과 복귀 경로이 중요합니다.",
      "options": [
        {
          "title": "투어 2개 이상",
          "desc": "아침 출발과 호텔 픽업이 편했으면 해요.",
          "scores": {
            "oldquarter": 5,
            "french": 3
          }
        },
        {
          "title": "투어 하루",
          "desc": "시내 관광도 중요하지만 하루쯤 투어를 넣을 예정이에요.",
          "scores": {
            "oldquarter": 4,
            "french": 2,
            "dongda": 2
          }
        },
        {
          "title": "투어 없음",
          "desc": "시내, 카페, 쇼핑 중심으로 움직일 예정이에요.",
          "scores": {
            "french": 3,
            "oldquarter": 3,
            "westlake": 2
          }
        },
        {
          "title": "기차·버스 이동",
          "desc": "사파나 다른 도시로 이동할 계획이 있어요.",
          "scores": {
            "dongda": 5,
            "oldquarter": 2,
            "mydinh": 2
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "하노이는 밤 소음과 골목 분위기 차이가 큽니다.",
      "options": [
        {
          "title": "활기찬 중심",
          "desc": "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.",
          "scores": {
            "oldquarter": 6,
            "dongda": 1
          }
        },
        {
          "title": "깔끔한 도심",
          "desc": "호수 산책과 정돈된 거리 분위기가 좋아요.",
          "scores": {
            "french": 5,
            "badinh": 2
          }
        },
        {
          "title": "조용한 휴식",
          "desc": "번화가보다 여유로운 숙박을 원해요.",
          "scores": {
            "westlake": 6,
            "badinh": 3
          }
        },
        {
          "title": "현실적인 로컬 동선",
          "desc": "가격과 접근성의 균형이 중요해요.",
          "scores": {
            "dongda": 5,
            "badinh": 2
          }
        }
      ]
    },
    {
      "title": "예산은 어떤 기준인가요?",
      "help": "숙박비만 보지 말고 매일 이동비와 이동 피로까지 함께 보세요.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "중심 바로 앞이 아니어도 괜찮아요.",
          "scores": {
            "dongda": 5,
            "oldquarter": 2,
            "mydinh": 1
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "너무 비싸지 않으면서 이동도 편했으면 해요.",
          "scores": {
            "oldquarter": 3,
            "dongda": 4,
            "badinh": 2
          }
        },
        {
          "title": "위치·컨디션 우선",
          "desc": "짧은 일정이라 이동 시간과 숙소 만족도가 중요해요.",
          "scores": {
            "french": 5,
            "oldquarter": 4,
            "westlake": 2
          }
        }
      ]
    },
    {
      "title": "비행 시간은 어떤 편인가요?",
      "help": "노이바이공항은 시내 중심과 거리가 있어 첫날·마지막 날 동선이 중요합니다.",
      "options": [
        {
          "title": "낮 도착·낮 출국",
          "desc": "시내 중심 숙소로 바로 이동해도 괜찮아요.",
          "scores": {
            "oldquarter": 3,
            "french": 3,
            "badinh": 1
          }
        },
        {
          "title": "밤 도착",
          "desc": "첫날은 이동 피로가 걱정돼요.",
          "scores": {
            "badinh": 2,
            "french": 2,
            "westlake": 1
          }
        },
        {
          "title": "새벽 출국",
          "desc": "마지막 날 이동을 단순하게 만들고 싶어요.",
          "scores": {
            "badinh": 3,
            "french": 2,
            "mydinh": 1
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "불편 요소를 먼저 정하면 지역 선택이 훨씬 쉬워집니다.",
      "options": [
        {
          "title": "밤 소음",
          "desc": "잠을 편하게 자는 게 가장 중요해요.",
          "scores": {
            "westlake": 5,
            "french": 4,
            "badinh": 3
          }
        },
        {
          "title": "이동 시간",
          "desc": "관광지와 식당까지 멀어지는 게 싫어요.",
          "scores": {
            "oldquarter": 5,
            "french": 4
          }
        },
        {
          "title": "좁은 객실",
          "desc": "객실 여유와 편의시설이 중요해요.",
          "scores": {
            "badinh": 4,
            "westlake": 4,
            "mydinh": 3
          }
        },
        {
          "title": "언어·식사 불편",
          "desc": "한식이나 생활 편의시설이 있으면 좋아요.",
          "scores": {
            "mydinh": 5,
            "badinh": 2
          }
        }
      ]
    }
  ],
  "postContentType": "top5_series"
};

const resultDetails = {
  "oldquarter": {
    "why": "대표 명소, 길거리 음식, 카페, 투어 픽업 경로를 가장 쉽게 묶을 수 있습니다.",
    "fit": [
      {
        "label": "첫 여행 동선",
        "score": 96
      },
      {
        "label": "투어 픽업 편의",
        "score": 92
      },
      {
        "label": "숙면 안정감",
        "score": 60
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "호안끼엠 호수와 올드쿼터, 맥주거리, 야시장, 주요 투어 픽업을 짧게 묶기 좋은 하노이 첫 여행의 기준으로 잡기 좋습니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "첫 하노이 여행 · 2박 3일 짧은 일정 · 맛집·카페 중심 · 하롱베이·닌빈 투어 픽업에 특히 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "맥주거리와 야시장 바로 앞 저층 객실은 밤 소음 후기를 확인하세요."
      },
      {
        "title": "주의점",
        "desc": "골목이 좁고 밤에는 소음이 있을 수 있어 객실 방음과 엘리베이터 여부를 확인해야 합니다."
      },
      {
        "title": "비교 기준",
        "desc": "조용한 숙면, 리조트형 휴식, 넓은 객실을 우선한다면 올드쿼터보다 프렌치쿼터나 서호가 더 나을 수 있습니다."
      },
      {
        "title": "추천 숙박",
        "desc": "처음 방문자에게 가장 이해하기 쉬운 중심 위치입니다."
      }
    ],
    "checklist": [
      "맥주거리와 야시장 바로 앞 저층 객실은 밤 소음 후기를 확인하세요.",
      "호안끼엠 호수 북쪽·동쪽·서쪽은 실제 분위기가 달라 실제 지도 위치를 확인하세요.",
      "투어 픽업을 이용한다면 호텔 주소가 픽업 가능 구역인지 먼저 확인하세요.",
      "골목이 좁고 밤에는 소음이 있을 수 있어 객실 방음과 엘리베이터 여부를 확인해야 합니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "호안끼엠·올드쿼터는 첫 하노이 여행과 2박 3일 짧은 일정에 잘 맞습니다. 다만 조용한 휴식이 최우선이라면 다른 구역도 함께 비교하세요.",
    "hotelNotes": [
      "올드쿼터 중심",
      "호수 접근",
      "실속 중심",
      "스파·중심",
      "상급 부티크"
    ]
  },
  "french": {
    "why": "정돈된 도심 분위기와 중심 접근성을 함께 챙길 수 있습니다.",
    "fit": [
      {
        "label": "중심 산책",
        "score": 94
      },
      {
        "label": "호텔 만족도",
        "score": 93
      },
      {
        "label": "예산 절약",
        "score": 58
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "올드쿼터 접근성은 유지하면서 더 정돈된 거리, 고급 호텔, 호안끼엠 남쪽 산책 동선을 기대하기 좋은 구역입니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "커플 여행 · 부모님 동반 · 기념일 여행처럼 호텔 컨디션을 중요하게 보는 일정에 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "오페라하우스·호안끼엠 남쪽·짱띠엔 쪽 중 실제 위치를 구분하세요."
      },
      {
        "title": "주의점",
        "desc": "올드쿼터 한복판보다 가격대가 높고 밤거리 선택지는 상대적으로 적습니다."
      },
      {
        "title": "비교 기준",
        "desc": "맥주거리와 야시장 중심의 활기찬 밤 일정을 원한다면 올드쿼터가 더 편합니다."
      },
      {
        "title": "추천 숙박",
        "desc": "중심 접근성과 숙소 만족도의 균형이 좋습니다."
      }
    ],
    "checklist": [
      "오페라하우스·호안끼엠 남쪽·짱띠엔 쪽 중 실제 위치를 구분하세요.",
      "고급 호텔은 객실 전망과 조식 포함 여부를 함께 확인하세요.",
      "올드쿼터를 자주 갈 계획이면 도보 10~15분 이내인지 보세요.",
      "올드쿼터 한복판보다 가격대가 높고 밤거리 선택지는 상대적으로 적습니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "프렌치쿼터·오페라하우스는 커플 여행과 부모님 동반 일정에 잘 맞습니다. 다만 예산이 최우선이라면 다른 구역도 함께 비교하세요.",
    "hotelNotes": [
      "클래식 럭셔리",
      "감성 럭셔리",
      "오페라하우스 동선",
      "호안끼엠 전망",
      "도심 대형 호텔"
    ]
  },
  "westlake": {
    "why": "번잡함을 줄이고 숙소 체류 만족도와 여유로운 동네 분위기를 기대하기 좋습니다.",
    "fit": [
      {
        "label": "조용한 휴식",
        "score": 96
      },
      {
        "label": "장기 체류",
        "score": 91
      },
      {
        "label": "대표 관광 효율",
        "score": 54
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "호수 산책, 카페, 레스토랑, 숙소에서 쉬는 시간을 중요하게 보는 재방문·장기 일정에 잘 맞습니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "조용한 휴식 · 장기 일정 · 가족 여행 · 호수 전망·카페 여행에 특히 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "서호는 넓기 때문에 타이호·쑤언지에우·쩐부 방향을 구분하세요."
      },
      {
        "title": "주의점",
        "desc": "대표 관광지를 매일 다니면 이동 시간이 누적될 수 있습니다."
      },
      {
        "title": "비교 기준",
        "desc": "2박 3일 첫 여행이라면 서호 전체 숙박보다 첫날·마지막날 일부 일정에 넣는 편이 더 효율적일 수 있습니다."
      },
      {
        "title": "추천 숙박",
        "desc": "하노이를 천천히 머물고 싶은 여행자에게 좋습니다."
      }
    ],
    "checklist": [
      "서호는 넓기 때문에 타이호·쑤언지에우·쩐부 방향을 구분하세요.",
      "올드쿼터 이동은 택시·그랩 기준으로 계산하세요.",
      "호수 전망 객실은 전망 보장 여부를 확인하세요.",
      "대표 관광지를 매일 다니면 이동 시간이 누적될 수 있습니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "서호·타이호는 조용한 휴식과 장기 일정에 잘 맞습니다. 다만 대표 관광만 빠르게 둘러보는 일정이라면 다른 구역도 함께 비교하세요.",
    "hotelNotes": [
      "호수 위 숙소",
      "서호·쭉박 균형",
      "안정형 대형 호텔",
      "레지던스형",
      "실속 레지던스"
    ]
  },
  "badinh": {
    "why": "대형 호텔 안정감과 박물관·문묘·롯데센터 동선을 함께 기대할 수 있습니다.",
    "fit": [
      {
        "label": "가족 안정감",
        "score": 94
      },
      {
        "label": "대형 호텔 선택",
        "score": 90
      },
      {
        "label": "밤거리 접근",
        "score": 55
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "호찌민 묘소, 문묘, 박물관, 롯데센터 주변을 묶기 좋고 대형 호텔과 안정적인 숙박 후보가 많은 구역입니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "가족 여행 · 부모님 동반 · 대형 호텔 선호 · 박물관·문묘 일정에 특히 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "롯데센터 주변과 호찌민 묘소 주변은 분위기가 다르므로 위치를 나눠 보세요."
      },
      {
        "title": "주의점",
        "desc": "올드쿼터처럼 걸어서 밤 일정을 이어가기에는 불편할 수 있습니다."
      },
      {
        "title": "비교 기준",
        "desc": "첫 여행에서 길거리 음식과 밤 산책이 중심이면 호안끼엠이 더 편합니다."
      },
      {
        "title": "추천 숙박",
        "desc": "가족·부모님 동반에서 안정감 있게 비교하기 좋습니다."
      }
    ],
    "checklist": [
      "롯데센터 주변과 호찌민 묘소 주변은 분위기가 다르므로 위치를 나눠 보세요.",
      "주요 관광지까지는 그랩 이동을 전제로 계산하세요.",
      "가족 여행은 커넥팅룸·조식·수영장 조건을 함께 확인하세요.",
      "올드쿼터처럼 걸어서 밤 일정을 이어가기에는 불편할 수 있습니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "바딘·롯데센터는 가족 여행, 부모님 동반 일정에 잘 맞습니다. 다만 올드쿼터 도보 중심이라면 다른 구역을 함께 비교하세요.",
    "hotelNotes": [
      "전망·대형 호텔",
      "전통 대형 호텔",
      "컨디션 균형",
      "개성형 고급 호텔",
      "레지던스형 실속"
    ]
  },
  "dongda": {
    "why": "숙박비 부담을 낮추면서 중심 접근성을 크게 잃지 않을 수 있습니다.",
    "fit": [
      {
        "label": "가격·위치 균형",
        "score": 92
      },
      {
        "label": "기차역 접근",
        "score": 86
      },
      {
        "label": "완전 도보 여행",
        "score": 60
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "올드쿼터 접근성은 유지하면서 숙박비와 차분한 로컬 분위기의 균형을 잡기 좋은 현실적인 선택지입니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "가성비 · 재방문 · 기차역 이용 · 문묘·기차거리 일정에 특히 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "하노이역 주변은 골목·도로 환경이 달라 실제 도보 이동을 보세요."
      },
      {
        "title": "주의점",
        "desc": "대표 명소를 모두 걸어서 해결하기에는 올드쿼터보다 실제 접근성이 낮습니다."
      },
      {
        "title": "비교 기준",
        "desc": "처음 방문이고 일정이 짧다면 동다를 1순위보다 2순위 대안으로 두는 편이 안전합니다."
      },
      {
        "title": "추천 숙박",
        "desc": "가격과 중심 접근성의 균형을 보고 싶을 때 좋습니다."
      }
    ],
    "checklist": [
      "하노이역 주변은 골목·도로 환경이 달라 실제 도보 이동을 보세요.",
      "기차거리 방문은 운영·통제 상황이 바뀔 수 있어 현지 안내를 확인하세요.",
      "밤 일정이 많다면 올드쿼터까지의 택시 동선을 계산하세요.",
      "대표 명소를 모두 걸어서 해결하기에는 올드쿼터보다 실제 접근성이 낮습니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "동다·문묘·기차거리는 가성비와 재방문 일정에 잘 맞습니다. 다만 완전 도보 중심의 첫 여행이라면 다른 구역도 함께 비교하세요.",
    "hotelNotes": [
      "문묘 인근",
      "대형 호텔",
      "하노이역 접근",
      "기차역 실속",
      "도심 실속"
    ]
  },
  "mydinh": {
    "why": "서쪽 일정과 한인타운 생활 편의성이 중요할 때 이동 피로를 줄일 수 있습니다.",
    "fit": [
      {
        "label": "출장·서쪽 일정",
        "score": 96
      },
      {
        "label": "한인타운 편의",
        "score": 91
      },
      {
        "label": "관광 중심성",
        "score": 42
      }
    ],
    "reasons": [
      {
        "title": "핵심 동선",
        "desc": "한인 식당, 비즈니스 일정, 컨벤션·서쪽 도심 이동이 중심인 여행자에게 실용적인 숙박권역입니다."
      },
      {
        "title": "잘 맞는 일정",
        "desc": "출장 · 장기 체류 · 한인타운 이동 · 서쪽 업무·쇼핑 일정에 특히 잘 맞습니다."
      },
      {
        "title": "예약 전 체크",
        "desc": "호안끼엠까지 이동 시간을 매일 계산하세요."
      },
      {
        "title": "주의점",
        "desc": "하노이 관광 중심 여행에서는 매번 시내 이동이 부담될 수 있습니다."
      },
      {
        "title": "비교 기준",
        "desc": "관광 일정이 대부분 호안끼엠·올드쿼터라면 미딩은 숙박 1순위가 아닙니다."
      },
      {
        "title": "추천 숙박",
        "desc": "관광보다 목적지가 서쪽에 있을 때 강점이 있습니다."
      }
    ],
    "checklist": [
      "호안끼엠까지 이동 시간을 매일 계산하세요.",
      "목적지가 미딩·남뜨리엠·꺼우저이 중 어디인지 정확히 확인하세요.",
      "출장 일정이면 교통 체증 시간대를 피해서 동선을 잡으세요.",
      "하노이 관광 중심 여행에서는 매번 시내 이동이 부담될 수 있습니다."
    ],
    "dayFlow": [
      "오전: 주요 명소 또는 카페 이동",
      "오후: 호텔 주변 산책·휴식",
      "저녁: 식사 후 숙소 복귀 경로 확인"
    ],
    "decision": "미딩·꺼우저이는 출장과 장기 체류 일정에 잘 맞습니다. 다만 첫 여행 대표 관광이 목적이라면 다른 구역도 함께 비교하세요.",
    "hotelNotes": [
      "랜드마크72",
      "컨벤션·럭셔리",
      "서쪽 안정형",
      "장기 체류",
      "대형 실속"
    ]
  }
};

cityConfig.postContentType = "top5_series";

(function () {
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

  const RELATED_TOP5_REGION_SLUGS = {
    oldquarter: ["old-quarter", "hoan-kiem", "old-quarter-hoan-kiem", "hoan-kiem-old-quarter", "호안끼엠·올드쿼터", "호안끼엠", "올드쿼터"],
    french: ["french-quarter", "opera-house", "french-quarter-opera-house", "프렌치쿼터·오페라하우스", "프렌치쿼터", "오페라하우스"],
    westlake: ["west-lake", "tay-ho", "west-lake-tay-ho", "서호·타이호", "서호", "타이호"],
    badinh: ["ba-dinh", "lotte-center", "ba-dinh-lotte-center", "바딘·롯데센터", "바딘", "롯데센터"],
    dongda: ["dong-da", "temple-of-literature", "train-street", "dong-da-temple-of-literature-train-street", "동다·문묘·기차거리", "동다", "문묘", "기차거리"],
    mydinh: ["my-dinh", "cau-giay", "my-dinh-cau-giay", "미딩·꺼우저이", "미딩", "꺼우저이"]
  };

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "";
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[ch]));
  }

  function getProgressMessage() {
    const step = currentQuestionIndex + 1;
    const total = cityConfig.questions.length;
    if (step === 1) return "가볍게 시작해볼까요?";
    if (step === total) return "마지막 질문이에요!";
    if (step >= total - 1) return "거의 다 왔어요";
    if (step >= Math.ceil(total * 0.55)) return "숙소 위치 기준을 맞춰보는 중이에요";
    return "동선을 하나씩 맞춰보는 중이에요";
  }

  function renderQuestion() {
    const question = cityConfig.questions[currentQuestionIndex];
    const selected = answers[currentQuestionIndex];
    const answered = answers.filter((answer) => answer !== null).length;
    const percent = Math.round((answered / cityConfig.questions.length) * 100);

    surveyView.style.display = "block";
    resultView.classList.remove("is-active");
    questionCount.textContent = `${currentQuestionIndex + 1} / ${cityConfig.questions.length}`;
    progressText.textContent = getProgressMessage();
    progressFill.style.width = `${percent}%`;
    progressBar.setAttribute("aria-valuenow", String(percent));
    questionTitle.textContent = question.title;
    questionHelp.textContent = question.help || "";
    optionsArea.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wt-option";
      button.setAttribute("aria-pressed", selected === index ? "true" : "false");
      if (selected === index) button.classList.add("is-selected");
      button.innerHTML = `
        <span class="wt-option-title">${escapeHtml(option.title)}</span>
        ${option.desc ? `<span class="wt-option-desc">${escapeHtml(option.desc)}</span>` : ""}
      `;
      button.addEventListener("click", () => {
        answers[currentQuestionIndex] = index;
        renderQuestion();
      });
      optionsArea.appendChild(button);
    });

    prevBtn.disabled = false;
    prevBtn.textContent = currentQuestionIndex === 0 ? "닫기" : "이전";
    nextBtn.disabled = selected === null;
    nextBtn.textContent = currentQuestionIndex === cityConfig.questions.length - 1 ? "결과 보기" : "다음";
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

  function getTieBreakPriority(areaKey) {
    const order = Object.keys(cityConfig.areas);
    return order.length - order.indexOf(areaKey);
  }

  function calculateScores() {
    const scores = {};
    Object.keys(cityConfig.areas).forEach((areaKey) => {
      scores[areaKey] = 0;
    });

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex === null) return;
      const selectedOption = cityConfig.questions[questionIndex].options[answerIndex];
      Object.entries(selectedOption.scores || {}).forEach(([areaKey, score]) => {
        if (Object.prototype.hasOwnProperty.call(scores, areaKey)) {
          scores[areaKey] += Number(score) || 0;
        }
      });
    });

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
    setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔 선택지입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 확인하세요.");
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
      location.textContent = hotel.location || area.name;
      reason.textContent = hotel.reason || "추천된 위치를 기준으로 비교해볼 만한 호텔입니다.";
      link.href = hotel.url || `/destinations/${cityConfig.destinationSlug}/hotel-recommendations/`;
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
      ...(RELATED_TOP5_REGION_SLUGS[area?.key] || []),
      area?.regionSlug,
      ...(Array.isArray(area?.regionSlugAliases) ? area.regionSlugAliases : []),
      area?.name,
      area?.key
    ].map((item) => String(item || "").trim()).filter(Boolean))];
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

  function normalizeResultReasons(area, reasons) {
    const base = Array.isArray(reasons) && reasons.length ? reasons : [
      { title: "동선", desc: area.summary },
      { title: "숙소 분위기", desc: area.leadText },
      { title: "예약 전 확인", desc: Array.isArray(area.bookingTips) ? area.bookingTips[0] : "실제 위치와 최근 후기를 함께 확인하세요." }
    ];

    return base.slice(0, 3).map((reason) => ({
      title: reason.title || "추천 이유",
      text: reason.text || reason.desc || "이번 답변에서 선택한 조건과 잘 맞는 위치입니다."
    }));
  }

  function getPersuasiveContent(area, rankedAreas) {
    const detail = resultDetails[area.key] || {};
    const runnerUp = rankedAreas[1];
    const alternativeText = runnerUp ? `${runnerUp.name}도 함께 비교하면 예산과 분위기 선택 폭을 넓힐 수 있습니다.` : "같은 지역 안에서도 실제 도보 경로와 최근 후기는 꼭 확인하세요.";

    return {
      intro: detail.why || area.compareGood || area.summary,
      reasons: normalizeResultReasons(area, detail.reasons),
      conclusionTitle: `${area.name}부터 호텔 후보를 좁혀보세요`,
      conclusionText: detail.decision || `${area.name}은(는) 이번 답변에서 가장 많이 맞아떨어진 위치입니다. ${alternativeText}`
    };
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
    surveyWrap?.classList.add("is-survey-started");
    surveyWrap?.classList.add("is-result-mode");

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
    surveyWrap?.classList.remove("is-result-mode");
    surveyWrap?.classList.remove("is-survey-started");
    locationPage?.classList.remove("is-result-mode");
    locationPage?.classList.remove("is-survey-started");
    surveyView.style.display = "block";
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  startSurveyBtn?.addEventListener("click", startSurvey);
  backBtn?.addEventListener("click", () => { window.location.href = `/destinations/${cityConfig.destinationSlug}/`; });
  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);
  resetBtn.addEventListener("click", resetSurvey);

  renderQuestion();
})();
