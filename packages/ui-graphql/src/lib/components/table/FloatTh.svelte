<script lang="ts">
	import type { NumberExpression, Sort } from '@graphace/graphql';
	import { NumberTh } from '.';

	export let name: string;
	export let value: NumberExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<NumberTh {name} bind:value bind:sort on:filter />
