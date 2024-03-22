import { sql } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { db } from "./client";

type DB = typeof db;

export function secureQuery<R>(
  _db: DB,
  config: {
    uid: number;
    role: string;
  },
  query: (trx: DB) => Promise<R>
) {
  return _db.transaction(async (trx) => {
    await trx.execute(sql.raw(`SET LOCAL app.uid = ${config.uid};`));
    await trx.execute(sql.raw(`SET LOCAL app.role = '${config.role}';`));
    return query(trx);
  });
}
