<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { NumberExpression } from '@graphace/graphql';
	import { NumberInput, NumberInputList } from '@graphace/ui';
	import { OperatorSelect } from '.';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let value: NumberExpression | null | undefined = undefined;
	export let name: string | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = { opr: 'EQ', val: undefined, arr: undefined };
	}

	const oprChange = (): void => {
		value.arr = [];
		value.val = undefined;
	};
</script>

<OperatorSelect bind:value={value.opr} on:change={(e) => oprChange()} />
{#if value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT'}
	<NumberInputList
		{name}
		bind:value={value.arr}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		class={className}
		on:change={(e) => {
			if (value.arr && value.arr.length > 0) {
				value.val == undefined;
			}
		}}
	/>
{:else}
	<NumberInput
		{name}
		bind:value={value.val}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		class={className}
		on:change={(e) => {
			if (value.val) {
				value.arr = [];
			}
		}}
	/>
{/if}
