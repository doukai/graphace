<script lang="ts">
	import type { NumberExpression, Sort } from '@graphace/graphql';
	import { IntTh } from '.';

	export let name: string;
	export let value: NumberExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<IntTh {name} bind:value bind:sort {disabled} {zIndex} class={className} on:filter />
