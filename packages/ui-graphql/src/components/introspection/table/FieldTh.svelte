<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui/components/tippy';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, X, Filter, SortAscending, SortDescending } from '@steeze-ui/heroicons';
	import {
		Input,
		NumberInput,
		InputList,
		NumberInputList,
		Toggle,
		Select,
		CheckboxGroup
	} from '@graphace/ui/components/input';
	import { type __Field, type __FieldFilter, Operator, Sort } from '@graphace/graphql/types';
	import LL from '~/i18n/i18n-svelte';

	export let name: string | null | undefined;
	export let expression:
		| {
				val?: string | number | boolean | null | undefined;
				in?: (string | number | boolean | null | undefined)[] | null | undefined;
				opr?: Operator | null | undefined;
		  }
		| null
		| undefined;
	export let sort: Sort | null | undefined;

	let content: HTMLElement;
	const dispatch = createEventDispatcher<{
		filter: {};
		oprChange: {};
		clear: {};
	}>();

	const clear = (
		val:
			| string
			| number
			| boolean
			| (string | number | boolean | null | undefined)[]
			| null
			| undefined
	): void => {
		if (Array.isArray(val)) {
			val = [];
		} else {
			val = undefined;
		}
		opr = Operator.EQ;
		sort = undefined;
		dispatch('filter');
	};

	const oprChange = (): void => {
		if (
			expression?.opr === 'IN' ||
			expression?.opr === 'NIN' ||
			expression?.opr === 'BT' ||
			expression?.opr === 'NBT'
		) {
			if (expression?.in) {
				expression.in = undefined;
			}
		} else {
			if (expression?.val) {
				expression.val = undefined;
			}
		}
	};
</script>

<div class="flex items-start space-x-1" bind:this={content}>
	{#if expression}
		{#if typeof expression.val === 'boolean'}
			<Toggle name={'name'} bind:value={expression.val} />
		{:else}
			<select class="select select-bordered" bind:value={expression.opr} on:change={oprChange}>
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
			{#if fieldTypeName === 'Int' || fieldTypeName === 'Float'}
				{#if expression.opr === 'IN' || expression.opr === 'NIN' || expression.opr === 'BT' || expression.opr === 'NBT'}
					<NumberInputList
						placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
						name={value.__field.name}
						bind:value={expression.val}
					/>
				{:else}
					<NumberInput
						placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
						name={value.__field.name}
						bind:value={val}
					/>
				{/if}
			{:else if fieldTypeName === 'ID' || fieldTypeName === 'String'}
				{#if opr === 'IN' || opr === 'NIN' || opr === 'BT' || opr === 'NBT'}
					<InputList
						placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
						name={value.__field.name}
						bind:value={val}
					/>
				{:else}
					<Input
						placeholder={$LL.components.graphql.table.th.filterPlaceholder()}
						name={value.__field.name}
						bind:value={val}
					/>
				{/if}
			{:else if manager.fieldIsEnum(value.__field.type)}
				{#if opr === 'IN' || opr === 'NIN' || opr === 'BT' || opr === 'NBT'}
					<CheckboxGroup
						bind:value={val}
						checkboxs={manager.getFieldTypeEnumValues(value.__field.type).map((enumValue) => {
							return { name: enumValue.name, value: enumValue.name };
						})}
					/>
				{:else}
					<Select name={value.__field.name} bind:value={val}>
						{#each manager.getFieldTypeEnumValues(value.__field.type) as enumValue}
							<option value={enumValue.name}>{enumValue.name}</option>
						{/each}
					</Select>
				{/if}
			{/if}
		{/if}
	{/if}
	<select class="select select-bordered" bind:value={sort}>
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
		<button class="btn btn-square btn-outline btn-error" on:click={() => dispatch('clear')}>
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
		{#if val}
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
