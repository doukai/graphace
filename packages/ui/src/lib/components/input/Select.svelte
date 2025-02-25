<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let placeholder: string = '';
	export let containerClassName: string = '';
	export let className: string = '';
	export let errors: Errors | undefined = undefined;
	export let multiple = false;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();

	const dispatch = createEventDispatcher<{
		change: {
			value: string | (string | null | undefined)[] | null | undefined;
		};
	}>();

	$: if (!value && multiple) {
		value = [];
	}
</script>

<div class={containerClassName ? containerClassName : 'form-control w-full'}>
	{#if multiple}
		<select
			{id}
			{name}
			{placeholder}
			class="select select-bordered {errors?.errors ? 'select-error' : ''} {className}"
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
			{id}
			{name}
			{placeholder}
			class="select select-bordered {errors?.errors ? 'select-error' : ''} {className}"
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
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
