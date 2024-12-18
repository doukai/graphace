<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import type { Operator, StringExpression } from '@graphace/graphql';
	import { OperatorSelect } from '@graphace/ui-graphql';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { RoleInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	export let expression: StringExpression | null | undefined;
	export let name: string;
	export let label: string;
	export let className: string = '';
	export let selectClassName: string = '';
	export let containerClassName: string = '';
	export let tagClassName: string = '';
	export let menuClassName: string = '';

	let opr: Operator | null | undefined = undefined;
	let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;

	$: if (value && !Array.isArray(value)) {
		expression = { opr: opr, val: value?.id, arr: undefined };
	} else if (value && Array.isArray(value) && value.length > 0) {
		expression = { opr: opr, val: undefined, arr: value?.map((item) => item?.id) };
	} else if (opr === 'NIL' || opr === 'NNIL') {
		expression = { opr: opr, val: undefined, arr: undefined };
	} else {
		expression = undefined;
	}

	const oprChange = (): void => {
		if (Array.isArray(value)) {
			value = [];
		} else if (value) {
			value = undefined;
		}
	};
</script>

<div
	class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1"
	transition:fade={{ duration: 100 }}
>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="form-control w-full md:w-60">
		<label class="input-group md:input-group-sm">
			<span class="w-20 whitespace-nowrap">
				{label}
			</span>
			<OperatorSelect className={selectClassName} bind:value={opr} on:change={(e) => oprChange()} />
		</label>
	</div>
	{#if opr === 'IN' || opr === 'NIN' || opr === 'BT' || opr === 'NBT'}
		<RoleSelect
			{name}
			placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
			list
			bind:value
			{className}
			{containerClassName}
			{tagClassName}
			{menuClassName}
		/>
	{:else}
		<RoleSelect
			{name}
			placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
			bind:value
			{className}
			{containerClassName}
			{tagClassName}
			{menuClassName}
		/>
	{/if}
</div>
