<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	export let isModalOpen: boolean = false;
	export let title: string = '';

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
	class="modal z-[{zIndex}] {className} {contextClass}"
	class:modal-open={isModalOpen}
	bind:this={modal}
>
	<div class="modal-box">
		<button
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			on:click|preventDefault={(e) => {
				dispatch('close');
			}}
		>
			✕
		</button>
		<h2 class="font-bold text-lg">{title}</h2>
		<slot />
	</div>
</div>
