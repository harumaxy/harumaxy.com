import { Head } from "$fresh/runtime.ts";
import { Post } from "../utils/posts.ts";

export default function TwitterCard({ post }: { post: Post }) {
  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.snippet} />
      <meta
        property="twitter:image"
        content="https://avatars.githubusercontent.com/u/15980686?v=4"
      />
    </Head>
  );
}
