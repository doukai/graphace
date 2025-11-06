<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string | undefined = '';
	export let loading: boolean = false;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.button') || '';
</script>

<div
	data-element="button"
	data-part="root"
	class="tooltip {className} {contextClass}"
	data-tip={text}
>
	<button data-part="button" disabled={loading} class="btn max-sm:hidden" on:click|preventDefault>
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
		class="btn btn-square md:hidden"
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
