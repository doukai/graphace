<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { NumberInput, NumberInputList } from '@graphace/ui';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

{#if list}
	<NumberInputList
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change
	/>
{:else}
	<NumberInput
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change
	/>
{/if}
