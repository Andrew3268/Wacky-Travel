/*
 * Tokyo hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  cityName: "도쿄",
  areas: {
    namba: {
      name: "신주쿠",
      label: "첫 도쿄 여행자에게 가장 무난한 교통 중심 위치",
      summary: "대표 노선, 밤 식사, 서쪽 도쿄 이동을 함께 고려하면 신주쿠 주변이 가장 무난합니다.",
      leadTitle: "교통 선택지가 넓어 짧고 유연한 동선을 만들기 좋습니다.",
      leadText: "시부야, 하라주쿠, 도쿄역, 롯폰기 방향을 자주 오갈 계획이라면 이동 피로를 줄이기 좋습니다. 짧은 일정일수록 위치 장점이 크게 느껴집니다.",
      stayRange: ["신주쿠역, 니시신주쿠역, 신주쿠산초메역 도보 10분 이내", "밤 소음이 걱정되면 가부키초 바로 안쪽보다 큰길 또는 니시신주쿠 방향", "공항버스 이용을 고려한다면 버스터미널 접근성 확인"],
      avoidRange: ["늦은 밤 소음이 걱정된다면 번화가 바로 앞 저층 객실", "객실 크기를 중요하게 본다면 극중심가의 초소형 비즈니스 호텔", "부모님 동반이라면 출구와 엘리베이터 동선이 복잡한 위치"],
      bestFor: ["첫 도쿄 여행", "친구 여행", "맛집·쇼핑 중심 일정", "짧은 2박 3일 일정"],
      notFor: ["조용한 숙소가 최우선인 여행", "도쿄역·긴자 중심 일정", "디즈니·오다이바가 핵심인 가족 여행"],
      bookingTips: ["신주쿠역 도보 시간만 보지 말고 실제 이용할 노선 출구와의 거리를 확인하세요.", "가부키초 접근성과 소음은 반비례할 수 있으니 후기에서 밤 소음 언급을 확인하세요.", "공항 이동이 중요하면 리무진버스 또는 철도 환승 동선을 우선 비교하세요."],
      chips: ["첫 여행", "교통", "맛집", "밤거리", "쇼핑"],
      compareGood: "대표 노선과 맛집 동선이 넓고 여행 초보자도 이동 계획을 세우기 쉽습니다.",
      compareCaution: "역과 번화가가 큰 만큼 출구, 소음, 객실 크기, 가격을 꼼꼼히 봐야 합니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 여유, 디즈니 이동을 더 중요하게 봤다면 신주쿠는 1순위가 아닐 수 있습니다.",
      links: [{ title: "신주쿠 근처 호텔 추천 TOP5", url: "/post/tokyo-shinjuku-hotels" }, { title: "도쿄 첫 여행 호텔 추천 TOP5", url: "/post/tokyo-first-trip-hotels" }],
      hotels: [{ name: "JR 큐슈 호텔 블라썸 신주쿠", tag: "신주쿠역 접근", location: "신주쿠 권역", reason: "신주쿠 중심 동선과 깔끔한 숙박을 함께 고려할 때 비교 후보로 넣기 좋은 숙소입니다.", meta: ["첫 여행", "교통", "쇼핑 동선"], url: "/post/jr-kyushu-hotel-blossom-shinjuku" }, { name: "호텔 그레이스리 신주쿠", tag: "신주쿠 중심", location: "신주쿠 동쪽", reason: "맛집, 쇼핑, 밤거리 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.", meta: ["맛집", "밤거리", "친구 여행"], url: "/post/hotel-gracery-shinjuku" }, { name: "토큐 스테이 신주쿠", tag: "실속형 후보", location: "신주쿠산초메 권역", reason: "신주쿠 접근성과 실용적인 객실 편의성을 함께 보고 싶은 여행자에게 좋습니다.", meta: ["가성비", "역세권", "대표 동선"], url: "/post/tokyu-stay-shinjuku" }]
    },
    shinsaibashi: {
      name: "시부야·하라주쿠",
      label: "쇼핑과 감성 동선에 강한 위치",
      summary: "쇼핑, 카페, 하라주쿠·오모테산도 동선을 중요하게 본다면 시부야·하라주쿠가 잘 맞습니다.",
      leadTitle: "트렌디한 거리와 쇼핑 동선을 짧게 묶기 좋습니다.",
      leadText: "시부야, 하라주쿠, 오모테산도, 다이칸야마를 자주 오갈 계획이라면 이동 시간을 크게 줄일 수 있습니다.",
      stayRange: ["시부야역, 하라주쿠역, 오모테산도역 도보 10분 이내", "쇼핑 중심이면 시부야역 또는 하라주쿠 접근성이 좋은 위치", "밤 소음이 걱정되면 역 바로 앞보다 한 블록 떨어진 위치"],
      avoidRange: ["공항 이동이 최우선인데 시부야에만 고정하는 선택", "역 도보 12분 이상인데 언덕길이 있는 위치", "숙박비가 높은데 객실 크기 후기가 부족한 호텔"],
      bestFor: ["쇼핑 중심 여행", "커플 여행", "친구 여행", "카페·감성 일정"],
      notFor: ["도쿄역·긴자 중심 여행", "공항 이동이 가장 중요한 여행", "조용한 숙소가 최우선인 여행"],
      bookingTips: ["시부야역은 복잡하므로 호텔까지 실제 출구 동선을 확인하세요.", "하라주쿠·오모테산도 동선이 많으면 시부야보다 중간 지점도 비교하세요.", "가격이 비슷하다면 역 출구와 편의점 접근성이 좋은 호텔을 우선 비교하세요."],
      chips: ["쇼핑", "카페", "커플", "친구 여행"],
      compareGood: "쇼핑과 카페 동선이 짧아 도쿄의 트렌디한 분위기를 즐기기 좋습니다.",
      compareCaution: "숙박비와 혼잡도가 높은 편이라 객실 크기와 출구 동선을 꼭 봐야 합니다.",
      mismatchNote: "이번 답변에서 공항 이동, 조용함, 가족형 여유를 더 많이 선택했다면 시부야는 보조 후보에 가깝습니다.",
      links: [{ title: "시부야 근처 호텔 추천 TOP5", url: "/post/tokyo-shibuya-hotels" }, { title: "도쿄 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/tokyo-shopping-hotels" }],
      hotels: [{ name: "시부야 스트림 엑셀 호텔 도큐", tag: "시부야 중심", location: "시부야 권역", reason: "시부야 쇼핑 동선과 하라주쿠 접근성을 함께 잡고 싶은 여행자에게 잘 맞는 후보입니다.", meta: ["쇼핑", "커플", "도보 동선"], url: "/post/shibuya-stream-excel-hotel-tokyu" }, { name: "시퀀스 미야시타 파크", tag: "감성형", location: "시부야·하라주쿠 사이", reason: "시부야와 하라주쿠 분위기를 함께 즐기고 싶은 일정에 보기 좋습니다.", meta: ["감성", "쇼핑", "친구 여행"], url: "/post/sequence-miyashita-park" }, { name: "트렁크 호텔 요요기 파크", tag: "부티크 후보", location: "요요기·시부야 권역", reason: "조금 더 여유 있는 분위기와 감성 숙박을 함께 보고 싶을 때 비교 가치가 있습니다.", meta: ["부티크", "커플", "차분함"], url: "/post/trunk-hotel-yoyogi-park" }]
    },
    umeda: {
      name: "긴자·도쿄역",
      label: "공항·근교 이동과 깔끔한 도심에 강한 위치",
      summary: "도쿄역, 긴자, 마루노우치, 공항 이동을 함께 생각한다면 긴자·도쿄역 주변이 편합니다.",
      leadTitle: "정돈된 도심과 이동 안정성을 함께 잡기 좋습니다.",
      leadText: "도쿄역, 긴자 쇼핑, 공항 이동, 신칸센·근교 이동을 함께 고려하는 일정에 강합니다.",
      stayRange: ["도쿄역, 긴자역, 유라쿠초역 도보 10분 이내", "공항 이동이 많다면 도쿄역 또는 긴자 리무진버스 접근성 확인", "부모님 동반이면 지상 이동이 쉬운 큰길 주변"],
      avoidRange: ["밤 늦게 신주쿠·시부야에서 오래 머무는 일정", "캐주얼한 밤거리 분위기를 기대하는 선택", "가격이 높은데 객실 크기가 너무 작은 호텔"],
      bestFor: ["부모님 동반", "공항 이동", "근교 당일치기", "깔끔한 도심 선호"],
      notFor: ["시부야·하라주쿠 쇼핑 중심", "밤거리 중심 친구 여행", "숙소비 절약 최우선"],
      bookingTips: ["도쿄역은 넓으니 호텔이 어느 출구와 가까운지 확인하세요.", "나리타·하네다 중 어떤 공항을 쓰는지에 따라 이동 편의가 달라집니다.", "부모님 동반이면 지하 이동보다 지상 접근이 쉬운 호텔을 우선 비교하세요."],
      chips: ["공항 이동", "근교", "부모님", "깔끔한 도심"],
      compareGood: "공항·근교 이동과 도심 쇼핑을 안정적으로 묶기 좋습니다.",
      compareCaution: "시부야·신주쿠 밤 일정이 많다면 매번 이동이 필요할 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑 감성, 밤거리, 가성비를 강하게 선택했다면 긴자·도쿄역은 2순위 대안으로 보는 편이 좋습니다.",
      links: [{ title: "긴자 근처 호텔 추천 TOP5", url: "/post/tokyo-ginza-hotels" }, { title: "도쿄역 근처 호텔 추천 TOP5", url: "/post/tokyo-station-hotels" }],
      hotels: [{ name: "호텔 메트로폴리탄 도쿄 마루노우치", tag: "도쿄역 접근", location: "도쿄역 권역", reason: "근교 이동과 공항 이동을 함께 보는 여행자에게 비교 가치가 높은 위치입니다.", meta: ["근교 이동", "공항", "부모님"], url: "/post/hotel-metropolitan-tokyo-marunouchi" }, { name: "미쓰이 가든 호텔 긴자 프리미어", tag: "긴자 도심형", location: "긴자 권역", reason: "긴자 쇼핑과 깔끔한 도심 숙박을 함께 원하는 일정에 어울립니다.", meta: ["긴자", "깔끔한 도심", "커플"], url: "/post/mitsui-garden-hotel-ginza-premier" }, { name: "다이와 로이넷 호텔 긴자 프리미어", tag: "실속형", location: "긴자·유라쿠초 권역", reason: "긴자 접근성과 가격 균형을 함께 보고 싶을 때 비교하기 좋습니다.", meta: ["긴자", "실속", "역세권"], url: "/post/daiwa-roynet-hotel-ginza-premier" }]
    },
    tennoji: {
      name: "우에노·아사쿠사",
      label: "가성비와 전통 관광을 함께 보기 좋은 위치",
      summary: "나리타공항 접근, 아사쿠사, 우에노공원, 스카이트리 동선을 중시한다면 우에노·아사쿠사가 잘 맞습니다.",
      leadTitle: "도쿄 동쪽 관광과 숙박비 균형을 잡기 좋습니다.",
      leadText: "전통 관광과 실속형 호텔을 함께 찾는 여행자에게 좋은 선택지입니다.",
      stayRange: ["우에노역, 아사쿠사역, 쿠라마에역 도보 10분 이내", "나리타 이동이 중요하면 우에노 접근성 확인", "조용함을 원하면 아사쿠사 중심보다 쿠라마에·이리야 방향"],
      avoidRange: ["매일 신주쿠·시부야를 오가는 일정", "도쿄역·긴자 쇼핑이 중심인 일정", "밤 늦게 서쪽 도쿄에 머무는 여행"],
      bestFor: ["가성비", "전통 관광", "나리타공항", "동쪽 도쿄"],
      notFor: ["시부야 중심 쇼핑 여행", "디즈니 중심 가족 여행", "긴자 고급 도심 분위기 선호"],
      bookingTips: ["우에노와 아사쿠사는 분위기가 다르므로 일정에 맞춰 고르세요.", "서쪽 도쿄 이동이 많다면 왕복 시간을 반드시 계산하세요.", "가격이 저렴할수록 역 출구와 객실 크기 후기를 확인하세요."],
      chips: ["가성비", "전통", "나리타", "동쪽 관광"],
      compareGood: "전통 관광과 실속형 숙소를 함께 잡기 좋습니다.",
      compareCaution: "신주쿠·시부야를 매일 오가면 이동 시간이 늘 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑, 밤거리, 디즈니를 더 강하게 선택했다면 우에노·아사쿠사는 보조 후보에 가깝습니다.",
      links: [{ title: "우에노 근처 호텔 추천 TOP5", url: "/post/tokyo-ueno-hotels" }, { title: "아사쿠사 근처 호텔 추천 TOP5", url: "/post/tokyo-asakusa-hotels" }],
      hotels: [{ name: "노가 호텔 우에노 도쿄", tag: "우에노 감성형", location: "우에노 권역", reason: "우에노 접근성과 감성적인 숙박 분위기를 함께 보고 싶은 여행자에게 좋습니다.", meta: ["우에노", "가성비", "감성"], url: "/post/nohga-hotel-ueno-tokyo" }, { name: "리치몬드 호텔 프리미어 아사쿠사", tag: "아사쿠사 중심", location: "아사쿠사 권역", reason: "아사쿠사와 스카이트리 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["아사쿠사", "전통", "동쪽 관광"], url: "/post/richmond-hotel-premier-asakusa" }, { name: "더 게이트 호텔 카미나리몬 바이 훌릭", tag: "아사쿠사 전망형", location: "카미나리몬 권역", reason: "아사쿠사의 분위기와 도보 관광을 함께 보고 싶을 때 비교하기 좋습니다.", meta: ["전망", "아사쿠사", "커플"], url: "/post/the-gate-hotel-kaminarimon-by-hulic" }]
    },
    universal: {
      name: "오다이바·도쿄베이",
      label: "가족 여행과 베이 에어리어 일정에 좋은 위치",
      summary: "아이와 함께하거나 디즈니·오다이바·베이 에어리어가 핵심이면 오다이바·도쿄베이가 잘 맞습니다.",
      leadTitle: "가족형 일정과 여유로운 숙박 분위기를 만들기 좋습니다.",
      leadText: "대형 쇼핑몰, 베이 전망, 가족형 호텔을 활용하기 좋고 디즈니 전후 일정에도 비교 가치가 있습니다.",
      stayRange: ["다이바역, 아리아케역, 도쿄베이 권역", "디즈니 일정이 있다면 마이하마·신우라야스 접근성 비교", "도심 관광도 많다면 유리카모메·린카이선 동선 확인"],
      avoidRange: ["신주쿠·시부야·아사쿠사를 매일 촘촘히 도는 일정", "밤 늦게 도심 식당가에서 오래 머무는 여행", "가성비가 최우선인 단기 여행"],
      bestFor: ["가족 여행", "디즈니", "오다이바", "여유 일정"],
      notFor: ["첫 도쿄 대표 명소를 촘촘히 도는 여행", "쇼핑·밤거리 중심 친구 여행", "숙소비 절약 최우선"],
      bookingTips: ["도심 관광 비중이 높다면 중심부까지 이동 시간을 반드시 계산하세요.", "디즈니 일정 전후라면 마이하마·신우라야스와 도쿄베이를 함께 비교하세요.", "가족 여행은 객실 크기와 조식, 셔틀 여부를 함께 확인하세요."],
      chips: ["가족", "디즈니", "베이", "여유"],
      compareGood: "가족형 일정과 휴식 분위기를 만들기 좋습니다.",
      compareCaution: "도쿄 중심 관광을 매일 하려면 이동 시간이 길어질 수 있습니다.",
      mismatchNote: "이번 답변에서 첫 여행 대표 동선, 쇼핑, 가성비를 더 많이 골랐다면 오다이바는 1순위가 아닐 수 있습니다.",
      links: [{ title: "오다이바 근처 호텔 추천 TOP5", url: "/post/tokyo-odaiba-hotels" }, { title: "도쿄 가족 여행 호텔 추천 TOP5", url: "/post/tokyo-family-hotels" }],
      hotels: [{ name: "그랜드 닛코 도쿄 다이바", tag: "오다이바 베이", location: "오다이바 권역", reason: "베이 에어리어와 여유로운 가족 일정을 함께 보고 싶은 여행자에게 좋습니다.", meta: ["가족", "베이", "여유"], url: "/post/grand-nikko-tokyo-daiba" }, { name: "힐튼 도쿄 오다이바", tag: "베이 전망", location: "오다이바 권역", reason: "도쿄베이 전망과 가족형 숙박을 함께 원하는 일정에 어울립니다.", meta: ["전망", "가족", "휴식"], url: "/post/hilton-tokyo-odaiba" }, { name: "호텔 트러스티 도쿄 베이사이드", tag: "도쿄베이 실속", location: "아리아케 권역", reason: "베이 에어리어 접근성과 가격 균형을 함께 보고 싶을 때 비교하기 좋습니다.", meta: ["실속", "베이", "가족"], url: "/post/hotel-trusty-tokyo-bayside" }]
    },
    bay: {
      name: "아카사카·롯폰기",
      label: "차분한 도심과 미식 일정에 좋은 위치",
      summary: "번화가 한복판은 피하고 싶지만 도심 접근성을 포기하고 싶지 않다면 아카사카·롯폰기가 잘 맞습니다.",
      leadTitle: "도심 접근성과 조용한 숙박 분위기의 균형이 좋습니다.",
      leadText: "긴자, 롯폰기, 신주쿠, 시부야 방향으로 움직이기 좋고 숙소 주변 분위기는 비교적 정돈된 편입니다.",
      stayRange: ["아카사카역, 롯폰기역, 가미야초역 도보 10분 이내", "조용함을 원하면 큰길에서 한 블록 안쪽 위치", "야경·미식 일정이 많다면 롯폰기 접근성 확인"],
      avoidRange: ["도쿄가 처음인데 대표 관광지만 촘촘히 도는 일정", "숙소비를 최대한 아끼는 여행", "디즈니·오다이바가 핵심인 가족 여행"],
      bestFor: ["조용한 도심", "커플 여행", "미식", "출장 겸 여행"],
      notFor: ["가성비 최우선", "첫 여행 대표 동선", "가족형 베이 일정"],
      bookingTips: ["아카사카와 롯폰기는 분위기가 다르므로 밤 동선을 기준으로 고르세요.", "언덕과 출구 동선을 확인하면 캐리어 이동이 쉬워집니다.", "가격대가 높은 편이므로 객실 크기와 조식 포함 여부를 함께 비교하세요."],
      chips: ["조용함", "커플", "미식", "도심"],
      compareGood: "번잡함을 줄이면서 도심 접근성을 유지하기 좋습니다.",
      compareCaution: "초행자의 대표 관광 동선만 보면 위치 장점이 덜 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 가성비, 가족형 여유, 첫 여행 대표 동선을 많이 골랐다면 아카사카·롯폰기는 보조 후보입니다.",
      links: [{ title: "아카사카 근처 호텔 추천 TOP5", url: "/post/tokyo-akasaka-hotels" }, { title: "도쿄 조용한 숙소 추천 TOP5", url: "/post/tokyo-quiet-hotels" }],
      hotels: [{ name: "더 프린스 갤러리 도쿄 기오이초", tag: "아카사카·기오이초", location: "아카사카 권역", reason: "도심 접근성과 차분한 숙박 분위기를 함께 원하는 여행자에게 좋습니다.", meta: ["조용함", "고급", "커플"], url: "/post/the-prince-gallery-tokyo-kioicho" }, { name: "미쓰이 가든 호텔 롯폰기 도쿄 프리미어", tag: "롯폰기 도심", location: "롯폰기 권역", reason: "롯폰기 생활권에서 깔끔한 숙박과 저녁 동선을 함께 보고 싶을 때 좋습니다.", meta: ["롯폰기", "미식", "도심"], url: "/post/mitsui-garden-hotel-roppongi-tokyo-premier" }, { name: "호텔 더 셀레스틴 도쿄 시바", tag: "시바·도쿄타워", location: "시바 권역", reason: "비교적 차분한 분위기와 도쿄타워 주변 동선을 함께 볼 때 좋습니다.", meta: ["차분함", "도쿄타워", "커플"], url: "/post/hotel-the-celestine-tokyo-shiba" }]
    }
  },
  questions: [
    { title: "이번 도쿄 여행은 몇 번째인가요?", help: "처음인지, 재방문인지에 따라 숙소 위치 기준이 달라집니다.", options: [
      { title: "첫 도쿄 여행이에요", desc: "대표 동선과 이동 편의성이 가장 중요해요.", scores: { namba: 6, umeda: 5, tennoji: 3 } },
      { title: "두 번째 이상이에요", desc: "조금 더 취향에 맞는 구역을 고르고 싶어요.", scores: { shinsaibashi: 4, bay: 4, tennoji: 3 } },
      { title: "여러 번 가봤어요", desc: "번잡한 중심보다 분위기와 휴식이 중요해요.", scores: { bay: 5, tennoji: 3, universal: 2 } }
    ]},
    { title: "이번 여행에서 가장 중요한 일정은 무엇인가요?", help: "가장 많이 시간을 쓸 활동을 기준으로 추천합니다.", options: [
      { title: "대표 관광과 맛집", desc: "처음 가는 도쿄다운 기본 동선을 보고 싶어요.", scores: { namba: 6, umeda: 3, tennoji: 2 } },
      { title: "쇼핑과 카페", desc: "시부야, 하라주쿠, 오모테산도 분위기가 중요해요.", scores: { shinsaibashi: 7, namba: 2 } },
      { title: "전통 관광과 가성비", desc: "아사쿠사, 우에노, 스카이트리 쪽도 많이 보고 싶어요.", scores: { tennoji: 7, umeda: 2 } },
      { title: "공항·근교 이동", desc: "도쿄역이나 신칸센, 공항 이동이 중요해요.", scores: { umeda: 7, namba: 2 } },
      { title: "가족형 여유 일정", desc: "오다이바, 디즈니, 대형 쇼핑몰 일정이 있어요.", scores: { universal: 7, umeda: 2 } }
    ]},
    { title: "근교 여행 계획이 있나요?", help: "요코하마, 가마쿠라, 하코네, 닛코, 디즈니 일정이 있으면 숙소 기준이 달라집니다.", options: [
      { title: "근교 여행을 2일 이상 계획하고 있어요", desc: "도쿄 밖으로 나가는 일정이 꽤 많아요.", scores: { umeda: 6, namba: 4, tennoji: 3 } },
      { title: "디즈니 일정이 있어요", desc: "도쿄디즈니리조트 전후 이동이 중요해요.", scores: { universal: 7, umeda: 4 } },
      { title: "근교는 하루 정도만 있어요", desc: "시내 관광도 중요하지만 하루쯤은 다른 곳도 보고 싶어요.", scores: { namba: 4, umeda: 4, tennoji: 2 } },
      { title: "도쿄 시내 위주로만 볼 예정이에요", desc: "신주쿠, 시부야, 긴자, 아사쿠사 중심으로 움직일 예정이에요.", scores: { namba: 4, shinsaibashi: 3, tennoji: 3 } }
    ]},
    { title: "숙소 주변 분위기는 어떤 쪽이 좋나요?", help: "같은 도쿄여도 지역마다 밤 분위기와 체감 소음이 다릅니다.", options: [
      { title: "활기찬 번화가가 좋아요", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { namba: 6, shinsaibashi: 3 } },
      { title: "트렌디한 거리 분위기가 좋아요", desc: "쇼핑, 카페, 젊은 감성이 중요해요.", scores: { shinsaibashi: 7, namba: 2 } },
      { title: "깔끔한 도심이 좋아요", desc: "백화점, 역세권, 정돈된 거리를 선호해요.", scores: { umeda: 6, bay: 2 } },
      { title: "조금 차분한 곳이 좋아요", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { bay: 6, tennoji: 3, umeda: 2 } },
      { title: "가족여행에 편한 분위기가 좋아요", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { universal: 6, umeda: 3 } }
    ]},
    { title: "숙소 예산은 어떤 편인가요?", help: "도쿄는 위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.", options: [
      { title: "숙소비를 아끼고 싶어요", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { tennoji: 6, shinsaibashi: 2, namba: 1 } },
      { title: "가격과 위치 균형이 중요해요", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { namba: 4, tennoji: 4, shinsaibashi: 3 } },
      { title: "위치가 좋다면 조금 더 써도 괜찮아요", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { namba: 4, umeda: 5, shinsaibashi: 4, bay: 3 } }
    ]},
    { title: "이번 여행 동행자는 누구인가요?", help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.", options: [
      { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { namba: 4, tennoji: 3, umeda: 3 } },
      { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 보고 싶어요.", scores: { shinsaibashi: 4, bay: 4, umeda: 2 } },
      { title: "친구와 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { namba: 5, shinsaibashi: 4 } },
      { title: "가족·아이 동반", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { universal: 5, umeda: 4, tennoji: 2 } },
      { title: "부모님과 여행", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { umeda: 5, bay: 3, namba: 2 } }
    ]},
    { title: "호텔을 고를 때 가장 피하고 싶은 불편은 무엇인가요?", help: "마지막으로 피하고 싶은 요소를 반영하면 결과가 더 현실적으로 정리됩니다.", options: [
      { title: "밤 소음", desc: "숙소 주변이 너무 시끄러운 건 피하고 싶어요.", scores: { bay: 5, umeda: 3, tennoji: 2, namba: -2 } },
      { title: "긴 이동 시간", desc: "매일 이동 시간이 길어지는 건 싫어요.", scores: { namba: 4, umeda: 4, shinsaibashi: 3, universal: -2 } },
      { title: "복잡한 환승", desc: "길 찾기와 환승이 복잡한 곳은 부담스러워요.", scores: { umeda: 4, tennoji: 3, universal: 2, namba: -1 } },
      { title: "작은 객실", desc: "가격이 조금 올라가도 너무 좁은 객실은 피하고 싶어요.", scores: { universal: 4, bay: 3, umeda: 2, namba: -1 } },
      { title: "아이와 걷는 거리", desc: "아이와 함께 오래 걷는 동선은 줄이고 싶어요.", scores: { universal: 5, umeda: 3 } }
    ]}
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
        const desc = document.createElement("span");

        button.type = "button";
        button.className = "wt-option";
        button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");

        if (selectedIndex === optionIndex) {
          button.classList.add("is-selected");
        }

        title.className = "wt-option-title";
        title.textContent = option.title;

        desc.className = "wt-option-desc";
        desc.textContent = option.desc;

        button.appendChild(title);
        button.appendChild(desc);

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

      return Object.entries(scores)
        .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
        .sort((a, b) => b.score - a.score);
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
      setText("hotelSectionDesc", "추천 위치 결과와 잘 맞는 호텔 후보입니다. 데스크탑에서는 좌우로 넘겨 비교할 수 있으며, 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 함께 확인하세요.");
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
        linkWrap.className = "wt-hotel-link-wrap";
        link.className = "wt-hotel-link";

        rank.textContent = `${index + 1}`;
        tag.textContent = hotel.tag || "추천 후보";
        name.textContent = hotel.name;
        location.textContent = hotel.location;
        reason.textContent = hotel.reason;
        link.href = hotel.url || "#";
        link.textContent = "호텔 자세히 보기";
        link.setAttribute("aria-label", `${hotel.name} 자세히 보기`);

        (hotel.meta || []).forEach((item) => {
          const chip = document.createElement("span");
          chip.textContent = item;
          meta.appendChild(chip);
        });

        top.appendChild(rank);
        top.appendChild(tag);
        linkWrap.appendChild(link);
        article.appendChild(top);
        article.appendChild(name);
        article.appendChild(location);
        article.appendChild(reason);
        article.appendChild(meta);
        article.appendChild(linkWrap);
        hotelCardList.appendChild(article);
      });
    }

    function renderRelatedPosts(area) {
      const section = document.getElementById("relatedPostSection");
      const list = document.getElementById("relatedPostList");
      const posts = Array.isArray(area.links) ? area.links.slice(0, 5) : [];

      if (!section || !list) return;

      if (posts.length === 0) {
        section.style.display = "none";
        list.innerHTML = "";
        return;
      }

      section.style.display = "block";
      setText("relatedPostTitle", `${area.name} 선택 전 함께 보면 좋은 글`);
      setText("relatedPostDesc", "추천 위치와 가까운 호텔 추천 TOP5 글을 최대 5개까지 리스트로 보여줍니다.");
      list.innerHTML = "";

      posts.forEach((post) => {
        const item = document.createElement("li");
        const link = document.createElement("a");

        link.href = post.url || "#";
        link.textContent = post.title;
        link.setAttribute("aria-label", `${post.title} 보기`);

        item.appendChild(link);
        list.appendChild(item);
      });
    }

    function getPersuasiveContent(area) {
      return {
        intro: area.summary,
        reasons: [
          { title: "선택한 일정과 이동 기준이 잘 맞습니다", text: area.compareGood || area.summary },
          { title: "매일 반복되는 이동 피로를 줄이기 좋습니다", text: area.leadText || "숙소 위치를 먼저 정하면 하루 동선이 훨씬 단순해집니다." },
          { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 후기, 역 접근성을 더 현실적으로 비교할 수 있습니다." }
        ],
        conclusionTitle: `결론: 이번 도쿄 여행은 ${area.name}을 중심으로 호텔을 비교해보세요.`,
        conclusionText: "추천 지역 안에서도 역 출구, 밤 분위기, 객실 크기, 공항 이동 후기를 함께 확인하면 실패 확률을 줄일 수 있습니다."
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

    function renderPersuasiveResult(topArea) {
      const content = getPersuasiveContent(topArea);
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
  