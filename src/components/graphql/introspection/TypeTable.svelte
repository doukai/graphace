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
	import FieldTh from './FieldTh.svelte';
	import { __FieldFilter } from '$lib/types/__FieldFilter';
	import type { __Field } from '$lib/types/__Field';
	import FieldTd from './FieldTd.svelte';

	export let __type: __Type;
	export let queryValue: string = null;

	const manager: TypeManager = new TypeManager();
	const fields: Array<__Field> = manager.getSingleTypeFiledList(__type);
	const fieldFilters: Array<__FieldFilter> = manager
		.getSingleTypeFiledList(__type)
		.map((__field) => new __FieldFilter(__field));
	const idFieldName: string = manager.getIdFieldName(__type);
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let fetchConnection: Promise<{ connection: Connection }> = queryType({
		__type: __type,
		pageSize: pageSize
	});

	$: if (queryValue != null) {
		research();
	}

	const research = () => {
		fetchConnection = queryType({ __type: __type, pageSize: pageSize });
	};

	type QueryParams = {
		__type: __Type;
		pageSize: number;
		after?: string;
		before?: string;
		offset?: number;
	};

	async function queryType({
		__type,
		pageSize,
		after,
		before,
		offset
	}: QueryParams): Promise<{ connection: Connection }> {
		const variables: string = queryValue ? '($queryValue: String)' : '';
		const whereArguments: string = queryValue
			? manager.getAllSingleTypeFiledQueryArguments(__type)
			: '';
		let pageArguments: string = '';
		if (after) {
			pageArguments = `after: "${after}" first: ${pageSize}`;
		} else if (before) {
			pageArguments = `before: "${before}" last: ${pageSize}`;
		} else if (offset) {
			pageArguments = `offset: ${offset} first: ${pageSize}`;
		} else {
			pageArguments = `first: ${pageSize}`;
		}

		const filters: Array<string> = fieldFilters
			.filter((__fieldFilter) => __fieldFilter.val != null)
			.map(
				(__fieldFilter) =>
					`${__fieldFilter.__field.name}: {opr:${__fieldFilter.opr} val:${
						manager.getFieldTypeName(__fieldFilter.__field.type) === 'ID' ||
						manager.getFieldTypeName(__fieldFilter.__field.type) === 'String'
							? '"' + __fieldFilter.val + '"'
							: __fieldFilter.val
					}}`
			);

		const sorts: Array<string> = fieldFilters
			.filter((__fieldFilter) => __fieldFilter.sort != null)
			.map((__fieldFilter) => `${__fieldFilter.__field.name}: ${__fieldFilter.sort}`);

		let queryArguments: string = '';

		if (whereArguments) {
			queryArguments += ` ${whereArguments}`;
		}

		if (pageArguments) {
			queryArguments += ` ${pageArguments}`;
		}

		if (filters.length > 0) {
			queryArguments += ` ${filters.join(' ')}`;
		}

		if (sorts.length > 0) {
			queryArguments += ` orderBy: {${sorts.join(' ')}}`;
		}

		const queryTypeConnectionFieldName: string = manager.getQueryTypeConnectionFieldName(__type);
		const selections: string = fields.map((field) => field.name).join(' ');
		const graphql: string = gql`
        query ${variables}{
            connection: ${queryTypeConnectionFieldName}(${queryArguments}){
				totalCount
				edges {
					node {
						${selections}
					}
				}
            }
        }
        `;

		return await client.request<{ connection: Connection }>(graphql, { queryValue });
	}

	async function mutationField(data: object) {
		const selections: string = manager.fieldsToSelections(__type);
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const mutationVariables: string = manager.fieldsToMutationVariables(__type);
		const mutationArguments: string = manager.fieldsToMutationArguments(__type);

		const mutation: string = gql`
			mutation (${mutationVariables}) {
				data: ${mutationTypeFieldName} (${mutationArguments}) {
					${selections}
				}
			}	
		`;

		client.request<{ data: object }>(mutation, data).then((res) => {
			data = res.data;
		});
	}

	async function deleteRow(data: object) {
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName: string = manager.getIdFieldName(__type);

		const mutation: string = gql`
			mutation {
				data: ${mutationTypeFieldName} (isDeprecated: true) {
					${idFieldName}
				}
			}	
		`;

		client.request<{ data: object }>(mutation, data).then((res) => {
			data = res.data;
		});
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
				{#each fieldFilters as __fieldFilter}
					<FieldTh bind:value={__fieldFilter} {research} />
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each manager.getListFromConnection(response.connection) as data}
				<tr class="hover">
					{#each fields as __field}
						<FieldTd {__field} bind:value={data} {mutationField} />
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
