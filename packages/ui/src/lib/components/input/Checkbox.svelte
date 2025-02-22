<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string | null | undefined = undefined;
	export let className: string = '';
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();

	const dispatch = createEventDispatcher<{
		change: {
			value: string | null | undefined;
		};
	}>();
</script>

<div class="form-control w-full">
	<input
		type="checkbox"
		{id}
		{name}
		class="checkbox {errors?.errors ? 'checkbox-error' : ''} {className}"
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
</div>
