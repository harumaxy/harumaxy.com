import { Link as RouterLink } from "vanjs-routing";

export function Link(href: string, text: string) {
  return RouterLink(
    { className: "f:32 t:underline f:rgb(255,234,0):hover", href },
    text
  );
}
