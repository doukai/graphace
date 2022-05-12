<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getType } from '$lib/graphql/Introspection';
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
	import TypeTableModal from '$lib/components/graphql/introspection/table/TypeTableModal.svelte';
	import TypeEditorModal from '$lib/components/graphql/introspection/TypeEditorModal.svelte';
	import ListTypeEditorModal from '$lib/components/graphql/introspection/ListTypeEditorModal.svelte';
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { FieldTh, FieldTd } from './';
	import { notifications } from '$lib/stores/Notifications';
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
			selectedRows = {};
			selectAll = false;
			manager
				.getListFromConnection(response.connection)
				.forEach((data) => (selectedRows[data[idFieldName]] = false));
		});
	};

	const dispatch = createEventDispatcher<{
		selectChange: { selectedIdList: string[] };
	}>();

	let selectedRows: object = {};
	let selectAll: boolean;
	let pageNumber: number = 1;

	$: dispatch('selectChange', {
		selectedIdList: Object.keys(selectedRows)
			.filter((id) => selectedRows[id])
			.map((id) => id)
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

	let isTableModalOpen: boolean = false;
	const searchType = (): void => {
		isTableModalOpen = true;
	};

	let isTypeEditorModalOpen: boolean = false;
	let typePromise: Promise<{ __type: __Type }>;
	let __field: __Field;
	let id: string;
	let value: object;
	async function editTypeField(
		event: CustomEvent<{
			id: string;
			__field: __Field;
			value: object;
			change: (value: object) => void;
		}>
	) {
		id = event.detail.id;
		__field = event.detail.__field;
		value = event.detail.value;
		typePromise = getType(manager.getFieldTypeName(__field.type));
		isTypeEditorModalOpen = true;
	}
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
			{#each manager.getListFromConnection(response.connection) as data}
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
								id={data[idFieldName]}
								{__field}
								bind:value={data}
								on:editTypeField={editTypeField}
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

{#if isTableModalOpen}
	<TypeTableModal bind:isModalOpen={isTableModalOpen} typeName={__type.name} />
{/if}

{#if isTypeEditorModalOpen}
	{#await typePromise then response}
		{#if manager.fieldIsList(__field.type)}
			<ListTypeEditorModal
				isModalOpen={isTypeEditorModalOpen}
				__parentType={__type}
				__type={response.__type}
				{id}
				{__field}
				bind:value
			/>
		{:else}
			<TypeEditorModal
				isModalOpen={isTypeEditorModalOpen}
				__parentType={__type}
				__type={response.__type}
				{id}
				{__field}
				bind:value
				on:search={searchType}
			/>
		{/if}
	{:catch error}
		{notifications.error($LL.message.requestFailed())}
	{/await}
{/if}
