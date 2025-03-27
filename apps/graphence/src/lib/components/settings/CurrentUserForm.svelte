<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import type { Errors } from '@graphace/commons';
	import { Buttons, Form, FormControl, Label, Loading } from '@graphace/ui';
	import { StringInput } from '@graphace/ui-graphql';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { UserInput } from '~/lib/types/schema';

	export let value: UserInput | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showBackButton: boolean = true;
	let className: string | undefined =
		'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2';

	const LL = getContext<Readable<TranslationFunctions>>('LL');

	const dispatch = createEventDispatcher<{
		save: { value: UserInput | null | undefined };
		back: {};
	}>();
</script>

<div class="flex justify-end md:justify-between">
	<span class="max-sm:hidden text-xl font-semibold self-center">
		{value?.name || $LL.graphql.objects.User.name()}
	</span>
	<Buttons
		showSaveButton={true}
		{showBackButton}
		on:save={(e) => dispatch('save', { value })}
		on:back
	/>
</div>
<div class="divider" />
<Form class={className}>
	{#if isFetching}
		<Loading />
	{:else if value}
		<FormControl let:id>
			<Label {id} text={$LL.graphql.objects.User.fields.name.name()} />
			<StringInput name="name" bind:value={value.name} errors={errors.name} />
		</FormControl>
		<FormControl let:id>
			<Label {id} text={$LL.graphql.objects.User.fields.lastName.name()} />
			<StringInput name="lastName" bind:value={value.lastName} errors={errors.lastName} />
		</FormControl>
		<FormControl let:id>
			<Label {id} text={$LL.graphql.objects.User.fields.email.name()} />
			<StringInput name="email" bind:value={value.email} errors={errors.email} />
		</FormControl>
		<FormControl let:id>
			<Label {id} text={$LL.graphql.objects.User.fields.phones.name()} />
			<StringInput name="phones" bind:value={value.phones} list errors={errors.phones} />
		</FormControl>
	{/if}
</Form>
