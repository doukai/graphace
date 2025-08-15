<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import { loadEvent, permissions } from '~/utils';
	import type { Permission, QueryPermissionConnectionArgs, PermissionOrderBy, PermissionInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';

	export let value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof Permission & keyof PermissionInput) | undefined = undefined;
	export let text: string | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let clearAfterSelect: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0 truncate';
	export { className as class };
	const { auth } = permissions;
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
		field?: Option | undefined;
		type?: Option | undefined;
		permissionType?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: {
			readonly: !auth('Permission::name::WRITE'),
			disabled: !auth('Permission::name::WRITE'),
			hidden: !auth('Permission::name::READ')
		},
		description: {
			readonly: !auth('Permission::description::WRITE'),
			disabled: !auth('Permission::description::WRITE'),
			hidden: !auth('Permission::description::READ')
		},
		field: {
			readonly: !auth('Permission::field::WRITE'),
			disabled: !auth('Permission::field::WRITE'),
			hidden: !auth('Permission::field::READ')
		},
		type: {
			readonly: !auth('Permission::type::WRITE'),
			disabled: !auth('Permission::type::WRITE'),
			hidden: !auth('Permission::type::READ')
		},
		permissionType: {
			readonly: !auth('Permission::permissionType::WRITE'),
			disabled: !auth('Permission::permissionType::WRITE'),
			hidden: !auth('Permission::permissionType::READ')
		},
		roles: {
			readonly: !auth('Permission::roles::WRITE'),
			disabled: !auth('Permission::roles::WRITE'),
			hidden: !auth('Permission::roles::READ')
		},
		realm: {
			readonly: !auth('Permission::realm::WRITE'),
			disabled: !auth('Permission::realm::WRITE'),
			hidden: !auth('Permission::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined };
	}>();

	const query_permissionConnection_Store = createQuery_permissionConnection_Store($loadEvent);
	$: nodes = $query_permissionConnection_Store.response.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_permissionConnection_Store.response.data?.permissionConnection?.totalCount || 0;
	export let args: QueryPermissionConnectionArgs = {};
	export let orderBy: PermissionOrderBy = {};
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let selectedIdList: (string | null | undefined)[] | undefined = [];
	export let close: (() => void) | undefined = undefined;
	
	$: if (textFieldName) {
		if (Array.isArray(value)) {
			if (value.some((item) => !item?.[textFieldName])) {
				query_permissionConnection_Store
					.fetch({
						id: { opr: 'IN', arr: value?.map((item) => item?.id) }
					})
					.then((response) => {
						value = response.data?.permissionConnection?.edges?.map((edge) => ({
							[textFieldName]: edge?.node?.[textFieldName],
							id: edge?.node?.id
						}));
					});
			} else {
				if (value.length > 3) {
					text = value
						.slice(0, 3)
						.map((node) => node?.[textFieldName])
						.filter((name) => name !== null)
						.join(',')
						.concat('...');
				} else {
					text = value
						.map((node) => node?.[textFieldName])
						.filter((name) => name !== null)
						.join(',');
				}
			}
		} else if (value) {
			if (!value?.[textFieldName]) {
				query_permissionConnection_Store
					.fetch({
						id: { opr: 'EQ', val: value.id }
					})
					.then((response) => {
						value = response.data?.permissionConnection?.edges?.map((edge) => ({
							[textFieldName]: edge?.node?.[textFieldName],
							id: edge?.node?.id
						}))?.[0];
					});
			} else {
				text = value[textFieldName] + '';
			}
		}
	}

	const query = (to?: number | undefined) => {
		args.orderBy = orderBy;
		args.first = pageSize;
		args.offset = ((to || pageNumber) - 1) * pageSize;
		query_permissionConnection_Store.fetch(buildArguments(args)).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};
</script>

<Dialog bind:close>
	<svelte:fragment slot="trigger" let:trigger let:zIndex>
		<div class="tooltip md:hidden" data-tip={text}>
			<button
				use:melt={trigger}
				class="btn {className} max-sm:btn-square"
				{disabled}
				on:click={(e) => {
					query(1);
					if (selectedIdList?.length === 0) {
						if (Array.isArray(value)) {
							selectedIdList = value?.map((node) => node?.id);
						} else if (value) {
							selectedIdList = [value?.id];
						}
					}
				}}
			>
				<slot name="sm">
					{#if text}
						{text}
					{:else}
						{$LL.ui.button.select()}
					{/if}
				</slot>
			</button>
		</div>
		<button
			use:melt={trigger}
			class="btn {className} max-md:hidden"
			{disabled}
			on:click={(e) => {
				query(1);
				if (selectedIdList?.length === 0) {
					if (Array.isArray(value)) {
						selectedIdList = value?.map((node) => node?.id);
					} else if (value) {
						selectedIdList = [value?.id];
					}
				}
			}}
		>
			<slot>
				{#if text}
					{text}
				{:else}
					{$LL.ui.button.select()}
				{/if}
			</slot>
		</button>
	</svelte:fragment>
	<svelte:fragment let:zIndex>
		<PermissionTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) === 1)}
			isFetching={$query_permissionConnection_Store.isFetching}
			{zIndex}
			{fields}
			on:select={(e) => {
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						value = e.detail.value?.[0] || null;
					} else {
						value = e.detail.value;
					}
				} else if (e.detail.value) {
					value = e.detail.value;
				} else {
					value = null;
				}
				dispatch('select', { value });
				if (clearAfterSelect) {
					if (Array.isArray(e.detail.value)) {
						value = [];
					} else {
						value = undefined;
					}
					selectedIdList = [];
				}
				if (close) {
					close();
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						field: { opr: 'LK', val: e.detail.value },
						type: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					};
				} else {
					args = { first: pageSize, offset: 0 };
				}
				query();
			}}
			on:query={(e) => {
				args = e.detail.args;
				orderBy = e.detail.orderBy;
				query();
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`/${$locale}/permission/${e.detail.value.id}`, e.detail.value.id);
				}
			}}
			on:create={(e) => to(`/${$locale}/permission/_`, '_')}
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`, e.detail.name)}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</svelte:fragment>
</Dialog>
