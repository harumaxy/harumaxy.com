import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as relations from "./relations";

const client = postgres(process.env.DATABASE_URL_FOR_APP!);
export const db = drizzle(client, { schema: { ...schema, ...relations } });