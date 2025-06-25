import { Hono } from "hono";

type Bindings = {
	DB: D1Database;
};

const likesApp = new Hono<{ Bindings: Bindings }>()
	.get(":slug", async (c) => {
		const slug = c.req.param("slug");
		const userUuid = c.req.query("userUuid");
		if (!slug || !userUuid) {
			return c.json({ error: "Slug and userUuid are required" }, 400);
		}

		const likes = await countLikes(c.env.DB, { slug, userUuid });
		return c.json(likes);
	})
	.post(":slug", async (c) => {
		const slug = c.req.param("slug");
		const { userUuid } = await c.req.json();
		if (!slug || !userUuid) {
			return c.json({ error: "Slug and userUuid are required" }, 400);
		}
		const newLikes = await like(c.env.DB, { slug, userUuid });
		return c.json(newLikes);
	})
	.delete(":slug", async (c) => {
		const slug = c.req.param("slug");
		const { userUuid } = await c.req.json();
		if (!slug || !userUuid) {
			return c.json({ error: "Slug and userUuid are required" }, 400);
		}
		const newLikes = await unlike(c.env.DB, { slug, userUuid });
		return c.json(newLikes);
	});

interface LikesQueryParam {
	slug: string;
	userUuid: string;
}

async function countLikes(db: D1Database, { slug, userUuid }: LikesQueryParam) {
	const likedByMeProm = db
		.prepare("SELECT user_uuid FROM likes WHERE slug = ? AND user_uuid = ?")
		.bind(slug, userUuid)
		.all()
		.then((result) => result.results.length > 0);
	const countProm = db
		.prepare("SELECT count(*) as count FROM likes WHERE slug = ?")
		.bind(slug)
		.all()
		.then((result) => (result.results[0].count as number) ?? 0);
	const [likedByMe, count] = await Promise.all([likedByMeProm, countProm]);

	return { count, likedByMe };
}

async function like(db: D1Database, { slug, userUuid }: LikesQueryParam) {
	await db
		.prepare(
			"INSERT INTO likes (slug, user_uuid) VALUES (?, ?) ON CONFLICT DO NOTHING",
		)
		.bind(slug, userUuid)
		.run();

	return countLikes(db, { slug, userUuid });
}

async function unlike(db: D1Database, { slug, userUuid }: LikesQueryParam) {
	await db
		.prepare("DELETE FROM likes WHERE slug = ? AND user_uuid = ?")
		.bind(slug, userUuid)
		.run();

	return countLikes(db, { slug, userUuid });
}

const app = new Hono<{ Bindings: Bindings }>().route("/api/likes", likesApp);

export default {
	fetch: app.fetch,
};
