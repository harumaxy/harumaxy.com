/* 1. Access APIs */
import { init, Style } from "@master/css";
/* 2. Configure your initial options here ... */
Style.extend("classes", {
  btn: "font:14 text:center h:40",
  scrollbar: `
  {w:0;h:0;rounded}::scrollbar
  bg:fade-90::scrollbar
  bg:gray-22::scrollbar@dark
  bg:transparent::scrollbar-corner
  bg:fade-88::scrollbar-thumb
  bg:fade-78::scrollbar-thumb:hover
  bg:fade-66::scrollbar-thumb:active
  bg:gray-30::scrollbar-thumb@dark
  bg:gray-60::scrollbar-thumb:hover@dark
  bg:gray-60::scrollbar-thumb:active@dark
  rounded::scrollbar-thumb
`,
});

/* 3. Manually initialize */
init();
