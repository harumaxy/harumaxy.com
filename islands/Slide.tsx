import { Post } from "../utils/posts.ts";
import { Head } from "$fresh/runtime.ts";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import useGetElementProperty from "../hooks/useGetElementProperty.ts";
import { centerContainer } from "../utils/twind.common.ts";

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
  const slideContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      if (e.key === "ArrowRight" || e.key === "d") {
        if (currentPage >= (marp?.htmls.length ?? 0) - 1) return;
        setCurrentPage(currentPage + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        if (currentPage <= 0) return;
        setCurrentPage(currentPage - 1);
      }
      if (e.key === "f") {
        if (document.fullscreenEnabled) {
          e.preventDefault();
          slideContainerRef.current?.requestFullscreen();
        }
      }
      if (e.key === "Escape") {
        if (document.fullscreenEnabled) {
          e.preventDefault();
          document.exitFullscreen();
        }
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
          <div ref={slideContainerRef} id="fullscreen">
            <div
              onKeyDown={onKeyDown}
              class={`${"marpit"}`}
              dangerouslySetInnerHTML={{ __html: marp.htmls[currentPage] }}
            ></div>
          </div>
          <p class="text-indigo-600">D ➡ : Next Page</p>
          <p class="text-indigo-600">A ⬅ : Previous Page</p>
          <p class="text-indigo-600">F : Full Screen</p>
          <p class="text-indigo-600">ESC : Exit Full Screen</p>
          <style dangerouslySetInnerHTML={{ __html: marp.css }} />
          <style>{`
            .marpit li { list-style: disc; }
            .marpit li > ul > li { list-style: square; }
            #fullscreen:fullscreen {
              margin: auto;
              padding: 50px;
            }
          `}</style>
        </>
      ) : null}
    </div>
  );
}
