/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		// 他のカスタムローカル変数があれば追加
	}
}
