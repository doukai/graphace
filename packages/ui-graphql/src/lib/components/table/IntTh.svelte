<script lang="ts">
	import type { NumberExpression, Sort } from '@graphace/graphql';
	import { NumberTh } from '.';

	export let name: string;
	export let expression: NumberExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<NumberTh {name} bind:expression bind:sort on:filter />
