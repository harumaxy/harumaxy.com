<script>
	import Ogp from '@/components/OGP.svelte';
	import { avatarImage } from '@/const';
	import 'highlight.js/styles/atom-one-dark.css';
	let { data } = $props();
	let { post, next, prev } = $derived(data);
</script>

<svelte:head>
	<title>{post?.title}</title>
	<meta name="description" content={post?.description} />
	<meta charset="utf-8" />
</svelte:head>

<div class="flex flex-col items-center justify-center">
	<div class="m-4 flex w-full max-w-[1280px] flex-col gap-2 px-4 max-lg:max-w-[1024px]">
		{#if post}
			<Ogp
				title={post.title ?? ''}
				description={post.description ?? ''}
				image={post.thumbnail ?? avatarImage}
			/>

			<div class=" w-full rounded-lg bg-card p-4 text-card-foreground">
				<article class="prose dark:prose-invert prose-code:rounded-md prose-pre:bg-transparent">
					<div>
						<h1 style="margin: auto;">{post.title}</h1>
						<time>{post.published_at.toLocaleDateString()}</time>
						<time>{post.published_at.toLocaleTimeString()}</time>
					</div>

					{@html post.content}
				</article>
			</div>
			<div class="flex w-full items-center justify-center gap-2 max-md:flex-col">
				{#if next}
					{@render NeighborPost(next, post.id)}
				{/if}
				<div class="flex-grow"></div>
				{#if prev}
					{@render NeighborPost(prev, post.id)}
				{/if}
			</div>
		{/if}
		{#if !post}
			<div class="w-full rounded-lg bg-card p-4 text-card-foreground">
				<h1>Not found</h1>
			</div>
		{/if}
	</div>
</div>

{#snippet NeighborPost(post, currentId)}
	<a href={`/posts/${post?.slug}`} data-sveltekit-preload-data
		><div class="prose rounded-lg bg-card p-4 text-card-foreground dark:prose-invert">
			<h3>
				{#if post.id > currentId}←Next:{/if}
				{post?.title}
				{#if post.id <= currentId}:Prev→{/if}
			</h3>
		</div>
	</a>
{/snippet}
