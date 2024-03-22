import { sql } from "drizzle-orm";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import { db } from "./client";

type DB = typeof db;

interface SecurityConfig {
  uid: number;
  role: string;
}

export function secureQuery<R>(
  conn: DB,
  { uid, role }: SecurityConfig,
  query: (trx: DB) => Promise<R>
) {
  return conn.transaction(async (trx) => {
    await trx.execute(sql.raw(`SET LOCAL app.uid = ${uid};`));
    await trx.execute(sql.raw(`SET LOCAL app.role = '${role}';`));
    return query(trx);
  });
}
