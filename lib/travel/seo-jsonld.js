export function buildBreadcrumbJsonLd(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function buildDestinationJsonLd({ destination, url, siteName }) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.summary || destination.meta_description || "",
    url,
    image: destination.cover_image ? [destination.cover_image] : undefined,
    touristType: ["가족여행", "커플여행", "자유여행"],
    isPartOf: {
      "@type": "WebSite",
      name: siteName
    }
  };
}

export function buildHotelJsonLd({ hotel, destination, url }) {
  const addressParts = [hotel.address, destination?.city, destination?.country].filter(Boolean).join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    alternateName: hotel.name_en || undefined,
    description: hotel.summary || hotel.meta_description || "",
    url,
    image: hotel.cover_image ? [hotel.cover_image] : undefined,
    address: addressParts ? {
      "@type": "PostalAddress",
      streetAddress: hotel.address || undefined,
      addressLocality: destination?.city || undefined,
      addressCountry: destination?.country || undefined
    } : undefined,
    checkinTime: hotel.checkin_time || undefined,
    checkoutTime: hotel.checkout_time || undefined,
    amenityFeature: safeJsonArray(hotel.suitable_for_json).map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true
    }))
  };
}

export function buildItemListJsonLd({ items = [], url }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name || item.title,
      url: item.url
    }))
  };
}

function safeJsonArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
