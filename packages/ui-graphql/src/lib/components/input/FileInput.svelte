<script lang="ts">
	import type { Errors, FileInfo } from '@graphace/commons';
	import { FileInput, FileInputList } from '@graphace/ui';

	export let value: FileInfo | (FileInfo | null | undefined)[] | null | undefined;
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
	<FileInputList
		{placeholder}
		{name}
		bind:value
		{errors}
		{readonly}
		{disabled}
		{className}
		{addBtnClassName}
		on:upload
	/>
{:else}
	<FileInput {placeholder} {name} bind:value {errors} {readonly} {disabled} {className} on:upload />
{/if}
