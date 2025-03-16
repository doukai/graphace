<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	import type { BooleanExpression, Sort } from '@graphace/graphql';
	import BooleanFilter from '../input/BooleanFilter.svelte';
	import SortSelect from '../input/SortSelect.svelte';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let name: string;
	export let value: BooleanExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let _expression: BooleanExpression = { opr: 'EQ', val: undefined, arr: [] };
	let _sort: Sort | undefined = undefined;

	const dispatch = createEventDispatcher<{
		filter: { value: BooleanExpression | null | undefined; sort: Sort | null | undefined };
	}>();

	const filter = (): void => {
		if (_expression.val) {
			value = { opr: _expression.opr, val: _expression.val, arr: undefined };
		} else if (_expression.arr && _expression.arr.length > 0) {
			value = { opr: _expression.opr, val: undefined, arr: _expression.arr };
		} else if (_expression.opr === 'NIL' || _expression.opr === 'NNIL') {
			value = { opr: _expression.opr, val: undefined, arr: undefined };
		} else {
			value = undefined;
		}
		sort = _sort;
		dispatch('filter', { value, sort });
		$open = false;
	};

	const clear = (): void => {
		_expression.opr = 'EQ';
		_expression.arr = [];
		_expression.val = undefined;
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

<td>
	<a class="link inline-flex" href={null} use:melt={$trigger}>
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
	<div class="p-1 z-[{zIndex + 5}] {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div
			class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1 max-w-xs md:max-w-md"
			transition:fade={{ duration: 100 }}
		>
			<BooleanFilter {disabled} bind:value={_expression} />
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
