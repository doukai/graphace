<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { type Option, StringInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { RoleInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	
	export let value: RoleInput | null | undefined = undefined;
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
		users?: Option | undefined;
		groups?: Option | undefined;
		composites?: Option | undefined;
		permissions?: Option | undefined;
		realm?: Option | undefined;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		users: { readonly: false, disabled: false, hidden: false },
		groups: { readonly: false, disabled: false, hidden: false },
		composites: { readonly: false, disabled: false, hidden: false },
		permissions: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: RoleInput | null | undefined };
		unbind: { value: RoleInput | null | undefined };
		save: { value: RoleInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end sm:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.Role.name()}
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
					<Label {id} text={$LL.graphql.objects.Role.fields.name.name()} />
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
					<Label {id} text={$LL.graphql.objects.Role.fields.description.name()} />
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
		<slot name="users">
			{#if !fields.users?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.users.name()} />
					{#if value.id}
						<ObjectLink
							bind:value={value.users}
							textFieldName="name"
							path={`${value.id}/users`}
							name={$LL.graphql.objects.Role.fields.users.name()}
							on:goto
						/>
					{:else}
						<UserTableDialog
							bind:value={value.users}
							class="btn-link"
							textFieldName="name"
							readonly={fields.users?.readonly}
							disabled={fields.users?.disabled}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.users} />
				</FormControl>
			{/if}
		</slot>
		<slot name="groups">
			{#if !fields.groups?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.groups.name()} />
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
		<slot name="composites">
			{#if !fields.composites?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.composites.name()} />
					<RoleSelect
						{id}
						name="composites"
						errors={errors.composites}
						bind:value={value.composites}
						readonly={fields.composites?.readonly}
						disabled={fields.composites?.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissions">
			{#if !fields.permissions?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.permissions.name()} />
					{#if value.id}
						<ObjectLink
							bind:value={value.permissions}
							path={`${value.id}/permissions`}
							name={$LL.graphql.objects.Role.fields.permissions.name()}
							on:goto
						/>
					{:else}
						<PermissionTableDialog
							bind:value={value.permissions}
							class="btn-link"
							readonly={fields.permissions?.readonly}
							disabled={fields.permissions?.disabled}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.permissions} />
				</FormControl>
			{/if}
		</slot>
		<slot name="realm">
			{#if !fields.realm?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.realm.name()} />
					{#if value.id}
						<ObjectLink
							bind:value={value.realm}
							textFieldName="name"
							path={`${value.id}/realm`}
							name={$LL.graphql.objects.Role.fields.realm.name()}
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