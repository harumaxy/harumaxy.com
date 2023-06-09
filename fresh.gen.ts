// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/about.tsx";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/api/slides/[slug].ts";
import * as $5 from "./routes/blog/[slug].tsx";
import * as $6 from "./routes/blog/_middleware.ts";
import * as $7 from "./routes/blog/index.tsx";
import * as $8 from "./routes/feeds.ts";
import * as $9 from "./routes/index.tsx";
import * as $10 from "./routes/tags/[tag].tsx";
import * as $11 from "./routes/tags/index.tsx";
import * as $$0 from "./islands/Slide.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/about.tsx": $2,
    "./routes/api/joke.ts": $3,
    "./routes/api/slides/[slug].ts": $4,
    "./routes/blog/[slug].tsx": $5,
    "./routes/blog/_middleware.ts": $6,
    "./routes/blog/index.tsx": $7,
    "./routes/feeds.ts": $8,
    "./routes/index.tsx": $9,
    "./routes/tags/[tag].tsx": $10,
    "./routes/tags/index.tsx": $11,
  },
  islands: {
    "./islands/Slide.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
