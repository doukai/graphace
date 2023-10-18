<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Sort } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.Sort.values.ASC.name(), value: 'ASC' },
		{ name: $LL.graphql.enums.Sort.values.DESC.name(), value: 'DESC' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />