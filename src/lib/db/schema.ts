import { sql, relations } from 'drizzle-orm';
import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	title: text('title'),
	content: text('content'),
	thumbnail: text('thumbnail'),
	draft: integer('draft', { mode: 'boolean' }).notNull().default(true),
	published_at: integer('published_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(strftime('%s', 'now'))`),
	description: text('description')
});

export const postsRelations = relations(posts, ({ many }) => ({
	postTags: many(postTag)
}));

export const tags = sqliteTable('tags', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique()
});

export const tagsRelations = relations(tags, ({ many }) => ({
	postTags: many(postTag)
}));

export const postTag = sqliteTable(
	'post_tag',
	{
		post_id: integer('post_id')
			.notNull()
			.references(() => posts.id),
		tag_id: integer('tag_id')
			.notNull()
			.references(() => tags.id)
	},
	(t) => ({
		pk: primaryKey({ columns: [t.post_id, t.tag_id] })
	})
);

export const postTagRelations = relations(postTag, ({ one }) => ({
	post: one(posts, { fields: [postTag.post_id], references: [posts.id] }),
	tag: one(tags, { fields: [postTag.tag_id], references: [tags.id] })
}));

export type Post = typeof posts.$inferSelect;
export type CreatePost = typeof posts.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type CreateTag = typeof tags.$inferInsert;
