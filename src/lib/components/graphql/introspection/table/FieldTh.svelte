<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '$lib/tippy';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Field, __FieldFilter } from '$lib/types';
	import { Operator, Sort } from '$lib/types';
	import FieldInput from '$lib/components/graphql/introspection/FieldInput.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Filter, SortAscending, SortDescending } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';
	export let value: __FieldFilter;
	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	let opr: Operator = value.opr;
	let val: string | number | boolean | null = value.val;
	let sort: Sort = value.sort;
	const manager = new TypeManager();
	const fieldTypeName = manager.getFieldTypeName(value.__field.type);

	let filter = (): void => {
		value.opr = opr;
		value.val = val;
		value.sort = sort;
		dispatch('filter');
	};

	let clear = (): void => {
		value.opr = Operator.EQ;
		value.val = null;
		value.sort = null;
		dispatch('filter');
	};
</script>

<th>
	<div class="flex" bind:this={content}>
		{#if fieldTypeName !== 'Boolean'}
			<div class="form-control">
				<div class="input-group">
					<select class="select select-bordered" bind:value={opr}>
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
					</select>
					<FieldInput
						__field={value.__field}
						placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
						bind:value={val}
					/>
				</div>
			</div>
		{:else}
			<FieldInput
				__field={value.__field}
				placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
				bind:value={val}
			/>
		{/if}
		<select class="select select-bordered ml-1" bind:value={sort}>
			<option value={null} selected>{$LL.components.graphql.table.th.noSort()}</option>
			<option value="ASC">{$LL.components.graphql.table.th.asc()}</option>
			<option value="DESC">{$LL.components.graphql.table.th.desc()}</option>
		</select>
		<div class="tooltip" data-tip={$LL.components.graphql.table.th.filter()}>
			<button class="btn btn-square btn-primary ml-1" on:click={() => filter()}>
				<Icon src={Check} solid class="h-5 w-5" />
			</button>
		</div>
		<div class="tooltip" data-tip={$LL.components.graphql.table.th.cancel()}>
			<button class="btn btn-square btn-primary ml-1" on:click={() => clear()}>
				<Icon src={X} solid class="h-5 w-5" />
			</button>
		</div>
	</div>
	<a
		class="link group inline-flex"
		href={null}
		use:tippy={{
			content: content,
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none'
		}}
	>
		{value.__field.name}
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
