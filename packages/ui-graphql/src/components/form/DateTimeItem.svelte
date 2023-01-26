<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { FormItem } from '@graphace/ui/components/form';
	import { DateTimeInput, DateTimeInputList } from '@graphace/ui/components/input';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if Array.isArray(value)}
		<DateTimeInputList {placeholder} {id} {name} bind:value {error} />
	{:else}
		<DateTimeInput {placeholder} {id} {name} bind:value {error} />
	{/if}
</FormItem>
