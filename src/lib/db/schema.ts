import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	title: text('title'),
	content: text('content'),
	thumbnail: text('thumbnail'),
	draft: integer('draft', { mode: 'boolean' }).notNull().default(true)
});

export const tags = sqliteTable('tags', {
	id: integer('id'),
	name: text('name').notNull()
});

export type Post = typeof posts.$inferSelect;
export type CreatePost = typeof posts.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type CreateTag = typeof tags.$inferInsert;
