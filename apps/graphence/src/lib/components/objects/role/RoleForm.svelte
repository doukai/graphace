<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { type Option, StringInput, ObjectInput } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import UserTableDialog from '~/lib/components/objects/user/UserTableDialog.svelte';
	import PermissionTableDialog from '~/lib/components/objects/permission/PermissionTableDialog.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RoleInput } from '~/lib/types/schema';
	
	export let value: RoleInput | null | undefined = undefined;
	export let isFetching: boolean = false;
	export let isMutating: boolean = false;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto';
	export { className as class };
	export let fields: {
		name: Option;
		description: Option;
		users: Option;
		groups: Option;
		composites: Option;
		permissions: Option;
		realm: Option;
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
		{$LL.graphql.objects.Role.name()}
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
					<Label {id} text={$LL.graphql.objects.Role.fields.name.name()} />
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
					<Label {id} text={$LL.graphql.objects.Role.fields.description.name()} />
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
		<slot name="users">
			{#if !fields.users.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.users.name()} />
					{#if value.id}
						<ObjectInput
							namedStruct={value.users}
							errors={errors.users}
							disabled={fields.users.disabled}
							path={`${value.id}/users`}
							name={value.name + ':' + $LL.graphql.objects.Role.fields.users.name()}
							on:goto
						/>
					{:else}
						<UserTableDialog
							bind:value={value.users}
							readonly={fields.users.readonly}
							disabled={fields.users.disabled}
						/>
					{/if}
				</FormControl>
			{/if}
		</slot>
		<slot name="groups">
			{#if !fields.groups.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.groups.name()} />
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
		<slot name="composites">
			{#if !fields.composites.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.composites.name()} />
					<RoleSelect
					 	{id}
						name="composites"
						errors={errors.composites}
						bind:value={value.composites}
						where={true}
						readonly={fields.composites.readonly}
						disabled={fields.composites.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="permissions">
			{#if !fields.permissions.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.permissions.name()} />
					{#if value.id}
						<ObjectInput
							errors={errors.permissions}
							disabled={fields.permissions.disabled}
							path={`${value.id}/permissions`}
							name={value.name + ':' + $LL.graphql.objects.Role.fields.permissions.name()}
							on:goto
						/>
					{:else}
						<PermissionTableDialog
							bind:value={value.permissions}
							readonly={fields.permissions.readonly}
							disabled={fields.permissions.disabled}
						/>
					{/if}
				</FormControl>
			{/if}
		</slot>
		<slot name="realm">
			{#if !fields.realm.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Role.fields.realm.name()} />
					{#if value.id}
						<ObjectInput
							namedStruct={value.realm}
							errors={errors.realm}
							disabled={fields.realm.disabled}
							path={`${value.id}/realm`}
							name={value.name + ':' + $LL.graphql.objects.Role.fields.realm.name()}
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