/*
 * Sapporo hotel location survey logic.
 * This file is intentionally city-specific.
 * /assets/js/destinations/sapporo/hotel-location-survey.js
 */
const cityConfig = {
  "cityName": "삿포로",
  "destinationSlug": "sapporo",
  "postContentType": "top5_series",
  "areas": {
    "sapporoStation": {
      "name": "삿포로역",
      "regionSlug": "sapporo-station",
      "regionSlugAliases": ["삿포로역", "삿포로역 주변"],
      "label": "공항 이동과 근교 출발에 가장 안정적인 위치",
      "summary": "신치토세공항, 오타루, 비에이·후라노 투어까지 고려하면 삿포로역 주변이 가장 단순합니다.",
      "leadTitle": "첫날 체크인과 근교 출발을 줄이기 좋습니다.",
      "leadText": "JR 삿포로역을 중심으로 움직이면 공항에서 들어오고 나가는 길, 오타루 당일치기, 투어 집결지 이동이 편해집니다. 겨울에는 눈길 이동을 줄일 수 있다는 점도 큽니다.",
      "stayRange": [
        "JR 삿포로역 도보 10분 이내",
        "지하 보행공간 또는 지하철역 접근성이 좋은 위치",
        "공항 복귀가 이른 날에는 역 남쪽·동쪽 접근성 확인"
      ],
      "avoidRange": [
        "스스키노 저녁 일정이 대부분인데 삿포로역 북쪽에 너무 치우친 위치",
        "역 도보 시간은 짧지만 출구와 엘리베이터 동선이 복잡한 호텔",
        "가격만 보고 역에서 멀어지는 선택"
      ],
      "bestFor": [
        "첫 삿포로 여행",
        "근교 당일치기",
        "가족 여행",
        "겨울 여행"
      ],
      "notFor": [
        "저녁 식사와 밤 산책이 여행의 핵심인 일정",
        "조용한 동네 분위기를 원하는 재방문 여행",
        "온천 휴식이 주목적인 일정"
      ],
      "bookingTips": [
        "삿포로역은 출구가 많으니 실제 이용할 출구와 호텔 입구를 같이 확인하세요.",
        "겨울에는 지하 보행공간 접근성을 객실 가격만큼 중요하게 보세요.",
        "오타루나 공항 이동이 있다면 JR 삿포로역 접근성을 우선 비교하세요."
      ],
      "chips": [
        "공항 이동",
        "근교 출발",
        "겨울 이동",
        "첫 여행"
      ],
      "compareGood": "공항, JR, 투어 집결지 동선을 단순하게 만들기 쉽습니다.",
      "compareCaution": "스스키노의 저녁 식사 동선을 매일 길게 잡으면 남쪽 이동이 반복될 수 있습니다.",
      "mismatchNote": "이번 답변에서 맛집, 밤 분위기, 조용한 휴식을 더 중요하게 봤다면 삿포로역은 2순위일 수 있습니다.",
      "links": [
        {
          "title": "삿포로역 근처 호텔 추천 TOP5",
          "url": "/post/sapporo-station-hotels"
        },
        {
          "title": "삿포로 첫 여행 호텔 추천 TOP5",
          "url": "/post/sapporo-first-trip-hotels"
        },
        {
          "title": "오타루 당일치기 숙소 위치 추천",
          "url": "/post/sapporo-otaru-day-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "삿포로역 주변 숙소",
          "tag": "교통 중심",
          "location": "삿포로역 권역",
          "reason": "공항 이동과 근교 출발을 함께 고려할 때 가장 안정적인 후보입니다.",
          "meta": [
            "공항 이동",
            "JR",
            "첫 여행"
          ],
          "url": "/destinations/sapporo/near-trip/"
        },
        {
          "name": "삿포로역 남쪽 숙소",
          "tag": "도심 균형",
          "location": "삿포로역·오도리 사이",
          "reason": "역 접근성과 도심 관광을 함께 잡고 싶은 일정에 잘 맞습니다.",
          "meta": [
            "도심 접근",
            "겨울 이동",
            "짧은 일정"
          ],
          "url": "/destinations/sapporo/first-trip/"
        },
        {
          "name": "JR 접근형 숙소",
          "tag": "근교 출발",
          "location": "JR 삿포로역 생활권",
          "reason": "오타루, 공항 복귀, 투어 집결지 이동을 중요하게 보는 여행자에게 좋습니다.",
          "meta": [
            "오타루",
            "공항 복귀",
            "근교"
          ],
          "url": "/destinations/sapporo/near-trip/"
        },
        {
          "name": "가족 여행 교통형 숙소",
          "tag": "가족형",
          "location": "삿포로역 주변",
          "reason": "아이와 눈길을 오래 걷지 않아도 되는 위치를 찾을 때 후보가 됩니다.",
          "meta": [
            "가족",
            "눈길 이동",
            "편의시설"
          ],
          "url": "/destinations/sapporo/family-trip/"
        },
        {
          "name": "겨울 여행 역세권 숙소",
          "tag": "겨울형",
          "location": "삿포로역 도보권",
          "reason": "눈 오는 날 지상 이동을 줄이고 싶은 여행자에게 비교 가치가 있습니다.",
          "meta": [
            "겨울",
            "역세권",
            "지하 이동"
          ],
          "url": "/destinations/sapporo/hotel-guide/"
        }
      ]
    },
    "odoriTanukikoji": {
      "name": "오도리 & 타누키코지",
      "regionSlug": "odori-tanukikoji",
      "regionSlugAliases": ["오도리 & 타누키코지", "오도리·타누키코지", "오도리 타누키코지"],
      "label": "도심 관광과 쇼핑을 균형 있게 보기 좋은 위치",
      "summary": "오도리공원, TV타워, 타누키코지, 스스키노를 한 흐름으로 묶고 싶다면 오도리·타누키코지가 편합니다.",
      "leadTitle": "대표 명소와 저녁 동선을 짧게 연결하기 좋습니다.",
      "leadText": "오도리는 삿포로역과 스스키노 사이에 있어 첫 여행자가 가장 이해하기 쉬운 균형점입니다. 타누키코지 상점가를 이용하면 비나 눈이 오는 날에도 식사와 쇼핑 동선을 잡기 좋습니다.",
      "stayRange": [
        "오도리역, 니시4초메, 타누키코지 도보권",
        "오도리공원 행사장과 상점가 접근성이 좋은 위치",
        "스스키노까지 걸어갈 수 있지만 너무 깊지 않은 위치"
      ],
      "avoidRange": [
        "축제 기간 가격만 보고 예약하는 선택",
        "스스키노 한복판과 가까워 소음 후기가 많은 호텔",
        "공항 복귀가 이른데 삿포로역 접근성을 전혀 보지 않는 선택"
      ],
      "bestFor": [
        "첫 여행",
        "쇼핑",
        "축제 일정",
        "커플 여행"
      ],
      "notFor": [
        "JR 근교 이동이 매일 있는 일정",
        "완전히 조용한 휴식이 필요한 여행",
        "온천 1박이 여행의 핵심인 일정"
      ],
      "bookingTips": [
        "오도리역 출구와 호텔까지의 실제 도보 거리를 확인하세요.",
        "눈축제 기간에는 예약 시기와 가격 변동을 특히 신경 써야 합니다.",
        "타누키코지 접근성을 원한다면 상점가와 호텔 사이의 실제 길을 확인하세요."
      ],
      "chips": [
        "오도리공원",
        "쇼핑",
        "축제",
        "도심 균형"
      ],
      "compareGood": "도심 관광, 쇼핑, 식사를 균형 있게 이어가기 쉽습니다.",
      "compareCaution": "축제 시즌에는 가격이 오르기 쉽고 중심부 소음도 확인해야 합니다.",
      "mismatchNote": "근교 출발과 공항 복귀가 더 중요하다면 삿포로역이 더 편할 수 있습니다.",
      "links": [
        {
          "title": "오도리공원 근처 호텔 추천 TOP5",
          "url": "/post/sapporo-odori-hotels"
        },
        {
          "title": "타누키코지 근처 호텔 추천 TOP5",
          "url": "/post/sapporo-tanukikoji-hotels"
        },
        {
          "title": "삿포로 눈축제 숙소 위치 추천",
          "url": "/post/sapporo-snow-festival-hotels"
        }
      ],
      "hotels": [
        {
          "name": "오도리공원 주변 숙소",
          "tag": "도심 관광",
          "location": "오도리 권역",
          "reason": "오도리공원과 TV타워, 시계탑을 짧게 묶기 좋은 후보입니다.",
          "meta": [
            "도심 관광",
            "축제",
            "첫 여행"
          ],
          "url": "/destinations/sapporo/first-trip/"
        },
        {
          "name": "타누키코지 주변 숙소",
          "tag": "쇼핑 중심",
          "location": "오도리·스스키노 사이",
          "reason": "쇼핑과 저녁 식사, 비 오는 날 이동을 같이 고려할 때 좋습니다.",
          "meta": [
            "쇼핑",
            "식사",
            "실속"
          ],
          "url": "/destinations/sapporo/value-hotel/"
        },
        {
          "name": "오도리 서쪽 숙소",
          "tag": "차분한 도심",
          "location": "오도리 서쪽",
          "reason": "중심 접근성은 유지하면서 번잡함을 줄이고 싶을 때 후보가 됩니다.",
          "meta": [
            "차분함",
            "도심 접근",
            "커플"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "스스키노 북쪽 숙소",
          "tag": "저녁 일정",
          "location": "오도리·스스키노 사이",
          "reason": "저녁 일정과 도심 관광을 모두 챙기고 싶은 여행자에게 어울립니다.",
          "meta": [
            "저녁 식사",
            "도보 동선",
            "커플"
          ],
          "url": "/destinations/sapporo/first-trip/"
        },
        {
          "name": "축제 접근형 숙소",
          "tag": "시즌형",
          "location": "오도리공원 도보권",
          "reason": "눈축제나 여름 축제처럼 오도리 행사 접근성이 중요한 일정에 비교해볼 만합니다.",
          "meta": [
            "축제",
            "오도리",
            "시즌"
          ],
          "url": "/destinations/sapporo/hotel-guide/"
        }
      ]
    },
    "susukino": {
      "name": "스스키노",
      "regionSlug": "susukino",
      "regionSlugAliases": ["스스키노"],
      "label": "맛집과 저녁 일정에 강한 위치",
      "summary": "삿포로 저녁 식사, 라멘, 징기스칸, 이자카야가 중요하다면 스스키노가 편합니다.",
      "leadTitle": "저녁 식사 후 숙소로 돌아오는 길이 짧아집니다.",
      "leadText": "스스키노는 삿포로의 대표 번화가라 식당 선택지가 많습니다. 친구 여행이나 커플 여행처럼 저녁 일정이 중요한 여행자에게 잘 맞지만, 조용함이 우선이라면 한복판은 피하는 편이 좋습니다.",
      "stayRange": [
        "스스키노역, 호스이스스키노역 도보권",
        "오도리와 스스키노 사이의 북쪽 구역",
        "소음 후기가 적고 큰길 접근성이 좋은 위치"
      ],
      "avoidRange": [
        "번화가 안쪽 저층 객실",
        "가족 여행인데 주변 분위기를 확인하지 않은 선택",
        "눈길 이동이 걱정되는데 역에서 먼 호텔"
      ],
      "bestFor": [
        "맛집 여행",
        "친구 여행",
        "커플 여행",
        "저녁 일정 중심 여행"
      ],
      "notFor": [
        "조용한 숙소가 최우선인 여행",
        "아이와 함께하는 가족 여행",
        "이른 아침 근교 출발이 반복되는 일정"
      ],
      "bookingTips": [
        "소음, 주변 분위기, 객실 층수 후기를 같이 확인하세요.",
        "가족 여행이라면 스스키노 한복판보다 나카지마공원 방향도 비교하세요.",
        "식당 접근성은 좋지만 공항·근교은 삿포로역보다 불편할 수 있습니다."
      ],
      "chips": [
        "맛집",
        "저녁 일정",
        "친구 여행",
        "번화가"
      ],
      "compareGood": "저녁 식사와 늦은 시간 숙소 복귀가 편합니다.",
      "compareCaution": "소음과 주변 분위기를 반드시 확인해야 합니다.",
      "mismatchNote": "이번 답변에서 조용함이나 가족형 안정성을 골랐다면 스스키노 한복판은 맞지 않을 수 있습니다.",
      "links": [
        {
          "title": "스스키노 근처 호텔 추천 TOP5",
          "url": "/post/sapporo-susukino-hotels"
        },
        {
          "title": "삿포로 맛집 여행 호텔 추천 TOP5",
          "url": "/post/sapporo-food-trip-hotels"
        },
        {
          "title": "삿포로 커플 여행 호텔 추천 TOP5",
          "url": "/post/sapporo-couple-hotels"
        }
      ],
      "hotels": [
        {
          "name": "스스키노 북쪽 숙소",
          "tag": "저녁 균형",
          "location": "스스키노·오도리 사이",
          "reason": "저녁 일정은 편하게 가져가면서 번화가 한복판은 피하고 싶을 때 좋습니다.",
          "meta": [
            "맛집",
            "도심 접근",
            "커플"
          ],
          "url": "/destinations/sapporo/first-trip/"
        },
        {
          "name": "스스키노역 주변 숙소",
          "tag": "맛집 중심",
          "location": "스스키노 권역",
          "reason": "징기스칸, 라멘, 이자카야 일정이 많은 여행자에게 어울립니다.",
          "meta": [
            "저녁 식사",
            "친구 여행",
            "도보 동선"
          ],
          "url": "/destinations/sapporo/value-hotel/"
        },
        {
          "name": "호스이스스키노 주변 숙소",
          "tag": "실속형",
          "location": "스스키노 동쪽",
          "reason": "가격과 식사 접근성을 같이 보는 일정에서 후보가 됩니다.",
          "meta": [
            "가성비",
            "식사",
            "역세권"
          ],
          "url": "/destinations/sapporo/value-hotel/"
        },
        {
          "name": "나카지마공원 방향 숙소",
          "tag": "조용한 대안",
          "location": "스스키노 남쪽",
          "reason": "스스키노 접근성은 유지하면서 소음 부담을 줄이고 싶을 때 좋습니다.",
          "meta": [
            "조용함",
            "공원",
            "저녁 식사"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "타누키코지 인근 숙소",
          "tag": "상점가 접근",
          "location": "스스키노 북쪽",
          "reason": "식사와 쇼핑을 한 번에 챙기고 싶은 여행자에게 비교 가치가 있습니다.",
          "meta": [
            "쇼핑",
            "식사",
            "비 오는 날"
          ],
          "url": "/destinations/sapporo/hotel-recommendations/"
        }
      ]
    },
    "nakajimaPark": {
      "name": "나카지마공원",
      "regionSlug": "nakajima-park",
      "regionSlugAliases": ["나카지마공원", "나카지마 공원"],
      "label": "중심 접근성과 조용한 휴식을 함께 보는 위치",
      "summary": "스스키노와 가까우면서도 한결 차분한 숙소 분위기를 원한다면 나카지마공원이 좋습니다.",
      "leadTitle": "저녁 일정과 휴식감 사이의 균형이 좋습니다.",
      "leadText": "나카지마공원 주변은 도심 접근성을 유지하면서 숙소 주변 분위기를 조금 더 차분하게 가져가기 좋습니다. 부모님 동반, 커플 여행, 조용한 숙소를 원하는 여행자에게 잘 맞습니다.",
      "stayRange": [
        "나카지마코엔역 도보권",
        "스스키노까지 도보 또는 지하철로 이동하기 쉬운 위치",
        "공원 방향 객실이나 큰길 접근성이 좋은 호텔"
      ],
      "avoidRange": [
        "삿포로역 북쪽 일정이 많은데 남쪽에만 고정하는 선택",
        "역 도보 시간이 길고 겨울 이동 정보가 부족한 호텔",
        "저녁 식사를 매일 오도리 북쪽에서 할 계획인데 남쪽에 치우친 위치"
      ],
      "bestFor": [
        "조용한 숙소",
        "커플 여행",
        "부모님 동반",
        "도심 접근성을 원하는 휴식형 일정"
      ],
      "notFor": [
        "JR 근교 이동이 매일 있는 일정",
        "스스키노 한복판 분위기를 원하는 여행",
        "도심 명소를 짧게 몰아보는 첫 여행"
      ],
      "bookingTips": [
        "나카지마코엔역 접근성과 스스키노까지의 동선을 같이 확인하세요.",
        "겨울에는 공원 주변 산책보다 역 접근성을 더 우선해서 보세요.",
        "조용함을 원한다면 객실 방향과 도로 소음 후기도 확인하세요."
      ],
      "chips": [
        "조용한 숙소",
        "공원",
        "커플",
        "부모님 동반"
      ],
      "compareGood": "중심 접근성과 차분한 숙소 주변 분위기를 함께 챙기기 좋습니다.",
      "compareCaution": "삿포로역과 오도리 북쪽 일정이 많으면 이동이 조금 반복될 수 있습니다.",
      "mismatchNote": "이번 답변에서 공항 이동, 근교 출발, 쇼핑 접근성을 더 많이 골랐다면 나카지마공원은 보조 후보입니다.",
      "links": [
        {
          "title": "나카지마공원 근처 호텔 추천 TOP5",
          "url": "/post/sapporo-nakajima-park-hotels"
        },
        {
          "title": "삿포로 조용한 호텔 추천 TOP5",
          "url": "/post/sapporo-quiet-hotels"
        },
        {
          "title": "삿포로 부모님과 가기 좋은 호텔 추천 TOP5",
          "url": "/post/sapporo-parents-hotels"
        }
      ],
      "hotels": [
        {
          "name": "나카지마공원 주변 숙소",
          "tag": "조용한 도심",
          "location": "나카지마공원 권역",
          "reason": "스스키노 접근성과 조용한 휴식을 같이 원하는 일정에 잘 맞습니다.",
          "meta": [
            "조용함",
            "공원",
            "도심 접근"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "나카지마코엔역 주변 숙소",
          "tag": "역세권 휴식",
          "location": "나카지마코엔역 도보권",
          "reason": "겨울에도 역 접근성을 유지하면서 차분한 숙박을 기대할 수 있습니다.",
          "meta": [
            "역세권",
            "휴식",
            "커플"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "스스키노 남쪽 숙소",
          "tag": "저녁 접근",
          "location": "스스키노·나카지마공원 사이",
          "reason": "저녁 식사와 조용한 숙소 분위기를 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "저녁 식사",
            "조용함",
            "도보 동선"
          ],
          "url": "/destinations/sapporo/family-trip/"
        },
        {
          "name": "부모님 동반형 숙소",
          "tag": "안정형",
          "location": "나카지마공원 주변",
          "reason": "번잡함을 줄이고 무리 없는 휴식을 원하는 부모님 동반 일정에 어울립니다.",
          "meta": [
            "부모님",
            "휴식",
            "안정형"
          ],
          "url": "/destinations/sapporo/family-trip/"
        },
        {
          "name": "커플 휴식형 숙소",
          "tag": "커플형",
          "location": "공원 주변 도보권",
          "reason": "산책과 저녁 식사, 조용한 분위기를 함께 원하는 커플 여행에 좋습니다.",
          "meta": [
            "커플",
            "공원 산책",
            "차분함"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        }
      ]
    },
    "maruyama": {
      "name": "마루야마 & 오도리 서쪽",
      "regionSlug": "maruyama-odori-west",
      "regionSlugAliases": ["마루야마 & 오도리 서쪽", "마루야마·오도리 서쪽", "마루야마 오도리 서쪽"],
      "label": "느린 여행과 조용한 동네 분위기에 좋은 위치",
      "summary": "삿포로를 여유롭게 보고 싶거나 재방문 여행이라면 마루야마·오도리 서쪽이 잘 맞습니다.",
      "leadTitle": "카페, 산책, 조용한 동네 분위기에 강합니다.",
      "leadText": "마루야마공원, 홋카이도 신궁, 조용한 카페 동선을 좋아한다면 중심부와 다른 삿포로를 느끼기 좋습니다. 다만 첫 여행에서 대표 명소를 많이 보려면 이동이 답답할 수 있습니다.",
      "stayRange": [
        "마루야마코엔역, 니시18초메역, 니시11초메역 접근성 좋은 위치",
        "오도리 서쪽과 마루야마공원 접근성을 함께 보는 위치",
        "카페·산책 동선이 가까운 호텔"
      ],
      "avoidRange": [
        "첫 여행인데 대표 명소 이동을 매일 촘촘히 잡은 일정",
        "스스키노 저녁 식사를 매일 늦게까지 할 계획",
        "겨울에 역에서 멀어 눈길 이동이 긴 호텔"
      ],
      "bestFor": [
        "재방문 여행",
        "조용한 숙소",
        "카페 투어",
        "느린 여행"
      ],
      "notFor": [
        "첫 삿포로 핵심 명소 중심 일정",
        "근교 출발이 많은 여행",
        "친구와 저녁 식사 중심 여행"
      ],
      "bookingTips": [
        "오도리·스스키노까지의 지하철 시간을 확인하세요.",
        "겨울에는 역 도보 거리가 짧은 숙소를 우선 비교하세요.",
        "첫 여행이라면 오도리 서쪽 정도로 타협하는 것도 좋습니다."
      ],
      "chips": [
        "카페",
        "산책",
        "조용함",
        "재방문"
      ],
      "compareGood": "번화가에서 벗어나 삿포로의 차분한 동네 분위기를 느끼기 좋습니다.",
      "compareCaution": "대표 관광지를 촘촘하게 돌 계획이라면 이동 시간이 늘 수 있습니다.",
      "mismatchNote": "이번 답변에서 첫 여행, 공항 이동, 맛집 접근성을 많이 골랐다면 마루야마는 1순위가 아닐 수 있습니다.",
      "links": [
        {
          "title": "삿포로 조용한 동네 숙소 추천",
          "url": "/post/sapporo-calm-neighborhood-hotels"
        },
        {
          "title": "마루야마 근처 호텔 추천",
          "url": "/post/sapporo-maruyama-hotels"
        },
        {
          "title": "삿포로 카페 여행 숙소 추천",
          "url": "/post/sapporo-cafe-trip-hotels"
        }
      ],
      "hotels": [
        {
          "name": "마루야마 주변 숙소",
          "tag": "동네 감성",
          "location": "마루야마 권역",
          "reason": "공원, 신궁, 카페를 중심으로 여유롭게 움직이고 싶은 여행자에게 좋습니다.",
          "meta": [
            "카페",
            "산책",
            "재방문"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "오도리 서쪽 숙소",
          "tag": "균형형",
          "location": "오도리 서쪽",
          "reason": "중심부 접근성을 유지하면서 조용한 분위기를 기대할 수 있습니다.",
          "meta": [
            "차분함",
            "도심 접근",
            "커플"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "니시18초메 주변 숙소",
          "tag": "카페 접근",
          "location": "마루야마·오도리 서쪽",
          "reason": "카페와 산책을 중요하게 보는 느린 여행에 어울립니다.",
          "meta": [
            "카페",
            "조용함",
            "여유"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "재방문 여행자 숙소",
          "tag": "느린 여행",
          "location": "마루야마 생활권",
          "reason": "삿포로 중심부를 이미 봤다면 다른 분위기를 느끼기 좋은 후보입니다.",
          "meta": [
            "재방문",
            "산책",
            "동네 분위기"
          ],
          "url": "/destinations/sapporo/travel-guide/"
        },
        {
          "name": "커플 산책형 숙소",
          "tag": "커플형",
          "location": "공원·카페 도보권",
          "reason": "번화가보다 조용한 산책과 카페를 선호하는 커플 여행에 잘 맞습니다.",
          "meta": [
            "커플",
            "공원",
            "카페"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        }
      ]
    },
    "jozankei": {
      "name": "조잔케이 온천권",
      "regionSlug": "jozankei-onsen",
      "regionSlugAliases": ["조잔케이 온천권", "조잔케이", "조잔케이 온천"],
      "label": "온천 휴식과 겨울 분위기에 강한 위치",
      "summary": "삿포로 도심 관광보다 온천 휴식이 중요하다면 조잔케이를 도심 숙박과 분리해 1박 넣는 방식이 좋습니다.",
      "leadTitle": "도심 관광용이 아니라 쉬어가는 숙소로 봐야 합니다.",
      "leadText": "조잔케이는 삿포로 시내와 성격이 다릅니다. 매일 오가기보다 여행 중 하루를 온천과 휴식에 집중하는 일정으로 잡으면 만족도가 높습니다.",
      "stayRange": [
        "송영버스 또는 대중교통 접근성을 확인할 수 있는 숙소",
        "석식·조식 포함 여부가 일정과 맞는 료칸·호텔",
        "도심 숙박과 분리해 1박으로 넣기 좋은 위치"
      ],
      "avoidRange": [
        "도심 관광을 매일 오갈 계획인데 조잔케이에 숙소를 고정하는 선택",
        "체크인 시간이 늦어 온천을 충분히 즐기기 어려운 일정",
        "송영버스 시간표를 확인하지 않은 예약"
      ],
      "bestFor": [
        "온천 휴식",
        "부모님 동반",
        "커플 여행",
        "겨울 여행"
      ],
      "notFor": [
        "삿포로 도심 관광이 핵심인 짧은 일정",
        "오타루·비에이 등 근교 출발이 많은 일정",
        "밤마다 스스키노에서 식사할 계획"
      ],
      "bookingTips": [
        "송영버스, 체크인 시간, 석식 포함 여부를 먼저 확인하세요.",
        "도심 관광과 조잔케이 숙박은 역할을 분리하는 편이 좋습니다.",
        "겨울에는 이동 시간이 길어질 수 있으니 여유 있게 계획하세요."
      ],
      "chips": [
        "온천",
        "휴식",
        "겨울",
        "부모님 동반"
      ],
      "compareGood": "관광보다 쉬어가는 시간을 확실히 만들 수 있습니다.",
      "compareCaution": "도심 관광과 저녁 식사 동선에는 불리합니다.",
      "mismatchNote": "이번 답변에서 도심 명소, 쇼핑, 근교 출발을 더 많이 골랐다면 조잔케이는 별도 1박 후보로 보세요.",
      "links": [
        {
          "title": "조잔케이 온천 호텔 추천 TOP5",
          "url": "/post/jozankei-onsen-hotels"
        },
        {
          "title": "삿포로 온천 여행 숙소 추천",
          "url": "/post/sapporo-onsen-hotels"
        },
        {
          "title": "부모님과 삿포로 온천 여행 숙소 추천",
          "url": "/post/sapporo-parents-onsen-hotels"
        }
      ],
      "hotels": [
        {
          "name": "조잔케이 온천 숙소",
          "tag": "온천 휴식",
          "location": "조잔케이 온천권",
          "reason": "도심 관광을 마친 뒤 하루 쉬어가는 일정에 적합합니다.",
          "meta": [
            "온천",
            "휴식",
            "겨울"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "송영버스 이용 가능 숙소",
          "tag": "이동 편의",
          "location": "조잔케이 온천권",
          "reason": "시내에서 이동 부담을 줄이고 싶다면 송영 여부를 먼저 확인하세요.",
          "meta": [
            "송영",
            "부모님",
            "편의"
          ],
          "url": "/destinations/sapporo/hotel-guide/"
        },
        {
          "name": "가족 온천형 숙소",
          "tag": "가족형",
          "location": "조잔케이",
          "reason": "관광보다 휴식과 식사를 함께 해결하고 싶은 가족 여행에 좋습니다.",
          "meta": [
            "가족",
            "온천",
            "휴식"
          ],
          "url": "/destinations/sapporo/family-trip/"
        },
        {
          "name": "커플 온천형 숙소",
          "tag": "커플형",
          "location": "조잔케이",
          "reason": "겨울 분위기와 온천을 중심으로 조용히 쉬고 싶은 커플 여행에 어울립니다.",
          "meta": [
            "커플",
            "겨울",
            "휴식"
          ],
          "url": "/destinations/sapporo/quiet-stay/"
        },
        {
          "name": "도심+온천 분리형 일정",
          "tag": "1박 분리",
          "location": "삿포로 도심 + 조잔케이",
          "reason": "도심 2박 후 조잔케이 1박처럼 역할을 나누면 동선이 자연스럽습니다.",
          "meta": [
            "분리 일정",
            "온천",
            "여유"
          ],
          "url": "/destinations/sapporo/travel-guide/"
        }
      ]
    }
  },
  "questions": [
    {
          "title": "이번 삿포로 여행에서 가장 중요한 일정은 무엇인가요?",
          "help": "여행의 중심이 도심 관광인지, 근교 이동인지, 저녁 식사인지에 따라 숙소 위치가 달라집니다.",
          "options": [
            {
              "title": "첫 삿포로",
              "desc": "오도리공원, TV타워, 스스키노, 시장을 무리 없이 보고 싶어요.",
              "scores": {
                "odoriTanukikoji": 6,
                "sapporoStation": 5,
                "susukino": 2
              }
            },
            {
              "title": "근교 일정",
              "desc": "아침 출발과 저녁 복귀가 편했으면 해요.",
              "scores": {
                "sapporoStation": 8,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "맛집·저녁",
              "desc": "라멘, 징기스칸, 이자카야를 편하게 다니고 싶어요.",
              "scores": {
                "susukino": 8,
                "odoriTanukikoji": 4,
                "nakajimaPark": 2
              }
            },
            {
              "title": "조용한 휴식",
              "desc": "번화가보다는 차분한 숙소 주변 분위기를 원해요.",
              "scores": {
                "nakajimaPark": 6,
                "maruyama": 5,
                "jozankei": 4
              }
            }
          ]
        },
    {
          "title": "이번 여행 동행자는 누구인가요?",
          "help": "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
          "options": [
            {
              "title": "혼자 여행",
              "desc": "교통과 주변 편의성이 중요해요.",
              "scores": {
                "sapporoStation": 4,
                "odoriTanukikoji": 3,
                "susukino": 2
              }
            },
            {
              "title": "커플 여행",
              "desc": "맛집, 산책, 분위기를 같이 중요하게 봐요.",
              "scores": {
                "odoriTanukikoji": 4,
                "nakajimaPark": 3,
                "susukino": 3,
                "maruyama": 2
              }
            },
            {
              "title": "친구 여행",
              "desc": "저녁에도 활기차고 먹거리 많은 곳이 좋아요.",
              "scores": {
                "susukino": 6,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "가족·아이",
              "desc": "무리 없는 이동과 안정적인 동선이 중요해요.",
              "scores": {
                "sapporoStation": 5,
                "odoriTanukikoji": 4,
                "nakajimaPark": 3
              }
            },
            {
              "title": "부모님 동반",
              "desc": "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.",
              "scores": {
                "sapporoStation": 5,
                "nakajimaPark": 4,
                "jozankei": 3
              }
            }
          ]
        },
    {
          "title": "삿포로를 방문하는 계절은 언제인가요?",
          "help": "겨울에는 눈길 이동과 지하 보행공간 접근성이 숙소 만족도에 큰 영향을 줍니다.",
          "options": [
            {
              "title": "겨울·눈축제",
              "desc": "눈길 이동을 줄이고 싶어요.",
              "scores": {
                "sapporoStation": 6,
                "odoriTanukikoji": 5,
                "susukino": 2
              }
            },
            {
              "title": "봄·여름·가을",
              "desc": "도심 산책과 공원 일정도 여유롭게 넣고 싶어요.",
              "scores": {
                "odoriTanukikoji": 4,
                "maruyama": 4,
                "nakajimaPark": 3
              }
            },
            {
              "title": "온천 휴식",
              "desc": "도심보다 하루 쉬어가는 느낌을 원해요.",
              "scores": {
                "jozankei": 8,
                "nakajimaPark": 2
              }
            }
          ]
        },
    {
          "title": "근교 여행 계획이 있나요?",
          "help": "오타루, 비에이, 후라노, 조잔케이 여부에 따라 추천 위치가 달라집니다.",
          "options": [
            {
              "title": "근교 2일 이상",
              "desc": "오타루나 비에이·후라노까지 볼 예정이에요.",
              "scores": {
                "sapporoStation": 8,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "오타루 하루",
              "desc": "시내 관광도 중요하지만 하루는 근교를 보고 싶어요.",
              "scores": {
                "sapporoStation": 5,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "조잔케이 1박",
              "desc": "도심과 온천을 나눠 쉬고 싶어요.",
              "scores": {
                "jozankei": 8,
                "nakajimaPark": 2
              }
            },
            {
              "title": "시내 중심",
              "desc": "오도리, 스스키노, 시장, 쇼핑 동선이 더 중요해요.",
              "scores": {
                "odoriTanukikoji": 5,
                "susukino": 4,
                "nakajimaPark": 2
              }
            }
          ]
        },
    {
          "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
          "help": "삿포로는 스스키노와 공원 주변의 체감 분위기가 꽤 다릅니다.",
          "options": [
            {
              "title": "번화가",
              "desc": "저녁에도 주변에 식당과 볼거리가 많았으면 해요.",
              "scores": {
                "susukino": 7,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "깔끔한 도심",
              "desc": "역, 백화점, 지하상가가 가까우면 좋아요.",
              "scores": {
                "sapporoStation": 6,
                "odoriTanukikoji": 3
              }
            },
            {
              "title": "차분한 숙소",
              "desc": "중심 접근성은 필요하지만 너무 복잡한 건 싫어요.",
              "scores": {
                "nakajimaPark": 5,
                "maruyama": 4,
                "odoriTanukikoji": 2
              }
            },
            {
              "title": "온천·휴식",
              "desc": "시내 관광보다 쉬는 시간이 중요해요.",
              "scores": {
                "jozankei": 8,
                "nakajimaPark": 2
              }
            }
          ]
        },
    {
          "title": "눈길·도보 이동이 걱정되나요?",
          "help": "겨울 삿포로는 지하보도와 역 접근성이 체감 만족도에 크게 영향을 줍니다.",
          "options": [
            { "title": "매우 걱정", "desc": "눈길에서 오래 걷는 동선은 피하고 싶어요.", "scores": { "sapporoStation": 6, "odoriTanukikoji": 5, "nakajimaPark": 2 } },
            { "title": "보통", "desc": "중심부 안에서 적당히 걷는 정도는 괜찮아요.", "scores": { "odoriTanukikoji": 4, "sapporoStation": 3, "susukino": 2 } },
            { "title": "상관없음", "desc": "이동보다 분위기와 휴식감을 더 중요하게 봐요.", "scores": { "maruyama": 4, "nakajimaPark": 3, "jozankei": 3 } }
          ]
        },
    {
          "title": "저녁 동선은 얼마나 중요한가요?",
          "help": "저녁 식사와 술집, 야간 이동을 중요하게 보면 스스키노와 오도리 쪽이 강해집니다.",
          "options": [
            { "title": "매우 중요", "desc": "저녁에도 걸어서 먹고 이동하기 쉬운 곳이 좋아요.", "scores": { "susukino": 7, "odoriTanukikoji": 4, "nakajimaPark": 2 } },
            { "title": "보통", "desc": "저녁 동선도 필요하지만 너무 번잡한 곳은 아니어도 괜찮아요.", "scores": { "odoriTanukikoji": 4, "sapporoStation": 3, "nakajimaPark": 2 } },
            { "title": "조용함 우선", "desc": "저녁보다 숙소 주변의 차분함과 휴식이 더 중요해요.", "scores": { "nakajimaPark": 5, "maruyama": 4, "jozankei": 3 } }
          ]
        },
    {
          "title": "숙소 예산은 어떤 편인가요?",
          "help": "중심부와 축제 기간에는 가격이 올라갈 수 있어 외곽 대안도 함께 봐야 합니다.",
          "options": [
            {
              "title": "예산 절약",
              "desc": "중심가 바로 앞이 아니어도 괜찮아요.",
              "scores": {
                "nakajimaPark": 4,
                "maruyama": 3,
                "susukino": 2,
                "odoriTanukikoji": 2
              }
            },
            {
              "title": "가격·위치 균형",
              "desc": "너무 비싸지 않으면서 이동도 편했으면 해요.",
              "scores": {
                "odoriTanukikoji": 4,
                "sapporoStation": 3,
                "nakajimaPark": 3
              }
            },
            {
              "title": "위치 우선",
              "desc": "짧은 일정이라 이동 시간을 줄이고 싶어요.",
              "scores": {
                "sapporoStation": 5,
                "odoriTanukikoji": 5,
                "susukino": 3
              }
            },
            {
              "title": "온천 예산 추가",
              "desc": "하루는 제대로 쉬고 싶어요.",
              "scores": {
                "jozankei": 8
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
  const firstSapporo = answerIs(0, "첫 삿포로");
  const nearSchedule = answerIs(0, "근교 일정") || answerIs(3, "근교 2일 이상") || answerIs(3, "오타루 하루");
  const foodDinner = answerIs(0, "맛집·저녁") || answerIs(6, "매우 중요") || answerIs(4, "번화가");
  const quietRest = answerIs(0, "조용한 휴식") || answerIs(4, "차분한 숙소") || answerIs(6, "조용함 우선");
  const family = answerIn(1, ["가족·아이", "부모님 동반"]);
  const friends = answerIs(1, "친구 여행");
  const couple = answerIs(1, "커플 여행");
  const winter = answerIs(2, "겨울·눈축제");
  const greenSeason = answerIs(2, "봄·여름·가을");
  const onsenSeason = answerIs(2, "온천 휴식");
  const jozankeiNight = answerIs(3, "조잔케이 1박");
  const cityOnly = answerIs(3, "시내 중심");
  const cleanCity = answerIs(4, "깔끔한 도심");
  const onsenMood = answerIs(4, "온천·휴식");
  const snowVery = answerIs(5, "매우 걱정");
  const snowNormal = answerIs(5, "보통");
  const snowOk = answerIs(5, "상관없음");
  const dinnerNormal = answerIs(6, "보통");
  const budgetSave = answerIs(7, "예산 절약");
  const balanceBudget = answerIs(7, "가격·위치 균형");
  const locationFirst = answerIs(7, "위치 우선");
  const onsenBudget = answerIs(7, "온천 예산 추가");

  if ((nearSchedule || winter || snowVery) && (family || locationFirst || firstSapporo)) {
    addAreaScore(scores, "sapporoStation", 5);
  }
  if (nearSchedule && winter) {
    addAreaScore(scores, "sapporoStation", 3);
  }
  if (cleanCity && snowVery) {
    addAreaScore(scores, "sapporoStation", 2);
  }

  if (firstSapporo && (cityOnly || snowNormal || balanceBudget)) {
    addAreaScore(scores, "odoriTanukikoji", 5);
  }
  if (greenSeason && cityOnly) {
    addAreaScore(scores, "odoriTanukikoji", 3);
  }
  if (balanceBudget && !nearSchedule && !foodDinner) {
    addAreaScore(scores, "odoriTanukikoji", 2);
  }

  if (foodDinner && (friends || cityOnly)) {
    addAreaScore(scores, "susukino", 7);
  }
  if (foodDinner && !family && !snowVery) {
    addAreaScore(scores, "susukino", 3);
  }

  if (quietRest && (family || couple || dinnerNormal)) {
    addAreaScore(scores, "nakajimaPark", 5);
  }
  if (foodDinner && quietRest) {
    addAreaScore(scores, "nakajimaPark", 3);
  }
  if (budgetSave && quietRest) {
    addAreaScore(scores, "nakajimaPark", 2);
  }

  if (greenSeason && quietRest && !nearSchedule) {
    addAreaScore(scores, "maruyama", 6);
  }
  if (snowOk && quietRest && !cityOnly) {
    addAreaScore(scores, "maruyama", 3);
  }
  if (budgetSave && greenSeason) {
    addAreaScore(scores, "maruyama", 2);
  }

  if (jozankeiNight || onsenSeason || onsenMood || onsenBudget) {
    addAreaScore(scores, "jozankei", 6);
  }
  if ((jozankeiNight || onsenBudget) && family) {
    addAreaScore(scores, "jozankei", 4);
  }
  if (onsenSeason && onsenBudget) {
    addAreaScore(scores, "jozankei", 5);
  }


  // v13 accuracy reinforcement: Maruyama needs to surface for green-season, quiet, park/cafe style trips instead of being swallowed by Nakajima Park.
  const relaxedStart = answerIs(0, "조용한 휴식");
  const noOnsenCore = !(jozankeiNight || onsenSeason || onsenMood || onsenBudget);
  if (relaxedStart && greenSeason && quietRest && noOnsenCore && !nearSchedule) {
    addAreaScore(scores, "maruyama", 12);
  }
  if (couple && greenSeason && (quietRest || snowOk) && noOnsenCore) {
    addAreaScore(scores, "maruyama", 7);
  }
  if (budgetSave && greenSeason && quietRest && noOnsenCore) {
    addAreaScore(scores, "maruyama", 6);
  }
  if (snowOk && answerIs(6, "조용함 우선") && noOnsenCore && !nearSchedule) {
    addAreaScore(scores, "maruyama", 6);
  }
  if (quietRest && family && noOnsenCore) {
    addAreaScore(scores, "nakajimaPark", 4);
  }
  if (foodDinner && friends) {
    addAreaScore(scores, "susukino", 4);
  }
  if (nearSchedule && !snowVery && !locationFirst) {
    addAreaScore(scores, "sapporoStation", -2);
  }
  if (greenSeason && !nearSchedule && !winter && noOnsenCore) {
    addAreaScore(scores, "sapporoStation", -2);
  }


  // v13 balance pass: Maruyama should appear for park/cafe, green-season and quiet-stay patterns.
  if (greenSeason && quietRest && noOnsenCore) {
    addAreaScore(scores, "maruyama", 10);
  }
  if (relaxedStart && !winter && noOnsenCore) {
    addAreaScore(scores, "maruyama", 8);
  }
  if (greenSeason && answerIs(6, "조용함 우선") && noOnsenCore) {
    addAreaScore(scores, "maruyama", 8);
  }
  if (answerIs(4, "차분한 숙소") && budgetSave && noOnsenCore) {
    addAreaScore(scores, "maruyama", 6);
  }
  if (greenSeason && !cityOnly && !foodDinner && noOnsenCore) {
    addAreaScore(scores, "maruyama", 4);
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

    function getPersuasiveContent(area) {
      const intro = `${area.name}은(는) 이번 여행의 이동, 분위기, 예산 기준과 가장 잘 맞는 위치입니다. 숙소를 이 구역 안에서 먼저 비교하면 불필요한 이동과 고민을 줄이기 쉽습니다.`;
      const reasons = [
        { title: area.leadTitle || "일정 흐름이 단순해집니다", text: area.leadText || area.summary },
        { title: "숙소 위치를 좁히기 쉽습니다", text: Array.isArray(area.stayRange) ? area.stayRange[0] : area.compareGood },
        { title: "예약 전 확인할 점도 분명합니다", text: Array.isArray(area.bookingTips) ? area.bookingTips[0] : area.compareCaution }
      ];
      return {
        intro,
        reasons,
        conclusionTitle: `결론: ${area.name}부터 비교해보세요.`,
        conclusionText: area.compareCaution ? `${area.compareGood} 다만 ${area.compareCaution}` : area.summary
      };
    }

    function renderPersuasiveResult(topArea) {
      const content = getPersuasiveContent(topArea);
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

      renderPersuasiveResult(topArea);
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
  