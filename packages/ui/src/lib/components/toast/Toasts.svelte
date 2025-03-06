<script lang="ts" context="module">
	export type ToastData = {
		title: string;
		type?: 'info' | 'success' | 'warning' | 'error' | undefined;
		description?: string | undefined;
	};
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { createToaster } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { Toast } from '.';

	$: ({
		elements,
		helpers: { addToast },
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>({ hover: 'pause' }));

	export const toast = {
		add: (
			title: string,
			type?: 'info' | 'success' | 'warning' | 'error' | undefined,
			description?: string | undefined
		) => addToast({ data: { title, type, description } }),
		send: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: undefined, description } }),
		info: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'info', description } }),
		success: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'success', description } }),
		warning: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'warning', description } }),
		error: (title: string, description?: string | undefined) =>
			addToast({ data: { title, type: 'error', description } })
	};
</script>

<button
	class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3
  font-medium leading-none text-magnum-700 shadow hover:opacity-75"
	on:click={(e) => toast.send('test', 'test2')}
>
	Show toast
</button>

<div
	class="fixed right-0 top-0 z-[9999] m-4 flex flex-col items-end gap-2 md:bottom-0 md:top-auto"
	use:portal
>
	{#each $toasts as toast (toast.id)}
		<div animate:flip={{ duration: 500 }}>
			<Toast {elements} {toast} />
		</div>
	{/each}
</div>
