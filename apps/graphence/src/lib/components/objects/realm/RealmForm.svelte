<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, ErrorLabels, FormControl, Label, Loading, to } from '@graphace/ui';
	import { type Option, StringInput, ObjectLink } from '@graphace/ui-graphql';
	import type { RealmInput } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import { locale } from '$i18n/i18n-svelte';
	
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
	export let fields: {
		name?: Option | undefined;
		description?: Option | undefined;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		description: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: RealmInput | null | undefined };
		unbind: { value: RealmInput | null | undefined };
		save: { value: RealmInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end sm:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{#if title}
			{title}
		{:else}
			{$LL.graphql.objects.Realm.name()}
		{/if}
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
	>
		<slot />
	</Buttons>
</div>
<div class="divider" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<slot name="name">
			{#if !fields.name?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Realm.fields.name.name()} />
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields.name?.readonly}
						disabled={fields.name?.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description">
			{#if !fields.description?.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.Realm.fields.description.name()} />
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields.description?.readonly}
						disabled={fields.description?.disabled}
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
		loading={isMutating}
		on:save={(e) => dispatch('save', { value })}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>