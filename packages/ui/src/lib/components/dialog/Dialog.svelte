<script lang="ts">
	import { getContext } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { zIndex } from '~';

	let className: string | undefined = 'bg-base-100';
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

	export const open = () => {
		$isOpen = true;
	};

	export const close = () => {
		$isOpen = false;
	};
</script>

<slot name="trigger" trigger={$trigger} zIndex={nextZIndex} />

{#if $isOpen}
	<div class="" use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-[{nextZIndex}] bg-black/50"
			transition:fade={{ duration: 100 }}
		/>
		<div
			class="card fixed max-md:w-full max-w-full left-1/2 top-1/2 z-[{nextZIndex}] -translate-x-1/2 -translate-y-1/2 {className} {contextClass}"
			use:melt={$content}
		>
			<div class="card-body max-h-[calc(100vh-5rem)] z-[{nextZIndex}]">
				<div class="card-actions justify-end">
					<button use:melt={$closeEle} class="btn btn-sm btn-circle btn-ghost"> ✕ </button>
				</div>
				{#if title}
					<h2 use:melt={$titleEle} class="card-title">{title}</h2>
				{/if}
				<slot zIndex={nextZIndex} />
			</div>
		</div>
	</div>
{/if}
