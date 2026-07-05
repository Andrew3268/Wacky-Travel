/* 타이중 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
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
      "summary": "기차역과 구시가지 골목, 오래된 상점과 로컬 맛집이 걸어서 이어지는 거리에서 타이중의 첫인상과 생활감을 함께 느끼고 싶은 당신에게 잘 맞는 지역입니다.",
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
      "summary": "밤이 되면 더 활기차지는 야시장과 쇼핑 거리, 늦은 저녁 먹거리를 숙소 가까이 두고 타이중의 젊은 에너지를 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
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
      "summary": "미술관과 공원, 카페와 작은 상점들이 느슨하게 이어지는 거리에서 여유롭게 걷는 타이중의 감성을 즐기고 싶은 당신에게 잘 맞는 동네입니다.",
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
      "summary": "넓고 정돈된 신도심 거리와 국립가극원, 쇼핑몰과 고급 호텔이 함께 놓인 공간에서 타이중의 현대적인 분위기를 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
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
      "summary": "공원 산책과 로컬 식당, 젊은 상권의 활기가 자연스럽게 섞이는 구도심에서 부담 없이 타이중의 일상을 즐기고 싶은 당신에게 잘 맞는 실속형 지역입니다.",
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
      "summary": "도심 일정의 끝에서 산길과 온천, 조용한 숙소의 공기 속으로 들어가 자연 속에서 쉬고 싶은 당신에게 잘 어울리는 외곽 지역입니다.",
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

const areaResultBadges = {
  "station": "기차역과 원도심을 잇는 실속 동선",
  "fengjia": "야시장과 쇼핑이 가까운 활기",
  "greenway": "미술관과 카페 거리를 함께 즐기기 좋은 동네",
  "cityhall": "국립가극원과 신도심을 잇는 균형",
  "yizhong": "공원 산책과 로컬 식당을 함께 즐기기 좋은 곳",
  "guguan": "온천과 산속 휴식이 깊어지는 곳"
};

const hotelAccessPresets = {
  "station": {
    "station": "타이중역·중구 도보권",
    "airport": "타이중공항 차량 약 30~45분"
  },
  "fengjia": {
    "station": "펑지아야시장·시툰 중심",
    "airport": "공항 차량 약 25~40분"
  },
  "greenway": {
    "station": "초오도·근미술관 산책권",
    "airport": "공항 차량 약 30~45분"
  },
  "cityhall": {
    "station": "시정부·국립가극원 접근",
    "airport": "공항 차량 약 25~40분"
  },
  "yizhong": {
    "station": "이중상권·타이중공원 도보권",
    "airport": "공항 차량 약 30~45분"
  },
  "guguan": {
    "station": "구관온천·외곽 휴식권",
    "airport": "공항 차량 약 70~90분"
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


function closeResultView() {
  const detailSection = document.getElementById("detailedInfoSection");
  const summaryCard = document.getElementById("simpleSummaryCard");
  const isDetailOpen = detailSection && window.getComputedStyle(detailSection).display !== "none";

  if (isDetailOpen) {
    if (summaryCard) summaryCard.style.display = "flex";
    detailSection.style.display = "none";
    resetTabs(0);
    document.getElementById("mainScrollBody")?.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  resetSurvey(true);
}

function resetSurvey() {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
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
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
