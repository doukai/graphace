<script lang="ts">
	import type { StringExpression, Sort } from '@graphace/graphql';
	import { DateTimeTh } from '.';

	export let name: string;
	export let value: StringExpression | null | undefined = undefined;
	export let sort: Sort | null | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<DateTimeTh {name} bind:value bind:sort {zIndex} class={className} on:filter />
