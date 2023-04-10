type TagProps = {
  tag: string;
};
export default function Tag({ tag }: TagProps) {
  return (
    <a href={`/tags/${tag}`}>
      <span
        class="mx-1 text-lg
      bg-yellow-500
      hover:bg-red-500
      duration-300
      py-2 px-4 rounded-full focus:outline-none focus:ring-2"
      >
        {tag}
      </span>
    </a>
  );
}
