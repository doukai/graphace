<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string | undefined = '';
	export let color:
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'ghost'
		| 'link'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| undefined = undefined;
	export let loading: boolean = false;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.button') || '';
</script>

<!-- btn-neutral btn-primary btn-secondary btn-accent btn-ghost btn-link btn-info btn-success btn-warning btn-error -->
<div
	data-element="button"
	data-part="root"
	class="tooltip {contextClass} {className}"
	data-tip={text}
>
	<button
		data-part="button"
		disabled={loading}
		class="btn {color ? `btn-${color}` : ''} max-sm:hidden"
		on:click|preventDefault
	>
		{#if loading}
			<span data-part="loading" class="loading loading-spinner" />
		{:else}
			<slot>
				<span data-part="text">{text}</span>
			</slot>
		{/if}
	</button>
	<button
		data-part="button-sm"
		disabled={loading}
		class="btn btn-square {color ? `btn-${color}` : ''} sm:hidden"
		on:click|preventDefault
	>
		{#if loading}
			<span data-part="loading" class="loading loading-spinner" />
		{:else}
			<slot name="sm">
				<span data-part="text">{text}</span>
			</slot>
		{/if}
	</button>
</div>
