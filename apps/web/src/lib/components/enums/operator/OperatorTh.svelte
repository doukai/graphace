<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Operator } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;

	let enums = [
		{ name: Operator.BT, value: Operator.BT },
		{ name: Operator.EQ, value: Operator.EQ },
		{ name: Operator.GT, value: Operator.GT },
		{ name: Operator.GTE, value: Operator.GTE },
		{ name: Operator.IN, value: Operator.IN },
		{ name: Operator.LK, value: Operator.LK },
		{ name: Operator.LT, value: Operator.LT },
		{ name: Operator.LTE, value: Operator.LTE },
		{ name: Operator.NBT, value: Operator.NBT },
		{ name: Operator.NEQ, value: Operator.NEQ },
		{ name: Operator.NGT, value: Operator.NGT },
		{ name: Operator.NGTE, value: Operator.NGTE },
		{ name: Operator.NIL, value: Operator.NIL },
		{ name: Operator.NIN, value: Operator.NIN },
		{ name: Operator.NLK, value: Operator.NLK },
		{ name: Operator.NLT, value: Operator.NLT },
		{ name: Operator.NLTE, value: Operator.NLTE },
		{ name: Operator.NNIL, value: Operator.NNIL }
	];
</script>

<EnumTh {name} {enums} {expression} {sort} />