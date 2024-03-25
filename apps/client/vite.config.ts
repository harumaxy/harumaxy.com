// vite.config.js
import { defineConfig, splitVendorChunkPlugin } from "vite";

export default defineConfig({
  root: ".",
  plugins: [splitVendorChunkPlugin()],
});
