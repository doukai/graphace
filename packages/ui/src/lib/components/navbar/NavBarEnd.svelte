<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.navbar-end') || '';
</script>

<div class="navbar-end {className} {contextClass}">
	<slot />
</div>
