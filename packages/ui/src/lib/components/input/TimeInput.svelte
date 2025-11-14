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
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.input') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: string | null | undefined;
		};
	}>();
</script>

<div data-element="time-input" data-part="root" class="{contextClass} {className}">
	<input
		data-part="input"
		type="time"
		{id}
		{name}
		{placeholder}
		class="input {errors?.errors ? 'input-error' : ''} input-bordered w-full"
		bind:value
		on:change={() => {
			dispatch('change', { value });
		}}
		{readonly}
		{disabled}
	/>
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
