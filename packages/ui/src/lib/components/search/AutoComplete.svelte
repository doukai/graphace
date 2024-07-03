<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createCombobox, createTagsInput, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, ChevronUp, ChevronDown, XMark } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	type Item = {
		value: any | null | undefined;
		label: string | null | undefined;
		node?: any | null | undefined;
	};

	export let items: Item[] | null | undefined = [];
	export let selectedItem: Item | Item[] | null | undefined = undefined;
	export let multiple: boolean = false;
	export let name: string | undefined = undefined;
	export let placeholder: string = '';

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
	}>();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Item, boolean>({
		multiple: multiple,
		onSelectedChange: ({ curr, next }) => {
			selectedItem = Array.isArray(next) ? next.map((item) => item.value) : next.value;
			return next;
		}
	});

	const {
		elements: { root, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput();

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: if (!$open) {
		$tags = Array.isArray($selected)
			? $selected.map((item) => ({ id: item.value.value, value: item.label }))
			: $selected
			? [{ id: $selected.value.value, value: $selected.label }]
			: [];
	}

	$: {
		if ($touchedInput) {
			debounce(() => {
				dispatch('search', { searchValue: $inputValue });
			});
		} else {
			debounce(() => {
				dispatch('search', { searchValue: undefined });
			});
		}
	}
</script>

<div class="dropdown">
	<!-- <input use:melt={$input} class="input input-bordered w-full" {name} {placeholder} /> -->

	<div
		use:melt={$root}
		class="flex border-2 focus:ring-2 input-bordered flex-row flex-wrap gap-2.5 rounded-md px-3 py-2"
	>
		{#each $tags as t}
			<div use:melt={$tag(t)} class="flex bg-primary items-center overflow-hidden rounded-md">
				<span
					class="flex text-primary-content items-center border-r border-primary-content/10 px-1.5"
				>
					{t.value}
				</span>
				<button use:melt={$deleteTrigger(t)} class="flex h-full items-center px-1">
					<Icon src={XMark} class="size-3 bg-primary-content rounded-full" />
				</button>
			</div>
			<div use:melt={$edit(t)} class="flex items-center overflow-hidden rounded-md px-1.5">
				{t.value}
			</div>
		{/each}
		<input
			use:melt={$input}
			type="text"
			class="shrink grow basis-0 border-0 outline-none"
			{name}
			{placeholder}
		/>
		<div class="absolute right-2 top-1/2 z-10 -translate-y-1/2">
			{#if $open}
				<Icon src={ChevronUp} class="size-4" />
			{:else}
				<Icon src={ChevronDown} class="size-4" />
			{/if}
		</div>
	</div>
	{#if $open}
		<ul
			class="dropdown-content z-[50] menu shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			{#each items as item, index (index)}
				<li
					use:melt={$option({
						value: item,
						label: item.label
					})}
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="grid grid-cols-6 gap-1">
						{#if $isSelected(item)}
							<Icon src={Check} class="size-4" />
							<div class="col-span-5">
								{item.label}
							</div>
						{:else}
							<div class="col-start-2 col-span-5">
								{item.label}
							</div>
						{/if}
					</a>
				</li>
			{:else}
				<li>
					<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
