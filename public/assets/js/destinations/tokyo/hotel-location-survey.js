/*
 * 도쿄 hotel location survey logic.
 * Modernized with the Fukuoka V23 survey UI flow.
 */
const cityConfig = {
  cityName: "도쿄",
  destinationSlug: "tokyo",
  postContentType: "top5_series",
  areas: {
    shinjuku: {
      name: "신주쿠",
      regionSlug: "shinjuku",
      regionSlugAliases: ["신주쿠"],
      label: "첫 도쿄 여행자에게 가장 무난한 교통 중심 위치",
      summary: "대표 노선, 저녁 일정, 서쪽 도쿄 이동을 고려하면 신주쿠 주변이 가장 무난합니다.",
      leadTitle: "교통 선택지가 넓어 짧고 유연한 동선을 만들기 좋습니다.",
      leadText: "시부야, 하라주쿠, 도쿄역, 롯폰기 방향을 자주 오갈 계획이라면 이동 피로를 줄이기 좋습니다. 짧은 일정일수록 위치 장점이 크게 느껴집니다.",
      stayRange: ["신주쿠역, 니시신주쿠역, 신주쿠산초메역 도보 10분 이내", "저녁 이후 소음이 걱정되면 가부키초 바로 안쪽보다 큰길 또는 니시신주쿠 방향", "공항버스 이용을 고려한다면 버스터미널 접근성 확인"],
      avoidRange: ["저녁 이후 소음이 걱정된다면 번화가 바로 앞 저층 객실", "객실 크기를 중요하게 본다면 극중심가의 초소형 비즈니스 호텔", "부모님 동반이라면 출구와 엘리베이터 동선이 복잡한 위치"],
      bestFor: ["첫 도쿄 여행", "친구 여행", "맛집·쇼핑 중심 일정", "짧은 2박 3일 일정"],
      notFor: ["조용한 숙소가 최우선인 여행", "도쿄역·긴자 중심 일정", "디즈니·오다이바가 핵심인 가족 여행"],
      bookingTips: ["신주쿠역 도보 시간만 보지 말고 실제 이용할 노선 출구와의 거리를 확인하세요.", "가부키초 접근성과 소음은 반비례할 수 있으니 후기에서 저녁 이후 소음 언급을 확인하세요.", "공항 이동이 중요하면 리무진버스 또는 철도 환승 동선을 우선 비교하세요."],
      chips: ["첫 여행", "교통", "맛집", "저녁 동선", "쇼핑"],
      compareGood: "대표 노선과 맛집 동선이 넓고 여행 초보자도 이동 계획을 세우기 쉽습니다.",
      compareCaution: "역과 번화가가 큰 만큼 출구, 소음, 객실 크기, 가격을 꼼꼼히 봐야 합니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 여유, 디즈니 이동을 더 중요하게 봤다면 신주쿠는 1순위가 아닐 수 있습니다.",
      links: [{ title: "신주쿠 근처 호텔 추천 TOP5", url: "/post/tokyo-shinjuku-hotels" }, { title: "도쿄 첫 여행 호텔 추천 TOP5", url: "/post/tokyo-first-trip-hotels" }],
      hotels: [{ name: "JR 호텔 블라썸 신주쿠", tag: "신주쿠역 접근", location: "신주쿠 권역", reason: "신주쿠 중심 동선과 깔끔한 객실 후기를 중요하게 본다면 후보에 넣어볼 만한 숙소입니다.", meta: ["첫 여행", "교통", "쇼핑 동선"], url: "/post/jr-kyushu-hotel-blossom-shinjuku" }, { name: "호텔 그레이스리 신주쿠", tag: "신주쿠 중심", location: "신주쿠 동쪽", reason: "맛집, 쇼핑, 저녁 동선 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.", meta: ["맛집", "저녁 동선", "친구 여행"], url: "/post/hotel-gracery-shinjuku" }, { name: "토큐 스테이 신주쿠", tag: "실속형 후보", location: "신주쿠산초메 권역", reason: "신주쿠 접근성과 실용적인 객실 편의성을 중요하게 본다면 잘 맞습니다.", meta: ["가성비", "역세권", "대표 동선"], url: "/post/tokyu-stay-shinjuku" }]
    },
    shibuya: {
      name: "시부야",
      regionSlug: "shibuya",
      regionSlugAliases: ["시부야", "시부야"],
      label: "쇼핑과 감성 동선에 강한 위치",
      summary: "쇼핑, 카페, 하라주쿠·오모테산도 동선을 중요하게 본다면 시부야가 잘 맞습니다.",
      leadTitle: "트렌디한 거리와 쇼핑 동선을 짧게 묶기 좋습니다.",
      leadText: "시부야, 하라주쿠, 오모테산도, 다이칸야마를 자주 오갈 계획이라면 이동 시간을 크게 줄일 수 있습니다.",
      stayRange: ["시부야역, 하라주쿠역, 오모테산도역 도보 10분 이내", "쇼핑 중심이면 시부야역 또는 하라주쿠 접근성이 좋은 위치", "저녁 이후 소음이 걱정되면 역 바로 앞보다 한 블록 떨어진 위치"],
      avoidRange: ["공항 이동이 최우선인데 시부야에만 고정하는 선택", "역 도보 12분 이상인데 언덕길이 있는 위치", "숙박비가 높은데 객실 크기 후기가 부족한 호텔"],
      bestFor: ["쇼핑 중심 여행", "커플 여행", "친구 여행", "카페·감성 일정"],
      notFor: ["도쿄역·긴자 중심 여행", "공항 이동이 가장 중요한 여행", "조용한 숙소가 최우선인 여행"],
      bookingTips: ["시부야역은 복잡하므로 호텔까지 실제 출구 동선을 확인하세요.", "하라주쿠·오모테산도 동선이 많으면 시부야보다 중간 지점도 비교하세요.", "가격이 비슷하다면 역 출구와 편의점 접근성이 좋은 호텔을 우선 비교하세요."],
      chips: ["쇼핑", "카페", "커플", "친구 여행"],
      compareGood: "쇼핑·카페 동선이 짧아 도쿄의 트렌디한 분위기를 즐기기 좋습니다.",
      compareCaution: "숙박비와 혼잡도가 높은 편이라 객실 크기와 출구 동선을 꼭 봐야 합니다.",
      mismatchNote: "이번 답변에서 공항 이동, 조용함, 가족형 여유를 더 많이 선택했다면 시부야는 보조 후보에 가깝습니다.",
      links: [{ title: "시부야 근처 호텔 추천 TOP5", url: "/post/tokyo-shibuya-hotels" }, { title: "도쿄 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/tokyo-shopping-hotels" }],
      hotels: [{ name: "시부야 스트림 엑셀 호텔 도큐", tag: "시부야 중심", location: "시부야 권역", reason: "시부야 쇼핑 동선과 하라주쿠 접근성을 같이 챙기고 싶다면 잘 맞는 후보입니다.", meta: ["쇼핑", "커플", "도보 동선"], url: "/post/shibuya-stream-excel-hotel-tokyu" }, { name: "시퀀스 미야시타 파크", tag: "감성형", location: "시부야·하라주쿠 사이", reason: "시부야와 하라주쿠 분위기를 하루에 묶고 싶은 일정에 보기 좋습니다.", meta: ["감성", "쇼핑", "친구 여행"], url: "/post/sequence-miyashita-park" }, { name: "트렁크 호텔 요요기 파크", tag: "부티크 후보", location: "요요기·시부야 권역", reason: "조금 더 여유 있는 분위기와 감성적인 숙소 분위기를 같이 따져볼 때 후보에 넣어볼 만합니다.", meta: ["부티크", "커플", "차분함"], url: "/post/trunk-hotel-yoyogi-park" }]
    },
    ginzaTokyoStation: {
      name: "긴자 & 도쿄역",
      regionSlug: "ginza-tokyo-station",
      regionSlugAliases: ["긴자 & 도쿄역", "긴자 & 도쿄역", "긴자 도쿄역"],
      label: "공항·근교와 깔끔한 도심에 강한 위치",
      summary: "도쿄역, 긴자, 마루노우치, 공항 이동을 함께 생각한다면 긴자 & 도쿄역 주변이 편합니다.",
      leadTitle: "정돈된 도심과 이동 안정성을 함께 잡기 좋습니다.",
      leadText: "도쿄역, 긴자 쇼핑, 공항 이동, 신칸센·근교 이동을 함께 고려하는 일정에 강합니다.",
      stayRange: ["도쿄역, 긴자역, 유라쿠초역 도보 10분 이내", "공항 이동이 많다면 도쿄역 또는 긴자 리무진버스 접근성 확인", "부모님 동반이면 지상 이동이 쉬운 큰길 주변"],
      avoidRange: ["늦은 저녁 신주쿠·시부야에서 오래 머무는 일정", "캐주얼한 저녁 분위기를 기대하는 선택", "가격이 높은데 객실 크기가 너무 작은 호텔"],
      bestFor: ["부모님 동반", "공항 이동", "근교 당일치기", "깔끔한 도심 선호"],
      notFor: ["시부야 쇼핑 중심", "저녁 동선 중심 친구 여행", "숙소비 절약 최우선"],
      bookingTips: ["도쿄역은 넓으니 호텔이 어느 출구와 가까운지 확인하세요.", "나리타·하네다 중 어떤 공항을 쓰는지에 따라 이동 편의가 달라집니다.", "부모님 동반이면 지하 이동보다 지상 접근이 쉬운 호텔을 우선 비교하세요."],
      chips: ["공항 이동", "근교", "부모님", "깔끔한 도심"],
      compareGood: "공항·근교와 도심 쇼핑을 안정적으로 묶기 좋습니다.",
      compareCaution: "시부야·신주쿠 밤 일정이 많다면 매번 이동이 필요할 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑 감성, 저녁 동선, 가성비를 강하게 선택했다면 긴자 & 도쿄역은 2순위 대안으로 보는 편이 좋습니다.",
      links: [{ title: "긴자 근처 호텔 추천 TOP5", url: "/post/tokyo-ginza-hotels" }, { title: "도쿄역 근처 호텔 추천 TOP5", url: "/post/tokyo-station-hotels" }],
      hotels: [{ name: "호텔 메트로폴리탄 도쿄 마루노우치", tag: "도쿄역 접근", location: "도쿄역 권역", reason: "근교 이동과 공항 이동을 중요하게 본다면 후보에 넣어볼 만한 위치입니다.", meta: ["근교 이동", "공항", "부모님"], url: "/post/hotel-metropolitan-tokyo-marunouchi" }, { name: "미쓰이 가든 호텔 긴자 프리미어", tag: "긴자 도심형", location: "긴자 권역", reason: "긴자 쇼핑과 깔끔한 도심 숙소를 모두 챙기고 싶은 일정에 어울립니다.", meta: ["긴자", "깔끔한 도심", "커플"], url: "/post/mitsui-garden-hotel-ginza-premier" }, { name: "다이와 로이넷 호텔 긴자 프리미어", tag: "실속형", location: "긴자·유라쿠초 권역", reason: "긴자 접근성과 가격 균형을 같이 따져보기 좋습니다.", meta: ["긴자", "실속", "역세권"], url: "/post/daiwa-roynet-hotel-ginza-premier" }]
    },
    uenoAsakusa: {
      name: "우에노 & 아사쿠사",
      regionSlug: "ueno-asakusa",
      regionSlugAliases: ["우에노 & 아사쿠사", "우에노 & 아사쿠사", "우에노 아사쿠사"],
      label: "가성비와 전통 관광을 같이 챙기기 좋은 위치",
      summary: "나리타공항 접근, 아사쿠사, 우에노공원, 스카이트리 동선을 중시한다면 우에노 & 아사쿠사가 잘 맞습니다.",
      leadTitle: "도쿄 동쪽 관광과 숙박비 균형을 잡기 좋습니다.",
      leadText: "전통 관광과 실속형 호텔을 함께 찾는 여행자에게 좋은 선택지입니다.",
      stayRange: ["우에노역, 아사쿠사역, 쿠라마에역 도보 10분 이내", "나리타 이동이 중요하면 우에노 접근성 확인", "조용함을 원하면 아사쿠사 중심보다 쿠라마에·이리야 방향"],
      avoidRange: ["매일 신주쿠·시부야를 오가는 일정", "도쿄역·긴자 쇼핑이 중심인 일정", "늦은 저녁 서쪽 도쿄에 머무는 여행"],
      bestFor: ["가성비", "전통 관광", "나리타공항", "동쪽 도쿄"],
      notFor: ["시부야 중심 쇼핑 여행", "디즈니 중심 가족 여행", "긴자 고급 도심 분위기 선호"],
      bookingTips: ["우에노와 아사쿠사는 분위기가 다르므로 일정에 맞춰 고르세요.", "서쪽 도쿄 이동이 많다면 왕복 시간을 반드시 계산하세요.", "가격이 저렴할수록 역 출구와 객실 크기 후기를 확인하세요."],
      chips: ["가성비", "전통", "나리타", "동쪽 관광"],
      compareGood: "전통 관광과 실속형 숙소를 함께 잡기 좋습니다.",
      compareCaution: "신주쿠·시부야를 매일 오가면 이동 시간이 늘 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑, 저녁 동선, 디즈니를 더 강하게 선택했다면 우에노 & 아사쿠사는 보조 후보에 가깝습니다.",
      links: [{ title: "우에노 근처 호텔 추천 TOP5", url: "/post/tokyo-ueno-hotels" }, { title: "아사쿠사 근처 호텔 추천 TOP5", url: "/post/tokyo-asakusa-hotels" }],
      hotels: [{ name: "노가 호텔 우에노 도쿄", tag: "우에노 감성형", location: "우에노 권역", reason: "우에노 접근성과 감성적인 숙소 분위기를 중요하게 본다면 잘 맞습니다.", meta: ["우에노", "가성비", "감성"], url: "/post/nohga-hotel-ueno-tokyo" }, { name: "리치몬드 호텔 프리미어 아사쿠사", tag: "아사쿠사 중심", location: "아사쿠사 권역", reason: "아사쿠사와 스카이트리 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["아사쿠사", "전통", "동쪽 관광"], url: "/post/richmond-hotel-premier-asakusa" }, { name: "더 게이트 호텔 카미나리몬 바이 훌릭", tag: "아사쿠사 전망형", location: "카미나리몬 권역", reason: "아사쿠사의 분위기와 도보 관광을 같이 따져보기 좋습니다.", meta: ["전망", "아사쿠사", "커플"], url: "/post/the-gate-hotel-kaminarimon-by-hulic" }]
    },
    odaibaBay: {
      name: "오다이바 & 도쿄베이",
      regionSlug: "odaiba-tokyo-bay",
      regionSlugAliases: ["오다이바 & 도쿄베이", "오다이바 & 도쿄베이", "오다이바 & 도쿄베이", "오다이바 도쿄베이"],
      label: "가족 여행과 도쿄베이권 일정에 좋은 위치",
      summary: "아이와 함께하거나 디즈니·오다이바 일정이 핵심이면 오다이바 & 도쿄베이가 잘 맞습니다.",
      leadTitle: "아이와 함께 무리 없이 쉬어가는 일정에 잘 맞습니다.",
      leadText: "대형 쇼핑몰, 바다 전망, 가족형 호텔을 활용하기 좋고 디즈니 전후 일정에도 후보에 넣어볼 만합니다.",
      stayRange: ["다이바역, 아리아케역, 도쿄베이 권역", "디즈니 일정이 있다면 마이하마·신우라야스 접근성 비교", "도심 관광도 많다면 유리카모메·린카이선 동선 확인"],
      avoidRange: ["신주쿠·시부야·아사쿠사를 매일 촘촘히 도는 일정", "늦은 저녁 도심 식당가에서 오래 머무는 여행", "가성비가 최우선인 단기 여행"],
      bestFor: ["가족 여행", "디즈니", "오다이바", "여유 일정"],
      notFor: ["첫 도쿄 대표 명소를 촘촘히 도는 여행", "쇼핑·저녁 동선 중심 친구 여행", "숙소비 절약 최우선"],
      bookingTips: ["도심 관광 비중이 높다면 중심부까지 이동 시간을 반드시 계산하세요.", "디즈니 일정 전후라면 마이하마·신우라야스와 도쿄베이를 함께 비교하세요.", "가족 여행은 객실 크기와 조식, 셔틀 여부를 함께 확인하세요."],
      chips: ["가족", "디즈니", "도쿄베이", "여유"],
      compareGood: "가족형 일정과 휴식 분위기를 만들기 좋습니다.",
      compareCaution: "도쿄 중심 관광을 매일 하려면 이동 시간이 길어질 수 있습니다.",
      mismatchNote: "이번 답변에서 첫 여행 대표 동선, 쇼핑, 가성비를 더 많이 골랐다면 오다이바는 1순위가 아닐 수 있습니다.",
      links: [{ title: "오다이바 근처 호텔 추천 TOP5", url: "/post/tokyo-odaiba-hotels" }, { title: "도쿄 가족 여행 호텔 추천 TOP5", url: "/post/tokyo-family-hotels" }],
      hotels: [{ name: "그랜드 닛코 도쿄 다이바", tag: "오다이바 도쿄베이", location: "오다이바 권역", reason: "도쿄베이권과 여유로운 가족 일정을 중요하게 본다면 잘 맞습니다.", meta: ["가족", "도쿄베이", "여유"], url: "/post/grand-nikko-tokyo-daiba" }, { name: "힐튼 도쿄 오다이바", tag: "도쿄베이 전망", location: "오다이바 권역", reason: "도쿄베이 전망과 가족형 숙소를 모두 챙기고 싶은 일정에 어울립니다.", meta: ["전망", "가족", "휴식"], url: "/post/hilton-tokyo-odaiba" }, { name: "호텔 트러스티 도쿄 베이사이드", tag: "도쿄베이 실속", location: "아리아케 권역", reason: "도쿄베이권 접근성과 가격 균형을 같이 따져보기 좋습니다.", meta: ["실속", "도쿄베이", "가족"], url: "/post/hotel-trusty-tokyo-bayside" }]
    },
    akasakaRoppongi: {
      name: "아카사카 & 롯폰기",
      regionSlug: "akasaka-roppongi",
      regionSlugAliases: ["아카사카 & 롯폰기", "아카사카 & 롯폰기", "아카사카 롯폰기"],
      label: "차분한 도심과 미식 일정에 좋은 위치",
      summary: "번화가 한복판은 피하고 싶지만 도심 접근성을 포기하고 싶지 않다면 아카사카 & 롯폰기가 잘 맞습니다.",
      leadTitle: "도심 접근성은 유지하면서 조용히 쉬기 좋습니다.",
      leadText: "긴자, 롯폰기, 신주쿠, 시부야 방향으로 움직이기 좋고 숙소 주변 분위기는 비교적 정돈된 편입니다.",
      stayRange: ["아카사카역, 롯폰기역, 가미야초역 도보 10분 이내", "조용함을 원하면 큰길에서 한 블록 안쪽 위치", "야경·미식 일정이 많다면 롯폰기 접근성 확인"],
      avoidRange: ["도쿄가 처음인데 대표 관광지만 촘촘히 도는 일정", "숙소비를 최대한 아끼는 여행", "디즈니·오다이바가 핵심인 가족 여행"],
      bestFor: ["조용한 도심", "커플 여행", "미식", "출장 겸 여행"],
      notFor: ["가성비 최우선", "첫 여행 대표 동선", "가족형 도쿄베이 일정"],
      bookingTips: ["아카사카와 롯폰기는 분위기가 다르므로 저녁 동선을 기준으로 고르세요.", "언덕과 출구 동선을 확인하면 캐리어 이동이 쉬워집니다.", "가격대가 높은 편이므로 객실 크기와 조식 포함 여부를 함께 비교하세요."],
      chips: ["조용함", "커플", "미식", "도심"],
      compareGood: "번잡함을 줄이면서 도심 접근성을 유지하기 좋습니다.",
      compareCaution: "초행자의 대표 관광 동선만 보면 위치 장점이 덜 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 가성비, 가족형 여유, 첫 여행 대표 동선을 많이 골랐다면 아카사카 & 롯폰기는 보조 후보입니다.",
      links: [{ title: "아카사카 근처 호텔 추천 TOP5", url: "/post/tokyo-akasaka-hotels" }, { title: "도쿄 조용한 숙소 추천 TOP5", url: "/post/tokyo-quiet-hotels" }],
      hotels: [{ name: "더 프린스 갤러리 도쿄 기오이초", tag: "아카사카·기오이초", location: "아카사카 권역", reason: "도심 접근성은 챙기면서 차분하게 쉬고 싶은 여행자에게 좋습니다.", meta: ["조용함", "고급", "커플"], url: "/post/the-prince-gallery-tokyo-kioicho" }, { name: "미쓰이 가든 호텔 롯폰기 도쿄 프리미어", tag: "롯폰기 도심", location: "롯폰기 권역", reason: "롯폰기 생활권에서 깔끔한 숙소와 저녁 동선을 같이 따져볼 때 좋습니다.", meta: ["롯폰기", "미식", "도심"], url: "/post/mitsui-garden-hotel-roppongi-tokyo-premier" }, { name: "호텔 더 셀레스틴 도쿄 시바", tag: "시바·도쿄타워", location: "시바 권역", reason: "비교적 차분한 분위기와 도쿄타워 주변 동선을 같이 따져볼 때 좋습니다.", meta: ["차분함", "도쿄타워", "커플"], url: "/post/hotel-the-celestine-tokyo-shiba" }]
    }
  },
  questions: [
    { title: "이번 도쿄 여행은 몇 번째인가요?", help: "처음인지, 재방문인지에 따라 숙소 위치 기준이 달라집니다.", options: [
          { title: "첫 여행", desc: "대표 동선과 이동 편의성이 가장 중요해요.", scores: { shinjuku: 6, ginzaTokyoStation: 5, uenoAsakusa: 3 } },
          { title: "재방문", desc: "조금 더 취향에 맞는 구역을 고르고 싶어요.", scores: { shibuya: 4, akasakaRoppongi: 4, uenoAsakusa: 3 } },
          { title: "익숙한 여행", desc: "번잡한 중심보다 분위기와 휴식이 중요해요.", scores: { akasakaRoppongi: 5, uenoAsakusa: 3, odaibaBay: 2 } }
        ]},
    { title: "이번 여행 동행자는 누구인가요?", help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.", options: [
          { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { shinjuku: 4, uenoAsakusa: 3, ginzaTokyoStation: 3 } },
          { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 챙기고 싶어요.", scores: { shibuya: 4, akasakaRoppongi: 4, ginzaTokyoStation: 2 } },
          { title: "친구 여행", desc: "저녁 이후에도 활기차고 식당이 많은 곳이 좋아요.", scores: { shinjuku: 5, shibuya: 4 } },
          { title: "가족·아이", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { odaibaBay: 5, ginzaTokyoStation: 4, uenoAsakusa: 2 } },
          { title: "부모님 동반", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { ginzaTokyoStation: 5, akasakaRoppongi: 3, shinjuku: 2 } }
        ]},
    { title: "이번 여행에서 가장 중요한 일정은 무엇인가요?", help: "가장 많이 시간을 쓸 활동을 기준으로 추천합니다.", options: [
          { title: "관광·맛집", desc: "처음 가는 도쿄다운 기본 동선을 보고 싶어요.", scores: { shinjuku: 6, ginzaTokyoStation: 3, uenoAsakusa: 2 } },
          { title: "쇼핑·카페", desc: "시부야, 하라주쿠, 오모테산도 분위기가 중요해요.", scores: { shibuya: 7, shinjuku: 2 } },
          { title: "전통·가성비", desc: "아사쿠사, 우에노, 스카이트리 쪽도 많이 보고 싶어요.", scores: { uenoAsakusa: 7, ginzaTokyoStation: 2 } },
          { title: "공항·근교", desc: "도쿄역이나 신칸센, 공항 이동이 중요해요.", scores: { ginzaTokyoStation: 7, shinjuku: 2 } },
          { title: "가족 여유", desc: "오다이바, 디즈니, 대형 쇼핑몰 일정이 있어요.", scores: { odaibaBay: 7, ginzaTokyoStation: 2 } }
        ]},
    { title: "근교 여행 계획이 있나요?", help: "요코하마, 가마쿠라, 하코네, 닛코, 디즈니 일정이 있으면 숙소 기준이 달라집니다.", options: [
          { title: "근교 2일 이상", desc: "도쿄 밖으로 나가는 일정이 꽤 많아요.", scores: { ginzaTokyoStation: 6, shinjuku: 4, uenoAsakusa: 3 } },
          { title: "디즈니 일정", desc: "도쿄디즈니리조트 전후 이동이 중요해요.", scores: { odaibaBay: 7, ginzaTokyoStation: 4 } },
          { title: "근교 하루", desc: "시내 관광도 중요하지만 하루쯤은 다른 곳도 보고 싶어요.", scores: { shinjuku: 4, ginzaTokyoStation: 4, uenoAsakusa: 2 } },
          { title: "시내 중심", desc: "신주쿠, 시부야, 긴자, 아사쿠사 중심으로 움직일 예정이에요.", scores: { shinjuku: 4, shibuya: 3, uenoAsakusa: 3 } }
        ]},
    { title: "숙소 주변 분위기는 어떤 쪽이 좋나요?", help: "같은 도쿄여도 지역마다 저녁 이후 분위기와 체감 소음이 다릅니다.", options: [
          { title: "번화가", desc: "저녁 이후에도 주변에 식당과 볼거리가 많았으면 해요.", scores: { shinjuku: 6, shibuya: 3 } },
          { title: "트렌디한 거리", desc: "쇼핑, 카페, 젊은 감성이 중요해요.", scores: { shibuya: 7, shinjuku: 2 } },
          { title: "깔끔한 도심", desc: "백화점, 역세권, 정돈된 거리를 선호해요.", scores: { ginzaTokyoStation: 6, akasakaRoppongi: 2 } },
          { title: "차분한 숙소", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { akasakaRoppongi: 6, uenoAsakusa: 3, ginzaTokyoStation: 2 } },
          { title: "가족형 분위기", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { odaibaBay: 6, ginzaTokyoStation: 3 } }
        ]},
    { title: "공항 이동은 얼마나 중요한가요?", help: "하네다·나리타 이동을 중요하게 보면 역 접근성과 노선이 단순한 위치가 유리합니다.", options: [
          { title: "매우 중요", desc: "공항에서 숙소까지 길 찾기를 최대한 단순하게 하고 싶어요.", scores: { ginzaTokyoStation: 6, uenoAsakusa: 4, shinjuku: 3 } },
          { title: "보통", desc: "한 번 정도 갈아타는 것은 괜찮지만 너무 복잡한 건 싫어요.", scores: { ginzaTokyoStation: 3, shinjuku: 3, uenoAsakusa: 2, akasakaRoppongi: 2 } },
          { title: "중요 낮음", desc: "공항보다 현지 일정과 숙소 주변 분위기가 더 중요해요.", scores: { shibuya: 3, shinjuku: 2, akasakaRoppongi: 2, odaibaBay: 1 } }
        ]},
    { title: "디즈니·오다이바 일정이 있나요?", help: "디즈니, 오다이바, 도쿄베이 일정이 있으면 숙소 위치 기준이 달라집니다.", options: [
          { title: "디즈니 핵심", desc: "디즈니 이동을 편하게 잡고 싶어요.", scores: { odaibaBay: 7, ginzaTokyoStation: 4 } },
          { title: "오다이바 핵심", desc: "도쿄베이와 오다이바 주변을 여유롭게 보고 싶어요.", scores: { odaibaBay: 8, ginzaTokyoStation: 2 } },
          { title: "하루 방문", desc: "하루 정도만 들르고 시내 일정도 중요해요.", scores: { ginzaTokyoStation: 3, shinjuku: 2, akasakaRoppongi: 2, odaibaBay: 2 } },
          { title: "방문 없음", desc: "신주쿠, 시부야, 긴자, 우에노 같은 시내 동선이 더 중요해요.", scores: { shinjuku: 3, shibuya: 3, uenoAsakusa: 2, ginzaTokyoStation: 2 } }
        ]},
    { title: "숙소 예산은 어떤 편인가요?", help: "도쿄는 위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.", options: [
          { title: "예산 절약", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { uenoAsakusa: 6, shibuya: 2, shinjuku: 1 } },
          { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { shinjuku: 4, uenoAsakusa: 4, shibuya: 3 } },
          { title: "위치 우선", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { shinjuku: 4, ginzaTokyoStation: 5, shibuya: 4, akasakaRoppongi: 3 } }
        ]}
  ]
};

const areaResultBadges = {
  "shinjuku": "늦은 시간에도 이동이 편한 도심",
  "shibuya": "쇼핑과 트렌드를 가장 가까이 느끼는 거리",
  "ginzaTokyoStation": "도쿄역 이동과 긴자 산책이 편한 도심",
  "uenoAsakusa": "아사쿠사 골목과 우에노 산책을 함께 즐기는 하루",
  "odaibaBay": "도쿄베이 야경과 여유로운 일정을 함께 즐기기 좋은 곳",
  "akasakaRoppongi": "야경과 맛집을 차분하게 즐기기 좋은 도심"
};
const hotelAccessPresets = {
  "shinjuku": {
    "station": "신주쿠역 도보권",
    "airport": "하네다 약 45분·나리타 약 80분"
  },
  "shibuya": {
    "station": "시부야역 도보권",
    "airport": "하네다 약 45분·나리타 약 80분"
  },
  "ginzaTokyoStation": {
    "station": "긴자·도쿄역 도보권",
    "airport": "하네다 약 35분·나리타 약 60분"
  },
  "uenoAsakusa": {
    "station": "우에노·아사쿠사역 도보권",
    "airport": "나리타 약 45분·하네다 약 50분"
  },
  "odaibaBay": {
    "station": "오다이바·도쿄베이 도보권",
    "airport": "하네다 약 30~40분"
  },
  "akasakaRoppongi": {
    "station": "아카사카·롯폰기역 도보권",
    "airport": "하네다 약 40분·나리타 약 80분"
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
