<script lang="ts">
	import { operationStore, query } from '@urql/svelte';
	import { TypeManager } from '$lib/TypeManager';
	import { __TypeKind } from '$lib/__TypeKind';
	import type { __Type } from '$lib/__Type';
	import { goto } from '$app/navigation';
	import Table from '/src/components/ui/table/Table.svelte';
	import Thead from '/src/components/ui/table/head/Thead.svelte';
	import Thr from '/src/components/ui/table/head/Thr.svelte';
	import Th from '/src/components/ui/table/head/Th.svelte';
	import Tbody from '/src/components/ui/table/body/Tbody.svelte';
	import Tr from '/src/components/ui/table/body/Tr.svelte';
	import Td from '/src/components/ui/table/body/Td.svelte';
	import TableLoading from '/src/components/ui/table/TableLoading.svelte';
	import Link from '/src/components/ui/Link.svelte';
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
		<Thead>
			<Thr>
				{#each fields.map((__field) => __field.name) as name}
					<Th>{name}</Th>
				{/each}
				<Td><span class="sr-only">Edit</span></Td>
			</Thr>
		</Thead>
		<Tbody>
			{#each $queryTypeList.data[queryTypeListFieldName] as data}
				<Tr>
					{#each fields.map((__field) => __field.name) as name}
						<Td>{data[name] ? data[name] : ''}</Td>
					{/each}
					<Td>
						<Link
							href="/types/{manager.typeNameToUrl(__type.name)}/{data[idFieldName]}"
							on:click={(e) => {
								e.preventDefault();
								goto(`/types/${manager.typeNameToUrl(__type.name)}/${data[idFieldName]}`);
							}}
						>
							Edit
						</Link>
					</Td>
				</Tr>
			{/each}
		</Tbody>
	</Table>
{/if}
