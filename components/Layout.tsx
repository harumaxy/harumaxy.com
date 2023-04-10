import { JSX } from "preact";
import { siteName } from "../utils/site.ts";

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      <div class="flex flex-col sm:flex-row">
        <h1
          class={`text-5xl ${"font-glitch"}
          duration-300
          hover:text-yellow-400
          pb-6
          sm:text-left
          text-center
        `}
        >
          <a href="/">{siteName}</a>
        </h1>
        <div class="flex-auto" />
        <nav class={``}>
          <ul class="flex items-center justify-end mx-auto">
            <NavButton href="/" text="Home" />
            <NavButton href="/about" text="About" />
            <NavButton href="/blog" text="Blog" />
            <NavButton href="/tags" text="Tags" />
          </ul>
        </nav>
      </div>
      <main class="max-w-screen-xl sm:px-4 pt-16 mx-auto">{children}</main>
    </div>
  );
}

function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <a href={href}>
      <li
        class={`text-xl p-3 mx-1 rounded-2xl
      sm:text-3xl
      ${"font-glitch"}
      duration-300
      text-gray-600 hover:text-[#CC513C]
      bg-[#73F452] hover:bg-[#F6E84F]
      `}
      >
        {text}
      </li>
    </a>
  );
}
