<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SideBar from '@components/ui/SideBar.svelte';
	import NavBar from '@components/ui/NavBar.svelte';
	import { isOpen } from '$lib/stores/Menu';
	import { initClient } from '@urql/svelte';

	onMount(() => {
		themeChange(false);
	});

	initClient({
		url: 'http://localhost:8080/graphql',
		maskTypename: false
	});
</script>

<div>
	<div class={$isOpen ? 'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0' : 'hidden'}>
		<SideBar />
	</div>
	<div class={$isOpen ? 'md:pl-64 flex flex-col' : 'flex flex-col'}>
		<NavBar />
		<main class="flex-1">
			<div class="py-6">
				<div class="overflow-hidden max-w-full mx-auto px-4 sm:px-6 md:px-8">
					<slot />
				</div>
			</div>
		</main>
	</div>
</div>
