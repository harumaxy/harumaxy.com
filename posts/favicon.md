---
title: favicon を git lfs で管理したら、Deno Deploy でうまく配信されなかった話
published_at: "2023-04-11 13:48:24"
snippet: Sample blog post.
tags: ["blog", "favicon"]
---




このサイトは [Deno Deploy](https://deno.com/deploy) でSSRしてるわけだけど、 git lfs で追加した favicon がうまく配信されてなかったらしい。

<https://harumaxy.com/favicon.ico>

> git lfs = Git Large File Storage. 大きいファイルを git で管理するためのツール。

fresh プロジェクトの `static` ディレクトリに入れた静的ファイルはアクセスできるわけですが、 Deno DeployがGitソースをpullするときにLFSオブジェクトはpullされない説。

ということでそのまま `favicon.ico` をgitにcommitしたけど、約34KBあるが大丈夫だろうか...

まあfreshプロジェクトを作成した時点で、デフォルトのレモンのfaviconも22KBくらいあったから大丈夫ということにしよう。
