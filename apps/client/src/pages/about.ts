import van from "vanjs-core";
import { parse } from "marked";
import { Await } from "vanjs-ui";
import { avatarUrl } from "../const";

// markdown
const about = parse(
  `
# Contact

harumaxy@gmail.com

[Github](https://github.com/harumaxy)

# SNS

[Zenn](https://zenn.dev/submax)

[Qiita](https://qiita.com/harumaxy)



# Job

[manabo.inc](https://www.manabo.com)

Backend Engineer

# Favorite Languages

\`\`\`markdown
- TypeScript
- OCaml
- GDScript
- Rust
\`\`\`
`,
  { gfm: true, async: true },
);

const t = van.tags;

export function About() {
  return t.div(
    { class: "p:32 m:auto w:100vw pt:10rem@md flex jc:center" },
    t.div(
      {
        class:
          "markdown-body flex-grow:1 max-w:1280px p:32 r:10 flex gap:2rem ai:center jc:space-between flex-direction:column flex-direction:row@md",
      },
      t.div(
        {
          class: "flex-grow:1 ai:center jc:center flex",
        },
        t.img({
          class: "r:1/2 h:16rem w:16rem",
          src: avatarUrl,
        }),
      ),
      t.div(
        { class: "flex-grow:2 flex-basis:fit-content" },
        Await(
          {
            value: about,
            Loading: () => t.div("loading..."),
            Error: () => t.div("error"),
          },
          (about) => t.div({ innerHTML: about as string }),
        ),
      ),
    ),
  );
}
