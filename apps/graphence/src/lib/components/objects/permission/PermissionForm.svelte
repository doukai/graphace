<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { type Option, IDInput, StringInput, ObjectInput } from '@graphace/ui-graphql';
	import PermissionTypeInput from '~/lib/components/enums/permission-type/PermissionTypeInput.svelte';
	import RoleSelect from '~/lib/components/objects/role/RoleSelect.svelte';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionInput } from '~/lib/types/schema';
	
	export let value: PermissionInput | null | undefined = undefined;
	export let isFetching: boolean;
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
		field: Option;
		type: Option;
		permissionType: Option;
		roles: Option;
		realm: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false },
		field: { readonly: false, disabled: false, hidden: false },
		type: { readonly: false, disabled: false, hidden: false },
		permissionType: { readonly: false, disabled: false, hidden: false },
		roles: { readonly: false, disabled: false, hidden: false },
		realm: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: PermissionInput | null | undefined };
		unbind: { value: PermissionInput | null | undefined };
		save: { value: PermissionInput | null | undefined };
		back: {};
	}>();
</script>


<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Permission.name()}
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
	{:else}
		{#if value}
			<slot name="name">
				{#if !fields.name.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Permission.fields.name.name()} />
						<IDInput
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
						<Label {id} text={$LL.graphql.objects.Permission.fields.description.name()} />
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
			<slot name="field">
				{#if !fields.field.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Permission.fields.field.name()} />
						<StringInput
						 	{id}
							name="field"
							bind:value={value.field}
							errors={errors.field}
							readonly={fields.field.readonly}
							disabled={fields.field.disabled}
						/>
					</FormControl>
				{/if}
			</slot>
			<slot name="type">
				{#if !fields.type.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Permission.fields.type.name()} />
						<StringInput
						 	{id}
							name="type"
							bind:value={value.type}
							errors={errors.type}
							readonly={fields.type.readonly}
							disabled={fields.type.disabled}
						/>
					</FormControl>
				{/if}
			</slot>
			<slot name="permissionType">
				{#if !fields.permissionType.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Permission.fields.permissionType.name()} />
						<PermissionTypeInput
						 	{id}
							name="permissionType"
							bind:value={value.permissionType}
							errors={errors.permissionType}
							readonly={fields.permissionType.readonly}
							disabled={fields.permissionType.disabled}
						/>
					</FormControl>
				{/if}
			</slot>
			<slot name="roles">
				{#if !fields.roles.hidden}
					<FormControl let:id>
						<Label {id} text={$LL.graphql.objects.Permission.fields.roles.name()} />
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
						<Label {id} text={$LL.graphql.objects.Permission.fields.realm.name()} />
						<ObjectInput
							namedStruct={value.realm}
							path={`${value.name}/realm`}
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
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>