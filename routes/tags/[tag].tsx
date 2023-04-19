import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";
import "@/utils/highlights.ts";
import PostCard from "../../components/PostCard.tsx";

export const handler: Handlers<{ posts: Post[]; tag: string }> = {
  GET: async (req, ctx) => {
    const { tag } = ctx.params;
    const posts = await getPosts();
    const tagPosts = posts.filter((post) => post.tags.includes(tag));

    return ctx.render({ posts: tagPosts, tag });
  },
};

export default function TagBlogIndexPage(
  props: PageProps<{ posts: Post[]; tag: string }>
) {
  const {
    data: { posts, tag },
  } = props;

  return (
    <div>
      <h1 class={`${"text-glitch"}  text-5xl font-bold`}>tag: {tag}</h1>
      <div class="mt-8">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
}
