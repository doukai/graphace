<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.table') || '';
</script>

<div data-element="table" data-part="root" class="overflow-x-auto {className} {contextClass}">
	<table data-part="table" class="table table-zebra table-pin-rows table-pin-cols z-[{zIndex}]">
		<slot />
	</table>
</div>
