<script lang="ts">
	import { getContext } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { zIndex } from '~';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.dialog') || '';

	export let title: string | undefined = undefined;

	let nextZIndex = 0;

	const {
		elements: { trigger, overlay, content, title: titleEle, close: closeEle, portalled },
		states: { open: isOpen }
	} = createDialog({
		forceVisible: true,
		onOpenChange: ({ curr, next }) => {
			if (next) {
				nextZIndex = zIndex.next();
			}
			return next;
		}
	});

	export const open: (() => void) | undefined = () => {
		$isOpen = true;
	};

	export const close: (() => void) | undefined = () => {
		$isOpen = false;
	};
</script>

<slot name="trigger" trigger={$trigger} zIndex={nextZIndex} />

{#if $isOpen}
	<div
		data-element="dialog"
		data-part="root"
		class="{contextClass} {className}"
		use:melt={$portalled}
	>
		<div
			data-part="overlay"
			use:melt={$overlay}
			class="fixed inset-0 z-[{nextZIndex}] bg-black/50"
			transition:fade={{ duration: 100 }}
		/>
		<div
			data-part="modal-box"
			class="modal-box bg-base-100 fixed left-1/2 top-1/2 z-[{nextZIndex}] -translate-x-1/2 -translate-y-1/2"
			use:melt={$content}
		>
			<button use:melt={$closeEle} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
				✕
			</button>
			{#if title}
				<h2 use:melt={$titleEle} data-part="modal-title" class="font-bold text-lg">{title}</h2>
			{/if}
			<slot zIndex={nextZIndex} />
		</div>
	</div>
{/if}
