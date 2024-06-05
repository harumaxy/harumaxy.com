import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export const makeDB = (client: D1Database) => drizzle(client, { schema });
export type DB = ReturnType<typeof makeDB>;
