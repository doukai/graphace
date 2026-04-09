<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter } from '@graphace/ui-graphql';
	import PermissionTypeFilter from '~/lib/components/enums/permission-type/PermissionTypeFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import { permissionFields, type PermissionFields, type PermissionFieldsArgs } from '~/lib/components/objects/permission/PermissionOption';
	import type { PermissionExpression, PermissionOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: PermissionExpression | null | undefined = undefined;
	export let orderBy: PermissionOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: PermissionFields | undefined = permissionFields;
	export let fieldsPatch: PermissionFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: PermissionFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: PermissionExpression | null | undefined;
			orderBy?: PermissionOrderBy | null | undefined;
		};
	}>();

	let _value: PermissionExpression = {
		id: undefined,
		name: undefined,
		description: undefined,
		field: undefined,
		type: undefined,
		permissionType: undefined,
		roles: { id: {} },
		realm: {}
	}

	let _orderBy: PermissionOrderBy = {
		id: undefined,
		name: undefined,
		description: undefined,
		field: undefined,
		type: undefined,
		permissionType: undefined,
		roles: {},
		realm: {}
	}

	const filter = (): void => {
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const clear = (): void => {
		_value = {
			id: undefined,
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
			roles: { id: {} },
			realm: {}
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			description: undefined,
			field: undefined,
			type: undefined,
			permissionType: undefined,
			roles: {},
			realm: {}
		};
		value = _value;
		orderBy = _orderBy;
		dispatch('filter', { value, orderBy });
		$open = false;
	};

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		forceVisible: true,
		preventScroll: true,
		onOpenChange: ({ curr, next }) => {
			if (curr !== next && next) {
				_value = { ..._value, ...value };
			}
			return next;
		}
	});

	$: filtered = value && hasArguments(value);
	$: asc = orderBy && hasAsc(orderBy);
	$: desc = orderBy && hasDesc(orderBy);
</script>

<slot trigger={$trigger}>
	<div class="tooltip" data-tip={$LL.graphence.components.query.filter()}>
		<button data-part="button" class="btn btn-square" use:melt={$trigger}>
			{#if filtered || asc || desc}
				<Icon src={ListBullet} class="h-5 w-5" />
			{:else}
				<Icon src={Funnel} class="h-5 w-5" />
			{/if}
		</button>
	</div>
</slot>

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="p-1 max-h-60 overflow-y-auto">
			<FormControl let:id>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.Permission.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.description?.hiddenFilter?.(_value, fieldsArgs?.description)}
					<Label {id} text={$LL.graphql.objects.Permission.fields.description.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="description" bind:value={_value.description} />
						<SortSelect {disabled} bind:value={_orderBy.description} />
					</div>
				{/if}
				{#if !fields?.field?.hiddenFilter?.(_value, fieldsArgs?.field)}
					<Label {id} text={$LL.graphql.objects.Permission.fields.field.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="field" bind:value={_value.field} />
						<SortSelect {disabled} bind:value={_orderBy.field} />
					</div>
				{/if}
				{#if !fields?.type?.hiddenFilter?.(_value, fieldsArgs?.type)}
					<Label {id} text={$LL.graphql.objects.Permission.fields.type.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="type" bind:value={_value.type} />
						<SortSelect {disabled} bind:value={_orderBy.type} />
					</div>
				{/if}
				{#if !fields?.permissionType?.hiddenFilter?.(_value, fieldsArgs?.permissionType)}
					<Label {id} text={$LL.graphql.objects.Permission.fields.permissionType.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<PermissionTypeFilter {id} name="permissionType" bind:value={_value.permissionType} />
						<SortSelect {disabled} bind:value={_orderBy.permissionType} />
					</div>
				{/if}
				{#if !fields?.roles?.hiddenFilter?.(_value, fieldsArgs?.roles)}
					{#if _value?.roles?.id}
						<Label {id} text={$LL.graphql.objects.Permission.fields.roles.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<RoleSelectFilter {id} name="roles" bind:value={_value.roles.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.realm?.hiddenFilter?.(_value, fieldsArgs?.realm)}
					{#if _value?.realm}
						<Label {id} text={$LL.graphql.objects.Permission.fields.realm.name()} />
						<div
							class="grid gap-1 [&_[data-part=button]]:btn-block [&_[data-part=button]]:btn-neutral"
						>
							<RealmFilter bind:value={_value.realm} bind:orderBy={_orderBy.realm} />
						</div>
					{/if}
				{/if}
			</FormControl>
		</Form>
		<div class="flex justify-center space-x-1 pt-1">
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.filter()}>
				<button
					{disabled}
					class="btn btn-square btn-primary"
					on:click|preventDefault={(e) => filter()}
				>
					<Icon src={Check} class="h-5 w-5" />
				</button>
			</div>
			<div class="tooltip" data-tip={$LL.ui_graphql.table.th.cancel()}>
				<button
					{disabled}
					class="btn btn-square btn-outline btn-error"
					on:click|preventDefault={(e) => clear()}
				>
					<Icon src={XMark} class="h-5 w-5" />
				</button>
			</div>
		</div>
	</div>
{/if}