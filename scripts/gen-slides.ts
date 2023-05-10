import { Marp } from "npm:@marp-team/marp-core";
import { getPosts } from "../utils/posts.ts";
import * as path from "$std/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const posts = await getPosts();
const marpMarkdowns = posts.filter((post) => post.marp);

for (const md of marpMarkdowns) {
  const marp = new Marp();
  const { html: htmls, css } = marp.render(md.content, {
    htmlAsArray: true,
  });
  Deno.writeFile(
    path.join(__dirname, `../slides/${md.slug}.json`),
    new TextEncoder().encode(JSON.stringify({ htmls, css }))
  );
}
