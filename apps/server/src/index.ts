import { Elysia, t } from "elysia";
import { EventContext } from "@cloudflare/workers-types";
import { Env } from "./types";
import { makeDB } from "./db/client";
import * as schema from "./db/schema";
import * as validators from "./db/validators";
import { eq, sql } from "drizzle-orm";
import cors from "@elysiajs/cors";
import { createSelectSchema } from "drizzle-typebox";
import { authPlugin } from "./auth";

const DEFAULT_PORT = 3000;
const PostSchema = createSelectSchema(schema.posts);

function makeApp(env: Env) {
  const db = makeDB(env.DB);
  return new Elysia({ aot: false })
    .use(cors())
    .use(authPlugin)
    .get("/", () => "Hello Elysia")
    .state("db", db)
    .get("/api", async () => {
      return "Hello from Pages Functions!";
    })
    .get(
      "/api/posts",
      async ({ store: { db }, params }) => {
        const [per, page] = [params.per ?? "10", params.page ?? 1].map(Number);
        if (Number.isNaN(per) || Number.isNaN(page)) {
          return { error: "Invalid query params" };
        }
        const result = await db
          .select()
          .from(schema.posts)
          .limit(per)
          .offset(Math.max(0, page - 1) * per);
        return result;
      },
      {
        params: t.Object({
          per: t.Optional(t.String()),
          page: t.Optional(t.String()),
        }),
      }
    )

    .get(
      "/api/posts/:slug",
      async ({ set, store: { db }, params: { slug } }) => {
        const result = await db
          .select()
          .from(schema.posts)
          .where(eq(schema.posts.slug, slug))
          .limit(1);
        const post = result[0];
        if (!post) {
          set.status = 404;
          return "Not Found";
        }

        return post;
      },
      {
        response: {
          200: PostSchema,
          404: t.String(),
        },
      }
    )
    .guard(
      {
        beforeHandle: async ({ cookie, jwt, set }) => {
          const auth = await jwt.verify(cookie.auth.value);
          console.log(auth);

          if (!auth) {
            set.status = 401;
            return "Unauthorized";
          }
        },
      },
      (app_) =>
        app_
          .post(
            "/api/posts",
            async ({ store: { db }, body }) => {
              const result = await db
                .insert(schema.posts)
                .values(body)
                .returning();
              return result[0]!;
            },
            {
              body: validators.createPost,
            }
          )
          .patch(
            "/api/posts/:slug",
            async ({ store: { db }, body, params: { slug } }) => {
              const result = await db
                .update(schema.posts)
                .set(body)
                .where(eq(schema.posts.slug, slug))
                .returning();
              return result;
            },
            {
              body: validators.updatePost,
            }
          )
    );
}

export function onRequest(eventContext: EventContext<{}, string, {}>) {
  const { request, env, waitUntil, passThroughOnException } = eventContext;
  const app = makeApp(env as unknown as Env);
  return app.fetch(request as unknown as Request);
}

export type ServerApp = ReturnType<typeof makeApp>;
