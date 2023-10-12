<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Func } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.Func.values.COUNT.name(), value: 'COUNT' },
		{ name: $LL.graphql.enums.Func.values.MAX.name(), value: 'MAX' },
		{ name: $LL.graphql.enums.Func.values.MIN.name(), value: 'MIN' },
		{ name: $LL.graphql.enums.Func.values.SUM.name(), value: 'SUM' },
		{ name: $LL.graphql.enums.Func.values.AVG.name(), value: 'AVG' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />