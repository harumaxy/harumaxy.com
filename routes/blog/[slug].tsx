import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { render, CSS } from "$gfm";
import "@/utils/highlights.ts";
import Layout from "../../components/Layout.tsx";
import { Style } from "https://esm.sh/v114/domelementtype@2.3.0/lib/index.js";

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

export default function PostPage(props: PageProps<Post>) {
  const { data: post } = props;

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: `@apply bg-red; ${CSS}` }} />
      </Head>
      <Layout>
        <h1 class="text-5xl font-bold">{post.title}</h1>
        <time>
          {new Date(post.published_at).toLocaleDateString("ja", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </time>
        <div
          // data-color-mode="dark"
          // data-dark-theme="dark"
          class={`mt-8 p-12 rounded-3xl ${"markdown-body"}`}
          style={`
          `}
          dangerouslySetInnerHTML={{
            __html: render(post.content),
          }}
        ></div>
      </Layout>
    </>
  );
}
