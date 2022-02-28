<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager, __TypeKind, type __Type } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	export let __type: __Type;

	const changeUrl = (url: string) => {
		goto(url, { keepfocus: true });
	};

	const manager: TypeManager = new TypeManager();
	const queryTypeListName = manager.getQueryTypeListFieldName(__type.name);
	const fields = __type.fields;
	const idFieldName = manager.getIdFieldName(__type.fields);
	const selections = fields
		.filter(
			(field) =>
				manager.getFieldType(field.type) === __TypeKind.SCALAR ||
				manager.getFieldType(field.type) === __TypeKind.ENUM
		)
		.map((field) => field.name)
		.join(' ');

	const queryTypeList = operationStore(
		`#graphql
            query {
                ${queryTypeListName}{
                    ${selections}
                }
            }
        `
	);
	query(queryTypeList);
</script>

{#if $queryTypeList.fetching}
	<div class="min-w-full divide-y divide-gray-20 bg-slate-700 rounded" />
{:else}
	<tbody>
		{#each $queryTypeList.data[queryTypeListName] as type}
			<tr class="bg-white">
				{#each Object.keys(type) as fieldName}
					<td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
						{type[fieldName]}
					</td>
				{/each}
				<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
					<a
						href="/types/{manager.typeNameToUrl(__type.name)}/{type[idFieldName]}"
						on:click={(e) => {
							e.preventDefault();
							changeUrl(`/types/${manager.typeNameToUrl(__type.name)}/${type[idFieldName]}`);
						}}
						class="text-indigo-600 hover:text-indigo-900"
					>
						Edit
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
{/if}
