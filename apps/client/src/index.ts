import van from "vanjs-core";
import { Router } from "vanjs-routing";
import { Home } from "./pages/home";
import "./styles/master.css";
import "@master/normal.css";
import "github-markdown-css";
import { Header } from "./components/header";
import { About } from "./pages/about";
import { Blog } from "./pages/blog";

const { a, div, h1, head, header, html, li, main, nav, ul } = van.tags;

function App() {
  return div(
    { class: "h:100% flex flex-direction:column f:white" },
    Header,
    main(
      { class: "flex-grow:1" },
      Router({
        className: "h:100%",
        routes: (
          [
            ["/index.html", Home],
            ["/", Home],
            ["/about", About],
            ["/blog", Blog],
            ["/tags", () => div("Tags")],
          ] as [string, () => HTMLDivElement][]
        ).map(([path, component]) => ({ path, component })),
      })
    )
  );
}

van.add(window.document.body, App());
