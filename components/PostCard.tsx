import { Post } from "../utils/posts.ts";
import { titleTextSize } from "../utils/titleTextSize.ts";
import Tag from "./Tag.tsx";
import Thumbnail from "./Thumbnail.tsx";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div
      class="py-8 border(t gray-200) border-b-1 flex flex-col sm:flex-row
    items-center justify-center gap-1"
    >
      <div>
        <a
          href={`/blog/${post.slug}`}
          class="text-center sm:text-left transition duration-150 hover:text-link-hover"
        >
          <h3 class={`${titleTextSize(post.title, true)} font-mono font-bold`}>
            {post.title}
          </h3>
          <time class="block">
            {new Date(post.published_at).toLocaleDateString("ja", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          {post.marp && <p class="text-xl">Slide</p>}
          <div class="mt-4 pb-2">{post.snippet}</div>
        </a>
        <div class="flex justify-center md:justify-start">
          {post.tags.map((tag) => (
            <Tag tag={tag} />
          ))}
        </div>
      </div>
      <div class="flex-grow-1" />
      <div class="flex-shrink-0">
        <Thumbnail post={post} />
      </div>
    </div>
  );
}
