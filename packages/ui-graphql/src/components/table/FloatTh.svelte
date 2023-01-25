<script lang="ts">
	import type { NumberExpression, Sort } from '@graphace/graphql/types';
	import NumberTh from './NumberTh.svelte';

	export let name: string;
	export let expression: NumberExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<NumberTh {name} {expression} {sort} />
