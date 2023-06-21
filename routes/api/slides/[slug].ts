import { HandlerContext } from "$fresh/server.ts";
import { Marp } from "npm:@marp-team/marp-core";
import { getPost } from "../../../utils/posts.ts";

const slideRegex = /api\/slides\/(.*)$/g;

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  // Convert Markdown slide deck into HTML and CSS
  const slug = Array.from(req.url.matchAll(slideRegex))[0][1];
  const post = await getPost(slug);
  const marp = new Marp();

  const { html: htmls, css } = marp.render(post!.content, {
    htmlAsArray: true,
  });

  return new Response(JSON.stringify({ htmls, css }), {
    headers: {
      "content-type": "application/json",
    },
  });
};
