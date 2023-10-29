<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import DateTimeTh from './DateTimeTh.svelte';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<DateTimeTh {name} bind:expression bind:sort on:filter />
