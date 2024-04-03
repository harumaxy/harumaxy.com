import van from "vanjs-core";

const t = van.tags;

const inputClass = "border:1|solid|gray-80 grid-col:span|2 p:1rem";

export function Login() {
  const username = van.state("");
  const password = van.state("");
  return t.div(
    {
      class:
        "p:32 m:auto w:100vw max-w:1280px pt:2rem@md flex flex-direction:column jc:center",
    },
    t.h1({ class: "f:48 f:bold t:center pb:4rem" }, "Login"),
    t.div(
      { class: "t:center" },
      t.form(
        { action: "/api/auth/login", method: "POST" },
        t.div(
          {
            class: "grid-cols:3 gap:10",
          },
          t.label("Username"),
          t.input({
            name: "username",
            class: inputClass,
            type: "text",
            value: username,
            oninput: (e) => {
              username.val = e.target.value;
            },
          }),
          t.label("Password"),
          t.input({
            name: "password",
            class: inputClass,
            type: "password",
            value: password,
            oninput: (e) => {
              password.val = e.target.value;
            },
          }),
          t.button({ class: "bg:blue-500 p:1rem", type: "submit" }, "Login")
        )
      )
    )
  );
}
