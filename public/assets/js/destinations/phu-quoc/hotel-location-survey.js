/* Phu Quoc hotel location survey logic. */
const cityConfig = {
  "cityName": "푸꾸옥",
  "destinationSlug": "phu-quoc",
  "areas": {
    "duongdong": {
      "name": "즈엉동·롱비치 북부",
      "summary": "푸꾸옥을 처음 방문하거나 일정이 짧다면 가장 이해하기 쉬운 기준점입니다.",
      "leadTitle": "첫 여행 · 야시장 · 식당 동선",
      "leadText": "야시장, 식당, 마사지, 투어 픽업, 서쪽 해변을 한 번에 묶기 좋습니다. 공항과도 비교적 가까워 밤 도착·짧은 일정에서 이동 피로를 줄이기 좋습니다.",
      "compareGood": "푸꾸옥을 처음 방문하거나 일정이 짧다면 가장 이해하기 쉬운 기준점입니다.",
      "compareCaution": "중심부 호텔은 해변 프라이빗감이 약할 수 있어 수영장·해변 접근 후기를 확인하세요.",
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
        "야시장 바로 앞보다 해변·중심 사이에 잡으면 밤 소음과 이동 편의의 균형이 좋습니다.",
        "중심부 호텔은 해변 프라이빗감이 약할 수 있어 수영장·해변 접근 후기를 확인하세요."
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
          "reason": "야시장과 중심 식당 동선을 짧게 묶기 좋은 도심형 호텔 후보입니다.",
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
          "reason": "중심 접근성과 해변 휴식을 함께 보고 싶은 일정에 어울립니다.",
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
          "reason": "야시장 접근과 리조트형 휴식을 함께 비교하기 좋은 오래된 대표 후보입니다.",
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
      "summary": "해변 휴식과 공항 접근, 리조트 시설을 균형 있게 보고 싶을 때 편합니다.",
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
          "reason": "수영장, 해변, 부대시설을 함께 보는 가족·커플 여행에 비교하기 좋습니다.",
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
          "reason": "공항 접근, 해변, 가족형 객실을 균형 있게 비교할 수 있는 후보입니다.",
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
          "reason": "롱비치 해변 접근과 가격·컨디션 균형을 함께 보고 싶을 때 좋습니다.",
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
          "reason": "공항과 중심 접근을 크게 잃지 않으면서 리조트 만족도를 챙기기 좋은 후보입니다.",
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
      "summary": "중심의 번잡함을 줄이고 해변에서 천천히 쉬고 싶은 여행자에게 잘 맞습니다.",
      "leadTitle": "조용한 해변 · 감성 리조트 · 커플",
      "leadText": "옹랑과 끄어깐은 푸꾸옥의 차분한 해변 분위기를 느끼기 좋은 권역입니다. 맛집·상점은 중심보다 적지만 숙소에서 쉬는 시간이 많은 일정에서는 만족도가 높습니다.",
      "compareGood": "중심의 번잡함을 줄이고 해변에서 천천히 쉬고 싶은 여행자에게 잘 맞습니다.",
      "compareCaution": "해변 접근이 리조트별로 다르므로 “오션뷰”보다 실제 해변 도보 동선을 먼저 보세요.",
      "decision": "조용함이 1순위라면 옹랑·끄어깐이 가장 먼저 볼 권역입니다.",
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
        "숙소 밖 식당을 자주 이용할 계획이면 주변 도보 식당과 그랩 호출 가능성을 확인하세요.",
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
          "reason": "옹랑의 차분한 해변 분위기를 비교적 실속 있게 경험하기 좋은 후보입니다.",
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
          "reason": "프라이빗한 해변감과 조용한 숙소 분위기를 중요하게 볼 때 비교해볼 만합니다.",
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
      "summary": "빈원더스, 그랜드월드, 사파리, 대형 리조트를 한 번에 묶는 북부 휴양권입니다.",
      "leadTitle": "북부 리조트 · 빈원더스 · 가족 여행",
      "leadText": "푸꾸옥 북부는 대형 리조트와 테마파크형 일정에 강합니다. 아이와 함께 리조트와 놀이시설을 이용하거나, 숙소 안에서 오래 머무는 여행에 특히 편합니다.",
      "compareGood": "빈원더스, 그랜드월드, 사파리, 대형 리조트를 한 번에 묶는 북부 휴양권입니다.",
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
          "reason": "그랜드월드와 북부 테마파크 동선을 함께 보기 좋은 대형 리조트 후보입니다.",
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
          "reason": "북부 해변과 리조트 부대시설을 함께 원하는 가족 여행에 비교하기 좋습니다.",
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
          "reason": "북부 리조트권에서 시설과 이동 편의를 함께 비교할 수 있습니다.",
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
      "summary": "혼똔 케이블카, 선셋타운, 남부 섬투어와 고급 리조트를 함께 보는 권역입니다.",
      "leadTitle": "남부 럭셔리 · 케이블카 · 섬투어",
      "leadText": "푸꾸옥 남부는 켐비치, 안터이항, 선셋타운, 혼똔 케이블카 동선과 잘 맞습니다. 리조트 체류와 남부 액티비티를 묶기 좋지만 즈엉동·북부 이동은 따로 계산해야 합니다.",
      "compareGood": "혼똔 케이블카, 선셋타운, 남부 섬투어와 고급 리조트를 함께 보는 권역입니다.",
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
          "reason": "가족·커플 모두에게 남부 해변과 리조트 체류를 함께 제안하기 좋은 후보입니다.",
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
          "reason": "켐비치 접근성과 레지던스형 편의성을 함께 보는 가족·실속 여행에 좋습니다.",
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
          "reason": "선셋타운 야간 분위기와 남부 액티비티를 함께 즐기고 싶을 때 비교하기 좋습니다.",
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
      "summary": "숙박 1순위라기보다 사오비치, 함닌, 로컬 식당을 일정에 넣을 때 이해하면 좋은 권역입니다.",
      "leadTitle": "동남부 해변 · 로컬 식당 · 당일 이동",
      "leadText": "사오비치와 함닌은 푸꾸옥의 다른 얼굴을 보여주는 동남부·동부 동선입니다. 숙소 선택지는 중심·북부·남부보다 제한적이지만, 하루 코스로 넣으면 해변과 로컬 식사를 함께 즐기기 좋습니다.",
      "compareGood": "숙박 1순위라기보다 사오비치, 함닌, 로컬 식당을 일정에 넣을 때 이해하면 좋은 권역입니다.",
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
        "숙박보다 당일 이동지로 보는 편이 안전합니다. 숙박한다면 주변 식당과 이동 수단을 먼저 확인하세요.",
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
          "reason": "바이켐 주변에서 숙박비 부담을 낮춰 남부 일정을 잡고 싶을 때 비교하기 좋습니다.",
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
          "reason": "켐비치 접근성과 레지던스형 편의성을 함께 보는 가족·실속 여행에 좋습니다.",
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
          "reason": "가족·커플 모두에게 남부 해변과 리조트 체류를 함께 제안하기 좋은 후보입니다.",
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
          "reason": "선셋타운 야간 분위기와 남부 액티비티를 함께 즐기고 싶을 때 비교하기 좋습니다.",
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
(function () {
  let currentQuestionIndex = 0;
  let answers = new Array(cityConfig.questions.length).fill(null);
  const $ = (id) => document.getElementById(id);
  const locationPage = $('locationPage');
  const surveyWrap = document.querySelector('.wt-survey-wrap');
  const surveyView = $('surveyView');
  const resultView = $('resultView');
  const startSurveyBtn = $('startSurveyBtn');
  const backBtn = $('backBtn');
  const questionCount = $('questionCount');
  const progressText = $('progressText');
  const progressBar = $('progressBar');
  const progressFill = $('progressFill');
  const questionTitle = $('questionTitle');
  const questionHelp = $('questionHelp');
  const optionsArea = $('optionsArea');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');
  const resetBtn = $('resetBtn');
  const setText = (id, value) => { const el = $(id); if (el) el.textContent = value || ''; };
  const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  function getAnsweredPercent() {
    if (!cityConfig.questions.length) return 0;
    return Math.round((currentQuestionIndex / cityConfig.questions.length) * 100);
  }

  function getProgressMessage() {
    if (currentQuestionIndex === 0) return '가볍게 시작해볼까요?';
    if (currentQuestionIndex >= cityConfig.questions.length - 2) return '거의 다 왔어요';
    return '내 여행 스타일을 맞춰보는 중입니다';
  }

  function getOptionTitle(option) {
    return option?.title || option?.label || '';
  }

  function startSurvey() {
    locationPage?.classList.add('is-survey-started');
    locationPage?.classList.remove('is-result-mode');
    surveyWrap?.classList.add('is-survey-started');
    surveyWrap?.classList.remove('is-result-mode');
    resultView?.classList.remove('is-active');
    surveyView.style.display = 'block';
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeSurveyToStart() {
    currentQuestionIndex = 0;
    answers = new Array(cityConfig.questions.length).fill(null);
    resultView?.classList.remove('is-active');
    surveyWrap?.classList.remove('is-result-mode');
    surveyWrap?.classList.remove('is-survey-started');
    locationPage?.classList.remove('is-result-mode');
    locationPage?.classList.remove('is-survey-started');
    surveyView.style.display = 'block';
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderQuestion() {
    const question = cityConfig.questions[currentQuestionIndex];
    const selectedIndex = answers[currentQuestionIndex];
    const percent = getAnsweredPercent();

    questionCount.textContent = `${currentQuestionIndex + 1} / ${cityConfig.questions.length}`;
    progressText.textContent = getProgressMessage();
    progressFill.style.width = `${percent}%`;
    progressBar.setAttribute('aria-valuenow', String(percent));

    questionTitle.textContent = question.title;
    questionHelp.textContent = question.help || '';
    optionsArea.innerHTML = '';

    question.options.forEach((option, optionIndex) => {
      const button = document.createElement('button');
      const title = document.createElement('span');

      button.type = 'button';
      button.className = 'wt-option';
      button.setAttribute('aria-pressed', selectedIndex === optionIndex ? 'true' : 'false');

      if (selectedIndex === optionIndex) {
        button.classList.add('is-selected');
      }

      title.className = 'wt-option-title';
      title.textContent = getOptionTitle(option);

      button.appendChild(title);
      button.addEventListener('click', () => {
        answers[currentQuestionIndex] = optionIndex;
        renderQuestion();
      });

      optionsArea.appendChild(button);
    });

    prevBtn.disabled = false;
    prevBtn.textContent = currentQuestionIndex === 0 ? '닫기' : '이전';
    nextBtn.disabled = selectedIndex === null;
    nextBtn.textContent = currentQuestionIndex === cityConfig.questions.length - 1 ? '결과 보기' : '다음';
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
    const scores = Object.fromEntries(Object.keys(cityConfig.areas).map(key => [key, 0]));
    answers.forEach((answer, qIndex) => { const option = cityConfig.questions[qIndex].options[answer]; Object.entries(option?.scores || {}).forEach(([key, value]) => { scores[key] = (scores[key] || 0) + Number(value || 0); }); });
    return Object.entries(cityConfig.areas).map(([key, area]) => ({ key, score: scores[key] || 0, ...area })).sort((a,b) => b.score - a.score);
  }
  function renderReasons(area) {
    const list = $('reasonCardList'); if (!list) return; list.innerHTML = '';
    [
      {title:'여행 목적과 맞습니다', text: area.compareGood},
      {title:'예약 전 확인할 점이 분명합니다', text: area.compareCaution},
      {title:'이런 여행자에게 특히 좋습니다', text: (area.bestFor || []).join(' · ')},
      {title:'피해야 할 경우도 있습니다', text: (area.notFor || []).join(' · ')}
    ].forEach((item, index) => { const article = document.createElement('article'); article.className = 'wt-reason-card'; article.innerHTML = `<span class="wt-reason-number">${index + 1}</span><h4>${escapeHtml(item.title)}</h4><p>${escapeHtml(item.text)}</p>`; list.appendChild(article); });
  }
  function renderHotelCards(area) {
    const section = document.getElementById('hotelRecommendSection');
    const hotelCardList = document.getElementById('hotelCardList');
    const hotels = Array.isArray(area.hotels) ? area.hotels.slice(0, 5) : [];

    if (!section || !hotelCardList) return;

    if (hotels.length === 0) {
      section.style.display = 'none';
      hotelCardList.innerHTML = '';
      return;
    }

    section.style.display = 'block';
    setText('hotelSectionTitle', `${area.name}에서 먼저 비교해볼 호텔 5곳`);
    setText('hotelSectionDesc', '추천된 위치를 기준으로 먼저 비교해볼 만한 호텔 후보입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 확인하세요.');
    hotelCardList.innerHTML = '';

    hotels.forEach((hotel, index) => {
      const article = document.createElement('article');
      const top = document.createElement('div');
      const rank = document.createElement('span');
      const tag = document.createElement('span');
      const name = document.createElement('h4');
      const location = document.createElement('p');
      const reason = document.createElement('p');
      const meta = document.createElement('div');
      const footer = document.createElement('div');
      const linkWrap = document.createElement('div');
      const link = document.createElement('a');

      article.className = 'wt-hotel-card';
      top.className = 'wt-hotel-card-top';
      rank.className = 'wt-hotel-rank';
      tag.className = 'wt-hotel-tag';
      name.className = 'wt-hotel-name';
      location.className = 'wt-hotel-location';
      reason.className = 'wt-hotel-reason';
      meta.className = 'wt-hotel-meta';
      footer.className = 'wt-hotel-card-footer';
      linkWrap.className = 'wt-hotel-link-wrap';
      link.className = 'wt-hotel-link';

      rank.textContent = `${index + 1}`;
      tag.textContent = hotel.tag || '추천 후보';
      name.textContent = hotel.name;
      location.textContent = hotel.location;
      reason.textContent = hotel.reason;
      link.href = hotel.url || '#';
      link.textContent = '잔여 객실 확인';
      link.setAttribute('aria-label', `${hotel.name} 잔여 객실 확인`);

      (hotel.meta || []).forEach((item) => {
        const chip = document.createElement('span');
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

  function renderRelatedPosts(area) {
    const list = $('relatedPostList'); if (!list) return;
    setText('relatedPostTitle', `${area.name} 관련 글`);
    setText('relatedPostDesc', '해당 지역 호텔 추천 글이 등록되면 함께 비교해보세요.');
    list.innerHTML = (area.links || []).map(link => `<li><a href="${escapeHtml(link.url)}">${escapeHtml(link.title)}</a></li>`).join('');
  }
  function showResult() {
    const ranked = calculateScores();
    const topArea = ranked[0];

    locationPage?.classList.add('is-survey-started');
    locationPage?.classList.add('is-result-mode');
    surveyView.style.display = 'none';
    resultView.classList.add('is-active');
    surveyWrap?.classList.add('is-survey-started');
    surveyWrap?.classList.add('is-result-mode');

    setText('resultTitle', topArea.name);
    setText('resultSummary', topArea.summary);
    setText('resultLeadTitle', topArea.leadTitle);
    setText('resultLeadText', topArea.leadText);
    setText('resultWhyText', `${topArea.name}은 이번 답변에서 가장 높은 점수를 받은 숙소 권역입니다.`);
    setText('decisionConclusionTitle', '결론');
    setText('decisionConclusionText', topArea.decision);

    renderReasons(topArea);
    renderHotelCards(topArea);
    renderRelatedPosts(topArea);

    progressText.textContent = '추천 결과가 나왔어요!';
    progressFill.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', '100');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetSurvey() { currentQuestionIndex = 0; answers = new Array(cityConfig.questions.length).fill(null); resultView.classList.remove('is-active'); surveyWrap?.classList.remove('is-result-mode'); surveyWrap?.classList.remove('is-survey-started'); locationPage?.classList.remove('is-result-mode'); locationPage?.classList.remove('is-survey-started'); surveyView.style.display = 'block'; renderQuestion(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  startSurveyBtn?.addEventListener('click', startSurvey); backBtn?.addEventListener('click', () => { if (window.history.length > 1) { window.history.back(); } else { window.location.href = `/destinations/${cityConfig.destinationSlug}/`; } }); nextBtn.addEventListener('click', goNext); prevBtn.addEventListener('click', goPrev); resetBtn.addEventListener('click', resetSurvey); renderQuestion();
})();
