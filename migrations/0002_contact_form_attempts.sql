CREATE TABLE IF NOT EXISTS contact_form_attempts (
  id TEXT PRIMARY KEY,
  ip_hash TEXT,
  email_hash TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  successful INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_contact_form_attempts_ip_time
  ON contact_form_attempts(ip_hash, attempted_at);

CREATE INDEX IF NOT EXISTS idx_contact_form_attempts_email_time
  ON contact_form_attempts(email_hash, attempted_at);

CREATE INDEX IF NOT EXISTS idx_contact_form_attempts_attempted_at
  ON contact_form_attempts(attempted_at);
