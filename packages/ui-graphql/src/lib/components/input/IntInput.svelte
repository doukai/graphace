<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { NumberInput } from '.';

	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let className: string = '';
	export let addBtnClassName: string = '';
</script>

<NumberInput
	bind:value
	{list}
	{name}
	{errors}
	{placeholder}
	{readonly}
	{disabled}
	{className}
	{addBtnClassName}
	on:change
/>
