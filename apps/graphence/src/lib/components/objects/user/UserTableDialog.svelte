<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ListBullet } from '@steeze-ui/heroicons';
	import type { Errors, PermissionsStore } from '@graphace/commons';
	import { buildArguments } from '@graphace/graphql';
	import { to, Pagination, Dialog, toast } from '@graphace/ui';
	import { createQuery_userConnection_Store } from '~/lib/stores/query/query_userConnection_store';
	import UserTable from '~/lib/components/objects/user/UserTable.svelte';
	import { getLoadEvent } from '~/utils';
	import type { QueryUserConnectionArgs, UserOrderBy, UserInput } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
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
			value: UserInput | (UserInput | null | undefined)[] | null | undefined;
		};
	}>();

	const query_userConnection_Store = createQuery_userConnection_Store(getLoadEvent());
	$: nodes = $query_userConnection_Store.response.data?.userConnection?.edges?.map(
		(edge) => edge?.node
	);
	$: totalCount = $query_userConnection_Store.response.data?.userConnection?.totalCount || 0;
	let args: QueryUserConnectionArgs = {};
	let orderBy: UserOrderBy = {};
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
		value = value.map((item) => ({ where: { id: { val: item?.id } } }));
		selectedIdList = value?.map((node) => node?.where?.id?.val);
	} else if (value) {
		if (textFieldName) {
			text = value?.[textFieldName];
		}
		value = { where: { id: { val: value.id } } };
		selectedIdList = [value.where?.id?.val];
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
		<UserTable
			value={nodes}
			bind:selectedIdList
			bind:args
			bind:orderBy
			showEditButton={!readonly}
			showCreateButton={!readonly}
			showSelectButton={!readonly && (!singleChoice || selectedIdList?.length === 1)}
			isFetching={$query_userConnection_Store.isFetching}
			{zIndex}
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
					if (singleChoice) {
						value = { where: { id: { val: e.detail.value?.[0]?.id } } };
						if (textFieldName) {
							text = e.detail.value?.[0]?.[textFieldName];
						}
					} else {
						value = e.detail.value.map((node) => ({ where: { id: { val: node?.id } } }));
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
					value = { where: { id: { val: e.detail.value?.id } } };
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
