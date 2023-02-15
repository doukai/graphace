<script lang="ts">
	import type { Error } from '@graphace/commons/types';
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string | null | undefined;
	export let placeholder: string = '';
	export let className: string = '';
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
</script>

<div class="form-control w-full max-w-xs">
	<input
		type="date"
		{id}
		{name}
		{placeholder}
		class="input input-bordered {error ? 'input-error' : ''} {className}"
		bind:value
		{readonly}
		{disabled}
	/>
	{#if error && error.message}
		<label for={id} class="label">
			<span class="label-text-alt"><p class="text-error">{error.message}</p></span>
		</label>
	{/if}
</div>
