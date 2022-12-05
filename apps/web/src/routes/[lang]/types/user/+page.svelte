<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		__Type,
		__Schema,
		QueryParams,
		Connection,
		__Field,
		__FieldFilter,
		createFilter,
		__TypeKind
	} from '@graphace/graphql/types';
	import { __schema } from '~/gql/generated/introspection.json';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import {
		TypeTable,
		TypeTableModals,
		FieldTh,
		FieldTd,
		ObjectFieldTh,
		ObjectFieldTd
	} from '@graphace/ui-graphql/components/introspection/table';
	import {
		TypeEditorModals,
		ListTypeEditorModals
	} from '@graphace/ui-graphql/components/introspection';
	import { SectionHead, SectionLoading } from '@graphace/ui/components/section';
	import { Table, TableLoading } from '@graphace/ui/components/table';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { Pagination } from '@graphace/ui/components/connection';
	import type { PageData } from './$houdini';
	import {
		Conditional,
		QueryUserConnection$input,
		QueryUserConnectionStore,
		UserOrderBy
	} from '$houdini';

	export let data: PageData;
	$: QueryUserConnection = data.QueryUserConnection as QueryUserConnectionStore;
	$: connection = $QueryUserConnection.data?.userConnection as unknown as Connection;
	$: dataList = manager.getListFromConnection(connection);

	const schema = __schema as unknown as __Schema;

	const manager: TypeManager = new TypeManager();
	const __type: __Type | undefined = schema.types.find((type: __Type) => type.name === 'User');
	if (!__type) {
		throw Error();
	}
	const fields: Array<__Field> = manager.getFiledList(__type);
	let fieldFilters: Array<__FieldFilter> = manager
		.getFiledList(__type)
		.map((__field) => createFilter(__field));
	const idFieldName: string = manager.getIdFieldName(__type);

	// let refresh: (params?: QueryParams) => void;

	let showDeleteButton = false;
	let idList: string[] = [];
	let selectedRows: Record<string, boolean> = {};
	let selectAll: boolean;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const query = (queryParams: QueryParams) => {
		let variables: QueryUserConnection$input = {};
		if (queryParams.queryValue) {
			variables.cond = Conditional.OR;
			variables.login = { val: queryParams.queryValue };
			variables.name = { val: queryParams.queryValue };
			variables.phones = { val: queryParams.queryValue };
		} else {
			if (fieldFilters && fieldFilters.length > 0) {
				variables = Object.assign(
					{},
					...(fieldFilters.map((filter) => ({
						[filter.__field.name]:
							filter.val === undefined ? undefined : { val: filter.val, opr: filter.opr }
					})) || [])
				);

				let userOrderBy: UserOrderBy = Object.assign(
					{},
					...(fieldFilters
						?.filter((filter) => filter !== undefined && filter.sort !== undefined)
						.map((filter) => ({
							[filter.__field.name]: filter.sort
						})) || [])
				);

				if (Object.keys(userOrderBy).length > 0) {
					variables.orderBy = userOrderBy;
				} else {
					variables.orderBy = undefined;
				}
			} else {
				variables = {};
			}
		}

		if (queryParams.after) {
			variables.after = queryParams.after;
			variables.first = queryParams.pageSize;
		} else if (queryParams.before) {
			variables.before = queryParams.before;
			variables.last = queryParams.pageSize;
		} else if (queryParams.offset) {
			variables.offset = queryParams.offset;
			variables.first = queryParams.pageSize;
		} else {
			variables.first = queryParams.pageSize;
		}

		alert(JSON.stringify(variables));

		QueryUserConnection.fetch({ variables });
	};

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
			showDeleteButton = true;
		} else {
			showDeleteButton = false;
		}
	};

	async function saveField(
		event: CustomEvent<{
			id: string;
			__field: __Field;
			resolve: (value: any) => void;
			reject: (error: Error) => void;
		}>
	) {
		// const data = dataList.find((data) => data.get(idFieldName) === event.detail.id);
		// if (data && __type.name) {
		// 	validate(__type.name, data, $locale)
		// 		.then((data) => {
		// 			updateType(__type, data, event.detail.__field)
		// 				.then((response) => {
		// 					event.detail.resolve(response.data[event.detail.__field.name]);
		// 					notifications.success($LL.message.saveSuccess());
		// 				})
		// 				.catch((error) => {
		// 					notifications.error($LL.message.saveFailed());
		// 				});
		// 		})
		// 		.catch((validErrors) => {
		// 			event.detail.reject(validErrors[event.detail.__field.name]);
		// 		});
		// }
	}

	async function removeRow(id: string) {
		// removeType(__type, id)
		// 	.then((response) => {
		// 		notifications.success($LL.message.removeSuccess());
		// 		refresh();
		// 	})
		// 	.catch((error) => {
		// 		notifications.error($LL.message.removeFailed());
		// 	});
	}

	const removeRows = (__type: __Type) => {
		// removeTypes(__type, idList)
		// 	.then((response) => {
		// 		notifications.success($LL.message.removeSuccess());
		// 		refresh();
		// 	})
		// 	.catch((error) => {
		// 		notifications.error($LL.message.removeFailed());
		// 	});
	};
	// QueryUserConnection.fetch({ variables: { first: 10 } });
</script>

{#if __type}
	<SectionHead title={__type.name || ''}>
		<!-- <SearchInput on:search={search} /> -->
		{#if showDeleteButton}
			<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
				<button
					class="btn btn-error btn-outline btn-square"
					on:click={(e) => {
						e.preventDefault();
						messageBoxs.open({
							title: $LL.components.graphql.table.removeModalTitle(),
							buttonName: $LL.components.graphql.table.removeBtn(),
							buttonType: 'error',
							confirm: () => {
								removeRows(__type);
								return true;
							}
						});
					}}
				>
					<Icon src={Trash} class="h-6 w-6" solid />
				</button>
			</div>
		{/if}
		<div class="tooltip tooltip-bottom" data-tip={$LL.routers.type.remove()}>
			<button
				class="btn btn-square md:hidden"
				on:click={(e) => {
					e.preventDefault();
					goto(`./${__type.name}/create`);
				}}
			>
				<Icon src={Plus} class="h-6 w-6" solid />
			</button>
		</div>
		<button
			class="hidden md:btn"
			on:click={(e) => {
				e.preventDefault();
				goto(`./${__type.name}/create`);
			}}
		>
			{$LL.routers.type.create()}
		</button>
	</SectionHead>
	<div class="divider" />
	{#if $QueryUserConnection.data}
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
						{#if manager.getFieldTypeKind(__fieldFilter.__field.type) === __TypeKind.OBJECT}
							<ObjectFieldTh
								__field={__fieldFilter.__field}
								bind:value={__fieldFilter}
								on:filter={() => query({})}
							/>
						{:else}
							<FieldTh bind:value={__fieldFilter} on:filter={() => query({ fieldFilters })} />
						{/if}
					{/each}
					<td />
				</tr>
			</thead>
			{#if $QueryUserConnection.isFetching}
				<TableLoading />
			{:else}
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
			{/if}
		</Table>
		<div class="divider" />
		<Pagination
			{pageNumber}
			{pageSize}
			totalCount={connection.totalCount}
			on:pageChange={() => query({ offset: (pageNumber - 1) * pageSize })}
			on:sizeChange={() => query({})}
		/>
	{:else}
		{notifications.warning($LL.message.requestFailed())}
	{/if}
	{#if $QueryUserConnection.errors}
		{notifications.error($LL.message.requestFailed())}
	{/if}
{:else}
	<SectionLoading />
{/if}

<!-- <TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals /> -->
