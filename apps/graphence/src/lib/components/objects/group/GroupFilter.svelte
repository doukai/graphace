<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons';
	import { z_index } from '@graphace/ui'; 
	import { StringFilter, IntFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupExpression } from '~/lib/types/schema';

	export let value: GroupExpression | null | undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const z_class8 = z_index.top(8);

	let _expression = {
		id: undefined,
		name: undefined,
		description: undefined,
		path: undefined,
		deep: undefined,
		parentId: undefined,
		parent: { id: undefined },
		subGroups: { id: undefined },
		users: { id: undefined },
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
		if (_expression.path) {
			value = { ...value, path: _expression.path };
		} else {
			value = { ...value, path: undefined };
		}
		if (_expression.deep) {
			value = { ...value, deep: _expression.deep };
		} else {
			value = { ...value, deep: undefined };
		}
		if (_expression.parentId) {
			value = { ...value, parentId: _expression.parentId };
		} else {
			value = { ...value, parentId: undefined };
		}
		if (_expression.parent.id) {
			value = { ...value, parent: _expression.parent };
		} else {
			value = { ...value, parent: undefined };
		}
		if (_expression.subGroups.id) {
			value = { ...value, subGroups: _expression.subGroups };
		} else {
			value = { ...value, subGroups: undefined };
		}
		if (_expression.users.id) {
			value = { ...value, users: _expression.users };
		} else {
			value = { ...value, users: undefined };
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
			path: undefined,
			deep: undefined,
			parentId: undefined,
			parent: { id: undefined },
			subGroups: { id: undefined },
			users: { id: undefined },
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
			{#if permissions.auth('Group::id::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.Group.name()}
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
			{#if permissions.auth('Group::name::*')}
			<StringFilter
				label={$LL.graphql.objects.Group.fields.name.name()}
				name="name"
				bind:value={_expression.name}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::description::*')}
			<StringFilter
				label={$LL.graphql.objects.Group.fields.description.name()}
				name="description"
				bind:value={_expression.description}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::path::*')}
			<StringFilter
				label={$LL.graphql.objects.Group.fields.path.name()}
				name="path"
				bind:value={_expression.path}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::deep::*')}
			<IntFilter
				label={$LL.graphql.objects.Group.fields.deep.name()}
				name="deep"
				bind:value={_expression.deep}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::parentId::*')}
			<StringFilter
				label={$LL.graphql.objects.Group.fields.parentId.name()}
				name="parentId"
				bind:value={_expression.parentId}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::parent::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.Group.fields.parent.name()}
				name="parent"
				bind:value={_expression.parent.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::subGroups::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.Group.fields.subGroups.name()}
				name="subGroups"
				bind:value={_expression.subGroups.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::users::*')}
			<UserSelectFilter
				label={$LL.graphql.objects.Group.fields.users.name()}
				name="users"
				bind:value={_expression.users.id}
				className="md:input-sm"
				containerClassName="md:min-h-8 max-w-xs"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Group::roles::*')}
			<RoleSelectFilter
				label={$LL.graphql.objects.Group.fields.roles.name()}
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
			{#if permissions.auth('Group::realm::*')}
			<RealmSelectFilter
				label={$LL.graphql.objects.Group.fields.realm.name()}
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