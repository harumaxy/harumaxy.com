import van from "vanjs-core";
import { Link, getRouterParams } from "vanjs-routing";

const t = van.tags;

export function BlogSlug() {
  const slug = van.state("");
  van.derive(() => {
    slug.val = getRouterParams().slug;
  });

  return Link({ href: `/blog/${slug.val}/edit` }, "Edit");
}
