<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { IntInputList } from '.';

	export let id: string = undefined;
	export let name: string = undefined;
	export let value: (number | null | undefined)[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<IntInputList
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
