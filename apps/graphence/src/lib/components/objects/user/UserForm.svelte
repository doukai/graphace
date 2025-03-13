<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { IDInput, IDInputList, StringInput, StringInputList, BooleanInput, BooleanInputList, IntInput, IntInputList, TimestampInput, TimestampInputList, ObjectInput } from '@graphace/ui-graphql';
	import GroupSelect from '~/lib/components/objects/group/GroupSelect.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';
	
	export let value: UserInput | null | undefined = undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	export let fields: {
		name: { readonly: boolean; disabled: boolean; hidden: boolean };
		description: { readonly: boolean; disabled: boolean; hidden: boolean };
		lastName: { readonly: boolean; disabled: boolean; hidden: boolean };
		login: { readonly: boolean; disabled: boolean; hidden: boolean };
		email: { readonly: boolean; disabled: boolean; hidden: boolean };
		phones: { readonly: boolean; disabled: boolean; hidden: boolean };
		disable: { readonly: boolean; disabled: boolean; hidden: boolean };
		groups: { readonly: boolean; disabled: boolean; hidden: boolean };
		roles: { readonly: boolean; disabled: boolean; hidden: boolean };
		realm: { readonly: boolean; disabled: boolean; hidden: boolean };
		groupsAggregate: { readonly: boolean; disabled: boolean; hidden: boolean };
		groupsConnection: { readonly: boolean; disabled: boolean; hidden: boolean };
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
		lastNameCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		lastNameMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		lastNameMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		loginCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		loginMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		loginMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		saltCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		saltMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		saltMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		hashCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		hashMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		hashMin: { readonly: boolean; disabled: boolean; hidden: boolean };
		emailCount: { readonly: boolean; disabled: boolean; hidden: boolean };
		emailMax: { readonly: boolean; disabled: boolean; hidden: boolean };
		emailMin: { readonly: boolean; disabled: boolean; hidden: boolean };
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
		groupsAggregate: { readonly: false, disabled: false, hidden: false },
		groupsConnection: { readonly: false, disabled: false, hidden: false },
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
		lastNameCount: { readonly: false, disabled: false, hidden: false },
		lastNameMax: { readonly: false, disabled: false, hidden: false },
		lastNameMin: { readonly: false, disabled: false, hidden: false },
		loginCount: { readonly: false, disabled: false, hidden: false },
		loginMax: { readonly: false, disabled: false, hidden: false },
		loginMin: { readonly: false, disabled: false, hidden: false },
		saltCount: { readonly: false, disabled: false, hidden: false },
		saltMax: { readonly: false, disabled: false, hidden: false },
		saltMin: { readonly: false, disabled: false, hidden: false },
		hashCount: { readonly: false, disabled: false, hidden: false },
		hashMax: { readonly: false, disabled: false, hidden: false },
		hashMin: { readonly: false, disabled: false, hidden: false },
		emailCount: { readonly: false, disabled: false, hidden: false },
		emailMax: { readonly: false, disabled: false, hidden: false },
		emailMin: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: UserInput | null | undefined };
		unbind: { value: UserInput | null | undefined };
		save: { value: UserInput | null | undefined };
		create: { value: UserInput | null | undefined };
		select: {};
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
						<StringInputList
						 	{id}
							name="phones"
							bind:value={value.phones}
							errors={errors.phones}
							readonly={fields.phones.readonly}
							disabled={fields.phones.disabled}
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