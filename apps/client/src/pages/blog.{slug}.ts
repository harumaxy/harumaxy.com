import van from "vanjs-core";
import { Link, getRouterParams } from "vanjs-routing";

const t = van.tags;

export function BlogSlug() {
  const slug = van.derive(() => {
    return getRouterParams().slug;
  });

  return Link({ href: `/blog/${slug.val}/edit` }, "Edit");
}
