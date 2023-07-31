<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Protocol } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	$: enums = [
		{ name: $LL.graphql.enums.Protocol.values.LOCAL.name(), value: 'LOCAL' },
		{ name: $LL.graphql.enums.Protocol.values.GRPC.name(), value: 'GRPC' },
		{ name: $LL.graphql.enums.Protocol.values.HTTP.name(), value: 'HTTP' },
		{ name: $LL.graphql.enums.Protocol.values.RSOCKET.name(), value: 'RSOCKET' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />