<script lang="ts">
	import { createProgress, melt } from '@melt-ui/svelte';
	import { getContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let value: number | undefined = 0;
	export let percentage: Writable<number> | undefined = writable(value);
	export let maxValue: number | undefined = 100;
	export let type:
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error'
		| undefined = 'neutral';
	let className: string | undefined = 'w-full h-6 rounded-full';
	export { className as class };

	const contextClass = getContext<string>('ui.progress') || '';
	const {
		elements: { root },
		options: { max }
	} = createProgress({
		value: percentage,
		max: maxValue
	});
</script>

<div
	use:melt={$root}
	class="relative overflow-hidden bg-{type}-content/40 {className} {contextClass}"
>
	<div
		class="h-full w-full bg-{type} transition-transform duration-[660ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
		style={`transform: translateX(-${100 - (100 * ($percentage ?? 0)) / ($max ?? 1)}%)`}
	/>
</div>
