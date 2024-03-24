import { marked } from "marked";
import van, { type State } from "vanjs-core";
import { getRouterQuery } from "vanjs-routing";
import { Await, Toggle } from "vanjs-ui";
const t = van.tags;

export function BlogEditor() {
  const preview = van.state(false);
  const content = van.state("# Preview");

  return t.form(
    {
      class:
        "flex flex-direction:column jc:center ai:stretch h:inherit w:inherit m:auto",
    },
    t.div(
      { class: "flex jc:center gap:2rem jc:center ai:center" },
      t.label({ class: "f:2rem" }, "Preview"),
      Toggle({
        size: 2,
        on: preview,
      })
    ),
    t.div(),
    t.div(
      { class: "flex flex-grow:1 jc:center" },
      t.div({ class: "flex-grow:1 p:2rem h:100% w:100% max-w:1280px@lg" }, () =>
        preview.val ? Preview(content) : Editor(content)
      )
    )
  );
}

function Editor(content: State<string>) {
  return t.textarea({
    class: "b:1|solid|white h:inherit w:inherit p:2rem",
    value: content,
    oninput: (e) => {
      content.val = e.target.value;
    },
  });
}

function Preview(content: State<string>) {
  const md = marked.parse(content.val, { async: true, gfm: true });
  return t.div(
    {
      class: "markdown-body h:inherit w:inherit p:2rem m:auto r:10px",
    },
    Await(
      {
        value: md,
        Loading: () => t.div("Loading..."),
        Error: (e) => t.div("Error:"),
      },
      (md) => t.div({ innerHTML: md })
    )
  );
}
