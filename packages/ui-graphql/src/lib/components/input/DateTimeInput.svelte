<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { DateTimeInput, DateTimeInputList } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

{#if Array.isArray(value) || (list && (value === null || value === undefined))}
	<DateTimeInputList {placeholder} {name} bind:value {errors} {readonly} {disabled} />
{:else}
	<DateTimeInput {placeholder} {name} bind:value {errors} {readonly} {disabled} />
{/if}
