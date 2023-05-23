import { Post } from "../utils/posts.ts";

const noThumbnail =
  "https://res.cloudinary.com/harumaxy/image/upload/c_scale,q_auto,w_200/v1684841899/no-thumbnail_tqjb3e.jpg";

export default function Thumbnail({ post }: { post: Post }) {
  const modified_url = post.thumbnail_url?.replace(
    "https://res.cloudinary.com/harumaxy/image/upload/",
    "https://res.cloudinary.com/harumaxy/image/upload/c_scale,q_auto,w_200/"
  );
  return (
    <a href={`/blog/${post.slug}`}>
      <img
        //make lighter on hover
        class="w-48 h-48 min-w-48 min-h-48 rounded-2xl transition duration-300 hover:opacity-80"
        src={post.thumbnail_url ?? noThumbnail}
        alt={post.title}
      />
    </a>
  );
}
