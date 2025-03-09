<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { type Option, Combobox } from '@graphace/ui';

	export let list: boolean | undefined = false;
	export let name: string;
	export let disabled = false;
	export let readonly = false;
	export let placeholder: string | null | undefined = undefined;
	export let loading: boolean = false;
	export let options: Option[] = [];
	export let value: Option | Option[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };
</script>

<Combobox
	multiple={list}
	{name}
	{placeholder}
	{disabled}
	{readonly}
	{loading}
	{zIndex}
	class={className}
	bind:value
	bind:options
	{errors}
	on:search
	on:change
	on:update
/>
