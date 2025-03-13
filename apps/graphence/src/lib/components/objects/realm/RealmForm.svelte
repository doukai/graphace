<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Empty, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { IDInput, IDInputList, StringInput, StringInputList, BooleanInput, BooleanInputList, IntInput, IntInputList, TimestampInput, TimestampInputList, ObjectInput } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { RealmInput } from '~/lib/types/schema';
	
	export let value: RealmInput | null | undefined = undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showSelectButton: boolean = false;
	export let showBackButton: boolean = true;
	export let fields: {
		name: { readonly: boolean; disabled: boolean; hidden: boolean };
		description: { readonly: boolean; disabled: boolean; hidden: boolean };
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
		remove: { value: RealmInput | null | undefined };
		unbind: { value: RealmInput | null | undefined };
		save: { value: RealmInput | null | undefined };
		create: { value: RealmInput | null | undefined };
		select: {};
		back: {};
	}>();
</script>


<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{$LL.graphql.objects.Realm.name()}
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
						<Label {id} text={$LL.graphql.objects.Realm.fields.name.name()} />
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
						<Label {id} text={$LL.graphql.objects.Realm.fields.description.name()} />
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