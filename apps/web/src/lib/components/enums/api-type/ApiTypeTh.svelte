<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { ApiType } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.ApiType.values.QUERY.name(), value: 'QUERY' },
		{ name: $LL.graphql.enums.ApiType.values.MUTATION.name(), value: 'MUTATION' },
		{ name: $LL.graphql.enums.ApiType.values.SUBSCRIPTION.name(), value: 'SUBSCRIPTION' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />