/*
 * Kaohsiung hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  "cityName": "가오슝",
  "destinationSlug": "kaohsiung",
  "postContentType": "top5_series",
  "areas": {
    "formosa": {
      "name": "미려도역·류허야시장",
      "regionSlug": "kaohsiung-formosa",
      "regionSlugAliases": [
        "formosa",
        "미려도역",
        "미려도역·류허야시장",
        "미려도역"
      ],
      "label": "미려도역 환승과 류허야시장을 중심으로 첫 가오슝 동선을 가장 단순하게 잡는 기본 권역",
      "summary": "미려도역·류허야시장은 레드라인과 오렌지라인 환승, 류허야시장, 중앙공원·보얼예술특구 이동을 함께 보기 좋은 기본 숙소 권역입니다. 가오슝이 처음이거나 2박 3일처럼 일정이 짧다면 이동 실수를 줄이기 좋습니다.",
      "leadTitle": "처음 가는 가오슝에서 MRT와 야시장, 시내 이동을 모두 무난하게 잡고 싶다면 가장 안전한 출발점입니다.",
      "leadText": "류허야시장 바로 안쪽은 밤 분위기가 강합니다. 조용한 숙박을 원한다면 미려도역에서 한 블록 떨어진 호텔이나 방음 후기를 함께 확인하세요.",
      "stayRange": [
        "첫 방문, 짧은 일정, MRT 이동, 류허야시장, 시내 맛집, 공항·고속철도 연결을 함께 보는 여행에 어울립니다.",
        "류허야시장 바로 안쪽은 밤 분위기가 강합니다. 조용한 숙박을 원한다면 미려도역에서 한 블록 떨어진 호텔이나 방음 후기를 함께 확인하세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "해안 일몰과 치진, 보얼예술특구를 매일 길게 즐길 계획이라면 옌청·보얼이나 시즈완 쪽이 더 자연스러울 수 있습니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "첫 방문",
        "짧은 일정",
        "MRT 이동",
        "류허야시장"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "류허야시장 바로 안쪽은 밤 분위기가 강합니다. 조용한 숙박을 원한다면 미려도역에서 한 블록 떨어진 호텔이나 방음 후기를 함께 확인하세요.",
        "해안 일몰과 치진, 보얼예술특구를 매일 길게 즐길 계획이라면 옌청·보얼이나 시즈완 쪽이 더 자연스러울 수 있습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "미려도역",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "처음 가는 가오슝에서 MRT와 야시장, 시내 이동을 모두 무난하게 잡고 싶다면 가장 안전한 출발점입니다.",
      "compareCaution": "해안 일몰과 치진, 보얼예술특구를 매일 길게 즐길 계획이라면 옌청·보얼이나 시즈완 쪽이 더 자연스러울 수 있습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 미려도역 호텔 추천 TOP5",
          "url": "/post/kaohsiung-formosa-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "호텔 두아",
          "tag": "감성 도심형",
          "location": "미려도역·신싱구",
          "reason": "MRT 환승과 깔끔한 객실 분위기를 함께 보는 첫 여행에 잘 맞습니다.",
          "meta": [
            "미려도역",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "브리오 호텔",
          "tag": "디자인 도심형",
          "location": "중앙공원·미려도 접근권",
          "reason": "중심 이동과 감성 숙박을 함께 원하는 커플 여행에 어울립니다.",
          "meta": [
            "미려도역",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "카인드니스 호텔 치시엔",
          "tag": "실속 편의형",
          "location": "류허야시장 접근권",
          "reason": "야시장과 역 접근, 기본 편의성을 함께 보는 일정에 좋습니다.",
          "meta": [
            "미려도역",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "쿵상 디자인 호텔",
          "tag": "가족 실속형",
          "location": "신싱구 생활권",
          "reason": "객실 공간과 시내 이동을 같이 고려하는 가족 여행에 맞습니다.",
          "meta": [
            "미려도역",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "라 호텔 베이스볼 테마 홀",
          "tag": "야시장 실속형",
          "location": "류허야시장 주변",
          "reason": "가격과 류허야시장 접근을 우선하는 짧은 일정에 비교하기 좋습니다.",
          "meta": [
            "미려도역",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    },
    "sanduo": {
      "name": "중앙공원·삼다상권",
      "regionSlug": "kaohsiung-sanduo",
      "regionSlugAliases": [
        "sanduo",
        "중앙공원",
        "중앙공원·삼다상권",
        "삼다상권"
      ],
      "label": "쇼핑몰과 백화점, 85스카이타워, 공항 레드라인을 함께 보는 도심 편의형 권역",
      "summary": "중앙공원·삼다상권은 중앙공원역, 삼다상권역, 85스카이타워, 백화점, 대형 호텔이 모여 있는 도심 편의형 권역입니다. 공항에서 레드라인으로 들어오거나 부모님 동반·쇼핑 일정이 있다면 안정적인 선택지가 됩니다.",
      "leadTitle": "호텔 컨디션과 쇼핑, 공항 접근, 안정적인 도심 분위기를 우선한다면 만족도가 높은 권역입니다.",
      "leadText": "야시장과 예술특구의 감성 동선은 미려도역·옌청보다 약할 수 있습니다. 대신 호텔 컨디션과 식사·쇼핑 편의가 장점입니다.",
      "stayRange": [
        "부모님 동반, 쇼핑, 비 오는 날 실내 동선, 공항 접근, 상급 호텔, 도심 편의 중심 여행에 어울립니다.",
        "야시장과 예술특구의 감성 동선은 미려도역·옌청보다 약할 수 있습니다. 대신 호텔 컨디션과 식사·쇼핑 편의가 장점입니다.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "가오슝다운 항구 풍경과 골목 감성을 숙소 앞에서 기대한다면 보얼·옌청이나 시즈완 쪽이 더 맞습니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "부모님 동반",
        "쇼핑",
        "비 오는 날 실내 동선",
        "공항 접근"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "야시장과 예술특구의 감성 동선은 미려도역·옌청보다 약할 수 있습니다. 대신 호텔 컨디션과 식사·쇼핑 편의가 장점입니다.",
        "가오슝다운 항구 풍경과 골목 감성을 숙소 앞에서 기대한다면 보얼·옌청이나 시즈완 쪽이 더 맞습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "중앙공원",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "호텔 컨디션과 쇼핑, 공항 접근, 안정적인 도심 분위기를 우선한다면 만족도가 높은 권역입니다.",
      "compareCaution": "가오슝다운 항구 풍경과 골목 감성을 숙소 앞에서 기대한다면 보얼·옌청이나 시즈완 쪽이 더 맞습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 중앙공원 호텔 추천 TOP5",
          "url": "/post/kaohsiung-sanduo-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "그랜드 하이라이 호텔",
          "tag": "도심 상급형",
          "location": "중앙공원·한신백화점 생활권",
          "reason": "부모님 동반이나 상급 호텔 컨디션을 중시하는 여행에 맞습니다.",
          "meta": [
            "중앙공원",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "인터컨티넨탈 가오슝",
          "tag": "신축 상급형",
          "location": "삼다상권·아시아신완구",
          "reason": "도심 전망과 호텔 완성도를 우선할 때 비교하기 좋습니다.",
          "meta": [
            "중앙공원",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "실크스 클럽",
          "tag": "럭셔리 부티크형",
          "location": "삼다상권·85스카이타워 접근권",
          "reason": "커플 여행에서 조용한 고급 숙박을 원할 때 어울립니다.",
          "meta": [
            "중앙공원",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "호텔 코지 중산 가오슝",
          "tag": "교통 균형형",
          "location": "삼다상권역 주변",
          "reason": "공항 레드라인과 쇼핑·식사 동선을 함께 보기 좋습니다.",
          "meta": [
            "중앙공원",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "호텔 선샤인",
          "tag": "실속 도심형",
          "location": "삼다상권·85스카이타워 주변",
          "reason": "가격과 도심 접근성을 함께 보는 여행에 비교하기 좋습니다.",
          "meta": [
            "중앙공원",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    },
    "pier2": {
      "name": "옌청·보얼예술특구",
      "regionSlug": "kaohsiung-pier2",
      "regionSlugAliases": [
        "pier2",
        "옌청",
        "옌청·보얼예술특구",
        "보얼예술특구"
      ],
      "label": "보얼예술특구와 항구 산책, 러브리버 야경을 숙소 주변에서 즐기는 감성 권역",
      "summary": "옌청·보얼예술특구는 보얼예술특구, 다강교, 러브리버, 옌청 골목 카페와 항구 풍경을 함께 즐기기 좋은 권역입니다. 낮에는 예술창고와 카페를 보고, 저녁에는 강변과 항구 야경을 걷기 좋습니다.",
      "leadTitle": "가오슝다운 항구 감성과 보얼예술특구를 숙소 주변에서 즐기고 싶다면 가장 매력적인 선택입니다.",
      "leadText": "MRT 오렌지라인과 경전철 동선은 좋지만 공항·고속철도 이동은 한 번 더 환승하는 경우가 많습니다. 도착·출국 시간도 함께 보세요.",
      "stayRange": [
        "커플 여행, 친구 여행, 보얼예술특구, 항구 산책, 카페, 러브리버 야경, 감성 숙박에 어울립니다.",
        "MRT 오렌지라인과 경전철 동선은 좋지만 공항·고속철도 이동은 한 번 더 환승하는 경우가 많습니다. 도착·출국 시간도 함께 보세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "류허야시장 중심 먹거리나 HSR 당일 이동이 핵심이라면 미려도역이나 쭤잉이 더 단순합니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "커플 여행",
        "친구 여행",
        "보얼예술특구",
        "항구 산책"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "MRT 오렌지라인과 경전철 동선은 좋지만 공항·고속철도 이동은 한 번 더 환승하는 경우가 많습니다. 도착·출국 시간도 함께 보세요.",
        "류허야시장 중심 먹거리나 HSR 당일 이동이 핵심이라면 미려도역이나 쭤잉이 더 단순합니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "옌청",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "가오슝다운 항구 감성과 보얼예술특구를 숙소 주변에서 즐기고 싶다면 가장 매력적인 선택입니다.",
      "compareCaution": "류허야시장 중심 먹거리나 HSR 당일 이동이 핵심이라면 미려도역이나 쭤잉이 더 단순합니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 옌청 호텔 추천 TOP5",
          "url": "/post/kaohsiung-pier2-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "시티 스위트 가오슝 피어2",
          "tag": "보얼 접근형",
          "location": "보얼예술특구 도보권",
          "reason": "예술특구와 항구 산책을 중심으로 움직이기 좋은 후보입니다.",
          "meta": [
            "옌청",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "샤토 드 신 가오슝",
          "tag": "옌청 균형형",
          "location": "옌청푸역 주변",
          "reason": "보얼과 러브리버, 오렌지라인 이동을 함께 보기 좋습니다.",
          "meta": [
            "옌청",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "풀론 호텔 가오슝",
          "tag": "항구 도심형",
          "location": "러브리버·보얼 접근권",
          "reason": "항구 전망과 도심 이동을 함께 고려하는 여행에 맞습니다.",
          "meta": [
            "옌청",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "하버 10 호텔",
          "tag": "러브리버 가족형",
          "location": "러브리버 생활권",
          "reason": "강변 산책과 가족형 객실을 함께 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "옌청",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "레전드 호텔 피어2",
          "tag": "감성 실속형",
          "location": "옌청·보얼 접근권",
          "reason": "가격과 보얼예술특구 접근성을 함께 보는 일정에 어울립니다.",
          "meta": [
            "옌청",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    },
    "sizihwan": {
      "name": "시즈완·구산·치진",
      "regionSlug": "kaohsiung-sizihwan",
      "regionSlugAliases": [
        "sizihwan",
        "시즈완",
        "시즈완·구산·치진",
        "시즈완"
      ],
      "label": "시즈완 일몰과 구산페리, 치진 해안 산책을 여유 있게 즐기는 바다형 권역",
      "summary": "시즈완·구산·치진은 시즈완 일몰, 구산페리, 치진 해산물 거리, 해안 산책을 중심으로 가오슝의 바다 분위기를 즐기기 좋은 권역입니다. 도심 관광보다 항구와 바다 시간을 길게 쓰고 싶을 때 후보가 됩니다.",
      "leadTitle": "시즈완 일몰과 치진 바다 산책을 여행의 핵심으로 잡는다면 만족도가 높은 선택입니다.",
      "leadText": "도심 맛집과 야시장을 매일 오가기에는 이동이 생깁니다. 치진·시즈완을 일정의 중심으로 둘 때 우선순위를 올리세요.",
      "stayRange": [
        "일몰, 치진, 해산물, 바다 산책, 재방문, 커플 여행, 여유로운 일정에 어울립니다.",
        "도심 맛집과 야시장을 매일 오가기에는 이동이 생깁니다. 치진·시즈완을 일정의 중심으로 둘 때 우선순위를 올리세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "첫 가오슝 1박 2일에서 MRT 중심 이동과 야시장을 빠르게 보려면 미려도역 쪽이 더 단순합니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "일몰",
        "치진",
        "해산물",
        "바다 산책"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "도심 맛집과 야시장을 매일 오가기에는 이동이 생깁니다. 치진·시즈완을 일정의 중심으로 둘 때 우선순위를 올리세요.",
        "첫 가오슝 1박 2일에서 MRT 중심 이동과 야시장을 빠르게 보려면 미려도역 쪽이 더 단순합니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "시즈완",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "시즈완 일몰과 치진 바다 산책을 여행의 핵심으로 잡는다면 만족도가 높은 선택입니다.",
      "compareCaution": "첫 가오슝 1박 2일에서 MRT 중심 이동과 야시장을 빠르게 보려면 미려도역 쪽이 더 단순합니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 시즈완 호텔 추천 TOP5",
          "url": "/post/kaohsiung-sizihwan-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "워터마크 호텔 더 하버",
          "tag": "항구 전망형",
          "location": "구산페리·시즈완 접근권",
          "reason": "시즈완과 치진 페리 동선을 함께 보기 좋은 후보입니다.",
          "meta": [
            "시즈완",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "시즈완 선셋 비치 리조트",
          "tag": "일몰 휴식형",
          "location": "시즈완 해변권",
          "reason": "도심보다 일몰과 바다 분위기를 우선할 때 어울립니다.",
          "meta": [
            "시즈완",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "인 영 호텔",
          "tag": "치진 해안형",
          "location": "치진 해변 주변",
          "reason": "치진에서 해산물과 해안 산책을 길게 즐기기 좋습니다.",
          "meta": [
            "시즈완",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "오엑스 스위트",
          "tag": "골목 감성형",
          "location": "하마싱·구산 생활권",
          "reason": "하마싱 골목과 항구 산책을 함께 즐기려는 여행에 맞습니다.",
          "meta": [
            "시즈완",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "하마싱 홈스테이",
          "tag": "로컬 감성형",
          "location": "하마싱·구산 주변",
          "reason": "대형 호텔보다 로컬 분위기와 바다 접근을 보고 싶을 때 비교할 만합니다.",
          "meta": [
            "시즈완",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    },
    "zuoying": {
      "name": "쭤잉·연지담·고속철도",
      "regionSlug": "kaohsiung-zuoying",
      "regionSlugAliases": [
        "zuoying",
        "쭤잉",
        "쭤잉·연지담·고속철도",
        "쭤잉"
      ],
      "label": "고속철도 쭤잉역과 연지담, 루이펑야시장을 함께 보는 북부 교통형 권역",
      "summary": "쭤잉·연지담·고속철도 권역은 HSR 쭤잉역, 대만철도 신쭤잉역, 연지담, 루이펑야시장, 가오슝 아레나를 함께 보기 좋은 북부 권역입니다. 대만 다른 도시 이동을 함께 묶거나 가족 여행에서 안정적인 이동을 원할 때 편합니다.",
      "leadTitle": "도시 간 이동과 연지담·루이펑야시장, 가족형 편의를 우선한다면 가장 실용적인 권역입니다.",
      "leadText": "보얼예술특구나 치진, 류허야시장과는 거리가 있습니다. 도심 관광을 매일 많이 넣는다면 이동 시간을 계산하세요.",
      "stayRange": [
        "고속철도 이동, 가족 여행, 연지담, 루이펑야시장, 아레나·쇼핑몰, 북부 일정에 어울립니다.",
        "보얼예술특구나 치진, 류허야시장과는 거리가 있습니다. 도심 관광을 매일 많이 넣는다면 이동 시간을 계산하세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "가오슝 첫 여행의 감성 항구 동선을 숙소 주변에서 즐기고 싶다면 옌청·보얼이 더 어울릴 수 있습니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "고속철도 이동",
        "가족 여행",
        "연지담",
        "루이펑야시장"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "보얼예술특구나 치진, 류허야시장과는 거리가 있습니다. 도심 관광을 매일 많이 넣는다면 이동 시간을 계산하세요.",
        "가오슝 첫 여행의 감성 항구 동선을 숙소 주변에서 즐기고 싶다면 옌청·보얼이 더 어울릴 수 있습니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "쭤잉",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "도시 간 이동과 연지담·루이펑야시장, 가족형 편의를 우선한다면 가장 실용적인 권역입니다.",
      "compareCaution": "가오슝 첫 여행의 감성 항구 동선을 숙소 주변에서 즐기고 싶다면 옌청·보얼이 더 어울릴 수 있습니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 쭤잉 호텔 추천 TOP5",
          "url": "/post/kaohsiung-zuoying-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "H2O 호텔",
          "tag": "아레나 상급형",
          "location": "가오슝 아레나·루이펑 접근권",
          "reason": "가족 여행과 쇼핑·야시장 동선을 함께 보기 좋습니다.",
          "meta": [
            "쭤잉",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "파크 리스 호텔",
          "tag": "디자인 상급형",
          "location": "아레나역 주변",
          "reason": "조용하고 정돈된 북부 도심 숙박을 원할 때 어울립니다.",
          "meta": [
            "쭤잉",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "호텔 R14",
          "tag": "교통 실속형",
          "location": "아레나역·루이펑야시장 접근권",
          "reason": "MRT와 야시장, 쇼핑몰 접근을 함께 보는 여행에 좋습니다.",
          "meta": [
            "쭤잉",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "가든 빌라 가오슝",
          "tag": "연지담 접근형",
          "location": "쭤잉·연지담 생활권",
          "reason": "연지담과 북부 일정, 차량 이동을 함께 고려하기 좋습니다.",
          "meta": [
            "쭤잉",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "이다 로열 호텔",
          "tag": "가족 리조트형",
          "location": "이다월드 외곽권",
          "reason": "아이 동반 가족 여행에서 테마파크와 쇼핑을 함께 볼 때 후보가 됩니다.",
          "meta": [
            "쭤잉",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    },
    "fengshan": {
      "name": "펑산·웨이우잉",
      "regionSlug": "kaohsiung-fengshan",
      "regionSlugAliases": [
        "fengshan",
        "펑산",
        "펑산·웨이우잉",
        "펑산"
      ],
      "label": "웨이우잉 공연장과 펑산 생활권, 비교적 차분한 숙박을 원하는 여행자를 위한 남동부 권역",
      "summary": "펑산·웨이우잉은 국가예술문화센터 웨이우잉, 펑산 생활권, 공항·도심 남동부 이동을 함께 볼 수 있는 권역입니다. 관광지 한복판보다 조용하고 실용적인 숙소를 원하거나 공연·가족 일정이 있다면 후보가 됩니다.",
      "leadTitle": "번화가보다 차분한 숙박과 공연·가족형 일정을 우선한다면 좋은 대안이 될 수 있습니다.",
      "leadText": "주요 관광지와 야시장을 도보로 즐기는 권역은 아닙니다. MRT역 접근성과 택시 이동 시간을 함께 확인하세요.",
      "stayRange": [
        "공연 관람, 조용한 숙박, 가족 여행, 공항 접근, 차량 이동, 도심 번화가를 피하고 싶은 일정에 어울립니다.",
        "주요 관광지와 야시장을 도보로 즐기는 권역은 아닙니다. MRT역 접근성과 택시 이동 시간을 함께 확인하세요.",
        "숙소 주변 식사와 택시 승하차 동선을 함께 확인하세요."
      ],
      "avoidRange": [
        "첫 여행에서 보얼·치진·류허야시장을 중심으로 촘촘하게 돌 계획이라면 중심권 숙소가 더 효율적입니다.",
        "도착·출국 시간과 반대 방향 이동을 계산하지 않는 선택",
        "밤 일정과 아침 출발지를 따로 계산하지 않는 선택"
      ],
      "bestFor": [
        "공연 관람",
        "조용한 숙박",
        "가족 여행",
        "공항 접근"
      ],
      "notFor": [
        "매일 반대편 권역 이동",
        "소음에 매우 민감한 여행",
        "도착·출국 동선만 보는 일정"
      ],
      "bookingTips": [
        "주요 관광지와 야시장을 도보로 즐기는 권역은 아닙니다. MRT역 접근성과 택시 이동 시간을 함께 확인하세요.",
        "첫 여행에서 보얼·치진·류허야시장을 중심으로 촘촘하게 돌 계획이라면 중심권 숙소가 더 효율적입니다.",
        "최근 객실 사진과 방음·청결 후기를 함께 확인하세요."
      ],
      "chips": [
        "펑산",
        "가오슝",
        "숙소 위치",
        "가오슝 여행"
      ],
      "compareGood": "번화가보다 차분한 숙박과 공연·가족형 일정을 우선한다면 좋은 대안이 될 수 있습니다.",
      "compareCaution": "첫 여행에서 보얼·치진·류허야시장을 중심으로 촘촘하게 돌 계획이라면 중심권 숙소가 더 효율적입니다.",
      "mismatchNote": "이번 답변에서 다른 일정 요소를 더 강하게 골랐다면 다른 지역도 함께 비교해보세요.",
      "links": [
        {
          "title": "가오슝 펑산 호텔 추천 TOP5",
          "url": "/post/kaohsiung-fengshan-hotels"
        },
        {
          "title": "가오슝 첫 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-first-trip-hotels"
        },
        {
          "title": "가오슝 가족 여행 호텔 추천 TOP5",
          "url": "/post/kaohsiung-family-hotels"
        },
        {
          "title": "가오슝 가성비 호텔 추천 TOP5",
          "url": "/post/kaohsiung-value-hotels"
        }
      ],
      "hotels": [
        {
          "name": "저스트 슬립 가오슝 중정",
          "tag": "웨이우잉 접근형",
          "location": "중정로·웨이우잉 접근권",
          "reason": "공연장과 도심 남동부 이동을 함께 보기 좋은 후보입니다.",
          "meta": [
            "펑산",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "더 리스 호텔",
          "tag": "클래식 도심형",
          "location": "링야·문화센터권",
          "reason": "조용한 분위기와 안정적인 객실을 함께 고려하기 좋습니다.",
          "meta": [
            "펑산",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "로열 골드 호텔",
          "tag": "펑산 실속형",
          "location": "펑산 생활권",
          "reason": "펑산 중심과 가족형 이동을 실용적으로 보기 좋습니다.",
          "meta": [
            "펑산",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "스프링 아트 호텔",
          "tag": "가성비 생활권",
          "location": "펑산·오자 주변",
          "reason": "가격과 조용한 생활권을 우선할 때 비교할 수 있습니다.",
          "meta": [
            "펑산",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        },
        {
          "name": "카인드니스 호텔 우자",
          "tag": "공항 접근 실속형",
          "location": "우자·샤오강 접근권",
          "reason": "늦은 도착이나 이른 출국, 남부 이동을 함께 볼 때 후보가 됩니다.",
          "meta": [
            "펑산",
            "가오슝",
            "호텔 위치"
          ],
          "url": "/post/kaohsiung-hotel"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 가오슝 여행은 어떤 느낌에 가까운가요?",
      "help": "숙소 위치를 고를 때 가장 먼저 반영할 여행 성격입니다.",
      "options": [
        {
          "title": "처음이에요",
          "scores": {
            "formosa": 8,
            "sanduo": 5,
            "pier2": 3
          }
        },
        {
          "title": "항구 감성 중심",
          "scores": {
            "pier2": 7,
            "sizihwan": 5,
            "formosa": 2
          }
        },
        {
          "title": "가족과 함께",
          "scores": {
            "sanduo": 7,
            "zuoying": 6,
            "fengshan": 4
          }
        },
        {
          "title": "근교 이동도 있어요",
          "scores": {
            "zuoying": 8,
            "formosa": 4,
            "sanduo": 3
          }
        }
      ]
    },
    {
      "title": "가장 기대하는 가오슝 일정은 무엇인가요?",
      "help": "낮과 밤에 시간을 많이 쓸 동선을 골라주세요.",
      "options": [
        {
          "title": "류허야시장·시내 맛집",
          "scores": {
            "formosa": 8,
            "sanduo": 4
          }
        },
        {
          "title": "보얼예술특구·러브리버",
          "scores": {
            "pier2": 8,
            "sizihwan": 3
          }
        },
        {
          "title": "시즈완·치진 일몰",
          "scores": {
            "sizihwan": 8,
            "pier2": 4
          }
        },
        {
          "title": "연지담·루이펑·HSR",
          "scores": {
            "zuoying": 8,
            "sanduo": 2
          }
        }
      ]
    },
    {
      "title": "근교나 외곽 일정은 어느 정도 있나요?",
      "help": "타이난, 불광산, 치산, 컨딩, HSR 이동 비중을 확인합니다.",
      "options": [
        {
          "title": "타이난·HSR 이동",
          "scores": {
            "zuoying": 8,
            "formosa": 3
          }
        },
        {
          "title": "불광산·펑산 방향",
          "scores": {
            "fengshan": 7,
            "sanduo": 3
          }
        },
        {
          "title": "시내와 항구 중심",
          "scores": {
            "formosa": 5,
            "pier2": 5,
            "sizihwan": 3
          }
        },
        {
          "title": "아직 미정",
          "scores": {
            "formosa": 5,
            "sanduo": 4,
            "zuoying": 3
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "밤에 돌아왔을 때 편하게 느낄 분위기를 골라주세요.",
      "options": [
        {
          "title": "활기 있는 야시장",
          "scores": {
            "formosa": 7,
            "zuoying": 5
          }
        },
        {
          "title": "정돈된 도심 편의",
          "scores": {
            "sanduo": 7,
            "formosa": 3
          }
        },
        {
          "title": "감성적인 항구 산책",
          "scores": {
            "pier2": 7,
            "sizihwan": 5
          }
        },
        {
          "title": "조용한 생활권",
          "scores": {
            "fengshan": 7,
            "zuoying": 4,
            "sanduo": 3
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
          "scores": {
            "formosa": 6,
            "pier2": 5,
            "sizihwan": 3
          }
        },
        {
          "title": "커플",
          "scores": {
            "pier2": 6,
            "sanduo": 5,
            "sizihwan": 4
          }
        },
        {
          "title": "부모님 동반",
          "scores": {
            "sanduo": 7,
            "zuoying": 5,
            "formosa": 3
          }
        },
        {
          "title": "아이와 함께",
          "scores": {
            "sanduo": 7,
            "zuoying": 6,
            "fengshan": 5
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
          "scores": {
            "formosa": 5,
            "fengshan": 5,
            "pier2": 3
          }
        },
        {
          "title": "가격·위치 균형",
          "scores": {
            "formosa": 5,
            "sanduo": 5,
            "pier2": 4
          }
        },
        {
          "title": "위치 우선",
          "scores": {
            "formosa": 6,
            "pier2": 5,
            "zuoying": 4
          }
        },
        {
          "title": "호텔 컨디션 우선",
          "scores": {
            "sanduo": 7,
            "zuoying": 5,
            "pier2": 2
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "마지막으로 후회하기 쉬운 요소를 골라주세요.",
      "options": [
        {
          "title": "공항·HSR 이동 스트레스",
          "scores": {
            "sanduo": 5,
            "formosa": 5,
            "zuoying": 7
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "scores": {
            "sanduo": 5,
            "fengshan": 7,
            "zuoying": 4
          }
        },
        {
          "title": "숙소 주변 할 것 없음",
          "scores": {
            "formosa": 6,
            "pier2": 6,
            "sanduo": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "scores": {
            "formosa": 6,
            "sanduo": 5,
            "zuoying": 4
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
  const harborTrip = answerIs(0, "항구 감성 중심");
  const familyTrip = answerIs(0, "가족과 함께");
  const nearTrip = answerIs(0, "근교 이동도 있어요");

  const liuheFood = answerIs(1, "류허야시장·시내 맛집");
  const pier2River = answerIs(1, "보얼예술특구·러브리버");
  const sizihwanCijin = answerIs(1, "시즈완·치진 일몰");
  const lotusHsr = answerIs(1, "연지담·루이펑·HSR");

  const tainanHsr = answerIs(2, "타이난·HSR 이동");
  const fgsFengshan = answerIs(2, "불광산·펑산 방향");
  const cityHarbor = answerIs(2, "시내와 항구 중심");
  const undecided = answerIs(2, "아직 미정");

  const livelyNight = answerIs(3, "활기 있는 야시장");
  const cityComfort = answerIs(3, "정돈된 도심 편의");
  const harborWalk = answerIs(3, "감성적인 항구 산책");
  const quietLocal = answerIs(3, "조용한 생활권");

  const soloFriends = answerIs(4, "혼자 또는 친구");
  const couple = answerIs(4, "커플");
  const parents = answerIs(4, "부모님 동반");
  const kids = answerIs(4, "아이와 함께");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelCondition = answerIs(5, "호텔 컨디션 우선");

  const avoidAirportHsr = answerIs(6, "공항·HSR 이동 스트레스");
  const avoidNoise = answerIs(6, "밤 소음과 혼잡");
  const avoidNothingNearby = answerIs(6, "숙소 주변 할 것 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  if (firstTrip && (liuheFood || undecided || locationFirst || avoidLongMove)) addAreaScore(scores, "formosa", 6);
  if (livelyNight && !avoidNoise) addAreaScore(scores, "formosa", 4);
  if (avoidNoise) addAreaScore(scores, "formosa", -3);

  if ((cityComfort || hotelCondition || parents || kids) && !harborWalk) addAreaScore(scores, "sanduo", 6);
  if (avoidAirportHsr && !tainanHsr) addAreaScore(scores, "sanduo", 3);
  if (familyTrip && (cityComfort || hotelCondition)) addAreaScore(scores, "sanduo", 4);

  if ((harborTrip || pier2River || harborWalk || avoidNothingNearby) && !avoidAirportHsr) addAreaScore(scores, "pier2", 6);
  if ((couple || soloFriends) && pier2River) addAreaScore(scores, "pier2", 3);
  if (parents && pier2River) addAreaScore(scores, "pier2", -1);

  if ((sizihwanCijin || harborWalk) && !avoidLongMove) addAreaScore(scores, "sizihwan", 6);
  if (firstTrip && liuheFood) addAreaScore(scores, "sizihwan", -2);
  if (harborTrip && sizihwanCijin) addAreaScore(scores, "sizihwan", 3);

  if (nearTrip || lotusHsr || tainanHsr || avoidAirportHsr) addAreaScore(scores, "zuoying", 7);
  if ((parents || kids || familyTrip) && lotusHsr) addAreaScore(scores, "zuoying", 4);
  if ((pier2River || sizihwanCijin) && !tainanHsr) addAreaScore(scores, "zuoying", -2);

  if (fgsFengshan || quietLocal || avoidNoise) addAreaScore(scores, "fengshan", 6);
  if ((kids || parents) && fgsFengshan) addAreaScore(scores, "fengshan", 4);
  if ((firstTrip || liuheFood || pier2River) && !quietLocal && !fgsFengshan) addAreaScore(scores, "fengshan", -3);
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
  