import { marked } from "marked";
import van, { type State } from "vanjs-core";
import { Await, Toggle } from "vanjs-ui";
import type { Post } from "@harumaxy-com/server/src/db/types";
import { app } from "../client";
import { RenderPost } from "../components/render-post";
import context from "../context";
import { session } from "../states";

const t = van.tags;

export function BlogEditor({ slug }: { slug: string }) {
  if (!session.val) {
    return t.div("Unauthorized");
  }

  const post = van.state<Post | undefined>(undefined);
  const preview = van.state(false);
  const title = van.state("");
  const content = van.state("# Preview");
  const thumbnail = van.state<string | null>(null);

  // Like useEffect or useMemo
  van.derive(async () => {
    const { data, error, status } = await app.api.posts({ slug }).get();
    if (error) console.error(error);
    const postFromServer =
      status === 200
        ? data ?? undefined
        : (await app.api.posts.post({ slug })).data ?? undefined;
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
        "flex flex-direction:column jc:center ai:stretch h:full w:inherit m:auto px:4rem pb:4rem gap:2rem",
    },
    t.div(
      { class: "w:100% flex jc:start gap:2rem" },
      t.div(
        { class: "flex jc:center gap:1rem jc:center ai:center" },
        t.label({ class: "f:2rem" }, "Preview"),
        Toggle({
          size: 2,
          on: preview,
        }),
      ),
      t.button(
        {
          class: "b:1|solid|white px:1rem",
          onclick: async (e) => {
            e.preventDefault();
            await app.api.posts({ slug }).patch({
              title: title.val,
              content: content.val,
              thumbnail: thumbnail.val,
            });
            console.log(
              context.navigate(`/blog/:slug`, {
                context,
                navState: {},
                query: {},
                params: { slug },
              }),
            );
          },
        },
        "Save",
      ),
    ),
    t.div(
      { class: "flex flex-grow:1 jc:center" },
      t.div({ class: "flex-grow:1 h:100% w:100% max-w:1280px@lg" }, () =>
        preview.val
          ? RenderPost(title.val, content.val)
          : Editor(title, content, thumbnail),
      ),
    ),
  );
}

function Editor(
  title: State<string>,
  content: State<string>,
  thumbnail: State<string | null>,
) {
  return t.div(
    {
      class:
        "flex flex-direction:column jc:start h:inherit w:inherit gap:1rem h:full",
    },
    LineInput("Title: ", title),
    LineInput("Thumbnail URL: ", thumbnail),
    ContentInput("Content", content),
  );
}

function LineInput(label: string, state: State<string | null>) {
  return t.div(
    { class: "flex jc:start ai:center gap:1rem" },
    t.label({}, label),
    t.input({
      class: "b:1|solid|white px:.2rem w:30rem",
      value: state,
      oninput: (e) => {
        state.val = e.target.value;
      },
    }),
  );
}

function ContentInput(label: string, state: State<string>) {
  return [
    t.label("Content"),
    t.textarea({
      class: "b:1|solid|white flex-grow:1 p:2rem",
      value: state,
      oninput: (e) => {
        state.val = e.target.value;
      },
    }),
  ];
}
