<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let isModalOpen: boolean = false;
	export let title: string = '';
	export let className: string = '';

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

<div class="modal modal-bottom sm:modal-middle" class:modal-open={isModalOpen} bind:this={modal}>
	<div class="modal-box {className}">
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
