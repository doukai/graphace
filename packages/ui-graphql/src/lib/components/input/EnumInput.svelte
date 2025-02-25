<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Select } from '@graphace/ui';

	export let value: string | (string | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let enums: { name: string; value: string | null | undefined; description?: string }[];
	export let name: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	export let containerClassName: string = '';
	export let className: string = '';
</script>

{#if list}
	<Select
		{name}
		bind:value
		{errors}
		{placeholder}
		{containerClassName}
		{className}
		{readonly}
		{disabled}
		multiple
		on:change
	>
		<option value={undefined} />
		{#each enums as item}
			<option value={item.value}>{item.name}</option>
		{/each}
	</Select>
{:else}
	<Select
		{name}
		bind:value
		{errors}
		{placeholder}
		{containerClassName}
		{className}
		{readonly}
		{disabled}
		on:change
	>
		<option value={undefined} />
		{#each enums as item}
			<option value={item.value}>{item.name}</option>
		{/each}
	</Select>
{/if}
