<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { EnumTd } from '@graphace/ui-graphql/components/table';
	import { Operator } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';

	$: enums = [
		{ name: $LL.graphql.enums.Operator.values.EQ.name(), value: 'EQ' },
		{ name: $LL.graphql.enums.Operator.values.NEQ.name(), value: 'NEQ' },
		{ name: $LL.graphql.enums.Operator.values.LK.name(), value: 'LK' },
		{ name: $LL.graphql.enums.Operator.values.NLK.name(), value: 'NLK' },
		{ name: $LL.graphql.enums.Operator.values.GT.name(), value: 'GT' },
		{ name: $LL.graphql.enums.Operator.values.NLTE.name(), value: 'NLTE' },
		{ name: $LL.graphql.enums.Operator.values.GTE.name(), value: 'GTE' },
		{ name: $LL.graphql.enums.Operator.values.NLT.name(), value: 'NLT' },
		{ name: $LL.graphql.enums.Operator.values.LT.name(), value: 'LT' },
		{ name: $LL.graphql.enums.Operator.values.NGTE.name(), value: 'NGTE' },
		{ name: $LL.graphql.enums.Operator.values.LTE.name(), value: 'LTE' },
		{ name: $LL.graphql.enums.Operator.values.NGT.name(), value: 'NGT' },
		{ name: $LL.graphql.enums.Operator.values.NIL.name(), value: 'NIL' },
		{ name: $LL.graphql.enums.Operator.values.NNIL.name(), value: 'NNIL' },
		{ name: $LL.graphql.enums.Operator.values.IN.name(), value: 'IN' },
		{ name: $LL.graphql.enums.Operator.values.NIN.name(), value: 'NIN' },
		{ name: $LL.graphql.enums.Operator.values.BT.name(), value: 'BT' },
		{ name: $LL.graphql.enums.Operator.values.NBT.name(), value: 'NBT' }
	];
</script>

<EnumTd bind:value {list} {enums} {name} {errors} {readonly} {disabled} {placeholder} on:save />
