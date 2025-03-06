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
	import { createProgress, melt, type Toast as T, type ToastsElements } from '@melt-ui/svelte';
	import type { ToastData } from './Toasts.svelte';
	import Progress from '../progress/Progress.svelte';

	export let elements: ToastsElements;
	$: ({ content, title, description, close } = elements);

	export let toast: T<ToastData>;
	$: ({ data, id, getPercentage } = toast);

	let className: string | undefined = 'shadow-lg w-[24rem] max-w-[calc(100vw-2rem)]';
	export { className as class };

	const contextClass = getContext<string>('ui.toast') || '';

	const percentage = writable(0);
	const {
		elements: { root: progress },
		options: { max }
	} = createProgress({
		max: 100,
		value: percentage
	});

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

<div
	use:melt={$content(id)}
	in:fly={{ duration: 150, x: '100%' }}
	out:fly={{ duration: 150, x: '100%' }}
	class="alert {data.type ? `alert-${data.type}` : ''} {className} {contextClass}"
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
	{$percentage}
	{#if data.description}
		<progress
			class="progress w-56"
			value={100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}
			max="100"
		/>
		<div>
			<!-- <div
				use:melt={$progress}
				class="absolute left-5 top-2 h-1 w-[10%] overflow-hidden rounded-full bg-black/40"
			>
				<div
					class="h-full w-full bg-magnum-500"
					style={`transform: translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
				/>
			</div> -->
			<h3 use:melt={$title(id)} class="font-bold">{data.title}</h3>
			<div use:melt={$description(id)} class="text-xs">{data.description}</div>
		</div>
	{:else}
		<span use:melt={$title(id)}>{data.title}</span>
	{/if}
	<button use:melt={$close(id)} class="btn btn-sm btn-square">
		<Icon src={XMark} class="h-5 w-5" />
	</button>
</div>
