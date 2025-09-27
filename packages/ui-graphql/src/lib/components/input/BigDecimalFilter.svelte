<script lang="ts">
	import type { NumberExpression } from '@graphace/graphql';
	import { IntFilter } from '.';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: NumberExpression | null | undefined = undefined;
	export let disabled = false;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<IntFilter {id} {name} bind:value {disabled} class={className} />
