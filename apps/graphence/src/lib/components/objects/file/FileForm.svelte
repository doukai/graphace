<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { type Option, StringInput, ObjectInput } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { FileInput } from '~/lib/types/schema';
	
	export let value: FileInput | null | undefined = undefined;
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
		contentType: Option;
		content: Option;
		url: Option;
	} = {
		name: { readonly: false, disabled: false, hidden: false },
		contentType: { readonly: false, disabled: false, hidden: false },
		content: { readonly: false, disabled: false, hidden: false },
		url: { readonly: false, disabled: false, hidden: false }
	};

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		remove: { value: FileInput | null | undefined };
		unbind: { value: FileInput | null | undefined };
		save: { value: FileInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.File.name()}
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
					<Label {id} text={$LL.graphql.objects.File.fields.name.name()} />
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
		<slot name="contentType">
			{#if !fields.contentType.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.File.fields.contentType.name()} />
					<StringInput
					 	{id}
						name="contentType"
						bind:value={value.contentType}
						errors={errors.contentType}
						readonly={fields.contentType.readonly}
						disabled={fields.contentType.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="content">
			{#if !fields.content.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.File.fields.content.name()} />
					<StringInput
					 	{id}
						name="content"
						bind:value={value.content}
						errors={errors.content}
						readonly={fields.content.readonly}
						disabled={fields.content.disabled}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="url">
			{#if !fields.url.hidden}
				<FormControl let:id>
					<Label {id} text={$LL.graphql.objects.File.fields.url.name()} />
					<StringInput
					 	{id}
						name="url"
						bind:value={value.url}
						errors={errors.url}
						readonly={fields.url.readonly}
						disabled={fields.url.disabled}
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