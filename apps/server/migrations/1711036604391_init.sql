-- Up Migration
CREATE TABLE
  users (id SERIAL PRIMARY KEY, username TEXT);

CREATE TABLE
  posts (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users (id),
    title TEXT,
    body TEXT
  );

CREATE USER server_app
WITH
  LOGIN PASSWORD 'postgres';

DO $$ BEGIN
  GRANT SELECT,INSERT,UPDATE,DELETE ON users TO server_app;  -- ALL でもいい
  GRANT SELECT,INSERT,UPDATE,DELETE ON posts TO server_app;
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
  CREATE POLICY only_available_own_user ON users FOR ALL TO server_app USING (
    CURRENT_SETTING('app.role') = 'admin' OR
    id = CURRENT_SETTING('app.uid')::INT
    
  );
  CREATE POLICY only_available_own_post ON posts FOR ALL TO server_app USING (
    CURRENT_SETTING('app.role') = 'admin' OR
    author_id = CURRENT_SETTING('app.uid')::INT
    
  );
END $$;

-- Down Migration
DROP POLICY only_available_own_user ON users;

DROP POLICY only_available_own_post ON posts;

DROP TABLE posts;

DROP TABLE users;

DROP USER server_app;