<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { createPopover, melt } from '@melt-ui/svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Check, XMark } from '@steeze-ui/heroicons';
	import { Form, FormControl, Label } from '@graphace/ui';
	import { StringFilter, BooleanFilter } from '@graphace/ui-graphql';
	import UserSelectFilter from '~/lib/components/objects/user/UserSelectFilter.svelte';
	import GroupSelectFilter from '~/lib/components/objects/group/GroupSelectFilter.svelte';
	import RoleSelectFilter from '~/lib/components/objects/role/RoleSelectFilter.svelte';
	import type { UserExpression } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';

	export let value: UserExpression | null | undefined = undefined;
	export let disabled = false;
	export let zIndex: number = 0;
	let className: string | undefined = undefined;
	export { className as class };
	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const contextClass = getContext<string>('ui.popover-content') || '';
	
	const dispatch = createEventDispatcher<{
		filter: { value?: UserExpression | null | undefined };
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
		groups: { id: undefined },
		roles: { id: undefined },
	}

	const filter = (): void => {
		value = _value;
		dispatch('filter', { value });
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
			groups: { id: undefined },
			roles: { id: undefined },
		};
		value = _value;
		dispatch('filter', { value });
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
</script>

<slot trigger={$trigger} />

{#if $open}
	<div use:melt={$overlay} class="fixed inset-0 z-[{zIndex + 5}]" />
	<div class="p-1 z-[{zIndex + 5}] {contextClass} {className}" use:melt={$content}>
		<div use:melt={$arrow} />
		<Form class="max-h-60 overflow-y-auto">
			<FormControl let:id>
				<Label {id} text={$LL.graphql.objects.User.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<UserSelectFilter {id} name="id" bind:value={_value.id} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="name" bind:value={_value.name} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.description.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="description" bind:value={_value.description} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="lastName" bind:value={_value.lastName} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.login.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="login" bind:value={_value.login} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="email" bind:value={_value.email} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<StringFilter {id} name="phones" bind:value={_value.phones} />
				</div>
				<Label {id} text={$LL.graphql.objects.User.fields.disable.name()} />
				<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
					<BooleanFilter {id} name="disable" bind:value={_value.disable} />
				</div>
				{#if _value?.groups?.id}
					<Label {id} text={$LL.graphql.objects.User.fields.groups.name()} />
					<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
						<GroupSelectFilter {id} name="groups" bind:value={_value.groups.id} />
					</div>
				{/if}
				{#if _value?.roles?.id}
					<Label {id} text={$LL.graphql.objects.User.fields.roles.name()} />
					<div class="grid gap-1 [grid-template-columns:10rem_minmax(0,1fr)]">
						<RoleSelectFilter {id} name="roles" bind:value={_value.roles.id} />
					</div>
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