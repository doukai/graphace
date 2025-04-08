<script lang="ts" context="module">
	export type TItem = {
		name: string;
		data: any;
		onSelect: (data: any) => void;
	};
	export let data: TItem[];
</script>

<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import Typeahead from 'svelte-typeahead';
	import { getOS } from '@graphace/commons';

	export let placeholder: string | undefined;
	export let limit: number = 10;
	export let inputAfterSelect: 'clear' | 'update' | 'keep' = 'clear';
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const dispatch = createEventDispatcher<{
		focus: {};
	}>();

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
				dispatch('focus', {});
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="relative flex {className}" bind:this={seachboxEl}>
	<svg
		class="pointer-events-none absolute ml-4 self-center stroke-current opacity-60 text-base-content z-[{zIndex +
			1}]"
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
		{placeholder}
		{limit}
		hideLabel
		{data}
		extract={(item) => item.name}
		{inputAfterSelect}
		on:select={(e) => {
			if (e.detail.selected.onSelect) {
				e.detail.selected.onSelect(e.detail.selected.data);
			}
		}}
		on:clear
		on:input
		on:change
		on:focus
		on:blur
		on:keydown
		let:result
	>
		<div class="py-1 text-sm font-normal">
			{data[result.index].name}
		</div>
	</Typeahead>
	<div class="pointer-events-none absolute right-4 self-center gap-1 opacity-50 hidden lg:flex">
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
