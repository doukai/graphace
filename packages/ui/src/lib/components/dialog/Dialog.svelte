<script lang="ts">
	import { getContext } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.dialog') || '';

	export let title: string | undefined = undefined;

	const {
		elements: { trigger, overlay, content, title: titleEle, close: closeEle, portalled },
		states: { open: isOpen }
	} = createDialog({ forceVisible: true });

	export const open = () => {
		$isOpen = true;
	};

	export const close = () => {
		$isOpen = false;
	};
</script>

<slot name="trigger" trigger={$trigger} />

{#if $isOpen}
	<div class="" use:melt={$portalled}>
		<div use:melt={$overlay} class="modal z-[{zIndex}]" transition:fade={{ duration: 150 }} />
		<div
			class="modal-box -translate-x-1/2 -translate-y-1/2 {className} {contextClass}"
			use:melt={$content}
		>
			<button use:melt={$closeEle} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				✕
			</button>
			{#if title}
				<h2 use:melt={$titleEle} class="font-bold text-lg">{title}</h2>
			{/if}
			<slot />
		</div>
	</div>
{/if}
