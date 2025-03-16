<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let name: string | undefined = undefined;
	export let value: string | null | undefined = undefined;
	export let placeholder: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string | undefined = nanoid();
	let className: string | undefined = 'input-bordered';
	export { className as class };

	const contextClass = getContext<string>('ui.input') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: string | null | undefined;
		};
	}>();
</script>

<input
	type="date"
	{id}
	{name}
	{placeholder}
	class="input {errors?.errors ? 'input-error' : ''} {className} {contextClass}"
	bind:value
	on:change={() => {
		dispatch('change', { value });
	}}
	{readonly}
	{disabled}
/>
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
