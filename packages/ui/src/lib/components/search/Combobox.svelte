<script lang="ts" context="module">
	export type Option = {
		value: any | null | undefined;
		label: string | null | undefined;
		node?: any | null | undefined;
		group?: Group | null | undefined;
		disabled?: boolean | undefined;
	};
	export type Group = {
		value: any | null | undefined;
		label: string | null | undefined;
		options?: Option[] | null | undefined;
		disabled?: boolean | undefined;
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
	export let rootClassName: string = '';
	export let className: string = '';
	export let containerClassName: string = '';
	export let tagClassName: string = '';
	export let menuClassName: string = '';
	export let groupClassName: string = '';
	export let labelClassName: string = '';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let options: Option[] | null | undefined = [];
	export let groups: Group[] | null | undefined = undefined;
	export let value: Option | Option[] | null | undefined = undefined;
	export let multiple: boolean = false;
	export let name: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let disabled = false;
	export let placeholder: string = '';
	export let loading: boolean = false;

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
		update: { option: Option };
		change: { value: Option | Option[]; original?: Option | Option[] };
	}>();

	const {
		elements: { menu, input, option, label, group, groupLabel },
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
			let original = Array.isArray(curr) ? curr.map((item) => item.value) : curr?.value;
			dispatch('change', { value, original });
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
				? $selected.filter((item) => (item.value.group?.value || '') + item.value.value !== t.id)
				: undefined;
			return false;
		}
	});

	$: $tags = Array.isArray(value)
		? value.map((item) => ({ id: (item.value.group?.value || '') + item.value, value: item.label }))
		: value
		? [{ id: (value.value.group?.value || '') + value.value, value: value.label }]
		: [];

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: if (!$open) {
		$inputValue = '';
	}

	$: if ($touchedInput) {
		debounce(() => {
			dispatch('search', { searchValue: $inputValue });
		});
	}
</script>

<div class="relative {rootClassName}">
	<div class={title ? `input-group ${groupClassName}` : ''}>
		{#if title}
			<span class="whitespace-nowrap {labelClassName}">{title}</span>
		{/if}
		<div
			use:melt={$root}
			class="textarea textarea-bordered flex flex-row flex-wrap items-center w-full min-h-12 p-0 {containerClassName}"
		>
			{#each $tags as t}
				<div
					use:melt={$tag(t)}
					class="badge badge-neutral flex items-center ml-1 mt-1 mb-1 pl-1 pr-0 overflow-hidden {tagClassName}"
				>
					<span class="flex items-center border-r p-1 bg-neutral border-white/10">{t.value}</span>
					<button
						use:melt={$deleteTrigger(t)}
						{disabled}
						class="flex items-center h-full hover:bg-neutral-focus"
					>
						<Icon src={XMark} class="size-3" />
					</button>
				</div>
				<div use:melt={$edit(t)} class="flex items-center rounded-md px-1.5 overflow-hidden">
					{t.value}
				</div>
			{/each}
			<input
				use:melt={$input}
				type="text"
				class="input input-sm shrink grow basis-0 border-0 outline-none focus:outline-none {className}"
				on:focus={(e) => {
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
				placeholder={value || (Array.isArray(value) && value.length > 0) ? '' : placeholder}
				{disabled}
			/>
		</div>
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
		class="menu shadow rounded-xl bg-base-100 w-full z-[50] max-h-80 flex-nowrap overflow-auto {menuClassName}"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		{#if loading}
			<li>
				<div class="flex justify-center flex-nowrap">
					<span class="loading loading-spinner loading-xs" />
				</div>
			</li>
		{:else if groups}
			{#each groups.filter((group) => !group.disabled) as g}
				<div use:melt={$group(g.value)}>
					<div
						class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral"
						use:melt={$groupLabel(g.label)}
					>
						{g.label}
					</div>
					{#each g.options.filter((option) => !option.disabled) as op, index (index)}
						<li
							use:melt={$option({
								value: { ...op, group: { value: g.value, label: g.label } },
								label: op.label
							})}
						>
							<!-- svelte-ignore a11y-missing-attribute -->
							<a class="flex">
								{#if $isSelected({ ...op, group: { value: g.value, label: g.label } })}
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
				</div>
			{:else}
				<li>
					<div class="flex justify-center flex-nowrap">
						<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
					</div>
				</li>
			{/each}
		{:else}
			{#each options.filter((option) => !option.disabled) as op, index (index)}
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
