<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { Select } from '@graphace/ui';

	export let id: string = undefined;
	export let name: string = undefined;
	export let enums: { name: string; value: string | null | undefined; description?: string }[];
	export let value: (string | null | undefined)[] | null | undefined = undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
	let className: string | undefined = undefined;
	export { className as class };
</script>

<Select
	{id}
	{name}
	bind:value
	{placeholder}
	{errors}
	{readonly}
	{disabled}
	class={className}
	multiple
	on:change
>
	<option value={undefined} />
	{#each enums as item}
		<option value={item.value}>{item.name}</option>
	{/each}
</Select>
