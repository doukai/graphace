<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.navbar-start') || '';
</script>

<div data-part="navbar-start" class="navbar-start {className} {contextClass}">
	<slot />
</div>
