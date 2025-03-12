<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let name: string;
	export let value: string | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.checkbox') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: string | null | undefined;
		};
	}>();
</script>

<input
	type="checkbox"
	{id}
	{name}
	class="checkbox {errors?.errors ? 'checkbox-error' : ''} {className} {contextClass}"
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
