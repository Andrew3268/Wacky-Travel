-- Remove the retired homepage/index sidebar ad toggle.
DELETE FROM site_settings WHERE key = 'index_sidebar_ad_enabled';
