<script lang="ts">
	export let zIndex: number | undefined = 0;
	export let message: string | undefined = undefined;
	export let isOpen: boolean = false;

	let className: string | undefined = '';
	export { className as class };
</script>

{#if isOpen}
	<div
		data-element="modal"
		data-part="root"
		class="modal z-[{zIndex}] modal-bottom sm:modal-middle modal-open flex items-center justify-center gap-2 {className}"
	>
		{#if message}
			<span data-part="message" class="text text-base-content/70">{message}</span>
		{/if}
		<span data-part="loading" class="loading loading-bars" />
	</div>
{/if}
