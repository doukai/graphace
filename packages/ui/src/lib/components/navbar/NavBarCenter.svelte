<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.navbar-center') || '';
</script>

<div data-part="navbar-center" class="navbar-center {className} {contextClass}">
	<slot />
</div>
