<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { StringTh } from '.';

	export let name: string;
	export let expression: StringExpression | null | undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<StringTh {name} bind:expression bind:sort on:filter />
