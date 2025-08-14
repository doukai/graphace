<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import { loadEvent, permissions } from '~/utils';
	import type { User, QueryUserConnectionArgs, UserOrderBy, UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof User & keyof UserInput) | undefined = undefined;
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
		lastName?: Option | undefined;
		login?: Option | undefined;
		email?: Option | undefined;
		phones?: Option | undefined;
		disable?: Option | undefined;
		groups?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: {
			readonly: !auth('User::name::WRITE'),
			disabled: !auth('User::name::WRITE'),
			hidden: !auth('User::name::READ')
		},
		description: {
			readonly: !auth('User::description::WRITE'),
			disabled: !auth('User::description::WRITE'),
			hidden: !auth('User::description::READ')
		},
		lastName: {
			readonly: !auth('User::lastName::WRITE'),
			disabled: !auth('User::lastName::WRITE'),
			hidden: !auth('User::lastName::READ')
		},
		login: {
			readonly: !auth('User::login::WRITE'),
			disabled: !auth('User::login::WRITE'),
			hidden: !auth('User::login::READ')
		},
		email: {
			readonly: !auth('User::email::WRITE'),
			disabled: !auth('User::email::WRITE'),
			hidden: !auth('User::email::READ')
		},
		phones: {
			readonly: !auth('User::phones::WRITE'),
			disabled: !auth('User::phones::WRITE'),
			hidden: !auth('User::phones::READ')
		},
		disable: {
			readonly: !auth('User::disable::WRITE'),
			disabled: !auth('User::disable::WRITE'),
			hidden: !auth('User::disable::READ')
		},
		groups: {
			readonly: !auth('User::groups::WRITE'),
			disabled: !auth('User::groups::WRITE'),
			hidden: !auth('User::groups::READ')
		},
		roles: {
			readonly: !auth('User::roles::WRITE'),
			disabled: !auth('User::roles::WRITE'),
			hidden: !auth('User::roles::READ')
		},
		realm: {
			readonly: !auth('User::realm::WRITE'),
			disabled: !auth('User::realm::WRITE'),
			hidden: !auth('User::realm::READ')
		}
	};

	const dispatch = createEventDispatcher<{
		select: { value: UserInput | (UserInput | null | undefined)[] | null | undefined };
	}>();

	const query_userConnection_Store = createQuery_userConnection_Store($loadEvent);
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	export let args: QueryUserConnectionArgs = {};
	export let orderBy: UserOrderBy = {};
	export let pageNumber: number = 1;
	export let pageSize: number = 10;
	export let selectedIdList: (string | null | undefined)[] | undefined = [];
	export let close: (() => void) | undefined = undefined;
	
	$: if (textFieldName) {
		if (Array.isArray(value)) {
			if (value.some((item) => !item?.[textFieldName])) {
				query_userConnection_Store
					.fetch({
						id: { opr: 'IN', arr: value?.map((item) => item?.id) }
					})
					.then((response) => {
						value = response.data?.userConnection?.edges?.map((edge) => ({
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
				query_userConnection_Store
					.fetch({
						id: { opr: 'EQ', val: value.id }
					})
					.then((response) => {
						value = response.data?.userConnection?.edges?.map((edge) => ({
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
		query_userConnection_Store.fetch(buildArguments(args)).then((result) => {
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
		<UserTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) === 1)}
			isFetching={$query_userConnection_Store.isFetching}
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
						lastName: { opr: 'LK', val: e.detail.value },
						login: { opr: 'LK', val: e.detail.value },
						email: { opr: 'LK', val: e.detail.value },
						phones: { opr: 'LK', val: e.detail.value },
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
			on:pageChange={(e) => query()}
			on:sizeChange={(e) => query(1)}
		/>
	</svelte:fragment>
</Dialog>
