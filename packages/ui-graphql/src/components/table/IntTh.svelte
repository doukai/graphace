<script lang="ts">
	import type { NumberExpression, Sort } from '@graphace/graphql/types';
	import IntTh from './IntTh.svelte';

	export let name: string;
	export let expression: NumberExpression | null | undefined;
	export let sort: Sort | null | undefined;
</script>

<IntTh {name} {expression} {sort} />
