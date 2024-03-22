import { relations } from "drizzle-orm";
import { posts, users } from "./schema";

export const usersRelation = relations(users, ({ one }) => ({
  posts: one(posts, {
    fields: [users.id],
    references: [posts.author_id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.author_id],
    references: [users.id],
  }),
}));
