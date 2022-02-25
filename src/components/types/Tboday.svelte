<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import {
		getFieldType,
		getQueryTypeListFieldName,
		__TypeKind,
		type __Type
	} from '$lib/TypeManager';
	export let __type: __Type;

	const typeListName = getQueryTypeListFieldName(__type.name);
	const fields = __type.fields;
	debugger;
	const typeList = operationStore(
		`#graphql
            query {
                ${typeListName}{
                    ${fields
											.filter(
												(field) =>
													getFieldType(field.type) === __TypeKind.SCALAR ||
													getFieldType(field.type) === __TypeKind.ENUM
											)
											.map((field) => field.name)
											.join(' ')}
                }
            }
        `
	);
	query(typeList);
</script>

{#if $typeList.fetching}
	<div class="min-w-full divide-y divide-gray-20 bg-slate-700 rounded" />
{:else}
	<tbody>
		{#each $typeList.data[typeListName] as type}
			<tr class="bg-white">
				{#each Object.keys(type) as fieldName}
					<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
						{type[fieldName]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
{/if}
