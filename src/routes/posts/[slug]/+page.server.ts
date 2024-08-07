import { makeDB } from '@/db/client.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
// @ts-expect-error no types
import gdscript from '@exercism/highlightjs-gdscript';

export async function load({ params, platform }) {
	if (!params.slug) return;
	if (!platform?.env.DB) return;
	const db = makeDB(platform.env.DB);
	hljs.registerLanguage('gdscript', gdscript);

	// Get post
	const _post = await db.query.posts.findFirst({
		where: (posts, { eq }) => eq(posts.slug, params.slug)
	});
	if (!_post) return {};

	// Get next & prev
	const nextPrev = db.query.posts
		.findMany({
			columns: { id: true, slug: true, title: true },
			where: (posts, { eq, or }) => or(eq(posts.id, _post.id - 1), eq(posts.id, _post.id + 1))
		})
		.then((posts) => [
			posts.find((p) => p.id === _post.id + 1),
			posts.find((p) => p.id === _post.id - 1)
		]);

	// Render Markdown
	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	marked.setOptions({
		gfm: true
	});

	// Do parallel tasks
	const [renderedContent, [next, prev]] = await Promise.all([
		marked.parse(_post.content ?? '', { async: true }),
		nextPrev
	]);
	const post = { ..._post, content: renderedContent, description: _post.content };

	return { post, next, prev };
}
