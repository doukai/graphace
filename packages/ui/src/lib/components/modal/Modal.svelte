<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	export let isModalOpen: boolean = false;
	export let title: string | undefined = undefined;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'modal-bottom sm:modal-middle';
	export { className as class };

	const contextClass = getContext<string>('ui.modal') || '';

	let modal: HTMLDivElement;
	$: if (isModalOpen) {
		if (modal) {
			document.body.appendChild(modal);
		}
	}

	const dispatch = createEventDispatcher<{
		close: {};
	}>();
</script>

<div
	data-element="modal"
	data-part="root"
	class="modal z-[{zIndex}] {contextClass} {className}"
	class:modal-open={isModalOpen}
	bind:this={modal}
>
	<div data-part="modal-box" class="modal-box">
		<button
			data-part="btn-close"
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			on:click|preventDefault={(e) => {
				dispatch('close');
			}}
		>
			✕
		</button>
		{#if title}
			<h2 data-part="modal-title" class="font-bold text-lg">{title}</h2>
		{/if}
		<div class="py-4">
			<slot />
		</div>
	</div>
</div>
