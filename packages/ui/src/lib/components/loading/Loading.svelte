<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.loading') || '';
</script>

<div
	data-element="loading"
	data-part="root"
	class="flex justify-center content-center w-full h-full {contextClass} {className}"
>
	<span data-part="loading" class="loading loading-spinner" />
</div>
