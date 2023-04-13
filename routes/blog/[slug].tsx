import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { render, CSS } from "$gfm";
import "@/utils/highlights.ts";
import Tag from "../../components/Tag.tsx";
import { titleTextSize } from "../../utils/titleTextSize.ts";

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

function Slide({ data: post }: PageProps<Post>) {
  // const marp = new Marp();
  // const { html, css } = marp.render(post.content);
  return (
    <>
      <div>hello</div>
      {/* <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <div
        class={`mt-8 p-6 sm:p-12 rounded-3xl`}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div> */}
    </>
  );
}

function Article({ data: post }: PageProps<Post>) {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div
        // data-color-mode="dark"
        // data-dark-theme="dark"
        class={`mt-8 p-6 sm:p-12 rounded-3xl overflow-hidden ${"markdown-body"}`}
        dangerouslySetInnerHTML={{
          __html: render(post.content, {
            allowIframes: true,
          }),
        }}
      ></div>
    </>
  );
}

export default function PostPage(props: PageProps<Post>) {
  const { data: post } = props;

  return (
    <>
      <h1 class={`${titleTextSize(post.title)} font-bold`}>{post.title}</h1>
      <time>
        {new Date(post.published_at).toLocaleDateString("ja", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </time>
      <div class="py-6">
        {post.tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>
      {post.is_slide ? <Slide {...props} /> : <Article {...props} />}
    </>
  );
}
