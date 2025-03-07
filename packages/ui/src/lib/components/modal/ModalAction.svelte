<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.modal-action') || '';
</script>

<div class="modal-action {className} {contextClass}">
	<slot />
</div>
