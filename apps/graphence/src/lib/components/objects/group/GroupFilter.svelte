<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { OperatorSelect, StringInput, IntInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput, UserInput, RoleInput, RealmInput, StringExpression, IntExpression, GroupExpression } from '~/lib/types/schema';

	export let expression: GroupExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let parent: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let subGroups: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let users: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	let roles: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	let realm: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		id: StringExpression;
		name: StringExpression;
		description: StringExpression;
		path: StringExpression;
		deep: IntExpression;
		parentId: StringExpression;
		parent: { id: StringExpression };
		subGroups: { id: StringExpression };
		users: { id: StringExpression };
		roles: { id: StringExpression };
		realm: { id: StringExpression };
	} = {
		id: { opr: 'EQ' },
		name: { opr: 'EQ' },
		description: { opr: 'EQ' },
		path: { opr: 'EQ' },
		deep: { opr: 'EQ' },
		parentId: { opr: 'EQ' },
		parent: { id: { opr: 'EQ' } },
		subGroups: { id: { opr: 'EQ' } },
		users: { id: { opr: 'EQ' } },
		roles: { id: { opr: 'EQ' } },
		realm: { id: { opr: 'EQ' } }
	};
	$: if (Array.isArray(value)) {
		_expression.id.arr = value?.map((item) => item?.id);
	} else if (value) {
		_expression.id.val = value?.id;
	}
	$: if (Array.isArray(parent)) {
		_expression.parent.id.arr = parent?.map((item) => item?.id);
	} else if (parent) {
		_expression.parent.id.val = parent?.id;
	}
	$: if (Array.isArray(subGroups)) {
		_expression.subGroups.id.arr = subGroups?.map((item) => item?.id);
	} else if (subGroups) {
		_expression.subGroups.id.val = subGroups?.id;
	}
	$: if (Array.isArray(users)) {
		_expression.users.id.arr = users?.map((item) => item?.id);
	} else if (users) {
		_expression.users.id.val = users?.id;
	}
	$: if (Array.isArray(roles)) {
		_expression.roles.id.arr = roles?.map((item) => item?.id);
	} else if (roles) {
		_expression.roles.id.val = roles?.id;
	}
	$: if (Array.isArray(realm)) {
		_expression.realm.id.arr = realm?.map((item) => item?.id);
	} else if (realm) {
		_expression.realm.id.val = realm?.id;
	}
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (
			_expression.id.val ||
			(_expression.id.arr && _expression.id.arr.length > 0) ||
			_expression.id.opr ==='NIL' ||
			_expression.id.opr ==='NNIL'
		) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (
			_expression.name.val ||
			(_expression.name.arr && _expression.name.arr.length > 0) ||
			_expression.name.opr ==='NIL' ||
			_expression.name.opr ==='NNIL'
		) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (
			_expression.description.val ||
			(_expression.description.arr && _expression.description.arr.length > 0) ||
			_expression.description.opr ==='NIL' ||
			_expression.description.opr ==='NNIL'
		) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		if (
			_expression.path.val ||
			(_expression.path.arr && _expression.path.arr.length > 0) ||
			_expression.path.opr ==='NIL' ||
			_expression.path.opr ==='NNIL'
		) {
			expression = { ...expression, path: _expression.path };
		} else {
			expression = { ...expression, path: undefined };
		}
		if (
			_expression.deep.val ||
			(_expression.deep.arr && _expression.deep.arr.length > 0) ||
			_expression.deep.opr ==='NIL' ||
			_expression.deep.opr ==='NNIL'
		) {
			expression = { ...expression, deep: _expression.deep };
		} else {
			expression = { ...expression, deep: undefined };
		}
		if (
			_expression.parentId.val ||
			(_expression.parentId.arr && _expression.parentId.arr.length > 0) ||
			_expression.parentId.opr ==='NIL' ||
			_expression.parentId.opr ==='NNIL'
		) {
			expression = { ...expression, parentId: _expression.parentId };
		} else {
			expression = { ...expression, parentId: undefined };
		}
		if (
			_expression.parent.id?.val ||
			(_expression.parent.id?.arr && _expression.parent.id?.arr.length > 0) ||
			_expression.parent.id.opr ==='NIL' ||
			_expression.parent.id.opr ==='NNIL'
		) {
			expression = { ...expression, parent: _expression.parent };
		} else {
			expression = { ...expression, parent: undefined };
		}
		if (
			_expression.subGroups.id?.val ||
			(_expression.subGroups.id?.arr && _expression.subGroups.id?.arr.length > 0) ||
			_expression.subGroups.id.opr ==='NIL' ||
			_expression.subGroups.id.opr ==='NNIL'
		) {
			expression = { ...expression, subGroups: _expression.subGroups };
		} else {
			expression = { ...expression, subGroups: undefined };
		}
		if (
			_expression.users.id?.val ||
			(_expression.users.id?.arr && _expression.users.id?.arr.length > 0) ||
			_expression.users.id.opr ==='NIL' ||
			_expression.users.id.opr ==='NNIL'
		) {
			expression = { ...expression, users: _expression.users };
		} else {
			expression = { ...expression, users: undefined };
		}
		if (
			_expression.roles.id?.val ||
			(_expression.roles.id?.arr && _expression.roles.id?.arr.length > 0) ||
			_expression.roles.id.opr ==='NIL' ||
			_expression.roles.id.opr ==='NNIL'
		) {
			expression = { ...expression, roles: _expression.roles };
		} else {
			expression = { ...expression, roles: undefined };
		}
		if (
			_expression.realm.id?.val ||
			(_expression.realm.id?.arr && _expression.realm.id?.arr.length > 0) ||
			_expression.realm.id.opr ==='NIL' ||
			_expression.realm.id.opr ==='NNIL'
		) {
			expression = { ...expression, realm: _expression.realm };
		} else {
			expression = { ...expression, realm: undefined };
		}
		
		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		_expression.id = { opr: 'EQ' };
		if (Array.isArray(value)) {
			value= [];
		} else if (value) {
			value = undefined;
		}
		_expression.name = { opr: 'EQ' };
		_expression.description = { opr: 'EQ' };
		_expression.path = { opr: 'EQ' };
		_expression.deep = { opr: 'EQ' };
		_expression.parentId = { opr: 'EQ' };
		_expression.parent = { id: { opr: 'EQ' } };
		if (Array.isArray(parent)) {
			parent = [];
		} else if (parent) {
			parent = undefined;
		}
		_expression.subGroups = { id: { opr: 'EQ' } };
		if (Array.isArray(subGroups)) {
			subGroups = [];
		} else if (subGroups) {
			subGroups = undefined;
		}
		_expression.users = { id: { opr: 'EQ' } };
		if (Array.isArray(users)) {
			users = [];
		} else if (users) {
			users = undefined;
		}
		_expression.roles = { id: { opr: 'EQ' } };
		if (Array.isArray(roles)) {
			roles = [];
		} else if (roles) {
			roles = undefined;
		}
		_expression.realm = { id: { opr: 'EQ' } };
		if (Array.isArray(realm)) {
			realm = [];
		} else if (realm) {
			realm = undefined;
		}
		expression = undefined;
		dispatch('filter', {});
		$open = false;
	};
	const oprChange = (): void => {
		_expression.id.arr = [];
		_expression.id.val = undefined;
		if (Array.isArray(value)) {
			value = [];
		} else if (value) {
			value = undefined;
		}
	};
	const nameOprChange = (): void => {
		_expression.name.arr = [];
		_expression.name.val = undefined;
	};
	const descriptionOprChange = (): void => {
		_expression.description.arr = [];
		_expression.description.val = undefined;
	};
	const pathOprChange = (): void => {
		_expression.path.arr = [];
		_expression.path.val = undefined;
	};
	const deepOprChange = (): void => {
		_expression.deep.arr = [];
		_expression.deep.val = undefined;
	};
	const parentIdOprChange = (): void => {
		_expression.parentId.arr = [];
		_expression.parentId.val = undefined;
	};
	const parentOprChange = (): void => {
		_expression.parent.id.arr = [];
		_expression.parent.id.val = undefined;
		if (Array.isArray(parent)) {
			parent = [];
		} else if (parent) {
			parent = undefined;
		}
	};
	const subGroupsOprChange = (): void => {
		_expression.subGroups.id.arr = [];
		_expression.subGroups.id.val = undefined;
		if (Array.isArray(subGroups)) {
			subGroups = [];
		} else if (subGroups) {
			subGroups = undefined;
		}
	};
	const usersOprChange = (): void => {
		_expression.users.id.arr = [];
		_expression.users.id.val = undefined;
		if (Array.isArray(users)) {
			users = [];
		} else if (users) {
			users = undefined;
		}
	};
	const rolesOprChange = (): void => {
		_expression.roles.id.arr = [];
		_expression.roles.id.val = undefined;
		if (Array.isArray(roles)) {
			roles = [];
		} else if (roles) {
			roles = undefined;
		}
	};
	const realmOprChange = (): void => {
		_expression.realm.id.arr = [];
		_expression.realm.id.val = undefined;
		if (Array.isArray(realm)) {
			realm = [];
		} else if (realm) {
			realm = undefined;
		}
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true
	});
</script>

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[100]" />
	<div class="p-1 rounded-xl bg-base-200 shadow z-[100]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			{#if permissions.auth('Group::id::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.id.opr}
								on:change={(e) => oprChange()}
							/>
						</label>
					</div>
					{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
						<GroupSelect
							name="id"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<GroupSelect
							name="id"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::name::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.name.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.name.opr}
								on:change={(e) => nameOprChange()}
							/>
						</label>
					</div>
					{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="name"
							bind:value={_expression.name.arr}
							list
						/>
					{:else}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="name"
							bind:value={_expression.name.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::description::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.description.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.description.opr}
								on:change={(e) => descriptionOprChange()}
							/>
						</label>
					</div>
					{#if _expression.description.opr === 'IN' || _expression.description.opr === 'NIN' || _expression.description.opr === 'BT' || _expression.description.opr === 'NBT'}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="description"
							bind:value={_expression.description.arr}
							list
						/>
					{:else}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="description"
							bind:value={_expression.description.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::path::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.path.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.path.opr}
								on:change={(e) => pathOprChange()}
							/>
						</label>
					</div>
					{#if _expression.path.opr === 'IN' || _expression.path.opr === 'NIN' || _expression.path.opr === 'BT' || _expression.path.opr === 'NBT'}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="path"
							bind:value={_expression.path.arr}
							list
						/>
					{:else}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="path"
							bind:value={_expression.path.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::deep::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.deep.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.deep.opr}
								on:change={(e) => deepOprChange()}
							/>
						</label>
					</div>
					{#if _expression.deep.opr === 'IN' || _expression.deep.opr === 'NIN' || _expression.deep.opr === 'BT' || _expression.deep.opr === 'NBT'}
						<IntInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="deep"
							bind:value={_expression.deep.arr}
							list
						/>
					{:else}
						<IntInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="deep"
							bind:value={_expression.deep.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::parentId::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.parentId.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.parentId.opr}
								on:change={(e) => parentIdOprChange()}
							/>
						</label>
					</div>
					{#if _expression.parentId.opr === 'IN' || _expression.parentId.opr === 'NIN' || _expression.parentId.opr === 'BT' || _expression.parentId.opr === 'NBT'}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="parentId"
							bind:value={_expression.parentId.arr}
							list
						/>
					{:else}
						<StringInput
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							className="md:input-sm"
							addBtnClassName="md:btn-sm"
							name="parentId"
							bind:value={_expression.parentId.val}
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::parent::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.parent.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.parent.id.opr}
								on:change={(e) => parentOprChange()}
							/>
						</label>
					</div>
					{#if _expression.parent.id.opr === 'IN' || _expression.parent.id.opr === 'NIN' || _expression.parent.id.opr === 'BT' || _expression.parent.id.opr === 'NBT'}
						<GroupSelect
							name="parent"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ parent }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<GroupSelect
							name="parent"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ parent }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.subGroups.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.subGroups.id.opr}
								on:change={(e) => subGroupsOprChange()}
							/>
						</label>
					</div>
					{#if _expression.subGroups.id.opr === 'IN' || _expression.subGroups.id.opr === 'NIN' || _expression.subGroups.id.opr === 'BT' || _expression.subGroups.id.opr === 'NBT'}
						<GroupSelect
							name="subGroups"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ subGroups }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<GroupSelect
							name="subGroups"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ subGroups }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::users::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.users.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.users.id.opr}
								on:change={(e) => usersOprChange()}
							/>
						</label>
					</div>
					{#if _expression.users.id.opr === 'IN' || _expression.users.id.opr === 'NIN' || _expression.users.id.opr === 'BT' || _expression.users.id.opr === 'NBT'}
						<UserSelect
							name="users"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ users }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<UserSelect
							name="users"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ users }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::roles::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.roles.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.roles.id.opr}
								on:change={(e) => rolesOprChange()}
							/>
						</label>
					</div>
					{#if _expression.roles.id.opr === 'IN' || _expression.roles.id.opr === 'NIN' || _expression.roles.id.opr === 'BT' || _expression.roles.id.opr === 'NBT'}
						<RoleSelect
							name="roles"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ roles }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<RoleSelect
							name="roles"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ roles }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::realm::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-1" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Group.fields.realm.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.realm.id.opr}
								on:change={(e) => realmOprChange()}
							/>
						</label>
					</div>
					{#if _expression.realm.id.opr === 'IN' || _expression.realm.id.opr === 'NIN' || _expression.realm.id.opr === 'BT' || _expression.realm.id.opr === 'NBT'}
						<RealmSelect
							name="realm"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ realm }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<RealmSelect
							name="realm"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ realm }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
		</div>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button class="btn btn-square btn-primary md:btn-sm" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error md:btn-sm" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}