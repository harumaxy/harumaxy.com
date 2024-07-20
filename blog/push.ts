import * as fs from 'node:fs/promises';

const path = Bun.argv.at(-1);

if (!path?.endsWith('.md')) {
	console.error('Not a markdown file');
	process.exit(1);
}

if (!(await fs.exists(path))) {
	console.error(`File not found: ${path}`);
	process.exit(1);
}

const file = await Bun.file(path).text();
const res = await fetch(`${process.env.API_URL}/posts`, {
	method: 'POST',
	headers: {
		'Content-Type': 'text/plain',
		Authorization: `Bearer ${process.env.API_KEY}`
	},
	body: file
});

if (res.status !== 200) {
	console.error(await res.text());
	process.exit(1);
}

console.log('Upload completed');
