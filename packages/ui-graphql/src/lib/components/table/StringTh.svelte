<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	import type { StringExpression, Sort } from '@graphace/graphql';
	import StringFilter from '../input/StringFilter.svelte';
	import SortSelect from '../input/SortSelect.svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let name: string;
	export let value: StringExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let _value: StringExpression = { opr: 'EQ', val: undefined, arr: [] };
	let _sort: Sort | undefined = undefined;

	const dispatch = createEventDispatcher<{
		filter: { value: StringExpression | null | undefined; sort: Sort | null | undefined };
	}>();

	if (value) {
		_value = value;
		if (!value.opr) {
			if (value.arr) {
				_value.opr = 'IN';
			} else {
				_value.opr = 'EQ';
			}
		}
	}

	if (sort) {
		_sort = sort;
	}

	const filter = (): void => {
		if (_value.val) {
			value = { opr: _value.opr, val: _value.val, arr: undefined };
		} else if (_value.arr && _value.arr.length > 0) {
			value = { opr: _value.opr, val: undefined, arr: _value.arr };
		} else if (_value.opr === 'NIL' || _value.opr === 'NNIL') {
			value = { opr: _value.opr, val: undefined, arr: undefined };
		} else {
			value = undefined;
		}
		sort = _sort;
		dispatch('filter', { value, sort });
		$open = false;
	};

	const clear = (): void => {
		_value.opr = 'EQ';
		_value.arr = [];
		_value.val = undefined;
		_sort = undefined;
		value = undefined;
		sort = undefined;
		dispatch('filter', { value, sort });
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<td class={className}>
	<a class="link group inline-flex truncate" href={null} use:melt={$trigger}>
		{name}
		{#if value?.val || (value?.arr && value.arr.length > 0)}
			<span class="ml-1 flex-none">
				<Icon src={Funnel} class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === 'ASC'}
			<span class="ml-1 flex-none">
				<Icon src={BarsArrowDown} class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === 'DESC'}
			<span class="ml-1 flex-none">
				<Icon src={BarsArrowUp} class="h-5 w-5" />
			</span>
		{/if}
	</a>
</td>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="rounded-box shadow bg-base-200 p-1 z-[{zIndex + 5}]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div
			class="flex items-center flex-col space-x-0 space-y-1 md:flex-row md:space-x-1 md:space-y-0"
			transition:fade={{ duration: 100 }}
		>
			<StringFilter class="w-full" {disabled} bind:value={_value} />
			<SortSelect {disabled} bind:value={_sort} />
			<div class="flex space-x-1">
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.th.filter()}>
					<button
						{disabled}
						class="btn btn-square btn-primary"
						on:click|preventDefault={(e) => filter()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.th.cancel()}>
					<button
						{disabled}
						class="btn btn-square btn-outline btn-error"
						on:click|preventDefault={(e) => clear()}
					>
						<Icon src={XMark} class="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
