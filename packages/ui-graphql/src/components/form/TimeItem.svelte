<script lang="ts">
	import type { Errors } from '@graphace/commons/types';
	import { FormItem } from '@graphace/ui/components/form';
	import { TimeInput, TimeInputList } from '@graphace/ui/components/input';

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
		<TimeInputList {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{:else}
		<TimeInput {placeholder} {id} {name} bind:value {errors} {readonly} {disabled} />
	{/if}
</FormItem>
