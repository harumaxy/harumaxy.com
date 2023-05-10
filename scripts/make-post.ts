import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import type { Post } from "@/utils/posts.ts";

const cli = await new Command()
  .name("make-post")
  .description("Create a new post")
  .option("-s, --slug <slug:string>", "Slug of the post")
  .action((args) => {
    if (!args.slug) {
      console.error("Slug is required");
      Deno.exit(1);
    }
  })
  .parse();

const today = new Date();
const yyyymmdd = today.toISOString().split("T")[0];

const defaultPost = {
  slug: `${yyyymmdd}-${cli.options.slug!}`,
  title: "Title",
  published_at: `"${today.toISOString()}"`,
  is_slide: false,
  snippet: "summary",
  tags: "[]",
};

const frontmatter = `---
${Object.entries(defaultPost)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}
---

# ${cli.options.slug!}`;

Deno.writeFile(
  `./posts/${defaultPost.slug}.md`,
  new TextEncoder().encode(frontmatter)
);
