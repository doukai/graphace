<script lang="ts">
	import type { Error } from '$lib/types';
	export let name: string;
	export let value: string;
	export let placeholder: string = '';
	export let className: string = '';
	export let error: Error;
</script>

<div class="form-control w-full max-w-xs">
	<input
		type="text"
		{name}
		{placeholder}
		class="input input-bordered {error ? 'input-error' : ''} {className}"
		bind:value
	/>
	{#if error}
		<label for="" class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
