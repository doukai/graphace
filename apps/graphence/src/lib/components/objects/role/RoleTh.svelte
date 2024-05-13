<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression } from '~/lib/types/schema';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { RoleInput, UserInput, GroupInput, RealmInput, RoleExpression } from '$houdini';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: RoleExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
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
		_expression.id.arr = value?.map((item) => item?.where?.id?.val);
	} else if (value) {
		_expression.id.val = value?.where?.id?.val;
	}
	$: if (Array.isArray(users)) {
		_expression.users.id.arr = users?.map((item) => item?.where?.id?.val);
	} else if (users) {
		_expression.users.id.val = users?.where?.id?.val;
	}
	$: if (Array.isArray(groups)) {
		_expression.groups.id.arr = groups?.map((item) => item?.where?.id?.val);
	} else if (groups) {
		_expression.groups.id.val = groups?.where?.id?.val;
	}
	$: if (Array.isArray(composites)) {
		_expression.composites.id.arr = composites?.map((item) => item?.where?.id?.val);
	} else if (composites) {
		_expression.composites.id.val = composites?.where?.id?.val;
	}
	$: if (Array.isArray(realm)) {
		_expression.realm.id.arr = realm?.map((item) => item?.where?.id?.val);
	} else if (realm) {
		_expression.realm.id.val = realm?.where?.id?.val;
	}

	let content: HTMLElement;
	let tippyElement: any;
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.id.val || (_expression.id.arr && _expression.id.arr.length > 0)) {
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (_expression.name.val || (_expression.name.arr && _expression.name.arr.length > 0)) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.description.val || (_expression.description.arr && _expression.description.arr.length > 0)) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		if (_expression.users.id?.val ||
			(_expression.users.id?.arr && _expression.users.id?.arr.length > 0)
		) {
			expression = { ...expression, users: _expression.users };
		} else {
			expression = { ...expression, users: undefined };
		}
		if (_expression.groups.id?.val ||
			(_expression.groups.id?.arr && _expression.groups.id?.arr.length > 0)
		) {
			expression = { ...expression, groups: _expression.groups };
		} else {
			expression = { ...expression, groups: undefined };
		}
		if (_expression.composites.id?.val ||
			(_expression.composites.id?.arr && _expression.composites.id?.arr.length > 0)
		) {
			expression = { ...expression, composites: _expression.composites };
		} else {
			expression = { ...expression, composites: undefined };
		}
		if (_expression.realm.id?.val ||
			(_expression.realm.id?.arr && _expression.realm.id?.arr.length > 0)
		) {
			expression = { ...expression, realm: _expression.realm };
		} else {
			expression = { ...expression, realm: undefined };
		}
		
		if (Object.values(expression).filter((item) => item).length === 0) {
			expression = undefined;
		}
		dispatch('filter', {});
		tippyElement._tippy.hide();
	};

	const clear = (): void => {
		_expression.id = { opr: Operator.EQ };
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		_expression.users = { id: { opr: Operator.EQ } };
		_expression.groups = { id: { opr: Operator.EQ } };
		_expression.composites = { id: { opr: Operator.EQ } };
		_expression.realm = { id: { opr: Operator.EQ } };
		expression = undefined;
		dispatch('filter', {});
		tippyElement._tippy.hide();
	};
	const idOprChange = (): void => {
		_expression.id.arr = [];
		_expression.id.val = undefined;
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
	};
	const groupsOprChange = (): void => {
		_expression.groups.id.arr = [];
		_expression.groups.id.val = undefined;
	};
	const compositesOprChange = (): void => {
		_expression.composites.id.arr = [];
		_expression.composites.id.val = undefined;
	};
	const realmOprChange = (): void => {
		_expression.realm.id.arr = [];
		_expression.realm.id.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			{#if permissions.auth('Role::id::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.id.opr}
					on:change={(e) => idOprChange()}
				/>
			</div>
			{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
				<RoleSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value
				/>
			{:else}
				<RoleSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value />
			{/if}
			{/if}
			{#if permissions.auth('Role::name::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.name.name()}
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
					bind:value={_expression.name.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Role::description::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.description.name()}
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
					bind:value={_expression.description.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.description.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Role::users::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.users.name()}
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
			{#if permissions.auth('Role::groups::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.groups.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.groups.id.opr}
					on:change={(e) => groupsOprChange()}
				/>
			</div>
			{#if _expression.groups.id.opr === 'IN' || _expression.groups.id.opr === 'NIN' || _expression.groups.id.opr === 'BT' || _expression.groups.id.opr === 'NBT'}
				<GroupSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ groups }
				/>
			{:else}
				<GroupSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ groups } />
			{/if}
			{/if}
			{#if permissions.auth('Role::composites::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.composites.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.composites.id.opr}
					on:change={(e) => compositesOprChange()}
				/>
			</div>
			{#if _expression.composites.id.opr === 'IN' || _expression.composites.id.opr === 'NIN' || _expression.composites.id.opr === 'BT' || _expression.composites.id.opr === 'NBT'}
				<RoleSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value={ composites }
				/>
			{:else}
				<RoleSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value={ composites } />
			{/if}
			{/if}
			{#if permissions.auth('Role::realm::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Role.fields.realm.name()}
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
