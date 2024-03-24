import { Elysia, t } from "elysia";
import { EventContext } from "@cloudflare/workers-types";
import { Env } from "./types";
import { makeDB } from "./db/client";
import * as schema from "./db/schema";
import * as validators from "./db/validators";
import { eq, sql } from "drizzle-orm";

const DEFAULT_PORT = 3000;

const app = new Elysia({ aot: false }).get("/", () => "Hello Elysia");

function makeApp(env: Env) {
  const db = makeDB(env.DB);
  return app
    .state("db", db)
    .get("/api", async () => {
      return await db.run(
        sql`select name from sqlite_master where type='table';`
      );
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
      "/api/posts/:id",
      async ({ store: { db }, params }) => {
        const id = Number(params.id);
        if (Number.isNaN(id)) {
          return { error: "Invalid id" };
        }
        const result = await db
          .select()
          .from(schema.posts)
          .where(eq(schema.posts.id, id))
          .limit(1);
        return result;
      },
      {
        params: t.Object({ id: t.String() }),
      }
    )
    .post(
      "/api/posts",
      async ({ store: { db }, body }) => {
        const result = await db.insert(schema.posts).values(body).returning();
        return result;
      },
      {
        body: validators.createPost,
      }
    )
    .guard(
      {
        transform: ({ params }) => {
          // @ts-ignore
          const id = +params.id;
          // @ts-ignore
          if (!Number.isNaN(id)) params.id = id;
        },
      },
      (app_) =>
        app_.patch(
          "/api/posts/:id",
          async ({ store: { db }, body, params: { id } }) => {
            const result = await db
              .update(schema.posts)
              .set(body)
              .where(eq(schema.posts.id, id))
              .returning();
            return result;
          },
          {
            params: t.Object({ id: t.Number() }),
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

export type ServerApp = typeof app;
