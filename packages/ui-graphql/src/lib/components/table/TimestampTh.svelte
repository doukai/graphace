<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { DateTimeTh } from '.';

	export let name: string;
	export let value: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<DateTimeTh {name} bind:value bind:sort on:filter />
