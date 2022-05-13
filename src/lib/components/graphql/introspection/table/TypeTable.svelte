<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		queryTypeConnection,
		mutationField,
		removeType,
		type QueryParams
	} from '$lib/graphql/Type';
	import { TypeManager } from '$lib/TypeManager';
	import type { __Type, __Field, __FieldFilter, Connection } from '$lib/types';
	import { __TypeKind } from '$lib/types';
	import { createFilter } from '$lib/types/__FieldFilter';
	import { Table, TableLoading } from '$lib/components/ui/table';
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { FieldTh, FieldTd } from './';
	import { notifications } from '$lib/components/ui/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import ObjectFieldTd from './ObjectFieldTd.svelte';

	export let __type: __Type;
	export let pageSize: number = 10;

	export const refresh = (params?: QueryParams): void => {
		let { queryValue, after, before, offset } = params || {
			queryValue: null,
			after: null,
			before: null,
			offset: 0
		};
		connectionPromise = queryTypeConnection({
			__type,
			queryValue,
			fieldFilters,
			pageSize,
			after,
			before,
			offset
		});
		connectionPromise.then((response) => {
			dataList = manager.getListFromConnection(response.connection);
			selectedRows = {};
			selectAll = false;
			manager
				.getListFromConnection(response.connection)
				.forEach((data) => (selectedRows[data[idFieldName]] = false));
		});
	};

	let dataList: object[] = [];
	let selectedRows: object = {};
	let selectAll: boolean;
	let pageNumber: number = 1;

	const dispatch = createEventDispatcher<{
		selectChange: { selectedIdList: string[]; selectedDataList: object[] };
	}>();

	$: dispatch('selectChange', {
		selectedIdList: Object.keys(selectedRows)
			.filter((id) => selectedRows[id])
			.map((id) => id),
		selectedDataList: Object.keys(selectedRows)
			.filter((id) => selectedRows[id])
			.map((id) => dataList.find((data) => data[idFieldName] === id))
	});

	const manager: TypeManager = new TypeManager();
	const fields: Array<__Field> = manager.getFiledList(__type);
	const fieldFilters: Array<__FieldFilter> = manager
		.getFiledList(__type)
		.map((__field) => createFilter(__field));
	const idFieldName: string = manager.getIdFieldName(__type);

	let connectionPromise: Promise<{ connection: Connection }>;

	refresh();

	async function saveField(
		event: CustomEvent<{
			id: string;
			__field: __Field;
			value: string | number | boolean | string[] | number[] | boolean[];
		}>
	) {
		mutationField(__type, event.detail.id, event.detail.__field, event.detail.value)
			.then((response) => {
				notifications.success($LL.message.saveSuccess());
			})
			.catch((error) => {
				notifications.error($LL.message.saveFailed());
			});
	}

	async function removeRow(id: string) {
		removeType(__type, id)
			.then((response) => {
				notifications.success($LL.message.removeSuccess());
				refresh();
			})
			.catch((error) => {
				notifications.error($LL.message.removeFailed());
			});
	}

	const onNext = (event: CustomEvent<{ selectedPageSize: number; after: string }>): void => {
		pageSize = event.detail.selectedPageSize;
		refresh({ after: event.detail.after });
	};

	const onPrevious = (event: CustomEvent<{ selectedPageSize: number; before: string }>): void => {
		pageSize = event.detail.selectedPageSize;
		refresh({ before: event.detail.before });
	};

	const onPageChange = (
		event: CustomEvent<{ selectedPageSize: number; selectedPageNumber: number }>
	): void => {
		pageSize = event.detail.selectedPageSize;
		pageNumber = event.detail.selectedPageNumber;
		refresh({ offset: (pageNumber - 1) * pageSize });
	};

	const onSizeChange = (event: CustomEvent<{ selectedPageSize: number }>): void => {
		pageSize = event.detail.selectedPageSize;
		refresh();
	};
</script>

{#await connectionPromise}
	<TableLoading />
{:then response}
	<Table>
		<thead>
			<tr>
				<th class="z-10">
					<label>
						<input
							type="checkbox"
							class="checkbox"
							bind:checked={selectAll}
							on:change={() => {
								Object.keys(selectedRows).forEach((id) => (selectedRows[id] = selectAll));
							}}
						/>
					</label>
				</th>
				{#each fieldFilters as __fieldFilter}
					<FieldTh bind:value={__fieldFilter} on:filter={() => refresh()} />
				{/each}
				<td />
			</tr>
		</thead>
		<tbody>
			{#each dataList as data}
				<tr class="hover">
					<th class="z-10">
						<label>
							<input
								type="checkbox"
								class="checkbox"
								bind:checked={selectedRows[data[idFieldName]]}
							/>
						</label>
					</th>
					{#each fields as __field}
						{#if manager.getFieldTypeKind(__field.type) === __TypeKind.OBJECT}
							<ObjectFieldTd
								__parentType={__type}
								{__field}
								id={data[idFieldName]}
								bind:value={data}
							/>
						{:else}
							<FieldTd
								id={data[idFieldName]}
								{__field}
								bind:value={data[__field.name]}
								on:submit={saveField}
							/>
						{/if}
					{/each}
					<td>
						<slot id={data[idFieldName]} {data} {removeRow} />
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
