import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { GA4Report } from "https://raw.githubusercontent.com/denoland/ga4/main/mod.ts";

function makeReporter(
  req: Request,
  resp: Response,
  ctx: MiddlewareHandlerContext
) {
  return new GA4Report({
    measurementId: Deno.env.get("GA4_MEASUREMENT_ID")!,
    request: req,
    response: resp,
    conn: {
      localAddr: ctx.localAddr,
      remoteAddr: ctx.remoteAddr,
    },
  });
}

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const resp = await ctx.next();
  const ga4 = makeReporter(req, resp, ctx);
  await ga4.send();

  return resp;
}
