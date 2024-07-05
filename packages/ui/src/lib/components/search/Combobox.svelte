<script lang="ts" context="module">
	export type Option = {
		value: any | null | undefined;
		label: string | null | undefined;
		node?: any | null | undefined;
	};
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createCombobox, createTagsInput, melt, type Tag } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, ChevronUp, ChevronDown, XMark } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let options: Option[] | null | undefined = [];
	export let value: Option | Option[] | null | undefined = undefined;
	export let multiple: boolean = false;
	export let name: string | undefined = undefined;
	export let disabled = false;
	export let placeholder: string = '';
	export let loading: boolean = false;

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
		update: { option: Option };
		change: { value: Option | Option[] };
	}>();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<Option, boolean>({
		defaultSelected: Array.isArray(value)
			? value.map((item) => ({
					value: item,
					label: item.label
			  }))
			: value
			? { value: value, label: value.label }
			: undefined,
		multiple: multiple,
		onSelectedChange: ({ curr, next }) => {
			value = Array.isArray(next) ? next.map((item) => item.value) : next?.value;
			dispatch('change', { value });
			return next;
		}
	});

	const {
		elements: { root, tag, deleteTrigger, edit },
		states: { tags }
	} = createTagsInput({
		update: async (tag: Tag) => {
			dispatch('update', { option: { value: tag.id, label: tag.value } });
			return tag;
		},
		remove: async (t: Tag) => {
			$selected = Array.isArray($selected)
				? $selected.filter((item) => item.value.value !== t.id)
				: undefined;
			return false;
		}
	});

	$: $tags = Array.isArray(value)
		? value.map((item) => ({ id: item.value, value: item.label }))
		: value
		? [{ id: value.value, value: value.label }]
		: [];

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: if (!$open) {
		if (multiple) {
			$inputValue = '';
		} else {
			if ($selected && !Array.isArray($selected)) {
				$inputValue = $selected.label;
			}
		}
	}

	$: if ($touchedInput) {
		debounce(() => {
			dispatch('search', { searchValue: $inputValue });
		});
	}
</script>

<div class="relative">
	<div
		use:melt={$root}
		class="flex border border-solid flex-row flex-wrap gap-1 rounded-md px-3 py-3"
	>
		{#if multiple}
			{#each $tags as t}
				<div use:melt={$tag(t)} class="flex bg-neutral items-center overflow-hidden rounded-md">
					<span
						class="flex text-neutral-content items-center border-r border-neutral-content/10 px-1.5"
					>
						{t.value}
					</span>
					<button use:melt={$deleteTrigger(t)} class="flex h-full items-center px-1" {disabled}>
						<Icon src={XMark} class="size-3 bg-neutral-content rounded-full" />
					</button>
				</div>
				<div use:melt={$edit(t)} class="flex items-center overflow-hidden rounded-md px-1.5">
					{t.value}
				</div>
			{/each}
		{/if}
		<input
			use:melt={$input}
			type="text"
			class="shrink grow bg-base-100 basis-0 border-0 outline-none"
			on:focus={(e) => {
				loading = true;
				if ($touchedInput) {
					debounce(() => {
						dispatch('search', { searchValue: $inputValue });
					});
				} else {
					debounce(() => {
						dispatch('search', { searchValue: undefined });
					});
				}
			}}
			{name}
			{placeholder}
			{disabled}
		/>
	</div>
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
		class="z-[50] menu shadow bg-base-100 rounded-box w-full max-h-80 flex-nowrap overflow-auto"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		{#if loading}
			<li>
				<div class="flex justify-center flex-nowrap">
					<span class="loading loading-spinner loading-xs" />
				</div>
			</li>
		{:else}
			{#each options as op, index (index)}
				<li
					use:melt={$option({
						value: op,
						label: op.label
					})}
				>
					<!-- svelte-ignore a11y-missing-attribute -->
					<a class="flex">
						{#if $isSelected(op)}
							<Icon src={Check} class="size-4" />
						{:else}
							<div class="size-4" />
						{/if}
						{op.label}
					</a>
				</li>
			{:else}
				<li>
					<div class="flex justify-center flex-nowrap">
						<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
{/if}
