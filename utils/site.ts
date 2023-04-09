import { FeedOptions } from "https://esm.sh/v114/feed@4.2.2/lib/feed.js";

export const siteName = "harumaxy's blog";
export const description = "harumaxy's tech blog.";
export const language = "ja";

export function feedOptions(origin: string): FeedOptions {
  return {
    title: siteName,
    description,
    language,
    id: `${origin}/blog`,
    favicon: `${origin}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${origin}`,
    generator: "Feed (https://github.com/jpmonette/feed) for Deno",
    feedLinks: {
      atom: `${origin}/feed`,
    },
  };
}
