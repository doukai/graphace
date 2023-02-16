<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { FormItem } from '@graphace/ui/components/form';
	import { CheckboxGroup, Select } from '@graphace/ui/components/input';

	export let value: string | (string | null | undefined)[] | null | undefined;
	export let list: boolean = false;
	export let enums: { name: string; value: string | null | undefined; description?: string }[];
	export let name: string;
	export let label: string;
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if Array.isArray(value) || (list && (value === null || value === undefined))}
		<CheckboxGroup bind:value items={enums} {error} {readonly} {disabled} />
	{:else}
		<Select {name} bind:value {error} {placeholder} {readonly} {disabled}>
			{#each enums as item}
				<option value={item.value}>{item.name}</option>
			{/each}
		</Select>
	{/if}
</FormItem>
