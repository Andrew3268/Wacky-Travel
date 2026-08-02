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
          "url": "/post/phu-quoc-duong-dong-long-beach-hotels/"
        },
        {
          "title": "푸꾸옥 즈엉동 숙소 위치 가이드",
          "url": "/post/phu-quoc-duong-dong-long-beach-stay-guide/"
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
          "url": "/post/seashells-phu-quoc-hotel-and-spa/"
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
          "url": "/post/l-azure-resort-and-spa/"
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
          "url": "/post/saigon-phu-quoc-resort-and-spa/"
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
          "url": "/post/cassia-cottage/"
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
          "url": "/post/la-veranda-resort-phu-quoc-mgallery/"
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
          "url": "/post/phu-quoc-long-beach-duong-to-hotels/"
        },
        {
          "title": "푸꾸옥 롱비치 숙소 위치 가이드",
          "url": "/post/phu-quoc-long-beach-duong-to-stay-guide/"
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
          "url": "/post/intercontinental-phu-quoc-long-beach-resort/"
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
          "url": "/post/regent-phu-quoc/"
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
          "url": "/post/novotel-phu-quoc-resort/"
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
          "url": "/post/dusit-princess-moonrise-beach-resort/"
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
          "url": "/post/salinda-resort-phu-quoc-island/"
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
          "url": "/post/phu-quoc-ong-lang-cua-can-hotels/"
        },
        {
          "title": "푸꾸옥 옹랑 숙소 위치 가이드",
          "url": "/post/phu-quoc-ong-lang-cua-can-stay-guide/"
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
          "url": "/post/mango-bay-resort/"
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
          "url": "/post/phu-quoc-eco-beach-resort/"
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
          "url": "/post/chen-sea-resort-and-spa-phu-quoc/"
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
          "url": "/post/m-venpick-resort-waverly-phu-quoc/"
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
          "url": "/post/green-bay-phu-quoc-resort-and-spa/"
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
          "url": "/post/phu-quoc-ganh-dau-bai-dai-hotels/"
        },
        {
          "title": "푸꾸옥 바이다이 숙소 위치 가이드",
          "url": "/post/phu-quoc-ganh-dau-bai-dai-stay-guide/"
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
          "url": "/post/wyndham-grand-phu-quoc/"
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
          "url": "/post/crowne-plaza-phu-quoc-starbay/"
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
          "url": "/post/sheraton-phu-quoc-long-beach-resort/"
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
          "url": "/post/vinpearl-resort-and-spa-phu-quoc/"
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
          "url": "/post/radisson-blu-resort-phu-quoc/"
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
          "url": "/post/phu-quoc-bai-khem-an-thoi-hotels/"
        },
        {
          "title": "푸꾸옥 바이켐 숙소 위치 가이드",
          "url": "/post/phu-quoc-bai-khem-an-thoi-stay-guide/"
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
          "url": "/post/jw-marriott-phu-quoc-emerald-bay-resort-and-spa/"
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
          "url": "/post/new-world-phu-quoc-resort/"
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
          "url": "/post/premier-residences-phu-quoc-emerald-bay/"
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
          "url": "/post/la-festa-phu-quoc-curio-collection-by-hilton/"
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
          "url": "/post/premier-village-phu-quoc-resort/"
        }
      ]
    },
  },
  "questions": [
    {
      "title": "이번 푸꾸옥 여행에서 가장 중요한 것은 무엇인가요?",
      "help": "가장 우선순위가 높은 여행 목적을 골라주세요.",
      "options": [
        {
          "title": "처음이라 이동이 쉬운 곳",
          "desc": "공항, 야시장, 식당, 투어 픽업이 중요해요.",
          "scores": {
            "duongdong": 5,
            "longbeach": 3
          }
        },
        {
          "title": "해변 리조트에서 쉬기",
          "desc": "수영장과 해변에서 머무는 시간이 길어요.",
          "scores": {
            "longbeach": 5,
            "onglang": 4,
            "baikhem": 4
          }
        },
        {
          "title": "아이와 테마파크",
          "desc": "빈원더스, 사파리, 그랜드월드를 보고 싶어요.",
          "scores": {
            "ganhdau": 6,
            "longbeach": 2
          }
        },
        {
          "title": "케이블카와 섬투어",
          "desc": "혼똔 케이블카와 남부 섬투어가 핵심이에요.",
          "scores": {
            "baikhem": 6,
          }
        }
      ]
    },
    {
      "title": "숙소 밖 식당과 야시장 접근은 얼마나 중요한가요?",
      "help": "매일 저녁 외부 식당을 이용할 계획인지 생각해보세요.",
      "options": [
        {
          "title": "매우 중요해요",
          "desc": "야시장과 식당을 자주 갈 예정입니다.",
          "scores": {
            "duongdong": 5,
            "longbeach": 2
          }
        },
        {
          "title": "가끔이면 충분해요",
          "desc": "택시로 한두 번 이동하는 건 괜찮아요.",
          "scores": {
            "longbeach": 3,
            "onglang": 2,
            "baikhem": 2
          }
        },
        {
          "title": "리조트 안에서 해결해도 돼요",
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
          "title": "중심 편의가 더 중요해요",
          "desc": "약간 번잡해도 이동이 편한 곳이 좋아요.",
          "scores": {
            "duongdong": 5,
            "longbeach": 2
          }
        },
        {
          "title": "적당히 조용하면 돼요",
          "desc": "중심까지 택시 이동이 가능하면 괜찮아요.",
          "scores": {
            "longbeach": 4,
            "baikhem": 2,
            "onglang": 2
          }
        },
        {
          "title": "조용한 휴식이 1순위예요",
          "desc": "주변이 차분하고 숙소에서 오래 쉬고 싶어요.",
          "scores": {
            "onglang": 6,
            "baikhem": 3,
          }
        }
      ]
    },
    {
      "title": "북부 테마파크 일정이 있나요?",
      "help": "빈원더스, 빈펄 사파리, 그랜드월드 방문 여부를 골라주세요.",
      "options": [
        {
          "title": "네, 꼭 갈 예정이에요",
          "desc": "북부 일정이 여행의 핵심입니다.",
          "scores": {
            "ganhdau": 6,
            "longbeach": 1
          }
        },
        {
          "title": "하루 정도 고민 중이에요",
          "desc": "숙소 위치에 따라 갈 수도 있어요.",
          "scores": {
            "ganhdau": 3,
            "longbeach": 2,
            "duongdong": 1
          }
        },
        {
          "title": "아니요",
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
          "title": "남부 일정이 핵심이에요",
          "desc": "케이블카와 섬투어를 꼭 넣고 싶어요.",
          "scores": {
            "baikhem": 6,
          }
        },
        {
          "title": "하루 정도만 갈래요",
          "desc": "숙소는 다른 곳이어도 괜찮아요.",
          "scores": {
            "longbeach": 3,
            "duongdong": 2,
            "baikhem": 2
          }
        },
        {
          "title": "해변 휴식 위주예요",
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
          "title": "혼자 또는 친구",
          "desc": "식당, 이동, 액티비티 균형이 중요해요.",
          "scores": {
            "duongdong": 3,
            "longbeach": 3,
            "baikhem": 2
          }
        },
        {
          "title": "커플",
          "desc": "해변 분위기와 조용한 휴식이 중요해요.",
          "scores": {
            "onglang": 4,
            "baikhem": 4,
            "longbeach": 2
          }
        },
        {
          "title": "아이 동반 가족",
          "desc": "수영장, 조식, 셔틀, 테마파크가 중요해요.",
          "scores": {
            "ganhdau": 5,
            "longbeach": 4,
            "baikhem": 3
          }
        },
        {
          "title": "부모님 동반",
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
          "title": "밤 도착 또는 새벽 출국",
          "desc": "공항 이동을 줄이고 싶어요.",
          "scores": {
            "longbeach": 5,
            "duongdong": 4
          }
        },
        {
          "title": "낮 도착·낮 출국",
          "desc": "숙소 위치 선택이 비교적 자유로워요.",
          "scores": {
            "onglang": 2,
            "baikhem": 2,
            "ganhdau": 2,
            "longbeach": 2
          }
        },
        {
          "title": "3박 이상 여유 있어요",
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
          "title": "가성비가 중요해요",
          "desc": "숙박비와 이동비를 함께 줄이고 싶어요.",
          "scores": {
            "duongdong": 4,
            "longbeach": 3,
            "onglang": 2,
          }
        },
        {
          "title": "중간 가격대가 좋아요",
          "desc": "위치와 컨디션의 균형을 원해요.",
          "scores": {
            "longbeach": 4,
            "onglang": 3,
            "duongdong": 3
          }
        },
        {
          "title": "숙소 만족도를 우선해요",
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
