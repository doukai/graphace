<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { NumberExpression, Sort } from '@graphace/graphql';
	import { NumberInput, NumberInputList, z_index } from '@graphace/ui';
	import OperatorSelect from '../input/OperatorSelect.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';

	export let name: string;
	export let value: NumberExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const z_class5 = z_index.top(5);

	let _expression: NumberExpression = { opr: 'EQ', val: undefined, arr: [] };
	let _sort: Sort | undefined = undefined;

	const dispatch = createEventDispatcher<{
		filter: {};
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
		dispatch('filter');
		$open = false;
	};

	const clear = (): void => {
		_expression.opr = 'EQ';
		_expression.arr = [];
		_expression.val = undefined;
		_sort = undefined;
		value = undefined;
		sort = undefined;
		dispatch('filter');
		$open = false;
	};

	const oprChange = (): void => {
		_expression.arr = [];
		_expression.val = undefined;
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
	<a class="link group inline-flex" href={null} use:melt={$trigger}>
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
	<div use:melt={$overlay} class="fixed inset-0 {z_class5}" />
	<div class="p-1 rounded-xl bg-base-100 shadow {z_class5}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div
			class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1 max-w-xs md:max-w-md"
			transition:fade={{ duration: 100 }}
		>
			<OperatorSelect
				bind:value={_expression.opr}
				on:change={(e) => oprChange()}
				className="md:select-sm w-full"
			/>
			{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
				<NumberInputList
					placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.arr}
					className="md:input-sm w-full"
					addBtnClassName="md:btn-sm"
				/>
			{:else}
				<NumberInput
					placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.val}
					className="md:input-sm w-full"
				/>
			{/if}
			<select class="select select-bordered md:select-sm w-full" bind:value={_sort}>
				<option value={undefined} selected>{$LL.ui_graphql.table.th.noSort()}</option>
				<option value="ASC">{$LL.ui_graphql.table.th.asc()}</option>
				<option value="DESC">{$LL.ui_graphql.table.th.desc()}</option>
			</select>
			<div class="flex space-x-1">
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.th.filter()}>
					<button
						class="btn btn-square btn-primary md:btn-sm"
						on:click|preventDefault={(e) => filter()}
					>
						<Icon src={Check} class="h-5 w-5" />
					</button>
				</div>
				<div class="tooltip flex items-center" data-tip={$LL.ui_graphql.table.th.cancel()}>
					<button
						class="btn btn-square btn-outline btn-error md:btn-sm"
						on:click|preventDefault={(e) => clear()}
					>
						<Icon src={XMark} class="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
