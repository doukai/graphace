<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Input, InputList } from '@graphace/ui';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let textarea: boolean = false;
	export let cols: number | undefined = undefined;
	export let rows: number | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };
</script>

{#if list}
	<InputList
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
	<Input
		{id}
		{name}
		bind:value
		{placeholder}
		{textarea}
		{cols}
		{rows}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:change
	/>
{/if}
