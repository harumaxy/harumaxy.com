<script lang="ts">
	import type { Tag } from '@/db/schema';
	import type { PageData } from './$types';
	import Badge from '@/components/ui/badge/badge.svelte';
	import * as Card from '@/components/ui/card';

	export let data: PageData;
</script>

<div class="flex h-full w-full items-center justify-center">
	<Card.Root
		class="flex h-full max-h-[500px] w-full max-w-[800px] flex-col items-center justify-center text-center"
	>
		<Card.Header>
			<h1 class="text-4xl font-bold">Tags</h1>
		</Card.Header>
		<Card.Content>
			<div class="flex gap-2">
				{#each data.tags as tag (tag.id)}
					<Badge class="text-xl" href={`/posts?tag=${tag.name}`}>
						{tag.name}
					</Badge>
				{/each}
			</div>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
