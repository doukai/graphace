<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { Input, InputList } from '@graphace/ui';
	import { OperatorSelect } from '.';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
	export let disabled = false;
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
	<InputList
		{id}
		{name}
		bind:value={value.arr}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		{disabled}
		class={className}
		on:change={(e) => {
			if (value.arr && value.arr.length > 0) {
				value.val == undefined;
			}
		}}
	/>
{:else}
	<Input
		{id}
		{name}
		bind:value={value.val}
		placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
		{disabled}
		class={className}
		on:change={(e) => {
			if (value.val) {
				value.arr = [];
			}
		}}
	/>
{/if}
