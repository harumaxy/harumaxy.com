import { Elysia } from "elysia";

const DEFAULT_PORT = 3000;

const app = new Elysia().get("/", () => "Hello Elysia");

export default app;

console.log(
  [
    "🦊 Elysia is running at http://",
    app.server?.hostname ?? "localhost:",
    app.server?.port ?? DEFAULT_PORT,
  ].join("")
);

export type ServerApp = typeof app;
