import { makeDB } from '@/db/client';
import { posts } from '@/db/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ platform }) => {
	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const post = await db.select().from(posts).where(eq(posts.id, 1));
	return json(post);
};
