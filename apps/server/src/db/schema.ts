import { pgTable, serial, varchar, timestamp, text, foreignKey, integer, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const pgmigrations = pgTable("pgmigrations", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	run_on: timestamp("run_on", { mode: 'string' }).notNull(),
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

export const courses = pgTable("courses", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
});

export const course_items = pgTable("course_items", {
	id: serial("id").primaryKey().notNull(),
	course_id: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" } ),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description"),
	video_url: varchar("video_url", { length: 255 }),
});

export const purchase_of_course_item = pgTable("purchase_of_course_item", {
	uid: integer("uid").notNull().references(() => users.id, { onDelete: "cascade" } ),
	item_id: integer("item_id").notNull().references(() => course_items.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		purchase_of_course_item_pkey: primaryKey({ columns: [table.uid, table.item_id], name: "purchase_of_course_item_pkey"})
	}
});