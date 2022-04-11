<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/svg-arrow.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SideBar from '@components/ui/SideBar.svelte';
	import TypeMenu from '@components/graphql/introspection/TypeMenu.svelte';
	import NavBar from '@components/ui/NavBar.svelte';
	import { isOpen } from '$lib/stores/Menu';
	import type { __Type } from '$lib/types/__Type';

	onMount(() => {
		themeChange(false);
	});
</script>

<div>
	<div class={$isOpen ? 'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0' : 'hidden'}>
		<SideBar>
			<TypeMenu />
		</SideBar>
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

<style>
	:global(.tippy-box[data-theme='daisy']) {
		@apply inline-block py-1 px-1 rounded-lg shadow-sm bg-base-content;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='top'] > .tippy-arrow) {
		@apply -bottom-1.5 left-0 border-t-8 border-x-8 border-b-0 border-transparent border-t-base-content;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='bottom'] > .tippy-arrow) {
		@apply -top-1.5 left-0 border-t-0 border-x-8 border-b-8 border-transparent border-b-base-content;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='left'] > .tippy-arrow) {
		@apply -right-1.5 border-l-8 border-y-8 border-r-0 border-transparent border-l-base-content;
	}
	:global(.tippy-box[data-theme~='daisy'][data-placement^='right'] > .tippy-arrow) {
		@apply -left-1.5 border-l-0 border-y-8 border-r-8 border-transparent border-r-base-content;
	}
</style>
