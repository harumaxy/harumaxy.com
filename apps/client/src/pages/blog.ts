import van from "vanjs-core";
import { Link } from "vanjs-routing";

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
  const posts: PostSubset[] = [
    {
      slug: "test",
      title: "test post",
      tags: ["test"],
      thumbnail: "https://via.placeholder.com/150",
      published_at: "2021-01-01T00:00:00Z",
    },
  ];

  return t.div(
    t.h1({ class: "f:48 f:bold t:center" }, "Blog"),
    t.div({ class: "mt:4rem" }, posts.map(Card))
  );
}

function Card(p: PostSubset) {
  const dateStr = new Date(p.published_at).toLocaleDateString("ja", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return t.div(
    { class: "bt:1|solid|gray-80" },
    Link(
      { className: "t:center", href: `/blog/${p.slug}` },
      t.h3({ class: "" }, p.title),
      t.time({ class: "block" }, dateStr)
    )
  );
}
