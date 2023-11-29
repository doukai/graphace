<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { FormItem } from '@graphace/ui';
	import GroupSelect from './GroupSelect.svelte';
	import type { GroupInput } from '$houdini';

	export let value: GroupInput | (GroupInput | null | undefined)[] | null | undefined = undefined;
	export let list: boolean = false;
	export let name: string;
	export let label: string;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let placeholder: string = '';
</script>

<FormItem {label} let:id>
	{#if readonly}
		<input
			type="text"
			{id}
			{name}
			{placeholder}
			class="input input-bordered {errors?.errors ? 'input-error' : ''}"
			value={Array.isArray(value) ? value.map((item) => item?.name).join(', ') : value?.name}
			readonly
		/>
	{:else}
		<GroupSelect {id} {name} {list} {disabled} {placeholder} bind:value />
	{/if}
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</FormItem>
