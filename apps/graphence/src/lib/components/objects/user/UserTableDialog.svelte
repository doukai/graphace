<script lang="ts">
	import { getContext } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Dialog } from '@graphace/ui';
	import type { PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, toast } from '@graphace/ui';
	import UserTable from './UserTable.svelte';
	import { getLoadEvent } from '~/utils';
	import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import type { QueryUserConnectionArgs, UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';

	export let value: (UserInput | null | undefined)[] | null | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'p-1';
	export { className as class };

	const permissions = getContext<PermissionsStore>('permissions');

	const query_userConnection_Store = createQuery_userConnection_Store(getLoadEvent());
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let close: () => void;

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
	<svelte:fragment slot="trigger" let:trigger>
		<div class="tooltip hover:z-[{zIndex + 3}]" data-tip={$LL.ui.button.select()}>
			<button
				use:melt={trigger}
				class="btn btn-square btn-outline {className}"
				on:click={(e) => query({ first: pageSize, offset: 0 })}
			>
				<Icon src={ListBullet} class="h-5 w-5" />
			</button>
		</div>
	</svelte:fragment>
	<UserTable
		value={nodes}
		selectedIdList={value?.map((node) => node?.where?.id?.val)}
		showEditButton={true}
		showCreateButton={true}
		showSelectButton={true}
		showSearchInput={true}
		isFetching={$query_userConnection_Store.isFetching}
		fields={{
			name: {
				readonly: !permissions.auth('User::name::WRITE'),
				disabled: !permissions.auth('User::name::WRITE'),
				hidden: !permissions.auth('User::name::READ')
			},
			description: {
				readonly: !permissions.auth('User::description::WRITE'),
				disabled: !permissions.auth('User::description::WRITE'),
				hidden: !permissions.auth('User::description::READ')
			},
			lastName: {
				readonly: !permissions.auth('User::lastName::WRITE'),
				disabled: !permissions.auth('User::lastName::WRITE'),
				hidden: !permissions.auth('User::lastName::READ')
			},
			login: {
				readonly: !permissions.auth('User::login::WRITE'),
				disabled: !permissions.auth('User::login::WRITE'),
				hidden: !permissions.auth('User::login::READ')
			},
			email: {
				readonly: !permissions.auth('User::email::WRITE'),
				disabled: !permissions.auth('User::email::WRITE'),
				hidden: !permissions.auth('User::email::READ')
			},
			phones: {
				readonly: !permissions.auth('User::phones::WRITE'),
				disabled: !permissions.auth('User::phones::WRITE'),
				hidden: !permissions.auth('User::phones::READ')
			},
			disable: {
				readonly: !permissions.auth('User::disable::WRITE'),
				disabled: !permissions.auth('User::disable::WRITE'),
				hidden: !permissions.auth('User::disable::READ')
			},
			groups: {
				readonly: !permissions.auth('User::groups::WRITE'),
				disabled: !permissions.auth('User::groups::WRITE'),
				hidden: !permissions.auth('User::groups::READ')
			},
			roles: {
				readonly: !permissions.auth('User::roles::WRITE'),
				disabled: !permissions.auth('User::roles::WRITE'),
				hidden: !permissions.auth('User::roles::READ')
			},
			realm: {
				readonly: !permissions.auth('User::realm::WRITE'),
				disabled: !permissions.auth('User::realm::WRITE'),
				hidden: !permissions.auth('User::realm::READ')
			}
		}}
		on:select={(e) => {
			if (Array.isArray(e.detail.value)) {
				value = e.detail.value.map((node) => ({ where: { id: { val: node?.id } } }));
			} else {
				value = [{ where: { id: { val: e.detail.value?.id } } }];
			}
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
</Dialog>
