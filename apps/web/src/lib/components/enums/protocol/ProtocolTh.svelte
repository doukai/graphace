<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import { EnumTh } from '@graphace/ui-graphql/components/table';
	import { Protocol } from '~/lib/types/schema';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;

	let enums = [
		{ name: Protocol.LOCAL, value: Protocol.LOCAL },
		{ name: Protocol.GRPC, value: Protocol.GRPC },
		{ name: Protocol.HTTP, value: Protocol.HTTP },
		{ name: Protocol.RSOCKET, value: Protocol.RSOCKET }
	];
</script>

<EnumTh {name} {enums} bind:expression bind:sort />