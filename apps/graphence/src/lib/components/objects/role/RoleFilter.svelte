<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter } from '@graphace/ui-graphql';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import UserFilter from '~/lib/components/objects/user/UserFilter.svelte';
	import PermissionFilter from '~/lib/components/objects/permission/PermissionFilter.svelte';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import { roleFields, type RoleFields, type RoleFieldsArgs } from '~/lib/components/objects/role/RoleOption';
	import type { RoleExpression, RoleOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: RoleExpression | null | undefined = undefined;
	export let orderBy: RoleOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: RoleFields | undefined = roleFields;
	export let fieldsPatch: RoleFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RoleFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: RoleExpression | null | undefined;
			orderBy?: RoleOrderBy | null | undefined;
		};
	}>();

	let _value: RoleExpression = {
		id: undefined,
		name: undefined,
		description: undefined,
		users: {},
		groups: { id: {} },
		composites: { id: {} },
		permissions: {},
		realm: {}
	}

	let _orderBy: RoleOrderBy = {
		id: undefined,
		name: undefined,
		description: undefined,
		users: {},
		groups: {},
		composites: {},
		permissions: {},
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
			users: {},
			groups: { id: {} },
			composites: { id: {} },
			permissions: {},
			realm: {}
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			description: undefined,
			users: {},
			groups: {},
			composites: {},
			permissions: {},
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
				<Label {id} text={$LL.graphql.objects.Role.name()} />
				<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
					<RoleSelectFilter {id} name="id" bind:value={_value.id} />
				</div>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.Role.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.description?.hiddenFilter?.(_value, fieldsArgs?.description)}
					<Label {id} text={$LL.graphql.objects.Role.fields.description.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="description" bind:value={_value.description} />
						<SortSelect {disabled} bind:value={_orderBy.description} />
					</div>
				{/if}
				{#if !fields?.users?.hiddenFilter?.(_value, fieldsArgs?.users)}
					{#if _value?.users}
						<Label {id} text={$LL.graphql.objects.Role.fields.users.name()} />
						<div
							class="grid gap-1 [&_[data-part=button]]:btn-block [&_[data-part=button]]:btn-neutral"
						>
							<UserFilter bind:value={_value.users} bind:orderBy={_orderBy.users} />
						</div>
					{/if}
				{/if}
				{#if !fields?.groups?.hiddenFilter?.(_value, fieldsArgs?.groups)}
					{#if _value?.groups?.id}
						<Label {id} text={$LL.graphql.objects.Role.fields.groups.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<GroupSelectFilter {id} name="groups" bind:value={_value.groups.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.composites?.hiddenFilter?.(_value, fieldsArgs?.composites)}
					{#if _value?.composites?.id}
						<Label {id} text={$LL.graphql.objects.Role.fields.composites.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<RoleSelectFilter {id} name="composites" bind:value={_value.composites.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.permissions?.hiddenFilter?.(_value, fieldsArgs?.permissions)}
					{#if _value?.permissions}
						<Label {id} text={$LL.graphql.objects.Role.fields.permissions.name()} />
						<div
							class="grid gap-1 [&_[data-part=button]]:btn-block [&_[data-part=button]]:btn-neutral"
						>
							<PermissionFilter bind:value={_value.permissions} bind:orderBy={_orderBy.permissions} />
						</div>
					{/if}
				{/if}
				{#if !fields?.realm?.hiddenFilter?.(_value, fieldsArgs?.realm)}
					{#if _value?.realm}
						<Label {id} text={$LL.graphql.objects.Role.fields.realm.name()} />
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