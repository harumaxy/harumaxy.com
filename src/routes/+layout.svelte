<script>
	import '../app.css';
	import Header from './Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
</script>

<div class="app flex h-dvh flex-col">
	<Header></Header>
	<ModeWatcher />

	<main class="flex-1">
		<slot />
	</main>

	<footer class="min-h-11"></footer>
</div>

<style>
</style>
