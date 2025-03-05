<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { StringExpression } from '@graphace/graphql';
	import { OperatorSelect } from '@graphace/ui-graphql';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: StringExpression | null | undefined = undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let containerClassName: string = '';
	export let tagClassName: string = '';
	export let menuClassName: string = '';

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

<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="form-control w-full md:w-60">
		<label class="input-group max-sm:input-group-vertical md:input-group-sm">
			<span class="md:w-20 whitespace-nowrap">
				{label}
			</span>
			<OperatorSelect className={selectClassName} bind:value={value.opr} on:change={(e) => oprChange()} />
		</label>
	</div>
	{#if value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT'}
		<UserSelect
			{name}
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			list
			bind:val={value.val}
			bind:arr={value.arr}
			{className}
			{containerClassName}
			{tagClassName}
			{menuClassName}
		/>
	{:else}
		<UserSelect
			{name}
			placeholder={$LL.ui_graphql.table.th.filterPlaceholder()}
			bind:val={value.val}
			bind:arr={value.arr}
			{className}
			{containerClassName}
			{tagClassName}
			{menuClassName}
		/>
	{/if}
</div>
