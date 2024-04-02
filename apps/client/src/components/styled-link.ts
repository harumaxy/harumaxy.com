import context from "../context";

export function Link(
  name: string,
  text: string,
  params: Record<string, any> = {}
) {
  return context.link(
    { name, class: "f:32 t:underline f:rgb(255,234,0):hover", params },
    text
  );
}
