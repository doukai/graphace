<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { StringInput, IntInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import { groupFields, type GroupFields } from '~/lib/components/objects/group/GroupOption';
	import type { GroupInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: GroupInput | null | undefined = undefined;
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
	export let fields: GroupFields | undefined = groupFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: GroupInput | null | undefined };
		unbind: { value: GroupInput | null | undefined };
		save: { value: GroupInput | null | undefined };
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
			const pathErrors = await fields?.path?.validate?.(value);
			if (pathErrors && pathErrors.length > 0) {
				errors['path'] = { errors: pathErrors.map((message) => ({ message })) };
			}
			const deepErrors = await fields?.deep?.validate?.(value);
			if (deepErrors && deepErrors.length > 0) {
				errors['deep'] = { errors: deepErrors.map((message) => ({ message })) };
			}
			const parentIdErrors = await fields?.parentId?.validate?.(value);
			if (parentIdErrors && parentIdErrors.length > 0) {
				errors['parentId'] = { errors: parentIdErrors.map((message) => ({ message })) };
			}
			const parentErrors = await fields?.parent?.validate?.(value);
			if (parentErrors && parentErrors.length > 0) {
				errors['parent'] = { errors: parentErrors.map((message) => ({ message })) };
			}
			const subGroupsErrors = await fields?.subGroups?.validate?.(value);
			if (subGroupsErrors && subGroupsErrors.length > 0) {
				errors['subGroups'] = { errors: subGroupsErrors.map((message) => ({ message })) };
			}
			const usersErrors = await fields?.users?.validate?.(value);
			if (usersErrors && usersErrors.length > 0) {
				errors['users'] = { errors: usersErrors.map((message) => ({ message })) };
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
				resolve: (data: GroupInput | null | undefined) => void,
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
				{$LL.graphql.objects.Group.name()}
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
						text={$LL.graphql.objects.Group.fields.name.name()}
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
						text={$LL.graphql.objects.Group.fields.description.name()}
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
		<slot name="path" {value} {errors} {fields}>
			{#if !fields?.path?.hidden?.(value)}
				<FormControl let:id {...fields?.path?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.path.name()}
						required={fields?.path?.required?.(value)}
					/>
					<StringInput
						{id}
						name="path"
						bind:value={value.path}
						errors={errors.path}
						readonly={fields?.path?.readonly?.(value)}
						disabled={fields?.path?.disabled?.(value)}
						on:change={(e) => fields?.path?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.path?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="deep" {value} {errors} {fields}>
			{#if !fields?.deep?.hidden?.(value)}
				<FormControl let:id {...fields?.deep?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.deep.name()}
						required={fields?.deep?.required?.(value)}
					/>
					<IntInput
						{id}
						name="deep"
						bind:value={value.deep}
						errors={errors.deep}
						readonly={fields?.deep?.readonly?.(value)}
						disabled={fields?.deep?.disabled?.(value)}
						on:change={(e) => fields?.deep?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.deep?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parentId" {value} {errors} {fields}>
			{#if !fields?.parentId?.hidden?.(value)}
				<FormControl let:id {...fields?.parentId?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.parentId.name()}
						required={fields?.parentId?.required?.(value)}
					/>
					<StringInput
						{id}
						name="parentId"
						bind:value={value.parentId}
						errors={errors.parentId}
						readonly={fields?.parentId?.readonly?.(value)}
						disabled={fields?.parentId?.disabled?.(value)}
						on:change={(e) => fields?.parentId?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.parentId?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parent" {value} {errors} {fields}>
			{#if !fields?.parent?.hidden?.(value)}
				<FormControl let:id {...fields?.parent?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.parent.name()}
						required={fields?.parent?.required?.(value)}
					/>
					<GroupSelect
						{id}
						name="parent"
						bind:value={value.parent}
						errors={errors.parent}
						readonly={fields?.parent?.readonly?.(value)}
						disabled={fields?.parent?.disabled?.(value)}
						on:change={(e) => fields?.parent?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.parent?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="subGroups" {value} {errors} {fields}>
			{#if !fields?.subGroups?.hidden?.(value)}
				<FormControl let:id {...fields?.subGroups?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.subGroups.name()}
						required={fields?.subGroups?.required?.(value)}
					/>
					<GroupSelect
						{id}
						name="subGroups"
						bind:value={value.subGroups}
						errors={errors.subGroups}
						readonly={fields?.subGroups?.readonly?.(value)}
						disabled={fields?.subGroups?.disabled?.(value)}
						on:change={(e) => fields?.subGroups?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.subGroups?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="users" {value} {errors} {fields}>
			{#if !fields?.users?.hidden?.(value)}
				<FormControl let:id {...fields?.users?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.users.name()}
						required={fields?.users?.required?.(value)}
					/>
					<UserSelect
						{id}
						name="users"
						bind:value={value.users}
						errors={errors.users}
						readonly={fields?.users?.readonly?.(value)}
						disabled={fields?.users?.disabled?.(value)}
						on:change={(e) => fields?.users?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.users?.props?.(value)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value)}
				<FormControl let:id {...fields?.roles?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Group.fields.roles.name()}
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
						text={$LL.graphql.objects.Group.fields.realm.name()}
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