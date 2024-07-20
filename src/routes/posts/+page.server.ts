import { makeDB } from '@/db/client.js';
import * as schemas from '@/db/schema';
import { z } from 'zod';
import matter from 'gray-matter';
import { eq } from 'drizzle-orm';

export async function load({ platform }) {
	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);
	const res = await db.query.posts.findMany({
		columns: { id: true, published_at: true, slug: true, title: true, thumbnail: true, draft: true }
	});
	return {
		posts: res as schemas.Post[]
	};
}

const makePostSchema = z.object({
	slug: z.string(),
	title: z.string(),
	content: z.string(),
	thumbnail: z.string().nullable(),
	draft: z.boolean(),
	published_at: z.date(),
	description: z.string(),
	tags: z.array(z.string())
});

export async function POST({ platform, request }) {
	const bearerToken = request.headers.get('Authorization')?.split(' ')[1];
	if (!bearerToken || bearerToken !== process.env?.['API_KEY']) {
		return new Response('Unauthorized', { status: 401 });
	}

	const reqBody = makePostSchema.parse(await request.text());
	const parsed = matter(reqBody);
	const content_ = parsed.content.replace(/^\n+/, '');
	const { slug, title, thumbnail, draft, published_at, description, content, tags } =
		makePostSchema.parse({
			...parsed.data,
			content: content_
		});

	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);

	await db.transaction(async (db) => {
		const newTagIds = await db
			.insert(schemas.tags)
			.values(tags.map((name) => ({ name })))
			.returning({
				id: schemas.tags.id
			})
			.onConflictDoNothing({ target: schemas.tags.name });

		const [postId] = await db
			.insert(schemas.posts)
			.values([
				{
					slug,
					title,
					thumbnail,
					draft,
					published_at: draft ? published_at : new Date(),
					description,
					content
				}
			])
			.returning({
				id: schemas.posts.id
			})
			.onConflictDoUpdate({
				target: schemas.posts.slug,
				set: {
					title,
					thumbnail,
					draft,
					description,
					content
				}
			});

		await db.delete(schemas.postTag).where(eq(schemas.postTag.post_id, postId.id));
		await db.insert(schemas.postTag).values(
			newTagIds.map(({ id }) => ({
				post_id: postId.id,
				tag_id: id
			}))
		);
	});

	return new Response('Post created', { status: 200 });
}
