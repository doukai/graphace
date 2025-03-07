<script lang="ts">
	import { getContext } from 'svelte';

	export let id: string;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.drawer-side') || '';
</script>

<div class="drawer-side {className} {contextClass}">
	<label for={id} class="drawer-overlay" />
	<slot />
</div>
