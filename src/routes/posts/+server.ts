import { makeDB } from '@/db/client.js';
import * as schemas from '@/db/schema';
import { z } from 'zod';
import * as YAML from 'yaml';
import { eq } from 'drizzle-orm';

export function GET() {
	return new Response('Method not allowed', { status: 405 });
}

const makePostSchema = z.object({
	slug: z.string(),
	title: z.string(),
	content: z.string(),
	thumbnail: z.string().nullable(),
	draft: z.boolean(),
	published_at: z.string().transform((v) => new Date(v)),
	description: z.string().nullish(),
	tags: z.array(z.string())
});

export async function POST({ platform, request }) {
	const bearerToken = request.headers.get('Authorization')?.split(' ')[1];
	if (!bearerToken || bearerToken !== platform?.env['API_KEY']) {
		return new Response('Unauthorized', { status: 401 });
	}

	const reqBody = await request.text();
	const [, frontmatter, content_] = reqBody.split('---\n');
	const parsed = YAML.parse(frontmatter);
	const zodResult = makePostSchema.safeParse({
		...parsed,
		content: content_.replace(/^\n+/, '')
	});
	if (!zodResult.success) {
		return new Response('Invalid post data' + JSON.stringify(zodResult.error), { status: 400 });
	}

	const { slug, title, thumbnail, draft, published_at, description, content, tags } =
		zodResult.data;

	const d1 = platform?.env.DB;
	if (!d1) return new Response('No DB', { status: 500 });
	const db = makeDB(d1);

	let tagIds: { id: number }[] = [];
	if (tags.length > 0) {
		await db
			.insert(schemas.tags)
			.values(tags.map((name) => ({ name })))
			.returning({
				id: schemas.tags.id
			})
			.onConflictDoNothing({ target: schemas.tags.name });

		tagIds = await db.query.tags.findMany({
			where: (tags_, { inArray }) => inArray(tags_.name, tags),
			columns: {
				id: true
			}
		});
	}

	const [postId] = await db
		.insert(schemas.posts)
		.values([
			{
				slug,
				title,
				thumbnail,
				draft,
				published_at: draft ? undefined : published_at ?? new Date(),
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

	if (tagIds.length > 0) {
		await db.delete(schemas.postTag).where(eq(schemas.postTag.post_id, postId.id));

		await db.insert(schemas.postTag).values(
			tagIds.map(({ id }) => ({
				post_id: postId.id,
				tag_id: id
			}))
		);
	}

	return new Response('Post created', { status: 200 });
}
