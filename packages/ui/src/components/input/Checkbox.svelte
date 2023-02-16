<script lang="ts">
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string | null | undefined = undefined;
	export let className: string = '';
	export let error: Error | undefined = undefined;
	export let readonly = false;
	export let disabled = false;
	export let id: string = nanoid();
</script>

<div class="form-control w-full max-w-xs">
	<input
		type="checkbox"
		{id}
		{name}
		class="checkbox {error ? 'checkbox-error' : ''} {className}"
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
