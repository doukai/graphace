<script lang="ts">
	import type { Errors, FileInfo } from '@graphace/commons';
	import { FormControl, FileInput, FileInputList } from '@graphace/ui';

	export let value: FileInfo | (FileInfo | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormControl let:id>
	{#if list}
		<FileInputList {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} on:upload />
	{:else}
		<FileInput {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} on:upload />
	{/if}
</FormControl>
