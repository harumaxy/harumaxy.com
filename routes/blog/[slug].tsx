import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { render, CSS } from "$gfm";
import "@/utils/highlights.ts";
import Tag from "../../components/Tag.tsx";
import { titleTextSize } from "../../utils/titleTextSize.ts";
import Slide from "@/islands/Slide.tsx";
import TwitterCard from "../../components/TwitterCard.tsx";

export const handler: Handlers<Post> = {
  GET: async (req, ctx) => {
    try {
      const post = await getPost(ctx.params.slug);
      return ctx.render(post as Post);
    } catch {
      return ctx.renderNotFound();
    }
  },
};

function Article({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <TwitterCard post={post} />
      <div
        class={`mt-8 p-6 sm:p-12 rounded-3xl overflow-hidden ${"markdown-body"}`}
        dangerouslySetInnerHTML={{
          __html: render(post.content, {
            allowIframes: true,
          }),
        }}
      ></div>
      <style>{`
            ul > li { list-style: disc; }
            li > ul > li { list-style: circle; }
            li > ul > li > ul > li { list-style: disc; }
            ol > li { list-style: decimal; }
            ol > li > ol > li { list-style: lower-alpha; }
            ol > li > ol > li > ol > li { list-style: lower-roman; }
      `}</style>
    </>
  );
}

export default function PostPage(props: PageProps<Post>) {
  const { data: post } = props;

  return (
    <div class="w-full min-h-[90vh] flex flex-col">
      <h1 class={`${titleTextSize(post.title)} font-bold`}>{post.title}</h1>
      <time>
        {new Date(post.published_at).toLocaleDateString("ja", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </time>
      <div class="py-2">
        {post.tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.marp ? <Slide post={post} /> : <Article post={post} />}
      <div class="flex-grow-1" />
    </div>
  );
}
