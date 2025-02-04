<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { z_index, z_class } from '.';
	export let title: string = '';
	export let disabled: boolean = false;
	export let className: string = '';
	export let showButton: boolean = false;

	let checked: boolean = false;

	z_index.next();

	export const showModal = () => {
		checked = true;
	};

	export const close = () => {
		checked = false;
	};

	const dispatch = createEventDispatcher<{
		close: {};
	}>();
</script>

{#if showButton}
	<button class="btn {className}" {disabled} on:click={(e) => showModal()}>
		<slot name="button" />
	</button>
{/if}
<input type="checkbox" bind:checked id="my_modal_6" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle {$z_class}">
	<div class="modal-box">
		<button
			class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
			on:click|preventDefault={(e) => {
				close();
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
</div>
