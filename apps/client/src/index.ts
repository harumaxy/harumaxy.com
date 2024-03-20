import van from "vanjs-core";
import { Router } from "vanjs-routing";
import { Home } from "./pages/home";
// import "@master/normal.css";
import "@master/css";
import "./styles/master.css";
import { Header } from "./components/header";

const { a, div, h1, head, header, html, li, main, nav, ul } = van.tags;

function App() {
  return div(
    Header,
    main(
      Router({
        routes: (
          [
            ["/", Home],
            ["/about", () => div("About")],
            ["/blog", () => div("Blog")],
            ["/tags", () => div("Tags")],
          ] as [string, () => HTMLDivElement][]
        ).map(([path, component]) => ({ path, component })),
      })
    )
  );
}

van.add(window.document.body, App());
