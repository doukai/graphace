<script lang="ts">
	import type { StringExpression } from '@graphace/graphql';
	import { StringFilter } from '.';

	export let name: string | undefined = undefined;
	export let value: StringExpression | null | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<StringFilter {name} bind:value class={className} />
