<script lang="ts">
	import * as Card from '@/components/ui/card';
	import type { Post, Tag } from '$lib/db/schema';
	import { avatarImage } from '@/const';
	import { Image } from '@unpic/svelte';
	import type { PostListItem } from './+page.server';
	import Badge from '@/components/ui/badge/badge.svelte';
	export let data: { rows: PostListItem[] };
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

{#snippet PostCard(post: Post, tags: Tag[])}
	<a href={`/posts/${post.slug}`}>
		<Card.Root>
			<Card.Header>
				<Card.Title>{post.title}</Card.Title>
				<Card.Description class="flex flex-col gap-1 py-2">
					<div class="flex min-h-7 gap-1">
						{#each tags as tag (tag.id)}
							<Badge class="text-sm" href={`/posts?tag=${tag.name}`}>{tag.name}</Badge>
						{/each}
					</div>
					<time class="block">{post.published_at.toLocaleDateString()}</time>
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col items-center justify-center">
					<Image
						src={post.thumbnail || avatarImage}
						alt={post.title || 'no title'}
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
	{#each data.rows as row (row.post.id)}
		{@render PostCard(row.post, row.tags)}
	{/each}
</div>
