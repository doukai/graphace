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
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		roleFields,
		type RoleFields,
		type RoleFieldsArgs,
		roleFormTab,
		roleFormTabs,
		roleFormTabChange,
		validate
	} from '~/lib/components/objects/role/RoleOption';
	import type { RoleInput, QueryRoleArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: RoleInput | null | undefined = undefined;
	export let args: QueryRoleArgs = {};
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
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto [&_[data-part=input]]:min-w-0';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryRoleArgs | undefined) => TabInfo[] | undefined) | undefined = roleFormTabs;
	export let tab: ((args?: QueryRoleArgs | undefined) => string | undefined) | undefined = roleFormTab;
	export let fields: RoleFields | undefined = roleFields;
	export let fieldsPatch: RoleFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RoleFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryRoleArgs; };
		remove: { value: RoleInput | null | undefined };
		unbind: { value: RoleInput | null | undefined };
		save: { value: RoleInput | null | undefined };
		tabChange: { tab: string; origin: string; };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-between">
	<slot name="start" />
	<slot name="title">
		<span class="text-xl font-semibold self-center max-sm:hidden">
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
<div class="divider my-0" />
{#if tabs?.($LL, args)}
	<Tabs
		value={tab?.(args)}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				roleFormTabChange(e.detail.value, args, value)
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
			{#if !fields?.name?.hidden?.(value, fieldsArgs?.name)}
				<FormControl let:id {...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['form-control']}>
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
			{#if !fields?.description?.hidden?.(value, fieldsArgs?.description)}
				<FormControl let:id {...fields?.description?.props?.($LL, value, fieldsArgs?.description)?.['form-control']}>
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
		<slot name="users" {value} {errors} {fields}>
			{#if !fields?.users?.hidden?.(value, fieldsArgs?.users)}
				<FormControl let:id {...fields?.users?.props?.($LL, value, fieldsArgs?.users)?.['form-control']}>
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
							{...fields?.users?.props?.($LL, value, fieldsArgs?.users)?.['link']}
						/>
					{:else}
						<UserTableDialog
							fieldsPatch={fields?.users?.fields?.(value, fieldsArgs?.users)}
							bind:value={value.users}
							textFieldName="name"
							class="btn-link"
							readonly={fields?.users?.readonly?.(value, fieldsArgs?.users)}
							disabled={fields?.users?.disabled?.(value, fieldsArgs?.users)}
							on:select={(e) => {
								if (Array.isArray(e.detail.value) || e.detail.value == null) {
									fields?.users
										?.onChange?.($LL, e.detail.value, value, fieldsArgs?.users)
										.then((next) => (value = next))
										.catch((e) => (errors = { ...errors, users: e }));
								}
							}}
							{...fields?.users?.props?.($LL, value, fieldsArgs?.users)?.['dialog']}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.users} />
				</FormControl>
			{/if}
		</slot>
		<slot name="groups" {value} {errors} {fields}>
			{#if !fields?.groups?.hidden?.(value, fieldsArgs?.groups)}
				<FormControl let:id {...fields?.groups?.props?.($LL, value, fieldsArgs?.groups)?.['form-control']}>
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
						readonly={fields?.groups?.readonly?.(value, fieldsArgs?.groups)}
						disabled={fields?.groups?.disabled?.(value, fieldsArgs?.groups)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.groups
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.groups)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, groups: e }));
							}
						}}
						list
						{...fields?.groups?.props?.($LL, value, fieldsArgs?.groups)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="composites" {value} {errors} {fields}>
			{#if !fields?.composites?.hidden?.(value, fieldsArgs?.composites)}
				<FormControl let:id {...fields?.composites?.props?.($LL, value, fieldsArgs?.composites)?.['form-control']}>
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
						readonly={fields?.composites?.readonly?.(value, fieldsArgs?.composites)}
						disabled={fields?.composites?.disabled?.(value, fieldsArgs?.composites)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.composites
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.composites)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, composites: e }));
							}
						}}
						list
						{...fields?.composites?.props?.($LL, value, fieldsArgs?.composites)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissions" {value} {errors} {fields}>
			{#if !fields?.permissions?.hidden?.(value, fieldsArgs?.permissions)}
				<FormControl let:id {...fields?.permissions?.props?.($LL, value, fieldsArgs?.permissions)?.['form-control']}>
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
							{...fields?.permissions?.props?.($LL, value, fieldsArgs?.permissions)?.['link']}
						/>
					{:else}
						<PermissionTableDialog
							fieldsPatch={fields?.permissions?.fields?.(value, fieldsArgs?.permissions)}
							bind:value={value.permissions}
							class="btn-link"
							readonly={fields?.permissions?.readonly?.(value, fieldsArgs?.permissions)}
							disabled={fields?.permissions?.disabled?.(value, fieldsArgs?.permissions)}
							on:select={(e) => {
								if (Array.isArray(e.detail.value) || e.detail.value == null) {
									fields?.permissions
										?.onChange?.($LL, e.detail.value, value, fieldsArgs?.permissions)
										.then((next) => (value = next))
										.catch((e) => (errors = { ...errors, permissions: e }));
								}
							}}
							{...fields?.permissions?.props?.($LL, value, fieldsArgs?.permissions)?.['dialog']}
						/>
					{/if}
					<ErrorLabels {id} errors={errors.permissions} />
				</FormControl>
			{/if}
		</slot>
		<slot name="realm" {value} {errors} {fields}>
			{#if !fields?.realm?.hidden?.(value, fieldsArgs?.realm)}
				<FormControl let:id {...fields?.realm?.props?.($LL, value, fieldsArgs?.realm)?.['form-control']}>
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
<div class="divider my-0" />
<div class="flex justify-end">
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
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