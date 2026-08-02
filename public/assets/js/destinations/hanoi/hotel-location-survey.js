/* 하노이 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
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
      "summary": "호안끼엠 호수와 오래된 골목, 작은 식당과 상점이 촘촘하게 이어지는 중심에서 하노이의 첫인상을 가장 가까이 느끼고 싶은 당신에게 잘 맞는 지역입니다.",
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
          "url": "/post/hanoi-old-quarter-hotels/"
        },
        {
          "title": "하노이 호안끼엠 숙소 위치 가이드",
          "url": "/post/hanoi-old-quarter-stay-guide/"
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
          "url": "/post/la-siesta-premium-hang-be/"
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
          "url": "/post/the-oriental-jade-hotel/"
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
          "url": "/post/hanoi-tirant-hotel/"
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
          "url": "/post/jm-marvel-hotel-spa/"
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
          "url": "/post/peridot-grand-luxury-boutique-hotel/"
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
      "summary": "올드쿼터의 활기는 가까이 두되 조금 더 정돈된 거리와 고풍스러운 건축, 차분한 산책 분위기 속에서 하노이를 우아하게 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
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
          "url": "/post/hanoi-french-quarter-hotels/"
        },
        {
          "title": "하노이 프렌치쿼터 숙소 위치 가이드",
          "url": "/post/hanoi-french-quarter-stay-guide/"
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
          "url": "/post/sofitel-legend-metropole-hanoi/"
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
          "url": "/post/capella-hanoi/"
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
          "url": "/post/hotel-de-lopera-hanoi-mgallery/"
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
          "url": "/post/apricot-hotel-hanoi/"
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
          "url": "/post/melia-hanoi/"
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
      "summary": "호수 바람과 여유로운 카페, 느긋한 레스토랑이 이어지는 풍경 속에서 관광지 체크보다 머무는 시간 자체를 중요하게 여기는 당신에게 잘 맞는 지역입니다.",
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
          "url": "/post/hanoi-west-lake-hotels/"
        },
        {
          "title": "하노이 서호 숙소 위치 가이드",
          "url": "/post/hanoi-west-lake-stay-guide/"
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
          "url": "/post/intercontinental-hanoi-westlake/"
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
          "url": "/post/pan-pacific-hanoi/"
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
          "url": "/post/sheraton-hanoi-hotel/"
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
          "url": "/post/elegant-suites-westlake/"
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
          "url": "/post/the-hanoi-club-hotel-residences/"
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
      "summary": "주요 명소와 대형 호텔, 쇼핑과 이동 동선을 안정적으로 묶어두고 하노이 여행을 조금 더 효율적이고 차분하게 정리하고 싶은 당신에게 잘 어울리는 지역입니다.",
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
          "url": "/post/hanoi-ba-dinh-hotels/"
        },
        {
          "title": "하노이 바딘 숙소 위치 가이드",
          "url": "/post/hanoi-ba-dinh-stay-guide/"
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
          "url": "/post/lotte-hotel-hanoi/"
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
          "url": "/post/hanoi-daewoo-hotel/"
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
          "url": "/post/grand-vista-hanoi/"
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
          "url": "/post/dolce-by-wyndham-hanoi-golden-lake/"
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
          "url": "/post/super-hotel-candle-hanoi/"
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
      "summary": "문묘와 로컬 거리, 기차길 주변의 독특한 분위기를 따라 걸으며 하노이의 생활감 있는 풍경을 가까이 느끼고 싶은 당신에게 잘 맞는 도심 지역입니다.",
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
          "url": "/post/hanoi-dong-da-hotels/"
        },
        {
          "title": "하노이 동다 숙소 위치 가이드",
          "url": "/post/hanoi-dong-da-stay-guide/"
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
          "url": "/post/grand-mercure-hanoi/"
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
          "url": "/post/pullman-hanoi/"
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
          "url": "/post/movenpick-hotel-hanoi-centre/"
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
          "url": "/post/sojo-hotel-ga-hanoi/"
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
          "url": "/post/nesta-hotel-hanoi/"
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
      "summary": "넓고 조용한 거리와 한인 식당, 비즈니스 동선이 익숙하게 이어지는 서쪽 도심에서 하노이를 오래 머물 듯 편안하게 보내고 싶은 당신에게 잘 어울리는 실용적인 지역입니다.",
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
          "url": "/post/hanoi-my-dinh-cau-giay-hotels/"
        },
        {
          "title": "하노이 미딩 숙소 위치 가이드",
          "url": "/post/hanoi-my-dinh-cau-giay-stay-guide/"
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
          "url": "/post/intercontinental-hanoi-landmark72/"
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
          "url": "/post/jw-marriott-hotel-hanoi/"
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
          "url": "/post/hyatt-regency-west-hanoi/"
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
          "url": "/post/novotel-suites-hanoi/"
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
          "url": "/post/grand-plaza-hanoi-hotel/"
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

const areaResultBadges = {
  "oldquarter": "하노이 골목과 호수 분위기를 가장 가까이 느끼는 중심",
  "french": "오페라하우스 주변의 차분한 거리를 걷기 좋은 곳",
  "westlake": "호수 바람과 카페 시간이 느린 휴식",
  "badinh": "관광 동선과 쇼핑몰을 잇는 안정감",
  "dongda": "문묘와 로컬 거리를 함께 보기 좋은 곳",
  "mydinh": "장기 숙박과 출장 동선이 편한 서쪽 지역"
};

const hotelAccessPresets = {
  "oldquarter": {
    "station": "호안끼엠호수·올드쿼터 도보권",
    "airport": "노이바이공항 차량 약 40~50분"
  },
  "french": {
    "station": "오페라하우스·프렌치쿼터 도보권",
    "airport": "공항 차량 약 40~50분"
  },
  "westlake": {
    "station": "서호 카페·호수 산책권",
    "airport": "공항 차량 약 25~40분"
  },
  "badinh": {
    "station": "롯데센터·바딘 접근",
    "airport": "공항 차량 약 35~45분"
  },
  "dongda": {
    "station": "문묘·기차거리 접근",
    "airport": "공항 차량 약 40~50분"
  },
  "mydinh": {
    "station": "미딩·꺼우저이 중심",
    "airport": "공항 차량 약 30~40분"
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
