<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.menu') || '';
</script>

<ul data-element="menu" data-part="root" class="menu z-[{zIndex}] {className} {contextClass}">
	<slot />
</ul>
