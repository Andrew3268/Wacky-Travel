/*
 * Taichung hotel location survey logic.
 * This file is city-specific and keeps Taichung scoring independent from other city sets.
 */
const cityConfig = {
  "cityName": "타이중",
  "destinationSlug": "taichung",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이중역·중구",
      "regionSlug": "taichung-station-central",
      "regionSlugAliases": [
        "타이중역",
        "타이중역·중구",
        "중구"
      ],
      "label": "처음 가는 타이중에서 이동 실수를 줄이고 구도심을 가볍게 보고 싶다면 가장 무난한 출발점입니다.",
      "summary": "타이중역·중구는 기차 이동, 미야하라, 타이중공원, 구도심 맛집을 묶기 쉬운 숙박지입니다.",
      "leadTitle": "타이중 구도심과 기차 이동을 중심으로 짧은 이동을 정리하기 좋은 지역",
      "leadText": "대만철도 타이중역을 기준으로 미야하라, 타이중공원, 제2시장, 구도심 카페를 가볍게 묶기 좋습니다. 타이베이·타이난·가오슝으로 기차 이동을 이어가는 일정이라면 첫 숙소 기준으로 삼기 좋습니다.",
      "stayRange": [
        "타이중역 도보권 또는 미야하라·타이중공원 접근이 쉬운 위치",
        "기차 이동이 있으면 역까지 캐리어 이동이 단순한 곳",
        "구도심 산책을 원하면 큰길과 골목 분위기를 함께 확인"
      ],
      "avoidRange": [
        "고속철도역과 타이중역을 같은 역으로 생각하는 선택",
        "밤늦게 펑지아에서 오래 머무는데 구도심에만 숙소를 고정하는 일정",
        "조용한 휴식이 핵심인데 역 바로 앞 번잡한 위치"
      ],
      "bestFor": [
        "첫 타이중 여행",
        "기차 이동",
        "구도심 산책",
        "짧은 일정"
      ],
      "notFor": [
        "펑지아 야시장 중심 여행",
        "신축 고급 호텔 선호",
        "온천 휴식이 핵심인 일정"
      ],
      "bookingTips": [
        "대만철도 타이중역과 고속철도 타이중역을 구분하세요.",
        "캐리어가 있다면 역 출구와 횡단보도 일정을 확인해두면 좋습니다.",
        "밤 동선이 펑지아라면 택시 복귀 시간을 미리 계산하세요."
      ],
      "chips": [
        "첫 여행",
        "기차 이동",
        "구도심",
        "미야하라",
        "가성비"
      ],
      "compareGood": "기차 이동과 구도심 관광이 단순하고 숙박비 선택 폭도 비교적 넓습니다.",
      "compareCaution": "펑지아 야시장이나 신도심 쇼핑을 매일 오가면 이동 시간이 쌓일 수 있습니다.",
      "mismatchNote": "밤마다 펑지아에서 오래 머물거나 고급 도심 호텔을 원한다면 시툰·시정부 지역을 함께 보세요.",
      "links": [
        {
          "title": "타이중역 근처 호텔 추천 TOP5",
          "url": "/post/taichung-station-hotels"
        },
        {
          "title": "타이중 첫 여행 호텔 추천 TOP5",
          "url": "/post/taichung-first-trip-hotels"
        },
        {
          "title": "타이중 구도심 숙소 위치 가이드",
          "url": "/post/taichung-central-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "53 호텔 타이중",
          "tag": "타이중역 실속형",
          "location": "타이중역·미야하라 주변",
          "reason": "기차 이동과 구도심 산책을 짧게 묶는 일정에서 비교해볼 만합니다.",
          "meta": [
            "타이중역",
            "가성비",
            "구도심"
          ],
          "url": "/post/53-hotel-taichung"
        },
        {
          "name": "시티인 호텔 플러스 타이중역 브랜치",
          "tag": "역세권 깔끔형",
          "location": "타이중역 생활권",
          "reason": "역 접근성과 깔끔한 객실을 함께 보고 싶은 첫 여행자에게 잘 맞습니다.",
          "meta": [
            "역세권",
            "깔끔한 숙소",
            "첫 여행"
          ],
          "url": "/post/cityinn-hotel-plus-taichung-station"
        },
        {
          "name": "찬스 호텔 타이중",
          "tag": "초역세권 실속형",
          "location": "타이중역 앞",
          "reason": "도착 첫날과 출발일 이동을 가볍게 줄이고 싶을 때 볼 만합니다.",
          "meta": [
            "초역세권",
            "짧은 일정",
            "실속"
          ],
          "url": "/post/chance-hotel-taichung"
        },
        {
          "name": "홀리데이 인 익스프레스 타이중 파크",
          "tag": "공원 접근형",
          "location": "타이중공원 주변",
          "reason": "구도심 접근과 비교적 안정적인 호텔 브랜드를 함께 고려할 때 좋습니다.",
          "meta": [
            "타이중공원",
            "브랜드형",
            "가족"
          ],
          "url": "/post/holiday-inn-express-taichung-park"
        },
        {
          "name": "미카사 호텔 타이중",
          "tag": "기차 이동형",
          "location": "타이중역 생활권",
          "reason": "기차역 주변에서 짧은 이동과 실용적인 숙박을 원하는 일정에 맞습니다.",
          "meta": [
            "타이중역",
            "실용형",
            "기차 이동"
          ],
          "url": "/post/micasa-hotel-taichung"
        }
      ]
    },
    "fengjia": {
      "name": "펑지아·시툰",
      "regionSlug": "fengjia-xitun",
      "regionSlugAliases": [
        "펑지아",
        "펑지아·시툰",
        "시툰"
      ],
      "label": "타이중 첫인상을 먹거리와 밤 분위기로 잡고 싶다면 가장 이해하기 쉬운 선택입니다.",
      "summary": "펑지아·시툰은 펑지아 야시장, 쇼핑, 늦은 저녁 먹거리 중심으로 움직이는 여행자에게 잘 맞습니다.",
      "leadTitle": "타이중의 밤 분위기와 먹거리 중심 일정을 가장 쉽게 느끼기 좋은 지역",
      "leadText": "펑지아 야시장을 중심으로 식당, 간식, 쇼핑, 마사지, 카페 선택지가 많습니다. 밤에 숙소 주변에서 시간을 보내고 싶은 친구·커플 여행이라면 만족도가 높습니다.",
      "stayRange": [
        "펑지아 야시장 도보권이되 소음 후기가 적은 위치",
        "시툰 중심 도로와 택시 접근성이 좋은 호텔",
        "밤 복귀가 편한 큰길 주변"
      ],
      "avoidRange": [
        "주말 저녁 소음이 부담스러운 야시장 바로 옆 저층 객실",
        "기차역 이동이 매일 필요한데 야시장만 보고 고르는 선택",
        "아이와 함께하는데 골목 안쪽 이동이 많은 위치"
      ],
      "bestFor": [
        "야시장 중심 여행",
        "친구 여행",
        "커플 여행",
        "쇼핑"
      ],
      "notFor": [
        "조용한 숙소 우선",
        "기차 이동 중심 일정",
        "온천 휴식형 여행"
      ],
      "bookingTips": [
        "야시장과 가까울수록 소음 후기를 꼭 확인해두면 좋습니다.",
        "택시 승하차가 쉬운 큰길 접근성을 함께 보세요.",
        "주말 가격 상승과 객실 면적을 함께 비교하세요."
      ],
      "chips": [
        "야시장",
        "친구 여행",
        "쇼핑",
        "저녁 동선",
        "활기"
      ],
      "compareGood": "밤 동선 후 숙소 복귀가 쉽고 먹거리·쇼핑 선택지가 많습니다.",
      "compareCaution": "타이중역, 미야하라, 구도심 중심 일정이면 이동이 번거롭게 느껴질 수 있습니다.",
      "mismatchNote": "조용한 휴식이나 가족형 여유를 원한다면 초오도·시정부 지역을 함께 보세요.",
      "links": [
        {
          "title": "타이중 펑지아 호텔 추천 TOP5",
          "url": "/post/taichung-fengjia-hotels"
        },
        {
          "title": "펑지아 야시장 도보권 호텔 추천 TOP5",
          "url": "/post/fengjia-night-market-hotels"
        },
        {
          "title": "타이중 친구 여행 호텔 추천 TOP5",
          "url": "/post/taichung-friends-hotels"
        }
      ],
      "hotels": [
        {
          "name": "라 비다 호텔 타이중",
          "tag": "펑지아 도보권",
          "location": "펑지아 야시장 주변",
          "reason": "야시장 방문 후 숙소로 돌아오는 길을 짧게 가져가고 싶은 일정에 잘 맞습니다.",
          "meta": [
            "펑지아",
            "야시장",
            "커플·친구"
          ],
          "url": "/post/la-vida-hotel-taichung"
        },
        {
          "name": "비컨 호텔 타이중",
          "tag": "야시장 중심형",
          "location": "펑지아 상권",
          "reason": "펑지아 야시장 접근을 가장 먼저 보는 여행자에게 알기 쉬운 선택입니다.",
          "meta": [
            "야시장",
            "쇼핑",
            "저녁 동선"
          ],
          "url": "/post/beacon-hotel-taichung"
        },
        {
          "name": "호텔 7 타이중",
          "tag": "실용 시툰형",
          "location": "시툰·펑지아 생활권",
          "reason": "펑지아 접근과 실용적인 숙박비와 야시장 접근성을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "시툰",
            "실속",
            "친구 여행"
          ],
          "url": "/post/hotel-7-taichung"
        },
        {
          "name": "인 원 시티 인",
          "tag": "가성비형",
          "location": "펑지아 생활권",
          "reason": "야시장 생활권에서 가격과 위치를 균형 있게 비교할 때 넣기 좋습니다.",
          "meta": [
            "가성비",
            "펑지아",
            "쇼핑"
          ],
          "url": "/post/in-one-city-inn"
        },
        {
          "name": "페어필드 바이 메리어트 타이중",
          "tag": "브랜드 실용형",
          "location": "시툰 지역",
          "reason": "펑지아와 시툰 이동을 함께 보면서 브랜드 안정감을 원하는 여행에 맞습니다.",
          "meta": [
            "시툰",
            "브랜드형",
            "깔끔함"
          ],
          "url": "/post/fairfield-by-marriott-taichung"
        }
      ]
    },
    "greenway": {
      "name": "초오도·근미술관",
      "regionSlug": "calligraphy-greenway-west",
      "regionSlugAliases": [
        "초오도",
        "초오도·근미술관",
        "Calligraphy Greenway"
      ],
      "label": "타이중에서 차분한 도심 감성과 산책을 함께 잡고 싶다면 처음부터 끝까지 무난하게 가져가기 좋은 쪽입니다.",
      "summary": "초오도·근미술관은 카페, 공원 산책, 미술관, 감성적인 도심 분위기를 함께 즐기기 좋은 지역입니다.",
      "leadTitle": "걷는 시간이 여행의 중요한 즐거움이라면 가장 만족도가 높은 균형형 지역",
      "leadText": "초오도는 국립자연과학박물관에서 국립타이완미술관 방향으로 이어지는 녹지 산책 축입니다. 근미술관, 카페, 브런치, 편집숍, 조용한 식당을 천천히 즐기고 싶은 일정에 잘 맞습니다.",
      "stayRange": [
        "초오도, 근미술관, 시민광장 접근이 쉬운 위치",
        "버스·택시 접근성이 좋은 큰길 주변",
        "카페와 식당이 도보권에 있는 호텔"
      ],
      "avoidRange": [
        "야시장 복귀를 매일 해야 하는데 초오도에만 숙소를 두는 일정",
        "도보 이동이 많은데 주변 편의시설이 적은 위치",
        "객실보다 밤 분위기를 더 중요하게 보는 선택"
      ],
      "bestFor": [
        "커플 여행",
        "카페 투어",
        "조용한 도심",
        "재방문"
      ],
      "notFor": [
        "야시장 중심 일정",
        "기차 이동만 중요한 여행",
        "외곽 온천 숙박"
      ],
      "bookingTips": [
        "초오도 산책로와 근미술관/CMP 블록 미술관 사이 실제 도보 시간을 확인해두면 좋습니다.",
        "숙소 주변 식당 영업시간을 함께 보세요.",
        "재방문 여행이라면 펑지아보다 이 지역이 더 편할 수 있습니다."
      ],
      "chips": [
        "카페",
        "산책",
        "감성 숙소",
        "미술관",
        "커플"
      ],
      "compareGood": "숙소 주변 산책과 카페 만족도가 높고 도심 분위기가 과하게 번잡하지 않습니다.",
      "compareCaution": "야시장·쇼핑몰 중심 일정이면 펑지아나 시정부가 더 직관적입니다.",
      "mismatchNote": "밤 먹거리와 쇼핑을 숙소 주변에서 해결하고 싶다면 펑지아도 함께 비교하세요.",
      "links": [
        {
          "title": "타이중 초오도 호텔 추천 TOP5",
          "url": "/post/taichung-calligraphy-greenway-hotels"
        },
        {
          "title": "타이중 카페 여행 호텔 추천 TOP5",
          "url": "/post/taichung-cafe-hotels"
        },
        {
          "title": "타이중 조용한 숙소 추천 TOP5",
          "url": "/post/taichung-quiet-hotels"
        }
      ],
      "hotels": [
        {
          "name": "더 플레이스 타이중",
          "tag": "미술관 감성형",
          "location": "근미술관·초오도 생활권",
          "reason": "감성적인 도심 산책과 깔끔한 객실 분위기를 함께 원하는 일정에 좋습니다.",
          "meta": [
            "초오도",
            "감성 호텔",
            "커플"
          ],
          "url": "/post/the-place-taichung"
        },
        {
          "name": "더 스플렌더 호텔 타이중",
          "tag": "도심 고급형",
          "location": "초오도·SOGO 생활권",
          "reason": "도심 접근성과 호텔 시설을 함께 보는 가족·커플 여행에 잘 맞습니다.",
          "meta": [
            "초오도",
            "고급형",
            "쇼핑"
          ],
          "url": "/post/the-splendor-hotel-taichung"
        },
        {
          "name": "호텔 내셔널 타이중",
          "tag": "안정형",
          "location": "초오도 주변",
          "reason": "카페·미술관 코스과 안정적인 도심 숙박을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "초오도",
            "안정형",
            "산책"
          ],
          "url": "/post/hotel-national-taichung"
        },
        {
          "name": "에어라인 인 그린 파크 웨이",
          "tag": "쇼핑·산책형",
          "location": "초오도·그린파크웨이",
          "reason": "숙소 주변 쇼핑과 산책을 함께 원하는 1~2인 여행에 맞습니다.",
          "meta": [
            "산책",
            "쇼핑",
            "실용형"
          ],
          "url": "/post/airline-inn-green-park-way"
        },
        {
          "name": "템퍼스 호텔 타이중",
          "tag": "차분한 도심형",
          "location": "서구·초오도 생활권",
          "reason": "번화가보다 차분한 도심 분위기와 객실 컨디션을 함께 볼 때 선택지가 됩니다.",
          "meta": [
            "서구",
            "차분함",
            "가족"
          ],
          "url": "/post/tempus-hotel-taichung"
        }
      ]
    },
    "cityhall": {
      "name": "시정부·국립가극원",
      "regionSlug": "city-hall-national-theater",
      "regionSlugAliases": [
        "시정부",
        "국립가극원",
        "시정부·국립가극원"
      ],
      "label": "호텔 컨디션과 신도심 편의성을 우선한다면 타이중에서 처음 일정에서 부담이 적은 선택입니다.",
      "summary": "시정부·국립가극원은 신도심 쇼핑몰, 깔끔한 거리, 고급 호텔, 가족형 숙박을 같이 살펴보기 좋은 지역입니다.",
      "leadTitle": "대형 쇼핑몰과 신도심 호텔을 선호한다면 부담이 적은 선택지",
      "leadText": "국립타이중극장, 신광미츠코시, 탑시티, 대형 레스토랑이 가까워 날씨가 좋지 않은 날에도 일정을 조정하기 쉽습니다. 택시 이동과 호텔 컨디션을 중시하는 가족·부모님 동반 여행에서도 편한 편입니다.",
      "stayRange": [
        "국립타이중극장, 신광미츠코시, 시정부 주변",
        "택시 접근과 로비 이동이 편한 호텔",
        "쇼핑몰·레스토랑 도보권"
      ],
      "avoidRange": [
        "가격만 보고 신도심 외곽 깊숙한 위치를 고르는 선택",
        "야시장 도보권을 기대하는 일정",
        "구도심 관광을 매일 도보로 해결하려는 계획"
      ],
      "bestFor": [
        "가족 여행",
        "부모님 동반",
        "쇼핑몰",
        "고급 호텔"
      ],
      "notFor": [
        "예산 절약 최우선",
        "야시장 도보권 우선",
        "구도심 산책 위주"
      ],
      "bookingTips": [
        "택시 호출과 호텔 로비 접근성을 확인해두면 좋습니다.",
        "쇼핑몰·레스토랑 영업시간을 고려해 일정을 짜세요.",
        "가족 여행은 객실 면적과 조식 후기를 함께 보세요."
      ],
      "chips": [
        "고급형",
        "쇼핑몰",
        "가족",
        "신도심",
        "국립가극원"
      ],
      "compareGood": "호텔 컨디션과 식사·쇼핑 편의가 좋고 가족 여행에서 일정 조정이 쉽습니다.",
      "compareCaution": "로컬 구도심 분위기와 야시장 활기는 상대적으로 약합니다.",
      "mismatchNote": "예산 절약이나 야시장 중심이라면 타이중역·펑지아도 함께 확인해두면 좋습니다.",
      "links": [
        {
          "title": "타이중 시정부 호텔 추천 TOP5",
          "url": "/post/taichung-city-hall-hotels"
        },
        {
          "title": "국립타이중극장 근처 호텔 추천 TOP5",
          "url": "/post/national-taichung-theater-hotels"
        },
        {
          "title": "타이중 가족 여행 호텔 추천 TOP5",
          "url": "/post/taichung-family-hotels"
        }
      ],
      "hotels": [
        {
          "name": "밀레니엄 호텔 타이중",
          "tag": "신도심 고급형",
          "location": "시정부·국립가극원 지역",
          "reason": "국립가극원과 쇼핑몰, 호텔 컨디션을 함께 보는 여행에 잘 맞습니다.",
          "meta": [
            "신도심",
            "고급형",
            "가족"
          ],
          "url": "/post/millennium-hotel-taichung"
        },
        {
          "name": "더 린 호텔 타이중",
          "tag": "랜드마크형",
          "location": "시정부 생활권",
          "reason": "기념일이나 가족 여행에서 호텔 분위기를 중요하게 볼 때 비교하기 좋습니다.",
          "meta": [
            "고급형",
            "기념일",
            "쇼핑몰"
          ],
          "url": "/post/the-lin-hotel-taichung"
        },
        {
          "name": "헝스 맨션",
          "tag": "깔끔한 도심형",
          "location": "시툰·시정부 주변",
          "reason": "조용한 신도심 숙박과 택시 이동 편의성을 함께 원하는 일정에 맞습니다.",
          "meta": [
            "시툰",
            "깔끔함",
            "커플"
          ],
          "url": "/post/hungs-mansion-taichung"
        },
        {
          "name": "아이클라우드 럭셔리 리조트 앤 호텔",
          "tag": "가족·차량 이동형",
          "location": "시툰 지역",
          "reason": "차량 이동과 넓은 객실을 함께 고려하는 가족 여행 선택지로 볼 만합니다.",
          "meta": [
            "가족",
            "차량 이동",
            "넓은 객실"
          ],
          "url": "/post/icloud-luxury-resort-hotel-taichung"
        },
        {
          "name": "호텔 디온 타이중",
          "tag": "실용 신도심형",
          "location": "시정부·쇼핑몰 생활권",
          "reason": "신도심 접근성과 가격 균형을 함께 보는 여행에 맞는 선택입니다.",
          "meta": [
            "신도심",
            "실속",
            "쇼핑"
          ],
          "url": "/post/hotel-dion-taichung"
        }
      ]
    },
    "yizhong": {
      "name": "이중상권·타이중공원",
      "regionSlug": "yizhong-taichung-park",
      "regionSlugAliases": [
        "이중상권",
        "이중상권·타이중공원",
        "이중야시장",
        "타이중공원"
      ],
      "label": "숙박비를 줄이면서 먹거리와 구도심 접근을 남기고 싶다면 현실적인 선택지입니다.",
      "summary": "이중상권·타이중공원은 가성비 숙소, 로컬 먹거리, 젊은 분위기, 구도심 접근을 같이 살펴보기 좋은 지역입니다.",
      "leadTitle": "가격 부담을 줄이되 숙소 주변 먹거리와 산책 일정은 남기고 싶은 선택지",
      "leadText": "이중상권은 학생가 분위기의 먹거리와 쇼핑이 있고, 타이중공원과 구도심도 가깝습니다. 숙박비를 줄이면서도 주변이 너무 심심하지 않은 곳을 찾는 여행자에게 맞습니다.",
      "stayRange": [
        "이중상권·타이중공원 접근이 쉬운 큰길 주변",
        "버스 정류장과 택시 접근이 편한 위치",
        "최근 후기에서 청결·방음 평가가 좋은 숙소"
      ],
      "avoidRange": [
        "가격만 보고 골목 깊은 위치를 고르는 선택",
        "가족 여행인데 객실 면적 확인 없이 예약하는 경우",
        "밤 소음 후기가 많은 저층 객실"
      ],
      "bestFor": [
        "예산 절약",
        "혼자 여행",
        "친구 여행",
        "로컬 먹거리"
      ],
      "notFor": [
        "고급 호텔",
        "조용한 휴식 최우선",
        "대형 쇼핑몰 중심 여행"
      ],
      "bookingTips": [
        "최근 후기의 청결·방음 언급을 우선 확인해두면 좋습니다.",
        "역·버스 정류장까지의 실제 이동 경로을 보세요.",
        "가성비 숙소일수록 객실 면적과 창문 유무를 확인해두면 좋습니다."
      ],
      "chips": [
        "가성비",
        "로컬 먹거리",
        "혼자 여행",
        "타이중공원",
        "실속"
      ],
      "compareGood": "숙박비 부담을 낮추면서 먹거리와 구도심 접근성을 유지하기 쉽습니다.",
      "compareCaution": "호텔 시설과 신도심 분위기는 시정부·초오도보다 약할 수 있습니다.",
      "mismatchNote": "가족 여행이나 고급 호텔 컨디션이 중요하면 시정부·초오도 지역을 함께 보세요.",
      "links": [
        {
          "title": "타이중 이중상권 호텔 추천 TOP5",
          "url": "/post/taichung-yizhong-hotels"
        },
        {
          "title": "타이중 가성비 호텔 추천 TOP5",
          "url": "/post/taichung-value-hotels"
        },
        {
          "title": "타이중공원 근처 호텔 추천 TOP5",
          "url": "/post/taichung-park-hotels"
        }
      ],
      "hotels": [
        {
          "name": "라이 라이 호텔 타이중",
          "tag": "이중상권 접근형",
          "location": "이중상권 생활권",
          "reason": "먹거리와 쇼핑을 숙소 주변에서 해결하고 싶은 실속 여행에 맞습니다.",
          "meta": [
            "이중상권",
            "가성비",
            "먹거리"
          ],
          "url": "/post/lai-lai-hotel-taichung"
        },
        {
          "name": "인하우스 호텔 타이중",
          "tag": "구도심 실속형",
          "location": "중구·타이중공원 주변",
          "reason": "구도심 접근과 가격 균형을 함께 보고 싶을 때 비교할 만합니다.",
          "meta": [
            "구도심",
            "실속",
            "타이중공원"
          ],
          "url": "/post/inhouse-hotel-taichung"
        },
        {
          "name": "스테이 호텔 타이중",
          "tag": "로컬 상권형",
          "location": "이중상권 주변",
          "reason": "이중상권 먹거리와 비교적 실용적인 객실을 함께 볼 때 선택지가 됩니다.",
          "meta": [
            "이중상권",
            "혼자 여행",
            "실속"
          ],
          "url": "/post/stay-hotel-taichung"
        },
        {
          "name": "타이중 박스 디자인 호텔",
          "tag": "젊은 감성형",
          "location": "이중상권 생활권",
          "reason": "숙박비를 낮추고 젊은 상권 분위기를 즐기고 싶은 여행에 잘 맞습니다.",
          "meta": [
            "가성비",
            "젊은 상권",
            "친구"
          ],
          "url": "/post/taichung-box-design-hotel"
        },
        {
          "name": "겟차 호스텔 앤 비스트로",
          "tag": "초실속형",
          "location": "이중상권 주변",
          "reason": "혼자 여행이나 숙박비 절약이 가장 중요한 일정에서 비교할 만합니다.",
          "meta": [
            "혼자 여행",
            "호스텔",
            "가성비"
          ],
          "url": "/post/getcha-hostel-bistro"
        }
      ]
    },
    "guguan": {
      "name": "구관온천·외곽휴식",
      "regionSlug": "guguan-hot-spring-outskirts",
      "regionSlugAliases": [
        "구관온천",
        "구관온천·외곽휴식",
        "구관",
        "외곽휴식"
      ],
      "label": "타이중 여행에서 하루쯤 온전히 쉬는 시간이 필요하다면 도심과 분리해 볼 만한 선택입니다.",
      "summary": "구관온천·외곽휴식은 타이중 도심보다 온천, 자연, 조용한 휴식에 초점을 둔 여행자에게 맞습니다.",
      "leadTitle": "타이중 도심 관광을 줄이고 온천 숙박 자체를 즐기고 싶을 때 선택하는 지역",
      "leadText": "구관은 타이중 도심에서 떨어진 온천 휴식권입니다. 짧은 첫 여행의 기본 숙소로 두기보다는 도심 2박 후 온천 1박처럼 분리하면 만족도가 높습니다.",
      "stayRange": [
        "구관온천 중심부 또는 송학·온천 시설 접근이 편한 숙소",
        "호텔 내 식사와 온천 이용 조건이 명확한 곳",
        "픽업·교통 안내가 잘 되어 있는 숙소"
      ],
      "avoidRange": [
        "도심 관광을 매일 해야 하는데 구관에만 숙소를 두는 선택",
        "교통 계획 없이 밤늦게 도착하는 일정",
        "온천 이용 조건을 확인하지 않은 예약"
      ],
      "bestFor": [
        "온천 휴식",
        "부모님 동반",
        "커플 휴식",
        "조용한 여행"
      ],
      "notFor": [
        "2박 3일 첫 여행 전 일정",
        "야시장 중심 여행",
        "매일 시내 관광"
      ],
      "bookingTips": [
        "온천 이용 시간과 객실 내 욕조 여부를 확인해두면 좋습니다.",
        "대중교통보다 택시·픽업·렌터카 계획을 먼저 세우세요.",
        "도심 숙박과 1박 분리하는 일정이 가장 무난합니다."
      ],
      "chips": [
        "온천",
        "자연",
        "휴식",
        "부모님",
        "외곽 1박"
      ],
      "compareGood": "도심과 다른 쉰 느낌을 주고 부모님·커플 여행에서 숙소 체류 만족도가 높습니다.",
      "compareCaution": "도심 주요 관광지와 떨어져 있어 전체 일정의 이동 효율은 낮습니다.",
      "mismatchNote": "첫 타이중 여행이 짧다면 도심 숙소를 기본으로 잡고 구관은 1박 분리 또는 다음 여행으로 미루는 편이 좋습니다.",
      "links": [
        {
          "title": "타이중 구관온천 숙소 추천 TOP5",
          "url": "/post/taichung-guguan-hot-spring-hotels"
        },
        {
          "title": "타이중 조용한 휴식 호텔 추천 TOP5",
          "url": "/post/taichung-relax-hotels"
        },
        {
          "title": "타이중 부모님 여행 호텔 추천 TOP5",
          "url": "/post/taichung-parents-hotels"
        }
      ],
      "hotels": [
        {
          "name": "호시노야 구관",
          "tag": "온천 리조트형",
          "location": "구관온천 지역",
          "reason": "온천 숙박 자체가 여행의 핵심일 때 비교할 만한 고급형입니다.",
          "meta": [
            "구관온천",
            "고급 리조트",
            "휴식"
          ],
          "url": "/post/hoshinoya-guguan"
        },
        {
          "name": "유니 리조트 구관",
          "tag": "가족 휴식형",
          "location": "구관온천 지역",
          "reason": "가족·부모님 동반으로 온천과 숙소 체류를 함께 보고 싶을 때 맞습니다.",
          "meta": [
            "온천",
            "가족",
            "외곽 1박"
          ],
          "url": "/post/uni-resort-ku-kuan"
        },
        {
          "name": "발리 네이처 스파 핫 스프링 리조트",
          "tag": "스파 휴식형",
          "location": "구관온천 주변",
          "reason": "스파와 자연 휴식을 함께 원하는 커플 여행에서 비교할 만합니다.",
          "meta": [
            "스파",
            "커플",
            "휴식"
          ],
          "url": "/post/bali-nature-spa-hot-spring-resort"
        },
        {
          "name": "구관 호텔",
          "tag": "온천 실속형",
          "location": "구관온천 생활권",
          "reason": "온천권에서 비교적 실용적인 숙박 선택지를 찾을 때 볼 만합니다.",
          "meta": [
            "온천",
            "실속",
            "부모님"
          ],
          "url": "/post/ku-kuan-hotel"
        },
        {
          "name": "밍가오 스프링 호텔",
          "tag": "전통 온천형",
          "location": "구관온천 지역",
          "reason": "화려함보다 온천 휴식과 기본 숙박을 우선할 때 선택지가 됩니다.",
          "meta": [
            "전통 온천",
            "휴식",
            "외곽"
          ],
          "url": "/post/mingao-spring-hotel"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 타이중 여행은 어떤 성격인가요?",
      "help": "첫 방문인지, 야시장 중심인지, 휴식 중심인지에 따라 숙소 위치가 달라집니다.",
      "options": [
        {
          "title": "처음이에요",
          "desc": "대표 명소와 이동을 쉽게 잡고 싶어요.",
          "scores": {
            "station": 8,
            "fengjia": 4,
            "greenway": 3
          }
        },
        {
          "title": "친구·커플 여행이에요",
          "desc": "야시장, 카페, 쇼핑, 저녁 동선이 중요해요.",
          "scores": {
            "fengjia": 6,
            "greenway": 5,
            "cityhall": 3
          }
        },
        {
          "title": "가족·부모님과 함께해요",
          "desc": "식사, 택시 이동, 호텔 컨디션이 중요해요.",
          "scores": {
            "cityhall": 6,
            "greenway": 4,
            "station": 3,
            "guguan": 3
          }
        },
        {
          "title": "쉬는 시간이 중요해요",
          "desc": "온천이나 조용한 숙박을 넣고 싶어요.",
          "scores": {
            "guguan": 7,
            "greenway": 4,
            "cityhall": 3
          }
        }
      ]
    },
    {
      "title": "가장 중요한 이동은 무엇인가요?",
      "help": "타이중은 기차역, 고속철도역, 야시장, 신도심이 서로 떨어져 있어 반복 이동 기준이 중요합니다.",
      "options": [
        {
          "title": "기차·도착 이동",
          "desc": "타이중역과 구도심을 쉽게 쓰고 싶어요.",
          "scores": {
            "station": 9,
            "yizhong": 3,
            "greenway": 2
          }
        },
        {
          "title": "야시장·저녁 동선",
          "desc": "밤에 숙소 주변에서 먹고 놀고 싶어요.",
          "scores": {
            "fengjia": 8,
            "yizhong": 7,
            "station": 2
          }
        },
        {
          "title": "카페·미술관 산책",
          "desc": "낮에 걷기 좋고 분위기 있는 동네가 좋아요.",
          "scores": {
            "greenway": 8,
            "cityhall": 3,
            "station": 2
          }
        },
        {
          "title": "쇼핑몰·택시 이동",
          "desc": "깔끔한 도심과 호텔 컨디션을 우선해요.",
          "scores": {
            "cityhall": 8,
            "fengjia": 3,
            "greenway": 3
          }
        }
      ]
    },
    {
      "title": "저녁 시간은 어떻게 보내고 싶나요?",
      "help": "타이중 숙소 만족도는 저녁 복귀 경로에서 크게 갈립니다.",
      "options": [
        {
          "title": "펑지아 야시장에 오래 있을래요",
          "desc": "간식, 쇼핑, 늦은 저녁까지 즐기고 싶어요.",
          "scores": {
            "fengjia": 8,
            "cityhall": 2
          }
        },
        {
          "title": "로컬 먹거리 위주가 좋아요",
          "desc": "이중상권이나 구도심 먹거리를 가볍게 즐기고 싶어요.",
          "scores": {
            "yizhong": 9,
            "station": 4,
            "greenway": 2
          }
        },
        {
          "title": "카페나 식당에서 조용히 보내고 싶어요",
          "desc": "밤 소음은 줄이고 차분한 도심이 좋아요.",
          "scores": {
            "greenway": 6,
            "cityhall": 5,
            "guguan": 2
          }
        },
        {
          "title": "숙소에서 쉬는 시간이 더 중요해요",
          "desc": "저녁 동선은 줄이고 휴식을 우선하고 싶어요.",
          "scores": {
            "guguan": 7,
            "cityhall": 4,
            "greenway": 3
          }
        }
      ]
    },
    {
      "title": "타이중에서 꼭 넣고 싶은 일정은 무엇인가요?",
      "help": "대표 일정에 따라 숙소 기준점이 달라집니다.",
      "options": [
        {
          "title": "미야하라·타이중공원·구도심",
          "desc": "도착 첫날 가볍게 볼 수 있는 이동이 좋아요.",
          "scores": {
            "station": 7,
            "yizhong": 4,
            "greenway": 2
          }
        },
        {
          "title": "국립타이중극장·쇼핑몰",
          "desc": "신도심과 깔끔한 도심 분위기를 보고 싶어요.",
          "scores": {
            "cityhall": 7,
            "greenway": 3,
            "fengjia": 2
          }
        },
        {
          "title": "펑지아 야시장·쇼핑",
          "desc": "저녁 먹거리와 쇼핑이 여행의 핵심이에요.",
          "scores": {
            "fengjia": 8,
            "yizhong": 2
          }
        },
        {
          "title": "구관온천·자연 휴식",
          "desc": "도심보다 온천과 휴식을 넣고 싶어요.",
          "scores": {
            "guguan": 8,
            "cityhall": 2
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "같은 타이중이어도 구도심, 야시장, 신도심, 온천권 분위기가 꽤 다릅니다.",
      "options": [
        {
          "title": "활기 있는 상권",
          "desc": "밤에도 먹거리와 사람이 많은 곳이 좋아요.",
          "scores": {
            "fengjia": 7,
            "yizhong": 7
          }
        },
        {
          "title": "차분한 감성 도심",
          "desc": "카페, 산책, 미술관 분위기가 좋아요.",
          "scores": {
            "greenway": 8,
            "cityhall": 3
          }
        },
        {
          "title": "깔끔한 신도심",
          "desc": "쇼핑몰과 호텔 컨디션을 중요하게 봐요.",
          "scores": {
            "cityhall": 8,
            "greenway": 2
          }
        },
        {
          "title": "자연·온천 분위기",
          "desc": "도심보다 조용히 쉬는 느낌이 좋아요.",
          "scores": {
            "guguan": 8,
            "greenway": 2
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 편인가요?",
      "help": "예산을 줄일 때는 외곽보다 실제 이동 비용까지 함께 보는 것이 좋습니다.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "숙박비를 낮추되 주변 편의는 있었으면 해요.",
          "scores": {
            "yizhong": 9,
            "station": 5,
            "fengjia": 2
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "너무 비싸지 않으면서 이동도 좋았으면 해요.",
          "scores": {
            "station": 5,
            "greenway": 5,
            "fengjia": 4,
            "yizhong": 3
          }
        },
        {
          "title": "위치 우선",
          "desc": "짧은 일정이라 이동 시간을 줄이고 싶어요.",
          "scores": {
            "station": 5,
            "fengjia": 5,
            "cityhall": 4
          }
        },
        {
          "title": "호텔 분위기 우선",
          "desc": "객실 컨디션과 숙소 체류에 조금 더 투자할 수 있어요.",
          "scores": {
            "cityhall": 7,
            "guguan": 6,
            "greenway": 4
          }
        }
      ]
    },
    {
      "title": "가장 피하고 싶은 불편은 무엇인가요?",
      "help": "불편 요소를 피하는 기준으로 지역을 고르면 실패 확률이 줄어듭니다.",
      "options": [
        {
          "title": "도착·출발 이동 스트레스",
          "desc": "첫날과 마지막 날 이동이 복잡한 건 싫어요.",
          "scores": {
            "station": 8,
            "cityhall": 2
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "desc": "숙소에서는 조용히 쉬고 싶어요.",
          "scores": {
            "greenway": 6,
            "cityhall": 5,
            "guguan": 5
          }
        },
        {
          "title": "숙소 주변 할 것 없음",
          "desc": "호텔 근처에 식당과 볼거리가 있었으면 해요.",
          "scores": {
            "fengjia": 6,
            "yizhong": 7,
            "greenway": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "desc": "일정이 바뀌어도 적당히 움직이기 쉬웠으면 해요.",
          "scores": {
            "station": 5,
            "greenway": 5,
            "cityhall": 4
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
  const firstTrip = answerIs(0, "처음이에요");
  const coupleFriendsTrip = answerIs(0, "친구·커플 여행이에요");
  const familyParentsTrip = answerIs(0, "가족·부모님과 함께해요");
  const restTrip = answerIs(0, "쉬는 시간이 중요해요");

  const stationMove = answerIs(1, "기차·도착 이동");
  const nightMove = answerIs(1, "야시장·저녁 동선");
  const cafeArtMove = answerIs(1, "카페·미술관 산책");
  const mallTaxiMove = answerIs(1, "쇼핑몰·택시 이동");

  const fengjiaNight = answerIs(2, "펑지아 야시장에 오래 있을래요");
  const localFood = answerIs(2, "로컬 먹거리 위주가 좋아요");
  const quietDinner = answerIs(2, "카페나 식당에서 조용히 보내고 싶어요");
  const stayRest = answerIs(2, "숙소에서 쉬는 시간이 더 중요해요");

  const centralLandmarks = answerIs(3, "미야하라·타이중공원·구도심");
  const theaterShopping = answerIs(3, "국립타이중극장·쇼핑몰");
  const fengjiaShopping = answerIs(3, "펑지아 야시장·쇼핑");
  const hotSpringNature = answerIs(3, "구관온천·자연 휴식");

  const livelyDistrict = answerIs(4, "활기 있는 상권");
  const calmCreativeDistrict = answerIs(4, "차분한 감성 도심");
  const cleanNewTown = answerIs(4, "깔끔한 신도심");
  const natureHotSpringMood = answerIs(4, "자연·온천 분위기");

  const budgetSave = answerIs(5, "예산 절약");
  const balanceBudget = answerIs(5, "가격·위치 균형");
  const locationFirst = answerIs(5, "위치 우선");
  const hotelMoodFirst = answerIs(5, "호텔 분위기 우선");

  const avoidArrivalStress = answerIs(6, "도착·출발 이동 스트레스");
  const avoidNoiseCrowd = answerIs(6, "밤 소음과 혼잡");
  const avoidNothingNearby = answerIs(6, "숙소 주변 할 것 없음");
  const avoidLongMove = answerIs(6, "매일 긴 이동");

  // 타이중역·중구: 첫 방문, 구도심, 기차 이동, 도착·출발 스트레스 회피가 겹치면 우선순위로 올립니다.
  if (firstTrip && (stationMove || centralLandmarks || avoidArrivalStress || locationFirst)) {
    addAreaScore(scores, "station", 5);
  }
  if ((stationMove || centralLandmarks) && (balanceBudget || avoidLongMove)) {
    addAreaScore(scores, "station", 3);
  }
  if (nightMove && fengjiaNight && !centralLandmarks) {
    addAreaScore(scores, "station", -2);
  }

  // 펑지아·시툰: 야시장, 쇼핑, 활기 있는 밤 동선이 명확하면 강하게 보정합니다.
  if ((nightMove || fengjiaNight || fengjiaShopping || livelyDistrict || avoidNothingNearby) && !avoidNoiseCrowd) {
    addAreaScore(scores, "fengjia", 5);
  }
  if (coupleFriendsTrip && (nightMove || fengjiaNight || livelyDistrict)) {
    addAreaScore(scores, "fengjia", 4);
  }
  if (avoidNoiseCrowd || restTrip || natureHotSpringMood) {
    addAreaScore(scores, "fengjia", -3);
  }

  // 초오도·근미술관: 카페, 미술관, 조용한 도심, 가격·위치 균형 답변이 모이면 중심 선택지로 올립니다.
  if (cafeArtMove || calmCreativeDistrict || quietDinner || balanceBudget || avoidNoiseCrowd) {
    addAreaScore(scores, "greenway", 4);
  }
  if ((familyParentsTrip || coupleFriendsTrip) && (calmCreativeDistrict || quietDinner || cafeArtMove)) {
    addAreaScore(scores, "greenway", 2);
  }
  if (localFood && !fengjiaNight) {
    addAreaScore(scores, "greenway", 1);
  }

  // 시정부·국립가극원: 쇼핑몰, 택시 이동, 깔끔한 호텔, 가족·부모님 동반 조건에서 안정적인 선택지로 올립니다.
  if (mallTaxiMove || theaterShopping || cleanNewTown || hotelMoodFirst) {
    addAreaScore(scores, "cityhall", 5);
  }
  if (familyParentsTrip && (mallTaxiMove || cleanNewTown || avoidLongMove || hotelMoodFirst)) {
    addAreaScore(scores, "cityhall", 4);
  }
  if (budgetSave && !hotelMoodFirst) {
    addAreaScore(scores, "cityhall", -1);
  }

  // 이중상권·타이중공원: 예산 절약, 로컬 먹거리, 구도심 접근을 선택했을 때 실속 선택지로 보정합니다.
  if (budgetSave || localFood || livelyDistrict) {
    addAreaScore(scores, "yizhong", 5);
  }
  if (centralLandmarks && (budgetSave || localFood)) {
    addAreaScore(scores, "yizhong", 4);
  }
  if (hotelMoodFirst || cleanNewTown || natureHotSpringMood) {
    addAreaScore(scores, "yizhong", -1);
  }

  // 구관온천·외곽휴식: 온천·자연·숙소 휴식이 명확할 때만 결과로 잘 올라오도록 보정합니다.
  if (restTrip || stayRest || hotSpringNature || natureHotSpringMood) {
    addAreaScore(scores, "guguan", 7);
  }
  if ((familyParentsTrip || hotelMoodFirst) && (restTrip || stayRest || hotSpringNature)) {
    addAreaScore(scores, "guguan", 3);
  }
  if ((stationMove || centralLandmarks || nightMove || fengjiaNight || locationFirst) && !(hotSpringNature || natureHotSpringMood || stayRest)) {
    addAreaScore(scores, "guguan", -4);
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
