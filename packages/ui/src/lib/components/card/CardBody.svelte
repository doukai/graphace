<script lang="ts">
	import { getContext } from 'svelte';

	let className: string = '';
	export { className as class };
	const contextClass = getContext<string>('ui.card-body') || '';
</script>

<div data-part="card-body" class="card-body {className} {contextClass}">
	<slot />
</div>
