<script lang="ts">
	import type { NumberExpression } from '@graphace/graphql';
	import { NumberFilter } from '.';

	export let name: string | undefined = undefined;
	export let value: NumberExpression | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<NumberFilter {name} bind:value class={className} />
