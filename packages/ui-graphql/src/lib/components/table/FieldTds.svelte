<script lang="ts">
	import { type Field } from '@graphace/graphql';

	export let fields: Field[] = [];
	export let node: unknown | null | undefined = {};
	export let nullString: string = '-';
	let className: string | undefined = '';
	export { className as class };
</script>

{#each fields || [] as field}
	{#if field.fields}
		<svelte:self node={node?.[field.name]} fields={field.fields} {className} />
	{:else if node?.[field.name] == null}
		<td class={className}>{nullString}</td>
	{:else}
		<td class={className}>{node?.[field.name]}</td>
	{/if}
{/each}
