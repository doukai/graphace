<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Filter, SortAscending, SortDescending } from '@steeze-ui/heroicons';
	import { Toggle, ToggleList } from '@graphace/ui/components/input';
	import { type BooleanExpression, Operator, Sort } from '@graphace/graphql/types';
	import LL from '~/i18n/i18n-svelte';

	export let name: string;
	export let expression: BooleanExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let _expression: BooleanExpression = { opr: Operator.EQ, val: undefined, in: [] };
	let _sort: Sort | undefined = undefined;

	let content: HTMLElement;
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
	};

	const clear = (): void => {
		_expression.opr = Operator.EQ;
		_expression.in = [];
		_expression.val = undefined;
		_sort = undefined;
		expression = undefined;
		sort = undefined;
		dispatch('filter');
	};

	const oprChange = (): void => {
		_expression.in = [];
		_expression.val = undefined;
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	<select class="select select-bordered" bind:value={_expression.opr} on:change={oprChange}>
		<option value="EQ" selected>{$LL.components.graphql.table.th.eq()}</option>
		<option value="NEQ">{$LL.components.graphql.table.th.neq()}</option>
		<option value="LK">{$LL.components.graphql.table.th.lk()}</option>
		<option value="NLK">{$LL.components.graphql.table.th.nlk()}</option>
		<option value="GT">{$LL.components.graphql.table.th.gt()}</option>
		<option value="GTE">{$LL.components.graphql.table.th.gte()}</option>
		<option value="LT">{$LL.components.graphql.table.th.lt()}</option>
		<option value="LTE">{$LL.components.graphql.table.th.lte()}</option>
		<option value="NIL">{$LL.components.graphql.table.th.nil()}</option>
		<option value="NNIL">{$LL.components.graphql.table.th.nnil()}</option>
		<option value="IN">{$LL.components.graphql.table.th.in()}</option>
		<option value="NIN">{$LL.components.graphql.table.th.nin()}</option>
		<option value="BT">{$LL.components.graphql.table.th.bt()}</option>
		<option value="NBT">{$LL.components.graphql.table.th.nbt()}</option>
	</select>
	{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
		<ToggleList {name} bind:value={_expression.in} />
	{:else}
		<Toggle {name} bind:value={_expression.val} />
	{/if}
	<select class="select select-bordered" bind:value={sort}>
		<option value={undefined} selected>{$LL.components.graphql.table.th.noSort()}</option>
		<option value="ASC">{$LL.components.graphql.table.th.asc()}</option>
		<option value="DESC">{$LL.components.graphql.table.th.desc()}</option>
	</select>
	<div class="tooltip" data-tip={$LL.components.graphql.table.th.filter()}>
		<button class="btn btn-square btn-primary" on:click={filter}>
			<Icon src={Check} solid class="h-5 w-5" />
		</button>
	</div>
	<div class="tooltip" data-tip={$LL.components.graphql.table.th.cancel()}>
		<button class="btn btn-square btn-outline btn-error" on:click={clear}>
			<Icon src={X} solid class="h-5 w-5" />
		</button>
	</div>
</div>

<th>
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
	>
		{name}
		{#if expression?.val || (expression?.in && expression.in.length > 0)}
			<span class="ml-1 flex-none">
				<Icon src={Filter} solid class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === Sort.ASC}
			<span class="ml-1 flex-none">
				<Icon src={SortAscending} solid class="h-5 w-5" />
			</span>
		{/if}
		{#if sort && sort === Sort.DESC}
			<span class="ml-1 flex-none">
				<Icon src={SortDescending} solid class="h-5 w-5" />
			</span>
		{/if}
	</a>
</th>
