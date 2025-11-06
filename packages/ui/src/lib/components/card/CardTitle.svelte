<script lang="ts">
	import { getContext } from 'svelte';

	let className: string = '';
	export { className as class };
	const contextClass = getContext<string>('ui.card-title') || '';
</script>

<div data-part="card-title" class="card-title {className} {contextClass}">
	<slot />
</div>
