import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";
import PostCard from "../../components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  GET: async (req, ctx) => {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

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
