import type { Post } from "@harumaxy-com/server/src/db/types";
import van from "vanjs-core";

import { app } from "../client";
import { RenderPost } from "../components/render-post";
import { Await } from "vanjs-ui";
import { HeaderLink } from "../components/styled-link";
import { session } from "../states";

const t = van.tags;

export function BlogSlug({ slug }: { slug: string }) {
  const post = app.api.posts({ slug: slug }).get();
  return t.div(
    {
      class:
        "flex flex-direction:column ai:stretch h:inherit w:inherit m:auto px:4rem gap:2rem",
    },
    () =>
      session.val
        ? t.div(HeaderLink(`/blog/:slug/edit`, "Edit", { slug: slug }))
        : null,
    Await(
      {
        value: post,
        Loading: () => t.div("Loading..."),
        Error: (e) => t.div("Error:"),
      },
      ({ data }) => RenderPost(data?.title ?? "", data?.content ?? ""),
    ),
  );
}
