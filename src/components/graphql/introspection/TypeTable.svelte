<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import { __TypeKind } from '$lib/types/__TypeKind';
	import type { __Type } from '$lib/types/__Type';
	import type { Connection } from '$lib/types/Connection';
	import Table from '@components/ui/table/Table.svelte';
	import TableLoading from '@components/ui/table/TableLoading.svelte';
	import Pagination from '@components/ui/connection/Pagination.svelte';

	export let __type: __Type;
	export let queryValue: string = null;

	type Data = { connection: Connection };
	const manager: TypeManager = new TypeManager();
	const fields = manager.getSingleTypeFiledList(__type);
	const idFieldName = manager.getIdFieldName(__type);
	let pageSize: number = 10;
	let fetchConnection = queryType(__type, pageSize, null, null);

	async function queryType(__type: __Type, pageSize: number, after: string, before: string) {
		const variables = queryValue ? '($queryValue: String)' : '';
		const whereArguments = queryValue ? manager.getAllSingleTypeFiledQueryArguments(__type) : '';
		let pageArguments = '';
		if (after) {
			pageArguments = `after: "${after}" first: ${pageSize}`;
		} else if (before) {
			pageArguments = `before: "${before}" last: ${pageSize}`;
		} else {
			pageArguments = `first: ${pageSize}`;
		}
		let queryArguments = '';
		if (whereArguments || pageArguments) {
			queryArguments = `(${whereArguments} ${pageArguments})`;
		}
		const queryTypeConnectionFieldName = manager.getQueryTypeConnectionFieldName(__type);
		const selections = fields.map((field) => field.name).join(' ');
		const graphql = gql`
        query ${variables}{
            connection: ${queryTypeConnectionFieldName}${queryArguments}{
				edges {
					cursor
					node {
						${selections}
					}
				}
				pageInfo {
					hasNextPage
					hasPreviousPage
					startCursor
					endCursor
				}
            }
        }
        `;

		return await client.request<Data>(graphql, { queryValue });
	}

	const onNext = (selectedPageSize: number, after: string) => {
		pageSize = selectedPageSize;
		fetchConnection = queryType(__type, pageSize, after, null);
	};
	const onPrevious = (selectedPageSize: number, before: string) => {
		pageSize = selectedPageSize;
		fetchConnection = queryType(__type, pageSize, null, before);
	};
	const onSizeChange = (selectedPageSize: number) => {
		pageSize = selectedPageSize;
		fetchConnection = queryType(__type, pageSize, null, null);
	};
</script>

{#await fetchConnection}
	<TableLoading />
{:then response}
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
			{#each manager.getListFromConnection(response.connection) as data}
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
	<div class="divider" />
	<Pagination
		{onNext}
		{onPrevious}
		{onSizeChange}
		{pageSize}
		hasNextPage={response.connection.pageInfo.hasNextPage}
		hasPreviousPage={response.connection.pageInfo.hasPreviousPage}
		startCursor={response.connection.pageInfo.startCursor}
		endCursor={response.connection.pageInfo.endCursor}
	/>
{/await}
