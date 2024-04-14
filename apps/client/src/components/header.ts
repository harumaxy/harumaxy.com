import van from "vanjs-core";
import { HeaderLink, LogoLink } from "./styled-link";
import { siteName } from "../const";
import context from "../context";

const t = van.tags;

export function Header() {
  return t.div(
    {
      class:
        "flex flex-direction:column flex-direction:row@md ai:center jc:center p:32",
    },
    LogoLink,
    t.div({ class: "flex-grow:1" }),
    NavList,
  );
}

function NavList() {
  return t.ul(
    {
      class:
        "flex ai:center jc:center flex-grow:1 gap:2rem list-style-type:none",
    },
    [
      ["/", "Home"],
      ["/about", "About"],
      ["/blog", "Blog"],
      ["/tags", "Tags"],
    ].map(([href, text]) => NavItem(href, text)),
  );
}

function NavItem(href: string, text: string) {
  return t.li(HeaderLink(href, text));
}
