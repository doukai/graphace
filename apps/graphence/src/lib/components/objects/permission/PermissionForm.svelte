<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import {
		Buttons,
		Empty,
		Form,
		ErrorLabels,
		FormControl,
		Label,
		Loading,
		type TabInfo,
		Tabs,
		to
	} from '@graphace/ui';
	import { StringInput, ObjectLink } from '@graphace/ui-graphql';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		permissionInit,
		permissionFields,
		type PermissionFields,
		type PermissionFieldsArgs,
		permissionFormTab,
		permissionFormTabs,
		permissionFormTabChange,
		validate
	} from '~/lib/components/objects/permission/PermissionOption';
	import type { PermissionInput, QueryPermissionArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: PermissionInput | null | undefined = undefined;
	export let args: QueryPermissionArgs = {};
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
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto [&_[data-part=input]]:min-w-0 p-1';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryPermissionArgs | undefined) => TabInfo[] | undefined) | undefined = permissionFormTabs;
	export let tab: string | undefined = permissionFormTab?.(args);
	export let fields: PermissionFields | undefined = permissionFields;
	export let fieldsPatch: PermissionFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: PermissionFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryPermissionArgs; };
		remove: { value: PermissionInput | null | undefined };
		unbind: { value: PermissionInput | null | undefined };
		save: { value: PermissionInput | null | undefined };
		tabChange: { tab: string; origin: string; };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();

	if (permissionInit) {
		value = permissionInit(value);
	}
</script>

<div class="flex justify-between">
	<slot name="start" />
	<slot name="title">
		<span class="text-xl font-semibold self-center max-sm:hidden">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.Permission.name()}
			{/if}
		</span>
	</slot>
	<Buttons
		showRemoveButton={showRemoveButton && value?.id != null}
		showUnbindButton={showUnbindButton && value?.id != null}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		class="flex space-x-1 justify-end max-sm:w-full"
		loading={isMutating}
		on:save={(e) =>
			validate($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	>
		<slot />
	</Buttons>
</div>
{#if tabs?.($LL, args)}
	<Tabs
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				permissionFormTabChange(e.detail.value, args, value)
					.then((args) => {
						dispatch('query', {
							args
						});
					})
					.catch((e) => (errors = e));
			}
		}}
	/>
{/if}
<Form class={className}>
	{#if isFetching}
		<Loading class="col-span-full" />
	{:else if value}
		<slot name="name" {value} {errors} {fields}>
			{#if !fields?.name?.hidden?.(value, tab, fieldsArgs?.name)}
				<FormControl let:id {...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['form-control']}>
					<Label
						{id}
						text={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.Permission.fields.name.name()}
						required={fields?.name?.required?.(value)}
					/>
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields?.name?.readonly?.(value, fieldsArgs?.name)}
						disabled={fields?.name?.disabled?.(value, fieldsArgs?.name)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.name
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.name)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, name: e }));
							}
						}}
						{...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description" {value} {errors} {fields}>
			{#if !fields?.description?.hidden?.(value, tab, fieldsArgs?.description)}
				<FormControl let:id {...fields?.description?.props?.($LL, value, fieldsArgs?.description)?.['form-control']}>
					<Label
						{id}
						text={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.Permission.fields.description.name()}
						required={fields?.description?.required?.(value)}
					/>
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields?.description?.readonly?.(value, fieldsArgs?.description)}
						disabled={fields?.description?.disabled?.(value, fieldsArgs?.description)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.description
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.description)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, description: e }));
							}
						}}
						{...fields?.description?.props?.($LL, value, fieldsArgs?.description)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="field" {value} {errors} {fields}>
			{#if !fields?.field?.hidden?.(value, tab, fieldsArgs?.field)}
				<FormControl let:id {...fields?.field?.props?.($LL, value, fieldsArgs?.field)?.['form-control']}>
					<Label
						{id}
						text={fields?.field?.title?.($LL, fieldsArgs?.field) || $LL.graphql.objects.Permission.fields.field.name()}
						required={fields?.field?.required?.(value)}
					/>
					<StringInput
						{id}
						name="field"
						bind:value={value.field}
						errors={errors.field}
						readonly={fields?.field?.readonly?.(value, fieldsArgs?.field)}
						disabled={fields?.field?.disabled?.(value, fieldsArgs?.field)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.field
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.field)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, field: e }));
							}
						}}
						{...fields?.field?.props?.($LL, value, fieldsArgs?.field)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="type" {value} {errors} {fields}>
			{#if !fields?.type?.hidden?.(value, tab, fieldsArgs?.type)}
				<FormControl let:id {...fields?.type?.props?.($LL, value, fieldsArgs?.type)?.['form-control']}>
					<Label
						{id}
						text={fields?.type?.title?.($LL, fieldsArgs?.type) || $LL.graphql.objects.Permission.fields.type.name()}
						required={fields?.type?.required?.(value)}
					/>
					<StringInput
						{id}
						name="type"
						bind:value={value.type}
						errors={errors.type}
						readonly={fields?.type?.readonly?.(value, fieldsArgs?.type)}
						disabled={fields?.type?.disabled?.(value, fieldsArgs?.type)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.type
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.type)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, type: e }));
							}
						}}
						{...fields?.type?.props?.($LL, value, fieldsArgs?.type)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissionType" {value} {errors} {fields}>
			{#if !fields?.permissionType?.hidden?.(value, tab, fieldsArgs?.permissionType)}
				<FormControl let:id {...fields?.permissionType?.props?.($LL, value, fieldsArgs?.permissionType)?.['form-control']}>
					<Label
						{id}
						text={fields?.permissionType?.title?.($LL, fieldsArgs?.permissionType) || $LL.graphql.objects.Permission.fields.permissionType.name()}
						required={fields?.permissionType?.required?.(value)}
					/>
					<PermissionTypeInput
						{id}
						name="permissionType"
						bind:value={value.permissionType}
						errors={errors.permissionType}
						readonly={fields?.permissionType?.readonly?.(value, fieldsArgs?.permissionType)}
						disabled={fields?.permissionType?.disabled?.(value, fieldsArgs?.permissionType)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.permissionType
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.permissionType)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, permissionType: e }));
							}
						}}
						{...fields?.permissionType?.props?.($LL, value, fieldsArgs?.permissionType)?.['select']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value, tab, fieldsArgs?.roles)}
				<FormControl let:id {...fields?.roles?.props?.($LL, value, fieldsArgs?.roles)?.['form-control']}>
					<Label
						{id}
						text={fields?.roles?.title?.($LL, fieldsArgs?.roles) || $LL.graphql.objects.Permission.fields.roles.name()}
						required={fields?.roles?.required?.(value)}
					/>
					<RoleSelect
						{id}
						name="roles"
						bind:value={value.roles}
						errors={errors.roles}
						readonly={fields?.roles?.readonly?.(value, fieldsArgs?.roles)}
						disabled={fields?.roles?.disabled?.(value, fieldsArgs?.roles)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.roles
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.roles)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, roles: e }));
							}
						}}
						list
						{...fields?.roles?.props?.($LL, value, fieldsArgs?.roles)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="realm" {value} {errors} {fields}>
			{#if !fields?.realm?.hidden?.(value, tab, fieldsArgs?.realm)}
				<FormControl let:id {...fields?.realm?.props?.($LL, value, fieldsArgs?.realm)?.['form-control']}>
					<Label
						{id}
						text={fields?.realm?.title?.($LL, fieldsArgs?.realm) || $LL.graphql.objects.Permission.fields.realm.name()}
						required={fields?.realm?.required?.(value)}
					/>
					{#if value.id}
						<ObjectLink
							bind:value={value.realm}
							textFieldName="name"
							path={`${value.id}/realm`}
							on:goto
							{...fields?.realm?.props?.($LL, value, fieldsArgs?.realm)?.['link']}
						/>
					{:else}
						<RealmTableDialog
							fieldsPatch={fields?.realm?.fields?.(value, fieldsArgs?.realm)}
							bind:value={value.realm}
							textFieldName="name"
							singleChoice
							class="btn-link"
							readonly={fields?.realm?.readonly?.(value, fieldsArgs?.realm)}
							disabled={fields?.realm?.disabled?.(value, fieldsArgs?.realm)}
							on:select={(e) => {
								if (!Array.isArray(e.detail.value) || e.detail.value == null) {
									fields?.realm
										?.onChange?.($LL, e.detail.value, value, fieldsArgs?.realm)
										.then((next) => (value = next))
										.catch((e) => (errors = { ...errors, realm: e }));
								}
							}}
							{...fields?.realm?.props?.($LL, value, fieldsArgs?.realm)?.['dialog']}
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
<div class="flex justify-end">
	<Buttons
		showRemoveButton={showRemoveButton && value?.id != null}
		showUnbindButton={showUnbindButton && value?.id != null}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		class="flex space-x-1 justify-end max-sm:w-full"
		loading={isMutating}
		on:save={(e) =>
			validate($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>