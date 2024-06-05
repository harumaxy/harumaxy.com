import { makeDB } from '@/db/client.js';
import { posts, type Post } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ request, platform }) {
	try {
		const d1 = platform?.env.DB;
		if (!d1) return new Response('No DB', { status: 500 });
		const db = makeDB(d1);
		const res = await db.select().from(posts).where(eq(posts.id, 1));
		return {
			posts: res as Post[]
		};
	} catch (e) {
		if (request.url.includes('localhost')) {
			return {
				posts: [1, 2, 3, 4, 5].map(
					(i) =>
						({
							id: i,
							title: 'Post ' + i,
							slug: 'post-' + i,
							content: 'test',
							draft: true,
							thumbnail: 'https://blog-images.harumaxy.com/avatar.png'
						}) satisfies Post
				)
			};
		}
		throw e;
	}
}
