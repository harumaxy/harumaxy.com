type TagProps = {
  tag: string;
};
export default function Tag({ tag }: TagProps) {
  return (
    <span class="text-lg bg-gradient-to-bl from-green-700 to-blue-600 font-medium py-2 px-4 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2">
      <a href={`/tags/${tag}`}>{tag}</a>
    </span>
  );
}

// tailwind css でカプセル型のおしゃれなタグボタンのコードを書いてください
