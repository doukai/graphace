<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { Permission, QueryPermissionConnectionArgs, PermissionOrderBy, PermissionInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof Permission & keyof PermissionInput) | undefined = undefined;
	export let text: string | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'btn-link p-0';
	export { className as class };
	const permissions = getContext<PermissionsStore>('permissions');
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
			readonly: !permissions.auth('Permission::name::WRITE'),
			disabled: !permissions.auth('Permission::name::WRITE'),
			hidden: !permissions.auth('Permission::name::READ')
		},
		description: {
			readonly: !permissions.auth('Permission::description::WRITE'),
			disabled: !permissions.auth('Permission::description::WRITE'),
			hidden: !permissions.auth('Permission::description::READ')
		},
		field: {
			readonly: !permissions.auth('Permission::field::WRITE'),
			disabled: !permissions.auth('Permission::field::WRITE'),
			hidden: !permissions.auth('Permission::field::READ')
		},
		type: {
			readonly: !permissions.auth('Permission::type::WRITE'),
			disabled: !permissions.auth('Permission::type::WRITE'),
			hidden: !permissions.auth('Permission::type::READ')
		},
		permissionType: {
			readonly: !permissions.auth('Permission::permissionType::WRITE'),
			disabled: !permissions.auth('Permission::permissionType::WRITE'),
			hidden: !permissions.auth('Permission::permissionType::READ')
		},
		roles: {
			readonly: !permissions.auth('Permission::roles::WRITE'),
			disabled: !permissions.auth('Permission::roles::WRITE'),
			hidden: !permissions.auth('Permission::roles::READ')
		},
		realm: {
			readonly: !permissions.auth('Permission::realm::WRITE'),
			disabled: !permissions.auth('Permission::realm::WRITE'),
			hidden: !permissions.auth('Permission::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
			original: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_permissionConnection_Store = createQuery_permissionConnection_Store(getLoadEvent());
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
	
	$: if (Array.isArray(value)) {
		if (value.some((item) => item?.name && !item?.where)) {
			value = value.map((item) => ({
				...item,
				where: { name: { val: item?.name } }
			}));
		}
		if (textFieldName) {
			if (value.some((item) => !item?.[textFieldName])) {
				query_permissionConnection_Store
					.fetch({
						name: { opr: 'IN', arr: value?.map((item) => item?.where?.name?.val) }
					})
					.then((response) => {
						value = response.data?.permissionConnection?.edges?.map((edge) => ({
							...edge?.node,
							where: { name: { val: edge?.node?.name } }
						}));
						if (value) {
							if (value.length > 0 && selectedIdList?.length === 0) {
								selectedIdList = value?.map((node) => node?.where?.id?.val);
							}
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
					});
			} else {
				if (value.length > 0 && selectedIdList?.length === 0) {
					selectedIdList = value?.map((node) => node?.where?.id?.val);
				}
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
		} else {
			if (value.length > 0 && selectedIdList?.length === 0) {
				selectedIdList = value?.map((node) => node?.where?.id?.val);
			}
		}
	} else if (value) {
		if (value?.name && !value.where) {
			value = { ...value, where: { name: { val: value.name } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_permissionConnection_Store
					.fetch({
						name: { opr: 'EQ', val: value.where?.name?.val }
					})
					.then((response) => {
						value = response.data?.permissionConnection?.edges?.map((edge) => ({
							...edge?.node,
							where: { name: { val: edge?.node?.name } }
						}))?.[0];
						if (value) {
							if (selectedIdList?.length === 0) {
								selectedIdList = [value?.where?.name?.val];
							}
							text = value?.[textFieldName] + '';
						}
					});
			} else {
				if (selectedIdList?.length === 0) {
					selectedIdList = [value?.where?.name?.val];
				}
				text = value?.[textFieldName] + '';
			}
		} else {
			if (selectedIdList?.length === 0) {
				selectedIdList = [value?.where?.name?.val];
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
				on:click={(e) => query(1)}
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
			on:click={(e) => query(1)}
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
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) <= 1)}
			isFetching={$query_permissionConnection_Store.isFetching}
			{zIndex}
			{fields}
			on:select={(e) => {
				let original;
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						original = e.detail.value?.[0] || null;
					} else {
						original = e.detail.value;
					}
				} else if (e.detail.value) {
					original = e.detail.value;
				} else {
					original = null;
				}

				if (Array.isArray(original)) {
					if (textFieldName) {
						if (original.length > 3) {
							text = original
								.slice(0, 3)
								.map((node) => node?.[textFieldName])
								.filter((name) => name !== null)
								.join(',')
								.concat('...');
						} else {
							text = original
								.map((node) => node?.[textFieldName])
								.filter((name) => name !== null)
								.join(',');
						}
					}
					value = original.map((item) => ({
						...item,
						where: { name: { val: item?.name } }
					}));
				} else if (original) {
					if (textFieldName) {
						text = original?.[textFieldName] + '';
					} 
					value = { ...original, where: { name: { val: original.name } } };
				} else {
					text = undefined;
					value = null;
				}

				dispatch('select', { value, original });
				if (close) {
					close();
				}
			}}
			on:search={(e) => {
				if (e.detail.value) {
					args = {
						cond: 'OR',
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
			on:query={(e) => query()}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`./permission/${e.detail.value.name}`);
				}
			}}
			on:create={(e) => to('./permission/_')}
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
