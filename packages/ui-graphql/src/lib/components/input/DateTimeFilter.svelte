<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { OperatorSelect, DateTimeInput } from '.';

	export let value: StringExpression | null | undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';
	
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	let _expression: StringExpression | null | undefined = {};

	$: if (_expression.val) {
		value = { opr: _expression.opr, val: _expression.val, arr: undefined };
	} else if (_expression.arr && _expression.arr.length > 0) {
		value = { opr: _expression.opr, val: undefined, arr: _expression.arr };
	} else if (_expression.opr === 'NIL' || _expression.opr === 'NNIL') {
		value = { opr: _expression.opr, val: undefined, arr: undefined };
	} else {
		value = undefined;
	}

	const change = (): void => {
		_expression.arr = [];
		_expression.val = undefined;
	};

	const oprChange = (): void => {
		_expression.arr = [];
		_expression.val = undefined;
	};
</script>

<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="form-control w-full md:w-60">
		<label class="input-group max-sm:input-group-vertical md:input-group-sm">
			<span class="md:w-20 whitespace-nowrap">
				{label}
			</span>
			<OperatorSelect
				className={selectClassName}
				bind:value={_expression.opr}
				on:change={(e) => oprChange()}
			/>
		</label>
	</div>
	{#if _expression.opr === 'IN' || _expression.opr === 'NIN' || _expression.opr === 'BT' || _expression.opr === 'NBT'}
		<DateTimeInput
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			{className}
			{addBtnClassName}
			{name}
			bind:value={_expression.arr}
			list
		/>
	{:else}
		<DateTimeInput
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			{className}
			{addBtnClassName}
			{name}
			bind:value={_expression.val}
		/>
	{/if}
</div>
