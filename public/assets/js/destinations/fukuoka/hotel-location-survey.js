/*
 * Fukuoka hotel location survey logic.
 * This file is intentionally city-specific.
 * Future cities should use their own file, for example:
 * /assets/js/destinations/fukuoka/hotel-location-survey.js
 */
const cityConfig = {
      cityName: "후쿠오카",
      areas: {
        namba: {
          name: "하카타·나카스",
          label: "첫 후쿠오카 여행자에게 가장 무난한 중심 위치",
          summary: "먹거리, 쇼핑, 밤거리, 공항 접근성을 함께 고려하면 하카타·나카스 주변이 가장 무난합니다.",
          leadTitle: "대표 명소 중심으로 짧고 단순한 동선을 만들기 좋습니다.",
          leadText: "나카스, 텐진, 캐널시티, 하카타역 주변을 자주 오갈 계획이라면 이동 피로를 줄이기 좋습니다. 짧은 일정일수록 위치 장점이 크게 느껴집니다.",
          stayRange: [
            "하카타역, 고후쿠마치역, 텐진역 도보 10분 이내",
            "나카스 접근성을 원한다면 번화가와 너무 붙지 않은 골목",
            "공항 이동을 중시한다면 하카타역 접근성이 좋은 위치"
          ],
          avoidRange: [
            "늦은 밤 소음이 걱정된다면 나카스 바로 앞 저층 객실",
            "객실 크기를 중요하게 본다면 극중심가의 초소형 비즈니스 호텔",
            "부모님 동반이라면 계단 이동이 많은 역 출구 주변"
          ],
          bestFor: ["첫 후쿠오카 여행", "친구 여행", "맛집·쇼핑 중심 일정", "짧은 2박 3일 일정"],
          notFor: ["조용한 숙소가 최우선인 여행", "다자이후·이토시마 등 근교 이동이 더 많은 일정", "넓은 객실을 우선하는 가족 여행"],
          bookingTips: [
            "하카타역 도보 시간만 보지 말고 실제 이용할 노선 출구와의 거리를 확인하세요.",
            "나카스 접근성과 소음은 반비례할 수 있으니 후기에서 밤 소음 언급을 확인하세요.",
            "공항 이동이 중요하면 하카타역까지의 이동 동선을 우선 비교하세요."
          ],
          chips: ["첫 여행", "맛집", "쇼핑", "밤거리", "공항 이동"],
          compareGood: "대표 명소와 맛집 동선이 짧고 여행 초보자도 이동 계획을 세우기 쉽습니다.",
          compareCaution: "번화가에 가까울수록 소음, 객실 크기, 가격을 꼼꼼히 봐야 합니다.",
          mismatchNote: "이번 답변에서 조용함, 가족형 여유, 근교 이동을 더 중요하게 봤다면 하카타는 1순위가 아닐 수 있습니다.",
          links: [
            { title: "하카타 근처 호텔 추천 TOP5", url: "/post/fukuoka-namba-hotels" },
            { title: "나카스 근처 호텔 추천 TOP5", url: "/post/dotonbori-hotels" }
          ,
            { title: "후쿠오카 하카타 가성비 호텔 추천 TOP5", url: "/post/fukuoka-namba-value-hotels" },
            { title: "후쿠오카 첫 여행 호텔 추천 TOP5", url: "/post/fukuoka-first-trip-hotels" },
            { title: "후쿠오카 나카스 도보권 호텔 추천 TOP5", url: "/post/fukuoka-dotonbori-walk-hotels" }],
          hotels: [
            {
              name: "호텔 몬토레 그라스미아 후쿠오카",
              tag: "하카타역 접근",
              location: "하카타·나카스 권역",
              reason: "하카타 중심 동선과 공항 이동을 함께 고려할 때 비교 후보로 넣기 좋은 숙소입니다.",
              meta: ["첫 여행", "공항 이동", "쇼핑 동선"],
              url: "/post/hotel-monterey-grasmere-fukuoka"
            },
            {
              name: "크로스 호텔 후쿠오카",
              tag: "나카스 중심",
              location: "나카스·텐진 사이",
              reason: "맛집, 쇼핑, 밤거리 중심으로 짧게 움직이고 싶은 여행자에게 어울리는 위치입니다.",
              meta: ["맛집", "밤거리", "커플·친구"],
              url: "/post/cross-hotel-fukuoka"
            },
            {
              name: "소테츠 그랜드 프레사 후쿠오카 하카타",
              tag: "실속형 후보",
              location: "고후쿠마치·하카타 권역",
              reason: "하카타 접근성과 가격 균형을 함께 보고 싶은 여행자에게 비교하기 좋은 후보입니다.",
              meta: ["가성비", "역세권", "대표 동선"],
              url: "/post/sotetsu-grand-fresa-fukuoka-namba"
            }
          ,
            {
              name: "온야도 노노 하카타 내추럴 핫 스프링",
              tag: "온천형 후보",
              location: "고후쿠마치·하카타 권역",
              reason: "하카타 접근성과 휴식 요소를 함께 보고 싶은 여행자에게 비교 가치가 있는 후보입니다.",
              meta: ["온천", "하카타 접근", "휴식"],
              url: "/post/onyado-nono-namba"
            },
            {
              name: "호텔 그레이스리 후쿠오카 하카타",
              tag: "깔끔한 도심형",
              location: "JR 하카타·하카타 권역",
              reason: "하카타 생활권 안에서 깔끔한 객실과 이동 편의성을 함께 고려할 때 보기 좋습니다.",
              meta: ["깔끔한 숙소", "역세권", "짧은 일정"],
              url: "/post/hotel-gracery-fukuoka-namba"
            }]
        },
        shinsaibashi: {
          name: "텐진·기온",
          label: "쇼핑과 위치 균형을 잡기 좋은 실속형 위치",
          summary: "하카타 접근성은 유지하면서 조금 더 차분한 분위기와 가격 균형을 원한다면 텐진·기온가 잘 맞습니다.",
          leadTitle: "번화가 접근성과 차분한 숙박 분위기 사이의 균형이 좋습니다.",
          leadText: "텐진는 쇼핑 동선에 강하고, 기온는 하카타와 하카타 사이에서 이동 균형을 잡기 좋습니다. 너무 번잡한 숙소가 부담스러운 여행자에게 특히 잘 맞습니다.",
          stayRange: [
            "텐진역, 와타나베도리역, 기온역 도보 10분 이내",
            "쇼핑 중심이면 텐진스지 접근성이 좋은 위치",
            "이동 균형을 원하면 기온역 주변"
          ],
          avoidRange: [
            "나카스 야간 동선이 핵심인데 너무 북쪽으로 올라간 위치",
            "역 도보 12분 이상인데 주변 편의시설이 적은 위치",
            "쇼핑보다 근교 이동이 많은데 텐진에만 고정하는 선택"
          ],
          bestFor: ["쇼핑 중심 여행", "커플 여행", "깔끔한 도심 선호", "하카타와 하카타를 모두 오가는 일정"],
          notFor: ["밤마다 나카스 중심으로 놀고 싶은 여행", "공항 이동을 가장 단순하게 만들고 싶은 여행", "오호리·모모치가 여행의 핵심인 일정"],
          bookingTips: [
            "텐진와 기온는 체감 분위기가 다르므로 목적에 맞춰 고르세요.",
            "나카스까지 걸을 계획이라면 실제 도보 거리와 밤길 분위기를 함께 확인하세요.",
            "가격이 비슷하다면 역 출구와 편의점 접근성이 좋은 호텔을 우선 비교하세요."
          ],
          chips: ["쇼핑", "균형형", "실속", "차분한 도심"],
          compareGood: "하카타 접근성을 유지하면서 번잡함을 조금 줄일 수 있습니다.",
          compareCaution: "나카스 바로 앞 분위기를 기대하면 다소 거리가 느껴질 수 있습니다.",
          mismatchNote: "이번 답변에서 밤거리, 공항 이동, 오호리·모모치 접근성을 강하게 선택했다면 텐진는 보조 후보에 가깝습니다.",
          links: [
            { title: "텐진 근처 호텔 추천 TOP5", url: "/post/fukuoka-shinsaibashi-hotels" },
            { title: "기온 근처 호텔 추천 TOP5", url: "/post/fukuoka-honmachi-hotels" }
          ,
            { title: "후쿠오카 쇼핑하기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-shopping-hotels" },
            { title: "후쿠오카 기온 가성비 호텔 추천 TOP5", url: "/post/fukuoka-honmachi-value-hotels" },
            { title: "후쿠오카 커플 여행 호텔 추천 TOP5", url: "/post/fukuoka-couple-hotels" }],
          hotels: [
            {
              name: "호텔 더 플래그 텐진",
              tag: "쇼핑 중심",
              location: "텐진 권역",
              reason: "텐진 쇼핑 동선과 하카타 접근성을 함께 잡고 싶은 여행자에게 잘 맞는 후보입니다.",
              meta: ["쇼핑", "커플", "도보 동선"],
              url: "/post/hotel-the-flag-shinsaibashi"
            },
            {
              name: "베셀 인 텐진",
              tag: "균형형",
              location: "텐진·와타나베도리 권역",
              reason: "번화가 접근성은 유지하면서 비교적 차분한 숙박을 원하는 경우 함께 볼 만합니다.",
              meta: ["차분한 도심", "실속", "쇼핑"],
              url: "/post/vessel-inn-shinsaibashi"
            },
            {
              name: "후쿠오카 엑셀 호텔 도큐",
              tag: "기온 후보",
              location: "기온 권역",
              reason: "하카타와 하카타 사이에서 이동 균형을 잡고 싶은 일정에 어울리는 후보입니다.",
              meta: ["이동 균형", "깔끔한 도심", "비즈니스형"],
              url: "/post/fukuoka-excel-hotel-tokyu"
            }
          ,
            {
              name: "카락사 호텔 후쿠오카 하카타",
              tag: "하카타 접근형",
              location: "텐진·하카타 사이",
              reason: "쇼핑과 나카스 접근을 함께 보고 싶은 일정에서 비교하기 좋은 후보입니다.",
              meta: ["쇼핑", "도보 동선", "친구·커플"],
              url: "/post/karaksa-hotel-fukuoka-namba"
            },
            {
              name: "호텔 닛코 후쿠오카",
              tag: "역세권 안정형",
              location: "텐진 중심",
              reason: "텐진역 접근성을 중요하게 보는 여행자에게 안정적인 비교 후보가 됩니다.",
              meta: ["텐진역", "쇼핑", "안정형"],
              url: "/post/hotel-nikko-fukuoka"
            }]
        },
        umeda: {
          name: "하카타·하카타역",
          label: "교통과 당일치기 여행에 강한 위치",
          summary: "다자이후, 이토시마, 기타큐슈 등 근교 이동까지 생각한다면 하카타·하카타역 주변이 편합니다.",
          leadTitle: "후쿠오카 시내와 근교를 함께 움직이는 일정에 강합니다.",
          leadText: "JR, 니시테츠, 니시테츠, 지하철 등 선택지가 많아 이동 계획을 짜기 좋습니다. 백화점과 쇼핑몰이 많아 깔끔한 도심 분위기를 선호하는 여행자에게도 잘 맞습니다.",
          stayRange: [
            "하카타역, 하카타역, 히가시하카타역 도보 10분 이내",
            "근교 이동이 많다면 JR 하카타역 접근성이 좋은 위치",
            "쇼핑과 식사를 함께 보려면 JR 하카타시티·니시테츠 주변 접근성 확인"
          ],
          avoidRange: [
            "나카스 중심 밤거리 여행인데 하카타에만 숙소를 고정하는 선택",
            "역 구조가 복잡한 것이 부담스러운데 출구 정보가 부족한 호텔",
            "초행인데 호텔까지 지하상가 이동 동선이 복잡한 위치"
          ],
          bestFor: ["근교 당일치기 여행", "부모님 동반", "쇼핑몰 중심 일정", "깔끔한 도심 선호"],
          notFor: ["나카스·하카타 중심 맛집 여행", "밤 늦게 나카스·텐진 지역에서 오래 머무는 일정", "공항 이동을 가장 단순하게 하고 싶은 여행"],
          bookingTips: [
            "하카타역과 하카타역은 출구가 복잡하므로 호텔까지의 실제 출구 동선을 확인하세요.",
            "근교 여행이 많다면 JR·지하철·니시테츠 중 어떤 노선을 주로 탈지 먼저 정하세요.",
            "부모님 동반이면 지하 이동보다 지상 접근이 쉬운 호텔을 우선 비교하세요."
          ],
          chips: ["교통", "근교 여행", "쇼핑몰", "깔끔한 도심"],
          compareGood: "근교 이동과 쇼핑몰 접근성이 좋아 일정 확장성이 큽니다.",
          compareCaution: "하카타·나카스 중심 일정이면 매번 이동이 필요할 수 있습니다.",
          mismatchNote: "이번 답변에서 맛집, 밤거리, 첫 여행 대표 동선을 더 많이 골랐다면 하카타는 2순위 대안으로 보는 편이 좋습니다.",
          links: [
            { title: "하카타 근처 호텔 추천 TOP5", url: "/post/fukuoka-umeda-hotels" },
            { title: "하카타역 근처 호텔 추천 TOP5", url: "/post/fukuoka-station-hotels" }
          ,
            { title: "후쿠오카 교통 편한 호텔 추천 TOP5", url: "/post/fukuoka-transport-hotels" },
            { title: "후쿠오카 근교 여행하기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-day-trip-hotels" },
            { title: "후쿠오카 부모님과 가기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-parents-hotels" }],
          hotels: [
            {
              name: "호텔 니시테츠 레스파이어 후쿠오카",
              tag: "하카타역 접근",
              location: "하카타·하카타역 권역",
              reason: "근교 이동과 쇼핑몰 접근성을 함께 보는 여행자에게 비교 가치가 높은 위치입니다.",
              meta: ["근교 이동", "쇼핑몰", "부모님 동반"],
              url: "/post/hotel-hankyu-respire-fukuoka"
            },
            {
              name: "호텔 그란비아 후쿠오카",
              tag: "JR 중심",
              location: "하카타역 권역",
              reason: "JR 이동을 자주 이용하거나 다자이후·이토시마 등 근교 일정을 넣을 때 보기 좋은 후보입니다.",
              meta: ["JR 이동", "근교 여행", "역세권"],
              url: "/post/hotel-granvia-fukuoka"
            },
            {
              name: "호텔 인터게이트 후쿠오카 하카타",
              tag: "도심형 숙소",
              location: "하카타 권역",
              reason: "깔끔한 도심 분위기와 하카타 생활권을 선호하는 여행자에게 어울립니다.",
              meta: ["깔끔한 도심", "쇼핑", "교통"],
              url: "/post/hotel-intergate-fukuoka-umeda"
            }
          ,
            {
              name: "호텔 비스키오 후쿠오카 바이 그란비아",
              tag: "하카타 실속형",
              location: "하카타·하카타역 권역",
              reason: "하카타역 생활권과 깔끔한 도심 숙박을 함께 보고 싶을 때 비교하기 좋습니다.",
              meta: ["하카타역", "깔끔한 도심", "실속"],
              url: "/post/hotel-vischio-fukuoka"
            },
            {
              name: "호텔 뉴 니시테츠 후쿠오카",
              tag: "교통 중심",
              location: "하카타역 권역",
              reason: "공항버스와 하카타 교통 동선을 함께 고려하는 여행자에게 후보로 넣기 좋습니다.",
              meta: ["교통", "하카타역", "공항 이동"],
              url: "/post/hotel-new-hankyu-fukuoka"
            }]
        },
        tennoji: {
          name: "야쿠인·캐널",
          label: "가격과 이동 편의성을 함께 보는 가성비 위치",
          summary: "중심가보다 숙소비를 조금 아끼면서도 주요 관광지 접근성을 포기하고 싶지 않다면 야쿠인·캐널가 좋습니다.",
          leadTitle: "숙소비와 이동 편의성을 함께 고려하는 실속형 선택입니다.",
          leadText: "캐널시티, 베이사이드 플레이스, 동물원 등 남쪽 동선과 잘 맞고 하카타 접근도 비교적 편합니다. 중심가 대비 합리적인 가격대의 호텔을 찾을 때 후보로 넣기 좋습니다.",
          stayRange: [
            "야쿠인역, 캐널역, 야쿠인에키마에역 도보 10분 이내",
            "베이사이드 플레이스·캐널시티 일정이 있다면 야쿠인역 중심",
            "공항 이동도 고려한다면 환승 동선이 단순한 역세권"
          ],
          avoidRange: [
            "하카타·나카스를 매일 밤 오갈 계획인데 숙소비만 보고 너무 남쪽으로 내려가는 선택",
            "역과 멀고 주변 편의시설이 약한 저가 호텔",
            "첫 여행인데 대표 명소 동선보다 가격만 우선한 선택"
          ],
          bestFor: ["가성비 중시", "남쪽 관광지 일정", "재방문 여행", "가격과 교통 균형을 보는 여행"],
          notFor: ["첫 후쿠오카에서 하카타·나카스가 핵심인 일정", "오호리·모모치 중심 가족 여행", "숙소 주변 밤 분위기를 중요하게 보는 여행"],
          bookingTips: [
            "저렴한 가격만 보지 말고 역까지의 도보 거리와 주변 분위기를 함께 확인하세요.",
            "하카타를 자주 갈 예정이라면 이동 시간이 부담되지 않는지 먼저 계산하세요.",
            "객실 컨디션과 위생 후기를 함께 보면 가격 대비 만족도를 판단하기 쉽습니다."
          ],
          chips: ["가성비", "남쪽 동선", "캐널시티", "합리적 가격"],
          compareGood: "중심가 대비 숙소비 부담을 낮추면서 남쪽 관광지 접근성을 확보하기 좋습니다.",
          compareCaution: "대표 번화가 중심 일정이면 하카타보다 동선이 길어질 수 있습니다.",
          mismatchNote: "이번 답변에서 짧은 일정, 밤거리, 첫 여행 대표 코스를 많이 골랐다면 야쿠인는 우선순위가 낮을 수 있습니다.",
          links: [
            { title: "야쿠인 근처 호텔 추천 TOP5", url: "/post/fukuoka-tennoji-hotels" },
            { title: "캐널 근처 호텔 추천 TOP5", url: "/post/fukuoka-abeno-hotels" }
          ,
            { title: "후쿠오카 가성비 호텔 추천 TOP5", url: "/post/fukuoka-value-hotels" },
            { title: "후쿠오카 야쿠인 가성비 호텔 추천 TOP5", url: "/post/fukuoka-tennoji-value-hotels" },
            { title: "후쿠오카 캐널 호텔 추천 TOP5", url: "/post/fukuoka-abeno-hotels-top5" }],
          hotels: [
            {
              name: "미야코 시티 후쿠오카 야쿠인",
              tag: "야쿠인역 중심",
              location: "야쿠인 권역",
              reason: "남쪽 관광지와 야쿠인역 교통을 함께 보는 일정에 비교하기 좋은 숙소입니다.",
              meta: ["야쿠인역", "남쪽 동선", "실속"],
              url: "/post/miyako-city-fukuoka-tennoji"
            },
            {
              name: "비아 인 캐널 야쿠인",
              tag: "가성비 후보",
              location: "캐널·야쿠인 권역",
              reason: "숙소비 부담을 줄이면서 역세권과 주변 편의성을 함께 보고 싶을 때 적합합니다.",
              meta: ["가성비", "캐널시티", "역세권"],
              url: "/post/via-inn-abeno-tennoji"
            },
            {
              name: "호텔 트러스티 후쿠오카 캐널",
              tag: "캐널 후보",
              location: "캐널 권역",
              reason: "캐널·야쿠인 생활권에서 조용함과 접근성의 균형을 보고 싶은 여행자에게 어울립니다.",
              meta: ["캐널", "가격 균형", "차분함"],
              url: "/post/hotel-trusty-fukuoka-abeno"
            }
          ,
            {
              name: "호텔 발리 타워 후쿠오카 야쿠인",
              tag: "개성형 후보",
              location: "야쿠인 권역",
              reason: "야쿠인 중심에서 편의성과 독특한 숙박 분위기를 함께 보고 싶은 경우 비교할 만합니다.",
              meta: ["야쿠인", "가성비", "개성형"],
              url: "/post/hotel-bali-tower-fukuoka-tennoji"
            },
            {
              name: "야쿠인 라군 호텔",
              tag: "저예산 후보",
              location: "야쿠인 권역",
              reason: "숙소비를 낮추면서 남쪽 동선 접근성을 우선 확인하고 싶을 때 보조 후보가 됩니다.",
              meta: ["저예산", "남쪽 동선", "실속"],
              url: "/post/tennoji-lagoon-hotel"
            }]
        },
        universal: {
          name: "오호리·모모치",
          label: "오호리·모모치 중심 일정에 가장 편한 위치",
          summary: "오호리공원·모모치 해변을 하루 종일 즐기거나 아이와 함께 이동한다면 오호리·모모치 주변이 가장 편합니다.",
          leadTitle: "오호리·모모치 입장과 퇴장 동선을 줄이는 데 가장 강합니다.",
          leadText: "테마파크에서 오래 머무는 일정이라면 숙소까지 돌아가는 피로가 크게 줄어듭니다. 아이 동반 가족이나 오호리·모모치가 여행의 핵심인 경우 만족도가 높습니다.",
          stayRange: [
            "오호리·모모치역 도보권",
            "오호리·모모치 입장 대기와 퇴장 후 이동을 줄일 수 있는 공식·인근 호텔",
            "아이 동반이면 역과 호텔 사이 이동이 단순한 위치"
          ],
          avoidRange: [
            "오호리·모모치는 하루만 가는데 후쿠오카 시내 관광이 더 많은 일정",
            "매일 나카스·텐진를 오갈 계획인데 오호리·모모치에만 숙박하는 선택",
            "늦은 밤 시내 식사와 쇼핑을 자주 넣는 일정"
          ],
          bestFor: ["오호리·모모치 중심 여행", "아이 동반 가족", "테마파크 집중 일정", "체력 부담을 줄이고 싶은 여행"],
          notFor: ["후쿠오카 시내 관광 중심 일정", "맛집·쇼핑 위주 여행", "근교 당일치기가 많은 여행"],
          bookingTips: [
            "오호리·모모치 방문일 전날 또는 당일만 1박하는 분할 숙박도 고려해보세요.",
            "시내 관광이 많다면 하카타·하카타와 비교해 전체 이동 시간을 계산하세요.",
            "아이와 함께라면 객실 크기, 조식, 편의점 접근성도 함께 확인하세요."
          ],
          chips: ["오호리·모모치", "가족여행", "아이 동반", "테마파크"],
          compareGood: "오호리·모모치 동선이 짧아 체력 부담을 줄이기 좋습니다.",
          compareCaution: "시내 관광과 쇼핑 일정이 많으면 매번 이동해야 합니다.",
          mismatchNote: "이번 답변에서 오호리·모모치 비중이 낮고 시내 관광을 더 많이 선택했다면 오호리·모모치는 특수 목적형 후보입니다.",
          links: [
            { title: "오호리·모모치 호텔 추천 TOP5", url: "/post/fukuoka-universal-city-hotels" },
            { title: "오호리·모모치 근처 호텔 추천", url: "/post/usj-nearby-hotels" }
          ,
            { title: "오호리·모모치 가족 호텔 추천 TOP5", url: "/post/usj-family-hotels" },
            { title: "오호리·모모치 가성비 호텔 추천 TOP5", url: "/post/universal-city-value-hotels" },
            { title: "후쿠오카 아이와 가기 좋은 호텔 추천 TOP5", url: "/post/fukuoka-kids-hotels" }],
          hotels: [
            {
              name: "더 파크 프론트 호텔 앳 오호리공원·모모치 해변",
              tag: "오호리·모모치 최단 동선",
              location: "오호리·모모치 권역",
              reason: "오호리·모모치 입장과 퇴장 동선을 최대한 줄이고 싶은 가족 여행자에게 강한 후보입니다.",
              meta: ["오호리·모모치", "가족", "테마파크"],
              url: "/post/the-park-front-hotel-usj"
            },
            {
              name: "호텔 유니버설 포트",
              tag: "가족형 후보",
              location: "오호리·모모치 권역",
              reason: "아이와 함께 테마파크 일정을 중심으로 잡을 때 비교하기 좋은 호텔입니다.",
              meta: ["아이 동반", "오호리·모모치", "편한 동선"],
              url: "/post/hotel-universal-port"
            },
            {
              name: "리버 호텔 후쿠오카",
              tag: "여유형 후보",
              location: "오호리·모모치·모모치·오호리",
              reason: "오호리·모모치 접근성과 조금 더 여유로운 숙박 분위기를 함께 보고 싶을 때 후보로 넣기 좋습니다.",
              meta: ["오호리·모모치", "여유", "가족여행"],
              url: "/post/liber-hotel-fukuoka"
            }
          ,
            {
              name: "오리엔탈 호텔 유니버설 시티",
              tag: "오호리·모모치 역세권",
              location: "오호리·모모치 권역",
              reason: "오호리·모모치 접근성과 오호리·모모치역 동선을 함께 보는 가족 여행에 적합한 후보입니다.",
              meta: ["오호리·모모치", "역세권", "가족"],
              url: "/post/oriental-hotel-universal-city"
            },
            {
              name: "더 싱귤라리 호텔 & 스카이스파 앳 오호리공원·모모치 해변",
              tag: "스파형 후보",
              location: "오호리·모모치 권역",
              reason: "테마파크 일정 후 휴식 요소까지 고려하는 여행자에게 비교 가치가 있습니다.",
              meta: ["오호리·모모치", "스파", "휴식"],
              url: "/post/the-singulari-hotel-usj"
            }]
        },
        bay: {
          name: "모모치·오호리",
          label: "가족과 여유로운 일정을 보내기 좋은 위치",
          summary: "후쿠오카타워, 항만 풍경, 여유로운 가족 일정을 원한다면 모모치·오호리도 좋은 선택입니다.",
          leadTitle: "도심보다 여유로운 가족형 일정을 만들기 좋습니다.",
          leadText: "아이와 함께 무리 없는 하루를 보내거나 후쿠오카타워, 항만 분위기 중심으로 일정을 짤 때 잘 맞습니다. 번화가보다 차분한 숙박을 원하는 경우 후보가 됩니다.",
          stayRange: [
            "후쿠오카타워, 후쿠오카코역, 벤텐초 주변 동선 확인",
            "아이 동반이면 호텔 주변 식사·편의점 접근성이 좋은 위치",
            "시내 관광도 넣는다면 지하철 환승 동선이 단순한 위치"
          ],
          avoidRange: [
            "하카타·하카타·텐진를 매일 오가는 시내 중심 일정",
            "첫 후쿠오카 여행인데 대표 명소를 짧게 많이 보려는 일정",
            "밤거리와 쇼핑을 늦게까지 즐기고 싶은 여행"
          ],
          bestFor: ["가족여행", "아이 동반", "여유로운 일정", "후쿠오카타워 중심 여행"],
          notFor: ["대표 명소를 촘촘히 도는 첫 여행", "맛집·쇼핑 중심 여행", "근교 이동이 많은 일정"],
          bookingTips: [
            "가족 여행이라면 호텔 주변 식당, 편의점, 세탁 시설을 함께 확인하세요.",
            "시내 이동이 필요한 날이 많다면 전체 이동 시간을 먼저 계산하세요.",
            "후쿠오카타워 중심 일정인지, 단순히 저렴한 숙소인지 목적을 분명히 하세요."
          ],
          chips: ["가족여행", "여유", "후쿠오카타워", "항만 분위기"],
          compareGood: "도심 번화가보다 여유롭고 가족 중심 일정을 만들기 좋습니다.",
          compareCaution: "시내 관광 비중이 높다면 이동 시간이 길어질 수 있습니다.",
          mismatchNote: "이번 답변에서 대표 명소, 밤거리, 쇼핑, 공항 이동을 중요하게 골랐다면 모모치·오호리는 1순위와 거리가 있습니다.",
          links: [
            { title: "후쿠오카 모모치·오호리 호텔 추천", url: "/post/fukuoka-bay-area-hotels" },
            { title: "가족여행 후쿠오카 호텔 추천", url: "/post/fukuoka-family-hotels" }
          ,
            { title: "후쿠오카 후쿠오카타워 근처 호텔 추천 TOP5", url: "/post/fukuoka-kaiyukan-hotels" },
            { title: "후쿠오카 가족여행 호텔 추천 TOP5", url: "/post/fukuoka-family-hotels-top5" },
            { title: "후쿠오카 여유로운 숙소 추천 TOP5", url: "/post/fukuoka-relax-hotels" }],
          hotels: [
            {
              name: "아트 호텔 후쿠오카 베이 타워",
              tag: "베이 전망 후보",
              location: "벤텐초·모모치·오호리",
              reason: "도심 번화가보다 여유로운 분위기와 모모치·오호리 접근성을 함께 보고 싶을 때 어울립니다.",
              meta: ["모모치·오호리", "가족", "여유"],
              url: "/post/art-hotel-fukuoka-bay-tower"
            },
            {
              name: "퀸테사 호텔 후쿠오카 베이",
              tag: "가족형 후보",
              location: "모모치·오호리",
              reason: "후쿠오카타워, 항만 분위기, 여유로운 가족 일정을 고려할 때 비교해볼 만한 후보입니다.",
              meta: ["가족여행", "후쿠오카타워", "넓은 동선"],
              url: "/post/quintessa-hotel-fukuoka-bay"
            },
            {
              name: "호텔 시걸 텐포잔 후쿠오카",
              tag: "후쿠오카타워 접근",
              location: "텐포잔·후쿠오카코 권역",
              reason: "후쿠오카타워 중심의 하루 일정이나 아이와 함께하는 느린 여행에 어울리는 후보입니다.",
              meta: ["후쿠오카타워", "아이 동반", "여유"],
              url: "/post/hotel-seagull-tenpozan-fukuoka"
            }
          ,
            {
              name: "호텔 시걸 텐포잔 후쿠오카",
              tag: "후쿠오카타워 접근",
              location: "텐포잔·후쿠오카코 권역",
              reason: "후쿠오카타워과 모모치·오호리 일정을 여유롭게 잡는 가족 여행에 어울립니다.",
              meta: ["후쿠오카타워", "가족", "여유"],
              url: "/post/hotel-seagull-tempozan-fukuoka"
            },
            {
              name: "아트 호텔 후쿠오카 베이 타워",
              tag: "전망형 후보",
              location: "벤텐초·모모치·오호리",
              reason: "도심과 모모치·오호리 사이에서 전망과 이동 균형을 함께 보고 싶은 경우 비교하기 좋습니다.",
              meta: ["전망", "베이", "이동 균형"],
              url: "/post/art-hotel-fukuoka-bay-tower"
            }]
        }
      },
      questions: [
        {
          title: "이번 후쿠오카 여행은 몇 번째인가요?",
          help: "첫 여행일수록 이동이 단순하고 대표 명소 접근성이 좋은 위치가 유리합니다.",
          options: [
            { title: "첫 후쿠오카 여행이에요", desc: "대표 명소와 맛집 동선을 쉽게 잡고 싶어요.", scores: { namba: 5, umeda: 2, shinsaibashi: 2 } },
            { title: "두 번째 이상이에요", desc: "너무 뻔한 중심지만 고집하지 않아도 괜찮아요.", scores: { shinsaibashi: 4, tennoji: 3, umeda: 2 } },
            { title: "후쿠오카가 꽤 익숙해요", desc: "조금 더 실속 있거나 여유로운 지역도 좋아요.", scores: { tennoji: 4, bay: 3, shinsaibashi: 3 } }
          ]
        },
        {
          title: "이번 여행에서 가장 중요한 것은 무엇인가요?",
          help: "여행의 핵심 목적에 따라 숙소 위치가 달라집니다.",
          options: [
            { title: "맛집과 밤거리", desc: "저녁에도 걸어서 다닐 수 있는 곳이 좋아요.", scores: { namba: 6, shinsaibashi: 2 } },
            { title: "쇼핑", desc: "쇼핑몰, 상점가, 백화점 접근성이 중요해요.", scores: { shinsaibashi: 4, namba: 3, umeda: 3 } },
            { title: "교통 편의성", desc: "시내 이동과 근교 이동을 편하게 하고 싶어요.", scores: { umeda: 6, namba: 3, shinsaibashi: 1 } },
            { title: "아이와 함께하는 일정", desc: "이동 피로가 적고 동선이 단순했으면 좋겠어요.", scores: { universal: 4, bay: 4, umeda: 2 } }
          ]
        },
        {
          title: "공항 이동은 얼마나 중요한가요?",
          help: "후쿠오카공항 이동을 중요하게 보면 하카타 쪽이 강한 후보가 됩니다.",
          options: [
            { title: "매우 중요해요", desc: "공항에서 숙소까지 최대한 쉽게 가고 싶어요.", scores: { namba: 6, tennoji: 2, umeda: 1 } },
            { title: "보통이에요", desc: "조금 갈아타도 괜찮지만 너무 복잡한 건 싫어요.", scores: { namba: 3, umeda: 3, tennoji: 2 } },
            { title: "크게 중요하지 않아요", desc: "공항보다 현지 여행 동선이 더 중요해요.", scores: { shinsaibashi: 2, universal: 2, bay: 2 } }
          ]
        },
        {
          title: "오호리공원·모모치 해변 일정이 있나요?",
          help: "오호리공원, 모모치 해변, 후쿠오카타워가 핵심이면 숙소 위치 선택이 달라집니다.",
          options: [
            { title: "오호리·모모치가 이번 여행의 핵심이에요", desc: "공원·해변 이동과 휴식 시간을 여유롭게 잡고 싶어요.", scores: { universal: 9, bay: 2 } },
            { title: "하루 정도만 방문해요", desc: "오호리·모모치도 가지만 시내 관광도 중요해요.", scores: { universal: 3, umeda: 3, namba: 3 } },
            { title: "방문하지 않아요", desc: "시내 관광, 맛집, 쇼핑 중심으로 움직일 예정이에요.", scores: { namba: 3, shinsaibashi: 3, umeda: 2, tennoji: 1 } }
          ]
        },
        {
          title: "후쿠오카 근교 여행 계획이 있나요?",
          help: "다자이후, 이토시마, 기타큐슈처럼 다른 도시를 함께 다녀올 예정이라면 숙소 위치 기준이 달라집니다.",
          options: [
            { title: "근교 여행을 2일 이상 계획하고 있어요", desc: "다자이후, 이토시마, 기타큐슈 등을 후쿠오카 시내와 함께 다녀오고 싶어요.", scores: { umeda: 8, shinsaibashi: 2, namba: 1 } },
            { title: "근교 여행은 하루 정도만 있어요", desc: "시내 관광도 중요하지만 하루쯤은 다른 도시도 보고 싶어요.", scores: { umeda: 4, namba: 3, shinsaibashi: 2 } },
            { title: "후쿠오카 시내 위주로만 볼 예정이에요", desc: "나카스, 하카타, 텐진처럼 시내 동선을 더 중요하게 봐요.", scores: { namba: 4, shinsaibashi: 3, tennoji: 2 } },
            { title: "아직 정하지 않았지만 가능성은 있어요", desc: "일정이 바뀔 수 있어서 이동 선택지가 많은 곳이면 좋아요.", scores: { umeda: 4, shinsaibashi: 2, namba: 2 } }
          ]
        },
        {
          title: "숙소 주변 분위기는 어떤 쪽이 좋나요?",
          help: "같은 후쿠오카여도 지역마다 밤 분위기와 체감 소음이 다릅니다.",
          options: [
            { title: "활기찬 번화가가 좋아요", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { namba: 6, shinsaibashi: 2 } },
            { title: "깔끔한 도심이 좋아요", desc: "백화점, 쇼핑몰, 역세권 분위기를 선호해요.", scores: { umeda: 6, shinsaibashi: 2 } },
            { title: "조금 차분한 곳이 좋아요", desc: "번화가 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { shinsaibashi: 4, tennoji: 3, umeda: 2 } },
            { title: "가족여행에 편한 분위기가 좋아요", desc: "아이와 함께 무리 없는 동선을 만들고 싶어요.", scores: { universal: 4, bay: 4, umeda: 2 } }
          ]
        },
        {
          title: "숙소 예산은 어떤 편인가요?",
          help: "위치가 중심에 가까울수록 가격이 올라가거나 객실이 작아질 수 있습니다.",
          options: [
            { title: "숙소비를 아끼고 싶어요", desc: "중심가 바로 앞이 아니어도 괜찮아요.", scores: { tennoji: 5, shinsaibashi: 3, bay: 2 } },
            { title: "가격과 위치 균형이 중요해요", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { shinsaibashi: 4, tennoji: 3, namba: 2, umeda: 2 } },
            { title: "위치가 좋다면 조금 더 써도 괜찮아요", desc: "짧은 일정이라 이동 시간을 줄이고 싶어요.", scores: { namba: 4, umeda: 4, universal: 3 } }
          ]
        },
        {
          title: "이번 여행 동행자는 누구인가요?",
          help: "혼자, 커플, 친구, 가족 여부에 따라 좋은 위치가 달라집니다.",
          options: [
            { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { namba: 3, umeda: 3, shinsaibashi: 2 } },
            { title: "커플 여행", desc: "맛집, 쇼핑, 분위기를 함께 보고 싶어요.", scores: { namba: 3, shinsaibashi: 3, umeda: 2 } },
            { title: "친구와 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { namba: 5, shinsaibashi: 3 } },
            { title: "가족·아이 동반", desc: "무리 없는 이동과 안정적인 동선이 중요해요.", scores: { universal: 4, bay: 4, umeda: 3 } },
            { title: "부모님과 여행", desc: "교통이 편하고 너무 복잡하지 않은 곳이 좋아요.", scores: { umeda: 4, tennoji: 3, namba: 2 } }
          ]
        },
        {
          title: "호텔을 고를 때 가장 피하고 싶은 불편은 무엇인가요?",
          help: "마지막으로 피하고 싶은 요소를 반영하면 결과가 더 현실적으로 정리됩니다.",
          options: [
            { title: "밤 소음", desc: "숙소 주변이 너무 시끄러운 건 피하고 싶어요.", scores: { shinsaibashi: 4, umeda: 3, bay: 2, namba: -2 } },
            { title: "긴 이동 시간", desc: "매일 이동 시간이 길어지는 건 싫어요.", scores: { namba: 4, umeda: 4, universal: 2, bay: -2 } },
            { title: "복잡한 환승", desc: "길 찾기와 환승이 복잡한 곳은 부담스러워요.", scores: { namba: 3, tennoji: 2, universal: 2, umeda: -1 } },
            { title: "작은 객실", desc: "가격이 조금 올라가도 너무 좁은 객실은 피하고 싶어요.", scores: { umeda: 3, bay: 3, universal: 2, namba: -1 } },
            { title: "아이와 걷는 거리", desc: "아이와 함께 오래 걷는 동선은 줄이고 싶어요.", scores: { universal: 4, bay: 3, umeda: 2 } }
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
      const contents = {
        namba: {
          intro: "선택한 답변에서 대표 명소, 맛집, 쇼핑, 공항 이동처럼 ‘짧고 단순한 동선’이 중요한 기준으로 반영되었습니다. 그래서 하카타·나카스는 이동 시간을 줄이고 여행 만족도를 빠르게 높이기 좋은 선택입니다.",
          reasons: [
            { title: "처음 가도 동선이 단순합니다", text: "나카스, 캐널시티, 텐진, 하카타역 주변을 한 권역으로 묶어 움직일 수 있어 일정이 복잡해지지 않습니다." },
            { title: "저녁 시간이 편해집니다", text: "맛집과 쇼핑, 밤거리 이동이 짧아 늦은 시간에도 숙소로 돌아오는 부담이 적습니다." },
            { title: "짧은 일정일수록 효율이 큽니다", text: "2박 3일처럼 시간이 부족한 여행에서는 교통보다 체류 시간이 중요합니다. 하카타는 그 시간을 아끼기 좋은 위치입니다." }
          ],
          conclusionTitle: "결론: 후쿠오카를 한 번에 편하게 경험하고 싶다면 하카타가 가장 안전한 선택입니다.",
          conclusionText: "다만 나카스 바로 앞은 소음이 있을 수 있으니, 하카타역·고후쿠마치역 도보권이면서 번화가와 한 블록 정도 떨어진 호텔을 우선 비교하는 방식이 좋습니다."
        },
        shinsaibashi: {
          intro: "선택한 답변에서 쇼핑, 도보 이동, 번화가 접근성, 조금 더 차분한 분위기가 함께 반영되었습니다. 텐진·기온는 하카타의 장점은 가져가면서 숙박 분위기를 조금 정돈하기 좋은 위치입니다.",
          reasons: [
            { title: "쇼핑 동선이 자연스럽습니다", text: "텐진스지, 나카스, 하카타 방면을 도보 또는 짧은 지하철 이동으로 연결하기 쉽습니다." },
            { title: "너무 번잡한 숙박을 피하기 좋습니다", text: "하카타 한복판보다 차분한 호텔 후보가 많아 밤 소음과 번잡함을 줄이고 싶은 여행자에게 잘 맞습니다." },
            { title: "하카타와 하카타 사이 균형이 좋습니다", text: "기온 쪽은 남쪽과 북쪽 이동을 함께 고려하기 좋아 일정이 한쪽으로 치우치지 않습니다." }
          ],
          conclusionTitle: "결론: 쇼핑과 위치 균형을 함께 보고 싶다면 텐진·기온가 합리적입니다.",
          conclusionText: "나카스 야간 동선이 핵심이면 너무 북쪽으로 올라가지 말고, 텐진역·와타나베도리역·기온역 도보권을 중심으로 비교하세요."
        },
        umeda: {
          intro: "선택한 답변에서 교통 편의성, 근교 이동, 깔끔한 도심 분위기가 강하게 반영되었습니다. 하카타·하카타역은 후쿠오카 시내뿐 아니라 다자이후, 이토시마, 기타큐슈까지 함께 보는 일정에 특히 강합니다.",
          reasons: [
            { title: "근교 당일치기에 유리합니다", text: "JR, 니시테츠, 니시테츠 등 선택지가 많아 다자이후·이토시마·기타큐슈 일정을 넣을 때 이동 계획을 세우기 쉽습니다." },
            { title: "쇼핑몰 중심으로 움직이기 좋습니다", text: "백화점과 대형 쇼핑몰이 많아 비 오는 날이나 부모님 동반 일정에서도 동선 부담이 적습니다." },
            { title: "여행 일정 확장성이 큽니다", text: "하루는 시내, 하루는 근교처럼 일정이 바뀌어도 대응하기 쉬운 교통 중심 위치입니다." }
          ],
          conclusionTitle: "결론: 후쿠오카만 보는 여행보다 주변 도시까지 함께 볼 계획이라면 하카타가 더 타당합니다.",
          conclusionText: "단, 하카타·나카스 밤거리 중심 여행이라면 매번 이동이 필요합니다. 하카타를 고를 때는 호텔이 실제로 어떤 역 출구와 가까운지까지 확인하는 것이 중요합니다."
        },
        tennoji: {
          intro: "선택한 답변에서 예산, 실속, 남쪽 관광지 동선, 재방문 여행 성향이 반영되었습니다. 야쿠인·캐널는 중심가 숙소비가 부담될 때 이동 편의성을 완전히 포기하지 않는 현실적인 선택입니다.",
          reasons: [
            { title: "가격 대비 위치 효율이 좋습니다", text: "하카타 중심부보다 숙소비 부담을 낮추면서도 지하철과 JR 이동을 활용해 주요 지역으로 접근할 수 있습니다." },
            { title: "남쪽 일정과 잘 맞습니다", text: "캐널시티, 베이사이드 플레이스, 야쿠인공원 등 남쪽 관광지를 넣는 일정이라면 이동이 자연스럽습니다." },
            { title: "재방문 여행에 특히 좋습니다", text: "이미 하카타 중심을 경험한 여행자라면 더 합리적인 가격과 다른 분위기를 함께 누릴 수 있습니다." }
          ],
          conclusionTitle: "결론: 숙소비를 줄이되 이동 편의성은 남기고 싶다면 야쿠인가 좋은 타협점입니다.",
          conclusionText: "다만 첫 후쿠오카 여행에서 나카스와 하카타를 매일 오갈 계획이라면 이동 시간이 쌓일 수 있으니, 가격만 보지 말고 실제 이동 횟수까지 계산해보는 것이 좋습니다."
        },
        universal: {
          intro: "선택한 답변에서 오호리·모모치, 가족 여행, 아이 동반, 체력 부담 감소가 강하게 반영되었습니다. 오호리·모모치는 후쿠오카 전체 관광보다 테마파크 경험을 최우선으로 둘 때 가장 설득력 있는 위치입니다.",
          reasons: [
            { title: "오호리·모모치 입장 전 피로가 줄어듭니다", text: "아침 일찍 입장해야 하는 일정에서 이동 시간이 짧으면 대기와 체력 부담을 줄일 수 있습니다." },
            { title: "퇴장 후 숙소 복귀가 편합니다", text: "아이 동반이나 폐장 시간까지 머무는 일정에서는 숙소가 가까운 것만으로도 만족도가 크게 올라갑니다." },
            { title: "테마파크 중심 일정에 집중할 수 있습니다", text: "시내 이동보다 오호리·모모치 체류 시간이 중요한 여행이라면 오호리·모모치 숙박이 가장 목적에 맞습니다." }
          ],
          conclusionTitle: "결론: 이번 여행의 주인공이 오호리·모모치라면 오호리·모모치에 호텔을 잡는 것이 가장 타당합니다.",
          conclusionText: "후쿠오카 시내 관광도 많다면 전 일정 숙박보다 오호리·모모치 전날 또는 당일 1박만 오호리·모모치로 나누는 방식도 효율적입니다."
        },
        bay: {
          intro: "선택한 답변에서 가족 여행, 여유로운 일정, 아이와 걷는 거리, 차분한 숙박 분위기가 반영되었습니다. 모모치·오호리는 후쿠오카의 번화가보다 편안한 하루 흐름을 만들고 싶을 때 잘 맞습니다.",
          reasons: [
            { title: "아이와 함께 움직이기 좋습니다", text: "후쿠오카타워, 텐포잔 등 가족형 일정과 연결하기 좋아 무리하게 시내를 오가는 부담을 줄일 수 있습니다." },
            { title: "숙박 분위기가 더 여유롭습니다", text: "하카타나 하카타처럼 복잡한 도심보다 차분한 분위기에서 쉬고 싶은 여행자에게 잘 맞습니다." },
            { title: "목적이 분명할수록 만족도가 높습니다", text: "후쿠오카타워, 항만 풍경, 가족 휴식이 핵심이라면 모모치·오호리의 장점이 분명해집니다." }
          ],
          conclusionTitle: "결론: 대표 명소를 촘촘히 도는 여행보다 가족과 여유롭게 머무는 여행이라면 모모치·오호리가 타당합니다.",
          conclusionText: "시내 관광 비중이 높다면 이동 시간이 길어질 수 있으니, 모모치·오호리를 고를 때는 후쿠오카타워 중심 일정인지 먼저 확인하는 것이 좋습니다."
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
  