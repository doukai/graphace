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
	import { StringInput, BooleanInput, ObjectLink } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import {
		userFields,
		type UserFields,
		type UserFieldsArgs,
		userFormTab,
		userFormTabs,
		userFormTabChange,
		validate
	} from '~/lib/components/objects/user/UserOption';
	import type { UserInput, QueryUserArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: UserInput | null | undefined = undefined;
	export let args: QueryUserArgs = {};
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryUserArgs | undefined) => TabInfo[] | undefined) | undefined = userFormTabs;
	export let tab: ((args?: QueryUserArgs | undefined) => string | undefined) | undefined = userFormTab;
	export let fields: UserFields | undefined = userFields;
	export let fieldsPatch: UserFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: UserFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryUserArgs; };
		remove: { value: UserInput | null | undefined };
		unbind: { value: UserInput | null | undefined };
		save: { value: UserInput | null | undefined };
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
				userFormTabChange(e.detail.value, args, value)
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
						text={$LL.graphql.objects.User.fields.name.name()}
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
						text={$LL.graphql.objects.User.fields.description.name()}
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
		<slot name="lastName" {value} {errors} {fields}>
			{#if !fields?.lastName?.hidden?.(value, fieldsArgs?.lastName)}
				<FormControl let:id {...fields?.lastName?.props?.($LL, value, fieldsArgs?.lastName)?.['form-control']}>
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
						readonly={fields?.lastName?.readonly?.(value, fieldsArgs?.lastName)}
						disabled={fields?.lastName?.disabled?.(value, fieldsArgs?.lastName)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.lastName
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.lastName)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, lastName: e }));
							}
						}}
						{...fields?.lastName?.props?.($LL, value, fieldsArgs?.lastName)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="login" {value} {errors} {fields}>
			{#if !fields?.login?.hidden?.(value, fieldsArgs?.login)}
				<FormControl let:id {...fields?.login?.props?.($LL, value, fieldsArgs?.login)?.['form-control']}>
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
						readonly={fields?.login?.readonly?.(value, fieldsArgs?.login)}
						disabled={fields?.login?.disabled?.(value, fieldsArgs?.login)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.login
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.login)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, login: e }));
							}
						}}
						{...fields?.login?.props?.($LL, value, fieldsArgs?.login)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="email" {value} {errors} {fields}>
			{#if !fields?.email?.hidden?.(value, fieldsArgs?.email)}
				<FormControl let:id {...fields?.email?.props?.($LL, value, fieldsArgs?.email)?.['form-control']}>
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
						readonly={fields?.email?.readonly?.(value, fieldsArgs?.email)}
						disabled={fields?.email?.disabled?.(value, fieldsArgs?.email)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.email
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.email)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, email: e }));
							}
						}}
						{...fields?.email?.props?.($LL, value, fieldsArgs?.email)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="phones" {value} {errors} {fields}>
			{#if !fields?.phones?.hidden?.(value, fieldsArgs?.phones)}
				<FormControl let:id {...fields?.phones?.props?.($LL, value, fieldsArgs?.phones)?.['form-control']}>
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
						readonly={fields?.phones?.readonly?.(value, fieldsArgs?.phones)}
						disabled={fields?.phones?.disabled?.(value, fieldsArgs?.phones)}
						on:change={(e) => {
							if (Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.phones
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.phones)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, phones: e }));
							}
						}}
						list
						{...fields?.phones?.props?.($LL, value, fieldsArgs?.phones)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="disable" {value} {errors} {fields}>
			{#if !fields?.disable?.hidden?.(value, fieldsArgs?.disable)}
				<FormControl let:id {...fields?.disable?.props?.($LL, value, fieldsArgs?.disable)?.['form-control']}>
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
						readonly={fields?.disable?.readonly?.(value, fieldsArgs?.disable)}
						disabled={fields?.disable?.disabled?.(value, fieldsArgs?.disable)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.disable
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.disable)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, disable: e }));
							}
						}}
						{...fields?.disable?.props?.($LL, value, fieldsArgs?.disable)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="groups" {value} {errors} {fields}>
			{#if !fields?.groups?.hidden?.(value, fieldsArgs?.groups)}
				<FormControl let:id {...fields?.groups?.props?.($LL, value, fieldsArgs?.groups)?.['form-control']}>
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
		<slot name="roles" {value} {errors} {fields}>
			{#if !fields?.roles?.hidden?.(value, fieldsArgs?.roles)}
				<FormControl let:id {...fields?.roles?.props?.($LL, value, fieldsArgs?.roles)?.['form-control']}>
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
			{#if !fields?.realm?.hidden?.(value, fieldsArgs?.realm)}
				<FormControl let:id {...fields?.realm?.props?.($LL, value, fieldsArgs?.realm)?.['form-control']}>
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