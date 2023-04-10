import { Handlers } from "https://deno.land/x/fresh@1.1.0/src/server/types.ts";
import { getPosts } from "../../utils/posts.ts";
import { PageProps } from "https://deno.land/x/fresh@1.1.0/server.ts";
import { centerContainer } from "../../utils/twind.common.ts";

type TagMap = { [tag: string]: number };

export const handler: Handlers<TagMap> = {
  GET: async (req, ctx) => {
    const posts = await getPosts();

    const tagMap = posts.reduce((acc, post) => {
      post.tags.forEach((tag) => {
        if (acc[tag]) {
          acc[tag] += 1;
        } else {
          acc[tag] = 1;
        }
      });
      return acc;
    }, {} as TagMap);

    return ctx.render(tagMap);
  },
};

export default function TagIndex(props: PageProps<TagMap>) {
  const { data: tagMap } = props;

  return (
    <div class={`${centerContainer} flex flex-col items-center justify-center`}>
      <h1 class="text-5xl font-bold">Tags</h1>
      <div class="mt-8">
        {Object.entries(tagMap).map(([tag, count]) => (
          <a href={`/tags/${tag}`}>
            <span
              class="mx-1 text-lg
            bg-yellow-500
            hover:bg-red-500
            duration-300
            py-2 px-4 rounded-full focus:outline-none focus:ring-2"
            >
              {tag} ({count})
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
