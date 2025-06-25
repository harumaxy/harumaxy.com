import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const pathValidator = zValidator("param", z.object({ slug: z.string() }));
const queryValidator = zValidator("query", z.object({ userUuid: z.string() }));
const bodyValidator = zValidator("json", z.object({ userUuid: z.string() }));

type Bindings = { DB: D1Database };

const likesApp = new Hono<{ Bindings: Bindings }>()
	.get(":slug", pathValidator, queryValidator, async (c) => {
		const { slug } = c.req.valid("param");
		const { userUuid } = c.req.valid("query");
		const likes = await countLikes(c.env.DB, { slug, userUuid });
		return c.json(likes);
	})
	.post(":slug", pathValidator, bodyValidator, async (c) => {
		const { slug } = c.req.valid("param");
		const { userUuid } = c.req.valid("json");
		const newLikes = await like(c.env.DB, { slug, userUuid });
		return c.json(newLikes);
	})
	.delete(":slug", pathValidator, bodyValidator, async (c) => {
		const { slug } = c.req.valid("param");
		const { userUuid } = c.req.valid("json");
		const newLikes = await unlike(c.env.DB, { slug, userUuid });
		return c.json(newLikes);
	});

interface LikesQueryParam {
	slug: string;
	userUuid: string;
}

export async function countLikes(
	db: D1Database,
	{ slug, userUuid }: LikesQueryParam,
) {
	const result = await db
		.prepare(
			`SELECT
        count(*) as count,
        count(*) FILTER (WHERE user_uuid = ?) as likedByMe
      FROM likes WHERE slug = ? GROUP BY slug`,
		)
		.bind(userUuid, slug)
		.all()
		.then((result) => {
			return (
				(result.results[0] as { count: number; likedByMe: number }) ?? {
					// NOTE: データ件数が0件のとき、カウント行が取得できないのでデフォルト値を返す
					count: 0,
					likedByMe: 0,
				}
			);
		});

	return {
		count: result.count,
		likedByMe: result.likedByMe > 0,
	};
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
export default { fetch: app.fetch };
export type ServerType = typeof app;
