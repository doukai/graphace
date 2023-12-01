<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { NumberInput, NumberInputList } from '@graphace/ui';

	export let value: number | (number | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let className: string = '';
</script>

{#if Array.isArray(value) || (list && (value === null || value === undefined))}
	<NumberInputList {placeholder} {name} bind:value {errors} {readonly} {disabled} />
{:else}
	<NumberInput {placeholder} {name} bind:value {errors} {readonly} {disabled} {className} />
{/if}
