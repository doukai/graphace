<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { BooleanExpression } from '@graphace/graphql';
	import { Toggle, ToggleList } from '@graphace/ui';
	import { OperatorSelect } from '.';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: BooleanExpression | null | undefined = undefined;
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

<OperatorSelect bind:value={value.opr} {disabled} on:change={(e) => oprChange()} />
{#if value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT'}
	<ToggleList
		{id}
		bind:value={value.arr}
		class={className}
		{disabled}
		on:change={(e) => {
			if (value.arr && value.arr.length > 0) {
				value.val == undefined;
			}
		}}
	/>
{:else}
	<Toggle
		{id}
		{name}
		bind:value={value.val}
		class={className}
		{disabled}
		on:change={(e) => {
			if (value.val) {
				value.arr = [];
			}
		}}
	/>
{/if}
