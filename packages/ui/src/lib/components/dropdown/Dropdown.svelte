<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.dropdown') || '';
</script>

<div class="dropdown {className} {contextClass}">
	<slot />
</div>
