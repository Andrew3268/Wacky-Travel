/*
 * Okinawa hotel location survey logic.
 * This file is intentionally city-specific.
 * /assets/js/destinations/okinawa/hotel-location-survey.js
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
      "summary": "렌터카 없이 움직이거나 짧은 일정이라면 나하·국제거리 주변이 가장 단순합니다.",
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
      "summary": "오키나와 여행 분위기와 편의시설을 한 번에 원한다면 차탄이 편합니다.",
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
      "summary": "리조트에서 쉬는 시간이 여행의 중심이라면 온나손이 가장 자연스럽습니다.",
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
      "summary": "북부 일정이 여행의 핵심이라면 나고·모토부 숙박이 왕복 피로를 줄여줍니다.",
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
      "summary": "번잡한 중심지를 피하고 차분한 바다 분위기를 원한다면 요미탄이 잘 맞습니다.",
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
      "summary": "귀국 전 여유로운 1박이나 남부 관광이 중심이라면 남부 해안권이 좋습니다.",
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

        button.type = "button";
        button.className = "wt-option";
        button.setAttribute("aria-pressed", selectedIndex === optionIndex ? "true" : "false");

        if (selectedIndex === optionIndex) {
          button.classList.add("is-selected");
        }

        title.className = "wt-option-title";
        title.textContent = option.title;

        button.appendChild(title);
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

function applyAccuracyAdjustments(scores) {
  const firstOkinawa = answerIs(0, "첫 오키나와");
  const sunsetWalk = answerIs(0, "바다·저녁 산책");
  const resortBeach = answerIs(0, "해변 리조트") || answerIs(6, "해변 리조트 분위기") || answerIs(7, "수영장·해변");
  const northDrive = answerIs(0, "북부 드라이브") || answerIs(5, "수족관·코우리섬");
  const friendsSolo = answerIs(1, "혼자·친구");
  const couple = answerIs(1, "커플 여행");
  const family = answerIn(1, ["아이 동반", "부모님 동반"]);
  const noCar = answerIs(2, "렌터카 없음");
  const fullCar = answerIs(2, "전 일정 렌터카");
  const partialCar = answerIs(2, "일부 렌터카");
  const carUnknown = answerIs(2, "미정");
  const airportImportant = answerIs(3, "매우 중요");
  const arrivalDeparture = answerIs(3, "첫날·마지막날");
  const airportLow = answerIs(3, "중요 낮음");
  const shortTrip = answerIs(4, "2박 3일 이하");
  const mediumTrip = answerIs(4, "3박 4일");
  const longTrip = answerIs(4, "4박 5일 이상") || answerIs(4, "긴 휴식 일정");
  const aquariumCore = answerIs(5, "수족관·코우리섬");
  const aquariumDay = answerIs(5, "수족관 하루");
  const beachPriority = answerIs(5, "해변 리조트 우선");
  const northUnknown = answerIs(5, "북부 미정");
  const foodShopping = answerIs(6, "식당·쇼핑 근처");
  const sunsetQuiet = answerIs(6, "바다·선셋");
  const northNature = answerIs(6, "북부 자연");
  const keramaTour = answerIs(7, "케라마 투어");
  const blueCave = answerIs(7, "푸른동굴");
  const drive = answerIs(7, "드라이브");

  if (noCar || (firstOkinawa && shortTrip) || airportImportant || keramaTour) {
    addAreaScore(scores, "nahaKokusai", 7);
  }
  if ((airportImportant || arrivalDeparture) && (noCar || carUnknown || shortTrip)) {
    addAreaScore(scores, "nahaKokusai", 4);
  }
  if (foodShopping && noCar) {
    addAreaScore(scores, "nahaKokusai", 3);
  }

  if ((sunsetWalk || foodShopping) && (partialCar || carUnknown || mediumTrip)) {
    addAreaScore(scores, "chatanAmericanVillage", 5);
  }
  if ((friendsSolo || family) && foodShopping && !airportLow) {
    addAreaScore(scores, "chatanAmericanVillage", 3);
  }
  if (aquariumDay && mediumTrip) {
    addAreaScore(scores, "chatanAmericanVillage", 2);
  }

  if (resortBeach && (fullCar || family || couple)) {
    addAreaScore(scores, "onnaResort", 7);
  }
  if (blueCave && (fullCar || partialCar)) {
    addAreaScore(scores, "onnaResort", 5);
  }
  if (beachPriority && !noCar) {
    addAreaScore(scores, "onnaResort", 4);
  }

  if ((northDrive || aquariumCore || northNature) && (fullCar || longTrip)) {
    addAreaScore(scores, "nagoMotobu", 8);
  }
  if (aquariumCore && mediumTrip) {
    addAreaScore(scores, "nagoMotobu", 4);
  }
  if (northUnknown && fullCar && longTrip) {
    addAreaScore(scores, "nagoMotobu", 3);
  }

  if ((sunsetQuiet || drive) && (fullCar || longTrip) && !aquariumCore) {
    addAreaScore(scores, "yomitanZanpa", 6);
  }
  if (couple && sunsetQuiet && !noCar) {
    addAreaScore(scores, "yomitanZanpa", 3);
  }
  if (blueCave && sunsetQuiet) {
    addAreaScore(scores, "yomitanZanpa", 3);
  }

  if ((drive || longTrip) && (airportLow || arrivalDeparture) && !northDrive && !aquariumCore) {
    addAreaScore(scores, "southCoast", 5);
  }
  if (arrivalDeparture && fullCar && longTrip) {
    addAreaScore(scores, "southCoast", 3);
  }
  if (sunsetQuiet && drive && !blueCave) {
    addAreaScore(scores, "southCoast", 2);
  }


  // v13 accuracy reinforcement: give Yomitan and the southern coast a real path when users choose rental car, sunset, driving and quieter coasts.
  const driveIntent = answerIs(0, "드라이브") || drive;
  const southFriendly = driveIntent && (fullCar || partialCar) && !aquariumCore && !northDrive;
  if (southFriendly && (arrivalDeparture || airportLow || longTrip)) {
    addAreaScore(scores, "southCoast", 12);
  }
  if (sunsetQuiet && driveIntent && (fullCar || partialCar) && !blueCave && !aquariumCore) {
    addAreaScore(scores, "southCoast", 8);
  }
  if (longTrip && fullCar && answerIs(7, "수영장·해변") && !aquariumCore && !northDrive) {
    addAreaScore(scores, "southCoast", 7);
  }
  if (firstOkinawa && partialCar && arrivalDeparture && mediumTrip) {
    addAreaScore(scores, "chatanAmericanVillage", 4);
  }
  if (sunsetQuiet && (couple || longTrip) && !noCar) {
    addAreaScore(scores, "yomitanZanpa", 6);
  }
  if (driveIntent && sunsetQuiet && !aquariumCore) {
    addAreaScore(scores, "yomitanZanpa", 5);
  }
  if (fullCar && longTrip && !aquariumCore && !northDrive && !resortBeach) {
    addAreaScore(scores, "yomitanZanpa", 3);
  }
  if (southFriendly && !blueCave && !beachPriority) {
    addAreaScore(scores, "onnaResort", -4);
  }
  if (fullCar && longTrip && airportLow && !beachPriority && !blueCave) {
    addAreaScore(scores, "onnaResort", -3);
  }


  // v13 balance pass: southern coast and Yomitan need stronger distinction from Onna resort when the trip is drive/sunset focused.
  if (southFriendly && fullCar && (arrivalDeparture || airportLow || longTrip)) {
    addAreaScore(scores, "southCoast", 10);
  }
  if (driveIntent && sunsetQuiet && fullCar && !blueCave && !aquariumCore) {
    addAreaScore(scores, "southCoast", 10);
    addAreaScore(scores, "onnaResort", -5);
  }
  if (driveIntent && airportLow && fullCar && longTrip && !aquariumCore) {
    addAreaScore(scores, "southCoast", 8);
  }
  if (sunsetQuiet && !noCar && !beachPriority) {
    addAreaScore(scores, "yomitanZanpa", 5);
  }
  if (driveIntent && !noCar && !aquariumCore && !northDrive) {
    addAreaScore(scores, "yomitanZanpa", 4);
  }


  // v13 final balance: reduce default Naha/Onna dominance when car-based coast trips are selected.
  if ((fullCar || partialCar) && !shortTrip && !airportImportant && !keramaTour) {
    addAreaScore(scores, "nahaKokusai", -4);
  }
  if (!noCar && !airportImportant && !arrivalDeparture && !keramaTour) {
    addAreaScore(scores, "nahaKokusai", -3);
  }
  if ((driveIntent || sunsetQuiet || southFriendly) && !blueCave && !beachPriority && !resortBeach) {
    addAreaScore(scores, "onnaResort", -4);
  }
  if (driveIntent && (arrivalDeparture || airportLow) && (fullCar || partialCar) && !aquariumCore) {
    addAreaScore(scores, "southCoast", 6);
  }
  if (driveIntent && longTrip && (fullCar || partialCar) && !aquariumCore && !northDrive) {
    addAreaScore(scores, "southCoast", 5);
  }
}

    

function getTieBreakPriority(areaKey) {
  const order = Object.keys(cityConfig.areas);
  const reverseIndex = order.length - order.indexOf(areaKey);
  return reverseIndex;
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

      applyAccuracyAdjustments(scores);

      return Object.entries(scores)
        .map(([key, score]) => ({ key, score, ...cityConfig.areas[key] }))
        .sort((a, b) => (b.score - a.score) || (getTieBreakPriority(b.key) - getTieBreakPriority(a.key)));
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
      setText("hotelSectionDesc", "추천된 위치를 기준으로 먼저 비교해볼 만한 호텔 후보입니다. 실제 예약 전에는 가격, 객실 타입, 취소 조건, 최근 후기를 같이 확인하세요.");
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
      const intro = `${area.name}은(는) 이번 여행의 이동, 분위기, 예산 기준과 가장 잘 맞는 위치입니다. 숙소를 이 구역 안에서 먼저 비교하면 불필요한 이동과 고민을 줄이기 쉽습니다.`;
      const reasons = [
        { title: area.leadTitle || "일정 흐름이 단순해집니다", text: area.leadText || area.summary },
        { title: "숙소 위치를 좁히기 쉽습니다", text: Array.isArray(area.stayRange) ? area.stayRange[0] : area.compareGood },
        { title: "예약 전 확인할 점도 분명합니다", text: Array.isArray(area.bookingTips) ? area.bookingTips[0] : area.compareCaution }
      ];
      return {
        intro,
        reasons,
        conclusionTitle: `결론: ${area.name}부터 비교해보세요.`,
        conclusionText: area.compareCaution ? `${area.compareGood} 다만 ${area.compareCaution}` : area.summary
      };
    }

    function renderPersuasiveResult(topArea) {
      const content = getPersuasiveContent(topArea);
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
  