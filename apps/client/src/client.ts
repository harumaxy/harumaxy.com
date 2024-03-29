import { treaty } from "@elysiajs/eden";
import type { ServerApp } from "@harumaxy-com/server/src";

export const app = treaty<ServerApp>(window.location.origin);
