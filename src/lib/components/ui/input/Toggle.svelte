<script lang="ts">
	import type { Error } from '$lib/types';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: boolean;
	export let error: Error;
	const id = nanoid();
</script>

<div class="form-control">
	<input
		{name}
		type="checkbox"
		class="toggle my-3"
		checked={value}
		on:click={(e) => {
			value = !value;
		}}
	/>
	{#if error}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
