<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { QueryUserConnectionArgs, UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	export let singleChoice: boolean | undefined = false;
	export let readonly = false;
	export let disabled = false;
	let className: string | undefined = 'p-1';
	export { className as class };
	const permissions = getContext<PermissionsStore>('permissions');

	const dispatch = createEventDispatcher<{
		select: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_userConnection_Store = createQuery_userConnection_Store(getLoadEvent());
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let selectedIdList: (string | null | undefined)[] | undefined = [];
	let close: () => void;

	if (Array.isArray(value)) {
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
		selectedIdList = value?.map((node) => node?.where?.id?.val);
	} else if (value) {
		value = { where: { id: { val: value.id } } };
		selectedIdList = [value.where?.id?.val];
	}

	$: if (Array.isArray(value)) {
		selectedIdList = value?.map((node) => node?.where?.id?.val);
	} else if (value) {
		selectedIdList = [value.where?.id?.val];
	}

	const query = (args: QueryUserConnectionArgs) => {
		query_userConnection_Store.fetch(args).then((result) => {
			if (result.errors) {
				console.error(result.errors);
				toast.error($LL.graphence.message.requestFailed());
			}
		});
	};
</script>

<Dialog bind:close>
	<div class="flex items-center" slot="trigger" let:trigger let:zIndex>
		<div class="tooltip hover:z-[{zIndex + 3}]" data-tip={$LL.ui.button.select()}>
			<button
				use:melt={trigger}
				class="btn btn-square btn-outline {className}"
				{disabled}
				on:click={(e) => query({ first: pageSize, offset: 0 })}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
	</div>
	<svelte:fragment let:zIndex>
		<UserTable
			value={nodes}
			bind:selectedIdList
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || selectedIdList?.length === 1)}
			isFetching={$query_userConnection_Store.isFetching}
			{zIndex}
			fields={{
				name: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::name::READ')
				},
				description: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::description::READ')
				},
				lastName: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::lastName::READ')
				},
				login: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::login::READ')
				},
				email: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::email::READ')
				},
				phones: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::phones::READ')
				},
				disable: {
					readonly: true,
					disabled: true,
					hidden: !permissions.auth('User::disable::READ')
				},
				groups: {
					hidden: true
				},
				roles: {
					hidden: true
				},
				realm: {
					hidden: true
				}
			}}
			on:select={(e) => {
				if (Array.isArray(e.detail.value)) {
					if (singleChoice) {
						value = [{ where: { id: { val: e.detail.value?.[0]?.id } } }];
					} else {
						value = e.detail.value.map((node) => ({ where: { id: { val: node?.id } } }));
					}
				} else {
					value = [{ where: { id: { val: e.detail.value?.id } } }];
				}
				dispatch('select', { value });
				close();
			}}
			on:search={(e) => {
				if (e.detail.value) {
					query({
						cond: 'OR',
						name: { opr: 'LK', val: e.detail.value },
						description: { opr: 'LK', val: e.detail.value },
						lastName: { opr: 'LK', val: e.detail.value },
						login: { opr: 'LK', val: e.detail.value },
						email: { opr: 'LK', val: e.detail.value },
						phones: { opr: 'LK', val: e.detail.value },
						first: pageSize,
						offset: 0
					});
				} else {
					query({ first: pageSize, offset: 0 });
				}
			}}
			on:query={(e) => {
				e.detail.args = buildArguments(e.detail.args);
				if (Object.keys(e.detail.orderBy).length > 0) {
					e.detail.args.orderBy = e.detail.orderBy;
				}
				query(e.detail.args);
			}}
			on:edit={(e) => {
				if (e.detail.value && !Array.isArray(e.detail.value)) {
					to(`./user/${e.detail.value.id}`);
				}
			}}
			on:create={(e) => to('./user/_')}
		/>
		<div class="divider" />
		<Pagination
			bind:pageSize
			bind:pageNumber
			{totalCount}
			on:pageChange={(e) => query({ first: pageSize, offset: (pageNumber - 1) * pageSize })}
			on:sizeChange={(e) => query({ first: pageSize, offset: 0 })}
		/>
	</svelte:fragment>
</Dialog>
