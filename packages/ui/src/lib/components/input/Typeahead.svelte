<script lang="ts" context="module">
	export type TItem = {
		name: string;
		data: any;
		onSelect: (data: any) => void;
	};

	let data: TItem[] = [];

	export const tItems = {
		add: (tItem: TItem | TItem[]) => {
			if (Array.isArray(tItem)) {
				data.push(
					...tItem?.filter((newItem) => newItem && !data.some((item) => item.name === newItem.name))
				);
			} else if (tItem) {
				if (!data.some((item) => item.name === tItem.name)) {
					data.push(tItem);
				}
			}
		}
	};
</script>

<script lang="ts">
	import { onMount, createEventDispatcher, getContext } from 'svelte';
	import Typeahead from 'svelte-typeahead';
	import { getOS } from '@graphace/commons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { MagnifyingGlass } from '@steeze-ui/heroicons';

	export let placeholder: string | undefined;
	export let limit: number = 10;
	export let inputAfterSelect: 'clear' | 'update' | 'keep' = 'clear';
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.typeahead') || '';

	const dispatch = createEventDispatcher<{
		focus: {};
	}>();

	let os: string;
	onMount(() => {
		os = getOS() || '';
	});

	let rootElement: HTMLDivElement;
	function handleKeydown(e: KeyboardEvent) {
		if ((e.keyCode === 75 && e.metaKey) || (e.keyCode === 75 && e.ctrlKey)) {
			e.preventDefault();
			let searchInput: HTMLInputElement | null = rootElement.querySelector('input[type=search]');
			if (searchInput) {
				searchInput.focus();
				dispatch('focus', {});
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	data-element="typeahead"
	data-part="root"
	class="flex flex-wrap items-center textarea focus-within:outline focus-within:outline-2 focus-within:outline-base-content/20 focus-within:outline-offset-2 textarea-bordered min-h-12 p-1 gap-1 {contextClass} {className}"
	bind:this={rootElement}
>
	<Icon src={MagnifyingGlass} data-part="icon" class="size-4 ml-2" />
	<Typeahead
		{placeholder}
		{limit}
		hideLabel
		{data}
		extract={(item) => item.name}
		{inputAfterSelect}
		on:select={(e) => {
			const tItem = e.detail.original;
			tItem.onSelect(tItem.data);
		}}
		on:clear
		on:input
		on:change
		on:focus
		on:blur
		on:keydown
		let:result
	>
		<div data-part="text" class="py-1 text-sm font-normal">
			{result.original.name}
		</div>
	</Typeahead>
	<div
		data-part="kbd"
		class="flex pointer-events-none right-2 self-center gap-1 opacity-50 max-sm:hidden"
	>
		{#if ['macos'].includes(os)}
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		{:else if ['windows', 'linux'].includes(os)}
			<kbd class="kbd kbd-sm">ctrl</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		{/if}
	</div>
</div>

<style global>
	[data-svelte-typeahead][data-svelte-typeahead] {
		background-color: transparent;
	}
	[data-svelte-search][data-svelte-search] input {
		flex-shrink: 1;
		font-size: 1rem /* 16px */;
		line-height: 1.25rem /* 20px */;
		--tw-bg-opacity: 1;
		background-color: hsl(var(--b1) / var(--tw-bg-opacity));
		border-width: 0px;
		padding-left: 0.25rem /* 4px */;
		padding-right: 0.25rem /* 4px */;
		width: 100%;
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	[data-svelte-search][data-svelte-search] input::placeholder {
		color: hsl(var(--bc) / var(--tw-placeholder-opacity));
		--tw-placeholder-opacity: 0.2;
	}
	[data-svelte-search][data-svelte-search] input:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color) !important;
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width))
			var(--tw-ring-color) !important;
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000) !important;
	}
	[data-svelte-typeahead][data-svelte-typeahead].dropdown[aria-expanded='true']
		.svelte-typeahead-list {
		transform: translateY(0.5em);
		background: hsl(var(--b1) / 0.99);
		border: 0 solid hsl(var(--bc) / 0.2);
		border-radius: 0.25rem /* 4px */;
		overflow: hidden;
		padding: 0.5rem;
		backdrop-filter: blur(1rem);
		margin-top: 0.5rem;
		--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list .selected,
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list .selected:hover {
		background: hsl(var(--n));
		color: hsl(var(--nc));
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li {
		color: hsl(var(--bc));
		border-radius: var(--rounded-btn, 0.5rem /* 8px */);
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li:hover {
		background: hsl(var(--b2));
		color: hsl(var(--bc));
	}
	[data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li:not(:last-of-type) {
		border-bottom: none;
	}
</style>
