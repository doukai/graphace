<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Protocol } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let enums = [
		{ name: 'LOCAL', value: 'LOCAL' },
		{ name: 'GRPC', value: 'GRPC' },
		{ name: 'HTTP', value: 'HTTP' },
		{ name: 'RSOCKET', value: 'RSOCKET' }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort on:filter />