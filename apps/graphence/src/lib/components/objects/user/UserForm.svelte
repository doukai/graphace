<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { type Option, StringInput, BooleanInput, IntInput, FileInput, ObjectInput } from '@graphace/ui-graphql';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import FileTableDialog from '~/lib/components/objects/file/FileTableDialog.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';
	
	export let value: UserInput | null | undefined = undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2';
	export { className as class };
	export let fields: {
		name: Option;
		description: Option;
		lastName: Option;
		login: Option;
		email: Option;
		phones: Option;
		disable: Option;
		groups: Option;
		roles: Option;
		realm: Option;
		file: Option;
		files: Option;
		booleanList: Option;
		intList: Option;
		typeList: Option;
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
		realm: { readonly: false, disabled: false, hidden: false },
		file: { readonly: false, disabled: false, hidden: false },
		files: { readonly: false, disabled: false, hidden: false },
		booleanList: { readonly: false, disabled: false, hidden: false },
		intList: { readonly: false, disabled: false, hidden: false },
		typeList: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: UserInput | null | undefined };
		unbind: { value: UserInput | null | undefined };
		save: { value: UserInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.User.name()}
	</span>
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>
<div class="divider" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<slot name="name">
			{#if !fields.name.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
					<StringInput
					 	{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields.name.readonly}
						disabled={fields.name.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description">
			{#if !fields.description.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.description.name()} />
					<StringInput
					 	{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields.description.readonly}
						disabled={fields.description.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="lastName">
			{#if !fields.lastName.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
					<StringInput
					 	{id}
						name="lastName"
						bind:value={value.lastName}
						errors={errors.lastName}
						readonly={fields.lastName.readonly}
						disabled={fields.lastName.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="login">
			{#if !fields.login.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.login.name()} />
					<StringInput
					 	{id}
						name="login"
						bind:value={value.login}
						errors={errors.login}
						readonly={fields.login.readonly}
						disabled={fields.login.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="email">
			{#if !fields.email.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
					<StringInput
					 	{id}
						name="email"
						bind:value={value.email}
						errors={errors.email}
						readonly={fields.email.readonly}
						disabled={fields.email.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="phones">
			{#if !fields.phones.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
					<StringInput
					 	{id}
						name="phones"
						bind:value={value.phones}
						errors={errors.phones}
						readonly={fields.phones.readonly}
						disabled={fields.phones.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="disable">
			{#if !fields.disable.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.disable.name()} />
					<BooleanInput
					 	{id}
						name="disable"
						bind:value={value.disable}
						errors={errors.disable}
						readonly={fields.disable.readonly}
						disabled={fields.disable.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="groups">
			{#if !fields.groups.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.groups.name()} />
					<GroupSelect
					 	{id}
						name="groups"
						errors={errors.groups}
						bind:value={value.groups}
						where={true}
						readonly={fields.groups.readonly}
						disabled={fields.groups.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles">
			{#if !fields.roles.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.roles.name()} />
					<RoleSelect
					 	{id}
						name="roles"
						errors={errors.roles}
						bind:value={value.roles}
						where={true}
						readonly={fields.roles.readonly}
						disabled={fields.roles.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="realm">
			{#if !fields.realm.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.realm.name()} />
					{#if value.id}
						<ObjectInput
							namedStruct={value.realm}
							errors={errors.realm}
							disabled={fields.realm.disabled}
							path={`${value.id}/realm`}
							name={value.name + ':' + $LL.graphql.objects.User.fields.realm.name()}
							on:goto
						/>
					{:else}
						<RealmTableDialog
							bind:value={value.realm}
							singleChoice={true}
							readonly={fields.realm.readonly}
							disabled={fields.realm.disabled}
						/>
					{/if}
				</FormControl>
			{/if}
		</slot>
		<slot name="file">
			{#if !fields.file.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.file.name()} />
					<FileInput
					 	{id}
						name="file"
						bind:value={value.file}
						errors={errors.file}
						readonly={fields.file.readonly}
						disabled={fields.file.disabled}
						on:upload
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="files">
			{#if !fields.files.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.files.name()} />
					<FileInput
					 	{id}
						name="files"
						bind:value={value.files}
						errors={errors.files}
						readonly={fields.files.readonly}
						disabled={fields.files.disabled}
						list
						on:upload
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="booleanList">
			{#if !fields.booleanList.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.booleanList.name()} />
					<BooleanInput
					 	{id}
						name="booleanList"
						bind:value={value.booleanList}
						errors={errors.booleanList}
						readonly={fields.booleanList.readonly}
						disabled={fields.booleanList.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="intList">
			{#if !fields.intList.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.intList.name()} />
					<IntInput
					 	{id}
						name="intList"
						bind:value={value.intList}
						errors={errors.intList}
						readonly={fields.intList.readonly}
						disabled={fields.intList.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="typeList">
			{#if !fields.typeList.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.User.fields.typeList.name()} />
					<PermissionTypeInput
					 	{id}
						name="typeList"
						bind:value={value.typeList}
						errors={errors.typeList}
						readonly={fields.typeList.readonly}
						disabled={fields.typeList.disabled}
						list
					/>
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
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>