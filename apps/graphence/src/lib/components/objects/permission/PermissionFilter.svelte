<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { IDFilter, StringFilter } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import PermissionTypeFilter from '~/lib/components/enums/permission-type/PermissionTypeFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmSelectFilter from '~/lib/components/objects/realm/RealmSelectFilter.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionExpression } from '~/lib/types/schema';

	export let expression: PermissionExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;

	let _expression = {
		name: undefined,
		description: undefined,
		field: undefined,
		type: undefined,
		permissionType: undefined,
		roles: { id: undefined },
		realm: { id: undefined }
	};
	
	const dispatch = createEventDispatcher<{
		filter: {};
	}>();

	const filter = (): void => {
		if (Object.values(_expression).filter((item) => item !== null).length > 0) {
			expression = _expression;
		} else {
			expression = undefined;
		}
		dispatch('filter', {});
		$open = false;
	};

	const clear = (): void => {
		_expression = {
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
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
			{#if permissions.auth('Permission::name::*')}
				<IDFilter
					label={$LL.graphql.objects.Permission.fields.name.name()}
					name="name"
					bind:expression={_expression.name}
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
					bind:expression={_expression.description}
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
					bind:expression={_expression.field}
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
					bind:expression={_expression.type}
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
					bind:expression={_expression.permissionType}
					className="md:select-sm"
					selectClassName="md:select-sm w-full"
				/>
				<div class="divider m-0 md:hidden" />
			{/if}
			{#if permissions.auth('Permission::roles::*')}
				<RoleSelectFilter
					label={$LL.graphql.objects.Permission.fields.roles.name()}
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
			{#if permissions.auth('Permission::realm::*')}
				<RealmSelectFilter
					label={$LL.graphql.objects.Permission.fields.realm.name()}
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