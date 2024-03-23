import { Elysia } from "elysia";

const DEFAULT_PORT = 3000;

const app = new Elysia({ aot: false }).get("/", () => "Hello Elysia");

export default {
  async fetch(req: Request) {
    return await app.handle(req);
  },
};

export type ServerApp = typeof app;
