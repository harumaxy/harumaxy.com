import { Handlers } from "$fresh/src/server/types.ts";
import { getPosts, Post } from "@/utils/posts.ts";
import { Feed, type Item as FeedItem } from "feed";

export const handler: Handlers<Post[]> = {
  GET: async (req, ctx) => {
    const posts = await getPosts();
    const url = new URL(req.url);
    const origin = url.origin;
    const copyright = `© ${new Date().getFullYear()} ${origin}`;
    const feed = new Feed({
      title: "Blog",
      description: "harumaxy's tech blog.",
      id: `${origin}/blog`,
      language: "ja",
      favicon: `${origin}/favicon.ico`,
      copyright,
      generator: "Feed (https://github.com/jpmonette/feed) for Deno",
      feedLinks: {
        atom: `${origin}/feed`,
      },
    });
    posts.map((p) => {
      const item: FeedItem = {
        id: `${origin}/blog/${p.slug}`,
        title: p.title,
        description: p.snippet,
        link: `${origin}/blog/${p.slug}`,
        copyright,
        published: p.published_at,
        date: p.published_at,
      };
      feed.addItem(item);
    });
    const atomFeed = feed.atom1();
    return new Response(atomFeed, {
      headers: {
        "content-type": "application/atom+xml; charset=utf-8",
      },
    });
  },
};
