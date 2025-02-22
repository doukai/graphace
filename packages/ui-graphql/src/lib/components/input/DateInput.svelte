<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { DateInput, DateInputList } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let className: string = '';
	export let addBtnClassName: string = '';
</script>

{#if list}
	<DateInputList
		{placeholder}
		{name}
		bind:value
		{errors}
		{readonly}
		{disabled}
		{className}
		{addBtnClassName}
		on:change
	/>
{:else}
	<DateInput {placeholder} {name} bind:value {errors} {readonly} {disabled} {className} on:change />
{/if}
