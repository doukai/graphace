<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';
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
	import Pagination from '$lib/components/ui/connection/Pagination.svelte';
	import { FieldTh, FieldTd } from './';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { PencilAlt, Trash } from '@steeze-ui/heroicons';
	import { notifications } from '$lib/stores/Notifications';
	import { messageBox } from '$lib/stores/MessageBox';
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

	let isTableModalOpen: boolean = false;

	const searchType = (): void => {
		isTableModalOpen = true;
	};

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
								{__type}
								id={data[idFieldName]}
								{__field}
								bind:value={data}
								on:search={searchType}
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
						<div class="tooltip" data-tip={$LL.components.graphql.table.removeBtn()}>
							<button
								class="btn btn-square btn-ghost btn-xs"
								on:click={(e) => {
									e.preventDefault();
									messageBox.open({
										title: $LL.components.graphql.table.removeModalTitle(),
										buttonName: $LL.components.graphql.table.removeBtn(),
										buttonType: 'error',
										confirm: () => {
											removeRow(data[idFieldName]);
											return true;
										}
									});
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

{#if isTableModalOpen}
	<TypeTableModal
		isModalOpen={isTableModalOpen}
		typeName={__type.name}
	/>
{/if}
