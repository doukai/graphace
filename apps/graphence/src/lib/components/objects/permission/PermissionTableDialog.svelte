<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { createQuery_permissionConnection_Store } from '~/lib/stores/query/query_permissionConnection_store';
	import PermissionTable from '~/lib/components/objects/permission/PermissionTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { QueryPermissionConnectionArgs, PermissionOrderBy, PermissionInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined = undefined;
	export let triggerErrors: Errors | undefined = undefined;
	export let textFieldName: string | undefined = undefined;
	export let text: string | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'p-1';
	export { className as class };
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		select: {
			value: PermissionInput | (PermissionInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_permissionConnection_Store = createQuery_permissionConnection_Store(getLoadEvent());
	$: nodes = $query_permissionConnection_Store.response.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_permissionConnection_Store.response.data?.permissionConnection?.totalCount || 0;
	let args: QueryPermissionConnectionArgs = {};
	let orderBy: PermissionOrderBy = {};
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let selectedIdList: (string | null | undefined)[] | undefined = [];
	let close: () => void;

	if (Array.isArray(value)) {
		if (textFieldName) {
			if (value.length > 3) {
				text = value
					.slice(0, 3)
					.map((node) => node?.[textFieldName])
					.join(',')
					.concat('...');
			} else {
				text = value.map((node) => node?.[textFieldName]).join(',');
			}
		}
		value = value.map((item) => ({ where: { name: { val: item?.name } } }));
		selectedIdList = value?.map((node) => node?.where?.name?.val);
	} else if (value) {
		if (textFieldName) {
			text = value?.[textFieldName];
		}
		value = { where: { name: { val: value.name } } };
		selectedIdList = [value.where?.name?.val];
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
	<div class="flex space-x-1 items-center" slot="trigger" let:trigger let:zIndex>
		<div
			class="tooltip {triggerErrors ? 'tooltip-open tooltip-error ' : ''} hover:z-[{zIndex + 3}]"
			data-tip={triggerErrors
				? triggerErrors?.errors?.map((error) => error.message).join(', ')
				: $LL.ui.button.select()}
		>
			<button
				use:melt={trigger}
				class="btn {text ? 'btn-link' : 'btn-square btn-outline'} {className}"
				{disabled}
				on:click={(e) => query(1)}
			>
				{#if text}
					{text}
				{:else}
					<Icon src={ListBullet} class="h-5 w-5" />
				{/if}
			</button>
		</div>
		<slot/>
	</div>
	<svelte:fragment let:zIndex>
		<PermissionTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || selectedIdList?.length === 1)}
			isFetching={$query_permissionConnection_Store.isFetching}
			{zIndex}
			fields={{
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
			}}
			on:select={(e) => {
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						value = { where: { name: { val: e.detail.value?.[0]?.name } } };
						if (textFieldName) {
							text = e.detail.value?.[0]?.[textFieldName];
						}
					} else {
						value = e.detail.value.map((node) => ({ where: { name: { val: node?.name } } }));
						if (textFieldName) {
							if (e.detail.value.length > 3) {
								text = e.detail.value
									.slice(0, 3)
									.map((node) => node?.[textFieldName])
									.join(',')
									.concat('...');
							} else {
								text = e.detail.value.map((node) => node?.[textFieldName]).join(',');
							}
						}
					}
				} else if (e.detail.value) {
					value = { where: { name: { val: e.detail.value?.name } } };
					if (textFieldName) {
						text = e.detail.value?.[textFieldName];
					}
				} else {
					value = undefined;
					text = undefined;
				}
				dispatch('select', { value });
				close();
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
