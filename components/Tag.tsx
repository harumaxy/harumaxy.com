type TagProps = {
  tag: string;
};
export default function Tag({ tag }: TagProps) {
  return (
    <span
      class="mx-1 text-lg
      bg-yellow-500
      hover:bg-red-500
      duration-300
      py-2 px-4 rounded-full focus:outline-none focus:ring-2"
    >
      <a href={`/tags/${tag}`}>{tag}</a>
    </span>
  );
}
