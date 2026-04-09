<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, Funnel, ListBullet, XMark } from '@steeze-ui/heroicons';
	import { hasArguments, hasAsc, hasDesc } from '@graphace/graphql';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { SortSelect, StringFilter, BooleanFilter } from '@graphace/ui-graphql';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import RealmFilter from '~/lib/components/objects/realm/RealmFilter.svelte';
	import { userFields, type UserFields, type UserFieldsArgs } from '~/lib/components/objects/user/UserOption';
	import type { UserExpression, UserOrderBy } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: UserExpression | null | undefined = undefined;
	export let orderBy: UserOrderBy | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	export let fields: UserFields | undefined = userFields;
	export let fieldsPatch: UserFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: UserFieldsArgs | undefined = undefined;
	let className: string | undefined = '[&_[data-part=input]]:min-w-0';
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: {
			value?: UserExpression | null | undefined;
			orderBy?: UserOrderBy | null | undefined;
		};
	}>();

	let _value: UserExpression = {
		id: undefined,
		name: undefined,
		description: undefined,
		lastName: undefined,
		login: undefined,
		email: undefined,
		phones: undefined,
		disable: undefined,
		groups: { id: {} },
		roles: { id: {} },
		realm: {}
	}

	let _orderBy: UserOrderBy = {
		id: undefined,
		name: undefined,
		description: undefined,
		lastName: undefined,
		login: undefined,
		email: undefined,
		phones: undefined,
		disable: undefined,
		groups: {},
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
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: { id: {} },
			roles: { id: {} },
			realm: {}
		};
		_orderBy = {
			id: undefined,
			name: undefined,
			description: undefined,
			lastName: undefined,
			login: undefined,
			email: undefined,
			phones: undefined,
			disable: undefined,
			groups: {},
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
				<Label {id} text={$LL.graphql.objects.User.name()} />
				<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
					<UserSelectFilter {id} name="id" bind:value={_value.id} />
				</div>
				{#if !fields?.name?.hiddenFilter?.(_value, fieldsArgs?.name)}
					<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="name" bind:value={_value.name} />
						<SortSelect {disabled} bind:value={_orderBy.name} />
					</div>
				{/if}
				{#if !fields?.description?.hiddenFilter?.(_value, fieldsArgs?.description)}
					<Label {id} text={$LL.graphql.objects.User.fields.description.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="description" bind:value={_value.description} />
						<SortSelect {disabled} bind:value={_orderBy.description} />
					</div>
				{/if}
				{#if !fields?.lastName?.hiddenFilter?.(_value, fieldsArgs?.lastName)}
					<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="lastName" bind:value={_value.lastName} />
						<SortSelect {disabled} bind:value={_orderBy.lastName} />
					</div>
				{/if}
				{#if !fields?.login?.hiddenFilter?.(_value, fieldsArgs?.login)}
					<Label {id} text={$LL.graphql.objects.User.fields.login.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="login" bind:value={_value.login} />
						<SortSelect {disabled} bind:value={_orderBy.login} />
					</div>
				{/if}
				{#if !fields?.email?.hiddenFilter?.(_value, fieldsArgs?.email)}
					<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="email" bind:value={_value.email} />
						<SortSelect {disabled} bind:value={_orderBy.email} />
					</div>
				{/if}
				{#if !fields?.phones?.hiddenFilter?.(_value, fieldsArgs?.phones)}
					<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<StringFilter {id} name="phones" bind:value={_value.phones} />
						<SortSelect {disabled} bind:value={_orderBy.phones} />
					</div>
				{/if}
				{#if !fields?.disable?.hiddenFilter?.(_value, fieldsArgs?.disable)}
					<Label {id} text={$LL.graphql.objects.User.fields.disable.name()} />
					<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)_auto]">
						<BooleanFilter {id} name="disable" bind:value={_value.disable} />
						<SortSelect {disabled} bind:value={_orderBy.disable} />
					</div>
				{/if}
				{#if !fields?.groups?.hiddenFilter?.(_value, fieldsArgs?.groups)}
					{#if _value?.groups?.id}
						<Label {id} text={$LL.graphql.objects.User.fields.groups.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<GroupSelectFilter {id} name="groups" bind:value={_value.groups.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.roles?.hiddenFilter?.(_value, fieldsArgs?.roles)}
					{#if _value?.roles?.id}
						<Label {id} text={$LL.graphql.objects.User.fields.roles.name()} />
						<div class="grid gap-1 grid-cols-[auto_minmax(0,1fr)]">
							<RoleSelectFilter {id} name="roles" bind:value={_value.roles.id} />
						</div>
					{/if}
				{/if}
				{#if !fields?.realm?.hiddenFilter?.(_value, fieldsArgs?.realm)}
					{#if _value?.realm}
						<Label {id} text={$LL.graphql.objects.User.fields.realm.name()} />
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