<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.menu') || '';
</script>

<ul class="menu z-[{zIndex}] {className} {contextClass}">
	<slot />
</ul>
