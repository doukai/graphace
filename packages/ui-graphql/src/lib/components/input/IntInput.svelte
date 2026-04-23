<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { NumberInput, NumberInputList } from '@graphace/ui';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };

	const dispatch = createEventDispatcher<{
		change: {
			value: number | (number | null | undefined)[] | null | undefined;
		};
	}>();
</script>

{#if list}
	<NumberInputList
		{id}
		{name}
		bind:value
		{min}
		{max}
		{step}
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change={(e) => {
			if (Array.isArray(e.detail.value) && !e.detail.value.length) {
				value = null;
			}
			dispatch('change', { value });
		}}
	/>
{:else}
	<NumberInput
		{id}
		{name}
		bind:value
		{min}
		{max}
		{step}
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change
	/>
{/if}
