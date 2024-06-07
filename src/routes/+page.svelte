<script>
	import Ogp from '@/components/OGP.svelte';
	import { avatarImage } from '@/const';
</script>

<Ogp title="Home" description="ホームページ" image={avatarImage} />

<section class="flex h-full items-center justify-center">
	<div>
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
			Welcome to My Homepage
		</h1>
	</div>
</section>
