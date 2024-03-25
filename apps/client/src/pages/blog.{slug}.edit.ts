import { marked } from "marked";
import van, { type State } from "vanjs-core";
import { getRouterParams, getRouterQuery, navigate } from "vanjs-routing";
import { Await, Toggle } from "vanjs-ui";
import type { Post } from "@harumaxy-com/server/src/db/types";
import { app } from "../client";
import { RenderPost } from "../components/render-post";

const t = van.tags;

export function BlogEditor() {
  const slug = van.state<string | undefined>(undefined);
  const post = van.state<Post | undefined>(undefined);
  const preview = van.state(false);
  const title = van.state("");
  const content = van.state("# Preview");
  const thumbnail = van.state<string | null>(null);

  // Like useEffect or useMemo
  van.derive(() => {
    slug.val = getRouterParams().slug;
  });
  van.derive(async () => {
    if (!slug.val) return;
    const { data, error, status } = await app.api
      .posts({ slug: slug.val })
      .get();
    if (error) console.error(error);
    const postFromServer =
      status === 200
        ? data ?? undefined
        : (await app.api.posts.post({ slug: slug.val })).data ?? undefined;
    post.val = postFromServer;
  });
  van.derive(() => {
    if (!post.val) return;
    content.val = post.val.content ?? "";
    title.val = post.val.title ?? "";
    thumbnail.val = post.val.thumbnail;
  });

  return t.form(
    {
      class:
        "flex flex-direction:column jc:center ai:stretch h:inherit w:inherit m:auto px:4rem gap:2rem",
    },
    t.div(
      { class: "w:100% flex jc:start gap:2rem" },
      t.div(
        { class: "flex jc:center gap:1rem jc:center ai:center" },
        t.label({ class: "f:2rem" }, "Preview"),
        Toggle({
          size: 2,
          on: preview,
        })
      ),
      t.button(
        {
          class: "b:1|solid|white px:1rem",
          onclick: async (e) => {
            e.preventDefault();
            await app.api.posts({ slug: slug.val! }).patch({
              title: title.val,
              content: content.val,
              thumbnail: thumbnail.val,
            });
            console.log(navigate(`/blog/${slug.val}`));
          },
        },
        "Save"
      )
    ),
    t.div(
      { class: "flex flex-grow:1 jc:center" },
      t.div({ class: "flex-grow:1 h:100% w:100% max-w:1280px@lg" }, () =>
        preview.val
          ? RenderPost(title.val, content.val)
          : Editor(title, content)
      )
    )
  );
}

function Editor(title: State<string>, content: State<string>) {
  return t.div(
    {
      class: "flex flex-direction:column jc:start h:inherit w:inherit gap:1rem",
    },
    t.div(
      { class: "flex jc:start ai:center gap:1rem" },
      t.label({}, "Title: "),
      t.input({
        class: "b:1|solid|white px:.2rem",
        value: title,
        oninput: (e) => {
          title.val = e.target.value;
        },
      })
    ),
    t.label("Content"),
    t.textarea({
      class: "b:1|solid|white flex-grow:1 p:2rem",
      value: content,
      oninput: (e) => {
        content.val = e.target.value;
      },
    })
  );
}
