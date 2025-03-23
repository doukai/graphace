<script lang="ts" context="module">
	export type Option = {
		label: string | null | undefined;
		value?: string | null | undefined;
		parent?: Option | null | undefined;
		options?: Option[] | null | undefined;
		disabled?: boolean | undefined;
		hidden?: boolean | undefined;
	};
</script>

<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { createCombobox, createTagsInput, melt, type Tag } from '@melt-ui/svelte';
	import { Check, ChevronUp, ChevronDown, XMark } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons';
	import Loading from '../loading/Loading.svelte';
	import Empty from '../div/Empty.svelte';
	import { nanoid } from 'nanoid';

	export let options: Option[] | null | undefined = [];
	export let value: Option | Option[] | null | undefined = undefined;
	export let multiple: boolean = false;
	export let id: string | undefined = nanoid();
	export let name: string | undefined = undefined;
	export let placeholder: string = '';
	export let readonly = false;
	export let disabled = false;
	export let unique = true;
	export let addOnPaste = true;
	export let errors: Errors | undefined = undefined;
	export let separator: string = '-';
	export let loading: boolean = false;
	export let getOptionId: (option: Option) => string = (option: Option) => {
		if (option.parent?.value) {
			return option.parent.value + separator + option.value;
		}
		return option.value;
	};
	export let getOptionLabel: (option: Option) => string = (option: Option) => {
		if (option.parent?.label) {
			return option.parent.label + separator + option.label;
		}
		return option.label;
	};
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'textarea-bordered w-full min-h-12 p-1 gap-1';
	export { className as class };

	const contextClass = getContext<string>('ui.combox') || '';

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
		disabled: disabled,
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
		disabled: disabled,
		editable: !readonly,
		placeholder: placeholder,
		unique: unique,
		addOnPaste: addOnPaste,
		update: async (tag: Tag) => {
			dispatch('update', { option: { value: tag.id, label: tag.value } });
			return tag;
		},
		remove: async (tag: Tag) => {
			$selected = Array.isArray($selected)
				? $selected.filter((item) => getOptionId(item.value) !== tag.id)
				: undefined;
			return false;
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: $tags = Array.isArray(value)
		? value.map((item) => ({ id: getOptionId(item), value: getOptionLabel(item) }))
		: value
		? [{ id: getOptionId(value), value: getOptionLabel(value) }]
		: [];

	$: if (!$open) {
		$inputValue = '';
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
		class="flex flex-wrap items-center textarea {errors?.errors ||
		(errors?.iterms && Object.keys(errors?.iterms).length > 0)
			? 'textarea-error focus-within:outline-error'
			: 'focus-within:outline-base-content/20'}  focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 {className} {contextClass}"
	>
		{#each $tags as t, index}
			<div
				use:melt={$tag(t)}
				class="badge {errors?.iterms?.[index]
					? 'badge-error'
					: 'badge-neutral'} flex items-center [word-break:break-word] data-[disabled]:bg-neutral-content data-[selected]:bg-neutral-focus data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span
					class="flex items-center border-r {errors?.iterms?.[index]
						? 'bg-error'
						: 'bg-neutral'} border-white/10">{t.value}</span
				>
				<button
					use:melt={$deleteTrigger(t)}
					{disabled}
					class="flex items-center h-full {errors?.iterms?.[index]
						? 'enabled:hover:bg-error-focus'
						: 'enabled:hover:bg-neutral-focus'}"
				>
					<Icon src={XMark} class="size-3" />
				</button>
			</div>
			<div
				use:melt={$edit(t)}
				class="badge badge-outline flex items-center overflow-hidden [word-break:break-word] data-[invalid-edit]:focus:text-error"
			>
				{t.value}
			</div>
		{/each}
		<input
			use:melt={$input}
			{id}
			type="text"
			class="input px-1 h-5 w-full min-w-20 shrink grow basis-0 border-0 outline-none focus:outline-none focus:!ring-0 data-[invalid]:text-error"
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
	<div class="absolute right-2 top-1/2 z-[{zIndex + 9}] -translate-y-1/2">
		{#if $open}
			<Icon src={ChevronUp} class="size-4" />
		{:else}
			<Icon src={ChevronDown} class="size-4" />
		{/if}
	</div>
</div>
{#if $open}
	<ul
		class="menu shadow rounded-xl bg-base-100 w-full z-[{zIndex +
			9}] max-h-80 mt-4 flex-nowrap overflow-auto"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		{#if loading}
			<li>
				<Loading />
			</li>
		{:else if options}
			{#each options.filter((option) => !option.hidden) as op}
				{#if op.options}
					<div use:melt={$group(op.value)}>
						<div
							class="py-1 pl-4 pr-4 font-semibold capitalize text-neutral"
							use:melt={$groupLabel(op.label)}
						>
							{op.label}
						</div>
						{#each op.options?.filter((option) => !option.hidden) as children, index (index)}
							<li
								use:melt={$option({
									value: { ...children, parent: op },
									label: children.label
								})}
							>
								<!-- svelte-ignore a11y-missing-attribute -->
								<a class="flex">
									{#if $isSelected({ ...children, group: op })}
										<Icon src={Check} class="size-4" />
									{:else}
										<div class="size-4" />
									{/if}
									{children.label}
								</a>
							</li>
						{:else}
							<li>
								<Empty />
							</li>
						{/each}
					</div>
				{:else}
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
				{/if}
			{:else}
				<li>
					<Empty />
				</li>
			{/each}
		{/if}
	</ul>
{/if}
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
