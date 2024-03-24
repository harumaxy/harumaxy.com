import { defineConfig } from "drizzle-kit";
import * as fs from "fs";

const d1LocalPath = "../../.wrangler/state/v3/d1/miniflare-D1DatabaseObject";
const sqliteFile = fs
  .readdirSync(d1LocalPath)
  .find((f) => f.endsWith(".sqlite"));

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: d1LocalPath + "/" + sqliteFile,
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: "preserve",
  },
});
