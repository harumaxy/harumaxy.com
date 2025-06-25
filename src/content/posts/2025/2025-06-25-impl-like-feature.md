---
title: Astro + Cloudflare Worker の静的ブログサイトに、いいね機能を追加する
published: 2025-06-25
description: ''
tags: [cloudflare, astro]
category: 'dev'
draft: true 
lang: 'ja'
---

## @astrojs/cloudflare アダプター

最近は Workers でも静的アセット配信ができて、 Pages から移行が推奨されている。
が、astro の cloudflare アダプターが Pages 前提なので、ちょっと工夫が必要

https://cai.im/blog/migrate-astro-site-from-cloudflare-pages-to-workers/


## Astro Server Endpoint

https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes

Astro はもはやフルスタック Web フレームワークなので、 API Route 的なものを持てる

```ts
// src/pages/api/likes/[...slug].ts
import type { APIRoute } from "astro";

export const prerender = false;  // オンデマンドの動的ルートにするため必要

export const GET: APIRoute = async ({ request }) => {
  return new Response(Math.random().toString())
}
```

とりあえずランダム値を返している。  
あとはどこかのデータストアに書き込んだり読み込んだりするだけのシンプルな話となる。


```sh
pnpm astro add cloudflare
```

```sh
pnpm wrangler create d1 <db-name>
```

```toml
# wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "harumaxy-com-db"
database_id = "****-****-****-****-****"
```