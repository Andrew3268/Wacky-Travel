-- Rename the canonical travel-tip content type label.
UPDATE content_types
SET label = '여행 꿀팁',
    updated_at = CURRENT_TIMESTAMP
WHERE slug = 'travel_tip'
  AND label <> '여행 꿀팁';
