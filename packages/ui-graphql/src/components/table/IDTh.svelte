<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql/types';
	import StringTh from './StringTh.svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined;
</script>

<StringTh {name} {expression} {sort} />
