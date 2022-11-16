<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import {
		queryTypeConnection,
		updateType,
		removeType,
		type QueryParams
	} from '@graphace/graphql/request/Type';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import {
		type __Type,
		type __Field,
		type __FieldFilter,
		type Connection,
		__TypeKind,
		createFilter
	} from '@graphace/graphql/types';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import { FieldTh, FieldTd, ObjectFieldTh, ObjectFieldTd } from '.';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';

	export let __type: __Type;
	export let pageSize: number = 10;
	export let className = '';

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
			dataList.forEach((data) => (selectedRows[data.get(idFieldName)] = false));
		});
	};

	let dataList: Record<string, any>[] = [];
	let selectedRows: Record<string, boolean> = {};
	let selectAll: boolean;
	let pageNumber: number = 1;

	const dispatch = createEventDispatcher<{
		selectChange: { selectedIdList: string[]; selectedDataList: Record<string, any>[] };
	}>();

	$: dispatch('selectChange', {
		selectedIdList: Object.keys(selectedRows)
			.filter((id) => selectedRows[id])
			.map((id) => id),
		selectedDataList: Object.keys(selectedRows)
			.filter((id) => selectedRows[id])
			.flatMap((id) => dataList.filter((data) => data.get(idFieldName) === id))
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
			resolve: (value: any) => void;
			reject: (error: Error) => void;
		}>
	) {
		const data = dataList.find((data) => data.get(idFieldName) === event.detail.id);
		if (data && __type.name) {
			validate(__type.name, data, $locale)
				.then((data) => {
					updateType(__type, data, event.detail.__field)
						.then((response) => {
							event.detail.resolve(response.data[event.detail.__field.name]);
							notifications.success($LL.message.saveSuccess());
						})
						.catch((error) => {
							notifications.error($LL.message.saveFailed());
						});
				})
				.catch((validErrors) => {
					event.detail.reject(validErrors[event.detail.__field.name]);
				});
		}
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
	<Table {className}>
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
					{#if manager.getFieldTypeKind(__fieldFilter.__field.type) === __TypeKind.OBJECT}
						<ObjectFieldTh
							__field={__fieldFilter.__field}
							bind:value={__fieldFilter}
							on:filter={() => refresh()}
						/>
					{:else}
						<FieldTh bind:value={__fieldFilter} on:filter={() => refresh()} />
					{/if}
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
								on:save={saveField}
							/>
						{/if}
					{/each}
					<td>
						<slot name="row" id={data[idFieldName]} {data} {removeRow} />
					</td>
				</tr>
			{/each}
		</tbody>
	</Table>
	<div class="divider" />
	<slot
		name="page"
		{pageNumber}
		{pageSize}
		totalCount={response.connection.totalCount}
		{onPageChange}
		{onSizeChange}
		{onPrevious}
		{onNext}
	/>
{:catch error}
	{notifications.error($LL.message.requestFailed())}
{/await}
