import van from "vanjs-core";
import { Router } from "vanjs-routing";
import { Home } from "./pages/home";
// import "@master/normal.css";
import "@master/css";
import "./styles/master.css";

const { a, div, h1, head, header, html, li, nav, ul } = van.tags;

function App() {
  return div(
    header(div("Hello, VanJS!"), div("This is a simple VanJS app.")),
    Router({
      routes: [
        { path: "/", component: Home },
        {
          path: "/about",
          component: () => div("About"),
        },
        {
          path: "/contact",
          component: () => div("Contact"),
        },
      ],
    })
  );
}

van.add(window.document.body, App());
