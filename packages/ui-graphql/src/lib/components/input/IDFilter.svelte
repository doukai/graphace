<script lang="ts">
	import type { StringExpression } from '@graphace/graphql';
	import { StringFilter } from '.';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
	export let disabled = false;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<StringFilter {id} {name} bind:value {disabled} class={className} />
