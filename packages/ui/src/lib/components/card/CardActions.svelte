<script lang="ts">
	import { getContext } from "svelte";

	let className: string = '';
	export { className as class };
	const contextClass = getContext<string>('ui.card-actions') || '';
</script>

<div class="card-actions {className} {contextClass}">
	<slot />
</div>
