import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
// import { analyzer } from 'vite-bundle-analyzer';
export default defineConfig({
	plugins: [
		sveltekit()
		//  analyzer()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
