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
	import Modal from '@components/ui/modal/Modal.svelte';
	import ModalContent from '@components/ui/modal/ModalContent.svelte';
	import ModalActions from '@components/ui/modal/ModalActions.svelte';
	import FieldTh from './FieldTh.svelte';
	import { __FieldFilter } from '$lib/types/__FieldFilter';
	import type { __Field } from '$lib/types/__Field';
	import FieldTd from './FieldTd.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilAlt, Trash } from '@steeze-ui/heroicons';

	export let __type: __Type;
	export let queryValue: string = null;

	let deleteModelOpen: boolean = false;
	let deleteRowId: string = null;

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
            connection: ${queryTypeConnectionFieldName} (${queryArguments}){
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

	async function mutationField(
		id: string,
		__field: __Field,
		value: string | number | boolean | null
	) {
		const selections: string = manager.fieldsToSelections(__type);
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName = manager.getIdFieldName(__type);
		const fieldTypeName = manager.getFieldTypeName(__field.type);

		const mutation: string = gql`
			mutation ($${idFieldName}: string $${__field.name}: ${fieldTypeName}) {
				data: ${mutationTypeFieldName} (${idFieldName}: $${idFieldName} ${__field.name}: $${__field.name}) @update {
					${selections}
				}
			}	
		`;

		const variables: object = {};
		variables[idFieldName] = id;
		variables[__field.name] = value;

		client.request<{ data: object }>(mutation, variables).then((res) => {});
	}

	async function deleteRow() {
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName: string = manager.getIdFieldName(__type);

		const mutation: string = gql`
			mutation ($id: string){
				data: ${mutationTypeFieldName} (${idFieldName}: $id isDeprecated: true) @update {
					${idFieldName}
				}
			}	
		`;

		const variables: object = {};
		variables[idFieldName] = deleteRowId;

		client.request<{ data: object }>(mutation, variables).then((res) => {
			deleteModelOpen = false;
			research();
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
				<th>
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th>
				{#each fieldFilters as __fieldFilter}
					<FieldTh bind:value={__fieldFilter} {research} />
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each manager.getListFromConnection(response.connection) as data}
				<tr class="hover">
					<th>
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					{#each fields as __field}
						<FieldTd
							id={data[idFieldName]}
							{__field}
							bind:value={data[__field.name]}
							{mutationField}
						/>
					{/each}
					<td>
						<button
							class="btn btn-square btn-ghost btn-xs"
							on:click={(e) => {
								e.preventDefault();
								goto(`/types/${manager.typeNameToUrl(__type.name)}/${data[idFieldName]}`);
							}}
						>
							<Icon src={PencilAlt} solid />
						</button>
						<button
							class="btn btn-square btn-ghost btn-xs"
							on:click={(e) => {
								e.preventDefault();
								deleteModelOpen = true;
								deleteRowId = data[idFieldName];
							}}
						>
							<Icon src={Trash} solid />
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

<Modal isModalOpen={deleteModelOpen} title="delete">
	<ModalContent>Delete row?</ModalContent>
	<ModalActions>
		<button class="btn" on:click={() => (deleteModelOpen = false)}>Cancel</button>
		<button class="btn btn-outline btn-error" on:click={() => deleteRow()}>Delete</button>
	</ModalActions>
</Modal>
