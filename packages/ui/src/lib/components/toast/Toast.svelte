<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		InformationCircle,
		CheckCircle,
		ExclamationTriangle,
		XCircle,
		XMark
	} from '@steeze-ui/heroicons';
	import { writable } from 'svelte/store';
	import { melt, type Toast as T, type ToastsElements } from '@melt-ui/svelte';
	import type { ToastData } from './Toasts.svelte';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: T<ToastData>;
	$: ({ data, id, getPercentage } = toast);

	let className: string | undefined = 'shadow-lg w-[24rem] max-w-[calc(100vw-2rem)]';
	export { className as class };

	const contextClass = getContext<string>('ui.toast') || '';

	const percentage = writable(0);

	onMount(() => {
		let frame: number;
		const updatePercentage = () => {
			percentage.set(getPercentage());
			frame = requestAnimationFrame(updatePercentage);
		};
		frame = requestAnimationFrame(updatePercentage);

		return () => cancelAnimationFrame(frame);
	});
</script>

<!-- alert-info alert-success alert-warning alert-error -->
<div
	data-element="toast"
	data-part="root"
	use:melt={$content(id)}
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="alert {data.type ? `alert-${data.type}` : ''} {contextClass} {className}"
>
	{#if data.type === 'info'}
		<Icon src={InformationCircle} class="h-5 w-5" />
	{:else if data.type === 'success'}
		<Icon src={CheckCircle} class="h-5 w-5" />
	{:else if data.type === 'warning'}
		<Icon src={ExclamationTriangle} class="h-5 w-5" />
	{:else if data.type === 'error'}
		<Icon src={XCircle} class="h-5 w-5" />
	{:else}
		<Icon src={InformationCircle} class="h-5 w-5" />
	{/if}
	<div>
		<progress data-part="progress" class="progress h-1 w-full" value={$percentage} max="100" />
		<h3 data-part="title" use:melt={$title(id)} class="font-bold">{data.title}</h3>
		{#if data.description}
			<div data-part="description" use:melt={$description(id)} class="text-xs">
				{data.description}
			</div>
		{/if}
	</div>
	<button data-part="btn-close" use:melt={$close(id)} class="btn btn-sm btn-circle btn-ghost">
		<Icon data-part="icon-close" src={XMark} class="h-5 w-5" />
	</button>
</div>
