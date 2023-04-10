import { Post } from "../utils/posts.ts";
import Tag from "./Tag.tsx";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div class="py-8 border(t gray-200) border-b-1 flex flex-col sm:flex-row">
      <a
        class="text-center sm:col-span-2 transition duration-150 hover:text-yellow-400"
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
      <div class="sm:flex-1 text-center">
        <div class="mt-4 text-gray-300 pb-2">{post.snippet}</div>
        {post.tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </div>
    </div>
  );
}
