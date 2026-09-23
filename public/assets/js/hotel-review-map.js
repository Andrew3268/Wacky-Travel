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
    .replace(/"/g, "&quot;")
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
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V5.5c0-.8.7-1.5 1.5-1.5h8c.8 0 1.5.7 1.5 1.5V21M16 9h2.5c.8 0 1.5.7 1.5 1.5V21M8 8h2M8 12h2M8 16h2M13 8h.01M13 12h.01M13 16h.01M3 21h18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    if (kind === "airport") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.8 13.1 10 11l2.7-7.2c.2-.6.8-1 1.4-1 .9 0 1.5.9 1.2 1.7L13.8 10l5.6-1.9c.9-.3 1.8.3 1.8 1.3 0 .5-.3 1-.8 1.2l-6.8 2.9-1.1 6.1-1.4.5-1.7-5.4-3.4 1.4-1 2-1 .3.2-3.2-2.1-2.4 1.7-.7Z" fill="currentColor"/></svg>';
    }
    if (kind === "food") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v5.5A2.5 2.5 0 0 0 7 11v10M9.5 3v5.5A2.5 2.5 0 0 1 7 11M16 3v18M16 3c2.2 1.8 3.3 4.1 3.3 6.8H16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.2" fill="currentColor"/></svg>';
  }

  function markerIcon(label, kind = "place") {
    return window.L.divIcon({
      className: "hrj-map-label-wrap",
      html: `<div class="hrj-map-label hrj-map-label--${kind}"><span class="hrj-map-label__icon">${svgIcon(kind)}</span><span class="hrj-map-label__text">${escapeHtml(label)}</span></div>`,
      iconSize: null,
      iconAnchor: [16, 37],
      popupAnchor: [0, -31]
    });
  }

  function distanceLabel(item = {}) {
    const label = text(item?.distance?.label);
    if (label) return label;
    const km = num(item?.distance?.valueKm);
    if (km === null) return "";
    if (km < 1) return `약 ${Math.round(km * 1000)}m`;
    return `약 ${km.toFixed(km < 10 ? 1 : 0)}km`;
  }

  function travelLabel(item = {}) {
    const bits = [];
    const walk = num(item?.travel?.walkMinutes);
    const drive = num(item?.travel?.driveMinutes);
    if (walk !== null) bits.push(`도보 약 ${Math.round(walk)}분`);
    if (drive !== null) bits.push(`차량 약 ${Math.round(drive)}분`);
    return bits.join(" · ");
  }

  function popupHtml(item = {}) {
    const local = text(item.nameLocal) || text(item.nameEn);
    const info = [distanceLabel(item), travelLabel(item)].filter(Boolean).join(" · ");
    return `<div class="hrj-map-popup"><strong>${escapeHtml(text(item.nameKo))}</strong>${local ? `<span>${escapeHtml(local)}</span>` : ""}${info ? `<small>호텔에서 ${escapeHtml(info)}</small>` : ""}</div>`;
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
    const skeleton = root.querySelector("[data-hrj-map-skeleton]");
    if (!config || !canvas) {
      if (skeleton) skeleton.innerHTML = "<p>지도 데이터를 확인할 수 없습니다.</p>";
      return;
    }

    ensureLeaflet().then((L) => {
      if (!L?.map) throw new Error("Leaflet 초기화 실패");

      const map = L.map(canvas, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomSnap: 0.5
      });
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '<a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>'
      }).addTo(map);

      const hotelLatLng = [config.hotel.lat, config.hotel.lng];
      const hotelMarker = L.marker(hotelLatLng, {
        icon: markerIcon(config.hotel.name || "호텔", "hotel"),
        zIndexOffset: 2000,
        keyboard: true
      }).addTo(map).bindPopup(`<div class="hrj-map-popup"><strong>${escapeHtml(config.hotel.name || "호텔")}</strong><small>호텔 위치</small></div>`);

      const poiLayer = L.layerGroup().addTo(map);
      const lineLayer = L.layerGroup().addTo(map);
      const markerById = new Map();
      let activeCategory = text(config.defaultCategory) || text(config.categories[0]?.key);
      let activeBounds = null;

      const initialZoom = () => window.matchMedia?.("(max-width: 720px)")?.matches ? 13.5 : 14;
      const getCategory = (key) => config.categories.find((category) => text(category.key) === text(key)) || config.categories[0];

      const showHotelCenter = ({ animate = true, clearConnection = true } = {}) => {
        if (clearConnection) {
          lineLayer.clearLayers();
          setSelected("");
          clearMarkerFocus();
        }
        const zoom = initialZoom();
        if (animate && map._loaded) map.flyTo(hotelLatLng, zoom, { duration: 0.45 });
        else map.setView(hotelLatLng, zoom, { animate: false });
      };

      const showAllPlaces = () => {
        if (!activeBounds || !activeBounds.isValid()) {
          showHotelCenter();
          return;
        }
        lineLayer.clearLayers();
        setSelected("");
        clearMarkerFocus();
        map.fitBounds(activeBounds, { padding: [48, 48], maxZoom: 14 });
      };

      const setSelected = (id) => {
        root.querySelectorAll("[data-hrj-map-place]").forEach((button) => {
          button.classList.toggle("is-selected", button.dataset.hrjMapPlace === String(id) && button.dataset.mapCategory === activeCategory);
        });
      };

      const clearMarkerFocus = () => {
        root.classList.remove("is-poi-focused");
        markerById.forEach((marker) => {
          marker.getElement()?.classList.remove("is-focused-poi");
          marker.setZIndexOffset(0);
        });
      };

      const setMarkerFocus = (id) => {
        const selectedId = String(id);
        root.classList.add("is-poi-focused");
        markerById.forEach((marker, markerId) => {
          const focused = String(markerId) === selectedId;
          marker.getElement()?.classList.toggle("is-focused-poi", focused);
          marker.setZIndexOffset(focused ? 1500 : 0);
        });
        hotelMarker.setZIndexOffset(2000);
      };

      hotelMarker.getElement()?.classList.add("hrj-map-marker--hotel");

      const connectToItem = (item, { openPopup = true } = {}) => {
        const marker = markerById.get(String(item.id));
        if (!marker) return;
        lineLayer.clearLayers();
        const target = [item.coordinates.lat, item.coordinates.lng];
        L.polyline([hotelLatLng, target], {
          color: iconKind(item.type) === "food" ? "#e11d48" : "#2563eb",
          weight: 3,
          opacity: 0.8,
          dashArray: "7 8"
        }).addTo(lineLayer);
        L.circleMarker(target, {
          radius: 11,
          color: iconKind(item.type) === "food" ? "#fda4af" : "#93c5fd",
          fillColor: "#fff",
          fillOpacity: 0.2,
          weight: 5
        }).addTo(lineLayer);
        map.fitBounds([hotelLatLng, target], { padding: [55, 55], maxZoom: 15 });
        if (openPopup) marker.openPopup();
        setSelected(item.id);
        setMarkerFocus(item.id);
      };

      const renderCategory = (key) => {
        const category = getCategory(key);
        activeCategory = text(category?.key);
        poiLayer.clearLayers();
        lineLayer.clearLayers();
        clearMarkerFocus();
        markerById.clear();

        const bounds = [hotelLatLng];
        arr(category?.items).forEach((item) => {
          const lat = num(item?.coordinates?.lat);
          const lng = num(item?.coordinates?.lng);
          if (lat === null || lng === null) return;
          const kind = iconKind(text(item.type));
          const marker = L.marker([lat, lng], {
            icon: markerIcon(text(item.nameKo), kind),
            keyboard: true
          }).addTo(poiLayer).bindPopup(popupHtml(item));
          marker.getElement()?.classList.add("hrj-map-marker--poi");
          marker.on("click", () => connectToItem(item, { openPopup: false }));
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
        setSelected("");
        activeBounds = L.latLngBounds(bounds);
        showHotelCenter({ animate: false, clearConnection: false });
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

      renderCategory(activeCategory);
      requestAnimationFrame(() => {
        map.invalidateSize(false);
        root.classList.add("is-map-ready");
        if (skeleton) skeleton.hidden = true;
      });

      window.addEventListener("resize", () => map.invalidateSize(false), { passive: true });
      hotelMarker.setZIndexOffset(2000);
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

    maps.forEach((map) => observer.observe(map));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
