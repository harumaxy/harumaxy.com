<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { Props } from '@/components/ui/button';
	import Button from '@/components/ui/button/button.svelte';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { siteTitle } from '@/const';
	import { setMode, toggleMode } from 'mode-watcher';

	let isDark = $state(browser ? localStorage.getItem('isDark') === 'true' : false);
	$effect(() => {
		setMode(isDark ? 'dark' : 'light');
		localStorage.setItem('isDark', isDark.toString());
	});

	const paths = [
		['Home', '/'],
		['About', '/about'],
		['Blog', '/posts'],
		['Tags', '/tags']
	];
	let pages = $derived(
		paths.map(([name, path]) => {
			let isActive =
				path === '/' ? path === $page.url.pathname : $page.url.pathname.startsWith(path);
			let variant: Props['variant'] = isActive ? 'default' : 'ghost';
			return { name, path, variant };
		})
	);
</script>

{#snippet NavLinks()}
	<div class="flex-grow max-sm:hidden"><!--spacer  --></div>
	<nav class="flex items-center justify-center gap-2 max-sm:hidden">
		{#each pages as p, i (p.path)}
			<Button
				href={p.path}
				size="lg"
				variant={p.variant}
				onclick={() => {
					$page.url.pathname = p.path;
				}}>{p.name}</Button
			>
		{/each}
		<div class="m-auto flex w-[6rem] items-center justify-center">
			<Switch bind:checked={isDark}></Switch>
		</div>
	</nav>
{/snippet}

<header class="flex px-12 py-8">
	<h1 class="m-auto text-5xl">{siteTitle}</h1>
	{@render NavLinks()}
</header>