/* 1. Access APIs */
import { init, Style } from "@master/css";
/* 2. Configure your initial options here ... */
Style.extend("classes", {
  btn: "font:14 text:center h:40",
  body: "h:100vh bg:linear-gradient(#294E5F,#0D1117)",
});

/* 3. Manually initialize */
init();
