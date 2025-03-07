<script lang="ts">
	import { getContext } from 'svelte';
	import { nanoid } from 'nanoid';

	export let zIndex: number | undefined = undefined;
	let className: string | undefined = 'lg:drawer-open';
	export { className as class };

	const contextClass = getContext<string>('ui.drawer') || '';
	const id = nanoid();
</script>

<div style="z-index: {zIndex || 'auto'};" class="drawer {className} {contextClass}">
	<input {id} type="checkbox" class="drawer-toggle" />
	<slot {id} />
</div>
