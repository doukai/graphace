<script lang="ts">
	import { getContext } from "svelte";

	export let zIndex: number | undefined = 0;
	export let message: string | undefined = undefined;
	export let isOpen: boolean = false;

	let className: string | undefined = '';
	export { className as class };
	const contextClass = getContext<string>('ui.loading') || '';
</script>

{#if isOpen}
	<div
		data-element="modal"
		data-part="root"
		class="modal z-[{zIndex}] modal-bottom sm:modal-middle modal-open flex items-center justify-center gap-2 {contextClass} {className}"
	>
		{#if message}
			<span data-part="message" class="text text-base-content/70">{message}</span>
		{/if}
		<span data-part="loading" class="loading loading-spinner" />
	</div>
{/if}
