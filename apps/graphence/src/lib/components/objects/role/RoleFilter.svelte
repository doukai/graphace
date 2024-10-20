<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { OperatorSelect, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import type { StringExpression } from '~/lib/types/schema';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { RoleInput, UserInput, GroupInput, RealmInput, RoleExpression } from '$houdini';

	export let expression: RoleExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	let value: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	let users: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	let groups: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let composites: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	let realm: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		id: StringExpression;
		name: StringExpression;
		description: StringExpression;
		users: { id: StringExpression };
		groups: { id: StringExpression };
		composites: { id: StringExpression };
		realm: { id: StringExpression };
	} = {
		id: { opr: Operator.EQ },
		name: { opr: Operator.EQ },
		description: { opr: Operator.EQ },
		users: { id: { opr: Operator.EQ } },
		groups: { id: { opr: Operator.EQ } },
		composites: { id: { opr: Operator.EQ } },
		realm: { id: { opr: Operator.EQ } }
	};
	$: if (Array.isArray(value)) {
		_expression.id.arr = value?.map((item) => item?.id);
	} else if (value) {
		_expression.id.val = value?.id;
	}
	$: if (Array.isArray(users)) {
		_expression.users.id.arr = users?.map((item) => item?.id);
	} else if (users) {
		_expression.users.id.val = users?.id;
	}
	$: if (Array.isArray(groups)) {
		_expression.groups.id.arr = groups?.map((item) => item?.id);
	} else if (groups) {
		_expression.groups.id.val = groups?.id;
	}
	$: if (Array.isArray(composites)) {
		_expression.composites.id.arr = composites?.map((item) => item?.id);
	} else if (composites) {
		_expression.composites.id.val = composites?.id;
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
			_expression.groups.id?.val ||
			(_expression.groups.id?.arr && _expression.groups.id?.arr.length > 0) ||
			_expression.groups.id.opr ==='NIL' ||
			_expression.groups.id.opr ==='NNIL'
		) {
			expression = { ...expression, groups: _expression.groups };
		} else {
			expression = { ...expression, groups: undefined };
		}
		if (
			_expression.composites.id?.val ||
			(_expression.composites.id?.arr && _expression.composites.id?.arr.length > 0) ||
			_expression.composites.id.opr ==='NIL' ||
			_expression.composites.id.opr ==='NNIL'
		) {
			expression = { ...expression, composites: _expression.composites };
		} else {
			expression = { ...expression, composites: undefined };
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
		_expression.id = { opr: Operator.EQ };
		if (Array.isArray(value)) {
			value= [];
		} else if (value) {
			value = undefined;
		}
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		_expression.users = { id: { opr: Operator.EQ } };
		if (Array.isArray(users)) {
			users = [];
		} else if (users) {
			users = undefined;
		}
		_expression.groups = { id: { opr: Operator.EQ } };
		if (Array.isArray(groups)) {
			groups = [];
		} else if (groups) {
			groups = undefined;
		}
		_expression.composites = { id: { opr: Operator.EQ } };
		if (Array.isArray(composites)) {
			composites = [];
		} else if (composites) {
			composites = undefined;
		}
		_expression.realm = { id: { opr: Operator.EQ } };
		if (Array.isArray(realm)) {
			realm = [];
		} else if (realm) {
			realm = undefined;
		}
		expression = undefined;
		dispatch('filter', {});
		$open = false;
	};
	const idOprChange = (): void => {
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
	const usersOprChange = (): void => {
		_expression.users.id.arr = [];
		_expression.users.id.val = undefined;
		if (Array.isArray(users)) {
			users = [];
		} else if (users) {
			users = undefined;
		}
	};
	const groupsOprChange = (): void => {
		_expression.groups.id.arr = [];
		_expression.groups.id.val = undefined;
		if (Array.isArray(groups)) {
			groups = [];
		} else if (groups) {
			groups = undefined;
		}
	};
	const compositesOprChange = (): void => {
		_expression.composites.id.arr = [];
		_expression.composites.id.val = undefined;
		if (Array.isArray(composites)) {
			composites = [];
		} else if (composites) {
			composites = undefined;
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
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="p-1 rounded-xl bg-base-100 shadow z-[50] max-w-xs md:max-w-md" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-2 max-h-60 overflow-y-auto">
			{#if permissions.auth('Role::id::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.id.opr}
								on:change={(e) => idOprChange()}
							/>
						</label>
					</div>
					{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
						<RoleSelect
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
						<RoleSelect
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
			{#if permissions.auth('Role::name::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.name.name()}
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
			{#if permissions.auth('Role::description::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.description.name()}
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
			{#if permissions.auth('Role::users::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.users.name()}
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
			{#if permissions.auth('Role::groups::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.groups.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.groups.id.opr}
								on:change={(e) => groupsOprChange()}
							/>
						</label>
					</div>
					{#if _expression.groups.id.opr === 'IN' || _expression.groups.id.opr === 'NIN' || _expression.groups.id.opr === 'BT' || _expression.groups.id.opr === 'NBT'}
						<GroupSelect
							name="groups"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ groups }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<GroupSelect
							name="groups"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ groups }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Role::composites::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.composites.name()}
							</span>
							<OperatorSelect
								className="md:select-sm w-full"
								bind:value={_expression.composites.id.opr}
								on:change={(e) => compositesOprChange()}
							/>
						</label>
					</div>
					{#if _expression.composites.id.opr === 'IN' || _expression.composites.id.opr === 'NIN' || _expression.composites.id.opr === 'BT' || _expression.composites.id.opr === 'NBT'}
						<RoleSelect
							name="composites"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							list
							bind:value={ composites }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{:else}
						<RoleSelect
							name="composites"
							placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
							bind:value={ composites }
							className="md:input-sm"
							containerClassName="md:min-h-8 max-w-xs"
							tagClassName="md:badge-sm"
							menuClassName="md:menu-sm"
						/>
					{/if}
				</div>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Role::realm::*')}
				<div class="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 space-x-0 md:space-x-2" transition:fade={{ duration: 100 }}>
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<div class="form-control w-full md:w-60">
						<label class="input-group md:input-group-sm">
							<span class="w-20 whitespace-nowrap">
								{$LL.graphql.objects.Role.fields.realm.name()}
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
		<div class="flex justify-center space-x-2">
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