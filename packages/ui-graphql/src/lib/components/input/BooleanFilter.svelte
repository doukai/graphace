<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { BooleanExpression } from '@graphace/graphql';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { OperatorSelect, BooleanInput } from '.';

	export let value: BooleanExpression | null | undefined = undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let addBtnClassName: string = '';

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = { opr: 'EQ', val: undefined, arr: undefined };
	}

	const oprChange = (): void => {
		value.arr = [];
		value.val = undefined;
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
				bind:value={value.opr}
				on:change={(e) => oprChange()}
			/>
		</label>
	</div>
	{#if value.opr === 'IN' || value.opr === 'NIN' || value.opr === 'BT' || value.opr === 'NBT'}
		<BooleanInput
			{className}
			{addBtnClassName}
			{name}
			bind:value={value.arr}
			list
			on:change={(e) => {
				if (value.arr && value.arr.length > 0) {
					value.val == undefined;
				}
			}}
		/>
	{:else}
		<BooleanInput
			{className}
			{addBtnClassName}
			{name}
			bind:value={value.val}
			on:change={(e) => {
				if (value.val) {
					value.arr = [];
				}
			}}
		/>
	{/if}
</div>
