import { Column, sql } from "drizzle-orm";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { PgTable, PgUpdateSetSource } from "drizzle-orm/pg-core";
import { secureQuery } from "./secure-query";
import { db } from "./client";

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

await secureQuery(db, { uid: 1, role: "user" }, async (trx) => {
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

await secureQuery(db, { uid: 1, role: "user" }, async (trx) => {
  await trx
    .insert(schema.posts)
    .values([
      {
        id: 1,
        author_id: 1,
        title: "Hello",
        body: "World",
      },
    ])
    .onConflictDoUpdate({
      target: [schema.posts.id],
      set: conflictUpdateSet(schema.posts, ["author_id", "title", "body"]),
    });
});

await secureQuery(db, { uid: 1, role: "admin" }, async (trx) => {
  await trx
    .insert(schema.courses)
    .values([
      {
        id: 1,
        title: "course 1",
      },
    ])
    .onConflictDoNothing();
  await trx
    .insert(schema.course_items)
    .values(
      [1, 2, 3, 4, 5].map(
        (i) =>
          ({
            id: i,
            course_id: 1,
            title: `item ${i}`,
          } satisfies typeof schema.course_items.$inferInsert)
      )
    )
    .onConflictDoNothing();
  await trx
    .insert(schema.purchase_of_course_item)
    .values(
      [1, 2, 3].map(
        (i) =>
          ({
            uid: 1,
            item_id: i,
          } satisfies typeof schema.purchase_of_course_item.$inferInsert)
      )
    )
    .onConflictDoNothing();
});

process.exit(0);
