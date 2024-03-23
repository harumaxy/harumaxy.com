import { Elysia } from "elysia";
import { EventContext } from "@cloudflare/workers-types";

const DEFAULT_PORT = 3000;

const app = new Elysia({ aot: false }).get("/", () => "Hello Elysia");

export const handle = (app: Elysia) => {
  return (eventContext: EventContext<{}, string, {}>) => {
    const { request, env, waitUntil, passThroughOnException } = eventContext;
    return app.fetch(request as unknown as Request);
  };
};
export const onRequest = handle(app);

export type ServerApp = typeof app;
