<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { OperatorSelect } from '@graphace/ui-graphql';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = { opr: 'EQ', val: undefined, arr: undefined };
	}

	const oprChange = (): void => {
		value = {
			...value,
			val: undefined,
			arr: undefined
		};
	};
</script>

{#if value}
	<OperatorSelect bind:value={value.opr} on:change={(e) => oprChange()} />
	{#if value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT'}
		<RoleSelect
			{id}
			{name}
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			list
			bind:val={value.val}
			bind:arr={value.arr}
			class={className}
		/>
	{:else}
		<RoleSelect
			{id}
			{name}
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			bind:val={value.val}
			bind:arr={value.arr}
			class={className}
		/>
	{/if}
{/if}