<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { EnumItem } from '@graphace/ui-graphql/components/form';
	import { Operator } from '~/lib/types/schema';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';

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

<EnumItem {value} {enums} {name} {label} {error} {placeholder} />
