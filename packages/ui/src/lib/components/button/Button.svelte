<script lang="ts">
	import { getContext } from 'svelte';

	export let text: string | undefined = '';
	export let loading: boolean = false;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.button') || '';
</script>

<div class="tooltip" data-tip={text}>
	<button disabled={loading} class="btn {className} {contextClass} md:hidden" on:click>
		{#if loading}
			<span class="loading loading-spinner" />
		{:else}
			<slot name="sm">
				{text}
			</slot>
		{/if}
	</button>
</div>
<button disabled={loading} class="btn {className} {contextClass} max-md:hidden" on:click>
	{#if loading}
		<span class="loading loading-spinner" />
	{/if}
	<slot>
		{text}
	</slot>
</button>
