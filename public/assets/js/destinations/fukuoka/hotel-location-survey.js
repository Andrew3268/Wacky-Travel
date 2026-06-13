/*
 * Fukuoka hotel location survey logic.
 * This file is intentionally city-specific.
 */
const cityConfig = {
  cityName: "후쿠오카",
  areas: {
    namba: {
      name: "하카타",
      label: "첫 후쿠오카 여행자에게 가장 무난한 교통 중심 위치",
      summary: "공항 이동, JR 이동, 짧은 일정, 귀국일 동선을 함께 고려하면 하카타역 주변이 가장 안정적입니다.",
      leadTitle: "공항에서 들어오고 다시 떠나는 동선이 단순합니다.",
      leadText: "후쿠오카공항에서 도심으로 들어오는 시간이 짧고, JR·지하철·버스가 모여 있어 첫 여행자가 숙소 위치로 실패할 확률이 낮습니다. 다자이후, 기타큐슈 등 근교 이동을 함께 넣는 일정에도 기준점이 되기 좋습니다.",
      stayRange: ["하카타역 도보 10분 이내", "공항 이동이 중요하면 지하철 공항선 접근이 쉬운 위치", "캐리어가 있다면 역 출구와 엘리베이터 동선을 확인"],
      avoidRange: ["밤 감성을 기대하고 역 주변 비즈니스 호텔만 보는 선택", "하카타역 도보 12분 이상인데 버스·지하철 접근이 애매한 위치", "가족 동반인데 객실 크기 후기가 부족한 숙소"],
      bestFor: ["첫 후쿠오카 여행", "짧은 2박 3일", "공항 이동", "JR 근교 이동"],
      notFor: ["밤마다 야타이를 즐기는 일정", "쇼핑과 카페가 여행의 핵심인 일정", "공원·해변 중심의 느린 여행"],
      bookingTips: ["하카타역 도보 시간만 보지 말고 실제 이용할 출구와 엘리베이터를 확인하세요.", "귀국일 아침 비행기라면 하카타역보다 지하철 공항선 접근성이 더 중요할 수 있습니다.", "역 앞 호텔은 편하지만 가격이 높을 수 있으니 기온 방향도 함께 비교하세요."],
      chips: ["첫 여행", "공항 이동", "JR", "짧은 일정", "귀국일"],
      compareGood: "공항·철도·버스 이동이 단순해 여행 초반과 귀국일 피로를 줄이기 쉽습니다.",
      compareCaution: "여행 감성이나 밤 산책 분위기는 텐진·나카스보다 약하게 느껴질 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑, 밤거리, 조용한 휴식을 더 중요하게 골랐다면 하카타는 1순위가 아닐 수 있습니다.",
      links: [
        { title: "하카타역 근처 호텔 추천 TOP5", url: "/post/fukuoka-hakata-station-hotels" },
        { title: "후쿠오카 첫 여행 호텔 추천 TOP5", url: "/post/fukuoka-first-trip-hotels" },
        { title: "후쿠오카 공항 이동 편한 호텔 추천 TOP5", url: "/post/fukuoka-airport-access-hotels" },
        { title: "후쿠오카 하카타 가성비 호텔 추천 TOP5", url: "/post/fukuoka-hakata-value-hotels" },
        { title: "후쿠오카 부모님과 가기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-parents-hotels" }
      ],
      hotels: [
        { name: "미야코 호텔 하카타", tag: "하카타역 바로 앞", location: "하카타역 권역", reason: "공항 이동과 JR 이동을 모두 단순하게 만들고 싶은 첫 여행자에게 비교 가치가 높습니다.", meta: ["첫 여행", "공항 이동", "역세권"], url: "/post/miyako-hotel-hakata" },
        { name: "JR 큐슈 호텔 블러섬 하카타 센트럴", tag: "하카타 중심", location: "하카타역 권역", reason: "하카타역 접근성과 도심 이동의 균형을 함께 보고 싶은 일정에 좋습니다.", meta: ["JR 이동", "깔끔한 도심", "짧은 일정"], url: "/post/jr-kyushu-hotel-blossom-hakata-central" },
        { name: "호텔 닛코 후쿠오카", tag: "안정형", location: "하카타역 권역", reason: "부모님 동반이나 안정적인 숙박 분위기를 중요하게 보는 여행자에게 어울립니다.", meta: ["부모님 동반", "하카타", "안정형"], url: "/post/hotel-nikko-fukuoka" },
        { name: "더 블라썸 하카타 프리미어", tag: "하카타·기온 균형", location: "하카타·기온 사이", reason: "하카타역과 캐널시티 접근성을 함께 보고 싶은 여행자에게 좋은 후보입니다.", meta: ["위치 균형", "캐널시티", "도심형"], url: "/post/the-blossom-hakata-premier" },
        { name: "호텔 포르자 하카타에키 치쿠시구치", tag: "실속형", location: "하카타역 동쪽", reason: "하카타역 접근성과 가격 균형을 함께 보고 싶은 여행자에게 비교하기 좋습니다.", meta: ["가성비", "하카타역", "교통"], url: "/post/hotel-forza-hakataeki-chikushiguchi" }
      ]
    },
    shinsaibashi: {
      name: "텐진",
      label: "쇼핑과 맛집 중심의 후쿠오카 도심 위치",
      summary: "백화점, 지하상가, 다이묘·이마이즈미 카페, 니시테츠 이동까지 생각하면 텐진이 잘 맞습니다.",
      leadTitle: "후쿠오카 도심을 가장 많이 체감하기 좋은 위치입니다.",
      leadText: "텐진은 쇼핑과 식사 선택지가 많고, 다이묘·이마이즈미·야쿠인까지 이어지는 산책 동선이 좋습니다. 하카타보다 여행 감성은 강하지만 공항·JR 이동은 한 번 더 계산해야 합니다.",
      stayRange: ["텐진역·텐진미나미역 도보권", "쇼핑 중심이면 솔라리아·파르코·지하상가 접근 확인", "카페와 식당 중심이면 다이묘·이마이즈미 방향도 비교"],
      avoidRange: ["공항 이동만 보고 텐진 한복판을 고르는 선택", "밤 소음이 걱정되는데 번화가 바로 앞 저층 객실", "하카타역 출발 일정이 많은데 텐진에만 고정하는 선택"],
      bestFor: ["쇼핑", "커플 여행", "맛집·카페", "도심 분위기"],
      notFor: ["귀국일 아침 이동이 가장 중요한 일정", "JR 근교 이동이 많은 일정", "조용한 휴식이 최우선인 여행"],
      bookingTips: ["텐진역과 텐진미나미역 중 실제 이용할 역을 확인하세요.", "공항 이동은 하카타보다 시간이 늘 수 있으니 귀국일 동선을 따로 계산하세요.", "다이묘·이마이즈미 쪽은 분위기가 좋지만 짐이 많으면 역까지의 보행 동선을 확인하세요."],
      chips: ["쇼핑", "카페", "도심", "커플", "니시테츠"],
      compareGood: "쇼핑과 식사 선택지가 많아 후쿠오카 도심 여행 만족도가 높습니다.",
      compareCaution: "하카타역·공항 이동을 자주 해야 한다면 이동 시간이 조금 늘 수 있습니다.",
      mismatchNote: "이번 답변에서 공항 이동과 JR 근교 이동을 강하게 골랐다면 하카타가 더 자연스러울 수 있습니다.",
      links: [
        { title: "텐진 근처 호텔 추천 TOP5", url: "/post/fukuoka-tenjin-hotels" },
        { title: "후쿠오카 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-shopping-hotels" },
        { title: "후쿠오카 커플 여행 호텔 추천 TOP5", url: "/post/fukuoka-couple-hotels" },
        { title: "후쿠오카 텐진 가성비 호텔 추천 TOP5", url: "/post/fukuoka-tenjin-value-hotels" },
        { title: "후쿠오카 카페 여행 호텔 추천 TOP5", url: "/post/fukuoka-cafe-trip-hotels" }
      ],
      hotels: [
        { name: "솔라리아 니시테츠 호텔 후쿠오카", tag: "텐진 중심", location: "텐진역 권역", reason: "쇼핑과 식사 동선을 짧게 묶고 싶은 여행자에게 좋은 위치입니다.", meta: ["쇼핑", "텐진", "커플"], url: "/post/solaria-nishitetsu-hotel-fukuoka" },
        { name: "니시테츠 그랜드 호텔", tag: "도심 안정형", location: "텐진 권역", reason: "텐진 생활권 안에서 안정적인 숙박 분위기를 원하는 여행자에게 어울립니다.", meta: ["도심", "안정형", "쇼핑"], url: "/post/nishitetsu-grand-hotel" },
        { name: "리치몬드 호텔 후쿠오카 텐진", tag: "실속형", location: "텐진·와타나베도리 권역", reason: "텐진 접근성과 가격 균형을 함께 보고 싶을 때 비교하기 좋습니다.", meta: ["가성비", "텐진", "도보 동선"], url: "/post/richmond-hotel-fukuoka-tenjin" },
        { name: "도큐 스테이 후쿠오카 텐진", tag: "장기 숙박 후보", location: "텐진미나미 권역", reason: "세탁 등 실용성을 중요하게 보는 여행자에게 잘 맞는 후보입니다.", meta: ["실용성", "장기 숙박", "텐진"], url: "/post/tokyu-stay-fukuoka-tenjin" },
        { name: "호텔 몬테레이 후쿠오카", tag: "차분한 도심", location: "와타나베도리·야쿠인 권역", reason: "텐진 접근성과 조금 더 차분한 숙박 분위기를 함께 보고 싶을 때 좋습니다.", meta: ["차분함", "텐진 접근", "커플"], url: "/post/hotel-monterey-fukuoka" }
      ]
    },
    umeda: {
      name: "나카스·카와바타",
      label: "야타이와 밤 산책에 강한 미식 중심 위치",
      summary: "야타이, 강변 산책, 캐널시티, 하카타와 텐진 사이 이동을 함께 고려하면 나카스·카와바타가 매력적입니다.",
      leadTitle: "밤 일정과 도보 복귀 동선이 편합니다.",
      leadText: "나카스는 하카타와 텐진 사이에 있어 양쪽 접근성이 좋고, 저녁 식사 후 숙소로 돌아오는 동선이 짧습니다. 다만 번화가와 가까울수록 소음과 주변 분위기를 더 꼼꼼히 봐야 합니다.",
      stayRange: ["나카스카와바타역·고후쿠마치역 도보권", "캐널시티와 하카타를 함께 보려면 강 남쪽·기온 방향", "밤 소음이 걱정되면 번화가 중심에서 한두 블록 떨어진 위치"],
      avoidRange: ["소음 후기가 많은 강변 저층 객실", "가족 여행인데 유흥가 골목 안쪽 숙소", "아침마다 하카타역으로 이동해야 하는데 역 접근이 애매한 위치"],
      bestFor: ["야타이", "밤 산책", "미식 여행", "하카타·텐진 균형"],
      notFor: ["조용한 숙소가 최우선인 여행", "아이와 함께하는 이른 취침 일정", "공항 이동만 가장 중요하게 보는 일정"],
      bookingTips: ["나카스는 위치가 좋을수록 소음도 함께 봐야 합니다.", "야타이 분위기가 목적이라면 나카스와 텐진 야타이를 모두 비교해보세요.", "가족 동반이라면 카와바타·기온 쪽의 차분한 위치를 함께 보세요."],
      chips: ["야타이", "밤 산책", "나카스", "캐널시티", "미식"],
      compareGood: "하카타와 텐진 사이에서 식사와 밤 동선을 짧게 만들기 좋습니다.",
      compareCaution: "번화가 가까운 숙소는 소음과 주변 분위기가 호불호를 만들 수 있습니다.",
      mismatchNote: "이번 답변에서 조용함, 가족형 휴식, 공항 이동을 더 중요하게 골랐다면 다른 구역이 더 맞을 수 있습니다.",
      links: [
        { title: "나카스 근처 호텔 추천 TOP5", url: "/post/fukuoka-nakasu-hotels" },
        { title: "캐널시티 근처 호텔 추천 TOP5", url: "/post/fukuoka-canal-city-hotels" },
        { title: "후쿠오카 야타이 여행 호텔 추천 TOP5", url: "/post/fukuoka-yatai-hotels" },
        { title: "후쿠오카 밤 산책 좋은 호텔 추천 TOP5", url: "/post/fukuoka-night-walk-hotels" },
        { title: "후쿠오카 미식 여행 호텔 추천 TOP5", url: "/post/fukuoka-food-trip-hotels" }
      ],
      hotels: [
        { name: "더 라이블리 후쿠오카 하카타", tag: "나카스 중심", location: "나카스카와바타 권역", reason: "야타이와 밤 산책 동선을 짧게 잡고 싶은 여행자에게 잘 맞습니다.", meta: ["나카스", "밤 일정", "미식"], url: "/post/the-lively-fukuoka-hakata" },
        { name: "호텔 리솔 트리니티 하카타", tag: "나카스 도심형", location: "나카스 권역", reason: "나카스 생활권을 활용하면서 대중교통 접근성도 함께 보고 싶을 때 좋습니다.", meta: ["나카스", "역세권", "도심"], url: "/post/hotel-resol-trinity-hakata" },
        { name: "호텔 오쿠라 후쿠오카", tag: "안정형", location: "나카스카와바타 권역", reason: "나카스 접근성과 안정적인 숙박 분위기를 함께 원하는 여행자에게 비교 가치가 있습니다.", meta: ["안정형", "나카스카와바타", "부모님 동반"], url: "/post/hotel-okura-fukuoka" },
        { name: "미쓰이 가든 호텔 후쿠오카 나카스", tag: "깔끔한 도심형", location: "나카스 권역", reason: "나카스 접근성과 깔끔한 객실 컨디션을 함께 보고 싶은 일정에 어울립니다.", meta: ["나카스", "깔끔한 숙소", "밤 산책"], url: "/post/mitsui-garden-hotel-fukuoka-nakasu" },
        { name: "그랜드 하얏트 후쿠오카", tag: "캐널시티 접근", location: "캐널시티·나카스 권역", reason: "캐널시티와 나카스 동선을 한 번에 잡고 싶은 여행자에게 좋은 후보입니다.", meta: ["캐널시티", "나카스", "도심형"], url: "/post/grand-hyatt-fukuoka" }
      ]
    },
    tennoji: {
      name: "기온·하카타역 동쪽",
      label: "가격과 동선 균형을 함께 보는 실속형 위치",
      summary: "하카타와 나카스 접근성은 유지하면서 숙박비와 차분한 분위기를 함께 보고 싶다면 기온·하카타역 동쪽이 좋습니다.",
      leadTitle: "중심 접근성과 숙박비 균형이 좋습니다.",
      leadText: "기온은 하카타와 나카스 사이, 하카타역 동쪽은 교통 접근성을 유지하면서 가격대를 비교하기 좋은 구역입니다. 첫 여행자도 동선을 크게 망치지 않으면서 비용을 조절하기 좋습니다.",
      stayRange: ["기온역·고후쿠마치역 도보권", "하카타역 동쪽 도보 10분 이내", "캐널시티와 하카타역 사이 동선"],
      avoidRange: ["역과 멀고 주변 편의시설이 부족한 실속형 호텔", "밤마다 텐진·나카스에 오래 머물 계획인데 복귀 동선이 애매한 위치", "가격만 보고 객실 크기·후기를 확인하지 않는 선택"],
      bestFor: ["가성비", "위치 균형", "차분한 중심", "재방문"],
      notFor: ["쇼핑이 여행의 핵심인 일정", "야타이와 밤거리 중심 일정", "공항 이동을 최단으로 만들고 싶은 일정"],
      bookingTips: ["하카타역과 가깝다는 표현보다 실제 도보 경로를 확인하세요.", "기온은 위치 균형이 좋지만 숙소 주변 분위기가 심심할 수 있습니다.", "가성비 호텔은 객실 크기와 조식·세탁 등 실용성을 함께 보세요."],
      chips: ["가성비", "기온", "하카타", "차분함", "위치 균형"],
      compareGood: "중심지 접근성을 유지하면서 숙박비와 차분함의 균형을 보기 좋습니다.",
      compareCaution: "후쿠오카다운 도심 활기나 쇼핑 감성은 텐진·나카스보다 약할 수 있습니다.",
      mismatchNote: "이번 답변에서 쇼핑, 밤거리, 해변·공원 일정을 더 많이 골랐다면 보조 후보로 보는 편이 좋습니다.",
      links: [
        { title: "기온 근처 호텔 추천 TOP5", url: "/post/fukuoka-gion-hotels" },
        { title: "후쿠오카 하카타 가성비 호텔 추천 TOP5", url: "/post/fukuoka-hakata-value-hotels" },
        { title: "후쿠오카 가성비 호텔 추천 TOP5", url: "/post/fukuoka-value-hotels" },
        { title: "후쿠오카 캐널시티 근처 호텔 추천 TOP5", url: "/post/fukuoka-canal-city-hotels" },
        { title: "후쿠오카 실속 숙소 추천 TOP5", url: "/post/fukuoka-budget-hotels" }
      ],
      hotels: [
        { name: "네스트 호텔 하카타 스테이션", tag: "실속형", location: "하카타역 권역", reason: "하카타역 접근성과 가격 균형을 함께 보고 싶은 여행자에게 비교하기 좋습니다.", meta: ["가성비", "하카타", "역세권"], url: "/post/nest-hotel-hakata-station" },
        { name: "프린스 스마트 인 하카타", tag: "간결한 도심형", location: "하카타·기온 권역", reason: "위치와 기본 컨디션을 우선하는 실속 여행자에게 어울립니다.", meta: ["실속", "하카타", "간결함"], url: "/post/prince-smart-inn-hakata" },
        { name: "호텔 비스타 후쿠오카 나카스카와바타", tag: "카와바타 접근", location: "고후쿠마치·카와바타 권역", reason: "나카스 접근과 비교적 차분한 숙박 분위기를 함께 보고 싶을 때 좋습니다.", meta: ["나카스 접근", "차분함", "실속"], url: "/post/hotel-vista-fukuoka-nakasu-kawabata" },
        { name: "미쓰이 가든 호텔 후쿠오카 기온", tag: "기온 균형형", location: "기온 권역", reason: "하카타역과 캐널시티 사이 동선을 활용하고 싶은 여행자에게 좋은 후보입니다.", meta: ["기온", "캐널시티", "위치 균형"], url: "/post/mitsui-garden-hotel-fukuoka-gion" },
        { name: "호텔 포르자 하카타에키 하카타구치", tag: "하카타 실속형", location: "하카타역 권역", reason: "하카타역 이동 편의와 합리적인 숙박을 함께 비교할 때 보기 좋습니다.", meta: ["하카타역", "가성비", "교통"], url: "/post/hotel-forza-hakataeki-hakataguchi" }
      ]
    },
    universal: {
      name: "오호리·모모치",
      label: "가족과 여유로운 일정을 보내기 좋은 위치",
      summary: "오호리공원, 후쿠오카타워, 모모치 해변을 중심으로 쉬어가는 여행을 원한다면 오호리·모모치가 잘 맞습니다.",
      leadTitle: "공원과 해변을 넣은 느린 일정에 좋습니다.",
      leadText: "오호리·모모치는 후쿠오카 도심의 번잡함에서 조금 벗어나 공원 산책, 해변, 전망 일정을 여유롭게 묶기 좋습니다. 가족 여행이나 재방문 여행자에게 특히 만족도가 높습니다.",
      stayRange: ["오호리공원역·롯폰마츠역 도보권", "모모치 해변·후쿠오카타워 접근성 확인", "가족 여행이라면 객실 크기와 조식 후기 확인"],
      avoidRange: ["매일 밤 나카스·텐진에서 늦게까지 머무는 일정", "공항 이동과 하카타역 접근이 최우선인 일정", "쇼핑을 여행의 핵심으로 잡은 일정"],
      bestFor: ["가족 여행", "공원 산책", "모모치 해변", "여유 일정"],
      notFor: ["짧은 첫 여행", "쇼핑 중심 일정", "밤거리 중심 여행"],
      bookingTips: ["오호리와 모모치는 체감 동선이 다르므로 주요 일정 위치를 먼저 정하세요.", "모모치 권역은 시내 이동 시간이 늘 수 있으니 하루 일정을 무리하게 넣지 않는 편이 좋습니다.", "가족 여행은 객실 크기와 침대 구성을 꼭 확인하세요."],
      chips: ["가족", "공원", "해변", "후쿠오카타워", "여유"],
      compareGood: "도심과 다른 여유로운 분위기로 여행 피로를 줄이기 좋습니다.",
      compareCaution: "하카타·텐진 중심 일정이 많으면 매번 이동이 번거로울 수 있습니다.",
      mismatchNote: "이번 답변에서 공항 이동, 쇼핑, 야타이를 더 많이 골랐다면 중심지 숙소가 더 맞을 수 있습니다.",
      links: [
        { title: "오호리공원 근처 호텔 추천 TOP5", url: "/post/fukuoka-ohori-hotels" },
        { title: "모모치 해변 근처 호텔 추천 TOP5", url: "/post/fukuoka-momochi-hotels" },
        { title: "후쿠오카 가족 호텔 추천 TOP5", url: "/post/fukuoka-family-hotels" },
        { title: "후쿠오카 여유로운 숙소 추천 TOP5", url: "/post/fukuoka-relax-hotels" },
        { title: "후쿠오카 아이와 가기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-kids-hotels" }
      ],
      hotels: [
        { name: "힐튼 후쿠오카 씨 호크", tag: "모모치 해변권", location: "모모치·시사이드모모치 권역", reason: "모모치 해변과 후쿠오카타워 일정을 여유롭게 잡고 싶은 가족 여행에 어울립니다.", meta: ["가족", "모모치", "전망"], url: "/post/hilton-fukuoka-sea-hawk" },
        { name: "호텔 JAL 시티 후쿠오카 텐진", tag: "아카사카 접근", location: "아카사카·오호리 접근권", reason: "텐진 접근성과 오호리공원 동선을 함께 보고 싶은 일정에 좋습니다.", meta: ["아카사카", "오호리 접근", "깔끔한 숙소"], url: "/post/hotel-jal-city-fukuoka-tenjin" },
        { name: "니시테츠 그랜드 호텔", tag: "텐진 안정형", location: "텐진·아카사카 권역", reason: "오호리와 텐진을 함께 다니는 가족·부모님 동반 일정에 비교하기 좋습니다.", meta: ["텐진", "안정형", "부모님 동반"], url: "/post/nishitetsu-grand-hotel" },
        { name: "더 리츠칼튼 후쿠오카", tag: "고급 도심형", location: "다이묘·텐진 권역", reason: "도심 접근성과 휴식의 질을 함께 높이고 싶은 특별한 여행에 어울립니다.", meta: ["럭셔리", "텐진", "휴식"], url: "/post/the-ritz-carlton-fukuoka" },
        { name: "호텔 몬토레 라 수르 후쿠오카", tag: "텐진·아카사카 사이", location: "텐진·아카사카 권역", reason: "도심 접근성과 차분한 분위기를 함께 원하는 여행자에게 좋습니다.", meta: ["차분함", "텐진 접근", "산책"], url: "/post/hotel-monterey-la-soeur-fukuoka" }
      ]
    },
    bay: {
      name: "야쿠인·와타나베도리",
      label: "번잡함은 줄이고 로컬 분위기를 즐기기 좋은 위치",
      summary: "텐진 접근성은 유지하면서 숙소 주변은 조금 더 차분하게 가져가고 싶다면 야쿠인·와타나베도리가 좋습니다.",
      leadTitle: "도심 접근성과 휴식 분위기의 균형이 좋습니다.",
      leadText: "야쿠인·와타나베도리는 텐진과 가까우면서도 번화가 한복판보다 차분한 분위기를 느끼기 좋습니다. 카페, 로컬 식당, 커플 여행, 재방문 여행자에게 특히 잘 맞습니다.",
      stayRange: ["야쿠인역·와타나베도리역 도보권", "텐진까지 도보 또는 짧은 지하철 이동권", "카페·식당 후보가 주변에 있는 위치"],
      avoidRange: ["하카타역을 매일 이용하는데 야쿠인 안쪽 깊은 위치", "밤마다 나카스에서 늦게 복귀하는 일정", "공항 이동 최단 동선을 원하는 첫 여행"],
      bestFor: ["커플 여행", "카페", "조용한 숙소", "재방문"],
      notFor: ["공항 이동 최우선", "JR 근교 이동 중심", "야타이·밤거리 중심"],
      bookingTips: ["텐진까지 실제 도보 시간이 어느 정도인지 확인하세요.", "야쿠인 안에서도 큰길 주변과 주거지 안쪽 분위기가 다릅니다.", "가격이 비슷하다면 객실 크기와 주변 식당 접근성을 함께 비교하세요."],
      chips: ["차분함", "카페", "커플", "로컬", "텐진 접근"],
      compareGood: "텐진 접근성을 유지하면서 번잡함과 소음을 줄이기 좋습니다.",
      compareCaution: "하카타역·공항 이동이 잦다면 이동 시간이 조금 늘 수 있습니다.",
      mismatchNote: "이번 답변에서 첫 여행, 공항 이동, JR 근교 이동을 더 많이 골랐다면 하카타가 더 알맞을 수 있습니다.",
      links: [
        { title: "야쿠인 근처 호텔 추천 TOP5", url: "/post/fukuoka-yakuin-hotels" },
        { title: "후쿠오카 조용한 호텔 추천 TOP5", url: "/post/fukuoka-quiet-hotels" },
        { title: "후쿠오카 커플 호텔 추천 TOP5", url: "/post/fukuoka-couple-hotels" },
        { title: "후쿠오카 카페 여행 호텔 추천 TOP5", url: "/post/fukuoka-cafe-trip-hotels" },
        { title: "후쿠오카 재방문 여행 호텔 추천 TOP5", url: "/post/fukuoka-repeat-trip-hotels" }
      ],
      hotels: [
        { name: "호텔 몬테레이 후쿠오카", tag: "야쿠인 접근", location: "와타나베도리·야쿠인 권역", reason: "텐진 접근성과 차분한 숙박 분위기를 함께 보고 싶은 여행자에게 어울립니다.", meta: ["차분함", "야쿠인", "커플"], url: "/post/hotel-monterey-fukuoka" },
        { name: "크로스 라이프 하카타 텐진", tag: "도심 균형형", location: "하카타·텐진 사이", reason: "하카타와 텐진을 모두 오가는 일정에서 균형 잡힌 위치 후보가 됩니다.", meta: ["위치 균형", "도심", "실속"], url: "/post/cross-life-hakata-tenjin" },
        { name: "도큐 스테이 후쿠오카 텐진", tag: "실용형", location: "텐진미나미·와타나베도리 권역", reason: "세탁과 실용성을 중요하게 보는 여행자에게 비교하기 좋습니다.", meta: ["실용성", "텐진 접근", "장기 숙박"], url: "/post/tokyu-stay-fukuoka-tenjin" },
        { name: "칸데오 호텔즈 후쿠오카 텐진", tag: "도심 휴식형", location: "텐진·와타나베도리 권역", reason: "텐진 접근성과 숙소에서의 휴식 요소를 함께 보고 싶을 때 어울립니다.", meta: ["휴식", "텐진", "도심"], url: "/post/candeo-hotels-fukuoka-tenjin" },
        { name: "호텔 몬토레 라 수르 후쿠오카", tag: "차분한 접근형", location: "텐진·아카사카 권역", reason: "텐진 접근과 비교적 차분한 숙박 분위기를 함께 보기에 좋습니다.", meta: ["텐진 접근", "차분함", "커플"], url: "/post/hotel-monterey-la-soeur-fukuoka" }
      ]
    }
  },
  questions: [
    {
      title: "이번 후쿠오카 여행은 몇 번째인가요?",
      help: "첫 여행일수록 공항 이동과 대표 동선이 단순한 위치가 유리합니다.",
      options: [
        { title: "첫 후쿠오카 여행이에요", desc: "대표 명소와 맛집 동선을 쉽게 잡고 싶어요.", scores: { namba: 5, shinsaibashi: 3, umeda: 2 } },
        { title: "두 번째 이상이에요", desc: "하카타·텐진만 고집하지 않아도 괜찮아요.", scores: { bay: 4, tennoji: 3, universal: 2 } },
        { title: "후쿠오카가 꽤 익숙해요", desc: "조금 더 조용하거나 여유로운 지역도 좋아요.", scores: { bay: 4, universal: 4, tennoji: 2 } }
      ]
    },
    {
      title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
      help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
      options: [
        { title: "공항 이동과 짧은 동선", desc: "도착과 귀국을 최대한 편하게 하고 싶어요.", scores: { namba: 6, tennoji: 2 } },
        { title: "쇼핑과 카페", desc: "텐진, 다이묘, 이마이즈미를 편하게 다니고 싶어요.", scores: { shinsaibashi: 6, bay: 2 } },
        { title: "야타이와 밤 산책", desc: "저녁에도 걸어서 먹고 돌아오고 싶어요.", scores: { umeda: 6, shinsaibashi: 2 } },
        { title: "공원과 해변, 여유 일정", desc: "오호리공원이나 모모치 쪽도 여유롭게 보고 싶어요.", scores: { universal: 6, bay: 2 } }
      ]
    },
    {
      title: "공항 이동은 얼마나 중요한가요?",
      help: "후쿠오카공항 이동을 중요하게 보면 하카타 쪽이 강한 후보가 됩니다.",
      options: [
        { title: "매우 중요해요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { namba: 6, tennoji: 2 } },
        { title: "보통이에요", desc: "조금 이동해도 괜찮지만 너무 복잡한 건 싫어요.", scores: { namba: 3, shinsaibashi: 3, umeda: 2 } },
        { title: "크게 중요하지 않아요", desc: "공항보다 현지 여행 분위기가 더 중요해요.", scores: { shinsaibashi: 3, umeda: 3, bay: 2, universal: 2 } }
      ]
    },
    {
      title: "후쿠오카 근교 여행 계획이 있나요?",
      help: "다자이후, 이토시마, 기타큐슈처럼 다른 지역을 함께 다녀올 예정이라면 출발역 기준이 중요합니다.",
      options: [
        { title: "근교 여행을 2일 이상 계획하고 있어요", desc: "JR이나 니시테츠 이동을 자주 사용할 예정이에요.", scores: { namba: 5, shinsaibashi: 4, tennoji: 2 } },
        { title: "다자이후는 꼭 가고 싶어요", desc: "니시테츠 이동을 고려하고 싶어요.", scores: { shinsaibashi: 5, namba: 2 } },
        { title: "후쿠오카 시내 위주로 볼 예정이에요", desc: "하카타, 텐진, 나카스 중심으로 움직일 예정이에요.", scores: { namba: 3, shinsaibashi: 3, umeda: 3 } },
        { title: "아직 정하지 않았지만 가능성은 있어요", desc: "일정이 바뀔 수 있어서 이동 선택지가 많은 곳이면 좋아요.", scores: { namba: 4, shinsaibashi: 3, tennoji: 2 } }
      ]
    },
    {
      title: "숙소 주변 분위기는 어떤 쪽이 좋나요?",
      help: "후쿠오카는 구역마다 밤 분위기와 체감 소음이 다릅니다.",
      options: [
        { title: "역 주변이 편한 곳", desc: "교통과 편의시설이 가장 중요해요.", scores: { namba: 5, tennoji: 2 } },
        { title: "활기찬 도심", desc: "쇼핑과 식당이 많은 곳이 좋아요.", scores: { shinsaibashi: 5, umeda: 2 } },
        { title: "밤에도 분위기 있는 곳", desc: "야타이와 강변 산책을 즐기고 싶어요.", scores: { umeda: 6, shinsaibashi: 2 } },
        { title: "조금 차분한 곳", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { bay: 5, tennoji: 3, universal: 2 } },
        { title: "가족여행에 편한 분위기", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { universal: 5, namba: 3 } }
      ]
    },
    {
      title: "숙소 예산은 어떤 편인가요?",
      help: "중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
      options: [
        { title: "숙소비를 아끼고 싶어요", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { tennoji: 5, bay: 3 } },
        { title: "가격과 위치 균형이 중요해요", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { tennoji: 4, namba: 3, bay: 3 } },
        { title: "위치가 좋다면 조금 더 써도 괜찮아요", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { namba: 4, shinsaibashi: 4, umeda: 3 } }
      ]
    },
    {
      title: "이번 여행 동행자는 누구인가요?",
      help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
      options: [
        { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { namba: 4, shinsaibashi: 3, tennoji: 2 } },
        { title: "커플 여행", desc: "맛집, 카페, 분위기를 함께 보고 싶어요.", scores: { shinsaibashi: 4, bay: 3, umeda: 2 } },
        { title: "친구와 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { umeda: 5, shinsaibashi: 3 } },
        { title: "가족·아이 동반", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { universal: 5, namba: 3 } },
        { title: "부모님과 여행", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { namba: 4, universal: 3, tennoji: 2 } }
      ]
    },
    {
      title: "호텔을 고를 때 가장 피하고 싶은 불편은 무엇인가요?",
      help: "마지막으로 피하고 싶은 요소를 반영하면 결과가 더 현실적으로 정리됩니다.",
      options: [
        { title: "밤 소음", desc: "숙소 주변이 너무 시끄러운 건 피하고 싶어요.", scores: { bay: 5, tennoji: 4, universal: 3, umeda: -2 } },
        { title: "긴 이동 시간", desc: "매일 이동 시간이 길어지는 건 싫어요.", scores: { namba: 4, shinsaibashi: 4, umeda: 3 } },
        { title: "복잡한 환승", desc: "길 찾기와 환승이 복잡한 곳은 부담스러워요.", scores: { namba: 4, tennoji: 2, shinsaibashi: 2 } },
        { title: "작은 객실", desc: "가격이 조금 올라가도 너무 좁은 객실은 피하고 싶어요.", scores: { universal: 4, bay: 3, namba: -1 } },
        { title: "아이와 걷는 거리", desc: "아이와 함께 오래 걷는 동선은 줄이고 싶어요.", scores: { universal: 4, namba: 3 } }
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
      const areaName = area?.name || "추천 구역";
      const firstTip = Array.isArray(area?.bookingTips) && area.bookingTips.length ? area.bookingTips[0] : "숙소 주변 동선과 최근 후기를 함께 확인하세요.";
      return {
        intro: `선택한 답변을 기준으로 보면 ${areaName}은(는) 이번 후쿠오카 여행에서 이동 피로와 숙소 만족도의 균형을 맞추기 좋은 후보입니다.`,
        reasons: [
          { title: "여행 목적과 위치가 맞습니다", text: area?.compareGood || "주요 일정과 숙소 위치의 방향이 비교적 잘 맞습니다." },
          { title: "불편 요소를 미리 줄일 수 있습니다", text: firstTip },
          { title: "다른 후보와 비교할 기준이 선명합니다", text: area?.compareCaution || "같은 구역 안에서도 역 접근성, 밤 분위기, 객실 크기를 함께 비교하면 선택이 쉬워집니다." }
        ],
        conclusionTitle: `결론: 이번 일정에서는 ${areaName}을(를) 1순위로 비교해보세요.`,
        conclusionText: area?.mismatchNote || "단, 일정이 바뀌면 최적 위치도 달라질 수 있으니 공항 이동, 밤 동선, 근교 이동 여부를 함께 확인하는 것이 좋습니다."
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
  