<script lang="ts">
	import { getContext } from 'svelte';

	let className: string | undefined = 'loading-spinner';
	export { className as class };

	const contextClass = getContext<string>('ui.loading') || '';
</script>

<span class="loading {className} {contextClass}" />
