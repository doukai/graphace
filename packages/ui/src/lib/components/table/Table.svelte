<script lang="ts">
	import { getContext } from 'svelte';

	export let zIndex: number | undefined = 0;
	let className: string | undefined = 'table-zebra table-pin-rows table-pin-cols';
	export { className as class };

	const contextClass = getContext<string>('ui.table') || '';
</script>

<div class="overflow-x-auto z-[{zIndex}]">
	<table class="table z-[{zIndex}] {className} {contextClass}">
		<slot />
	</table>
</div>
