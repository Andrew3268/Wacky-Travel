-- Hotel hero guest rating badge
ALTER TABLE hotels ADD COLUMN guest_rating TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_hotels_guest_rating ON hotels(guest_rating);
