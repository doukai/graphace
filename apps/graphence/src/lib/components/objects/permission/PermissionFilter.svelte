<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons';
	import { z_index } from '@graphace/ui'; 
	import { IDFilter, StringFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import PermissionTypeFilter from '~/lib/components/enums/permission-type/PermissionTypeFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionExpression } from '~/lib/types/schema';

	export let value: PermissionExpression | null | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');
	const permissions = getContext<PermissionsStore>('permissions');

	const z_class8 = z_index.top(8);
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	if (value === null || value === undefined || Object.keys(value).length === 0) {
		value = {
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
			roles: { id: undefined },
			realm: { id: undefined }
		}
	}

	const filter = (): void => {
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		value = {
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
			roles: { id: undefined },
			realm: { id: undefined }
		};
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
			{#if permissions.auth('Permission::name::*')}
			<IDFilter
				label={$LL.graphql.objects.Permission.fields.name.name()}
				name="name"
				bind:value={value.name}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<StringFilter
				label={$LL.graphql.objects.Permission.fields.description.name()}
				name="description"
				bind:value={value.description}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<StringFilter
				label={$LL.graphql.objects.Permission.fields.field.name()}
				name="field"
				bind:value={value.field}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<StringFilter
				label={$LL.graphql.objects.Permission.fields.type.name()}
				name="type"
				bind:value={value.type}
				className="md:input-sm"
				addBtnClassName="md:btn-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<PermissionTypeFilter
				label={$LL.graphql.objects.Permission.fields.permissionType.name()}
				name="permissionType"
				bind:value={value.permissionType}
				className="md:select-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::roles::*')}
			<RoleSelectFilter
				label={$LL.graphql.objects.Permission.fields.roles.name()}
				name="roles"
				bind:value={value.roles.id}
				className="md:input-sm"
				containerClassName="md:min-h-8"
				tagClassName="md:badge-sm"
				menuClassName="md:menu-sm"
				selectClassName="md:select-sm w-full"
			/>
			<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::realm::*')}
			<RealmSelectFilter
				label={$LL.graphql.objects.Permission.fields.realm.name()}
				name="realm"
				bind:value={value.realm.id}
				className="md:input-sm"
				containerClassName="md:min-h-8"
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