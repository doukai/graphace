<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { TimeInput, TimeInputList } from '@graphace/ui/components/input';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

{#if Array.isArray(value) || (list && (value === null || value === undefined))}
	<TimeInputList {placeholder} {name} bind:value {errors} {readonly} {disabled} />
{:else}
	<TimeInput {placeholder} {name} bind:value {errors} {readonly} {disabled} />
{/if}
