<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = 'table-zebra table-pin-rows table-pin-cols';
	export { className as class };

	const contextClass = getContext<string>('ui.table') || '';
</script>

<div class="overflow-x-auto">
	<table class="table {className} {contextClass}">
		<slot />
	</table>
</div>
