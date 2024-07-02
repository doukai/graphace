<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, ChevronUp, ChevronDown } from '@steeze-ui/heroicons';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let items:
		| {
				value: any | null | undefined;
				label: string | null | undefined;
				node?: any | null | undefined;
		  }[]
		| null
		| undefined = [];
	export let selectedItem:
		| {
				value: any | null | undefined;
				label: string | null | undefined;
				node?: any | null | undefined;
		  }
		| null
		| undefined = undefined;
	export let name: string | undefined = undefined;
	export let placeholder: string = '';

	const dispatch = createEventDispatcher<{
		search: { searchValue: string | null | undefined };
	}>();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected }
	} = createCombobox<typeof selectedItem>({
		onSelectedChange: ({ curr, next }) => {
			selectedItem = curr.value;
			return next;
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

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
	<input type="search" use:melt={$input} class="input input-bordered w-full" {name} {placeholder} />
	<div class="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-magnum-900">
		{#if $open}
			<Icon src={ChevronUp} class="size-4" />
		{:else}
			<Icon src={ChevronDown} class="size-4" />
		{/if}
	</div>
	{#if $open}
		<ul
			class=" z-10 flex max-h-[300px] flex-col overflow-hidden rounded-lg"
			use:melt={$menu}
			transition:fly={{ duration: 150, y: -5 }}
		>
			<div
				class="flex max-h-full flex-col gap-0 overflow-y-auto bg-white px-2 py-2 text-black"
				tabindex="0"
			>
				{#each items as item, index (index)}
					<li
						use:melt={$option({
							value: item,
							label: item.label
						})}
						class="relative cursor-pointer scroll-my-2 rounded-md py-2 pl-4 pr-4 data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900 data-[disabled]:opacity-50"
					>
						{#if $isSelected(item)}
							<div class="check absolute left-2 top-1/2 z-10 text-magnum-900">
								<Icon src={Check} class="size-4" />
							</div>
						{/if}
						<div class="pl-4">
							<span class="font-medium">{item.label}</span>
						</div>
					</li>
				{:else}
					<li
						class="relative cursor-pointer rounded-md py-1 pl-8 pr-4 data-[highlighted]:bg-magnum-100 data-[highlighted]:text-magnum-700"
					>
						<span class="badge badge-ghost">{$LL.ui.table.empty()}</span>
					</li>
				{/each}
			</div>
		</ul>
	{/if}
</div>
