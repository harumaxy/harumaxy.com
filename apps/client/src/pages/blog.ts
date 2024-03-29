import van from "vanjs-core";
import { Link } from "vanjs-routing";
import { Await } from "vanjs-ui";
import { app } from "../client";
import type { Post } from "@harumaxy-com/server/src/db/types";

const t = van.tags;

const defaultThumbnail = "https://via.placeholder.com/150";

export function Blog() {
  // TODO: fetch data from API
  const postsProm = app.api.posts.get();

  return t.div(
    {
      class:
        "p:32 m:auto w:100vw max-w:1280px pt:2rem@md flex flex-direction:column jc:center",
    },
    t.h1({ class: "f:48 f:bold t:center pb:4rem" }, "Blog"),
    t.div(
      { class: "t:center" },
      Await(
        {
          value: postsProm,
          Loading: () => t.div({ class: "f:48" }, "loading..."),
          Error: () => t.div("error"),
        },
        ({ data }) => {
          if (Array.isArray(data)) {
            return t.div({ class: "mt:4rem" }, data.map(Card));
          }
          if (data?.error) {
            return t.div(data.error);
          }
          return t.div("No data");
        }
      )
    )
  );
}

function Card(p: Post) {
  const dateStr = new Date().toLocaleDateString("ja", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return t.div(
    { class: "bt:1|solid|gray-80 p:2rem" },
    Link(
      { className: "t:center flex jc:center", href: `/blog/${p.slug}` },
      t.div(
        { class: "m:auto flex flex-direction:column gap:2rem" },
        t.h3({ class: "f:32" }, p.title),
        t.time({ class: "block" }, dateStr)
      ),
      t.img({ class: "m:auto", src: p.thumbnail, alt: p.title })
    )
  );
}
