<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { IntLink } from '.';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let zIndex: number | undefined = 0;
	let className: string | undefined = undefined;
	export { className as class };
</script>

<IntLink
	{id}
	{name}
	bind:value
	{list}
	{errors}
	{readonly}
	{disabled}
	{placeholder}
	{zIndex}
	class={className}
	on:save
/>
