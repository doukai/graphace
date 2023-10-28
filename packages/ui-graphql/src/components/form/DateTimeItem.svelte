<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem, DateTimeInput, DateTimeInputList } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if Array.isArray(value) || (list && (value === null || value === undefined))}
		<DateTimeInputList {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<DateTimeInput {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormItem>
