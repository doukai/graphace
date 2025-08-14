<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_roleConnection_Store } from '~/lib/stores/query/query_roleConnection_store';
	import RoleTable from '~/lib/components/objects/role/RoleTable.svelte';
	import { loadEvent, permissions } from '~/utils';
	import type { Role, QueryRoleConnectionArgs, RoleOrderBy, RoleInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof Role & keyof RoleInput) | undefined = undefined;
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
		users?: Option | undefined;
		groups?: Option | undefined;
		composites?: Option | undefined;
		permissions?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: {
			readonly: !auth('Role::name::WRITE'),
			disabled: !auth('Role::name::WRITE'),
			hidden: !auth('Role::name::READ')
		},
		description: {
			readonly: !auth('Role::description::WRITE'),
			disabled: !auth('Role::description::WRITE'),
			hidden: !auth('Role::description::READ')
		},
		users: {
			readonly: !auth('Role::users::WRITE'),
			disabled: !auth('Role::users::WRITE'),
			hidden: !auth('Role::users::READ')
		},
		groups: {
			readonly: !auth('Role::groups::WRITE'),
			disabled: !auth('Role::groups::WRITE'),
			hidden: !auth('Role::groups::READ')
		},
		composites: {
			readonly: !auth('Role::composites::WRITE'),
			disabled: !auth('Role::composites::WRITE'),
			hidden: !auth('Role::composites::READ')
		},
		permissions: {
			readonly: !auth('Role::permissions::WRITE'),
			disabled: !auth('Role::permissions::WRITE'),
			hidden: !auth('Role::permissions::READ')
		},
		realm: {
			readonly: !auth('Role::realm::WRITE'),
			disabled: !auth('Role::realm::WRITE'),
			hidden: !auth('Role::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: RoleInput | (RoleInput | null | undefined)[] | null | undefined };
	}>();

	const query_roleConnection_Store = createQuery_roleConnection_Store($loadEvent);
	$: nodes = $query_roleConnection_Store.response.data?.roleConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_roleConnection_Store.response.data?.roleConnection?.totalCount || 0;
	export let args: QueryRoleConnectionArgs = {};
	export let orderBy: RoleOrderBy = {};
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let selectedIdList: (string | null | undefined)[] | undefined = [];
	export let close: (() => void) | undefined = undefined;
	
	$: if (textFieldName) {
		if (Array.isArray(value)) {
			if (value.some((item) => !item?.[textFieldName])) {
				query_roleConnection_Store
					.fetch({
						id: { opr: 'IN', arr: value?.map((item) => item?.id) }
					})
					.then((response) => {
						value = response.data?.roleConnection?.edges?.map((edge) => ({
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
				query_roleConnection_Store
					.fetch({
						id: { opr: 'EQ', val: value.id }
					})
					.then((response) => {
						value = response.data?.roleConnection?.edges?.map((edge) => ({
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
		query_roleConnection_Store.fetch(buildArguments(args)).then((result) => {
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
		<RoleTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) === 1)}
			isFetching={$query_roleConnection_Store.isFetching}
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
					to(`./role/${e.detail.value.id}`);
				}
			}}
			on:create={(e) => to('./role/_')}
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
