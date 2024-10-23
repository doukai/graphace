<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let title: string = '';
	export let className: string = '';

	let dialog: HTMLDialogElement;

	const dispatch = createEventDispatcher<{
		close: {};
	}>();
</script>

<button class="btn {className}" on:click={(e) => dialog.showModal()}>
	<slot name="button" />
</button>
<dialog bind:this={dialog} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<button
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			on:click|preventDefault={(e) => {
				dialog.close();
				dispatch('close');
			}}
		>
			✕
		</button>
		<h2 class="font-bold text-lg">{title}</h2>
		<div class="p-0 sm:p-2">
			<slot />
		</div>
		<div class="modal-action">
			<slot name="action" />
		</div>
	</div>
</dialog>
