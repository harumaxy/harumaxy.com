import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  foreignKey,
  integer,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const pgmigrations = pgTable("pgmigrations", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  run_on: timestamp("run_on", { mode: "string" }).notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  username: text("username"),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey().notNull(),
  author_id: integer("author_id").references(() => users.id),
  title: text("title"),
  body: text("body"),
});
