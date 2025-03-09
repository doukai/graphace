<script lang="ts">
	import { getContext } from 'svelte';
	import { nanoid } from 'nanoid';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'lg:drawer-open';
	export { className as class };

	const contextClass = getContext<string>('ui.drawer') || '';
	const id = nanoid();
</script>

<div class="drawer z-[{zIndex}] {className} {contextClass}">
	<input {id} type="checkbox" class="drawer-toggle" />
	<slot {id} />
</div>
