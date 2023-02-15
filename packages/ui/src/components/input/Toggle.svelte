<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: boolean | null | undefined;
	export let error: Error | undefined = undefined;
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
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
