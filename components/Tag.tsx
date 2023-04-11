type TagProps = {
  tag: string;
  count?: number;
};
export default function Tag({ tag, count }: TagProps) {
  return (
    <a href={`/tags/${tag}`}>
      <span
        class="m-1 text-lg
        inline-block
      bg-yellow-500
      hover:bg-red-500
      duration-300
      py-2 px-4 rounded-full focus:outline-none focus:ring-2"
      >
        {count ? `${tag} (${count})` : tag}
      </span>
    </a>
  );
}
