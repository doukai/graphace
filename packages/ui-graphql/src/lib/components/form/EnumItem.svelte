<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem, Select } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let enums: { name: string; value: string | null | undefined; description?: string }[];
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if list}
		<Select {name} bind:value {errors} {placeholder} {readonly} {disabled} multiple>
			{#each enums as item}
				<option value={item.value}>{item.name}</option>
			{/each}
		</Select>
	{:else}
		<Select {name} bind:value {errors} {placeholder} {readonly} {disabled}>
			{#each enums as item}
				<option value={item.value}>{item.name}</option>
			{/each}
		</Select>
	{/if}
</FormItem>
