import { HandlerContext } from "$fresh/server.ts";

const slideRegex = /api\/slides\/(.*)$/g;

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const slug = Array.from(req.url.matchAll(slideRegex))[0][1];
  const marpJson = await Deno.readTextFile(`slides/${slug}.json`);
  return new Response(marpJson, {
    headers: {
      "content-type": "application/json",
    },
  });
};
