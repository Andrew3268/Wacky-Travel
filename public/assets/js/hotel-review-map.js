(() => {
  const MAP_SELECTOR = "[data-hrj-location-map]";
  const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  let leafletPromise = null;

  const text = (value = "") => String(value ?? "").trim();
  const arr = (value) => Array.isArray(value) ? value : [];
  const num = (value) => typeof value === "number" && Number.isFinite(value) ? value : null;
  const escapeHtml = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

  function ensureLeaflet() {
    if (window.L?.map) return Promise.resolve(window.L);
    if (leafletPromise) return leafletPromise;

    leafletPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-hrj-leaflet-css]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = LEAFLET_CSS;
        link.dataset.hrjLeafletCss = "1";
        document.head.appendChild(link);
      }

      const existing = document.querySelector('script[data-hrj-leaflet-js]');
      if (existing) {
        existing.addEventListener("load", () => resolve(window.L), { once: true });
        existing.addEventListener("error", () => reject(new Error("Leaflet 로드 실패")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.async = true;
      script.dataset.hrjLeafletJs = "1";
      script.onload = () => resolve(window.L);
      script.onerror = () => reject(new Error("Leaflet 로드 실패"));
      document.head.appendChild(script);
    });

    return leafletPromise;
  }

  function iconKind(type = "") {
    if (type === "airport") return "airport";
    if (type === "restaurant" || type === "cafe") return "food";
    return "place";
  }

  function svgIcon(kind = "place") {
    if (kind === "hotel") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4.8c0-.45.35-.8.8-.8h9.4c.45 0 .8.35.8.8V21"/><path d="M8 8h2M13 8h1M8 12h2M13 12h1M8 16h2M13 16h1"/><path d="M3 21h18M16 10h2.2c.45 0 .8.35.8.8V21"/></svg>';
    }
    if (kind === "food") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v4.5A2.5 2.5 0 0 0 7 10M9.5 3v4.5A2.5 2.5 0 0 1 7 10M7 10v11"/><path d="M16 3c2.1 2.1 2.4 6.2 0 8.5V21M16 3v8.5"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>';
  }

  function hotelIcon() {
    return window.L.divIcon({
      className: "hrj-map-label-wrap",
      html: `<div class="hrj-map-label hrj-map-label--hotel"><span class="hrj-map-label__icon">${svgIcon("hotel")}</span></div>`,
      iconSize: null,
      iconAnchor: [20, 47]
    });
  }

  function poiIcon(order, kind = "place", existingAirportSvg = "") {
    const isAirport = kind === "airport";
    const content = isAirport ? existingAirportSvg : escapeHtml(String(order));
    return window.L.divIcon({
      className: "hrj-map-pin-wrap",
      html: `<div class="hrj-map-pin hrj-map-pin--${kind}">${isAirport ? `<span class="hrj-map-pin__icon">${content}</span>` : `<span class="hrj-map-pin__num">${content}</span>`}</div>`,
      iconSize: null,
      iconAnchor: [17, 40]
    });
  }


  function parseConfig(root) {
    try {
      const parsed = JSON.parse(root.dataset.mapConfig || "{}");
      const hotel = parsed?.hotel;
      const categories = arr(parsed?.categories);
      if (!hotel || num(hotel.lat) === null || num(hotel.lng) === null || !categories.length) return null;
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function setupMap(root) {
    if (root.dataset.hrjMapReady === "1") return;
    root.dataset.hrjMapReady = "1";

    const config = parseConfig(root);
    const canvas = root.querySelector("[data-hrj-map-canvas]");
    const wrap = root.querySelector(".hrj-map-canvas-wrap");
    const skeleton = root.querySelector("[data-hrj-map-skeleton]");
    if (!config || !canvas || !wrap) {
      if (skeleton) skeleton.innerHTML = "<p>지도 데이터를 확인할 수 없습니다.</p>";
      return;
    }

    ensureLeaflet().then((L) => {
      if (!L?.map) throw new Error("Leaflet 초기화 실패");

      const map = L.map(canvas, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomSnap: 0.5,
        closePopupOnClick: false
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>'
      }).addTo(map);

      const routePane = map.createPane("hrjRoutePane");
      routePane.style.zIndex = "350";
      routePane.style.pointerEvents = "none";

      const hotelLatLng = [config.hotel.lat, config.hotel.lng];
      const hotelName = text(config.hotel.name) || "호텔";
      const hotelMarker = L.marker(hotelLatLng, {
        icon: hotelIcon(),
        zIndexOffset: 2000,
        keyboard: true,
        interactive: true,
        title: hotelName,
        alt: `${hotelName} 위치`
      }).addTo(map);
      hotelMarker.getElement()?.classList.add("hrj-map-marker--hotel");

      const poiLayer = L.layerGroup().addTo(map);
      const lineLayer = L.layerGroup().addTo(map);
      const markerById = new Map();
      let activeCategory = text(config.defaultCategory) || text(config.categories[0]?.key);
      let activeBounds = null;

      const initialZoom = () => window.matchMedia?.("(max-width: 720px)")?.matches ? 13.5 : 14;
      const getCategory = (key) => config.categories.find((category) => text(category.key) === text(key)) || config.categories[0];

      const setSelected = (id) => {
        root.querySelectorAll("[data-hrj-map-place]").forEach((button) => {
          button.classList.toggle("is-selected", Boolean(id) && button.dataset.hrjMapPlace === String(id) && button.dataset.mapCategory === activeCategory);
        });
      };

      const centerSelectedPlace = (id, { behavior = "smooth" } = {}) => {
        const selectedId = String(id || "");
        if (!selectedId) return;
        const panel = root.querySelector(`[data-hrj-map-panel="${CSS.escape(activeCategory)}"]`);
        const button = panel?.querySelector(`[data-hrj-map-place="${CSS.escape(selectedId)}"]`);
        if (!panel || !button) return;
        const left = button.offsetLeft - ((panel.clientWidth - button.offsetWidth) / 2);
        panel.scrollTo({ left: Math.max(0, left), behavior });
      };

      const getActivePanelBottomInset = () => {
        const panel = root.querySelector(`[data-hrj-map-panel="${CSS.escape(activeCategory)}"]`);
        if (!panel || panel.hidden) return 0;
        const canvasRect = canvas.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        if (!canvasRect.height || !panelRect.height) return 0;
        const panelTop = Math.max(0, panelRect.top - canvasRect.top);
        return Math.max(0, canvasRect.height - panelTop);
      };

      const ensureSelectedMarkerVisible = (item, { animate = true } = {}) => {
        const targetLat = num(item?.coordinates?.lat);
        const targetLng = num(item?.coordinates?.lng);
        if (targetLat === null || targetLng === null || !map._loaded) return;

        const panel = root.querySelector(`[data-hrj-map-panel="${CSS.escape(activeCategory)}"]`);
        if (!panel || panel.hidden) return;

        const canvasRect = canvas.getBoundingClientRect();
        const panelRect = panel.getBoundingClientRect();
        if (!canvasRect.height || !panelRect.height) return;

        const panelTop = panelRect.top - canvasRect.top;
        const markerPoint = map.latLngToContainerPoint([targetLat, targetLng]);
        const safeMarkerBottom = panelTop - 18;
        const overlap = markerPoint.y - safeMarkerBottom;

        if (overlap > 0) {
          map.panBy([0, Math.ceil(overlap)], {
            animate,
            duration: animate ? 0.24 : 0,
            easeLinearity: 0.3
          });
        }
      };

      const clearMarkerFocus = () => {
        root.classList.remove("is-poi-focused");
        markerById.forEach((marker) => {
          const element = marker.getElement();
          const pin = element?.querySelector(".hrj-map-pin");
          element?.classList.remove("is-selected", "is-focused-poi", "is-dimmed");
          pin?.classList.remove("is-selected", "is-dimmed");
          marker.setZIndexOffset(0);
        });
        hotelMarker.setZIndexOffset(2000);
        hotelMarker.getElement()?.classList.remove("is-selected");
      };

      const setMarkerFocus = (id) => {
        const selectedId = String(id);
        root.classList.add("is-poi-focused");

        markerById.forEach((marker, markerId) => {
          const selected = String(markerId) === selectedId;
          const element = marker.getElement();
          const pin = element?.querySelector(".hrj-map-pin");

          // Leaflet wrapper뿐 아니라 실제로 보이는 번호 핀에도 상태 클래스를 직접 적용한다.
          element?.classList.toggle("is-selected", selected);
          element?.classList.toggle("is-focused-poi", selected);
          element?.classList.toggle("is-dimmed", !selected);
          pin?.classList.toggle("is-selected", selected);
          pin?.classList.toggle("is-dimmed", !selected);

          marker.setZIndexOffset(selected ? 2500 : 0);
        });

        hotelMarker.setZIndexOffset(2000);
        hotelMarker.getElement()?.classList.remove("is-selected");
      };

      const clearConnection = ({ keepSelection = false } = {}) => {
        lineLayer.clearLayers();
        clearMarkerFocus();
        if (!keepSelection) setSelected("");
      };

      const showHotelCenter = ({ animate = true, clear = true } = {}) => {
        if (clear) clearConnection();
        const zoom = initialZoom();
        if (animate && map._loaded) map.flyTo(hotelLatLng, zoom, { duration: 0.45 });
        else map.setView(hotelLatLng, zoom, { animate: false });
      };

      const showAllPlaces = () => {
        clearConnection();
        if (!activeBounds || !activeBounds.isValid()) {
          showHotelCenter({ clear: false });
          return;
        }
        map.fitBounds(activeBounds, { padding: [48, 48], maxZoom: 14 });
      };

      const connectLine = (item, kind) => {
        lineLayer.clearLayers();
        const targetLat = num(item?.coordinates?.lat);
        const targetLng = num(item?.coordinates?.lng);
        if (targetLat === null || targetLng === null) return;

        const from = L.latLng(hotelLatLng[0], hotelLatLng[1]);
        const to = L.latLng(targetLat, targetLng);
        const color = "#64748B";

        // 실제 호텔 좌표와 목적지 좌표를 정확한 끝점으로 사용한다.
        // 별도 원형 시작/종료점은 두지 않아 핀의 끝점과 선이 자연스럽게 이어지게 한다.
        L.polyline([from, to], {
          pane: "hrjRoutePane",
          color,
          weight: 2,
          opacity: 0.46,
          lineCap: "round",
          lineJoin: "round",
          interactive: false,
          smoothFactor: 1
        }).addTo(lineLayer);
      };

      const focusHotelAndTarget = (item) => {
        const targetLat = num(item?.coordinates?.lat);
        const targetLng = num(item?.coordinates?.lng);
        if (targetLat === null || targetLng === null) return;

        const hotelPoint = L.latLng(hotelLatLng[0], hotelLatLng[1]);
        const targetPoint = L.latLng(targetLat, targetLng);
        const distanceM = map.distance(hotelPoint, targetPoint);
        const mobile = window.matchMedia?.("(max-width: 720px)")?.matches;

        // 가까운 장소: 호텔을 화면 중심에 유지하면서 충분히 확대한다.
        if (distanceM < 3000) {
          const mirror = [
            (hotelLatLng[0] * 2) - targetLat,
            (hotelLatLng[1] * 2) - targetLng
          ];
          const symmetricBounds = L.latLngBounds([[targetLat, targetLng], mirror]);
          const padding = L.point(mobile ? 58 : 78, mobile ? 98 : 112);
          const boundsZoom = map.getBoundsZoom(symmetricBounds, false, padding);

          let maxZoom = 15;
          if (distanceM <= 250) maxZoom = 18;
          else if (distanceM <= 500) maxZoom = 17.5;
          else if (distanceM <= 1000) maxZoom = 16.5;
          else if (distanceM <= 2000) maxZoom = 15.5;

          const calculatedZoom = Number.isFinite(boundsZoom) ? boundsZoom : initialZoom();
          const zoom = Math.min(maxZoom, Math.max(initialZoom(), calculatedZoom));
          map.setView(hotelLatLng, zoom, { animate: false });
          return;
        }

        // 먼 장소: 호텔과 목적지를 모두 한 지도에 확실히 보여 거리감을 우선한다.
        // 하단 패널이 지도 안에 있으므로 아래쪽 여백을 더 크게 잡는다.
        const farBounds = L.latLngBounds([hotelPoint, targetPoint]);
        const paddingTopLeft = L.point(mobile ? 40 : 56, mobile ? 44 : 56);
        const panelInset = getActivePanelBottomInset();
        const paddingBottomRight = L.point(
          mobile ? 40 : 56,
          Math.max(mobile ? 150 : 170, panelInset + (mobile ? 28 : 34))
        );

        map.fitBounds(farBounds, {
          paddingTopLeft,
          paddingBottomRight,
          maxZoom: distanceM >= 15000 ? 11.5 : distanceM >= 8000 ? 12.5 : distanceM >= 5000 ? 13 : 14,
          animate: false
        });
      };

      const activateItem = (item) => {
        const marker = markerById.get(String(item.id));
        if (!marker) return;
        const kind = iconKind(text(item.type));
        setSelected(item.id);
        setMarkerFocus(item.id);
        requestAnimationFrame(() => centerSelectedPlace(item.id));
        connectLine(item, kind);

        // 가까운 곳은 적절히 확대하고, 먼 곳은 자동 줌아웃한다.
        // 하단 카드 패널이 선택 핀을 가리지 않도록 지도 이동 후 가시 영역을 한 번 더 보정한다.
        focusHotelAndTarget(item);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => ensureSelectedMarkerVisible(item));
        });
      };

      const connectToItem = (item) => {
        activateItem(item);
      };

      const renderCategory = (key) => {
        const category = getCategory(key);
        activeCategory = text(category?.key);
        poiLayer.clearLayers();
        lineLayer.clearLayers();
        clearConnection();
        markerById.clear();

        const activePanel = root.querySelector(`[data-hrj-map-panel="${CSS.escape(activeCategory)}"]`);
        const existingAirportSvg = activePanel?.querySelector(".hrj-map-place__num--airport svg")?.outerHTML || "";
        const bounds = [hotelLatLng];
        arr(category?.items).forEach((item, index) => {
          const lat = num(item?.coordinates?.lat);
          const lng = num(item?.coordinates?.lng);
          if (lat === null || lng === null) return;
          const kind = iconKind(text(item.type));
          const marker = L.marker([lat, lng], {
            icon: poiIcon(index + 1, kind, existingAirportSvg),
            keyboard: true
          }).addTo(poiLayer);
          marker.getElement()?.classList.add("hrj-map-marker--poi");
          marker.on("click", (event) => {
            if (event?.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
            connectToItem(item);
          });
          markerById.set(String(item.id), marker);
          bounds.push([lat, lng]);
        });

        root.querySelectorAll("[data-hrj-map-tab]").forEach((button) => {
          const active = button.dataset.hrjMapTab === activeCategory;
          button.classList.toggle("is-active", active);
          button.setAttribute("aria-selected", active ? "true" : "false");
        });
        root.querySelectorAll("[data-hrj-map-panel]").forEach((panel) => {
          const active = panel.dataset.hrjMapPanel === activeCategory;
          panel.hidden = !active;
          panel.classList.toggle("is-active", active);
          if (active) panel.scrollTo({ left: 0, behavior: "auto" });
        });
        activeBounds = L.latLngBounds(bounds);
        showHotelCenter({ animate: false, clear: false });
      };

      hotelMarker.on("click", (event) => {
        if (event?.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
        showHotelCenter({ animate: true, clear: true });
      });

      root.addEventListener("click", (event) => {
        const tab = event.target.closest("[data-hrj-map-tab]");
        if (tab && root.contains(tab)) {
          renderCategory(tab.dataset.hrjMapTab || "");
          return;
        }
        const centerButton = event.target.closest("[data-hrj-map-center]");
        if (centerButton && root.contains(centerButton)) {
          showHotelCenter();
          return;
        }
        const allButton = event.target.closest("[data-hrj-map-all]");
        if (allButton && root.contains(allButton)) {
          showAllPlaces();
          return;
        }
        const button = event.target.closest("[data-hrj-map-place]");
        if (!button || !root.contains(button)) return;
        const category = getCategory(button.dataset.mapCategory || activeCategory);
        if (text(category?.key) !== activeCategory) renderCategory(category?.key);
        const item = arr(category?.items).find((candidate) => String(candidate?.id) === String(button.dataset.hrjMapPlace));
        if (item) connectToItem(item);
      });

      map.on("click", () => clearConnection());

      renderCategory(activeCategory);
      requestAnimationFrame(() => {
        map.invalidateSize(false);
        root.classList.add("is-map-ready");
        if (skeleton) skeleton.hidden = true;
      });

      window.addEventListener("resize", () => {
        map.invalidateSize(false);
      }, { passive: true });
    }).catch(() => {
      root.classList.add("is-map-error");
      if (skeleton) skeleton.innerHTML = "<p>지도를 불러오지 못했습니다. 아래 장소 목록은 그대로 이용할 수 있습니다.</p>";
    });
  }

  function initAirportJourneyMethods() {
    document.querySelectorAll("[data-hrj-airport-journey]").forEach((journey) => {
      const button = journey.querySelector("[data-hrj-airport-method-toggle]");
      const more = journey.querySelector("[data-hrj-airport-method-more]");
      if (!button || !more || button.dataset.hrjAirportReady === "1") return;
      button.dataset.hrjAirportReady = "1";
      button.addEventListener("click", () => {
        const open = more.hidden;
        more.hidden = !open;
        button.setAttribute("aria-expanded", String(open));
        button.textContent = open ? "간단히 보기" : "다른 방법 보기";
      });
    });
  }

  function init() {
    initAirportJourneyMethods();
    const maps = Array.from(document.querySelectorAll(MAP_SELECTOR));
    if (!maps.length) return;

    if (!("IntersectionObserver" in window)) {
      maps.forEach(setupMap);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        setupMap(entry.target);
      });
    }, { rootMargin: "500px 0px" });

    maps.forEach((mapRoot) => observer.observe(mapRoot));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
