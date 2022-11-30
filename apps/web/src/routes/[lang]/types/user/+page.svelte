<script lang="ts">
	import { goto } from '$app/navigation';
	import type { __Type, __Schema, QueryParams } from '@graphace/graphql/types';
	import { __schema } from '~/gql/generated/introspection.json';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import { TypeTable, TypeTableModals } from '@graphace/ui-graphql/components/introspection/table';
	import {
		TypeEditorModals,
		ListTypeEditorModals
	} from '@graphace/ui-graphql/components/introspection';
	import { SectionHead, SectionLoading } from '@graphace/ui/components/section';
	import SearchInput from '@graphace/ui/components/search/SearchInput.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Plus, PencilAlt, Trash } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';
	import { Pagination } from '@graphace/ui/components/connection';
	import type { PageData } from './$houdini';
	import { TableLoading } from '@graphace/ui/components/table';
	import {
		Conditional,
		// GQL_QueryUserConnection,
		QueryUserConnection$input,
		QueryUserConnectionStore,
		UserOrderBy
	} from '$houdini';

	export let data: PageData;
	$: ({ QueryUserConnection } = data);
	// $: GQL_QueryUserConnection = data.QueryUserConnection as QueryUserConnectionStore;
	$: console.log(JSON.stringify($QueryUserConnection.data.userConnection));

	const schema = __schema as unknown as __Schema;

	const manager: TypeManager = new TypeManager();
	const __type: __Type | undefined = schema.types.find((type: __Type) => type.name === 'User');

	// let refresh: (params?: QueryParams) => void;

	let showDeleteButton = false;
	let idList: string[] = [];

	const query = (event: CustomEvent<QueryParams>) => {
		let variables: QueryUserConnection$input = Object.assign(
			{},
			...(event.detail.fieldFilters?.map((filter) => ({
				[filter.__field.name]: { val: filter.val, opr: filter.opr }
			})) || [])
		);

		if (event.detail.after) {
			variables.after = event.detail.after;
			variables.first = event.detail.pageSize;
		} else if (event.detail.before) {
			variables.before = event.detail.before;
			variables.last = event.detail.pageSize;
		} else if (event.detail.offset) {
			variables.offset = event.detail.offset;
			variables.first = event.detail.pageSize;
		} else {
			variables.first = event.detail.pageSize;
		}

		let userOrderBy: UserOrderBy = Object.assign(
			{},
			...(event.detail.fieldFilters?.map((filter) => ({
				[filter.__field.name]: filter.sort
			})) || [])
		);

		if (Object.keys(userOrderBy).length > 0) {
			variables.orderBy = userOrderBy;
		}

		if (event.detail.queryValue) {
			variables.cond = Conditional.OR;
			variables.login = { val: event.detail.queryValue };
			variables.name = { val: event.detail.queryValue };
			variables.phones = { val: event.detail.queryValue };
		}

		// QueryUserConnection.fetch({ variables });
	};

	const selectChange = (event: CustomEvent<{ selectedIdList: string[] }>) => {
		idList = event.detail.selectedIdList;
		if (event.detail.selectedIdList.length > 0) {
			showDeleteButton = true;
		} else {
			showDeleteButton = false;
		}
	};

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
	{#if $QueryUserConnection.isFetching}
		<TableLoading />
	{:else}
		{#if $QueryUserConnection.data}
			<TypeTable
				{__type}
				on:selectChange={selectChange}
				on:query={query}
				bind:value={$QueryUserConnection.data.userConnection}
			>
				<div slot="row" let:id let:removeRow>
					<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
						<button
							class="btn btn-square btn-ghost btn-xs"
							on:click={(e) => {
								e.preventDefault();
								goto(`./user/${id}`);
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
								messageBoxs.open({
									title: $LL.components.graphql.table.removeModalTitle(),
									buttonName: $LL.components.graphql.table.removeBtn(),
									buttonType: 'error',
									confirm: () => {
										removeRow(id);
										return true;
									}
								});
							}}
						>
							<Icon src={Trash} solid />
						</button>
					</div>
				</div>
				<div
					slot="page"
					let:pageNumber
					let:pageSize
					let:totalCount
					let:onPageChange
					let:onSizeChange
				>
					<Pagination
						{pageNumber}
						{pageSize}
						{totalCount}
						on:pageChange={onPageChange}
						on:sizeChange={onSizeChange}
					/>
				</div>
			</TypeTable>
		{:else}
			{notifications.warning($LL.message.requestFailed())}
		{/if}
		{#if $QueryUserConnection.errors}
			{notifications.error($LL.message.requestFailed())}
		{/if}
	{/if}
{:else}
	<SectionLoading />
{/if}

<!-- <TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals /> -->
