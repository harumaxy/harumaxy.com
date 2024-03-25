import { marked } from "marked";
import type { State } from "vanjs-core";
import van from "vanjs-core";
import { Await } from "vanjs-ui";
const t = van.tags;

export function RenderPost(title: string, content: string) {
  const md = marked.parse(content, { async: true, gfm: true });
  return t.div(
    {
      class:
        "flex flex-direction:column flex-grow:1 jc:start h:inherit w:inherit gap:1rem",
    },
    t.h1({ class: "w:100% f:4rem px:1rem" }, title),
    Await(
      {
        value: md,
        Loading: () => t.div("Loading..."),
        Error: (e) => t.div("Error:"),
        container: (child) =>
          t.div(
            {
              class: "markdown-body flex-grow:1 w:inherit m:auto r:10px",
            },
            child as Element
          ),
      },
      (md) =>
        t.div({
          class: "p:2rem",
          innerHTML: md,
        })
    )
  );
}
