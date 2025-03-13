<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { IDInput, IDInputList, StringInput, StringInputList, IntInput, IntInputList, BooleanInput, BooleanInputList, TimestampInput, TimestampInputList, ObjectInput } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { GroupInput } from '~/lib/types/schema';
	
	export let value: GroupInput | null | undefined = undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	export let fields: {
		name: { readonly: boolean; disabled: boolean; hidden: boolean };
		description: { readonly: boolean; disabled: boolean; hidden: boolean };
		path: { readonly: boolean; disabled: boolean; hidden: boolean };
		deep: { readonly: boolean; disabled: boolean; hidden: boolean };
		parentId: { readonly: boolean; disabled: boolean; hidden: boolean };
		parent: { readonly: boolean; disabled: boolean; hidden: boolean };
		subGroups: { readonly: boolean; disabled: boolean; hidden: boolean };
		users: { readonly: boolean; disabled: boolean; hidden: boolean };
		roles: { readonly: boolean; disabled: boolean; hidden: boolean };
		realm: { readonly: boolean; disabled: boolean; hidden: boolean };
		subGroupsAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		subGroupsConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		usersAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		usersConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		rolesAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		rolesConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		idCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		idMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		idMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		pathCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		pathMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		pathMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		parentIdCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		parentIdMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		parentIdMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		deepCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		deepSum: { readonly: boolean; disabled: boolean; hidden: boolean };
		deepAvg: { readonly: boolean; disabled: boolean; hidden: boolean };
		deepMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		deepMin: { readonly: boolean; disabled: boolean; hidden: boolean };
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
		realm: { readonly: false, disabled: false, hidden: false },
		subGroupsAggregate: { readonly: false, disabled: false, hidden: false },
		subGroupsConnection: { readonly: false, disabled: false, hidden: false },
		usersAggregate: { readonly: false, disabled: false, hidden: false },
		usersConnection: { readonly: false, disabled: false, hidden: false },
		rolesAggregate: { readonly: false, disabled: false, hidden: false },
		rolesConnection: { readonly: false, disabled: false, hidden: false },
		idCount: { readonly: false, disabled: false, hidden: false },
		idMax: { readonly: false, disabled: false, hidden: false },
		idMin: { readonly: false, disabled: false, hidden: false },
		nameCount: { readonly: false, disabled: false, hidden: false },
		nameMax: { readonly: false, disabled: false, hidden: false },
		nameMin: { readonly: false, disabled: false, hidden: false },
		descriptionCount: { readonly: false, disabled: false, hidden: false },
		descriptionMax: { readonly: false, disabled: false, hidden: false },
		descriptionMin: { readonly: false, disabled: false, hidden: false },
		pathCount: { readonly: false, disabled: false, hidden: false },
		pathMax: { readonly: false, disabled: false, hidden: false },
		pathMin: { readonly: false, disabled: false, hidden: false },
		parentIdCount: { readonly: false, disabled: false, hidden: false },
		parentIdMax: { readonly: false, disabled: false, hidden: false },
		parentIdMin: { readonly: false, disabled: false, hidden: false },
		deepCount: { readonly: false, disabled: false, hidden: false },
		deepSum: { readonly: false, disabled: false, hidden: false },
		deepAvg: { readonly: false, disabled: false, hidden: false },
		deepMax: { readonly: false, disabled: false, hidden: false },
		deepMin: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: GroupInput | null | undefined };
		unbind: { value: GroupInput | null | undefined };
		save: { value: GroupInput | null | undefined };
		create: { value: GroupInput | null | undefined };
		select: {};
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
		{showSelectButton}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:select
		on:back
	/>
</div>
<div class="divider" />
<Form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
	{#if isFetching}
		<Loading />
	{:else}
		{#if value}
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
						<ObjectInput
							name="realm"
							namedStruct={value.realm}
							path={`${value.id}/realm`}
							errors={errors.realm}
							disabled={fields.realm.disabled}
							on:gotoField
						/>
					</FormControl>
				{/if}
			</slot>
		{:else}
			<Empty />
		{/if}
	{/if}
</Form>
<div class="divider" />
<div class="flex justify-end">
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSelectButton}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:select
		on:back
	/>
</div>