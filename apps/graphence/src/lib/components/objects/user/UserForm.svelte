<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { StringInput, BooleanInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import { userFields, type UserFields } from '~/lib/components/objects/user/UserOption';
	import type { UserInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
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
	export let fields: UserFields | undefined = userFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: UserInput | null | undefined };
		unbind: { value: UserInput | null | undefined };
		save: { value: UserInput | null | undefined };
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
			const lastNameErrors = await fields?.lastName?.validate?.(value);
			if (lastNameErrors && lastNameErrors.length > 0) {
				errors['lastName'] = { errors: lastNameErrors.map((message) => ({ message })) };
			}
			const loginErrors = await fields?.login?.validate?.(value);
			if (loginErrors && loginErrors.length > 0) {
				errors['login'] = { errors: loginErrors.map((message) => ({ message })) };
			}
			const emailErrors = await fields?.email?.validate?.(value);
			if (emailErrors && emailErrors.length > 0) {
				errors['email'] = { errors: emailErrors.map((message) => ({ message })) };
			}
			const phonesErrors = await fields?.phones?.validate?.(value);
			if (phonesErrors && phonesErrors.length > 0) {
				errors['phones'] = { errors: phonesErrors.map((message) => ({ message })) };
			}
			const disableErrors = await fields?.disable?.validate?.(value);
			if (disableErrors && disableErrors.length > 0) {
				errors['disable'] = { errors: disableErrors.map((message) => ({ message })) };
			}
			const groupsErrors = await fields?.groups?.validate?.(value);
			if (groupsErrors && groupsErrors.length > 0) {
				errors['groups'] = { errors: groupsErrors.map((message) => ({ message })) };
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
				resolve: (data: UserInput | null | undefined) => void,
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
				{$LL.graphql.objects.User.name()}
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
						text={$LL.graphql.objects.User.fields.name.name()}
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
						text={$LL.graphql.objects.User.fields.description.name()}
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
		<slot name="lastName" {value} {errors} {fields}>
			{#if !fields?.lastName?.hidden?.(value)}
				<FormControl let:id {...fields?.lastName?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.lastName.name()}
						required={fields?.lastName?.required?.(value)}
					/>
					<StringInput
						{id}
						name="lastName"
						bind:value={value.lastName}
						errors={errors.lastName}
						readonly={fields?.lastName?.readonly?.(value)}
						disabled={fields?.lastName?.disabled?.(value)}
						on:change={(e) => fields?.lastName?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.lastName?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="login" {value} {errors} {fields}>
			{#if !fields?.login?.hidden?.(value)}
				<FormControl let:id {...fields?.login?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.login.name()}
						required={fields?.login?.required?.(value)}
					/>
					<StringInput
						{id}
						name="login"
						bind:value={value.login}
						errors={errors.login}
						readonly={fields?.login?.readonly?.(value)}
						disabled={fields?.login?.disabled?.(value)}
						on:change={(e) => fields?.login?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.login?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="email" {value} {errors} {fields}>
			{#if !fields?.email?.hidden?.(value)}
				<FormControl let:id {...fields?.email?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.email.name()}
						required={fields?.email?.required?.(value)}
					/>
					<StringInput
						{id}
						name="email"
						bind:value={value.email}
						errors={errors.email}
						readonly={fields?.email?.readonly?.(value)}
						disabled={fields?.email?.disabled?.(value)}
						on:change={(e) => fields?.email?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.email?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="phones" {value} {errors} {fields}>
			{#if !fields?.phones?.hidden?.(value)}
				<FormControl let:id {...fields?.phones?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.phones.name()}
						required={fields?.phones?.required?.(value)}
					/>
					<StringInput
						{id}
						name="phones"
						bind:value={value.phones}
						errors={errors.phones}
						readonly={fields?.phones?.readonly?.(value)}
						disabled={fields?.phones?.disabled?.(value)}
						on:change={(e) => fields?.phones?.onChange?.(e.detail.value, value).then((next) => value = next)}
						list
						{...fields?.phones?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="disable" {value} {errors} {fields}>
			{#if !fields?.disable?.hidden?.(value)}
				<FormControl let:id {...fields?.disable?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.disable.name()}
						required={fields?.disable?.required?.(value)}
					/>
					<BooleanInput
						{id}
						name="disable"
						bind:value={value.disable}
						errors={errors.disable}
						readonly={fields?.disable?.readonly?.(value)}
						disabled={fields?.disable?.disabled?.(value)}
						on:change={(e) => fields?.disable?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.disable?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="groups" {value} {errors} {fields}>
			{#if !fields?.groups?.hidden?.(value)}
				<FormControl let:id {...fields?.groups?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.groups.name()}
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
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value)}
				<FormControl let:id {...fields?.roles?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.User.fields.roles.name()}
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
						text={$LL.graphql.objects.User.fields.realm.name()}
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