/* This is a script to create a new post markdown file with front-matter */

import fs from "fs";
import path from "path";

function toJSTISOString(date = new Date()) {
	// UTC時刻に9時間加算して日本時間にする
	const jstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

	// toISOString()でISO形式を取得し、末尾のZを+09:00に置換
	return jstDate.toISOString().replace("Z", "+09:00");
}

const now = toJSTISOString(new Date()).replace(/\.\d+/, "");

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`);
	process.exit(1); // Terminate the script and return error code 1
}

let fileName = args[0];

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".md";
}

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const thisYear = now.split("-")[0];
if (!thisYear) {
	throw new Error("Failed to get the current year");
}

const content = `---
title: ${args[0]}
published: ${now}
description: ''
image: ''
tags: []
category: ''
draft: true 
lang: 'ja'
---
`;

fs.writeFileSync(path.join(targetDir, thisYear, `${now}-${fileName}`), content);

console.log(`Post ${fullPath} created`);
