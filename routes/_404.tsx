import { PageProps } from "$fresh/server.ts";
import { Post } from "@/utils/posts.ts";
import Layout from "../components/Layout.tsx";

export default function Blog404Page(props: PageProps<Post[]>) {
  return (
    <Layout>
      <h1 class="text-5xl font-bold">Oops!</h1>
      <div class="mt-8">
        <p>404</p>
        <p>Sorry about that!</p>
      </div>
    </Layout>
  );
}
