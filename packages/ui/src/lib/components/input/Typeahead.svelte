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
	class="typeahead {className} {contextClass} typeahead-bordered"
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
		<div data-part="text" class="py-1 font-normal">
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

<style>
	/* =========================================================================
	   Typeahead 组件样式（自包含，随组件 import 自动注入）
	   - 基于第三方 svelte-typeahead，内部 DOM 用 :global() 命中（沿用其双属性提权写法压过库样式）
	   - 命名空间 .typeahead-*，采用 DaisyUI 主题变量，风格对齐 Combobox
	   ========================================================================= */

	/* —— 基础盒子（默认对齐 DaisyUI input md；flex 容纳 图标/输入/kbd）—— */
	:global(.typeahead) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
		min-height: 3rem;
		padding: 0.375rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		border: 1px solid hsl(var(--bc) / 0);
		background-color: hsl(var(--b1) / 1);
		border-radius: var(--rounded-btn, 0.5rem);
	}
	:global(.typeahead:focus-within) {
		outline: 2px solid hsl(var(--bc) / 0.2);
		outline-offset: 2px;
	}

	/* —— variant —— */
	:global(.typeahead-bordered) {
		border-color: hsl(var(--bc) / 0.2);
	}
	:global(.typeahead-ghost) {
		background-color: hsl(var(--bc) / 0.05);
	}
	:global(.typeahead-ghost:focus-within) {
		background-color: hsl(var(--b1) / 1);
	}

	/* —— size（min-height + padding + font-size，与 Combobox 各档一致）—— */
	:global(.typeahead-xs) {
		min-height: 1.5rem;
		padding: 0.0625rem 0.5rem;
		font-size: 0.75rem;
		gap: 0.125rem;
	}
	:global(.typeahead-sm) {
		min-height: 2rem;
		padding: 0.125rem 0.75rem;
		font-size: 0.875rem;
	}
	:global(.typeahead-md) {
		min-height: 3rem;
		padding: 0.375rem 1rem;
		font-size: 0.875rem;
	}
	:global(.typeahead-lg) {
		min-height: 4rem;
		padding: 0.5rem 1.5rem;
		font-size: 1.125rem;
	}

	/* —— 第三方容器透明，避免盖住盒子背景（含 ghost 底色）——
	   svelte-typeahead 自带 [data-svelte-typeahead].svelte-HASH.svelte-HASH 白底 (0,3,0)，
	   这里用三重属性 (0,4,0) 压过它（库的 hash 会变，不能直接命中类名）*/
	:global(.typeahead [data-svelte-typeahead][data-svelte-typeahead][data-svelte-typeahead]) {
		background-color: transparent;
	}

	/* —— 搜索输入：完全自包含，透明背景 + 字号跟随尺寸 —— */
	:global(.typeahead [data-svelte-search][data-svelte-search] input) {
		flex-shrink: 1;
		width: 100%;
		padding: 0 0.25rem;
		border: none;
		border-radius: 0;
		outline: none;
		background-color: transparent;
		color: hsl(var(--bc) / 1);
		font-size: inherit;
		line-height: inherit;
	}
	:global(.typeahead [data-svelte-search][data-svelte-search] input:focus) {
		outline: none;
		box-shadow: none;
		background-color: transparent;
	}
	:global(.typeahead [data-svelte-search][data-svelte-search] input::placeholder) {
		color: hsl(var(--bc) / 0.4);
	}

	/* —— 搜索图标：跟随尺寸缩放 —— */
	:global(.typeahead-xs [data-part='icon']),
	:global(.typeahead-sm [data-part='icon']) {
		width: 0.875rem;
		height: 0.875rem;
	}
	:global(.typeahead-lg [data-part='icon']) {
		width: 1.25rem;
		height: 1.25rem;
	}

	/* —— 下拉列表（对齐 Combobox 菜单：rounded-box + 阴影 + bc/.1 高亮）—— */
	:global(
			.typeahead
				[data-svelte-typeahead][data-svelte-typeahead].dropdown[aria-expanded='true']
				.svelte-typeahead-list
		) {
		margin-top: 0.5rem;
		padding: 0.5rem;
		background-color: hsl(var(--b1) / 1);
		border: none;
		border-radius: var(--rounded-box, 0.5rem);
		overflow: hidden;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	}
	:global(.typeahead [data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li) {
		color: hsl(var(--bc) / 1);
		border-radius: var(--rounded-btn, 0.5rem);
	}
	:global(
			.typeahead
				[data-svelte-typeahead][data-svelte-typeahead]
				.svelte-typeahead-list
				li:not(:last-of-type)
		) {
		border-bottom: none;
	}
	:global(.typeahead [data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list li:hover),
	:global(.typeahead [data-svelte-typeahead][data-svelte-typeahead] .svelte-typeahead-list .selected),
	:global(
			.typeahead
				[data-svelte-typeahead][data-svelte-typeahead]
				.svelte-typeahead-list
				.selected:hover
		) {
		background-color: hsl(var(--bc) / 0.1);
		color: hsl(var(--bc) / 1);
	}
</style>
