import { createInsertSchema } from "drizzle-typebox";
import * as schema from "./schema";
import { t } from "elysia";

export const createPost = createInsertSchema(schema.posts);

export const updatePost = t.Pick(createPost, [
  "title",
  "content",
  "thumbnail",
  "draft",
]);
