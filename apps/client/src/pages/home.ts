import van from "vanjs-core";
import { Link } from "../components/styled-link";

const t = van.tags;

export function Home() {
  return t.div(
    {
      class:
        "h:100% m:auto flex flex-direction:column ai:center jc:center gap:10rem",
    },
    t.h1("Welcome to My HomePage"),
    t.ul(
      { class: "flex ai:center jc:space-around gap:2rem list-style-type:none" },
      (
        [
          ["/about", "About Me"],
          ["/blog", "Blog"],
        ] as [string, string][]
      ).map(([href, text]) => Link(href, text))
    )
  );
}
