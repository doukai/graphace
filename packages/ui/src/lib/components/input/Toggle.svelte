<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';
	export let name: string;
	export let value: boolean | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
	export let className: string = '';

	const dispatch = createEventDispatcher<{
		change: {
			value: boolean | null | undefined;
		};
	}>();
</script>

<div class="form-control w-full">
	<input
		type="checkbox"
		{id}
		{name}
		class="toggle {className}"
		bind:checked={value}
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
