<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.menu-title') || '';
</script>

<li data-part="menu-title" class="menu-title {contextClass} {className}"><slot /></li>
