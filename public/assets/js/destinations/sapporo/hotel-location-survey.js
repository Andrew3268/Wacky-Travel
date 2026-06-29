/*
 * 삿포로 hotel location survey logic.
 * Modernized with the Fukuoka V23 survey UI flow.
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
      "summary": "공항과 근교 여행, 투어 출발 동선을 단순하게 묶어두고 홋카이도 여행의 시작과 끝을 안정적으로 정리하고 싶은 당신에게 잘 맞는 중심 지역입니다.",
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
        "저녁 식사와 저녁 산책이 여행의 핵심인 일정",
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
      "mismatchNote": "이번 답변에서 맛집, 저녁 이후 분위기, 조용한 휴식을 더 중요하게 봤다면 삿포로역은 2순위일 수 있습니다.",
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
      "summary": "넓은 공원 산책과 쇼핑 골목, 스스키노 저녁 일정까지 자연스럽게 이어지는 동선 속에서 삿포로 도심을 균형 있게 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
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
      "summary": "라멘과 징기스칸, 이자카야와 늦은 저녁의 활기가 모이는 거리에서 삿포로의 미식과 밤 분위기를 가장 가까이 느끼고 싶은 당신에게 잘 맞는 중심 지역입니다.",
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
      "summary": "스스키노와 가까운 편리함은 유지하면서도 공원 옆의 차분한 공기 속에서 하루를 조금 느리게 마무리하고 싶은 당신에게 잘 어울리는 조용한 위치입니다.",
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
      "summary": "현지 카페와 작은 상점, 여유로운 동네 산책을 따라 삿포로의 차분한 일상을 천천히 즐기고 싶은 당신에게 잘 어울리는 감성적인 동네입니다.",
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
      "summary": "도심 관광의 속도에서 벗어나 산속 온천과 계곡 풍경 속에서 조용히 쉬어가고 싶은 당신에게 잘 맞는 온천 지역입니다.",
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
        "저녁마다 스스키노에서 식사할 계획"
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

const areaResultBadges = {
  "sapporoStation": "공항과 근교 이동을 시작하기 좋은 중심",
  "odoriTanukikoji": "공원 산책과 쇼핑 골목을 함께 즐기기 좋은 곳",
  "susukino": "저녁 식사와 술집 동선이 가장 편한 중심",
  "nakajimaPark": "공원 곁에 머무는 조용한 여유",
  "maruyama": "카페와 로컬 감성이 스미는 동네",
  "jozankei": "온천 쉼이 깊어지는 산속의 하루"
};
const hotelAccessPresets = {
  "sapporoStation": {
    "station": "JR 삿포로역 도보권",
    "airport": "신치토세공항 JR 약 40분"
  },
  "odoriTanukikoji": {
    "station": "오도리역·타누키코지 도보권",
    "airport": "공항역 환승 약 50분"
  },
  "susukino": {
    "station": "스스키노역 도보권",
    "airport": "공항역 환승 약 50~55분"
  },
  "nakajimaPark": {
    "station": "나카지마공원역 도보권",
    "airport": "공항역 환승 약 55분"
  },
  "maruyama": {
    "station": "마루야마공원·니시18초메역 도보권",
    "airport": "공항역 환승 약 60분"
  },
  "jozankei": {
    "station": "조잔케이 온천가 도보권",
    "airport": "신치토세공항 차량 약 90분 이상"
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
  if (area.key && Object.prototype.hasOwnProperty.call(cityConfig.areas, area.key)) {
    return area.key;
  }

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

function getAreaDestinationLabel(area) {
  const areaKey = getAreaKey(area);
  const badge = areaKey ? areaResultBadges[areaKey] : "";
  const displayName = getAreaDisplayName(area);
  if (area?.destinationLabel) return area.destinationLabel;
  if (badge && displayName) return `${badge}, ${displayName}`;
  return displayName ? `여행 리듬이 편안해지는, ${displayName}` : "이번 여행에 어울리는 숙소 위치";
}

function getHotelAccessInfo(hotel, area) {
  const key = getAreaKey(area);
  const fallback = hotelAccessPresets[key] || {
    station: `${getAreaDisplayName(area)} 주요역 도보권`,
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
  return (Array.isArray(hotel.meta) ? hotel.meta : [])
    .filter(Boolean)
    .slice(0, 3);
}

Object.entries(cityConfig.areas || {}).forEach(([key, area]) => {
  area.key = area.key || key;
  area.resultBadge = area.resultBadge || areaResultBadges[key] || "이번 여행에 어울리는 숙소 위치";
  area.destinationLabel = area.destinationLabel || `${area.resultBadge}, ${getAreaDisplayName(area)}`;
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
  const repeatTrip = answerIn(0, ["재방문", "후쿠오카가 익숙해요"]);
  const airportImportant = answerIs(3, "매우 중요");
  const airportNormal = answerIs(3, "보통");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·야경") || answerIs(6, "번화가");
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

  // 나카스 & 카와바타는 저녁 일정·맛집·친구 여행일 때 텐진과 확실히 갈라지도록 보정합니다.
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
  if (family && answerIs(2, "공원·여유")) {
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
  const repeatTrip = answerIn(0, ["재방문", "후쿠오카가 익숙해요"]);
  const airportImportant = answerIs(3, "매우 중요");
  const nearTripHeavy = answerIs(5, "근교 2일 이상");
  const nearTripOneDay = answerIs(5, "근교 하루");
  const cityOnly = answerIs(5, "시내 중심");
  const nightFood = answerIs(2, "맛집·야경") || answerIs(6, "번화가");
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
    tag.className = "wt-hotel-tag";
    name.className = "wt-hotel-name";
    location.className = "wt-hotel-location";
    reason.className = "wt-hotel-reason";
    meta.className = "wt-hotel-meta";
    footer.className = "wt-hotel-card-footer";
    linkWrap.className = "wt-hotel-link-wrap";
    link.className = "wt-hotel-link";

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
    return `${withJosa(top.name, "이/가")} 이번 일정에 먼저 어울립니다. 다만 ${second.name}도 분위기가 크게 벗어나지 않으니 호텔 가격, 객실 크기, 실제 이동 시간을 함께 보면 선택이 쉬워집니다.`;
  }
  if (gap <= 5) {
    return `${withJosa(top.name, "이/가")} 이번 일정의 흐름과 조금 더 자연스럽게 맞습니다. 일정의 중심이 ${second.name} 쪽에 가까워진다면 그 지역도 함께 살펴볼 만합니다.`;
  }
  return `${top.name} 중심으로 먼저 호텔을 추려보세요. 가격, 객실 크기, 최근 후기를 함께 보면 선택이 더 선명해집니다.`;
}

function getAlternativeSentence(area, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!second) return "";

  const gap = rankedAreas[0].score - second.score;
  if (gap <= 2) {
    return `${second.name}도 함께 볼 만합니다. ${second.compareGood || second.summary}`;
  }
  return `${second.name}도 일정에 따라 잘 맞을 수 있습니다. ${second.compareGood || second.summary}`;
}

function getPersuasiveContent(area, rankedAreas) {
  const contents = {
    hakata: {
      intro: "공항 이동, 하카타역, 근교 당일치기까지 한 번에 잡아야 하는 일정에는 하카타가 가장 단순합니다. 도착일과 출국일의 이동 피로를 줄이고, 일정이 바뀌어도 대응하기 쉽습니다.",
      reasons: [
        { title: "공항 이동이 가장 단순합니다", text: "후쿠오카공항에서 하카타까지 이동 동선이 짧아 늦은 도착이나 이른 출국 일정에서 부담이 적습니다." },
        { title: "근교 일정에 강합니다", text: "JR 하카타역과 버스터미널을 활용하기 쉬워 다자이후, 유후인, 기타큐슈 같은 당일치기 계획을 세우기 좋습니다." },
        { title: "첫 여행 기준점으로 좋습니다", text: "하카타를 기준으로 잡으면 텐진, 나카스, 기온까지의 이동 방향이 명확해져 동선 실수가 줄어듭니다." },
        { title: "주의할 점도 분명합니다", text: "쇼핑과 저녁 분위기만 보면 텐진·나카스보다 덜 화려합니다. 숙소 주변 분위기보다 이동 효율을 우선할 때 가장 만족도가 높습니다." }
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
      intro: "저녁 식사, 포장마차, 강변 야경을 늦게까지 즐기고 싶다면 나카스 & 카와바타가 강합니다. 숙소로 돌아오는 길이 짧아 저녁 시간을 더 편하게 쓸 수 있습니다.",
      reasons: [
        { title: "저녁 이후 이동이 편합니다", text: "나카스 강변, 포장마차, 식당가를 이용한 뒤 택시나 긴 도보 없이 숙소로 돌아가기 쉽습니다." },
        { title: "캐널시티와 상점가를 묶기 좋습니다", text: "캐널시티, 카와바타 상점가, 나카스 야경을 한 흐름으로 연결하기 좋아 짧은 여행에서도 체류감이 큽니다." },
        { title: "친구 여행 만족도가 높습니다", text: "늦은 시간까지 식사와 산책을 넣기 좋아 일정을 빽빽하게 쓰는 여행자에게 잘 맞습니다." },
        { title: "소음 확인은 필수입니다", text: "나카스 중심 저층 객실은 저녁 이후 소음 호불호가 생길 수 있습니다. 조용함이 중요하면 카와바타 쪽이나 한 블록 떨어진 위치가 낫습니다." }
      ],
      conclusionTitle: "나카스 & 카와바타를 1순위로 두면 좋은 여행",
      conclusionText: "맛집과 저녁 이후 이동이 핵심이면 만족도가 높습니다. 부모님 동반, 아이 동반, 조용한 휴식이 우선이면 하카타·기온·오호리 & 모모치 쪽도 같이 비교하세요."
    },
    gion: {
      intro: "하카타와 나카스 사이에서 균형을 잡고 싶다면 기온이 좋습니다. 너무 번잡하지 않으면서 하카타역, 캐널시티, 나카스 접근성을 모두 가져갈 수 있습니다.",
      reasons: [
        { title: "위치 균형이 좋습니다", text: "하카타역과 나카스 사이에 있어 공항·역 이동과 저녁 도보 동선을 모두 무난하게 가져갈 수 있습니다." },
        { title: "첫 여행에도 부담이 적습니다", text: "하카타만큼 단순하고 나카스만큼 번화하지는 않지만, 주요 권역을 고르게 보기에는 안정적입니다." },
        { title: "가격과 위치를 함께 맞추기 좋습니다", text: "핵심 지역 바로 앞보다 부담을 낮추면서도 시내 중심 동선을 크게 포기하지 않는 선택이 가능합니다." },
        { title: "목적이 뚜렷하면 비교가 필요합니다", text: "쇼핑만 보면 텐진, 근교 이동만 보면 하카타, 야경·맛집만 보면 나카스가 더 명확할 수 있습니다." }
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
        { title: "숙박 분위기가 차분합니다", text: "하카타·텐진·나카스보다 저녁 이후 분위기가 덜 복잡해 쉬는 시간을 확보하기 좋습니다." },
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

  setText("selectedAnswerText", `${signal.sentence} 그래서 ${withJosa(area.name, "이/가")} 이번 일정에서 가장 먼저 볼 지역으로 정리됐습니다.`);
}

function getPracticalGuideDesc(area) {
  if (!area) return "";
  return `${withJosa(area.name, "을/를")} 고를 때는 지역명보다 실제 역 출구, 도보 시간, 저녁 이후 이동, 객실 크기를 함께 확인하는 것이 좋습니다.`;
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
  const displayName = getAreaDisplayName(area);
  if (area.compareGood) return area.compareGood.replace(/[.。]\s*$/, "");
  if (area.summary) return area.summary.replace(/[.。]\s*$/, "");
  return `${displayName}만의 다른 매력이 있는`;
}

function getAlternativeDetail(topArea, rankedAreas) {
  const second = rankedAreas?.[1];
  if (!topArea || !second) return null;

  const topName = getAreaDisplayName(topArea);
  const secondName = getAreaDisplayName(second);
  const secondAppeal = getAreaShortAppeal(second);
  const title = "이런 지역도 함께 볼 만해요";
  const text = `${withJosa(topName, "이/가")} 마음에 든다면, ${secondAppeal} ${secondName}도 함께 비교해볼 만합니다. 호텔 가격과 실제 이동 시간이 잘 맞으면 충분히 좋은 선택이 될 수 있습니다.`;

  return { title, text };
}

function renderAlternativeAreaLegacy(topArea, rankedAreas) {
  renderAlternativeArea(topArea, rankedAreas);
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

    name.textContent = hotel.name || "호텔 후보";
    link.href = hotel.url || "#";
    link.textContent = "잔여 객실 확인";
    link.setAttribute("aria-label", `${hotel.name || "호텔 후보"} 잔여 객실 확인`);
    station.textContent = access.station;
    separator.textContent = "|";
    airport.textContent = access.airport;

    headerLeft.appendChild(name);
    header.appendChild(headerLeft);
    header.appendChild(link);

    locationMain.appendChild(station);
    locationMain.appendChild(separator);
    locationMain.appendChild(airport);

    tags.forEach((item, tagIndex) => {
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

function getEmotionalSummary(area) {
  if (!area) return "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
  return area.emotionalSummary || area.summary || area.leadText || "이번 여행 스타일에 맞는 숙소 위치를 찾았습니다.";
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
