<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = undefined;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.card') || '';
</script>

<div style="z-index: {zIndex || 'auto'};" class="card {className} {contextClass}">
	<slot />
</div>
