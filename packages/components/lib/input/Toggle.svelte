<script lang="ts">
	import type { Error } from '$lib/types';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: boolean;
	export let error: Error = null;
	const id = nanoid();
</script>

<div class="form-control">
	<input type="checkbox" {id} {name} class="toggle my-3" bind:checked={value} />
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
