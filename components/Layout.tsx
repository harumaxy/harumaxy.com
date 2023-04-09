import { JSX } from "preact";
import { siteName } from "../utils/site.ts";

export default function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <div>
      <div class="flex items-stretch">
        <h1
          class={`text-5xl ${"font-glitch"} flex-1
          transition-[1s]
          hover:text-yellow-400
        `}
        >
          <a href="/">{siteName}</a>
        </h1>
        <nav class={`max-w-screen-xl`}>
          <ul class="flex content-center">
            <NavButton href="/" text="Home" />
            <NavButton href="/about" text="About" />
            <NavButton href="/" text="Blog" />
          </ul>
        </nav>
      </div>
      <main class="max-w-screen-xl px-4 pt-16 mx-auto">{children}</main>
    </div>
  );
}

function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <li
      class={`text-3xl p-3 mx-2 rounded-2xl
      ${"font-glitch"}
      transition-[1s]
      text-gray-600 hover:text-[#CC513C]
      bg-[#73F452] hover:bg-[#F6E84F]
      `}
    >
      <a href={href}>{text}</a>
    </li>
  );
}
