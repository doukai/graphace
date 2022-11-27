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
	import {
		Conditional,
		GQL_QueryUserConnection,
		GQL_MutationUser,
		QueryUserConnection$input,
		UserOrderBy
	} from '$houdini';
	import type { PageData } from './$types';
	import { TableLoading } from '@graphace/ui/components/table';

	export let data: PageData;

	const schema = __schema as unknown as __Schema;

	const manager: TypeManager = new TypeManager();
	const __type: __Type | undefined = schema.types.find(
		(type: __Type) => type.name === data.typeName
	);

	let refresh: (params?: QueryParams) => void;

	let showDeleteButton = false;
	let idList: string[] = [];
	let queryResult = GQL_QueryUserConnection;

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

		queryResult.fetch({ variables });
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
	{#if $queryResult.isFetching}
		<TableLoading />
	{:else}
		<TypeTable
			{__type}
			on:selectChange={selectChange}
			on:query={query}
			bind:value={$queryResult.data.connection}
		>
			<div slot="row" let:id let:removeRow>
				<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
					<button
						class="btn btn-square btn-ghost btn-xs"
						on:click={(e) => {
							e.preventDefault();
							goto(`./${manager.typeNameToUrl(data.typeName)}/${id}`);
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
			<div slot="page" let:pageNumber let:pageSize let:totalCount let:onPageChange let:onSizeChange>
				<Pagination
					{pageNumber}
					{pageSize}
					{totalCount}
					on:pageChange={onPageChange}
					on:sizeChange={onSizeChange}
				/>
			</div>
		</TypeTable>
	{/if}
{:else}
	<SectionLoading />
{/if}

<TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals />
