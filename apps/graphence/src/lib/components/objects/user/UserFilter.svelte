<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons';
	import { z_index } from '@graphace/ui'; 
	import { StringFilter, BooleanFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserExpression } from '~/lib/types/schema';

	export let value: UserExpression | null | undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const z_class8 = z_index.top(8);

	let _expression = {
		id: undefined,
		name: undefined,
		description: undefined,
		lastName: undefined,
		login: undefined,
		email: undefined,
		phones: undefined,
		disable: undefined,
		groups: { id: undefined },
		roles: { id: undefined },
		realm: { id: undefined }
	};
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (_expression.id) {
			value = { ...value, id: _expression.id };
		} else {
			value = { ...value, id: undefined };
		}
		if (_expression.name) {
			value = { ...value, name: _expression.name };
		} else {
			value = { ...value, name: undefined };
		}
		if (_expression.description) {
			value = { ...value, description: _expression.description };
		} else {
			value = { ...value, description: undefined };
		}
		if (_expression.lastName) {
			value = { ...value, lastName: _expression.lastName };
		} else {
			value = { ...value, lastName: undefined };
		}
		if (_expression.login) {
			value = { ...value, login: _expression.login };
		} else {
			value = { ...value, login: undefined };
		}
		if (_expression.email) {
			value = { ...value, email: _expression.email };
		} else {
			value = { ...value, email: undefined };
		}
		if (_expression.phones) {
			value = { ...value, phones: _expression.phones };
		} else {
			value = { ...value, phones: undefined };
		}
		if (_expression.disable) {
			value = { ...value, disable: _expression.disable };
		} else {
			value = { ...value, disable: undefined };
		}
		if (_expression.groups.id) {
			value = { ...value, groups: _expression.groups };
		} else {
			value = { ...value, groups: undefined };
		}
		if (_expression.roles.id) {
			value = { ...value, roles: _expression.roles };
		} else {
			value = { ...value, roles: undefined };
		}
		if (_expression.realm.id) {
			value = { ...value, realm: _expression.realm };
		} else {
			value = { ...value, realm: undefined };
		}

		if (Object.values(value).filter((item) => item).length === 0) {
			value = undefined;
		}
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		_expression = {
			id: undefined,
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: undefined },
			roles: { id: undefined },
			realm: { id: undefined }
		};
		value = undefined;
		dispatch('filter', {});
		$open = false;
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
	<div use:melt={$overlay} class="fixed inset-0 {z_class8}" />
	<div class="p-1 rounded-xl bg-base-200 shadow {z_class8}" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			{#if permissions.auth('User::id::*')}
			<UserSelectFilter
				label={$LL.graphql.objects.User.name()}
				name="id"
				bind:value={_expression.id}
				className="md:input-sm"
				selectClassName="md:select-sm w-full"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::name::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.name.name()}
				name="name"
				bind:value={_expression.name}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::description::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.description.name()}
				name="description"
				bind:value={_expression.description}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::lastName::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.lastName.name()}
				name="lastName"
				bind:value={_expression.lastName}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::login::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.login.name()}
				name="login"
				bind:value={_expression.login}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::email::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.email.name()}
				name="email"
				bind:value={_expression.email}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::phones::*')}
			<StringFilter
				label={$LL.graphql.objects.User.fields.phones.name()}
				name="phones"
				bind:value={_expression.phones}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::disable::*')}
			<BooleanFilter
				label={$LL.graphql.objects.User.fields.disable.name()}
				name="disable"
				bind:value={_expression.disable}
				className="md:toggle-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::groups::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.User.fields.groups.name()}
				name="groups"
				bind:value={_expression.groups.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::roles::*')}
			<RoleSelectFilter
				label={$LL.graphql.objects.User.fields.roles.name()}
				name="roles"
				bind:value={_expression.roles.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('User::realm::*')}
			<RealmSelectFilter
				label={$LL.graphql.objects.User.fields.realm.name()}
				name="realm"
				bind:value={_expression.realm.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
		</div>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button class="btn btn-square btn-primary md:btn-sm" on:click={(e) => filter()}>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button class="btn btn-square btn-outline btn-error md:btn-sm" on:click={(e) => clear()}>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}