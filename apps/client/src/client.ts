import { treaty } from "@elysiajs/eden";
import type { ServerApp } from "@harumaxy-com/server/src";

declare const SERVER_URL: string;
export const app = treaty<ServerApp>(SERVER_URL!);
