import { Database } from 'bun:sqlite';
import * as schemas from '../src/lib/db/schema';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const exportSql = await Bun.file('./blog/.temp/export.sql').text();
const db = new Database(':memory:');
await db.run(exportSql);

export const client = drizzle(db, { schema: schemas });
