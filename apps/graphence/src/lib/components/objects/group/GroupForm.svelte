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
	import { StringInput, IntInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		groupFields,
		type GroupFields,
		type GroupFieldsArgs,
		groupFormTab,
		groupFormTabs,
		groupFormTabChange,
		validate
	} from '~/lib/components/objects/group/GroupOption';
	import type { GroupInput, QueryGroupArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: GroupInput | null | undefined = undefined;
	export let args: QueryGroupArgs = {};
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryGroupArgs | undefined) => TabInfo[] | undefined) | undefined = groupFormTabs;
	export let tab: string | undefined = groupFormTab?.(args);
	export let fields: GroupFields | undefined = groupFields;
	export let fieldsPatch: GroupFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: GroupFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryGroupArgs; };
		remove: { value: GroupInput | null | undefined };
		unbind: { value: GroupInput | null | undefined };
		save: { value: GroupInput | null | undefined };
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
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				groupFormTabChange(e.detail.value, args, value)
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
						text={$LL.graphql.objects.Group.fields.name.name()}
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
						text={$LL.graphql.objects.Group.fields.description.name()}
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
		<slot name="path" {value} {errors} {fields}>
			{#if !fields?.path?.hidden?.(value, tab, fieldsArgs?.path)}
				<FormControl let:id {...fields?.path?.props?.($LL, value, fieldsArgs?.path)?.['form-control']}>
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
						readonly={fields?.path?.readonly?.(value, fieldsArgs?.path)}
						disabled={fields?.path?.disabled?.(value, fieldsArgs?.path)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.path
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.path)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, path: e }));
							}
						}}
						{...fields?.path?.props?.($LL, value, fieldsArgs?.path)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="deep" {value} {errors} {fields}>
			{#if !fields?.deep?.hidden?.(value, tab, fieldsArgs?.deep)}
				<FormControl let:id {...fields?.deep?.props?.($LL, value, fieldsArgs?.deep)?.['form-control']}>
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
						readonly={fields?.deep?.readonly?.(value, fieldsArgs?.deep)}
						disabled={fields?.deep?.disabled?.(value, fieldsArgs?.deep)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.deep
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.deep)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, deep: e }));
							}
						}}
						{...fields?.deep?.props?.($LL, value, fieldsArgs?.deep)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parentId" {value} {errors} {fields}>
			{#if !fields?.parentId?.hidden?.(value, tab, fieldsArgs?.parentId)}
				<FormControl let:id {...fields?.parentId?.props?.($LL, value, fieldsArgs?.parentId)?.['form-control']}>
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
						readonly={fields?.parentId?.readonly?.(value, fieldsArgs?.parentId)}
						disabled={fields?.parentId?.disabled?.(value, fieldsArgs?.parentId)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.parentId
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.parentId)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, parentId: e }));
							}
						}}
						{...fields?.parentId?.props?.($LL, value, fieldsArgs?.parentId)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parent" {value} {errors} {fields}>
			{#if !fields?.parent?.hidden?.(value, tab, fieldsArgs?.parent)}
				<FormControl let:id {...fields?.parent?.props?.($LL, value, fieldsArgs?.parent)?.['form-control']}>
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
						readonly={fields?.parent?.readonly?.(value, fieldsArgs?.parent)}
						disabled={fields?.parent?.disabled?.(value, fieldsArgs?.parent)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.parent
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.parent)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, parent: e }));
							}
						}}
						{...fields?.parent?.props?.($LL, value, fieldsArgs?.parent)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="subGroups" {value} {errors} {fields}>
			{#if !fields?.subGroups?.hidden?.(value, tab, fieldsArgs?.subGroups)}
				<FormControl let:id {...fields?.subGroups?.props?.($LL, value, fieldsArgs?.subGroups)?.['form-control']}>
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
						readonly={fields?.subGroups?.readonly?.(value, fieldsArgs?.subGroups)}
						disabled={fields?.subGroups?.disabled?.(value, fieldsArgs?.subGroups)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.subGroups
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.subGroups)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, subGroups: e }));
							}
						}}
						list
						{...fields?.subGroups?.props?.($LL, value, fieldsArgs?.subGroups)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="users" {value} {errors} {fields}>
			{#if !fields?.users?.hidden?.(value, tab, fieldsArgs?.users)}
				<FormControl let:id {...fields?.users?.props?.($LL, value, fieldsArgs?.users)?.['form-control']}>
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
						readonly={fields?.users?.readonly?.(value, fieldsArgs?.users)}
						disabled={fields?.users?.disabled?.(value, fieldsArgs?.users)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.users
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.users)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, users: e }));
							}
						}}
						list
						{...fields?.users?.props?.($LL, value, fieldsArgs?.users)?.['combobox']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value, tab, fieldsArgs?.roles)}
				<FormControl let:id {...fields?.roles?.props?.($LL, value, fieldsArgs?.roles)?.['form-control']}>
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
						text={$LL.graphql.objects.Group.fields.realm.name()}
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