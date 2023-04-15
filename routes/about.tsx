import { centerContainer } from "../utils/twind.common.ts";
import * as path from "$std/path/mod.ts";
import {
  Handlers,
  PageProps,
} from "https://deno.land/x/fresh@1.1.0/src/server/types.ts";
import { render, CSS } from "$gfm";
import { Head } from "$fresh/runtime.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const handler: Handlers<string> = {
  GET: async (req, ctx) => {
    const markdown = await Deno.readTextFile(path.join(__dirname, "about.md"));

    return ctx.render(markdown);
  },
};
// 丸画像と div ボックスが重なるようなレイアウトを tailwind css で書いて

export default function About(props: PageProps<string>) {
  const { data: markdown } = props;
  return (
    <div
      class={`w-full flex items-center justify-center sm:(${centerContainer})`}
    >
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div class="flex flex-col sm:flex-row items-center justify-around w-[90%] max-w-[800px] py-16 sm:py-6 rounded-3xl bg-white">
        <img
          class="sm:relative bottom-16 w-64 h-64 bg-cover rounded-full"
          src="https://avatars.githubusercontent.com/u/15980686?v=4"
        />
        <div
          // data-color-mode="dark"
          // data-dark-theme="dark"
          class={`sm:top-32 rounded-3xl bg-white ${"markdown-body"}`}
          dangerouslySetInnerHTML={{
            __html: render(markdown),
          }}
        />
      </div>
    </div>
  );
}

// About ページに使う丸型のアバター画像のheroレイアウトを作成するtailwind cssのコードを教えて
