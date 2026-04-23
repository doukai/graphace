<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { Select } from '@graphace/ui';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let enums: {
		name: string;
		value: string | null | undefined;
		description?: string;
		disabled?: boolean;
	}[];
	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };

	const dispatch = createEventDispatcher<{
		change: {
			value: string | (string | null | undefined)[] | null | undefined;
		};
	}>();
</script>

{#if list}
	<Select
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		multiple
		on:change={(e) => {
			if (Array.isArray(e.detail.value) && !e.detail.value.length) {
				value = null;
			}
			dispatch('change', { value });
		}}
	>
		<option value={null} />
		{#each enums as item}
			<option value={item.value} disabled={item.disabled}>{item.name}</option>
		{/each}
	</Select>
{:else}
	<Select
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change
	>
		<option value={null} />
		{#each enums as item}
			<option value={item.value} disabled={item.disabled}>{item.name}</option>
		{/each}
	</Select>
{/if}
