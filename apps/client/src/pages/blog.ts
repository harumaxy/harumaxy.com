import van from "vanjs-core";
import { Link } from "vanjs-routing";
import { Await } from "vanjs-ui";

const t = van.tags;

interface Post {
  slug: string;
  title: string;
  published_at: string; // ISO 8601
  content: string; // markdown
  tags: string[];
  thumbnail: string; // URL
}
type PostSubset = Omit<Post, "content">;

export function Blog() {
  // TODO: fetch data from API
  const postsProm = (async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return [1, 2, 3, 4, 5].map(
      (i) =>
        ({
          slug: "test" + i,
          title: "test post " + i,
          tags: ["test"],
          thumbnail: "https://via.placeholder.com/150",
          published_at: "2021-01-01T00:00:00Z",
        } satisfies PostSubset)
    );
  })();

  return t.div(
    {
      class:
        "p:32 m:auto w:100vw pt:2rem@md flex flex-direction:column jc:center max-w:1280px",
    },
    t.h1({ class: "f:48 f:bold t:center pb:4rem" }, "Blog"),
    t.div(
      { class: "h:70vh t:center overflow:scroll scrollbar" },
      Await(
        {
          value: postsProm,
          Loading: () => t.div({ class: "f:48" }, "loading..."),
          Error: () => t.div("error"),
        },
        (posts) => t.div({ class: "mt:4rem" }, posts.map(Card))
      )
    )
  );
}

function Card(p: PostSubset) {
  const dateStr = new Date(p.published_at).toLocaleDateString("ja", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return t.div(
    { class: "bt:1|solid|gray-80 p:2rem" },
    Link(
      { className: "t:center flex jc:center", href: `/blog/${p.slug}` },
      t.div(
        { class: "m:auto flex flex-direction:column gap:2rem" },
        t.h3({ class: "f:32" }, p.title),
        t.time({ class: "block" }, dateStr)
      ),
      t.img({ class: "m:auto", src: p.thumbnail, alt: p.title })
    )
  );
}
