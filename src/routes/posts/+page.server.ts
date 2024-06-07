import { makeDB } from '@/db/client.js';
import { posts, type Post } from '@/db/schema';

export async function load({ platform }) {
	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const res = await db.select().from(posts);
	return {
		posts: res as Post[]
	};
}
