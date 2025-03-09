<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { OperatorSelect, EnumInput, EnumInputList } from '.';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let value: StringExpression | null | undefined = undefined;
	export let name: string | undefined = undefined;
	export let enums: { name: string; value: string | null | undefined; description?: string }[];
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
	<EnumInputList
		{name}
		bind:value={value.arr}
		{enums}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		class={className}
		on:change={(e) => {
			if (value.arr && value.arr.length > 0) {
				value.val == undefined;
			}
		}}
	/>
{:else}
	<EnumInput
		{name}
		bind:value={value.val}
		{enums}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		class={className}
		on:change={(e) => {
			if (value.val) {
				value.arr = [];
			}
		}}
	/>
{/if}
