import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db",
  driver: "d1",
  dbCredentials: {
    dbName: "harumaxy-com-db",
    wranglerConfigPath: "../../wrangler.toml",
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: "preserve",
  },
});
