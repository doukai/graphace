<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import StringInput from './StringInput.svelte';

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

<StringInput
	bind:value
	{list}
	{name}
	{errors}
	{placeholder}
	{readonly}
	{disabled}
	{className}
	{addBtnClassName}
/>
