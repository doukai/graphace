<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let name: string | undefined = undefined;
	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let multiple = false;
	export let readonly = false;
	export let disabled = false;
	export let id: string | undefined = nanoid();
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.select') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: string | (string | null | undefined)[] | null | undefined;
		};
	}>();

	if (!value && multiple) {
		value = [];
	}
</script>

<div data-element="select" data-part="root" class="{contextClass} {className}">
	{#if multiple}
		<select
			data-part="select"
			{id}
			{name}
			{placeholder}
			class="select {errors?.errors ? 'select-error' : ''} select-bordered w-full"
			bind:value
			on:change={() => {
				dispatch('change', { value });
			}}
			disabled={disabled || readonly}
			multiple
		>
			<slot />
		</select>
	{:else}
		<select
			data-part="select"
			{id}
			{name}
			{placeholder}
			class="select {errors?.errors ? 'select-error' : ''} select-bordered w-full"
			bind:value
			on:change={() => {
				dispatch('change', { value });
			}}
			disabled={disabled || readonly}
		>
			<slot />
		</select>
	{/if}
	{#if errors?.errors}
		<label data-part="label" for={id} class="label">
			{#each errors.errors as error}
				<span data-part="label-text-alt" class="label-text-alt">
					<p data-part="label-text" class="text-error">{error.message}</p>
				</span>
			{/each}
		</label>
	{/if}
</div>
