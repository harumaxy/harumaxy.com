<script lang="ts">
	import * as Card from '@/components/ui/card';
	import type { PageData } from './$types';
	import type { Post } from '$lib/db/schema';
	import { avatarImage } from '@/const';
	import { Image } from '@unpic/svelte';
	export let data: PageData;
</script>

{#snippet PostCard(p: Post)}
	<a href={`/posts/${p.slug}`}>
		<Card.Root>
			<Card.Header>
				<Card.Title>{p.title}</Card.Title>
				<Card.Description>Draft: {p.draft}</Card.Description>
			</Card.Header>
			<Card.Content>
				<Image
					src={p.thumbnail || avatarImage}
					alt={p.title || 'no title'}
					layout="fixed"
					height={360}
					width={640}
				/>
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<div class="m-auto grid w-[1080px] gap-4 pt-10 sm:grid-cols-2">
	{#each data.posts ?? [] as post (post.id)}
		{@render PostCard(post)}
	{/each}
</div>
