import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 }).notNull().unique(),
    title: varchar("title", { length: 256 }).notNull(),
    content: text("content"),
    published_at: timestamp("published_at", { mode: "date" }).defaultNow(),
    thumbnail: varchar("thumbnail", { length: 256 }),
  },
  (posts) => {
    return {};
  }
);
