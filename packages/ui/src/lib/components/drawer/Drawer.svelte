<script lang="ts">
	import { getContext } from 'svelte';
	import { nanoid } from 'nanoid';

	export let open: boolean = false;
	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'lg:drawer-open';
	export { className as class };

	const contextClass = getContext<string>('ui.drawer') || '';
	const id = nanoid();
</script>

<div data-element="drawer" data-part="root" class="drawer z-[{zIndex}] {contextClass} {className}">
	<input {id} bind:checked={open} type="checkbox" class="drawer-toggle" />
	<slot {id} />
</div>
