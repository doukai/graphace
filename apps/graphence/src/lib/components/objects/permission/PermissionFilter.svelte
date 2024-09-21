<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { PermissionsStore } from '@graphace/commons'; 
	import { OperatorSelect, IDInput, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import type { IDExpression, StringExpression } from '~/lib/types/schema';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { Operator } from '$houdini';
	import type { RoleInput, RealmInput, PermissionTypeExpression, PermissionExpression } from '$houdini';

	export let expression: PermissionExpression | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;
	const permissions = getContext('permissions') as PermissionsStore;
	let roles: RoleInput | (RoleInput | null | undefined)[] | null | undefined = undefined;
	let realm: RealmInput | (RealmInput | null | undefined)[] | null | undefined = undefined;

	let _expression: {
		name: IDExpression;
		description: StringExpression;
		field: StringExpression;
		type: StringExpression;
		permissionType: PermissionTypeExpression;
		roles: { id: StringExpression };
		realm: { id: StringExpression };
	} = {
		name: { opr: Operator.EQ },
		description: { opr: Operator.EQ },
		field: { opr: Operator.EQ },
		type: { opr: Operator.EQ },
		permissionType: { opr: Operator.EQ },
		roles: { id: { opr: Operator.EQ } },
		realm: { id: { opr: Operator.EQ } }
	};
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
			_expression.field.val ||
			(_expression.field.arr && _expression.field.arr.length > 0) ||
			_expression.field.opr ==='NIL' ||
			_expression.field.opr ==='NNIL'
		) {
			expression = { ...expression, field: _expression.field };
		} else {
			expression = { ...expression, field: undefined };
		}
		if (
			_expression.type.val ||
			(_expression.type.arr && _expression.type.arr.length > 0) ||
			_expression.type.opr ==='NIL' ||
			_expression.type.opr ==='NNIL'
		) {
			expression = { ...expression, type: _expression.type };
		} else {
			expression = { ...expression, type: undefined };
		}
		if (
			_expression.permissionType.val ||
			(_expression.permissionType.arr && _expression.permissionType.arr.length > 0) ||
			_expression.permissionType.opr ==='NIL' ||
			_expression.permissionType.opr ==='NNIL'
		) {
			expression = { ...expression, permissionType: _expression.permissionType };
		} else {
			expression = { ...expression, permissionType: undefined };
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
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		_expression.field = { opr: Operator.EQ };
		_expression.type = { opr: Operator.EQ };
		_expression.permissionType = { opr: Operator.EQ };
		_expression.roles = { id: { opr: Operator.EQ } };
		if (Array.isArray(roles)) {
			roles = [];
		} else if (roles) {
			roles = undefined;
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
	const nameOprChange = (): void => {
		_expression.name.arr = [];
		_expression.name.val = undefined;
	};
	const descriptionOprChange = (): void => {
		_expression.description.arr = [];
		_expression.description.val = undefined;
	};
	const fieldOprChange = (): void => {
		_expression.field.arr = [];
		_expression.field.val = undefined;
	};
	const typeOprChange = (): void => {
		_expression.type.arr = [];
		_expression.type.val = undefined;
	};
	const permissionTypeOprChange = (): void => {
		_expression.permissionType.arr = [];
		_expression.permissionType.val = undefined;
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
	<div use:melt={$overlay} class="fixed inset-0 z-[50]" />
	<div class="space-y-2 md:space-y-1 p-1 rounded-xl bg-base-100 shadow z-[50]" use:melt={$content}>
		<div use:melt={$arrow} />
			{#if permissions.auth('Permission::name::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.name.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.name.opr}
							on:change={(e) => nameOprChange()}
						/>
					</label>
				</div>
				{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
					<IDInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="name"
						bind:value={_expression.name.arr}
						list
					/>
				{:else}
					<IDInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="name"
						bind:value={_expression.name.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.description.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
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
			{/if}
			{#if permissions.auth('Permission::field::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.field.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.field.opr}
							on:change={(e) => fieldOprChange()}
						/>
					</label>
				</div>
				{#if _expression.field.opr === 'IN' || _expression.field.opr === 'NIN' || _expression.field.opr === 'BT' || _expression.field.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="field"
						bind:value={_expression.field.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="field"
						bind:value={_expression.field.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.type.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.type.opr}
							on:change={(e) => typeOprChange()}
						/>
					</label>
				</div>
				{#if _expression.type.opr === 'IN' || _expression.type.opr === 'NIN' || _expression.type.opr === 'BT' || _expression.type.opr === 'NBT'}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="type"
						bind:value={_expression.type.arr}
						list
					/>
				{:else}
					<StringInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:input-sm"
						addBtnClassName="md:btn-sm"
						name="type"
						bind:value={_expression.type.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.permissionType.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
							bind:value={_expression.permissionType.opr}
							on:change={(e) => permissionTypeOprChange()}
						/>
					</label>
				</div>
				{#if _expression.permissionType.opr === 'IN' || _expression.permissionType.opr === 'NIN' || _expression.permissionType.opr === 'BT' || _expression.permissionType.opr === 'NBT'}
					<PermissionTypeInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:select-sm"
						name="permissionType"
						bind:value={_expression.permissionType.arr}
						list
					/>
				{:else}
					<PermissionTypeInput
						placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
						className="md:select-sm"
						name="permissionType"
						bind:value={_expression.permissionType.val}
					/>
				{/if}
			</div>
			{/if}
			{#if permissions.auth('Permission::roles::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.roles.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
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
			{/if}
			{#if permissions.auth('Permission::realm::*')}
			<div class="flex items-center space-x-2" transition:fade={{ duration: 100 }}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<div class="form-control">
					<label class="input-group md:input-group-sm">
						<span class="w-20 whitespace-nowrap">
							{$LL.graphql.objects.Permission.fields.realm.name()}
						</span>
						<OperatorSelect
							className="md:select-sm"
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
			{/if}
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