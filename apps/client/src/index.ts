import van from "vanjs-core";
import "./styles/master.css";
import "@master/normal.css";
import "github-markdown-css";
import { Header } from "./components/header";
import context from "./context";

const t = van.tags;

function App() {
  return t.div(
    {
      class:
        "h:100vh flex flex-direction:column f:white overflow:scroll scrollbar",
    },
    Header,
    context.routerElement
  );
}

van.add(window.document.body, App());
