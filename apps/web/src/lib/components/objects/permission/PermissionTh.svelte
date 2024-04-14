<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tippy } from '@graphace/ui';
	import { OperatorSelect, IDInput, StringInput } from '@graphace/ui-graphql';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark, Funnel } from '@steeze-ui/heroicons';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import type { IDExpression, StringExpression } from '~/lib/types/schema';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmSelect from '~/lib/components/objects/realm/RealmSelect.svelte';
	import LL from '$i18n/i18n-svelte';
	import { Operator } from '$houdini';
	import type { RoleInput, RealmInput, PermissionTypeExpression, PermissionExpression } from '$houdini';
	import { permissions } from '~/lib/utils/auth-util';

	export let name: string;
	export let expression: PermissionExpression | null | undefined;
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
		if (_expression.field.val || (_expression.field.arr && _expression.field.arr.length > 0)) {
			expression = { ...expression, field: _expression.field };
		} else {
			expression = { ...expression, field: undefined };
		}
		if (_expression.type.val || (_expression.type.arr && _expression.type.arr.length > 0)) {
			expression = { ...expression, type: _expression.type };
		} else {
			expression = { ...expression, type: undefined };
		}
		if (_expression.permissionType.val || (_expression.permissionType.arr && _expression.permissionType.arr.length > 0)) {
			expression = { ...expression, permissionType: _expression.permissionType };
		} else {
			expression = { ...expression, permissionType: undefined };
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
		_expression.name = { opr: Operator.EQ };
		_expression.description = { opr: Operator.EQ };
		_expression.field = { opr: Operator.EQ };
		_expression.type = { opr: Operator.EQ };
		_expression.permissionType = { opr: Operator.EQ };
		_expression.roles = { id: { opr: Operator.EQ } };
		_expression.realm = { id: { opr: Operator.EQ } };
		expression = undefined;
		dispatch('filter', {});
		tippyElement._tippy.hide();
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
	};
	const realmOprChange = (): void => {
		_expression.realm.id.arr = [];
		_expression.realm.id.val = undefined;
	};
</script>
<div class="hidden">
	<div class="space-y-2" bind:this={content}>
		<div class="grid grid-cols-2 gap-2">
			{#if permissions.auth('Permission::name::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.name.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.name.opr}
					on:change={(e) => nameOprChange()}
				/>
			</div>
			{#if _expression.name.opr === 'IN' || _expression.name.opr === 'NIN' || _expression.name.opr === 'BT' || _expression.name.opr === 'NBT'}
				<IDInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.arr}
				/>
			{:else}
				<IDInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.name.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Permission::description::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.description.name()}
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
			{#if permissions.auth('Permission::field::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.field.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.field.opr}
					on:change={(e) => fieldOprChange()}
				/>
			</div>
			{#if _expression.field.opr === 'IN' || _expression.field.opr === 'NIN' || _expression.field.opr === 'BT' || _expression.field.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.field.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.field.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Permission::type::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.type.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.type.opr}
					on:change={(e) => typeOprChange()}
				/>
			</div>
			{#if _expression.type.opr === 'IN' || _expression.type.opr === 'NIN' || _expression.type.opr === 'BT' || _expression.type.opr === 'NBT'}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.type.arr}
				/>
			{:else}
				<StringInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.type.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Permission::permissionType::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.permissionType.name()}
				</button>
				<OperatorSelect
					className="join-item w-32"
					bind:value={_expression.permissionType.opr}
					on:change={(e) => permissionTypeOprChange()}
				/>
			</div>
			{#if _expression.permissionType.opr === 'IN' || _expression.permissionType.opr === 'NIN' || _expression.permissionType.opr === 'BT' || _expression.permissionType.opr === 'NBT'}
				<PermissionTypeInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.permissionType.arr}
				/>
			{:else}
				<PermissionTypeInput
					placeholder={$LL.uiGraphql.table.th.filterPlaceholder()}
					{name}
					bind:value={_expression.permissionType.val}
				/>
			{/if}
			{/if}
			{#if permissions.auth('Permission::roles::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.roles.name()}
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
			{#if permissions.auth('Permission::realm::*')}
			<div class="join">
				<button class="btn btn-active btn-ghost join-item w-16">
					{$LL.graphql.objects.Permission.fields.realm.name()}
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
