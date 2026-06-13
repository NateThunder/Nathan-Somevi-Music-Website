CREATE TABLE IF NOT EXISTS tour_dates (
  id TEXT PRIMARY KEY,
  event_date TEXT NOT NULL,
  city TEXT NOT NULL,
  venue TEXT NOT NULL,
  ticket_url TEXT NOT NULL DEFAULT '',
  is_free INTEGER NOT NULL DEFAULT 0,
  is_sold_out INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS releases (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  cover_image_path TEXT NOT NULL,
  release_date TEXT,
  is_featured INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS release_platform_links (
  id TEXT PRIMARY KEY,
  release_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (release_id) REFERENCES releases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS charts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image_path TEXT NOT NULL,
  thumbnail_path TEXT,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS merch_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image_path TEXT NOT NULL,
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_uploads (
  bucket TEXT NOT NULL,
  path TEXT NOT NULL,
  content_type TEXT NOT NULL,
  body_base64 TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (bucket, path)
);

CREATE INDEX IF NOT EXISTS idx_tour_dates_order ON tour_dates(order_index);
CREATE INDEX IF NOT EXISTS idx_releases_order ON releases(order_index);
CREATE INDEX IF NOT EXISTS idx_release_platform_links_release_order
  ON release_platform_links(release_id, order_index);
CREATE INDEX IF NOT EXISTS idx_charts_order ON charts(order_index);
CREATE INDEX IF NOT EXISTS idx_merch_items_order ON merch_items(order_index);
