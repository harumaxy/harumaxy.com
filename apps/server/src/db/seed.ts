import { Column, sql } from "drizzle-orm";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core";

export function conflictUpdateSet<TTable extends PgTable>(
  table: TTable,
  columns: (keyof TTable["_"]["columns"] & keyof TTable)[]
): PgUpdateSetSource<TTable> {
  return Object.assign(
    {},
    ...columns.map((k) => ({
      [k]: sql.raw(`excluded.${(table[k] as Column).name}`),
    }))
  ) as PgUpdateSetSource<TTable>;
}

const client = postgres(process.env.DATABASE_URL_FOR_APP!);
const db = drizzle(client);

await db.transaction(async (trx) => {
  await trx.execute(sql`SET LOCAL app.uid = 1;`);
  await trx
    .insert(schema.users)
    .values([
      {
        id: 1,
        username: "me",
      },
      // {
      //   id: 2,
      //   username: "other",
      // },
    ])
    .onConflictDoUpdate({
      target: [schema.users.id],
      set: {
        username: sql`EXCLUDED.username`,
      },
    });
});

await db.transaction(async (trx) => {
  await trx.execute(sql`SET LOCAL app.uid = 1;`);
  await trx
    .insert(schema.posts)
    .values([
      {
        id: 1,
        authorId: 1,
        title: "Hello",
        body: "World",
      },
    ])
    .onConflictDoUpdate({
      target: [schema.posts.id],
      set: conflictUpdateSet(schema.posts, ["authorId", "title", "body"]),
    });
});

process.exit(0);
