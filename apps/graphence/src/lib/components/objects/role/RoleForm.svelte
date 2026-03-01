<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { StringInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import { roleFields, type RoleFields } from '~/lib/components/objects/role/RoleOption';
	import type { RoleInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
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
	export let fields: RoleFields | undefined = roleFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: RoleInput | null | undefined };
		unbind: { value: RoleInput | null | undefined };
		save: { value: RoleInput | null | undefined };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();

	const validate = async () => {
		errors = {};
		if (value) {
			const nameErrors = await fields?.name?.validate?.(value);
			if (nameErrors && nameErrors.length > 0) {
				errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
			}
			const descriptionErrors = await fields?.description?.validate?.(value);
			if (descriptionErrors && descriptionErrors.length > 0) {
				errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
			}
			const usersErrors = await fields?.users?.validate?.(value);
			if (usersErrors && usersErrors.length > 0) {
				errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
			}
			const groupsErrors = await fields?.groups?.validate?.(value);
			if (groupsErrors && groupsErrors.length > 0) {
				errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
			}
			const compositesErrors = await fields?.composites?.validate?.(value);
			if (compositesErrors && compositesErrors.length > 0) {
				errors['composites'] = { errors: compositesErrors.map((message) => ({ message })) };
			}
			const permissionsErrors = await fields?.permissions?.validate?.(value);
			if (permissionsErrors && permissionsErrors.length > 0) {
				errors['permissions'] = { errors: permissionsErrors.map((message) => ({ message })) };
			}
			const realmErrors = await fields?.realm?.validate?.(value);
			if (realmErrors && realmErrors.length > 0) {
				errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
			}
		}

		return new Promise(
			(
				resolve: (data: RoleInput | null | undefined) => void,
				reject: (errors: Record<string, Errors>) => void
			) => {
				if (Object.keys(errors).length === 0) {
					resolve(value);
				} else {
					reject(errors);
				}
			}
		);
	};
</script>

<div class="flex justify-between">
	<slot name="title">
		<span class="text-xl font-semibold self-center">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.Role.name()}
			{/if}
		</span>
	</slot>
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => validate().then(() => dispatch('save', { value }))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	>
		<slot />
	</Buttons>
</div>
<div class="divider my-0" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<slot name="name" {value} {errors} {fields}>
			{#if !fields?.name?.hidden?.(value)}
				<FormControl let:id {...fields?.name?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.name.name()}
						required={fields?.name?.required?.(value)}
					/>
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields?.name?.readonly?.(value)}
						disabled={fields?.name?.disabled?.(value)}
						on:change={(e) => fields?.name?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.name?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description" {value} {errors} {fields}>
			{#if !fields?.description?.hidden?.(value)}
				<FormControl let:id {...fields?.description?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.description.name()}
						required={fields?.description?.required?.(value)}
					/>
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields?.description?.readonly?.(value)}
						disabled={fields?.description?.disabled?.(value)}
						on:change={(e) => fields?.description?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.description?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="users" {value} {errors} {fields}>
			{#if !fields?.users?.hidden?.(value)}
				<FormControl let:id {...fields?.users?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.users.name()}
						required={fields?.users?.required?.(value)}
					/>
					{#if value.id}
						<ObjectLink
							bind:value={value.users}
							textFieldName="name"
							path={`${value.id}/users`}
							on:goto
							{...fields?.users?.props?.(value)?.['link']}
						/>
					{:else}
						<UserTableDialog
							bind:value={value.users}
							textFieldName="name"
							class="btn-link"
							readonly={fields?.users?.readonly?.(value)}
							disabled={fields?.users?.disabled?.(value)}
							on:select={(e) => fields?.users?.onChange?.(e.detail.value, value).then((next) => value = next)}
							{...fields?.users?.props?.(value)?.['dialog']}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.users} />
				</FormControl>
			{/if}
		</slot>
		<slot name="groups" {value} {errors} {fields}>
			{#if !fields?.groups?.hidden?.(value)}
				<FormControl let:id {...fields?.groups?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.groups.name()}
						required={fields?.groups?.required?.(value)}
					/>
					<GroupSelect
						{id}
						name="groups"
						bind:value={value.groups}
						errors={errors.groups}
						readonly={fields?.groups?.readonly?.(value)}
						disabled={fields?.groups?.disabled?.(value)}
						on:change={(e) => fields?.groups?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.groups?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="composites" {value} {errors} {fields}>
			{#if !fields?.composites?.hidden?.(value)}
				<FormControl let:id {...fields?.composites?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.composites.name()}
						required={fields?.composites?.required?.(value)}
					/>
					<RoleSelect
						{id}
						name="composites"
						bind:value={value.composites}
						errors={errors.composites}
						readonly={fields?.composites?.readonly?.(value)}
						disabled={fields?.composites?.disabled?.(value)}
						on:change={(e) => fields?.composites?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.composites?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissions" {value} {errors} {fields}>
			{#if !fields?.permissions?.hidden?.(value)}
				<FormControl let:id {...fields?.permissions?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.permissions.name()}
						required={fields?.permissions?.required?.(value)}
					/>
					{#if value.id}
						<ObjectLink
							bind:value={value.permissions}
							path={`${value.id}/permissions`}
							on:goto
							{...fields?.permissions?.props?.(value)?.['link']}
						/>
					{:else}
						<PermissionTableDialog
							bind:value={value.permissions}
							class="btn-link"
							readonly={fields?.permissions?.readonly?.(value)}
							disabled={fields?.permissions?.disabled?.(value)}
							on:select={(e) => fields?.permissions?.onChange?.(e.detail.value, value).then((next) => value = next)}
							{...fields?.permissions?.props?.(value)?.['dialog']}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.permissions} />
				</FormControl>
			{/if}
		</slot>
		<slot name="realm" {value} {errors} {fields}>
			{#if !fields?.realm?.hidden?.(value)}
				<FormControl let:id {...fields?.realm?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Role.fields.realm.name()}
						required={fields?.realm?.required?.(value)}
					/>
					{#if value.id}
						<ObjectLink
							bind:value={value.realm}
							textFieldName="name"
							path={`${value.id}/realm`}
							on:goto
							{...fields?.realm?.props?.(value)?.['link']}
						/>
					{:else}
						<RealmTableDialog
							bind:value={value.realm}
							textFieldName="name"
							singleChoice
							class="btn-link"
							readonly={fields?.realm?.readonly?.(value)}
							disabled={fields?.realm?.disabled?.(value)}
							on:select={(e) => fields?.realm?.onChange?.(e.detail.value, value).then((next) => value = next)}
							{...fields?.realm?.props?.(value)?.['dialog']}
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
<div class="divider my-0" />
<div class="flex justify-end">
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => validate().then(() => dispatch('save', { value }))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>