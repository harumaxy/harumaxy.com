import { relations } from "drizzle-orm";
import {
  course_items,
  courses,
  posts,
  purchase_of_course_item,
  users,
} from "./schema";

export const usersRelation = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users),
}));

export const purchaseOfCourseItemRelations = relations(
  purchase_of_course_item,
  ({ one }) => ({
    courseItem: one(course_items, {
      fields: [purchase_of_course_item.item_id],
      references: [course_items.id],
    }),
    user: one(users, {
      fields: [purchase_of_course_item.uid],
      references: [users.id],
    }),
  })
);

export const courseItemsRelations = relations(
  course_items,
  ({ one, many }) => ({
    course: one(courses, {
      fields: [course_items.course_id],
      references: [courses.id],
    }),
    purchases: many(purchase_of_course_item),
  })
);

export const coursesRelations = relations(courses, ({ many }) => ({
  courseItems: many(course_items),
}));
