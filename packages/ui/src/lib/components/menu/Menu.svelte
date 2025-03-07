<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.menu') || '';
</script>

<ul style="z-index: {zIndex || 'auto'};" class="menu {className} {contextClass}">
	<slot />
</ul>
