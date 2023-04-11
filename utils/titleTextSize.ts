export const titleTextSize = (title: string, isIndex = false) => {
  const base = isIndex ? 2 : 3;
  const size = title.length < 30 ? base + 1 : base;
  return `text-${size}xl`;
};
