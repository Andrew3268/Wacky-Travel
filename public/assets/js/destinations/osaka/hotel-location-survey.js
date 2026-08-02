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
            { title: "난바 근처 호텔 추천 TOP5", url: "/post/osaka-namba-hotels/" },
            { title: "도톤보리 근처 호텔 추천 TOP5", url: "/post/dotonbori-hotels/" }
          ,
            { title: "오사카 난바 가성비 호텔 추천 TOP5", url: "/post/osaka-namba-value-hotels/" },
            { title: "오사카 첫 여행 호텔 추천 TOP5", url: "/post/osaka-first-trip-hotels/" },
            { title: "오사카 도톤보리 도보권 호텔 추천 TOP5", url: "/post/osaka-dotonbori-walk-hotels/" }],
          hotels: [
            {
              name: "호텔 몬토레 그라스미아 오사카",
              tag: "난바역 접근",
              location: "난바 권역",
              reason: "난바 중심 동선과 공항 이동을 함께 고려할 때 비교 후보로 넣기 좋은 숙소입니다.",
              meta: ["첫 여행", "공항 이동", "쇼핑 동선"],
              url: "/post/hotel-monterey-grasmere-osaka/"
            },
            {
              name: "크로스 호텔 오사카",
              tag: "도톤보리 중심",
              location: "도톤보리·신사이바시 사이",
              reason: "맛집, 쇼핑, 저녁 거리 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.",
              meta: ["맛집", "저녁 거리", "커플·친구"],
              url: "/post/cross-hotel-osaka/"
            },
            {
              name: "소테츠 그랜드 프레사 오사카 난바",
              tag: "실속형 후보",
              location: "닛폰바시·난바 권역",
              reason: "난바 접근성과 가격 균형을 같이 중요하게 보는 여행자에게 비교하기 좋은 후보입니다.",
              meta: ["가성비", "역세권", "대표 동선"],
              url: "/post/sotetsu-grand-fresa-osaka-namba/"
            }
          ,
            {
              name: "온야도 노노 난바 내추럴 핫 스프링",
              tag: "온천형 후보",
              location: "닛폰바시·난바 권역",
              reason: "난바 접근성과 휴식 요소를 같이 중요하게 보는 여행자에게 비교해볼 만한 점이 있는 후보입니다.",
              meta: ["온천", "난바 접근", "휴식"],
              url: "/post/onyado-nono-namba/"
            },
            {
              name: "호텔 그레이스리 오사카 난바",
              tag: "깔끔한 도심형",
              location: "JR 난바·난바 권역",
              reason: "난바 생활권 안에서 깔끔한 객실과 이동 편의성을 함께 고려할 때 보기 좋습니다.",
              meta: ["깔끔한 숙소", "역세권", "짧은 일정"],
              url: "/post/hotel-gracery-osaka-namba/"
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
            { title: "신사이바시 근처 호텔 추천 TOP5", url: "/post/osaka-shinsaibashi-hotels/" },
            { title: "혼마치 근처 호텔 추천 TOP5", url: "/post/osaka-honmachi-hotels/" }
          ,
            { title: "오사카 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/osaka-shopping-hotels/" },
            { title: "오사카 혼마치 가성비 호텔 추천 TOP5", url: "/post/osaka-honmachi-value-hotels/" },
            { title: "오사카 커플 여행 호텔 추천 TOP5", url: "/post/osaka-couple-hotels/" }],
          hotels: [
            {
              name: "호텔 더 플래그 신사이바시",
              tag: "쇼핑 중심",
              location: "신사이바시 권역",
              reason: "신사이바시 쇼핑 동선과 난바 접근성을 둘 다 챙기고 싶은 여행자에게 잘 맞는 후보입니다.",
              meta: ["쇼핑", "커플", "도보 동선"],
              url: "/post/hotel-the-flag-shinsaibashi/"
            },
            {
              name: "베셀 인 신사이바시",
              tag: "균형형",
              location: "신사이바시·나가호리바시 권역",
              reason: "번화가 접근성은 유지하면서 비교적 차분한 숙박을 원하는 경우 함께 볼 만합니다.",
              meta: ["차분한 도심", "실속", "쇼핑"],
              url: "/post/vessel-inn-shinsaibashi/"
            },
            {
              name: "오사카 엑셀 호텔 도큐",
              tag: "혼마치 후보",
              location: "혼마치 권역",
              reason: "난바와 우메다 사이에서 이동 균형을 잡고 싶은 일정에 어울리는 후보입니다.",
              meta: ["이동 균형", "깔끔한 도심", "비즈니스형"],
              url: "/post/osaka-excel-hotel-tokyu/"
            }
          ,
            {
              name: "카락사 호텔 오사카 난바",
              tag: "난바 접근형",
              location: "신사이바시·난바 사이",
              reason: "쇼핑과 도톤보리 접근을 같이 중요하게 보은 일정에서 비교하기 좋은 후보입니다.",
              meta: ["쇼핑", "도보 동선", "친구·커플"],
              url: "/post/karaksa-hotel-osaka-namba/"
            },
            {
              name: "호텔 닛코 오사카",
              tag: "역세권 안정형",
              location: "신사이바시 중심",
              reason: "신사이바시역 접근성을 중요하게 보는 여행자에게 안정적인 비교 후보가 됩니다.",
              meta: ["신사이바시역", "쇼핑", "안정형"],
              url: "/post/hotel-nikko-osaka/"
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
            { title: "우메다 근처 호텔 추천 TOP5", url: "/post/osaka-umeda-hotels/" },
            { title: "오사카역 근처 호텔 추천 TOP5", url: "/post/osaka-station-hotels/" }
          ,
            { title: "오사카 교통 편한 호텔 추천 TOP5", url: "/post/osaka-transport-hotels/" },
            { title: "오사카 근교 여행하기 좋은 호텔 추천 TOP5", url: "/post/osaka-day-trip-hotels/" },
            { title: "오사카 부모님과 가기 좋은 호텔 추천 TOP5", url: "/post/osaka-parents-hotels/" }],
          hotels: [
            {
              name: "호텔 한큐 레스파이어 오사카",
              tag: "오사카역 접근",
              location: "우메다 권역",
              reason: "근교 이동과 쇼핑몰 접근성을 함께 보는 여행자에게 비교해볼 만한 점이 높은 위치입니다.",
              meta: ["근교 이동", "쇼핑몰", "부모님 동반"],
              url: "/post/hotel-hankyu-respire-osaka/"
            },
            {
              name: "호텔 그란비아 오사카",
              tag: "JR 중심",
              location: "오사카역 권역",
              reason: "JR 이동을 자주 이용하거나 교토·고베 등 근교 일정을 넣을 때 보기 좋은 후보입니다.",
              meta: ["JR 이동", "근교 여행", "역세권"],
              url: "/post/hotel-granvia-osaka/"
            },
            {
              name: "호텔 인터게이트 오사카 우메다",
              tag: "도심형 숙소",
              location: "우메다 권역",
              reason: "깔끔한 도심 분위기와 우메다 생활권을 선호하는 여행자에게 어울립니다.",
              meta: ["깔끔한 도심", "쇼핑", "교통"],
              url: "/post/hotel-intergate-osaka-umeda/"
            }
          ,
            {
              name: "호텔 비스키오 오사카 바이 그란비아",
              tag: "우메다 실속형",
              location: "우메다 권역",
              reason: "오사카역 생활권과 깔끔한 도심 숙박을 같이 중요하게 볼 때 비교하기 좋습니다.",
              meta: ["오사카역", "깔끔한 도심", "실속"],
              url: "/post/hotel-vischio-osaka/"
            },
            {
              name: "호텔 뉴 한큐 오사카",
              tag: "교통 중심",
              location: "우메다역 권역",
              reason: "공항버스와 우메다 교통 동선을 함께 고려하는 여행자에게 후보에 넣어볼 만합니다.",
              meta: ["교통", "우메다역", "공항 이동"],
              url: "/post/hotel-new-hankyu-osaka/"
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
            { title: "덴노지 근처 호텔 추천 TOP5", url: "/post/osaka-tennoji-hotels/" },
            { title: "아베노 근처 호텔 추천 TOP5", url: "/post/osaka-abeno-hotels/" }
          ,
            { title: "오사카 가성비 호텔 추천 TOP5", url: "/post/osaka-value-hotels/" },
            { title: "오사카 덴노지 가성비 호텔 추천 TOP5", url: "/post/osaka-tennoji-value-hotels/" },
            { title: "오사카 아베노 호텔 추천 TOP5", url: "/post/osaka-abeno-hotels-top5/" }],
          hotels: [
            {
              name: "미야코 시티 오사카 덴노지",
              tag: "덴노지역 중심",
              location: "덴노지 권역",
              reason: "남쪽 관광지와 덴노지역 교통을 함께 보는 일정에 비교하기 좋은 숙소입니다.",
              meta: ["덴노지역", "남쪽 동선", "실속"],
              url: "/post/miyako-city-osaka-tennoji/"
            },
            {
              name: "비아 인 아베노 덴노지",
              tag: "가성비 후보",
              location: "아베노·덴노지 권역",
              reason: "숙소비 부담을 줄이면서 역세권과 주변 편의성을 같이 중요하게 볼 때 적합합니다.",
              meta: ["가성비", "아베노하루카스", "역세권"],
              url: "/post/via-inn-abeno-tennoji/"
            },
            {
              name: "호텔 트러스티 오사카 아베노",
              tag: "아베노 후보",
              location: "아베노 권역",
              reason: "아베노·덴노지 생활권에서 조용함과 접근성의 균형을 보고 싶은 여행자에게 어울립니다.",
              meta: ["아베노", "가격 균형", "차분함"],
              url: "/post/hotel-trusty-osaka-abeno/"
            }
          ,
            {
              name: "호텔 발리 타워 오사카 덴노지",
              tag: "개성형 후보",
              location: "덴노지 권역",
              reason: "덴노지 중심에서 편의성과 독특한 숙소 주변 분위기를 같이 중요하게 보은 경우 비교할 만합니다.",
              meta: ["덴노지", "가성비", "개성형"],
              url: "/post/hotel-bali-tower-osaka-tennoji/"
            },
            {
              name: "덴노지 라군 호텔",
              tag: "저예산 후보",
              location: "덴노지 권역",
              reason: "숙소비를 낮추면서 남쪽 동선 접근성을 우선 확인하고 싶을 때 보조 후보가 됩니다.",
              meta: ["저예산", "남쪽 동선", "실속"],
              url: "/post/tennoji-lagoon-hotel/"
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
            { title: "유니버설 시티 호텔 추천 TOP5", url: "/post/osaka-universal-city-hotels/" },
            { title: "USJ 근처 호텔 추천", url: "/post/usj-nearby-hotels/" }
          ,
            { title: "USJ 가족 호텔 추천 TOP5", url: "/post/usj-family-hotels/" },
            { title: "유니버설 시티 가성비 호텔 추천 TOP5", url: "/post/universal-city-value-hotels/" },
            { title: "오사카 아이와 가기 좋은 호텔 추천 TOP5", url: "/post/osaka-kids-hotels/" }],
          hotels: [
            {
              name: "더 파크 프론트 호텔 앳 유니버설 스튜디오 재팬",
              tag: "USJ 최단 동선",
              location: "유니버설 시티 권역",
              reason: "USJ 입장과 퇴장 동선을 최대한 줄이고 싶은 가족 여행자에게 강한 후보입니다.",
              meta: ["USJ", "가족", "테마파크"],
              url: "/post/the-park-front-hotel-usj/"
            },
            {
              name: "호텔 유니버설 포트",
              tag: "가족형 후보",
              location: "유니버설 시티 권역",
              reason: "아이와 함께 테마파크 일정을 중심으로 잡을 때 비교하기 좋은 호텔입니다.",
              meta: ["아이 동반", "USJ", "편한 동선"],
              url: "/post/hotel-universal-port/"
            },
            {
              name: "리버 호텔 오사카",
              tag: "여유형 후보",
              location: "유니버설 시티·혼마치",
              reason: "USJ 접근성과 조금 더 여유로운 숙소 주변 분위기를 같이 중요하게 볼 때 후보에 넣어볼 만합니다.",
              meta: ["USJ", "여유", "가족여행"],
              url: "/post/liber-hotel-osaka/"
            }
          ,
            {
              name: "오리엔탈 호텔 유니버설 시티",
              tag: "USJ 역세권",
              location: "유니버설 시티 권역",
              reason: "USJ 접근성과 유니버설 시티역 동선을 함께 보는 가족 여행에 적합한 후보입니다.",
              meta: ["USJ", "역세권", "가족"],
              url: "/post/oriental-hotel-universal-city/"
            },
            {
              name: "더 싱귤라리 호텔 & 스카이스파 앳 유니버설 스튜디오 재팬",
              tag: "스파형 후보",
              location: "유니버설 시티 권역",
              reason: "테마파크 일정 후 휴식 요소까지 고려하는 여행자에게 비교해볼 만한 점이 있습니다.",
              meta: ["USJ", "스파", "휴식"],
              url: "/post/the-singulari-hotel-usj/"
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
            { title: "혼마치 근처 호텔 추천 TOP5", url: "/post/osaka-hommachi-hotels/" },
            { title: "오사카 가성비 호텔 추천 TOP5", url: "/post/osaka-value-hotels/" }
          ],
          hotels: [
            { name: "오사카 엑셀 호텔 도큐", tag: "혼마치 중심", location: "혼마치 권역", reason: "난바와 우메다 사이에서 이동 균형을 잡고 싶은 일정에 어울리는 후보입니다.", meta: ["혼마치", "이동 균형", "깔끔한 도심"], url: "/post/osaka-excel-hotel-tokyu/" },
            { name: "더 로열 파크 호텔 아이코닉 오사카 미도스지", tag: "미도스지선 후보", location: "혼마치·요도야바시 권역", reason: "차분한 도심 분위기와 남북 이동 편의성을 함께 보고 싶은 여행자에게 적합합니다.", meta: ["미도스지", "도심", "커플"], url: "/post/the-royal-park-hotel-iconic-osaka-midosuji/" },
            { name: "코트야드 바이 메리어트 오사카 혼마치", tag: "역세권 안정형", location: "혼마치·사카이스지혼마치 주변", reason: "혼마치 권역에서 교통과 숙박 안정성을 함께 비교하기 좋은 후보입니다.", meta: ["혼마치", "역세권", "안정형"], url: "/post/courtyard-by-marriott-osaka-honmachi/" },
            { name: "다이와 로이넷 호텔 오사카 기타하마", tag: "차분한 실속형", location: "기타하마·혼마치 북쪽", reason: "우메다 접근성과 차분한 숙소 주변 분위기를 함께 원하는 경우 비교할 만합니다.", meta: ["차분함", "실속", "도심"], url: "/post/daiwa-roynet-hotel-osaka-kitahama/" },
            { name: "베스트 웨스턴 플러스 호텔 피노 오사카 기타하마", tag: "가성비 후보", location: "기타하마·혼마치 생활권", reason: "중심부 가격 부담을 줄이면서 도심 이동을 유지하고 싶은 여행자에게 어울립니다.", meta: ["가성비", "도심 이동", "실속"], url: "/post/best-western-plus-hotel-fino-osaka-kitahama/" }
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
                    { title: "교통 편의", desc: "시내 이동과 근교 이동을 편하게 하고 싶어요.", scores: { umeda: 6, hommachi: 3, namba: 3, shinsaibashi: 1 } },
                    { title: "신세카이·덴노지", desc: "츠텐카쿠와 남쪽 명소를 보고 숙박비도 합리적으로 맞추고 싶어요.", scores: { tennoji: 8, namba: 3, hommachi: 2 } },
                    { title: "아이 동반", desc: "이동 피로가 적고 동선이 단순했으면 좋겠어요.", scores: { universal: 5, umeda: 3, tennoji: 2, hommachi: 1 } }
                  ]
                },
        {
                  title: "공항 이동은 얼마나 중요한가요?",
                  help: "간사이공항 이동을 중요하게 보면 난바 쪽이 강한 후보가 됩니다.",
                  options: [
                    { title: "매우 중요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { namba: 6, tennoji: 2, umeda: 1 } },
                    { title: "보통", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { namba: 3, umeda: 3, tennoji: 2 } },
                    { title: "크게 중요하지 않음", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { shinsaibashi: 2, universal: 2, hommachi: 2 } }
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
                  help: "같은 오사카여도 지역마다 저녁 이후 분위기와 체감 소음이 다릅니다.",
                  options: [
                    { title: "번화가", desc: "저녁에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { namba: 6, shinsaibashi: 2 } },
                    { title: "깔끔한 도심", desc: "백화점, 쇼핑몰, 역세권 분위기를 선호해요.", scores: { umeda: 6, shinsaibashi: 2 } },
                    { title: "차분한 숙소", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { hommachi: 7, shinsaibashi: 3, tennoji: 2, umeda: 1 } },
                    { title: "가족형 분위기", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { universal: 5, umeda: 3, tennoji: 2, hommachi: 1 } }
                  ]
                },
        {
                  title: "숙소 예산은 어떤 편인가요?",
                  help: "위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
                  options: [
                    { title: "예산 절약", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { tennoji: 5, shinsaibashi: 3, hommachi: 2 } },
                    { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { hommachi: 6, shinsaibashi: 4, tennoji: 3, namba: 2, umeda: 2 } },
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

cityConfig.questionSignalLabels = [
  "여행 경험",
  "동행",
  "핵심 목적",
  "공항 이동",
  "USJ 일정",
  "근교 일정",
  "숙소 분위기",
  "예산 기준"
];
