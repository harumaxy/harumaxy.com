CREATE TABLE likes (
  slug TEXT NOT NULL,
  user_uuid TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (slug, user_uuid)
);


CREATE INDEX idx_likes_user_uuid ON likes(user_uuid);