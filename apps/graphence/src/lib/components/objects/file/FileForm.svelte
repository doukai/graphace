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
	import { StringInput, IntInput, ObjectLink } from '@graphace/ui-graphql';
	import {
		fileInit,
		fileFields,
		type FileFields,
		type FileFieldsArgs,
		fileFormTab,
		fileFormTabs,
		fileFormTabChange,
		validate
	} from '~/lib/components/objects/file/FileOption';
	import type { FileInput, QueryFileArgs } from '~/lib/types/schema';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	
	export let value: FileInput | null | undefined = undefined;
	export let args: QueryFileArgs = {};
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
	export let tabs: (($LL: TranslationFunctions, args?: QueryFileArgs | undefined) => TabInfo[] | undefined) | undefined = fileFormTabs;
	export let tab: string | undefined = fileFormTab?.(args);
	export let fields: FileFields | undefined = fileFields;
	export let fieldsPatch: FileFields | undefined = undefined;
	$: if (fieldsPatch && Object.keys(fieldsPatch).length > 0) {
		fields = { ...fields, ...fieldsPatch };
	}
	export let fieldsArgs: FileFieldsArgs | undefined = undefined;

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		query: { args: QueryFileArgs; };
		remove: { value: FileInput | null | undefined };
		unbind: { value: FileInput | null | undefined };
		save: { value: FileInput | null | undefined };
		tabChange: { tab: string; origin: string; };
		goto: { path: string; name: string | undefined };
		back: {};
	}>();

	if (fileInit) {
		value = fileInit(value);
	}
</script>

<div class="flex justify-between">
	<slot name="start" />
	<slot name="title">
		<span class="text-xl font-semibold self-center max-sm:hidden">
			{#if title}
				{title}
			{:else}
				{$LL.graphql.objects.File.name()}
			{/if}
		</span>
	</slot>
	<slot name="tabs">
		{#if tabs?.($LL, args)}
			<Tabs
				bind:value={tab}
				tabs={tabs?.($LL, args)}
				class="max-md:hidden"
				on:change={(e) => {
					dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
					if (e.detail.value !== e.detail.origin) {
						fileFormTabChange(e.detail.value, args, value)
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
<slot name="tabs-sm">
	{#if tabs?.($LL, args)}
		<Tabs
			bind:value={tab}
			tabs={tabs?.($LL, args)}
			class="md:hidden"
			on:change={(e) => {
				dispatch('tabChange', { tab: e.detail.value, origin: e.detail.origin });
				if (e.detail.value !== e.detail.origin) {
					fileFormTabChange(e.detail.value, args, value)
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
</slot>
<Form class={className}>
	{#if isFetching}
		<Loading class="col-span-full" />
	{:else if value}
		<slot name="name" {value} {errors} {fields}>
			{#if !fields?.name?.hidden?.(value, tab, fieldsArgs?.name)}
				<FormControl let:id {...fields?.name?.props?.($LL, value, fieldsArgs?.name)?.['form-control']}>
					<Label
						{id}
						text={fields?.name?.title?.($LL, fieldsArgs?.name) || $LL.graphql.objects.File.fields.name.name()}
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
		<slot name="contentType" {value} {errors} {fields}>
			{#if !fields?.contentType?.hidden?.(value, tab, fieldsArgs?.contentType)}
				<FormControl let:id {...fields?.contentType?.props?.($LL, value, fieldsArgs?.contentType)?.['form-control']}>
					<Label
						{id}
						text={fields?.contentType?.title?.($LL, fieldsArgs?.contentType) || $LL.graphql.objects.File.fields.contentType.name()}
						required={fields?.contentType?.required?.(value)}
					/>
					<StringInput
						{id}
						name="contentType"
						bind:value={value.contentType}
						errors={errors.contentType}
						readonly={fields?.contentType?.readonly?.(value, fieldsArgs?.contentType)}
						disabled={fields?.contentType?.disabled?.(value, fieldsArgs?.contentType)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.contentType
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.contentType)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, contentType: e }));
							}
						}}
						{...fields?.contentType?.props?.($LL, value, fieldsArgs?.contentType)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="contentLength" {value} {errors} {fields}>
			{#if !fields?.contentLength?.hidden?.(value, tab, fieldsArgs?.contentLength)}
				<FormControl let:id {...fields?.contentLength?.props?.($LL, value, fieldsArgs?.contentLength)?.['form-control']}>
					<Label
						{id}
						text={fields?.contentLength?.title?.($LL, fieldsArgs?.contentLength) || $LL.graphql.objects.File.fields.contentLength.name()}
						required={fields?.contentLength?.required?.(value)}
					/>
					<IntInput
						{id}
						name="contentLength"
						bind:value={value.contentLength}
						errors={errors.contentLength}
						readonly={fields?.contentLength?.readonly?.(value, fieldsArgs?.contentLength)}
						disabled={fields?.contentLength?.disabled?.(value, fieldsArgs?.contentLength)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.contentLength
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.contentLength)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, contentLength: e }));
							}
						}}
						{...fields?.contentLength?.props?.($LL, value, fieldsArgs?.contentLength)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="content" {value} {errors} {fields}>
			{#if !fields?.content?.hidden?.(value, tab, fieldsArgs?.content)}
				<FormControl let:id {...fields?.content?.props?.($LL, value, fieldsArgs?.content)?.['form-control']}>
					<Label
						{id}
						text={fields?.content?.title?.($LL, fieldsArgs?.content) || $LL.graphql.objects.File.fields.content.name()}
						required={fields?.content?.required?.(value)}
					/>
					<StringInput
						{id}
						name="content"
						bind:value={value.content}
						errors={errors.content}
						readonly={fields?.content?.readonly?.(value, fieldsArgs?.content)}
						disabled={fields?.content?.disabled?.(value, fieldsArgs?.content)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.content
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.content)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, content: e }));
							}
						}}
						{...fields?.content?.props?.($LL, value, fieldsArgs?.content)?.['input']}
					/>
				</FormControl>
			{/if}
		</slot>
		<slot name="url" {value} {errors} {fields}>
			{#if !fields?.url?.hidden?.(value, tab, fieldsArgs?.url)}
				<FormControl let:id {...fields?.url?.props?.($LL, value, fieldsArgs?.url)?.['form-control']}>
					<Label
						{id}
						text={fields?.url?.title?.($LL, fieldsArgs?.url) || $LL.graphql.objects.File.fields.url.name()}
						required={fields?.url?.required?.(value)}
					/>
					<StringInput
						{id}
						name="url"
						bind:value={value.url}
						errors={errors.url}
						readonly={fields?.url?.readonly?.(value, fieldsArgs?.url)}
						disabled={fields?.url?.disabled?.(value, fieldsArgs?.url)}
						on:change={(e) => {
							if (!Array.isArray(e.detail.value) || e.detail.value == null) {
								fields?.url
									?.onChange?.($LL, e.detail.value, value, fieldsArgs?.url)
									.then((next) => (value = next))
									.catch((e) => (errors = { ...errors, url: e }));
							}
						}}
						{...fields?.url?.props?.($LL, value, fieldsArgs?.url)?.['input']}
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