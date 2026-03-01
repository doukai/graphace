<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { StringInput, ObjectLink } from '@graphace/ui-graphql';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import { permissionFields, type PermissionFields } from '~/lib/components/objects/permission/PermissionOption';
	import type { PermissionInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: PermissionInput | null | undefined = undefined;
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
	export let fields: PermissionFields | undefined = permissionFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: PermissionInput | null | undefined };
		unbind: { value: PermissionInput | null | undefined };
		save: { value: PermissionInput | null | undefined };
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
			const fieldErrors = await fields?.field?.validate?.(value);
			if (fieldErrors && fieldErrors.length > 0) {
				errors['field'] = { errors: fieldErrors.map((message) => ({ message })) };
			}
			const typeErrors = await fields?.type?.validate?.(value);
			if (typeErrors && typeErrors.length > 0) {
				errors['type'] = { errors: typeErrors.map((message) => ({ message })) };
			}
			const permissionTypeErrors = await fields?.permissionType?.validate?.(value);
			if (permissionTypeErrors && permissionTypeErrors.length > 0) {
				errors['permissionType'] = { errors: permissionTypeErrors.map((message) => ({ message })) };
			}
			const rolesErrors = await fields?.roles?.validate?.(value);
			if (rolesErrors && rolesErrors.length > 0) {
				errors['roles'] = { errors: rolesErrors.map((message) => ({ message })) };
			}
			const realmErrors = await fields?.realm?.validate?.(value);
			if (realmErrors && realmErrors.length > 0) {
				errors['realm'] = { errors: realmErrors.map((message) => ({ message })) };
			}
		}

		return new Promise(
			(
				resolve: (data: PermissionInput | null | undefined) => void,
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
				{$LL.graphql.objects.Permission.name()}
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
						text={$LL.graphql.objects.Permission.fields.name.name()}
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
						text={$LL.graphql.objects.Permission.fields.description.name()}
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
		<slot name="field" {value} {errors} {fields}>
			{#if !fields?.field?.hidden?.(value)}
				<FormControl let:id {...fields?.field?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Permission.fields.field.name()}
						required={fields?.field?.required?.(value)}
					/>
					<StringInput
						{id}
						name="field"
						bind:value={value.field}
						errors={errors.field}
						readonly={fields?.field?.readonly?.(value)}
						disabled={fields?.field?.disabled?.(value)}
						on:change={(e) => fields?.field?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.field?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="type" {value} {errors} {fields}>
			{#if !fields?.type?.hidden?.(value)}
				<FormControl let:id {...fields?.type?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Permission.fields.type.name()}
						required={fields?.type?.required?.(value)}
					/>
					<StringInput
						{id}
						name="type"
						bind:value={value.type}
						errors={errors.type}
						readonly={fields?.type?.readonly?.(value)}
						disabled={fields?.type?.disabled?.(value)}
						on:change={(e) => fields?.type?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.type?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissionType" {value} {errors} {fields}>
			{#if !fields?.permissionType?.hidden?.(value)}
				<FormControl let:id {...fields?.permissionType?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Permission.fields.permissionType.name()}
						required={fields?.permissionType?.required?.(value)}
					/>
					<PermissionTypeInput
						{id}
						name="permissionType"
						bind:value={value.permissionType}
						errors={errors.permissionType}
						readonly={fields?.permissionType?.readonly?.(value)}
						disabled={fields?.permissionType?.disabled?.(value)}
						on:change={(e) => fields?.permissionType?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.permissionType?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value)}
				<FormControl let:id {...fields?.roles?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Permission.fields.roles.name()}
						required={fields?.roles?.required?.(value)}
					/>
					<RoleSelect
						{id}
						name="roles"
						bind:value={value.roles}
						errors={errors.roles}
						readonly={fields?.roles?.readonly?.(value)}
						disabled={fields?.roles?.disabled?.(value)}
						on:change={(e) => fields?.roles?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.roles?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="realm" {value} {errors} {fields}>
			{#if !fields?.realm?.hidden?.(value)}
				<FormControl let:id {...fields?.realm?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Permission.fields.realm.name()}
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