import van from "vanjs-core";
import "./styles/master.css";
import "@master/normal.css";
import "github-markdown-css";
import { Header } from "./components/header";
import context from "./context";
import { checkSession } from "./states";

const t = van.tags;

function App() {
  van.derive(() => {
    checkSession();
  });
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
