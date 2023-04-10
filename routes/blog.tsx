import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post[]> = {
  GET: async (req, ctx) => {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

const flareRed = "#F6E84F";

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <>
      <h1 class={`${"text-glitch"}  text-5xl font-bold`}>Blog</h1>
      <div class="mt-8">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div class="py-8 border(t gray-200) border-b-1 flex">
      <a
        class="sm:col-span-2 transition duration-150 hover:text-red-400 flex-1"
        href={`/blog/${post.slug}`}
      >
        <h3 class={`text(3xl) font-mono font-bold`}>{post.title}</h3>
        <time>
          {new Date(post.published_at).toLocaleDateString("ja", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </a>
      <div class="flex-[2]">
        <div class="mt-4 text-gray-300 pb-2">{post.snippet}</div>
        {post.tags.map((tag) => (
          <span class="text-lg bg-gradient-to-bl from-green-700 to-blue-600 border-2 border-green-800 text-gray-200 mx-2 py-1 px-2 rounded-2xl">
            <a href={`/tags/${tag}`}>{tag}</a>
          </span>
        ))}
      </div>
    </div>
  );
}
