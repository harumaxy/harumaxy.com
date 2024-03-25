import { posts, tags } from "./schema";

export type Post = typeof posts.$inferSelect;
export type CreatePost = typeof posts.$inferInsert;
export type Tag = typeof tags.$inferSelect;
export type CreateTag = typeof tags.$inferInsert;
