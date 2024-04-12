<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, StringInput, IntInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression, IntExpression } from '~/lib/types/schema';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import parentSelect from '~/lib/components/objects/parent/parentSelect.svelte';
	import subGroupsSelect from '~/lib/components/objects/sub-groups/subGroupsSelect.svelte';
	import usersSelect from '~/lib/components/objects/users/usersSelect.svelte';
	import rolesSelect from '~/lib/components/objects/roles/rolesSelect.svelte';
	import realmSelect from '~/lib/components/objects/realm/realmSelect.svelte';
	import LL from '$i18n/i18n-svelte';
	import { Operator } from '$houdini';
	import type { GroupInput, parentInput, subGroupsInput, usersInput, rolesInput, realmInput, GroupExpression } from '$houdini';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: GroupExpression | null | undefined;
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
		id: { opr: Operator.EQ },
		name: { opr: Operator.EQ },
		description: { opr: Operator.EQ },
		path: { opr: Operator.EQ },
		deep: { opr: Operator.EQ },
		parentId: { opr: Operator.EQ },
		parent: { id: { opr: Operator.EQ } },
		subGroups: { id: { opr: Operator.EQ } },
		users: { id: { opr: Operator.EQ } },
		roles: { id: { opr: Operator.EQ } },
		realm: { id: { opr: Operator.EQ } }
	};
	$: if (Array.isArray(value)) {
		_expression.id.in = value?.map((item) => item?.where?.id?.val);
	} else if (value) {
		_expression.id.val = value?.where?.id?.val;
	}
	$: if (Array.isArray(parent)) {
		_expression.parent.id.in = parent?.map((item) => item?.where?.id?.val);
	} else if (parent) {
		_expression.parent.id.val = parent?.where?.id?.val;
	}
	$: if (Array.isArray(subGroups)) {
		_expression.subGroups.id.in = subGroups?.map((item) => item?.where?.id?.val);
	} else if (subGroups) {
		_expression.subGroups.id.val = subGroups?.where?.id?.val;
	}
	$: if (Array.isArray(users)) {
		_expression.users.id.in = users?.map((item) => item?.where?.id?.val);
	} else if (users) {
		_expression.users.id.val = users?.where?.id?.val;
	}
	$: if (Array.isArray(roles)) {
		_expression.roles.id.in = roles?.map((item) => item?.where?.id?.val);
	} else if (roles) {
		_expression.roles.id.val = roles?.where?.id?.val;
	}
	$: if (Array.isArray(realm)) {
		_expression.realm.id.in = realm?.map((item) => item?.where?.id?.val);
	} else if (realm) {
		_expression.realm.id.val = realm?.where?.id?.val;
	}

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.id.val || (_expression.id.in && _expression.id.in.length > 0)) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (_expression.name.val || (_expression.name.in && _expression.name.in.length > 0)) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.description.val || (_expression.description.in && _expression.description.in.length > 0)) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		if (_expression.path.val || (_expression.path.in && _expression.path.in.length > 0)) {
			expression = { ...expression, path: _expression.path };
		} else {
			expression = { ...expression, path: undefined };
		}
		if (_expression.deep.val || (_expression.deep.in && _expression.deep.in.length > 0)) {
			expression = { ...expression, deep: _expression.deep };
		} else {
			expression = { ...expression, deep: undefined };
		}
		if (_expression.parentId.val || (_expression.parentId.in && _expression.parentId.in.length > 0)) {
			expression = { ...expression, parentId: _expression.parentId };
		} else {
			expression = { ...expression, parentId: undefined };
		}
		if (
			_expression.parent.id?.val ||
			(_expression.parent.id?.in && _expression.parent.id?.in.length > 0)
		) {
			expression = { ...expression, parent: _expression.parent };
		} else {
			expression = { ...expression, parent: undefined };
		}
		if (
			_expression.subGroups.id?.val ||
			(_expression.subGroups.id?.in && _expression.subGroups.id?.in.length > 0)
		) {
			expression = { ...expression, subGroups: _expression.subGroups };
		} else {
			expression = { ...expression, subGroups: undefined };
		}
		if (
			_expression.users.id?.val ||
			(_expression.users.id?.in && _expression.users.id?.in.length > 0)
		) {
			expression = { ...expression, users: _expression.users };
		} else {
			expression = { ...expression, users: undefined };
		}
		if (
			_expression.roles.id?.val ||
			(_expression.roles.id?.in && _expression.roles.id?.in.length > 0)
		) {
			expression = { ...expression, roles: _expression.roles };
		} else {
			expression = { ...expression, roles: undefined };
		}
		if (
			_expression.realm.id?.val ||
			(_expression.realm.id?.in && _expression.realm.id?.in.length > 0)
		) {
			expression = { ...expression, realm: _expression.realm };
		} else {
			expression = { ...expression, realm: undefined };
		}
		
		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter');
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.id = { opr: Operator.EQ };
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		_expression.path = { opr: Operator.EQ };
		_expression.deep = { opr: Operator.EQ };
		_expression.parentId = { opr: Operator.EQ };
		_expression.parent = { id: { opr: Operator.EQ } };
		_expression.subGroups = { id: { opr: Operator.EQ } };
		_expression.users = { id: { opr: Operator.EQ } };
		_expression.roles = { id: { opr: Operator.EQ } };
		_expression.realm = { id: { opr: Operator.EQ } };
		expression = undefined;
		dispatch('filter');
		tippyElement._tippy.hide();
	};
	const idOprChange = (): void => {
		_expression.id.in = [];
		_expression.id.val = undefined;
	};
	const nameOprChange = (): void => {
		_expression.name.in = [];
		_expression.name.val = undefined;
	};
	const descriptionOprChange = (): void => {
		_expression.description.in = [];
		_expression.description.val = undefined;
	};
	const pathOprChange = (): void => {
		_expression.path.in = [];
		_expression.path.val = undefined;
	};
	const deepOprChange = (): void => {
		_expression.deep.in = [];
		_expression.deep.val = undefined;
	};
	const parentIdOprChange = (): void => {
		_expression.parentId.in = [];
		_expression.parentId.val = undefined;
	};
	const parentOprChange = (): void => {
		_expression.parent.id.in = [];
		_expression.parent.id.val = undefined;
	};
	const subGroupsOprChange = (): void => {
		_expression.subGroups.id.in = [];
		_expression.subGroups.id.val = undefined;
	};
	const usersOprChange = (): void => {
		_expression.users.id.in = [];
		_expression.users.id.val = undefined;
	};
	const rolesOprChange = (): void => {
		_expression.roles.id.in = [];
		_expression.roles.id.val = undefined;
	};
	const realmOprChange = (): void => {
		_expression.realm.id.in = [];
		_expression.realm.id.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			{#if permissions.auth('Group::id::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.id.opr}
					on:change={(e) => idOprChange()}
				/>
			</div>
			{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
				<GroupSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value
				/>
			{:else}
				<GroupSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value />
			{/if}
			{/if}
			{#if permissions.auth('Group::name::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.name.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.name.opr}
					on:change={(e) => nameOprChange()}
				/>
			</div>
			{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::description::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.description.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.description.opr}
					on:change={(e) => descriptionOprChange()}
				/>
			</div>
			{#if _expression.description.opr === 'IN' || _expression.description.opr === 'NIN' || _expression.description.opr === 'BT' || _expression.description.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.description.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.description.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::path::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.path.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.path.opr}
					on:change={(e) => pathOprChange()}
				/>
			</div>
			{#if _expression.path.opr === 'IN' || _expression.path.opr === 'NIN' || _expression.path.opr === 'BT' || _expression.path.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.path.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.path.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.deep.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.deep.opr}
					on:change={(e) => deepOprChange()}
				/>
			</div>
			{#if _expression.deep.opr === 'IN' || _expression.deep.opr === 'NIN' || _expression.deep.opr === 'BT' || _expression.deep.opr === 'NBT'}
				<IntInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.deep.in}
				/>
			{:else}
				<IntInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.deep.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.parentId.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.parentId.opr}
					on:change={(e) => parentIdOprChange()}
				/>
			</div>
			{#if _expression.parentId.opr === 'IN' || _expression.parentId.opr === 'NIN' || _expression.parentId.opr === 'BT' || _expression.parentId.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.parentId.in}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.parentId.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Group::parent::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.parent.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.parent.id.opr}
					on:change={(e) => parentOprChange()}
				/>
			</div>
			{#if _expression.parent.id.opr === 'IN' || _expression.parent.id.opr === 'NIN' || _expression.parent.id.opr === 'BT' || _expression.parent.id.opr === 'NBT'}
				<GroupSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ parent }
				/>
			{:else}
				<GroupSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ parent } />
			{/if}
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.subGroups.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.subGroups.id.opr}
					on:change={(e) => subGroupsOprChange()}
				/>
			</div>
			{#if _expression.subGroups.id.opr === 'IN' || _expression.subGroups.id.opr === 'NIN' || _expression.subGroups.id.opr === 'BT' || _expression.subGroups.id.opr === 'NBT'}
				<GroupSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ subGroups }
				/>
			{:else}
				<GroupSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ subGroups } />
			{/if}
			{/if}
			{#if permissions.auth('Group::users::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.users.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.users.id.opr}
					on:change={(e) => usersOprChange()}
				/>
			</div>
			{#if _expression.users.id.opr === 'IN' || _expression.users.id.opr === 'NIN' || _expression.users.id.opr === 'BT' || _expression.users.id.opr === 'NBT'}
				<UserSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ users }
				/>
			{:else}
				<UserSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ users } />
			{/if}
			{/if}
			{#if permissions.auth('Group::roles::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.roles.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.roles.id.opr}
					on:change={(e) => rolesOprChange()}
				/>
			</div>
			{#if _expression.roles.id.opr === 'IN' || _expression.roles.id.opr === 'NIN' || _expression.roles.id.opr === 'BT' || _expression.roles.id.opr === 'NBT'}
				<RoleSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ roles }
				/>
			{:else}
				<RoleSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ roles } />
			{/if}
			{/if}
			{#if permissions.auth('Group::realm::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Group.fields.realm.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.realm.id.opr}
					on:change={(e) => realmOprChange()}
				/>
			</div>
			{#if _expression.realm.id.opr === 'IN' || _expression.realm.id.opr === 'NIN' || _expression.realm.id.opr === 'BT' || _expression.realm.id.opr === 'NBT'}
				<RealmSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ realm }
				/>
			{:else}
				<RealmSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ realm } />
			{/if}
			{/if}
		</div>
		<div class="flex justify-center space-x-2">
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.filter()}>
				<button class="btn btn-square btn-primary" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.uiGraphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
</div>

<td>
	<a
		class="link group inline-flex"
		href={null}
		use:tippy={{
			content,
			placement: 'bottom',
			interactive: true,
			arrow: true,
			trigger: 'click',
			interactiveBorder: 30,
			theme: 'daisy',
			maxWidth: 'none',
			appendTo: () => document.body
		}}
		bind:this={tippyElement}
	>
		{name}
		{#if expression && Object.keys(expression).length > 0}
			<span class="flex-none">
				<Icon src={Funnel} class="h-5 w-5" />
			</span>
		{/if}
	</a>
</td>
