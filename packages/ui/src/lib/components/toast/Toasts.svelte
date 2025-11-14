<script lang="ts" context="module">
	import { createToaster } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { Toast } from '.';
	import { zIndex } from '~';

	export type ToastData = {
		title: string;
		type?: 'info' | 'success' | 'warning' | 'error' | undefined;
		description?: string | undefined;
		closeDelay?: number | undefined;
	};

	const {
		elements,
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const toast = {
		add: (param: ToastData) =>
			addToast({
				data: { title: param.title, type: param.type, description: param.description },
				closeDelay: param.closeDelay || 3000
			}),
		send: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: undefined, description }, closeDelay: 3000 }),
		info: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'info', description }, closeDelay: 3000 }),
		success: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'success', description }, closeDelay: 3000 }),
		warning: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'warning', description }, closeDelay: 3000 }),
		error: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'error', description }, closeDelay: 3000 })
	};
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	let className: string | undefined = 'right-0 top-0 m-4 gap-2 md:bottom-0';
	export { className as class };

	const contextClass = getContext<string>('ui.toasts') || '';
</script>

<div
	data-element="toasts"
	data-part="root"
	class="fixed flex flex-col items-end md:top-auto z-[{$zIndex + 1}] {contextClass} {className}"
	use:portal
>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast {elements} {toast} />
		</div>
	{/each}
</div>
