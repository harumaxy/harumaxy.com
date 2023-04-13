import { Post } from "../utils/posts.ts";
import { Head } from "$fresh/runtime.ts";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import useGetElementProperty from "../hooks/useGetElementProperty.ts";
import { JSX } from "preact/jsx-runtime";

function SideButton({
  side,
  onClick,
  slide,
}: {
  side: "left" | "right";
  slide: { x: number; y: number; h: number; w: number };
  onClick: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { getElementProperty } = useGetElementProperty(ref);
  const selfWidth = getElementProperty("width");
  console.log(selfWidth);

  return (
    <a
      ref={ref}
      class={`absolute top-[${slide.y + slide.h / 2}px] ${side}-[${
        slide.x
      }px] p-4 bg-gray-300 hover:bg-gray-500 text-white hover:text-yellow-500 cursor-pointer`}
      onClick={onClick}
    >
      {side === "left" ? "⬅" : "➡"}
    </a>
  );
}

export default function Slide({ post }: { post: Post }) {
  const [marp, setMarp] = useState<{
    htmls: string[];
    css: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const url = `${window.location.origin}/api/slides/${post.slug}`;
    fetch(`${window.location.origin}/api/slides/${post.slug}`).then((res) => {
      if (res.status === 200) {
        res
          .json()
          .then((data) => {
            setMarp(data);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      console.log(e);

      if (e.key === "ArrowRight" || e.key === "a") {
        if (currentPage >= (marp?.htmls.length ?? 0) - 1) return;
        setCurrentPage(currentPage + 1);
      } else if (e.key === "ArrowLeft" || e.key === "d") {
        if (currentPage <= 0) return;
        setCurrentPage(currentPage - 1);
      }
    },
    [setCurrentPage, currentPage, marp]
  );
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div>
      {marp ? (
        <>
          <div class="">
            <style dangerouslySetInnerHTML={{ __html: marp.css }} />
            <div
              onKeyDown={onKeyDown}
              class={`${"marpit"} h-full`}
              dangerouslySetInnerHTML={{ __html: marp.htmls[currentPage] }}
            ></div>
          </div>
        </>
      ) : null}
    </div>
  );
}
