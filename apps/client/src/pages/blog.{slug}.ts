import type { Post } from "@harumaxy-com/server/src/db/types";
import van from "vanjs-core";
import { getRouterParams } from "vanjs-routing";
import { app } from "../client";
import { RenderPost } from "../components/render-post";
import { Await } from "vanjs-ui";
import { Link } from "../components/styled-link";

const t = van.tags;

export function BlogSlug() {
  const slug = van.state("");
  van.derive(() => {
    slug.val = getRouterParams().slug;
  });

  if (!slug.val) return t.div("No slug provided");

  const post = app.api.posts({ slug: slug.val }).get();

  return t.div(
    {
      class:
        "flex flex-direction:column ai:stretch h:inherit w:inherit m:auto px:4rem gap:2rem",
    },
    t.div(Link(`/blog/${slug.val}/edit`, "Edit")),
    Await(
      {
        value: post,
        Loading: () => t.div("Loading..."),
        Error: (e) => t.div("Error:"),
      },
      ({ data }) => RenderPost(data?.title ?? "", data?.content ?? "")
    )
  );
}
