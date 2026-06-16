/*
 * Fukuoka hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  cityName: "후쿠오카",
  destinationSlug: "fukuoka",
  postContentType: "top5_series",
  areas: {
    hakata: {
      name: "하카타",
      regionSlug: "하카타",
      regionSlugAliases: ["hakata"],
      label: "공항 이동과 근교 이동까지 가장 단순하게 잡기 좋은 중심 위치",
      summary: "후쿠오카공항, JR 하카타역, 다자이후·이토시마 같은 근교 이동까지 함께 고려하면 하카타가 가장 안정적인 선택입니다.",
      leadTitle: "첫 여행자와 짧은 일정 여행자에게 실패 확률이 낮은 위치입니다.",
      leadText: "하카타역을 중심으로 공항, 텐진, 기온, 나카스까지 연결하기 쉽습니다. 2박 3일처럼 시간이 짧거나 부모님과 함께 움직이는 일정이라면 이동 피로를 줄이기 좋습니다.",
      stayRange: [
        "JR 하카타역 또는 지하철 하카타역 도보 10분 이내",
        "공항 이동을 중시한다면 하카타역 동쪽·서쪽 출구 접근성 확인",
        "근교 당일치기가 있다면 JR·버스터미널 이동이 쉬운 위치"
      ],
      avoidRange: [
        "나카스 밤거리만 핵심인데 하카타역 뒤쪽에만 고정하는 선택",
        "역과 가깝지만 캐리어 이동 동선이 복잡한 골목 안쪽 숙소",
        "객실 크기를 중요하게 보는데 초소형 비즈니스 호텔만 보는 선택"
      ],
      bestFor: ["첫 후쿠오카 여행", "짧은 2박 3일", "공항 이동", "근교 당일치기", "부모님 동반"],
      notFor: ["밤마다 나카스 중심으로 오래 머무는 여행", "쇼핑만 텐진에 집중된 일정", "해변·공원 중심의 느린 여행"],
      bookingTips: [
        "하카타역 도보 시간만 보지 말고 실제 이용할 출구와의 거리를 확인하세요.",
        "아침 비행기나 늦은 도착이면 공항선 이동이 단순한 호텔을 우선 비교하세요.",
        "근교 이동이 많다면 조식 시간보다 역 접근성과 캐리어 보관 후기를 먼저 보세요."
      ],
      chips: ["첫 여행", "공항 이동", "JR", "근교 이동", "부모님 동반"],
      compareGood: "공항과 JR, 버스 이동을 한 번에 잡기 좋아 일정이 바뀌어도 대응하기 쉽습니다.",
      compareCaution: "숙소 주변의 여행 분위기는 나카스나 텐진보다 덜 화려하게 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 밤거리, 쇼핑, 해변 산책을 더 중요하게 골랐다면 하카타는 1순위보다 안정적인 대안에 가깝습니다.",
      hotels: [
        { name: "미야코 호텔 하카타", tag: "하카타역 최단 동선", location: "하카타 권역", reason: "하카타역 접근성과 객실 여유를 함께 보고 싶은 여행자에게 비교 가치가 높은 숙소입니다.", meta: ["하카타역", "공항 이동", "부모님 동반"], url: "/post/miyako-hotel-hakata" },
        { name: "오리엔탈 호텔 후쿠오카 하카타 스테이션", tag: "역세권 안정형", location: "하카타역 주변", reason: "공항선과 JR 이동을 단순하게 만들고 싶은 첫 여행자에게 보기 좋은 후보입니다.", meta: ["역세권", "첫 여행", "짧은 일정"], url: "/post/oriental-hotel-fukuoka-hakata-station" },
        { name: "호텔 닛코 후쿠오카", tag: "클래식 도심형", location: "하카타 중심", reason: "하카타역 생활권에서 안정적인 서비스와 이동 편의성을 함께 기대할 수 있습니다.", meta: ["하카타", "교통", "안정형"], url: "/post/hotel-nikko-fukuoka" },
        { name: "JR 큐슈 호텔 블라섬 하카타 센트럴", tag: "실속 역세권", location: "하카타역 도보권", reason: "하카타역 주변에서 위치와 가격 균형을 함께 보고 싶은 여행자에게 적합합니다.", meta: ["가성비", "역세권", "교통"], url: "/post/jr-kyushu-hotel-blossom-hakata-central" },
        { name: "호텔 포르자 하카타에키 치쿠시구치", tag: "짧은 일정 후보", location: "하카타역 치쿠시구치", reason: "공항 이동과 하카타역 출발 일정을 단순하게 만들고 싶은 경우 비교하기 좋습니다.", meta: ["공항선", "짧은 일정", "실속"], url: "/post/hotel-forza-hakataeki-chikushi-guchi" }
      ]
    },
    tenjin: {
      name: "텐진",
      regionSlug: "텐진",
      regionSlugAliases: ["tenjin"],
      label: "쇼핑과 식사, 도심 분위기를 가장 쉽게 즐기기 좋은 위치",
      summary: "백화점, 쇼핑몰, 카페, 식당을 중심으로 움직인다면 텐진이 가장 자연스럽습니다.",
      leadTitle: "쇼핑과 맛집, 커플·친구 여행의 균형이 좋습니다.",
      leadText: "텐진은 후쿠오카의 대표 번화가라 낮에는 쇼핑, 저녁에는 식사 동선을 짧게 만들기 좋습니다. 하카타보다 여행 분위기가 또렷하고, 나카스보다 숙박 선택지가 넓습니다.",
      stayRange: [
        "텐진역, 니시테츠후쿠오카역, 아카사카역 도보 10분 이내",
        "쇼핑 중심이면 텐진 지하상가와 백화점 접근성 확인",
        "나카스까지 걸을 계획이라면 텐진 남쪽·하루요시 방향도 비교"
      ],
      avoidRange: [
        "공항 이동과 JR 근교 이동이 핵심인데 텐진에만 고정하는 선택",
        "조용한 휴식을 원하면서 번화가 한복판 저층 객실을 고르는 선택",
        "캐리어가 많은데 지하상가 이동이 복잡한 위치"
      ],
      bestFor: ["쇼핑 여행", "커플 여행", "친구 여행", "카페·맛집", "도심 선호"],
      notFor: ["JR 근교 이동이 많은 일정", "해변·공원 중심 가족 여행", "숙소 주변 조용함이 최우선인 여행"],
      bookingTips: [
        "텐진역과 니시테츠후쿠오카역은 동선이 다르므로 자주 탈 노선을 먼저 정하세요.",
        "나카스까지 걸을 계획이라면 밤길과 다리 이동 시간을 함께 확인하세요.",
        "쇼핑 일정이 많다면 호텔 주변 코인락커보다 체크인 전 짐 보관 가능 여부를 확인하세요."
      ],
      chips: ["쇼핑", "맛집", "커플", "친구 여행", "도심"],
      compareGood: "쇼핑과 식사 선택지가 많아 숙소 주변에서 여행 시간을 충분히 쓰기 좋습니다.",
      compareCaution: "하카타역 기반 근교 이동이나 이른 공항 이동은 하카타보다 한 번 더 계산해야 합니다.",
      mismatchNote: "이번 답변에서 공항 이동, 근교 여행, 부모님 동반을 더 많이 골랐다면 텐진보다 하카타가 더 편할 수 있습니다.",
      hotels: [
        { name: "솔라리아 니시테츠 호텔 후쿠오카", tag: "텐진 중심", location: "텐진 권역", reason: "쇼핑과 식사, 니시테츠 이동을 한 번에 잡고 싶은 여행자에게 잘 맞는 후보입니다.", meta: ["쇼핑", "텐진역", "커플"], url: "/post/solaria-nishitetsu-hotel-fukuoka" },
        { name: "리치몬드 호텔 텐진 니시도리", tag: "쇼핑 도보권", location: "텐진 니시도리", reason: "텐진 쇼핑 거리와 카페 동선을 짧게 잡고 싶은 일정에 어울립니다.", meta: ["니시도리", "쇼핑", "도보 동선"], url: "/post/richmond-hotel-tenjin-nishidori" },
        { name: "호텔 몬토레 라 수르 후쿠오카", tag: "깔끔한 도심형", location: "텐진·아카사카 사이", reason: "텐진 접근성과 비교적 정돈된 숙박 분위기를 함께 보고 싶은 경우 좋습니다.", meta: ["텐진", "깔끔함", "커플"], url: "/post/hotel-monterey-la-soeur-fukuoka" },
        { name: "니시테츠 그랜드 호텔", tag: "클래식 텐진", location: "텐진 중심", reason: "텐진 생활권을 중심으로 안정적인 숙박을 원하는 여행자에게 비교 후보가 됩니다.", meta: ["텐진", "안정형", "쇼핑"], url: "/post/nishitetsu-grand-hotel" },
        { name: "램프 라이트 북스 호텔 후쿠오카", tag: "감성형 후보", location: "텐진·아카사카 권역", reason: "쇼핑과 카페, 가벼운 도심 산책을 함께 즐기고 싶은 여행자에게 어울립니다.", meta: ["감성 숙소", "카페", "도심"], url: "/post/lamplight-books-hotel-fukuoka" }
      ]
    },
    nakasuKawabata: {
      name: "나카스&카와바타",
      regionSlug: "나카스카와바타",
      regionSlugAliases: ["nakasu-kawabata", "나카스-카와바타", "나카스&카와바타"],
      label: "야경과 맛집, 도보 중심 밤 동선에 강한 위치",
      summary: "저녁 식사, 포장마차, 나카스 야경, 캐널시티 동선이 중요하다면 나카스&카와바타가 잘 맞습니다.",
      leadTitle: "밤에도 숙소로 돌아오는 길이 짧은 위치입니다.",
      leadText: "나카스 강변, 카와바타 상점가, 캐널시티, 텐진 남쪽까지 걸어서 연결하기 좋습니다. 친구 여행이나 맛집 중심 일정에서 체감 만족도가 높습니다.",
      stayRange: [
        "나카스카와바타역 도보 10분 이내",
        "나카스 야경을 원한다면 강변 접근성 확인",
        "소음이 걱정된다면 번화가 바로 앞보다 한 블록 떨어진 위치"
      ],
      avoidRange: [
        "밤 소음에 예민한데 나카스 중심 저층 객실을 고르는 선택",
        "아이 동반 가족여행인데 주변 밤 분위기를 확인하지 않는 선택",
        "근교 이동이 많은데 나카스 도보권만 보고 고르는 선택"
      ],
      bestFor: ["맛집 여행", "밤 동선", "친구 여행", "커플 여행", "캐널시티 접근"],
      notFor: ["조용한 숙소가 최우선인 여행", "부모님 동반의 편안한 일정", "근교 이동이 많은 여행"],
      bookingTips: [
        "나카스 접근성과 소음은 함께 확인해야 합니다. 최근 후기에서 밤 소음 언급을 꼭 보세요.",
        "카와바타 쪽은 나카스와 가깝지만 체감 분위기가 조금 더 차분할 수 있습니다.",
        "야식과 늦은 귀가가 많다면 호텔 입구 주변 분위기와 편의점 접근성도 확인하세요."
      ],
      chips: ["맛집", "야경", "포장마차", "캐널시티", "친구 여행"],
      compareGood: "저녁 이후 동선이 짧아 식사와 야경을 즐긴 뒤 숙소로 돌아오기 편합니다.",
      compareCaution: "번화가에 가까울수록 소음과 주변 분위기 호불호가 생길 수 있습니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 여유, 공항 이동을 더 중요하게 골랐다면 나카스&카와바타는 주의해서 비교해야 합니다.",
      hotels: [
        { name: "더 라이블리 후쿠오카 하카타", tag: "나카스 감성형", location: "나카스&카와바타 권역", reason: "나카스와 카와바타를 중심으로 도보 여행을 즐기고 싶은 여행자에게 어울립니다.", meta: ["나카스", "감성", "도보 동선"], url: "/post/the-lively-fukuoka-hakata" },
        { name: "미쓰이 가든 호텔 후쿠오카 나카스", tag: "나카스 중심", location: "나카스 권역", reason: "맛집과 야경 동선을 짧게 잡고 싶은 커플·친구 여행에 비교하기 좋습니다.", meta: ["나카스", "맛집", "커플"], url: "/post/mitsui-garden-hotel-fukuoka-nakasu" },
        { name: "호텔 리솔 트리니티 하카타", tag: "번화가 접근", location: "나카스카와바타 주변", reason: "나카스 접근성과 대중교통 동선을 함께 보고 싶은 경우 후보로 넣기 좋습니다.", meta: ["역세권", "밤 동선", "실속"], url: "/post/hotel-resol-trinity-hakata" },
        { name: "호텔 비스타 후쿠오카 나카스카와바타", tag: "카와바타 도보권", location: "카와바타 상점가 주변", reason: "나카스와 카와바타 상점가를 함께 이용하고 싶은 여행자에게 잘 맞습니다.", meta: ["카와바타", "상점가", "도보"], url: "/post/hotel-vista-fukuoka-nakasu-kawabata" },
        { name: "후쿠오카 플로럴 인 니시나카스", tag: "니시나카스 실속형", location: "나카스·텐진 사이", reason: "나카스와 텐진 남쪽을 함께 걸어 다니고 싶은 일정에서 비교할 만합니다.", meta: ["니시나카스", "가성비", "밤 동선"], url: "/post/fukuoka-floral-inn-nishinakasu" }
      ]
    },
    gion: {
      name: "기온",
      regionSlug: "기온",
      regionSlugAliases: ["gion"],
      label: "하카타와 나카스 사이에서 균형을 잡기 좋은 차분한 위치",
      summary: "하카타역 접근성은 유지하면서 나카스·캐널시티도 편하게 보고 싶다면 기온이 좋은 중간 지점이 됩니다.",
      leadTitle: "첫 여행과 재방문 모두에 무난한 균형형 위치입니다.",
      leadText: "기온은 하카타역과 나카스 사이에 있어 어느 한쪽으로 치우치지 않습니다. 숙소 주변은 비교적 차분하면서도 주요 동선으로 이동하기 쉬워 실속형 선택지로 좋습니다.",
      stayRange: [
        "기온역 또는 구시다신사마에역 도보 10분 이내",
        "하카타역과 나카스를 모두 오갈 계획이면 기온역 주변",
        "캐널시티 접근성을 원한다면 구시다신사·기온 남쪽 동선 확인"
      ],
      avoidRange: [
        "하카타역만 계속 이용하는데 기온 안쪽 저가 숙소만 보는 선택",
        "나카스 밤 동선이 핵심인데 실제 도보 시간을 확인하지 않는 선택",
        "역 출구와 호텔 사이 길 찾기 정보를 확인하지 않는 선택"
      ],
      bestFor: ["균형형 위치", "첫 여행", "캐널시티", "가성비", "차분한 도심"],
      notFor: ["쇼핑을 텐진에만 집중하는 일정", "해변·공원 중심 여행", "숙소 주변 번화함이 중요한 여행"],
      bookingTips: [
        "하카타역, 기온역, 구시다신사마에역 중 실제로 어떤 역을 쓸지 먼저 정하세요.",
        "기온은 조용함과 접근성의 균형이 장점이라 가격만 보고 너무 안쪽을 고르지 않는 편이 좋습니다.",
        "캐널시티와 나카스까지 걸을 계획이면 밤길 동선도 함께 확인하세요."
      ],
      chips: ["균형형", "기온역", "캐널시티", "가성비", "차분함"],
      compareGood: "하카타와 나카스 사이에서 이동 균형을 잡기 좋아 호텔 선택 실패 확률을 낮추기 좋습니다.",
      compareCaution: "텐진 쇼핑이나 오호리·모모치 일정이 중심이면 매번 이동이 필요할 수 있습니다.",
      mismatchNote: "이번 답변에서 텐진 쇼핑이나 오호리·모모치 휴식을 강하게 골랐다면 기온은 중간 대안으로 보는 편이 좋습니다.",
      hotels: [
        { name: "다이와 로이넷 호텔 하카타 기온", tag: "기온역 중심", location: "기온 권역", reason: "하카타와 나카스 사이에서 실속 있는 역세권 숙소를 찾을 때 비교하기 좋습니다.", meta: ["기온역", "균형형", "가성비"], url: "/post/daiwa-roynet-hotel-hakata-gion" },
        { name: "도미 인 하카타 기온", tag: "휴식형 실속", location: "기온 권역", reason: "도심 접근성과 숙소 내 휴식 요소를 함께 보고 싶은 여행자에게 어울립니다.", meta: ["기온", "대욕장", "실속"], url: "/post/dormy-inn-hakata-gion" },
        { name: "호텔 토리피토 하카타 기온", tag: "깔끔한 도심형", location: "기온·구시다신사 주변", reason: "기온에서 깔끔한 객실과 주요 명소 접근성을 함께 보고 싶을 때 후보가 됩니다.", meta: ["기온", "깔끔함", "도보"], url: "/post/hotel-torifito-hakata-gion" },
        { name: "더 로열 파크 호텔 후쿠오카", tag: "하카타·기온 사이", location: "하카타·기온 권역", reason: "하카타역과 기온 생활권을 함께 활용하고 싶은 일정에 비교할 만합니다.", meta: ["하카타", "기온", "안정형"], url: "/post/the-royal-park-hotel-fukuoka" },
        { name: "9호텔 하카타", tag: "감성 실속형", location: "기온·구시다신사 주변", reason: "카와바타와 기온 사이의 차분한 도보 동선을 원하는 여행자에게 어울립니다.", meta: ["기온", "감성", "실속"], url: "/post/9-hotel-hakata" }
      ]
    },
    yakuinWatanabedori: {
      name: "야쿠인 &와타나베도리",
      regionSlug: "야쿠인-와타나베도리",
      regionSlugAliases: ["yakuin-watanabedori", "yakuin-watanabe-dori", "야쿠인와타나베도리", "야쿠인-와타나베-도리"],
      label: "조용한 도심 분위기와 가격 균형을 잡기 좋은 위치",
      summary: "텐진 접근성은 유지하면서 조금 더 차분한 숙박 분위기와 실속을 원한다면 야쿠인 &와타나베도리가 잘 맞습니다.",
      leadTitle: "번화가 바로 앞보다 한 박자 여유로운 도심 숙소를 찾기 좋습니다.",
      leadText: "야쿠인과 와타나베도리 주변은 텐진·나카스 접근성이 있으면서도 숙박 분위기가 비교적 차분합니다. 재방문 여행자나 숙소비와 분위기를 함께 보는 여행자에게 잘 맞습니다.",
      stayRange: [
        "야쿠인역, 와타나베도리역, 텐진미나미역 도보 10분 이내",
        "텐진 쇼핑까지 걸을 계획이면 와타나베도리 북쪽 동선 확인",
        "조용한 숙박을 원하면 큰 도로 바로 앞보다 한 블록 안쪽"
      ],
      avoidRange: [
        "첫 여행에서 하카타역·나카스만 주로 다니는데 가격만 보고 고르는 선택",
        "아이 동반인데 역과 호텔 사이 보행 동선을 확인하지 않는 선택",
        "늦은 밤 귀가가 많은데 텐진·나카스와의 실제 거리를 보지 않는 선택"
      ],
      bestFor: ["가성비", "차분한 도심", "재방문", "커플 여행", "텐진 접근"],
      notFor: ["하카타역 중심 근교 이동", "나카스 밤거리 중심 여행", "오호리·모모치 중심 가족 여행"],
      bookingTips: [
        "야쿠인과 와타나베도리는 텐진과 가깝지만 역 동선이 다르므로 자주 이동할 방향을 먼저 정하세요.",
        "가격이 저렴해 보여도 지하철역까지의 실제 도보 시간을 꼭 확인하세요.",
        "조용함을 원한다면 대로변 소음과 객실 방음 후기를 함께 보세요."
      ],
      chips: ["가성비", "차분함", "텐진 접근", "재방문", "커플"],
      compareGood: "중심가 접근성을 유지하면서 숙소비와 분위기의 균형을 잡기 좋습니다.",
      compareCaution: "하카타역과 나카스만 계속 오가는 첫 여행이면 이동이 애매하게 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 공항 이동, 근교 이동, 밤거리 최단 동선을 많이 골랐다면 야쿠인 &와타나베도리는 2순위 후보입니다.",
      hotels: [
        { name: "호텔 몬토레 후쿠오카", tag: "와타나베도리 중심", location: "와타나베도리 권역", reason: "텐진 접근성과 차분한 도심 숙박을 함께 보고 싶은 여행자에게 잘 맞습니다.", meta: ["와타나베도리", "도심", "커플"], url: "/post/hotel-monterey-fukuoka" },
        { name: "호텔 몬테 에르마나 후쿠오카", tag: "실속 도심형", location: "와타나베도리 주변", reason: "숙소비와 위치 균형을 함께 보고 싶은 여행자에게 비교하기 좋은 후보입니다.", meta: ["가성비", "와타나베도리", "차분함"], url: "/post/hotel-monte-hermana-fukuoka" },
        { name: "퀸테사 호텔 후쿠오카 텐진 미나미", tag: "야쿠인 접근", location: "야쿠인·텐진미나미 권역", reason: "야쿠인 생활권과 텐진 남쪽 동선을 함께 활용하기 좋습니다.", meta: ["야쿠인", "실속", "도보"], url: "/post/quintessa-hotel-fukuoka-tenjin-minami" },
        { name: "크로스 라이프 하카타 텐진", tag: "도심 감성형", location: "하루요시·와타나베도리 주변", reason: "텐진과 나카스 사이에서 감성적인 도심 숙박을 원하는 경우 비교할 만합니다.", meta: ["감성", "텐진 접근", "커플"], url: "/post/cross-life-hakata-tenjin" },
        { name: "라이프 텐진 후쿠오카", tag: "재방문 감성형", location: "텐진·야쿠인 사이", reason: "혼자 또는 커플 여행에서 가볍고 트렌디한 숙박 분위기를 원할 때 어울립니다.", meta: ["감성 숙소", "재방문", "도심"], url: "/post/lyf-tenjin-fukuoka" }
      ]
    },
    ohoriMomochi: {
      name: "오호리&모모치",
      regionSlug: "오호리모모치",
      regionSlugAliases: ["ohori-momochi", "오호리-모모치", "오호리&모모치"],
      label: "공원과 해변, 가족형 여유 일정을 만들기 좋은 위치",
      summary: "오호리공원, 모모치 해변, 후쿠오카타워, 페이페이돔 주변을 여유롭게 보고 싶다면 오호리&모모치가 잘 맞습니다.",
      leadTitle: "도심 번화가보다 느린 일정과 휴식감이 강한 위치입니다.",
      leadText: "오호리공원 산책, 모모치 해변, 후쿠오카타워, 돔 주변 일정이 핵심이라면 도심을 매번 오가는 피로를 줄일 수 있습니다. 아이 동반 가족이나 여유로운 여행자에게 특히 좋습니다.",
      stayRange: [
        "오호리공원역, 도진마치역, 니시진역 도보권",
        "모모치 해변과 후쿠오카타워 중심이면 시사이드모모치 접근성 확인",
        "가족 여행이면 호텔 주변 식당·편의점·세탁 시설 확인"
      ],
      avoidRange: [
        "첫 후쿠오카 여행에서 하카타·텐진·나카스를 촘촘히 볼 계획",
        "밤 늦게 나카스와 텐진에서 오래 머무는 일정",
        "근교 이동이 많은데 하카타역 접근 시간을 계산하지 않는 선택"
      ],
      bestFor: ["가족여행", "아이 동반", "오호리공원", "모모치 해변", "여유로운 일정"],
      notFor: ["대표 명소를 짧게 많이 보는 첫 여행", "맛집·쇼핑 중심 여행", "공항·근교 이동 중심 일정"],
      bookingTips: [
        "오호리와 모모치는 같은 서쪽 권역이어도 체감 동선이 다르므로 방문지를 먼저 정하세요.",
        "시내 관광일이 많다면 하카타·텐진까지의 왕복 시간을 일정표에 넣어보세요.",
        "아이와 함께라면 객실 크기, 조식, 편의점 접근성을 함께 비교하세요."
      ],
      chips: ["가족여행", "오호리공원", "모모치", "해변", "여유"],
      compareGood: "도심보다 여유롭고 공원·해변 중심의 하루 흐름을 만들기 좋습니다.",
      compareCaution: "하카타·텐진·나카스 중심 일정이 많다면 이동 시간이 길어질 수 있습니다.",
      mismatchNote: "이번 답변에서 맛집, 쇼핑, 공항 이동을 강하게 골랐다면 오호리&모모치는 특수 목적형 후보에 가깝습니다.",
      hotels: [
        { name: "힐튼 후쿠오카 씨호크", tag: "모모치 대표형", location: "모모치·페이페이돔 주변", reason: "모모치 해변과 돔 주변 일정, 가족 여행을 함께 고려할 때 대표 후보가 됩니다.", meta: ["모모치", "가족", "전망"], url: "/post/hilton-fukuoka-sea-hawk" },
        { name: "더 레지덴셜 스위트 후쿠오카", tag: "가족형 객실", location: "모모치·니시진 권역", reason: "객실 여유와 가족형 숙박을 우선하는 경우 비교하기 좋습니다.", meta: ["가족", "객실 여유", "모모치"], url: "/post/the-residential-suites-fukuoka" },
        { name: "시사이드 호텔 트윈스 모모치", tag: "모모치 실속형", location: "시사이드모모치 주변", reason: "모모치 해변과 후쿠오카타워 접근성을 우선 보고 싶은 여행자에게 어울립니다.", meta: ["모모치", "해변", "실속"], url: "/post/seaside-hotel-twins-momochi" },
        { name: "원스 호텔 후쿠오카", tag: "오호리 접근", location: "오호리공원·도진마치 주변", reason: "오호리공원 산책과 도심 접근의 균형을 함께 보고 싶을 때 후보가 됩니다.", meta: ["오호리", "산책", "차분함"], url: "/post/ones-hotel-fukuoka" },
        { name: "호텔 뉴 가이아 돔마에", tag: "돔 주변 실속형", location: "도진마치·페이페이돔 주변", reason: "돔 일정이나 모모치 서쪽 권역을 중심으로 움직이는 여행자에게 비교할 만합니다.", meta: ["돔", "모모치", "실속"], url: "/post/hotel-new-gaea-domemae" }
      ]
    }
  },
  questions: [
    {
          title: "이번 후쿠오카 여행은 몇 번째인가요?",
          help: "첫 여행일수록 이동이 단순하고 대표 동선 접근성이 좋은 위치가 유리합니다.",
          options: [
            { title: "첫 후쿠오카 여행이에요", desc: "대표 명소와 맛집 동선을 쉽게 잡고 싶어요.", scores: { hakata: 5, nakasuKawabata: 4, tenjin: 2, gion: 2 } },
            { title: "두 번째 이상이에요", desc: "너무 뻔한 중심지만 고집하지 않아도 괜찮아요.", scores: { tenjin: 4, yakuinWatanabedori: 3, gion: 2, hakata: 1 } },
            { title: "후쿠오카가 꽤 익숙해요", desc: "조금 더 실속 있거나 여유로운 지역도 좋아요.", scores: { yakuinWatanabedori: 4, ohoriMomochi: 3, tenjin: 2 } }
          ]
        },
    {
          title: "이번 여행 동행자는 누구인가요?",
          help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
          options: [
            { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { hakata: 4, tenjin: 2, gion: 2 } },
            { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 보고 싶어요.", scores: { tenjin: 4, nakasuKawabata: 3, yakuinWatanabedori: 2 } },
            { title: "친구와 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { nakasuKawabata: 5, tenjin: 3, hakata: 1 } },
            { title: "가족·아이 동반", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { ohoriMomochi: 6, hakata: 2, gion: 1 } },
            { title: "부모님과 여행", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { hakata: 4, gion: 3, ohoriMomochi: 2 } }
          ]
        },
    {
          title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
          help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
          options: [
            { title: "맛집과 밤거리", desc: "저녁에도 걸어서 다닐 수 있는 곳이 좋아요.", scores: { nakasuKawabata: 6, tenjin: 2, hakata: 2 } },
            { title: "쇼핑", desc: "쇼핑몰, 상점가, 백화점 접근성이 중요해요.", scores: { tenjin: 6, hakata: 2, nakasuKawabata: 1 } },
            { title: "교통 편의성", desc: "공항 이동과 근교 이동을 편하게 하고 싶어요.", scores: { hakata: 6, gion: 3, tenjin: 1 } },
            { title: "아이와 함께하는 일정", desc: "이동 피로가 적고 동선이 단순했으면 좋겠어요.", scores: { ohoriMomochi: 6, hakata: 2, yakuinWatanabedori: 1 } }
          ]
        },
    {
          title: "공항 이동은 얼마나 중요한가요?",
          help: "후쿠오카공항 이동을 중요하게 보면 하카타 쪽이 강한 후보가 됩니다.",
          options: [
            { title: "매우 중요해요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { hakata: 6, gion: 3, tenjin: 1 } },
            { title: "보통이에요", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { hakata: 3, gion: 2, tenjin: 2 } },
            { title: "크게 중요하지 않아요", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { tenjin: 2, nakasuKawabata: 2, ohoriMomochi: 2 } }
          ]
        },
    {
          title: "오호리공원·모모치 해변 일정이 있나요?",
          help: "오호리공원, 모모치 해변, 후쿠오카타워가 핵심이면 숙소 위치 선택이 달라집니다.",
          options: [
            { title: "오호리·모모치가 이번 여행의 핵심이에요", desc: "공원·해변 이동과 휴식 시간을 여유롭게 잡고 싶어요.", scores: { ohoriMomochi: 9 } },
            { title: "하루 정도만 방문해요", desc: "오호리·모모치도 가지만 시내 관광도 중요해요.", scores: { ohoriMomochi: 3, tenjin: 2, hakata: 2 } },
            { title: "방문하지 않아요", desc: "시내 관광, 맛집, 쇼핑 중심으로 움직일 예정이에요.", scores: { hakata: 3, tenjin: 3, nakasuKawabata: 2, gion: 1 } }
          ]
        },
    {
          title: "후쿠오카 근교 여행 계획이 있나요?",
          help: "다자이후, 이토시마, 기타큐슈처럼 다른 지역을 함께 다녀올 예정이라면 숙소 위치 기준이 달라집니다.",
          options: [
            { title: "근교 여행을 2일 이상 계획하고 있어요", desc: "후쿠오카 시내와 근교를 함께 다녀오고 싶어요.", scores: { hakata: 7, gion: 3, tenjin: 1 } },
            { title: "근교 여행은 하루 정도만 있어요", desc: "시내 관광도 중요하지만 하루쯤은 다른 지역도 보고 싶어요.", scores: { hakata: 4, tenjin: 2, gion: 2 } },
            { title: "후쿠오카 시내 위주로만 볼 예정이에요", desc: "나카스, 하카타, 텐진처럼 시내 동선을 더 중요하게 봐요.", scores: { nakasuKawabata: 4, tenjin: 3, hakata: 2, gion: 2 } },
            { title: "아직 정하지 않았지만 가능성은 있어요", desc: "일정이 바뀔 수 있어서 이동 선택지가 많은 곳이면 좋아요.", scores: { hakata: 4, tenjin: 2, gion: 2 } }
          ]
        },
    {
          title: "숙소 주변 분위기는 어떤 쪽이 좋나요?",
          help: "같은 후쿠오카여도 지역마다 밤 분위기와 체감 소음이 다릅니다.",
          options: [
            { title: "활기찬 번화가가 좋아요", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { nakasuKawabata: 6, tenjin: 3 } },
            { title: "깔끔한 도심이 좋아요", desc: "백화점, 쇼핑몰, 역세권 분위기를 선호해요.", scores: { tenjin: 5, hakata: 3, gion: 1 } },
            { title: "조금 차분한 곳이 좋아요", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { yakuinWatanabedori: 5, gion: 3, ohoriMomochi: 2 } },
            { title: "가족여행에 편한 분위기가 좋아요", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { ohoriMomochi: 5, hakata: 2, gion: 1 } }
          ]
        },
    {
          title: "숙소 예산은 어떤 편인가요?",
          help: "위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
          options: [
            { title: "숙소비를 아끼고 싶어요", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { yakuinWatanabedori: 5, gion: 3, ohoriMomochi: 2 } },
            { title: "가격과 위치 균형이 중요해요", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { gion: 3, yakuinWatanabedori: 3, tenjin: 3, hakata: 2 } },
            { title: "위치가 좋다면 조금 더 써도 괜찮아요", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { hakata: 4, nakasuKawabata: 4, tenjin: 3 } }
          ]
        },
    {
          title: "호텔을 고를 때 가장 피하고 싶은 불편은 무엇인가요?",
          help: "마지막으로 피하고 싶은 요소를 반영하면 결과가 더 현실적으로 정리됩니다.",
          options: [
            { title: "밤 소음", desc: "숙소 주변이 너무 시끄러운 건 피하고 싶어요.", scores: { yakuinWatanabedori: 4, gion: 3, ohoriMomochi: 3, nakasuKawabata: -3 } },
            { title: "긴 이동 시간", desc: "매일 이동 시간이 길어지는 건 싫어요.", scores: { hakata: 4, tenjin: 3, nakasuKawabata: 2, ohoriMomochi: -2 } },
            { title: "복잡한 환승", desc: "길 찾기와 환승이 복잡한 곳은 부담스러워요.", scores: { hakata: 4, gion: 3, tenjin: 2 } },
            { title: "작은 객실", desc: "가격이 조금 올라가도 너무 좁은 객실은 피하고 싶어요.", scores: { ohoriMomochi: 3, hakata: 2, nakasuKawabata: -1 } },
            { title: "아이와 걷는 거리", desc: "아이와 함께 오래 걷는 동선은 줄이고 싶어요.", scores: { ohoriMomochi: 5, hakata: 2, gion: 1 } }
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

    if (selectedIndex === optionIndex) button.classList.add("is-selected");

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
      if (Object.prototype.hasOwnProperty.call(scores, areaKey)) {
        scores[areaKey] += score;
      }
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
  const contents = {
    hakata: {
      intro: "선택한 답변에서 공항 이동, 근교 이동, 짧은 일정, 부모님 동반처럼 ‘동선 안정성’이 중요한 기준으로 반영되었습니다. 그래서 하카타는 후쿠오카 여행의 시작과 끝을 가장 단순하게 만들기 좋은 선택입니다.",
      reasons: [
        { title: "공항 이동이 쉽습니다", text: "후쿠오카공항에서 하카타까지 연결이 단순해 도착일과 출국일의 피로를 줄이기 좋습니다." },
        { title: "근교 이동에 강합니다", text: "JR과 버스터미널을 활용하기 쉬워 다자이후, 이토시마, 기타큐슈 같은 일정에도 대응하기 좋습니다." },
        { title: "첫 여행자가 계획을 짜기 쉽습니다", text: "하카타를 기준점으로 잡으면 텐진, 나카스, 기온까지의 이동 기준이 분명해집니다." }
      ],
      conclusionTitle: "결론: 짧은 일정과 이동 편의성을 가장 중요하게 본다면 하카타가 가장 안전합니다.",
      conclusionText: "다만 여행 분위기와 밤 동선을 더 중시한다면 나카스&카와바타나 텐진도 함께 비교하는 편이 좋습니다."
    },
    tenjin: {
      intro: "선택한 답변에서 쇼핑, 도심 분위기, 맛집, 커플·친구 여행 성향이 함께 반영되었습니다. 텐진은 숙소 주변에서 바로 시간을 쓰기 좋은 위치입니다.",
      reasons: [
        { title: "쇼핑 동선이 가장 자연스럽습니다", text: "백화점, 지하상가, 상점가가 가까워 쇼핑과 식사를 한 번에 묶기 좋습니다." },
        { title: "여행 분위기가 또렷합니다", text: "하카타보다 도심 체감이 강하고, 나카스보다 숙소 선택 폭이 넓습니다." },
        { title: "커플·친구 여행에 잘 맞습니다", text: "카페, 식당, 쇼핑을 도보 중심으로 연결하기 쉬워 일정이 단조롭지 않습니다." }
      ],
      conclusionTitle: "결론: 쇼핑과 도심 여행 분위기를 함께 원한다면 텐진이 좋습니다.",
      conclusionText: "공항이나 JR 근교 이동을 자주 한다면 하카타와 비교해 전체 이동 시간을 한 번 더 계산하세요."
    },
    nakasuKawabata: {
      intro: "선택한 답변에서 맛집, 밤거리, 야경, 늦은 귀가처럼 저녁 이후 동선이 중요하게 반영되었습니다. 나카스&카와바타는 밤 시간을 활용하기 좋은 위치입니다.",
      reasons: [
        { title: "저녁 동선이 짧습니다", text: "나카스 강변, 포장마차, 식당가를 이용한 뒤 숙소로 돌아오는 부담이 적습니다." },
        { title: "캐널시티와 카와바타 접근성이 좋습니다", text: "쇼핑과 상점가, 나카스 야경을 한 권역 안에서 묶어 움직일 수 있습니다." },
        { title: "친구 여행 만족도가 높습니다", text: "늦은 시간까지 식사와 산책을 넣기 좋아 짧은 여행에서도 체류감이 큽니다." }
      ],
      conclusionTitle: "결론: 후쿠오카의 밤 동선과 맛집을 중요하게 본다면 나카스&카와바타가 잘 맞습니다.",
      conclusionText: "소음에 예민하다면 나카스 중심 저층 객실보다 카와바타 쪽이나 한 블록 떨어진 호텔을 우선 비교하세요."
    },
    gion: {
      intro: "선택한 답변에서 하카타와 나카스 사이의 균형, 가성비, 차분한 도심 접근성이 반영되었습니다. 기온은 어느 한쪽으로 치우치지 않는 실속형 위치입니다.",
      reasons: [
        { title: "하카타와 나카스를 모두 보기 쉽습니다", text: "하카타역 접근성을 유지하면서 캐널시티와 나카스 동선도 비교적 단순합니다." },
        { title: "숙박 분위기가 과하게 번잡하지 않습니다", text: "나카스 바로 앞보다 차분하고 하카타역 중심보다 여행지 접근감이 좋습니다." },
        { title: "가격과 위치 균형이 좋습니다", text: "중심 동선을 크게 포기하지 않으면서 실속 있는 호텔 후보를 찾기 좋습니다." }
      ],
      conclusionTitle: "결론: 하카타와 나카스 사이에서 균형을 잡고 싶다면 기온이 좋은 타협점입니다.",
      conclusionText: "다만 텐진 쇼핑이 주목적이라면 텐진, 근교 이동이 많다면 하카타와 함께 비교하세요."
    },
    yakuinWatanabedori: {
      intro: "선택한 답변에서 조용한 도심, 가격 균형, 재방문 여행, 커플 여행 성향이 반영되었습니다. 야쿠인 &와타나베도리는 번화가 바로 앞이 부담스러운 여행자에게 좋습니다.",
      reasons: [
        { title: "도심 접근성과 차분함의 균형이 좋습니다", text: "텐진 접근성을 유지하면서 숙소 주변 분위기는 조금 더 여유롭게 가져갈 수 있습니다." },
        { title: "가성비 후보를 찾기 좋습니다", text: "하카타·텐진 핵심부보다 숙소비 부담을 낮추면서도 주요 동선을 크게 포기하지 않습니다." },
        { title: "재방문 여행에 잘 맞습니다", text: "이미 대표 중심지를 경험했다면 야쿠인과 와타나베도리의 생활권 분위기가 더 만족스럽게 느껴질 수 있습니다." }
      ],
      conclusionTitle: "결론: 조용한 도심 숙박과 가격 균형을 원한다면 야쿠인 &와타나베도리가 좋습니다.",
      conclusionText: "첫 여행에서 공항 이동과 대표 명소를 촘촘히 볼 계획이라면 하카타나 기온도 함께 비교하세요."
    },
    ohoriMomochi: {
      intro: "선택한 답변에서 가족여행, 아이 동반, 공원·해변, 여유로운 일정이 강하게 반영되었습니다. 오호리&모모치는 도심 번화가보다 쉬어가는 흐름을 만들기 좋은 위치입니다.",
      reasons: [
        { title: "가족과 걷기 좋은 일정이 됩니다", text: "오호리공원과 모모치 해변 주변은 번화가보다 여유로운 하루를 만들기 좋습니다." },
        { title: "아이 동반 피로를 줄이기 좋습니다", text: "공원, 해변, 후쿠오카타워, 돔 주변 일정을 넣는다면 이동 부담을 줄일 수 있습니다." },
        { title: "숙박 분위기가 더 차분합니다", text: "하카타·텐진·나카스보다 여행 속도를 늦추고 쉬는 시간을 확보하기 쉽습니다." }
      ],
      conclusionTitle: "결론: 가족과 여유롭게 머무는 여행이라면 오호리&모모치가 잘 맞습니다.",
      conclusionText: "단, 첫 후쿠오카 여행에서 대표 명소를 짧게 많이 볼 계획이라면 하카타나 텐진 쪽이 더 효율적일 수 있습니다."
    }
  };

  return contents[area.key] || {
    intro: area.summary,
    reasons: [
      { title: "여행 목적과 맞는 위치입니다", text: area.compareGood || area.summary },
      { title: "이동 기준을 단순하게 만들 수 있습니다", text: area.leadText || "선택한 답변과 잘 맞는 이동 흐름을 만들기 좋습니다." },
      { title: "호텔 비교 기준이 명확해집니다", text: "지역을 먼저 정하면 가격, 객실, 후기 비교가 훨씬 쉬워집니다." }
    ],
    conclusionTitle: `${area.name}을 중심으로 호텔을 비교해보세요.`,
    conclusionText: "추천 지역 안에서 역 접근성, 주변 분위기, 최근 후기를 함께 확인하면 실패 확률을 줄일 수 있습니다."
  };
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
