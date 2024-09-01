<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { Props } from '@/components/ui/button';
	import Button from '@/components/ui/button/button.svelte';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { siteTitle } from '@/const';
	import { setMode, toggleMode } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import MenuIcon from './MenuIcon.svelte';

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
	<nav class="flex items-center justify-center gap-2">
		{#each pages as p, i (p.path)}
			<Button href={p.path} size="lg" variant={p.variant}>{p.name}</Button>
		{/each}
	</nav>
{/snippet}

<header class="flex items-center justify-center py-8">
	<h1 class="m-auto text-5xl"><a href="/">{siteTitle}</a></h1>
	<div class="flex-grow max-md:hidden"></div>
	<div class="flex items-center justify-center gap-2 max-md:hidden">
		{@render NavLinks()}
		<div class="m-auto flex w-[4rem] items-center justify-center">
			<Switch bind:checked={isDark}></Switch>
		</div>
	</div>
</header>

<div class="fixed bottom-8 right-8 md:hidden">
	<Sheet.Root>
		<Sheet.Trigger>
			<Button class="h-16 w-32">Menu</Button>
		</Sheet.Trigger>
		<Sheet.Content side="bottom" class="bg-card text-card-foreground">
			<div class="m-auto flex w-[4rem] items-center justify-center">
				<Switch bind:checked={isDark}></Switch>
			</div>
			<Sheet.Close class="w-full">
				<div class="m-auto flex items-center justify-center p-4">
					{@render NavLinks()}
				</div>
			</Sheet.Close>
		</Sheet.Content>
	</Sheet.Root>
</div>
