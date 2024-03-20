import van from "vanjs-core";

function Body() {
  const { body, div, head, header, html } = van.tags;

  return body(
    header(div("Hello, VanJS!"), div("This is a simple VanJS app.")),
    div("This is the main content.")
  );
}

van.add(window.document.body, Body);
