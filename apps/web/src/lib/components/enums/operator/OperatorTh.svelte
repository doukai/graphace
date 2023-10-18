<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Operator } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

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

<EnumTh {name} {enums} bind:expression bind:sort on:filter />