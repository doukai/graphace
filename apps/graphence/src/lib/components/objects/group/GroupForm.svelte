<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { type Option, StringInput, IntInput, ObjectInput } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import RealmTableDialog from '~/lib/components/objects/realm/RealmTableDialog.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput } from '~/lib/types/schema';
	
	export let value: GroupInput | null | undefined = undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = false;
	export let showUnbindButton: boolean = false;
	export let showSaveButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = false;
	export let zIndex: number = 0;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2';
	export { className as class };
	export let fields: {
		name: Option;
		description: Option;
		path: Option;
		deep: Option;
		parentId: Option;
		parent: Option;
		subGroups: Option;
		users: Option;
		roles: Option;
		realm: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		path: { readonly: false, disabled: false, hidden: false },
		deep: { readonly: false, disabled: false, hidden: false },
		parentId: { readonly: false, disabled: false, hidden: false },
		parent: { readonly: false, disabled: false, hidden: false },
		subGroups: { readonly: false, disabled: false, hidden: false },
		users: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: GroupInput | null | undefined };
		unbind: { value: GroupInput | null | undefined };
		save: { value: GroupInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Group.name()}
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
					<Label {id} text={$LL.graphql.objects.Group.fields.name.name()} />
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
					<Label {id} text={$LL.graphql.objects.Group.fields.description.name()} />
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
		<slot name="path">
			{#if !fields.path.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.path.name()} />
					<StringInput
					 	{id}
						name="path"
						bind:value={value.path}
						errors={errors.path}
						readonly={fields.path.readonly}
						disabled={fields.path.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="deep">
			{#if !fields.deep.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.deep.name()} />
					<IntInput
					 	{id}
						name="deep"
						bind:value={value.deep}
						errors={errors.deep}
						readonly={fields.deep.readonly}
						disabled={fields.deep.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parentId">
			{#if !fields.parentId.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.parentId.name()} />
					<StringInput
					 	{id}
						name="parentId"
						bind:value={value.parentId}
						errors={errors.parentId}
						readonly={fields.parentId.readonly}
						disabled={fields.parentId.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="parent">
			{#if !fields.parent.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.parent.name()} />
					<GroupSelect
					 	{id}
						name="parent"
						errors={errors.parent}
						bind:value={value.parent}
						where={true}
						readonly={fields.parent.readonly}
						disabled={fields.parent.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="subGroups">
			{#if !fields.subGroups.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.subGroups.name()} />
					<GroupSelect
					 	{id}
						name="subGroups"
						errors={errors.subGroups}
						bind:value={value.subGroups}
						where={true}
						readonly={fields.subGroups.readonly}
						disabled={fields.subGroups.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="users">
			{#if !fields.users.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.users.name()} />
					<UserSelect
					 	{id}
						name="users"
						errors={errors.users}
						bind:value={value.users}
						where={true}
						readonly={fields.users.readonly}
						disabled={fields.users.disabled}
						list
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="roles">
			{#if !fields.roles.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Group.fields.roles.name()} />
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
					<Label {id} text={$LL.graphql.objects.Group.fields.realm.name()} />
					{#if value.id}
						<ObjectInput
							namedStruct={value.realm}
							errors={errors.realm}
							disabled={fields.realm.disabled}
							path={`${value.id}/realm`}
							name={value.name + ':' + $LL.graphql.objects.Group.fields.realm.name()}
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
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>