/* Kaohsiung hotel location survey logic. */
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
      "summary": "미려도역과 류허야시장 주변은 공항 MRT, 가오슝역, 도심 식사 동선을 단순하게 묶기 좋은 첫 여행 기준점입니다.",
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
      "summary": "중앙공원과 신주에장 상권은 쇼핑, 카페, 젊은 거리 분위기, 도심 접근성을 함께 보기 좋은 숙박지입니다.",
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
      "summary": "산둬상권과 85타워 주변은 백화점, 항구 전망, 비교적 큰 규모의 호텔을 함께 보기 좋은 지역입니다.",
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
      "summary": "옌청푸와 보얼예술특구는 항구 창고를 활용한 예술 공간, 아이허, 경전철 산책 동선을 즐기기 좋은 지역입니다.",
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
      "summary": "쭤잉과 한신아레나 주변은 고속철도, 대만철도, MRT, 루이펑야시장을 함께 활용하기 좋은 북쪽 교통권입니다.",
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
      "summary": "시즈완과 치진 방향은 바다, 노을, 페리, 여유로운 산책을 중심으로 여행하고 싶은 분에게 어울리는 서쪽 휴식권입니다.",
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
      return "일정을 하나씩 맞춰보는 중이에요";
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
  const firstEasy = answerIs(0, "첫 여행이라 이동이 쉬웠으면 해요");
  const hotelShopping = answerIs(0, "호텔 컨디션과 쇼핑이 중요해요");
  const harborWalk = answerIs(0, "항구와 감성 산책이 좋아요");
  const hsrMove = answerIs(0, "고속철도 이동이 있어요");

  const soloFriend = answerIs(1, "혼자 또는 친구와 가요");
  const coupleTrip = answerIs(1, "커플 여행이에요");
  const familyTrip = answerIs(1, "부모님·아이와 함께해요");
  const repeatRest = answerIs(1, "재방문이라 여유롭게 쉬고 싶어요");

  const liuheNight = answerIs(2, "류허야시장 근처");
  const ruifengNight = answerIs(2, "루이펑야시장 근처");
  const loveRiverHarbor = answerIs(2, "아이허와 항구 산책");
  const quietNight = answerIs(2, "숙소에서 조용히 쉬기");

  const airportMrt = answerIs(3, "공항 MRT");
  const hsrTraffic = answerIs(3, "대만 고속철도");
  const lightRailHarbor = answerIs(3, "경전철과 항구 동선");
  const taxiWalk = answerIs(3, "택시와 도보를 섞을 예정");

  const cityNightMarket = answerIs(4, "대만 도심과 야시장");
  const shoppingCafe = answerIs(4, "쇼핑과 카페");
  const harborArt = answerIs(4, "항구 예술 공간");
  const seaSunset = answerIs(4, "바다와 노을");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelConditionFirst = answerIs(5, "호텔 컨디션 우선");

  const avoidArrivalStress = answerIs(6, "도착·출발 이동 스트레스");
  const avoidNoiseCrowd = answerIs(6, "밤 소음과 혼잡");
  const avoidNoFoodNearby = answerIs(6, "주변에 먹을 곳 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  // 미려도·류허야시장: 첫 방문, 공항 MRT, 류허야시장, 짧은 일정 조건이 겹치면 중심권으로 보정합니다.
  if (firstEasy && (airportMrt || liuheNight || cityNightMarket || locationFirst || avoidLongMove || avoidArrivalStress)) {
    addAreaScore(scores, "formosa", 6);
  }
  if (liuheNight && (airportMrt || cityNightMarket || locationFirst || avoidNoFoodNearby)) {
    addAreaScore(scores, "formosa", 5);
  }
  if ((avoidLongMove || avoidArrivalStress) && (airportMrt || locationFirst || balanceBudget)) {
    addAreaScore(scores, "formosa", 3);
  }

  // 중앙공원·신주에장: 쇼핑·카페, 가성비, 도심 식사 선택지를 중시하면 과도하게 미려도로 쏠리지 않도록 보정합니다.
  if ((shoppingCafe || soloFriend || budgetSave || avoidNoFoodNearby) && !(hotelConditionFirst && familyTrip)) {
    addAreaScore(scores, "central", 5);
  }
  if ((balanceBudget || locationFirst || taxiWalk) && (shoppingCafe || avoidNoFoodNearby || soloFriend)) {
    addAreaScore(scores, "central", 3);
  }

  // 산둬상권·85타워: 호텔 컨디션, 쇼핑몰, 가족 여행, 택시 중심 일정이 모이면 우선순위를 올립니다.
  if (hotelShopping || hotelConditionFirst || familyTrip) {
    addAreaScore(scores, "sanduo", 5);
  }
  if ((hotelConditionFirst || taxiWalk || quietNight) && (hotelShopping || familyTrip || shoppingCafe || avoidNoiseCrowd)) {
    addAreaScore(scores, "sanduo", 4);
  }

  // 옌청푸·보얼예술특구: 항구 산책, 아이허, 보얼예술특구, 경전철 동선을 명확히 고른 경우 강하게 보정합니다.
  if (harborWalk || loveRiverHarbor || lightRailHarbor || harborArt) {
    addAreaScore(scores, "pier2", 6);
  }
  if ((coupleTrip || balanceBudget || quietNight) && (loveRiverHarbor || harborArt || lightRailHarbor)) {
    addAreaScore(scores, "pier2", 4);
  }

  // 쭤잉·한신아레나: 고속철도, 루이펑야시장, 가족 동선, 북부 이동 조건이 겹치면 보정합니다.
  if (hsrMove || hsrTraffic || ruifengNight) {
    addAreaScore(scores, "zuoying", 7);
  }
  if ((familyTrip || hotelConditionFirst || avoidArrivalStress || avoidNoFoodNearby) && (hsrMove || hsrTraffic || ruifengNight)) {
    addAreaScore(scores, "zuoying", 4);
  }

  // 시즈완·치진: 바다, 노을, 조용한 휴식, 재방문 조건이 모이면 도심권에 밀리지 않도록 보정합니다.
  if (seaSunset || repeatRest) {
    addAreaScore(scores, "xiziwan", 7);
  }
  if ((quietNight || avoidNoiseCrowd || harborWalk || lightRailHarbor) && (seaSunset || repeatRest)) {
    addAreaScore(scores, "xiziwan", 4);
  }
  if ((coupleTrip || quietNight) && seaSunset) {
    addAreaScore(scores, "xiziwan", 3);
  }

  // 상충 조건 보정: 명확히 다른 여행 성격을 고른 경우 과도한 중심권 추천을 줄입니다.
  if ((harborWalk || loveRiverHarbor || harborArt || seaSunset || repeatRest) && !(airportMrt || liuheNight || cityNightMarket)) {
    addAreaScore(scores, "formosa", -4);
  }
  if ((hsrMove || hsrTraffic || ruifengNight) && !(airportMrt || liuheNight || locationFirst)) {
    addAreaScore(scores, "formosa", -3);
  }
  if ((quietNight || avoidNoiseCrowd || seaSunset || repeatRest) && !(liuheNight || cityNightMarket)) {
    addAreaScore(scores, "central", -2);
  }
  if ((airportMrt || locationFirst || avoidLongMove) && !(seaSunset || repeatRest || quietNight)) {
    addAreaScore(scores, "xiziwan", -3);
  }
  if ((lightRailHarbor || loveRiverHarbor || harborArt) && !(hsrMove || hsrTraffic || ruifengNight)) {
    addAreaScore(scores, "zuoying", -2);
  }
  if ((hsrMove || hsrTraffic || ruifengNight) && !(hotelShopping || familyTrip || hotelConditionFirst)) {
    addAreaScore(scores, "sanduo", -2);
  }
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
      setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 살펴보세요.");
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
        tag.textContent = hotel.tag || "추천 호텔";
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
        return `${withJosa(top.name, "은/는")} 가장 잘 맞는 선택이지만 ${second.name}도 거의 비슷합니다. 두 지역의 호텔 가격, 객실 크기, 실제 이동 시간을 같이 비교하면 선택이 더 쉬워집니다.`;
      }
      if (gap <= 5) {
        return `${withJosa(top.name, "이/가")} 조금 더 유리합니다. 다만 일정의 중심이 ${second.name} 쪽에 더 가깝다면 ${second.name}도 충분히 좋은 대안입니다.`;
      }
      return `${withJosa(top.name, "은/는")} 이번 일정에서 우선순위가 분명한 지역입니다. 먼저 이 지역 안에서 호텔을 추린 뒤 가격, 객실 크기, 최근 후기를 비교해보세요.`;
    }

        function getAlternativeSentence(area, rankedAreas) {
      const second = rankedAreas?.[1];
      if (!second) return "";

      const gap = rankedAreas[0].score - second.score;
      if (gap <= 2) {
        return `${second.name}도 거의 비슷한 선택입니다. ${second.compareGood || second.summary}`;
      }
      return `대안으로는 ${withJosa(second.name, "이/가")} 있습니다. ${second.compareGood || second.summary}`;
    }

    function normalizeResultReasons(area, reasons) {
      const next = Array.isArray(reasons) ? [...reasons] : [];
      if (next.length < 4) {
        const cautionText = [area.compareCaution, area.mismatchNote]
          .filter(Boolean)
          .join(" ") || "추천 지역도 일정 성격에 따라 장단점이 달라집니다. 호텔 예약 전 이동 시간, 주변 분위기, 최근 후기를 함께 확인해두면 좋습니다.";
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
          { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "숙소 위치를 먼저 정하면 하루 일정이 훨씬 단순해집니다." },
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
