<script lang="ts">
	import { goto } from '$app/navigation';
	import { gql } from 'graphql-request';
	import { client } from '$lib/graphql/GraphqlClient';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type, __Field, Connection } from '$lib/types';
	import { __FieldFilter, __TypeKind } from '$lib/types';
	import { Table, TableLoading } from '$lib/components/ui/table';
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { Modal, ModalActions } from '$lib/components/ui/modal';
	import { FieldTh, FieldTd } from './';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilAlt, Trash } from '@steeze-ui/heroicons';
	import { notifications } from '$lib/stores/Notifications';
	import LL from '$i18n/i18n-svelte';

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
		event: CustomEvent<{ id: string; __field: __Field; value: string | number | boolean | null }>
	) {
		const selections: string = manager.fieldsToSelections(__type);
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName = manager.getIdFieldName(__type);
		const fieldTypeName = manager.getFieldTypeName(event.detail.__field.type);

		const mutation: string = gql`
			mutation ($${idFieldName}: String $${event.detail.__field.name}: ${fieldTypeName}) {
				data: ${mutationTypeFieldName} (${idFieldName}: $${idFieldName} ${event.detail.__field.name}: $${event.detail.__field.name}) @update {
					${selections}
				}
			}	
		`;

		const variables: object = {};
		variables[idFieldName] = event.detail.id;
		variables[event.detail.__field.name] = event.detail.value;

		client
			.request<{ data: object }>(mutation, variables)
			.then((res) => {
				deleteModelOpen = false;
				notifications.success($LL.message.saveSuccess());
				research();
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	}

	async function deleteRow() {
		const mutationTypeFieldName: string = manager.getMutationTypeFieldName(__type);
		const idFieldName: string = manager.getIdFieldName(__type);

		const mutation: string = gql`
			mutation ($id: String){
				data: ${mutationTypeFieldName} (${idFieldName}: $id isDeprecated: true) @update {
					${idFieldName}
				}
			}	
		`;

		const variables: object = {};
		variables[idFieldName] = deleteRowId;

		client
			.request<{ data: object }>(mutation, variables)
			.then((res) => {
				deleteModelOpen = false;
				notifications.success($LL.message.deleteSuccess());
				research();
			})
			.catch((error) => {
				notifications.error($LL.message.deleteFailed());
			});
	}

	const onNext = (event: CustomEvent<{ selectedPageSize: number; after: string }>): void => {
		pageSize = event.detail.selectedPageSize;
		fetchConnection = queryType({ __type: __type, pageSize: pageSize, after: event.detail.after });
	};

	const onPrevious = (event: CustomEvent<{ selectedPageSize: number; before: string }>): void => {
		pageSize = event.detail.selectedPageSize;
		fetchConnection = queryType({
			__type: __type,
			pageSize: pageSize,
			before: event.detail.before
		});
	};

	const onPageChange = (
		event: CustomEvent<{ selectedPageSize: number; selectedPageNumber: number }>
	): void => {
		pageSize = event.detail.selectedPageSize;
		pageNumber = event.detail.selectedPageNumber;
		fetchConnection = queryType({
			__type: __type,
			pageSize: pageSize,
			offset: (pageNumber - 1) * pageSize
		});
	};

	const onSizeChange = (event: CustomEvent<{ selectedPageSize: number }>): void => {
		pageSize = event.detail.selectedPageSize;
		fetchConnection = queryType({ __type: __type, pageSize: pageSize });
	};
</script>

{#await fetchConnection}
	<TableLoading />
{:then response}
	<Table>
		<thead>
			<tr>
				<th class="z-10">
					<label>
						<input type="checkbox" class="checkbox" />
					</label>
				</th>
				{#each fieldFilters as __fieldFilter}
					<FieldTh bind:value={__fieldFilter} on:filter={research} />
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each manager.getListFromConnection(response.connection) as data}
				<tr class="hover">
					<th class="z-10">
						<label>
							<input type="checkbox" class="checkbox" />
						</label>
					</th>
					{#each fields as __field}
						<FieldTd
							id={data[idFieldName]}
							{__field}
							bind:value={data[__field.name]}
							on:submit={mutationField}
						/>
					{/each}
					<td>
						<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
							<button
								class="btn btn-square btn-ghost btn-xs"
								on:click={(e) => {
									e.preventDefault();
									goto(`./${manager.typeNameToUrl(__type.name)}/${data[idFieldName]}`);
								}}
							>
								<Icon src={PencilAlt} solid />
							</button>
						</div>
						<div class="tooltip" data-tip={$LL.components.graphql.table.deleteBtn()}>
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
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
	<div class="divider" />
	<Pagination
		{pageNumber}
		{pageSize}
		totalCount={response.connection.totalCount}
		on:pageChange={onPageChange}
		on:sizeChange={onSizeChange}
	/>
{:catch error}
	{notifications.error($LL.message.requestFailed())}
{/await}

<Modal isModalOpen={deleteModelOpen} title={$LL.components.graphql.table.deleteModalTitle()}>
	<ModalActions>
		<button class="btn" on:click={() => (deleteModelOpen = false)}>
			{$LL.components.graphql.table.cancelBtn()}
		</button>
		<button class="btn btn-outline btn-error" on:click={() => deleteRow()}>
			{$LL.components.graphql.table.deleteBtn()}
		</button>
	</ModalActions>
</Modal>
