<script>
	import * as Avatar from '$lib/components/ui/avatar';
	import { avatarImage } from '@/const';
</script>

<div class="flex h-full items-center justify-center">
	<div class="flex">
		<div>
			<Avatar.Root class="h-48 w-48">
				<Avatar.Image src={avatarImage} alt="@harumaxy" />
				<Avatar.Fallback>HM</Avatar.Fallback>
			</Avatar.Root>
			<div class="text-center">
				<h1 class="text-3xl font-bold">Harumaxy</h1>
				<p>harumaxy@gmail.com</p>
				<p>backend engineer</p>
			</div>
		</div>
	</div>
</div>
