<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter, IntFilter } from '@graphace/ui-graphql';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import { groupFields, type GroupFields, type GroupFieldsArgs } from '~/lib/components/objects/group/GroupOption';
	import type { GroupExpression, GroupOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: GroupExpression | null | undefined = undefined;
	export let orderBy: GroupOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: GroupFields | undefined = groupFields;
	export let fieldsPatch: GroupFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: GroupFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: GroupExpression | null | undefined;
			orderBy?: GroupOrderBy | null | undefined;
		};
	}>();

	let _value: GroupExpression = {
		id: undefined,
		name: undefined,
		description: undefined,
		path: undefined,
		deep: undefined,
		parentId: undefined,
		parent: { id: {} },
		subGroups: { id: {} },
		users: { id: {} },
		roles: { id: {} },
		realm: {}
	}

	let _orderBy: GroupOrderBy = {
		id: undefined,
		name: undefined,
		description: undefined,
		path: undefined,
		deep: undefined,
		parentId: undefined,
		parent: {},
		subGroups: {},
		users: {},
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
			path: undefined,
			deep: undefined,
			parentId: undefined,
			parent: { id: {} },
			subGroups: { id: {} },
			users: { id: {} },
			roles: { id: {} },
			realm: {}
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			description: undefined,
			path: undefined,
			deep: undefined,
			parentId: undefined,
			parent: {},
			subGroups: {},
			users: {},
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
				<Label {id} text={$LL.graphql.objects.Group.name()} />
				<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
					<GroupSelectFilter {id} name="id" bind:value={_value.id} />
				</div>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.Group.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.description?.hiddenFilter?.(_value, fieldsArgs?.description)}
					<Label {id} text={$LL.graphql.objects.Group.fields.description.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="description" bind:value={_value.description} />
						<SortSelect {disabled} bind:value={_orderBy.description} />
					</div>
				{/if}
				{#if !fields?.path?.hiddenFilter?.(_value, fieldsArgs?.path)}
					<Label {id} text={$LL.graphql.objects.Group.fields.path.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="path" bind:value={_value.path} />
						<SortSelect {disabled} bind:value={_orderBy.path} />
					</div>
				{/if}
				{#if !fields?.deep?.hiddenFilter?.(_value, fieldsArgs?.deep)}
					<Label {id} text={$LL.graphql.objects.Group.fields.deep.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<IntFilter {id} name="deep" bind:value={_value.deep} />
						<SortSelect {disabled} bind:value={_orderBy.deep} />
					</div>
				{/if}
				{#if !fields?.parentId?.hiddenFilter?.(_value, fieldsArgs?.parentId)}
					<Label {id} text={$LL.graphql.objects.Group.fields.parentId.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="parentId" bind:value={_value.parentId} />
						<SortSelect {disabled} bind:value={_orderBy.parentId} />
					</div>
				{/if}
				{#if !fields?.parent?.hiddenFilter?.(_value, fieldsArgs?.parent)}
					{#if _value?.parent?.id}
						<Label {id} text={$LL.graphql.objects.Group.fields.parent.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<GroupSelectFilter {id} name="parent" bind:value={_value.parent.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.subGroups?.hiddenFilter?.(_value, fieldsArgs?.subGroups)}
					{#if _value?.subGroups?.id}
						<Label {id} text={$LL.graphql.objects.Group.fields.subGroups.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<GroupSelectFilter {id} name="subGroups" bind:value={_value.subGroups.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.users?.hiddenFilter?.(_value, fieldsArgs?.users)}
					{#if _value?.users?.id}
						<Label {id} text={$LL.graphql.objects.Group.fields.users.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<UserSelectFilter {id} name="users" bind:value={_value.users.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.roles?.hiddenFilter?.(_value, fieldsArgs?.roles)}
					{#if _value?.roles?.id}
						<Label {id} text={$LL.graphql.objects.Group.fields.roles.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<RoleSelectFilter {id} name="roles" bind:value={_value.roles.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.realm?.hiddenFilter?.(_value, fieldsArgs?.realm)}
					{#if _value?.realm}
						<Label {id} text={$LL.graphql.objects.Group.fields.realm.name()} />
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