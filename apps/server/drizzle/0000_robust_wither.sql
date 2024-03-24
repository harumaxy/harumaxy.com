CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text,
	`content` text,
	`thumbnail` text,
	`draft` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);