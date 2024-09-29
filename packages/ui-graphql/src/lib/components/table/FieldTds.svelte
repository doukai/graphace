<script lang="ts">
	import { type Field } from '@graphace/graphql';

	export let fields: Field[] = [];
	export let node: unknown = {};
	export let className: string = '';
</script>

{#each fields || [] as field}
	{#if field.fields}
		<svelte:self node={node[field.name]} fields={field.fields} {className} />
	{:else}
		<td class={className}>{node[field.name]}</td>
	{/if}
{/each}
