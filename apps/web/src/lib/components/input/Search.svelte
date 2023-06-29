<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
	import Typeahead from 'svelte-typeahead';
	import type TItem from 'svelte-typeahead';
	import { getOS } from '@graphace/commons/utils/system-util';
	import { locale } from '~/i18n/i18n-svelte';
	import pages from '~/lib/data/pages.json';

	export let addScrollPaddingToNavbar: () => void = () => {};
	export let removeScrollPaddingFromNavbar: () => void = () => {};

	const dispatch = createEventDispatcher();

	let searchIndex: any[] = pages.flatMap((page) => page.items);

	let os: string;
	onMount(() => {
		os = getOS() || '';
	});

	let seachboxEl: HTMLLabelElement;
	function handleKeydown(e: KeyboardEvent) {
		if ((e.keyCode === 75 && e.metaKey) || (e.keyCode === 75 && e.ctrlKey)) {
			e.preventDefault();
			let searchInput: HTMLInputElement | null = seachboxEl.querySelector('input[type=search]');
			if (searchInput) {
				searchInput.focus();
				dispatch('focus');
			}
		}
	}

	function onSelect(
		select: CustomEvent<{
			searched: string;
			selected: TItem;
			selectedIndex: number;
			original: TItem;
			originalIndex: number;
		}>
	) {
		goto('/' + $locale + searchIndex[select.detail.originalIndex].href);
		dispatch('search', select.detail);
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="searchbox relative mx-3 w-full" bind:this={seachboxEl}>
	<svg
		class="pointer-events-none absolute z-10 my-3.5 ml-4 stroke-current opacity-60 text-base-content"
		width="16"
		height="16"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
		/>
	</svg>
	<Typeahead
		placeholder="Search"
		limit={8}
		label="Search"
		data={searchIndex}
		extract={(item) => item.tags}
		inputAfterSelect="clear"
		on:select={onSelect}
		on:focus={removeScrollPaddingFromNavbar}
		on:blur={addScrollPaddingToNavbar}
		let:result
	>
		<div class="py-1 text-sm font-normal">
			{searchIndex[result.index].name}
		</div>
	</Typeahead>
	<div class="pointer-events-none absolute right-10 top-2.5 gap-1 opacity-50 hidden lg:flex">
		{#if ['macos'].includes(os)}
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		{:else if ['windows', 'linux'].includes(os)}
			<kbd class="kbd kbd-sm">ctrl</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		{/if}
	</div>
</label>

<style global>
	.searchbox.searchbox [data-svelte-typeahead][data-svelte-typeahead] {
		background-color: transparent;
		width: 100%;
		max-width: 100%;
	}
	[data-svelte-search][data-svelte-search] label {
		display: none;
	}
	[data-svelte-search][data-svelte-search] input {
		background-color: transparent;
		color: inherit;
		border: 2px solid transparent;
		border-radius: var(--rounded-btn);
		padding-left: 2.5em;
	}
	[data-svelte-search][data-svelte-search] input::placeholder {
		color: inherit;
	}
	[data-svelte-search][data-svelte-search] input:focus {
		outline: none;
		outline-offset: 0;
		border: 2px solid hsl(var(--bc) / 0.2);
		background-color: hsl(var(--b1));
		color: hsl(var(--bc));
	}
	[data-svelte-typeahead][data-svelte-typeahead].dropdown[aria-expanded='true']
		.svelte-typeahead-list {
		transform: translateY(0.5em);
		background: hsl(var(--b1) / 0.99);
		border: 0 solid hsl(var(--bc) / 0.2);
		border-radius: var(--rounded-box);
		overflow: hidden;
		padding: 0.5rem;
		backdrop-filter: blur(1rem);
		margin-top: 0.5rem;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list .selected,
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list .selected:hover {
		background: hsl(var(--n));
		color: hsl(var(--nc));
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li {
		color: hsl(var(--bc));
		border-radius: var(--rounded-btn);
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li:hover {
		background: hsl(var(--b2));
		color: hsl(var(--bc));
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li:not(:last-of-type) {
		border-bottom: none;
	}
</style>
