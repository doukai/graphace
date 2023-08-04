<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel, BarsArrowDown, BarsArrowUp } from '@steeze-ui/heroicons';
	import { NumberInput, NumberInputList } from '@graphace/ui/components/input';
	import type { NumberExpression, Sort } from '@graphace/graphql/types';
	import LL from '$i18n/i18n-svelte';

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
		<select class="select select-bordered" bind:value={_expression.opr} on:change={oprChange}>
			<option value="EQ" selected>{$LL.uiGraphql.table.th.eq()}</option>
			<option value="NEQ">{$LL.uiGraphql.table.th.neq()}</option>
			<option value="LK">{$LL.uiGraphql.table.th.lk()}</option>
			<option value="NLK">{$LL.uiGraphql.table.th.nlk()}</option>
			<option value="GT">{$LL.uiGraphql.table.th.gt()}</option>
			<option value="GTE">{$LL.uiGraphql.table.th.gte()}</option>
			<option value="LT">{$LL.uiGraphql.table.th.lt()}</option>
			<option value="LTE">{$LL.uiGraphql.table.th.lte()}</option>
			<option value="NIL">{$LL.uiGraphql.table.th.nil()}</option>
			<option value="NNIL">{$LL.uiGraphql.table.th.nnil()}</option>
			<option value="IN">{$LL.uiGraphql.table.th.in()}</option>
			<option value="NIN">{$LL.uiGraphql.table.th.nin()}</option>
			<option value="BT">{$LL.uiGraphql.table.th.bt()}</option>
			<option value="NBT">{$LL.uiGraphql.table.th.nbt()}</option>
		</select>
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
			<button class="btn btn-square btn-primary" on:click={filter}>
				<Icon src={Check} class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
			<button class="btn btn-square btn-outline btn-error" on:click={clear}>
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
