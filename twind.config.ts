import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
        mono: "JetBrains Mono, monospace",
        copperGothic: "Copperplate Gothic, sans-serif",
        glitch: "'Rubik Glitch'",
      },
      colors: {
        tag: "#376a39",
        "tag-hover": "#4EC5F1",
        "nav-btn": "#006d5e",
        "nav-btn-hover": "#4EC5F1",
        "bg-grad-start": "#294E5F",
        "bg-grad-end": "#0D1117",
        "link-hover": "#4EC5F1",
      },
    },
  },
} as Options;
