<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { StringFilter, IntFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupExpression } from '~/lib/types/schema';

	export let expression: GroupExpression | null | undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

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
			expression = { ...expression, id: _expression.id };
		} else {
			expression = { ...expression, id: undefined };
		}
		if (_expression.name) {
			expression = { ...expression, name: _expression.name };
		} else {
			expression = { ...expression, name: undefined };
		}
		if (_expression.description) {
			expression = { ...expression, description: _expression.description };
		} else {
			expression = { ...expression, description: undefined };
		}
		if (_expression.path) {
			expression = { ...expression, path: _expression.path };
		} else {
			expression = { ...expression, path: undefined };
		}
		if (_expression.deep) {
			expression = { ...expression, deep: _expression.deep };
		} else {
			expression = { ...expression, deep: undefined };
		}
		if (_expression.parentId) {
			expression = { ...expression, parentId: _expression.parentId };
		} else {
			expression = { ...expression, parentId: undefined };
		}
		if (_expression.parent.id) {
			expression = { ...expression, parent: _expression.parent };
		} else {
			expression = { ...expression, parent: undefined };
		}
		if (_expression.subGroups.id) {
			expression = { ...expression, subGroups: _expression.subGroups };
		} else {
			expression = { ...expression, subGroups: undefined };
		}
		if (_expression.users.id) {
			expression = { ...expression, users: _expression.users };
		} else {
			expression = { ...expression, users: undefined };
		}
		if (_expression.roles.id) {
			expression = { ...expression, roles: _expression.roles };
		} else {
			expression = { ...expression, roles: undefined };
		}
		if (_expression.realm.id) {
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
		expression = undefined;
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
	<div use:melt={$overlay} class="fixed inset-0 z-[100]" />
	<div class="p-1 rounded-xl bg-base-200 shadow z-[100]" use:melt={$content}>
		<div use:melt={$arrow} />
		<div class="space-y-1 max-h-60 overflow-y-auto">
			{#if permissions.auth('Group::id::*')}
			<GroupSelectFilter
				label={$LL.graphql.objects.Group.name()}
				name="id"
				bind:expression={_expression.id}
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
				bind:expression={_expression.name}
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
				bind:expression={_expression.description}
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
				bind:expression={_expression.path}
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
				bind:expression={_expression.deep}
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
				bind:expression={_expression.parentId}
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
				bind:expression={_expression.parent.id}
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
				bind:expression={_expression.subGroups.id}
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
				bind:expression={_expression.users.id}
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
				bind:expression={_expression.roles.id}
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
				bind:expression={_expression.realm.id}
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