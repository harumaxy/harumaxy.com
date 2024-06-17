<script lang="ts">
	import { page } from '$app/stores';
	interface Props {
		title: string;
		description: string;
		image: string;
	}
	let { title, description, image }: Props = $props();
</script>

<svelte:head>
	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:image" content={image} />
	<meta name="og:url" content={$page.url.toString()} />
</svelte:head>
