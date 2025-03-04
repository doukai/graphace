<script lang="ts">
	import { getContext } from 'svelte';
	
	let className: string | undefined = '';
	export { className as class };
	const contextClass = getContext<string>('ui.card') || '';
</script>

<div class="card {className} {contextClass}">
	<slot />
</div>
