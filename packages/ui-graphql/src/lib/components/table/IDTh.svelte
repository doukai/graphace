<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { StringTh } from '.';

	export let name: string;
	export let value: StringExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<StringTh {name} bind:value bind:sort {disabled} {zIndex} class={className} on:filter />
