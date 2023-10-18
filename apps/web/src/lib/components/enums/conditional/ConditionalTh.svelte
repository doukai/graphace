<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Conditional } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.Conditional.values.AND.name(), value: 'AND' },
		{ name: $LL.graphql.enums.Conditional.values.OR.name(), value: 'OR' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />