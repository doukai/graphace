<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { type Option, StringInput, BooleanInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';
	
	export let value: UserInput | null | undefined = undefined;
	export let isFetching: boolean = false;
	export let isMutating: boolean = false;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	export let title: string | undefined = undefined;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto';
	export { className as class };
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
		lastName?: Option | undefined;
		login?: Option | undefined;
		email?: Option | undefined;
		phones?: Option | undefined;
		disable?: Option | undefined;
		groups?: Option | undefined;
		roles?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		lastName: { readonly: false, disabled: false, hidden: false },
		login: { readonly: false, disabled: false, hidden: false },
		email: { readonly: false, disabled: false, hidden: false },
		phones: { readonly: false, disabled: false, hidden: false },
		disable: { readonly: false, disabled: false, hidden: false },
		groups: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: UserInput | null | undefined };
		unbind: { value: UserInput | null | undefined };
		save: { value: UserInput | null | undefined };
		back: {};
	}>();

	if (value?.id && !value.where) {
		value.where = { id: { val: value.id } };
	}
</script>

<div class="flex justify-end sm:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.User.name()}
		{/if}
	</span>
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	>
		<slot />
	</Buttons>
</div>
<div class="divider" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<slot name="name">
			{#if !fields.name?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields.name?.readonly}
						disabled={fields.name?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description">
			{#if !fields.description?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.description.name()} />
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields.description?.readonly}
						disabled={fields.description?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="lastName">
			{#if !fields.lastName?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
					<StringInput
						{id}
						name="lastName"
						bind:value={value.lastName}
						errors={errors.lastName}
						readonly={fields.lastName?.readonly}
						disabled={fields.lastName?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="login">
			{#if !fields.login?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.login.name()} />
					<StringInput
						{id}
						name="login"
						bind:value={value.login}
						errors={errors.login}
						readonly={fields.login?.readonly}
						disabled={fields.login?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="email">
			{#if !fields.email?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
					<StringInput
						{id}
						name="email"
						bind:value={value.email}
						errors={errors.email}
						readonly={fields.email?.readonly}
						disabled={fields.email?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="phones">
			{#if !fields.phones?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
					<StringInput
						{id}
						name="phones"
						bind:value={value.phones}
						errors={errors.phones}
						readonly={fields.phones?.readonly}
						disabled={fields.phones?.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="disable">
			{#if !fields.disable?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.disable.name()} />
					<BooleanInput
						{id}
						name="disable"
						bind:value={value.disable}
						errors={errors.disable}
						readonly={fields.disable?.readonly}
						disabled={fields.disable?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="groups">
			{#if !fields.groups?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.groups.name()} />
					<GroupSelect
						{id}
						name="groups"
						errors={errors.groups}
						bind:value={value.groups}
						readonly={fields.groups?.readonly}
						disabled={fields.groups?.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles">
			{#if !fields.roles?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.roles.name()} />
					<RoleSelect
						{id}
						name="roles"
						errors={errors.roles}
						bind:value={value.roles}
						readonly={fields.roles?.readonly}
						disabled={fields.roles?.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="realm">
			{#if !fields.realm?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.realm.name()} />
					{#if value.id}
						<ObjectLink
							bind:value={value.realm}
							textFieldName="name"
							path={`${value.id}/realm`}
							name={$LL.graphql.objects.User.fields.realm.name()}
							disabled={fields.realm?.disabled}
							on:goto
						/>
					{:else}
						<RealmTableDialog
							bind:value={value.realm}
							class="btn-link"
							textFieldName="name"
							singleChoice
							readonly={fields.realm?.readonly}
							disabled={fields.realm?.disabled}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.realm} />
				</FormControl>
			{/if}
		</slot>
	{:else}
		<div class="col-span-full">
			<Empty />
		</div>
	{/if}
</Form>
<div class="divider" />
<div class="flex justify-end">
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>