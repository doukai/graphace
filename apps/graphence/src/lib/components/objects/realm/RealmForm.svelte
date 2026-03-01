<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { StringInput, ObjectLink } from '@graphace/ui-graphql';
	import { realmFields, type RealmFields } from '~/lib/components/objects/realm/RealmOption';
	import type { RealmInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: RealmInput | null | undefined = undefined;
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
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto';
	export { className as class };
	export let fields: RealmFields | undefined = realmFields;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: RealmInput | null | undefined };
		unbind: { value: RealmInput | null | undefined };
		save: { value: RealmInput | null | undefined };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();

	const validate = async () => {
		errors = {};
		if (value) {
			const nameErrors = await fields?.name?.validate?.(value);
			if (nameErrors && nameErrors.length > 0) {
				errors['name'] = { errors: nameErrors.map((message) => ({ message })) };
			}
			const descriptionErrors = await fields?.description?.validate?.(value);
			if (descriptionErrors && descriptionErrors.length > 0) {
				errors['description'] = { errors: descriptionErrors.map((message) => ({ message })) };
			}
		}

		return new Promise(
			(
				resolve: (data: RealmInput | null | undefined) => void,
				reject: (errors: Record<string, Errors>) => void
			) => {
				if (Object.keys(errors).length === 0) {
					resolve(value);
				} else {
					reject(errors);
				}
			}
		);
	};
</script>

<div class="flex justify-between">
	<slot name="title">
		<span class="text-xl font-semibold self-center">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.Realm.name()}
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
		on:save={(e) => validate().then(() => dispatch('save', { value }))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	>
		<slot />
	</Buttons>
</div>
<div class="divider my-0" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<slot name="name" {value} {errors} {fields}>
			{#if !fields?.name?.hidden?.(value)}
				<FormControl let:id {...fields?.name?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Realm.fields.name.name()}
						required={fields?.name?.required?.(value)}
					/>
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields?.name?.readonly?.(value)}
						disabled={fields?.name?.disabled?.(value)}
						on:change={(e) => fields?.name?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.name?.props?.(value)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description" {value} {errors} {fields}>
			{#if !fields?.description?.hidden?.(value)}
				<FormControl let:id {...fields?.description?.props?.(value)?.['control']}>
					<Label
						{id}
						text={$LL.graphql.objects.Realm.fields.description.name()}
						required={fields?.description?.required?.(value)}
					/>
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields?.description?.readonly?.(value)}
						disabled={fields?.description?.disabled?.(value)}
						on:change={(e) => fields?.description?.onChange?.(e.detail.value, value).then((next) => value = next)}
						{...fields?.description?.props?.(value)?.['input']}
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
<div class="divider my-0" />
<div class="flex justify-end">
	<Buttons
		{showRemoveButton}
		{showUnbindButton}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		loading={isMutating}
		on:save={(e) => validate().then(() => dispatch('save', { value }))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>