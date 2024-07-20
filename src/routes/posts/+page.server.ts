import { makeDB } from '@/db/client.js';
import * as schemas from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function load({ platform }) {
	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const res = await db.query.posts.findMany({
		columns: {
			id: true,
			published_at: true,
			slug: true,
			title: true,
			thumbnail: true,
			draft: true
		},
		orderBy: [desc(schemas.posts.id)]
	});
	return {
		posts: res as schemas.Post[]
	};
}
