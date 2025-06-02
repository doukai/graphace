<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import type { Errors, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { type Option } from '@graphace/ui-graphql';
	import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { User, QueryUserConnectionArgs, UserOrderBy, UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined =
		undefined;
	export let textFieldName: (keyof User & keyof UserInput) | undefined = undefined;
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
	};

	const dispatch = createEventDispatcher<{
		select: {
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
			original: UserInput | (UserInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_userConnection_Store = createQuery_userConnection_Store(getLoadEvent());
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
	
	$: if (Array.isArray(value)) {
		if (value.some((item) => item?.id && !item?.where)) {
			value = value.map((item) => ({
				...item,
				where: { id: { val: item?.id } }
			}));
		}
		if (textFieldName) {
			if (value.some((item) => !item?.[textFieldName])) {
				query_userConnection_Store
					.fetch({
						id: { opr: 'IN', arr: value?.map((item) => item?.where?.id?.val) }
					})
					.then((response) => {
						value = response.data?.userConnection?.edges?.map((edge) => ({
							...edge?.node,
							where: { id: { val: edge?.node?.id } }
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
		if (value?.id && !value.where) {
			value = { ...value, where: { id: { val: value.id } } };
		}
		if (textFieldName) {
			if (!value?.[textFieldName]) {
				query_userConnection_Store
					.fetch({
						id: { opr: 'EQ', val: value.where?.id?.val }
					})
					.then((response) => {
						value = response.data?.userConnection?.edges?.map((edge) => ({
							...edge?.node,
							where: { id: { val: edge?.node?.id } }
						}))?.[0];
						if (value) {
							if (selectedIdList?.length === 0) {
								selectedIdList = [value?.where?.id?.val];
							}
							text = value?.[textFieldName] + '';
						}
					});
			} else {
				if (selectedIdList?.length === 0) {
					selectedIdList = [value?.where?.id?.val];
				}
				text = value?.[textFieldName] + '';
			}
		} else {
			if (selectedIdList?.length === 0) {
				selectedIdList = [value?.where?.id?.val];
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
		<UserTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || (selectedIdList?.length || 0) <= 1)}
			isFetching={$query_userConnection_Store.isFetching}
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
						where: { id: { val: item?.id } }
					}));
				} else if (original) {
					if (textFieldName) {
						text = original?.[textFieldName] + '';
					} 
					value = { ...original, where: { id: { val: original.id } } };
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
			on:query={(e) => query()}
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
