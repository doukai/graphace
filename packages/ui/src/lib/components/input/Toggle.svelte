<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import type { Errors } from '@graphace/commons';

	export let name: string | undefined = undefined;
	export let value: boolean | null | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string | undefined = nanoid();
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.toggle') || '';

	const dispatch = createEventDispatcher<{
		change: {
			value: boolean | null | undefined;
		};
	}>();
</script>

<div class="flex items-center {placeholder ? 'tooltip' : ''}" data-tip={placeholder}>
	<input
		type="checkbox"
		{id}
		{name}
		class="toggle {errors?.errors ? 'toggle-error' : ''} {className} {contextClass}"
		bind:checked={value}
		on:change={() => {
			dispatch('change', { value });
		}}
		{readonly}
		{disabled}
	/>
</div>
{#if errors?.errors}
	<label for={id} class="label">
		{#each errors.errors as error}
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		{/each}
	</label>
{/if}
