<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import {
		Buttons,
		Empty,
		Form,
		ErrorLabels,
		FormControl,
		Label,
		Loading,
		type TabInfo,
		Tabs,
		to
	} from '@graphace/ui';
	import { StringInput, ObjectLink } from '@graphace/ui-graphql';
	import {
		realmInit,
		realmFields,
		type RealmFields,
		type RealmFieldsArgs,
		realmFormTab,
		realmFormTabs,
		realmFormTabChange,
		validate
	} from '~/lib/components/objects/realm/RealmOption';
	import type { RealmInput, QueryRealmArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: RealmInput | null | undefined = undefined;
	export let args: QueryRealmArgs = {};
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
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-x-hidden overflow-y-auto [&_[data-part=input]]:min-w-0 p-1';
	export { className as class };
	export let tabs: (($LL: TranslationFunctions, args?: QueryRealmArgs | undefined) => TabInfo[] | undefined) | undefined = realmFormTabs;
	export let tab: string | undefined = realmFormTab?.(args);
	export let fields: RealmFields | undefined = realmFields;
	export let fieldsPatch: RealmFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: RealmFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryRealmArgs; };
		remove: { value: RealmInput | null | undefined };
		unbind: { value: RealmInput | null | undefined };
		save: { value: RealmInput | null | undefined };
		tabChange: { tab: string; origin: string; };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();

	if (realmInit) {
		value = realmInit(value);
	}
</script>

<div class="flex justify-between">
	<slot name="start" />
	<slot name="title">
		<span class="text-xl font-semibold self-center max-sm:hidden">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.Realm.name()}
			{/if}
		</span>
	</slot>
	<Buttons
		showRemoveButton={showRemoveButton && value?.id != null}
		showUnbindButton={showUnbindButton && value?.id != null}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		class="flex space-x-1 justify-end max-sm:w-full"
		loading={isMutating}
		on:save={(e) =>
			validate($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	>
		<slot />
	</Buttons>
</div>
{#if tabs?.($LL, args)}
	<Tabs
		bind:value={tab}
		tabs={tabs?.($LL, args)}
		on:change={(e) => {
			dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
			if (e.detail.value !== e.detail.origin) {
				realmFormTabChange(e.detail.value, args, value)
					.then((args) => {
						dispatch('query', {
							args
						});
					})
					.catch((e) => (errors = e));
			}
		}}
	/>
{/if}
<Form class={className}>
	{#if isFetching}
		<Loading class="col-span-full" />
	{:else if value}
		<slot name="name" {value} {errors} {fields}>
			{#if !fields?.name?.hidden?.(value, tab, fieldsArgs?.name)}
				<FormControl let:id {...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['form-control']}>
					<Label
						{id}
						text={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.Realm.fields.name.name()}
						required={fields?.name?.required?.(value)}
					/>
					<StringInput
						{id}
						name="name"
						bind:value={value.name}
						errors={errors.name}
						readonly={fields?.name?.readonly?.(value, fieldsArgs?.name)}
						disabled={fields?.name?.disabled?.(value, fieldsArgs?.name)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.name
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.name)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, name: e }));
							}
						}}
						{...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="description" {value} {errors} {fields}>
			{#if !fields?.description?.hidden?.(value, tab, fieldsArgs?.description)}
				<FormControl let:id {...fields?.description?.props?.($LL, value, fieldsArgs?.description)?.['form-control']}>
					<Label
						{id}
						text={fields?.description?.title?.($LL, fieldsArgs?.description) || $LL.graphql.objects.Realm.fields.description.name()}
						required={fields?.description?.required?.(value)}
					/>
					<StringInput
						{id}
						name="description"
						bind:value={value.description}
						errors={errors.description}
						readonly={fields?.description?.readonly?.(value, fieldsArgs?.description)}
						disabled={fields?.description?.disabled?.(value, fieldsArgs?.description)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.description
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.description)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, description: e }));
							}
						}}
						{...fields?.description?.props?.($LL, value, fieldsArgs?.description)?.['input']}
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
<div class="flex justify-end">
	<Buttons
		showRemoveButton={showRemoveButton && value?.id != null}
		showUnbindButton={showUnbindButton && value?.id != null}
		{showSaveButton}
		{showSelectButton}
		{showBackButton}
		class="flex space-x-1 justify-end max-sm:w-full"
		loading={isMutating}
		on:save={(e) =>
			validate($LL, value)
				.then((value) => dispatch('save', { value }))
				.catch((e) => (errors = e))}
		on:remove={(e) => dispatch('remove', { value })}
		on:unbind={(e) => dispatch('unbind', { value })}
		on:back
	/>
</div>