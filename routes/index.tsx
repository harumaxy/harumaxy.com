import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers<Post[]> = {
  GET: async (req, ctx) => {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <Layout>
      <h1 class={`${"text-glitch"}  text-5xl font-bold`}>Blog</h1>
      <div class="mt-8">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </Layout>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div class="py-8 border(t gray-200)">
      <a class="sm:col-span-2" href={`/blog/${post.slug}`}>
        <h3 class={`text(3xl gray-900) font-bold`}>{post.title}</h3>
        <time class="text-gray-500">
          {new Date(post.published_at).toLocaleDateString("ja", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <div class="mt-4 text-gray-900">{post.snippet}</div>
      </a>
    </div>
  );
}
