<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.menu-title') || '';
</script>

<li class="menu-title {className} {contextClass}"><slot /></li>
