<script lang="ts">
	import { getContext } from 'svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { zIndex } from '../stores';

	let className: string | undefined = 'bg-base-100';
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
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-[{$zIndex + 1}] bg-black/50"
			transition:fade={{ duration: 100 }}
		/>
		<div
			class="card fixed max-w-full left-1/2 top-1/2 z-[{$zIndex +
				1}] -translate-x-1/2 -translate-y-1/2 {className} {contextClass}"
			use:melt={$content}
		>
			<div class="card-body max-h-[calc(100vh-5rem)] z-[{$zIndex + 1}]">
				<div class="card-actions justify-end">
					<button use:melt={$closeEle} class="btn btn-sm btn-circle btn-ghost"> ✕ </button>
				</div>
				{#if title}
					<h2 use:melt={$titleEle} class="card-title">{title}</h2>
				{/if}
				<slot />
			</div>
		</div>
	</div>
{/if}
