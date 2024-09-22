<script lang="ts">
	import { type Field, fieldsDeep } from '@graphace/graphql';

	export let fields: Field[] = [];
	export let getFieldName: (fieldName: string, subFieldName?: string) => string;

	$: deep = fieldsDeep(fields);
</script>

<tr>
	<slot {deep} />
	{#each fields || [] as field}
		{#if field.fields}
			<td colspan={field.fields.length}>{getFieldName(field.name)}</td>
		{:else if field.parent}
			<td rowspan={deep}>{getFieldName(field.parent.name, field.name)}</td>
		{:else}
			<td rowspan={deep}>{getFieldName(field.name)}</td>
		{/if}
	{/each}
</tr>

{#if fields.some((field) => field.fields)}
	<svelte:self
		fields={fields
			.filter((field) => field.fields)
			.flatMap((field) => field.fields.map((item) => ({ ...item, parent: field })))}
		{getFieldName}
	/>
{/if}
