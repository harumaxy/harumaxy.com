import { makeDB, type DB } from '@/db/client.js';
import * as schemas from '@/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function load({ platform, url }) {
	const tag = url.searchParams.get('tag');

	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const rows = await query(db, { tag });
	return { rows };
}

async function query(db: DB, params?: { tag: string | null }) {
	const { tag } = params ?? {};
	const baseQuery = db
		.select({
			post: schemas.posts,
			tag: schemas.tags
		})
		.from(schemas.posts)
		.leftJoin(schemas.postTag, eq(schemas.posts.id, schemas.postTag.post_id))
		.leftJoin(schemas.tags, eq(schemas.tags.id, schemas.postTag.tag_id))
		.orderBy(desc(schemas.posts.id));

	const query = tag ? baseQuery.where(eq(schemas.tags.name, tag)) : baseQuery;
	const result = await query;

	const grouped = result.reduce<Map<number, { post: schemas.Post; tags: schemas.Tag[] }>>(
		(acc, { post, tag }) => {
			const existing = acc.get(post.id) ?? { post, tags: [] };
			acc.set(post.id, {
				post: post,
				tags: tag ? [...existing.tags, tag] : existing.tags
			});
			return acc;
		},
		new Map()
	);
	return Array.from(grouped.values()).toSorted((a, b) => b.post.id - a.post.id);
}

export type PostListItem = Awaited<ReturnType<typeof query>>[number];
