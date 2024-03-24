import van from "vanjs-core";
import { getRouterQuery } from "vanjs-routing";
const t = van.tags;

export function BlogEditor() {
  return t.div(`Editing blog with slug: ${"slug"}`);
}
