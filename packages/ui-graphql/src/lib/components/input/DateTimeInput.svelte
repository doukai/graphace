<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { DateTimeInput, DateTimeInputList } from '@graphace/ui';

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
	<DateTimeInputList
		{placeholder}
		{name}
		bind:value
		{errors}
		{readonly}
		{disabled}
		{className}
		{addBtnClassName}
	/>
{:else}
	<DateTimeInput {placeholder} {name} bind:value {errors} {readonly} {disabled} {className} />
{/if}
