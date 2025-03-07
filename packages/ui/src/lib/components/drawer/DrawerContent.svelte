<script lang="ts">
	import { getContext } from 'svelte';

	export let id: string;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.drawer-content') || '';
</script>

<div class="drawer-content {className} {contextClass}">
	<slot {id} />
</div>
