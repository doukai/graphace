<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: boolean | null | undefined;
	export let errors: Errors | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
</script>

<div class="form-control">
	<input
		type="checkbox"
		{id}
		{name}
		class="toggle my-3"
		bind:checked={value}
		{readonly}
		{disabled}
	/>
	{#if errors?.errors}
		<label for={id} class="label">
			{#each errors.errors as error}
				<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
			{/each}
		</label>
	{/if}
</div>
