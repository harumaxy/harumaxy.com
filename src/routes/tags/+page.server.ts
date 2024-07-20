import { makeDB } from '@/db/client.js';

export async function load({ platform }) {
	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const tags = await db.query.tags.findMany();
	return { tags };
}
