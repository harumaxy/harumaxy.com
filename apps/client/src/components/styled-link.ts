import { siteName } from "../const";
import context from "../context";

export function HeaderLink(
  name: string,
  text: string,
  params: Record<string, any> = {},
) {
  return context.link(
    { name, class: "f:32 t:underline f:rgb(255,234,0):hover", params },
    text,
  );
}

export function LogoLink() {
  return context.link(
    { name: "/", class: "f:48 f:rgb(255,234,0):hover" },
    siteName,
  );
}
