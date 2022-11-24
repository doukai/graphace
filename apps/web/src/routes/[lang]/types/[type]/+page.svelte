<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
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
	import { graphql } from '$houdini';
	import type { PageData } from './$types';
	import { GQL_QueryUserConnection, GQL_MutationUser } from '$houdini';
	import { before } from 'node:test';

	export let data: PageData;

	const schema = __schema as unknown as __Schema;

	const manager: TypeManager = new TypeManager();
	const __type: __Type | undefined = schema.types.find(
		(type: __Type) => type.name === data.typeName
	);

	let refresh: (params?: QueryParams) => void;

	GQL_QueryUserConnection.fetch({ variables: { before: '1', first: 10 } });

	const dispatch = createEventDispatcher<{
		query: QueryParams;
	}>();

	// let queryValue: string = null;
	// let search = (event: CustomEvent<{ value: string }>) => {
	// 	queryValue = event.detail.value;
	// 	refresh({ queryValue });
	// };

	let showDeleteButton = false;
	let idList: string[] = [];

	const query = (event: CustomEvent<QueryParams>) => {
		let variables = {
			pageSize: event.detail.pageSize,
			after: event.detail.after,
			before: event.detail.before,
			offset: event.detail.offset
		};

		GQL_QueryUserConnection.fetch({ variables });
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
	<TypeTable {__type} on:selectChange={selectChange} bind:refresh>
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
{:else}
	<SectionLoading />
{/if}

<TypeEditorModals />
<ListTypeEditorModals />
<TypeTableModals />
