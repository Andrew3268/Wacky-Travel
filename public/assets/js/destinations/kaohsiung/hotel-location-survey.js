/* 가오슝 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "가오슝",
  "destinationSlug": "kaohsiung",
  "postContentType": "top5_series",
  "areas": {
    "formosa": {
      "name": "미려도·류허야시장",
      "regionSlug": "formosa-liuhe",
      "regionSlugAliases": [
        "미려도·류허야시장",
        "미려도"
      ],
      "label": "가오슝이 처음이고 일정이 짧다면 가장 먼저 비교할 만한 기본 선택지입니다.",
      "summary": "MRT 이동과 류허야시장, 공항과 도심 동선이 단순하게 이어지는 중심에서 가오슝 첫 여행을 편하고 활기 있게 시작하고 싶은 당신에게 잘 맞는 기준점입니다.",
      "leadTitle": "도착 첫날, 공항 이동과 저녁 식사 동선을 단순하게 묶기 좋은 중심권",
      "leadText": "미려도역은 레드라인과 오렌지라인을 함께 이용하기 쉬운 중심부입니다. 류허야시장, 가오슝역, 중앙공원, 보얼예술특구 방향을 무리 없이 연결하기 좋아 처음 방문해도 동선을 잡기 쉽습니다.",
      "stayRange": [
        "미려도역과 류허야시장 주변은 공항 MRT, 가오슝역, 도심 식사 동선을 단순하게 묶기 좋은 첫 여행 기준점입니다.",
        "역 바로 앞 숙소라도 밤 소음과 객실 방음 후기를 함께 보세요. 류허야시장과 너무 가까우면 편하지만 조용함은 떨어질 수 있습니다.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "항구 전망이나 조용한 휴식을 기대한다면 산둬상권, 옌청푸, 시즈완도 함께 비교하는 편이 좋습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "첫 가오슝 여행",
        "짧은 일정",
        "공항 이동",
        "야시장",
        "MRT 중심 이동"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "역 바로 앞 숙소라도 밤 소음과 객실 방음 후기를 함께 보세요. 류허야시장과 너무 가까우면 편하지만 조용함은 떨어질 수 있습니다.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "첫 여행",
        "MRT",
        "야시장",
        "공항 이동",
        "도심"
      ],
      "compareGood": "가오슝이 처음이고 일정이 짧다면 가장 먼저 비교할 만한 기본 선택지입니다.",
      "compareCaution": "항구 전망이나 조용한 휴식을 기대한다면 산둬상권, 옌청푸, 시즈완도 함께 비교하는 편이 좋습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "미려도·류허야시장 호텔 추천 TOP5",
          "url": "/post/formosa-liuhe-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "호텔 두아",
          "tag": "도심 감각형",
          "location": "미려도·중앙공원 생활권",
          "reason": "미려도·중앙공원 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "미려도·류허야시장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "그리트 인",
          "tag": "실속 도심형",
          "location": "미려도·류허야시장 주변",
          "reason": "미려도·류허야시장 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "미려도·류허야시장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "카인드니스 호텔 중정",
          "tag": "친절 서비스형",
          "location": "미려도·류허야시장 생활권",
          "reason": "미려도·류허야시장 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "미려도·류허야시장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "에어라인 인 가오슝 스테이션",
          "tag": "역 접근 실용형",
          "location": "가오슝역·미려도 생활권",
          "reason": "가오슝역·미려도 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "미려도·류허야시장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "더 트리 하우스",
          "tag": "가성비 도심형",
          "location": "류허야시장 주변",
          "reason": "류허야시장 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "미려도·류허야시장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "central": {
      "name": "중앙공원·신주에장",
      "regionSlug": "central-park-xinjuejiang",
      "regionSlugAliases": [
        "중앙공원·신주에장",
        "중앙공원"
      ],
      "label": "숙박비와 도심 편의, 쇼핑 동선을 함께 보고 싶다면 현실적인 선택입니다.",
      "summary": "도심 한복판의 공원과 쇼핑 거리, 젊은 상권의 분위기가 가까이 놓인 곳에서 가오슝의 일상적인 활기를 가볍게 즐기고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "쇼핑과 카페, 도심 이동을 균형 있게 잡기 좋은 실속형 중심지",
      "leadText": "중앙공원역 주변은 MRT 이동이 쉽고 신주에장 상권, 카페, 백화점, 식당 접근이 좋습니다. 미려도보다 조금 더 쇼핑과 거리 분위기에 무게를 두고 싶을 때 비교하기 좋습니다.",
      "stayRange": [
        "중앙공원과 신주에장 상권은 쇼핑, 카페, 젊은 거리 분위기, 도심 접근성을 함께 보기 좋은 숙박지입니다.",
        "상권 안쪽 숙소는 편하지만 주말 밤 유동 인구가 많을 수 있습니다. 객실 방음, 큰길 접근성, 역까지 도보 시간을 함께 확인하세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "고속철도 쭤잉역이나 치진·시즈완을 자주 오간다면 이동 시간이 조금 더해질 수 있습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "가성비 여행",
        "쇼핑",
        "카페",
        "커플 여행",
        "도심 산책"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "상권 안쪽 숙소는 편하지만 주말 밤 유동 인구가 많을 수 있습니다. 객실 방음, 큰길 접근성, 역까지 도보 시간을 함께 확인하세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "가성비",
        "쇼핑",
        "카페",
        "커플",
        "도심"
      ],
      "compareGood": "숙박비와 도심 편의, 쇼핑 동선을 함께 보고 싶다면 현실적인 선택입니다.",
      "compareCaution": "고속철도 쭤잉역이나 치진·시즈완을 자주 오간다면 이동 시간이 조금 더해질 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "중앙공원·신주에장 호텔 추천 TOP5",
          "url": "/post/central-park-xinjuejiang-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "호텔 인디고 가오슝 센트럴 파크",
          "tag": "감성 중심형",
          "location": "중앙공원역 주변",
          "reason": "중앙공원역 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원·신주에장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "브리오 호텔",
          "tag": "디자인 실속형",
          "location": "중앙공원 생활권",
          "reason": "중앙공원 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원·신주에장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "스타하우스 호텔",
          "tag": "도심 안정형",
          "location": "중앙공원·신주에장 생활권",
          "reason": "중앙공원·신주에장 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원·신주에장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "쿵 샹 디자인 호텔",
          "tag": "가족형 객실",
          "location": "중앙공원·미려도 생활권",
          "reason": "중앙공원·미려도 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원·신주에장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "저스트 슬립 가오슝 스테이션",
          "tag": "교통 실속형",
          "location": "가오슝역·중앙공원 생활권",
          "reason": "가오슝역·중앙공원 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원·신주에장",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "sanduo": {
      "name": "산둬상권·85타워",
      "regionSlug": "sanduo-85tower",
      "regionSlugAliases": [
        "산둬상권·85타워",
        "산둬상권"
      ],
      "label": "객실 컨디션과 쇼핑, 항구 분위기를 함께 보고 싶은 가족·커플 여행에 좋습니다.",
      "summary": "항구 야경과 고층 전망, 백화점과 대형 호텔이 함께 모인 거리에서 가오슝의 도시적인 분위기를 즐기고 싶은 당신에게 잘 맞는 지역입니다.",
      "leadTitle": "호텔 컨디션과 항구 전망, 쇼핑 편의를 함께 잡기 좋은 남쪽 도심권",
      "leadText": "산둬상권역 주변은 쇼핑몰, 백화점, 85타워, 항구 방향 접근이 좋아 숙소 자체 컨디션을 중요하게 보는 여행자에게 잘 맞습니다. 가족 여행이나 기념일 여행처럼 호텔 만족도가 중요한 일정에 특히 유리합니다.",
      "stayRange": [
        "산둬상권과 85타워 주변은 백화점, 항구 전망, 비교적 큰 규모의 호텔을 함께 보기 좋은 지역입니다.",
        "보얼예술특구나 시즈완까지는 경전철·MRT·택시를 섞어야 할 수 있습니다. 하루 동선이 서쪽에 집중된다면 위치를 다시 비교하세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "야시장과 로컬 골목 분위기를 숙소 주변에서 바로 즐기고 싶다면 미려도나 중앙공원이 더 편할 수 있습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "가족 여행",
        "기념일",
        "쇼핑",
        "항구뷰",
        "호텔 체류"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "보얼예술특구나 시즈완까지는 경전철·MRT·택시를 섞어야 할 수 있습니다. 하루 동선이 서쪽에 집중된다면 위치를 다시 비교하세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "호텔 컨디션",
        "가족",
        "쇼핑",
        "항구뷰",
        "기념일"
      ],
      "compareGood": "객실 컨디션과 쇼핑, 항구 분위기를 함께 보고 싶은 가족·커플 여행에 좋습니다.",
      "compareCaution": "야시장과 로컬 골목 분위기를 숙소 주변에서 바로 즐기고 싶다면 미려도나 중앙공원이 더 편할 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "산둬상권·85타워 호텔 추천 TOP5",
          "url": "/post/sanduo-85tower-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "실크스 클럽",
          "tag": "럭셔리 항구형",
          "location": "산둬상권·85타워 주변",
          "reason": "산둬상권·85타워 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "산둬상권·85타워",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "인터컨티넨탈 가오슝",
          "tag": "고급 체류형",
          "location": "산둬상권 생활권",
          "reason": "산둬상권 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "산둬상권·85타워",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "그랜드 하이라이 호텔",
          "tag": "백화점 연결형",
          "location": "산둬상권·항구 생활권",
          "reason": "산둬상권·항구 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "산둬상권·85타워",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "한셴 인터내셔널 호텔",
          "tag": "전통 고급형",
          "location": "산둬상권 주변",
          "reason": "산둬상권 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "산둬상권·85타워",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "85 스카이 타워 호텔",
          "tag": "전망 중심형",
          "location": "85타워 생활권",
          "reason": "85타워 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "산둬상권·85타워",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "pier2": {
      "name": "옌청푸·보얼예술특구",
      "regionSlug": "yanchengpu-pier2",
      "regionSlugAliases": [
        "옌청푸·보얼예술특구",
        "옌청푸"
      ],
      "label": "가오슝의 항구 감성과 보얼예술특구를 여행의 중심에 두고 싶다면 만족도가 높습니다.",
      "summary": "오래된 항구 창고가 예술 공간으로 바뀐 거리와 아이허 산책 동선 속에서 가오슝의 감각적인 항구 분위기를 천천히 즐기고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "보얼예술특구와 아이허, 항구 산책을 가까이 두는 감성형 지역",
      "leadText": "옌청푸역과 보얼예술특구 주변은 전시, 카페, 항구 산책, 아이허 야경을 묶기 쉽습니다. 첫 여행보다 항구 도시 분위기와 사진, 산책을 더 중요하게 보는 커플·재방문 여행에 잘 맞습니다.",
      "stayRange": [
        "옌청푸와 보얼예술특구는 항구 창고를 활용한 예술 공간, 아이허, 경전철 산책 동선을 즐기기 좋은 지역입니다.",
        "일부 숙소는 역에서 거리가 있을 수 있습니다. 여름에는 낮 도보 피로가 크니 경전철·택시 이동을 함께 계산하세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "공항·고속철도 이동이나 야시장 중심 일정이 많다면 미려도나 쭤잉이 더 단순할 수 있습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "커플 여행",
        "감성 산책",
        "보얼예술특구",
        "아이허",
        "재방문"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "일부 숙소는 역에서 거리가 있을 수 있습니다. 여름에는 낮 도보 피로가 크니 경전철·택시 이동을 함께 계산하세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "보얼",
        "아이허",
        "감성",
        "카페",
        "항구"
      ],
      "compareGood": "가오슝의 항구 감성과 보얼예술특구를 여행의 중심에 두고 싶다면 만족도가 높습니다.",
      "compareCaution": "공항·고속철도 이동이나 야시장 중심 일정이 많다면 미려도나 쭤잉이 더 단순할 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "옌청푸·보얼예술특구 호텔 추천 TOP5",
          "url": "/post/yanchengpu-pier2-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "시티 스위트 가오슝 피어2",
          "tag": "보얼 접근형",
          "location": "옌청푸·보얼예술특구",
          "reason": "옌청푸·보얼예술특구 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청푸·보얼예술특구",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "풀론 호텔 가오슝",
          "tag": "항구 산책형",
          "location": "옌청푸·아이허 주변",
          "reason": "옌청푸·아이허 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청푸·보얼예술특구",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "하버 10 호텔",
          "tag": "아이허 전망형",
          "location": "아이허·옌청푸 생활권",
          "reason": "아이허·옌청푸 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청푸·보얼예술특구",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "샤토 드 신 호텔 가오슝",
          "tag": "옌청푸 안정형",
          "location": "옌청푸역 주변",
          "reason": "옌청푸역 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청푸·보얼예술특구",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "레전드 호텔 피어2",
          "tag": "실속 감성형",
          "location": "보얼예술특구 생활권",
          "reason": "보얼예술특구 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청푸·보얼예술특구",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "zuoying": {
      "name": "쭤잉·한신아레나",
      "regionSlug": "zuoying-arena",
      "regionSlugAliases": [
        "쭤잉·한신아레나",
        "쭤잉"
      ],
      "label": "가오슝을 다른 대만 도시와 함께 보거나 가족 단위로 움직인다면 매우 실용적인 선택입니다.",
      "summary": "고속철도와 MRT, 쇼핑몰과 야시장 동선이 북쪽에서 단정하게 이어지는 위치에서 이동의 편리함을 가장 중요하게 보는 당신에게 잘 맞는 교통 중심 지역입니다.",
      "leadTitle": "고속철도와 가족 동선, 루이펑야시장을 함께 보기 좋은 북쪽 거점",
      "leadText": "고속철도 쭤잉역, 대만철도, MRT 레드라인을 이용하기 쉬워 가오슝·타이중·타이베이와 함께 이동하는 일정에 편합니다. 한신아레나와 루이펑야시장 주변은 가족 여행과 쇼핑, 저녁 식사 동선을 잡기 좋습니다.",
      "stayRange": [
        "쭤잉과 한신아레나 주변은 고속철도, 대만철도, MRT, 루이펑야시장을 함께 활용하기 좋은 북쪽 교통권입니다.",
        "가오슝의 항구와 보얼예술특구, 치진을 중심으로 여행한다면 매번 남쪽·서쪽 이동이 필요합니다.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "가오슝 첫 여행의 도심 분위기를 바로 느끼고 싶다면 미려도·중앙공원 쪽이 더 직관적일 수 있습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "고속철도 이동",
        "가족 여행",
        "루이펑야시장",
        "쇼핑",
        "렌터카·택시 이동"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "가오슝의 항구와 보얼예술특구, 치진을 중심으로 여행한다면 매번 남쪽·서쪽 이동이 필요합니다.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "고속철도",
        "가족",
        "루이펑",
        "쇼핑",
        "근교"
      ],
      "compareGood": "가오슝을 다른 대만 도시와 함께 보거나 가족 단위로 움직인다면 매우 실용적인 선택입니다.",
      "compareCaution": "가오슝 첫 여행의 도심 분위기를 바로 느끼고 싶다면 미려도·중앙공원 쪽이 더 직관적일 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "쭤잉·한신아레나 호텔 추천 TOP5",
          "url": "/post/zuoying-arena-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "H2O 호텔",
          "tag": "아레나 고급형",
          "location": "쭤잉·한신아레나",
          "reason": "쭤잉·한신아레나 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "쭤잉·한신아레나",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "파크 리즈 호텔",
          "tag": "디자인 안정형",
          "location": "한신아레나 주변",
          "reason": "한신아레나 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "쭤잉·한신아레나",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "호텔 R14",
          "tag": "MRT 실속형",
          "location": "가오슝 아레나역 주변",
          "reason": "가오슝 아레나역 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "쭤잉·한신아레나",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "가든 빌라 가오슝",
          "tag": "가족형 휴식",
          "location": "쭤잉 생활권",
          "reason": "쭤잉 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "쭤잉·한신아레나",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "롱 샹 호텔",
          "tag": "초실속 교통형",
          "location": "루이펑야시장 주변",
          "reason": "루이펑야시장 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "쭤잉·한신아레나",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    },
    "xiziwan": {
      "name": "시즈완·치진",
      "regionSlug": "xiziwan-cijin",
      "regionSlugAliases": [
        "시즈완·치진",
        "시즈완"
      ],
      "label": "치진과 노을, 조용한 바다 분위기가 여행의 핵심이라면 1박 또는 여유 일정에 좋습니다.",
      "summary": "페리를 타고 닿는 섬과 바다 노을, 해안 산책이 하루의 중심이 되는 흐름 속에서 가오슝을 조금 더 느긋하게 즐기고 싶은 당신에게 잘 어울리는 서쪽 해안 지역입니다.",
      "leadTitle": "바다와 노을, 치진 페리 일정에 무게를 두는 여유형 지역",
      "leadText": "시즈완, 구산 페리, 치진, 해안 산책을 천천히 즐기고 싶다면 서쪽 권역이 매력적입니다. 중심 상권과는 성격이 달라 조용한 휴식이나 1박 분리 일정에 잘 맞습니다.",
      "stayRange": [
        "시즈완과 치진 방향은 바다, 노을, 페리, 여유로운 산책을 중심으로 여행하고 싶은 분에게 어울리는 서쪽 휴식권입니다.",
        "도심 호텔 선택지가 많지 않고, 늦은 밤에는 이동 선택지가 줄 수 있습니다. 공항·고속철도 이동일에는 시간을 넉넉히 잡으세요.",
        "주요 일정과 밤 동선을 함께 계산하세요."
      ],
      "avoidRange": [
        "첫 가오슝 여행 전체 숙소로 두면 주요 도심과 야시장 동선이 번거롭게 느껴질 수 있습니다.",
        "가격만 보고 외곽 숙소를 고르는 선택",
        "야시장과 복귀 동선을 확인하지 않은 예약"
      ],
      "bestFor": [
        "조용한 여행",
        "바다",
        "노을",
        "치진",
        "산책",
        "재방문"
      ],
      "notFor": [
        "동선이 맞지 않는 짧은 일정",
        "소음 후기를 확인하지 않은 예약",
        "이동 방식이 정해지지 않은 여행"
      ],
      "bookingTips": [
        "도심 호텔 선택지가 많지 않고, 늦은 밤에는 이동 선택지가 줄 수 있습니다. 공항·고속철도 이동일에는 시간을 넉넉히 잡으세요.",
        "택시 승하차와 짐 보관 가능 여부를 확인하세요.",
        "주변 식당 영업시간과 밤 분위기를 함께 보세요."
      ],
      "chips": [
        "바다",
        "노을",
        "치진",
        "조용함",
        "산책"
      ],
      "compareGood": "치진과 노을, 조용한 바다 분위기가 여행의 핵심이라면 1박 또는 여유 일정에 좋습니다.",
      "compareCaution": "첫 가오슝 여행 전체 숙소로 두면 주요 도심과 야시장 동선이 번거롭게 느껴질 수 있습니다.",
      "mismatchNote": "일정 성격이 다르다면 다른 가오슝 권역도 함께 비교하세요.",
      "links": [
        {
          "title": "시즈완·치진 호텔 추천 TOP5",
          "url": "/post/xiziwan-cijin-hotels"
        },
        {
          "title": "가오슝 숙소 위치 가이드",
          "url": "/destinations/kaohsiung/hotel-guide/"
        }
      ],
      "hotels": [
        {
          "name": "워터마크 호텔 시즈완",
          "tag": "바다 산책형",
          "location": "시즈완·구산 페리 주변",
          "reason": "시즈완·구산 페리 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "시즈완·치진",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "인 영 호텔",
          "tag": "치진 휴식형",
          "location": "치진 해변 주변",
          "reason": "치진 해변 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "시즈완·치진",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "OX 스위트",
          "tag": "감성 골목형",
          "location": "옌청푸·시즈완 생활권",
          "reason": "옌청푸·시즈완 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "시즈완·치진",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "시즈완 선셋 비치 리조트",
          "tag": "노을 휴식형",
          "location": "시즈완 해변 주변",
          "reason": "시즈완 해변 주변 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "시즈완·치진",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        },
        {
          "name": "킹십 호텔 가오슝 인터컨티넨탈",
          "tag": "서쪽 실속형",
          "location": "옌청푸·시즈완 생활권",
          "reason": "옌청푸·시즈완 생활권 안에서 가오슝 여행 동선을 단순하게 만들고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "시즈완·치진",
            "가오슝",
            "숙소"
          ],
          "url": "#"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 가오슝 여행에서 가장 중요한 것은 무엇인가요?",
      "help": "가장 먼저 떠오르는 여행 장면을 골라보세요.",
      "options": [
        {
          "title": "첫 여행이라 이동이 쉬웠으면 해요",
          "desc": "MRT와 야시장, 주요 명소를 쉽게 연결하고 싶어요.",
          "scores": {
            "formosa": 8,
            "central": 4,
            "sanduo": 2
          }
        },
        {
          "title": "호텔 컨디션과 쇼핑이 중요해요",
          "desc": "객실과 주변 편의시설을 함께 보고 싶어요.",
          "scores": {
            "sanduo": 8,
            "zuoying": 3
          }
        },
        {
          "title": "항구와 감성 산책이 좋아요",
          "desc": "보얼예술특구와 아이허를 천천히 걷고 싶어요.",
          "scores": {
            "pier2": 8,
            "xiziwan": 3
          }
        },
        {
          "title": "고속철도 이동이 있어요",
          "desc": "다른 대만 도시와 함께 이동할 예정이에요.",
          "scores": {
            "zuoying": 8,
            "formosa": 3
          }
        }
      ]
    },
    {
      "title": "누구와 함께 떠나나요?",
      "help": "동행자에 따라 숙소 기준이 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구와 가요",
          "desc": "교통과 가성비를 균형 있게 보고 싶어요.",
          "scores": {
            "central": 7,
            "formosa": 6
          }
        },
        {
          "title": "커플 여행이에요",
          "desc": "감성적인 산책과 카페 분위기가 좋아요.",
          "scores": {
            "pier2": 7,
            "central": 5,
            "xiziwan": 4
          }
        },
        {
          "title": "부모님·아이와 함께해요",
          "desc": "객실 컨디션과 이동 편의가 중요해요.",
          "scores": {
            "sanduo": 7,
            "zuoying": 6,
            "formosa": 2
          }
        },
        {
          "title": "재방문이라 여유롭게 쉬고 싶어요",
          "desc": "바다와 노을, 조용한 분위기가 좋아요.",
          "scores": {
            "xiziwan": 8,
            "pier2": 5
          }
        }
      ]
    },
    {
      "title": "저녁 시간에는 어디에 있고 싶나요?",
      "help": "가오슝은 밤 동선이 숙소 만족도를 많이 좌우합니다.",
      "options": [
        {
          "title": "류허야시장 근처",
          "desc": "야시장과 MRT 환승을 가까이 두고 싶어요.",
          "scores": {
            "formosa": 8,
            "central": 3
          }
        },
        {
          "title": "루이펑야시장 근처",
          "desc": "큰 야시장과 쇼핑몰 동선을 함께 보고 싶어요.",
          "scores": {
            "zuoying": 8,
            "sanduo": 2
          }
        },
        {
          "title": "아이허와 항구 산책",
          "desc": "야경과 카페, 보얼예술특구가 좋아요.",
          "scores": {
            "pier2": 8,
            "xiziwan": 3
          }
        },
        {
          "title": "숙소에서 조용히 쉬기",
          "desc": "밤에는 이동보다 휴식을 우선하고 싶어요.",
          "scores": {
            "sanduo": 5,
            "xiziwan": 7,
            "pier2": 3
          }
        }
      ]
    },
    {
      "title": "가장 많이 이용할 교통은 무엇인가요?",
      "help": "도착과 출발 교통을 먼저 생각해보세요.",
      "options": [
        {
          "title": "공항 MRT",
          "desc": "공항에서 들어와 시내를 바로 보고 싶어요.",
          "scores": {
            "formosa": 7,
            "central": 5,
            "sanduo": 4
          }
        },
        {
          "title": "대만 고속철도",
          "desc": "쭤잉역을 이용할 일이 있어요.",
          "scores": {
            "zuoying": 8,
            "formosa": 2
          }
        },
        {
          "title": "경전철과 항구 동선",
          "desc": "보얼예술특구와 아이허를 자주 갈 거예요.",
          "scores": {
            "pier2": 8,
            "xiziwan": 4
          }
        },
        {
          "title": "택시와 도보를 섞을 예정",
          "desc": "호텔 컨디션과 편의성을 더 보고 싶어요.",
          "scores": {
            "sanduo": 6,
            "central": 4
          }
        }
      ]
    },
    {
      "title": "가장 끌리는 여행 분위기는 무엇인가요?",
      "help": "여행 분위기를 기준으로 고르면 지역 선택이 쉬워집니다.",
      "options": [
        {
          "title": "대만 도심과 야시장",
          "desc": "가오슝 특유의 항구 분위기를 느끼고 싶어요.",
          "scores": {
            "formosa": 8,
            "central": 4
          }
        },
        {
          "title": "쇼핑과 카페",
          "desc": "거리 분위기와 식사 선택지가 중요해요.",
          "scores": {
            "central": 8,
            "sanduo": 3
          }
        },
        {
          "title": "항구 예술 공간",
          "desc": "보얼예술특구와 아이허 산책이 좋아요.",
          "scores": {
            "pier2": 8,
            "xiziwan": 3
          }
        },
        {
          "title": "바다와 노을",
          "desc": "치진과 시즈완을 여유롭게 보고 싶어요.",
          "scores": {
            "xiziwan": 8,
            "pier2": 3
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 편인가요?",
      "help": "가오슝은 위치와 객실 컨디션을 함께 봐야 합니다.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "숙박비를 낮추고 싶어요.",
          "scores": {
            "central": 7,
            "formosa": 5,
            "zuoying": 3
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "이동과 숙박비를 모두 보고 싶어요.",
          "scores": {
            "formosa": 5,
            "central": 5,
            "pier2": 3
          }
        },
        {
          "title": "위치 우선",
          "desc": "짧은 일정이라 이동 시간을 줄이고 싶어요.",
          "scores": {
            "formosa": 6,
            "central": 5,
            "sanduo": 3
          }
        },
        {
          "title": "호텔 컨디션 우선",
          "desc": "객실과 휴식을 중요하게 봐요.",
          "scores": {
            "sanduo": 8,
            "zuoying": 5
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "피하고 싶은 요소를 기준으로 고르면 실패 확률이 줄어듭니다.",
      "options": [
        {
          "title": "도착·출발 이동 스트레스",
          "desc": "짐 들고 이동이 복잡한 건 싫어요.",
          "scores": {
            "formosa": 6,
            "zuoying": 7,
            "sanduo": 2
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "desc": "숙소에서는 조용히 쉬고 싶어요.",
          "scores": {
            "xiziwan": 8,
            "sanduo": 5,
            "pier2": 4
          }
        },
        {
          "title": "주변에 먹을 곳 없음",
          "desc": "호텔 근처 식당이 중요해요.",
          "scores": {
            "central": 7,
            "formosa": 6,
            "zuoying": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "desc": "일정이 바뀌어도 움직이기 쉬웠으면 해요.",
          "scores": {
            "formosa": 6,
            "central": 5,
            "sanduo": 4
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "formosa": "MRT 중심과 야시장이 가까운",
  "central": "쇼핑과 도심 산책이 가벼운",
  "sanduo": "85타워와 항구 야경이 가까운",
  "pier2": "보얼예술특구와 항구 산책을 함께 즐기기 좋은 곳",
  "zuoying": "고속철도와 아레나 이동이 편한",
  "xiziwan": "바다 노을과 치진 산책이 가까운"
};

const hotelAccessPresets = {
  "formosa": {
    "station": "미려도역·류허야시장 도보권",
    "airport": "가오슝공항 MRT 약 20~30분"
  },
  "central": {
    "station": "중앙공원역·신주에장 도보권",
    "airport": "가오슝공항 MRT 약 20~30분"
  },
  "sanduo": {
    "station": "산둬상권역·85타워 접근",
    "airport": "가오슝공항 MRT 약 15~25분"
  },
  "pier2": {
    "station": "옌청푸역·보얼예술특구 도보권",
    "airport": "공항 MRT+경전철 약 35~45분"
  },
  "zuoying": {
    "station": "쭤잉역·한신아레나 접근",
    "airport": "공항 MRT 약 30~40분"
  },
  "xiziwan": {
    "station": "시즈완·치진 선착장 접근",
    "airport": "공항 MRT+이동 약 40~55분"
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
