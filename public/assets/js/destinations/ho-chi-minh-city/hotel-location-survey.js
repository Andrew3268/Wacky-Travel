/* 호치민 hotel location survey logic. Modernized with the Fukuoka V23 survey UI flow. */
const cityConfig = {
  cityName: "호치민",
  destinationSlug: "ho-chi-minh-city",
  areas: {"district1": {"name": "1군·벤탄", "summary": "벤탄시장과 대표 명소, 식사와 마사지 동선이 짧게 이어지는 중심에서 호치민의 첫날을 가장 쉽게 열고 싶은 당신에게 잘 맞는 활기 있는 기준점입니다.", "leadTitle": "처음 방문자에게 가장 이해하기 쉬운 중심 위치입니다.", "leadText": "벤탄시장, 통일궁, 중앙우체국, 동커이, 부이비엔까지 주요 이동 경로를 짧게 연결하기 좋습니다.", "bestFor": ["첫 여행", "짧은 일정", "맛집·마사지", "근교 투어 픽업"], "notFor": ["조용한 휴식 최우선", "넓은 객실 우선", "부이비엔 소음이 부담되는 여행"], "bookingTips": ["부이비엔과 너무 가까운 저층 객실은 밤 소음 후기를 확인하세요."], "compareGood": "대표 관광과 저녁 이동을 가장 쉽게 묶을 수 있습니다.", "links": [{"title": "호치민 1군 호텔 추천 TOP5", "url": "/post/ho-chi-minh-district-1-hotels/"}, {"title": "호치민 첫 여행 호텔 추천 TOP5", "url": "/post/ho-chi-minh-first-trip-hotels/"}], "hotels": [{"name": "Silverland Bến Thành", "tag": "벤탄 중심", "location": "1군·벤탄", "reason": "대표 명소와 식사 이동을 짧게 묶기 좋은 중심 후보입니다.", "meta": ["첫 여행", "벤탄", "도보 이동"], "url": "/post/silverland-ben-thanh/"}, {"name": "Liberty Central Saigon Centre Hotel", "tag": "중심 실속", "location": "1군 중심", "reason": "1군 중심 접근성과 실속형 숙박을 함께 볼 때 비교하기 좋습니다.", "meta": ["중심", "맛집", "실속"], "url": "/post/liberty-central-saigon-centre/"}, {"name": "The Hammock Hotel Fine Arts Museum", "tag": "감각적 숙소", "location": "미술관·벤탄 주변", "reason": "1군 접근성과 개성 있는 숙소 분위기를 함께 기대할 수 있습니다.", "meta": ["부티크", "1군", "카페"], "url": "/post/the-hammock-hotel-fine-arts-museum/"}, {"name": "Cochin Zen Hotel", "tag": "도심형 후보", "location": "1군·벤탄", "reason": "대표 관광과 저녁 이동을 단순하게 만들고 싶은 일정에 맞습니다.", "meta": ["도심", "짧은 일정", "마사지"], "url": "/post/cochin-zen-hotel/"}, {"name": "Fusion Original Saigon Centre", "tag": "쇼핑 연결", "location": "1군 중심", "reason": "쇼핑몰과 중심 이동을 함께 보는 여행자에게 비교해볼 만합니다.", "meta": ["쇼핑", "중심", "컨디션"], "url": "/post/fusion-original-saigon-centre/"}]}, "dongkhoi": {"name": "동커이·응우옌후에", "summary": "세련된 거리와 강변 산책, 깔끔한 호텔과 카페가 자연스럽게 이어지는 중심가에서 호치민을 조금 더 정돈된 분위기로 즐기고 싶은 당신에게 잘 어울리는 도심 지역입니다.", "leadTitle": "중심 접근성과 숙소 만족도의 균형이 좋습니다.", "leadText": "동커이 거리, 응우옌후에 보행자 거리, 오페라하우스, 사이공강 주변을 여유롭게 연결할 수 있습니다.", "bestFor": ["커플 여행", "부모님 동반", "호텔 컨디션", "리버사이드 산책"], "notFor": ["예산 최우선", "로컬 시장 분위기 선호", "밤거리 중심 친구 여행"], "bookingTips": ["동커이·응우옌후에·바손 주변은 현장 분위기가 다르므로 실제 위치를 확인하세요."], "compareGood": "정돈된 도심 분위기와 산책 코스를 함께 챙길 수 있습니다.", "links": [{"title": "호치민 동커이 호텔 추천 TOP5", "url": "/post/ho-chi-minh-dong-khoi-hotels/"}, {"title": "호치민 부모님 동반 호텔 추천 TOP5", "url": "/post/ho-chi-minh-parents-hotels/"}], "hotels": [{"name": "Caravelle Saigon", "tag": "동커이 중심", "location": "오페라하우스 주변", "reason": "중심 접근성과 호텔 안정감을 함께 보는 여행자에게 잘 맞습니다.", "meta": ["동커이", "부모님", "중심"], "url": "/post/caravelle-saigon/"}, {"name": "Hotel Majestic Saigon", "tag": "강변 클래식", "location": "사이공강 주변", "reason": "리버사이드 산책과 고전적인 호텔 분위기를 중요하게 볼 때 유리합니다.", "meta": ["리버사이드", "클래식", "커플"], "url": "/post/hotel-majestic-saigon/"}, {"name": "Liberty Central Saigon Citypoint", "tag": "도심 균형", "location": "응우옌후에 인근", "reason": "쇼핑, 식사, 도보 이동을 함께 잡기 편합니다.", "meta": ["쇼핑", "도심", "편의"], "url": "/post/liberty-central-saigon-citypoint/"}, {"name": "Park Hyatt Saigon", "tag": "럭셔리 중심", "location": "동커이·오페라하우스", "reason": "특별한 일정과 숙소 만족도를 우선순위로 둘 때 비교할 만합니다.", "meta": ["럭셔리", "커플", "중심"], "url": "/post/park-hyatt-saigon/"}, {"name": "The Reverie Saigon", "tag": "고급 리버뷰", "location": "응우옌후에 주변", "reason": "화려한 도심 숙박과 리버사이드 접근성을 기대할 수 있습니다.", "meta": ["리버뷰", "럭셔리", "쇼핑"], "url": "/post/the-reverie-saigon/"}]}, "district3": {"name": "3군·전쟁박물관 주변", "summary": "1군의 접근성은 유지하되 조금 더 차분한 거리와 현실적인 숙박비 속에서 호치민 도심을 여유롭게 둘러보고 싶은 당신에게 잘 맞는 위치입니다.", "leadTitle": "가성비와 조용함을 함께 보는 현실적인 대안입니다.", "leadText": "전쟁박물관, 로컬 카페, 맛집 접근성이 좋고 1군까지 그랩 이동도 짧은 편입니다.", "bestFor": ["가성비", "재방문", "조용한 도심", "로컬 카페"], "notFor": ["완전 도보 중심 여행", "밤거리 중심", "공항 접근 최우선"], "bookingTips": ["매일 1군을 오갈 계획이라면 그랩 이동 시간을 함께 계산하세요."], "compareGood": "숙박비 부담과 번잡함을 줄이면서 중심 접근성은 유지할 수 있습니다.", "links": [{"title": "호치민 3군 호텔 추천 TOP5", "url": "/post/ho-chi-minh-district-3-hotels/"}, {"title": "호치민 가성비 호텔 추천 TOP5", "url": "/post/ho-chi-minh-value-hotels/"}], "hotels": [{"name": "Mai House Saigon Hotel", "tag": "3군 휴식형", "location": "3군", "reason": "차분한 도심 분위기와 호텔 컨디션을 함께 볼 수 있습니다.", "meta": ["3군", "휴식", "컨디션"], "url": "/post/mai-house-saigon-hotel/"}, {"name": "Sherwood Residence", "tag": "레지던스형", "location": "3군·1군 인접", "reason": "객실 여유와 장기 숙박 편의성을 중요하게 볼 때 비교해볼 만합니다.", "meta": ["레지던스", "가족", "장기"], "url": "/post/sherwood-residence/"}, {"name": "La Vela Saigon Hotel", "tag": "대형 호텔", "location": "3군", "reason": "부대시설과 도심 접근성을 함께 보는 여행자에게 맞습니다.", "meta": ["수영장", "3군", "가성비"], "url": "/post/la-vela-saigon-hotel/"}, {"name": "Orchids Saigon Hotel", "tag": "안정형", "location": "3군·전쟁박물관 주변", "reason": "중심 접근성과 차분한 숙소 주변을 함께 기대할 수 있습니다.", "meta": ["차분함", "도심", "실속"], "url": "/post/orchids-saigon-hotel/"}, {"name": "Bach Suites Saigon", "tag": "부티크형", "location": "3군 인접", "reason": "작고 깔끔한 도심형 숙소를 선호할 때 비교하기 좋습니다.", "meta": ["부티크", "커플", "차분함"], "url": "/post/bach-suites-saigon/"}]}, "thaodien": {"name": "타오디엔·투득", "summary": "브런치 카페와 강변 레스토랑, 조용한 주거지 분위기가 어우러진 동네에서 빠른 관광보다 여유로운 시간을 보내고 싶은 당신에게 잘 어울리는 동네입니다.", "leadTitle": "호치민을 천천히 머물고 싶은 여행자에게 잘 맞습니다.", "leadText": "중심 관광보다 카페, 레스토랑, 리버사이드 분위기와 숙소 체류를 중요하게 볼 때 만족도가 높습니다.", "bestFor": ["재방문", "장기 일정", "카페 여행", "조용한 휴식"], "notFor": ["첫 방문에 대표 명소만 빠르게 둘러보기", "공항 이동 최우선", "밤거리 중심"], "bookingTips": ["메트로역이나 그랩 이동 시간을 함께 확인하세요."], "compareGood": "중심의 번잡함을 줄이고 여유로운 동네 분위기를 즐길 수 있습니다.", "links": [{"title": "호치민 타오디엔 호텔 추천 TOP5", "url": "/post/ho-chi-minh-thao-dien-hotels/"}, {"title": "호치민 조용한 숙소 추천 TOP5", "url": "/post/ho-chi-minh-quiet-hotels/"}], "hotels": [{"name": "Mia Saigon Luxury Boutique Hotel", "tag": "리버사이드", "location": "타오디엔", "reason": "조용한 휴식과 감각적인 숙소 분위기를 함께 기대할 수 있습니다.", "meta": ["리버사이드", "휴식", "커플"], "url": "/post/mia-saigon-luxury-boutique-hotel/"}, {"name": "Somerset Vista Ho Chi Minh City", "tag": "레지던스형", "location": "투득·안푸", "reason": "장기 숙박과 객실 여유를 중요하게 볼 때 비교하기 좋습니다.", "meta": ["레지던스", "장기", "가족"], "url": "/post/somerset-vista-ho-chi-minh-city/"}, {"name": "Glenwood City Resort", "tag": "동네형 숙소", "location": "타오디엔", "reason": "카페와 레스토랑 중심의 여유로운 동네 분위기에 맞습니다.", "meta": ["카페", "조용함", "재방문"], "url": "/post/glenwood-city-resort/"}, {"name": "Common Inn Thao Dien", "tag": "실속형", "location": "타오디엔", "reason": "타오디엔 분위기를 실속 있게 경험하고 싶을 때 비교해볼 만합니다.", "meta": ["실속", "카페", "조용함"], "url": "/post/common-inn-thao-dien/"}, {"name": "Riverside Serviced Apartments", "tag": "장기 숙박", "location": "타오디엔 리버사이드", "reason": "긴 일정과 숙소 생활 편의성을 함께 보는 여행자에게 맞습니다.", "meta": ["장기", "리버사이드", "가족"], "url": "/post/riverside-serviced-apartments/"}]}, "airport": {"name": "공항·떤빈", "summary": "이른 비행과 늦은 도착, 짧은 경유처럼 이동 시간이 여행의 피로를 좌우하는 일정에서 부담을 줄이고 싶은 당신에게 잘 맞는 공항 주변 지역입니다.", "leadTitle": "여행 분위기보다 이동 피로를 줄이는 목적이 분명한 위치입니다.", "leadText": "호치민 시내 관광을 위한 위치라기보다 첫날·마지막 날을 편하게 만들기 위한 선택지입니다.", "bestFor": ["밤 도착", "새벽 출국", "출장", "1박 경유"], "notFor": ["대표 관광 중심", "맛집·카페 여행", "도보 여행"], "bookingTips": ["공항과 가까워도 시간대별 교통 체증을 확인하세요."], "compareGood": "비행 전후 이동 피로를 가장 확실하게 줄일 수 있습니다.", "links": [{"title": "호치민 공항 근처 호텔 추천 TOP5", "url": "/post/ho-chi-minh-airport-hotels/"}, {"title": "호치민 새벽 출국 호텔 추천 TOP5", "url": "/post/ho-chi-minh-early-flight-hotels/"}], "hotels": [{"name": "ibis Saigon Airport", "tag": "공항 실속형", "location": "떤빈·공항 주변", "reason": "공항 접근성을 가장 단순하게 만들고 싶을 때 비교하기 좋습니다.", "meta": ["공항", "실속", "새벽 출국"], "url": "/post/ibis-saigon-airport/"}, {"name": "Holiday Inn & Suites Saigon Airport", "tag": "안정형", "location": "공항 주변", "reason": "객실 안정감과 공항 이동을 함께 보는 일정에 맞습니다.", "meta": ["공항", "가족", "출장"], "url": "/post/holiday-inn-suites-saigon-airport/"}, {"name": "PARKROYAL Saigon", "tag": "공항·시내 균형", "location": "떤빈", "reason": "공항 근처에 머물면서도 호텔 컨디션을 중요하게 볼 때 비교해볼 만합니다.", "meta": ["공항", "컨디션", "부모님"], "url": "/post/parkroyal-saigon/"}, {"name": "First Hotel", "tag": "로컬 안정형", "location": "떤빈", "reason": "공항 주변에서 실용적인 1박을 고려할 때 비교할 수 있습니다.", "meta": ["공항", "1박", "실속"], "url": "/post/first-hotel-saigon/"}, {"name": "Bluesky Serviced Apartment Airport Plaza", "tag": "레지던스형", "location": "공항 인근", "reason": "가족이나 긴 대기 시간이 있는 일정에서 객실 여유를 볼 수 있습니다.", "meta": ["레지던스", "공항", "가족"], "url": "/post/bluesky-serviced-apartment-airport-plaza/"}]}, "binhthanh": {"name": "빈탄·랜드마크81", "summary": "사이공강 전망과 고층 레지던스, 쇼핑몰과 객실 여유가 함께 놓인 공간에서 가족 여행이나 휴식형 일정을 조금 더 편안하게 보내고 싶은 당신에게 잘 어울리는 지역입니다.", "leadTitle": "숙소에서 쉬는 시간과 객실 여유를 중요하게 볼 때 강점이 있습니다.", "leadText": "랜드마크81 주변은 현대적인 숙소 환경과 쇼핑몰 접근성이 좋아 가족·부모님 동반 일정에 비교할 만합니다.", "bestFor": ["가족 여행", "레지던스형 객실", "리버뷰", "쇼핑몰 접근"], "notFor": ["도보 중심 첫 여행", "밤거리 여행", "예산 최우선"], "bookingTips": ["중심 관광지는 그랩 이동이 기본이므로 이동비를 함께 계산하세요."], "compareGood": "객실 여유와 현대적인 숙소 환경을 기대하기 좋습니다.", "links": [{"title": "호치민 가족 여행 호텔 추천 TOP5", "url": "/post/ho-chi-minh-family-hotels/"}, {"title": "호치민 리버뷰 호텔 추천 TOP5", "url": "/post/ho-chi-minh-riverview-hotels/"}], "hotels": [{"name": "Vinpearl Landmark 81, Autograph Collection", "tag": "고층 리버뷰", "location": "랜드마크81", "reason": "리버뷰와 현대적인 숙소 경험을 우선한다면 대표적으로 비교해볼 만합니다.", "meta": ["리버뷰", "가족", "쇼핑몰"], "url": "/post/vinpearl-landmark-81/"}, {"name": "Oakwood Hotel & Apartments Saigon", "tag": "아파트먼트형", "location": "빈탄", "reason": "객실 여유와 장기 숙박 편의성을 함께 볼 수 있습니다.", "meta": ["레지던스", "가족", "장기"], "url": "/post/oakwood-hotel-apartments-saigon/"}, {"name": "Maison De Camille Boutique Hotel", "tag": "부티크 휴식형", "location": "빈탄", "reason": "조용한 동네 분위기와 감각적인 숙소를 원하는 여행자에게 맞습니다.", "meta": ["부티크", "조용함", "커플"], "url": "/post/maison-de-camille/"}, {"name": "The Bloom Pham Viet Chanh", "tag": "동네형 후보", "location": "빈탄", "reason": "로컬 동네 분위기와 중심 접근성을 함께 보는 재방문 여행자에게 잘 맞습니다.", "meta": ["로컬", "카페", "재방문"], "url": "/post/the-bloom-pham-viet-chanh/"}, {"name": "Somerset Ho Chi Minh City", "tag": "가족형 후보", "location": "1군·빈탄 접근", "reason": "가족형 객실과 도심 접근성을 함께 고려할 때 비교할 만합니다.", "meta": ["가족", "레지던스", "도심"], "url": "/post/somerset-ho-chi-minh-city/"}]}},
  questions: [
    { title: "호치민 여행은 몇 번째인가요?", help: "처음이라면 대표 일정을 쉽게 묶는 위치가 중요합니다.", options: [
      { title: "첫 여행", desc: "대표 명소와 식사 이동을 쉽게 잡고 싶어요.", scores: { district1: 5, dongkhoi: 3, district3: 1 } },
      { title: "재방문", desc: "중심만 고집하지 않아도 괜찮아요.", scores: { district3: 3, thaodien: 4, binhthanh: 2 } },
      { title: "짧은 경유", desc: "비행 전후 이동 피로가 가장 중요해요.", scores: { airport: 6, district1: 2 } }
    ]},
    { title: "누구와 함께 가나요?", help: "동행자에 따라 소음, 객실 크기, 이동 방식의 우선순위가 달라집니다.", options: [
      { title: "혼자 여행", desc: "교통과 주변 편의성이 중요해요.", scores: { district1: 3, district3: 3, dongkhoi: 2 } },
      { title: "커플 여행", desc: "카페, 식사, 분위기를 같이 중요하게 봐요.", scores: { dongkhoi: 4, thaodien: 3, district1: 2 } },
      { title: "친구 여행", desc: "밤에도 활기차고 먹거리 많은 곳이 좋아요.", scores: { district1: 5, dongkhoi: 2 } },
      { title: "가족·아이", desc: "무리 없는 이동과 객실 여유가 중요해요.", scores: { binhthanh: 5, dongkhoi: 3, district3: 2 } },
      { title: "부모님 동반", desc: "너무 복잡하지 않고 이동이 단순하면 좋겠어요.", scores: { dongkhoi: 5, binhthanh: 3, district3: 2 } }
    ]},
    { title: "이번 여행에서 가장 중요한 일정은 무엇인가요?", help: "가장 많이 시간을 쓸 활동을 기준으로 숙소를 좁히세요.", options: [
      { title: "대표 관광", desc: "벤탄시장, 통일궁, 중앙우체국 등을 보고 싶어요.", scores: { district1: 5, dongkhoi: 3, district3: 1 } },
      { title: "맛집·마사지", desc: "저녁에도 짧게 이동하고 싶어요.", scores: { district1: 5, dongkhoi: 2 } },
      { title: "카페·여유", desc: "감성 카페와 조용한 동네 분위기가 좋아요.", scores: { thaodien: 5, district3: 3 } },
      { title: "강변 야경·고층 전망", desc: "랜드마크81과 사이공강 야경을 가까이 즐기고 싶어요.", scores: { binhthanh: 8, dongkhoi: 3, thaodien: 2 } },
      { title: "호텔 휴식", desc: "객실 컨디션과 숙소에서 쉬는 시간이 중요해요.", scores: { binhthanh: 5, dongkhoi: 4, thaodien: 2 } }
    ]},
    { title: "공항 이동은 얼마나 중요한가요?", help: "떤선녓공항은 가까워도 시간대에 따라 이동 시간이 달라질 수 있습니다.", options: [
      { title: "매우 중요", desc: "밤 도착이나 새벽 출국이라 최대한 쉽게 이동하고 싶어요.", scores: { airport: 7, district3: 1 } },
      { title: "보통", desc: "공항보다 시내 일정이 더 중요해요.", scores: { district1: 3, dongkhoi: 3, district3: 2 } },
      { title: "크게 중요하지 않음", desc: "숙소 주변 분위기와 여행 흐름이 우선이에요.", scores: { thaodien: 3, binhthanh: 3, district1: 1 } }
    ]},
    { title: "근교 투어가 포함되어 있나요?", help: "꾸찌터널·메콩델타 투어는 픽업 가능 구역이 중요합니다.", options: [
      { title: "투어 2개 이상", desc: "아침 출발과 호텔 픽업이 편했으면 해요.", scores: { district1: 5, dongkhoi: 3 } },
      { title: "투어 하루", desc: "시내 관광도 중요하지만 하루쯤 투어를 넣을 예정이에요.", scores: { district1: 4, dongkhoi: 2, district3: 2 } },
      { title: "투어 없음", desc: "시내, 카페, 쇼핑 중심으로 움직일 예정이에요.", scores: { dongkhoi: 3, district1: 3, thaodien: 2 } }
    ]},
    { title: "숙소 주변 분위기는 어떤 쪽이 좋나요?", help: "호치민은 밤 분위기와 숙면 만족도가 크게 갈릴 수 있습니다.", options: [
      { title: "활기찬 중심", desc: "밤에도 주변에 볼거리와 먹거리가 많았으면 해요.", scores: { district1: 6, dongkhoi: 1 } },
      { title: "깔끔한 도심", desc: "쇼핑몰, 카페, 리버사이드 산책이 좋아요.", scores: { dongkhoi: 5, binhthanh: 2 } },
      { title: "차분한 도심", desc: "중심 접근성은 필요하지만 너무 복잡한 건 싫어요.", scores: { district3: 5, dongkhoi: 2 } },
      { title: "조용한 동네", desc: "번화가보다 여유로운 숙박을 원해요.", scores: { thaodien: 6, binhthanh: 3 } }
    ]},
    { title: "예산은 어떤 기준인가요?", help: "숙박비만 보지 말고 매일 이동비와 이동 피로까지 함께 보세요.", options: [
      { title: "예산 절약", desc: "중심 바로 앞이 아니어도 괜찮아요.", scores: { district3: 5, airport: 2, thaodien: 1 } },
      { title: "가격·위치 균형", desc: "너무 비싸지 않으면서 이동도 편했으면 해요.", scores: { district3: 4, district1: 3, dongkhoi: 2 } },
      { title: "위치·컨디션 우선", desc: "짧은 일정이라 이동 시간과 숙소 만족도가 중요해요.", scores: { dongkhoi: 5, district1: 4, binhthanh: 2 } }
    ]}
  ]
};

const areaResultBadges = {
  "district1": "호치민 첫 여행을 시작하기 가장 쉬운 중심",
  "dongkhoi": "리버사이드와 세련된 도심의 산책",
  "district3": "조용한 도심과 실속을 함께 보는 여유",
  "thaodien": "브런치 카페와 강변 분위기를 즐기기 좋은 곳",
  "airport": "비행 전후 이동이 가벼운 실속 동선",
  "binhthanh": "사이공강 야경과 고층 전망을 기대하기 좋은 곳"
};

const hotelAccessPresets = {
  "district1": {
    "station": "벤탄시장·1군 도보권",
    "airport": "떤선녓공항 차량 약 25~40분"
  },
  "dongkhoi": {
    "station": "동커이·응우옌후에 도보권",
    "airport": "공항 차량 약 30~45분"
  },
  "district3": {
    "station": "전쟁박물관·3군 접근",
    "airport": "공항 차량 약 20~35분"
  },
  "thaodien": {
    "station": "타오디엔 카페거리 접근",
    "airport": "공항 차량 약 35~50분"
  },
  "airport": {
    "station": "공항 주변 차량 5~15분",
    "airport": "떤선녓공항 차량 약 5~15분"
  },
  "binhthanh": {
    "station": "랜드마크81·빈탄 접근",
    "airport": "공항 차량 약 30~45분"
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

cityConfig.adjustScores = (scores, selectedAnswers, questions) => {
  const firstAnswer = questions[0]?.options?.[selectedAnswers[0]]?.title || "";
  const airportAnswer = questions[3]?.options?.[selectedAnswers[3]]?.title || "";
  if (firstAnswer === "짧은 경유" && airportAnswer === "매우 중요" && Object.prototype.hasOwnProperty.call(scores, "airport")) {
    scores.airport += 9;
  }
};
