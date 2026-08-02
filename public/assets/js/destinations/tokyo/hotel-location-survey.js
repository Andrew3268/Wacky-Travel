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
      summary: "늦은 시간까지 이어지는 도쿄의 활기 속에서 식사와 쇼핑, 이동을 편하게 이어가고 싶은 당신에게 잘 맞는 도심 지역입니다.",
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
      links: [{ title: "신주쿠 근처 호텔 추천 TOP5", url: "/post/tokyo-shinjuku-hotels/" }, { title: "도쿄 첫 여행 호텔 추천 TOP5", url: "/post/tokyo-first-trip-hotels/" }],
      hotels: [{ name: "JR 호텔 블라썸 신주쿠", tag: "신주쿠역 접근", location: "신주쿠 권역", reason: "신주쿠 중심 동선과 깔끔한 객실 후기를 중요하게 본다면 후보에 넣어볼 만한 숙소입니다.", meta: ["첫 여행", "교통", "쇼핑 동선"], url: "/post/jr-kyushu-hotel-blossom-shinjuku/" }, { name: "호텔 그레이스리 신주쿠", tag: "신주쿠 중심", location: "신주쿠 동쪽", reason: "맛집, 쇼핑, 저녁 동선 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.", meta: ["맛집", "저녁 동선", "친구 여행"], url: "/post/hotel-gracery-shinjuku/" }, { name: "토큐 스테이 신주쿠", tag: "실속형 후보", location: "신주쿠산초메 권역", reason: "신주쿠 접근성과 실용적인 객실 편의성을 중요하게 본다면 잘 맞습니다.", meta: ["가성비", "역세권", "대표 동선"], url: "/post/tokyu-stay-shinjuku/" }]
    },
    shibuya: {
      name: "시부야",
      regionSlug: "shibuya",
      regionSlugAliases: ["시부야", "시부야"],
      label: "쇼핑과 감성 동선에 강한 위치",
      summary: "거리마다 다른 상점과 카페, 젊은 감각이 자연스럽게 흐르는 분위기 속에서 도쿄의 트렌드를 가장 가까이 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
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
      links: [{ title: "시부야 근처 호텔 추천 TOP5", url: "/post/tokyo-shibuya-hotels/" }, { title: "도쿄 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/tokyo-shopping-hotels/" }],
      hotels: [{ name: "시부야 스트림 엑셀 호텔 도큐", tag: "시부야 중심", location: "시부야 권역", reason: "시부야 쇼핑 동선과 하라주쿠 접근성을 같이 챙기고 싶다면 잘 맞는 후보입니다.", meta: ["쇼핑", "커플", "도보 동선"], url: "/post/shibuya-stream-excel-hotel-tokyu/" }, { name: "시퀀스 미야시타 파크", tag: "감성형", location: "시부야·하라주쿠 사이", reason: "시부야와 하라주쿠 분위기를 하루에 묶고 싶은 일정에 보기 좋습니다.", meta: ["감성", "쇼핑", "친구 여행"], url: "/post/sequence-miyashita-park/" }, { name: "트렁크 호텔 요요기 파크", tag: "부티크 후보", location: "요요기·시부야 권역", reason: "조금 더 여유 있는 분위기와 감성적인 숙소 분위기를 같이 따져볼 때 후보에 넣어볼 만합니다.", meta: ["부티크", "커플", "차분함"], url: "/post/trunk-hotel-yoyogi-park/" }]
    },
    ginzaTokyoStation: {
      name: "긴자 & 도쿄역",
      regionSlug: "ginza-tokyo-station",
      regionSlugAliases: ["긴자 & 도쿄역", "긴자 & 도쿄역", "긴자 도쿄역"],
      label: "공항·근교와 깔끔한 도심에 강한 위치",
      summary: "정돈된 거리와 고급스러운 분위기, 도쿄역을 중심으로 한 편한 이동 동선 속에서 차분한 도심 여행을 즐기고 싶은 당신에게 잘 맞는 지역입니다.",
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
      links: [{ title: "긴자 근처 호텔 추천 TOP5", url: "/post/tokyo-ginza-hotels/" }, { title: "도쿄역 근처 호텔 추천 TOP5", url: "/post/tokyo-station-hotels/" }],
      hotels: [{ name: "호텔 메트로폴리탄 도쿄 마루노우치", tag: "도쿄역 접근", location: "도쿄역 권역", reason: "근교 이동과 공항 이동을 중요하게 본다면 후보에 넣어볼 만한 위치입니다.", meta: ["근교 이동", "공항", "부모님"], url: "/post/hotel-metropolitan-tokyo-marunouchi/" }, { name: "미쓰이 가든 호텔 긴자 프리미어", tag: "긴자 도심형", location: "긴자 권역", reason: "긴자 쇼핑과 깔끔한 도심 숙소를 모두 챙기고 싶은 일정에 어울립니다.", meta: ["긴자", "깔끔한 도심", "커플"], url: "/post/mitsui-garden-hotel-ginza-premier/" }, { name: "다이와 로이넷 호텔 긴자 프리미어", tag: "실속형", location: "긴자·유라쿠초 권역", reason: "긴자 접근성과 가격 균형을 같이 따져보기 좋습니다.", meta: ["긴자", "실속", "역세권"], url: "/post/daiwa-roynet-hotel-ginza-premier/" }]
    },
    uenoAsakusa: {
      name: "우에노 & 아사쿠사",
      regionSlug: "ueno-asakusa",
      regionSlugAliases: ["우에노 & 아사쿠사", "우에노 & 아사쿠사", "우에노 아사쿠사"],
      label: "가성비와 전통 관광을 같이 챙기기 좋은 위치",
      summary: "오래된 절과 시장 골목, 공원 산책로가 이어지는 분위기 속에서 도쿄의 전통적인 매력을 천천히 느끼고 싶은 당신에게 잘 어울리는 지역입니다.",
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
      links: [{ title: "우에노 근처 호텔 추천 TOP5", url: "/post/tokyo-ueno-hotels/" }, { title: "아사쿠사 근처 호텔 추천 TOP5", url: "/post/tokyo-asakusa-hotels/" }],
      hotels: [{ name: "노가 호텔 우에노 도쿄", tag: "우에노 감성형", location: "우에노 권역", reason: "우에노 접근성과 감성적인 숙소 분위기를 중요하게 본다면 잘 맞습니다.", meta: ["우에노", "가성비", "감성"], url: "/post/nohga-hotel-ueno-tokyo/" }, { name: "리치몬드 호텔 프리미어 아사쿠사", tag: "아사쿠사 중심", location: "아사쿠사 권역", reason: "아사쿠사와 스카이트리 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["아사쿠사", "전통", "동쪽 관광"], url: "/post/richmond-hotel-premier-asakusa/" }, { name: "더 게이트 호텔 카미나리몬 바이 훌릭", tag: "아사쿠사 전망형", location: "카미나리몬 권역", reason: "아사쿠사의 분위기와 도보 관광을 같이 따져보기 좋습니다.", meta: ["전망", "아사쿠사", "커플"], url: "/post/the-gate-hotel-kaminarimon-by-hulic/" }]
    },
    odaibaBay: {
      name: "오다이바 & 도쿄베이",
      regionSlug: "odaiba-tokyo-bay",
      regionSlugAliases: ["오다이바 & 도쿄베이", "오다이바 & 도쿄베이", "오다이바 & 도쿄베이", "오다이바 도쿄베이"],
      label: "가족 여행과 도쿄베이권 일정에 좋은 위치",
      summary: "넓은 바다와 도심 야경, 가족형 쇼핑몰과 테마 일정이 함께 놓인 공간에서 복잡한 중심가보다 여유 있는 하루를 보내고 싶은 당신에게 잘 맞는 곳입니다.",
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
      links: [{ title: "오다이바 근처 호텔 추천 TOP5", url: "/post/tokyo-odaiba-hotels/" }, { title: "도쿄 가족 여행 호텔 추천 TOP5", url: "/post/tokyo-family-hotels/" }],
      hotels: [{ name: "그랜드 닛코 도쿄 다이바", tag: "오다이바 도쿄베이", location: "오다이바 권역", reason: "도쿄베이권과 여유로운 가족 일정을 중요하게 본다면 잘 맞습니다.", meta: ["가족", "도쿄베이", "여유"], url: "/post/grand-nikko-tokyo-daiba/" }, { name: "힐튼 도쿄 오다이바", tag: "도쿄베이 전망", location: "오다이바 권역", reason: "도쿄베이 전망과 가족형 숙소를 모두 챙기고 싶은 일정에 어울립니다.", meta: ["전망", "가족", "휴식"], url: "/post/hilton-tokyo-odaiba/" }, { name: "호텔 트러스티 도쿄 베이사이드", tag: "도쿄베이 실속", location: "아리아케 권역", reason: "도쿄베이권 접근성과 가격 균형을 같이 따져보기 좋습니다.", meta: ["실속", "도쿄베이", "가족"], url: "/post/hotel-trusty-tokyo-bayside/" }]
    },
    akasakaRoppongi: {
      name: "아카사카 & 롯폰기",
      regionSlug: "akasaka-roppongi",
      regionSlugAliases: ["아카사카 & 롯폰기", "아카사카 & 롯폰기", "아카사카 롯폰기"],
      label: "차분한 도심과 미식 일정에 좋은 위치",
      summary: "화려한 도심 접근성은 유지하되 번화가 한복판의 소란은 살짝 비켜가며, 야경과 맛집을 차분하게 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
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
      links: [{ title: "아카사카 근처 호텔 추천 TOP5", url: "/post/tokyo-akasaka-hotels/" }, { title: "도쿄 조용한 숙소 추천 TOP5", url: "/post/tokyo-quiet-hotels/" }],
      hotels: [{ name: "더 프린스 갤러리 도쿄 기오이초", tag: "아카사카·기오이초", location: "아카사카 권역", reason: "도심 접근성은 챙기면서 차분하게 쉬고 싶은 여행자에게 좋습니다.", meta: ["조용함", "고급", "커플"], url: "/post/the-prince-gallery-tokyo-kioicho/" }, { name: "미쓰이 가든 호텔 롯폰기 도쿄 프리미어", tag: "롯폰기 도심", location: "롯폰기 권역", reason: "롯폰기 생활권에서 깔끔한 숙소와 저녁 동선을 같이 따져볼 때 좋습니다.", meta: ["롯폰기", "미식", "도심"], url: "/post/mitsui-garden-hotel-roppongi-tokyo-premier/" }, { name: "호텔 더 셀레스틴 도쿄 시바", tag: "시바·도쿄타워", location: "시바 권역", reason: "비교적 차분한 분위기와 도쿄타워 주변 동선을 같이 따져볼 때 좋습니다.", meta: ["차분함", "도쿄타워", "커플"], url: "/post/hotel-the-celestine-tokyo-shiba/" }]
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
          { title: "야경·호텔 다이닝", desc: "롯폰기 야경과 미술관, 차분한 저녁 식사를 즐기고 싶어요.", scores: { akasakaRoppongi: 8, ginzaTokyoStation: 3, shibuya: 2 } },
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
          { title: "크게 중요하지 않음", desc: "공항보다 현지 일정과 숙소 주변 분위기가 더 중요해요.", scores: { shibuya: 3, shinjuku: 2, akasakaRoppongi: 2, odaibaBay: 1 } }
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

cityConfig.questionSignalLabels = [
  "여행 경험",
  "동행",
  "핵심 일정",
  "근교 일정",
  "숙소 분위기",
  "공항 이동",
  "디즈니·베이",
  "예산 기준"
];
