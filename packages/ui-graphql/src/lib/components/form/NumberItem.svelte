<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem, NumberInput, NumberInputList } from '@graphace/ui';

	export let value: number | (number | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if list}
		<NumberInputList {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<NumberInput {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormItem>
