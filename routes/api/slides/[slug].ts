import { HandlerContext } from "$fresh/server.ts";
import { Marp } from "npm:@marp-team/marp-core";
import { getPost } from "../../../utils/posts.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const tail = new URL(req.url).pathname?.split("/").at(-1);
  try {
    const post = await getPost(tail!);
    if (!post) {
      return new Response("Not found", { status: 404 });
    }
    const marp = new Marp();
    const { html, css } = marp.render(post.content, { htmlAsArray: true });

    return new Response(
      JSON.stringify({
        htmls: html,
        css,
      })
    );
  } catch (_) {
    return new Response("Not found", { status: 404 });
  }
};
