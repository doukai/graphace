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
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let fetchConnection = queryType({ __type: __type, pageSize: pageSize });

	$: if (queryValue != null) {
		fetchConnection = queryType({ __type: __type, pageSize: pageSize });
	}

	interface QueryParams {
		__type: __Type;
		pageSize: number;
		after?: string;
		before?: string;
		offset?: number;
	}

	async function queryType({ __type, pageSize, after, before, offset }: QueryParams) {
		const variables = queryValue ? '($queryValue: String)' : '';
		const whereArguments = queryValue ? manager.getAllSingleTypeFiledQueryArguments(__type) : '';
		let pageArguments = '';
		if (after) {
			pageArguments = `after: "${after}" first: ${pageSize}`;
		} else if (before) {
			pageArguments = `before: "${before}" last: ${pageSize}`;
		} else if (offset) {
			pageArguments = `offset: ${offset} first: ${pageSize}`;
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
				totalCount
				edges {
					node {
						${selections}
					}
				}
            }
        }
        `;

		return await client.request<Data>(graphql, { queryValue });
	}

	const onNext = (selectedPageSize: number, after: string): void => {
		pageSize = selectedPageSize;
		fetchConnection = queryType({ __type: __type, pageSize: pageSize, after: after });
	};

	const onPrevious = (selectedPageSize: number, before: string): void => {
		pageSize = selectedPageSize;
		fetchConnection = queryType({ __type: __type, pageSize: pageSize, before: before });
	};

	const onPageChange = (selectedPageSize: number, selectedPageNumber: number): void => {
		pageSize = selectedPageSize;
		pageNumber = selectedPageNumber;
		fetchConnection = queryType({
			__type: __type,
			pageSize: pageSize,
			offset: (pageNumber - 1) * pageSize
		});
	};

	const onSizeChange = (selectedPageSize: number): void => {
		pageSize = selectedPageSize;
		fetchConnection = queryType({ __type: __type, pageSize: pageSize });
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
		{onPageChange}
		{onSizeChange}
		{pageNumber}
		{pageSize}
		totalCount={response.connection.totalCount}
	/>
{/await}
