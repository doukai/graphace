<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.card') || '';
</script>

<div data-element="card" data-part="root" class="card z-[{zIndex}] {contextClass} {className}">
	<slot />
</div>
