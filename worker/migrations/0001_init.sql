-- Context Bot · esquema inicial. Sin contenido de conversaciones.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,            -- "gh_<id numérico de GitHub>"
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS bots (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, name)
);
CREATE TABLE IF NOT EXISTS status_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  bot_name TEXT NOT NULL,
  colour TEXT NOT NULL CHECK (colour IN ('green','yellow','red')),
  turns INTEGER,
  usage_share REAL,
  routines_per_day INTEGER,
  compacted INTEGER,
  note TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_history_user_bot ON status_history(user_id, bot_name, created_at);
CREATE INDEX IF NOT EXISTS idx_history_created ON status_history(created_at);
CREATE TABLE IF NOT EXISTS rate (
  user_id TEXT NOT NULL,
  bucket TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (user_id, bucket, window_start)
);
