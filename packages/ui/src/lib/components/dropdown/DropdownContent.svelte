<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.dropdown-content') || '';
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<ul tabindex="0" class="dropdown-content {className} {contextClass}">
	<slot />
</ul>
