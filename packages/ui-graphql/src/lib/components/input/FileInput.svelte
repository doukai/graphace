<script lang="ts">
	import type { Errors, FileInfo } from '@graphace/commons';
	import { FileInput, FileInputList } from '@graphace/ui';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let value: FileInfo | (FileInfo | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

{#if list}
	<FileInputList
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:upload
	/>
{:else}
	<FileInput
		{id}
		{name}
		bind:value
		{placeholder}
		{errors}
		{readonly}
		{disabled}
		class={className}
		on:upload
	/>
{/if}
