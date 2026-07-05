/*
 * 오사카 hotel location survey logic.
 * Modernized with the Fukuoka V23 survey UI flow.
 */
const cityConfig = {
      cityName: "오사카",
  destinationSlug: "osaka",
  postContentType: "top5_series",
      areas: {
        namba: {
          name: "난바",
          regionSlug: "namba",
          regionSlugAliases: ["난바", "난바", "도톤보리"],
          label: "첫 오사카 여행자에게 가장 무난한 중심 위치",
          summary: "도톤보리의 불빛과 골목마다 이어지는 먹거리, 쇼핑과 저녁 일정이 자연스럽게 맞물리는 거리에서 오사카다운 활기를 가장 가까이 느끼고 싶은 당신에게 잘 맞는 지역입니다.",
          leadTitle: "대표 명소 중심으로 짧고 단순한 동선을 만들기 좋습니다.",
          leadText: "도톤보리, 신사이바시, 구로몬시장, 난바역 주변을 자주 오갈 계획이라면 이동 피로를 줄이기 좋습니다. 짧은 일정일수록 위치 장점이 크게 느껴집니다.",
          stayRange: [
            "난바역, 닛폰바시역, 신사이바시역 도보 10분 이내",
            "도톤보리 접근성을 원한다면 번화가와 너무 붙지 않은 골목",
            "공항 이동을 중시한다면 난카이 난바역 접근성이 좋은 위치"
          ],
          avoidRange: [
            "늦은 저녁 이후 소음이 걱정된다면 도톤보리 바로 앞 저층 객실",
            "객실 크기를 중요하게 본다면 극중심가의 초소형 비즈니스 호텔",
            "부모님 동반이라면 계단 이동이 많은 역 출구 주변"
          ],
          bestFor: ["첫 오사카 여행", "친구 여행", "맛집·쇼핑 중심 일정", "짧은 2박 3일 일정"],
          notFor: ["조용한 숙소가 최우선인 여행", "교토·고베 등 근교 이동이 더 많은 일정", "넓은 객실을 우선하는 가족 여행"],
          bookingTips: [
            "난바역 도보 시간만 보지 말고 실제 이용할 노선 출구와의 거리를 확인하세요.",
            "도톤보리 접근성과 소음은 반비례할 수 있으니 후기에서 저녁 이후 소음 언급을 확인하세요.",
            "공항 이동이 중요하면 난카이 난바역까지의 이동 동선을 우선 비교하세요."
          ],
          chips: ["첫 여행", "맛집", "쇼핑", "저녁 거리", "공항 이동"],
          compareGood: "대표 명소와 맛집 동선이 짧고 여행 초보자도 이동 계획을 세우기 쉽습니다.",
          compareCaution: "번화가에 가까울수록 소음, 객실 크기, 가격을 꼼꼼히 봐야 합니다.",
          mismatchNote: "이번 답변에서 조용함, 가족형 여유, 근교 이동을 더 중요하게 봤다면 난바는 1순위가 아닐 수 있습니다.",
          links: [
            { title: "난바 근처 호텔 추천 TOP5", url: "/post/osaka-namba-hotels" },
            { title: "도톤보리 근처 호텔 추천 TOP5", url: "/post/dotonbori-hotels" }
          ,
            { title: "오사카 난바 가성비 호텔 추천 TOP5", url: "/post/osaka-namba-value-hotels" },
            { title: "오사카 첫 여행 호텔 추천 TOP5", url: "/post/osaka-first-trip-hotels" },
            { title: "오사카 도톤보리 도보권 호텔 추천 TOP5", url: "/post/osaka-dotonbori-walk-hotels" }],
          hotels: [
            {
              name: "호텔 몬토레 그라스미아 오사카",
              tag: "난바역 접근",
              location: "난바 권역",
              reason: "난바 중심 동선과 공항 이동을 함께 고려할 때 비교 후보로 넣기 좋은 숙소입니다.",
              meta: ["첫 여행", "공항 이동", "쇼핑 동선"],
              url: "/post/hotel-monterey-grasmere-osaka"
            },
            {
              name: "크로스 호텔 오사카",
              tag: "도톤보리 중심",
              location: "도톤보리·신사이바시 사이",
              reason: "맛집, 쇼핑, 저녁 거리 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.",
              meta: ["맛집", "저녁 거리", "커플·친구"],
              url: "/post/cross-hotel-osaka"
            },
            {
              name: "소테츠 그랜드 프레사 오사카 난바",
              tag: "실속형 후보",
              location: "닛폰바시·난바 권역",
              reason: "난바 접근성과 가격 균형을 같이 중요하게 보는 여행자에게 비교하기 좋은 후보입니다.",
              meta: ["가성비", "역세권", "대표 동선"],
              url: "/post/sotetsu-grand-fresa-osaka-namba"
            }
          ,
            {
              name: "온야도 노노 난바 내추럴 핫 스프링",
              tag: "온천형 후보",
              location: "닛폰바시·난바 권역",
              reason: "난바 접근성과 휴식 요소를 같이 중요하게 보는 여행자에게 비교해볼 만한 점이 있는 후보입니다.",
              meta: ["온천", "난바 접근", "휴식"],
              url: "/post/onyado-nono-namba"
            },
            {
              name: "호텔 그레이스리 오사카 난바",
              tag: "깔끔한 도심형",
              location: "JR 난바·난바 권역",
              reason: "난바 생활권 안에서 깔끔한 객실과 이동 편의성을 함께 고려할 때 보기 좋습니다.",
              meta: ["깔끔한 숙소", "역세권", "짧은 일정"],
              url: "/post/hotel-gracery-osaka-namba"
            }]
        },
        shinsaibashi: {
          name: "신사이바시",
          regionSlug: "shinsaibashi",
          regionSlugAliases: ["신사이바시", "신사이바시"],
          label: "쇼핑과 위치 균형을 잡기 좋은 실속형 위치",
          summary: "쇼핑 거리의 즐거움은 놓치지 않으면서도 난바보다 조금 더 정돈된 분위기 속에서 오사카 도심을 편하게 즐기고 싶은 당신에게 잘 어울리는 위치입니다.",
          leadTitle: "번화가 접근성과 차분한 숙소 주변 분위기 사이의 균형이 좋습니다.",
          leadText: "신사이바시는 쇼핑 동선에 강하고, 혼마치는 난바와 우메다 사이에서 이동 균형을 잡기 좋습니다. 너무 번잡한 숙소가 부담스러운 여행자에게 특히 잘 맞습니다.",
          stayRange: [
            "신사이바시역, 나가호리바시역, 혼마치역 도보 10분 이내",
            "쇼핑 중심이면 신사이바시스지 접근성이 좋은 위치",
            "이동 균형을 원하면 혼마치역 주변"
          ],
          avoidRange: [
            "도톤보리 늦은 시간 동선이 핵심인데 너무 북쪽으로 올라간 위치",
            "역 도보 12분 이상인데 주변 편의시설이 적은 위치",
            "쇼핑보다 근교 이동이 많은데 신사이바시에만 고정하는 선택"
          ],
          bestFor: ["쇼핑 중심 여행", "커플 여행", "깔끔한 도심 선호", "난바와 우메다를 모두 오가는 일정"],
          notFor: ["저녁마다 도톤보리 중심으로 놀고 싶은 여행", "공항 이동을 가장 단순하게 만들고 싶은 여행", "USJ가 여행의 핵심인 일정"],
          bookingTips: [
            "신사이바시와 혼마치는 체감 분위기가 다르므로 목적에 맞춰 고르세요.",
            "도톤보리까지 걸을 계획이라면 실제 도보 거리와 저녁 귀갓길 분위기를 같이 확인하세요.",
            "가격이 비슷하다면 역 출구와 편의점 접근성이 좋은 호텔을 우선 비교하세요."
          ],
          chips: ["쇼핑", "균형형", "실속", "차분한 도심"],
          compareGood: "난바 접근성을 유지하면서 번잡함을 조금 줄일 수 있습니다.",
          compareCaution: "도톤보리 바로 앞 분위기를 기대하면 다소 거리가 느껴질 수 있습니다.",
          mismatchNote: "이번 답변에서 저녁 거리, 공항 이동, USJ 접근성을 강하게 선택했다면 신사이바시는 보조 후보에 가깝습니다.",
          links: [
            { title: "신사이바시 근처 호텔 추천 TOP5", url: "/post/osaka-shinsaibashi-hotels" },
            { title: "혼마치 근처 호텔 추천 TOP5", url: "/post/osaka-honmachi-hotels" }
          ,
            { title: "오사카 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/osaka-shopping-hotels" },
            { title: "오사카 혼마치 가성비 호텔 추천 TOP5", url: "/post/osaka-honmachi-value-hotels" },
            { title: "오사카 커플 여행 호텔 추천 TOP5", url: "/post/osaka-couple-hotels" }],
          hotels: [
            {
              name: "호텔 더 플래그 신사이바시",
              tag: "쇼핑 중심",
              location: "신사이바시 권역",
              reason: "신사이바시 쇼핑 동선과 난바 접근성을 둘 다 챙기고 싶은 여행자에게 잘 맞는 후보입니다.",
              meta: ["쇼핑", "커플", "도보 동선"],
              url: "/post/hotel-the-flag-shinsaibashi"
            },
            {
              name: "베셀 인 신사이바시",
              tag: "균형형",
              location: "신사이바시·나가호리바시 권역",
              reason: "번화가 접근성은 유지하면서 비교적 차분한 숙박을 원하는 경우 함께 볼 만합니다.",
              meta: ["차분한 도심", "실속", "쇼핑"],
              url: "/post/vessel-inn-shinsaibashi"
            },
            {
              name: "오사카 엑셀 호텔 도큐",
              tag: "혼마치 후보",
              location: "혼마치 권역",
              reason: "난바와 우메다 사이에서 이동 균형을 잡고 싶은 일정에 어울리는 후보입니다.",
              meta: ["이동 균형", "깔끔한 도심", "비즈니스형"],
              url: "/post/osaka-excel-hotel-tokyu"
            }
          ,
            {
              name: "카락사 호텔 오사카 난바",
              tag: "난바 접근형",
              location: "신사이바시·난바 사이",
              reason: "쇼핑과 도톤보리 접근을 같이 중요하게 보은 일정에서 비교하기 좋은 후보입니다.",
              meta: ["쇼핑", "도보 동선", "친구·커플"],
              url: "/post/karaksa-hotel-osaka-namba"
            },
            {
              name: "호텔 닛코 오사카",
              tag: "역세권 안정형",
              location: "신사이바시 중심",
              reason: "신사이바시역 접근성을 중요하게 보는 여행자에게 안정적인 비교 후보가 됩니다.",
              meta: ["신사이바시역", "쇼핑", "안정형"],
              url: "/post/hotel-nikko-osaka"
            }]
        },
        umeda: {
          name: "우메다",
          regionSlug: "umeda",
          regionSlugAliases: ["우메다", "우메다", "오사카역"],
          label: "교통과 당일치기 여행에 강한 위치",
          summary: "교토와 고베, 나라까지 이어지는 근교 동선을 편하게 열어두고, 낮에는 이동하고 저녁에는 정돈된 도심으로 돌아오고 싶은 당신에게 잘 맞는 중심 지역입니다.",
          leadTitle: "오사카 시내와 근교를 함께 움직이는 일정에 강합니다.",
          leadText: "JR, 한큐, 한신, 지하철 등 선택지가 많아 이동 계획을 짜기 좋습니다. 백화점과 쇼핑몰이 많아 깔끔한 도심 분위기를 선호하는 여행자에게도 잘 맞습니다.",
          stayRange: [
            "오사카역, 우메다역, 히가시우메다역 도보 10분 이내",
            "근교 이동이 많다면 JR 오사카역 접근성이 좋은 위치",
            "쇼핑과 식사를 함께 보려면 그랜드프론트·한큐 주변 접근성 확인"
          ],
          avoidRange: [
            "도톤보리 중심 저녁 거리 여행인데 우메다에만 숙소를 고정하는 선택",
            "역 구조가 복잡한 것이 부담스러운데 출구 정보가 부족한 호텔",
            "초행인데 호텔까지 지하상가 이동 동선이 복잡한 위치"
          ],
          bestFor: ["근교 당일치기 여행", "부모님 동반", "쇼핑몰 중심 일정", "깔끔한 도심 선호"],
          notFor: ["도톤보리·난바 중심 맛집 여행", "늦은 저녁 미나미 지역에서 오래 머무는 일정", "공항 이동을 가장 단순하게 하고 싶은 여행"],
          bookingTips: [
            "오사카역과 우메다역은 출구가 복잡하므로 호텔까지의 실제 출구 동선을 확인하세요.",
            "근교 여행이 많다면 JR·한큐·한신 중 어떤 노선을 주로 탈지 먼저 정하세요.",
            "부모님 동반이면 지하 이동보다 지상 접근이 쉬운 호텔을 우선 비교하세요."
          ],
          chips: ["교통", "근교 여행", "쇼핑몰", "깔끔한 도심"],
          compareGood: "근교 이동과 쇼핑몰 접근성이 좋아 일정 확장성이 큽니다.",
          compareCaution: "난바 중심 일정이면 매번 이동이 필요할 수 있습니다.",
          mismatchNote: "이번 답변에서 맛집, 저녁 거리, 첫 여행 대표 동선을 더 많이 골랐다면 우메다는 2순위 대안으로 보는 편이 좋습니다.",
          links: [
            { title: "우메다 근처 호텔 추천 TOP5", url: "/post/osaka-umeda-hotels" },
            { title: "오사카역 근처 호텔 추천 TOP5", url: "/post/osaka-station-hotels" }
          ,
            { title: "오사카 교통 편한 호텔 추천 TOP5", url: "/post/osaka-transport-hotels" },
            { title: "오사카 근교 여행하기 좋은 호텔 추천 TOP5", url: "/post/osaka-day-trip-hotels" },
            { title: "오사카 부모님과 가기 좋은 호텔 추천 TOP5", url: "/post/osaka-parents-hotels" }],
          hotels: [
            {
              name: "호텔 한큐 레스파이어 오사카",
              tag: "오사카역 접근",
              location: "우메다 권역",
              reason: "근교 이동과 쇼핑몰 접근성을 함께 보는 여행자에게 비교해볼 만한 점이 높은 위치입니다.",
              meta: ["근교 이동", "쇼핑몰", "부모님 동반"],
              url: "/post/hotel-hankyu-respire-osaka"
            },
            {
              name: "호텔 그란비아 오사카",
              tag: "JR 중심",
              location: "오사카역 권역",
              reason: "JR 이동을 자주 이용하거나 교토·고베 등 근교 일정을 넣을 때 보기 좋은 후보입니다.",
              meta: ["JR 이동", "근교 여행", "역세권"],
              url: "/post/hotel-granvia-osaka"
            },
            {
              name: "호텔 인터게이트 오사카 우메다",
              tag: "도심형 숙소",
              location: "우메다 권역",
              reason: "깔끔한 도심 분위기와 우메다 생활권을 선호하는 여행자에게 어울립니다.",
              meta: ["깔끔한 도심", "쇼핑", "교통"],
              url: "/post/hotel-intergate-osaka-umeda"
            }
          ,
            {
              name: "호텔 비스키오 오사카 바이 그란비아",
              tag: "우메다 실속형",
              location: "우메다 권역",
              reason: "오사카역 생활권과 깔끔한 도심 숙박을 같이 중요하게 볼 때 비교하기 좋습니다.",
              meta: ["오사카역", "깔끔한 도심", "실속"],
              url: "/post/hotel-vischio-osaka"
            },
            {
              name: "호텔 뉴 한큐 오사카",
              tag: "교통 중심",
              location: "우메다역 권역",
              reason: "공항버스와 우메다 교통 동선을 함께 고려하는 여행자에게 후보에 넣어볼 만합니다.",
              meta: ["교통", "우메다역", "공항 이동"],
              url: "/post/hotel-new-hankyu-osaka"
            }]
        },
        tennoji: {
          name: "덴노지",
          regionSlug: "tennoji",
          regionSlugAliases: ["덴노지", "덴노지", "덴노지"],
          label: "가격과 이동 편의성을 함께 보는 가성비 위치",
          summary: "중심가의 부담은 줄이면서도 오사카 주요 동선을 놓치지 않고, 합리적인 숙박비와 실속 있는 이동을 함께 챙기고 싶은 당신에게 잘 어울리는 지역입니다.",
          leadTitle: "숙소비와 이동 편의성을 함께 고려하는 실속형 선택입니다.",
          leadText: "아베노하루카스, 신세카이, 동물원 등 남쪽 동선과 잘 맞고 난바 접근도 비교적 편합니다. 중심가 대비 합리적인 가격대의 호텔을 찾을 때 후보에 넣어볼 만합니다.",
          stayRange: [
            "덴노지역, 아베노역, 덴노지에키마에역 도보 10분 이내",
            "신세카이·아베노하루카스 일정이 있다면 덴노지역 중심",
            "공항 이동도 고려한다면 환승 동선이 단순한 역세권"
          ],
          avoidRange: [
            "난바를 매일 밤 오갈 계획인데 숙소비만 보고 너무 남쪽으로 내려가는 선택",
            "역과 멀고 주변 편의시설이 약한 저가 호텔",
            "첫 여행인데 대표 명소 동선보다 가격만 우선한 선택"
          ],
          bestFor: ["가성비 중시", "남쪽 관광지 일정", "재방문 여행", "가격과 교통 균형을 보는 여행"],
          notFor: ["첫 오사카에서 난바가 핵심인 일정", "USJ 중심 가족 여행", "숙소 주변 주변 소음과 분위기를 중요하게 보는 여행"],
          bookingTips: [
            "저렴한 가격만 보지 말고 역까지의 도보 거리와 주변 분위기를 같이 확인하세요.",
            "난바를 자주 갈 예정이라면 이동 시간이 부담되지 않는지 먼저 계산하세요.",
            "객실 컨디션과 위생 후기를 함께 보면 가격 대비 만족도를 판단하기 쉽습니다."
          ],
          chips: ["가성비", "남쪽 동선", "아베노하루카스", "합리적 가격"],
          compareGood: "중심가 대비 숙소비 부담을 낮추면서 남쪽 관광지 접근성을 확보하기 좋습니다.",
          compareCaution: "대표 번화가 중심 일정이면 난바보다 동선이 길어질 수 있습니다.",
          mismatchNote: "이번 답변에서 짧은 일정, 저녁 거리, 첫 여행 대표 코스를 많이 골랐다면 덴노지는 우선순위가 낮을 수 있습니다.",
          links: [
            { title: "덴노지 근처 호텔 추천 TOP5", url: "/post/osaka-tennoji-hotels" },
            { title: "아베노 근처 호텔 추천 TOP5", url: "/post/osaka-abeno-hotels" }
          ,
            { title: "오사카 가성비 호텔 추천 TOP5", url: "/post/osaka-value-hotels" },
            { title: "오사카 덴노지 가성비 호텔 추천 TOP5", url: "/post/osaka-tennoji-value-hotels" },
            { title: "오사카 아베노 호텔 추천 TOP5", url: "/post/osaka-abeno-hotels-top5" }],
          hotels: [
            {
              name: "미야코 시티 오사카 덴노지",
              tag: "덴노지역 중심",
              location: "덴노지 권역",
              reason: "남쪽 관광지와 덴노지역 교통을 함께 보는 일정에 비교하기 좋은 숙소입니다.",
              meta: ["덴노지역", "남쪽 동선", "실속"],
              url: "/post/miyako-city-osaka-tennoji"
            },
            {
              name: "비아 인 아베노 덴노지",
              tag: "가성비 후보",
              location: "아베노·덴노지 권역",
              reason: "숙소비 부담을 줄이면서 역세권과 주변 편의성을 같이 중요하게 볼 때 적합합니다.",
              meta: ["가성비", "아베노하루카스", "역세권"],
              url: "/post/via-inn-abeno-tennoji"
            },
            {
              name: "호텔 트러스티 오사카 아베노",
              tag: "아베노 후보",
              location: "아베노 권역",
              reason: "아베노·덴노지 생활권에서 조용함과 접근성의 균형을 보고 싶은 여행자에게 어울립니다.",
              meta: ["아베노", "가격 균형", "차분함"],
              url: "/post/hotel-trusty-osaka-abeno"
            }
          ,
            {
              name: "호텔 발리 타워 오사카 덴노지",
              tag: "개성형 후보",
              location: "덴노지 권역",
              reason: "덴노지 중심에서 편의성과 독특한 숙소 주변 분위기를 같이 중요하게 보은 경우 비교할 만합니다.",
              meta: ["덴노지", "가성비", "개성형"],
              url: "/post/hotel-bali-tower-osaka-tennoji"
            },
            {
              name: "덴노지 라군 호텔",
              tag: "저예산 후보",
              location: "덴노지 권역",
              reason: "숙소비를 낮추면서 남쪽 동선 접근성을 우선 확인하고 싶을 때 보조 후보가 됩니다.",
              meta: ["저예산", "남쪽 동선", "실속"],
              url: "/post/tennoji-lagoon-hotel"
            }]
        },
        universal: {
          name: "유니버설 시티",
          regionSlug: "universal-city",
          regionSlugAliases: ["유니버설 시티", "유니버설 시티", "유니버설 시티", "universal"],
          label: "USJ 중심 일정에 가장 편한 위치",
          summary: "아침부터 밤까지 USJ에 집중하고, 아이와 함께하는 이동의 피로를 줄이며 하루를 가볍게 시작하고 싶은 당신에게 가장 편하게 맞는 위치입니다.",
          leadTitle: "USJ 입장과 퇴장 동선을 줄이는 데 가장 강합니다.",
          leadText: "테마파크에서 오래 머무는 일정이라면 숙소까지 돌아가는 피로가 크게 줄어듭니다. 아이 동반 가족이나 USJ가 여행의 핵심인 경우 만족도가 높습니다.",
          stayRange: [
            "유니버설 시티역 도보권",
            "USJ 입장 대기와 퇴장 후 이동을 줄일 수 있는 공식·인근 호텔",
            "아이 동반이면 역과 호텔 사이 이동이 단순한 위치"
          ],
          avoidRange: [
            "USJ는 하루만 가는데 오사카 시내 관광이 더 많은 일정",
            "매일 도톤보리·신사이바시를 오갈 계획인데 유니버설 시티에만 숙박하는 선택",
            "늦은 저녁 시내 식사와 쇼핑을 자주 넣는 일정"
          ],
          bestFor: ["USJ 중심 여행", "아이 동반 가족", "테마파크 집중 일정", "체력 부담을 줄이고 싶은 여행"],
          notFor: ["오사카 시내 관광 중심 일정", "맛집·쇼핑 위주 여행", "근교 당일치기가 많은 여행"],
          bookingTips: [
            "USJ 방문일 전날 또는 당일만 1박하는 분할 숙박도 고려해보세요.",
            "시내 관광이 많다면 난바·우메다와 비교해 전체 이동 시간을 계산하세요.",
            "아이와 함께라면 객실 크기, 조식, 편의점 접근성도 같이 확인하세요."
          ],
          chips: ["USJ", "가족여행", "아이 동반", "테마파크"],
          compareGood: "USJ 동선이 짧아 체력 부담을 줄이기 좋습니다.",
          compareCaution: "시내 관광과 쇼핑 일정이 많으면 매번 이동해야 합니다.",
          mismatchNote: "이번 답변에서 USJ 비중이 낮고 시내 관광을 더 많이 선택했다면 유니버설 시티는 특수 목적형 후보입니다.",
          links: [
            { title: "유니버설 시티 호텔 추천 TOP5", url: "/post/osaka-universal-city-hotels" },
            { title: "USJ 근처 호텔 추천", url: "/post/usj-nearby-hotels" }
          ,
            { title: "USJ 가족 호텔 추천 TOP5", url: "/post/usj-family-hotels" },
            { title: "유니버설 시티 가성비 호텔 추천 TOP5", url: "/post/universal-city-value-hotels" },
            { title: "오사카 아이와 가기 좋은 호텔 추천 TOP5", url: "/post/osaka-kids-hotels" }],
          hotels: [
            {
              name: "더 파크 프론트 호텔 앳 유니버설 스튜디오 재팬",
              tag: "USJ 최단 동선",
              location: "유니버설 시티 권역",
              reason: "USJ 입장과 퇴장 동선을 최대한 줄이고 싶은 가족 여행자에게 강한 후보입니다.",
              meta: ["USJ", "가족", "테마파크"],
              url: "/post/the-park-front-hotel-usj"
            },
            {
              name: "호텔 유니버설 포트",
              tag: "가족형 후보",
              location: "유니버설 시티 권역",
              reason: "아이와 함께 테마파크 일정을 중심으로 잡을 때 비교하기 좋은 호텔입니다.",
              meta: ["아이 동반", "USJ", "편한 동선"],
              url: "/post/hotel-universal-port"
            },
            {
              name: "리버 호텔 오사카",
              tag: "여유형 후보",
              location: "유니버설 시티·혼마치",
              reason: "USJ 접근성과 조금 더 여유로운 숙소 주변 분위기를 같이 중요하게 볼 때 후보에 넣어볼 만합니다.",
              meta: ["USJ", "여유", "가족여행"],
              url: "/post/liber-hotel-osaka"
            }
          ,
            {
              name: "오리엔탈 호텔 유니버설 시티",
              tag: "USJ 역세권",
              location: "유니버설 시티 권역",
              reason: "USJ 접근성과 유니버설 시티역 동선을 함께 보는 가족 여행에 적합한 후보입니다.",
              meta: ["USJ", "역세권", "가족"],
              url: "/post/oriental-hotel-universal-city"
            },
            {
              name: "더 싱귤라리 호텔 & 스카이스파 앳 유니버설 스튜디오 재팬",
              tag: "스파형 후보",
              location: "유니버설 시티 권역",
              reason: "테마파크 일정 후 휴식 요소까지 고려하는 여행자에게 비교해볼 만한 점이 있습니다.",
              meta: ["USJ", "스파", "휴식"],
              url: "/post/the-singulari-hotel-usj"
            }]
        },
        hommachi: {
          name: "혼마치",
          regionSlug: "hommachi",
          regionSlugAliases: ["혼마치"],
          label: "난바와 우메다 사이에서 이동 균형을 잡기 좋은 위치",
          summary: "난바와 우메다 사이에서 어느 한쪽에 치우치지 않고, 번화가의 소란은 덜어내면서도 도심 접근성을 지키고 싶은 당신에게 잘 맞는 조용한 위치입니다.",
          leadTitle: "오사카 남쪽과 북쪽을 함께 다니는 일정에 잘 맞습니다.",
          leadText: "혼마치는 미도스지선 중심 동선에 있어 난바, 신사이바시, 우메다로 이동하기 쉽습니다. 쇼핑과 맛집은 챙기되 숙소 주변은 조금 더 차분했으면 하는 여행자에게 특히 잘 맞습니다.",
          stayRange: [
            "혼마치역 또는 사카이스지혼마치역 도보 10분 이내",
            "난바와 우메다를 모두 오간다면 미도스지선 접근성 확인",
            "조용한 숙박을 원하면 대로변 소음과 객실 방음 후기 확인"
          ],
          avoidRange: [
            "도톤보리 저녁 거리를 매일 늦게까지 즐기려는 일정",
            "USJ가 여행의 핵심인데 환승 동선을 확인하지 않는 선택",
            "첫 오사카 여행에서 대표 명소를 모두 도보로만 해결하려는 선택"
          ],
          bestFor: ["이동 균형", "가성비", "차분한 도심", "커플 여행", "재방문 여행"],
          notFor: ["도톤보리 저녁 거리 중심 여행", "USJ 집중 일정", "아이와 리조트형 휴식을 원하는 여행"],
          bookingTips: [
            "혼마치는 역 출구와 호텔 위치에 따라 체감 동선이 달라지므로 실제 이용할 지하철 출구를 확인하세요.",
            "난바와 우메다를 모두 다닐 계획이라면 미도스지선 접근성을 가장 먼저 보세요.",
            "가격이 저렴해도 역에서 12분 이상 멀어지면 캐리어 이동이 불편할 수 있습니다."
          ],
          chips: ["이동 균형", "가성비", "차분함", "미도스지선"],
          compareGood: "난바와 우메다 사이에서 이동 균형을 잡기 좋아 일정이 한쪽으로 치우치지 않습니다.",
          compareCaution: "도톤보리 바로 앞의 활기찬 분위기를 기대하면 다소 차분하게 느껴질 수 있습니다.",
          mismatchNote: "이번 답변에서 저녁 거리, 공항 이동, USJ 접근성을 강하게 골랐다면 혼마치는 보조 후보에 가깝습니다.",
          links: [
            { title: "혼마치 근처 호텔 추천 TOP5", url: "/post/osaka-hommachi-hotels" },
            { title: "오사카 가성비 호텔 추천 TOP5", url: "/post/osaka-value-hotels" }
          ],
          hotels: [
            { name: "오사카 엑셀 호텔 도큐", tag: "혼마치 중심", location: "혼마치 권역", reason: "난바와 우메다 사이에서 이동 균형을 잡고 싶은 일정에 어울리는 후보입니다.", meta: ["혼마치", "이동 균형", "깔끔한 도심"], url: "/post/osaka-excel-hotel-tokyu" },
            { name: "더 로열 파크 호텔 아이코닉 오사카 미도스지", tag: "미도스지선 후보", location: "혼마치·요도야바시 권역", reason: "차분한 도심 분위기와 남북 이동 편의성을 함께 보고 싶은 여행자에게 적합합니다.", meta: ["미도스지", "도심", "커플"], url: "/post/the-royal-park-hotel-iconic-osaka-midosuji" },
            { name: "코트야드 바이 메리어트 오사카 혼마치", tag: "역세권 안정형", location: "혼마치·사카이스지혼마치 주변", reason: "혼마치 권역에서 교통과 숙박 안정성을 함께 비교하기 좋은 후보입니다.", meta: ["혼마치", "역세권", "안정형"], url: "/post/courtyard-by-marriott-osaka-honmachi" },
            { name: "다이와 로이넷 호텔 오사카 기타하마", tag: "차분한 실속형", location: "기타하마·혼마치 북쪽", reason: "우메다 접근성과 차분한 숙소 주변 분위기를 함께 원하는 경우 비교할 만합니다.", meta: ["차분함", "실속", "도심"], url: "/post/daiwa-roynet-hotel-osaka-kitahama" },
            { name: "베스트 웨스턴 플러스 호텔 피노 오사카 기타하마", tag: "가성비 후보", location: "기타하마·혼마치 생활권", reason: "중심부 가격 부담을 줄이면서 도심 이동을 유지하고 싶은 여행자에게 어울립니다.", meta: ["가성비", "도심 이동", "실속"], url: "/post/best-western-plus-hotel-fino-osaka-kitahama" }
          ]
        }
      },
      questions: [
        {
                  title: "이번 오사카 여행은 몇 번째인가요?",
                  help: "첫 여행일수록 이동이 단순하고 대표 명소 접근성이 좋은 위치가 유리합니다.",
                  options: [
                    { title: "첫 여행", desc: "대표 명소와 맛집 동선을 쉽게 잡고 싶어요.", scores: { namba: 5, umeda: 2, shinsaibashi: 2 } },
                    { title: "재방문", desc: "너무 뻔한 중심지만 고집하지 않아도 괜찮아요.", scores: { shinsaibashi: 4, tennoji: 3, umeda: 2 } },
                    { title: "익숙한 여행", desc: "조금 더 실속 있거나 여유로운 지역도 좋아요.", scores: { tennoji: 4, hommachi: 3, shinsaibashi: 3 } }
                  ]
                },
        {
                  title: "이번 여행 동행자는 누구인가요?",
                  help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
                  options: [
                    { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { namba: 3, umeda: 3, shinsaibashi: 2 } },
                    { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 같이 중요하게 보어요.", scores: { namba: 3, shinsaibashi: 3, umeda: 2 } },
                    { title: "친구 여행", desc: "저녁에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { namba: 5, shinsaibashi: 3 } },
                    { title: "가족·아이", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { universal: 4, hommachi: 4, umeda: 3 } },
                    { title: "부모님 동반", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { umeda: 4, tennoji: 3, namba: 2 } }
                  ]
                },
        {
                  title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
                  help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
                  options: [
                    { title: "맛집·저녁 거리", desc: "저녁에도 걸어서 다닐 수 있는 곳이 좋아요.", scores: { namba: 6, shinsaibashi: 2 } },
                    { title: "쇼핑", desc: "쇼핑몰, 상점가, 백화점 접근성이 중요해요.", scores: { shinsaibashi: 4, namba: 3, umeda: 3 } },
                    { title: "교통 편의", desc: "시내 이동과 근교 이동을 편하게 하고 싶어요.", scores: { umeda: 6, namba: 3, shinsaibashi: 1 } },
                    { title: "아이 동반", desc: "이동 피로가 적고 동선이 단순했으면 좋겠어요.", scores: { universal: 5, umeda: 3, tennoji: 2, hommachi: 1 } }
                  ]
                },
        {
                  title: "공항 이동은 얼마나 중요한가요?",
                  help: "간사이공항 이동을 중요하게 보면 난바 쪽이 강한 후보가 됩니다.",
                  options: [
                    { title: "매우 중요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { namba: 6, tennoji: 2, umeda: 1 } },
                    { title: "보통", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { namba: 3, umeda: 3, tennoji: 2 } },
                    { title: "중요 낮음", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { shinsaibashi: 2, universal: 2, hommachi: 2 } }
                  ]
                },
        {
                  title: "유니버설 스튜디오 재팬 일정이 있나요?",
                  help: "USJ가 여행의 핵심이면 숙소 위치 선택이 크게 달라집니다.",
                  options: [
                    { title: "USJ 핵심", desc: "입장과 퇴장 동선을 최대한 줄이고 싶어요.", scores: { universal: 9, hommachi: 2 } },
                    { title: "하루 방문", desc: "USJ도 가지만 시내 관광도 중요해요.", scores: { universal: 3, umeda: 3, namba: 3 } },
                    { title: "방문 없음", desc: "시내 관광, 맛집, 쇼핑 중심으로 움직일 예정이에요.", scores: { namba: 3, shinsaibashi: 3, umeda: 2, tennoji: 1 } }
                  ]
                },
        {
                  title: "오사카 근교 여행 계획이 있나요?",
                  help: "교토, 고베, 나라처럼 다른 도시를 함께 다녀올 예정이라면 숙소 위치 선택 기준이 달라집니다.",
                  options: [
                    { title: "근교 2일 이상", desc: "교토, 고베, 나라 등을 오사카와 함께 다녀오고 싶어요.", scores: { umeda: 8, shinsaibashi: 2, namba: 1 } },
                    { title: "근교 하루", desc: "시내 관광도 중요하지만 하루쯤은 다른 도시도 보고 싶어요.", scores: { umeda: 4, namba: 3, shinsaibashi: 2 } },
                    { title: "시내 중심", desc: "도톤보리, 난바, 신사이바시처럼 시내 동선을 더 중요하게 봐요.", scores: { namba: 4, shinsaibashi: 3, tennoji: 2 } },
                    { title: "미정", desc: "일정이 바뀔 수 있어서 이동 선택지가 많은 곳이면 좋아요.", scores: { umeda: 4, shinsaibashi: 2, namba: 2 } }
                  ]
                },
        {
                  title: "숙소 주변 분위기는 어떤 쪽이 좋나요?",
                  help: "같은 오사카여도 지역마다 주변 소음과 분위기와 체감 소음이 다릅니다.",
                  options: [
                    { title: "번화가", desc: "저녁에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { namba: 6, shinsaibashi: 2 } },
                    { title: "깔끔한 도심", desc: "백화점, 쇼핑몰, 역세권 분위기를 선호해요.", scores: { umeda: 6, shinsaibashi: 2 } },
                    { title: "차분한 숙소", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { shinsaibashi: 4, tennoji: 3, umeda: 2 } },
                    { title: "가족형 분위기", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { universal: 5, umeda: 3, tennoji: 2, hommachi: 1 } }
                  ]
                },
        {
                  title: "숙소 예산은 어떤 편인가요?",
                  help: "위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
                  options: [
                    { title: "예산 절약", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { tennoji: 5, shinsaibashi: 3, hommachi: 2 } },
                    { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { shinsaibashi: 4, tennoji: 3, namba: 2, umeda: 2 } },
                    { title: "위치 우선", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { namba: 4, umeda: 4, universal: 3 } }
                  ]
                }
      ]
    };

const areaResultBadges = {
  "namba": "도톤보리와 미식 사이, 가장 쉬운 시작",
  "shinsaibashi": "쇼핑 거리와 차분한 도심의 균형",
  "umeda": "근교로 이어지는 편안한 교통 중심",
  "tennoji": "합리적인 숙박비로 남쪽 동선을 잡기 좋은 곳",
  "universal": "USJ 하루를 가볍게 시작하는 위치",
  "hommachi": "난바와 우메다를 오가기 편한 조용한 위치"
};
const hotelAccessPresets = {
  "namba": {
    "station": "난바역 도보권",
    "airport": "간사이공항 난카이 약 40~45분"
  },
  "shinsaibashi": {
    "station": "신사이바시·혼마치역 도보권",
    "airport": "간사이공항 환승 약 50분"
  },
  "umeda": {
    "station": "오사카·우메다역 도보권",
    "airport": "간사이공항 JR·버스 약 50~60분"
  },
  "tennoji": {
    "station": "덴노지역 도보권",
    "airport": "간사이공항 JR 약 35~45분"
  },
  "universal": {
    "station": "유니버설시티역 도보권",
    "airport": "간사이공항 환승 약 70분"
  },
  "hommachi": {
    "station": "혼마치역 도보권",
    "airport": "간사이공항 환승 약 55분"
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
resultCloseBtn?.addEventListener("click", closeResultView);
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
