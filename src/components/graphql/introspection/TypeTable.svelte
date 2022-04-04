<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager } from '$lib/TypeManager';
	import { __TypeKind } from '$lib/__TypeKind';
	import type { __Type } from '$lib/__Type';
	import { goto } from '$app/navigation';
	import Table from '@components/ui/table/Table.svelte';
	import TableLoading from '@components/ui/table/TableLoading.svelte';
	export let __type: __Type;
	export let queryValue: string = null;

	const queryTypeList = operationStore('');
	const manager: TypeManager = new TypeManager();
	$: queryTypeListFieldName = manager.getQueryTypeListFieldName(__type);
	$: fields = manager.getSingleTypeFiledList(__type);
	$: idFieldName = manager.getIdFieldName(__type);
	$: {
		const selections = fields.map((field) => field.name).join(' ');
		const graphql = `#graphql
        query ${queryValue ? '($queryValue: String)' : ''}{
            ${queryTypeListFieldName}${
			queryValue ? '(' + manager.getAllSingleTypeFiledQueryArguments(__type) + ')' : ''
		}{
                ${selections}
            }
        }
        `;
		$queryTypeList.query = graphql;
		if (queryValue) {
			$queryTypeList.variables = { queryValue };
		}
		query(queryTypeList);
	}
</script>

{#if $queryTypeList.fetching}
	<TableLoading />
{:else}
	<Table>
		<thead>
			<tr>
				{#each fields.map((__field) => __field.name) as name}
					<td>{name}</td>
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each $queryTypeList.data[queryTypeListFieldName] as data}
				<tr class="hover">
					{#each fields.map((__field) => __field.name) as name}
						<td>{data[name] ? data[name] : ''}</td>
					{/each}
					<td>
						<button
							class="btn btn-ghost btn-xs"
							on:click={(e) => {
								e.preventDefault();
								goto(`/types/${manager.typeNameToUrl(__type.name)}/${data[idFieldName]}`);
							}}
						>
							Edit
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
{/if}
