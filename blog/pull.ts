import { $ } from 'bun';
import { client } from './local-db';

// Run this command manually at first to authorize wrangler-cli
await $`bun run wrangler d1 export harumaxy-com-db --remote --output=./blog/.temp/export.sql`;

const posts = await client.query.posts.findMany({
	with: {
		postTags: {
			with: {
				tag: true
			}
		}
	}
});

for (const p of posts) {
	const { content, frontMatter } = entityToMarkdown(p);
	const file = await Bun.file(`./blog/.temp/${p.slug}.md`);
	await file.writer().write([frontMatter, content].join('\n'));
}

function entityToMarkdown(entity: (typeof posts)[number]) {
	const { slug, title, thumbnail, draft, published_at } = entity;
	const tags = entity.postTags.map(({ tag }) => tag.name);
	const frontMatter = [
		'---',
		Object.entries({ slug, title, thumbnail, draft, published_at, tags })
			.map(
				([k, v]) =>
					`${k}: ${v instanceof Date ? v.toISOString() : v instanceof Array ? `[${v.join(', ')}]` : v}`
			)
			.join('\n'),
		'---'
	].join('\n');

	return { content: entity.content, frontMatter };
}

await $`rm ./blog/.temp/export.sql`;

console.log('Pull completed');
