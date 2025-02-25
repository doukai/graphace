<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { StringTh } from '.';

	export let name: string;
	export let value: StringExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
</script>

<StringTh {name} bind:value bind:sort on:filter />
