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
				<Card.Description>
					<time class="block">{p.published_at.toLocaleDateString()}</time>
					<time class="block">{p.published_at.toLocaleTimeString()}</time>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col items-center justify-center">
					<Image
						src={p.thumbnail || avatarImage}
						alt={p.title || 'no title'}
						layout="fixed"
						width={360}
						height={240}
					/>
				</div>
			</Card.Content>
		</Card.Root>
	</a>
{/snippet}

<div class="m-auto grid max-w-[1080px] grid-cols-1 gap-4 px-4 pt-10 lg:grid-cols-2">
	{#each data.posts ?? [] as post (post.id)}
		{@render PostCard(post)}
	{/each}
</div>
