<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { createEventDispatcher } from 'svelte';
	import type { NumberExpression, Sort } from '@graphace/graphql';
	import { tippy, NumberInput, NumberInputList } from '@graphace/ui';
	import OperatorSelect from '../input/OperatorSelect.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let name: string;
	export let expression: NumberExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let _expression: NumberExpression = { opr: 'EQ', val: undefined, in: [] };
	let _sort: Sort | undefined = undefined;

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.val || (_expression.in && _expression.in.length > 0)) {
			expression = _expression;
		} else {
			expression = undefined;
		}
		sort = _sort;
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.opr = 'EQ';
		_expression.in = [];
		_expression.val = undefined;
		_sort = undefined;
		expression = undefined;
		sort = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const oprChange = (): void => {
		_expression.in = [];
		_expression.val = undefined;
	};
</script>

<div class="hidden">
	<div class="flex items-start space-x-1" bind:this={content}>
		<OperatorSelect bind:value={_expression.opr} on:change={(e) => oprChange()} />
		{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
			<NumberInputList
				placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
				{name}
				bind:value={_expression.in}
			/>
		{:else}
			<NumberInput
				placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
				{name}
				bind:value={_expression.val}
			/>
		{/if}
		<select class="select select-bordered" bind:value={_sort}>
			<option value={undefined} selected>{$LL.uiGraphql.table.th.noSort()}</option>
			<option value="ASC">{$LL.uiGraphql.table.th.asc()}</option>
			<option value="DESC">{$LL.uiGraphql.table.th.desc()}</option>
		</select>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
			<button class="btn btn-square btn-primary" on:click|preventDefault={(e) => filter()}>
				<Icon src={Check} class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
			<button class="btn btn-square btn-outline btn-error" on:click|preventDefault={(e) => clear()}>
				<Icon src={XMark} class="h-5 w-5" />
			</button>
		</div>
	</div>
</div>

<td>
	<a
		class="link group inline-flex"
		href={null}
		use:tippy={{
			content,
			placement: 'bottom',
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none',
			appendTo: () => document.body
		}}
		bind:this={tippyElement}
	>
		{name}
		{#if expression?.val || (expression?.in && expression.in.length > 0)}
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
