/*
 * 오키나와 hotel location survey logic.
 * Modernized with the Fukuoka V23 survey UI flow.
 */
const cityConfig = {
  "cityName": "오키나와",
  "destinationSlug": "okinawa",
  "postContentType": "top5_series",
  "areas": {
    "nahaKokusai": {
      "name": "나하 & 국제거리",
      "regionSlug": "naha-kokusai-dori",
      "regionSlugAliases": ["나하 & 국제거리", "나하·국제거리", "나하 국제거리"],
      "label": "공항 접근과 렌터카 없는 일정에 가장 안정적인 위치",
      "summary": "공항 도착 후 복잡한 이동 없이 오키나와의 첫인상을 가볍게 열고, 시장과 식당, 국제거리의 활기를 가까이 두고 싶은 당신에게 잘 맞는 첫날의 중심 지역입니다.",
      "leadTitle": "첫날과 마지막 날 동선을 줄이기 좋습니다.",
      "leadText": "공항, 유이레일, 국제거리, 도마리항 접근성이 좋아 체크인과 귀국일 이동이 편합니다. 케라마 제도 투어처럼 항구 집결이 있는 일정에도 잘 맞습니다.",
      "stayRange": [
        "유이레일역 도보권",
        "국제거리와 너무 멀지 않은 위치",
        "도마리항 투어가 있다면 항구 접근성 확인"
      ],
      "avoidRange": [
        "해변 리조트 휴식이 주목적인데 나하에만 묵는 선택",
        "북부 관광이 매일 있는데 나하에 고정하는 선택",
        "렌터카가 있는데 주차비가 높은 중심부 숙소"
      ],
      "bestFor": [
        "렌터카 없는 여행",
        "2박 3일",
        "공항 접근",
        "섬 투어"
      ],
      "notFor": [
        "해변 리조트 휴식",
        "북부 장기 드라이브",
        "조용한 바다 숙소"
      ],
      "bookingTips": [
        "공항 복귀 시간이 이른 날에는 나하 숙박이 안전합니다.",
        "국제거리 한복판은 편하지만 소음 후기도 함께 확인하세요.",
        "렌터카가 있다면 주차비와 주차장 위치를 꼭 확인하세요."
      ],
      "chips": [
        "공항 접근",
        "유이레일",
        "짧은 일정",
        "렌터카 없음"
      ],
      "compareGood": "공항, 도심 식당, 항구 이동을 단순하게 만들기 쉽습니다.",
      "compareCaution": "오키나와다운 해변 리조트 분위기는 약합니다.",
      "mismatchNote": "바다 휴식과 리조트 체류를 더 중요하게 봤다면 나하는 2순위일 수 있습니다.",
      "links": [
        {
          "title": "오키나와 첫 여행 호텔 추천 TOP5",
          "url": "/post/okinawa-first-trip-hotels"
        },
        {
          "title": "나하 국제거리 근처 호텔 추천 TOP5",
          "url": "/post/okinawa-naha-hotels"
        },
        {
          "title": "렌터카 없는 오키나와 숙소 위치 추천",
          "url": "/post/okinawa-without-rental-car-hotels"
        }
      ],
      "hotels": [
        {
          "name": "나하 국제거리 주변 숙소",
          "tag": "첫 여행",
          "location": "나하 중심",
          "reason": "렌터카 없이 이동하거나 짧은 일정에서 가장 안정적인 후보입니다.",
          "meta": [
            "공항",
            "유이레일",
            "식당"
          ],
          "url": "/destinations/okinawa/first-trip/"
        },
        {
          "name": "나하 신도심 주변 숙소",
          "tag": "실속형",
          "location": "오모로마치 생활권",
          "reason": "쇼핑과 모노레일 접근성을 같이 보고 싶은 여행자에게 좋습니다.",
          "meta": [
            "쇼핑",
            "실속",
            "모노레일"
          ],
          "url": "/destinations/okinawa/value-hotel/"
        },
        {
          "name": "도마리항 접근형 숙소",
          "tag": "섬 투어",
          "location": "나하 항구 권역",
          "reason": "케라마 제도 투어 전후 일정에 편합니다.",
          "meta": [
            "케라마",
            "투어",
            "항구"
          ],
          "url": "/destinations/okinawa/near-trip/"
        },
        {
          "name": "공항 접근형 숙소",
          "tag": "귀국 전",
          "location": "나하·공항 생활권",
          "reason": "아침 비행기나 짧은 일정에서 복귀 부담을 줄여줍니다.",
          "meta": [
            "공항",
            "귀국일",
            "짧은 일정"
          ],
          "url": "/destinations/okinawa/hotel-guide/"
        },
        {
          "name": "나하 조용한 외곽 숙소",
          "tag": "도심 대안",
          "location": "나하 외곽",
          "reason": "도심 접근은 유지하면서 국제거리 한복판은 피하고 싶을 때 후보가 됩니다.",
          "meta": [
            "조용함",
            "도심 접근",
            "실속"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        }
      ]
    },
    "chatanAmericanVillage": {
      "name": "차탄 & 아메리칸빌리지",
      "regionSlug": "chatan-american-village",
      "regionSlugAliases": ["차탄 & 아메리칸빌리지", "차탄·아메리칸빌리지", "차탄 아메리칸빌리지"],
      "label": "바다 분위기와 편의시설을 같이 잡기 좋은 중부 거점",
      "summary": "바다 노을과 이국적인 거리, 식당과 카페가 한데 어우러진 분위기 속에서 오키나와다운 저녁 시간을 즐기고 싶은 당신에게 잘 어울리는 해안 지역입니다.",
      "leadTitle": "선셋 산책과 저녁 식사 동선이 짧습니다.",
      "leadText": "아메리칸빌리지 주변은 식당, 카페, 쇼핑, 바다 산책을 한 번에 묶기 좋습니다. 렌터카가 있으면 나하와 북부 사이의 균형형 거점으로도 좋습니다.",
      "stayRange": [
        "아메리칸빌리지 도보 또는 짧은 차량 이동권",
        "주차장 접근성이 좋은 숙소",
        "선셋 산책 후 복귀가 쉬운 위치"
      ],
      "avoidRange": [
        "숙박비만 보고 중심부 소음 후기를 놓치는 선택",
        "북부를 매일 왕복할 계획인데 차탄에만 고정하는 선택",
        "렌터카가 없는데 외곽 숙소를 고르는 선택"
      ],
      "bestFor": [
        "커플",
        "가족",
        "중부 거점",
        "저녁 산책"
      ],
      "notFor": [
        "완전한 리조트 휴식",
        "렌터카 없는 초단기 여행",
        "조용한 외딴 해변"
      ],
      "bookingTips": [
        "주말에는 주차와 도로 혼잡을 함께 고려하세요.",
        "아메리칸빌리지 중심과 숙소의 실제 도보 경로를 확인하세요.",
        "해변 물놀이보다 산책·식당·카페 중심 지역이라는 점을 이해하고 고르세요."
      ],
      "chips": [
        "선셋",
        "식당",
        "카페",
        "중부"
      ],
      "compareGood": "바다 분위기와 생활 편의를 함께 챙기기 쉽습니다.",
      "compareCaution": "성수기와 주말에는 가격과 혼잡도가 올라갈 수 있습니다.",
      "mismatchNote": "조용한 휴식이나 북부 집중 일정이 더 중요하다면 차탄은 중간 지점일 수 있습니다.",
      "links": [
        {
          "title": "차탄 아메리칸빌리지 호텔 추천 TOP5",
          "url": "/post/okinawa-chatan-hotels"
        },
        {
          "title": "오키나와 커플 여행 호텔 추천 TOP5",
          "url": "/post/okinawa-couple-hotels"
        },
        {
          "title": "오키나와 가족 여행 호텔 추천 TOP5",
          "url": "/post/okinawa-family-hotels"
        }
      ],
      "hotels": [
        {
          "name": "차탄 아메리칸빌리지 주변 숙소",
          "tag": "중부 균형",
          "location": "차탄 중심",
          "reason": "식당, 카페, 산책, 쇼핑이 가까워 첫 여행과 가족 여행 모두 편합니다.",
          "meta": [
            "선셋",
            "식당",
            "쇼핑"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "차탄 외곽 숙소",
          "tag": "실속형",
          "location": "차탄 외곽",
          "reason": "아메리칸빌리지 접근성은 살리고 가격 부담은 낮추고 싶을 때 좋습니다.",
          "meta": [
            "가성비",
            "주차",
            "중부"
          ],
          "url": "/destinations/okinawa/value-hotel/"
        },
        {
          "name": "기노완·우라소에 접근형 숙소",
          "tag": "생활 편의",
          "location": "중남부 생활권",
          "reason": "나하와 차탄 사이에서 이동 균형을 보고 싶을 때 후보가 됩니다.",
          "meta": [
            "중간 거점",
            "실속",
            "렌터카"
          ],
          "url": "/destinations/okinawa/value-hotel/"
        },
        {
          "name": "차탄 가족형 숙소",
          "tag": "가족형",
          "location": "차탄 생활권",
          "reason": "아이와 저녁 식사, 산책, 쇼핑을 짧게 연결하기 좋습니다.",
          "meta": [
            "가족",
            "식당",
            "산책"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "차탄 선셋 숙소",
          "tag": "커플형",
          "location": "해안 산책권",
          "reason": "저녁 바다 분위기를 편하게 즐기고 싶은 커플 여행에 어울립니다.",
          "meta": [
            "커플",
            "선셋",
            "카페"
          ],
          "url": "/destinations/okinawa/first-trip/"
        }
      ]
    },
    "onnaResort": {
      "name": "온나손 리조트권",
      "regionSlug": "onnason-resort",
      "regionSlugAliases": ["온나손 리조트권", "온나손", "온나 리조트"],
      "label": "해변 리조트와 바다 액티비티에 가장 잘 맞는 위치",
      "summary": "에메랄드빛 바다 앞에서 일정을 많이 채우기보다 수영장과 객실, 해변에서 천천히 쉬고 싶은 당신에게 잘 맞는 리조트 중심 지역입니다.",
      "leadTitle": "호텔 체류 만족도를 높이기 좋습니다.",
      "leadText": "온나손은 서해안 리조트권으로 해변, 수영장, 스노클링, 만좌모, 푸른동굴 동선과 잘 맞습니다. 렌터카가 있으면 오키나와다운 바다 휴식을 만들기 좋습니다.",
      "stayRange": [
        "해변 접근성과 수영장 운영 확인",
        "호텔 식사와 주변 식당 거리 확인",
        "렌터카 주차와 액티비티 집결지 확인"
      ],
      "avoidRange": [
        "렌터카 없이 식당 이동을 고려하지 않는 선택",
        "수족관과 남부를 매일 왕복하는 선택",
        "가격만 보고 리조트 시설을 거의 이용하지 않는 선택"
      ],
      "bestFor": [
        "리조트 휴식",
        "커플",
        "가족",
        "스노클링"
      ],
      "notFor": [
        "렌터카 없는 도시 여행",
        "공항 접근 우선",
        "짧은 나하 중심 일정"
      ],
      "bookingTips": [
        "호텔 안에서 보낼 시간이 많을수록 만족도가 올라갑니다.",
        "주변 식당이 적을 수 있어 조식·석식 옵션을 확인하세요.",
        "해변 접근성과 실제 물놀이 가능 여부를 구분해서 보세요."
      ],
      "chips": [
        "리조트",
        "해변",
        "수영장",
        "액티비티"
      ],
      "compareGood": "해변 휴식과 호텔 체류 만족도를 가장 크게 만들기 쉽습니다.",
      "compareCaution": "렌터카 없이 이동하면 식사와 관광 동선이 제한될 수 있습니다.",
      "mismatchNote": "도시 편의와 공항 접근이 더 중요하다면 나하나 차탄이 더 편합니다.",
      "links": [
        {
          "title": "온나손 리조트 호텔 추천 TOP5",
          "url": "/post/okinawa-onna-resort-hotels"
        },
        {
          "title": "오키나와 리조트 호텔 추천 TOP5",
          "url": "/post/okinawa-resort-hotels"
        },
        {
          "title": "오키나와 스노클링 숙소 위치 추천",
          "url": "/post/okinawa-snorkeling-hotels"
        }
      ],
      "hotels": [
        {
          "name": "온나손 해변 리조트 숙소",
          "tag": "리조트형",
          "location": "온나손 서해안",
          "reason": "오키나와다운 바다 휴식과 수영장 시간을 중요하게 볼 때 가장 먼저 비교할 후보입니다.",
          "meta": [
            "리조트",
            "해변",
            "수영장"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "만좌모 접근형 숙소",
          "tag": "드라이브형",
          "location": "온나손 북쪽",
          "reason": "리조트 휴식과 중북부 드라이브를 함께 보고 싶을 때 좋습니다.",
          "meta": [
            "드라이브",
            "리조트",
            "커플"
          ],
          "url": "/destinations/okinawa/near-trip/"
        },
        {
          "name": "푸른동굴 접근형 숙소",
          "tag": "액티비티",
          "location": "온나손·요미탄 사이",
          "reason": "스노클링과 다이빙 일정이 있다면 집결지 이동을 줄이기 좋습니다.",
          "meta": [
            "스노클링",
            "액티비티",
            "렌터카"
          ],
          "url": "/destinations/okinawa/near-trip/"
        },
        {
          "name": "온나손 가족 리조트 숙소",
          "tag": "가족형",
          "location": "온나손 리조트권",
          "reason": "아이와 호텔 안에서 쉬는 시간이 많은 가족 여행에 잘 맞습니다.",
          "meta": [
            "가족",
            "수영장",
            "해변"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "온나손 조용한 리조트 숙소",
          "tag": "휴식형",
          "location": "온나손 북쪽",
          "reason": "번잡한 상업지보다 호텔 안에서 조용히 쉬고 싶을 때 후보가 됩니다.",
          "meta": [
            "조용함",
            "휴식",
            "커플"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        }
      ]
    },
    "nagoMotobu": {
      "name": "나고 & 모토부",
      "regionSlug": "nago-motobu",
      "regionSlugAliases": ["나고 & 모토부", "나고·모토부", "나고 모토부"],
      "label": "북부 드라이브를 여유롭게 보기 좋은 위치",
      "summary": "츄라우미 수족관과 북부 자연, 드라이브 코스를 여유 있게 이어가며 오키나와의 넓은 풍경을 깊게 느끼고 싶은 당신에게 잘 어울리는 북부 거점입니다.",
      "leadTitle": "츄라우미 수족관과 코우리섬을 여유롭게 묶기 좋습니다.",
      "leadText": "나고·모토부는 츄라우미 수족관, 세소코섬, 코우리섬, 북부 자연을 보기 좋은 거점입니다. 가족 여행이나 3박 이상 일정이라면 하루 이상 머무는 방식이 편합니다.",
      "stayRange": [
        "수족관 또는 나고 시내 접근성 확인",
        "공항 복귀 전날은 남쪽 이동 고려",
        "주변 식당과 편의점 거리 확인"
      ],
      "avoidRange": [
        "짧은 2박 일정에 북부 고정 숙박",
        "아침 비행기 전날 북부 숙박",
        "남부 관광이 많은데 북부에만 묵는 선택"
      ],
      "bestFor": [
        "수족관",
        "북부 드라이브",
        "가족 여행",
        "3박 이상"
      ],
      "notFor": [
        "렌터카 없는 여행",
        "짧은 나하 중심 일정",
        "공항 접근 우선"
      ],
      "bookingTips": [
        "귀국일 전날에는 나하나 남부로 내려오는 편이 안전합니다.",
        "나고 시내는 식당 편의가 좋고 모토부는 수족관 접근성이 좋습니다.",
        "북부 숙박은 일정이 길수록 만족도가 높아집니다."
      ],
      "chips": [
        "수족관",
        "북부",
        "드라이브",
        "가족"
      ],
      "compareGood": "수족관과 북부 자연을 느긋하게 보기 좋습니다.",
      "compareCaution": "공항과 나하에서 거리가 있어 첫날·마지막 날 동선은 길어질 수 있습니다.",
      "mismatchNote": "짧은 일정과 공항 접근이 더 중요하다면 북부 숙박은 부담이 될 수 있습니다.",
      "links": [
        {
          "title": "츄라우미 수족관 근처 호텔 추천 TOP5",
          "url": "/post/okinawa-churaumi-hotels"
        },
        {
          "title": "오키나와 북부 호텔 추천 TOP5",
          "url": "/post/okinawa-north-hotels"
        },
        {
          "title": "코우리섬 여행 숙소 위치 추천",
          "url": "/post/okinawa-kouri-hotels"
        }
      ],
      "hotels": [
        {
          "name": "나고 시내 숙소",
          "tag": "북부 균형",
          "location": "나고 생활권",
          "reason": "북부 관광과 식당 접근성을 함께 챙기기 좋습니다.",
          "meta": [
            "북부",
            "식당",
            "렌터카"
          ],
          "url": "/destinations/okinawa/near-trip/"
        },
        {
          "name": "모토부 수족관 접근형 숙소",
          "tag": "수족관",
          "location": "모토부 권역",
          "reason": "츄라우미 수족관과 세소코섬을 여유롭게 보고 싶을 때 편합니다.",
          "meta": [
            "수족관",
            "가족",
            "북부"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "코우리섬 드라이브형 숙소",
          "tag": "드라이브",
          "location": "나고·나키진 권역",
          "reason": "북부 자연과 해안 드라이브를 즐기고 싶을 때 후보가 됩니다.",
          "meta": [
            "코우리섬",
            "드라이브",
            "자연"
          ],
          "url": "/destinations/okinawa/near-trip/"
        },
        {
          "name": "북부 가족형 숙소",
          "tag": "가족형",
          "location": "나고·모토부",
          "reason": "아이와 수족관 일정을 여유롭게 잡고 싶을 때 만족도가 높습니다.",
          "meta": [
            "가족",
            "수족관",
            "연박"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "모토부 조용한 숙소",
          "tag": "휴식형",
          "location": "모토부·나키진",
          "reason": "북부 자연과 조용한 바다 분위기를 함께 원할 때 좋습니다.",
          "meta": [
            "조용함",
            "자연",
            "재방문"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        }
      ]
    },
    "yomitanZanpa": {
      "name": "요미탄 & 잔파곶",
      "regionSlug": "yomitan-zanpamisaki",
      "regionSlugAliases": ["요미탄 & 잔파곶", "요미탄·잔파곶", "요미탄 잔파곶"],
      "label": "조용한 해변과 선셋을 즐기기 좋은 위치",
      "summary": "번잡한 중심지를 벗어나 조용한 바다와 로컬한 마을 분위기 속에서 여유롭게 쉬고 싶은 당신에게 잘 맞는 차분한 해안 지역입니다.",
      "leadTitle": "느린 여행과 조용한 휴식을 만들기 좋습니다.",
      "leadText": "요미탄·잔파곶은 차탄보다 한적하고 온나손보다 생활형 분위기가 있어 선셋, 도자기 마을, 해안 드라이브와 잘 어울립니다.",
      "stayRange": [
        "렌터카와 주차 확인",
        "주변 식당과 편의점 거리 확인",
        "해변 접근성과 객실 방향 확인"
      ],
      "avoidRange": [
        "렌터카 없이 대중교통만 믿는 선택",
        "매일 나하·북부를 왕복하는 선택",
        "주변 식당 부족을 고려하지 않는 선택"
      ],
      "bestFor": [
        "조용한 해변",
        "커플",
        "재방문",
        "선셋"
      ],
      "notFor": [
        "렌터카 없는 짧은 일정",
        "도시 편의 우선",
        "수족관 집중 일정"
      ],
      "bookingTips": [
        "렌터카가 있어야 만족도가 높습니다.",
        "저녁 식당 선택지는 차탄보다 적을 수 있습니다.",
        "오션뷰보다 실제 해변 접근성을 확인하세요."
      ],
      "chips": [
        "조용함",
        "선셋",
        "해변",
        "재방문"
      ],
      "compareGood": "번잡함을 줄이고 차분한 해변 분위기를 즐기기 좋습니다.",
      "compareCaution": "식당과 교통 선택지가 적어 렌터카 의존도가 높습니다.",
      "mismatchNote": "편의시설과 쇼핑이 더 중요하다면 차탄이 더 편합니다.",
      "links": [
        {
          "title": "오키나와 조용한 숙소 추천 TOP5",
          "url": "/post/okinawa-quiet-hotels"
        },
        {
          "title": "요미탄 호텔 추천 TOP5",
          "url": "/post/okinawa-yomitan-hotels"
        },
        {
          "title": "오키나와 커플 조용한 숙소 추천",
          "url": "/post/okinawa-calm-couple-hotels"
        }
      ],
      "hotels": [
        {
          "name": "요미탄 해안 숙소",
          "tag": "조용한 해변",
          "location": "요미탄 해안권",
          "reason": "선셋과 차분한 바다 분위기를 즐기고 싶을 때 좋습니다.",
          "meta": [
            "선셋",
            "조용함",
            "해변"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        },
        {
          "name": "잔파곶 주변 숙소",
          "tag": "드라이브형",
          "location": "요미탄 북서부",
          "reason": "렌터카로 해안 드라이브와 조용한 휴식을 함께 즐기기 좋습니다.",
          "meta": [
            "드라이브",
            "해안",
            "재방문"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        },
        {
          "name": "야치문노사토 접근형 숙소",
          "tag": "느린 여행",
          "location": "요미탄 생활권",
          "reason": "도자기 마을과 카페, 산책을 좋아하는 여행자에게 어울립니다.",
          "meta": [
            "카페",
            "도자기",
            "산책"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        },
        {
          "name": "차탄 외곽 조용한 숙소",
          "tag": "편의 균형",
          "location": "차탄·요미탄 사이",
          "reason": "편의시설 접근성과 조용한 분위기를 함께 보고 싶을 때 후보가 됩니다.",
          "meta": [
            "편의",
            "조용함",
            "렌터카"
          ],
          "url": "/destinations/okinawa/value-hotel/"
        },
        {
          "name": "요미탄 커플 숙소",
          "tag": "커플형",
          "location": "요미탄 해안권",
          "reason": "한적한 바다와 선셋을 중심으로 여행하고 싶을 때 잘 맞습니다.",
          "meta": [
            "커플",
            "선셋",
            "휴식"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        }
      ]
    },
    "southCoast": {
      "name": "남부 해안 & 이토만 & 난조",
      "regionSlug": "southern-coast-itoman-nanjo",
      "regionSlugAliases": ["남부 해안 & 이토만 & 난조", "남부 해안·이토만·난조", "남부 해안 이토만 난조"],
      "label": "공항 접근과 남부 해안 드라이브를 함께 보기 좋은 위치",
      "summary": "남부 해안도로와 전망 좋은 카페, 드라이브 코스가 그대로 하루의 일정이 되는 흐름 속에서 여유로운 오키나와를 즐기고 싶은 당신에게 잘 어울리는 지역입니다.",
      "leadTitle": "마지막 날 이동 부담을 줄이기 좋습니다.",
      "leadText": "이토만·난조를 중심으로 한 남부 해안권은 공항 접근성과 해안 드라이브, 카페, 평화기념공원 동선을 함께 보기 좋습니다.",
      "stayRange": [
        "공항까지 실제 소요 시간 확인",
        "렌터카와 주차 확인",
        "주변 식당 및 호텔 식사 확인"
      ],
      "avoidRange": [
        "북부 관광을 매일 왕복하는 선택",
        "렌터카 없이 외곽 숙소를 고르는 선택",
        "식당 접근성을 확인하지 않는 선택"
      ],
      "bestFor": [
        "귀국 전 1박",
        "남부 관광",
        "조용한 휴식",
        "카페 드라이브"
      ],
      "notFor": [
        "북부 집중 여행",
        "렌터카 없는 여행",
        "차탄 중심 저녁 일정"
      ],
      "bookingTips": [
        "아침 비행기라면 공항까지 여유 시간을 넉넉히 잡으세요.",
        "남부는 조용하지만 식당 선택지가 제한될 수 있습니다.",
        "북부 일정을 마친 뒤 마지막 1박으로 넣으면 편합니다."
      ],
      "chips": [
        "공항 접근",
        "남부",
        "카페",
        "조용함"
      ],
      "compareGood": "공항 복귀와 조용한 남부 드라이브를 함께 챙기기 좋습니다.",
      "compareCaution": "북부 관광을 매일 다녀오기에는 동선이 길어집니다.",
      "mismatchNote": "수족관과 북부 자연이 핵심이라면 나고·모토부가 더 편합니다.",
      "links": [
        {
          "title": "오키나와 남부 숙소 추천 TOP5",
          "url": "/post/okinawa-south-hotels"
        },
        {
          "title": "오키나와 귀국 전날 숙소 추천",
          "url": "/post/okinawa-last-night-hotels"
        },
        {
          "title": "오키나와 남부 여행 가이드",
          "url": "/post/okinawa-south-travel-guide"
        }
      ],
      "hotels": [
        {
          "name": "이토만 공항 접근형 숙소",
          "tag": "귀국 전",
          "location": "이토만·공항 남쪽",
          "reason": "아침 비행기나 마지막 1박에서 이동 부담을 줄이기 좋습니다.",
          "meta": [
            "공항",
            "귀국일",
            "남부"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        },
        {
          "name": "난조 해안 숙소",
          "tag": "카페 드라이브",
          "location": "남부 해안권",
          "reason": "조용한 바다와 카페, 해안 드라이브를 즐기고 싶을 때 좋습니다.",
          "meta": [
            "카페",
            "해안",
            "조용함"
          ],
          "url": "/destinations/okinawa/quiet-stay/"
        },
        {
          "name": "남부 가족형 숙소",
          "tag": "가족형",
          "location": "남부 해안권",
          "reason": "북부보다 한적한 분위기에서 쉬고 싶은 가족 여행에 어울립니다.",
          "meta": [
            "가족",
            "휴식",
            "공항"
          ],
          "url": "/destinations/okinawa/family-trip/"
        },
        {
          "name": "남부 해안 리조트 숙소",
          "tag": "휴식형",
          "location": "남부 바다권",
          "reason": "여행 마지막을 조용하게 마무리하고 싶을 때 후보가 됩니다.",
          "meta": [
            "리조트",
            "조용함",
            "귀국 전"
          ],
          "url": "/destinations/okinawa/hotel-guide/"
        },
        {
          "name": "공항 복귀 균형형 숙소",
          "tag": "동선형",
          "location": "나하·남부 사이",
          "reason": "도심과 공항, 남부 관광을 함께 고려하는 일정에 좋습니다.",
          "meta": [
            "공항",
            "남부",
            "렌터카"
          ],
          "url": "/destinations/okinawa/first-trip/"
        }
      ]
    }
  },
  "questions": [
    {
          "title": "이번 오키나와 여행에서 가장 중요한 것은 무엇인가요?",
          "help": "가장 가까운 여행 목적을 골라주세요.",
          "options": [
            {
              "title": "첫 오키나와",
              "desc": "공항, 식당, 대표 동선을 쉽게 잡고 싶어요.",
              "scores": {
                "nahaKokusai": 7,
                "chatanAmericanVillage": 4
              }
            },
            {
              "title": "바다·저녁 산책",
              "desc": "카페, 식당, 선셋이 가까우면 좋아요.",
              "scores": {
                "chatanAmericanVillage": 8,
                "yomitanZanpa": 3
              }
            },
            {
              "title": "해변 리조트",
              "desc": "수영장과 바다, 호텔 체류가 중요해요.",
              "scores": {
                "onnaResort": 8,
                "southCoast": 2
              }
            },
            {
              "title": "북부 드라이브",
              "desc": "츄라우미, 코우리섬, 세소코섬을 보고 싶어요.",
              "scores": {
                "nagoMotobu": 9,
                "onnaResort": 3
              }
            }
          ]
        },
    {
          "title": "동행자는 누구인가요?",
          "help": "가족 여행은 숙소 주변 편의가 중요합니다.",
          "options": [
            {
              "title": "혼자·친구",
              "desc": "이동과 식당 선택지가 중요해요.",
              "scores": {
                "nahaKokusai": 4,
                "chatanAmericanVillage": 5
              }
            },
            {
              "title": "커플 여행",
              "desc": "바다 분위기와 조용한 시간이 중요해요.",
              "scores": {
                "chatanAmericanVillage": 4,
                "onnaResort": 5,
                "yomitanZanpa": 4
              }
            },
            {
              "title": "아이 동반",
              "desc": "식사, 주차, 수영장, 이동 피로가 중요해요.",
              "scores": {
                "chatanAmericanVillage": 5,
                "onnaResort": 5,
                "nagoMotobu": 4
              }
            },
            {
              "title": "부모님 동반",
              "desc": "장거리 이동과 계단, 식사 동선을 줄이고 싶어요.",
              "scores": {
                "chatanAmericanVillage": 4,
                "nahaKokusai": 4,
                "onnaResort": 4
              }
            }
          ]
        },
    {
          "title": "렌터카를 이용할 예정인가요?",
          "help": "오키나와 숙소 위치에서 가장 중요한 기준입니다.",
          "options": [
            {
              "title": "렌터카 없음",
              "desc": "대중교통, 택시, 투어를 활용할 예정이에요.",
              "scores": {
                "nahaKokusai": 9,
                "chatanAmericanVillage": 2
              }
            },
            {
              "title": "전 일정 렌터카",
              "desc": "차로 자유롭게 이동할 예정이에요.",
              "scores": {
                "onnaResort": 4,
                "nagoMotobu": 4,
                "yomitanZanpa": 4,
                "southCoast": 3
              }
            },
            {
              "title": "일부 렌터카",
              "desc": "나하 1박 후 렌터카를 빌릴 수도 있어요.",
              "scores": {
                "nahaKokusai": 4,
                "chatanAmericanVillage": 5,
                "onnaResort": 3
              }
            },
            {
              "title": "미정",
              "desc": "렌터카 여부에 따라 추천을 받고 싶어요.",
              "scores": {
                "nahaKokusai": 5,
                "chatanAmericanVillage": 4
              }
            }
          ]
        },
    {
          "title": "공항·나하 이동은 얼마나 중요한가요?",
          "help": "렌터카 여부와 첫날·마지막날 동선에 따라 나하와 중부·북부 선택이 달라집니다.",
          "options": [
            { "title": "매우 중요", "desc": "공항 이동과 시내 접근을 최대한 단순하게 잡고 싶어요.", "scores": { "nahaKokusai": 8, "chatanAmericanVillage": 2 } },
            { "title": "첫날·마지막날", "desc": "도착일과 출국일 동선은 편했으면 해요.", "scores": { "nahaKokusai": 4, "chatanAmericanVillage": 4, "southCoast": 2 } },
            { "title": "중요 낮음", "desc": "공항보다 바다, 리조트, 드라이브 동선이 더 중요해요.", "scores": { "onnaResort": 4, "nagoMotobu": 4, "yomitanZanpa": 3, "southCoast": 3 } }
          ]
        },
    {
          "title": "여행 기간은 어느 정도인가요?",
          "help": "짧은 일정일수록 이동 욕심을 줄이는 편이 좋습니다.",
          "options": [
            {
              "title": "2박 3일 이하",
              "desc": "짧고 알차게 보고 싶어요.",
              "scores": {
                "nahaKokusai": 6,
                "chatanAmericanVillage": 4
              }
            },
            {
              "title": "3박 4일",
              "desc": "중부와 북부를 조금씩 보고 싶어요.",
              "scores": {
                "chatanAmericanVillage": 5,
                "onnaResort": 4,
                "nagoMotobu": 3
              }
            },
            {
              "title": "4박 5일 이상",
              "desc": "숙소를 나눠도 괜찮아요.",
              "scores": {
                "nagoMotobu": 5,
                "onnaResort": 4,
                "southCoast": 5,
                "yomitanZanpa": 3
              }
            },
            {
              "title": "긴 휴식 일정",
              "desc": "한적한 지역도 괜찮아요.",
              "scores": {
                "yomitanZanpa": 6,
                "southCoast": 8,
                "onnaResort": 4
              }
            }
          ]
        },
    {
          "title": "북부 관광은 어느 정도 계획하고 있나요?",
          "help": "츄라우미 수족관과 코우리섬은 이동 시간이 꽤 걸립니다.",
          "options": [
            {
              "title": "수족관·코우리섬",
              "desc": "북부 일정이 핵심이에요.",
              "scores": {
                "nagoMotobu": 10,
                "onnaResort": 2
              }
            },
            {
              "title": "수족관 하루",
              "desc": "당일치기도 괜찮아요.",
              "scores": {
                "chatanAmericanVillage": 4,
                "onnaResort": 4,
                "nagoMotobu": 4
              }
            },
            {
              "title": "해변 리조트 우선",
              "desc": "멀리 이동하기보다 쉬고 싶어요.",
              "scores": {
                "onnaResort": 7,
                "yomitanZanpa": 3
              }
            },
            {
              "title": "북부 미정",
              "desc": "일정에 따라 바뀔 수 있어요.",
              "scores": {
                "chatanAmericanVillage": 4,
                "nahaKokusai": 2,
                "onnaResort": 2
              }
            }
          ]
        },
    {
          "title": "숙소 주변 분위기는 어떤 쪽이 좋나요?",
          "help": "저녁 시간의 만족도를 좌우합니다.",
          "options": [
            {
              "title": "식당·쇼핑 근처",
              "desc": "저녁에 멀리 움직이고 싶지 않아요.",
              "scores": {
                "nahaKokusai": 6,
                "chatanAmericanVillage": 7
              }
            },
            {
              "title": "해변 리조트 분위기",
              "desc": "숙소에서 쉬는 시간이 중요해요.",
              "scores": {
                "onnaResort": 8,
                "southCoast": 2
              }
            },
            {
              "title": "바다·선셋",
              "desc": "번잡한 곳보다 차분한 곳이 좋아요.",
              "scores": {
                "yomitanZanpa": 8,
                "southCoast": 8
              }
            },
            {
              "title": "북부 자연",
              "desc": "관광객 많은 중심부보다 자연이 좋아요.",
              "scores": {
                "nagoMotobu": 7,
                "yomitanZanpa": 3
              }
            }
          ]
        },
    {
          "title": "바다 액티비티나 섬 투어 계획이 있나요?",
          "help": "집결지에 따라 숙소가 달라집니다.",
          "options": [
            {
              "title": "케라마 투어",
              "desc": "아침 항구 이동이 중요해요.",
              "scores": {
                "nahaKokusai": 8
              }
            },
            {
              "title": "푸른동굴",
              "desc": "중부 서해안 접근성이 중요해요.",
              "scores": {
                "onnaResort": 6,
                "yomitanZanpa": 4,
                "chatanAmericanVillage": 3
              }
            },
            {
              "title": "수영장·해변",
              "desc": "멀리 이동하지 않아도 돼요.",
              "scores": {
                "onnaResort": 7,
                "southCoast": 3
              }
            },
            {
              "title": "드라이브",
              "desc": "해안도로와 카페를 천천히 보고 싶어요.",
              "scores": {
                "yomitanZanpa": 6,
                "southCoast": 8,
                "nagoMotobu": 3
              }
            }
          ]
        }
  ]
};

const areaResultBadges = {
  "nahaKokusai": "공항 도착 후 첫날을 보내기 가장 쉬운 중심",
  "chatanAmericanVillage": "노을과 이국적인 거리를 함께 즐기기 좋은 곳",
  "onnaResort": "리조트 휴식이 깊어지는 푸른 해안",
  "nagoMotobu": "북부 자연과 가족 일정이 가까운 곳",
  "yomitanZanpa": "조용한 바다와 로컬 분위기를 찾기 좋은 곳",
  "southCoast": "남부 해안 드라이브와 한적한 쉼"
};
const hotelAccessPresets = {
  "nahaKokusai": {
    "station": "유이레일역 도보권",
    "airport": "나하공항 차량 약 15분"
  },
  "chatanAmericanVillage": {
    "station": "아메리칸빌리지 도보권",
    "airport": "나하공항 차량 약 40분"
  },
  "onnaResort": {
    "station": "온나손 리조트 해변권",
    "airport": "나하공항 차량 약 60~80분"
  },
  "nagoMotobu": {
    "station": "나고·모토부 주요 관광지권",
    "airport": "나하공항 차량 약 90~120분"
  },
  "yomitanZanpa": {
    "station": "요미탄·잔파곶 해안권",
    "airport": "나하공항 차량 약 60분"
  },
  "southCoast": {
    "station": "이토만·난조 남부 해안권",
    "airport": "나하공항 차량 약 30~45분"
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
