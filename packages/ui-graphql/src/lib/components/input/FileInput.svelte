<script lang="ts">
	import { createEventDispatcher } from 'svelte';
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

	const dispatch = createEventDispatcher<{
		upload: {
			file: File | (File | null | undefined)[] | null | undefined;
			then: (value: FileInfo | (FileInfo | null | undefined)[] | null | undefined) => void;
		};
	}>();
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
		on:upload={(e) => {
			dispatch('upload', {
				file: e.detail.file,
				then: (value) => {
					if (Array.isArray(value)) {
						if (!value.length) {
							e.detail.then(null);
						} else {
							e.detail.then(value);
						}
					}
				}
			});
		}}
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
