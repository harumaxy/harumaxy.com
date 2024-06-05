<script lang="ts">
	import * as Card from '@/components/ui/card';
	import type { PageData } from './$types';
	import type { Post } from '$lib/db/schema';
	export let data: PageData;
</script>

{#snippet PostCard(p: Post)}
	<a href={`/posts/${p.slug}`}>
		<Card.Root>
			<Card.Header>
				<Card.Title>{p.title}</Card.Title>
				<Card.Description>{p.content}</Card.Description>
			</Card.Header>
			<Card.Content>
				<img src={p.thumbnail} alt={p.title} class="h-64 w-full object-cover" />
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<div class="m-auto grid h-full w-[1080px] gap-4 pt-10 sm:grid-cols-2">
	{#each data.posts ?? [] as post (post.id)}
		{@render PostCard(post)}
	{/each}
</div>
