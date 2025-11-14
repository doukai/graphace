<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.modal-action') || '';
</script>

<div data-part="modal-action" class="modal-action {contextClass} {className}">
	<slot />
</div>
