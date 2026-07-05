/* 푸꾸옥 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  "cityName": "푸꾸옥",
  "destinationSlug": "phu-quoc",
  "areas": {
    "duongdong": {
      "name": "즈엉동·롱비치 북부",
      "summary": "야시장 불빛과 바다 소리, 식당과 마사지 동선이 자연스럽게 이어지는 중심에서 푸꾸옥의 첫 여행을 가장 쉽게 시작하고 싶은 당신에게 잘 맞는 기준점입니다.",
      "leadTitle": "첫 여행 · 야시장 · 식당 동선",
      "leadText": "야시장, 식당, 마사지, 투어 픽업, 서쪽 해변을 한 번에 묶기 좋습니다. 공항과도 비교적 가까워 밤 도착·짧은 일정에서 이동 피로를 줄이기 좋습니다.",
      "compareGood": "푸꾸옥을 처음 방문하거나 일정이 짧다면 가장 기준을 잡기 쉬운 지역입니다.",
      "compareCaution": "중심부 호텔은 프라이빗한 해변 분위기가 약할 수 있으니 수영장과 해변 접근 후기를 함께 확인하세요.",
      "decision": "처음 푸꾸옥이면 즈엉동과 롱비치 북부를 기준으로 잡고, 조용함이나 리조트 체류가 더 중요하면 옹랑·바이켐을 함께 비교하세요.",
      "bestFor": [
        "첫 푸꾸옥 여행",
        "2박 3일 짧은 일정",
        "야시장·맛집",
        "공항 이동을 줄이고 싶은 여행"
      ],
      "notFor": [
        "완전한 리조트 휴식",
        "조용한 해변만 원하는 일정",
        "대형 테마파크 중심 가족 여행"
      ],
      "bookingTips": [
        "야시장 바로 앞보다는 해변과 중심가 사이에 숙소를 잡는 편이 밤 소음과 이동 편의의 균형을 맞추기 좋습니다.",
        "중심부 호텔은 프라이빗한 해변 분위기가 약할 수 있으니 수영장과 해변 접근 후기를 함께 확인하세요."
      ],
      "chips": [
        "첫 여행",
        "야시장",
        "공항 접근",
        "맛집",
        "투어 픽업"
      ],
      "links": [
        {
          "title": "푸꾸옥 즈엉동 호텔 추천 TOP5",
          "url": "/post/phu-quoc-duong-dong-long-beach-hotels"
        },
        {
          "title": "푸꾸옥 즈엉동 숙소 위치 가이드",
          "url": "/post/phu-quoc-duong-dong-long-beach-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Seashells Phu Quoc Hotel & Spa",
          "tag": "즈엉동 중심",
          "location": "즈엉동·롱비치 북부",
          "reason": "야시장과 중심가 식당을 자주 이용할 첫 여행자에게 잘 맞는 도심형 호텔입니다.",
          "meta": [
            "야시장",
            "중심",
            "첫 여행"
          ],
          "url": "/post/seashells-phu-quoc-hotel-and-spa"
        },
        {
          "name": "L'Azure Resort and Spa",
          "tag": "롱비치 휴식",
          "location": "롱비치 북부",
          "reason": "중심가 접근성과 해변 휴식을 함께 챙기고 싶은 일정에 어울립니다.",
          "meta": [
            "해변",
            "휴식",
            "커플"
          ],
          "url": "/post/l-azure-resort-and-spa"
        },
        {
          "name": "Saigon Phu Quoc Resort & Spa",
          "tag": "중심 리조트",
          "location": "즈엉동·롱비치",
          "reason": "야시장 접근성과 리조트형 휴식을 함께 원하는 여행자에게 오래전부터 많이 선택된 숙소입니다.",
          "meta": [
            "중심",
            "리조트",
            "가족"
          ],
          "url": "/post/saigon-phu-quoc-resort-and-spa"
        },
        {
          "name": "Cassia Cottage",
          "tag": "감성 해변",
          "location": "롱비치",
          "reason": "작고 차분한 해변 숙소 분위기를 선호하는 커플 여행에 잘 맞습니다.",
          "meta": [
            "부티크",
            "커플",
            "해변"
          ],
          "url": "/post/cassia-cottage"
        },
        {
          "name": "La Veranda Resort Phu Quoc - MGallery",
          "tag": "클래식 리조트",
          "location": "롱비치",
          "reason": "차분한 리조트 분위기와 롱비치 접근성을 함께 기대할 수 있습니다.",
          "meta": [
            "리조트",
            "커플",
            "조용함"
          ],
          "url": "/post/la-veranda-resort-phu-quoc-mgallery"
        }
      ]
    },
    "longbeach": {
      "name": "롱비치·즈엉토",
      "summary": "공항과 해변 사이의 편안한 거리감 속에서 리조트 휴식과 이동 편의, 바다 전망을 균형 있게 누리고 싶은 당신에게 잘 어울리는 해변 지역입니다.",
      "leadTitle": "서쪽 해변 · 리조트 · 공항 접근",
      "leadText": "롱비치 남쪽과 즈엉토 권역은 공항에서 접근하기 쉽고 리조트 선택지가 넓습니다. 가족, 커플, 첫 여행 모두에게 무난하지만 야시장까지는 차량 이동을 계산해야 합니다.",
      "compareGood": "해변 휴식과 공항 접근, 리조트 시설을 균형 있게 보고 싶을 때 편합니다.",
      "compareCaution": "롱비치라고 해도 남북 길이가 길어 실제 위치에 따라 즈엉동·안터이 이동 시간이 달라집니다.",
      "decision": "해변과 접근성의 균형이 중요하다면 롱비치·즈엉토가 가장 무난한 선택입니다.",
      "bestFor": [
        "리조트 휴식",
        "공항 접근",
        "가족·커플 여행",
        "서쪽 일몰 감상"
      ],
      "notFor": [
        "매일 야시장을 걸어가고 싶은 일정",
        "북부 테마파크만 보는 일정",
        "외딴 조용함만 원하는 여행"
      ],
      "bookingTips": [
        "공항과 가까운 만큼 항공기 소음 후기, 해변 도보 접근, 셔틀 운영 여부를 같이 확인하세요.",
        "롱비치라고 해도 남북 길이가 길어 실제 위치에 따라 즈엉동·안터이 이동 시간이 달라집니다."
      ],
      "chips": [
        "해변",
        "리조트",
        "공항",
        "일몰",
        "가족"
      ],
      "links": [
        {
          "title": "푸꾸옥 롱비치 호텔 추천 TOP5",
          "url": "/post/phu-quoc-long-beach-duong-to-hotels"
        },
        {
          "title": "푸꾸옥 롱비치 숙소 위치 가이드",
          "url": "/post/phu-quoc-long-beach-duong-to-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "InterContinental Phu Quoc Long Beach Resort",
          "tag": "롱비치 대형",
          "location": "롱비치·즈엉토",
          "reason": "수영장, 해변, 부대시설을 모두 중요하게 보는 가족·커플 여행에 잘 맞습니다.",
          "meta": [
            "리조트",
            "가족",
            "일몰"
          ],
          "url": "/post/intercontinental-phu-quoc-long-beach-resort"
        },
        {
          "name": "Regent Phu Quoc",
          "tag": "상급 럭셔리",
          "location": "롱비치 남부",
          "reason": "숙소 체류 자체를 여행의 핵심으로 두는 럭셔리 휴양에 어울립니다.",
          "meta": [
            "럭셔리",
            "휴식",
            "기념일"
          ],
          "url": "/post/regent-phu-quoc"
        },
        {
          "name": "Novotel Phu Quoc Resort",
          "tag": "가족 실속",
          "location": "롱비치·즈엉토",
          "reason": "공항 접근성과 해변 휴식, 가족형 객실을 함께 보는 여행자에게 무난한 선택지입니다.",
          "meta": [
            "가족",
            "공항",
            "리조트"
          ],
          "url": "/post/novotel-phu-quoc-resort"
        },
        {
          "name": "Dusit Princess Moonrise Beach Resort",
          "tag": "해변 균형",
          "location": "롱비치",
          "reason": "롱비치 해변 접근성과 가격, 객실 컨디션의 균형을 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "해변",
            "커플",
            "가성비"
          ],
          "url": "/post/dusit-princess-moonrise-beach-resort"
        },
        {
          "name": "Salinda Resort Phu Quoc Island",
          "tag": "휴식 균형",
          "location": "롱비치",
          "reason": "공항과 중심가 접근을 크게 포기하지 않으면서 리조트 만족도까지 챙기기 좋은 선택지입니다.",
          "meta": [
            "리조트",
            "커플",
            "공항"
          ],
          "url": "/post/salinda-resort-phu-quoc-island"
        }
      ]
    },
    "onglang": {
      "name": "옹랑·끄어깐",
      "summary": "야자수 그늘과 조용한 해변, 느긋한 카페 시간이 이어지는 분위기 속에서 아무것도 하지 않는 하루의 여유를 즐기고 싶은 당신에게 잘 맞는 곳입니다.",
      "leadTitle": "조용한 해변 · 감성 리조트 · 커플",
      "leadText": "옹랑과 끄어깐은 푸꾸옥의 차분한 해변 분위기를 느끼기 좋은 지역입니다. 맛집·상점은 중심보다 적지만 숙소에서 쉬는 시간이 많은 일정에서는 만족도가 높습니다.",
      "compareGood": "중심의 번잡함을 줄이고 해변에서 천천히 쉬고 싶은 여행자에게 잘 맞습니다.",
      "compareCaution": "해변 접근이 리조트별로 다르므로 “오션뷰”보다 실제 해변 도보 동선을 먼저 보세요.",
      "decision": "조용함이 1순위라면 옹랑·끄어깐이 가장 먼저 볼 지역입니다.",
      "bestFor": [
        "조용한 휴식",
        "커플 여행",
        "부티크 리조트",
        "재방문 여행"
      ],
      "notFor": [
        "야시장 도보권 우선",
        "어린아이와 테마파크 중심 일정",
        "늦은 밤 식당 선택지 중요"
      ],
      "bookingTips": [
        "숙소 밖 식당을 자주 이용할 계획이라면 도보권 식당과 그랩 호출 가능성을 함께 확인하세요.",
        "해변 접근이 리조트별로 다르므로 “오션뷰”보다 실제 해변 도보 동선을 먼저 보세요."
      ],
      "chips": [
        "조용함",
        "커플",
        "부티크",
        "해변",
        "재방문"
      ],
      "links": [
        {
          "title": "푸꾸옥 옹랑 호텔 추천 TOP5",
          "url": "/post/phu-quoc-ong-lang-cua-can-hotels"
        },
        {
          "title": "푸꾸옥 옹랑 숙소 위치 가이드",
          "url": "/post/phu-quoc-ong-lang-cua-can-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Mango Bay Resort",
          "tag": "자연형 휴식",
          "location": "옹랑",
          "reason": "조용한 해변, 자연스러운 리조트 분위기를 원하는 여행자에게 잘 맞습니다.",
          "meta": [
            "조용함",
            "자연",
            "커플"
          ],
          "url": "/post/mango-bay-resort"
        },
        {
          "name": "Phu Quoc Eco Beach Resort",
          "tag": "옹랑 실속",
          "location": "옹랑",
          "reason": "옹랑의 차분한 해변 분위기를 비교적 부담 없이 느끼기 좋은 선택지입니다.",
          "meta": [
            "옹랑",
            "가성비",
            "휴식"
          ],
          "url": "/post/phu-quoc-eco-beach-resort"
        },
        {
          "name": "Chen Sea Resort & Spa Phu Quoc",
          "tag": "조용한 리조트",
          "location": "옹랑·끄어깐",
          "reason": "프라이빗한 해변 분위기와 조용한 숙소 분위기를 중요하게 볼 때 살펴볼 만합니다.",
          "meta": [
            "조용함",
            "리조트",
            "커플"
          ],
          "url": "/post/chen-sea-resort-and-spa-phu-quoc"
        },
        {
          "name": "Mövenpick Resort Waverly Phu Quoc",
          "tag": "가족 휴식",
          "location": "옹랑·끄어깐",
          "reason": "조용한 북서부 해변과 가족형 리조트 편의성을 함께 기대할 수 있습니다.",
          "meta": [
            "가족",
            "휴식",
            "리조트"
          ],
          "url": "/post/m-venpick-resort-waverly-phu-quoc"
        },
        {
          "name": "Green Bay Phu Quoc Resort & Spa",
          "tag": "숲속 해변",
          "location": "끄어깐·붕바우",
          "reason": "자연 속에서 쉬는 느낌을 중요하게 보는 조용한 휴양에 어울립니다.",
          "meta": [
            "자연",
            "조용함",
            "휴식"
          ],
          "url": "/post/green-bay-phu-quoc-resort-and-spa"
        }
      ]
    },
    "ganhdau": {
      "name": "간다우·바이다이·그랜드월드",
      "summary": "대형 리조트와 테마파크, 그랜드월드의 화려한 분위기를 하루 안에 넘나들며 가족 여행의 즐거움을 크게 가져가고 싶은 당신에게 잘 어울리는 북부 지역입니다.",
      "leadTitle": "북부 리조트 · 빈원더스 · 가족 여행",
      "leadText": "푸꾸옥 북부는 대형 리조트와 테마파크형 일정에 강합니다. 아이와 함께 리조트와 놀이시설을 이용하거나, 숙소 안에서 오래 머무는 여행에 특히 편합니다.",
      "compareGood": "빈원더스, 그랜드월드, 사파리, 대형 리조트를 한 번에 묶는 북부 리조트 구역입니다.",
      "compareCaution": "리조트 밖 식당 선택지가 제한될 수 있어 조식·석식 포함 여부를 확인하는 편이 좋습니다.",
      "decision": "가족형 리조트와 테마파크가 목적이면 간다우·바이다이 권역이 가장 효율적입니다.",
      "bestFor": [
        "가족 여행",
        "대형 리조트",
        "빈원더스·사파리",
        "그랜드월드 야간 일정"
      ],
      "notFor": [
        "야시장·로컬 식당 중심",
        "공항 이동 최우선",
        "남부 섬투어만 집중"
      ],
      "bookingTips": [
        "북부 리조트는 공항·즈엉동 이동 시간이 길 수 있어 셔틀과 택시비를 함께 계산하세요.",
        "리조트 밖 식당 선택지가 제한될 수 있어 조식·석식 포함 여부를 확인하는 편이 좋습니다."
      ],
      "chips": [
        "가족",
        "테마파크",
        "대형 리조트",
        "사파리",
        "그랜드월드"
      ],
      "links": [
        {
          "title": "푸꾸옥 바이다이 호텔 추천 TOP5",
          "url": "/post/phu-quoc-ganh-dau-bai-dai-hotels"
        },
        {
          "title": "푸꾸옥 바이다이 숙소 위치 가이드",
          "url": "/post/phu-quoc-ganh-dau-bai-dai-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "Wyndham Grand Phu Quoc",
          "tag": "북부 대형",
          "location": "바이다이·간다우",
          "reason": "그랜드월드와 북부 테마파크 일정을 함께 잡기 좋은 대형 리조트입니다.",
          "meta": [
            "가족",
            "테마파크",
            "북부"
          ],
          "url": "/post/wyndham-grand-phu-quoc"
        },
        {
          "name": "Crowne Plaza Phu Quoc Starbay",
          "tag": "북부 가족",
          "location": "바이다이",
          "reason": "북부 해변과 리조트 부대시설을 함께 원하는 가족 여행에 잘 맞습니다.",
          "meta": [
            "가족",
            "리조트",
            "북부"
          ],
          "url": "/post/crowne-plaza-phu-quoc-starbay"
        },
        {
          "name": "Sheraton Phu Quoc Long Beach Resort",
          "tag": "바이다이 리조트",
          "location": "바이다이·간다우",
          "reason": "바이다이 해변과 북부 리조트 인프라를 함께 보는 여행에 어울립니다.",
          "meta": [
            "바이다이",
            "가족",
            "리조트"
          ],
          "url": "/post/sheraton-phu-quoc-long-beach-resort"
        },
        {
          "name": "Vinpearl Resort & Spa Phu Quoc",
          "tag": "테마파크 접근",
          "location": "간다우·바이다이",
          "reason": "빈원더스·사파리·그랜드월드 일정을 중심으로 잡는 가족에게 편합니다.",
          "meta": [
            "빈원더스",
            "사파리",
            "가족"
          ],
          "url": "/post/vinpearl-resort-and-spa-phu-quoc"
        },
        {
          "name": "Radisson Blu Resort Phu Quoc",
          "tag": "북부 안정형",
          "location": "간다우·바이다이",
          "reason": "북부 리조트권에서 시설과 이동 편의를 함께 살펴볼 수 있습니다.",
          "meta": [
            "북부",
            "가족",
            "리조트"
          ],
          "url": "/post/radisson-blu-resort-phu-quoc"
        }
      ]
    },
    "baikhem": {
      "name": "바이켐·안터이·선셋타운",
      "summary": "케이블카와 선셋타운, 남부 섬투어와 고급 리조트 휴양이 한 방향으로 이어지는 일정 속에서 푸꾸옥의 남쪽 매력을 깊게 느끼고 싶은 당신에게 잘 맞는 지역입니다.",
      "leadTitle": "남부 럭셔리 · 케이블카 · 섬투어",
      "leadText": "푸꾸옥 남부는 켐비치, 안터이항, 선셋타운, 혼똔 케이블카 동선과 잘 맞습니다. 리조트 체류와 남부 액티비티를 묶기 좋지만 즈엉동·북부 이동은 따로 계산해야 합니다.",
      "compareGood": "혼똔 케이블카, 선셋타운, 남부 섬투어와 고급 리조트 휴양을 함께 묶기 좋은 지역입니다.",
      "compareCaution": "남부는 분위기가 좋지만 섬 전체를 다니는 일정에는 이동 시간이 길어질 수 있습니다.",
      "decision": "남부 액티비티와 리조트 체류를 함께 잡고 싶다면 바이켐·안터이가 가장 자연스럽습니다.",
      "bestFor": [
        "커플·기념일",
        "고급 리조트",
        "혼똔 케이블카",
        "남부 섬투어"
      ],
      "notFor": [
        "야시장 도보권",
        "북부 테마파크 중심 가족 여행",
        "매일 시내 식당 탐방"
      ],
      "bookingTips": [
        "섬투어 출발지, 케이블카 운영 시간, 선셋타운 야간 쇼 운영 여부를 함께 확인하세요.",
        "남부는 분위기가 좋지만 섬 전체를 다니는 일정에는 이동 시간이 길어질 수 있습니다."
      ],
      "chips": [
        "럭셔리",
        "케이블카",
        "섬투어",
        "선셋타운",
        "커플"
      ],
      "links": [
        {
          "title": "푸꾸옥 바이켐 호텔 추천 TOP5",
          "url": "/post/phu-quoc-bai-khem-an-thoi-hotels"
        },
        {
          "title": "푸꾸옥 바이켐 숙소 위치 가이드",
          "url": "/post/phu-quoc-bai-khem-an-thoi-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "JW Marriott Phu Quoc Emerald Bay Resort & Spa",
          "tag": "바이켐 럭셔리",
          "location": "바이켐",
          "reason": "켐비치의 상징적인 럭셔리 리조트 분위기를 원하는 기념일 여행에 맞습니다.",
          "meta": [
            "럭셔리",
            "기념일",
            "바이켐"
          ],
          "url": "/post/jw-marriott-phu-quoc-emerald-bay-resort-and-spa"
        },
        {
          "name": "New World Phu Quoc Resort",
          "tag": "남부 풀빌라",
          "location": "바이켐",
          "reason": "남부 해변과 리조트 휴식을 함께 원하는 가족·커플 여행에 잘 맞는 선택지입니다.",
          "meta": [
            "풀빌라",
            "가족",
            "바이켐"
          ],
          "url": "/post/new-world-phu-quoc-resort"
        },
        {
          "name": "Premier Residences Phu Quoc Emerald Bay",
          "tag": "남부 실속",
          "location": "바이켐",
          "reason": "켐비치 접근성과 레지던스형 편의성을 함께 챙기는 가족·실속 여행에 좋습니다.",
          "meta": [
            "레지던스",
            "가족",
            "남부"
          ],
          "url": "/post/premier-residences-phu-quoc-emerald-bay"
        },
        {
          "name": "La Festa Phu Quoc, Curio Collection by Hilton",
          "tag": "선셋타운",
          "location": "선셋타운·안터이",
          "reason": "선셋타운 야간 분위기와 남부 액티비티를 함께 즐기고 싶을 때 잘 맞습니다.",
          "meta": [
            "선셋타운",
            "커플",
            "남부"
          ],
          "url": "/post/la-festa-phu-quoc-curio-collection-by-hilton"
        },
        {
          "name": "Premier Village Phu Quoc Resort",
          "tag": "안터이 풀빌라",
          "location": "안터이 남단",
          "reason": "남부의 조용한 풀빌라 휴식과 섬투어 동선을 함께 고려할 수 있습니다.",
          "meta": [
            "풀빌라",
            "휴식",
            "남부"
          ],
          "url": "/post/premier-village-phu-quoc-resort"
        }
      ]
    },
    "baisao": {
      "name": "사오비치·함닌",
      "summary": "투명한 바다와 로컬 식당, 조금 더 느슨한 남동부 분위기를 따라 움직이며 푸꾸옥의 조용한 풍경을 일정에 담고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "동남부 해변 · 로컬 식당 · 당일 이동",
      "leadText": "사오비치와 함닌은 푸꾸옥 동남부·동부의 로컬한 분위기를 느끼기 좋은 코스입니다. 숙소 선택지는 많지 않지만, 하루 일정으로 넣으면 해변과 로컬 식사를 함께 즐기기 좋습니다.",
      "compareGood": "첫 숙소로 고르기보다 사오비치, 함닌, 로컬 식당을 일정에 넣을 때 이해하면 좋은 지역입니다.",
      "compareCaution": "상점과 교통 선택지가 적어 늦은 시간 이동은 미리 준비하는 것이 좋습니다.",
      "decision": "사오비치·함닌은 숙소보다 일정 구역으로 이해하면 만족도가 높습니다.",
      "bestFor": [
        "해변 당일치기",
        "로컬 식당",
        "사진 여행",
        "조용한 일정"
      ],
      "notFor": [
        "첫 여행 숙소 1순위",
        "밤 일정이 많은 여행",
        "다양한 호텔 선택지 우선"
      ],
      "bookingTips": [
        "숙박지보다는 당일 코스로 넣는 편이 안전합니다. 이 지역에 머문다면 주변 식당과 이동 수단을 미리 확인하세요.",
        "상점과 교통 선택지가 적어 늦은 시간 이동은 미리 준비하는 것이 좋습니다."
      ],
      "chips": [
        "사오비치",
        "로컬",
        "사진",
        "해변",
        "당일 이동"
      ],
      "links": [
        {
          "title": "푸꾸옥 사오비치 호텔 추천 TOP5",
          "url": "/post/phu-quoc-bai-sao-ham-ninh-hotels"
        },
        {
          "title": "푸꾸옥 사오비치 숙소 위치 가이드",
          "url": "/post/phu-quoc-bai-sao-ham-ninh-stay-guide"
        }
      ],
      "hotels": [
        {
          "name": "JM Boutique Hotel",
          "tag": "바이켐 실속",
          "location": "바이켐",
          "reason": "바이켐 주변에서 숙박비 부담을 낮추고 남부 일정을 잡고 싶을 때 잘 맞습니다.",
          "meta": [
            "실속",
            "바이켐",
            "남부"
          ],
          "url": "/post/jm-boutique-hotel"
        },
        {
          "name": "Premier Residences Phu Quoc Emerald Bay",
          "tag": "남부 실속",
          "location": "바이켐",
          "reason": "켐비치 접근성과 레지던스형 편의성을 함께 챙기는 가족·실속 여행에 좋습니다.",
          "meta": [
            "레지던스",
            "가족",
            "남부"
          ],
          "url": "/post/premier-residences-phu-quoc-emerald-bay"
        },
        {
          "name": "New World Phu Quoc Resort",
          "tag": "남부 풀빌라",
          "location": "바이켐",
          "reason": "남부 해변과 리조트 휴식을 함께 원하는 가족·커플 여행에 잘 맞는 선택지입니다.",
          "meta": [
            "풀빌라",
            "가족",
            "바이켐"
          ],
          "url": "/post/new-world-phu-quoc-resort"
        },
        {
          "name": "JW Marriott Phu Quoc Emerald Bay Resort & Spa",
          "tag": "바이켐 럭셔리",
          "location": "바이켐",
          "reason": "켐비치의 상징적인 럭셔리 리조트 분위기를 원하는 기념일 여행에 맞습니다.",
          "meta": [
            "럭셔리",
            "기념일",
            "바이켐"
          ],
          "url": "/post/jw-marriott-phu-quoc-emerald-bay-resort-and-spa"
        },
        {
          "name": "La Festa Phu Quoc, Curio Collection by Hilton",
          "tag": "선셋타운",
          "location": "선셋타운·안터이",
          "reason": "선셋타운 야간 분위기와 남부 액티비티를 함께 즐기고 싶을 때 잘 맞습니다.",
          "meta": [
            "선셋타운",
            "커플",
            "남부"
          ],
          "url": "/post/la-festa-phu-quoc-curio-collection-by-hilton"
        }
      ]
    }
  },
  "questions": [
    {
      "title": "이번 푸꾸옥 여행에서 가장 중요한 건 무엇인가요?",
      "help": "가장 우선순위가 높은 여행 목적을 골라주세요.",
      "options": [
        {
          "label": "처음이라 이동이 쉬운 곳",
          "desc": "공항, 야시장, 식당, 투어 픽업이 중요해요.",
          "scores": {
            "duongdong": 5,
            "longbeach": 3
          }
        },
        {
          "label": "해변 리조트에서 쉬기",
          "desc": "수영장과 해변에서 머무는 시간이 길어요.",
          "scores": {
            "longbeach": 5,
            "onglang": 4,
            "baikhem": 4
          }
        },
        {
          "label": "아이와 테마파크",
          "desc": "빈원더스, 사파리, 그랜드월드를 보고 싶어요.",
          "scores": {
            "ganhdau": 6,
            "longbeach": 2
          }
        },
        {
          "label": "케이블카와 섬투어",
          "desc": "혼똔 케이블카와 남부 섬투어가 핵심이에요.",
          "scores": {
            "baikhem": 6,
            "baisao": 2
          }
        }
      ]
    },
    {
      "title": "숙소 밖 식당과 야시장 접근은 얼마나 중요한가요?",
      "help": "매일 저녁 외부 식당을 이용할 계획인지 생각해보세요.",
      "options": [
        {
          "label": "매우 중요해요",
          "desc": "야시장과 식당을 자주 갈 예정입니다.",
          "scores": {
            "duongdong": 5,
            "longbeach": 2
          }
        },
        {
          "label": "가끔이면 충분해요",
          "desc": "택시로 한두 번 이동하는 건 괜찮아요.",
          "scores": {
            "longbeach": 3,
            "onglang": 2,
            "baikhem": 2
          }
        },
        {
          "label": "리조트 안에서 해결해도 돼요",
          "desc": "조식과 리조트 식당을 주로 이용할 예정입니다.",
          "scores": {
            "ganhdau": 4,
            "baikhem": 4,
            "onglang": 3
          }
        }
      ]
    },
    {
      "title": "조용한 분위기를 얼마나 원하시나요?",
      "help": "중심 편의와 조용함 사이의 선호를 골라주세요.",
      "options": [
        {
          "label": "중심 편의가 더 중요해요",
          "desc": "약간 번잡해도 이동이 편한 곳이 좋아요.",
          "scores": {
            "duongdong": 5,
            "longbeach": 2
          }
        },
        {
          "label": "적당히 조용하면 돼요",
          "desc": "중심까지 택시 이동이 가능하면 괜찮아요.",
          "scores": {
            "longbeach": 4,
            "baikhem": 2,
            "onglang": 2
          }
        },
        {
          "label": "조용한 휴식이 1순위예요",
          "desc": "주변이 차분하고 숙소에서 오래 쉬고 싶어요.",
          "scores": {
            "onglang": 6,
            "baikhem": 3,
            "baisao": 2
          }
        }
      ]
    },
    {
      "title": "북부 테마파크 일정이 있나요?",
      "help": "빈원더스, 빈펄 사파리, 그랜드월드 방문 여부를 골라주세요.",
      "options": [
        {
          "label": "네, 꼭 갈 예정이에요",
          "desc": "북부 일정이 여행의 핵심입니다.",
          "scores": {
            "ganhdau": 6,
            "longbeach": 1
          }
        },
        {
          "label": "하루 정도 고민 중이에요",
          "desc": "숙소 위치에 따라 갈 수도 있어요.",
          "scores": {
            "ganhdau": 3,
            "longbeach": 2,
            "duongdong": 1
          }
        },
        {
          "label": "아니요",
          "desc": "테마파크보다 해변과 휴식이 중요해요.",
          "scores": {
            "onglang": 2,
            "baikhem": 2,
            "longbeach": 2
          }
        }
      ]
    },
    {
      "title": "남부 케이블카·섬투어 일정이 있나요?",
      "help": "혼똔 케이블카, 안터이 섬투어, 선셋타운 계획을 골라주세요.",
      "options": [
        {
          "label": "남부 일정이 핵심이에요",
          "desc": "케이블카와 섬투어를 꼭 넣고 싶어요.",
          "scores": {
            "baikhem": 6,
            "baisao": 2
          }
        },
        {
          "label": "하루 정도만 갈래요",
          "desc": "숙소는 다른 곳이어도 괜찮아요.",
          "scores": {
            "longbeach": 3,
            "duongdong": 2,
            "baikhem": 2
          }
        },
        {
          "label": "해변 휴식 위주예요",
          "desc": "액티비티보다 숙소 휴식이 우선이에요.",
          "scores": {
            "onglang": 3,
            "longbeach": 3,
            "ganhdau": 2
          }
        }
      ]
    },
    {
      "title": "동행자는 누구인가요?",
      "help": "함께 가는 사람에 따라 편한 지역이 달라집니다.",
      "options": [
        {
          "label": "혼자 또는 친구",
          "desc": "식당, 이동, 액티비티 균형이 중요해요.",
          "scores": {
            "duongdong": 3,
            "longbeach": 3,
            "baikhem": 2
          }
        },
        {
          "label": "커플",
          "desc": "해변 분위기와 조용한 휴식이 중요해요.",
          "scores": {
            "onglang": 4,
            "baikhem": 4,
            "longbeach": 2
          }
        },
        {
          "label": "아이 동반 가족",
          "desc": "수영장, 조식, 셔틀, 테마파크가 중요해요.",
          "scores": {
            "ganhdau": 5,
            "longbeach": 4,
            "baikhem": 3
          }
        },
        {
          "label": "부모님 동반",
          "desc": "이동 피로와 숙소 컨디션이 중요해요.",
          "scores": {
            "longbeach": 4,
            "duongdong": 3,
            "baikhem": 2
          }
        }
      ]
    },
    {
      "title": "비행 시간은 어떤 편인가요?",
      "help": "도착·출국 시간이 애매하면 첫날과 마지막 날 위치가 중요합니다.",
      "options": [
        {
          "label": "밤 도착 또는 새벽 출국",
          "desc": "공항 이동을 줄이고 싶어요.",
          "scores": {
            "longbeach": 5,
            "duongdong": 4
          }
        },
        {
          "label": "낮 도착·낮 출국",
          "desc": "숙소 위치 선택이 비교적 자유로워요.",
          "scores": {
            "onglang": 2,
            "baikhem": 2,
            "ganhdau": 2,
            "longbeach": 2
          }
        },
        {
          "label": "3박 이상 여유 있어요",
          "desc": "숙소를 나누는 것도 괜찮아요.",
          "scores": {
            "ganhdau": 3,
            "baikhem": 3,
            "onglang": 2
          }
        }
      ]
    },
    {
      "title": "숙소 예산은 어떤 방향인가요?",
      "help": "같은 지역 안에서도 가격대가 크게 다릅니다.",
      "options": [
        {
          "label": "가성비가 중요해요",
          "desc": "숙박비와 이동비를 함께 줄이고 싶어요.",
          "scores": {
            "duongdong": 4,
            "longbeach": 3,
            "onglang": 2,
            "baisao": 1
          }
        },
        {
          "label": "중간 가격대가 좋아요",
          "desc": "위치와 컨디션의 균형을 원해요.",
          "scores": {
            "longbeach": 4,
            "onglang": 3,
            "duongdong": 3
          }
        },
        {
          "label": "숙소 만족도를 우선해요",
          "desc": "리조트와 객실 컨디션이 중요해요.",
          "scores": {
            "baikhem": 5,
            "ganhdau": 4,
            "longbeach": 4,
            "onglang": 2
          }
        }
      ]
    }
  ]
};

const areaResultBadges = {
  "duongdong": "야시장과 바다 산책이 가까운 첫 시작",
  "longbeach": "리조트 휴식과 공항 동선의 균형",
  "onglang": "조용한 해변에서 여유롭게 쉬기 좋은 곳",
  "ganhdau": "테마파크와 북부 리조트를 잇는 즐거움",
  "baikhem": "케이블카와 선셋타운이 가까운 남쪽 휴식",
  "baisao": "사오비치와 로컬 바다를 따라 쉬는 하루"
};

const hotelAccessPresets = {
  "duongdong": {
    "station": "야시장·롱비치 북부 접근",
    "airport": "푸꾸옥공항 차량 약 15~25분"
  },
  "longbeach": {
    "station": "롱비치·즈엉토 리조트권",
    "airport": "푸꾸옥공항 차량 약 10~20분"
  },
  "onglang": {
    "station": "옹랑·끄어깐 해변권",
    "airport": "푸꾸옥공항 차량 약 25~40분"
  },
  "ganhdau": {
    "station": "북부 테마파크·그랜드월드 접근",
    "airport": "푸꾸옥공항 차량 약 45~60분"
  },
  "baikhem": {
    "station": "바이켐·선셋타운 접근",
    "airport": "푸꾸옥공항 차량 약 25~40분"
  },
  "baisao": {
    "station": "사오비치·함닌 접근",
    "airport": "푸꾸옥공항 차량 약 25~40분"
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
const detailBackBtn = document.getElementById("detailBackBtn");
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
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
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
  document.getElementById("resultPage")?.classList.add("is-detail-open");
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


function getSurveyExitUrl() {
  const destinationSlug = cityConfig.destinationSlug || "";
  return destinationSlug ? `/destinations/${destinationSlug}/` : "/destinations/";
}

function exitSurveyPage() {
  const fallbackUrl = getSurveyExitUrl();

  try {
    const currentPath = window.location.pathname.replace(/\/+$/, "");
    const referrerUrl = document.referrer ? new URL(document.referrer) : null;
    const referrerPath = referrerUrl ? referrerUrl.pathname.replace(/\/+$/, "") : "";

    if (referrerPath && referrerPath !== currentPath && window.history.length > 1) {
      window.history.back();
      return;
    }
  } catch (error) {
    // referrer parsing can fail for unusual schemes. Use the city page fallback below.
  }

  window.location.href = fallbackUrl;
}

function closeDetailedView() {
  const detailSection = document.getElementById("detailedInfoSection");
  const summaryCard = document.getElementById("simpleSummaryCard");

  if (summaryCard) summaryCard.style.display = "flex";
  if (detailSection) detailSection.style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
  resetTabs(0);
  document.getElementById("mainScrollBody")?.scrollTo({ top: 0, behavior: "smooth" });
}

function closeResultView() {
  exitSurveyPage();
}

function resetSurvey() {
  currentQuestionIndex = 0;
  answers = new Array(cityConfig.questions.length).fill(null);
  lastRankedAreas = [];
  lastTopArea = null;
  renderQuestion();
  document.getElementById("simpleSummaryCard").style.display = "flex";
  document.getElementById("detailedInfoSection").style.display = "none";
  document.getElementById("resultPage")?.classList.remove("is-detail-open");
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
detailBackBtn?.addEventListener("click", closeDetailedView);
hotelTabBtn?.addEventListener("click", goToHotelTab);

document.querySelectorAll(".tab-btn").forEach((button, index) => {
  button.addEventListener("click", () => switchTab(index, button));
});

renderQuestion();
