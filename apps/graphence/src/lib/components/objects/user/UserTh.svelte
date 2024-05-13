<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, StringInput, BooleanInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import type { StringExpression, BooleanExpression } from '~/lib/types/schema';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { UserInput, GroupInput, RoleInput, RealmInput, UserExpression } from '$houdini';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: UserExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	let value: UserInput | (UserInput | null | undefined)[] | null | undefined = undefined;
	let groups: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	let roles: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	let realm: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		id: StringExpression;
		name: StringExpression;
		description: StringExpression;
		lastName: StringExpression;
		login: StringExpression;
		email: StringExpression;
		phones: StringExpression;
		disable: BooleanExpression;
		groups: { id: StringExpression };
		roles: { id: StringExpression };
		realm: { id: StringExpression };
	} = {
		id: { opr: Operator.EQ },
		name: { opr: Operator.EQ },
		description: { opr: Operator.EQ },
		lastName: { opr: Operator.EQ },
		login: { opr: Operator.EQ },
		email: { opr: Operator.EQ },
		phones: { opr: Operator.EQ },
		disable: { opr: Operator.EQ },
		groups: { id: { opr: Operator.EQ } },
		roles: { id: { opr: Operator.EQ } },
		realm: { id: { opr: Operator.EQ } }
	};
	$: if (Array.isArray(value)) {
		_expression.id.arr = value?.map((item) => item?.where?.id?.val);
	} else if (value) {
		_expression.id.val = value?.where?.id?.val;
	}
	$: if (Array.isArray(groups)) {
		_expression.groups.id.arr = groups?.map((item) => item?.where?.id?.val);
	} else if (groups) {
		_expression.groups.id.val = groups?.where?.id?.val;
	}
	$: if (Array.isArray(roles)) {
		_expression.roles.id.arr = roles?.map((item) => item?.where?.id?.val);
	} else if (roles) {
		_expression.roles.id.val = roles?.where?.id?.val;
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
		if (_expression.lastName.val || (_expression.lastName.arr && _expression.lastName.arr.length > 0)) {
			expression = { ...expression, lastName: _expression.lastName };
		} else {
			expression = { ...expression, lastName: undefined };
		}
		if (_expression.login.val || (_expression.login.arr && _expression.login.arr.length > 0)) {
			expression = { ...expression, login: _expression.login };
		} else {
			expression = { ...expression, login: undefined };
		}
		if (_expression.email.val || (_expression.email.arr && _expression.email.arr.length > 0)) {
			expression = { ...expression, email: _expression.email };
		} else {
			expression = { ...expression, email: undefined };
		}
		if (_expression.phones.val || (_expression.phones.arr && _expression.phones.arr.length > 0)) {
			expression = { ...expression, phones: _expression.phones };
		} else {
			expression = { ...expression, phones: undefined };
		}
		if (_expression.disable.val || (_expression.disable.arr && _expression.disable.arr.length > 0)) {
			expression = { ...expression, disable: _expression.disable };
		} else {
			expression = { ...expression, disable: undefined };
		}
		if (_expression.groups.id?.val ||
			(_expression.groups.id?.arr && _expression.groups.id?.arr.length > 0)
		) {
			expression = { ...expression, groups: _expression.groups };
		} else {
			expression = { ...expression, groups: undefined };
		}
		if (_expression.roles.id?.val ||
			(_expression.roles.id?.arr && _expression.roles.id?.arr.length > 0)
		) {
			expression = { ...expression, roles: _expression.roles };
		} else {
			expression = { ...expression, roles: undefined };
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
		_expression.lastName = { opr: Operator.EQ };
		_expression.login = { opr: Operator.EQ };
		_expression.email = { opr: Operator.EQ };
		_expression.phones = { opr: Operator.EQ };
		_expression.disable = { opr: Operator.EQ };
		_expression.groups = { id: { opr: Operator.EQ } };
		_expression.roles = { id: { opr: Operator.EQ } };
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
	const lastNameOprChange = (): void => {
		_expression.lastName.arr = [];
		_expression.lastName.val = undefined;
	};
	const loginOprChange = (): void => {
		_expression.login.arr = [];
		_expression.login.val = undefined;
	};
	const emailOprChange = (): void => {
		_expression.email.arr = [];
		_expression.email.val = undefined;
	};
	const phonesOprChange = (): void => {
		_expression.phones.arr = [];
		_expression.phones.val = undefined;
	};
	const disableOprChange = (): void => {
		_expression.disable.arr = [];
		_expression.disable.val = undefined;
	};
	const groupsOprChange = (): void => {
		_expression.groups.id.arr = [];
		_expression.groups.id.val = undefined;
	};
	const rolesOprChange = (): void => {
		_expression.roles.id.arr = [];
		_expression.roles.id.val = undefined;
	};
	const realmOprChange = (): void => {
		_expression.realm.id.arr = [];
		_expression.realm.id.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			{#if permissions.auth('User::id::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.id.opr}
					on:change={(e) => idOprChange()}
				/>
			</div>
			{#if _expression.id.opr === 'IN' || _expression.id.opr === 'NIN' || _expression.id.opr === 'BT' || _expression.id.opr === 'NBT'}
				<UserSelect
					{name}
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					list
					bind:value
				/>
			{:else}
				<UserSelect {name} placeholder={$LL.uiGraphql.table.th.filterPlaceholder()} bind:value />
			{/if}
			{/if}
			{#if permissions.auth('User::name::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.name.name()}
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
			{#if permissions.auth('User::description::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.description.name()}
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
			{#if permissions.auth('User::lastName::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.lastName.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.lastName.opr}
					on:change={(e) => lastNameOprChange()}
				/>
			</div>
			{#if _expression.lastName.opr === 'IN' || _expression.lastName.opr === 'NIN' || _expression.lastName.opr === 'BT' || _expression.lastName.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.lastName.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.lastName.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('User::login::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.login.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.login.opr}
					on:change={(e) => loginOprChange()}
				/>
			</div>
			{#if _expression.login.opr === 'IN' || _expression.login.opr === 'NIN' || _expression.login.opr === 'BT' || _expression.login.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.login.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.login.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('User::email::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.email.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.email.opr}
					on:change={(e) => emailOprChange()}
				/>
			</div>
			{#if _expression.email.opr === 'IN' || _expression.email.opr === 'NIN' || _expression.email.opr === 'BT' || _expression.email.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.email.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.email.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('User::phones::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.phones.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.phones.opr}
					on:change={(e) => phonesOprChange()}
				/>
			</div>
			{#if _expression.phones.opr === 'IN' || _expression.phones.opr === 'NIN' || _expression.phones.opr === 'BT' || _expression.phones.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.phones.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.phones.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('User::disable::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.disable.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.disable.opr}
					on:change={(e) => disableOprChange()}
				/>
			</div>
			{#if _expression.disable.opr === 'IN' || _expression.disable.opr === 'NIN' || _expression.disable.opr === 'BT' || _expression.disable.opr === 'NBT'}
				<BooleanInput
					{name}
					bind:value={_expression.disable.arr}
				/>
			{:else}
				<BooleanInput
					{name}
					bind:value={_expression.disable.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('User::groups::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.groups.name()}
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
			{#if permissions.auth('User::roles::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.roles.name()}
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
			{#if permissions.auth('User::realm::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.User.fields.realm.name()}
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
