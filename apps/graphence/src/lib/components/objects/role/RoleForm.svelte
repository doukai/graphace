<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { IDInput, IDInputList, StringInput, StringInputList, BooleanInput, BooleanInputList, IntInput, IntInputList, TimestampInput, TimestampInputList, ObjectInput } from '@graphace/ui-graphql';
	import UserSelect from '~/lib/components/objects/user/UserSelect.svelte';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RoleInput } from '~/lib/types/schema';
	
	export let value: RoleInput | null | undefined = undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	export let fields: {
		name: { readonly: boolean; disabled: boolean; hidden: boolean };
		description: { readonly: boolean; disabled: boolean; hidden: boolean };
		users: { readonly: boolean; disabled: boolean; hidden: boolean };
		groups: { readonly: boolean; disabled: boolean; hidden: boolean };
		composites: { readonly: boolean; disabled: boolean; hidden: boolean };
		permissions: { readonly: boolean; disabled: boolean; hidden: boolean };
		realm: { readonly: boolean; disabled: boolean; hidden: boolean };
		usersAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		usersConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		groupsAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		groupsConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		compositesAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		compositesConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		permissionsAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		permissionsConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
		idCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		idMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		idMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		nameMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		descriptionMin: { readonly: boolean; disabled: boolean; hidden: boolean };
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		users: { readonly: false, disabled: false, hidden: false },
		groups: { readonly: false, disabled: false, hidden: false },
		composites: { readonly: false, disabled: false, hidden: false },
		permissions: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false },
		usersAggregate: { readonly: false, disabled: false, hidden: false },
		usersConnection: { readonly: false, disabled: false, hidden: false },
		groupsAggregate: { readonly: false, disabled: false, hidden: false },
		groupsConnection: { readonly: false, disabled: false, hidden: false },
		compositesAggregate: { readonly: false, disabled: false, hidden: false },
		compositesConnection: { readonly: false, disabled: false, hidden: false },
		permissionsAggregate: { readonly: false, disabled: false, hidden: false },
		permissionsConnection: { readonly: false, disabled: false, hidden: false },
		idCount: { readonly: false, disabled: false, hidden: false },
		idMax: { readonly: false, disabled: false, hidden: false },
		idMin: { readonly: false, disabled: false, hidden: false },
		nameCount: { readonly: false, disabled: false, hidden: false },
		nameMax: { readonly: false, disabled: false, hidden: false },
		nameMin: { readonly: false, disabled: false, hidden: false },
		descriptionCount: { readonly: false, disabled: false, hidden: false },
		descriptionMax: { readonly: false, disabled: false, hidden: false },
		descriptionMin: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: RoleInput | null | undefined };
		unbind: { value: RoleInput | null | undefined };
		save: { value: RoleInput | null | undefined };
		create: { value: RoleInput | null | undefined };
		select: {};
		back: {};
	}>();
</script>


<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Role.name()}
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
			<slot name="groups">
				{#if !fields.groups.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Role.fields.groups.name()} />
						<GroupSelect
						 	{id}
							name="groups"
							errors={errors.groups}
							bind:value={value.groups}
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
						<ObjectInput
							name="permissions"
							path={`${value.id}/permissions`}
							errors={errors.permissions}
							disabled={fields.permissions.disabled}
							on:gotoField
						/>
					</FormControl>
				{/if}
			</slot>
			<slot name="realm">
				{#if !fields.realm.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Role.fields.realm.name()} />
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