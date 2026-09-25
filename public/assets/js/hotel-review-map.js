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

  function hotelIcon(label) {
    return window.L.divIcon({
      className: "hrj-map-label-wrap",
      html: `<div class="hrj-map-label hrj-map-label--hotel"><span class="hrj-map-label__icon">${svgIcon("hotel")}</span><span class="hrj-map-label__text">${escapeHtml(label)}</span></div>`,
      iconSize: null,
      iconAnchor: [24, 56]
    });
  }

  function poiIcon(order, kind = "place", existingAirportSvg = "") {
    const isAirport = kind === "airport";
    const content = isAirport ? existingAirportSvg : escapeHtml(String(order));
    return window.L.divIcon({
      className: "hrj-map-pin-wrap",
      html: `<div class="hrj-map-pin hrj-map-pin--${kind}">${isAirport ? `<span class="hrj-map-pin__icon">${content}</span>` : `<span class="hrj-map-pin__num">${content}</span>`}</div>`,
      iconSize: null,
      iconAnchor: [17, 38]
    });
  }

  function overlayMetaHtml(item = {}) {
    const walk = num(item?.travel?.walkMinutes);
    const drive = num(item?.travel?.driveMinutes);
    const pills = [];
    if (walk !== null) pills.push(`<span class="hrj-map-overlay__pill"><span>도보 약 ${Math.round(walk)}분</span></span>`);
    if (drive !== null) pills.push(`<span class="hrj-map-overlay__pill"><span>차량 약 ${Math.round(drive)}분</span></span>`);
    return pills.join("");
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
    const overlay = root.querySelector("[data-hrj-map-overlay]");
    const overlayClose = root.querySelector("[data-hrj-map-overlay-close]");
    const overlayName = root.querySelector("[data-hrj-map-overlay-name]");
    const overlayMeta = root.querySelector("[data-hrj-map-overlay-meta]");
    if (!config || !canvas || !wrap || !overlay || !overlayClose || !overlayName || !overlayMeta) {
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

      const hotelLatLng = [config.hotel.lat, config.hotel.lng];
      const hotelMarker = L.marker(hotelLatLng, {
        icon: hotelIcon(config.hotel.name || "호텔"),
        zIndexOffset: 2000,
        keyboard: false,
        interactive: false
      }).addTo(map);
      hotelMarker.getElement()?.classList.add("hrj-map-marker--hotel");

      const poiLayer = L.layerGroup().addTo(map);
      const lineLayer = L.layerGroup().addTo(map);
      const markerById = new Map();
      let activeCategory = text(config.defaultCategory) || text(config.categories[0]?.key);
      let activeBounds = null;
      let activeItem = null;
      let activeMarker = null;
      let closeTimer = null;
      let positionFrame = 0;

      const initialZoom = () => window.matchMedia?.("(max-width: 720px)")?.matches ? 13.5 : 14;
      const getCategory = (key) => config.categories.find((category) => text(category.key) === text(key)) || config.categories[0];

      const setSelected = (id) => {
        root.querySelectorAll("[data-hrj-map-place]").forEach((button) => {
          button.classList.toggle("is-selected", Boolean(id) && button.dataset.hrjMapPlace === String(id) && button.dataset.mapCategory === activeCategory);
        });
      };

      const clearMarkerFocus = () => {
        root.classList.remove("is-poi-focused");
        markerById.forEach((marker) => {
          marker.setOpacity(1);
          marker.getElement()?.classList.remove("is-selected", "is-focused-poi");
          marker.setZIndexOffset(0);
        });
        hotelMarker.setOpacity(1);
        hotelMarker.setZIndexOffset(2000);
      };

      const setMarkerFocus = (id) => {
        const selectedId = String(id);
        root.classList.add("is-poi-focused");
        markerById.forEach((marker, markerId) => {
          const selected = String(markerId) === selectedId;
          marker.setOpacity(1);
          marker.getElement()?.classList.toggle("is-selected", selected);
          marker.getElement()?.classList.toggle("is-focused-poi", selected);
          marker.setZIndexOffset(selected ? 1500 : 0);
        });
        hotelMarker.setZIndexOffset(2000);
      };

      const clearConnection = ({ keepSelection = false } = {}) => {
        lineLayer.clearLayers();
        clearMarkerFocus();
        if (!keepSelection) {
          activeItem = null;
          activeMarker = null;
          setSelected("");
        }
      };

      const hideOverlayNow = () => {
        overlay.hidden = true;
        overlay.classList.remove("is-visible", "hrj-map-overlay--food", "hrj-map-overlay--airport");
      };

      const hideOverlay = ({ clearSelection = true, immediate = false } = {}) => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        if (immediate || overlay.hidden) {
          hideOverlayNow();
          if (clearSelection) clearConnection();
          return;
        }
        overlay.classList.remove("is-visible");
        closeTimer = setTimeout(() => {
          hideOverlayNow();
          if (clearSelection) clearConnection();
          closeTimer = null;
        }, 110);
      };

      const showHotelCenter = ({ animate = true, clear = true } = {}) => {
        if (clear) hideOverlay({ clearSelection: true, immediate: true });
        const zoom = initialZoom();
        if (animate && map._loaded) map.flyTo(hotelLatLng, zoom, { duration: 0.45 });
        else map.setView(hotelLatLng, zoom, { animate: false });
      };

      const showAllPlaces = () => {
        hideOverlay({ clearSelection: true, immediate: true });
        if (!activeBounds || !activeBounds.isValid()) {
          showHotelCenter({ clear: false });
          return;
        }
        map.fitBounds(activeBounds, { padding: [48, 48], maxZoom: 14 });
      };

      const positionOverlay = () => {
        if (!activeMarker || overlay.hidden) return;

        const markerRoot = activeMarker.getElement();
        const pin = markerRoot?.querySelector(".hrj-map-pin") || markerRoot;
        if (!pin) return;

        overlay.hidden = false;
        overlay.style.visibility = "hidden";
        overlay.classList.remove("is-above-pin", "is-below-pin");

        const wrapRect = wrap.getBoundingClientRect();
        const markerRect = pin.getBoundingClientRect();
        const width = overlay.offsetWidth;
        const height = overlay.offsetHeight;
        const markerCenterX = markerRect.left - wrapRect.left + (markerRect.width / 2);
        const markerTop = markerRect.top - wrapRect.top;
        const markerBottom = markerRect.bottom - wrapRect.top;
        const gap = 8;

        let left = markerCenterX - (width / 2);
        let top = markerTop - height - gap;
        let placement = "above";

        // 말풍선 포인터가 번호 핀 가까이에 오도록 8px 간격을 유지하고, 상단 공간이 부족하면 핀 아래로 보냅니다.
        if (top < 8) {
          top = markerBottom + gap;
          placement = "below";
        }

        const maxLeft = Math.max(8, wrap.clientWidth - width - 8);
        const maxTop = Math.max(8, wrap.clientHeight - height - 8);
        left = Math.min(Math.max(8, left), maxLeft);
        top = Math.min(Math.max(8, top), maxTop);

        overlay.style.left = `${left}px`;
        overlay.style.top = `${top}px`;
        overlay.classList.add(placement === "below" ? "is-below-pin" : "is-above-pin");
        overlay.style.removeProperty("visibility");
      };

      const scheduleOverlayPosition = () => {
        if (positionFrame) return;
        positionFrame = requestAnimationFrame(() => {
          positionFrame = 0;
          positionOverlay();
        });
      };

      const renderOverlay = (item, kind) => {
        overlay.classList.remove("hrj-map-overlay--food", "hrj-map-overlay--airport");
        if (kind === "food") overlay.classList.add("hrj-map-overlay--food");
        if (kind === "airport") overlay.classList.add("hrj-map-overlay--airport");
        overlayName.textContent = text(item?.nameKo || item?.name || "장소");
        overlayMeta.innerHTML = overlayMetaHtml(item);
      };

      const connectLine = (item, kind) => {
        lineLayer.clearLayers();
        const target = [item.coordinates.lat, item.coordinates.lng];
        const color = kind === "food" ? "#d95070" : kind === "airport" ? "#5d6875" : "#2f67d8";
        const soft = kind === "food" ? "#f7b5c4" : kind === "airport" ? "#d5dbe2" : "#b6cbff";
        L.polyline([hotelLatLng, target], {
          color,
          weight: 3,
          opacity: 0.82,
          dashArray: "7 8"
        }).addTo(lineLayer);
        L.circleMarker(target, {
          radius: 10,
          color: soft,
          fillColor: "#fff",
          fillOpacity: 0.32,
          weight: 5
        }).addTo(lineLayer);
      };

      const focusHotelAndTarget = (item) => {
        const targetLat = num(item?.coordinates?.lat);
        const targetLng = num(item?.coordinates?.lng);
        if (targetLat === null || targetLng === null) return;

        // 이 지도는 '선택 장소 중심'이 아니라 '호텔 중심' 지도다.
        // 선택 지점의 반대편에 대칭 좌표를 만들어 호텔을 정확한 화면 중심으로 유지하면서
        // 호텔과 선택 지점이 동시에 들어오는 최소 줌을 계산한다.
        const mirror = [
          (hotelLatLng[0] * 2) - targetLat,
          (hotelLatLng[1] * 2) - targetLng
        ];
        const symmetricBounds = L.latLngBounds([[targetLat, targetLng], mirror]);
        const mobile = window.matchMedia?.("(max-width: 720px)")?.matches;
        const padding = L.point(mobile ? 56 : 78, mobile ? 72 : 92);
        const boundsZoom = map.getBoundsZoom(symmetricBounds, false, padding);
        const zoom = Math.min(15, Number.isFinite(boundsZoom) ? boundsZoom : initialZoom());

        // 애니메이션 없이 즉시 적용해 핀/패널 선택 지연을 최소화한다.
        map.setView(hotelLatLng, zoom, { animate: false });
      };

      const activateItem = (item) => {
        const marker = markerById.get(String(item.id));
        if (!marker) return;
        const kind = iconKind(text(item.type));
        activeItem = item;
        activeMarker = marker;
        setSelected(item.id);
        setMarkerFocus(item.id);
        connectLine(item, kind);

        // 가까운 곳은 적절히 확대하고, 먼 곳은 자동 줌아웃하되 호텔은 항상 중심에 둔다.
        focusHotelAndTarget(item);

        renderOverlay(item, kind);
        overlay.hidden = false;
        overlay.classList.remove("is-visible");
        positionOverlay();
        requestAnimationFrame(() => overlay.classList.add("is-visible"));
      };

      const connectToItem = (item) => {
        if (closeTimer) {
          clearTimeout(closeTimer);
          closeTimer = null;
        }
        const switching = activeItem && String(activeItem.id) !== String(item.id) && !overlay.hidden;
        if (switching) {
          // 기존 카드는 즉시 사라지게 하고 다음 프레임에 새 위치에서 다시 나타낸다.
          // 145ms 강제 대기를 제거해 선택 반응 속도를 높였다.
          overlay.classList.remove("is-visible");
          overlay.hidden = true;
          requestAnimationFrame(() => activateItem(item));
          return;
        }
        activateItem(item);
      };

      const renderCategory = (key) => {
        const category = getCategory(key);
        activeCategory = text(category?.key);
        poiLayer.clearLayers();
        lineLayer.clearLayers();
        hideOverlay({ clearSelection: true, immediate: true });
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
        });
        activeBounds = L.latLngBounds(bounds);
        showHotelCenter({ animate: false, clear: false });
      };

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

      overlayClose.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        hideOverlay({ clearSelection: true });
      });
      overlay.addEventListener("click", (event) => event.stopPropagation());
      map.on("click", () => hideOverlay({ clearSelection: true }));
      map.on("zoom move", scheduleOverlayPosition);

      renderCategory(activeCategory);
      requestAnimationFrame(() => {
        map.invalidateSize(false);
        root.classList.add("is-map-ready");
        if (skeleton) skeleton.hidden = true;
      });

      window.addEventListener("resize", () => {
        map.invalidateSize(false);
        scheduleOverlayPosition();
      }, { passive: true });
    }).catch(() => {
      root.classList.add("is-map-error");
      if (skeleton) skeleton.innerHTML = "<p>지도를 불러오지 못했습니다. 아래 장소 목록은 그대로 이용할 수 있습니다.</p>";
    });
  }

  function init() {
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
