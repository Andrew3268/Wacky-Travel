/* 타이베이 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "타이베이",
  "destinationSlug": "taipei",
  "postContentType": "top5_series",
  "areas": {
    "station": {
      "name": "타이베이역",
      "regionSlug": "taipei-main-station",
      "regionSlugAliases": [
        "타이베이역",
        "타이베이역·중정"
      ],
      "label": "처음 가는 타이베이에서 이동 실수를 줄이고 싶다면 가장 무난한 출발점입니다.",
      "summary": "공항과 MRT, 기차와 근교 이동이 한곳에서 이어지는 안정적인 동선 속에서 대만 여행의 시작과 끝을 가장 단순하게 정리하고 싶은 당신에게 잘 맞는 중심 지역입니다.",
      "leadTitle": "공항 이동과 시내·근교 동선을 가장 단순하게 묶기 좋은 기준점",
      "leadText": "타오위안공항 MRT, 고속철도, 기차, 시내 MRT가 모이는 중심입니다. 첫 타이베이 여행이거나 지우펀·예류·스펀처럼 외곽 일정을 함께 넣는다면 호텔 선택의 기준점으로 보기 좋습니다.",
      "stayRange": [
        "공항 MRT 타이베이역, 대만철도·고속철도 타이베이역, MRT 타이베이역은 출구와 동선이 다릅니다. 호텔 설명의 “역 근처”보다 실제 이용할 출구와 캐리어 이동 경로를 확인하세요.",
        "첫 방문, 2박 3일 짧은 일정, 공항 이동, 기차·버스 환승, 외곽 투어 집결지 이용이 많은 여행에 어울립니다.",
        "처음 가는 타이베이에서 이동 실수를 줄이고 싶다면 가장 무난한 출발점입니다."
      ],
      "avoidRange": [
        "역 주변은 편리하지만 도로와 지하상가가 복잡합니다. 조용한 분위기나 감성적인 동네 산책을 원하면 중산·다안도 함께 비교하는 편이 좋습니다.",
        "역세권이 넓고 출구가 많아 실제 도보 동선은 반드시 확인해야 합니다.",
        "숙소 주변 감성, 조용함, 카페 산책을 더 중요하게 봤다면 중산이나 다안이 더 편할 수 있습니다."
      ],
      "bestFor": [
        "첫 방문",
        "2박 3일 짧은 일정",
        "공항 이동",
        "기차·버스 환승"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "공항 MRT 타이베이역, 대만철도·고속철도 타이베이역, MRT 타이베이역은 출구와 동선이 다릅니다. 호텔 설명의 “역 근처”보다 실제 이용할 출구와 캐리어 이동 경로를 확인하세요.",
        "역 주변은 편리하지만 도로와 지하상가가 복잡합니다. 조용한 분위기나 감성적인 동네 산책을 원하면 중산·다안도 함께 비교하는 편이 좋습니다.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "공항 이동",
        "첫 여행",
        "근교 출발",
        "교통 중심"
      ],
      "compareGood": "타오위안공항 MRT와 기차·고속철도 접근성이 좋아 첫날과 마지막 날 이동 부담을 줄이기 쉽습니다.",
      "compareCaution": "역세권이 넓고 출구가 많아 실제 도보 동선은 반드시 확인해야 합니다.",
      "mismatchNote": "숙소 주변 감성, 조용함, 카페 산책을 더 중요하게 봤다면 중산이나 다안이 더 편할 수 있습니다.",
      "links": [
        {
          "title": "타이베이 타이베이역 호텔 추천 TOP5",
          "url": "/post/taipei-taipei-main-station-hotels"
        },
        {
          "title": "타이베이 타이베이역 숙소 위치 가이드",
          "url": "/post/taipei-taipei-main-station-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "시저 파크 호텔 타이베이",
          "tag": "역 바로 앞 기준형",
          "location": "타이베이역 생활권",
          "reason": "공항·기차·MRT 이동을 한곳에서 해결하고 싶은 첫 여행자에게 비교하기 좋습니다.",
          "meta": [
            "타이베이역",
            "역 바로 앞 기준형",
            "타이베이 숙소"
          ],
          "url": "/post/caesar-park-hotel-taipei"
        },
        {
          "name": "팔레 드 쉰 호텔",
          "tag": "역세권 고급형",
          "location": "타이베이역·Q스퀘어 주변",
          "reason": "부모님 동반이나 짧은 일정에서 위치와 호텔 분위기를 함께 보고 싶을 때 후보가 됩니다.",
          "meta": [
            "타이베이역",
            "역세권 고급형",
            "타이베이 숙소"
          ],
          "url": "/post/palais-de-chine-hotel"
        },
        {
          "name": "시티즌M 타이베이 노스 게이트",
          "tag": "공항철도 접근형",
          "location": "베이먼·타이베이역 사이",
          "reason": "공항철도와 시먼딩 접근을 함께 보고 싶은 1~2인 여행에 어울립니다.",
          "meta": [
            "타이베이역",
            "공항철도 접근형",
            "타이베이 숙소"
          ],
          "url": "/post/citizenm-taipei-north-gate"
        },
        {
          "name": "코스모스 호텔 타이베이",
          "tag": "실용 역세권",
          "location": "타이베이역 주변",
          "reason": "기차·MRT 이동이 잦고 숙소는 실용적으로 고르고 싶은 일정에 맞습니다.",
          "meta": [
            "타이베이역",
            "실용 역세권",
            "타이베이 숙소"
          ],
          "url": "/post/cosmos-hotel-taipei"
        },
        {
          "name": "호텔 레저넌스 타이베이",
          "tag": "깔끔한 도심형",
          "location": "샨다오쓰·타이베이역 생활권",
          "reason": "타이베이역 접근성과 조금 더 정돈된 숙소 분위기를 같이 볼 때 좋습니다.",
          "meta": [
            "타이베이역",
            "깔끔한 도심형",
            "타이베이 숙소"
          ],
          "url": "/post/hotel-resonance-taipei-tapestry-collection-by-hilton"
        }
      ]
    },
    "ximending": {
      "name": "시먼딩",
      "regionSlug": "ximending",
      "regionSlugAliases": [
        "시먼딩",
        "시먼딩·완화"
      ],
      "label": "타이베이 첫인상을 먹거리와 밤 분위기로 잡고 싶다면 가장 직관적인 선택입니다.",
      "summary": "밝은 간판과 쇼핑 거리, 야식과 젊은 분위기가 늦은 시간까지 이어지는 거리에서 타이베이의 활기를 가장 가까이 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "타이베이다운 활기와 저녁 산책을 가장 쉽게 느끼기 좋은 번화가",
      "leadText": "시먼딩은 쇼핑, 간식, 야식, 용산사와 만화·굿즈 거리까지 묶기 쉬운 지역입니다. 밤에도 주변이 밝고 식당 선택지가 많아 짧은 일정과 친구 여행에서 만족도가 높은 편입니다.",
      "stayRange": [
        "시먼역과 베이먼역 사이, 시먼 중심 거리 바로 안쪽, 용산사 방향은 분위기가 다릅니다. 밤 소음과 역까지의 실제 도보 시간을 함께 보세요.",
        "첫 여행, 친구 여행, 쇼핑·먹거리, 늦은 저녁 산책, 활기 있는 숙소 주변을 원하는 일정에 어울립니다.",
        "타이베이 첫인상을 먹거리와 밤 분위기로 잡고 싶다면 가장 직관적인 선택입니다."
      ],
      "avoidRange": [
        "주말 저녁에는 사람이 많고 번화가 소음이 있을 수 있습니다. 부모님 동반이나 조용한 휴식이 중요하면 중심 거리에서 살짝 떨어진 호텔이 낫습니다.",
        "번화가 소음과 혼잡을 싫어한다면 호텔 위치를 중심 거리에서 조금 떨어뜨리는 편이 좋습니다.",
        "공항 이동과 근교 출발이 가장 중요하다면 타이베이역, 조용함이 중요하다면 다안·중산이 더 맞을 수 있습니다."
      ],
      "bestFor": [
        "첫 여행",
        "친구 여행",
        "쇼핑·먹거리",
        "늦은 저녁 산책"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "시먼역과 베이먼역 사이, 시먼 중심 거리 바로 안쪽, 용산사 방향은 분위기가 다릅니다. 밤 소음과 역까지의 실제 도보 시간을 함께 보세요.",
        "주말 저녁에는 사람이 많고 번화가 소음이 있을 수 있습니다. 부모님 동반이나 조용한 휴식이 중요하면 중심 거리에서 살짝 떨어진 호텔이 낫습니다.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "먹거리",
        "쇼핑",
        "밤 산책",
        "친구 여행"
      ],
      "compareGood": "숙소 주변에서 저녁 시간을 보내기 쉬워 짧은 일정에서도 여행 분위기를 빠르게 느낄 수 있습니다.",
      "compareCaution": "번화가 소음과 혼잡을 싫어한다면 호텔 위치를 중심 거리에서 조금 떨어뜨리는 편이 좋습니다.",
      "mismatchNote": "공항 이동과 근교 출발이 가장 중요하다면 타이베이역, 조용함이 중요하다면 다안·중산이 더 맞을 수 있습니다.",
      "links": [
        {
          "title": "타이베이 시먼딩 호텔 추천 TOP5",
          "url": "/post/taipei-ximending-hotels"
        },
        {
          "title": "타이베이 시먼딩 숙소 위치 가이드",
          "url": "/post/taipei-ximending-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "솔라리아 니시테츠 호텔 타이베이 시먼",
          "tag": "시먼 중심형",
          "location": "시먼딩 권역",
          "reason": "시먼딩 중심에서 쇼핑과 저녁 동선을 짧게 가져가고 싶은 일정에 잘 맞습니다.",
          "meta": [
            "시먼딩",
            "시먼 중심형",
            "타이베이 숙소"
          ],
          "url": "/post/solaria-nishitetsu-hotel-taipei-ximen"
        },
        {
          "name": "저스트 슬립 타이베이 시먼딩",
          "tag": "실속 중심형",
          "location": "시먼역 주변",
          "reason": "시먼역 접근성과 실용적인 숙박을 같이 보고 싶은 분께 비교하기 좋습니다.",
          "meta": [
            "시먼딩",
            "실속 중심형",
            "타이베이 숙소"
          ],
          "url": "/post/just-sleep-taipei-ximending"
        },
        {
          "name": "암바 타이베이 시먼딩",
          "tag": "감각적 도심형",
          "location": "시먼딩 중심",
          "reason": "쇼핑·카페·젊은 분위기를 중시하는 커플·친구 여행에 어울립니다.",
          "meta": [
            "시먼딩",
            "감각적 도심형",
            "타이베이 숙소"
          ],
          "url": "/post/amba-taipei-ximending"
        },
        {
          "name": "로드어스 호텔 중화",
          "tag": "가성비 후보",
          "location": "시먼딩·베이먼 사이",
          "reason": "시먼딩 접근성과 숙박비 균형을 함께 볼 때 후보가 됩니다.",
          "meta": [
            "시먼딩",
            "가성비 후보",
            "타이베이 숙소"
          ],
          "url": "/post/roaders-hotel-zhonghua"
        },
        {
          "name": "웨스트게이트 호텔",
          "tag": "시먼역 접근형",
          "location": "시먼역 주변",
          "reason": "역 접근성과 번화가 이용을 모두 편하게 잡고 싶은 일정에 알맞습니다.",
          "meta": [
            "시먼딩",
            "시먼역 접근형",
            "타이베이 숙소"
          ],
          "url": "/post/westgate-hotel"
        }
      ]
    },
    "zhongshan": {
      "name": "중산",
      "regionSlug": "zhongshan",
      "regionSlugAliases": [
        "중산",
        "중산·쑹장난징"
      ],
      "label": "도심 접근성과 숙소 주변의 차분함을 함께 보고 싶을 때 가장 균형 좋은 후보입니다.",
      "summary": "카페 골목과 작은 술집, 감각적인 상점들이 번갈아 나타나는 차분한 거리 속에서 번화가보다 세련된 타이베이를 느끼고 싶은 당신에게 잘 맞는 위치입니다.",
      "leadTitle": "번화가 접근성과 차분한 도심 분위기 사이의 균형이 좋은 지역",
      "leadText": "중산은 백화점, 카페, 레스토랑, 마사지샵이 모여 있으면서 시먼딩보다 한결 정돈된 분위기입니다. 쑹장난징까지 넓게 보면 숙박비와 객실 컨디션을 비교하기도 좋습니다.",
      "stayRange": [
        "중산역, 솽롄역, 쑹장난징역은 분위기와 이동 축이 다릅니다. MRT 노선과 호텔 주변 식당·편의점 밀도를 같이 확인하세요.",
        "커플 여행, 재방문, 카페·맛집, 적당히 조용한 도심, 가격과 위치 균형을 원하는 일정에 어울립니다.",
        "도심 접근성과 숙소 주변의 차분함을 함께 보고 싶을 때 가장 균형 좋은 후보입니다."
      ],
      "avoidRange": [
        "시먼딩처럼 바로 앞에서 밤늦게 놀기 좋은 분위기는 약할 수 있습니다. 대표 야시장 중심 일정이라면 별도 이동을 계산해야 합니다.",
        "대표 관광지 바로 앞 숙소는 아니므로 매일 가는 장소와 MRT 노선을 확인해야 합니다.",
        "첫날 공항 이동을 가장 단순하게 만들고 싶다면 타이베이역이 더 쉽습니다."
      ],
      "bestFor": [
        "커플 여행",
        "재방문",
        "카페·맛집",
        "적당히 조용한 도심"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "중산역, 솽롄역, 쑹장난징역은 분위기와 이동 축이 다릅니다. MRT 노선과 호텔 주변 식당·편의점 밀도를 같이 확인하세요.",
        "시먼딩처럼 바로 앞에서 밤늦게 놀기 좋은 분위기는 약할 수 있습니다. 대표 야시장 중심 일정이라면 별도 이동을 계산해야 합니다.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "카페",
        "균형형",
        "커플",
        "가성비"
      ],
      "compareGood": "도심 접근성, 식당, 카페, 숙소 컨디션을 함께 맞추기 좋습니다.",
      "compareCaution": "대표 관광지 바로 앞 숙소는 아니므로 매일 가는 장소와 MRT 노선을 확인해야 합니다.",
      "mismatchNote": "첫날 공항 이동을 가장 단순하게 만들고 싶다면 타이베이역이 더 쉽습니다.",
      "links": [
        {
          "title": "타이베이 중산 호텔 추천 TOP5",
          "url": "/post/taipei-zhongshan-hotels"
        },
        {
          "title": "타이베이 중산 숙소 위치 가이드",
          "url": "/post/taipei-zhongshan-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "호텔 로열 닛코 타이베이",
          "tag": "중산 안정형",
          "location": "중산역 주변",
          "reason": "카페·식당·쇼핑 접근성과 안정적인 호텔 분위기를 함께 보고 싶은 일정에 어울립니다.",
          "meta": [
            "중산",
            "중산 안정형",
            "타이베이 숙소"
          ],
          "url": "/post/hotel-royal-nikko-taipei"
        },
        {
          "name": "더 오쿠라 프레스티지 타이베이",
          "tag": "중산 고급형",
          "location": "중산 상권",
          "reason": "부모님 동반이나 여유 있는 커플 여행에서 도심 편의와 휴식을 함께 잡기 좋습니다.",
          "meta": [
            "중산",
            "중산 고급형",
            "타이베이 숙소"
          ],
          "url": "/post/the-okura-prestige-taipei"
        },
        {
          "name": "호텔 코지 민셩 타이베이",
          "tag": "차분한 실속형",
          "location": "쑹장난징 생활권",
          "reason": "중심지 접근성은 유지하면서 주변 분위기는 차분하게 가져가고 싶을 때 좋습니다.",
          "meta": [
            "중산",
            "차분한 실속형",
            "타이베이 숙소"
          ],
          "url": "/post/hotel-cozzi-minsheng-taipei"
        },
        {
          "name": "그린 월드 그랜드 난징",
          "tag": "가성비 도심형",
          "location": "쑹장난징 주변",
          "reason": "가격과 도심 이동을 같이 보는 재방문 여행자에게 비교 후보가 됩니다.",
          "meta": [
            "중산",
            "가성비 도심형",
            "타이베이 숙소"
          ],
          "url": "/post/green-world-grand-nanjing"
        },
        {
          "name": "더 탱고 호텔 타이베이 난시",
          "tag": "중산역 접근형",
          "location": "중산역 주변",
          "reason": "중산역 생활권에서 쇼핑과 카페 동선을 편하게 쓰고 싶을 때 알맞습니다.",
          "meta": [
            "중산",
            "중산역 접근형",
            "타이베이 숙소"
          ],
          "url": "/post/the-tango-hotel-taipei-nanshi"
        }
      ]
    },
    "daan": {
      "name": "다안",
      "regionSlug": "daan-yongkang",
      "regionSlugAliases": [
        "다안",
        "다안·융캉제"
      ],
      "label": "여행 중 숙소 주변을 걷는 시간이 중요하다면 다안·융캉제는 만족도가 높은 선택입니다.",
      "summary": "융캉제의 맛집과 조용한 공원 산책, 여유로운 주거지 분위기가 자연스럽게 어우러진 동네에서 타이베이의 일상적인 분위기를 천천히 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "동네 산책과 카페, 조용한 숙소 분위기를 함께 잡기 좋은 지역",
      "leadText": "다안과 융캉제 주변은 시내 중심 접근성을 유지하면서도 숙소 주변이 비교적 차분합니다. 카페, 브런치, 공원 산책, 로컬 식당을 즐기고 싶은 여행자에게 잘 맞습니다.",
      "stayRange": [
        "동먼역, 다안역, 중샤오푸싱역, 다안공원역 중 어느 역을 중심으로 할지 먼저 정하세요. 융캉제 접근과 MRT 환승 편의가 달라집니다.",
        "커플 여행, 조용한 숙소, 감성 카페, 재방문, 부모님과 여유 있게 움직이는 일정에 어울립니다.",
        "여행 중 숙소 주변을 걷는 시간이 중요하다면 다안·융캉제는 만족도가 높은 선택입니다."
      ],
      "avoidRange": [
        "밤늦게 활기 있는 번화가를 기대하면 시먼딩보다 차분하게 느껴질 수 있습니다. 야시장 위주 일정은 이동 시간을 별도로 봐야 합니다.",
        "공항철도와 바로 연결되는 위치는 아니어서 첫날·마지막 날 이동은 미리 계산해야 합니다.",
        "쇼핑몰과 야경을 우선한다면 신이, 공항 이동을 우선한다면 타이베이역이 더 직관적입니다."
      ],
      "bestFor": [
        "커플 여행",
        "조용한 숙소",
        "감성 카페",
        "재방문"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "동먼역, 다안역, 중샤오푸싱역, 다안공원역 중 어느 역을 중심으로 할지 먼저 정하세요. 융캉제 접근과 MRT 환승 편의가 달라집니다.",
        "밤늦게 활기 있는 번화가를 기대하면 시먼딩보다 차분하게 느껴질 수 있습니다. 야시장 위주 일정은 이동 시간을 별도로 봐야 합니다.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "조용함",
        "카페",
        "산책",
        "커플"
      ],
      "compareGood": "숙소 주변 분위기가 편안해 재방문이나 커플 여행에서 만족도가 높습니다.",
      "compareCaution": "공항철도와 바로 연결되는 위치는 아니어서 첫날·마지막 날 이동은 미리 계산해야 합니다.",
      "mismatchNote": "쇼핑몰과 야경을 우선한다면 신이, 공항 이동을 우선한다면 타이베이역이 더 직관적입니다.",
      "links": [
        {
          "title": "타이베이 다안 호텔 추천 TOP5",
          "url": "/post/taipei-daan-yongkang-hotels"
        },
        {
          "title": "타이베이 다안 숙소 위치 가이드",
          "url": "/post/taipei-daan-yongkang-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "킴튼 다안 타이베이",
          "tag": "감성 도심형",
          "location": "다안·중샤오푸싱",
          "reason": "카페와 식당, 차분한 도심 분위기를 함께 원하는 커플 여행에 어울립니다.",
          "meta": [
            "다안",
            "감성 도심형",
            "타이베이 숙소"
          ],
          "url": "/post/kimpton-da-an-taipei"
        },
        {
          "name": "댄디 호텔 다안 파크 브랜치",
          "tag": "공원 산책형",
          "location": "다안공원 주변",
          "reason": "다안공원과 조용한 도심 분위기를 함께 보는 여행자에게 맞습니다.",
          "meta": [
            "다안",
            "공원 산책형",
            "타이베이 숙소"
          ],
          "url": "/post/dandy-hotel-daan-park-branch"
        },
        {
          "name": "매디슨 타이베이 호텔",
          "tag": "차분한 고급형",
          "location": "다안·신이안허 생활권",
          "reason": "번화가보다 정돈된 숙소 분위기와 객실 컨디션을 우선할 때 좋습니다.",
          "meta": [
            "다안",
            "차분한 고급형",
            "타이베이 숙소"
          ],
          "url": "/post/madison-taipei-hotel"
        },
        {
          "name": "파크 타이베이 호텔",
          "tag": "MRT 접근형",
          "location": "다안역 주변",
          "reason": "MRT 접근성과 차분한 도심 숙박을 동시에 보고 싶을 때 비교하기 좋습니다.",
          "meta": [
            "다안",
            "MRT 접근형",
            "타이베이 숙소"
          ],
          "url": "/post/park-taipei-hotel"
        },
        {
          "name": "체즈 누 호텔 타이베이",
          "tag": "부티크 후보",
          "location": "다안 권역",
          "reason": "작은 규모의 감성 숙소와 도심 접근성을 함께 원하는 여행에 어울립니다.",
          "meta": [
            "다안",
            "부티크 후보",
            "타이베이 숙소"
          ],
          "url": "/post/chez-nous-hotel-taipei"
        }
      ]
    },
    "xinyi": {
      "name": "신이",
      "regionSlug": "xinyi-taipei101",
      "regionSlugAliases": [
        "신이",
        "신이·타이베이101"
      ],
      "label": "타이베이의 세련된 도심과 야경을 숙소 주변에서 즐기고 싶을 때 좋은 선택입니다.",
      "summary": "타이베이101의 야경과 대형 쇼핑몰, 깔끔한 거리 분위기 속에서 도시적인 대만 여행을 선명하게 즐기고 싶은 당신에게 잘 맞는 도심 지역입니다.",
      "leadTitle": "타이베이101 야경과 쇼핑몰, 깔끔한 도심 분위기를 즐기기 좋은 지역",
      "leadText": "신이는 타이베이101, 쇼핑몰, 루프톱 바, 샹산 야경 동선을 잡기 좋은 지역입니다. 숙박비는 높은 편이지만 깔끔한 도심 분위기와 야경 중심 여행에는 만족도가 높습니다.",
      "stayRange": [
        "타이베이101/월드트레이드센터역, 시정부역, 샹산역 중 실제 일정과 가까운 역을 보세요. 쇼핑몰 중심인지 야경 산책 중심인지에 따라 위치가 달라집니다.",
        "커플 여행, 쇼핑, 야경, 기념일, 깔끔한 도심형 호텔을 원하는 일정에 어울립니다.",
        "타이베이의 세련된 도심과 야경을 숙소 주변에서 즐기고 싶을 때 좋은 선택입니다."
      ],
      "avoidRange": [
        "시먼딩·타이베이역보다 숙박비 부담이 크고 공항철도 직결은 아닙니다. 외곽 투어가 많은 일정이면 이동 시간을 다시 계산해야 합니다.",
        "가격대가 높고 외곽 투어 집결지 이동은 타이베이역보다 불편할 수 있습니다.",
        "예산 절약이나 외곽 당일치기를 우선한다면 중산·타이베이역을 함께 보세요."
      ],
      "bestFor": [
        "커플 여행",
        "쇼핑",
        "야경",
        "기념일"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "타이베이101/월드트레이드센터역, 시정부역, 샹산역 중 실제 일정과 가까운 역을 보세요. 쇼핑몰 중심인지 야경 산책 중심인지에 따라 위치가 달라집니다.",
        "시먼딩·타이베이역보다 숙박비 부담이 크고 공항철도 직결은 아닙니다. 외곽 투어가 많은 일정이면 이동 시간을 다시 계산해야 합니다.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "야경",
        "쇼핑",
        "커플",
        "고급형"
      ],
      "compareGood": "타이베이101, 샹산, 쇼핑몰 동선이 가까워 도심 여행의 만족도가 큽니다.",
      "compareCaution": "가격대가 높고 외곽 투어 집결지 이동은 타이베이역보다 불편할 수 있습니다.",
      "mismatchNote": "예산 절약이나 외곽 당일치기를 우선한다면 중산·타이베이역을 함께 보세요.",
      "links": [
        {
          "title": "타이베이 신이 호텔 추천 TOP5",
          "url": "/post/taipei-xinyi-taipei101-hotels"
        },
        {
          "title": "타이베이 신이 숙소 위치 가이드",
          "url": "/post/taipei-xinyi-taipei101-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "그랜드 하얏트 타이베이",
          "tag": "101 인접형",
          "location": "신이·타이베이101",
          "reason": "타이베이101과 쇼핑몰 동선을 가장 직관적으로 쓰고 싶은 여행에 어울립니다.",
          "meta": [
            "신이",
            "101 인접형",
            "타이베이 숙소"
          ],
          "url": "/post/grand-hyatt-taipei"
        },
        {
          "name": "W 타이베이",
          "tag": "도심 야경형",
          "location": "시정부역 주변",
          "reason": "야경과 쇼핑, 도심 분위기를 중시하는 커플·기념일 여행에 좋습니다.",
          "meta": [
            "신이",
            "도심 야경형",
            "타이베이 숙소"
          ],
          "url": "/post/w-taipei"
        },
        {
          "name": "험블 하우스 타이베이",
          "tag": "쇼핑몰 접근형",
          "location": "신이 상권",
          "reason": "신이 쇼핑몰과 깔끔한 도심 숙박을 함께 보고 싶을 때 맞습니다.",
          "meta": [
            "신이",
            "쇼핑몰 접근형",
            "타이베이 숙소"
          ],
          "url": "/post/humble-house-taipei-curio-collection-by-hilton"
        },
        {
          "name": "에슬라이트 호텔",
          "tag": "감성 도심형",
          "location": "송산문화창의공원 주변",
          "reason": "쇼핑몰보다 문화공간과 차분한 분위기를 함께 원하는 일정에 어울립니다.",
          "meta": [
            "신이",
            "감성 도심형",
            "타이베이 숙소"
          ],
          "url": "/post/eslite-hotel"
        },
        {
          "name": "홈 호텔 신이",
          "tag": "실용 신이형",
          "location": "신이 상권",
          "reason": "타이베이101 생활권에서 비교적 실용적인 후보를 찾을 때 볼 만합니다.",
          "meta": [
            "신이",
            "실용 신이형",
            "타이베이 숙소"
          ],
          "url": "/post/home-hotel-xinyi"
        }
      ]
    },
    "beitou": {
      "name": "베이터우",
      "regionSlug": "beitou-shilin",
      "regionSlugAliases": [
        "베이터우",
        "베이터우·스린"
      ],
      "label": "온천과 휴식을 여행의 중요한 목적에 넣는다면 중심지와 다른 만족을 주는 선택입니다.",
      "summary": "유황 온천의 따뜻한 김과 산책로의 고요함 속에서 빠른 도심 여행보다 하루를 천천히 쉬어가는 시간을 원하는 당신에게 잘 어울리는 온천 지역입니다.",
      "leadTitle": "온천 휴식과 고궁박물원, 단수이·양명산 동선을 여유 있게 잡기 좋은 북쪽 권역",
      "leadText": "베이터우는 온천 휴식, 스린은 고궁박물원과 야시장 접근에 강합니다. 타이베이 중심 여행보다 휴식과 북쪽 일정을 중요하게 보는 가족·부모님 동반 여행에서 의미가 있습니다.",
      "stayRange": [
        "베이터우역과 신베이터우역, 스린역, 젠탄역은 동선 성격이 다릅니다. 온천 숙박인지 야시장·박물관 접근인지 먼저 나누세요.",
        "온천 휴식, 부모님 동반, 가족 여행, 고궁박물원, 단수이·양명산까지 보는 여유 일정에 어울립니다.",
        "온천과 휴식을 여행의 중요한 목적에 넣는다면 중심지와 다른 만족을 주는 선택입니다."
      ],
      "avoidRange": [
        "시내 중심 관광을 매일 오가기에는 시간이 걸립니다. 첫 타이베이에서 2박 3일 전부를 이 권역에 두기보다는 1박 분리도 고려하세요.",
        "시먼딩·타이베이역 중심 일정이 많다면 매일 이동 시간이 길어질 수 있습니다.",
        "짧은 첫 여행이라면 타이베이역이나 시먼딩을 기본 숙소로 잡고 베이터우는 당일 또는 1박 분리로 보는 편이 좋습니다."
      ],
      "bestFor": [
        "온천 휴식",
        "부모님 동반",
        "가족 여행",
        "고궁박물원"
      ],
      "notFor": [
        "숙소 주변이 너무 멀어도 괜찮은 여행",
        "매일 다른 지역으로 긴 이동을 감수하는 일정"
      ],
      "bookingTips": [
        "베이터우역과 신베이터우역, 스린역, 젠탄역은 동선 성격이 다릅니다. 온천 숙박인지 야시장·박물관 접근인지 먼저 나누세요.",
        "시내 중심 관광을 매일 오가기에는 시간이 걸립니다. 첫 타이베이에서 2박 3일 전부를 이 권역에 두기보다는 1박 분리도 고려하세요.",
        "호텔 후기에서 역 출구, 소음, 객실 면적, 조식 편의성을 함께 확인하세요."
      ],
      "chips": [
        "온천",
        "가족",
        "부모님",
        "북쪽 일정"
      ],
      "compareGood": "중심부보다 휴식감이 강하고 북쪽 관광지 접근성이 좋습니다.",
      "compareCaution": "시먼딩·타이베이역 중심 일정이 많다면 매일 이동 시간이 길어질 수 있습니다.",
      "mismatchNote": "짧은 첫 여행이라면 타이베이역이나 시먼딩을 기본 숙소로 잡고 베이터우는 당일 또는 1박 분리로 보는 편이 좋습니다.",
      "links": [
        {
          "title": "타이베이 베이터우 호텔 추천 TOP5",
          "url": "/post/taipei-beitou-shilin-hotels"
        },
        {
          "title": "타이베이 베이터우 숙소 위치 가이드",
          "url": "/post/taipei-beitou-shilin-hotel-location"
        }
      ],
      "hotels": [
        {
          "name": "그랜드 뷰 리조트 베이터우",
          "tag": "온천 휴식형",
          "location": "신베이터우 권역",
          "reason": "온천과 조용한 휴식이 여행의 핵심일 때 비교해볼 만한 고급 후보입니다.",
          "meta": [
            "베이터우",
            "온천 휴식형",
            "타이베이 숙소"
          ],
          "url": "/post/grand-view-resort-beitou"
        },
        {
          "name": "알로프트 타이베이 베이터우",
          "tag": "가족 실용형",
          "location": "베이터우 권역",
          "reason": "북쪽 일정과 가족형 숙박을 함께 볼 때 실용적인 후보가 됩니다.",
          "meta": [
            "베이터우",
            "가족 실용형",
            "타이베이 숙소"
          ],
          "url": "/post/aloft-taipei-beitou"
        },
        {
          "name": "래디움 카가야 인터내셔널 호텔",
          "tag": "온천 료칸형",
          "location": "신베이터우 온천권",
          "reason": "부모님 동반이나 특별한 온천 숙박 경험을 원할 때 어울립니다.",
          "meta": [
            "베이터우",
            "온천 료칸형",
            "타이베이 숙소"
          ],
          "url": "/post/radium-kagaya-taipei"
        },
        {
          "name": "더 그랜드 호텔",
          "tag": "랜드마크형",
          "location": "젠탄·스린 생활권",
          "reason": "고궁박물원·스린 방향과 상징적인 호텔 분위기를 함께 볼 때 좋습니다.",
          "meta": [
            "베이터우",
            "랜드마크형",
            "타이베이 숙소"
          ],
          "url": "/post/the-grand-hotel-taipei"
        },
        {
          "name": "댄디 호텔 톈무 브랜치",
          "tag": "북쪽 차분형",
          "location": "톈무·스린 북쪽",
          "reason": "스린·베이터우 방향을 차분하게 쓰고 싶은 일정에 맞습니다.",
          "meta": [
            "베이터우",
            "북쪽 차분형",
            "타이베이 숙소"
          ],
          "url": "/post/dandy-hotel-tianmu-branch"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 타이베이 여행은 몇 번째인가요?",
      "help": "처음인지 재방문인지에 따라 숙소 위치의 우선순위가 달라집니다.",
      "options": [
        {
          "title": "처음이에요",
          "desc": "대표 명소와 이동을 쉽게 잡고 싶어요.",
          "scores": {
            "station": 7,
            "ximending": 6,
            "zhongshan": 2
          }
        },
        {
          "title": "두 번째 이상",
          "desc": "너무 번화한 곳보다 취향에 맞는 동네도 보고 싶어요.",
          "scores": {
            "zhongshan": 5,
            "daan": 5,
            "xinyi": 3
          }
        },
        {
          "title": "가족과 함께",
          "desc": "동행자 컨디션과 식사 편의를 우선하고 싶어요.",
          "scores": {
            "station": 5,
            "zhongshan": 5,
            "beitou": 4,
            "daan": 3
          }
        },
        {
          "title": "커플·친구 여행",
          "desc": "카페, 쇼핑, 야경, 저녁 동선을 중요하게 봐요.",
          "scores": {
            "ximending": 5,
            "xinyi": 5,
            "daan": 4,
            "zhongshan": 3
          }
        }
      ]
    },
    {
      "title": "가장 중요한 이동은 무엇인가요?",
      "help": "숙소 위치는 매일 반복되는 이동을 기준으로 고르는 것이 좋습니다.",
      "options": [
        {
          "title": "공항·역 이동",
          "desc": "도착과 출발, 기차 이동을 단순하게 만들고 싶어요.",
          "scores": {
            "station": 8,
            "ximending": 3,
            "zhongshan": 2
          }
        },
        {
          "title": "야시장·저녁 산책",
          "desc": "저녁에 숙소 주변에서 놀고 먹고 싶어요.",
          "scores": {
            "ximending": 8,
            "zhongshan": 3,
            "xinyi": 2
          }
        },
        {
          "title": "카페·동네 산책",
          "desc": "숙소 주변이 차분하고 걷기 좋았으면 해요.",
          "scores": {
            "daan": 7,
            "zhongshan": 5,
            "beitou": 2
          }
        },
        {
          "title": "야경·쇼핑몰",
          "desc": "타이베이101과 깔끔한 도심 분위기가 좋아요.",
          "scores": {
            "xinyi": 8,
            "daan": 2,
            "zhongshan": 2
          }
        }
      ]
    },
    {
      "title": "근교 일정이 있나요?",
      "help": "지우펀, 예류, 스펀, 단수이, 베이터우 같은 일정은 숙소 위치 선택에 영향을 줍니다.",
      "options": [
        {
          "title": "예류·지우펀·스펀 투어",
          "desc": "외곽 투어 집결지 이동이 쉬웠으면 해요.",
          "scores": {
            "station": 7,
            "ximending": 5,
            "zhongshan": 2
          }
        },
        {
          "title": "단수이·베이터우",
          "desc": "북쪽 일정과 온천도 넣고 싶어요.",
          "scores": {
            "beitou": 7,
            "station": 3,
            "zhongshan": 2
          }
        },
        {
          "title": "시내 중심",
          "desc": "중정기념당, 타이베이101, 야시장 위주로 볼 예정이에요.",
          "scores": {
            "ximending": 4,
            "daan": 4,
            "xinyi": 4,
            "station": 3
          }
        },
        {
          "title": "아직 미정",
          "desc": "일정 변경이 쉬운 곳이면 좋겠어요.",
          "scores": {
            "station": 5,
            "zhongshan": 4,
            "ximending": 3
          }
        }
      ]
    },
    {
      "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      "help": "같은 타이베이여도 밤 소음과 주변 분위기가 꽤 다릅니다.",
      "options": [
        {
          "title": "활기 있는 번화가",
          "desc": "밤에도 먹거리와 쇼핑이 많은 곳이 좋아요.",
          "scores": {
            "ximending": 8,
            "xinyi": 3
          }
        },
        {
          "title": "차분한 도심",
          "desc": "식당과 카페는 많지만 너무 복잡하지 않았으면 해요.",
          "scores": {
            "zhongshan": 7,
            "daan": 4
          }
        },
        {
          "title": "조용한 동네",
          "desc": "공원, 카페, 산책이 있는 분위기를 선호해요.",
          "scores": {
            "daan": 8,
            "beitou": 4,
            "zhongshan": 2
          }
        },
        {
          "title": "휴식형 분위기",
          "desc": "온천이나 여유 있는 시간을 중요하게 봐요.",
          "scores": {
            "beitou": 8,
            "daan": 2
          }
        }
      ]
    },
    {
      "title": "동행자는 누구인가요?",
      "help": "동행자에 따라 호텔 위치에서 봐야 할 요소가 달라집니다.",
      "options": [
        {
          "title": "혼자 또는 친구",
          "desc": "위치와 가성비, 저녁 동선을 중요하게 봐요.",
          "scores": {
            "ximending": 5,
            "station": 4,
            "zhongshan": 3
          }
        },
        {
          "title": "커플",
          "desc": "카페, 야경, 깔끔한 호텔 분위기가 중요해요.",
          "scores": {
            "daan": 5,
            "xinyi": 5,
            "zhongshan": 4
          }
        },
        {
          "title": "부모님 동반",
          "desc": "이동이 단순하고 식사하기 편한 곳이면 좋겠어요.",
          "scores": {
            "station": 6,
            "zhongshan": 5,
            "beitou": 4
          }
        },
        {
          "title": "아이와 함께",
          "desc": "환승을 줄이고 쉬는 동선을 만들고 싶어요.",
          "scores": {
            "station": 5,
            "zhongshan": 5,
            "beitou": 4,
            "daan": 2
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 편인가요?",
      "help": "중심에 가까울수록 가격이 오르거나 객실이 작아질 수 있습니다.",
      "options": [
        {
          "title": "예산 절약",
          "desc": "중심가 바로 앞이 아니어도 괜찮아요.",
          "scores": {
            "zhongshan": 5,
            "station": 3,
            "ximending": 3,
            "daan": 2
          }
        },
        {
          "title": "가격·위치 균형",
          "desc": "너무 비싸지 않으면서 이동도 편했으면 해요.",
          "scores": {
            "zhongshan": 6,
            "station": 4,
            "ximending": 3,
            "daan": 2
          }
        },
        {
          "title": "위치 우선",
          "desc": "짧은 일정이라 이동 시간을 줄이고 싶어요.",
          "scores": {
            "station": 6,
            "ximending": 5,
            "xinyi": 3
          }
        },
        {
          "title": "호텔 분위기 우선",
          "desc": "숙소 컨디션과 주변 분위기에 조금 더 투자할 수 있어요.",
          "scores": {
            "xinyi": 6,
            "daan": 5,
            "beitou": 4,
            "zhongshan": 3
          }
        }
      ]
    },
    {
      "title": "여행에서 가장 피하고 싶은 것은 무엇인가요?",
      "help": "불편 요소를 피하는 기준으로 지역을 고르면 실패 확률이 줄어듭니다.",
      "options": [
        {
          "title": "공항 이동 스트레스",
          "desc": "첫날과 마지막 날 이동이 복잡한 건 싫어요.",
          "scores": {
            "station": 8,
            "ximending": 3
          }
        },
        {
          "title": "밤 소음과 혼잡",
          "desc": "숙소에서는 조용히 쉬고 싶어요.",
          "scores": {
            "daan": 7,
            "zhongshan": 5,
            "beitou": 4
          }
        },
        {
          "title": "숙소 주변 할 것 없음",
          "desc": "호텔 근처에 식당과 볼거리가 있었으면 해요.",
          "scores": {
            "ximending": 6,
            "zhongshan": 5,
            "xinyi": 4
          }
        },
        {
          "title": "매일 긴 이동",
          "desc": "어느 일정이든 적당히 이동하기 쉬웠으면 해요.",
          "scores": {
            "station": 5,
            "zhongshan": 5,
            "daan": 3
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "station": "기차역과 MRT 동선이 편한 중심",
  "ximending": "젊은 타이베이의 쇼핑과 야식이 모이는 곳",
  "zhongshan": "카페와 맛집 골목이 이어지는 여유",
  "daan": "융캉제 맛집과 공원 산책을 함께 즐기기 좋은 곳",
  "xinyi": "타이베이101과 야경이 선명한 도심",
  "beitou": "온천에서 하루를 천천히 쉬어가기 좋은 곳"
};

const hotelAccessPresets = {
  "station": {
    "station": "타이베이역·공항철도 도보권",
    "airport": "타오위안공항철도 약 35~45분"
  },
  "ximending": {
    "station": "시먼역·시먼딩 도보권",
    "airport": "공항철도+MRT 약 45~60분"
  },
  "zhongshan": {
    "station": "중산역·솽롄역 도보권",
    "airport": "공항철도+MRT 약 45~60분"
  },
  "daan": {
    "station": "다안·동먼·융캉제 접근",
    "airport": "공항철도+MRT 약 50~65분"
  },
  "xinyi": {
    "station": "타이베이101·신이 도보권",
    "airport": "공항철도+MRT 약 55~70분"
  },
  "beitou": {
    "station": "베이터우·신베이터우 온천권",
    "airport": "공항철도+MRT 약 70~90분"
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
