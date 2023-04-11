import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost, getPosts, Post } from "@/utils/posts.ts";
import { centerContainer } from "../utils/twind.common.ts";

const homeLinks: HomeLinkProps[] = [
  {
    text: "About Me",
    href: "/about",
  },
  {
    text: "Blog",
    href: "/blog",
  },
];

export default function Home() {
  return (
    <div class={`${centerContainer}`}>
      <div>
        <h1 class="text-5xl font-bold pb-32 text-center">
          Welcome to My HomePage
        </h1>
        <ul class="flex flex-row justify-around items-center">
          {homeLinks.map((link) => (
            <HomeLink {...link} />
          ))}
        </ul>
      </div>
    </div>
  );
}

type HomeLinkProps = {
  href: string;
  text: string;
};

function HomeLink({ href, text }: HomeLinkProps) {
  return (
    <li class="text-4xl underline hover:text-yellow-400 duration-300">
      <a href={href}>{text}</a>
    </li>
  );
}
