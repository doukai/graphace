<script lang="ts">
	import type { Error } from '$lib/types';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string;
	export let placeholder: string = '';
	export let className: string = '';
	export let error: Error;
	const id = nanoid();
</script>

<div class="form-control w-full max-w-xs">
	<input
		{id}
		type="text"
		{name}
		{placeholder}
		class="input input-bordered {error ? 'input-error' : ''} {className}"
		bind:value
	/>
	{#if error}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
