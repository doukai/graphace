<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.navbar-end') || '';
</script>

<div data-part="navbar-end" class="navbar-end {className} {contextClass}">
	<slot />
</div>
