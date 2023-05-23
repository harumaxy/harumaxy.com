import * as front_matter from "$std/encoding/front_matter.ts";
import * as path from "$std/path/mod.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

const __dirname = path.fromFileUrl(import.meta.url);
const postsDir = path.join(__dirname, "../../posts");

const PostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  published_at: z.string().transform((d) => new Date(d)),
  snippet: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  marp: z.boolean().default(false),
  thumbnail_url: z.string().nullish(),
});

export type Post = z.infer<typeof PostSchema>;

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir(postsDir);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = (await Promise.all(promises)) as Post[];
  const sortedPosts = posts.sort(
    (a, b) => b.published_at.getTime() - a.published_at.getTime()
  );
  return sortedPosts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const text = await Deno.readTextFile(path.join(postsDir, `${slug}.md`));
  const { attrs, body } = front_matter.extract(text);
  return PostSchema.parse({
    ...(attrs as Post),
    slug: slug,
    content: body,
  });
}
