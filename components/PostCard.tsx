import { Post } from "../utils/posts.ts";
import { titleTextSize } from "../utils/titleTextSize.ts";
import Tag from "./Tag.tsx";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div
      class="py-8 border(t gray-200) border-b-1 flex flex-col sm:flex-row
    items-center justify-center"
    >
      <a
        class="text-center sm:text-left 
        transition duration-150 hover:text-yellow-400"
        href={`/blog/${post.slug}`}
      >
        <h3 class={`${titleTextSize(post.title, true)} font-mono font-bold`}>
          {post.title}
        </h3>
        <time>
          {new Date(post.published_at).toLocaleDateString("ja", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </a>
      <div class="flex-1" />
      <div class="sm:flex-1 text-center sm:text-right">
        <div class="mt-4 text-gray-300 pb-2">{post.snippet}</div>
        {post.tags.map((tag) => (
          <Tag tag={tag} />
        ))}
      </div>
    </div>
  );
}
