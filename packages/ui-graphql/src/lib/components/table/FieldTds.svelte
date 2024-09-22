<script lang="ts">
	import { type Field } from '@graphace/graphql';

	export let fields: Field[] = [];
	export let node: unknown = {};
</script>

{#each fields || [] as field}
	{#if field.fields}
		<svelte:self node={node[field.name]} fields={field.fields} />
	{:else}
		<td>{node[field.name]}</td>
	{/if}
{/each}
