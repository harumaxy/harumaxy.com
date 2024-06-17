<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { avatarImage } from '@/const';
	import * as Card from '@/components/ui/card';
	import Ogp from '@/components/OGP.svelte';
</script>

<Ogp title="About" description="自己紹介" image={avatarImage} />
<svelte:head>
	<title>About</title>
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<Card.Root
		class="flex h-full max-h-[500px] w-full max-w-[800px] flex-col items-center justify-center text-center"
	>
		<Card.Header>
			<Avatar.Root class="h-48 w-48">
				<Avatar.Image src={avatarImage} alt="@harumaxy" />
				<Avatar.Fallback>HM</Avatar.Fallback>
			</Avatar.Root>
		</Card.Header>
		<Card.Content>
			<div class="prose dark:prose-invert">
				<h1 class="text-3xl font-bold">Harumaxy</h1>
				<p class="flex flex-col">
					<span>harumaxy@gmail.com</span>
					<span><a href="https://www.manabo.com/">manabo.inc</a></span>
					<span>backend engineer</span>
				</p>
			</div>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
