<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Filter, SortAscending, SortDescending } from '@steeze-ui/heroicons';
	import { Input, InputList } from '@graphace/ui/components/input';
	import { type __Field, type StringFilter, Operator, Sort } from '@graphace/graphql/types';
	import LL from '~/i18n/i18n-svelte';

	export let name: string;
	export let value: StringFilter;

	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const clear = (): void => {
		if (value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT') {
			value.val = [];
		} else {
			value.val = undefined;
		}
		value.opr = Operator.EQ;
		value.sort = undefined;
		dispatch('filter');
	};

	const oprChange = (opr: Operator | undefined): void => {
		if (opr === 'IN' || opr === 'NIN' || opr === 'BT' || opr === 'NBT') {
			value.val = [];
		} else {
			value.val = undefined;
		}
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	<select
		class="select select-bordered"
		bind:value={value.opr}
		on:change={() => oprChange(value.opr)}
	>
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
	{#if (value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT') && Array.isArray(value.val)}
		<InputList
			placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
			{name}
			bind:value={value.val}
		/>
	{:else if !Array.isArray(value.val)}
		<Input
			placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
			{name}
			bind:value={value.val}
		/>
	{/if}
	<select class="select select-bordered" bind:value={value.sort}>
		<option value={undefined} selected>{$LL.components.graphql.table.th.noSort()}</option>
		<option value="ASC">{$LL.components.graphql.table.th.asc()}</option>
		<option value="DESC">{$LL.components.graphql.table.th.desc()}</option>
	</select>
	<div class="tooltip" data-tip={$LL.components.graphql.table.th.filter()}>
		<button class="btn btn-square btn-primary" on:click={() => dispatch('filter')}>
			<Icon src={Check} solid class="h-5 w-5" />
		</button>
	</div>
	<div class="tooltip" data-tip={$LL.components.graphql.table.th.cancel()}>
		<button class="btn btn-square btn-outline btn-error" on:click={() => clear()}>
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
		{#if value.val}
			<span class="ml-1 flex-none">
				<Icon src={Filter} solid class="h-5 w-5" />
			</span>
		{/if}
		{#if value.sort && value.sort === Sort.ASC}
			<span class="ml-1 flex-none">
				<Icon src={SortAscending} solid class="h-5 w-5" />
			</span>
		{/if}
		{#if value.sort && value.sort === Sort.DESC}
			<span class="ml-1 flex-none">
				<Icon src={SortDescending} solid class="h-5 w-5" />
			</span>
		{/if}
	</a>
</th>
