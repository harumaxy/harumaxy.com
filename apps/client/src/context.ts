import createCone from "van-cone";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Blog } from "./pages/blog";
import { BlogSlug } from "./pages/blog.{slug}";
import { BlogEditor } from "./pages/blog.{slug}.edit";
import van from "vanjs-core";
import { Login } from "./pages/login";

const t = van.tags;

const context = createCone({
  routerElement: t.main({ class: "flex-grow:1" }),
  defaultNavState: {
    agreement: false,
  },
});
const { route } = context;
(
  [
    ["/", Home, "Home"],
    ["/about", About, "About"],
    ["/blog", Blog, "Blog"],
    ["/blog/:slug", BlogSlug, "Blog"],
    ["/blog/:slug/edit", BlogEditor, "Edit Blog"],
    ["/tags", t.div("Tags"), "Tags"],
    ["/login", Login, "Login"],
  ] as const
).forEach(([path, page, title]) => {
  route(path, path, async () => page, { title });
});

export default context;
