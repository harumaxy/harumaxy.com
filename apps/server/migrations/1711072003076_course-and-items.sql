-- Up Migration
CREATE TABLE
  courses (
    id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT
  );

CREATE TABLE
  course_items (
    id serial PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(255)
  );

CREATE TABLE
  purchase_of_course_item (
    uid INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES course_items (id) ON DELETE CASCADE,
    PRIMARY KEY (uid, item_id)
  );

GRANT ALL ON courses TO server_app;

GRANT ALL ON course_items TO server_app;

GRANT ALL ON purchase_of_course_item TO server_app;

ALTER TABLE course_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY only_available_purchased_items ON course_items FOR ALL USING (
  CURRENT_SETTING('app.role') = 'admin' OR
  id IN (
    SELECT
      item_id
    FROM
      purchase_of_course_item
    WHERE
      uid = CURRENT_SETTING('app.uid')::INT
  )
);

-- Down Migration
DROP POLICY only_available_purchased_items ON course_items;

DROP TABLE purchase_of_course_item;

DROP TABLE course_items;

DROP TABLE courses;